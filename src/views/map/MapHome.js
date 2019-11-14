import React, { Component } from "react";
import styled from 'styled-components';

import venueService from "../../services/venueService";
import practicaService from "../../services/practicaService";
import schoolService from "../../services/schoolService";

import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  GeolocateControl,
} from "react-map-gl"; // @urbica/react-map-gl
import Geocoder from "react-map-gl-geocoder";

// import Cluster from "@urbica/react-map-gl-cluster";

import MapPin from "./components/MapPin";
import VenueInfo from "./components/VenueInfo";
// import InfoBox from "./components/InfoBox";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./MapHome.css";

const Select = styled.select`
  color: white;
`;

const navStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  padding: "10px"
};

const geolocateStyle = {
  position: 'absolute',
  top: 100,
  right: 0,
  margin: 10
};

// const geocoderStyle = {
//   position: 'absolute',
//   buttom: 100,
//   right: 0,
//   margin: 10,
//   width: "40px"
// };

class MapHome extends Component {
  state = {
    searchBy: "venues",
    listOfSpots: [],
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 41.401456,
      longitude: 2.161712,
      zoom: 3,
      bearing: 0,
      pitch: 0
    },
    popupInfo: null,
    userLocation: {},
  };


  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  async loadMap(type) {
    try {
      if (type === 'venues') {
        return await venueService.getAllVenues();
      } else if (type === 'practicas') {
        return await practicaService.getAllPracticas();
      } else {
        return await schoolService.getAllSchools();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    const test2 = await this.loadMap(this.state.searchBy);
    this.setState({
      listOfSpots: test2
    })
  }

  renderPopup() {
    const { popupInfo, searchBy } = this.state;
    return (
      popupInfo && (
        <Popup
          className="maxWidth"
          // maxWidth="50px"
          tipSize={5}
          anchor="bottom"
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <VenueInfo info={popupInfo} searchBy={searchBy} />
        </Popup>
      )
    );
  }

  handleDropdownChange = async (event) => {
    const searchBy = event.target.value;
    const test = await this.loadMap(searchBy);
    this.setState({
      searchBy,
      listOfSpots: test
    })
  }

  render() {
    const { viewport } = this.state;

    // const markerStyle = {
    //   width: "20px",
    //   height: "20px",
    //   color: "rgb(255,255,255)",
    //   background: "green",
    //   borderRadius: "5px",
    //   textAlign: "center"
    // };

    // const ClusterMarker = ({ longitude, latitude, pointCount }) => (
    //   <Marker longitude={longitude} latitude={latitude}>
    //     <div style={markerStyle}>{pointCount}</div>
    //   </Marker>
    // );

    return (
      <div>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          onViewportChange={this.handleViewportChange}
          mapStyle="mapbox://styles/mapbox/light-v10"
          // accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          {/* https://github.com/uber/react-map-gl/issues/921 */}

          {/* <Cluster
            radius={40}
            extent={512}
            nodeSize={64}
            component={ClusterMarker}
          >
            {this.state.listOfSpots.length > 0 &&
              this.state.listOfSpots.map(venue => (
                <Marker
                  key={venue._id}
                  longitude={venue.geometry.coordinates[0]}
                  latitude={venue.geometry.coordinates[1]}
                >
                  <div style={markerStyle} />
                </Marker>
              ))}
          </Cluster> */}

          <div>
            {this.state.listOfSpots.length > 0 &&
              this.state.listOfSpots.map(venue => {
                return (
                  <div key={venue._id}>
                    <Marker
                      longitude={venue.geometry.coordinates[0]}
                      latitude={venue.geometry.coordinates[1]}
                    >
                      <MapPin
                        size={20}
                        onClick={() => this.setState({ popupInfo: venue })}
                      />
                    </Marker>
                  </div>
                );
              })}
            {this.renderPopup()}
            <div className="nav" style={navStyle}>
              <NavigationControl
                onViewportChange={viewport => this.setState({ viewport })}
              />
            </div>
            {/* <div>
              <OptionBar />
            </div> */}
            <div>
              <div /*style={geocoderStyle}*/>
                <Geocoder
                  mapRef={this.mapRef}
                  onViewportChange={this.handleGeocoderViewportChange}
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                  position='top-left'
                />
              </div>
              {/* <div>
                <InfoBox
                  containerComponent={this.props.containerComponent}
                  info={popupInfo}
                />
              </div> */}
              <div className="MapHomeOption">
                <form>
                  <Select id="searchBy" onChange={this.handleDropdownChange} value={this.state.searchBy}>
                    {/* <option value="select">Select an option</option> */}
                    <option value="venues">milongas</option>
                    <option value="practicas">practicas</option>
                    <option value="schools">schools</option>
                  </Select>
                </form>
              </div>
              {/* <div>
                <Link className="Login" to={"/login"}> Login</Link>
              </div> */}
            </div>
          </div>
        </MapGL>
      </div >
    );
  }
}

export default MapHome;
import React, { Component } from "react";

import venueService from "../../services/venueService";
import practicaService from "../../services/practicaService";
import schoolService from "../../services/schoolService";

import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  GeolocateControl,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import MapPin from "./components/MapPin";
import VenueInfo from "./components/VenueInfo";
import InfoBox from "./components/InfoBox";
// import OptionBar from "./components/OptionBar"

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./MapHome.css";

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

  async componentDidMount() {
    console.log(this.props);
    try {
      if (this.state.searchBy === 'venues') {
        let listOfSpots = await venueService.getAllVenues();
        this.setState({
          listOfSpots
        });
      } else if (this.state.searchBy === 'practicas') {
        let listOfSpots = await practicaService.getAllPracticas();
        this.setState({
          listOfSpots
        });
      } else {
        let listOfSpots = await schoolService.getAllSchools();
        this.setState({
          listOfSpots
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.value > prevState.value) {
  //     this.foo();  
  //   }
  // }

  renderPopup() {
    const { popupInfo, searchBy } = this.state;
    return (
      popupInfo && (
        <Popup
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

  handleDropdownChange = (event) => {
    console.log(this.state.searchBy)
    console.log(event.target.value)
    this.setState({ searchBy: event.target.value }, function () {
      console.log(this.state.searchBy);
    });

    console.log(event.target.value)
    console.log(this.state.searchBy)
  }

  render() {
    const { viewport, popupInfo } = this.state;
    return (
      <div>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          onViewportChange={this.handleViewportChange}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          {/* https://github.com/uber/react-map-gl/issues/921 */}
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
            <div className="test">
              <Geocoder
                mapRef={this.mapRef}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                position='top-left'
              />
              <div>
                <InfoBox
                  containerComponent={this.props.containerComponent}
                  info={popupInfo}
                />
              </div>
              <div className="MapHomeOption">
                <form>
                  <select id="searchBy" onChange={this.handleDropdownChange} value={this.state.searchBy}>
                    <option value="select">Select an option</option>
                    <option value="venues">milongas</option>
                    <option value="practicas">practicas</option>
                    <option value="schools">schools</option>
                  </select>
                </form>
                {/* {this.renderMap()} */}
              </div>
            </div>
          </div>
        </MapGL>
      </div >
    );
  }
}

export default MapHome;
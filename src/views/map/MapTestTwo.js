import React, { Component } from "react";

import venueService from "../../services/venueService";
import practicaService from "../../services/practicaService";
import schoolService from "../../services/schoolService";

import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  GeolocateControl,
} from '@urbica/react-map-gl';

// import { NavigationControl } from "react-map-gl";

import Cluster from '@urbica/react-map-gl-cluster';

import Geocoder from "react-map-gl-geocoder";

import MapPin from "./components/MapPin";
import VenueInfo from "./components/VenueInfo";
import InfoBox from "./components/InfoBox";
// import OptionBar from "./components/OptionBar"

import 'mapbox-gl/dist/mapbox-gl.css';

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./MapHome.css";

// const navStyle = {
//   position: "absolute",
//   top: 0,
//   right: 0,
//   padding: "10px"
// };

const geolocateStyle = {
  position: 'absolute',
  top: 100,
  right: 0,
  margin: 10
};

class MapTestTwo extends Component {
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
    const { viewport, popupInfo } = this.state;


    const style = {
      width: '20px',
      height: '20px',
      color: '#fff',
      background: '#1978c8',
      borderRadius: '20px',
      textAlign: 'center'
    };

    const ClusterMarker = ({ longitude, latitude, pointCount }) => (
      <Marker longitude={longitude} latitude={latitude}>
        <div style={{ ...style, background: '#f28a25' }}>{pointCount}</div>
      </Marker>
    );

    return (
      <MapGL
        ref={this.mapRef}
        {...viewport}
        onViewportChange={this.handleViewportChange}
        style={{ width: '100%', height: '400px' }}
        mapStyle='mapbox://styles/mapbox/light-v10'
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      // onViewportChange={viewport => this.setState({ viewport })}
      // {...this.state.viewport}
      >
        <Cluster radius={40} extent={512} nodeSize={64} component={ClusterMarker}>
          {this.state.listOfSpots.length > 0 &&
            this.state.listOfSpots.map(venue => (
              <Marker
                key={venue.id}
                longitude={venue.geometry.coordinates[0]}
                latitude={venue.geometry.coordinates[1]}
              >
                {/* <div style={style} /> */}
                <MapPin
                  size={20}
                  onClick={() => this.setState({ popupInfo: venue })}
                />
              </Marker>
            ))}
        </Cluster>
        {this.renderPopup()}

        <div>
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
        </div>
        {/* https://github.com/uber/react-map-gl/issues/921 */}
        {/* <div className="nav" style={navStyle}>
          <NavigationControl
            onViewportChange={viewport => this.setState({ viewport })}
          />
        </div> */}
        <NavigationControl />
        <div>
          <Geocoder
            mapRef={this.mapRef}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            position='top-left'
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
        </div>
        <div>
          <InfoBox
            containerComponent={this.props.containerComponent}
            info={popupInfo}
          />
        </div>
      </MapGL>
    );
  }
}
export default MapTestTwo;
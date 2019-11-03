import React, { Component } from "react";
import venueService from "../../services/venueService";
import MapGL, {
  NavigationControl,
  Marker,
  FullscreenControl,
  Popup
} from "react-map-gl";

import MapPin from "./components/MapPin";
import VenueInfo from "./components/VenueInfo";

const fullscreenControlStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px"
};

class MapHome extends Component {
  state = {
    listOfVenues: [],
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 41.401456,
      longitude: 2.161712,
      zoom: 8
    },
    popupInfo: null,
    userLocation: {}
  };

  async componentDidMount() {
    try {
      const listOfVenues = await venueService.getAllVenues();
      this.setState({
        listOfVenues
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <VenueInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      let newViewport = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10
      };
      this.setState({
        viewport: newViewport,
        userLocation: setUserLocation
      });
    });
  };

  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <button onClick={this.setUserLocation}>My Location</button>
        {Object.keys(this.state.userLocation).length !== 0 ? (
          <Marker
            latitude={this.state.userLocation.lat}
            longitude={this.state.userLocation.long}
          >
            <div>yo</div>
            {/* <img className="location-icon" src="location-icon.svg" alt="" /> */}
          </Marker>
        ) : (
            <div>Empty</div>
          )}
        <div>
          {this.state.listOfVenues.length > 0 &&
            this.state.listOfVenues.map(venue => {
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
          <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
          <div className="nav" style={navStyle}>
            <NavigationControl
              onViewportChange={viewport => this.setState({ viewport })}
            />
          </div>
        </div>
      </MapGL>
    );
  }
}

export default MapHome;

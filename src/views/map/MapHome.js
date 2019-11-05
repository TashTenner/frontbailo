import React, { Component } from "react";
import venueService from "../../services/venueService";
import MapGL, {
  NavigationControl,
  Marker,
  // FullscreenControl,
  Popup,
  GeolocateControl
} from "react-map-gl";
// import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

import MapPin from "./components/MapPin";
import VenueInfo from "./components/VenueInfo";
import InfoBox from "./components/InfoBox";
import OptionBar from "./components/OptionBar"

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

// import "./MapHome.css";


// const fullscreenControlStyle = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   padding: "10px"
// };

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
//   top: 0,
//   left: 0,
//   margin: 10,
//   width: "77vw"
// };

class MapHome extends Component {
  state = {
    listOfVenues: [],
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 41.401456,
      longitude: 2.161712,
      zoom: 8,
      bearing: 0,
      pitch: 0
    },
    popupInfo: null,
    userLocation: {},
    // searchResultLayer: null
  };

  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  // handleOnResult = event => {
  //   this.setState({
  //     searchResultLayer: new GeoJsonLayer({
  //       id: "search-result",
  //       data: event.result.geometry,
  //       getFillColor: [255, 0, 0, 128],
  //       getRadius: 1000,
  //       pointRadiusMinPixels: 10,
  //       pointRadiusMaxPixels: 10
  //     })
  //   })
  // }

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
          anchor="bottom"
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

  // updateSettings = (name, value) => {
  //   if (name === 'year') {
  //     this.setState({ year: value });

  //     const { data } = this.state;
  //     if (data) {
  //       updatePercentiles(data, f => f.properties.income[value]);
  //       // trigger update
  //       this.setState({ data: { ...data } });
  //     }
  //   }
  // };

  render() {
    const { viewport, popupInfo  /* searchResultLayer */ } = this.state;
    return (
      <div>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          // onViewportChange={viewport => this.setState({ viewport })}
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
            {/* <div className="fullscreen" style={fullscreenControlStyle}>
              <FullscreenControl />
            </div> */}
            <div className="nav" style={navStyle}>
              <NavigationControl
                onViewportChange={viewport => this.setState({ viewport })}
              />
            </div>
            <div>
              <OptionBar />
            </div>
            <div className="test">
              <Geocoder
                mapRef={this.mapRef}
                // onResult={this.handleOnResult}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                position='top-left'
              // width='77vw'
              // style={geocoderStyle}
              />
              <div>
                <InfoBox
                  containerComponent={this.props.containerComponent}
                  info={popupInfo}
                // settings={this.state}
                // onChange={this._updateSettings}
                />
              </div>
            </div>
          </div>
          {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}
        </MapGL>

      </div >
    );
  }
}

export default MapHome;

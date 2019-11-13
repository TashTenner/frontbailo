import React, { Component } from "react";

// import Supercluster from 'supercluster';

import venueService from "../../services/venueService";

import MapGL, {
  Marker
} from "react-map-gl";

import MapPin from "./components/MapPin";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

// const supercluster = new Supercluster({
//   radius: 40,
//   maxZoom: 16
// });

class MapTestThree extends Component {
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
    }
  };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  async loadMap(type) {
    try {
      if (type === 'venues') {
        return await venueService.getAllVenues();
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

  render() {
    const { viewport } = this.state;

    return (
      <div>
        <MapGL
          {...viewport}
          onViewportChange={this.handleViewportChange}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
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
                      />
                    </Marker>
                  </div>
                );
              })}
          </div>
        </MapGL>
      </div >
    );
  }
}

export default MapTestThree;
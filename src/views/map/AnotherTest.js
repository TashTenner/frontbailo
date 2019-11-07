import "mapbox-gl/dist/mapbox-gl.css";
import React, { Component } from "react";
// import { render } from "react-dom";
import MapGL, {
  // Marker
} from "react-map-gl";
// import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';

// import MapPin from "./components/MapPin"

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw";

class AnotherTest extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    },
    searchResultLayer: null
  };

  mapRef = React.createRef();

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });

  };

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    });
    console.log(this.state.searchResultLayer.state.features)
    console.log(this.state.searchResultLayer.state.features.pointFeatures[0].geometry.coordinates[0])
    console.log(event.result.geometry.coordinates)
  };

  render() {
    const { viewport, searchResultLayer } = this.state;
    // const { lng } = this.state.searchResultLayer.state.features.pointFeatures[0].geometry.coordinates[0];
    return (
      <div>
        {/* {searchResultLayer.length > 0 &&
          searchResultLayer.event.result.map(venue => {
            return (
              // <div>{venue[0]}</div>
              <div>
                <Marker
                  longitude={venue.geometry.coordinates[0]}
                  latitude={venue.geometry.coordinates[1]}
                >
                  <MapPin
                    size={20}
                  // onClick={() => this.setState({ popupInfo: venue })}
                  />
                </Marker>
              </div>
            );
          })} */}
        <MapGL
          ref={this.mapRef}
          {...viewport}
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >

          <Geocoder
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
          <DeckGL {...viewport} layers={[searchResultLayer]} />
          {/* {searchResultLayer ? (<div>{searchResultLayer.data.event.result.geometry.coordinates[0]}</div>) : (<div>kkk</div>)} */}
        </MapGL>
      </div>
    );
  }
}

export default AnotherTest;
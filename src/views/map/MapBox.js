import React, { Component } from "react";
import DeckGL from "deck.gl";
import { StaticMap } from "react-map-gl";

class MapBox extends Component {
  render() {
    return (
      <React.Fragment>
        <DeckGL
          initialViewState={{
            longitude: -74.006,
            latitude: 40.7128,
            zoom: 12
          }}
          height="10%"
          width="10%"
          controller={true} // allows the user to move the map around
        >
          <StaticMap
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken="pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw"
          />
        </DeckGL>
      </React.Fragment>
    );
  }
}
export default MapBox;

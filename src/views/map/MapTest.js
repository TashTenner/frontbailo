import React, { Component } from "react";

import { randomPoint } from '@turf/random';
import MapGL, { Marker } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';

const bbox = [-160, -70, 160, 70];
const points = randomPoint(50, { bbox }).features;
points.forEach((point, index) => (point.id = index));


class MapTest extends Component {
  state = {
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    }
  };

  render() {

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
        style={{ width: '100%', height: '400px' }}
        mapStyle='mapbox://styles/mapbox/light-v9'
        accessToken='pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw'
        onViewportChange={viewport => this.setState({ viewport })}
        {...this.state.viewport}
      >
        <Cluster radius={40} extent={512} nodeSize={64} component={ClusterMarker}>
          {points.map(point => (
            <Marker
              key={point.id}
              longitude={point.geometry.coordinates[0]}
              latitude={point.geometry.coordinates[1]}
            >
              <div style={style} />
            </Marker>
          ))}
        </Cluster>
      </MapGL>
    );
  }
}
export default MapTest;
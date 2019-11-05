import React, { Component } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import venueService from "../../services/venueService";


const geojson = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 37.8] } }
  ]
};

export default class MapTest extends Component {

  state = {
    listOfVenues: [],
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
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

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer
            id="point"
            type="circle"
            paint={{
              'circle-radius': 10,
              'circle-color': '#007cbf'
            }} />
        </Source>
      </ReactMapGL>
    );
  }
}





// import React, { Component } from 'react';
// // import {render} from 'react-dom';
// import MapGL, { Source, Layer } from 'react-map-gl';
// import ControlPanel from './control-panel';

// import { dataLayer } from './map-style.js';
// import { updatePercentiles } from './utils';
// import { json as requestJson } from 'd3-request';

// const MAPBOX_TOKEN = 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw'; // Set your mapbox token here

// export default class MapTest extends Component {
//   state = {
//     year: 2015,
//     data: null,
//     hoveredFeature: null,
//     viewport: {
//       latitude: 40,
//       longitude: -100,
//       zoom: 3,
//       bearing: 0,
//       pitch: 0
//     }
//   };

//   componentDidMount() {
//     requestJson('data/us-income.geojson', (error, response) => {
//       if (!error) {
//         this._loadData(response);
//       }
//     });
//   }

//   _loadData = data => {
//     updatePercentiles(data, f => f.properties.income[this.state.year]);
//     this.setState({ data });
//   };

//   _updateSettings = (name, value) => {
//     if (name === 'year') {
//       this.setState({ year: value });

//       const { data } = this.state;
//       if (data) {
//         updatePercentiles(data, f => f.properties.income[value]);
//         // trigger update
//         this.setState({ data: { ...data } });
//       }
//     }
//   };

//   _onViewportChange = viewport => this.setState({ viewport });

//   _onHover = event => {
//     const {
//       features,
//       srcEvent: { offsetX, offsetY }
//     } = event;
//     const hoveredFeature = features && features.find(f => f.layer.id === 'data');

//     this.setState({ hoveredFeature, x: offsetX, y: offsetY });
//   };

//   _renderTooltip() {
//     const { hoveredFeature, x, y } = this.state;

//     return (
//       hoveredFeature && (
//         <div className="tooltip" style={{ left: x, top: y }}>
//           <div>State: {hoveredFeature.properties.name}</div>
//           <div>Median Household Income: {hoveredFeature.properties.value}</div>
//           <div>Percentile: {(hoveredFeature.properties.percentile / 8) * 100}</div>
//         </div>
//       )
//     );
//   }

//   render() {
//     const { viewport, data } = this.state;

//     return (
//       <div style={{ height: '100%' }}>
//         <MapGL
//           {...viewport}
//           width="100%"
//           height="100%"
//           mapStyle="mapbox://styles/mapbox/light-v9"
//           onViewportChange={this._onViewportChange}
//           mapboxApiAccessToken={MAPBOX_TOKEN}
//           onHover={this._onHover}
//         >
//           <Source type="geojson" data={data}>
//             <Layer {...dataLayer} />
//           </Source>
//           {this._renderTooltip()}
//         </MapGL>

//         <ControlPanel
//           containerComponent={this.props.containerComponent}
//           settings={this.state}
//           onChange={this._updateSettings}
//         />
//       </div>
//     );
//   }
// }
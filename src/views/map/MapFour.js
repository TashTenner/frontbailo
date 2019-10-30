// import React, { Component } from "react";
// import ReactMapboxGl, { Layer } from "react-map-gl";
// import { Feature } from "react-mapbox-gl";

// const Map = ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1Ijoic2t5bnVyYWsiLCJhIjoiY2pqdTZydW1rOGtxdTNwczJmdm5henRndiJ9.VKA1MVztPqrirg-ZKBQGsw"
// });

// class Mapz extends Component {
//   state = {
//     viewport: {
//       width: 800,
//       height: 600,
//       latitude: 37.7577,
//       longitude: -122.4376,
//       zoom: 8
//     }
//   };

//   render() {
//     return (
//       <Map
//         style="mapbox://styles/mapbox/dark-v9"
//         containerStyle={{
//           height: "calc(100vh - 130px)",
//           width: "50vw"
//         }}
//         center={[-0.139, 51.518]}
//         zoom={[13]}
//       >
//         <Layer
//           type="circle"
//           id="marker"
//           paint={{
//             "circle-color": "#ff5200",
//             "circle-stroke-width": 1,
//             "circle-stroke-color": "#fff",
//             "circle-stroke-opacity": 1
//           }}
//         >
//           <Feature coordinates={[-0.132, 51.518]} />
//           <Feature coordinates={[-0.142, 51.518]} />
//         </Layer>
//       </Map>
//     );
//   }
// }

// export default Mapz;

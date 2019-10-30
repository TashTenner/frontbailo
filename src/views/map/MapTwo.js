// import React, { Component } from "react";
// import axios from "axios";
// import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";

// class MapTwo extends Component {
//   constructor() {
//     super();
//     this.state = {
//       listOfVenues: [],
//       viewport: {
//         width: 400,
//         height: 400,
//         latitude: 37.7577,
//         longitude: 122.4376,
//         zoom: 3
//       }
//     };
//   }

//   componentDidMount() {
//     axios.get("http://localhost:3001/api/venues").then(response => {
//       this.setState({ listOfVenues: response.data });
//     });
//   }

//   // _renderCityMarker = (venue, index) => {
//   //   return (
//   //     <Marker
//   //       key={`marker-${index}`}
//   //       longitude={venue.coordinates.lng}
//   //       latitude={venue.coordinates.lat}
//   //     >
//   //       {/* <CityPin size={20} onClick={() => this.setState({ popupInfo: city })} /> */}
//   //     </Marker>
//   //   );
//   // };

//   // renderPopup(index) {
//   //   return (
//   //     this.state.popupInfo && (
//   //       <Popup
//   //         tipSize={5}
//   //         anchor="bottom-right"
//   //         longitude={markerList[index].long}
//   //         latitude={markerList[index].lat}
//   //         onMouseLeave={() => this.setState({ popupInfo: null })}
//   //         closeOnClick={true}
//   //       >
//   //         <p>
//   //           <strong>{markerList[index].name}</strong>
//   //           <br />
//   //           Available beds:{markerList[index].info}
//   //         </p>
//   //       </Popup>
//   //     )
//   //   );
//   // }

//   renderPopup(index) {
//     return (
//       this.state.popupInfo && (
//         <Popup
//           tipSize={5}
//           anchor="bottom-right"
//           // longitude={venue.coordinates.lng}
//           // longitude={markerList[index].long}
//           // latitude={venue.coordinates.lat}

//           // onMouseLeave={() => this.setState({ popupInfo: null })}
//           // closeOnClick={true}
//         >
//           {/* <p>
//             <strong>{markerList[index].name}</strong>
//             <br />
//             Available beds:{markerList[index].info}
//           </p> */}
//         </Popup>
//       )
//     );
//   }

//   render() {
//     return (
//       <ReactMapGL
//         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         {...this.state.viewport}
//         onViewportChange={viewport => this.setState({ viewport })}
//       >
//         {this.state.listOfVenues.map(this._renderCityMarker)}
//         {/* {CITIES.map(this._renderCityMarker)}

//         {this.state.listOfVenues.map(venue => {
//           return (
//             <div key={venue._id}>
//               <Link to={`/venues/${venue._id}`}>
//                 <h3>{venue.name}</h3>
//               </Link>
//             </div>
//           );
//         })} */}
//         <div>
//           }>
//           <NavigationControl
//             onViewportChange={viewport => this.setState({ viewport })}
//           />
//         </div>
//       </ReactMapGL>
//     );
//   }
// }

// export default MapTwo;

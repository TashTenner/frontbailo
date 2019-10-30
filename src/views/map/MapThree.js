import React, { Component } from "react";
import MapGL, { NavigationControl, Marker } from "react-map-gl";

import axios from "axios";
import CityPin from "./City-pen";

class MapThree extends Component {
  state = {
    listOfVenues: [],
    viewport: {
      width: 800,
      height: 800,
      latitude: 41.401456,
      longitude: 2.161712,
      zoom: 8
    }
  };

  componentDidMount() {
    axios.get("http://localhost:3001/api/venues").then(response => {
      this.setState({ listOfVenues: response.data });
      console.log(this.state.listOfVenues);
    });
  }

  // renderPopup(index) {
  //   return (
  //     this.state.popupInfo && (
  //       <Popup
  //         tipSize={5}
  //         anchor="bottom-right"
  //         longitude={markerList[index].long}
  //         latitude={markerList[index].lat}
  //         onMouseLeave={() => this.setState({ popupInfo: null })}
  //         closeOnClick={true}
  //       >
  //         <p>
  //           <strong>{markerList[index].name}</strong>
  //           <br />
  //           Available beds:{markerList[index].info}
  //         </p>
  //       </Popup>
  //     )
  //   );
  // }

  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <div>
          <NavigationControl
            onViewportChange={viewport => this.setState({ viewport })}
          />
          {this.state.listOfVenues.length > 0 &&
            this.state.listOfVenues.map(venue => {
              return (
                <div key={venue._id}>
                  <Marker
                    longitude={venue.coordinates.lng}
                    latitude={venue.coordinates.lat}
                  >
                    <CityPin
                      size={20}
                      // onClick={() => this.setState({ popupInfo: city })}
                    />
                  </Marker>
                </div>
              );
            })}
        </div>
      </MapGL>
    );
  }
}

export default MapThree;

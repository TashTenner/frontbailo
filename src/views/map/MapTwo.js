import React, { Component } from "react";
import axios from "axios";
import ReactMapGL, { Marker } from "react-map-gl";

class MapTwo extends Component {
  constructor() {
    super();
    this.state = {
      listOfVenues: [],
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: 122.4376,
        zoom: 3
      }
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/venues").then(response => {
      this.setState({ listOfVenues: response.data });
    });
  }

  _renderCityMarker = (venue, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={venue.coordinates.lng}
        latitude={venue.coordinates.lat}
      >
        {/* <CityPin size={20} onClick={() => this.setState({ popupInfo: city })} /> */}
      </Marker>
    );
  };

  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {this.state.listOfVenues.map(this._renderCityMarker)}
        {/* {CITIES.map(this._renderCityMarker)}

        {this.state.listOfVenues.map(venue => {
          return (
            <div key={venue._id}>
              <Link to={`/venues/${venue._id}`}>
                <h3>{venue.name}</h3>
              </Link>
            </div>
          );
        })} */}
      </ReactMapGL>
    );
  }
}

export default MapTwo;

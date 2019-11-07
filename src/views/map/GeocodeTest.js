import React, { Component } from "react";

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
  accessToken: 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw'
});

class GeocodeTest extends Component {
  state = {
    input: "",
    outputONE: "",
    outputTwo: ""
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
    geocodingClient
      .forwardGeocode({ query: this.state.input, autocomplete: true, types: ["country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi", "poi.landmark"] })
      .send()
      .then(response => {
        const match = response.body;
        this.setState({
          outputONE: match.features[1].geometry.coordinates[1],
          outputTwo: match.features[1].geometry.coordinates[0],
        })
      });
  }

  render() {
    return (
      <div>
        <h2>city</h2>
        <input id='autocomplete' onChange={this.onInputChange} name='city' type="text" placeholder='test' />
        <input value={this.state.outputONE} />
        <input value={this.state.outputTwo} />
      </div>
    );
  }
}

export default GeocodeTest;

import React, { Component } from "react";
import { withAuth } from '../../../Context/AuthContext';
import schoolService from "../../../services/schoolService";

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
  accessToken: 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw'
});

class AddSchool extends Component {
  state = {
    school: {}
  };

  handleChange = event => {
    if (event.target.type === "text") {
      this.setState(
        { [event.target.name]: event.target.value });
    } else if (event.target.type === "date") {
      this.setState(
        { [event.target.name]: new Date(event.target.value).toISOString() });
    } else if (event.target.type === "time") {
      this.setState(
        { [event.target.name]: event.target.value });
    }
  };

  handleChangeMapbox = e => {
    this.setState(
      { address: e.target.value }
    );
    if (this.state.address) {
      geocodingClient
        .forwardGeocode({ query: this.state.address, autocomplete: true, types: ["country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi", "poi.landmark"] })
        .send()
        .then(response => {
          const match = response.body;
          this.setState({
            coordinates: [match.features[1].geometry.coordinates[0], match.features[1].geometry.coordinates[1]]
          })
        });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const school = {
      geometry: {
        coordinates: [this.state.lng, this.state.lat]
      },
      properties: {
        name: this.state.name,
        address: this.state.address,
        phoneNr: this.state.phoneNr,
        mail: this.state.mail,
        website: this.state.website,
      }
    };
    schoolService
      .createSchool(school);
  };

  render() {
    const {
      school: {
        name,
        address,
        phoneNr,
        mail,
        website,
      }
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>New school:</div>
        <label>lng:</label>
        <input
          type="number"
          step="0.00000001"
          name="lng"
          value={this.state.coordinates && this.state.coordinates[0]}
          onChange={this.handleChange}
        />
        <label>lat:</label>
        <input
          type="number"
          step="0.00000001"
          name="lat"
          value={this.state.coordinates && this.state.coordinates[1]}
          onChange={this.handleChange}
        />
        <label>name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <label>address:</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={this.handleChangeMapbox}
        />
        <label>phoneNr:</label>
        <input
          type="text"
          name="phoneNr"
          value={phoneNr}
          onChange={this.handleChange}
        />
        <label>mail:</label>
        <input
          type="text"
          name="mail"
          value={mail}
          onChange={this.handleChange}
        />
        <label>website:</label>
        <input
          type="text"
          name="website"
          value={website}
          onChange={this.handleChange}
        />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default withAuth(AddSchool);
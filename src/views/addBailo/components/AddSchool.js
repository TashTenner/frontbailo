import React, { Component } from "react";
import { withAuth } from '../../../Context/AuthContext';
import schoolService from "../../../services/schoolService";
import { FormGroup, Input, Message, InputButton } from "../Form";

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
      <FormGroup>
        <form onSubmit={this.handleSubmit}>
          <Message>New school:</Message>
          <FormGroup>
            <Input
              type="text"
              name="name"
              placeholder="name"
              value={name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="address"
              placeholder="address"
              value={address}
              onChange={this.handleChangeMapbox}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              step="0.00000001"
              name="lng"
              placeholder="longitud"
              value={this.state.coordinates && this.state.coordinates[0]}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              step="0.00000001"
              name="lat"
              placeholder="latitude"
              value={this.state.coordinates && this.state.coordinates[1]}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="phoneNr"
              placeholder="phoneNr"
              value={phoneNr}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="mail"
              placeholder="mail"
              value={mail}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="website"
              placeholder="website"
              value={website}
              onChange={this.handleChange}
            />
          </FormGroup>
          <InputButton type="submit" value="Add" />
        </form>
      </FormGroup>
    );
  }
}

export default withAuth(AddSchool);
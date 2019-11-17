import React, { Component } from "react";
import { withAuth } from '../../../Context/AuthContext';
import venueService from "../../../services/venueService";
import { FormGroup, Input, Message, InputButton } from "../Form";

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
  accessToken: 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw'
});

class AddVenue extends Component {
  state = {
    venue: {}
  };

  handleChange = event => {
    if (event.target.type === "text") {
      this.setState(
        { [event.target.name]: event.target.value });
    } else if (event.target.type === "number") {
      this.setState(
        { [event.target.name]: parseFloat(event.target.value) });
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
        .forwardGeocode({ query: this.state.address })
        .send()
        .then(response => {
          const match = response.body;
          this.setState({
            coordinates: [match.features[0].geometry.coordinates[0], match.features[0].geometry.coordinates[1]]
          })
        });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { history: { push } } = this.props;
    const venue = {
      geometry: {
        coordinates: [this.state.coordinates[0], this.state.coordinates[1]]
      },
      properties: {
        name: this.state.name,
        address: this.state.address,
        date: this.state.date,
        frequency: this.state.frequency,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        price: this.state.price,
        phoneNr: this.state.phoneNr,
        mail: this.state.mail,
        website: this.state.website,
      }
    };
    venueService
      .createVenue(venue)
      .then(() => { push(`/`); })
  };

  render() {
    const {
      venue: {
        name,
        address,
        date,
        frequency,
        startTime,
        endTime,
        price,
        phoneNr,
        mail,
        website,
      }
    } = this.state;
    return (
      <FormGroup>
        <form onSubmit={this.handleSubmit}>
          <Message>New venue:</Message>
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
              step="0.00000000001"
              name="lng"
              placeholder="longitud"
              value={this.state.coordinates && this.state.coordinates[0]}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              step="0.00000000001"
              name="lat"
              placeholder="latitude"
              value={this.state.coordinates && this.state.coordinates[1]}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="date"
              name="date"
              placeholder="date"
              value={date}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="frequency"
              placeholder="frequency"
              value={frequency}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="time"
              name="startTime"
              placeholder="startTime"
              value={startTime}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="time"
              name="endTime"
              placeholder="endTime"
              value={endTime}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="price"
              placeholder="price"
              value={price}
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

export default withAuth(AddVenue);
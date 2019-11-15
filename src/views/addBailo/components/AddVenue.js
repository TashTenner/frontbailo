import React, { Component } from "react";
import { withAuth } from '../../../Context/AuthContext';
import venueService from "../../../services/venueService";

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
      .then(res => console.log(res.data))
      .then(console.log("hola3"));
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
      <form onSubmit={this.handleSubmit}>
        <div>New venue:</div>
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
        <label>date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={this.handleChange}
        />
        <label>frequency:</label>
        <input
          type="text"
          name="frequency"
          value={frequency}
          onChange={this.handleChange}
        />
        <label>startTime:</label>
        <input
          type="time"
          name="startTime"
          value={startTime}
          onChange={this.handleChange}
        />
        <label>endTime:</label>
        <input
          type="time"
          name="endTime"
          value={endTime}
          onChange={this.handleChange}
        />
        <label>price:</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={this.handleChange}
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

export default withAuth(AddVenue);
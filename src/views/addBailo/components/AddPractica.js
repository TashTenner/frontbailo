import React, { Component } from "react";
import { withAuth } from '../../../Context/AuthContext';

import practicaService from "../../../services/practicaService";

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
  accessToken: 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw'
});

class AddPractica extends Component {
  state = {
    practica: {}
  };

  handleChange = event => {
    if (event.target.type === "text") {
      this.setState(
        {
          [event.target.name]: event.target.value
        },
        () => console.log(this.state)
      );
    } else if (event.target.type === "number") {
      this.setState(
        {
          [event.target.name]: parseFloat(event.target.value)
        },
        () => console.log(this.state)
      );
    } else if (event.target.type === "date") {
      this.setState(
        {
          [event.target.name]: new Date(event.target.value).toISOString()
        },
        () => console.log(this.state)
      );
    } else if (event.target.type === "time") {
      this.setState(
        {
          [event.target.name]: event.target.value
        },
        () => console.log(this.state)
      );
    }
  };

  handleChangeMapbox = e => {
    this.setState(
      {
        address: e.target.value
      },
      () => console.log(this.state.address));
    if (this.state.address) {
      geocodingClient
        .forwardGeocode({ query: this.state.address, autocomplete: true, types: ["country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi", "poi.landmark"] })
        .send()
        .then(response => {
          const match = response.body;
          this.setState({
            coordinates: [match.features[1].geometry.coordinates[0], match.features[1].geometry.coordinates[1]]
          }, () => console.log(this.state.coordinates))
        });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("hola1");
    const practica = {
      // type: this.state.typeFeature,
      geometry: {
        // type: this.state.typeGeometry,
        coordinates: [this.state.coordinates[0], this.state.coordinates[1]]
      },
      properties: {
        name: this.state.name,
        address: this.state.address,
        // mapOption: this.state.mapOption,
        date: this.state.date,
        frequency: this.state.frequency,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        price: this.state.price,
        phoneNr: this.state.phoneNr,
        mail: this.state.mail,
        website: this.state.website,
        // nameOrganizer: this.state.nameOrganizer,
        // mainPhoto: this.state.mainPhoto,
        // rating: this.state.rating,
        // creator: this.state.creator,
        // status: this.state.status
      }
    };
    console.log("hola2");

    practicaService
      .createPractica(practica)
      .then(res => console.log(res.data))
      .then(console.log("hola3"));
  };

  render() {
    const {
      practica: {
        // typeFeature,
        // typeGeometry,
        // lng,
        // lat,
        name,
        address,
        // mapOption,
        date,
        frequency,
        startTime,
        endTime,
        price,
        phoneNr,
        mail,
        website,
        // nameOrganizer,
        // mainPhoto,
        // rating,
        // creator,
        // status
      }
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>New practica:</div>
        <br></br>
        <label>lng:</label>
        <input
          type="number"
          step="0.00000001"
          name="lng"
          value={this.state.coordinates && this.state.coordinates[0]}
          onChange={this.handleChange}
        />
        <br></br>
        <label>lat:</label>
        <input
          type="number"
          step="0.00000001"
          name="lat"
          value={this.state.coordinates && this.state.coordinates[1]}
          onChange={this.handleChange}
        />
        <br></br>
        <label>name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <br></br>
        <label>address:</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={this.handleChangeMapbox}
        />
        {/* <br></br>
        <label>mapOption:</label>
        <input
          type="text"
          name="mapOption"
          value={mapOption}
          onChange={this.handleChange}
        /> */}
        <br></br>
        <label>date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={this.handleChange}
        />
        <br></br>
        <label>frequency:</label>
        <input
          type="text"
          name="frequency"
          value={frequency}
          onChange={this.handleChange}
        />
        <br></br>
        <label>startTime:</label>
        <input
          type="time"
          name="startTime"
          value={startTime}
          onChange={this.handleChange}
        />
        <br></br>
        <label>endTime:</label>
        <input
          type="time"
          name="endTime"
          value={endTime}
          onChange={this.handleChange}
        />
        <br></br>
        <label>price:</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={this.handleChange}
        />
        <br></br>
        <label>phoneNr:</label>
        <input
          type="text"
          name="phoneNr"
          value={phoneNr}
          onChange={this.handleChange}
        />
        <br></br>
        <label>mail:</label>
        <input
          type="text"
          name="mail"
          value={mail}
          onChange={this.handleChange}
        />
        <br></br>
        <label>website:</label>
        <input
          type="text"
          name="website"
          value={website}
          onChange={this.handleChange}
        />
        {/* <br></br>
        <label>nameOrganizer:</label>
        <input
          type="text"
          name="nameOrganizer"
          value={nameOrganizer}
          onChange={this.handleChange}
        />
        <br></br>
        <label>mainPhoto:</label>
        <input
          type="text"
          name="mainPhoto"
          value={mainPhoto}
          onChange={this.handleChange}
        />
        <br></br>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={this.handleChange}
        />
        <br></br> */}
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default withAuth(AddPractica);
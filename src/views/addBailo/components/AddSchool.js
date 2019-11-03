import React, { Component } from "react";
import schoolService from "../../../services/schoolService";

export default class AddSchool extends Component {
  state = {
    school: {}
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

  handleSubmit = event => {
    event.preventDefault();
    console.log("hola1");
    const school = {
      type: this.state.typeFeature,
      geometry: {
        type: this.state.typeGeometry,
        coordinates: [this.state.lng, this.state.lat]
      },
      properties: {
        name: this.state.name,
        address: this.state.address,
        // mapOption: this.state.mapOption,
        phoneNr: this.state.phoneNr,
        mail: this.state.mail,
        website: this.state.website,
        nameOrganizer: this.state.nameOrganizer,
        mainPhoto: this.state.mainPhoto,
        rating: this.state.rating,
        creator: this.state.creator,
        status: this.state.status
      }
    };
    console.log("hola2");

    schoolService
      .createSchool(school)
      .then(res => console.log(res.data))
      .then(console.log("hola3"));
  };

  render() {
    const {
      school: {
        typeFeature,
        typeGeometry,
        lng,
        lat,
        name,
        address,
        // mapOption,
        phoneNr,
        mail,
        website,
        nameOrganizer,
        mainPhoto,
        rating,
        creator,
        status
      }
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>New school:</div>
        <br></br>
        <label>typeFeature:</label>
        <input
          type="text"
          name="typeFeature"
          value={typeFeature}
          onChange={this.handleChange}
        />
        <br></br>
        <label>typeGeometry:</label>
        <input
          type="text"
          name="typeGeometry"
          value={typeGeometry}
          onChange={this.handleChange}
        />
        <br></br>
        <label>lng:</label>
        <input
          type="number"
          step="0.000001"
          name="lng"
          value={lng}
          onChange={this.handleChange}
        />
        <br></br>
        <label>lat:</label>
        <input
          type="number"
          step="0.000001"
          name="lat"
          value={lat}
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
          onChange={this.handleChange}
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
        <br></br>
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
        <br></br>
        <label>creator:</label>
        <input
          type="text"
          name="creator"
          value={creator}
          onChange={this.handleChange}
        />
        <br></br>
        <label>status:</label>
        <input
          type="text"
          name="status"
          value={status}
          onChange={this.handleChange}
        />
        <br></br>
        <input type="submit" value="Add" />
      </form>
    );
  }
}

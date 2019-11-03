import React, { Component } from "react";
import venueService from "../../../services/venueService";

class EditVenue extends Component {
  state = {
    venue: {},
    loading: true
    // message: undefined
  };

  async componentDidMount() {
    console.log("hola1");
    const {
      match: {
        params: { id }
      }
    } = this.props;
    console.log(this.props);
    console.log(id);
    try {
      const venue = await venueService.getVenueById(id);
      this.setState({
        venue,
        loading: false
      });
      console.log(venue);
      console.log(this.state);
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false
      });
    }
  }

  // handleChange = event => {
  //   const { venue } = this.state;
  //   if (event.target.type === "text") {
  //     this.setState({
  //       venue: {
  //         ...venue,
  //         [event.target.name]: event.target.value
  //       }
  //     });
  //   } else if (event.target.type === "number") {
  //     this.setState({
  //       venue: {
  //         ...venue,
  //         [event.target.name]: parseFloat(event.target.value)
  //       }
  //     });
  //   } else if (event.target.type === "date") {
  //     this.setState({
  //       venue: {
  //         ...venue,
  //         [event.target.name]: new Date(event.target.value).toISOString()
  //       }
  //     });
  //   } else if (event.target.type === "time") {
  //     this.setState({
  //       venue: {
  //         ...venue,
  //         [event.target.name]: event.target.value
  //       }
  //     });
  //   }
  // };

  handleChange = e => {
    const { venue } = this.state;
    this.setState({
      venue: {
        ...venue,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { venue } = this.state;
    const {
      history: { push }
    } = this.props;
    console.log(venue);
    venueService
      .updateBook(venue)
      .then(() => {
        // this.setState({
        //   message: 'book updated',
        // })
        push(`/venues/${venue._id}/edit`);
      })
      .catch(() => {});
  };

  render() {
    const {
      venue: {
        typeFeature,
        typeGeometry,
        lng,
        lat,
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
        nameOrganizer,
        mainPhoto,
        rating,
        creator,
        status
      },
      loading
      // message
    } = this.state;
    console.log(this.state);
    console.log(this.state.venue.properties);

    return (
      <div>
        Hi admin, keen to edit this venue?
        {/* {message && <div>{message}</div>} */}
        {loading && <div>Loading...</div>}
        {!loading && this.state.venue.length > 0 && (
          <>
            <form onSubmit={this.handleSubmit}>
              <br></br>
              <label>typeFeature:</label>
              <input
                type="text"
                name="typeFeature"
                id="typeFeature"
                value={typeFeature}
                onChange={this.handleChange}
              />
              <br></br>
              <label>typeGeometry:</label>
              <input
                type="text"
                name="typeGeometry"
                id="typeGeometry"
                value={typeGeometry}
                onChange={this.handleChange}
              />
              <br></br>
              <label>lng:</label>
              <input
                type="number"
                step="0.000001"
                name="lng"
                id="lng"
                value={lng}
                onChange={this.handleChange}
              />
              <br></br>
              <label>lat:</label>
              <input
                type="number"
                step="0.000001"
                name="lat"
                id="lat"
                value={lat}
                onChange={this.handleChange}
              />
              <br></br>
              <label>name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange}
              />
              <br></br>
              <label>address:</label>
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={this.handleChange}
              />
              {/* <br></br>
              <label>mapOption:</label>
              <input
                type="text"
                name="mapOption"
                id="mapOption"
                value={mapOption}
                onChange={this.handleChange}
              /> */}
              <br></br>
              <label>date:</label>
              <input
                type="date"
                name="date"
                id="date"
                value={date}
                onChange={this.handleChange}
              />
              <br></br>
              <label>frequency:</label>
              <input
                type="text"
                name="frequency"
                id="frequency"
                value={frequency}
                onChange={this.handleChange}
              />
              <br></br>
              <label>startTime:</label>
              <input
                type="time"
                name="startTime"
                id="startTime"
                value={startTime}
                onChange={this.handleChange}
              />
              <br></br>
              <label>endTime:</label>
              <input
                type="time"
                name="endTime"
                id="endTime"
                value={endTime}
                onChange={this.handleChange}
              />
              <br></br>
              <label>price:</label>
              <input
                type="text"
                name="price"
                id="price"
                value={price}
                onChange={this.handleChange}
              />
              <br></br>
              <label>phoneNr:</label>
              <input
                type="text"
                name="phoneNr"
                id="phoneNr"
                value={phoneNr}
                onChange={this.handleChange}
              />
              <br></br>
              <label>mail:</label>
              <input
                type="text"
                name="mail"
                id="mail"
                value={mail}
                onChange={this.handleChange}
              />
              <br></br>
              <label>website:</label>
              <input
                type="text"
                name="website"
                id="website"
                value={website}
                onChange={this.handleChange}
              />
              <br></br>
              <label>nameOrganizer:</label>
              <input
                type="text"
                name="nameOrganizer"
                id="nameOrganizer"
                value={nameOrganizer}
                onChange={this.handleChange}
              />
              <br></br>
              <label>mainPhoto:</label>
              <input
                type="text"
                name="mainPhoto"
                id="mainPhoto"
                value={mainPhoto}
                onChange={this.handleChange}
              />
              <br></br>
              <label>Rating:</label>
              <input
                type="number"
                name="rating"
                id="rating"
                value={rating}
                onChange={this.handleChange}
              />
              <br></br>
              <label>creator:</label>
              <input
                type="text"
                name="creator"
                id="creator"
                value={creator}
                onChange={this.handleChange}
              />
              <br></br>
              <label>status:</label>
              <input
                type="text"
                name="status"
                id="status"
                value={status}
                onChange={this.handleChange}
              />
              <br></br>
              <input type="submit" value="Update" />
            </form>
          </>
        )}
      </div>
    );
  }
}

export default EditVenue;

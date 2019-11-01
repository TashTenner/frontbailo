import React, { Component } from "react";
import venueService from "../../../services/venueService";

export default class AddVenue extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    // this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      rating: 0
      // address: {
      //   street: "",
      //   number: 0,
      //   additionalInfo: "",
      //   postcode: "",
      //   city: "",
      //   country: ""
      // }
    };
  }
  onChangeName(e) {
    console.log(e.target.value);
    this.setState({
      name: e.target.value
    });
  }

  onChangeRating(e) {
    console.log(e.target.value);
    this.setState({
      rating: e.target.value
    });
  }

  // onChangeAddress(e) {
  //   console.log(e.target.value);
  //   this.setState({
  //     address: {
  //       street: e.target.value,
  //       number: e.target.value,
  //       additionalInfo: e.target.value,
  //       postcode: e.target.value,
  //       city: e.target.value,
  //       country: e.target.value
  //     }
  //   });
  // }

  async onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      rating: this.state.rating
    };
    // console.log("OBJECT TO SEND: ", obj);
    const newVenue = await venueService.createVenue(obj);
    this.setState({
      name: newVenue.name,
      rating: newVenue.rating
      // address: {
      //   street: newVenue.address.street,
      //   number: newVenue.address.number,
      //   additionalInfo: newVenue.address.additionalInfo,
      //   postcode: newVenue.address.postcode,
      //   city: newVenue.address.city,
      //   country: newVenue.address.country
      // }
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Add New Venue</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Rating: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.rating}
              onChange={this.onChangeRating}
            />
          </div>
          {/* <div className="form-group">
            <label>Address: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div> */}
          <div className="form-group">
            <input
              type="submit"
              value="Add Venue"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

// import React, { Component } from "react";
// import axios from "axios";

// class BookAdd extends Component {
//   state = {
//     book: {}
//   };

//   handleChange = event => {
//     this.setState(
//       {
//         [event.target.name]:
//           event.target.type === "number"
//             ? parseInt(event.target.value)
//             : event.target.value
//       },
//       () => console.log(this.state)
//     );
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     console.log("hola1");

//     const book = {
//       name: this.state.name,
//       author: this.state.author,
//       description: this.state.description,
//       rating: this.state.rating
//     };
//     console.log("hola2");
//     axios
//       .post(`http://localhost:3000/api/books/`, { book })
//       .then(res => console.log(res.data))
//       .then(console.log("hola3"));
//   };

//   render() {
//     const {
//       book: { name, author, description, rating }
//     } = this.state;
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div>New book:</div>
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={name}
//           onChange={this.handleChange}
//         />
//         <label>Author:</label>
//         <input
//           type="text"
//           name="author"
//           value={author}
//           onChange={this.handleChange}
//         />
//         <label>Description:</label>
//         <input
//           type="text"
//           name="description"
//           value={description}
//           onChange={this.handleChange}
//         />
//         <label>Rating:</label>
//         <input
//           type="number"
//           name="rating"
//           value={rating}
//           onChange={this.handleChange}
//         />
//         <input type="submit" value="Add" />
//       </form>
//     );
//   }
// }

// export default BookAdd;

// create.component.js

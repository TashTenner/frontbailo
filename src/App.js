import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import MapTwo from "./views/map/MapTwo";

class App extends Component {
  constructor() {
    super();
    this.state = { listOfVenues: [] };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/venues").then(response => {
      this.setState({ listOfVenues: response.data });
      console.log(response.data);
    });
  }

  // then(json => this.state({ goods: json.goods }))

  render() {
    console.log("render App");
    return (
      <div>
        <div></div>
        <div>
          {this.state.listOfVenues.map(venue => {
            return (
              <div key={venue._id}>
                <Link to={`/venues/${venue._id}`}>
                  <h3>{venue.name}</h3>
                </Link>
                {/* <p>{venue.coordinates.lng}</p> */}
              </div>
            );
          })}
        </div>
        {/* <MapTwo /> */}
      </div>
    );
  }
}

export default App;

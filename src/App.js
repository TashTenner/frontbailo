import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import MapTwo from "./views/map/MapTwo";

class App extends Component {
  state = { listOfVenues: [] };

  componentDidMount() {
    axios.get("http://localhost:3001/api/venues").then(response => {
      this.setState({ listOfVenues: response.data });
      console.log(this.state.listOfVenues);
    });
  }

  // then(json => this.state({ goods: json.goods }))

  render() {
    // console.log(this.state.listOfVenues.listOfVenues);
    return (
      <div>
        <div>
          {this.state.listOfVenues.length > 0 &&
            this.state.listOfVenues.map(venue => {
              console.log("VENUE: ", venue);
              return (
                <div key={venue._id}>
                  <Link to={`/venues/${venue._id}`}>
                    <h3>{venue.dayOfWeek}</h3>
                    {venue.coordinates ? <p>{venue.coordinates.lat}</p> : null}
                  </Link>
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

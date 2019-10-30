import React, { Component } from "react";
import "./App.css";
import MapHome from "./views/map/MapHome";
// import About from "./components/About";

// import Navbar from "./components/Navbar";

// import Projects from "./components/Projects";
// import { projects as Projects } from "./components/Projects";
// import ProjectDetails from "./components/ProjectDetails";

// import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <MapHome />
      </div>
      // <div className="App">
      //   <Navbar />
      //   <Switch>
      //     <Route exact path="/" component={Home} />
      //     <Route path="/about" component={About} />
      //     <Route exact path="/projects" component={Projects} />
      //     <Route exact path="/projects/:id" component={ProjectDetails} />
      //   </Switch>
      // </div>
    );
  }
}

export default App;

// import React, { Component } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// // import MapTwo from "./views/map/MapTwo";
// import MapThree from "./views/map/MapThree";
// // import Mapz from "./views/map/MapFour";
// // import CityPin from "./views/map/City-pen";

// class App extends Component {
//   state = { listOfVenues: [] };

//   componentDidMount() {
//     axios.get("http://localhost:3001/api/venues").then(response => {
//       this.setState({ listOfVenues: response.data });
//       console.log(this.state.listOfVenues);
//     });
//   }

//   render() {
//     // console.log(this.state.listOfVenues.listOfVenues);
//     return (
//       <div>
//         <div>
//           {this.state.listOfVenues.length > 0 &&
//             this.state.listOfVenues.map(venue => {
//               console.log("VENUE: ", venue);
//               return (
//                 <div key={venue._id}>
//                   <Link to={`/venues/${venue._id}`}>
//                     <h3>{venue.dayOfWeek}</h3>
//                     {venue.coordinates ? <p>{venue.coordinates.lat}</p> : null}
//                     {venue.coordinates ? <p>{venue.coordinates.lng}</p> : null}
//                   </Link>
//                 </div>
//               );
//             })}
//         </div>
//         <MapThree />
//       </div>
//     );
//   }
// }

// export default App;

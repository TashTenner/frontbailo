import React, { Component } from "react";
import "./App.css";
import Navbar from "./views/Navbar";
import MapHome from "./views/map/MapHome";
import MyBailo from "./views/myBailo/MyBailo";
import AddBailo from "./views/addBailo/AddBailo";
import AddVenue from "./views/addBailo/components/AddVenue";
import AddSchool from "./views/addBailo/components/AddSchool";
import VenueLongDetail from "./views/map/venues/VenueLongDetail";
import EditVenue from "./views/map/venues/EditVenue";
import WhatsNext from "./views/whatsNext/WhatsNext";
import MenuBailo from "./views/menuBailo/MenuBailo";

import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={MapHome} />
          <Route exact path="/mybailo" component={MyBailo} />
          <Route exact path="/add" component={AddBailo} />
          <Route exact path="/add/venue" component={AddVenue} />
          <Route exact path="/add/school" component={AddSchool} />
          <Route exact path="/venues/:id" component={VenueLongDetail} />
          <Route exact path="/admin/venues/:id/edit" component={EditVenue} />
          <Route exact path="/whatsnext" component={WhatsNext} />
          <Route exact path="/menu" component={MenuBailo} />
        </Switch>
      </div>
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

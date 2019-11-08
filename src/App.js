import React, { Component } from "react";
import "./App.css";
import Navbar from "./views/Navbar";
import MapHome from "./views/map/MapHome";
import MyBailo from "./views/myBailo/MyBailo";
import AddBailo from "./views/addBailo/AddBailo";
import AddVenue from "./views/addBailo/components/AddVenue";
import AddSchool from "./views/addBailo/components/AddSchool";
import VenueLongDetail from "./views/map/venues/VenueLongDetail";
import SchoolLongDetail from "./views/map/schools/SchoolLongDetail";
import EditVenue from "./views/map/venues/EditVenue";
import WhatsNext from "./views/whatsNext/WhatsNext";
import MenuBailo from "./views/menuBailo/MenuBailo";

import MapTest from "./views/map/MapTest";
import GeocodeTest from "./views/map/GeocodeTest";

import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import AnotherTest from "./views/map/AnotherTest";

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';


class App extends Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <div className="App">
        <Router>
          <button onClick={handleLogout}>logout</button>
          <AnonRoute component={Navbar} />
          {/* <Navbar /> */}

          <Switch>
            <AnonRoute exact path="/login" component={Login} />
            <AnonRoute exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/private" component={PrivateView} />

            <AnonRoute exact path="/" component={MapHome} />
            <AnonRoute exact path="/mybailo" component={MyBailo} />
            <AnonRoute exact path="/add" component={AddBailo} />
            <PrivateRoute exact path="/add/venue" component={AddVenue} />
            <PrivateRoute exact path="/add/school" component={AddSchool} />
            <AnonRoute exact path="/venues/:id" component={VenueLongDetail} />
            <AnonRoute exact path="/schools/:id" component={SchoolLongDetail} />
            {/* http://localhost:3000/schools/5dbf226f4465c600177b2bc1 */}
            <PrivateRoute exact path="/admin/venues/:id/edit" component={EditVenue} />
            <AnonRoute exact path="/whatsnext" component={WhatsNext} />
            <AnonRoute exact path="/menu" component={MenuBailo} />

            <AnonRoute exact path="/test" component={MapTest} />
            <AnonRoute exact path="/geocodetest" component={GeocodeTest} />
            <AnonRoute exact path="/anothertest" component={AnotherTest} />

          </Switch>

        </Router>
        {/* <Navbar /> */}
        {/* <Switch> */}
        {/* <Route exact path="/" component={MapHome} />
          <Route exact path="/mybailo" component={MyBailo} />
          <Route exact path="/add" component={AddBailo} />
          <Route exact path="/add/venue" component={AddVenue} />
          <Route exact path="/add/school" component={AddSchool} />
          <Route exact path="/venues/:id" component={VenueLongDetail} />
          <Route exact path="/schools/:id" component={SchoolLongDetail} /> */}
        {/* http://localhost:3000/schools/5dbf226f4465c600177b2bc1 */}
        {/* <Route exact path="/admin/venues/:id/edit" component={EditVenue} />
          <Route exact path="/whatsnext" component={WhatsNext} />
          <Route exact path="/menu" component={MenuBailo} />

          <Route exact path="/test" component={MapTest} />
          <Route exact path="/geocodetest" component={GeocodeTest} />
          <Route exact path="/anothertest" component={AnotherTest} /> */}
        {/* </Switch> */}
      </div>
    );
  }
}

export default withAuth(App);






// import React, {Component} from "react";
        // import axios from "axios";
// import {Link} from "react-router-dom";
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

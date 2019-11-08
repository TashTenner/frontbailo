import React, { Component } from "react";
import "./App.css";
import Navbar from "./views/Navbar";
import MapHome from "./views/map/MapHome";
import MyBailo from "./views/myBailo/MyBailo";
import AddBailo from "./views/addBailo/AddBailo";
import AddVenue from "./views/addBailo/components/AddVenue";
import AddPractica from "./views/addBailo/components/AddPractica";
import AddSchool from "./views/addBailo/components/AddSchool";
import VenueLongDetail from "./views/map/venues/VenueLongDetail";
import PracticaLongDetail from "./views/map/practicas/PracticaLongDetail";
import SchoolLongDetail from "./views/map/schools/SchoolLongDetail";
import EditVenue from "./views/map/venues/EditVenue";
import EditPractica from "./views/map/practicas/EditPractica";
import EditSchool from "./views/map/schools/EditSchool";

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
            <PrivateRoute exact path="/add/practica" component={AddPractica} />
            <PrivateRoute exact path="/add/school" component={AddSchool} />

            <AnonRoute exact path="/venues/:id" component={VenueLongDetail} />
            <AnonRoute exact path="/practicas/:id" component={PracticaLongDetail} />
            <AnonRoute exact path="/schools/:id" component={SchoolLongDetail} />
            {/* http://localhost:3000/schools/5dbf226f4465c600177b2bc1 */}

            <PrivateRoute exact path="/admin/venues/:id/edit" component={EditVenue} />
            <PrivateRoute exact path="/admin/practicas/:id/edit" component={EditPractica} />
            <PrivateRoute exact path="/admin/schools/:id/edit" component={EditSchool} />

            <AnonRoute exact path="/whatsnext" component={WhatsNext} />
            <AnonRoute exact path="/menu" component={MenuBailo} />

            <AnonRoute exact path="/test" component={MapTest} />
            <AnonRoute exact path="/geocodetest" component={GeocodeTest} />
            <AnonRoute exact path="/anothertest" component={AnotherTest} />

          </Switch>

        </Router>
      </div>
    );
  }
}

export default withAuth(App);

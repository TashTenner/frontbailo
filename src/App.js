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

import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

import MapTest from "./views/map/MapTest";
import MapTestTwo from "./views/map/MapTestTwo";
import MapTestThree from "./views/map/MapTestThree";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />

          <Switch>
            <AnonRoute exact path="/login" component={Login} />
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/private" component={PrivateView} />

            <Route exact path="/" component={MapHome} />
            <PrivateRoute exact path="/mybailo" component={MyBailo} />

            <Route exact path="/add" component={AddBailo} />
            <PrivateRoute exact path="/add/venue" component={AddVenue} />
            <PrivateRoute exact path="/add/practica" component={AddPractica} />
            <PrivateRoute exact path="/add/school" component={AddSchool} />

            <Route exact path="/venues/:id" component={VenueLongDetail} />
            <Route exact path="/practicas/:id" component={PracticaLongDetail} />
            <Route exact path="/schools/:id" component={SchoolLongDetail} />

            <PrivateRoute exact path="/admin/venues/:id/edit" component={EditVenue} />
            <PrivateRoute exact path="/admin/practicas/:id/edit" component={EditPractica} />
            <PrivateRoute exact path="/admin/schools/:id/edit" component={EditSchool} />

            <Route exact path="/whatsnext" component={WhatsNext} />
            <Route exact path="/menu" component={MenuBailo} />

            <Route exact path="/maptest" component={MapTest} />
            <Route exact path="/maptesttwo" component={MapTestTwo} />
            <Route exact path="/maptestthree" component={MapTestThree} />

          </Switch>

        </Router>
      </div>
    );
  }
}

export default withAuth(App);

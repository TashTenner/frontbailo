import React, { Component } from "react";
// import withAuth from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="nav-style">
        <ul>
          <li>
            <NavLink to="/">Map</NavLink>
          </li>
          <li>
            <NavLink to="/mybailo">My Bailo</NavLink>
          </li>
          <li>
            <NavLink to="/add">Add</NavLink>
          </li>
          <li>
            <NavLink to="/whatsnext">What's next?</NavLink>
          </li>
          <li>
            <NavLink to="/menu">Menu</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
// export default withAuth(Navbar);

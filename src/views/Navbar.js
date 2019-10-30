import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const navbar = () => {
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
};

export default navbar;

import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import "./Navbar.css";

const Title = styled.ul`
  font-size: 0.9em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 1em;
  background: #4e6ac5;
`;

class Navbar extends Component {
  render() {
    const { user } = this.props;
    const { handleLogout } = this.props;

    return (
      <Wrapper>
        <nav className="nav-style">
          <Title>
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
              {user && user ? <NavLink onClick={handleLogout} to="/">Logout</NavLink> : <NavLink to="/login">Login</NavLink>}
            </li>
          </Title>
        </nav>
      </Wrapper>
    );
  }
}

export default withAuth(Navbar);

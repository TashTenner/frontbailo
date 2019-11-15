import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import "./Navbar.css";
import logo from "../img/bailo_FN-01.png";

const Title = styled.ul`
  font-size: 0.9em;
  text-align: center;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.section`
  padding: 0.4em;
  background: #4e6ac5;
  display: flex;
  justify-content: space-evenly;
`;

const Image = styled.img`
  width: 3em;
`;

class Navbar extends Component {
  render() {
    const { user, handleLogout } = this.props;

    return (
      <Wrapper>
        <nav className="nav-style">
          <Title>
            <li>
              <NavLink to="/"><Image src={logo} alt="Logo" /></NavLink>
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

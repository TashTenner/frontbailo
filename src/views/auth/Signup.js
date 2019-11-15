import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import styled from 'styled-components';
import "./Signup.css";


const Input = styled.input`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: ${props => (props.primary ? 'violet' : '#c870c8')};
  border: ${props =>
    props.primary ? '2px solid violet' : '2px solid #c870c8'};
  margin: 0.2em 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: ${props =>
    props.primary ? 'violet' : '#c870c8'};
    color: white;
  }
`;

class Signup extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.handleSignup({
      username,
      password
    })
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="Signup">
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="username" placeholder="username" value={username} onChange={this.handleChange} />
          <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
          <Input type="submit" value="Sign up" />
        </form>
        <p>Already have account?
         <Link to={"/login"}> Login</Link>
        </p>
      </div>
    )
  }
}

export default withAuth(Signup);
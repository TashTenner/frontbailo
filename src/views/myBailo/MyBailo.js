import React, { Component } from "react";
import { withAuth } from '../../Context/AuthContext';
import MyBailoProfile from "./components/MyBailoProfile";
import MyBailoFollow from "./components/MyBailoFollow";
import styled from "styled-components";

const Button = styled.button`
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

class MyBailo extends Component {
  state = {
    loading: true,
  }

  render() {
    const { handleLogout } = this.props;
    return (
      <div>
        <MyBailoProfile />
        <MyBailoFollow />
        <Button onClick={handleLogout}>logout</Button>
      </div>
    );
  }
}

export default withAuth(MyBailo);

import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: #54aa7c;
  display: block;
  margin: 0.5em 0;
`;

class ErrorPage extends Component {
  render() {
    return <div>
      <p style={{ textAlign: "center" }}>
        <StyledLink to="/">404 - This page does not exist - Go to Home </StyledLink>
      </p>
    </div>;
  }
}
export default ErrorPage;
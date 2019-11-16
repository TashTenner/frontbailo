import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: #54aa7c;
  display: block;
  margin: 0.5em 0;
`;

const addBailo = () => {
  return (
    <div>
      <StyledLink to="/add/venue">Add Venue</StyledLink>
      <StyledLink to="/add/practica">Add Practica</StyledLink>
      <StyledLink to="/add/school">Add School</StyledLink>
    </div>
  );
};

export default addBailo;

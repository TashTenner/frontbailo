import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  color: #54aa7c;
  display: block;
  margin: 0.5em 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

export const InputButton = styled(Link)`
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

const addBailo = () => {
  return (
    <Div>
      <InputButton to="/add/venue">Add Venue</InputButton>
      <InputButton to="/add/practica">Add Practica</InputButton>
      <InputButton to="/add/school">Add School</InputButton>
    </Div>
  );
};

export default addBailo;

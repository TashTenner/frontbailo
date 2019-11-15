import React from "react";
import styled from 'styled-components';
import "./SchoolCard.js";

const Div = styled.div`
  line-height: 2em;
`;

const PGreen = styled.p`
  color: #54aa7c;
  font-weight: bold;

`;

const SchoolCard = props => {
  const {
    school: {
      properties: {
        name,
        address,
        phoneNr,
        mail,
        website
      }
    }
  } = props;

  return (
    <Div>
      <PGreen>School details:</PGreen>
      <p>name: {name}</p>
      <p>address: {address}</p>
      <p>phoneNr: {phoneNr}</p>
      <p>mail: {mail}</p>
      <p>website: {website}</p>
    </Div>
  );
};

export default SchoolCard;

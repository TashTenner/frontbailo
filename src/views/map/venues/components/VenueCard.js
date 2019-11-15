import React from "react";
import styled from 'styled-components';
import "./VenueCard.js";

const Div = styled.div`
  line-height: 2em;
`;

const PGreen = styled.p`
  color: #54aa7c;
  font-weight: bold;

`;

const VenueCard = props => {
  const {
    venue: {
      properties: {
        name,
        address,
        date,
        frequency,
        startTime,
        endTime,
        price,
        phoneNr,
        mail,
        website,
      }
    }
  } = props;

  const dateConversion = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date));

  return (
    <Div>
      <PGreen>Venue details:</PGreen>
      <p>name: {name}</p>
      <p>address: {address}</p>
      <p>date: {dateConversion}</p>
      <p>frequency: {frequency}</p>
      <p>startTime: {startTime}</p>
      <p>endTime: {endTime}</p>
      <p>price: {price}</p>
      <p>phoneNr: {phoneNr}</p>
      <p>mail: {mail}</p>
      <p>website: {website}</p>
    </Div>
  );
};

export default VenueCard;

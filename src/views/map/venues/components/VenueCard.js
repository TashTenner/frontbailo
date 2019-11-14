import React from "react";
import styled from 'styled-components';

import "./VenueCard.js";

// const Title = styled.ul`
//   font-size: 0.9em;
//   text-align: center;
//   color: palevioletred;
// `;

const Div = styled.div`
  /* padding: 1em; */
  /* background: #4e6ac5; */
  line-height: 2em;
`;

const PGreen = styled.p`
  color: #54aa7c;
  font-weight: bold;

`;

const VenueCard = props => {
  console.log(props);
  const {
    venue: {
      // _id,
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
        // nameOrganizer,
        // mainPhoto,
        // rating
      }
    }
  } = props;

  // const dateConversion = new Date(date).toString();

  const dateConversion = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date));

  // new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(new Date('2012-04-23T18:25:43.511Z'))
  // const test = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateConversion).toString();


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
      {/* <label>nameOrganizer:</label>
      <p>{nameOrganizer}</p>
      <label>mainPhoto:</label>
      <p>{mainPhoto}</p>
      <label>rating:</label>
      <p>{rating}</p> */}
      {/* <Link to={`/admin/venues/${_id}/edit`}>Edit / delete venue</Link>
      button only for admin */}
      {/* <button onClick={changeTheme}>change Theme</button> */}
    </Div>
  );
};

export default VenueCard;

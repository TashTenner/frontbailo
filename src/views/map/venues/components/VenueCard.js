import React from "react";
// import { Link } from "react-router-dom";

// import { withTheme } from "../../../Context/ThemeContext";

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
        nameOrganizer,
        mainPhoto,
        rating
      }
    }
  } = props;

  return (
    <div>
      <p>Venue full details:</p>

      <label htmlFor="">name:</label>
      <p>{name}</p>
      <label htmlFor="">address:</label>
      <p>{address}</p>
      <label htmlFor="">date:</label>
      <p>{date}</p>
      <label htmlFor="">frequency:</label>
      <p>{frequency}</p>
      <label htmlFor="">startTime:</label>
      <p>{startTime}</p>
      <label htmlFor="">endTime:</label>
      <p>{endTime}</p>
      <label htmlFor="">price:</label>
      <p>{price}</p>
      <label htmlFor="">phoneNr:</label>
      <p>{phoneNr}</p>
      <label htmlFor="">mail:</label>
      <p>{mail}</p>
      <label htmlFor="">website:</label>
      <p>{website}</p>
      <label htmlFor="">nameOrganizer:</label>
      <p>{nameOrganizer}</p>
      <label htmlFor="">mainPhoto:</label>
      <p>{mainPhoto}</p>
      <label htmlFor="">rating:</label>
      <p>{rating}</p>
      {/* <Link to={`/admin/venues/${_id}/edit`}>Edit / delete venue</Link>
      button only for admin */}
      {/* <button onClick={changeTheme}>change Theme</button> */}
    </div>
  );
};

export default VenueCard;

import React from "react";
// import { Link } from "react-router-dom";

// import { withTheme } from "../../../Context/ThemeContext";

const SchoolCard = props => {
  console.log(props);
  const {
    school: {
      // _id,
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
    <div>
      <p>School full details:</p>

      <label htmlFor="">name:</label>
      <p>{name}</p>
      <label htmlFor="">address:</label>
      <p>{address}</p>
      <label htmlFor="">phoneNr:</label>
      <p>{phoneNr}</p>
      <label htmlFor="">mail:</label>
      <p>{mail}</p>
      <label htmlFor="">website:</label>
      <p>{website}</p>
      {/* <label htmlFor="">nameOrganizer:</label>
      <p>{nameOrganizer}</p>
      <label htmlFor="">mainPhoto:</label>
      <p>{mainPhoto}</p>
      <label htmlFor="">rating:</label>
      <p>{rating}</p> */}
      {/* <Link to={`/admin/schools/${_id}/edit`}>Edit / delete school</Link>
      button only for admin */}
      {/* <button onClick={changeTheme}>change Theme</button> */}
    </div>
  );
};

export default SchoolCard;

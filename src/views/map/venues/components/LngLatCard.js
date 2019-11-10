import React from "react";
// import { Link } from "react-router-dom";

// import { withTheme } from "../../../Context/ThemeContext";

const LngLatCard = props => {
  console.log(props);
  const {
    response: {
      properties: {
        name
      }
    }
  } = props;

  return (
    <div>
      <p>Venue full details:</p>
      <label htmlFor="">name:</label>
      <p>{name}</p>

    </div>
  );
};

export default LngLatCard;

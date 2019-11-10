import React from "react";
import { Link } from "react-router-dom";

const addBailo = () => {
  return (
    <div>
      <Link to="/add/venue">Add Venue</Link>
      <Link to="/add/practica">Add Practica</Link>
      <Link to="/add/school">Add School</Link>
    </div>
  );
};

export default addBailo;

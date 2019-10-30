import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import AddVenue from "./components/AddVenue";
import AddSchool from "./components/AddSchool";

const addBailo = () => {
  return (
    <div>
      <Link to="/add/venue">Add Venue</Link>

      <Switch>
        <Route exact path="/add/venue" component={AddVenue} />
        <Route exact path="/add/school" component={AddSchool} />
      </Switch>

      {/* <div>
        <Link to={`/add/school`}>
          <AddSchool />
        </Link>
      </div> */}
    </div>
  );
};

export default addBailo;

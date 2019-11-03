import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
// import venueService from "../../../services/venueService";

// import VenueLongDetail from "../venues/VenueLongDetail";

export default class VenueInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `${info.properties.name}`;
    // const venueId = `${info.venue._id}`;

    // const getVenueId = id => {
    //   const theVenueId = oneVenue => {
    //     return oneVenue._id === id;
    //   };
    //   return venueService.getVenueById(theVenueId);
    // };

    // const { params } = this.props.match;
    // const foundVenueId = getVenueId(params.id);

    return (
      <div>
        <div>
          {/* <div>
            <ul>
              {foundVenueId.properties.name.map((_id, index) => {
                const venue = getVenueId(_id).properties.name;
                return (
                  <li key={`${_id}-${index}`}>
                    <Link to={`/${_id}`}>{venue}</Link>
                  </li>
                );
              })}
            </ul>
          </div> */}
          <Link to={`/venue/${info._id}`}>{displayName}</Link>
          {/* <Route path="/:id" component={VenueLongDetail} /> */}
          {/* <a target="_new" href={`http://localhost:3000/milonga/${venueId}`}>
            {displayName}
          </a> */}
        </div>
        {/* <img width={240} src={info.properties.mainPhoto} alt="" /> */}
      </div>
    );
  }
}

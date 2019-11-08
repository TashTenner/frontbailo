import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class VenueInfo extends PureComponent {
  render() {
    const { info, searchBy } = this.props;
    const displayName = `${info.properties.name}`;

    return (
      <div>
        <div>
          <Link to={`/${searchBy}/${info._id}`}>{displayName}</Link>
        </div>
        <div>
          <div>{info.properties.address}</div>
          <div>
            {info.properties.startTime}-{info.properties.endTime}
          </div>
          <div> {info.properties.price}</div>
        </div>
        {/* <img width={240} src={info.properties.mainPhoto} alt="" /> */}
      </div>
    );
  }
}

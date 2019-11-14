import React, { PureComponent } from "react";
import styled from 'styled-components';

import { Link } from "react-router-dom";

// const Title = styled.a`
//     text-decoration: none;
//     color: #54aa7c;
//     font-weight: bold;
// `;

const Title = styled(
  styled(Link)`
    text-decoration: none;
    color: #54aa7c;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  `,
  'active'
)`
`;

export default class VenueInfo extends PureComponent {
  render() {
    const { info, searchBy } = this.props;
    const displayName = `${info.properties.name}`;

    return (
      <div>
        <div>
          <Title to={`/${searchBy}/${info._id}`}>{displayName}</Title>
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

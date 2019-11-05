import React, { PureComponent } from 'react';
// import { Link } from "react-router-dom";

import "./InfoBox.css";

const defaultContainer = ({ children }) => <div className="InfoBox">{children}</div>;

export default class InfoBox extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;
    // const { settings } = this.props;

    return (

      <Container>
        <h3>Static InfoBox</h3>


        {/* <div> */}
        {/* <div>
            <Link to={`/venues/${info._id}`}>{displayName}</Link>
          </div>
          <div>
            <div>{info.properties.address}</div>
            <div>
              {info.properties.startTime}-{info.properties.endTime}
            </div>
            <div> {info.properties.price}</div>
          </div> */}
        {/* <img width={240} src={info.properties.mainPhoto} alt="" /> */}
        {/* </div> */}

        {/* <p>
          Map showing median household income by state in year <b>{settings.year}</b>. Hover over a
          state to see details.
        </p>
        <p>
          Data source: <a href="www.census.gov">US Census Bureau</a>
        </p>
        <div className="source-link">
          <a
            href="https://github.com/uber/react-map-gl/tree/5.0-release/examples/geojson"
            target="_new"
          >
            View Code ↗
          </a>
        </div> */}
        {/* <hr />

        <p>hola</p> */}
        {/* <div key={'year'} className="input">
          <label>Year</label>
          <input
            type="range"
            value={settings.year}
            min={1995}
            max={2015}
            step={1}
            onChange={evt => this.props.onChange('year', evt.target.value)}
          />
        </div> */}


      </Container>
    );
  }
}
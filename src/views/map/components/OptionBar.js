import React, { PureComponent } from 'react';

import "./OptionBar.css";

export default class OptionBar extends PureComponent {
  render() {
    return (
      <div className="OptionBar">
        <form>
          {/* <p>Please select either milongas or tango schools:</p> */}
          <select className="OptionBar-Dropdown">
            <option id="venues" value="venues">milongas</option>
            <option id="schools" value="schools">schools</option>
          </select>
        </form>
      </div>
    );
  }
}



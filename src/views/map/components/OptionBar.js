import React, { PureComponent } from 'react';

import "./OptionBar.css";

export default class OptionBar extends PureComponent {
  render() {
    return (
      <div className="OptionBar">
        <form>
          {/* <p>Please select either milongas or tango schools:</p> */}
          <div>
            <input type="radio" id="venues" name="contact" value="email" /* checked*/ />
            <label>milongas</label>
            <input type="radio" id="schools" name="contact" value="phone" />
            <label>schools</label>
          </div>
          {/* <div>
            <button type="submit">Submit</button>
          </div> */}
        </form>
      </div>
    );
  }
}
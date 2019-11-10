import React, { Component } from "react";
import { withAuth } from '../../Context/AuthContext';

import MyBailoProfile from "./components/MyBailoProfile";
import MyBailoFollow from "./components/MyBailoFollow";

class MyBailo extends Component {
  render() {
    // const { userId } = this.props.match.params;
    return (
      <div>
        <MyBailoProfile />
        <MyBailoFollow />
      </div>
    );
  }
}

export default withAuth(MyBailo);

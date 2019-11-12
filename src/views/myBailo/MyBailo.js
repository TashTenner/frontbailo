import React, { Component } from "react";
import { withAuth } from '../../Context/AuthContext';

import MyBailoProfile from "./components/MyBailoProfile";
import MyBailoFollow from "./components/MyBailoFollow";

class MyBailo extends Component {
  state = {
    loading: true,
  }

  render() {
    const { handleLogout } = this.props;

    return (
      <div>
        <MyBailoProfile />
        <MyBailoFollow />
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }
}

export default withAuth(MyBailo);

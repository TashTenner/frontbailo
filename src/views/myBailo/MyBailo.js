import React, { Component } from "react";
import MyBailoProfile from "./components/MyBailoProfile";
import MyBailoFollow from "./components/MyBailoFollow";

class MyBailo extends Component {
  render() {
    return (
      <div>
        <MyBailoProfile />
        <MyBailoFollow />
      </div>
    );
  }
}

export default MyBailo;

import React, { Component } from "react";
// import { withAuth } from '../../../Context/AuthContext';
import userService from "../../../services/userService";

class MyBailoProfile extends Component {
  state = {
    profile: [],
    loading: true
  }

  componentDidMount() {
    const { userId } = this.props;
    userService.getUserById(userId)
      .then((userProfile) => {
        console.log(userProfile)
        this.setState({
          profile: userProfile.userId,
          loading: false,
        })
      })
      .catch((error) => {
        this.setState({
          loading: false
        })
      })
  }

  render() {
    const { profile, loading } = this.state;
    console.log(profile);
    return (
      <div>
        hola
        {!loading && <div>
          <p>username: </p>
        </div>}
        {loading && <div>Loading...</div>}
      </div>
    );

    // <div>
    //   MyBailoProfile
    //   </div>;
  }
}

export default MyBailoProfile;

import React from "react";
import { withAuth } from '../../../Context/AuthContext';
// import userService from "../../../services/userService";

const MyBailoProfile = (props) => {
  const { user } = props;

  return (
    <div>
      <p>
        user: {user.username}
      </p>
    </div>
  );

}

export default withAuth(MyBailoProfile);
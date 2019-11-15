import React from "react";
import { withAuth } from '../../../Context/AuthContext';

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
import React from "react";
import { withAuth } from '../../../Context/AuthContext';
import styled from "styled-components";

const Div = styled.div`
  margin-bottom: 0.5em;
  margin-top: 0.5em;
	color: black;
    display: block;
`;

const MyBailoProfile = (props) => {
  const { user } = props;

  return (
    <Div>
      user: {user.username}
    </Div>
  );

}

export default withAuth(MyBailoProfile);
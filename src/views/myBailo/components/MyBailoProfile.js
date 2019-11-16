import React from "react";
import { withAuth } from '../../../Context/AuthContext';
import styled from "styled-components";
import logo from "../../../img/bailo_FN-06.png";

const Image = styled.img`
  width: 3em;
`;

const Div = styled.div`
  margin-bottom: 0.5em;
  margin-top: 0.5em;
	color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MyBailoProfile = (props) => {
  const { user } = props;

  return (
    <Div>
      <Image src={logo} alt="Logo" />
      user: {user.username}
    </Div>
  );

}

export default withAuth(MyBailoProfile);
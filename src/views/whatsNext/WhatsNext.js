import React, { Component } from "react";
import styled from "styled-components";

const Div = styled.div`
  margin-bottom: 0.5em;
  margin-top: 0.5em;
	color: black;
    display: block;
`;

const Text = styled.p`
  margin-bottom: 0.5em;
  margin-top: 0.5em;
	color: black;
    display: block;
`;

class WhatsNext extends Component {
  render() {
    return <Div>
      <Text>Next features will be:</Text>
      <Text>- Edit your own milonga</Text>
      <Text>- Follow milongas</Text>
      <Text>- See your milongas / schools</Text>
    </Div>;
  }
}

export default WhatsNext;

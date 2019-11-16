import styled from "styled-components";

export const FormGroup = styled.div`
	color: palevioletred;
	width: 300px;
	margin: 5px auto;
`;

export const Input = styled.input`
	padding: 0.5em;
	color: black;
	background: #54aa7c;
	border: none;
	border-radius: 3px;
	width: 100%;
  margin-bottom: 0.5em;
  &::placeholder {
    color: white;
  }
`;

export const Message = styled.div`
  margin-bottom: 0.5em;
  margin-top: 0.5em;
	color: black;
  display: block;
`;

export const InputButton = styled.input`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: ${props => (props.primary ? 'violet' : '#c870c8')};
  border: ${props =>
    props.primary ? '2px solid violet' : '2px solid #c870c8'};
  transition: 0.5s all ease-out;
  &:hover {
    background-color: ${props =>
    props.primary ? 'violet' : '#c870c8'};
    color: white;
  }
`;
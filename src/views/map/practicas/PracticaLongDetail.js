import React, { Component } from "react";
import { Link } from "react-router-dom";
import practicaService from "../../../services/practicaService";
import { withAuth } from '../../../Context/AuthContext';
import PracticaCard from "./components/PracticaCard";
import styled from "styled-components";

export const InputButton = styled.button`
cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: ${props => (props.primary ? 'violet' : '#c870c8')};
  border: ${props =>
    props.primary ? '2px solid violet' : '2px solid #c870c8'};
  margin: 0.2em 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: ${props =>
    props.primary ? 'violet' : '#c870c8'};
    color: white;
  }
`;

export const InputButton2 = styled(Link)`
cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: ${props => (props.primary ? 'violet' : '#c870c8')};
  border: ${props =>
    props.primary ? '2px solid violet' : '2px solid #c870c8'};
  margin: 0.2em 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: ${props =>
    props.primary ? 'violet' : '#c870c8'};
    color: white;
  }
`;

class PracticaLongDetail extends Component {
  state = {
    practica: {},
    loading: true,
    redirect: false
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const practica = await practicaService.getPracticaById(id);
      this.setState({
        practica,
        loading: false
      });
    } catch (error) {
      this.setState({
        loading: false
      });
    }
  }

  deletePractica = () => {
    const { params } = this.props.match;
    practicaService
      .deletePractica(params.id)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(err => { });
  };

  render() {
    const { practica, loading } = this.state;
    const { user } = this.props;
    return (
      <>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <PracticaCard practica={practica} />
          </div>
        )}
        {user && (user.roles === "admin") ? <InputButton2 to={`/admin/practicas/${practica._id}/edit`}>Edit</InputButton2> : <div></div>}
        {user && (user.roles === "admin") ? <InputButton onClick={() => this.deletePractica()}>Delete</InputButton> : <div></div>}
      </>
    );
  }
}

export default withAuth(PracticaLongDetail);

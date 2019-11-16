import React, { Component } from "react";
import { Link } from "react-router-dom";
import schoolService from "../../../services/schoolService";
import { withAuth } from '../../../Context/AuthContext';
import SchoolCard from "./components/SchoolCard";
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

class SchoolLongDetail extends Component {
  state = {
    school: {},
    loading: true,
    redirect: false
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const school = await schoolService.getSchoolById(id);
      this.setState({
        school,
        loading: false
      });
    } catch (error) {
      this.setState({
        loading: false
      });
    }
  }

  deleteSchool = () => {
    const { params } = this.props.match;
    schoolService
      .deleteSchool(params.id)
      .then(() => { this.props.history.push("/"); })
      .catch(err => { });
  };

  render() {
    const { school, loading } = this.state;
    const { user } = this.props;
    return (
      <>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <SchoolCard school={school} />
          </div>
        )}
        {user && (user.roles === "admin") ? <InputButton2 to={`/admin/schools/${school._id}/edit`}>Edit school</InputButton2> : <div></div>}
        {user && (user.roles === "admin") ? <InputButton onClick={() => this.deleteSchool()}>Delete school</InputButton> : <div></div>}
      </>
    );
  }
}

export default withAuth(SchoolLongDetail);

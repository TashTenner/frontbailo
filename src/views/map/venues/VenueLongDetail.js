import React, { Component } from "react";
import { Link } from "react-router-dom";
import venueService from "../../../services/venueService";
import { withAuth } from '../../../Context/AuthContext';
import VenueCard from "./components/VenueCard";
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

class VenueLongDetail extends Component {
  state = {
    venue: {},
    loading: true,
    redirect: false
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const venue = await venueService.getVenueById(id);
      this.setState({
        venue,
        loading: false
      });
    } catch (error) {
      this.setState({
        loading: false
      });
    }
  }

  deleteVenue = () => {
    const { params } = this.props.match;
    venueService
      .deleteVenue(params.id)
      .then(() => { this.props.history.push("/"); })
      .catch(err => { });
  };

  render() {
    const { venue, loading } = this.state;
    const { user } = this.props;
    return (
      <>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <VenueCard venue={venue} />
          </div>
        )}
        {user && (user.roles === "admin") ? <InputButton2 to={`/admin/venues/${venue._id}/edit`}>Edit venue</InputButton2> : <div></div>}
        {user && (user.roles === "admin") ? <InputButton onClick={() => this.deleteVenue()}>Delete venue</InputButton> : <div></div>}
      </>
    );
  }
}

export default withAuth(VenueLongDetail);

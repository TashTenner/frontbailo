import React, { Component } from "react";
import { Link } from "react-router-dom";
import venueService from "../../../services/venueService";

import VenueCard from "./components/VenueCard";

class VenueLongDetail extends Component {
  state = {
    venue: {},
    loading: true,
    redirect: false
  };

  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   });
  // };

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to="/" />;
  //   }
  // };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    try {
      const venue = await venueService.getVenueById(id);
      this.setState({
        venue,
        loading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false
      });
    }
  }

  deleteVenue = () => {
    const { params } = this.props.match;
    venueService
      .deleteVenue(params.id)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { venue, loading } = this.state;
    console.log("render");
    return (
      <>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <VenueCard venue={venue} />
            <Link to={`/admin/venues/${venue._id}/edit`}>Edit venue</Link>
            {/* button only for admin */}

            {/* <div>
              {this.renderRedirect()}
              <button onClick={this.setRedirect}>Redirect</button>
            </div> */}

            <button onClick={() => this.deleteVenue()}>Delete venue</button>
            {/* only for admin */}
            {/* if (this.state.redirect){
        return <Redirect
            to="/FinishedPaying"
            userInput={this.state.userInput}
            />; */}
          </div>
        )}
      </>
    );
  }
}

export default VenueLongDetail;

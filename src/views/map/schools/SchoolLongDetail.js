import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import schoolService from "../../../services/schoolService";

import SchoolCard from "./components/SchoolCard";

class SchoolLongDetail extends Component {
  state = {
    school: {},
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
      const school = await schoolService.getSchoolById(id);
      this.setState({
        school,
        loading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false
      });
    }
  }

  deleteSchool = () => {
    const { params } = this.props.match;
    schoolService
      .deleteSchool(params.id)
      .then(() => {
        this.props.history.push("/schools"); // !!!
      })
      .then(() => {
        this.setState({
          redirect: true
        });
      })
      .then(() => {
        return <Redirect to="/" />;
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { school, loading } = this.state;
    console.log("render");
    return (
      <>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <SchoolCard school={school} />
            <Link to={`/admin/schools/${school._id}/edit`}>Edit school</Link>
            {/* button only for admin */}

            {/* <div>
              {this.renderRedirect()}
              <button onClick={this.setRedirect}>Redirect</button>
            </div> */}

            <button onClick={() => this.deleteSchool()}>Delete school</button>
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

export default SchoolLongDetail;

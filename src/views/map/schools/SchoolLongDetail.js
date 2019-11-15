import React, { Component } from "react";
import { Link } from "react-router-dom";
import schoolService from "../../../services/schoolService";
import { withAuth } from '../../../Context/AuthContext';
import SchoolCard from "./components/SchoolCard";

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
        {user && (user.roles === "admin") ? <Link to={`/admin/schools/${school._id}/edit`}>Edit school</Link> : <div></div>}
        {user && (user.roles === "admin") ? <button onClick={() => this.deleteSchool()}>Delete school</button> : <div></div>}
      </>
    );
  }
}

export default withAuth(SchoolLongDetail);

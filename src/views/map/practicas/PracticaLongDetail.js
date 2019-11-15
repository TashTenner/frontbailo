import React, { Component } from "react";
import { Link } from "react-router-dom";
import practicaService from "../../../services/practicaService";
import { withAuth } from '../../../Context/AuthContext';
import PracticaCard from "./components/PracticaCard";

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
        {user && (user.roles === "admin") ? <Link to={`/admin/practicas/${practica._id}/edit`}>Edit practica</Link> : <div></div>}
        {user && (user.roles === "admin") ? <button onClick={() => this.deletePractica()}>Delete practica</button> : <div></div>}
      </>
    );
  }
}

export default withAuth(PracticaLongDetail);

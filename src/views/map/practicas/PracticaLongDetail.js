import React, { Component } from "react";
import { Link } from "react-router-dom";
import practicaService from "../../../services/practicaService";

import PracticaCard from "./components/PracticaCard";

class PracticaLongDetail extends Component {
  state = {
    practica: {},
    loading: true,
    redirect: false
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    try {
      const practica = await practicaService.getPracticaById(id);
      this.setState({
        practica,
        loading: false
      });
    } catch (error) {
      console.log(error);
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
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { practica, loading } = this.state;
    console.log("render");
    return (
      <>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <PracticaCard practica={practica} />
            <Link to={`/admin/practicas/${practica._id}/edit`}>Edit practica</Link>
            {/* button only for admin */}
            <button onClick={() => this.deletePractica()}>Delete practica</button>
            {/* only for admin */}
          </div>
        )}
      </>
    );
  }
}

export default PracticaLongDetail;

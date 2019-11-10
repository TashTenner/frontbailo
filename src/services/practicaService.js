import axios from "axios";

class PracticaService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  getAllPracticas() {
    return this.axios.get("/api/practicas").then(({ data: practicas }) => practicas);
  }

  getPracticaById(id) {
    return this.axios.get(`/api/practicas/${id}`).then(({ data: practica }) => practica);
  }

  createPractica(body) {
    console.log("BODY TO API: ", body);
    return this.axios
      .post("/api/practicas/new", body)
      .then(({ data: practica }) => practica);
  }

  updatePractica(practica) {
    return this.axios
      .put(`/api/practicas/${practica._id}/edit`, practica)
      .then(({ data: practica }) => practica);
  }

  deletePractica(id) {
    return this.axios
      .delete(`/api/practicas/${id}/delete`)
      .then(({ data: practicas }) => practicas);
  }
}

const practicaService = new PracticaService();

export default practicaService;

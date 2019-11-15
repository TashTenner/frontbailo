import axios from "axios";

class SchoolService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  getAllSchools() {
    return this.axios.get("/api/schools").then(({ data: schools }) => schools);
  }

  getSchoolById(id) {
    return this.axios.get(`/api/schools/${id}`).then(({ data: school }) => school);
  }

  createSchool(body) {
    return this.axios
      .post("/api/schools/new", body)
      .then(({ data: school }) => school);
  }

  updateSchool(school) {
    return this.axios
      .put(`/api/schools/${school._id}/edit`, school)
      .then(({ data: school }) => school);
  }

  deleteSchool(id) {
    return this.axios
      .delete(`/api/schools/${id}/delete`)
      .then(({ data: schools }) => schools);
  }
}

const schoolService = new SchoolService();

export default schoolService;

import axios from "axios";

class VenueService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  getAllVenues() {
    return this.axios.get("/api/venues").then(({ data: venues }) => venues);
  }

  getVenueById(id) {
    return this.axios.get(`/api/venues/${id}`).then(({ data: venue }) => venue);
  }

  createVenue(body) {
    return this.axios
      .post("/api/venues/new", body)
      .then(({ data: venue }) => venue);
  }

  updateVenue(venue) {
    return this.axios
      .put(`/api/venues/${venue._id}/edit`, venue)
      .then(({ data: venue }) => venue);
  }

  deleteVenue(id) {
    return this.axios
      .delete(`/api/venues/${id}/delete`)
      .then(({ data: venues }) => venues);
  }
}

const venueService = new VenueService();

export default venueService;

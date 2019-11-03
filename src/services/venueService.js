import axios from "axios";

class VenueService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  getAllVenues() {
    return this.axios.get("/venues").then(({ data: venues }) => venues);
  }

  createVenue(body) {
    console.log("BODY TO API: ", body);
    return this.axios
      .post("/venues/new", body)
      .then(({ data: venue }) => venue);
  }
}

const venueService = new VenueService();

export default venueService;

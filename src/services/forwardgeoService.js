import axios from "axios";

class ForwardgeoService {
  constructor() {
    this.axios = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places`,
      withCredentials: true
    });
  }

  getCoordinates(address) {
    return this.axios.get(`/${address}.json?access_token=pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw`).then(({ data: response }) => response);
  }
}

// direccion: resp.data.features[1].place_name,
// lat: resp.data.features[1].geometry.coordinates[1],
// long: resp.data.features[1].geometry.coordinates[0]

const forwardgeoService = new ForwardgeoService();

export default forwardgeoService;
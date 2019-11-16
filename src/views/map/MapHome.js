import React, { Component } from "react";
import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  GeolocateControl,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Supercluster from 'supercluster';
import styled from 'styled-components';

import venueService from "../../services/venueService";
import practicaService from "../../services/practicaService";
import schoolService from "../../services/schoolService";
import MapPin from "./components/MapPin";
import VenueInfo from "./components/VenueInfo";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./MapHome.css";

const Select = styled.select`
  color: white;
  position: absolute;
  top: 55px;
  max-width: 320px;
  background: #4e6ac5;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  margin: 10px;
`;

const Form = styled.form`
  position: absolute;
`;

const navStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  padding: "10px"
};

const geolocateStyle = {
  position: 'absolute',
  top: 100,
  right: 0,
  margin: 10
};

const clusterStyles = {
  standard: {
    width: "10px",
    height: "10px",
    borderRadius: "50%"
  },
  cluster: {
    width: "20px",
    height: "20px",
    backgroundColor: "#4e6ac5",
    color: "#fff",
    textAlign: "center",
    lineHeight: "20px"
  }
};

const useClusters = (data, zoom) => {
  if (!data) {
    return [];
  }
  const clusterer = new Supercluster({
    minZoom: 0,
    maxZoom: 12,
    radius: 20,
    // extent: 512,
    // nodeSize: 64
  });
  clusterer.load(data);
  if (!clusterer) {
    return [];
  }
  const clustered = clusterer.getClusters([-180, -90, 180, 90], Math.floor(zoom));
  return clustered;
};

class MapHome extends Component {
  state = {
    searchBy: "venues",
    listOfSpots: [],
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 41.401456,
      longitude: 2.161712,
      zoom: 3,
      bearing: 0,
      pitch: 0
    },
    popupInfo: null,
    userLocation: {},
    cluster: []
  };

  async componentDidMount() {
    const test2 = await this.loadMap(this.state.searchBy);
    const cluster = useClusters(test2, this.state.viewport.zoom);
    this.setState({
      listOfSpots: test2,
      cluster
    })
  }

  async loadMap(type) {
    try {
      if (type === 'venues') {
        return await venueService.getAllVenues();
      } else if (type === 'practicas') {
        return await practicaService.getAllPracticas();
      } else {
        return await schoolService.getAllSchools();
      }
    } catch (error) { }
  }

  mapRef = React.createRef()

  handleViewportChange = async (viewport) => {
    const cluster = useClusters(this.state.listOfSpots, viewport.zoom);
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
      cluster
    })
  }

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleDropdownChange = async (event) => {
    const searchBy = event.target.value;
    const test = await this.loadMap(searchBy);
    const cluster = useClusters(test, this.state.viewport.zoom);

    this.setState({
      searchBy,
      listOfSpots: test,
      cluster
    })
  }

  renderPopup() {
    const { popupInfo, searchBy } = this.state;
    return (
      popupInfo && (
        <Popup
          className="maxWidth"
          tipSize={5}
          anchor="bottom"
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <VenueInfo info={popupInfo} searchBy={searchBy} />
        </Popup >
      )
    );
  }

  render() {
    const { viewport, cluster } = this.state;

    return (
      <div>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          onViewportChange={this.handleViewportChange}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          <div>
            {cluster.length > 0 &&
              cluster.map((p, i) => {
                const style = {
                  ...clusterStyles.standard,
                  ...(p.properties.cluster ? clusterStyles.cluster : "")
                };
                return (
                  <Marker
                    key={i}
                    point={p}
                    longitude={p.geometry.coordinates[0]}
                    latitude={p.geometry.coordinates[1]}
                  >
                    {(p.properties.cluster) ?
                      <div style={style}>{p.properties.cluster ? p.properties.point_count : ""}</div>
                      : ""}
                    {(!p.properties.cluster) ?
                      <MapPin size={20} onClick={() => this.setState({ popupInfo: p })} />
                      : ""}
                  </Marker>
                );
              })}
            {this.renderPopup()}
            <div style={navStyle}>
              <NavigationControl
                onViewportChange={viewport => this.setState({ viewport })}
              />
            </div>
            <GeolocateControl // https://github.com/uber/react-map-gl/issues/921
              style={geolocateStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            <Geocoder
              mapRef={this.mapRef}
              onViewportChange={this.handleGeocoderViewportChange}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              position='top-left'
            />
            <Form>
              <Select id="searchBy" onChange={this.handleDropdownChange} value={this.state.searchBy}>
                <option value="venues">milongas</option>
                <option value="practicas">practicas</option>
                <option value="schools">schools</option>
              </Select>
            </Form>
          </div>
        </MapGL>
      </div >
    );
  }
}

export default MapHome;

import React, { Component } from "react";
import styled from 'styled-components';

import venueService from "../../services/venueService";
import practicaService from "../../services/practicaService";
import schoolService from "../../services/schoolService";

import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  GeolocateControl,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import Supercluster from 'supercluster';

import MapPin from "./components/MapPin";
import VenueInfo from "./components/VenueInfo";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./MapHome.css";

const Select = styled.select`
  color: white;
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

const useClusters = (data, zoom) => {
  if (!data) {
    return [];
  }

  const clusterer = new Supercluster({
    minZoom: 0,
    maxZoom: 12,
    radius: 10
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

  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  async loadMap(type) {
    try {
      if (type === 'venues') {
        return await venueService.getAllVenues();
      } else if (type === 'practicas') {
        return await practicaService.getAllPracticas();
      } else {
        return await schoolService.getAllSchools();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    const test2 = await this.loadMap(this.state.searchBy);
    const cluster = useClusters(test2, this.state.viewport.zoom);
    this.setState({
      listOfSpots: test2,
      cluster
    })
    console.log(cluster);
    console.log(test2);
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
        </Popup>
      )
    );
  }

  handleDropdownChange = async (event) => {
    const searchBy = event.target.value;
    const test = await this.loadMap(searchBy);
    this.setState({
      searchBy,
      listOfSpots: test
    })
  }

  render() {
    const { viewport } = this.state;

    const styles = {
      standard: {
        width: "10px",
        height: "10px",
        borderRadius: "50%"
      },
      ship: {
        backgroundColor: "#977"
      },
      cluster: {
        width: "20px",
        height: "20px",
        backgroundColor: "#227",
        color: "#fff",
        textAlign: "center",
        lineHeight: "20px"
      }
    };

    return (
      <div>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          onViewportChange={this.handleViewportChange}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          {/* https://github.com/uber/react-map-gl/issues/921 */}
          <div>
            {this.state.cluster.length > 0 &&
              this.state.cluster.map((p, i) => {
                const style = {
                  ...styles.standard,
                  ...(p.properties.cluster ? styles.cluster : styles.ship)
                };
                return (
                  <Marker
                    // key={i}
                    key={p.id || p.properties.SiteId} point={p}
                    longitude={p.geometry.coordinates[0]}
                    latitude={p.geometry.coordinates[1]}
                  >
                    <div style={style}>
                      {p.properties.cluster ? p.properties.point_count : ""}
                    </div>
                    {/* <MapPin
                      size={20}
                      onClick={() => this.setState({ popupInfo: p })}
                    /> */}
                  </Marker>
                );
              })}
            {this.renderPopup()}
            <div className="nav" style={navStyle}>
              <NavigationControl
                onViewportChange={viewport => this.setState({ viewport })}
              />
            </div>
            <div>
              <div>
                <Geocoder
                  mapRef={this.mapRef}
                  onViewportChange={this.handleGeocoderViewportChange}
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                  position='top-left'
                />
              </div>
              <div className="MapHomeOption">
                <form>
                  <Select id="searchBy" onChange={this.handleDropdownChange} value={this.state.searchBy}>
                    <option value="venues">milongas</option>
                    <option value="practicas">practicas</option>
                    <option value="schools">schools</option>
                  </Select>
                </form>
              </div>
            </div>
          </div>
        </MapGL>
      </div >
    );
  }
}

export default MapHome;

{/* <Cluster radius={40} extent={512} nodeSize={64} component={ClusterMarker}>
{this.state.listOfSpots.length > 0 &&
  this.state.listOfSpots.map((venue, i) => (
    <Marker
      key={i}
      longitude={venue.geometry.coordinates[0]}
      latitude={venue.geometry.coordinates[1]}
    >
      <MapPin
        size={20}
        onClick={() => this.setState({ popupInfo: venue })}
      />
    </Marker>
  ))}
<NavigationControl />
</Cluster>
{this.renderPopup()} */}
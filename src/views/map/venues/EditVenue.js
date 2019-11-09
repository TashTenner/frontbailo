import React, { Component } from 'react';
import venueService from "../../../services/venueService";
// updating coordinates might be missing here

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
  accessToken: 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw'
});

export default class EditVenue extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeLng = this.onChangeLng.bind(this);
    this.onChangeLat = this.onChangeLat.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeFrequency = this.onChangeFrequency.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangePhoneNr = this.onChangePhoneNr.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      venue: {
        _id: this.props.match.params,
        geometry: { coordinates: [0, 0] },
        properties: { name: "", address: "", date: "", frequency: "", startTime: "", endTime: "", price: "", phoneNr: "", mail: "", website: "" }
      },
      loading: true
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const venue = await venueService.getVenueById(id);
      this.setState({
        venue,
        loading: false
      });
    }
    catch (error) {
      this.setState({
        loading: false
      });
    }
  }

  onChangeName(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          name: e.target.value,
        }
      }
    });
  };

  onChangeAddress(e) {
    console.log(e.target.value)
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          address: e.target.value
        }
      }
    }, () => console.log(this.state));
    if (this.state.venue.properties.address) {
      geocodingClient
        .forwardGeocode({ query: this.state.venue.properties.address, autocomplete: true, types: ["country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi", "poi.landmark"] })
        .send()
        .then(response => {
          console.log("hola")
          const match = response.body;
          this.setState({
            venue: {
              ...this.state.venue,
              geometry: {
                ...this.state.venue.geometry,
                coordinates: [match.features[1].geometry.coordinates[0], match.features[1].geometry.coordinates[1]]
              }
            }
          }, () => console.log(this.state.coordinates))
        });
    }
  };

  // handleChangeMapbox = e => {
  //   this.setState(
  //     {
  //       address: e.target.value
  //     },
  //     () => console.log(this.state.address));
  //   if (this.state.address) {
  //     geocodingClient
  //       .forwardGeocode({ query: this.state.address, autocomplete: true, types: ["country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi", "poi.landmark"] })
  //       .send()
  //       .then(response => {
  //         const match = response.body;
  //         this.setState({
  //           coordinates: [match.features[1].geometry.coordinates[0], match.features[1].geometry.coordinates[1]]
  //         }, () => console.log(this.state.coordinates))
  //       });
  //   }
  // }

  onChangeLng(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        geometry: {
          ...this.state.venue.geometry,
          coordinates: [e.target.value, this.state.venue.geometry[1]]
        }
      }
    }, () => console.log(this.state));
  };


  onChangeLat(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        geometry: {
          ...this.state.venue.geometry,
          coordinates: [this.state.venue.geometry[0], e.target.value]
        }
      }
    }, () => console.log(this.state));
  };

  onChangeDate(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          date: e.target.value
        }
      }
    });
  };

  onChangeFrequency(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          frequency: e.target.value
        }
      }
    });
  };

  onChangeStartTime(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          startTime: e.target.value
        }
      }
    });
  };

  onChangeEndTime(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          endTime: e.target.value
        }
      }
    });
  };

  onChangePrice(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          price: e.target.value
        }
      }
    });
  };

  onChangePhoneNr(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          phoneNr: e.target.value
        }
      }
    });
  };

  onChangeMail(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          mail: e.target.value
        }
      }
    });
  };

  onChangeWebsite(e) {
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          website: e.target.value
        }
      }
    }, () => console.log(this.state));
  };

  onSubmit(e) {
    e.preventDefault();
    const { venue } = this.state;
    const {
      history: { push }
    } = this.props;
    venueService
      .updateVenue(venue)
      .then(() => {
        push(`/`);
      })
      .catch(() => { });
  }

  render() {
    return (
      <div>
        <h3 align="center">Update Venue</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={this.state.venue.properties.name}
              // value={this.state.venue.properties.name || ''}
              onChange={this.onChangeName}
            />
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              value={this.state.venue.properties.address}
              onChange={this.onChangeAddress}
            />
          </div>

          <div>
            <label>Lng:</label>
            <input
              type="number"
              value={this.state.venue.geometry.coordinates[0]}
              onChange={this.onChangeLng}
            />
          </div>

          <div>
            <label>Lat:</label>
            <input
              type="number"
              value={this.state.venue.geometry.coordinates[1]}
              onChange={this.onChangeLat}
            />
          </div>

          <div>
            <label>Date:</label>
            <input
              type="date"
              value={this.state.venue.properties.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div>
            <label>Frequency:</label>
            <input
              type="text"
              value={this.state.venue.properties.frequency}
              onChange={this.onChangeFrequency}
            />
          </div>

          <div>
            <label>Start time:</label>
            <input
              type="time"
              value={this.state.venue.properties.startTime}
              onChange={this.onChangeStartTime}
            />
          </div>

          <div>
            <label>End time:</label>
            <input
              type="time"
              value={this.state.venue.properties.endTime}
              onChange={this.onChangeEndTime}
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="text"
              value={this.state.venue.properties.price}
              onChange={this.onChangePrice}
            />
          </div>

          <div>
            <label>PhoneNr:</label>
            <input
              type="text"
              value={this.state.venue.properties.phoneNr}
              onChange={this.onChangePhoneNr}
            />
          </div>

          <div>
            <label>Mail:</label>
            <input
              type="text"
              value={this.state.venue.properties.mail}
              onChange={this.onChangeMail}
            />
          </div>

          <div>
            <label>Website:</label>
            <input
              type="text"
              value={this.state.venue.properties.website}
              onChange={this.onChangeWebsite}
            />
          </div>

          <div>
            <input type="submit"
              value="Update" />
          </div>
        </form>
      </div>
    )
  }
}

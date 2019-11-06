import React, { Component } from 'react';
import venueService from "../../../services/venueService";
// updating coordinates might be missing here
export default class EditVenue extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
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
    this.setState({
      venue: {
        ...this.state.venue,
        properties: {
          ...this.state.venue.properties,
          address: e.target.value
        }
      }
    });
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
    });
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

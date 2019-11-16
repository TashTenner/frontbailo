import React, { Component } from 'react';
import { withAuth } from '../../../Context/AuthContext';
import schoolService from "../../../services/schoolService";
import { FormGroup, Input, Message, InputButton } from "../../addBailo/Form";

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
  accessToken: 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw'
});

class EditSchool extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeLng = this.onChangeLng.bind(this);
    this.onChangeLat = this.onChangeLat.bind(this);
    this.onChangePhoneNr = this.onChangePhoneNr.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      school: {
        _id: this.props.match.params,
        geometry: { coordinates: [0, 0] },
        properties: { name: "", address: "", phoneNr: "", mail: "", website: "" }
      },
      loading: true
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const school = await schoolService.getSchoolById(id);
      this.setState({
        school,
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
      school: {
        ...this.state.school,
        properties: { ...this.state.school.properties, name: e.target.value }
      }
    });
  };

  onChangeAddress(e) {
    this.setState({
      school: {
        ...this.state.school,
        properties: { ...this.state.school.properties, address: e.target.value }
      }
    });
    if (this.state.school.properties.address) {
      geocodingClient
        .forwardGeocode({ query: this.state.school.properties.address })
        .send()
        .then(response => {
          const match = response.body;
          this.setState({
            school: {
              ...this.state.school,
              geometry: {
                ...this.state.school.geometry,
                coordinates: [match.features[0].geometry.coordinates[0], match.features[0].geometry.coordinates[1]]
              }
            }
          })
        });
    }
  };

  onChangeLng(e) {
    this.setState({
      school: {
        ...this.state.school,
        geometry: {
          ...this.state.school.geometry,
          coordinates: [e.target.value, this.state.school.geometry[1]]
        }
      }
    });
  };

  onChangeLat(e) {
    this.setState({
      school: {
        ...this.state.school,
        geometry: {
          ...this.state.school.geometry,
          coordinates: [this.state.school.geometry[0], e.target.value]
        }
      }
    });
  };

  onChangePhoneNr(e) {
    this.setState({
      school: {
        ...this.state.school,
        properties: { ...this.state.school.properties, phoneNr: e.target.value }
      }
    });
  };

  onChangeMail(e) {
    this.setState({
      school: {
        ...this.state.school,
        properties: { ...this.state.school.properties, mail: e.target.value }
      }
    });
  };

  onChangeWebsite(e) {
    this.setState({
      school: {
        ...this.state.school,
        properties: { ...this.state.school.properties, website: e.target.value }
      }
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const { school } = this.state;
    const { history: { push } } = this.props;
    schoolService
      .updateSchool(school)
      .then(() => { push(`/`); })
      .catch(() => { });
  }

  render() {
    return (
      <FormGroup>
        <form onSubmit={this.onSubmit}>
          <Message>Update School:</Message>
          <FormGroup>
            <Input
              type="text"
              value={this.state.school.properties.name}
              onChange={this.onChangeName}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.school.properties.address}
              onChange={this.onChangeAddress}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              step="0.00000001"
              value={this.state.school.geometry.coordinates[0]}
              onChange={this.onChangeLng}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              step="0.00000001"
              value={this.state.school.geometry.coordinates[1]}
              onChange={this.onChangeLat}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.school.properties.phoneNr}
              onChange={this.onChangePhoneNr}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.school.properties.mail}
              onChange={this.onChangeMail}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.school.properties.website}
              onChange={this.onChangeWebsite}
            />
          </FormGroup>
          <InputButton type="submit" value="Update" />
        </form>
      </FormGroup>
    )
  }
}

export default withAuth(EditSchool);
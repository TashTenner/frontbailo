import React, { Component } from 'react';
import { withAuth } from '../../../Context/AuthContext';
import practicaService from "../../../services/practicaService";
import { FormGroup, Input, Message, InputButton } from "../../addBailo/Form";

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
  accessToken: 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw'
});

class EditPractica extends Component {
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
      practica: {
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
      const practica = await practicaService.getPracticaById(id);
      this.setState({
        practica,
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
      practica: {
        ...this.state.practica,
        properties: { ...this.state.practica.properties, name: e.target.value }
      }
    });
  };

  onChangeAddress(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        properties: { ...this.state.practica.properties, address: e.target.value }
      }
    });
    if (this.state.practica.properties.address) {
      geocodingClient
        .forwardGeocode({ query: this.state.practica.properties.address, autocomplete: true, types: ["country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi", "poi.landmark"] })
        .send()
        .then(response => {
          const match = response.body;
          this.setState({
            practica: {
              ...this.state.practica,
              geometry: {
                ...this.state.practica.geometry,
                coordinates: [match.features[1].geometry.coordinates[0], match.features[1].geometry.coordinates[1]]
              }
            }
          })
        });
    }
  };

  onChangeLng(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        geometry: {
          ...this.state.practica.geometry,
          coordinates: [e.target.value, this.state.practica.geometry[1]]
        }
      }
    });
  };

  onChangeLat(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        geometry: {
          ...this.state.practica.geometry,
          coordinates: [this.state.practica.geometry[0], e.target.value]
        }
      }
    });
  };

  onChangeDate(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        properties: { ...this.state.practica.properties, date: e.target.value }
      }
    });
  };

  onChangeFrequency(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        properties: { ...this.state.practica.properties, frequency: e.target.value }
      }
    });
  };

  onChangeStartTime(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        properties: { ...this.state.practica.properties, startTime: e.target.value }
      }
    });
  };

  onChangeEndTime(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        properties: { ...this.state.practica.properties, endTime: e.target.value }
      }
    });
  };

  onChangePrice(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        properties: { ...this.state.practica.properties, price: e.target.value }
      }
    });
  };

  onChangePhoneNr(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        properties: { ...this.state.practica.properties, phoneNr: e.target.value }
      }
    });
  };

  onChangeMail(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        properties: { ...this.state.practica.properties, mail: e.target.value }
      }
    });
  };

  onChangeWebsite(e) {
    this.setState({
      practica: {
        ...this.state.practica,
        properties: { ...this.state.practica.properties, website: e.target.value }
      }
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const { practica } = this.state;
    const { history: { push } } = this.props;
    practicaService
      .updatePractica(practica)
      .then(() => { push(`/`); })
      .catch(() => { });
  }

  render() {
    return (
      <FormGroup>
        <form onSubmit={this.onSubmit}>
          <Message>Update Practica:</Message>
          <FormGroup>
            <Input
              type="text"
              value={this.state.practica.properties.name}
              onChange={this.onChangeName}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.practica.properties.address}
              onChange={this.onChangeAddress}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              step="0.00000001"
              value={this.state.practica.geometry.coordinates[0]}
              onChange={this.onChangeLng}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              step="0.00000001"
              value={this.state.practica.geometry.coordinates[1]}
              onChange={this.onChangeLat}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="date"
              value={this.state.practica.properties.date}
              onChange={this.onChangeDate}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.practica.properties.frequency}
              onChange={this.onChangeFrequency}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="time"
              value={this.state.practica.properties.startTime}
              onChange={this.onChangeStartTime}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="time"
              value={this.state.practica.properties.endTime}
              onChange={this.onChangeEndTime}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.practica.properties.price}
              onChange={this.onChangePrice}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.practica.properties.phoneNr}
              onChange={this.onChangePhoneNr}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.practica.properties.mail}
              onChange={this.onChangeMail}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.practica.properties.website}
              onChange={this.onChangeWebsite}
            />
          </FormGroup>
          <InputButton type="submit" value="Update" />
        </form>
      </FormGroup>
    )
  }
}

export default withAuth(EditPractica);
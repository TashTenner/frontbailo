import React, { Component } from 'react';
import { withAuth } from '../../../Context/AuthContext';

import schoolService from "../../../services/schoolService";
// updating coordinates might be missing here

class EditSchool extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhoneNr = this.onChangePhoneNr.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      school: {
        _id: this.props.match.params,
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
        properties: {
          ...this.state.school.properties,
          name: e.target.value,
        }
      }
    });
  };


  onChangeAddress(e) {
    this.setState({
      school: {
        ...this.state.school,
        properties: {
          ...this.state.school.properties,
          address: e.target.value
        }
      }
    });
  };

  onChangePhoneNr(e) {
    this.setState({
      school: {
        ...this.state.school,
        properties: {
          ...this.state.school.properties,
          phoneNr: e.target.value
        }
      }
    });
  };

  onChangeMail(e) {
    this.setState({
      school: {
        ...this.state.school,
        properties: {
          ...this.state.school.properties,
          mail: e.target.value
        }
      }
    });
  };

  onChangeWebsite(e) {
    this.setState({
      school: {
        ...this.state.school,
        properties: {
          ...this.state.school.properties,
          website: e.target.value
        }
      }
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const { school } = this.state;
    const {
      history: { push }
    } = this.props;
    schoolService
      .updateSchool(school)
      .then(() => {
        push(`/`);
      })
      .catch(() => { });
  }

  render() {
    return (
      <div>
        <h3 align="center">Update School</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={this.state.school.properties.name}
              // value={this.state.school.properties.name || ''}
              onChange={this.onChangeName}
            />
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              value={this.state.school.properties.address}
              onChange={this.onChangeAddress}
            />
          </div>

          <div>
            <label>PhoneNr:</label>
            <input
              type="text"
              value={this.state.school.properties.phoneNr}
              onChange={this.onChangePhoneNr}
            />
          </div>

          <div>
            <label>Mail:</label>
            <input
              type="text"
              value={this.state.school.properties.mail}
              onChange={this.onChangeMail}
            />
          </div>

          <div>
            <label>Website:</label>
            <input
              type="text"
              value={this.state.school.properties.website}
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

export default withAuth(EditSchool);
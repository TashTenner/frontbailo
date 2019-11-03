// import React from "react";
// import { Link } from "react-router-dom";
// import venueService from "../../../services/venueService";

// import VenueLongDetail from "../venues/VenueLongDetail";

// export default class VenueInfo extends PureComponent {
//   render() {
//     // const { info } = this.props;
//     // const displayName = `${info.properties.name}`;
//     // const venueId = `${info.venue._id}`;

//     return (
//       <div>
//         hola
//         <div>
//           {/* {displayName} | */}
//           {/* <Route path="/:id" component={VenueLongDetail} /> */}
//           {/* <a target="_new" href={`http://localhost:3000/milonga/${venueId}`}>
//             {displayName}
//           </a> */}
//         </div>
//         {/* <img width={240} src={info.properties.mainPhoto} alt="" /> */}
//       </div>
//     );
//   }
// }

// const VenueLongDetail = props => {
//   const getVenueId = id => {
//     const theVenueCode = oneVenue => {
//       return oneVenue._id === id;
//     };
//     return venueService.find(theCountryCode);
//   };

//   const { params } = props.match;
//   const foundCountryCode = getCountryCode(params.id);

//   return (
//     <div className="col-7">
//       <h1>{foundCountryCode.name.common}</h1>
//       <table className="table">
//         <thead></thead>
//         <tbody>
//           <tr>
//             <td className="CountryDetail-Width">Capital</td>
//             <td>{foundCountryCode.capital}</td>
//           </tr>
//           <tr>
//             <td>Area</td>
//             <td>
//               {foundCountryCode.area} km
//               <sup>2</sup>
//             </td>
//           </tr>
//           <tr>
//             <td>Borders</td>
//             <td>
//               <ul>
//                 {foundCountryCode.borders.map((cca3, index) => {
//                   const country = getCountryCode(cca3).name.common;
//                   return (
//                     <li key={`${cca3}-${index}`}>
//                       <Link to={`/${cca3}`}>{country}</Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VenueLongDetail;

import React, { Component } from "react";
// import { Link } from "react-router-dom";
import venueService from "../../../services/venueService";

// import axios from "axios";

import VenueCard from "./components/VenueCard";

class VenueLongDetail extends Component {
  state = {
    book: {},
    loading: true
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    try {
      const venue = await venueService.getVenueById(id);
      this.setState({
        venue,
        loading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false
      });
    }
  }

  // deleteProject = () => {
  //   const { params } = this.props.match;
  //   axios
  //     .delete(`http://localhost:3000/api/books/${params.id}`)
  //     .then(() => {
  //       this.props.history.push("/books"); // !!!
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
    const { venue, loading } = this.state;
    console.log("render");
    return (
      <>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <VenueCard venue={venue} />
            {/* <button onClick={() => this.deleteProject()}>Delete</button> */}
          </div>
        )}
      </>
    );
  }
}

export default VenueLongDetail;

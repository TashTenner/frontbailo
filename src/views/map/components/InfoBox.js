// import React, { PureComponent } from "react";

// export default class InfoBox extends PureComponent {
//   render() {
//     // const { searchResultLayer } = this.props;

//     return (
//       <div>
//         hola
//         {/* {searchResultLayer.event.result.geometry.coordinates[0]} */}
//       </div>
//     );
//   }
// }



import React, { PureComponent } from 'react';

import "./InfoBox.css";

const defaultContainer = ({ children }) => <div className="InfoBox">{children}</div>;

export default class InfoBox extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (

      <Container>
        <h3>Static InfoBox</h3>
      </Container>
    );
  }
}
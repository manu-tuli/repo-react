import React, { Component } from 'react';

import './EssaisRestant.css';

class EssaisRestant extends Component {
  render() {
    return (
      <div className="">
        <span>Nombre d'essais restant: <span className="">
            {this.props.essaisRestant}
          </span>
        </span>
      </div>
    );
  }
};



export default EssaisRestant;
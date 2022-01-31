import React, { Component, PropTypes } from 'react';
import './Lettre.css';

class Lettre extends Component {
  render() {
    // console.log(this.props.value);
    return (
      <span className="lettre">
        {this.props.value}
      </span>
    );
  }
}


export default Lettre;

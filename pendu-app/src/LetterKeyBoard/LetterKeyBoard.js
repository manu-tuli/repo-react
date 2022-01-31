import React, { Component, PropTypes } from 'react';
import './LetterKeyBoard.css';

class LetterKeyBoard extends Component {


    render() {
        // console.log(this.props.value);
        return (
        <span className="lettre" onClick={this.props.onClick}>
            {this.props.value}   
        </span>
        );
    }
}


export default LetterKeyBoard;

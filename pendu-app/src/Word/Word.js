import React, { Component } from 'react';

import './Word.css';
import Lettre from '../Lettre/Lettre';

class Word extends Component {
  render() {
    
    return (
      <div className="mot">
        {/* {this.props.motCache} */}
        {/* {this.props.motCache && this.props.motCache.map((letter, index) => {
            const letterValue = ( letter ===  this.props.lettreDonnee) ? letter : '_'; */}
                {this.props.motCache && this.props.motCache.map((letter, index) => {

        return (
              <Lettre
                key={index}
                value={letter}
              />
            );
          })} 
        </div>

        
    );
  }
};



export default Word;
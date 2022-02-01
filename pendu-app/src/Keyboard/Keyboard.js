import React, { Component } from 'react';
import './Keyboard.css';
import LetterKeyBoard from '../LetterKeyBoard/LetterKeyBoard';

const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

class Keyboard extends Component {

    render() {
        return (
            <div className="letter-container" style= {{display: "flex"}}>
            {alphabet
            .filter(lettre => this.props.pastGuesses.indexOf(lettre) === -1)
            .map( (letter, index) => {       
                            return (
                                <LetterKeyBoard
                                    key={index}
                                    value={letter}
                                    onClick={this.props.onClick.bind(null,letter)}
                                />
                            );
                    }
                )}
            </div>
        );
    };
};



export default Keyboard;
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
        {/* <RenderRow lettre={"E"}/> */}
            {/* <span className="letter" style={{backgroundColor: "white"}}>A</span>
            <span className="letter" style={{backgroundColor: "white"}}>B</span>
            <span className="letter" style={{backgroundColor: "white"}}>C</span>
            <span className="letter" style={{backgroundColor: "white"}}>D</span>
            <span className="letter" style={{backgroundColor: "white"}}>E</span>
            <span className="letter" style={{backgroundColor: "white"}}>F</span>
            <span className="letter" style={{backgroundColor: "white"}}>G</span>
            <span className="letter" style={{backgroundColor: "white"}}>H</span>
            <span className="letter" style={{backgroundColor: "white"}}>I</span>
            <span className="letter" style={{backgroundColor: "white"}}>J</span>
            <span className="letter" style={{backgroundColor: "white"}}>K</span>
            <span className="letter" style={{backgroundColor: "white"}}>L</span>
            <span className="letter" style={{backgroundColor: "white"}}>M</span>
            <span className="letter" style={{backgroundColor: "white"}}>N</span>
            <span className="letter" style={{backgroundColor: "white"}}>O</span>
            <span className="letter" style={{backgroundColor: "white"}}>P</span>
            <span className="letter" style={{backgroundColor: "white"}}>Q</span>
            <span className="letter" style={{backgroundColor: "white"}}>R</span>
            <span className="letter" style={{backgroundColor: "white"}}>S</span>
            <span className="letter" style={{backgroundColor: "white"}}>T</span>
            <span className="letter" style={{backgroundColor: "white"}}>U</span>
            <span className="letter" style={{backgroundColor: "white"}}>V</span>
            <span className="letter" style={{backgroundColor: "white"}}>W</span>
            <span className="letter" style={{backgroundColor: "white"}}>X</span>
            <span className="letter" style={{backgroundColor: "white"}}>Y</span>
            <span className="letter" style={{backgroundColor: "white"}}>Z</span> */}
        </div>
    );
};
};
// function RenderRow() {
//     console.log(this.props.pastGuesses)
//     const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//     // const children = alphabet
//     //    {this.props.pastGuesses && this.props.pastGuesses
//     alphabet
//     .filter(letter => this.props.pastGuesses.indexOf(this.props.lettre) === -1)
//        .map( (letter, index) => {       
//                         console.log(letter)
//                         console.log(this.props.lettreDonnee)
//                         console.log(letter ===  this.props.lettreDonnee)
//                         const letterValue = ( letter ===  this.props.lettreDonnee) ? letter : '_';
//                         // console.log(letterValue)
//                         return (
//                             <Lettre
//                                 key={index}
//                                 value={letterValue}
//                             />
//                         );
//                 }
//             )
// } 


export default Keyboard;
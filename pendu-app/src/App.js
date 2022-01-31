import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import EssaisRestant from './EssaisRestant/EssaisRestant';
import Word from './Word/Word';
import Keyboard from './Keyboard/Keyboard';
import { GAME_WON, GAME_STARTED, GAME_OVER } from './Enums/game-states';
import * as THREE from "three";
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';


const dictionnaire = ["animaux", "dictionnaire", "quantum", "pendu", "voiture", "accident", "biere", "professionel", "classes", "collections"];

class App extends Component {

  constructor(props) {
    super(props);
      this.genererMots();
      this.handleClick = this.handleClick.bind(this);
  }


  genererMots(){
    const result = [];
    let index = Math.floor(Math.random()* dictionnaire.length)
    let mot = dictionnaire[index];
    const motCache = [];
    const word = mot.split('')
    while (word.length>0) {
      const letter = word.shift().toUpperCase()
      result.push(letter)
      motCache.push('_');
    }
    this.state = {
      date: new Date(),
      essaisRestant: 10,
      // motCache: Array.from("test pendu"),
      motAtrouver : result,
      motCache: motCache,
      lettreDonnee: "",
      pastGuesses: [],
      gameState: GAME_STARTED,
      win : false
      };
      console.log(this.state.motAtrouver)
     

  }

  genererMotATrouver(){
    const result = []
    let index = Math.floor(Math.random()* dictionnaire.length)
    let mot = dictionnaire[index]
    const word = mot.split('')

    while (word.length>0) {
      const letter = word.shift().toUpperCase()
      result.push(letter)
    }
    
    return result
  }

   genererMotCache(){
    const result = []

    for (var i=0 ; i< this.state.motAtrouver.length ; i++){
      result.push('_')
    }
     this.setState((prevState, props) => {
      return {
          motCache : result
         };
    });
    
  }

  checkWin(newmotCache){
    let win = "false";
    
    for (var i=0; i < newmotCache.length ; i++){
        if (newmotCache[i] != this.state.motAtrouver[i]){
          win = "false"
          
        }
        else
        {
          win = "true";
        }
    }
    
    return win;
  }

  handleClick(letter) {
    let newmotCache = this.state.motCache;
    let newnbEssais = this.state.essaisRestant;

    this.state.motAtrouver.map((lettre, index) => {
       return ( lettre === letter) ? 
       newmotCache[index] = letter : 
       newmotCache[index] != '_' ?  newmotCache[index] =  newmotCache[index] : '_';
    });

    this.setState((prevState, props) => {
      const bool = this.checkWin(newmotCache);
  
      if (bool === "false"){
        newnbEssais = newnbEssais -1 ;
      } 
       let stateUpdate = {
          motCache: newmotCache,
          pastGuesses: [letter].concat(prevState.pastGuesses),
          win: bool,
          essaisRestant : newnbEssais
        };
      return stateUpdate
    });

  }

  FoundedOrNot () {
     
    const found ='Tu as gagné !!!';
    const cont = 'Continue';

    if(this.state.win === "false")
    {
      return cont;
      
    }
    else 
    {
      return found;
    }
   
    
  
  }
    
     
     
  
  

  render() {
    const gameProps = {
      ...this.state
    };
    
    return (
      <div className="Hangman">
        <div className='Header'>
          <h1 className ='Title'>Jeux du Pendu</h1>
          <h2 className ='Devs'>Développé par Van-Rottana YOU, Manu LUTI et Clément Vaugoyeau</h2>
          <hr />
          </div>
          <Word {...gameProps}/>
          <EssaisRestant {...gameProps}/>
          <Keyboard onClick={this.handleClick} {...gameProps}/>
         
           <div className='Win' > {this.FoundedOrNot()}</div> 
           <div>result : {this.state.win}</div>
          <div id="anim"></div>
         
        </div>
    );
  }
}

export default App;

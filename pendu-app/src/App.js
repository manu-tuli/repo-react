import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import EssaisRestant from './EssaisRestant/EssaisRestant';
import Word from './Word/Word';
import Keyboard from './Keyboard/Keyboard';
import { GAME_WON, GAME_STARTED, GAME_OVER } from './Enums/game-states';
import * as THREE from "three";

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import song from "./jeux_video_game_over.mp3";

const dictionnaire = ["animaux", "dictionnaire", "quantum", "pendu", "voiture", "accident", "biere", "professionel", "classes", "collections"];

class App extends Component {

  constructor(props) {
    super(props);
      this.genererMots();
      this.handleClick = this.handleClick.bind(this);
      let mixer;
      let model;
      let gltf;
      let clock;
      let controls;
      let scene;
      let camera;
      let renderer;

  }

  componentDidMount() {
    this.clock = new THREE.Clock();
    let light;
    const SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;
    this.scene = new THREE.Scene();
    const loader = new GLTFLoader();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    this.scene.background = new THREE.Color( 0xffffff );
		this.scene.fog = new THREE.Fog( 0xfffff, 1000, 3000 );
    const ambient = new THREE.AmbientLight( 0x444444 );
		this.scene.add( ambient );
    light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 5, 0.3 );
		light.position.set( 0, 1500, 1000 );
		light.target.position.set( 0, 0, 0 );

		light.castShadow = true;
		light.shadow.camera.near = 1200;
		light.shadow.camera.far = 2500;
		light.shadow.bias = 0.0001;

		light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
		light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

		this.scene.add( light );
    

    this.renderer = new THREE.WebGLRenderer({antialias:true});

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('anim').appendChild(this.renderer.domElement);
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.update();
    loader.load("./Clement 3D/pendu7.glb", (gltf) => {
      this.gltf = gltf;
      this.model = gltf.scene;
      let perso = this.model.getObjectByName('perso');

      var textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = true;
      
      var axis = new THREE.Vector3(0,1,0);
      // var position = new THREE.Vector3(0,1,0);
      this.model.rotateOnAxis(axis,3.5);
      this.model.position.x= -8;
      this.model.position.y= 0;
      this.model.position.z= 0;
      this.mixer = new THREE.AnimationMixer( this.model );
      const clips = gltf.animations;

      this.scene.add( this.model );


    });

 
    this.camera.position.z = 12;
    this.camera.position.y = 3;
    // this.camera.position.x = 0;

    let mix = this.mixer;
    let newcontrols = this.controls;
    let newrenderer = this.renderer;
    let scene = this.scene;
    let camera = this.camera;
     var animate = function () {
      requestAnimationFrame( animate );
      
      if (mix) {
        mix.update(this.clock.getDelta());
      }
      newcontrols.update();
      newrenderer.render( scene, camera );
    };

    animate();
  }

  playAnimation(){
    
      this.mixer = new THREE.AnimationMixer( this.model );
      const clips = this.gltf.animations;

      const clipLevier = THREE.AnimationClip.findByName(clips,'LevierAction');
      const actionlevier = this.mixer.clipAction(clipLevier);
      actionlevier.setLoop(THREE.LoopOnce);
      actionlevier.clampWhenFinished = true;

      const clipTrappe = THREE.AnimationClip.findByName(clips,'TrappeAction');
      const actionTrappe = this.mixer.clipAction(clipTrappe);
      actionTrappe.setLoop(THREE.LoopOnce);
      actionTrappe.clampWhenFinished = true;

      const clipPerso = THREE.AnimationClip.findByName(clips,'persoAction');
      const actionPerso = this.mixer.clipAction(clipPerso);
      actionPerso.setLoop(THREE.LoopOnce);
      actionPerso.clampWhenFinished = true;

      const clipCorde= THREE.AnimationClip.findByName(clips,'BezierCircle.003Action');
      const actionCorde = this.mixer.clipAction(clipCorde);
      actionCorde.setLoop(THREE.LoopOnce);
      actionCorde.clampWhenFinished = true;

      const promise1 = Promise.resolve(actionlevier.play());
      promise1.then((value) => {
        actionTrappe.play();    
        actionPerso.play(); 
        actionCorde.play();
      });
      
      let mix = this.mixer;
      let newcontrols = this.controls;
      let newrenderer = this.renderer;
      let scene = this.scene;
      let camera = this.camera;
      let clock = this.clock;
      var animate = function () {
        requestAnimationFrame( animate );
        
        if (mix) {
          mix.update(clock.getDelta());
        }
        newcontrols.update();
        newrenderer.render( scene, camera );
      };

    animate();

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
      motAtrouver : result,
      motCache: motCache,
      lettreDonnee: "",
      pastGuesses: [],
      gameState: GAME_STARTED,
      win : ""
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

    let win = "true";

    for (var i=0; i < newmotCache.length ; i++){
        if (newmotCache[i] != this.state.motAtrouver[i]){
          win = "false"
        }
    }
    
    if (this.state.essaisRestant === 1){
      const audio = new Audio(song)
      audio.play();
      this.playAnimation();
      win = "false"
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
    const fail = 'Tu as perdu !!!';

    let conmpteur = 0;

    if(this.state.win === "false" && this.state.essaisRestant > 0){
      conmpteur = 0;     
    }

    if(this.state.win === "false" && this.state.essaisRestant <= 0){
      conmpteur = 1;     
    }

    if(this.state.win === "true" && this.state.essaisRestant > 0){
      conmpteur = 2;     
    }

    switch (conmpteur)
    {
        case 0:
            return cont;
            break;

        case 1:
            return fail;
            break;

        case 2:
            return found
            break;

        default:
            return 'bug'
            break;
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
        <div className="corps">
          <div className="jeu">
            <Word {...gameProps}/>
            <EssaisRestant {...gameProps}/>
            <Keyboard onClick={this.handleClick} {...gameProps}/>
            <div className='Win'> {this.FoundedOrNot()}</div>
          </div>
          <div id="anim"></div>
        </div>
        <audio id="audioPlayer" src="./jeux_video_game_over.mp3"></audio>
      </div>
    );
  }
}

export default App;

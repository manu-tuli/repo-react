import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import EssaisRestant from './EssaisRestant/EssaisRestant';
import Word from './Word/Word';
import Keyboard from './Keyboard/Keyboard';
import { GAME_WON, GAME_STARTED, GAME_OVER } from './Enums/game-states';
import * as THREE from "three";
// import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import song from "./jeux_video_game_over.mp3";

const dictionnaire = ["animaux", "dictionnaire", "quantum", "pendu", "voiture", "accident", "biere", "professionel", "classes", "collections"];

class App extends Component {

  constructor(props) {
    super(props);
      this.genererMots();
      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let light;
    const SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;
    var scene = new THREE.Scene();
    const loader = new GLTFLoader();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // const light = new THREE.PointLight( 0xff0000, 1, 100 );
    // light.position.set( 50, 50, 50 );
    scene.background = new THREE.Color( 0xffffff );
		scene.fog = new THREE.Fog( 0xfffff, 1000, 3000 );
    const ambient = new THREE.AmbientLight( 0x444444 );
		scene.add( ambient );
    light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 5, 0.3 );
		light.position.set( 0, 1500, 1000 );
		light.target.position.set( 0, 0, 0 );

		light.castShadow = true;
		light.shadow.camera.near = 1200;
		light.shadow.camera.far = 2500;
		light.shadow.bias = 0.0001;

		light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
		light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

		scene.add( light );
    
    // scene.background = new THREE.Color(0xffffff);
    const renderer = new THREE.WebGLRenderer({antialias:true});

    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    document.getElementById('anim').appendChild(renderer.domElement);
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();
    loader.load("./Clement 3D/pendu2Binary.glb", (gltf) => {
    // loader.load("./OilCan.glb", (gltf) => {
      let model = gltf.scene;
      // let part = model.getObjectByName('perso')

      // console.log(model)
      // console.log(gltf);

      var textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = true;
      
      // textureLoader.load("./Clement 3D/FullRender_MK1.jpg", function(texture) {
      //     console.log(texture)
      //     texture.anisotropy = 16
      //     var material = new THREE.MeshPhongMaterial( { map: texture, opacity:1, transparent: true} );
      //     model.material = material
      // });

      // model.scale.set(20.5,20.5,20.5)
      var axis = new THREE.Vector3(0,1,0);
      model.rotateOnAxis(axis,2.9);
      scene.add( model );
      // renderer.render( scene, camera );
      
      // scene.add(gltf.scene);

    });

 
    camera.position.z = 10;
    camera.position.y = 1;
    camera.position.x = -1;
    // const controls = new OrbitControls(this.camera, this.renderer.domElement);
     var animate = function () {
      requestAnimationFrame( animate );
      controls.update();
      renderer.render( scene, camera );
    };

    // loader.load( '../public/scripts/pendu.glb', function ( gltf ) {

    //   scene.add( gltf.scene );

    // }, undefined, function ( error ) {

    //   console.error( error );

    // } );

    animate();
  }

  // animate() {
  //   requestAnimationFrame(animate);
  //   obj.rotation.y += 0.001;
  //   renderer.render(scene, camera);
  // }


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
    let win = "true";
    for (var i=0; i < newmotCache.length ; i++){
        if (newmotCache[i] != this.state.motAtrouver[i]){
          win = "false"
        }
    }

    if (this.state.essaisRestant === 1){
      const audio = new Audio(song)
      // audio.play();
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

  render() {
    const gameProps = {
      ...this.state
    };

    return (
      <div className="Hangman">
          <h1>Jeux du Pendu</h1>
          <h2>Développé par Van-Rottana YOU, Manu LUTI et Clément Vaugoyeau</h2>
          <hr />
          <Word {...gameProps}/>
          <EssaisRestant {...gameProps}/>
          <Keyboard onClick={this.handleClick} {...gameProps}/>
          <div>WIN :{this.state.win}</div>
          <div id="anim"></div>
          <audio id="audioPlayer" src="./jeux_video_game_over.mp3"></audio>
          {/* <audio>
            <source src="jeux_video_game_over.mp3" type="audio/mp3">
          </audio> */}
        </div>
    );
  }
}

export default App;

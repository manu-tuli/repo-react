// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
// import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

// const loader = new THREE.GLTFLoader();

// loader.load( './pendu.fbx', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

// import * as THREE from '../node_modules/three';
// import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// import * as THREE from "../node_modules/three/build/three.module.js";

// import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

import * as THREE from '../node_modules/three';
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader';

const loader = new THREE.GLTFLoader();

loader.load( './OilCan.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

const scene = new THREE.Scene();
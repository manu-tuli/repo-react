// import * as THREE from '../node_modules/three';
// import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

// document.getElementsByClassName('entete')[0].appendChild(renderer.domElement);
document.getElementById('anim').appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement);

const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 10, 5 );
// const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var material = new THREE.MeshLambertMaterial( { color: "#0094D7", wireframe: true } );

var sphere = new THREE.Mesh( geometry, material );

// scene.add(sphere);

let wireframe = new THREE.WireframeGeometry( geometry );

    let line = new THREE.LineSegments( wireframe );
        
    line.material.color.setHex(0x0094D7);
        
    scene.add(line);

camera.position.z = 20;

function animate() {
  requestAnimationFrame(animate);
  line.rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();



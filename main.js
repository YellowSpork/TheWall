import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
camera.position.set(0, -0.5, 30);
camera.rotateX(0.01);

renderer.render( scene, camera );

const loader = new GLTFLoader();

function loadCube( x, y ) {
  loader.load( 'moreBricks.glb', function ( gltf ) {
    gltf.scene.rotateY(Math.PI / 2);
    gltf.scene.position.set( x, y, 0 );
    scene.add( gltf.scene );
  }, undefined, function ( error ) {
    console.error( error );
  } );
}

var posX = -45;
var posY = -20;
var row = 0;
var column = 1;
var length = 13;
var count = 0;

function wallMaker() {
  const geometry = new THREE.BoxGeometry( 8, 4.5, 5 );
  const edges = new THREE.EdgesGeometry( geometry );
  const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
  line.position.set( posX, posY, 0 )

  scene.add(line)
  loadCube( posX, posY )

  posX += 8
  row += 1
  count += 1

  if (row == length) {
    posY += 4.5
    if (column % 2 == 1) {
      posX -= 8 * length + 4
    }
    else {
      posX -= 8 * length - 4
    }
    row = 0
    column += 1
  }

  if (count == 17 | count == 18 | count == 19 | count == 40 | count == 41 | count == 42) {
    posX += 8
    row += 1
  }
}

const bricks = Array(124).fill().forEach(wallMaker);

const geometry = new THREE.BoxGeometry( 8, 4.5, 5 );
const material = new THREE.MeshStandardMaterial( { color: 0xe8e8e8 } );
const box1 = new THREE.Mesh( geometry, material );
const box2 = new THREE.Mesh( geometry, material );
const box3 = new THREE.Mesh( geometry, material );
const box4 = new THREE.Mesh( geometry, material );
const box5 = new THREE.Mesh( geometry, material );
const box6 = new THREE.Mesh( geometry, material );
const edges = new THREE.EdgesGeometry( geometry );
const line1 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
const line2 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
const line3 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
const line4 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
const line5 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
const line6 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
line1.position.set( -17, -6.5, 0 );
line2.position.set( -1, -6.5, 0 );
line3.position.set( 15, -6.5, 0 );
line4.position.set( -17, -15.5, 0 );
line5.position.set( -1, -15.5, 0 );
line6.position.set( 15, -15.5, 0 );
box1.position.set( -17, -6.5, 0);
box2.position.set( -1, -6.5, 0);
box3.position.set( 15, -6.5, 0);
box4.position.set( -17, -15.5, 0);
box5.position.set( -1, -15.5, 0);
box6.position.set( 15, -15.5, 0);

scene.add(line1, line2, line3, line4, line5, line6, box1, box2, box3, box4, box5, box6)

function brickMove( inputBox, inputLine, cameraY ) {
  gsap.to( inputBox.position, {
    duration: 0.5,
    z: 6
  } )
  gsap.to( inputBox.rotation, {
    delay: 0.2,
    duration: 0.5,
    ease: "power1.in",
    x: Math.PI / 2
  } )
  gsap.to( inputBox.position, {
    delay: 0.4,
    duration: 0.3,
    ease: "power1.in",
    y: -25
  } )
  gsap.to( inputLine.position, {
    duration: 0.5,
    z: 6
  } )
  gsap.to( inputLine.rotation, {
    delay: 0.2,
    duration: 0.5,
    ease: "power1.in",
    x: Math.PI / 2
  } )
  gsap.to( inputLine.position, {
    delay: 0.4,
    duration: 0.3,
    ease: "power1.in",
    y: -25
  } )
  gsap.to( camera.position, {
    delay: 1,
    duration: 1.5,
    ease: 'power1.inOut',
    x: inputBox.position.x,
    y: cameraY,
    z: 0
  } )
}

function brickMove1() {
  brickMove( box1, line1, -6.5 );
}

function brickMove2() {
  brickMove( box2, line2, -6.5 );
}

function brickMove3() {
  brickMove( box3, line3, -6.5 );
}

function brickMove4() {
  brickMove( box4, line4, -15.5 );
}

function brickMove5() {
  brickMove( box5, line5, -15.5 );
}

function brickMove6() {
  brickMove( box6, line6, -15.5 );
}

var back = document.getElementById('zoom');
var wallFull = document.getElementById('wallFull');
var pVisible;

function zoom(p) {
  if(!window.AnimationEvent) { return; }
  wallFull.classList.remove('fadeIn')
  wallFull.classList.add('fadeOut')
  back.classList.remove('fadeOut')
  back.classList.add('fadeIn')
  var text = document.getElementById(p);
  pVisible = p
  text.classList.remove('fadeOut')
  text.classList.add('fadeIn')
}

function goBack() {
  gsap.to( camera.position, {
    delay: 0.5,
    duration: 1.5,
    ease: 'power2.in',
    x: 0,
    y: -0.5,
    z: 30
  } )
  if(!window.AnimationEvent) { return; }
  wallFull.classList.remove('fadeOut')
  wallFull.classList.add('fadeIn')
  back.classList.remove('fadeIn')
  back.classList.add('fadeOut')
  var text = document.getElementById(pVisible);
  text.classList.remove('fadeIn')
  text.classList.add('fadeOut')
}

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const button5 = document.getElementById("button5");
const button6 = document.getElementById("button6");
const backButton = document.getElementById("back");
button1.addEventListener( "click", () => {
  brickMove1();
  zoom(1);
  window.scrollTo( 0, 0 );
} );
button2.addEventListener( "click", () => {
  brickMove2();
  zoom(2);
  window.scrollTo( 0, 0 );
} );
button3.addEventListener( "click", () => {
  brickMove3();
  zoom(3);
  window.scrollTo( 0, 0 );
} );
button4.addEventListener( "click", () => {
  brickMove4();
  zoom(4);
  window.scrollTo( 0, 0 );
} );
button5.addEventListener( "click", () => {
  brickMove5();
  zoom(5);
  window.scrollTo( 0, 0 );
} );
button6.addEventListener( "click", () => {
  brickMove6();
  zoom(6);
  window.scrollTo( 0, 0 );
} );
backButton.addEventListener( "click", () => {
  goBack();
  window.scrollTo( 0, 0 );
} );

const pointLight = new THREE.PointLight( 0xffffff, 100 )
pointLight.position.set(10,10,10)
const ambientLight = new THREE.AmbientLight( 0xffffff, 3 )
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

function animate() {
  requestAnimationFrame( animate );

  renderer.render( scene, camera );
}

animate()
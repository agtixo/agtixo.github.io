const cardboardModel = "Baofeng Mojing S1";
const smartPhoneModel = "Samsung S8";
const screen_WtoH = {w: 18.5, h: 9}; // aspect ratio
const screenDiagonal = 147.2; //in mm
const screenSize = {w: 132.4, h: 64.4}; // in mm
const pixDens = 570; //ppi
const inch = 25.4; // in mm
const resHDP = {w: 1480, h: 720};
const resFHDP = {w: 2220, h: 1080};
const resWQHDP = {w: 2960, h: 1440};

const meshColumns = 11;  // Must be odd
const meshRows = 13;  //  Must be odd

const cameraAngle = 30;

const minCamDist = 1;
const maxCamDist = 1000;
const scrCamPos = -100;
const bufCamPos = 150;
const eyeDistance = 3.5;

// set up the sphere params
const radius = 25;
const segments = 32;
const rings = 32;

var bufCamera = new THREE.PerspectiveCamera(cameraAngle, meshColumns/meshRows, minCamDist, maxCamDist );
bufCamera.position.z = bufCamPos;
bufCamera.position.x = eyeDistance;

var bufCamera2 = new THREE.PerspectiveCamera(cameraAngle, meshColumns/meshRows, minCamDist, maxCamDist );
bufCamera2.position.z = bufCamPos;
bufCamera2.position.x = -eyeDistance;

var scenePointLight = new THREE.PointLight( 0xFFFFFF );
var bufferPointLight = new THREE.PointLight( 0xFFFFFF );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
var bufferScene = new THREE.Scene();

// Create texture to store rendering result
var bufferTexture = new THREE.WebGLRenderTarget( 2048, 2048, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
var bufferTexture2 = new THREE.WebGLRenderTarget( 2048, 2048, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});

var globeGeometry = new THREE.SphereGeometry(radius, segments, rings);

var bufMaterial = new THREE.MeshBasicMaterial({map:bufferTexture});
var bufMaterial2 = new THREE.MeshBasicMaterial({map:bufferTexture2});

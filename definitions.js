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

const meshColumns = 7;
const meshRows = 9;
const cameraAngle = 30;

const minCamDist = 1;
const maxCamDist = 1000;
const scrCamPos = -100;
const bufCamPos =150;
const eyeDistance = 3.5;

// set up the sphere params
const radius = 25;
const segments = 32;
const rings = 32;


//var width = resHDP.w; //window.innerWidth;
//var height = resHDP.h; //window.innerHeight;
var width = window.innerWidth;
var height = window.innerHeight;

var ww = 150;




var bufCamera = new THREE.PerspectiveCamera(cameraAngle, meshColumns/meshRows, minCamDist, maxCamDist );
bufCamera.position.z = bufCamPos;
bufCamera.position.x = eyeDistance;
//this.perspective = "Perspective";

var bufCamera2 = new THREE.PerspectiveCamera(cameraAngle, meshColumns/meshRows, minCamDist, maxCamDist );
bufCamera2.position.z = bufCamPos;
bufCamera2.position.x = -eyeDistance;

//bufCamera.lookAt(new THREE.Vector3(0, 0, -100));
//bufCamera2.lookAt(new THREE.Vector3(0, 0, -100));

// create a point light
var scenePointLight = new THREE.PointLight( 0xFFFFFF );
// create a point light
var bufferPointLight = new THREE.PointLight( 0xFFFFFF );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
var bufferScene = new THREE.Scene();




// Создаем текстуру, в которой будет храниться результат рендера
var bufferTexture = new THREE.WebGLRenderTarget( 2048, 2048, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
var bufferTexture2 = new THREE.WebGLRenderTarget( 2048, 2048, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});

///And a blue plane behind it
var planeMaterial = new THREE.MeshBasicMaterial({color:0x888888}); //7074FF})
var plane = new THREE.PlaneBufferGeometry(width, height );
var planeObject = new THREE.Mesh(plane, planeMaterial);

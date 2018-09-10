
var bufCameraL = new THREE.PerspectiveCamera(cameraAngle, meshColumns/meshRows, minCamDist, maxCamDist );
bufCameraL.position.z = bufCamPos;
bufCameraL.position.x = eyeDistance;

var bufCameraR = new THREE.PerspectiveCamera(cameraAngle, meshColumns/meshRows, minCamDist, maxCamDist );
bufCameraR.position.z = bufCamPos;
bufCameraR.position.x = -eyeDistance;

var bufferPointLight = new THREE.PointLight( 0xFFFFFF );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
var bufferScene = new THREE.Scene();

// Create texture to store rendering result
var bufferTextureL = new THREE.WebGLRenderTarget( 2048, 2048, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
var bufferTextureR = new THREE.WebGLRenderTarget( 2048, 2048, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});

var globeGeometry = new THREE.SphereGeometry(radius, segments, rings);

var vertShader = document.getElementById('vertexShader').innerHTML;
var fragShader = document.getElementById('fragmentShader').innerHTML;

// Загрузка текстуры завершена
var onLoad = function (texture) {

	var earthMaterial = new THREE.MeshPhongMaterial({
		map: texture,
		shading: THREE.None //THREE.None, THREE.FlatShading, THREE.SmoothShading
	});

	var globe = new THREE.Mesh(globeGeometry, earthMaterial);

	addToScene(bufferScene, bufferPointLight, 10, 50, 130);
	addToScene(bufferScene, globe, 0, 0, 0);

	var mm_px = screenSize.h / (meshRows * d0);
	var box1 = getBox(mm_px);
	var xc = (box1.maxX - box1.minX)/2;

	// Левый кадр
	var leftFrame = newFrame(bufferTextureL);
	addToScene(scene, leftFrame, -xc , 0, 0);

	// Правый кадр
	var rightFrame = newFrame(bufferTextureR);
	addToScene(scene, rightFrame, xc , 0, 0);

	var ht=(box1.maxY - box1.minY);
	var wid = window.innerWidth/window.innerHeight*ht; //resHDP.w/resHDP.h * ht;

	var scrCamera = new THREE.OrthographicCamera(-wid/2, wid/2,  ht/2 , - ht/2, -100, 100);
	scrCamera.position.x = 0;
	scrCamera.position.y = 0;
	scrCamera.position.z = scrCamPos;
	scrCamera.lookAt(new THREE.Vector3(0, 0,-500));

	globe.rotation.y = -90 * Math.PI/180;
	bufCameraL.lookAt(new THREE.Vector3(0,0,radius));
	bufCameraR.lookAt(new THREE.Vector3(0,0,radius));

	var render = function () {
			// globe.rotation.y += 0.003;
			// Делаем рендер во внеэкранную текстуру
			renderer.render(bufferScene, bufCameraL, bufferTextureL);
			renderer.render(bufferScene, bufCameraR, bufferTextureR);
			// Делаем рендер на экран
			renderer.render(scene, scrCamera);
			// Запрос очередного обновления кадра для запуска render()
			requestAnimationFrame(render);
	};

	render();

	window.onresize = function() {
			var k = window.innerWidth / window.innerHeight * ht / 2;
			scrCamera.left = -k;
			scrCamera.right = k;
			scrCamera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
	}
}

// Function called when download progresses
var onProgress = function (xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
};

// Function called when download errors
var onError = function (xhr) {
  console.log('An error happened');
};

window.onclick = function (event) {
	var e = document.documentElement;
	if(e.requestFullScreen) {
    e.requestFullScreen();
  } else if(e.webkitRequestFullScreen) {
    e.webkitRequestFullScreen();
  } else if(e.mozRequestFullScreen) {
    e.mozRequestFullScreen();
  }
};

window.onload = function() {
	var loader = new THREE.TextureLoader();
	loader.load('earth2048x1024.jpg', onLoad, onProgress, onError);
}
// Добавить на сцену
function addToScene(scene, objectToAdd, x, y, z) {
	objectToAdd.position.x = x;
	objectToAdd.position.y = y;
	objectToAdd.position.z = z;
	scene.add(objectToAdd);
}

function getBox(mm_px) {
	// Определить центр
	var x0 = meshColumns/2.0 * d0;
	var y0 = meshRows/2.0 * d0;

	var dx0 = meshColumns % 2.0 * d0;
	var dy0 = meshRows % 2.0 * d0;

	var kx = 1 / kDistortion((x0 ** 2 + (dy0/2) ** 2) ** 0.5 * mm_px);
	var ky = 1 / kDistortion((y0 ** 2 + (dx0/2) ** 2) ** 0.5 * mm_px);

	var minX = x0 - x0 * kx;
	var minY = y0 - y0 * ky;
	var maxX = x0 + x0 * kx;
	var maxY = y0 + y0 * ky;

	return {"minX" : minX, "maxX": maxX, "minY": minY, "maxY": maxY, "x0": x0, "y0": y0};
}

function kDistortion(r) {
	// r must be in mm
	return ((((0.0000004 * r - 0.00001281) * r + 0.00033633) * r - 0.00042664) * r + 1);
}

function newFrame(bufferTexture) {
	var newFrameGeometry = new THREE.Geometry();
	calcMeshGrid(newFrameGeometry, meshColumns + 1, meshRows + 1, 0.25);

	var uniforms = {
	    u_texture: { type: 't', value: bufferTexture }
	};

	var bufMaterial = new THREE.ShaderMaterial({
	    uniforms: uniforms,
	    vertexShader: vertShader,
	    fragmentShader: fragShader
	});

	var frame = new THREE.Mesh(newFrameGeometry, bufMaterial);
	return frame;
}

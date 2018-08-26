
// Загрузка текстуры завершена
var onLoad = function (texture) {

	addToScene(scene, scenePointLight, 10, 50, 130);

	var objGeometry = new THREE.SphereGeometry(radius, segments, rings);
	var objMaterial = new THREE.MeshPhongMaterial({
		map: texture,
		shading: THREE.SmoothShading //THREE.None, THREE.FlatShading, THREE.SmoothShading
	});

	// Левый кадр
	var geom = new THREE.Geometry();
	var box1 = calcMeshGrid(geom, meshColumns + 1, meshRows + 1, 0.25);//0.39);

	var plObj = new THREE.Mesh(geom, objMaterial);
	//var plObj = new THREE.Mesh(geom, bufMaterial2);
//box1 = recalcXY(geom, screenSize.h / (box1.maxY - box1.minY));
//	addToScene(scene, plObj, 0, -meshRows*meshCellSize/2, 0);
var dd = d0/4*0;
var kkk=(box1.maxY - box1.minY);
addToScene(scene, plObj, -dd - box1.maxX ,  - (box1.maxY + box1.minY)/2,-15);

	// Правый кадр
	var geom2 = new THREE.Geometry();
	var box2 = calcMeshGrid(geom2, meshColumns + 1, meshRows + 1, 0.25); //0.11);

var plObj2 = new THREE.Mesh(geom2, objMaterial);
box2 = recalcXY(geom2, screenSize.h / (box2.maxY - box2.minY));
addToScene(scene, plObj2, dd -box2.minX, - (box2.maxY + box2.minY)/2,-15);

//var scrCamera = new THREE.OrthographicCamera(-ww, ww, ww/width*height , -ww/width*height, -100, 100);
var ht = kkk;//(box2.maxY - box2.minY);
var wid = width/height*ht; //resHDP.w/resHDP.h * ht;
var iii=2;


var scrCamera = new THREE.OrthographicCamera(-wid/2, wid/2,  ht/2 , - ht/2, -100, 100);
//var scrCamera = new THREE.PerspectiveCamera(cameraAngle, width/height, minCamDist, maxCamDist );
scrCamera.position.x = 0;
 scrCamera.position.y = 0;
// scrCamera.position.z = 3;
scrCamera.position.z = scrCamPos;
var uu=scene.position;
 scrCamera.lookAt(new THREE.Vector3(0, 0,-500));
 this.perspective = "Orthographic";

//bufCamera2.lookAt(new THREE.Vector3(0, 0, 40));


//	var plObj2 = new THREE.Mesh(geom2, bufMaterial);
//recalcXY(geom2);
	//addToScene(scene, plObj2, -meshColumns*meshCellSize, -meshRows*meshCellSize/2, 0);


	var render = function () {

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
//  if (document.fullscreenElement) {
	//	document.documentElement.mozExitFullScreen();
//  } else {
    document.documentElement.mozRequestFullScreen();
//  }
};

window.onload = function() {

	var loader = new THREE.TextureLoader();
	//loader.load('earth2048x1024.jpg', onLoad, onProgress, onError);
	loader.load('setka31.png', onLoad, onProgress, onError);
}
// Добавить на сцену
function addToScene(scene, objectToAdd, x, y, z) {
	objectToAdd.position.x = x;
	objectToAdd.position.y = y;
	objectToAdd.position.z = z;
	scene.add(objectToAdd);
}

function fullScreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.webkitrequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.mozRequestFullscreen) {
    element.mozRequestFullScreen();
  }
}

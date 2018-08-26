// Загрузка текстуры завершена
var onLoad = function (texture) {

	var objMaterial = new THREE.MeshPhongMaterial({
		map: texture,
		shading: THREE.SmoothShading //THREE.None, THREE.FlatShading, THREE.SmoothShading
	});

	var globe = new THREE.Mesh(globeGeometry, objMaterial);

	addToScene(scene, scenePointLight, 10, 50, 130);
	addToScene(bufferScene, bufferPointLight, 10, 50, 130);
	addToScene(bufferScene, globe, 0, 0, 0);

	// Левый кадр
	var leftFrameGeometry = new THREE.Geometry();
	var box1 = calcMeshGrid(leftFrameGeometry, meshColumns + 1, meshRows + 1, 0.25);//0.39);

	var leftFrame = new THREE.Mesh(leftFrameGeometry, bufMaterial2);

	box1 = recalcXY(leftFrameGeometry, screenSize.h / (box1.maxY - box1.minY));

	var dd = d0/4;
	addToScene(scene, leftFrame, -dd - box1.maxX ,  - (box1.maxY + box1.minY)/2,-15);

	// Правый кадр
	var rightFrameGeometry = new THREE.Geometry();
	var box2 = calcMeshGrid(rightFrameGeometry, meshColumns + 1, meshRows + 1, 0.25); //0.11);

	var rightFrame = new THREE.Mesh(rightFrameGeometry, bufMaterial);
	box2 = recalcXY(rightFrameGeometry, screenSize.h / (box2.maxY - box2.minY));
	addToScene(scene, rightFrame, dd -box2.minX, - (box2.maxY + box2.minY)/2,-15);

	var ht=(box1.maxY - box1.minY);
	var wid = window.innerWidth/window.innerHeight*ht; //resHDP.w/resHDP.h * ht;

	var scrCamera = new THREE.OrthographicCamera(-wid/2, wid/2,  ht/2 , - ht/2, -100, 100);
	scrCamera.position.x = 0;
	scrCamera.position.y = 0;
	scrCamera.position.z = scrCamPos;
	scrCamera.lookAt(new THREE.Vector3(0, 0,-500));

	globe.rotation.y = -90 * Math.PI/180;

	var render = function () {
			// globe.rotation.y += 0.003;
			// Делаем рендер во внеэкранную текстуру
			bufCamera.lookAt(new THREE.Vector3(0,0,25));
			bufCamera2.lookAt(new THREE.Vector3(0,0,25));

			renderer.render(bufferScene, bufCamera, bufferTexture);
			renderer.render(bufferScene, bufCamera2, bufferTexture2);
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

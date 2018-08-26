//var meshCellSize = 10;
//	var dxx = meshCellSize;
//	var dyy = meshCellSize;


	var d0 = 10;

// Создать meshgrid
function calcMeshGrid(geometry, vx, vy, sx) {


	const sy = 0.25;
	const sn = 0.5;

	var n = vx * vy;
	var vertices2 = Array.from({length: n});
	var faces2 = [];
	var Uvs2 = [];

	var minX = 0;
	var maxX = 0;
	var minY = 0;
	var maxY = 0;

	for (var i = 0; i < vy; ++i) {
		for (var j = 0; j < vx; ++j) {
			vertices2[i * vx + j] = new THREE.Vector3(j*d0, i*d0, 0);
		}
	}

	let normX = sn/vertices2[n - 1].x;
	let normY = sn/vertices2[n - 1].y;

	for (var k = 0; k < vx * (vy-1) - 1; ++k) {
		if (((k+1) % vx) == 0) continue;
		faces2.push( new THREE.Face3(k, k+1, k+vx));

		Uvs2.push([new THREE.Vector2( vertices2[k].x * normX + sx, vertices2[k].y * normY + sy),
			new THREE.Vector2( vertices2[k + 1].x * normX + sx, vertices2[k + 1].y * normY + sy ),
			new THREE.Vector2( vertices2[k + vx].x * normX + sx, vertices2[k + vx].y * normY + sy )]);

		faces2.push( new THREE.Face3(k+1, k+vx+1, k+vx));

		Uvs2.push([new THREE.Vector2( vertices2[k + 1].x * normX + sx, vertices2[k + 1].y * normY + sy ),
			new THREE.Vector2( vertices2[k + vx + 1].x * normX + sx, vertices2[k + vx + 1].y * normY + sy ),
			new THREE.Vector2( vertices2[k + vx].x * normX + sx, vertices2[k + vx].y * normY + sy)]);
	}

	geometry.vertices = vertices2;
	geometry.faces = faces2;
	geometry.faceVertexUvs[0] = Uvs2;
	geometry.mergeVertices();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	geometry.uvsNeedUpdate = true;

	return {"minX" : minX, "maxX": (vx -1) * d0, "minY": minY, "maxY": (vy -1) * d0};
}

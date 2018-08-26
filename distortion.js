var minX = 0;
var maxX = minX;
var minY = 0;
var maxY = minY;

function recalcXY(g, mm_px) {
	// Определить центр
	var iX0 = Math.round(meshColumns/2.0 + 0.1);
	var iY0 = Math.round(meshRows/2.0 + 0.1);
	var ox = meshColumns/2.0 * d0;
	var oy = meshRows/2.0 * d0;
	var xd = 0;
	var yd = 0;

	minX = g.vertices[ind(iY0, iX0)].x;
	maxX = minX;
	minY = g.vertices[ind(iY0, iX0)].y;
	maxY = minY;

	// Пересчет первого столбца, т.е. для iX0
	for (var i = iY0; i < meshRows; i++) {
		// Для вычисления сжатия берем расстояния до середины горизонтального отрезка сетки
		xd = reSize(d0 , ((i + 1) * d0 - oy), mm_px)/2;
		// Для вычисления сжатия берем расстояния до середины вертикального отрезка сетки
		yd = reSize(d0 , Math.sqrt(Math.pow((d0 / 2), 2) + Math.pow((i - iY0 + 1) * d0, 2)), mm_px);
		// 1-st segment
		setVertices(g.vertices, ind(i + 1, iX0), ox + xd, g.vertices[ind( i, iX0)].y + yd);
		// 2-nd segment
		setVertices(g.vertices, ind(i + 1, iX0 - 1),  ox - xd, g.vertices[ind( i, iX0 - 1)].y + yd);
		// 3-d segment
		setVertices(g.vertices, ind(2 * iY0 - i - 2, iX0 - 1), ox - xd, g.vertices[ind( 2 * iY0 - i - 1, iX0 - 1)].y - yd);
		// 4-th segment
		setVertices(g.vertices, ind(2 * iY0 - i - 2, iX0), ox + xd, g.vertices[ind(  2 * iY0 - i - 1, iX0)].y - yd);
	}

	// Пересчет первой строки
	for (var j = iX0; j < meshColumns; j++) {
		yd = reSize(d0, ((j + 1) * d0 - ox), mm_px)/2;
		xd = reSize(d0, Math.sqrt(Math.pow((d0 / 2), 2) + Math.pow((j - iX0 + 1) * d0, 2)), mm_px);
		// 1-st segment
		setVertices(g.vertices, ind(iY0, j + 1), g.vertices[ind(iY0, j)].x + xd, oy + yd);
		// 2-nd segment
		setVertices(g.vertices, ind(iY0, 2 * iX0 - j - 2), g.vertices[ind(iY0, 2 * iX0 - j - 1)].x - xd, oy + yd);
		// 3-d segment
		setVertices(g.vertices, ind(iY0 - 1, 2 * iX0 - j - 2), g.vertices[ind(iY0 -1, 2 * iX0 - j - 1)].x - xd, oy - yd);
		// 4-th segment
		setVertices(g.vertices, ind(iY0 - 1, j + 1), g.vertices[ind(iY0, j)].x + xd, oy - yd);
	}

	// Пересчет по строкам
	for (var i = iY0; i < meshRows; i++)
		for (var j = iX0; j < meshColumns; j++) {

			xd = reSize(d0, Math.sqrt( Math.pow( (i - iY0 + 1.5) * d0 , 2) + Math.pow((j - iX0 + 1) * d0, 2)), mm_px);
			yd = reSize(d0, Math.sqrt( Math.pow( (j - iX0 + 1.5) * d0 , 2) + Math.pow((i - iY0 + 1) * d0, 2)), mm_px);
			// 1-st segment
			setVertices(g.vertices, ind(i + 1, j + 1), g.vertices[ind(i+1, j)].x + xd, g.vertices[ind( i, j+1)].y + yd);
			// 2-nd segment
			setVertices(g.vertices, ind(i + 1, 2 * iX0 - j - 2),  g.vertices[ind(i+1, 2 * iX0 - j - 1)].x - xd, g.vertices[ind( i, 2 * iX0 - j - 2)].y + yd);
			// 3-d segment
			setVertices(g.vertices, ind(2 * iY0 - i - 2, 2 * iX0 - j - 2), g.vertices[ind(2 * iY0 - i - 2, 2 * iX0 - j - 1)].x - xd, g.vertices[ind( 2 * iY0 - i - 1,  2 * iX0 - j - 2)].y - yd);
			// 4-th segment
			setVertices(g.vertices, ind(2 * iY0 - i - 2, j + 1), g.vertices[ind(2 * iY0 - i - 2, j)].x + xd, g.vertices[ind(  2 * iY0 - i - 1, j+1)].y - yd);
		}

		return {"minX" : minX, "maxX": maxX, "minY": minY, "maxY": maxY};
}

function setVertices(vertices, index, x, y) {
	vertices[index].x = x;
	vertices[index].y = y;
	minX = Math.min(minX, x);
	maxX = Math.max(maxX, x);
	minY = Math.min(minY, y);
	maxY = Math.max(maxY, y);
}

function ind(rowIndex, columnIndex) {
	return rowIndex * (meshColumns + 1) + columnIndex;
}

function kDistortion(r) {
	// r должно быть в мм
	return ((((0.0000004 * r - 0.00001281) * r + 0.00033633) * r - 0.00042664) * r + 1)
}

function reSize(x, r, mm_px) {
	return (x / kDistortion(r * mm_px));
}

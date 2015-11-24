


var Chart = {
	
	// Параметры:
	axisColor: 'black', // цвет осей
	axisBackColor: 'white', // цвет фона
	axisXScale: 40, // масштаб по X
	axisYScale: 40, // масштаб по Y
	
}

// Отображение осей координат:
Chart.drawAxis = function(canvas) {
	this.canvas = canvas;
	if ( ! canvas.getContext ) return false;
	var context = canvas.getContext('2d');
	this.context = context;
	
	context.save();
	context.fillStyle = this.axisBackColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.lineWidth = 1;
	context.strokeStyle = this.axisColor;
	
	this.ox = Math.floor(canvas.width / 2) + 0.5;
	this.oy = Math.floor(canvas.height / 2) + 0.5;
	
	// ось OX
	context.save();
	context.translate(0, this.oy);
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(canvas.width - 2, 0);
	context.lineTo(canvas.width - 7, 5);
	context.moveTo(canvas.width - 2, 0);
	context.lineTo(canvas.width - 7, -5);
	context.stroke();
	context.restore();

	// ось OY
	context.save();
	context.translate(this.ox, 0)
	context.beginPath();
	context.moveTo(0,  canvas.height);
	context.lineTo(0,  2);
	context.lineTo(5,  7);
	context.moveTo(0,  2);
	context.lineTo(-5, 7);
	context.stroke();
	context.restore();
	
	// подписи к осям
	context.save();
	context.font = 'normal 8pt Courier';
	context.translate(this.ox, this.oy);
	
	// подписи OX
	context.textAlign = 'center';
	var maxX = Math.floor(this.ox / this.axisXScale);
	if ( maxX * this.axisXScale > this.ox - 12 ) maxX--;
	for ( var i = 1; i <= maxX; i++ ) {
		var x = i;
		for ( var j = 0; j < 2; j++ ) {
			var xPos = x * this.axisXScale;
			context.beginPath();
			context.moveTo(xPos, -3);
			context.lineTo(xPos, 3);
			context.stroke();
			context.strokeText(x, xPos, 12);
			x = -x;
		}
	}
	
	// подписи OY
	context.textAlign = 'right';
	context.textBaseline = 'middle';
	var maxY = Math.floor(this.oy / this.axisYScale);
	if ( maxY * this.axisYScale > this.oy - 12 ) maxY--;
	for ( var i = 1; i <= maxY; i++ ) {
		var y = i;
		for ( var j = 0; j < 2; j++ ) {
			var yPos = -y * this.axisYScale;
			context.beginPath();
			context.moveTo(-3, yPos);
			context.lineTo(3,  yPos);
			context.stroke();
			context.strokeText(y, -6, yPos);
			y = -y;
		}
	}
	
	context.font = 'normal 12pt Courier';
	context.strokeText('x', this.ox - 6, 12);
	context.strokeText('y', -12, 6 - this.oy);
	context.restore();

	context.restore();
	return true;
}

// Построить график
Chart.drawChart = function(func, color) {

	// добавляем "Math." перед функциями
	func = func.replace(/([a-z]{2,}).*?/gi, 'Math.$1');
	
	// параметры рисования
	var context = this.context;
	context.save();
	context.lineJoin = 'round';
	context.lineWidth = 2;
	context.strokeStyle = color;
	context.translate(this.ox, this.oy);
	
	// отображение графика
	context.beginPath();
	var moveToFlag = true;
	var x, y, ok;
	for ( var xPos = -this.ox; xPos <= this.ox; xPos++ ) {
		x = xPos / this.axisXScale;
		ok = true;
		try {
			eval('y = ' + func);
		} catch(e) {
			moveToFlag = true;
			ok = false;
		}
		if ( ok ) {
			yPos = -y * this.axisYScale;
			if ( moveToFlag ) {
				context.moveTo(xPos, yPos);
				moveToFlag = false;
			} else context.lineTo(xPos, yPos);
			if ( yPos < -this.oy * 2 || yPos > this.oy * 2 ) moveToFlag = true;
		};		
	}
	context.stroke();
	
	context.restore();
}
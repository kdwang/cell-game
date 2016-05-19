
function LifeGame(width, height, cellSize, canvas) { 
	// private
	var _cellsPerRow = width / cellSize;
	var _cellsPerColumn = height / cellSize;
	var _totalCells = _cellsPerRow * _cellsPerColumn;
	var _ctx = canvas.getContext('2d');
	var _grid = new Grid(_cellsPerRow, _cellsPerColumn);

	this.clear = function () {
		_grid = new Grid(_cellsPerRow, _cellsPerColumn);
	}


	// draw
	this.draw = function () {
		// clear the background
		_ctx.clearRect(0, 0, _ctx.canvas.width, _ctx.canvas.height);
		_ctx.lineWidth = 1;
		_ctx.strokeStyle = "#ccc";

		// draw the cells
		for (var i = 0; i < _totalCells; ++i) {
			var cell = _grid.getCellByIndex(i);

			if (cell.live) {
				_ctx.fillStyle = "black";
			}else{
				_ctx.fillStyle = "white";
			}
 
			// render the cell 
			_ctx.beginPath();

			_ctx.rect(
				cell.x * cellSize,
				cell.y * cellSize,
				cellSize,
				cellSize
			); 
			_ctx.fill();
			_ctx.stroke();
		}
	}

	//8
	// update
	var _this = this;

	this.update = function () {
		// create a new grid
		var nextGeneration = new Grid(_cellsPerRow, _cellsPerColumn);

		// rules
		for (var i = 0; i < _totalCells; ++i) {
			var oldCell = _grid.getCellByIndex(i);
			var newCell = nextGeneration.getCellByIndex(i);
			var neighbours = _grid.getLiveNeighbours(i);

			// living rules
			if (oldCell.live) {
				// 活细胞，有2或3个邻居，keep alive   
				newCell.live = neighbours > 1 && neighbours < 4;
			} else {
				// 死细胞，3个邻居，awake
				if (neighbours == 3) {
					newCell.live = true;
				}
			}
		}
		// nextGeneration
		_grid = nextGeneration;
		_this.draw();
	}


	//addRandomCells
	this.addRandomCells = function(count) {
		var deadCells = _grid.getDeadCells();
		
		for(var i = 0; i < count && deadCells.length > 0; ++i) {
			var randomIndex = Math.floor( Math.random() * deadCells.length );
			deadCells[randomIndex].live = true;
			deadCells.splice(randomIndex, 1);
		}
	}

}


	








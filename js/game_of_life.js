var color_palette = [
    "#0056C6",
    "#0E1452",
    "#1B78E1",
    "#1D1C2F",
    "#0072E4",
    "#2E73FF",
    "#40D1FF",
    "#4AB7FF",
    "#515180",
    "#5FE5FF",
    "#253791",
    "#49B7FF",
    "#3B64EA",
];

window.onload = function() {
    new p5(function(p) {
        var cellSize = 5;
        var columns, rows;
        var grid, nextGrid;
        var framerateValue = 60;
        var cellOpacity = 100;

        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('background');

            columns = p.floor(p.width / cellSize);
            rows = p.floor(p.height / cellSize);

            grid = createRandomGrid();
            nextGrid = createEmptyGrid();

            p.frameRate(framerateValue);
        };

        p.draw = function() {
            p.background(0);

            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    let x = i * cellSize;
                    let y = j * cellSize;

                    if (grid[i][j] === 1) {
                        let color = p.random(color_palette);
                        color = color.substring(1); // remove #
                        let r = parseInt(color.substring(0, 2), 16);
                        let g = parseInt(color.substring(2, 4), 16);
                        let b = parseInt(color.substring(4, 6), 16);
                        p.fill(r, g, b, cellOpacity);
                        p.noStroke();
                        p.rect(x, y, cellSize, cellSize);
                    }
                }
            }

            updateGrid();
        };

        function createRandomGrid() {
            return Array.from({ length: columns }, () =>
                Array.from({ length: rows }, () => p.floor(p.random(2)))
            );
        }

        function createEmptyGrid() {
            return Array.from({ length: columns }, () => Array.from({ length: rows }, () => 0));
        }
        let lastLivingCells = 0;
        let livingCells = 0;
        let sameStateCount= 0;
        let sameStateTolerance = 20;
        
        function updateGrid() {
            livingCells = 0;
            let dead = 0;
            let alive = 1;
            let min = 2;
            let max = 3;
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    let state = grid[i][j];
                    let neighbors = Math.round(countNeighbors(grid, i, j));  

                    if (state === dead && neighbors === max) {
                        nextGrid[i][j] = alive;
                        livingCells++;
                    } else if (state === alive && (neighbors < min || neighbors > max)) {
                        nextGrid[i][j] = dead;
                        livingCells++;
                    } else {
                        nextGrid[i][j] = state;
                        if (state === alive) {
                            livingCells++;
                        }
                    }
                }
            }

            if (livingCells == lastLivingCells) {
                sameStateCount++;
                [grid, nextGrid] = [nextGrid, grid];
                if(sameStateCount >= sameStateTolerance){
                    grid = createRandomGrid();
                    nextGrid = createEmptyGrid();
                    sameStateCount = 0;
                }
            } else {
                [grid, nextGrid] = [nextGrid, grid];
                lastLivingCells = livingCells;
                sameStateCount = 0;
            }
        }

        function countNeighbors(grid, x, y) {
            let sum = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let col = (x + i + columns) % columns;
                    let row = (y + j + rows) % rows;
                    sum += grid[col][row];
                }
            }
            sum -= grid[x][y];
            return sum;
        }

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            columns = p.floor(p.width / cellSize);
            rows = p.floor(p.height / cellSize);
            grid = createRandomGrid();
            nextGrid = createEmptyGrid();
        };
    });
};

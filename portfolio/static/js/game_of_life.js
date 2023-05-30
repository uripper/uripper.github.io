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
        var cellSize = 10;
        var columns, rows;
        var grid, nextGrid;
        var frameRate = 10; // Adjust this value to control the speed
        var cellOpacity = 100; // Adjust this value to control the opacity

        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('background');

            columns = p.floor(p.width / cellSize);
            rows = p.floor(p.height / cellSize);

            grid = createRandomGrid();
            nextGrid = createEmptyGrid();

            p.frameRate(frameRate);
        };

        p.draw = function() {
            p.background(0);

            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    let x = i * cellSize;
                    let y = j * cellSize;

                    if (grid[i][j] === 1) {
                        let color = p.random(color_palette) + p.hex(cellOpacity, 2); // Set alpha value for opacity
                        p.fill(color);
                        p.noStroke();
                        p.rect(x, y, cellSize, cellSize);
                    }
                }
            }

            updateGrid();
        };

        function createRandomGrid() {
            let grid = new Array(columns);
            for (let i = 0; i < columns; i++) {
                grid[i] = new Array(rows);
                for (let j = 0; j < rows; j++) {
                    grid[i][j] = p.floor(p.random(2));
                }
            }
            return grid;
        }

        function createEmptyGrid() {
            let grid = new Array(columns);
            for (let i = 0; i < columns; i++) {
                grid[i] = new Array(rows);
                for (let j = 0; j < rows; j++) {
                    grid[i][j] = 0;
                }
            }
            return grid;
        }

        function updateGrid() {
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    let state = grid[i][j];
                    let neighbors = countNeighbors(grid, i, j);

                    if (state === 0 && neighbors === 3) {
                        nextGrid[i][j] = 1;
                    } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                        nextGrid[i][j] = 0;
                    } else {
                        nextGrid[i][j] = state;
                    }
                }
            }

            let temp = grid;
            grid = nextGrid;
            nextGrid = temp;
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

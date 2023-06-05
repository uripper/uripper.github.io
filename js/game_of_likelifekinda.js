var color_palette = [
    "#0056C6", "#0E1452", "#1B78E1", "#1D1C2F", "#0072E4", "#2E73FF", "#40D1FF", 
    "#4AB7FF", "#515180", "#5FE5FF", "#253791", "#49B7FF", "#3B64EA",
];

let rgbColorPalette = color_palette.map(color => {
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    return { r, g, b };
});

window.onload = function() {
    new p5(function(p) {
        var cellSize = 7;
        var columns, rows;
        var grid;
        var framerateValue = 40;
        var cellOpacity = 25;

        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('background');

            columns = p.floor(p.width / cellSize);
            rows = p.floor(p.height / cellSize);

            grid = createRandomGrid();

            p.frameRate(framerateValue);
        };

        p.draw = function() {
            p.background(0);

            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    let x = i * cellSize;
                    let y = j * cellSize;

                    if (grid[i][j].state === 1) {
                        let color = grid[i][j].color;
                        p.fill(color.r, color.g, color.b, cellOpacity);
                        p.noStroke();
                        p.rect(x, y, cellSize, cellSize);
                    }
                }
            }

            updateGrid();
        };

        function createRandomGrid() {
            return Array.from({ length: columns }, () =>
                Array.from({ length: rows }, () => {
                    let state = p.floor(p.random(2));
                    let color = rgbColorPalette[p.floor(p.random(rgbColorPalette.length))];
                    return { state, color };
                })
            );
        }

        let livingCells = 0;
        
        function updateGrid() {
            let dead = 0;
            let alive = 1;
            let min = 2;
            let max = 3;
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    let cell = grid[i][j];
                    let neighbors = countNeighbors(i, j);  

                    if (cell.state === dead && neighbors === max) {
                        cell.state = alive;
                        cell.color = rgbColorPalette[p.floor(p.random(rgbColorPalette.length))];
                    } else if (cell.state === alive && (neighbors < min || neighbors > max)) {
                        cell.state = dead;
                    }
                }
            }


        }

        function countNeighbors(x, y) {
            let sum = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let col = (x + i + columns) % columns;
                    let row = (y + j + rows) % rows;
                    sum += grid[col][row].state;
                }
            }
            sum -= grid[x][y].state;
            return sum;
        }

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            columns = p.floor(p.width / cellSize);
            rows = p.floor(p.height / cellSize);
            grid = createRandomGrid();
        };
    });
};

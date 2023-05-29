var color_palette = [
    "#141414",
    "#000000",
    "#ffc8f0",
    "#f0ffa0",
    "#c8dcff",
    "#f0c8ff",
    "#9A83C9",
    "#9D1A1C",
    "#F1493B",
    "#84231D",
    "#FFEC3F",

];

window.onload = function() {
    new p5(function(p) {
        let abstract_shapeGenerator;

        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('background');
            p.noiseDetail(8, 0.65);


            abstract_shapeGenerator = createNewShape();
        };
        var gradient_colors = [
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
        
        p.draw = function() {
            p.background(0);
        
            // Draw Perlin noise background
            for (let y = 0; y < p.height; y++) {
                let noiseVal = p.noise(y * 0.001, p.frameCount * 0.0005);
                let colorIndex = Math.floor(noiseVal * gradient_colors.length);
                colorIndex = p.constrain(colorIndex, 0, gradient_colors.length - 1);
        
                let colorStart = p.color(gradient_colors[colorIndex] + '80');
                let colorEnd = p.color(gradient_colors[(colorIndex + 1) % gradient_colors.length] + '80');
                let lerpVal = (noiseVal * gradient_colors.length) - colorIndex;
        
                let c = p.lerpColor(colorStart, colorEnd, lerpVal);
        
                p.stroke(c);
                p.line(0, y, p.width, y);
            }

        
            // Slowly shift and change the abstract shape
            if (p.frameCount % 300 === 0) {
                abstract_shapeGenerator.shiftShape();
                abstract_shapeGenerator.changeShape();
            }
        
            abstract_shapeGenerator.move();
            abstract_shapeGenerator.show();
        
            // If the shape is out of bounds, create a new one
            if (abstract_shapeGenerator.y < -abstract_shapeGenerator.r) {
                abstract_shapeGenerator = createNewShape();
            }
        };
        
        function createNewShape() {
            let x = p.width / 2;
            let y = p.height;
            let r = p.random(100, 200);
            let color = p.random(color_palette);
            return new AbstractShape(x, y, r, color);
        }

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        class AbstractShape {
            constructor(x, y, r, color) {
                this.x = x;
                this.y = y;
                this.r = r;
                this.color = p.color(color);
                this.numPoints = p.floor(p.random(5, 10)); // Random number of control points for the curve
                this.controlPoints = [];
                for (let i = 0; i < this.numPoints; i++) {
                    let controlX = p.random(-this.r, this.r);
                    let controlY = p.random(-this.r, this.r);
                    this.controlPoints.push({ x: controlX, y: controlY });
                }
                this.targetColor = p.color(p.random(color_palette));
                this.targetPoints = this.controlPoints.map(point => ({ ...point }));
            }

            shiftShape() {
                this.targetPoints = [];
                for (let i = 0; i < this.numPoints; i++) {
                    let controlX = p.random(-this.r, this.r);
                    let controlY = p.random(-this.r, this.r);
                    this.targetPoints.push({ x: controlX, y: controlY });
                }
            }

            changeShape() {
                this.targetColor = p.color(p.random(color_palette));
            }

            move() {
                this.y -= 0.5;
                this.x += p.sin(p.frameCount / 300) * 0.5;

                // Interpolate controlPoints and color
                for (let i = 0; i < this.numPoints; i++) {
                    this.controlPoints[i].x = p.lerp(this.controlPoints[i].x, this.targetPoints[i].x, 0.01);
                    this.controlPoints[i].y = p.lerp(this.controlPoints[i].y, this.targetPoints[i].y, 0.01);
                }
                this.color = p.lerpColor(this.color, this.targetColor, 0.01);
            }

            show() {
                let gradientSteps = 10;
                p.noStroke();

                for (let i = 0; i < gradientSteps; i++) {
                    let ratio = i / gradientSteps;
                    let colorAlpha = p.lerpColor(this.color, this.targetColor, ratio);
                    colorAlpha.setAlpha((1 - ratio) * 255);
                    p.fill(colorAlpha);
                    drawWackyCurve(this.x, this.y, this.r * (1 - ratio), this.numPoints, this.controlPoints);
                }
            }
        }

        function drawWackyCurve(x, y, radius, numPoints, controlPoints) {
            p.beginShape();
            let angleStep = p.TWO_PI / numPoints;
            for (let i = 0; i < numPoints; i++) {
                let angle = i * angleStep;
                let px = x + radius * p.cos(angle) + controlPoints[i].x;
                let py = y + radius * p.sin(angle) + controlPoints[i].y;
                p.curveVertex(px, py);
            }
            p.endShape(p.CLOSE);
        }
    });
};

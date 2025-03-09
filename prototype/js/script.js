let revealedCircles = [];
let revealMode = "pixel"; // Options: "pixel", "fade", "object"
let fadeAmount = 255;
let dragging = false;
let offsetX, offsetY;
let currentRoom = 0;


let rooms = [
    [
        { type: "rect", x: 50, y: 50, w: 100, h: 100, alpha: 0, draggable: false },
        { type: "ellipse", x: 300, y: 200, w: 80, h: 80, alpha: 0, color: [255, 100, 100] }
    ],
    [
        { type: "triangle", x1: 150, y1: 300, x2: 200, y2: 200, x3: 250, y3: 300, alpha: 0, angle: 0 },
        { type: "rect", x: 400, y: 100, w: 100, h: 100, alpha: 0, draggable: false }
    ]
];

function setup() {
    createCanvas(600, 400);
    noStroke();
    background(255);
}

function draw() {
    if (fadeAmount > 0) {
        fadeAmount -= 0.5; // Slow fading transition
        background(fadeAmount);
    }
    drawPlaceholderVisuals();

    if (revealMode === "pixel") {
        revealPixelMode();
    } else if (revealMode === "fade") {
        revealFadeMode();
    } else if (revealMode === "object") {
        revealObjectMode();
    }
}

function revealPixelMode() {
    for (let p of revealedCircles) {
        fill(255 - fadeAmount);
        ellipse(p.x, p.y, 15, 15);
    }
}

function revealFadeMode() {
    fill(255, 10);
    rect(0, 0, width, height);
}

function revealObjectMode() {
    fill(255);
    ellipse(width / 2, height / 2, 50, 50);
}

function mousePressed() {
    for (let shape of rooms[currentRoom]) {
        if (shape.type === "rect" && mouseX > shape.x && mouseX < shape.x + shape.w && mouseY > shape.y && mouseY < shape.y + shape.h) {
            shape.alpha = 5;
            shape.draggable = true;
            dragging = shape;
            offsetX = mouseX - shape.x;
            offsetY = mouseY - shape.y;
        } else if (shape.type === "ellipse" && dist(mouseX, mouseY, shape.x, shape.y) < shape.w / 2) {
            shape.alpha = 5;
            shape.color = [random(255), random(255), random(255)];
        } else if (shape.type === "triangle" && pointInTriangle(mouseX, mouseY, shape)) {
            shape.alpha = 5;
            shape.angle += PI / 6;
        }
    }
}

function mouseReleased() {
    dragging = false;
}

function mouseDragged() {
    if (dragging && dragging.type === "rect") {
        dragging.x = mouseX - offsetX;
        dragging.y = mouseY - offsetY;
    }
}

function keyPressed() {
    if (key === '1') {
        revealMode = "pixel";
    } else if (key === '2') {
        revealMode = "fade";
    } else if (key === '3') {
        revealMode = "object";
    } else if (key === ' ') {
        nextRoom();
    }
}

function nextRoom() {
    if (currentRoom < rooms.length - 1) {
        currentRoom++;
        fadeAmount = 255;
        revealedCircles = [];
    }
}

function drawPlaceholderVisuals() {
    for (let shape of rooms[currentRoom]) {
        if (shape.alpha > 0) {
            shape.alpha = min(shape.alpha + 5, 150);
            if (shape.type === "rect") {
                fill(100, 100, 255, shape.alpha);
                rect(shape.x, shape.y, shape.w, shape.h);
            } else if (shape.type === "ellipse") {
                fill(shape.color[0], shape.color[1], shape.color[2], shape.alpha);
                ellipse(shape.x, shape.y, shape.w, shape.h);
            } else if (shape.type === "triangle") {
                fill(100, 255, 100, shape.alpha);
                push();
                translate((shape.x1 + shape.x2 + shape.x3) / 3, (shape.y1 + shape.y2 + shape.y3) / 3);
                rotate(shape.angle);
                translate(-(shape.x1 + shape.x2 + shape.x3) / 3, -(shape.y1 + shape.y2 + shape.y3) / 3);
                triangle(shape.x1, shape.y1, shape.x2, shape.y2, shape.x3, shape.y3);
                pop();
            }
        }
    }
}

function pointInTriangle(px, py, tri) {
    let { x1, y1, x2, y2, x3, y3 } = tri;
    let area = 0.5 * (-y2 * x3 + y1 * (-x2 + x3) + x1 * (y2 - y3) + x2 * y3);
    let s = 1 / (2 * area) * (y1 * x3 - x1 * y3 + (y3 - y1) * px + (x1 - x3) * py);
    let t = 1 / (2 * area) * (x1 * y2 - y1 * x2 + (y1 - y2) * px + (x2 - x1) * py);
    return s > 0 && t > 0 && (s + t) < 1;
}

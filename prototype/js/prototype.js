let roomReveal = 0;
let items = {};
let inventory = [];
let messages = "";
let bg, paper, keyImg, bookImg, shelfImg, lampImg;
let userInput = "";
let typeMode = false;
let shiftPressed = false;
let typeButton, exitTypeModeButton, startButton;
let pixelFont;
let shelf, lamp;
let draggingShelf = false, draggingLamp = false;
let shelfStartX, shelfStartY;
let tutorial = true;
let playerName = "";
let fadeAmount = 0; // Variable for controlling the fade effect
let fadeInProgress = false; // Flag to track if the fade should start

function preload() {
    bg = loadImage('room.jpg');
    paper = loadImage('paper.png');
    keyImg = loadImage('key.png');
    bookImg = loadImage('book.png');
    shelfImg = loadImage('desk.png');
    lampImg = loadImage('lamp.png');
    pixelFont = loadFont('pixel_font.ttf');
}

function setup() {
    createCanvas(800, 600);

    startButton = createButton("Start");
    startButton.position(580, 350);
    startButton.style("font-family", "'pixel_font'");
    startButton.style("font-size", "64px");
    startButton.style("width", "300px");
    startButton.style("height", "100px");
    startButton.mousePressed(() => {
        tutorial = false;
        typeMode = true;
        userInput = "";
        startButton.hide();
    });

    typeButton = createButton("Toggle Type Mode");
    typeButton.position(950, 110);
    typeButton.style("font-family", "'pixel_font'");
    typeButton.style("font-size", "16px");
    typeButton.mousePressed(() => {
        typeMode = !typeMode;
        userInput = "";
        exitTypeModeButton.style('display', typeMode ? 'block' : 'none');
    });

    exitTypeModeButton = createButton("Exit Type Mode");
    exitTypeModeButton.position(890, 200);
    exitTypeModeButton.style("font-family", "'pixel_font'");
    exitTypeModeButton.style("font-size", "16px");
    exitTypeModeButton.hide();
    exitTypeModeButton.mousePressed(() => {
        typeMode = false;
        exitTypeModeButton.hide();
    });

    items = {
        'paper': { x: 500, y: 500, found: false, visible: false, clicked: false, img: paper },
        'key': { x: -5, y: 450, found: false, visible: true, img: keyImg },
        'book': { x: 600, y: 400, found: false, visible: false, revealed: false, img: bookImg }
    };

    shelf = { x: -70, y: 280, img: shelfImg, startX: -40 };
    lamp = { x: 470, y: 140, img: lampImg };
}

function draw() {
    background(0);

    if (tutorial) {
        fill(255);
        textSize(32);
        textFont(pixelFont);
        text("Welcome to Prototype! \n Press Start to begin.", 200, 150);
        text("Move stuff around and try and\nfind all three prototype items!\n     Hint use the text editor", 150, 450);
    } else if (typeMode) {
        fill(255);
        rect(100, 100, 600, 400);
        fill(0);
        textSize(20);
        textFont(pixelFont);

        if (!playerName) {
            text("Enter your name: " + userInput, 120, 300);
        } else {
            text("Welcome, " + playerName + "!", 120, 300);
        }
    } else {
        image(bg, 0, 0, width, height);
        for (let item in items) {
            if (items[item].visible && !items[item].found) {
                image(items[item].img, items[item].x - 20, items[item].y - 20, 80, 80);
            }
        }
        image(shelf.img, shelf.x, shelf.y, 300, 300);
        image(lamp.img, lamp.x, lamp.y, 350, 400);
        fill(255);
        textSize(16);
        textFont(pixelFont);
        text(messages, 20, height - 40);
        if (playerName) {
            text("Welcome, " + playerName + "!", 20, 20);
        }

        // Handle the fade effect once the key is found
        if (fadeInProgress) {
            fadeAmount += 0.6;  // Slowly increase the fadeAmount
            if (fadeAmount >= 255) { // Stop fading once fully black
                fadeAmount = 255;
                // You can add code to transition to the next room or event here.
            }
            // Draw a semi-transparent black overlay to simulate the fade
            noStroke();
            fill(0, fadeAmount);
            rect(0, 0, width, height);
        }
    }
}

function keyPressed() {
    if (typeMode) {
        if (keyCode === SHIFT) {
            shiftPressed = true;
        } else if (keyCode === BACKSPACE) {
            userInput = userInput.slice(0, -1);
        } else if (keyCode === ENTER) {
            if (tutorial) {
                if (!playerName) {
                    playerName = userInput;
                    typeMode = false;
                    tutorial = false;
                    messages = "Welcome, " + playerName + "!";
                }
            } else if (userInput.toLowerCase() === "book") {
                items['book'].visible = true;
                messages = "The book has appeared!";
            }
            userInput = "";
            typeMode = false;
            exitTypeModeButton.hide();
        } else {
            userInput += shiftPressed ? key.toUpperCase() : key.toLowerCase();
        }
    }
}

function mousePressed() {
    if (!typeMode) {
        for (let item in items) {
            let d = dist(mouseX, mouseY, items[item].x, items[item].y);
            if (d < 40 && !items[item].found) {
                if (item === 'paper' && !items[item].visible) {
                    items[item].visible = true;
                    messages = "You revealed something hidden!";
                } else if (item === 'paper' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "You found a hidden clue in the paper! (Type: book)";
                } else if (item === 'book' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "You found a clue, check behind the desk";  // New message when the book is found
                } else if (item === 'key' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "You found the key to the next room!";
                    fadeInProgress = true;  // Start the fade effect after key is found
                } else if (item !== 'book' && item !== 'paper' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = `You found a ${item}!`;
                }
            }
        }

        if (mouseX > shelf.x && mouseX < shelf.x + 400 && mouseY > shelf.y && mouseY < shelf.y + 400) {
            draggingShelf = true;
        }
        if (mouseX > lamp.x && mouseX < lamp.x + 200 && mouseY > lamp.y && mouseY < lamp.y + 200) {
            draggingLamp = true;
        }
    }
}

function mouseDragged() {
    if (draggingShelf) {
        let newX = constrain(mouseX - 200, shelf.startX - 20, shelf.startX);
        shelf.x = newX;
    }
    if (draggingLamp) {
        lamp.x = constrain(mouseX - 100, 0, width - 200);
        lamp.y = constrain(mouseY - 100, 0, height - 200);
    }
}

function mouseReleased() {
    draggingShelf = false;
    draggingLamp = false;
}

function keyReleased() {
    if (keyCode === SHIFT) {
        shiftPressed = false;
    }
}

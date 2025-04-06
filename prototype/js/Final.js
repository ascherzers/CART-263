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
let satchelImg;
let shelf, lamp;
let draggingShelf = false, draggingLamp = false;
let shelfStartX, shelfStartY;
let tutorial = true;
let playerName = "";
let fadeAmount = 0;
let fadeInProgress = false;
let lampOn = false;
let riddleActive = false;
let currentRiddle = "";
let riddleAnswer = "";
let inventoryButton;
let showInventory = false;
let closeInventoryButton;
let sledgeImg;
let nameEntered = false;
let selectedInventoryItem = null;
let smashedShelfImg;


function preload() {
    bg = loadImage('room.jpg');
    paper = loadImage('paper.png');
    keyImg = loadImage('key.png');
    bookImg = loadImage('book.png');
    satchelImg = loadImage('satchel.png');
    shelfImg = loadImage('desk.png');
    lampImg = loadImage('lamp.png');
    pixelFont = loadFont('pixel_font.ttf');
    sledgeImg = loadImage('sledge.png');
    smashedShelfImg = loadImage('smashedshelf.png');
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

    typeButton.hide();

    exitTypeModeButton = createButton("Exit Type Mode");
    exitTypeModeButton.position(890, 200);
    exitTypeModeButton.style("font-family", "'pixel_font'");
    exitTypeModeButton.style("font-size", "16px");
    exitTypeModeButton.hide();
    exitTypeModeButton.mousePressed(() => {
        typeMode = false;
        exitTypeModeButton.hide();
    });

    inventoryButton = createButton("Inventory");
    inventoryButton.position(1010, 640);
    inventoryButton.style("font-family", "'pixel_font'");
    inventoryButton.style("font-size", "16px");
    inventoryButton.hide();
    inventoryButton.mousePressed(() => {
        showInventory = true;
        closeInventoryButton.show();
    });

    closeInventoryButton = createButton("Close Inventory");
    closeInventoryButton.position(975, 610);
    closeInventoryButton.style("font-family", "'pixel_font'");
    closeInventoryButton.style("font-size", "16px");
    closeInventoryButton.hide();
    closeInventoryButton.mousePressed(() => {
        showInventory = false;
        closeInventoryButton.hide();
    });


    shelf = { x: -70, y: 280, img: shelfImg, startX: -40 };

    items = {
        'paper': { x: 500, y: 500, found: false, visible: false, clicked: false, img: paper },
        'key': { x: -5, y: 450, found: false, visible: true, img: keyImg },
        'Key+-': { x: 70, y: 370, found: false, visible: false, img: keyImg }, // Real key
        'book': { x: 600, y: 400, found: false, visible: false, revealed: false, img: bookImg },
        'satchel': { x: 200, y: 380, found: false, visible: true, img: satchelImg },
        'Sledge Hammer': { x: 400, y: 450, found: false, visible: false, img: sledgeImg }
    };


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

        if (riddleActive) {
            text(currentRiddle, 120, 250);
            text("Your Answer: " + userInput, 120, 400);
        } else if (!nameEntered) {
            text("Enter your name: " + userInput, 120, 300);
        } else {
            text("Script of Wonders", 120, 300);
            text(userInput, 120, 350);

        }

    } else {
        image(bg, 0, 0, width, height);

        for (let item in items) {
            if (item === 'Key+-') continue;
            if (items[item].visible && !items[item].found) {
                if (item === 'Sledge Hammer') {
                    image(items[item].img, items[item].x - 40, items[item].y - 40, 160, 160); // Make sledgehammer bigger
                } else {
                    image(items[item].img, items[item].x - 20, items[item].y - 20, 80, 80); // Default size for others
                }
            }
        }

        if (shelf.img === smashedShelfImg) {
            image(shelf.img, shelf.x - 20, shelf.y - 5, 350, 315);
        } else {
            image(shelf.img, shelf.x, shelf.y, 300, 300);
        }
        image(lamp.img, lamp.x, lamp.y, 350, 400);


        if (items['Key+-'].visible && !items['Key+-'].found) {
            image(items['Key+-'].img, items['Key+-'].x, items['Key+-'].y - 10, 40, 40);
        }


        if (lampOn) {
            fill(255, 255, 100, 150);
            ellipse(lamp.x + 175, lamp.y + 100, 150, 100);


            if (!items['paper'].found) {
                stroke('white');
                strokeWeight(1);
                noFill();
                rect(items['paper'].x - 10, items['paper'].y - 10, 60, 60);
                noStroke();
            }
        }

        if (showInventory) {
            fill(255);
            rect(550, 100, 230, 400);
            fill(0);
            textSize(18);
            textFont(pixelFont);
            text("Inventory:", 570, 130);
            for (let i = 0; i < inventory.length; i++) {
                let itemName = inventory[i];
                let y = 160 + i * 30;

                // Highlight selected item
                if (selectedInventoryItem === itemName) {
                    fill(200, 200, 255);
                    rect(560, y - 20, 200, 25);
                    fill(0);
                }

                text("- " + itemName, 570, y);
            }
        }

        fill(255);
        textSize(16);
        textFont(pixelFont);
        text(messages, 20, height - 40);


        if (fadeInProgress) {
            fadeAmount += 0.6;
            if (fadeAmount >= 255) {
                fadeAmount = 255;
            }
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
            if (!nameEntered) {
                playerName = userInput;
                nameEntered = true;
                userInput = "";
                messages = "Welcome, " + playerName + "!";
                typeMode = false;
                exitTypeModeButton.hide();
                typeButton.show();
            } if (riddleActive) {
                if (userInput.toLowerCase() === riddleAnswer) {
                    items['book'].visible = true;
                    messages = "The book has appeared!";
                }
                userInput = "";
                riddleActive = false;
                typeMode = false;
                exitTypeModeButton.hide();
            } else {
                if (userInput.toLowerCase() === "ham") {
                    items['Sledge Hammer'].visible = true;
                    messages = "A sledgehammer has appeared!";
                }
                userInput = "";
                typeMode = false;
                exitTypeModeButton.hide();
            }
        } else {
            userInput += shiftPressed ? key.toUpperCase() : key.toLowerCase();
        }
    }
}

function mousePressed() {
    if (!typeMode) {
        if (showInventory) {
            for (let i = 0; i < inventory.length; i++) {
                let y = 160 + i * 30;
                if (mouseX > 560 && mouseX < 760 && mouseY > y - 20 && mouseY < y + 5) {
                    selectedInventoryItem = inventory[i];
                    messages = selectedInventoryItem + " selected!";
                    return;
                }
            }
        }
        for (let item in items) {
            let ix = items[item].x;
            let iy = items[item].y;
            let iw = (item === 'Sledge Hammer') ? 160 : 80;
            let ih = (item === 'Sledge Hammer') ? 160 : 80;
            let offset = (item === 'Sledge Hammer') ? 40 : 20;

            if (
                mouseX > ix - offset && mouseX < ix - offset + iw &&
                mouseY > iy - offset && mouseY < iy - offset + ih &&
                !items[item].found
            ) {
                if (item === 'paper' && !items[item].visible) {
                    items[item].visible = true;
                    messages = "You found a paper! Click it to read.";
                } else if (item === 'paper' && items[item].visible) {
                    if (!riddleActive) {
                        riddleActive = true;
                        typeMode = true;
                        userInput = "";
                        currentRiddle = "I speak without a mouth \nAnd hear without ears.\nI have no body,\nBut I come alive with wind.\nWhat am I?";
                        riddleAnswer = "echo";
                        messages = "A riddle appears! Type your answer.";
                    }
                } else if (item === 'book' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "Dear Madam Reller..."; //Palindrome add function to be able to read book's contents in inventory to desipher
                } else if (item === 'key' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "KEY"; //Typing key spawns keyhole which leads player to death room
                    inventoryButton.show();
                    //fadeInProgress = true;
                } else if (item === 'satchel' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "You picked up the satchel!";
                    inventoryButton.show();
                } else if (item === 'Sledge Hammer' && items[item].visible) {
                    if (inventory.includes('satchel')) {
                        items[item].found = true;
                        inventory.push(item);
                        messages = "You picked up the sledgehammer!";
                    } else {
                        messages = "So heavy";
                    }
                } else if (item === 'Key+-' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "Key+-";
                    inventoryButton.show();
                }
            }
        }

        if (mouseX > lamp.x && mouseX < lamp.x + 200 && mouseY > lamp.y && mouseY < lamp.y + 200) {
            lampOn = !lampOn;
            messages = lampOn ? "The lamp is now on!" : "The lamp is now off!";
        }

        if (mouseX > shelf.x && mouseX < shelf.x + 250 && mouseY > shelf.y && mouseY < shelf.y + 250) {
            if (selectedInventoryItem === "Sledge Hammer") {
                if (selectedInventoryItem === "Sledge Hammer") {
                    messages = "You smashed the desk!";
                    shelf.img = smashedShelfImg; // Change the image
                    selectedInventoryItem = null;
                    items['Key+-'].visible = true; // MAKE SECOND KEY VISIBLE
                } else {
                    draggingShelf = true;
                }
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
            lamp.x = constrain(mouseX - 175, 0, width - 200);
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
}
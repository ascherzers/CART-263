let roomReveal = 0;
let items = {};
let inventory = [];
let messages = "";
let bg, paper, keyImg, bookImg, shelfImg, lampImg;
let userInput = "";
let keyholeImg;
let keyholeImg2;
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
let sandwichImg;
let readingBook = false;
let bookText = `Dear Madam Reller...

Was it a car or a cat I saw?
Evil is a name of a foeman as I live.
Madam, in Eden, I’m Adam.
Mr. Owl ate my metal worm.
A Santa at NASA.
Do geese see God?
A Toyota’s a Toyota.
A man, a plan, a canal: Panama!
Step on no pets.
No lemon, no melon.

Never odd or even, she whispers—
“Too hot to hoot,” she grinned.
“Won’t lovers revolt now?” I asked.
“Sir, I demand, I am a maid named Iris.”

Rats live on no evil star. 
Drab as a fool, aloof as a bard.
Eva, can I see bees in a cave?

We leave soon.
No one lives evil on.

Yours in infinity,
~ Madam Reller`;




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
    keyholeImg = loadImage('keyhole.png');
    keyholeImg2 = loadImage('keyhole2.png');
    sandwichImg = loadImage('sandwich.png');
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
        'Key+-': { x: 70, y: 370, found: false, visible: false, img: keyImg },
        'book': { x: 620, y: 450, found: false, visible: false, revealed: false, img: bookImg },
        'satchel': { x: 200, y: 380, found: false, visible: true, img: satchelImg },
        'Sledge Hammer': { x: 400, y: 450, found: false, visible: false, img: sledgeImg },
        'sandwiches': { x: 330, y: 500, found: false, visible: false, img: sandwichImg }
    };


    lamp = { x: 470, y: 140, img: lampImg };

    keyhole = { x: 200, y: 200, width: 60, height: 60, visible: false };
    keyhole2 = { x: 200, y: 130, width: 60, height: 60, visible: false };

}

function draw() {
    background(0);

    if (tutorial) {
        fill(255);
        textSize(130);
        textFont(pixelFont);
        text("EEG", 275, 180);
        textSize(32);
        text("Don't press the Start Button.", 150, 450);

    } else if (typeMode) {
        fill(255);
        rect(100, 100, 600, 400);
        fill(0);
        textSize(20);
        textFont(pixelFont);

        if (riddleActive) {
            text(currentRiddle, 120, 250);
            text(userInput, 120, 400);
        } else if (!nameEntered) {
            text("Good job, that was the game \nLeave a review: \n" + userInput, 120, 300);
        } else {
            text("Script of Typing Stuff", 120, 300);
            text(userInput, 120, 350);

        }

    } else if (readingBook) {
        fill(255);
        rect(50, 50, 700, 500);
        fill(0);
        textFont(pixelFont);
        textSize(16);
        text(bookText, 70, 80, 660, 460);

        fill(100);
        rect(680, 60, 60, 30);
        fill(255);
        text("Close", 690, 80);
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

        if (items['sandwiches'].visible && !items['sandwiches'].found) {
            image(items['sandwiches'].img, items['sandwiches'].x, items['sandwiches'].y, 80, 80);
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
        if (keyhole.visible) {
            image(keyholeImg, keyhole.x, keyhole.y, keyhole.width, keyhole.height);
        }
        if (keyhole2.visible) {
            image(keyholeImg2, keyhole2.x, keyhole2.y, keyhole2.width, keyhole2.height);
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
                messages = "The game isn't over hahaha";
                typeMode = false;
                exitTypeModeButton.hide();
                typeButton.show();
            } if (riddleActive) {
                if (userInput.toLowerCase() === riddleAnswer) {
                    items['book'].visible = true;
                    messages = "Look a book";
                }
                userInput = "";
                riddleActive = false;
                typeMode = false;
                exitTypeModeButton.hide();
            } else {
                if (userInput.toLowerCase() === "ham") {
                    items['Sledge Hammer'].visible = true;
                    messages = "Summoned Sledge Hammer";
                } else if (userInput === "KEY") {
                    keyhole2.visible = true;
                    messages = "Hole in the wall";
                } else if (userInput.toLowerCase() === "palindrome") {
                    if (!items['sandwiches'].found) {
                        items['sandwiches'].visible = true;
                        messages = "Yum";
                    }
                }
                userInput = "";
                typeMode = false;
                exitTypeModeButton.hide();
            }
        } else {
            userInput += shiftPressed ? key.toUpperCase() : key.toLowerCase();
        }
    } else if (!typeMode && selectedInventoryItem === "book" && keyCode === ENTER) {
        readingBook = true;
        messages = "";
    }
}

function mousePressed() {
    if (!typeMode) {
        if (showInventory) {
            for (let i = 0; i < inventory.length; i++) {
                let y = 160 + i * 30;
                if (mouseX > 560 && mouseX < 760 && mouseY > y - 20 && mouseY < y + 5) {
                    selectedInventoryItem = inventory[i];
                    messages = selectedInventoryItem + " selected";

                    if (selectedInventoryItem === "book" && !readingBook) {
                        readingBook = true;
                        messages = "";
                    }

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
                    messages = "There's something on the ground";
                } else if (item === 'paper' && items[item].visible) {
                    if (!riddleActive) {
                        riddleActive = true;
                        typeMode = true;
                        userInput = "";
                        currentRiddle = "I speak without a mouth \nAnd hear without ears.\nI have no body,\nBut I come alive with wind.\nWhat am I?";
                        riddleAnswer = "echo";
                        messages = "Loose Paper.";
                    }
                } else if (item === 'book' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "Madam Reller..."; //Palindrome add function to be able to read book's contents in inventory to desipher
                    inventoryButton.show();
                } else if (item === 'key' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "KEY"; //Typing key spawns keyhole which leads player to death room
                    inventoryButton.show();
                    keyhole.visible = true;
                    //fadeInProgress = true;
                } else if (item === 'satchel' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "Good job, that was hard!";
                    inventoryButton.show();
                } else if (item === 'Sledge Hammer' && items[item].visible) {
                    if (inventory.includes('satchel')) {
                        items[item].found = true;
                        inventory.push(item);
                        messages = "Why is this in the room?";
                    } else {
                        messages = "So heavy";
                    }
                } else if (item === 'Key+-' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "Key+-";
                    inventoryButton.show();
                } else if (item === 'sandwiches' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "It's Missing An Ingredient!!!"
                    inventoryButton.show();
                }
            }
        }

        if (mouseX > lamp.x && mouseX < lamp.x + 300 && mouseY > lamp.y && mouseY < lamp.y + 300) {
            lampOn = !lampOn;
            messages = lampOn ? "ON" : "OFF";
        }

        if (mouseX > shelf.x && mouseX < shelf.x + 250 && mouseY > shelf.y && mouseY < shelf.y + 250) {
            if (selectedInventoryItem === "Sledge Hammer") {
                if (selectedInventoryItem === "Sledge Hammer") {
                    messages = "Why did you do that?";
                    shelf.img = smashedShelfImg; // Change the image
                    selectedInventoryItem = null;
                    items['Key+-'].visible = true; // MAKE SECOND KEY VISIBLE
                }
            } else {
                draggingShelf = true;
            }
        }
        if (mouseX > lamp.x && mouseX < lamp.x + 300 && mouseY > lamp.y && mouseY < lamp.y + 300) {
            draggingLamp = true;
        }

        if (keyhole.visible &&
            mouseX > keyhole.x && mouseX < keyhole.x + keyhole.width &&
            mouseY > keyhole.y && mouseY < keyhole.y + keyhole.height) {

            if (selectedInventoryItem === 'Key+-') {
                messages = "Not Peanut Butter but it works";
                fadeInProgress = true;
                selectedInventoryItem = null;
            } else {
                messages = "Try Peanut Butter";//Add peanut butter
            }
        } if (keyhole2.visible &&
            mouseX > keyhole2.x && mouseX < keyhole2.x + keyhole2.width &&
            mouseY > keyhole2.y && mouseY < keyhole2.y + keyhole2.height) {

            if (selectedInventoryItem === 'key') {
                messages = "Hole in the wall accepted that";
                fadeInProgress = true;
                selectedInventoryItem = null;
            } else {
                messages = "Hole in the wall";
            }
        }


    }

    if (readingBook) {
        if (mouseX > 680 && mouseX < 740 && mouseY > 60 && mouseY < 90) {
            readingBook = false;
            selectedInventoryItem = null;
        }
        return; // Prevent other clicks when reading book
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

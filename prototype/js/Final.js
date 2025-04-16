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
let mouseSpawned = false;
let typeButton, exitTypeModeButton, startButton;
let pixelFont;
let satchelImg;
let shelf, lamp;
let draggingShelf = false, draggingLamp = false;
let shelfStartX, shelfStartY;
let tutorial = true;
let playerName = "";
let fadeAmount = 0;
let clockImages = [];
let clockProgress = 0;
let fadeTarget = "";
let smashEffect;
let lampOn = false;
let lastClickOutsideTime = 0;
let showJumpscare = false;
let jumpscareSize = 50;
let jumpscareOpacity = 255;
let clickOutsideCount = 0;
let lampOnEffect;
let justClickedInventoryButton = false;
let cursorVisible = true;
let skullImg;
let showDeathScreen = false;
let lampOffEffect;
let thirdRoomImg;
let fadeActive = false;
let fadePhase = "out";
let riddleActive = false;
let currentRiddle = "";
let riddleAnswer = "";
let inventoryButton;
let showInventory = false;
let closeInventoryButton;
let keyEffect;
let mouseEffect;
let sledgeImg;
let deathRoomImg;
let roomTwoItems = {};
let keyUsed = false;
let fadeOutAmount = 0;
let fadeInAmount = 0;
let mouseImgX, mouseImgY;
let mouseTargetX, mouseTargetY;
let mouseMoving = false;
let bell;
let mouseAlreadyThere = false;
let scaleFactor = 3;
let nameEntered = false;
let deskMoveEffect;
let mouseAlreadyCollected = false;
let selectedInventoryItem = null;
let altKeyUsed = false;
let smashedShelfImg;
let sandwichImg;
let readingBook = false;
let backgroundMusic;
let keyholeClogged = false;
let sandwichMessage = "It's Missing an Ingredient";
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
    mouseImg = loadImage('mouse.png');
    deathRoomImg = loadImage('deathroom.jpeg');
    keyEffect = loadSound('KEY.mp3');
    mouseEffect = loadSound('squeek.mp3');
    lampOnEffect = loadSound('LampOn.mp3');
    lampOffEffect = loadSound('LampOff.mp3');
    deskMoveEffect = loadSound('deskMove.mp3');
    smashEffect = loadSound('smash.mp3');
    backgroundMusic = loadSound('musicB.mp3');
    bell = loadSound('bell.mp3');
    skullImg = loadImage('skull.png');
    thirdRoomImg = loadImage('3room.png');
    jumpscareImg = loadImage('jumpscare.png');
    for (let i = 0; i < 6; i++) {
        clockImages.push(loadImage(`clock${i}.png`));
    }
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
        justClickedInventoryButton = true;
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
        'sandwiches': { x: 330, y: 500, found: false, visible: false, img: sandwichImg },
        'Peanut Butter': { x: 700, y: 50, found: false, visible: false, img: null },
        'mouse': { x: 400, y: 300, found: false, visible: false, img: null }
    };


    roomTwoItems = {
        'skull': { x: 400, y: 300, found: false, visible: true, img: skullImg }
    };



    lamp = { x: 470, y: 140, img: lampImg };

    keyhole = { x: 200, y: 200, width: 60, height: 60, visible: false };
    keyhole2 = { x: 200, y: 130, width: 60, height: 60, visible: false };

    mouseImgX = width - 80;
    mouseImgY = height - 80;
    mouseTargetX = mouseImgX;
    mouseTargetY = mouseImgY;


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
        if (frameCount % 30 === 0) {
            cursorVisible = !cursorVisible;
        }

        if (riddleActive) {
            text(currentRiddle, 120, 250);
            text(userInput + (cursorVisible ? "_" : ""), 120, 400);
            text("Close", 620, 140);
        } else if (!nameEntered) {
            text("Thanks for playing! \n    Leave a review: \n\n" + userInput + (cursorVisible ? "_" : ""), 275, 300);
        } else {
            text("Script of Typing Stuff", 275, 300);
            text(userInput + (cursorVisible ? "_" : ""), 275, 350);

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
        if (keyUsed) {
            image(deathRoomImg, 0, 0, width, height);
        } else if (!keyUsed && !altKeyUsed) {
            push();
            let alphaFade = fadeActive && fadePhase === "out" ? 255 - fadeAmount : 255;
            tint(255, alphaFade);

            image(bg, 0, 0, width, height);

            for (let item in items) {
                if (item === 'Key+-') continue;
                if (items[item].visible && !items[item].found) {
                    let img = items[item].img;
                    if (item === 'Sledge Hammer') {
                        image(img, items[item].x - 40, items[item].y - 40, 160, 160);
                    } else {
                        image(img, items[item].x - 20, items[item].y - 20, 80, 80);
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

            if (mouseSpawned) {
                image(mouseImg, mouseImgX, mouseImgY, 60, 60);
            }

            if (keyhole.visible) {
                image(keyholeImg, keyhole.x, keyhole.y, keyhole.width, keyhole.height);
            }
            if (keyhole2.visible) {
                image(keyholeImg2, keyhole2.x, keyhole2.y, keyhole2.width, keyhole2.height);
            }

            image(clockImages[clockProgress], 540, 100, 80, 80); // top right corner

            pop(); // Restore non-tinted state
        }

        if (lampOn) {
            push();
            let glowAlpha = fadeActive && fadePhase === "out" ? 150 * ((255 - fadeAmount) / 255) : 150;
            fill(255, 255, 100, 150);
            ellipse(lamp.x + 175, lamp.y + 100, 150, 100);
            pop();

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

        let textAlpha = fadeActive && fadePhase === "out" ? 255 - fadeAmount : 255;
        fill(255, textAlpha);
        textSize(16);
        textFont(pixelFont);
        text(messages, 20, height - 40);



        if (mouseSpawned) {
            if (mouseMoving) {
                // Move mouse position gradually to the target
                let easing = 0.05;
                let dx = mouseTargetX - mouseImgX;
                let dy = mouseTargetY - mouseImgY;

                mouseImgX += dx * easing;
                mouseImgY += dy * easing;

                // Stop moving if close to target
                if (abs(dx) < 1 && abs(dy) < 1) {
                    mouseImgX = mouseTargetX;
                    mouseImgY = mouseTargetY;
                    mouseMoving = false;
                }
            }

            image(mouseImg, mouseImgX, mouseImgY, 60, 60);
        }


        if (fadeActive) {
            if (fadePhase === "out") {
                fadeAmount += 5;
                if (fadeAmount >= 255) {
                    fadeAmount = 255;
                    fadePhase = "in";
                }
            } else if (fadePhase === "in") {
                fadeAmount -= 5;
                if (fadeAmount <= 0) {
                    fadeAmount = 0;
                    fadeActive = false;
                    if (fadeTarget === "backroom") keyUsed = true;
                    if (fadeTarget === "thirdroom") altKeyUsed = true;
                    fadeTarget = "";
                }
            }

            let fadeOpacity = map(255 - fadeAmount, 0, 255, 0, 1);
            typeButton.style("opacity", fadeOpacity);
            exitTypeModeButton.style("opacity", fadeOpacity);
            inventoryButton.style("opacity", fadeOpacity);
            closeInventoryButton.style("opacity", fadeOpacity);
            startButton.style("opacity", fadeOpacity);

            noStroke();
            fill(0, fadeAmount);
            rect(0, 0, width, height);
        }

        else if ((keyUsed || altKeyUsed) && !fadeActive) {
            if (altKeyUsed) {
                image(thirdRoomImg, 0, 0, width, height);
                fill(255);
                textSize(16);
                textFont(pixelFont);
                text("Is this the right way?", 20, height - 40);

                if (showJumpscare) {
                    push();
                    tint(255, jumpscareOpacity);
                    imageMode(CENTER);
                    image(jumpscareImg, width / 2, height / 2, jumpscareSize, jumpscareSize);
                    imageMode(CORNER);
                    jumpscareSize += 40;
                    if (jumpscareSize > width * 1.5) {
                        jumpscareOpacity -= 20;
                    }
                    if (jumpscareOpacity <= 0) {
                        showJumpscare = false;
                        jumpscareSize = 50;
                        jumpscareOpacity = 255;
                    }
                    pop();
                }
            } else if (keyUsed) {
                image(deathRoomImg, 0, 0, width, height);
                fill(255);
                textSize(32);
                textFont(pixelFont);
                textAlign(CENTER);
                text("The Backroom", width / 2, 170);

                for (let item in roomTwoItems) {
                    let currentItem = roomTwoItems[item];
                    if (currentItem.visible) {
                        image(currentItem.img, currentItem.x - 50, currentItem.y - 60, 110, 125);

                    }
                }
            }
        }
        if (showDeathScreen) {
            fill(0, 200);
            rect(0, 0, width, height);
            fill(255, 0, 0);
            textSize(64);
            textFont(pixelFont);
            textAlign(CENTER, CENTER);
            text("YOU DIED", width / 2, height / 2);
        }
        if (showInventory) {
            const insideInventory = mouseIsPressed && mouseX > 550 && mouseX < 780 && mouseY > 100 && mouseY < 500;

            if (mouseIsPressed && !insideInventory) {
                if (millis() - lastClickOutsideTime < 400) {
                    clickOutsideCount++;
                } else {
                    clickOutsideCount = 1;
                }
                lastClickOutsideTime = millis();

                if (clickOutsideCount >= 2) {
                    showInventory = false;
                    closeInventoryButton.hide();
                    selectedInventoryItem = null;
                    clickOutsideCount = 0;
                }
            }
        }

        justClickedInventoryButton = false;


    }
}

function triggerFade() {
    fadeAmount = 0;
    fadeActive = true;
    fadePhase = "out";
    fadeTarget = "backroom";
    showInventory = false;
    closeInventoryButton.hide();
}

function triggerAltFade() {
    fadeAmount = 0;
    fadeActive = true;
    fadePhase = "out";
    fadeTarget = "thirdroom";
    altKeyUsed = true;
    showInventory = false;
    closeInventoryButton.hide();
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
                // if (!bgMusic.isPlaying()) {
                //     bgMusic.loop();
                // }
                messages = "Congrats! You discovered the rest of the game!";
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
    }
}

function mousePressed() {
    if (!typeMode) {
        let clickingInsideInventory = showInventory && mouseX > 550 && mouseX < 780 && mouseY > 100 && mouseY < 500;
        let clickedInventoryButton = mouseX > 1010 && mouseX < 1010 + 100 && mouseY > 640 && mouseY < 640 + 20;
        if (showInventory) {
            for (let i = 0; i < inventory.length; i++) {
                let y = 160 + i * 30;
                if (mouseX > 560 && mouseX < 760 && mouseY > y - 20 && mouseY < y + 5 && inventory[i] === "sandwiches") {
                    if (selectedInventoryItem === inventory[i]) {
                        selectedInventoryItem = null;
                        messages = "";
                    } else {
                        selectedInventoryItem = inventory[i];
                        messages = sandwichMessage;
                    }

                }
                else if (mouseX > 560 && mouseX < 760 && mouseY > y - 20 && mouseY < y + 5) {
                    if (selectedInventoryItem === inventory[i]) {
                        selectedInventoryItem = null;
                        messages = "";
                    } else {
                        selectedInventoryItem = inventory[i];
                        messages = selectedInventoryItem + " selected";

                        if (selectedInventoryItem === "book" && !readingBook) {
                            readingBook = true;
                            messages = "";
                        }
                    }
                    return;
                }
            }
        }

        // If the player clicks in the top right corner (50x50 pixel area)
        if (mouseX < width - 50 && mouseY < 50) {
            if (!items['Peanut Butter'].found && inventory.includes("satchel")) {
                items['Peanut Butter'].found = true;
                inventory.push('Peanut Butter');
                messages = "Peanut Butter added to inventory";
                inventoryButton.show();
                if (!bell.isPlaying()) {
                    bell.play();
                }
            } else if (!inventory.includes("satchel")) {
                messages = "Something's up here";
            }
            return;
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
                        currentRiddle = "I speak without a mouth \nAnd hear without ears.\nI have no body,\nBut I can copy any voice.\nWhat am I?";
                        riddleAnswer = "echo";
                        messages = "Didn't work";
                    }
                } else if (item === 'book' && items[item].visible) {
                    if (inventory.includes("satchel")) {
                        items[item].found = true;
                        inventory.push(item);
                        messages = "Madam Reller..."; //Palindrome add function to be able to read book's contents in inventory to desipher
                        inventoryButton.show();
                        if (!bell.isPlaying()) {
                            bell.play();
                        }
                    } else {
                        messages = "Why don't you have the satchel yet? It's right over there|";
                    }
                } else if (item === 'key' && items[item].visible) {
                    if (inventory.includes("satchel")) {
                        items[item].found = true;
                        inventory.push(item);
                        messages = "KEY"; //Typing key spawns keyhole which leads player to death room
                        clockProgress = max(clockProgress, 1);
                        if (!keyEffect.isPlaying()) {
                            keyEffect.play();
                        }
                        inventoryButton.show();
                        keyhole.visible = true;
                    } else {
                        messages = "Come On! Grab the bag|";
                    }
                } else if (item === 'satchel' && items[item].visible) {
                    items[item].found = true;
                    inventory.push(item);
                    messages = "Good job, that was difficult!";
                    inventoryButton.show();
                    if (!bell.isPlaying()) {
                        bell.play();
                    }
                } else if (item === 'Sledge Hammer' && items[item].visible) {
                    if (inventory.includes('satchel')) {
                        items[item].found = true;
                        inventory.push(item);
                        messages = "Why is this in the room?";
                        clockProgress = max(clockProgress, 2);
                        sandwichMessage = "sandwiches selected";
                        if (!bell.isPlaying()) {
                            bell.play();
                        }
                    } else {
                        messages = "So heavy";
                    }
                } else if (item === 'Key+-' && items[item].visible) {
                    if (inventory.includes("satchel")) {
                        items[item].found = true;
                        inventory.push(item);
                        messages = "Key+-";
                        clockProgress = max(clockProgress, 3);
                        inventoryButton.show();
                        if (!bell.isPlaying()) {
                            bell.play();
                        }
                    } else {
                        messages = "You've done all this without an inventory? HOW?";
                    }
                } else if (item === 'sandwiches' && items[item].visible) {
                    if (inventory.includes("satchel")) {
                        items[item].found = true;
                        inventory.push(item);
                        messages = "It's Missing an Ingredient"
                        clockProgress = max(clockProgress, 4);
                        inventoryButton.show();
                        if (!bell.isPlaying()) {
                            bell.play();
                        }
                    } else {
                        messages = "There's no way you don't have the satchel at this point";
                    }
                }
            }
        }

        if (!clickingInsideInventory && mouseX > lamp.x && mouseX < lamp.x + 300 && mouseY > lamp.y && mouseY < lamp.y + 300) {
            lampOn = !lampOn;
            if (!lampOnEffect.isPlaying() && lampOn) {
                lampOnEffect.play();
            }
            if (!lampOffEffect.isPlaying() && !lampOn) {
                lampOffEffect.play();
            }
            messages = lampOn ? "ON" : "OFF";
        }


        if (mouseX > shelf.x && mouseX < shelf.x + 250 && mouseY > shelf.y && mouseY < shelf.y + 250) {
            if (selectedInventoryItem === "Sledge Hammer") {
                if (selectedInventoryItem === "Sledge Hammer") {
                    if (!smashEffect.isPlaying()) {
                        smashEffect.play();
                    }
                    messages = "Why did you do that?";
                    shelf.img = smashedShelfImg; // Change the image
                    selectedInventoryItem = null;
                    items['Key+-'].visible = true; // MAKE SECOND KEY VISIBLE
                }
            } else {
                draggingShelf = true;
            }
        }
        if (!clickingInsideInventory && mouseX > lamp.x && mouseX < lamp.x + 300 && mouseY > lamp.y && mouseY < lamp.y + 300) {
            draggingLamp = true;
        }

        if (!clickingInsideInventory && keyhole.visible) {
            if (mouseX > keyhole.x && mouseX < keyhole.x + keyhole.width &&
                mouseY > keyhole.y && mouseY < keyhole.y + keyhole.height) {

                if (keyholeClogged) {
                    messages = "Too much peanut butter stuck inside";
                    return;
                }

                if (selectedInventoryItem === 'Key+-') {
                    messages = "Not Peanut Butter but it works";
                    triggerAltFade();
                    selectedInventoryItem = null;
                } else if (selectedInventoryItem === 'Peanut Butter') {
                    messages = "You put Peanut Butter into a keyhole";
                    keyholeClogged = true;
                    selectedInventoryItem = null;
                } else if (selectedInventoryItem) {
                    if (keyholeClogged) {
                        messages = selectedInventoryItem + " can't fit with all that Peanut Butter inside";
                    } else {
                        messages = "Try Peanut Butter";//Add peanut butter
                    }
                }
            } if (keyhole2.visible &&
                mouseX > keyhole2.x && mouseX < keyhole2.x + keyhole2.width &&
                mouseY > keyhole2.y && mouseY < keyhole2.y + keyhole2.height) {

                if (selectedInventoryItem === 'key') {
                    messages = "Hole in the wall accepted that";
                    triggerFade();
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

        // Mouse appears in bottom right if both items are in inventory
        if (!mouseSpawned &&
            inventory.includes('Peanut Butter') &&
            inventory.includes('sandwiches') &&
            mouseX > width - 100 && mouseY > height - 100) {
            mouseSpawned = true;
            if (!mouseEffect.isPlaying()) {
                mouseEffect.play();
            }
            messages = "There's a Little Hungry Feller";
            inventory.pop('sandwiches');
            inventory.pop('Peanut Butter');
        }

        if (mouseSpawned && !mouseAlreadyThere && mouseX > width - 100 && mouseY > height - 100) {
            mouseSpawned = true;
            mouseImgX = width - 80;    // Start at bottom-right
            mouseImgY = height - 80;
            mouseTargetX = width / 2 - 30;  // Move to center (adjust to align image)
            mouseTargetY = height / 2 + 100;
            mouseMoving = true;
            mouseAlreadyThere = true;
        }

        if (mouseSpawned &&
            !mouseMoving &&
            !mouseAlreadyCollected &&
            dist(mouseX, mouseY, mouseImgX, mouseImgY) < 50) {

            if (!inventory.includes('sandwiches')) {
                inventory.push('sandwiches');
            }
            if (!inventory.includes('mouse')) {
                inventory.push('mouse');
            }
            mouseAlreadyCollected = true;
            messages = "He ate your peanut butter but you got your sandwiches back!";
            inventoryButton.show();
            mouseSpawned = false;
        }

        if (keyUsed && !fadeActive) {
            let skull = roomTwoItems['skull'];
            let skullX = skull.x - 50;
            let skullY = skull.y - 60;
            let skullW = 110;
            let skullH = 125;
            if (
                mouseX > skullX &&
                mouseX < skullX + skullW &&
                mouseY > skullY &&
                mouseY < skullY + skullH
            ) {
                showDeathScreen = true;
            }
        }

        if (altKeyUsed && !fadeActive) {
            if (
                mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
                mouseY > height / 2 - 75 && mouseY < height / 2 + 75
            ) {
                showJumpscare = true;
                jumpscareSize = 50;
                jumpscareOpacity = 255;
            }
        }

    }

    if (riddleActive) {
        if (mouseX > 590 && mouseX < 690 && mouseY > 100 && mouseY < 150) {
            riddleActive = false;
            selectedInventoryItem = null;
            typeMode = false;
        }
    }

}

function mouseDragged() {
    if (draggingShelf) {
        let newX = constrain(mouseX - 200, shelf.startX - 20, shelf.startX);
        shelf.x = newX;
        if (!deskMoveEffect.isPlaying()) {
            deskMoveEffect.play();
        }
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

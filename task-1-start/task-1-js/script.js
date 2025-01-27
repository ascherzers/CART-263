window.onload = setup;

/** function setup */
function setup() {
    console.log("we are a go!")
    /*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
    /*** START PART ONE ACCESS */
    /* 1: all paragraph elements */
    /***CODE */
    const allParagraphs = document.querySelectorAll("p");
    console.log(allParagraphs);
    /***OUTPUT: 
     * NodeList(…) [list of all paragraph elements in the document]
     */

    /*************************************** */
    /* 2: only the first paragraph element */
    /***CODE */
    const firstParagraph = document.querySelector("p");
    console.log(firstParagraph);
    /***OUTPUT: 
     * <p>...</p> [First paragraph element in the document]
     */


    /*************************************** */
    /* 3: all elements with the class inner-container */
    /***CODE */
    const innerContainers = document.querySelectorAll(".inner-container");
    console.log(innerContainers);
    /***OUTPUT: 
     * NodeList(…) [list of all elements with class inner-container]
     */


    /*************************************** */
    /* 4: the last image element inside the element that has the class img-container */
    /***CODE */
    const imgContainer = document.querySelector(".img-container");
    const lastImage = imgContainer ? imgContainer.querySelectorAll("img").item(imgContainer.querySelectorAll("img").length - 1) : null;
    console.log(lastImage);
    /***OUTPUT: 
       * <img>...</img> [The last image element inside the element with class img-container]
       * OR
       * null [if no img-container or no images inside it exist]
     */


    /*************************************** */
    /* 5A: all h2 elements */
    const allH2 = document.querySelectorAll("h2");
    console.log(allH2);
    /* 5B: length of the list in 5A */
    console.log(allH2.length);
    /* 5C: the text content of the first element in the list from 5A */
    /***CODE */
    const firstH2Text = allH2.length > 0 ? allH2[0].textContent : null;
    console.log(firstH2Text);
    /***OUTPUT: 
       * 5A: NodeList(…) [list of all h2 elements in the document]
       * 5B: Number of h2 elements [e.g., 3]
       * 5C: Text content of the first h2 element [e.g., "Header 1"]
     */


    /*************************************** */
    /* 6: the element with id name parent */
    /***CODE */
    const parentElement = document.getElementById("name");
    console.log(parentElement);
    /***OUTPUT: 
       * <element>...</element> [Element with ID name]
       * OR
       * null [if no such element exists]
     */

    /*************************************** */
    /*** END PART ONE ACCESS */


    /*************************************** */
    /*** START PART TWO MODIFY */
    /*************************************** */
    /* 1: Select the first paragraph and replace the text within the paragraph... */
    /***CODE */
    if (firstParagraph) firstParagraph.textContent = "This is the new text for the first paragraph.";
    console.log(firstParagraph);

    /*** OUTPUT:
    * <p>This is the new text for the first paragraph.</p>
     */

    /*************************************** */
    /* 2: Select all elements in the HTML that have the class name content-container
     and change the background color ... of first and second ...*/
    /***CODE */
    const contentContainers = document.querySelectorAll(".content-container");
    if (contentContainers.length > 0) contentContainers[0].style.backgroundColor = "lightblue";
    if (contentContainers.length > 1) contentContainers[1].style.backgroundColor = "lightgreen";
    console.log(contentContainers);

    /*** OUTPUT:
     * First and second elements with class content-container have updated background colors:
     * lightblue (1st), lightgreen (2nd).
     */

    /*************************************** */
    /* 3: Change the src element of the first image element on the page to be ...
    /***CODE */
    const firstImage = document.querySelector("img");
    if (firstImage) firstImage.src = "new-image.jpg";
    console.log(firstImage);

    /*** OUTPUT:
     * <img src="new-image.jpg"> [First image element's source updated]
     */

    /*************************************** */
    /* 4: Select the third paragraph element on the page and 
    replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
    /***CODE */
    const thirdParagraph = document.querySelectorAll("p")[2];
    if (thirdParagraph) thirdParagraph.innerHTML = "<h2>TEST 123</h2>";
    console.log(thirdParagraph);

    /*** OUTPUT:
     * <p><h2>TEST 123</h2></p> [Third paragraph content replaced with an h2 element]
     */

    /*************************************** */
    /* 5: Select the fourth paragraph element on the page and 
    add to the existing content an h2 element containing the text TEST 123
    /***CODE */
    const fourthParagraph = document.querySelectorAll("p")[3];
    if (fourthParagraph) fourthParagraph.innerHTML += "<h2>TEST 123</h2>";
    console.log(fourthParagraph);

    /*** OUTPUT:
     * <p>Existing content<h2>TEST 123</h2></p> [Fourth paragraph content now includes an h2 element]
     */

    /*************************************** */
    /* 6: Select the fifth paragraph element on the page and add to the existing content 
    an img element that holds one.png, and add the class newStyle to said paragraph element.
    /***CODE */
    const fifthParagraph = document.querySelectorAll("p")[4];
    if (fifthParagraph) {
        fifthParagraph.innerHTML += '<img src="one.png" alt="Image">';
        fifthParagraph.classList.add("newStyle");
    }
    console.log(fifthParagraph);

    /*** OUTPUT:
     * <p class="newStyle">Existing content<img src="one.png" alt="Image"></p> [Fifth paragraph updated with an img and a new class]
     */

    /*************************************** */
    /* 7: Add the following array variable: let colors = ['red','blue','green','orange'];, 
    then access all elements with class name inner-container and save to a variable called `innerContainers`. 
    Next, iterate over the colors array, and for each color: 
    assign the element from innerContainers variable with the same index 
    (i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
    a background using that color.
    /***CODE */
    let colors = ['red', 'blue', 'green', 'orange'];
    innerContainers.forEach((element, index) => {
        if (colors[index]) {
            element.style.backgroundColor = colors[index];
        }
    });
    console.log(innerContainers);

    /*** OUTPUT:
     * innerContainers elements have their background colours updated:
     * 1st -> red, 2nd -> blue, 3rd -> green, 4th -> orange.
     */

    /*************************************** */
    /*** END PART TWO MODIFY */


    /*************************************** */
    /*** START PART THREE CREATE */
    /*************************************** */
    /* 1: NEW PARAGRAPHS */
    /* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
    const allPTagsThree = document.querySelectorAll("p");
    /* 1B: Create a function:function customCreateElement(parent){ //body } */
    function customCreateElement(parent) {
        /* 1C:  In the body of customCreateElement create a new parargraph element*/
        const newParagraph = document.createElement("p");
        /* 1D:  Set the text of this element to be : `using create Element`*/
        newParagraph.textContent = "using create Element";
        /* 1E:  Set the background of this paragraph element to be green */
        newParagraph.style.backgroundColor = "green";
        /* 1F:  Set the color of the text in this paragraph element to be white */
        newParagraph.style.color = "white";
        /* 1G: Append this new element to the parent variable within the function. */
        parent.appendChild(newParagraph);
        /* 1H: Iterate through the allPTagsThree array and call customCreateElement(), 
        passing the current allPTagsThree element as the parent with each iteration.*/
        allPTagsThree.forEach((pTag) => {
            customCreateElement(pTag);
        });
        /***CODE */
        //Done above

        /***EXPLANATION::
         * - I first selected all paragraph elements using querySelectorAll and stored them in allPTagsThree.
         * - I defined customCreateElement to create, style, and append a new paragraph to a parent element.
         * - I went through allPTagsThree, calling customCreateElement for each paragraph.
         * - This adds a new paragraph to each existing paragraph in the DOM.
         * 
         */

        /*************************************** */
        /* 2: GRID OF BOXES */
        /* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
        function customNewBoxCreate(parent) {
            /* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv. 
            /* 2C:Then append this new element to the parent variable within the function. 
            /* 2D:Finally, return</code> this new element */
            const newDiv = document.createElement("div");
            newDiv.classList.add("testDiv");
            parent.appendChild(newDiv);
            return newDiv;
        }
        /* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)). 
            Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
            Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
        const gridParent = document.getElementById("new-grid");
        if (gridParent) {
            for (let row = 0; row < 10; row++) {
                for (let col = 0; col < 10; col++) {
                    const returnedDiv = customNewBoxCreate(gridParent);
                    /* 2F: You will see at this point that the x,y position of the resulting divs makes no sense... 
                        Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
                        in a variable i.e. returnedDiv. 
                        Set the style (left and top) to the of this element to 
                        the necessary x and y position (use the counter variables in the for nested for loop to 
                        calculate the new positions.
                    /* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
                        and otherwise let it have a background of purple.</li>
                    /* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
                        otherwise lat it have the content `ODD`.*/
                    returnedDiv.style.position = "absolute";
                    returnedDiv.style.left = `${col * 50}px`; // x-position (50px spacing)
                    returnedDiv.style.top = `${row * 50}px`;  // y-position (50px spacing)
                    if (row % 2 === 0) {
                        returnedDiv.style.backgroundColor = "white";
                    } else {
                        returnedDiv.style.backgroundColor = "purple";
                    }
                    returnedDiv.textContent = row % 2 === 0 ? "EVEN" : "ODD";
                }
            }
        }

        /***CODE */
        //Done above

        /***EXPLANATION::
    * - customNewBoxCreate creates and appends a new div to the given parent, then returns the created element.
    * - I used nested loops to create a 10x10 grid.
    * - Each cell's position is set using left and top properties based on loop counters.
    * - BONUS I sets the background color of the row (white for even, purple for odd rows).
    * - BONUS II adds text content ("EVEN" or "ODD") based on the row.
         */

        /*************************************** */
        /* 3: GRID OF BOXES II */

        /* 3A: Create ANOTHER nested for loop - in order to generate a new grid ... 
            USE the same customNewBoxCreate function..., the only difference is that the parent element 
            for each of these new divs is the element whose id is `new-grid-three`. */
        /* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder), 
            when it is a column where the remainder is 1 or when the remainder is 2 ... 
            HINT:: look up the % operator.. */
        /* 3C: Then for each of the above cases: give the new divs in the first case a background of red, 
                then the second a background of orange and the third yellow. */
        /*  3D: Finally, let each div contain the text content representing the associated remainder 
            when dividing by three. */

        /***CODE */
        const gridParentThree = document.getElementById("new-grid-three");
        if (gridParentThree) {
            for (let row = 0; row < 10; row++) {
                for (let col = 0; col < 10; col++) {
                    const returnedDiv = customNewBoxCreate(gridParentThree);
                    if (col % 3 === 0) {
                        returnedDiv.style.backgroundColor = "red";
                        returnedDiv.textContent = "0"; // Remainder 0
                    } else if (col % 3 === 1) {
                        returnedDiv.style.backgroundColor = "orange";
                        returnedDiv.textContent = "1"; // Remainder 1
                    } else {
                        returnedDiv.style.backgroundColor = "yellow";
                        returnedDiv.textContent = "2"; // Remainder 2
                    }
                    returnedDiv.style.position = "absolute";
                    returnedDiv.style.left = `${col * 50}px`; // x-position
                    returnedDiv.style.top = `${row * 50}px`;  // y-position
                }
            }
        }

        /***EXPLANATION::
    * - I reused customNewBoxCreate to generate a new grid inside new-grid-three.
    * - Nested loops create 10x10 grid cells, and the column's remainder when divided by 3 decides the colour and text.
    * - Remainder 0: red, Remainder 1: orange, Remainder 2: yellow.
    * - Each cell's position is calculated using the loop counters for left and top.
         */

        /*************************************** */
        /*** END PART THREE CREATE */
        /*************************************** */


    }
}
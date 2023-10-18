// select the start game button
document.querySelector(".control-buttons span").onclick = function () {
    // prompt window to ask for Name
    let yourName = prompt("Whats Your Name ?");
    if (yourName == null || yourName == "") {
        // set name To unknown
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        // set Name to your Name
        document.querySelector(".name span").innerHTML = yourName;
    }
    //Remove Splash screen
    document.querySelector(".control-buttons").remove();
    // show images
    let showImage = setTimeout(() => {
        blocks.map((ele) => {
            ele.classList.add("has-match");
        });
        setTimeout(() => {
            clearTimeout(showImage);
            blocks.map((ele) => {
                ele.classList.remove("has-match");
            });
        }, 500);
    }, 500);
};

// effect duration
let duration = 1000;
// select blocks container
let blocksContainer = document.querySelector(".memory-game-blocks");
// create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);
// create Ranges Of keys
let orderRange = [...Array(blocks.length).keys()]; // Array.from(Array(blocks.length).keys())
// call function shuffle
shuffle(orderRange);
// Add Order Css Property To game block
blocks.forEach((block, index) => {
    // Add css order property
    block.style.order = orderRange[index];
    // Add click event
    block.addEventListener("click", function () {
        // Trigger the flip Block function
        flipBlock(block);
    });
});
// Shuffle Function
function shuffle(array) {
    // settings Vars
    let current = array.length;
    let temp;
    let random;
    while (current > 0) {
        // Get Random number
        random = Math.floor(Math.random() * current);
        // Decrease Length By One
        current--;
        // [1] save current element in stash
        temp = array[current];
        // [2] current element = random element
        array[current] = array[random];
        // [3] random element = get element from stash
        array[random] = temp;
    }
    return array;
}
// Flip Block Function
function flipBlock(selectedBlock) {
    // Add class is-flipped
    selectedBlock.classList.add("is-flipped");
    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter((flippedBlock) =>
        flippedBlock.classList.contains("is-flipped")
    );
    // If theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {
        // stop clicking function
        stopClicking();
        // check matched block function
        checkMathedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}
// Stop Clicking Function
function stopClicking() {
    // Add Class No Clicking on main container
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        // Remove Class No Clicking After The Duration
        blocksContainer.classList.remove("no-clicking");
    }, duration);
}
// check Matched Block
let winner = 0;

function checkMathedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");
    if (firstBlock.dataset.animal === secondBlock.dataset.animal) {
        document.querySelector("#success").play();
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        winner++;
        if (winner == 10) {
            win();
        }
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        document.querySelector("#fail").play();
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
        if (triesElement.innerHTML === "6") {
            blocksContainer.style.cssText = "pointer-events : none";
            finish();
        }
    }
}
// End Game Function
function finish() {
    let div = document.createElement("div");
    div.className = "popup";
    let divText = document.createTextNode(`Game Over`);
    let p = document.createElement("p");
    p.className = "play-Again";
    let txtP = document.createTextNode("Play Again");
    p.appendChild(txtP);
    div.appendChild(divText);
    div.appendChild(p);
    document.body.appendChild(div);
    p.onclick = function () {
        window.location.reload();
    };
    setTimeout(() => {
        blocks.map((ele) => {
            ele.classList.add("has-match");
        });
    }, 500);
}
// Winner Game Function
function win() {
    let div = document.createElement("div");
    div.className = "winner";
    let p = document.createElement("p");
    p.textContent = "congratulation !";
    let p3 = document.createElement("p");
    p3.className = "play-Again";
    let txtP = document.createTextNode("Play Again");
    p3.appendChild(txtP);
    div.appendChild(p);
    div.appendChild(p3);
    document.body.appendChild(div);
    p3.onclick = function () {
        window.location.reload();
    };
}
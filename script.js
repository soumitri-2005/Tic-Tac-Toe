// making variables to access the HTML
let boxes = document.querySelectorAll(".box"); // here i am accessing the 9 boxes
let mainPage = document.querySelector(".main"); // for main page
let resetBtn = document.querySelector("#reset-btn"); // for reseting the game
let newGameBtn = document.querySelector("#new-btn"); // new btn after win
let newGameBtnTie = document.querySelector("#new-btn-tie"); // new btn after tie
let msgWin = document.querySelector("#msgW"); // for msg
let msgTie = document.querySelector("#msgT"); // for msg
let msgContainer = document.querySelector(".msg-container"); // for total msg & new-btn to be poped after win
let msgContainerTie = document.querySelector(".msg-container-tie"); // for total msg & new-tie-btn msg to be poped after tie
let startPage = document.querySelector(".start");
let defultPlayBtn = document.querySelector("#two-player");
let compPlayBtn = document.querySelector("#comp-player");

let turnO = true; // for player O

let isCompPlayer = false;

//the winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [2, 4, 5],
  [3, 4, 5],
  [6, 7, 8],
];

compPlayBtn.addEventListener("click", () => {
  isCompPlayer = true;
  showgame();
});

const showgame = () => {
  startPage.classList.add("hide");
  mainPage.classList.remove("hide");
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  msgContainerTie.classList.add("hide");
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#c9d0d7";
    box.classList.remove("disabled");
    box.textContent = "";
  }
};

const showWinner = (winner) => {
  msgW.innerText = `Congratulation! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// it is bcz after one winner the boxes should not be clicked
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const gameTie = () => {
  msgT.innerText = "It was a tie!";
  msgContainerTie.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  let isTie = true; // for tie

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        isTie = false;
      }
    } else {
      isTie = false;
    }
  }
  if (isTie) {
    gameTie();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.backgroundColor = "#e5b927";
      box.style.color = "#e61057";
      box.classList.add("disabled");
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.backgroundColor = "#e61057";
      box.style.color = "#e5b927";
      box.classList.add("disabled");
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
    if (
      isCompPlayer &&
      msgContainer.classList.contains("hide") &&
      msgContainerTie.classList.contains("hide")
    ) {
      setTimeout(computerMove, 500);
    }
  });
});

// Function for the computer's move if the user want to play with computer
const computerMove = () => {
  let availableBoxes = Array.from(boxes).filter((box) => box.innerText === "");
  if (availableBoxes.length > 0) {
    let randomBox =
      availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    // Computer's move
    randomBox.innerText = "X";
    randomBox.style.backgroundColor = "#e61057";
    randomBox.style.color = "#e5b927";
    randomBox.classList.add("disabled");
    randomBox.disabled = true;

    checkWinner();
    turnO = true;
  }
};

newGameBtn.addEventListener("click", () => {
  startPage.classList.remove("hide");
  mainPage.classList.add("hide");
  resetGame();
});
resetBtn.addEventListener("click", resetGame);
newGameBtnTie.addEventListener("click", () => {
  startPage.classList.remove("hide");
  mainPage.classList.add("hide");
  resetGame();
});
defultPlayBtn.addEventListener("click", () => {
  showgame();
  isCompPlayer = false;
  resetGame();
});

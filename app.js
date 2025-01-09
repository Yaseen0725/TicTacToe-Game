const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#resetBtn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; 
let moveCount = 0;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  moveCount = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  clearHighlights();
};

const handleBoxClick = (box) => {
  if (box.innerText !== "") return;
  box.innerText = turnO ? "O" : "X";
  box.disabled = true; 
  moveCount++;
  const isWinner = checkWinner();

  if (isWinner) {
    showWinner(turnO ? "O" : "X");
  } else if (moveCount === 9) {
    gameDraw();
  } else {
    turnO = !turnO;
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      highlightWinningBoxes([a, b, c]);
      return true;
    }
  }
  return false;
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = `It's a Draw!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const highlightWinningBoxes = (indices) => {
  indices.forEach((index) => {
    boxes[index].classList.add("highlight");
  });
};

const clearHighlights = () => {
  boxes.forEach((box) => box.classList.remove("highlight"));
};

boxes.forEach((box) => box.addEventListener("click", () => handleBoxClick(box)));
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

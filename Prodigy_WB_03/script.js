const gameBoard = document.getElementById("gameBoard");
const statusDisplay = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const modeSwitch = document.getElementById("modeSwitch");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Player starts first
let isGameActive = true;
let isAIEnabled = false; // Default: Two-player mode

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize game board
function initializeBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cellElement);
  });
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// Handle cell clicks
function handleCellClick(event) {
  const cellIndex = event.target.dataset.index;

  if (board[cellIndex] !== "" || !isGameActive) return;

  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add("taken");

  if (checkWinner()) {
    statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    statusDisplay.textContent = "It's a Draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (isAIEnabled && currentPlayer === "O") {
    statusDisplay.textContent = `AI's Turn`;
    setTimeout(() => {
      makeAIMove();
    }, 500);
  } else {
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// AI logic: Make a move
function makeAIMove() {
  let emptyCells = board.map((value, index) => (value === "" ? index : null)).filter((index) => index !== null);

  // Optional: Smarter AI (block or win)
  for (let i = 0; i < emptyCells.length; i++) {
    const testBoard = [...board];
    testBoard[emptyCells[i]] = "O";
    if (checkForWinner(testBoard, "O")) {
      board[emptyCells[i]] = "O";
      updateBoardUI(emptyCells[i]);
      return;
    }
  }
  for (let i = 0; i < emptyCells.length; i++) {
    const testBoard = [...board];
    testBoard[emptyCells[i]] = "X";
    if (checkForWinner(testBoard, "X")) {
      board[emptyCells[i]] = "O";
      updateBoardUI(emptyCells[i]);
      return;
    }
  }

  // Random move
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = "O";
  updateBoardUI(randomIndex);
}

// Update board UI after AI move
function updateBoardUI(index) {
  const cell = document.querySelector(`[data-index='${index}']`);
  cell.textContent = "O";
  cell.classList.add("taken");

  if (checkWinner()) {
    statusDisplay.textContent = `AI Wins!`;
    isGameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    statusDisplay.textContent = "It's a Draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

// Helper: Check winner on a given board state
function checkForWinner(testBoard, player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => testBoard[index] === player);
  });
}

// Restart the game
restartButton.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  initializeBoard();
});

// Mode switch event
modeSwitch.addEventListener("change", (event) => {
  isAIEnabled = event.target.checked;
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  initializeBoard();
});

// Start the game
initializeBoard();
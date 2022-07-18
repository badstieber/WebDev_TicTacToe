const statusDisplay = document.getElementById("gameStatus");

let gameActive = true;
const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;
let gameState = [
    ["", "", "",],
    ["", "", "",],
    ["", "", "",]
];

const winningMessage = () => { return `Player ${currentPlayer} has won!` };
const drawMessage = () => { return `Game ended in a draw!` };
const currentPlayerTurn = () => { return `It's ${currentPlayer}'s turn` };

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = clickedCell.getAttribute("data-cellIndex").replace(/,/g, "");
    const row = clickedCellIndex[0];
    const column = clickedCellIndex[1];
    console.log("=== clickedCellIdex:\n", clickedCellIndex)

    clickedCell.innerHTML = row + column;
}

function handleRestartGame() {
    document.querySelectorAll(".gameCell").forEach( (cell) => {
        cell.innerHTML = "-";
    });
}


// Add Event Listeners:
document.querySelectorAll(".gameCell").forEach((cell) => {
    cell.addEventListener("click", handleCellClick)
});

document.querySelector(".gameRestartButton").addEventListener("click", handleRestartGame);
const statusDisplay = document.querySelector(".game--status");

const cv = document.querySelector(".game__board__cell").textContent;
console.log("asdf", typeof cv)

let gameActive = true;
const playerX = {
    name: "Badstieber",
    symbol: "X"
};
const playerO = {
    name: "Kalwar",
    symbol: "O"
};

let currentPlayer = playerX;
let gameState = [
    ["", "", "",],
    ["", "", "",],
    ["", "", "",]
];

const winningMessage = () => { return `${currentPlayer.name} has won!` };
const drawMessage = () => { return `Game ended in a draw!` };
const currentPlayerTurnMessage = () => { return `It's ${currentPlayer.name}'s (${currentPlayer.symbol}) turn ` };

statusDisplay.textContent = currentPlayerTurnMessage();

function handleGameMove(clickedCellEvent) {
    // if game is not active do nothing
    if (!gameActive) {
        return;
    }

    const clickedCell = clickedCellEvent.target;
    const cellValue = clickedCell.textContent;
    // prevent overwriting cell
    if (cellValue) {
        return;
    }

    const clickedCellIndex = clickedCell.getAttribute("data-cellIndex").replace(/,/g, "");
    const row = clickedCellIndex[0];
    const column = clickedCellIndex[1];

    // update game state
    updateGameState(clickedCell);
    // draw player's symbol on game board
    clickedCell.textContent = currentPlayer.symbol;
    // check winner
    const gameEnded = checkWinner();
    if (gameEnded) {
        return;
    }
    // change current player
    switchPlayer();
}

function updateGameState(clickedCell) {
    // get indices of clicked cell
    const clickedCellIndex = clickedCell.getAttribute("data-cellIndex").replace(/,/g, "");
    const row = clickedCellIndex[0];
    const column = clickedCellIndex[1];

    // set game state to current player's symbol
    gameState[row][column] = currentPlayer.symbol;
}


function checkWinner() {
    const winner = checkWinnerHorizontal() || checkWinnerVertical();

    if (winner) {
        gameActive = false;
        setStatusView(winningMessage());
    }
    return winner;
}

function checkWinnerHorizontal() {
    let winner = false;
    const playerSymbol = currentPlayer.symbol;
    // loop through each game state and count the symbols
    gameState.forEach(state => {
        const count = state.filter(stateSymbol => stateSymbol === playerSymbol).length;
        if (count === 3) {
            winner = true;
        }
    });
    return winner;
}

function checkWinnerVertical() {
    let winner = false;
    const playerSymbol = currentPlayer.symbol;
    let symbolCounter = 0;
    const numberOfRows = gameState.length;
    const numberOfColumns = gameState[0].length;

    // loop through game states and check if there are vertical matches
    for (let column = 0; column < numberOfColumns; column++) {
        for (let row = 0; row < numberOfRows; row++) {
            console.log(gameState[row][column]);
            if (gameState[row][column] === playerSymbol) {
                symbolCounter++;
            }
        }
        if (symbolCounter === 3) {
            winner = true;
            return winner;
        } else {
            symbolCounter = 0;
        }

    }
    return winner;

}

function setStatusView(text) {
    const gameStatusView = document.querySelector(".game--status")
    gameStatusView.textContent = text;
}

function switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    setStatusView(currentPlayerTurnMessage());
}

function handleRestartGame() {
    // reset game states
    gameState = [
        ["", "", "",],
        ["", "", "",],
        ["", "", "",]
    ];

    // set game as active 
    gameActive = true;

    // reset game board view
    document.querySelectorAll(".game__board__cell").forEach((cell) => {
        cell.textContent = "";
    });

    // reset game status view
    setStatusView(currentPlayerTurnMessage());
}


// Add Event Listeners:
document.querySelectorAll(".game__board__cell").forEach((cell) => {
    cell.addEventListener("click", handleGameMove)
});

document.querySelector(".game--restart").addEventListener("click", handleRestartGame);
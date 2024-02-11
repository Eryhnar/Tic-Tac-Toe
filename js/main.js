const appState = {
    turn: Player1, //change to player.name
    playerNumber: 2,
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    winner: false,
    winnerName: null,

    // change turn
    changeTurn: () => {
        if (this.turn === Player1) {
            this.turn = Player2;
        } else {
            this.turn = Player1;
        }
    },

    // check for winner

}

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.moves = [];
    }

    // make a move
    makeMove(cell) {
        if (cell.innerHTML === "") {
            this.moves.push(cell);
            cell.innerHTML = this.symbol;
            appState.board[cell.id -1] = this.symbol;
            appState.changeTurn();
        }
    }   
}

// check for winner
const checkWin = (player) => { //expects player object
    const winCond = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
    for (let cond of winCond) {
        if (player.moves.includes(cond[0]) && player.moves.includes(cond[1]) && player.moves.includes(cond[2])) {
            winner = true;
            winnerName = player.name;
        } else if (player1.moves.length + player2.moves.length === 9) {
            winner = true;
            winnerName = "Tie";
        }
    }   
}
// print winner window
const winPrint = () => {
    // print winner
}

// reset game
const resetGame = () => {
    appState.turn = Player1;
    appState.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    appState.winner = false;
    appState.winnerName = null;
}

// event listeners
const cells = document.querySelectorAll(".cell");
const cellsArray = arrayFrom(cells);
cellsArray.map(cell => {
    cell.addEventListener("click", () => {
        if (appState.turn === Player1) {
            Player1.makeMove(cell);
        } else {
            Player2.makeMove(cell);
        }
    })
});
document.getElementById("x-choice").addEventListener("click", () => {
    Player1.symbol = "X";
    Player2.symbol = "O";
});
document.getElementById("o-choice").addEventListener("click", () => {
    Player1.symbol = "O";
    Player2.symbol = "X";
});
document.getElementById("reset").addEventListener("click", () => { //not implemented yet
    resetGame();
});
document.getElementById("start").addEventListener("click", () => {
    play();
});
document.getElementById("1-player-game").addEventListener("click", () => {
    // start 1 player game
});
document.getElementById("2-player-game").addEventListener("click", () => {
    // start 2 player game
});

// creates players and resets game
const start = () => { // review X and O
    const player1 = new Player("Player1", player1-symbol);
    const player2 = new Player("Player2", player2-symbol);
    Player1 = player1;
    Player2 = player2;
}
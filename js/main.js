let pieceSelection 


const appState = {
    turn: null, //change to player.name
    playerNumber: 2, // update when ai is implemented
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    winner: false,
    winnerName: null,

    // change turn
    changeTurn: () => {
        if (appState.turn === player1.name) {
            appState.turn = player2.name;
        } else {
            appState.turn = player1.name;
        }
    },

    // check for winner NO

}

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.moves = [];
    }

    // make a move
    // make a move
    makeMove(cell) {
        if (cell.innerHTML === "") {
            console.log(cell.id.slice(-1)-1);
            this.moves.push(parseInt(cell.id.slice(-1)));
            cell.innerHTML = this.symbol;
            let index = +cell.id.slice(-1) - 1; // Get the last character of the id and convert it to a number
            // console.log(cell.id);
            // console.log(index);
            appState.board[index] = this.symbol; // Use the index to update the appState.board array
            console.log(appState.board);
            checkWin(this);
            appState.changeTurn();
            console.log(this.moves);
            // console.log(appState.turn);
            // console.log(player1.name);
        }
    }  
}

// check for winner
const checkWin = (player) => { //expects player object
    const winCond = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
    for (let cond of winCond) {
        if (player.moves.includes(cond[0]) && player.moves.includes(cond[1]) && player.moves.includes(cond[2])) {
            appState.winner = true; //might be unnecessary
            appState.winnerName = player.name; //might be unnecessary
            console.log(`${player.name} wins!`); //might be unnecessary
            winPrint();
        } else if (player1.moves.length + player2.moves.length === 9) {
            appState.winner = true; //might be unnecessary
            appState.winnerName = "Tie"; //might be unnecessary
            console.log("It's a tie!"); //might be unnecessary
            winPrint();
        }
    }   
}
// print winner window
const winPrint = () => {
    if (appState.winnerName === "Tie") {
        document.getElementById("game-board").classList.add("hidden");
        document.getElementById("game-over-screen").classList.remove("hidden");
        document.getElementById("game-over-message").innerHTML = "It's a tie!";
    } else {
        document.getElementById("game-board").classList.add("hidden");
        document.getElementById("game-over-screen").classList.remove("hidden");
        document.getElementById("game-over-message").innerHTML = `${appState.winnerName} wins!`;
    
    }
}

// reset game
const resetGame = () => { // move to appState
    appState.turn = player1;
    appState.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    appState.winner = false;
    appState.winnerName = null;
    cellsArray.map(cell => {cell.innerHTML = ""}); // clear cells
    console.log(player1.moves);
    console.log(player2.moves);
}

// event listeners
const cells = document.querySelectorAll(".cell");
const cellsArray = Array.from(cells);
cellsArray.map(cell => {
    cell.addEventListener("click", () => {
        if (appState.turn === player1.name) {
            player1.makeMove(cell);
            console.log("player1 turn");
        } else {
            player2.makeMove(cell);
            console.log("player2 turn");
        }
    })
});
document.getElementById("x-choice").addEventListener("click", () => {
    pieceSelection = "X";
    document.getElementById("o-choice").classList.remove("selected");
    document.getElementById("x-choice").classList.add("selected");
});
document.getElementById("o-choice").addEventListener("click", () => {
    pieceSelection = "O";
    document.getElementById("x-choice").classList.remove("selected");
    document.getElementById("o-choice").classList.add("selected");
});
// not implemented yet
// document.getElementById("reset").addEventListener("click", () => { 
//     resetGame();
// });
document.getElementById("1-player-game").addEventListener("click", () => {
    // start 1 player game
});
document.getElementById("2-player-game").addEventListener("click", () => {
    // start 2 player game
});
document.getElementById("start-button").addEventListener("click", () => {
    start();
});
document.getElementById("play-again-button").addEventListener("click", () => {
    document.getElementById("game-over-screen").classList.add("hidden");
    document.getElementById("selection-screen").classList.remove("hidden");
    resetGame();
});

// creates players and resets game
//move to appState
const start = () => { // review X and O to make it more dynamic?
    if (pieceSelection === "X") {
        player1 = new Player("player1", "X");
        player2 = new Player("player2", "O");
    } else {
        player1 = new Player("player1", "O");
        player2 = new Player("player2", "X");
    }
    // const player1 = new Player("player1", player1-symbol);
    // const player2 = new Player("player2", player2-symbol);
    appState.turn = player1.name;
    // play();
    document.getElementById("selection-screen").classList.add("hidden");
    document.getElementById("game-board").classList.remove("hidden");
}


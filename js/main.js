let pieceSelection 

// import {aiMove} from "./ai.js";


const appState = {
    turn: null, //change to player.name
    playerNumber: null, // update when ai is implemented
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    winner: false,
    winnerName: null,
    // ai: false,

    // change turn
    changeTurn: () => {
        if (appState.turn === player1.name) {
            // if (appState.ai === false) {
            //     appState.turn = player2.name;
            // } else {
            //     appState.turn = "AI";
            // }
            appState.turn = player2.name;
            if (appState.playerNumber === 1) {
                player2.makeMove();
            }
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
            // console.log(cell.id.slice(-1)-1);
            this.moves.push(parseInt(cell.id.slice(-1)));
            cell.innerHTML = this.symbol;
            let index = +cell.id.slice(-1) - 1; // Get the last character of the id and convert it to a number
            // console.log(cell.id);
            // console.log(index);
            appState.board[index] = this.symbol; // Use the index to update the appState.board array
            // console.log(appState.board);
            checkWin(this);
            appState.changeTurn();
            // console.log(this.moves);
            // console.log(appState.turn);
            // console.log(player1.name);
        }
    }  
}

// ai class
class Ai{
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.moves = [];
    }

    aiCalcMove = () => {
        // greedy algorithm
        // check if ai can win
        for (let cond of winCond) {
            if (this.moves.includes(cond[0]) && this.moves.includes(cond[1]) && !this.moves.includes(cond[2])) {
                return cond[2];
            } else if (this.moves.includes(cond[0]) && !this.moves.includes(cond[1]) && this.moves.includes(cond[2])) {
                return cond[1];
            } else if (!this.moves.includes(cond[0]) && this.moves.includes(cond[1]) && this.moves.includes(cond[2])) {
                return cond[0];
            }
        }
        // check if player can win
        for (let cond of winCond) {
            if (player1.moves.includes(cond[0]) && player1.moves.includes(cond[1]) && !player1.moves.includes(cond[2])) {
                return cond[2];
            } else if (player1.moves.includes(cond[0]) && !player1.moves.includes(cond[1]) && player1.moves.includes(cond[2])) {
                return cond[1];
            } else if (!player1.moves.includes(cond[0]) && player1.moves.includes(cond[1]) && player1.moves.includes(cond[2])) {
                return cond[0];
            }
        }
        // random move from empty cells in board
        // let emptyCells = [];
        // for (let i = 0; i < appState.board.length; i++) {
        //     console.log("checking");
        //     if (appState.board[i] === "") {
        //         emptyCells.push(i);
        //         console.log(emptyCells);
        //         console.log("hi");
        //     }
        // }
        let emptyCells = [];
        for (let i = 0; i < appState.board.length; i++) {
            for (let j = 0; j < appState.board[i].length; j++) {
                if (appState.board[i][j] === "") {
                    let index = i * appState.board[i].length + j; // convert [i, j] to a single index
                    emptyCells.push(index);
                }
            }
        }

        if (emptyCells.length > 0) { // refactor since there will always be empty cells
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            return emptyCells[randomIndex]; // returns a pair [i, j]
        } 
        console.log("hello?");

        //not what I expected?
        // return emptyCells[Math.floor(Math.random() * emptyCells.length)]; 
    
    }

    makeMove() {
        const move = this.aiCalcMove();
        console.log(move);
        appState.board[move] = this.symbol;
        this.moves.push(move);
        // console.log(cellsArray);
        console.log(cellsArray[move]);
        cellsArray[move].innerHTML = this.symbol;
        checkWin(this);
        appState.changeTurn();
    }

}

const winCond = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
// check for winner  || move to appState?
const checkWin = (player) => { //expects player object
    // const winCond = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
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
// print winner window || move to appState?
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
            // console.log("player1 turn");
        } else {
            player2.makeMove(cell);
            // console.log("player2 turn");
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
    appState.playerNumber = 1;
    document.getElementById("2-player-game").classList.remove("selected");
    document.getElementById("1-player-game").classList.add("selected");
});
document.getElementById("2-player-game").addEventListener("click", () => {
    appState.playerNumber = 2;
    document.getElementById("1-player-game").classList.remove("selected");
    document.getElementById("2-player-game").classList.add("selected");
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
    if (appState.playerNumber === 1) {
        if (pieceSelection === "X") {
            player1 = new Player("player1", "X");
            player2 = new Ai("AI", "O");
        } else {
            player1 = new Player("player1", "O");
            player2 = new Ai("AI", "X");
        }
    } else {
        if (pieceSelection === "X") {
            player1 = new Player("player1", "X");
            player2 = new Player("player2", "O");
        } else {
            player1 = new Player("player1", "O");
            player2 = new Player("player2", "X");
        }        
    }
    
    // const player1 = new Player("player1", player1-symbol);
    // const player2 = new Player("player2", player2-symbol);
    appState.turn = player1.name;
    // play();
    document.getElementById("selection-screen").classList.add("hidden");
    document.getElementById("game-board").classList.remove("hidden");
}


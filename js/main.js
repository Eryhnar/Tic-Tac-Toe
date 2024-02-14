
const appState = {
    pieceSelection: null, // change to player1.symbol
    turn: null, //change to player.name
    playerNumber: null, 

    board: [ "", "", "", "", "", "", "", "", ""],
    
    winner: false,
    winnerName: null,

    difficulty: "medium",

    // change turn
    changeTurn: () => {
        if (appState.turn === player1.name) {
            appState.turn = player2.name;
            if (appState.playerNumber === 1) {
                console.log("ai turn");
                player2.makeMove();
            }
        } else {
            appState.turn = player1.name;
            console.log("player1 turn");
        }
    },
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
            this.moves.push(parseInt(cell.id.slice(-1))-1);
            cell.innerHTML = this.symbol;
            let index = +cell.id.slice(-1) - 1; // Get the last character of the id and convert it to a number
            appState.board[index] = this.symbol; 
            checkWin(this);
            appState.changeTurn();
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

    // check if ai can win
    checkWin() {
        for (let cond of winCond) {
            // console.log(`cond: ${cond}`);
            if (this.moves.includes(cond[0]) && this.moves.includes(cond[1]) && appState.board[cond[2]] === "") {
                // console.log(`winning move: ${cond[2]}`);
                return cond[2];
            } else if (this.moves.includes(cond[0]) && appState.board[cond[1]]=== "" && this.moves.includes(cond[2])) {
                return cond[1];
            } else if (appState.board[cond[0]] === "" && this.moves.includes(cond[1]) && this.moves.includes(cond[2])) {
                return cond[0];
            }
        }
    }

    // check if player can win
    checkBlock() {
        for (let cond of winCond) {
            if (player1.moves.includes(cond[0]) && player1.moves.includes(cond[1]) && appState.board[cond[2]] === "") {
                // console.log(`blocking move: ${cond[2]}`);
                return cond[2];
            } else if (player1.moves.includes(cond[0]) && appState.board[cond[1]]=== "" && player1.moves.includes(cond[2])) {
                return cond[1];
            } else if (appState.board[cond[0]] === "" && player1.moves.includes(cond[1]) && player1.moves.includes(cond[2])) {
                return cond[0];
            }
        }
    }

    //random move
    randomMove() {
        const emptyCells = [];
        for (let i = 0; i < appState.board.length; i++) {
            if (appState.board[i] === "") {
                emptyCells.push(i);
            }
        }
        let temp = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        console.log(`temp: ${temp}`)
        return temp;
    }

    aiCalcMove = () => { 
        
        switch (appState.difficulty) {

            case "easy":
                if (this.checkWin() !== undefined) {
                    return this.checkWin();
                } else if (this.checkBlock() !== undefined) {
                    return this.checkBlock();
                } else {
                    return this.randomMove();
                }
            break;

            case "medium":
                if (this.checkWin() !== undefined) {
                    console.log(`winning move: ${this.checkWin()}`);
                    return this.checkWin();
                } else if (this.checkBlock() !== undefined) {
                    console.log(`blocking move: ${this.checkBlock()}`);
                    return this.checkBlock();
                } else if (player1.moves.length + this.moves.length === 1 && appState.board[4] === "") {
                    return 4;
                } else {
                    return this.randomMove();
                }
            break;

            case "hard":
                
            break;
        }
    

    
        

    }

    makeMove() {
        if (appState.winner === false) {

            const move = this.aiCalcMove();
            console.log(move);
            console.log("ai move ^");
            console.log(`player1 moves: ${player1.moves}`);
            console.log(`player2 moves: ${this.moves}`);
            appState.board[move] = this.symbol;
            console.log(appState.board);
            this.moves.push(move);
            // console.log(cellsArray);
            // console.log(`${cellsArray[move]} cell`);
            cellsArray[move].innerHTML = this.symbol;
            checkWin(this);
            appState.changeTurn();
        }
    }

}
//win conditions array
const winCond = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
//check win function
const checkWin = (player) => { 
    for (let cond of winCond) {
        if (player.moves.includes(cond[0]) && player.moves.includes(cond[1]) && player.moves.includes(cond[2])) {
            appState.winner = true; 
            appState.winnerName = player.name; 
            console.log(`${player.name} wins!`); 
            winPrint();
            return;
        }   
    }  
    if (player1.moves.length + player2.moves.length === 9) {
        appState.winner = true; 
        appState.winnerName = "Tie"; 
        console.log("It's a tie!"); 
        winPrint();
    }
}
//displays winner screen
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
    appState.board = [ "", "", "", "", "", "", "", "", ""];
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
        } else {
            player2.makeMove(cell);
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
const start = () => { 
    if (appState.playerNumber === 1) {
        if (appState.pieceSelection === "X") {
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
    
    appState.turn = player1.name;
    // play();
    document.getElementById("selection-screen").classList.add("hidden");
    document.getElementById("game-board").classList.remove("hidden");
}
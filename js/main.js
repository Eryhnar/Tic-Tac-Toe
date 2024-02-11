const appState = {
    turn: Player1, //change to player.name
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    winner: null,

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
        this.moves.push(cell);
    }   
}

// check for winner

const checkWin = (player) => {
    const winCond = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
    for (let cond of winCond) {
        if (player.moves.includes(cond[0]) && player.moves.includes(cond[1]) && player.moves.includes(cond[2])) {
            return player;
        } else if (player1.moves.length + player2.moves.length === 9) {
            return 'draw';
        }
    }   
}
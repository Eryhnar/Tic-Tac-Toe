
const aiMove = (player2Moves, winCond) => {
    // greedy algorithm
    // check if ai can win
    for (let cond of winCond) {
        if (player2Moves.includes(cond[0]) && player2Moves.includes(cond[1]) && !player2Moves.includes(cond[2])) {
            return cond[2];
        } else if (player2Moves.includes(cond[0]) && !player2Moves.includes(cond[1]) && player2Moves.includes(cond[2])) {
            return cond[1];
        } else if (!player2Moves.includes(cond[0]) && player2Moves.includes(cond[1]) && player2Moves.includes(cond[2])) {
            return cond[0];
        }
    }
    // check if player can win
    for (let cond of winCond) {
        if (player1Moves.includes(cond[0]) && player1Moves.includes(cond[1]) && !player2Moves.includes(cond[2])) {
            return cond[2];
        } else if (player1Moves.includes(cond[0]) && !player2Moves.includes(cond[1]) && player1Moves.includes(cond[2])) {
            return cond[1];
        } else if (!player1Moves.includes(cond[0]) && player1Moves.includes(cond[1]) && player1Moves.includes(cond[2])) {
            return cond[0];
        }
    }
    // random move from empty cells in board
    let emptyCells = [];
    for (let i = 0; i < appState.board.length; i++) {
        if (appState.board[i] === "") {
            emptyCells.push(i);
        }
    }
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];

}

// [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]]


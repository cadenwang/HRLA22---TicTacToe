const prompt = require('prompt')

let board = [' ', ' ', ' ', ' ', ' ', ' ' ,' ', ' ', ' ']

const possibleWins = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

let totalNumberOfMoves = 0;

let displayBoard = () => {
  console.log(`\n
  ${board[1]} | ${board[2]} | ${board[3]}\n
  ${board[4]} | ${board[5]} | ${board[6]}\n
  ${board[7]} | ${board[8]} | ${board[9]}\n
  `)
}

let markBoard = (position, player) => {
  board[position] = player.toUpperCase();
}

let isValidMove = (position) => {
  if (board[position] === ' ') {
    return true;
  }
  return false;
}

let checkVictory = (player) => {
  if (totalNumberOfMoves < 5) {
    return;
  }
  for (let i = 0; i < possibleWins.length; i++) {
    let count = 0;
    for (let j = 0; j < possibleWins[i].length; j++) {
      if (board[winCombinations[i][j] === player]) {
        count++;
      }
      if (count === 3) {
        return true;
      }
    }
  }
  return false;
}

let playersTurn = (player) => {
  console.log(`Turn: Player ${player}`);
  prompt.start();
  prompt.get(['position'], (err, result) => {
    if (isValidMove(result.position) === true) {
      markBoard(result.position, player);
      displayBoard();
      if (checkVictory(player) === true) {
        console.log(`Player ${player} won!`);
        resetBoard();
      }
      return (player === 'X') ? playersTurn('O') : playersTurn('X');
    } else {
      console.log('Not a valid move. Please try again.');
      playersTurn(player);
    }
  });
}

let resetBoard = () => {
  board = [' ', ' ', ' ', ' ', ' ', ' ' ,' ', ' ', ' '];
  console.log(`New Game:\n`);
  displayBoard();
}

playersTurn('O');

const prompt = require('prompt')

let board = [' ', ' ', ' ', ' ', ' ', ' ' ,' ', ' ', ' ']

const possibleWins = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

let totalNumberOfMoves = 0;

let displayBoard = () => {
  console.log(
  `\nSelect a position from 1 - 9:\n
    ${board[0]}  |  ${board[1]}  |  ${board[2]}\n
  -----|-----|-----\n
    ${board[3]}  |  ${board[4]}  |  ${board[5]}\n
  -----|-----|-----\n
    ${board[6]}  |  ${board[7]}  |  ${board[8]}\n
  `)
}

let markBoard = (position, player) => {
  board[position] = player.toUpperCase();
  totalNumberOfMoves++;
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
      if (board[possibleWins[i][j] === player]) {
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
  if (totalNumberOfMoves === 9) {
    isTie();
    return;
  }
  prompt.start();
  prompt.get(['position'], (err, result) => {
    if (isValidMove(result.position - 1) === true) {
      markBoard(result.position - 1, player);
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

let isTie = () => {
  console.log('NO ONE WINS LOL.  Play Again? (y/n)');
  prompt.get(['boolean'], (err, result) => {
    if (result.boolean === 'y') {
      totalNumberOfMoves = 0;
      gameStart();
      resetBoard();
    }
    if (result.boolean === 'n') {
      console.log('Thank you for playing!')
    }
  })
}

let resetBoard = () => {
  board = [' ', ' ', ' ', ' ', ' ', ' ' ,' ', ' ', ' '];
  console.log(`New Game:\n`);
  gameStart();
  playersTurn('O');
}

let gameStart = () => {
  console.log(`\nWelcome to TicTacToe!\n\nSelect a position from 1 - 9\n
    1  |  2  |  3\n
  -----|-----|-----\n
    4  |  5  |  6\n
  -----|-----|-----\n
    7  |  8  |  9\n
  `)
}
gameStart();
playersTurn('X');

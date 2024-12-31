$(document).ready(function() {
  $('#navbar').load('navbar.html');
  $('#footer').load('footer.html');

  const gameBoard = $('#game-board');
  const resetButton = $('#reset');
  const statusDisplay = $('#status');
  let currentPlayer = 'X';
  let board = ['', '', '', '', '', '', '', '', ''];

  function renderBoard() {
    gameBoard.empty();
    board.forEach((cell, index) => {
      gameBoard.append(`<div class="cell w-16 h-16 flex items-center justify-center border border-gray-300 cursor-pointer text-3xl" data-index="${index}">${cell}</div>`);
    });
    statusDisplay.text(`Player ${currentPlayer}'s turn`);
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.includes('') ? null : 'Tie';
  }

  function handleClick(event) {
    const index = $(event.target).data('index');
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    renderBoard();

    const winner = checkWinner();
    if (winner) {
      statusDisplay.text(winner === 'Tie' ? 'It\'s a tie!' : `${winner} wins!`);
    }
  }

  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    renderBoard();
  }

  gameBoard.on('click', '.cell', handleClick);
  resetButton.on('click', resetGame);

  renderBoard();
});
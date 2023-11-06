const boardContainer = document.querySelector('.board-container');
const messageContainer = document.querySelector('.message-container');
const saveGameBtn = document.querySelector('.save-game-btn');
const newGameBtns = document.querySelectorAll('.new-game-btn');
const popup = document.querySelector('.popup');
const popupMessage = document.querySelector('.popup-message');
const newGameBtnPopup = document.querySelector('.popup .new-game-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

// отрисовка поля
const renderBoard = () => {
  boardContainer.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => makeMove(index));
    boardContainer.appendChild(cellElement);
  });
};

// ф-ция хода
const makeMove = (index) => {
  if (!board[index]) {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    renderBoard();
    checkWin();
  }
};

const showMessage = (text) => {
  messageContainer.textContent = text;
};

const hideMessage = () => {
  messageContainer.textContent = '';
};

const showPopup = (message) => {
  popupMessage.textContent = message;
  popup.style.display = 'flex';
};

const hidePopup = () => {
  popup.style.display = 'none';
};
// сохранение игры в localStorage
const saveGame = () => {
  console.log('Сохранили');
  localStorage.setItem('ticTacToeGame', JSON.stringify(board));
  showMessage('Game saved!');
};

// ф-ция загрузки игры из localStorage
const loadGame = () => {
  const savedGame = localStorage.getItem('ticTacToeGame');
  if (savedGame) {
    hidePopup();
    board = JSON.parse(savedGame);
    renderBoard();
    hideMessage();
  } else {
    showPopup('Start a new game!');
    renderBoard();
  }
};

// загрузка игры из localStorage
loadGame();

const newGame = () => {
  hidePopup();
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  renderBoard();
  hideMessage();
};

const cells = document.querySelectorAll('.cell');

// ф-ция для проверки наличия выигрышной комбинации
const checkWin = () => {
  const winningCombos = [
    // Горизонтальные комбинации
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Вертикальные комбинации
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Диагональные комбинации
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinningCombo(combo);
      showMessage(`The player ${board[a]} - won!`);
    }
  }
  // проверка на ничью
  if (!board.includes('')) {
    showMessage('Draw!!');
    clearWinningCombo();
  }
};

// ф-ция для выделения выигрышной комбинации
const highlightWinningCombo = (combo) => {
  console.log('Выигрышная комбинация:', combo);
  combo.forEach((index) => {
    console.log(index);
    console.log(cells[index]);
    cells[index].classList.add('winning');
  });
};

// ф-ция для очистки выигрышной комбинации
const clearWinningCombo = () => {
  cells.forEach((cell) => {
    cell.classList.remove('winning');
  });
};

newGameBtns.forEach((btn) => {
  btn.addEventListener('click', newGame);
});
newGameBtnPopup.addEventListener('click', newGame);
saveGameBtn.addEventListener('click', saveGame);

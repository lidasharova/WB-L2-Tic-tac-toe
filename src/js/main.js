const boardContainer = document.querySelector('.board-container');
const messageContainer = document.querySelector('.message-container');
const saveGameBtn = document.querySelector('.save-game-btn');
const newGameBtns = document.querySelectorAll('.new-game-btn');
const popup = document.querySelector('.popup');
const popupMessage = document.querySelector('.popup-message');
const newGameBtnPopup = document.querySelector('.popup .new-game-btn');

let cells = [];
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameFinished = false;

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

// создание конфети и анимация после выигрыша
const createConfetti = () => {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * 100 + '%';
  confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
  confetti.style.opacity = Math.random();
  document.body.appendChild(confetti);
  setTimeout(() => {
    document.body.removeChild(confetti);
  }, 2000);
};
const playWinAnimation = () => {
  for (let i = 0; i < 60; i++) {
    setTimeout(createConfetti, i * 60);
  }
};

// ф-ция загрузки игры из localStorage
const loadGame = () => {
  const savedGame = localStorage.getItem('ticTacToeGame');
  if (savedGame) {
    hidePopup();
    board = JSON.parse(savedGame);
    renderBoard();
    checkWin();
  } else {
    showPopup('Start a new game!');
    renderBoard();
  }
};

// загрузка игры из localStorage
loadGame();

// сохранение игры в localStorage
const saveGame = () => {
  localStorage.setItem('ticTacToeGame', JSON.stringify(board));
  showMessage('Game saved!');
};

// ф-ции для выделения/очистки выигрышной комбинации
function highlightWinningCombo(combo) {
  cells = document.querySelectorAll('.cell');
  combo.forEach((index) => {
    cells[index].classList.add('winning');
  });
}

function clearWinningCombo() {
  cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.classList.remove('winning');
  });
}

// ф-ция для проверки наличия выигрышной комбинации
function checkWin() {
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
      playWinAnimation();
      gameFinished = true;
    }
  }
  // проверка на ничью
  if (!board.includes('')) {
    showMessage('Draw!!');
    clearWinningCombo();
    playWinAnimation();
    gameFinished = true;
  }
}

function makeMove(index) {
  if (gameFinished) return;
  if (!board[index]) {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    renderBoard();
    checkWin();
  }
}

const newGame = () => {
  hidePopup();
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  renderBoard();
  hideMessage();
  gameFinished = false;
};

newGameBtns.forEach((btn) => {
  btn.addEventListener('click', newGame);
});
newGameBtnPopup.addEventListener('click', newGame);
saveGameBtn.addEventListener('click', saveGame);

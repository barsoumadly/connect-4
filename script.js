'use strict';

// selecting elements
const columnsEL = document.querySelectorAll('.column');
const playerTurn = document.querySelector('.turn');

// selecting modal components
const overlayEl = document.querySelector('.overlay');
const winnerEl = document.querySelector('.winner');
const btnClose = document.querySelector('.close-modal');

// defining colors
const redPlayerColor = '#eb3b5a';
const yellowPlayerColor = '#f7b731';

// declaring main variables
let activePlayer = 1;
let activePlayerName = "Red's";
let playing = true;

const checkEmptyRow = function (rows) {
  for (let i = 0; i < rows.length; i++) {
    const row = document.getElementById(rows[i].getAttribute('id'));
    if (!row.classList.contains('checked')) {
      return row;
    }
  }
};

const changeHoverColor = function (color) {
  for (let i = 0; i < columnsEL.length; i++) {
    columnsEL.forEach(column =>
      column.style.setProperty('--active-player-color', color)
    );
  }
  playerTurn.textContent = activePlayerName;
  playerTurn.style.color = color;
};

const changeActivePlayer = function () {
  // checkWinner
  checkWinner();

  activePlayer = activePlayer === 1 ? 2 : 1;
  activePlayerName = activePlayerName === "Red's" ? "Yellow's" : "Red's";
  if (activePlayer === 1) {
    changeHoverColor(redPlayerColor);
  } else {
    changeHoverColor(yellowPlayerColor);
  }
};

for (let i = 0; i < columnsEL.length; i++) {
  columnsEL[i].addEventListener('click', function () {
    // getting rows of the column
    const rows = Array.from(columnsEL[i].children);
    rows.reverse();
    const row = checkEmptyRow(rows);
    row.classList.add('checked');

    if (playing) {
      // checking player turn
      if (activePlayer === 1) {
        row.style.backgroundColor = redPlayerColor;
      } else {
        row.style.backgroundColor = yellowPlayerColor;
      }
      changeActivePlayer();
    }
  });
}

const checkWinner = function () {
  // check horziontally
  for (let row = 1; row <= 6; row++) {
    for (let column = 1; column <= 4; column++) {
      const column1 = document.getElementById(`c${column}r${row}`);
      const column2 = document.getElementById(`c${column + 1}r${row}`);
      const column3 = document.getElementById(`c${column + 2}r${row}`);
      const column4 = document.getElementById(`c${column + 3}r${row}`);
      if (
        column1.style.backgroundColor === column2.style.backgroundColor &&
        column2.style.backgroundColor === column3.style.backgroundColor &&
        column3.style.backgroundColor === column4.style.backgroundColor &&
        column1.classList.contains('checked') &&
        column2.classList.contains('checked') &&
        column3.classList.contains('checked') &&
        column4.classList.contains('checked')
      ) {
        playing = false;
        setWinner(column1.style.backgroundColor);
        break;
      }
    }
  }
};

const setWinner = function (color) {
  overlayEl.classList.remove('hidden');
  if (color === `rgb(235, 59, 90)`) {
    winnerEl.innerHTML = `Red player <span>wins</span>`;
    winnerEl.style.setProperty('--active-player-color', redPlayerColor);
  } else {
    winnerEl.innerHTML = `Yellow player <span>wins</span>`;
    winnerEl.style.setProperty('--active-player-color', yellowPlayerColor);
  }
};

const resetGame = function () {
  for (let row = 1; row <= 6; row++) {
    for (let column = 1; column <= 7; column++) {
      const columnEl = document.getElementById(`c${column}r${row}`);
      columnEl.style.backgroundColor = '#ffff';
    }
  }
};

btnClose.addEventListener('click', function () {
  overlayEl.classList.add('hidden');
  resetGame();
  playing = true;
});

'use strict';

// selecting elements
const columnsEL = document.querySelectorAll('.column');
const playerTurn = document.querySelector('.turn');

// defining colors
const redPlayerColor = '#eb3b5a';
const yellowPlayerColor = '#f7b731';

// declaring main variables
let activePlayer = 1;
let activePlayerName = "Red's";

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

    // checking player turn
    if (activePlayer === 1) {
      row.style.backgroundColor = redPlayerColor;
    } else {
      row.style.backgroundColor = yellowPlayerColor;
    }
    changeActivePlayer();
  });
}

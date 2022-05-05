function buildBoard() {
  gGame.foodCounter = 0
  let SIZE = 10;
  let board = [];
  for (let i = 0; i < SIZE; i++) {
    board.push([]);
    for (let j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;

      }
      // if the location is the pacman location
      else if (i === 6 && j === 6) continue

      else {
        gGame.foodCounter++
        board[i][j] = FOOD
      }

    }
  }
  board[1][1] = POWER_FOOD;
  board[8][1] = POWER_FOOD;
  board[1][8] = POWER_FOOD;
  board[8][8] = POWER_FOOD;
  gGame.foodCounter -= 4;

  return board;
}




function printMat(mat, selector) {
  let strHTML = '<table border="0"><tbody>';
  for (let i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (let j = 0; j < mat[0].length; j++) {
      let cell = mat[i][j];
      let className = `cell cell-${i}-${j}`;
      strHTML += `<td class="${className}" style="font-size: 1.5rem;">${cell} </td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  let elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  let elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return randomColor

}

function getEmptyPos() {
  let res = [];
  // let resCherrys = [];
  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === EMPTY) {
        res.push({ i: i, j: j });
      }
      if (gBoard[i][j] === SUPER_FOOD) {
        return;
      }

    }
  }


  if (res.length) {
    return res[getRandomIntInclusive(0, res.length - 1)];
  } else {
    return null;
  }
}

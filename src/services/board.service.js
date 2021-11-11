
export const boardService = {
    getPossibleCells,
    buildBoard,
    moveChecker,
    isGameOver
}

let gCounterBlack;
let gCounterWhite;

// Build board and checkers 
// Return matrix
// Complexity: O(n^2) 
function isGameOver() {
    if (gCounterBlack === 0) {
        return 'Black Player Lost';
    }
    else if (gCounterWhite === 0) {
        return 'White Player Lost';
    }
    return ''
}

// Build board and checkers 
// Return matrix
// Complexity: O(n^2) 
function buildBoard(size) {
    var board = [];
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            if ((i + j) % 2 === 0) {
                board[i][j] = { value: null, isSelected: false, row: i, col: j };
            } else if (i <= 2 && i >= 0) {
                board[i][j] = { value: 'B', isSelected: false, row: i, col: j };
            } else if (i >= 5 && i <= 7) {
                board[i][j] = { value: 'W', isSelected: false, row: i, col: j };
            } else {
                board[i][j] = { value: 'X', isSelected: false, row: i, col: j };
            }

        }
    }
    gCounterBlack = 12
    gCounterWhite = 12
    return board;
}

// Get possible cells for each type of checker (W, B) 
// Return an array of objects with the coordinates of the possible cells
// Complexity: O(n^2) 
function getPossibleCells(cellI, cellJ, mat, type) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat[0].length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (mat[i][j].value !== null) {

                if (type === 'W' && cellI >= i) {
                    if (mat[i][j].value === 'X') {
                        mat[i][j].isSelected = true;
                    }
                    //eat black checker
                    else {
                        //Right
                        if ((i - 1 >= 0 && j + 1 < mat[i].length) && isDiagonal({ row: cellI, col: cellJ }, { row: i - 1, col: j + 1 }) && mat[i][j].value === 'B' && mat[i - 1][j + 1].value === 'X') {
                            mat[i - 1][j + 1].isSelected = true;
                        }
                        //Left
                        else if ((i - 1 >= 0 && j - 1 >= 0) && isDiagonal({ row: cellI, col: cellJ }, { row: i - 1, col: j - 1 }) && mat[i][j].value === 'B' && mat[i - 1][j - 1].value === 'X') {
                            mat[i - 1][j - 1].isSelected = true;
                        }
                    }
                }

                else if (type === 'B' && cellI < i) {
                    if (mat[i][j].value === 'X') {
                        mat[i][j].isSelected = true;
                    }
                    //eat white checker
                    else {
                        //Right
                        if ((i + 1 < mat[i].length && j - 1 >= 0) && isDiagonal({ row: cellI, col: cellJ }, { row: i + 1, col: j - 1 }) && mat[i][j].value === 'W' && mat[i + 1][j - 1].value === 'X') {
                            mat[i + 1][j - 1].isSelected = true;
                        }
                        //Left
                        else if ((i + 1 < mat[i].length && j + 1 < mat[i].length) && isDiagonal({ row: cellI, col: cellJ }, { row: i + 1, col: j + 1 }) && mat[i][j].value === 'W' && mat[i + 1][j + 1].value === 'X') {
                            mat[i + 1][j + 1].isSelected = true;
                        }
                    }
                }
            }
        }
    }
    const deepCopyMatrix = JSON.parse(JSON.stringify(mat))
    return deepCopyMatrix;
}

// Move checker to coordinate that user selected from possible cells 
// Return a new matrix with the new checker position
// Complexity: O(1) 
function moveChecker(board, fromCell, toCell, player) {
    if (fromCell.col - toCell.col === 2) {
        if (player === 'W') {
            board[fromCell.row - 1][toCell.col + 1].value = 'X'
            gCounterBlack--
            console.log('%c  gCounterBlack:', 'color: #00000;background: #aaefe5;', gCounterBlack);
        }
        else {
            board[fromCell.row + 1][toCell.col + 1].value = 'X'
            gCounterWhite--
            console.log('%c  gCounterWhite:', 'color: #00000;background: #aaefe5;', gCounterWhite);
        }

    }
    else if (fromCell.col - toCell.col === -2) {
        if (player === 'W') {
            board[fromCell.row - 1][toCell.col - 1].value = 'X'
            gCounterBlack -= 1
            console.log('%c  gCounterBlack:', 'color: #00000;background: #aaefe5;', gCounterBlack);
        }
        else {
            board[fromCell.row + 1][toCell.col - 1].value = 'X'
            gCounterWhite -= 1
            console.log('%c  gCounterWhite:', 'color: #00000;background: #aaefe5;', gCounterWhite);
        }
    }
    // swap
    const tempValue = board[toCell.row][toCell.col].value
    board[toCell.row][toCell.col].value = board[fromCell.row][fromCell.col].value;
    board[fromCell.row][fromCell.col].value = tempValue;
    const deepCopyMatrix = JSON.parse(JSON.stringify(board));
    return deepCopyMatrix;
}

// Check if two coordinates are in the same diagonal
// Complexity: O(1) 
function isDiagonal(cord1, cord2) {
    return Math.abs(cord1.row - cord2.row) === Math.abs(cord1.col - cord2.col)
}


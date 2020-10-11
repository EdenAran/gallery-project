'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '🧬';
const CHERRY = '🍒';

var gBoard;
var gFoodCount;
var gIntervalCherry;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    gFoodCount = 0;
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gIntervalCherry = setInterval(addCherry, 15000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gFoodCount--;
                continue;
            }
            if ((i === 1 && (j === 1 || j === SIZE - 2)) ||
                (i === SIZE - 2 && (j === 1 || j === SIZE - 2))) {
                board[i][j] = POWER_FOOD;
                gFoodCount--;
                continue;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    gGame.isOn = false;
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'inline';
    console.log('Game Over');
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
}

function checkWin() {
    return gFoodCount === 1;
}

function handleWin() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'inline';
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
}

function restartGame() {
    closeModal();
    gGame = {
        score: 0,
        isOn: false
    }
    gGhosts = [];
    updateScore(0);
    init();
}

function addCherry() {
    var emptyCells = getEmptyCells(gBoard);
    console.log('CHERY')
    if (emptyCells.length === 0) return;
    var rndIdx = getRandomIntInclusive(0, emptyCells.length - 1);
    var currCell = emptyCells[rndIdx];
    gBoard[currCell.i][currCell.j] = CHERRY;
    renderCell(currCell, CHERRY);
}


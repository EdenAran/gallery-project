'use strict';

const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const PASSAGE = 'PASSAGE';
const GLUE = 'GLUE';

const GAMER_IMG = '<img src="img/gamer.png"/>';
const BALL_IMG = '<img src="img/ball.png"/>';
const GLUE_IMG = '<img src="img/glue.png"/>';

var gGamerPos;
var gBoard;
var gBallInterval;
var gCollectedBallsCount;
var gSpawnedBallsCount;
var gGlueInterval;
var gScoreAudio = new Audio('sfx/score.mp3');
var gPassages = [];
var gIsStuck = false;


function initGame() {
	if (gBallInterval) clearInterval(gBallInterval);
	if (gGlueInterval) clearInterval(gGlueInterval);
	gIsStuck = false;
	gGamerPos = { i: 1, j: 1 }
	gBoard = buildBoard();
	gCollectedBallsCount = 0;
	gSpawnedBallsCount = 0;
	addPassage();
	renderBoard(gBoard);
	addBall()
	addBall()
	addBall()
	gBallInterval = setInterval(addBall, 1500);
	gGlueInterval = setInterval(addGlue, 5000);
}

function buildBoard() {
	var board = [];
	for (var i = 0; i < 10; i++) {
		board[i] = [];
		for (var j = 0; j < 12; j++) {
			board[i][j] = {
				gameElement: null
			};
			if (i === 0 || i === 9 || j === 0 || j === 11) {
				board[i][j].type = WALL;
			} else {
				board[i][j].type = FLOOR;
			}
		}
	}
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	return board;
}

// Render the board to an HTML table
function renderBoard(board) {
	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];
			var cellClass = getClassName({ i: i, j: j })
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';
			else if (currCell.type === PASSAGE) cellClass += ' passage';
			// strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';
			strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i}, ${j})" >\n`;
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}
			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	elBoard.innerHTML = strHTML;
}

function moveTo(i, j) {
	if (gIsStuck) return;

	// check if moving through passage

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;
	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);
	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
		if (targetCell.gameElement === BALL) {
			updateScore();
			if (checkWin()) handleWin();
		} else if (targetCell.gameElement === GLUE) {
			new Audio('sfx/stuck.mp3').play();
			gIsStuck = true;
			setTimeout(function () {
				gIsStuck = false;
			}, 3000);
		}
		// Update MODEL
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Update DOM
		renderCell(gGamerPos, '');
		// Update MODEL
		gGamerPos = { i: i, j: j };
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// Update DOM
		renderCell(gGamerPos, GAMER_IMG);
		if (targetCell.type === PASSAGE) passageToNextLocation(i, j);
	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);
}

function passageToNextLocation(i, j) {
	// var passageAudio = new Audio('sfx/teleport.mp3');
	console.log(i, j)
	var nextCell = {};
	if (i === 0) nextCell = gPassages[1];
	else if (i === 9) nextCell = gPassages[0];
	else if (j === 0) nextCell = gPassages[3];
	else nextCell = gPassages[2];
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
	// Update DOM
	renderCell(gGamerPos, '');
	// Update MODEL
	gGamerPos = { i: nextCell.i, j: nextCell.j };
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	// Update DOM
	renderCell(gGamerPos, GAMER_IMG);
	new Audio('sfx/teleport.mp3').play();
}

function addBall() {
	var iIdx = getRandIntInc(1, 6);
	var jIdx = getRandIntInc(1, 6);
	if (!gBoard[iIdx][jIdx].gameElement) return;
	var location = { i: iIdx, j: jIdx };
	gBoard[location.i][location.j].gameElement = BALL;
	renderCell(location, BALL_IMG);
	gSpawnedBallsCount++;
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

function addPassage() {
	var idxUp = getRandIntInc(1, 10);
	gBoard[0][idxUp].type = PASSAGE;
	gPassages.push({ i: 0, j: idxUp });

	var idxDown = getRandIntInc(1, 10);
	gBoard[9][idxDown].type = PASSAGE;
	gPassages.push({ i: 9, j: idxDown });
	
	var idxLeft = getRandIntInc(1, 8);
	gBoard[idxLeft][0].type = PASSAGE;
	gPassages.push({ i: idxLeft, j: 0 });
	
	var idxRight = getRandIntInc(1, 8);
	gBoard[idxRight][11].type = PASSAGE;
	gPassages.push({ i: idxRight, j: 11 });
}

function updateScore() {
	var elScore = document.querySelector('.score span');
	gCollectedBallsCount++;
	gScoreAudio.play();
	elScore.innerText = gCollectedBallsCount;
}

function checkWin() {
	console.log(gSpawnedBallsCount, gCollectedBallsCount)
	return gCollectedBallsCount === gSpawnedBallsCount;
}

function handleWin() {
	clearInterval(gBallInterval);
	clearInterval(gGlueInterval);
	var elReset = document.querySelector('.reset');
	elReset.style.display = 'block';
	gIsStuck = true;
	openModal();
}

function addBall() {
	var iIdx = getRandIntInc(1, 6);
	var jIdx = getRandIntInc(1, 6);
	if (!gBoard[iIdx][jIdx].gameElement) return;
	var location = { i: iIdx, j: jIdx };
	gBoard[iIdx][jIdx].gameElement = BALL;
	renderCell(location, BALL_IMG);
	gSpawnedBallsCount++;
}

function addGlue() {
	var iIdx = getRandIntInc(1, 8);
	var jIdx = getRandIntInc(1, 10);
	if (!gBoard[iIdx][jIdx].gameElement) return;
	var location = { i: iIdx, j: jIdx };
	gBoard[iIdx][jIdx].gameElement = GLUE;
	renderCell(location, GLUE_IMG);
	setTimeout(function () {
		if (!gIsStuck) {
			gBoard[iIdx][jIdx].gameElement = null;
			renderCell(location, '')
		};
	}, 3000);
}

// Move the player by keyboard arrows
function handleKey(ev) {
	var i = gGamerPos.i;
	var j = gGamerPos.j;
	switch (ev.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function resetGame(){
	var elReset = document.querySelector('.reset');
	var elScore = document.querySelector('.score span');
	elReset.style.display = 'none';
	elScore.innerText = 0;
	closeModal();
	initGame();
}

function openModal(){
	var elModal = document.querySelector('.modal');
	elModal.style.display = 'block';
}
function closeModal(){
	var elModal = document.querySelector('.modal');
	elModal.style.display = 'none';
}
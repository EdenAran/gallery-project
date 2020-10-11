'use strict'
const GHOST = 'src="img/ghost';

var gGhosts = []
var gDeletedGhosts = [];
var gIntervalGhosts;
var gNextId = 101;

function createGhost(board, colors, locations) {
    var colorIdx = getRandomIntInclusive(0, colors.length - 1);
    var ghost = {
        location: {
            i: 2,
            j: locations[0]
        },
        currCellContent: FOOD,
        color: colors[colorIdx],
        id: gNextId++
    }
    locations.shift();
    colors.splice(colorIdx, 1);
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost);
}

function createGhosts(board) {
    var colors = ['Red', 'Blue', 'Green', 'Orange', 'Pink', 'Purple', 'Yellow'];
    var locations = [4, 5, 6];
    createGhost(board, colors, locations);
    createGhost(board, colors, locations);
    createGhost(board, colors, locations);
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell.includes(GHOST)) return;
    if (nextCell === gPacmanSide) {
        gameOver();
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = getGhostHTML(ghost);
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostById(id) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (ghost.id === id) return ghost;
    }
}

function getGhostHTML(ghost) {
    var color = (gPacman.isSuper) ? 'Afraid' : ghost.color;
    var strHTML = `<img ${GHOST}${color}.png" width="80%"/>`;
    return `<span id="${ghost.id}">${strHTML}</span>`
}
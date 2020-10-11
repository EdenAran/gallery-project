'use strict'
const DEAD = '💀';

var gPacmanSide = `<img id="pacman" width="80%" src="img/pacmanRight.png" />`;
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = gPacmanSide
}

function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === POWER_FOOD) {
        if (!gPacman.isSuper) {
            gPacman.isSuper = true;
            for (var i = 0; i < gGhosts.length; i++) {
                renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
            }
            setTimeout(function () {
                gPacman.isSuper = false;
                gGhosts = gGhosts.concat(gDeletedGhosts);
                gDeletedGhosts = [];
            }, 5000)
        }
    } else if (nextCell === FOOD) {
        updateScore(1);
        gFoodCount--;
        if (checkWin()) handleWin();
    }
    else if (nextCell.includes(GHOST)) {
        if (!gPacman.isSuper) {
            gameOver();
            renderCell(gPacman.location, DEAD)
            return;
        } else {
            var ghostId = nextCell.substring(10, 13);
            var currGhost = getGhostById(+ghostId);
            gDeletedGhosts.push(currGhost);
            gGhosts.splice(gGhosts.indexOf(currGhost), 1);
        }
    } else if (nextCell === CHERRY) updateScore(10);

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = gPacmanSide;
    // update the dom
    renderCell(gPacman.location, gPacmanSide);
}


function getNextLocation(eventKeyboard) {
    var strIMG = `<img width="80%" src="img/pacman`;
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            strIMG += 'Up.png"/>'
            gPacmanSide = strIMG;
            gPacman
            nextLocation.i--;
            break;
        case 'ArrowDown':
            strIMG += 'Down.png"/>'
            gPacmanSide = strIMG;
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            strIMG += 'Left.png"/>'
            gPacmanSide = strIMG;
            nextLocation.j--;
            break;
        case 'ArrowRight':
            strIMG += 'Right.png"/>'
            gPacmanSide = strIMG;
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}
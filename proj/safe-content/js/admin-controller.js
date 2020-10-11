'use strict';

function renderTable() {
    checkIfAdmin();
    var strHTML = `<table><thead><tr><th>Userame</td><th>Password</td><th>Last Login</td><th>Admin?</td></tr></thead><tbody>`;
    var users = getUsersForDisplay();
    for (var i = 0; i < users.length; i++) {
        strHTML += `<tr>
        <td>${users[i].userName}</td>
        <td>${users[i].password}</td>
        <td>${users[i].lastLoginTime}</td>
        <td>${users[i].isAdmin}</td> </tr>`
    }
    strHTML += `</tbody></table>`;
    document.querySelector('.users').innerHTML = strHTML;
}

function onSetSort(sortByStr) {
    sortBy(sortByStr);
    var display = getDisplayType();
    if (display === 'TABLE') renderTable();
    if (display === 'CARDS') renderCards();
}

function renderCards() {
    var strHTML = '<div class="cards">';
    var users = getUsersForDisplay();
    for (var i = 0; i < users.length; i++) {
        strHTML += `<div class="card user${i}">
        <div class="card-username">Username: <span>${users[i].userName}</span></div>
        <div class="card-password">Password: <span>${users[i].password}</span></div>
        <div class="card-login">Last login: <span>${users[i].lastLoginTime}</span></div>
        <div class="card-admin">Admin?: <span>${users[i].isAdmin}</span></div>
        </div>
        `
    }
    strHTML += '</div>';
    document.querySelector('.users').innerHTML = strHTML;
    highlightActiveDisplay(false);
}

function toggleClass(el, toggleClass) {
    document.querySelector(`.${el}`).classList.toggle(`${toggleClass}`);
}

function highlightActiveDisplay(display) {
    var elTable = document.querySelector('.display-table');
    var elCards = document.querySelector('.display-cards');
    if (display === 'TABLE') {
        elTable.innerHTML = `<img src="img/table-on.png">`
        elCards.innerHTML = `<img src="img/cards-off.png">`
    } else {
        elTable.innerHTML = `<img src="img/table-off.png">`
        elCards.innerHTML = `<img src="img/cards-on.png">`
    }
}

function onDisplay(display) {
    setDisplayType(display);
    if (display === 'TABLE') renderTable();
    if (display === 'CARDS') renderCards();
    highlightActiveDisplay(display);
}

function onLogoutPress() {
    removeFromStorage('loggedUser');
    window.location.assign('index.html');
}
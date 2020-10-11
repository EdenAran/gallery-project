'use strict';


function init(){
    generateUsers();
    var user = loadFromStorage('loggedUser')
    if (!user) return;
    login(user);
}

function onLoginPress() {
    var username = document.querySelector('.username').value;
    var password = document.querySelector('.password').value;
    var user = getUser(username);
    if (!user || !checkPassword(user, password)) return;
    login(user);
}

function onLogoutPress() {
    logout();
}

function toggleClass(el, toggleClass){
    document.querySelector(`.${el}`).classList.toggle(`${toggleClass}`);
}

function updateHeader(user){
    document.querySelector('.header span').innerText = user.userName
}
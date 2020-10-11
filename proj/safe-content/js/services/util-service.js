'use strict';

function toggleLoginLogout(){
    toggleClass('login', 'hide');
    toggleClass('main-container', 'hide');
}

function getTime(){
    var date = new Date();
    return date.toUTCString();
}
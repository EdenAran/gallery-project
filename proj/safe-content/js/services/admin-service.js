'use strict';

var gSortBy = 'NAME';
var gDisplay = 'TABLE';

function getUsersForDisplay(){
    var users = loadFromStorage('users');
    sortUsers(users);
    return users;
}

function sortBy(sortBy){
    gSortBy = sortBy;
}

function sortUsers(users){
    var sortBy = (gSortBy === 'NAME') ? 'userName' : 'lastLoginTime';
    users.sort(function(user1, user2){
        if (user1[sortBy] > user2[sortBy]) return 1;
        if (user1[sortBy] < user2[sortBy]) return -1;    
    })
}

function checkIfAdmin(){
    var user = loadFromStorage('loggedUser');
    if (!user.isAdmin) window.location.assign('index.html');
}

function getDisplayType(){
    return gDisplay;
}

function setDisplayType(display){
    gDisplay = display;
}
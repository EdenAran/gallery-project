'use strict';

var gUsers;

function getUser(username) {
    return gUsers.find((user) => user.userName === username);
}

function checkPassword(user, password) {
    return user.password === password;
}

function logout() {
    toggleLoginLogout();
    if (getLoggedUser().isAdmin) toggleClass('admin-link', 'hide');
    removeFromStorage('loggedUser');
}

function login(user) {
    user.lastLoginTime = getTime();
    updateHeader(user);
    toggleLoginLogout();
    if (user.isAdmin) toggleClass('admin-link', 'hide');
    saveToStorage('loggedUser', user);
    saveToStorage('users', gUsers);
}

function getLoggedUser() {
    return loadFromStorage('loggedUser');
}

function generateUsers(){
    gUsers = _createUsers();
    saveToStorage('users', gUsers);
}

function _createUsers() {
    var users = [
        { id: 'u101', userName: 'Admin', password: '123', lastLoginTime: '', isAdmin: true },
        { id: 'u102', userName: 'Joe', password: '321', lastLoginTime: '', isAdmin: false },
        { id: 'u103', userName: 'JMoe', password: '231', lastLoginTime: '', isAdmin: false },
    ]
    return users;
}

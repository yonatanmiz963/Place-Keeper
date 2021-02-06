'use strict';

var key = 'userData'

function getUserData() {
    var userData = loadFromStorage(key);
    if (!userData) return;
    return userData;
}
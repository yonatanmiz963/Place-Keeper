'use strict';

const key = 'userData'
var gUserData = {
    backgroundColor: '',
    textColor: '',
    birthDate: ''
}


function updateUserData(userData) {
    gUserData = userData;
    console.log(gUserData);

    saveToStorage(key, gUserData);
}
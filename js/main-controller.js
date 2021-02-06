'use strict';

function onInit() {
    setUserPerf();
}

function setUserPerf() {
    var userData = getUserData();
    var elHeader = document.querySelector('header');
    console.log(elHeader);
    var elTitles = document.querySelectorAll('.active');
    elHeader.style.backgroundColor = userData.backgroundColor;
    elTitles.forEach(el => el.style.color = userData.textColor)
}
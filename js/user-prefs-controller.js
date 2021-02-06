'use strict'



function onInit() {
    setUserPerf();
}


const savePerfs = (ev) => {
    ev.preventDefault();
    let backgroundColor = document.querySelector('input[name="background-color"]').value;
    let textColor = document.querySelector('input[name="text-color"]').value;
    let birthDate = document.querySelector('input[name="birth-date"]').value;
    updateUserData({ backgroundColor, textColor, birthDate });
    setUserPerf();
}

function setUserPerf() {
    var userData = getUserData();
    var elHeader = document.querySelector('header');
    var elTitle = document.querySelector('.active');
    elHeader.style.backgroundColor = userData.backgroundColor;
    elTitle.style.color = userData.textColor;
}
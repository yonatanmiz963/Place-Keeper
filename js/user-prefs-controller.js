'use strict'



const onInit = () => {

}


const savePerfs = (ev) => {
    ev.preventDefault();
    console.log('form submitted');

    let backgroundColor = document.querySelector('input[name="background-color"]').value;
    console.log('backgroundColor:', backgroundColor)

    let textColor = document.querySelector('input[name="text-color"]').value;
    console.log('textColor:', textColor)

    let birthDate = document.querySelector('input[name="birth-date"]').value;
    console.log('birthDate:', birthDate)

    updateUserData({ backgroundColor, textColor, birthDate });


}
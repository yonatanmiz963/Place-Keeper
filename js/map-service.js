'use strict';



const key = 'places';
var gPlaces = [];
var gPlaceId = 100;

function savePlace(lat, lng, placeName) {
    let newPlace = {
        id: gPlaceId++,
        lat,
        lng,
        placeName
    }
    gPlaces.push(newPlace);
    // console.log(gPlaces);
    saveToStorage(key, gPlaces);
}
'use strict';



const key = 'places';
var gPlaces = [];
var gPlaceId = 100;

const  PAGE_SIZE  =  10;
var  gPageIdx  =  0;


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
    saveToStorage('lastId', gPlaceId);
}

function getLastId() {
    var lastId = loadFromStorage('lastId');
    if (lastId) gPlaceId = lastId;
    // console.log(gPlaceId);
}


function getPlaces() {
    var places = loadFromStorage(key);
    if (!places) return;
    gPlaces = places;
    var  startIdx  =  gPageIdx * PAGE_SIZE;  
    if (startIdx >= gPlaces.length) gPageIdx = 0;  
    return  gPlaces.slice(startIdx,  startIdx  +  PAGE_SIZE)
}

function deletePlaceById(id) {
    var places = loadFromStorage(key);
    var placeIndex = places.findIndex(place => {
        return place.id === id;
    });
    places.splice(placeIndex, 1);
    saveToStorage(key, places);
}

function getUserData() {
    var userData = loadFromStorage('userData');
    if (!userData) return;
    return userData;
}
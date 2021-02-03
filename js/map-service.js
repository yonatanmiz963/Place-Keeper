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
}




function getPlaces() {
    var places = loadFromStorage(key);
    gPlaceId = places[-1].id + 1;
    console.log(gPlaceId);
    gPlaces = places;
    var  startIdx  =  gPageIdx * PAGE_SIZE;  
    if (startIdx >= gPlaces.length) gPageIdx = 0;  
    return  gPlaces.slice(startIdx,  startIdx  +  PAGE_SIZE)
}
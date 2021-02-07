'use strict'

var map;
var gLastPos;

function init() {
    createMap();
    addMapEvents();
    renderPlaces();
    getLastId();
    setUserPerf();
}


function createMap(lat = 29.55805, lng = 34.94821) {
    var elMap = document.querySelector('#map');
    var options = {
        center: {
            lat,
            lng
        },
        zoom: 12
    };

    map = new google.maps.Map(
        elMap,
        options
    );
}



function addMapEvents() {

    var myloc = new google.maps.Marker({
        clickable: false,
        icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
            new google.maps.Size(22, 22),
            new google.maps.Point(0, 18),
            new google.maps.Point(11, 11)),
        shadow: null,
        zIndex: 999,
        map: map
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            myloc.setPosition(me);
        }, function(error) {
            // ...
        });
    }

    // get location
    var infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement('img');
    locationButton.src = '/img/my-location1.png';
    locationButton.classList.add('custom-map-control-button');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener('click', () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Your Location');
                    infoWindow.open(map);
                    map.panTo(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    // // listens for clicking the map event, getting the coords

    map.addListener('click', (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        // saveLocation(mapsMouseEvent.latLng.toJSON(), null, 2);
        gLastPos = mapsMouseEvent.latLng.toJSON();
        $('#input-modal').modal('show');
    });


}



function placeMarker(newName, position) {
    var marker = new google.maps.Marker({
        position: {
            lat: position.lat,
            lng: position.lng
        },
        map,
        title: `${newName}`
    });
}


function handleLocationError(error) {
    var locationError = document.getElementById('locationError');

    switch (error.code) {
        case 0:
            locationError.innerHTML = 'There was an error while retrieving your location: ' + error.message;
            break;
        case 1:
            locationError.innerHTML = 'The user didn\'t allow this page to retrieve a location.';
            break;
        case 2:
            locationError.innerHTML = 'The browser was unable to determine your location: ' + error.message;
            break;
        case 3:
            locationError.innerHTML = 'The browser timed out before retrieving the location.';
            break;
    }
}


function goToLocation(lat, lng) {
    var position = { lat, lng };
    map.panTo(position);
}



function renderPlaces() {
    var places = getPlaces();
    if (!places) return;
    places.forEach(place => {
        var position = {
            lat: place.lat,
            lng: place.lng
        }
        placeMarker(place.placeName, position);
    });
    var strHtmls = places.map((place) => {
        return `<tr onclick='goToLocation(${place.lat}, ${place.lng})'><td data-id='place.id' > ${place.id}</td>
                        <td>${place.placeName}</td>
                        <td class='delete'><button class='delete btn btn-outline-danger' onclick='deletePlace(${place.id})'>Delete</button></td>
                        </tr>`;
    }).join('');

    // console.log(strHtmls);
    document.querySelector('.places-table').innerHTML = strHtmls;
}



function deletePlace(id) {
    deletePlaceById(id);
    renderPlaces();
}

function setUserPerf() {
    var userData = getUserData();
    if (!userData) return;
    var elHeader = document.querySelector('.topnav');

    var elTitle = document.querySelector('.active');
    elHeader.style.backgroundColor = userData.backgroundColor;
    elTitle.style.color = userData.textColor;
}

function onSubmitForm(ev) {
    ev.preventDefault();
    saveLocation(gLastPos);
    $('#input-modal').modal('hide');
}


function saveLocation(pos) {
    var newName = document.querySelector('[name="place"]').value;
    placeMarker(newName, pos);
    savePlace(pos.lat, pos.lng, newName);
    gLastPos = null;
    document.querySelector('[name="place"]').value = '';
    renderPlaces();
}
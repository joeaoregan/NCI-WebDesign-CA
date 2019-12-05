/*
maps.js

Add google map location to contact page

https://developers.google.com/maps/documentation/javascript/adding-a-google-map
*/
function myMap() {
    var myLatLng = { lat: 53.349093, lng: -6.242793 };//NCI Google Maps Coordinates latitute and longitude

    var mapProp = {
        center: new google.maps.LatLng(myLatLng.lat, myLatLng.lng),//Add map coordinates for where the map is focused
        zoom: 17,//initial zoom level
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);//Find the element with ID googleMap and draw the map here

    var marker = new google.maps.Marker({
        position: myLatLng,//Coordinates to place marker at on map
        map: map,//The map to add the marker too
        title: 'We are based here. (Not really, I am nowhere near Dublin)'//Title when cursor is placed over maps marker
    });
}
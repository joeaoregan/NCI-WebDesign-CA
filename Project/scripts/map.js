/*
Add google map location to contact page
*/
function myMap() {
    var myLatLng = { lat: 53.349093, lng: -6.242793 };//NCI Google Maps Coordinates

    var mapProp = {
        center: new google.maps.LatLng(myLatLng.lat, myLatLng.lng),
        zoom: 17,//initial zoom level
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'We are based here. (Not really, I am nowhere near Dublin)'
    });
}
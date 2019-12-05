/*
popup.js
J O'Regan
05/12/2019

https://www.w3schools.com/howto/howto_js_popup.asp
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_popup
Toggles the popup shown/hidden when information icon is clicked: 
*/

function showPopup(id) {
    console.log('popup')
    var popup = document.getElementById(id);//Get the location to display the popup
    popup.classList.toggle("show");//Add or remove the show CSS class from the popup element: https://www.w3schools.com/jsref/prop_element_classlist.asp
}
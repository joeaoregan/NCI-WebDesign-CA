/*
popup.js
J O'Regan
05/12/2019

https://www.w3schools.com/howto/howto_js_popup.asp
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_popup
*/

function showPopup() {
    console.log('popup')
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
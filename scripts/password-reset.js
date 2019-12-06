/*
password-reset.js
J O'Regan
03/12/2019

Handle resetting passwords
*/
function resetPassword(){
    document.getElementById("resetPasswordID").innerHTML = "Please check your email. A reset link has been sent to " + document.getElementById('emailvalue').value;//Update message below password screen
    document.getElementById('emailvalue').value = "";//Reset value in input field
}
/*
game-buttons.js

Buttons used by all games to control audio
*/
var mute = false;//Boolean variable used to decide if game fx should be played or not

//Toggles the sound effects on/off, and changes the mute button label and background colour
function muteAudio() {
    mute = !mute;//If false set true, if true set false (toggles button on off)

    if (mute) {//If game sound effects are muted
        document.getElementById("muteID").innerHTML = "FX On";//Change the button text to "FX On"
        document.getElementById("muteID").classList.remove('cancelbtn');//Set the button to the default green button colour used in styles.css
    } else {//if game sound effects are active
        document.getElementById("muteID").innerHTML = "FX Off";//Change the button text to "FX Off"
        document.getElementById("muteID").classList.add('cancelbtn');//Change the button background colour to red (for stop)
    }
}
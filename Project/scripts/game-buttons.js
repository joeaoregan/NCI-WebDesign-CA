/*
game-buttons.js
Buttons used by all games to control audio
*/
var mute = false;

function muteAudio() {
    mute = !mute;
    if (mute) {
        document.getElementById("muteID").innerHTML = "FX On";
        document.getElementById("muteID").classList.remove('cancelbtn');
    } else {
        document.getElementById("muteID").innerHTML = "FX Off";
        document.getElementById("muteID").classList.add('cancelbtn');
    }
}
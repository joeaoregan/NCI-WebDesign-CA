/*
music.js
J O'Regan
03/12/2019
Script to handle game music
*/

//Audio files
var track1 = document.createElement("audio");
track1.src = "game-antibody/audio/01.mp3";
var track2 = document.createElement("audio");
track2.src = "game-antibody/audio/02.mp3";
var track3 = document.createElement("audio");
track3.src = "game-antibody/audio/03.mp3";
var track4 = document.createElement("audio");
track4.src = "game-antibody/audio/04.mp3";
var track5 = document.createElement("audio");
track5.src = "game-antibody/audio/05.mp3";

var tracks = [track1, track2, track3, track4, track5];//Array of tracks


var currentTrack = 0;
var paused = true;

/*
Start Playing music
If trackNumber parameter is not set, it will play the first track in the array
*/
function playMusic(trackNumber) {
    //Play either the first track or a track number passed in as an argument
    if (trackNumber) {
        currentTrack = trackNumber;//Set the track number (for skipping etc.)
    }

    paused = !paused;//Toggle the pause value

    if (paused) {
        pause();//Pause the current track
    } else {
        play();//Play the current track
    }

    console.log("> Current Track: " + currentTrack);
}

function play(startTime) {
    document.getElementById("playID").innerHTML = "Pause Music";//Set the play/pause button text
    document.getElementById("playID").classList.add('cancelbtn');//Set the play/pause button background colour red
    if (startTime != null) {
        tracks[currentTrack].currentTime = startTime;//Play the track from the specified start time
    }
    tracks[currentTrack].play();//Play the track
    showTrackInfo();//Show the title of the track
    console.log("> Music Play");
}

function pause() {
    //Change the Pause button to Play Button
    document.getElementById("playID").innerHTML = "Play Music";//Set the play/pause button text
    document.getElementById("playID").classList.remove('cancelbtn');//Change button background colour to green
    tracks[currentTrack].pause();//Pause the current track
    console.log("|| Music Paused");
}

// Show the track title of the current track
function showTrackInfo() {
    var trackTime = tracks[currentTrack].currentTime;
    var minutes = parseInt(trackTime / 60);
    var seconds = parseInt(trackTime % 60);
    var secStr = String(seconds).padStart(2, '0');//Add leading zero
    document.getElementById("trackTitleID").innerHTML = "Current Track: " + (currentTrack + 1);
    document.getElementById("trackTitleID").innerHTML += " (" + minutes + ":" + secStr + "/" + trackLength();
}

window.setInterval(function () {
    var trackTime = tracks[currentTrack].currentTime;
    var minutes = parseInt(trackTime / 60);
    var seconds = parseInt(trackTime % 60);
    var secStr = String(seconds).padStart(2, '0');//Add leading zero

    document.getElementById("trackTitleID").innerHTML = "Current Track: " + (currentTrack + 1);
    document.getElementById("trackTitleID").innerHTML += " (" + minutes + ":" + secStr + "/" + trackLength();

}, 1000);

function trackLength() {
    var secs = Math.floor(tracks[currentTrack].duration);//Convert the track duration to seconds
    var minutes = parseInt(secs / 60);//Get the number of minutes
    var seconds = parseInt(secs % 60);//Get the number of seconds
    var secStr = String(seconds).padStart(2, '0');//Add leading zero
    console.log('m ' + minutes + ' s ' + secStr)
    return minutes + ":" + secStr + ")";//Return (mm:ss)
}

function fastForwardTrack() {
    var duration = Math.floor(tracks[currentTrack].duration);//Audio file length
    if (tracks[currentTrack].currentTime + 5 < duration) {//If adding 5 seconds is less than the track duration
        tracks[currentTrack].currentTime += 5;//Skip forwards 5 seconds
        showTrackInfo();//Update the displayed track details
    } else {
        skipForwards();//Skip to next track if skipping 5 seconds goes over the track duration
    }
}

function rewindTrack(){
    if (tracks[currentTrack].currentTime - 5 > 0) {//If subtracting 5 seconds is greater than zero (start time)
        tracks[currentTrack].currentTime -= 5;//Skip backwards 5 seconds
        showTrackInfo();//Update the displayed track details
    } else {
        play(0);//Play the audio file from the beginning if it can't rewind anymore
    }
}

function skipForwards() {
    tracks[currentTrack].pause();//Pause the current track

    currentTrack++;
    if (currentTrack >= tracks.length) {
        currentTrack = 0;//go to first track in array if already on last track in array
    }
    tracks[currentTrack].currentTime = 0;//Play form the beginning
    showTrackInfo();
    if (!paused) {
        // tracks[currentTrack].play();//Play the next track
        play();
    }
    console.log(">> Current Track: " + currentTrack);
}

function skipBackwards() {
    tracks[currentTrack].pause();//Pause the current track
    currentTrack--;
    console.log("SKIP BACKWARDS PRESSED >>" + currentTrack);
    if (currentTrack < 0) {
        currentTrack = tracks.length - 1;//go to last track in array if already on first track
    }
    tracks[currentTrack].currentTime = 0;//Play form the beginning
    showTrackInfo();
    if (!paused) {
        tracks[currentTrack].play();//Play the next track
    }
    console.log("<< Current Track: " + currentTrack);
}

function playRandomMusic() {
    // Pick a random track
    tracks[currentTrack].pause();//Pause the current track
    var previousTrack = currentTrack;//Store the previous track so the same song isn't restarted

    // Select a new track
    while (currentTrack == previousTrack) {//Keep picking a track number until the new track doesn't match the previous track
        currentTrack = parseInt(Math.random() * tracks.length);//Select a new track to play
    }
    paused = false;//Track plays straight away
    play(0);//Play the new randomly selected track from the beginning
    console.log("Random Track Selected: " + currentTrack);
}

//Event listener checks if audio has finished, then plays the next track
for (var i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener('ended', function () {
        console.log('TRACK HAS ENDED')
        skipForwards();
    });
}
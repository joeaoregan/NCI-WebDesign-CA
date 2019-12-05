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

//Event listener checks if audio has finished, then plays the next track
for (var i = 0; i < tracks.length; i++) {//Add event listener to each track
    tracks[i].addEventListener('ended', function () {//Event listener for when the audio file has finished playing
        console.log('TRACK HAS ENDED')
        skipForwards();//If the track is ended play the next one
    });
}

var currentTrack = 0;//First track in the array
var paused = true;//Music doesn't start until the user presses play

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

/*
Play the audio file and update the play/pause button
Parameter is the start time to play from, if not selected it plays from the beginning
https://www.w3schools.com/tags/av_prop_currenttime.asp
*/
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

//Pause the audio file and update the play/pause button
function pause() {
    //Change the Pause button to Play Button
    document.getElementById("playID").innerHTML = "Play Music";//Set the play/pause button text
    document.getElementById("playID").classList.remove('cancelbtn');//Change button background colour to green
    tracks[currentTrack].pause();//Pause the current track
    console.log("|| Music Paused");
}

// Show the track title of the current track, and the audio files current time and duration
function showTrackInfo() {
    if(isNaN(tracks[currentTrack].duration)) {
        document.getElementById("trackTitleID").innerHTML="Press Play";
        return;
    }
    var trackTime = tracks[currentTrack].currentTime;//Current time of the audio file being played
    console.log('track time '+trackTime)
    var minutes = parseInt(trackTime / 60);//Get the number of minutes
    var seconds = parseInt(trackTime % 60);//Get the number of seconds
    var secStr = String(seconds).padStart(2, '0');//Add leading zero to seconds
    document.getElementById("trackTitleID").innerHTML = "Current Track: " + (currentTrack + 1);//Show track number
    document.getElementById("trackTitleID").innerHTML += " (" + minutes + ":" + secStr + "/" + trackLength();
}

showTrackInfo();
/*
//Every 1000 milliseconds (1 second) update the track information
window.setInterval(function () {
    showTrackInfo();
}, 1000);
*/
/*
Get the length of the track, and format for output
https://www.w3schools.com/tags/av_prop_duration.asp
*/
function trackLength() {
    var secs = Math.floor(tracks[currentTrack].duration);//Convert the track duration to seconds
    if(isNaN(secs)) return "0:00)"//If secs is not a number
    var minutes = parseInt(secs / 60);//Get the number of minutes
    var seconds = parseInt(secs % 60);//Get the number of seconds
    var secStr = String(seconds).padStart(2, '0');//Add leading zero
    return minutes + ":" + secStr + ")";//Return (mm:ss)
}

// Fast forward an audio file 5 seconds
function fastForwardTrack() {
    var duration = Math.floor(tracks[currentTrack].duration);//Audio file length
    if (tracks[currentTrack].currentTime + 5 < duration) {//If adding 5 seconds is less than the track duration
        tracks[currentTrack].currentTime += 5;//Skip forwards 5 seconds
        showTrackInfo();//Update the displayed track details
    } else {
        skipForwards();//Skip to next track if skipping 5 seconds goes over the track duration
    }
}

// Rewind an audio file 5 seconds
function rewindTrack(){
    if (tracks[currentTrack].currentTime - 5 > 0) {//If subtracting 5 seconds is greater than zero (start time)
        tracks[currentTrack].currentTime -= 5;//Skip backwards 5 seconds
        showTrackInfo();//Update the displayed track details
    } else {
        play(0);//Play the audio file from the beginning if it can't rewind anymore
    }
}

// Select the next track in the array, or first track if it is already the last track
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

// Select the previous track in the array, or last track if it is already the first track
function skipBackwards() {
    tracks[currentTrack].pause();//Pause the current track
    currentTrack--;//Select the previous track
    console.log("SKIP BACKWARDS PRESSED >>" + currentTrack);
    if (currentTrack < 0) {//If the current track now a number lower than the first track
        currentTrack = tracks.length - 1;//go to last track in array if already on first track
    }
    tracks[currentTrack].currentTime = 0;//Play form the beginning
    showTrackInfo();//Update the current track information
    if (!paused) {//If the game isn't paused
        tracks[currentTrack].play();//Play the next track
    }
    console.log("<< Current Track: " + currentTrack);
}

// Pick a random track and play immediately
function playRandomMusic() {
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
/*
music.js
J O'Regan
03/12/2019
Script to handle game music
*/
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

var tracks = [track1, track2, track3, track4, track5];

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

    //if(!paused) 
    //    tracks[currentTrack].currentTime = 0;//Play form the beginning

    paused = !paused;//If paused play, if playing pause


    if (paused) {
        //Change the Pause button to Play Button
        document.getElementById("playID").innerHTML = "Play Music";
        document.getElementById("playID").classList.remove('cancelbtn');
        tracks[currentTrack].pause();//Pause the current track
        console.log("|| Music Paused");
    } else {
        //Change the Play button to Pause Button
        document.getElementById("playID").innerHTML = "Pause Music";
        document.getElementById("playID").classList.add('cancelbtn');
        tracks[currentTrack].play();//Play first track in array
        showTrackTitle();
        console.log("> Music Play");
    }

    console.log("> Current Track: " + currentTrack);
}

function showTrackTitle(){
    document.getElementById("trackTitleID").innerHTML = "Current Track: "+(currentTrack+1);
}

function skipForwards() {
    tracks[currentTrack].pause();//Pause the current track

    currentTrack++;
    if (currentTrack >= tracks.length) {
        currentTrack = 0;//go to first track in array if already on last track in array
    }
    tracks[currentTrack].currentTime = 0;//Play form the beginning
    showTrackTitle();
    if (!paused) {
        tracks[currentTrack].play();//Play the next track
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
    showTrackTitle();
    if (!paused) {
        tracks[currentTrack].play();//Play the next track
    }
    console.log("<< Current Track: " + currentTrack);
}

function pauseTrack() {
    if (paused) {
        tracks[currentTrack].currentTime = 0;//Play form the beginning
        tracks[currentTrack].play();
        showTrackTitle();
        paused = false;
        console.log("> Music Play");
    } else {
        tracks[currentTrack].pause();
        paused = true;
        console.log("|| Music Paused");
    }
}

function playRandomMusic() {
    // Pick a random track
    tracks[currentTrack].pause();//Pause the current track
    currentTrack = parseInt(Math.random() * tracks.length);

    document.getElementById("playID").innerHTML = "Pause Music";
    document.getElementById("playID").classList.add('cancelbtn');
    tracks[currentTrack].currentTime = 0;
    tracks[currentTrack].play();
    showTrackTitle();
    paused = false;//Set the track as playing
    console.log("Random Track Selected: " + currentTrack);
}
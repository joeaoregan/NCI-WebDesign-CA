/*
high-scores.js

Show the high scores on the index page High Scores panel for each game
*/

/*Flappy Bird High-Scores*/
var defaultScoresJSON = { 'hard': 0, 'medium': 0, 'easy': 0 };//Default scores if JSON not found in localStorage
var storedScores = JSON.parse(localStorage.getItem('flappy-scores-json')) || defaultScoresJSON;//Get stored scores, or use default
//Display the scores at the element with ID "flappyScoreID" to display Flappy Bird high scores on index.html
document.getElementById("flappyScoreID").innerHTML = "Hard: " + (storedScores.hard || 0) + "<br>Medium: " + (storedScores.medium || 0) + "<br>Easy: " + (storedScores.easy || 0);

/*Antibody High-Score*/
var defaultPlayerJSON = { 'name': 'Unknown Player', 'score': 0 };//Default values for Player if JSON not found in localStorage
var topAntibodyPlayer = JSON.parse(localStorage.getItem('antibody-highscore-json')) || defaultPlayerJSON;//Get player with highest score for Antibody from localStorage, or use defaults
if (topAntibodyPlayer.name === '') {//If name is blank
    topAntibodyPlayer.name = 'Unknown Player';//Set to "Unknown Player"
}
document.getElementById("antibodyScoreID").innerHTML = topAntibodyPlayer.name + ':<br>' + parseInt(topAntibodyPlayer.score);//Set the score for Antibody at element with ID "antibodyScoreID" in index.html

/* Space Invaders High-Score*/
document.getElementById("spaceScoreID").innerHTML = parseInt(localStorage.getItem("spaceinvaders-highscore")) || 0;//Display the space invaders high score
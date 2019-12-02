// Vars & Consts
let frames = 0;
const SCREEN_HEIGHT=600;
var lasers=[], explosions=[], bloodcells=[];
var hud1;
var powerup1;
const MAX_BLOODCELLS=50;
var bloodcellsDestroyed=0;

// GAME STATE
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

const player = {
	'name': 'Unknown Player',
	'score': 0	
}

var tempPlayer = {
	'name': 'Unknown Player',
	'score': 0
};

// AABB Collisions
function collision(o1, o2) {
	return (o2.x < o1.x+o1.w &&
           o2.x+o2.w > o1.x &&
           o2.y < o1.y+o1.h &&
           o2.y+o2.h > o1.y);
}

window.onload = function() {
	updateScore();
	if ("vibrate" in navigator){
		console.log('can vibrate');
	}else{		
		console.log('can not vibrate');
	}
} 

function updateScore(){
	var topPlayer = JSON.parse(localStorage.getItem('antibody-highscore-json')) || tempPlayer;
	console.log(JSON.stringify(topPlayer));
	document.getElementById("scoreID").innerHTML=topPlayer.score + ' (' + topPlayer.name + ')';//Top score is now stored as JSON with name and score attributes
}

function init(){
	var b1 = new bloodcell();
	var b2 = new bloodcell();
	var b3 = new bloodcell();
	var b4 = new bloodcell();
	var b5 = new bloodcell();
	bloodcells.push(b1);
	bloodcells.push(b2);
	bloodcells.push(b3);
	bloodcells.push(b4);
	bloodcells.push(b5);
	
	hud1=new hud();
	powerupNewLife=new powerup('PowerUpLife');
	
	updateScore();//Display the current top score on the scores accordion from the beginning of the game
}

init();

function spawnLife(){
	powerupNewLife.active=true;
}

// Draw objects
function draw(){
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    scrollingBG.draw();
	enemyShip.draw();

	for (var i = 0; i < explosions.length; i++) {
		explosions[i].draw();
	}
	ship.draw();
	for (var i = 0; i < lasers.length; i++) {
		lasers[i].draw();
	}
	levelTxt.draw();
    score.draw();
	time.draw();
	antibodyTxt.draw();
	
	for (var i = 0; i < bloodcells.length; i++) {
		bloodcells[i].draw();
	}
	
	hud1.draw();
	powerupNewLife.draw();
}

// Update objects
function update(){
	ship.update();
    scrollingBG.update();
	for (var i = 0; i < lasers.length; i++) {
		lasers[i].update();
	}
	
	enemyShip.update();
	
	for (var i = 0; i < explosions.length; i++) {
		explosions[i].update();
		if(explosions[i].frame>=11){	// remove explosion after animation finished
			explosions.splice(i,1);
		}
	}

	for (var i = 0; i < bloodcells.length; i++) {
		bloodcells[i].update();
	}
	
	powerupNewLife.update();
	
	if(bloodcellsDestroyed>=MAX_BLOODCELLS){
		state.current=state.over;
	}
}

// Game loop
function loop(){
    update();
    draw();
    frames++;    
    requestAnimationFrame(loop);
}

loop();

// Mouse
canvas.addEventListener("click", function(evt){
	//console.log('click');
    switch(state.current){
        case state.getReady:
			startGame();
            break;
        case state.game:
            ship.fire();
            break;
        case state.over:
			reset();
            break;
    }
});

/*
When the player presses the fire button a prompt is displayed to enter their name.
A regular expression is used to check the name string meets requirements.
If the name doesn't meet the requirements a prompt is displayed with the requirements.
Once a name has been accepted the game changes state, and begins to play.
*/
function startGame(){
	var letters = /^[A-Za-z0-9_-]*[A-Za-z][A-Za-z0-9 _'-]*$/; // Regular expression, allow letters, numbers, spaces,underscore,hyphen and apostraphe
	var currentPlayer;

	while(!currentPlayer || currentPlayer===''){
		//Add check for player being logged in later
		//console.log('check name 1');
		if(player.name ==="Unknown Player" || player.name==""){//if the player name is unknown
			//console.log('checking name');
			currentPlayer=prompt("Please Enter Your Name:\n(Minimum 1 letter. Numbers, spaces, undercore, hyphen, and apostraphe allowed)","");//Show prompt to enter player name
			
			if(currentPlayer){
				//console.log('entered: '+currentPlayer);

				if(currentPlayer.match(letters)) {//Check the name entered contains letters, numbers, spaces,underscore,hyphen and apostraphe
					console.log('characters ok');
					if(currentPlayer!=null && currentPlayer!==''){
						player.name=currentPlayer;//Set the player name to store high score
						//console.log('set player name' + player.name);
					}
				} else {
					currentPlayer=null;
					alert("Name must begin with a letter, number, underscore, or hyphen\nAND\nContain at least one letter\nAND\nContain only letters, numbers, spaces, underscores, hyphens and apostraphe");
				}
			}
		}
	}
	state.current = state.game;//Change the game state to playing the game
}

function reset(){
	powerupNewLife.reset();
	bloodcellsDestroyed=0;
	time.reset();
	score.reset();
	state.current = state.getReady;	
}

// Keyboard
window.addEventListener('keydown',function(e){
	if(e.keyCode==32){
        e.preventDefault();
		switch(state.current){
			case state.getReady:
				startGame();
				break;
			case state.game:
				ship.fire();
				break;
			case state.over:
				reset();
				break;
		}
	}	
	
	switch (e.keyCode) {
		case 65: // A
		case 37: // Left
		case 100: // 4
			ship.dx=-ship.speed;
			e.preventDefault();
			//console.log('Left');
			break;
		case 87: // W
		case 38: // Up
		case 104: // 8
			ship.dy=-ship.speed;
			e.preventDefault();
			//console.log('Up');
			break;
		case 68: // D
		case 39: // Right
		case 102: // 6
			ship.dx=ship.speed;
			e.preventDefault();
			//console.log('Right');
			break;
		case 83: // S
		case 40: // Down
		case 98: // 2
			ship.dy=ship.speed;
			e.preventDefault();
			//console.log('Down ' + ship.dy);
			break;
	}
},false);

function moveUp(){
	ship.dy=-ship.speed;
}
function moveDown(){
	ship.dy=ship.speed;
}
function moveLeft(){
	ship.dx=-ship.speed;
}
function moveRight(){
	ship.dx=ship.speed;
}
function moveXClear(){
	ship.dx=0;
}
function moveYClear(){
	ship.dy=0;	
}
function fire(){
	ship.fire();
}

document.addEventListener('keyup', function(event) {
	switch (event.keyCode) {
		case 65: // A
		case 37: // Left
		case 100: // 4
		case 68: // D
		case 39: // Right
		case 102: // 6
			ship.dx=0;
			break;
		case 87: // W
		case 38: // Up
		case 104: // 8
		case 83: // S
		case 40: // Down
		case 98: // 2
			ship.dy=0;
			break;
	}	
});
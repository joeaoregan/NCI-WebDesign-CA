/*
Modified slightly to fit 1280*720 canvas
I can see this clearly does not suit this game
*/

// SELECT CVS
const cvs = document.getElementById("bird");
const ctx = cvs.getContext("2d");

// GAME VARS AND CONSTS
let frames = 0;
const DEGREE = Math.PI / 180;

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "flappybird/img/sprite.png";

// LOAD SOUNDS
const SCORE_S = new Audio();
SCORE_S.src = "flappybird/audio/sfx_point.wav";

const FLAP = new Audio();
FLAP.src = "flappybird/audio/sfx_flap.wav";

const HIT = new Audio();
HIT.src = "flappybird/audio/sfx_hit.wav";

const SWOOSHING = new Audio();
SWOOSHING.src = "flappybird/audio/sfx_swooshing.wav";

const DIE = new Audio();
DIE.src = "flappybird/audio/sfx_die.wav";

var mute = false;

function muteAudio() {
    mute = !mute;
    if (mute) {
        document.getElementById("muteID").innerHTML = "Mute: Off";
        document.getElementById("muteID").classList.add('cancelbtn');
    } else {
        document.getElementById("muteID").innerHTML = "Mute: On";
        document.getElementById("muteID").classList.remove('cancelbtn');
    }
}

var testObject = { 'hard': 0, 'medium': 0, 'easy': 0 };
var storedScores = JSON.parse(localStorage.getItem('flappy-scores-json')) || testObject;

if(typeof storedScores !== 'undefined') {
    console.log(storedScores);
    console.log(storedScores.hard);
    console.log(storedScores.medium);
    console.log(storedScores.easy);
}
console.log(testObject.hard);

/*
console.log('test:')
var testObject = { 'one': 1, 'two': 2, 'three': 3 };

testObject.two=4;
// Put the object into storage
localStorage.setItem('testObject', JSON.stringify(testObject));
// Retrieve the object from storage
var retrievedObject = localStorage.getItem('testObject');
console.log('retrievedObject: ', JSON.parse(retrievedObject));
*/
const difficulty = {
    current: 1,
    easy: 0,
    medium: 1,
    hard: 2
}

// GAME STATE
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
}

// START BUTTON COORD
const startBtn = {
    x: 550,
    y: 500,
    w: 166,
    h: 58
}

// CONTROL THE GAME
cvs.addEventListener("click", function (evt) {
    //console.log('click');
    switch (state.current) {
        case state.getReady:
            state.current = state.game;
            if (!mute) SWOOSHING.play();
            setDifficulty();
            break;
        case state.game:
            if (bird.y - bird.radius <= 0) return;
            bird.flap();
            if (!mute) FLAP.play();
            break;
        case state.over:
            let rect = cvs.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;

            // CHECK IF WE CLICK ON THE START BUTTON
            if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h) {
                pipes.reset();
                bird.speedReset();
                score.reset();
                state.current = state.getReady;
            }
            break;
    }
});

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
        e.preventDefault();//Stop spacebar from scrolling the page

        switch (state.current) {
            case state.getReady:
                state.current = state.game;
                if (!mute) SWOOSHING.play();
                setDifficulty();
                break;
            case state.game:
                if (bird.y - bird.radius <= 0) return;
                bird.flap();
                if (!mute) FLAP.play();
                break;
            case state.over:
                pipes.reset();
                bird.speedReset();
                score.reset();
                state.current = state.getReady;
                break;
        }
    }
}, false);

// BACKGROUND
const bg = {
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y: cvs.height - 226,

    draw: function () {
        for (var i = 0; i < 5; i++) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (this.w * i), this.y, this.w, this.h);
        }
    }
}

// FOREGROUND
const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,

    dx: 2,

    draw: function () {
        for (var i = 0; i < 7; i++) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (this.w * i), this.y, this.w, this.h);
        }
    },

    update: function () {
        if (state.current == state.game) {
            this.x = (this.x - this.dx) % (this.w / 2);
        }
    }
}

// BIRD
const bird = {
    animation: [
        { sX: 276, sY: 112 },
        { sX: 276, sY: 139 },
        { sX: 276, sY: 164 },
        { sX: 276, sY: 139 }
    ],
    x: cvs.width / 2,
    y: 150,
    w: 34,
    h: 26,

    radius: 12,

    frame: 0,

    gravity: 0.25,
    jump: 4.6,
    speed: 0,
    rotation: 0,

    draw: function () {
        let bird = this.animation[this.frame];

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, - this.w / 2, - this.h / 2, this.w, this.h);
        ctx.restore();
    },

    flap: function () {
        this.speed = - this.jump;
    },

    update: function () {
        // IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
        this.period = state.current == state.getReady ? 10 : 5;
        // WE INCREMENT THE FRAME BY 1, EACH PERIOD
        this.frame += frames % this.period == 0 ? 1 : 0;
        // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
        this.frame = this.frame % this.animation.length;

        if (state.current == state.getReady) {
            this.y = 150; // RESET POSITION OF THE BIRD AFTER GAME OVER
            this.rotation = 0 * DEGREE;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;

            // bird moves off screen, or hits ground
            if (this.y + this.h / 2 >= cvs.height - fg.h) {
                this.y = cvs.height - fg.h - this.h / 2;
                if (state.current == state.game) {
                    state.current = state.over;
                    if (!mute) DIE.play();
                    document.getElementById("difficultyID").classList.remove('not-in-use-btn');
                }
            }

            // IF THE SPEED IS GREATER THAN THE JUMP MEANS THE BIRD IS FALLING DOWN
            if (this.speed >= this.jump) {
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            } else {
                this.rotation = -25 * DEGREE;
            }
        }

    },
    speedReset: function () {
        this.speed = 0;
    }
}

// GET READY MESSAGE
const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width / 2 - 173 / 2,
    y: 80,

    draw: function () {
        if (state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x - (this.w / 2), this.y + (this.h / 2) * 1.5, this.w * 2, this.h * 2);
        }
    }
}

// GAME OVER MESSAGE
const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width / 2 - 225 / 2,
    y: cvs.height / 2 - 202,
    scoreTextWidth: 0,
    highScoreTextWidth: 0,

    draw: function () {
        if (state.current == state.over) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x - (this.w / 2), this.y, this.w * 2, this.h * 2);

            ctx.fillStyle = "#FFF";
            ctx.strokeStyle = "#000";
            ctx.font = "30px Teko";

            var text= "Hard: "+(storedScores.hard || 0)+" Med: "+(storedScores.medium || 0)+" Easy: "+(storedScores.easy || 0);

            this.scoreTextWidth = ctx.measureText(score.value).width;
            this.highScoreTextWidth = ctx.measureText(text).width;

            // SCORE VALUE
            //ctx.font = "40px Teko";
            ctx.fillText(score.value, this.x - (this.w / 2) + 405 - this.scoreTextWidth, 350);
            ctx.strokeText(score.value, this.x - (this.w / 2) + 405 - this.scoreTextWidth, 350);
            // BEST SCORE
            ctx.fillText(text, this.x - (this.w / 2) + 405 - this.highScoreTextWidth, 436);
            ctx.strokeText(text, this.x - (this.w / 2) + 405 - this.highScoreTextWidth, 436);
        }
    }
}


/*
const antibodyTxt={
	abText: 'Antibody JS by Joe O Regan',
	textWidth: 0,
	
	draw : function(){
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
		
		this.textWidth=ctx.measureText(this.abText).width;
		
        //if(state.current == state.game){
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.abText, (canvas.width/2)-(this.textWidth/2), 590);
            ctx.strokeText(this.abText, (canvas.width/2)-(this.textWidth/2), 590);
		//}				
    }
    
*/


// PIPES
const pipes = {
    position: [],

    top: {
        sX: 553,
        sY: 0
    },
    bottom: {
        sX: 502,
        sY: 0
    },

    w: 53,
    h: 400,
    gap: 85,
    maxYPos: -150,
    dx: 2,

    draw: function () {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;

            // top pipe
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

            // bottom pipe
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
        }
    },

    update: function () {
        if (state.current !== state.game) return;

        if (frames % 100 == 0) {
            this.position.push({
                x: cvs.width,
                y: this.maxYPos * (Math.random() + 1),
                dead: false
            });
        }
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            let bottomPipeYPos = p.y + this.h + this.gap;

            // COLLISION DETECTION (Top then bottom pipe)
            if ((bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) ||
                (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h)) {
                state.current = state.over;
                document.getElementById("difficultyID").classList.remove('not-in-use-btn');
                if (!mute) HIT.play();
            }

            p.x -= this.dx; // Pipes move right to left

            // If bird moves past a pipe, update score
            if (p.x + this.w < bird.x && !p.dead) {
                score.value += 1;
                p.dead = true;
                if (!mute) SCORE_S.play();

                if (difficulty.current == difficulty.hard) {
                    storedScores.hard = Math.max(score.value, storedScores.hard);
                } else if (difficulty.current == difficulty.medium) {
                    storedScores.medium = Math.max(score.value, storedScores.medium);
                } else if (difficulty.current == difficulty.easy) {
                    storedScores.easy = Math.max(score.value, storedScores.easy);
                }

                //console.log(JSON.stringify(storedScores));
                localStorage.setItem('flappy-scores-json', JSON.stringify(storedScores));
                // console.log('read:');
                //console.log(JSON.parse(localStorage.getItem('flappy-scores')));
            }

            // if the pipes go beyond canvas, we delete them from the array
            if (p.x + this.w <= 0) {
                this.position.shift();
            }
        }

        updateScore(); //JOR
    },

    reset: function () {
        this.position = [];
    }
}

function setDifficulty() {
    if (state.current != state.game) {
        difficulty.current++;//increase difficulty level
        if (difficulty.current > difficulty.hard) {
            difficulty.current = difficulty.easy;//difficulty resets to 0 after hard
        }
        //Set button label
        if (difficulty.current == difficulty.easy) {
            document.getElementById("difficultyID").innerHTML = "Difficulty: Easy";
            pipes.gap = 125;
        } else if (difficulty.current == difficulty.medium) {
            document.getElementById("difficultyID").innerHTML = "Difficulty: Medium";
            pipes.gap = 100;
        } else if (difficulty.current == difficulty.hard) {
            document.getElementById("difficultyID").innerHTML = "Difficulty: Hard";
            pipes.gap = 85;
        }
        document.getElementById("difficultyID").classList.remove('not-in-use-btn');
    } else {
        document.getElementById("difficultyID").classList.add('not-in-use-btn');
    }
}

/*
// overwrites the onload in the html body tag
window.onload = function () {
    //when the document is finished loading, replace everything
    //between the <a ...> </a> tags with the value of splitText
}
*/
function updateScore() {
    //storedScores = JSON.parse(localStorage.getItem('flappy-scores')) || { hard: 0, medium: 0, easy: 0 };
    document.getElementById("scoreID").innerHTML = storedScores.hard || 0;

    document.getElementById("allScoresID").innerHTML = `
                <p><b>Difficulty Hard: </b>`+ (storedScores.hard || 0) + `</p>
                <p><b>Difficulty Medium: </b>`+ (storedScores.medium || 0) + `</p>
                <p><b>Difficulty Easy: </b>`+ (storedScores.easy || 0) + `</p>
    `;
}

// SCORE
const score = {
    value: 0,

    draw: function () {
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";

        if (state.current == state.game) {
            ctx.lineWidth = 2;
            ctx.font = "50px Teko";
            ctx.fillText(this.value, cvs.width / 2, 50);
            ctx.strokeText(this.value, cvs.width / 2, 50);
        }
    },

    reset: function () {
        this.value = 0;
    }
}

// DRAW
function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    pipes.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}

// UPDATE
function update() {
    bird.update();
    fg.update();
    pipes.update();
}

// LOOP
function loop() {
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}

loop();

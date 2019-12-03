const SPRITE_WIDTH = 40;//was 28
const SPRITE_HEIGHT = 28;//was 20
const PLAYER_Y_POS = 650;//was 470, fixed on y axis
const GAME_W = 720;
const GAME_H = 680;

//Audio
const FX_BONUS = new Audio();
FX_BONUS.src = "game-spaceinvaders/audio/Bonus1.wav";
const FX_EXPLOSION = new Audio();
FX_EXPLOSION.src = "game-spaceinvaders/audio/explosion.wav";
const FX_LASER = new Audio();
FX_LASER.src = "game-spaceinvaders/audio/laser1.wav";

const Mothership = {
    x: 1500,//off screen
    y: 75,
    w: 32,
    h: 14,
    alive: true,
    points: 100,
    count: 0,

    move: function () {
        if (this.alive) {
            this.x -= 1;
            if (this.x < -this.w) {
                this.x = 1500;
            }
        }
    },

    draw: function () { //draw the alien to his new position
        if (this.x < GAME_W - this.w) {
            canvas.clearRect(this.x, this.y, this.w + 10, this.h + 10);

            if (this.alive) { //draw the alien
                canvas.drawImage(ship, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
            } else if (!this.alive) { //draw the explosion
                canvas.drawImage(pic, SPRITE_WIDTH * 3, SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_HEIGHT,
                    this.x, this.y, this.w, this.h);

                drawTextCentered(canvas, "100", this.x + (this.w / 2), this.y - 10, 20);
                this.count++;
                if (this.count > 20) {
                    this.alive = true;
                    this.x = 1500;
                    this.count = 0;
                }
            }
        }
    },

    destroy: function () { //kill the alien
        this.alive = false;
        canvas.clearRect(this.x, this.y, this.w + 10, this.h + 10);
        Game.refreshScore(this.points, false);
    }
}

function checkCollision(obj1, obj2) {
    if ((obj1.alive && obj2.alive) && (obj1.x >= obj2.x && obj1.x <= (obj2.x + obj2.w)) && (obj1.y >= obj2.y && obj1.y <= (obj2.y + obj2.h))) {
        obj1.destroy();
        obj2.destroy();
        return true;
    }
    return false;
}

const Alien = function (aType, aLine, aCol) {
    this.type = aType;
    this.points = 40 - 10 * aType;
    this.line = aLine;
    this.column = aCol;
    this.alive = true;
    this.w = SPRITE_WIDTH;
    this.h = SPRITE_HEIGHT;
    this.x = 138 + this.w * this.column;
    this.y = 138 + 41 * this.line;
    this.direction = 1;
    this.frame = 0;
    this.count = 0;

    this.changeFrame = function () { //change the animation frame (2 different images for each alien)
        this.frame = !this.frame ? SPRITE_HEIGHT : 0;
    };

    this.down = function () { //down the alien after changing direction
        this.y = this.y + 14;
    };

    this.move = function () { //set new position after moving and draw the alien
        if (this.y >= Game.height - 50) {
            Game.over();
        }
        this.x += (5 * Game.direction);
        this.changeFrame();
        //if (this.alive)
        this.draw();
    };

    this.draw = function () { //Update alien sprite
        if (this.alive) { //Only alien sprite if alive
            canvas.drawImage(pic, this.w * (this.type - 1), this.frame, this.w, this.h,
                this.x, this.y, this.w, this.h);
        } else if (!this.alive && this.count < 1) {
            canvas.drawImage(pic, SPRITE_WIDTH * 3, SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_HEIGHT,
                this.x, this.y, SPRITE_WIDTH, SPRITE_HEIGHT);
            this.count++;
        }
    };

    this.destroy = function () { //Destroy Alien
        this.alive = false;
        canvas.clearRect(this.x, this.y, this.w, this.h);
        Game.refreshScore(this.points, true);
    }
};

const Player = {
    width: SPRITE_WIDTH,
    height: SPRITE_HEIGHT,
    position: 220,//only moves on x axis
    toleft: false,
    toright: false,
    speed: 5,
    count: 0,

    init: function () { //initialize player and move
        this.toLeft();
        this.toRight();
        this.draw();
        setInterval("Player.toLeft()", 30);
        setInterval("Player.toRight()", 30);
    },

    draw: function () { //Draw player
        canvas.clearRect(0, PLAYER_Y_POS, Game.width, SPRITE_HEIGHT);
        canvas.drawImage(pic, SPRITE_WIDTH * 3, 0, SPRITE_WIDTH, SPRITE_HEIGHT, this.position, PLAYER_Y_POS, SPRITE_WIDTH, SPRITE_HEIGHT);
    },

    fire: function () { //shot
        this.ray.create();
    },

    toLeft: function () { //moves player left
        if (this.toleft) {
            if (this.position - 5 > 0) {
                this.position -= this.speed;
            }
        }
    },

    toRight: function () { //moves player right
        if (this.toright) {
            if (this.position + this.width + 5 < Game.width) {
                this.position += this.speed;
            }
        }
    },

    ray: { //Player weapon
        x: 0,
        y: PLAYER_Y_POS - 10,
        length: 5,
        speed: 15,
        animation: null,
        alive: false,
        create: function () { //created the ray if it does not exist
            if (!this.alive) {
                this.x = Player.position + 14;
                this.alive = true;
                this.animation = setInterval("Player.ray.animate()", this.speed);
                Game.shotsfired++;
                FX_LASER.play();
            }
        },
        animate: function () { //animate the ray
            this.y -= this.length;
            if (this.y <= 5) {
                this.destroy();
                Game.shotsmissed++;
                accuracyPercentage();
            }
            else {
                Game.drawAliens();
                this.draw();
            }
        },
        draw: function () { //draw the ray and check collision with aliens
            if (this.alive) {
                canvas.beginPath();
                canvas.strokeStyle = 'white';
                canvas.lineWidth = 2;
                canvas.moveTo(this.x, this.y);
                canvas.lineTo(this.x, this.y + this.length);
                canvas.stroke();
            }
        },
        destroy: function () { //destroy the ray
            accuracyPercentage();
            this.y = PLAYER_Y_POS - 10;
            this.alive = false;
            clearInterval(this.animation);
            this.animation = null;
            Game.drawAliens();
        },
    }
};

function accuracyPercentage() {
    if (Game.shotsmissed > 0)
        Game.accuracy = parseInt(((Game.shotsfired- Game.shotsmissed) / Game.shotsfired) * 100);
    else if(Game.shotsmissed <=0 && Game.shotsfired>0)
        Game.oaccuracy = 0;

    console.log('accuracy', Game.accuracy);
    console.log('shotsfired', Game.shotsfired);
    console.log('shotsmissed', Game.shotsmissed);
}

const Game = {
    types: [1, 2, 2, 3, 3], //define kinds of aliens
    aliens: [[11], [11], [11], [11], [11]],
    height: 0,
    width: 0,
    interval: 0,
    intervalDefault: 1000,
    direction: 1,
    animation: null,
    alives: 0,
    score: 0,
    highscore: 0,
    level: 1,
    accuracy: 100,
    shotsfired: 0,
    shotsmissed: 0,

    init: function (aWidth, aHeight) { //initialize default position and behaviour
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 11; j++) {
                this.aliens[i][j] = new Alien(this.types[i], i, j);
                this.alives++;
                this.aliens[i][j].draw();
            }
        }
        this.width = aWidth;
        this.height = aHeight;
        this.play();
        Player.init();
        this.refreshScore(0, false);
        this.highscore=localStorage.getItem("spaceinvaders-highscore");
    },

    changeDirection: function () { //change the direction (left or right)
        if (this.direction == 1) {
            this.direction = -1;
        } else {
            this.direction = 1;
        }
    },
    clearCanvas: function () { //clear the canvas (but not the player)
        canvas.clearRect(0, 0, this.width, this.height - SPRITE_HEIGHT);
    },
    closeToLeft: function () { //check if the aliens reach the left border
        return (this.aliens[0][0].x - 10 < 0) ? true : false;
    },
    closeToRight: function () { //check if the aliens reach the right border
        return (this.aliens[4][10].x + SPRITE_WIDTH + 10 > this.width) ? true : false;
    },
    drawAliens: function () { //draw the aliens
        this.clearCanvas();
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 11; j++) {
                this.aliens[i][j].draw();
            }
        }
    },
    animate: function () { //move the aliens
        this.clearCanvas();
        Player.ray.draw();
        this.checkAliens();
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 11; j++) {
                this.aliens[i][j].move();
            }
        }
        if (this.closeToLeft() || this.closeToRight()) {
            this.changeDirection();
            for (i = 0; i < 5; i++) {
                for (j = 0; j < 11; j++) {
                    this.aliens[i][j].down();
                }
            }
            this.increaseSpeed();
        }
    },
    play: function () { //play the game	
        this.interval = this.intervalDefault;
        this.interval = this.interval - (this.level * 20);
        this.animation = setInterval("Game.animate()", this.interval);
    },
    increaseSpeed: function (newInterval) { //increase the speed
        clearInterval(this.animation);
        if (newInterval === undefined) this.interval = this.interval - 10;
        else this.interval = newInterval;
        this.animation = setInterval("Game.animate()", this.interval);
    },
    onkeydown: function (e) { //key down event        
        if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 32) e.preventDefault();//Stop page moving
        if (e.keyCode == 37) Player.toleft = true;//Move left
        else if (e.keyCode == 39) Player.toright = true;//Move right
        else if (e.keyCode == 32) Player.fire();
        else return;
    },
    onkeyup: function (ev) { //key up event
        if (ev.keyCode == 37) Player.toleft = false;
        else if (ev.keyCode == 39) Player.toright = false;
        else return;
    },
    over: function () { //ends the game
        clearInterval(this.animation);
        canvas.clearRect(0, 0, this.width, this.height);
        canvas.font = "40pt Calibri,Geneva,Arial";
        canvas.strokeStyle = "rgb(FF,0,0)";
        canvas.fillStyle = "rgb(0,20,180)";
        canvas.strokeText("Game Over", this.width / 2 - 150, this.height / 2 - 10);
    },
    checkAliens: function () { //check number of aliens
        if (this.alives == 0) this.nextLevel();
        else if (this.alives == 1) this.increaseSpeed(150 - (this.level * 10));
        else if (this.alives <= 10) this.increaseSpeed(200 - (this.level * 10));
        else if (this.alives <= 10) this.increaseSpeed(300 - (this.level * 10));
        else if (this.alives <= 25) this.increaseSpeed(500 - (this.level * 10));
    },
    refreshScore: function (points, alien) { //display the score
        if (alien) this.alives--;
        this.score += points;

        //Store high scores
        var newScore = Math.max(this.score, this.highscore);
        if (newScore>this.highscore){
            this.highscore=newScore;
            localStorage.setItem("spaceinvaders-highscore", this.highscore);
			document.getElementById("scoreID").innerHTML=parseInt(localStorage.getItem("spaceinvaders-highscore")) || 0;
        }
    },
    nextLevel: function () {
        //resurect aliens
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 11; j++) {
                this.aliens[i][j].alive = true;
                this.alives++;
            }
        }
        clearInterval(this.animation);
        this.level++;
        this.play();
        this.increaseSpeed(this.interval);
    }
};

var border = 25;

HUD = {
    x: GAME_W + border,
    y: 0,
    width: 0,
    height: 0,
    box_x: document.getElementById('aliensCanvas').width - (border * 2) - 210,
    box_w: 150,
    box_h: 50,
    box_gap: 70,

    init: function () {

        canvas.strokeStyle = "white";
        canvas.rect(this.x, border, document.getElementById('aliensCanvas').width - Game.width - (border * 2), document.getElementById('aliensCanvas').height - (border * 2));
        canvas.stroke();

        drawTextCentered(canvas, "Space Invaders JS", 1000, 100, 50);//Title
        drawText(canvas, "Level: ", 850, 285, 35);//Labels
        drawText(canvas, "Score: ", 850, 355, 35);
        drawText(canvas, "Aliens: ", 850, 425, 35);
        drawText(canvas, "Accuracy: ", 850, 495, 35);
    },

    draw: function () {
        for (var i = 0; i < 4; i++) {
            roundRect(canvas, this.box_x, 250 + this.box_gap * i, this.box_w, this.box_h, 10, true, true);//Boxes
        }

        drawTextCentered(canvas, Game.level, 1095, 285, 35);//Numbers
        drawTextCentered(canvas, Game.score, 1095, 355, 35);
        drawTextCentered(canvas, Game.alives, 1095, 425, 35);
        drawTextCentered(canvas, Game.accuracy + "%", 1095, 495, 35);
    }
}

//define the global context of the game
var element = document.getElementById('aliensCanvas');

if (element.getContext) {
    var canvas = element.getContext('2d');

    var pic = new Image();
    pic.src = 'game-spaceinvaders/spritesheet.png';

    var ship = new Image();
    ship.src = 'game-spaceinvaders/mothershipred.png';

    Game.init(GAME_W, GAME_H);//1.38 scale, was 530x500

    document.body.onkeydown = function (ev) {
        Game.onkeydown(ev);
    };
    document.body.onkeyup = function (ev) {
        Game.onkeyup(ev);
    };
}

// Draw box with rounded corners
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.fillStyle = "#000";//fill black
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}

// Draw text
function drawTextCentered(ctx, txt, x, y, size) {
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 3;
    //ctx.font = size + "px Teko";
    ctx.font = size + "px Calibri,Geneva,Arial";
    var textWidth = ctx.measureText(txt).width;
    ctx.fillText(txt, x - (textWidth / 2), y);
    ctx.strokeText(txt, x - (textWidth / 2), y);
}

function drawText(ctx, txt, x, y, size) {
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    ctx.font = size + "px Calibri,Geneva,Arial";
    ctx.fillText(txt, x, y);
    ctx.strokeText(txt, x, y);
}

function init() {
    canvas.fillStyle = "#blue";
    canvas.fillRect(0, 0, canvas.width, canvas.height);
    HUD.init();
}

init();

function update() {
    Mothership.move();

    for (i = 0; i < 5; i++) {
        for (j = 0; j < 11; j++) {
            if(checkCollision(Player.ray, Game.aliens[i][j])){
                if(!mute) FX_EXPLOSION.play();
            }
        }
    }
    if(checkCollision(Player.ray, Mothership)){
        if(!mute) FX_BONUS.play();
    }
}

function draw() {
    canvas.fillStyle = "#000";
    canvas.fillRect(0, 0, canvas.width, canvas.height);
    Mothership.draw();
    Player.draw();
    HUD.draw();//draw heads up display
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
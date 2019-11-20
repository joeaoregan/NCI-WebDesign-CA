// Ship
const player1 = new Image();
player1.src="antibody/art/Player1Ship.png";

const fireFX = new Audio();
fireFX.src = "antibody/audio/laser1.wav";

const MAX_HEALTH=5;
const MAX_LIVES=3;
const HEALTHBAR_W=75;
const HEALTHBAR_H=10;
const HEALTHBAR_X=10;
const HEALTHBAR_Y=-15;

const ship ={
	// Sprite dimensions
    sX: 0,
    sY: 0,
    w: 100,
    h: 47,
	
    x: 0,
    y: 275,

	speed: 5,
    dx: 0,
	dy: 0,
	fireRate: 0,
	lastFire: 0,
	fireDelay: 10,
	lives: MAX_LIVES,
	health: MAX_HEALTH,
	flashDown: true,
	flashCount: 0,
	flashTimes: 0,
	flashing: false,
	
	alpha: 1.0,
	
    draw : function(){
		ctx.globalAlpha = this.alpha;
		ctx.drawImage(player1, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
		ctx.globalAlpha = 1.0;
		
		ctx.globalAlpha = 0.5;
		this.healthbar();
		ctx.globalAlpha = 1.0;
		
		this.flash();
	},
	
	flash: function(){
		if(this.flashCount<this.flashTimes){
			if(this.alpha>=0.0 && this.flashDown){
				this.alpha-=0.05;
				if(this.alpha<=0.0){
					//this.flashUp=true;
					this.flashDown=false;
				}
			}
			//if(this.alpha<=1.0 && this.flashUp){
			if(this.alpha<=1.0 && !this.flashDown){
				this.alpha+=0.05;
				if(this.alpha>=1.0){
					//this.flashUp=false;
					this.flashDown=true;
					
					this.flashCount++;
				}
			}
		}else{
			this.flashing=false;
		}
	},
	
	flashThisMany(time){
		this.flashCount=0;
		this.flashTimes=time;
		this.flashing=true;
	},
	
	healthbar: function(){
		//ctx.fillStyle = "#70c5ce";
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "black";
		ctx.rect(this.x+10,this.y-15,HEALTHBAR_W,HEALTHBAR_H);
		ctx.stroke();
		
		//ctx.beginPath();
		ctx.fillStyle = "#990000";
		//ctx.rect(this.x-10,this.y,100,10);
		ctx.fillRect(this.x+HEALTHBAR_X,this.y+HEALTHBAR_Y,HEALTHBAR_W,HEALTHBAR_H);
		
		ctx.fillStyle = "#009900";
		//ctx.rect(this.x-10,this.y,100,10);
		ctx.fillRect(this.x+HEALTHBAR_X,this.y+HEALTHBAR_Y,HEALTHBAR_W*this.health/MAX_HEALTH,HEALTHBAR_H);		
	},
	
	update: function(){
		if(state.current == state.game) {
			this.fireRate++;
			
			this.x += this.dx;		
			this.y += this.dy;
			
			if (this.x < 0){
				this.x=0;		
			}
			if (this.y<40){
				this.y=40;
			}
			if (this.y>520){
				this.y=520;
			}
		}
		
		if(state.current===state.over){
			this.reset();
		}
	},

	fire: function(){
		if(this.fireRate>this.lastFire+this.fireDelay){
			var x = new laser(this.x+this.w-20,this.y+this.h/2,10,1,"LaserGreen");
			lasers.push(x);
			//console.log('lasers'+lasers.length);
			fireFX.play();
			this.lastFire=this.fireRate;
			//console.log('fireRate: '+this.fireRate+' lastFire: '+this.lastFire);
		}
	},
	
	updateHealth: function(){
		if(!this.flashing){
			if(this.health>1){
				this.health--;
				this.flashThisMany(2);
				navigator.vibrate([300, 100, 300, 100, 300]);//vibrate mobile device if hit
			} else {
				this.lives--;
				console.log('Player Life Lost - Lives: ',this.lives);
				if (this.lives>0){
					this.flashThisMany(5);
					this.health=MAX_HEALTH;
				}
			}
		}
		
		if(this.lives<=0){
			state.current=state.over;
			this.reset();
		}
		
		if(this.lives==1){
			spawnLife();
		}
		//console.log('SHIP HIT - Health: ', ship.health);
	},
	
	reset(){		
		this.x=0;
		this.y=275;
		this.dx=0;
		this.dy=0;
		this.fireRate=0;
		this.lastFire=0;
		this.lives=MAX_LIVES;
		this.health=MAX_HEALTH;
		this.alpha=1.0;
		this.flashCount=0;
		this.flashTimes=0;
		this.flashing=false;
	}
}
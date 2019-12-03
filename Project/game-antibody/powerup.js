const powerupFX = new Audio();
powerupFX.src = "game-antibody/audio/Bonus1.wav";

class powerup{
	constructor(sprite){
		//sprite
		this.sprite=new Image();
		this.sprite.src="game-antibody/art/"+sprite+".png";
		this.sX=0;
		this.sY=0;
		this.w=100;
		this.h=55;
		if(sprite=='PowerUpLife'){
			this.w=60;
			this.h=29;
		}
		
		this.x=1280 + (Math.floor(Math.random()*10)+1)*75;
		this.y=60 + (Math.floor(Math.random()*10)*44);
		this.degrees=Math.floor(Math.random()*360);
		//this.speed=Math.floor(Math.random()*4)+1;
		this.speed=1;
		this.direction=Math.floor(Math.random()*10);
		console.log('power up created');
		
		this.active=false;
	}
	
	draw(){
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x+this.w/2, this.y+this.h/2);
		
		ctx.rotate(this.degrees*Math.PI/180);
		ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
		ctx.restore();
	}
	
	update(){
		if(this.active){
			this.degrees+=(this.direction%2==0)?1:-1; // clockwise/anti-clockwise
			this.degrees%=360;
			this.x-=this.speed;
				
			if(this.x<-this.w){	// When the it moves off screen (left)
				this.reset();
			}
			
			if(collision(ship, this)){
				navigator.vibrate([100, 50, 100, 50, 100, 50, 400]);//vibrate mobile device if power up collected
				this.reset();
				if(ship.lives<3){
					ship.lives++;
					if (!mute) powerupFX.play();
				}
			}
		}
				
		if(state.current===state.over){
			this.active=false;//If the game is over, remove from screen
		}
	}
	
	reset(){
		this.active=false;
		this.x=1280 + (Math.floor(Math.random()*10)+1)*75;
		this.y=60 + (Math.floor(Math.random()*10)*44);
		this.direction=Math.floor(Math.random()*10);
		this.speed=Math.floor(Math.random()*4)+1;
		this.degrees=Math.floor(Math.random()*360);
	}
}
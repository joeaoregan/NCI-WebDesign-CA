const enemySprite = new Image();
enemySprite.src="art/EnemySpriteSheet.png";

const enemyFireFX = new Audio();
enemyFireFX.src = "audio/LaserEnemy.wav";

const enemyShip = {
	//sprite: new Image(),
    animation : [
        {sX: 0, sY : 0},
        {sX: 120, sY : 0},
        {sX: 240, sY : 0},
        {sX: 360, sY : 0}
    ],
    x : 1200,
    y : 300,
    w : 120,
    h : 50,        
    frame : 0,    
    speed : -5,
	fireRate: 0,
	lastFire: 0,
	fireDelay: 60,
    
    draw : function(){
        let enemy = this.animation[this.frame];        
		ctx.drawImage(enemySprite, enemy.sX, enemy.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    },
    
    update: function(){   
		if(state.current===state.game) {
			this.period = state.current == state.getReady ? 10 : 5; // If the game state is GET READY state, the enemy moves slow        
			this.frame += frames%this.period == 0 ? 1 : 0; 			// Increment frame by 1, each period        
			this.frame = this.frame%this.animation.length; 			// Frame loops 0 to 3
			
			if(state.current == state.getReady){
				this.y = 300; // Reset enemy position
				this.x = 1200;
			}else{
				this.x += this.speed;
				
				if(this.x<-this.w){	// When the enemy moves off screen (left)
					this.reset();
				}
			}
			this.fireRate++;
			this.fire();
		} else {
			this.reset();
		}
    },
	
    speedReset : function(){
         this.speed = 0;
    },

	fire: function(){
		if(this.fireRate>this.lastFire+this.fireDelay && this.x<1100){			
			var x = new laser(this.x-20,this.y+this.h/2,10,-1,"LaserBlue");
			lasers.push(x);
			//console.log('lasers'+lasers.length);
			enemyFireFX.play();
			this.lastFire=this.fireRate;
			//console.log('fireRate: '+this.fireRate+' lastFire: '+this.lastFire);
		}
	},
	
	reset(){
		if(state.current!=state.game){
			this.x=1200;
			this.y=300;
		} else {
			this.x=canvas.width;
			this.y=Math.round(Math.random()*(SCREEN_HEIGHT-this.h-70)+35);
		}
	}
}
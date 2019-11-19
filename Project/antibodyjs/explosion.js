const explosionFX = new Audio();
explosionFX.src = "audio/explosion.wav";

const splashFX = new Audio();
splashFX.src = "audio/splash.wav";

class explosion {
	constructor(x,y,dimension,numFrames,name){
		this.explosionSprite=new Image();		
		this.explosionSprite.src="art/"+name+".png";
		this.x=x;
		this.y=y;
		this.w=dimension;
		this.h=dimension;
		this.frame=0;
		this.speed=5;
		this.animation=[];
		
		for (var i = 0; i < numFrames; i++) {
			this.animation[i] = {sX: i*dimension, sY : 0};
		}	
	}
	
    draw(){
        let explosion = this.animation[this.frame];        
		ctx.drawImage(this.explosionSprite, explosion.sX, explosion.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
    
    update(){              
        this.frame += frames%this.speed == 0 ? 1 : 0; 	// Increment every 5 frames      
        this.frame = this.frame%this.animation.length; 	// Frame loops 0 to 11
    }
}
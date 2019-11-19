const bcImg = new Image();
bcImg.src = "art/BloodCell.png";

class bloodcell{
	constructor(){
		this.x=1280 + (Math.floor(Math.random()*10)+1)*75;
		this.y=60 + (Math.floor(Math.random()*10)*44);
		//this.x=600;
		//this.y=300;
		this.w=100;
		this.h=55;
		this.sX=0;
		this.sY=0;
		this.degrees=Math.floor(Math.random()*360);
		this.speed=Math.floor(Math.random()*4)+1;
		this.direction=Math.floor(Math.random()*10);
	}
	
	draw(){
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x+this.w/2, this.y+this.h/2);
		
		ctx.rotate(this.degrees*Math.PI/180);
		ctx.drawImage(bcImg, this.sX, this.sY, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
		ctx.restore();
	}
	
	update(){
		this.degrees+=(this.direction%2==0)?1:-1; // clockwise/anti-clockwise
		this.degrees%=360;
		this.x-=this.speed;
			
		if(this.x<-this.w){	// When the enemy moves off screen (left)
			this.reset();
		}
	}
	
	reset(){
		this.x=1280 + (Math.floor(Math.random()*10)+1)*75;
		this.y=60 + (Math.floor(Math.random()*10)*44);
		this.direction=Math.floor(Math.random()*10);
		this.speed=Math.floor(Math.random()*4)+1;
		this.degrees=Math.floor(Math.random()*360);
	}
}
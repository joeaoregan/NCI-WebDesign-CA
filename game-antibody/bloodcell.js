/*
bloodcell.js
Joe O'Regan
Create the rotating blood cells
*/

const bcImg = new Image();//bloodcell image
bcImg.src = "game-antibody/art/BloodCell.png";//get sprite from art folder

class bloodcell{
	constructor(){
		this.x=1280 + (Math.floor(Math.random()*10)+1)*75;//Random start point off screen
		this.y=60 + (Math.floor(Math.random()*10)*44);//Random height on screen (60: height of panel at top of canvas, and random interval of 44 pixels up to 440, keeps within bottom panel on canvas)
		//this.x=600;//Test with fixed values for position
		//this.y=300;
		this.w=100;//Sprite width
		this.h=55;//Sprite height
		this.sX=0;//Sprite x start point (not a sprite sheet like flappy birds or space invaders games)
		this.sY=0;//Sprite y start point
		this.degrees=Math.floor(Math.random()*360);//Random rotation start point
		this.speed=Math.floor(Math.random()*4)+1;//Random speed between 1 and 4
		this.direction=Math.floor(Math.random()*10);//Random rotation direction
	}
	
	/*
		Bloodcells rotate forwards and backwards
	*/
	draw(){
		// Rotation: https://www.w3schools.com/graphics/game_rotation.asp
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x+this.w/2, this.y+this.h/2);
		ctx.rotate(this.degrees*Math.PI/180);
		ctx.drawImage(bcImg, this.sX, this.sY, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
		ctx.restore();
	}
	
	/*
		Update the degress to display the bloodcell, and move acroos screen
	*/
	update(){
		this.degrees+=(this.direction%2==0)?1:-1; // Even number clockwise/Uneven number anti-clockwise
		this.degrees%=360;//Start count from 0 again, once it degrees goes to 360 or higher
		this.x-=this.speed;//Move the bloodcell (on x-axis, right to left)
			
		if(this.x<-this.w){	// When the enemy moves off screen (left)
			this.reset();//Reset variables
		}
	}
	
	/*
		Reset position, direction, speed, and new random rotation start point
	*/
	reset(){
		this.x=1280 + (Math.floor(Math.random()*10)+1)*75;//Start off screen and a multiple of 75 pixels apart, to give different start points
		this.y=60 + (Math.floor(Math.random()*10)*44);//Space out in 44 pixel intervals (I can't remember what fraction of the screen height this is)
		this.direction=Math.floor(Math.random()*10);//Rotation direction (even clockwise/uneven anti-clockwise)
		this.speed=Math.floor(Math.random()*4)+1;//Random speed between 1 and 4 pixels/frame
		this.degrees=Math.floor(Math.random()*360);//Random rotation start point
	}
}
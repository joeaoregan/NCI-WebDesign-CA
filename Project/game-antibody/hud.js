const lifeP1 = new Image();
lifeP1.src="game-antibody/art/Player1ShipSmall.png";

const P1Box={
	w: 200,
	h: 50,
	y: 625,
	x: 25,
	lifeTxt: '',
	lifeTxtWidth: 0
}

const life={
	y:23,
	w:50,
	h:25
}

class hud {	
	constructor(){		
		this.sX=0;
		this.sY=0;
		
		this.w=50;
		this.h=25;
		this.x=25;
		this.y=625;
	}
	
	draw(){		
		//HUD outline
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "black";
		ctx.rect(0,600,1280,120);
		ctx.stroke();
		
		this.p1Lives();
		this.name();
		
		bcCounter.bar();
	}

	/*
	Show the name the player entered when prompted at the start of the game
	*/
	name() {
		var xPos=1070;
		var label='Name:';
		ctx.lineWidth = 2;
		ctx.font = "25px Teko";
        ctx.fillStyle = "#FFF";
		
		var textWidth=ctx.measureText(label).width;

		ctx.fillText(label,xPos - (textWidth/2), 640);
		ctx.strokeText(label,xPos - (textWidth/2),640);
		
		ctx.font = "35px Teko";

		var username= (player.name || 'No Name')
		textWidth=ctx.measureText(username).width;
		ctx.fillText(username,xPos - (textWidth/2), 675);
		ctx.strokeText(username,xPos - (textWidth/2), 675);

	}
	
	p1Lives(){
		// Player 1: Lives
		ctx.fillStyle = "#991122";
		ctx.fillRect(P1Box.x, P1Box.y, P1Box.w, P1Box.h);
	
		ctx.beginPath();
		ctx.lineWidth="1";
		ctx.strokStyle="grey";
		ctx.rect(P1Box.x,P1Box.y,P1Box.w,P1Box.h);
		ctx.stroke();
		
		if(ship.lives>=3)
			ctx.drawImage(lifeP1, this.sX, this.sY, this.w, this.h, P1Box.x+(P1Box.w*3/3)-(life.w/2)-P1Box.w*1/6, P1Box.y+life.y, life.w, life.h);
		if(ship.lives>=2)
			ctx.drawImage(lifeP1, this.sX, this.sY, this.w, this.h, P1Box.x+(P1Box.w*2/3)-(life.w/2)-P1Box.w*1/6, P1Box.y+life.y, life.w, life.h);
		if(ship.lives>=1)
			ctx.drawImage(lifeP1, this.sX, this.sY, this.w, this.h, P1Box.x+(P1Box.w*1/3)-(life.w/2)-P1Box.w*1/6, P1Box.y+life.y, life.w, life.h);
		
		ctx.lineWidth = 1;
		ctx.font = "25px Teko";
        ctx.fillStyle = "#FFF";
		
		P1Box.lifeTxt='Lives';
		P1Box.lifeTxtWidth=ctx.measureText(P1Box.lifeTxt).width;
		
		ctx.fillText(P1Box.lifeTxt, P1Box.x+(P1Box.w/2)-(P1Box.lifeTxtWidth/2), P1Box.y+18);
		ctx.strokeText(P1Box.lifeTxt, P1Box.x+(P1Box.w/2)-(P1Box.lifeTxtWidth/2), P1Box.y+18);
	}
}

const bcCounter= {
	w: 400,
	h: 50,
	x: (canvas.width/2)-200,
	y: 625,
	barText: 'Bloodcell Count',
	textWidth: 0,
	
	bar: function(){
		//ctx.fillStyle = "#70c5ce";
		ctx.beginPath();
		ctx.lineWidth = "3";
		ctx.strokeStyle = "black";//Outline
		ctx.rect(this.x,this.y,this.w,this.h);
		ctx.stroke();
		
		//ctx.beginPath();
		ctx.fillStyle = "#666";//Black
		//ctx.rect(this.x-10,this.y,100,10);
		ctx.fillRect(this.x,this.y,this.w,this.h);
		
		ctx.fillStyle = "#F12";//Red
		//ctx.rect(this.x-10,this.y,100,10);
		ctx.fillRect(this.x,this.y,this.w*(MAX_BLOODCELLS-bloodcellsDestroyed)/MAX_BLOODCELLS,this.h);
		//ctx.fillRect(this.x+HEALTHBAR_X,this.y+HEALTHBAR_Y,HEALTHBAR_W*this.health/MAX_HEALTH,HEALTHBAR_H);
		
		ctx.lineWidth = 2;
		ctx.font = "35px Teko";
        ctx.fillStyle = "#FFF";
		
		this.textWidth=ctx.measureText(this.barText).width;
				
		ctx.fillText(this.barText, this.x+((this.w-this.textWidth)/2), this.y+35);
		ctx.strokeText(this.barText, this.x+((this.w-this.textWidth)/2), this.y+35);
	}
}

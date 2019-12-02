class laser {	
	constructor(x,y,speed,direction,img){
		this.sprite=new Image();
		this.img=img;
		this.sprite.src="antibody/art/"+this.img+".png";
		
		this.sX=0;
		this.sY=0;
		this.w=50;
		this.h=5;
		this.x=x;
		this.y=y;
		
		this.speed=speed;
		this.direction=direction;
	}
	
	draw(){
		ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
	}

	update(){
		this.x += (this.speed*this.direction);
		
		for (var i = 0; i < lasers.length; i++) {
			
			if(lasers[i] === this && (this.x > canvas.width+this.w || this.x<-this.w)){
				lasers.splice(i,1);				
			}
			
			if(lasers[i] === this && (collision(lasers[i], enemyShip)) && lasers[i].img=="LaserGreen"){
				console.log('COLLISION!');
				lasers.splice(i,1);
				score.value++;
				player.score=score.value;//set the players score
				console.log('checking high score  -  current high score: ' + score.high)
				var newHighScore = Math.max(score.value, score.high);
				console.log(newHighScore);

				/*
				If there is a new High Score the player's details are stored locally as a json object
				The high score is updated on the accordion below the canvas
				*/
				if(newHighScore>score.high){
					console.log('new high score')
					player.score=newHighScore;
					localStorage.setItem("antibody-highscore-json",JSON.stringify(player));
					document.getElementById("scoreID").innerHTML=player.score + ' (' + player.name + ')';
				}
				
				var ex = new explosion(this.x+this.w,this.y-enemyShip.h/2,96,12,'Explosion'); // create explosion
				navigator.vibrate([500]);//vibrate mobile device if explosion
				explosions.push(ex);
				explosionFX.play();
				enemyShip.reset();
			}
			
			for(var j=0; j<bloodcells.length;j++){
				if(lasers[i] === this && (collision(lasers[i], bloodcells[j]))){
					lasers.splice(i,1);
					var ex = new explosion(this.x+this.w,this.y-bloodcells[j].h,128,16,'ExplosionBlood'); // create explosion
					explosions.push(ex);
					splashFX.play();
					bloodcells[j].reset();
					
					bloodcellsDestroyed++;
					console.log('Blood Cells Destroyed: ',bloodcellsDestroyed);
					navigator.vibrate([400, 100, 400]);//vibrate mobile device if bloodcell destroyed
				}				
			}
			
			if(lasers[i] === this && collision(lasers[i], ship) && lasers[i].img=="LaserBlue"){
				ship.updateHealth();
				lasers.splice(i,1);
			}
		}
		
		updateScore();
	}
}
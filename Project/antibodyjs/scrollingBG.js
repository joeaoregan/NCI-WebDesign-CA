// Background
const background = new Image();
background.src="art/background720.png";

const scrollingBG = {
    sX: 0,
    sY: 0,
    w: 1280,
    h: 600,
    x: 0,
    y: 0,    
    dx : 2,
    
    draw : function(){
        ctx.drawImage(background, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);        
        ctx.drawImage(background, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    },
    
    update: function(){
        //if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w);
        //}
    }
}
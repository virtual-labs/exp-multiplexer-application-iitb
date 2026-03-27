var outgate = function (canvasId, x, y) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.outx = x + 30;
    this.drawlink = 0;
    this.xin1 = x;
    this.yin1 = y;
    this.ou = 0;
}

outgate.prototype.draw = function () {
    var x = this.x;
    var y = this.y;
    

    this.context.beginPath();

    this.context.arc(x + 15, y, 15, 0, 2 * Math.PI, false);

    this.context.lineWidth = 2;
    this.context.strokeStyle = "black";
    if (this.ou == 0)
    {
        this.context.fillStyle = "#888";
    }
    else
    {
        this.context.fillStyle = "green";
    }
    
    this.context.fill();
    this.context.stroke();
   
}

outgate.prototype.setip1 = function (ipval) {
    this.ip = ipval;
    this.output();
}

outgate.prototype.outlink = function (gate, inputno, drawlink) {
    this.gate = gate;
    this.linkip = inputno;
    this.drawlink = drawlink;
    if (drawlink == 1) {
        this.drawoutlink();
    }

}

outgate.prototype.drawoutlink = function () {
    var x;
    var y;
     if (this.linkip == 1) {
        x = this.gate.xin1;
        y = this.gate.yin1;
    }
     else if (this.linkip == 2)
    {
         x = this.gate.xin2;
         y = this.gate.yin2;
    }
   else  if (this.linkip == "S")
    {
         x = this.gate.Sx;
         y = this.gate.Sy;
        
    }   
    else if (this.linkip == "E")
    {
         x = this.gate.Ex;
         y = this.gate.Ey;
    }   
    else if (this.linkip == 3)
    {
        x=this.gate.xin3;
        y=this.gate.yin3;
    }
   
   
  
    var x3 = (this.outx + x) / 2;
    var y3=(this.y + y) / 2;
    
  /*  if(this.x>=x)
    {   
        this.context.beginPath();
        this.context.moveTo(this.outx,this.y);
        this.context.lineTo(this.outx+5,this.y);
        this.context.lineTo(this.outx+5,y3);
        this.context.lineTo(x-10,y3);
        this.context.lineTo(x-10,y);
        this.context.lineTo(x,y);
        
    }
    else{ */
    this.context.beginPath();
    this.context.moveTo(this.outx, this.y);
    
    this.context.lineTo(x3, this.y);
    this.context.lineTo(x3, y);
    this.context.lineTo(x, y);
    console.log(x,y);
    console.log(this.gate.Sx,this.gate.Sy);

    
    //this.context.closePath();

    if (this.ou == 1) {
        this.context.strokeStyle = "green";
    }
    else {
        this.context.strokeStyle = "grey";
    }
    /*this.context.moveTo(this.gate.Sx,this.gate.Sy);
    this.context.lineTo(this.gate.Ex,this.gate.Ey);*/

    this.context.lineWidth = 3;
    this.context.stroke();

}

outgate.prototype.output = function () {

    if (this.ip == 1) {
        if (this.linkip == 1) {
            if (!this.gate) {

            }
            else {
                this.gate.setip1(1);

            }
        }
        else if(this.linkip == 2){
            this.gate.setip2(1);
            
        }
        else if(this.linkip == "S"){
            this.gate.setipS(1);
          
            
        }
        else if(this.linkip == "E"){
            this.gate.setipE(1);
            
        }
        else if(this.linkip == 3){
            this.gate.setip3(1);
            
            
        }
        this.ou = 1;

    }

    else if (this.ip == 0) {
        if (this.linkip == 1) {
            if (!this.gate) {

            }
            else {
                this.gate.setip1(0);
                
            }
        }
        else if(this.linkip == 2){
            this.gate.setip2(0);
            
        }
        else if(this.linkip == "S"){
            this.gate.setipS(0);
            
            
        }
        else if(this.linkip == "E"){
            this.gate.setipE(0);
            
        }
        else if(this.linkip == 3)
        {
            this.gate.setip3(0);
        }

        this.ou = 0;
    }
    
    if (this.drawlink == 1) {
        this.drawoutlink();
    }
}

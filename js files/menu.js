class Menu{

constructor(){
this.title=createElement('h2');
this.title.html("Need For Speed!");
this.title.position(displayWidth/2-50, 0);

this.input=createInput("Name");
this.input.position(displayWidth/2-40,displayHeight/2-80)


this.button=createButton("Play!");
this.button.position(displayWidth/2+30, displayHeight/2);





}

display(){
    
background('blue');
this.button.mousePressed(()=>{

gamestate=1;
this.input.hide();
this.button.hide();
this.title.hide();








})





}


}
var player,playerImg1,playerImg2,playerImg3;
var gamestate;
var menu;
var ground;
var backgroundImg,carImg;
var boosterImg,obstacleImg,reducerImg;
var obstaclesGroup,boostersGroup,reducersGroup;
var life=3,lifeImg;
var speed=3;
var count=0;
var flag=0;
var restart;
var switchOn,switchOff,switchOnImg,switchOffImg ;
var score=0;


function preload(){
    backgroundImg=loadImage("images/track.jpg");
    carImg=loadImage("images/car.png");
    boosterImg=loadImage("images/booster.png");
    reducerImg=loadImage("images/reducer.png");
    obstacleImg=loadImage("images/obstacle.png");
    switchOnImg=loadImage("images/switchon.png");
    switchOffImg=loadImage("images/switchoff.png");
    lifeImg=loadImage("images/life.png");

}
function setup(){
    createCanvas(displayWidth,displayHeight);
    menu=new Menu();
    menu.display();

 ground=createSprite(displayWidth/2,displayHeight/2);
 ground.velocityY=4;
 ground.addImage(backgroundImg);
 ground.scale=2;

player=createSprite(displayWidth/2,displayHeight/2,50,50);
player.addImage(carImg);
player.scale=0.2;

restart=createSprite(displayWidth/2,displayHeight/2+100);
restart.visible=false;
restart.addImage(switchOffImg);
obstaclesGroup=createGroup();
boostersGroup=createGroup();
reducersGroup=createGroup();
score=0;

}
function draw(){
background('yellow');
if(gamestate===1){
    
    
        if(ground.y>displayHeight*8){
            ground.y=ground.height/2;
        }
   
       player.y=camera.position.y+200;
       if(keyDown('left')){
            player.x-=speed;
       }
       if(keyDown('right')){
           player.x+=speed;
       }
       score = score + Math.round(getFrameRate()/60);
       obstacles();
       boosters();
       reducers();

       if(obstaclesGroup.isTouching(player)){
            life=life-1;
            obstaclesGroup[0].destroy();
        }
  
       if(boostersGroup.isTouching(player)){
            speed=5;
            boostersGroup[0].destroy();
            flag=1;
        }

        if(reducersGroup.isTouching(player)){
            speed=1;
            reducersGroup[0].destroy();
            flag=1;
        }

        if(flag===1){
            count=Math.round(count/frameRate());
            count=count+1;
            if(count==10){
                flag=0;
                speed=3;
                count=0;
            }
        }
        if(life===0){
           gamestate=0;
        }
        drawSprites();
        textSize(20);
        fill("green");
        text("Score: "+ score, displayWidth/2,50);
        fill("red");
        text("Life: "+ life,displayWidth/2,70);
}
else if(gamestate===0){
    textSize(80);
    text("Game Over!",displayWidth/2-120,displayHeight/2);
  
    player.visible=false;
    ground.visible=false;
    obstaclesGroup.destroyEach();
    boostersGroup.destroyEach();
    reducersGroup.destroyEach();
    ground.velocityY=0;
    restart.visible=true;
    if(mousePressedOver(restart)){
        reset();
        
    }
    if(mouseIsOver(restart)){
        restart.scale=2;
    }
    else{
        restart.scale=1;
    }
    drawSprites();
}


}


function reset(){

    gamestate=1;
    ground.visible=true;
    player.visible=true;
    ground.velocityY=4;
    restart.visible=false;
    life=3;
    speed=3;
    player.x=displayWidth/2;




    
}
function obstacles(){
   if(frameCount%60==0){
      
     var obstacle=createSprite(random(20,displayWidth-80),0,10,10);
     obstacle.velocityY=5;
     obstacle.addImage(obstacleImg);
     obstacle.lifetime=displayHeight/5;
     obstaclesGroup.add(obstacle);
     


   }

}
function boosters(){
   
    if(frameCount%200==0){
        var booster=createSprite(random(20,displayWidth-80),0,10,10);
        booster.velocityY=5;
        booster.addImage(boosterImg);
        booster.lifetime=displayHeight/5;
        boostersGroup.add(booster);
        

    }
    
    
}
function reducers(){

    if(frameCount%120==0){
        var reducer=createSprite(random(20,displayWidth-80),0,10,10);
        reducer.velocityY=5;
        reducer.addImage(reducerImg);
        reducer.lifetime=displayHeight/5;
        reducersGroup.add(reducer);
       
    }
        
    

    
}
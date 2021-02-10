
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score=0;
var survivalTime=0;
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(700,300);
  monkey=createSprite(50,200,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  ground=createSprite(350,270,1400,60);
ground.x=ground.width/2;
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
  
}


function draw() {
background(255);
 if (gameState===PLAY){
   fill("black");
   textSize(18);
   text("Score:"+score,250,50);
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,400,50)
  
  if(keyDown("space")&&monkey.y>100){
    monkey.velocityY=-10;
  } 
  monkey.velocityY=monkey.velocityY+0.8;
  
  ground.velocityX=-4;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    if(bananaGroup.isTouching(monkey)){
      score=score+1;
      bananaGroup.destroyEach();
    }
     if(obstacleGroup.isTouching(monkey)){
       
        gameState = END;
        
      
    }
  } 
  else if(gameState===END){
       ground.velocityX = 0;
      monkey.velocityY = 0
      
     
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
    }
  
  ground.shapeColor="green";
  monkey.collide(ground);
  spawnBanana();
  spawnObstacle();

 
  drawSprites();
  
}
function spawnBanana(){
  if (frameCount%80===0){
    banana=createSprite(700,100,20,20);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(80,140));
    banana.scale=0.08;
    banana.velocityX=-(4+survivalTime);
    banana.lifetime=175;
    bananaGroup.add(banana);
    
  }
  
}
function spawnObstacle(){
  if (frameCount%200===0){
    obstacle=createSprite(700,225,20,20);
    obstacle.addImage(obstacleImage);
    
    obstacle.scale=0.08;
    obstacle.velocityX=-(4+survivalTime);
    obstacle.lifetime=175;
    obstacleGroup.add(obstacle);
    
  }
  
}





var PLAY = 1;
var END= 0;
var gameState = PLAY;

var Monster_truck,Humvee;
var ground
var invisibleGround



var score;
var gameOverImg,restartImg
var message;


function preload(){
    Monster_truck = loadAnimation("Monster_truck.png");
    
    groundImage= loadImage("ground.png")
    Humvee = loadImage("Humvee.png");
    Humvee = loadImage("Humvee.png");
    Humvee = loadImage("Humvee.png");
    Humvee = loadImage("Humvee.png");
    Humvee = loadImage("Humvee.png");
    Humvee = loadImage("Humvee.png");

  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

   jumpSound = loadSound("jump.mp3")
   dieSound = loadSound("die.mp3")
   checkPointSound = loadSound("checkPoint.mp3")


}

function setup() {
createCanvas(600, 200);
 Monster_truck = createSprite(50,180,20,50);
  
  Monster_truck.addAnimation("running");
  Monster_truck.addAnimation("collided");
  
  Monster_truck.scale= 0.5;
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  

  

  //create Obstacle and Cloud Groups
 obstaclesGroup = createGroup();
 cloudsGroup = createGroup();


 Monster_truck.setCollider("rectangle",0,0,Monster_truck.width,Monster_truck.height);


score = 0;



}

function draw() {
    background(180);
    //displaying score
    text("Score: "+ score, 500,50);
   
    
    if(gameState === PLAY){
      //move the 
      gameOver.visible = false;
      restart.visible = false;

    
    
     ground.velocityX = -(4 + 3* score/100)
     //scoring
     score = score + Math.round(getFrameRate()/60);
     
     if(score>0 && score%100 === 0){
        checkPointSound.play() 

      }

      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      //jump when the space key is pressed
      if(keyDown("space")&& trex.y >= 100) {
          Monster_truck.velocityY = -12;
          jumpSound.play();
      }
      
      //add gravity
      Monster_truck.velocityY = Monster_truck.velocityY + 0.8
    
      //spawn the clouds
      spawnClouds();
    
      //spawn obstacles on the ground
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(Monster_truck)){
          //Monster_truck.velocityY = -12;
          jumpSound.play();
          gameState = END;
          dieSound.play()
        
      }
    }
     else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
       
         
  
       
        ground.velocityX = 0;
        Monster_truck.velocityY = 0
        
       
        //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
       
       obstaclesGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);    
     }
    
   
    //stop trex from falling down
    Monster_truck.collide(invisibleGround);
    if(mousePressedOver(restart))
  {
    reset();
  }
    drawSprites();
  }
  function reset()
  {
  gameState= PLAY
  gameOver.visible= false;
  restart.visible= false;
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  
  score= 0
  }
  
  function spawnObstacles(){
   if (frameCount % 60 === 0){
     var obstacle = createSprite(600,165,10,40);
     obstacle.velocityX = -(6 + score/100);
     
      //generate random obstacles
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: Humvee.addImage(Humvee);
                break;
        case 2: Humvee.addImage(Humvee);
                break;
        case 3: Humvee.addImage(Humvee);
                break;
        case 4: Humvee.addImage(Humvee);
                break;
        case 5: Humvee.addImage(Humvee);
                break;
        case 6: Humvee.addImage(Humvee);
                break;
        default: break;
      }
     
      //assign scale and lifetime to the obstacle           
      Humvee.scale = 0.5;
      Humvee.lifetime = 300;
     
     //add each obstacle to the group
      obstaclesGroup.add(obstacle);
   }
  }
  
  function spawnClouds() {
    //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
      var cloud = createSprite(600,120,40,10);
      cloud.y = Math.round(random(80,120));
      cloud.addImage(cloudImage);
      cloud.scale = 0.5;
      cloud.velocityX = -3;
      
       //assign lifetime to the variable
      cloud.lifetime = 200;
      
      //adjust the depth
      cloud.depth = Monster_truck.depth;
      Monster_truck.depth = Monster_truck.depth + 1;
      
      //add each cloud to the group
      cloudsGroup.add(cloud);
    }
  }
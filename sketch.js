//Game States
var PLAY=1;
var END=0;
var gameState=1;

var lives=3;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh, lifeLost;
var heart1, heart2, heart3, heartImg

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("bomb.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  heartImg= loadImage ("heart.png")

  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
  lifeLost= loadSound("lifeLost.mp3")
}



function setup() {
  createCanvas(500, 500);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.3
  
  //CREATING LIVES
  heart1=createSprite(450,50);
  heart1.addImage(heartImg);
  heart1.scale=0.08;
  heart2=createSprite(400,50);
  heart2.addImage(heartImg);
  heart2.scale=0.08;
  heart3=createSprite(350,50);
  heart3.addImage(heartImg);
  heart3.scale=0.08;

  gameOver = createSprite(250,250,20,50);
  gameOver.addImage(gameOverImage);
  gameOver.scale= 1.5;
  gameOver.visible=false;
      
  
  //set collider for sword
  //knife.debug=true;
  knife.setCollider("rectangle",50,-50,100,300, 45);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();

      score=score+2;

    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        lives= lives-1
        monsterGroup.destroyEach();
        lifeLost.play();
    }
  
  }
}
  drawSprites();
  //Display score
  textSize(25);
  fill("green");
  textFont("Courier New");
  text("SCORE : "+ score,50,50);

  livesDestroy();
}

function livesDestroy() {
  if(lives == 2){
    heart3.destroy();
  }
  if(lives == 1){
    heart2.destroy();
  }
  if(lives == 0){
    heart1.destroy();

    gameOver.visible=true;
    
    fruitGroup.destroyEach();
    monsterGroup.destroyEach();

    knife.destroy();


  }
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,-10,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.x=Math.round(random(50,450));
    monster.velocityY= (7+(score/4));
    monster.setLifetime=50;
    monster.scale=0.2;
    
    monsterGroup.add(monster);

    //monster.debug=true;
  }
}

function fruits(){
  if(World.frameCount%50===0){
    fruit=createSprite(400,800,20,20);
    fruit.y = 0    
  //Increase the velocity of fruit after score 4 

      fruit.velocityY= (9+(score/4));
     
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
      fruit.scale=0.06;
    } else if (r == 2) {
      fruit.addImage(fruit2);
      fruit.scale=0.08;
    } else if (r == 3) {
      fruit.addImage(fruit3);
      fruit.scale=0.15;
    } else {
      fruit.addImage(fruit4);
      fruit.scale=0.1;
    }
    
    fruit.x=Math.round(random(50,450));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
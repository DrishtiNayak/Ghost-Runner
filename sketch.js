var tower, towerImage;
var door, doorImage, doorsGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var sound;
var score = 0;


function preload() {

  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");


}


function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;


  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.4;

  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();

  sound.loop();


}





function draw() {

  background(0);

  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300;
    }

    if (keyDown("space")) {
      ghost.velocityY = -5;
    }

    ghost.velocityY = ghost.velocityY + 0.3;

    if (keyDown("Right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    if (keyDown("Left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    // console.log(ghost.y);

    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end"
    }




    spawnDoors();
    drawSprites();

    textSize(20);
    text("score :" + score, 350, 30);
    score = score + Math.round(getFrameRate() / 60);

  }

  if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250)
    
    textSize(20);
    text("score :" + score, 350, 30);

  }


}



function spawnDoors() {

  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    door.addImage("doors", doorImage);
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);


    climber = createSprite(200, 10);
    climber.addImage("climber", climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climberGroup.add(climber);


    door.depth = 1;
    ghost.depth = 2;

    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;

    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);

  }

}
//namespace all the files
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//make all the variables
var engine, world;
var box1, pig1, pig3;
var backgroundImg, platform;
var bird, slingshot;

var gameState = "onSling";

var bg = "sprites/bg.png";
var score = 0;

function preload() {
    //load the image for the background
    backgroundImg = loadImage("sprites/bg.png");
    //call the function for different background at different time of the day
    getBackgroundImg();
}

function setup() {
    //create the canvas
    var canvas = createCanvas(1200, 400);

    //create an instance for engine and world
    engine = Engine.create();
    world = engine.world;

    //create all the objects
    ground = new Ground(600, height, 1200, 20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810, 260, 300, PI / 2);

    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig3 = new Pig(810, 220);

    log3 = new Log(810, 180, 300, PI / 2);

    box5 = new Box(810, 160, 70, 70);
    log4 = new Log(760, 120, 150, PI / 7);
    log5 = new Log(870, 120, 150, -PI / 7);

    bird = new Bird(200, 50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body, {
        x: 200,
        y: 50
    });
}

function draw() {
    //clear the background
    background(backgroundImg);

    //show the scores
    noStroke();
    textSize(35);
    fill("white");
    text("Score : " + score, width - 300, 50);

    //update the engine
    Engine.update(engine);

    //strokeWeight(4);
    //display all the objects 
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();
}

function mouseDragged() {
    //make the bird dragged with the mouse
    if (gameState !== "launched") {
        Matter.Body.setPosition(bird.body, {
            x: mouseX,
            y: mouseY
        });
    }
}


function mouseReleased() {
    //make the bird fly when the mouse released
    slingshot.fly();
    gameState = "launched";
}

function keyPressed() {

    if (keyCode === 32) {
        // slingshot.attach(bird.body);
    }
}

//create the fuction for API call
async function getBackgroundImg() {
    //make a variable to fetch data form the API
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/kolkata");
    var responseJSON = await response.json();
    console.log(responseJSON);

    //extract the datetime
    var datetime = responseJSON.datetime;
    console.log(datetime);

    //extract the hour 
    var hour = datetime.slice(11, 13);
    console.log(hour);

    //set the morning and the night animaton
    if (hour >= 06 && hour <= 19) {
        bg = "sprites/bg.png";
    } else {

        bg = "sprites/bg2.jpg";

    }
    backgroundImg = loadImage(bg);
}
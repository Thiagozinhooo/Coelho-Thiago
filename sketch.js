const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground;
var rope,rope2,rope3,ropeSom;
var fruit,fruitImg;
var cola,cola2,cola3;
var fundo,fundoSom;
var coelho,coelhoImg,coelhoComendo,coelhoPiscando,coelhoTriste;
var button,button2,button3, balloon;
var comendoSom;
var tristeSom;
var arSom;
var mudo;

let engine;
let world;

function preload(){

  fruitImg=loadImage("/assets/melon.png");
  fundo=loadImage("/assets/background.png");
  coelhoImg=loadImage("/assets/Rabbit-01.png");
  coelhoComendo=loadAnimation("/assets/eat_0.png","/assets/eat_1.png","/assets/eat_2.png","/assets/eat_3.png","/assets/eat_4.png");
  coelhoPiscando=loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png")
  coelhoTriste=loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png")

  ropeSom=loadSound("assets/rope_cut.mp3");
  fundoSom=loadSound("assets/sound1.mp3");
  comendoSom=loadSound("assets/eating_sound.mp3");
  tristeSom=loadSound("assets/sad.wav");
  arSom=loadSound("assets/air.wav");

  coelhoPiscando.playing=true;
  coelhoComendo.playing=true;
  coelhoTriste.playing=true;

  coelhoComendo.looping=false;
  coelhoTriste.looping=false;

}

function setup() 
{
  //createCanvas(500,700);
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth,displayHeight);
  }else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }

  engine = Engine.create();
  world = engine.world;

  fundoSom.play();
  fundoSom.setVolume(0.3);
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  ground = new Ground(250,canH,500,50);

  rope = new Rope(7,{x:300 , y:100});
  rope2 = new Rope(7,{x:150 , y:100});
  rope3= new Rope(6,{x:430 , y:210});

  fruit = Bodies.circle(250,100,20,{density:0.001});
  Composite.add(rope.body, fruit);

  cola = new Link(rope, fruit);
  cola2 = new Link(rope2, fruit);
  cola3 = new Link(rope3, fruit);

  coelho=createSprite(450,canH-80);
  //coelho.addImage(coelhoImg);
  coelho.scale=0.2;
  coelhoPiscando.frameDelay=7
  coelhoComendo.frameDelay=10
  coelhoTriste.frameDelay=10
  coelho.addAnimation("comendo", coelhoComendo);
  coelho.addAnimation("piscando", coelhoPiscando);
  coelho.addAnimation("triste", coelhoTriste);
  coelho.changeAnimation("piscando", coelhoPiscando);

  button = createImg("/assets/cut_btn.png");
  button.position(280, 90);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("/assets/cut_btn.png");
  button2.position(130, 90);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg("/assets/cut_btn.png");
  button3.position(400, 200);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  balloon = createImg("/assets/balloon.png");
  balloon.position(50, 250);
  balloon.size(100,80);
  balloon.mouseClicked(vento);
  
  mudo = createImg("/assets/mute.png");
  mudo.position(400, 50);
  mudo.size(50,50);
  mudo.mouseClicked(mute);
}

function draw() 
{
  background(29);
  image(fundo, 0, 0, displayWidth-80, displayHeight);
  Engine.update(engine);

  ground.display();

  rope.display();
  rope2.display();
  rope3.display();
  
  if(fruit!=null){
    image(fruitImg,fruit.position.x,fruit.position.y,70,70);
  }

  if(collide(fruit,coelho)==true){
    comendoSom.play();
    comendoSom.setVolume(1.5);
    coelho.changeAnimation("comendo", coelhoComendo);
  }

  if(fruit!=null && fruit.position.y>=650){
    tristeSom.play();
    tristeSom.setVolume(0.3);
    coelho.changeAnimation("triste",coelhoTriste);
    fruit=null;
    fundoSom.stop();
  }

  drawSprites();
}

function drop(){

  ropeSom.play();

  rope.break();

  cola.detach();
  cola=null;
}

function drop2(){

  ropeSom.play();

  rope2.break();

  cola2.detach();
  cola2=null;
}

function drop3(){

  ropeSom.play();

  rope3.break();

  cola3.detach();
  cola3=null;
}

function collide(body, sprite){

  if(body!=null){

    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);

    if(d<=80){

      World.remove(engine.world, fruit);
      fruit=null;
      return true;
    }
  }else{
    return false;
  }
}

function vento(){

  Body.applyForce(fruit, {x:0 ,y:0}, {x:0.01 ,y:0});

  arSom.play();

}

function mute(){

  if(fundoSom.isPlaying()){
    fundoSom.stop();
  }else{
    fundoSom.play();
  }

}
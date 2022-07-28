const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var estadodeljuego = "play" ;
var conteop;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3; 

var bg_img;
var food;
var bunny;
var bunnyImg;
var mute_btn;

var vida1;
var vida2;
var vida3;

var fr;


var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('f3638265290819.5d61d475ee01c.jpg');
  food = loadImage('pixel_art__strawberry_cupcake_by_exoticvibes_dcfcb5a-pre.png');
  bunnyImg = loadImage('Bunny_eating.png');
  eating = loadImage('Bunny_eating.png');
  vida1Img = loadImage ('pixel_art__strawberry_cupcake_by_exoticvibes_dcfcb5a-pre.png');
  vida2Img = loadImage ('pixel_art__strawberry_cupcake_by_exoticvibes_dcfcb5a-pre.png');
  vida3Img = loadImage ('pixel_art__strawberry_cupcake_by_exoticvibes_dcfcb5a-pre.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav");
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');
  
  
}

function setup() 
{
  
 var isMobile = /iphone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile){
  canW =  displayWhidth;
  canH =  displayHeight; 
  createCanvas(displayWhidth+80, displayHeight);
}

else{
  canW =  windowWidth; 
  canH =  windowHeight;
  createCanvas(windowWidth, windowHeight);
}


  createCanvas(500,700);
  
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 
   //btn3
   button3 = createImg('cut_btn.png');
   button3.position(360,200);
   button3.size(60,60);
   button3.mouseClicked(drop3);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50); 
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});
  ground = new Ground(200,canH,600,20);
  
   //creaciondecuerdas();
   //union();
   creaciondefruta();

  bunny = createSprite(100,canH-200,100,100);
  bunny.addImage(bunnyImg)
  bunny.scale = 0.3;

  vida1 = createSprite(450,canH-350,20,20);
  vida1.addImage(vida1Img)
  vida1.scale = 0.04
  vida1.visible = false;
  vida2 = createSprite(450,canH-300,20,20);
  vida2.addImage(vida2Img)
  vida2.scale = 0.04
  vida2.visible = false;
  vida3 = createSprite(450,canH-250,20,20);
  vida3.addImage(vida3Img)
  vida3.scale = 0.04
  vida3.visible = false;
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  


}

function draw() 
{
  background(51);
  image(bg_img,0,0, displayWidth+80, displayHeight);
  //creaciondefruta();
  creaciondecuerdas();
 // Matter.Composite.add(rope.body,fruit);
  union();
  if(estadodeljuego=="play")
  {

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    //bunny.changeImage('eating');
    eating_sound.play();
    vida1.visible = true

    if (vida1.visible=true)
{
conteop = conteop+1;
//creaciondecuerdas();
//estadodeljuego="play";
console.log(estadodeljuego);
}
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeImage('rabbit');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
  }  //llave del estado del juego
}

if (conteop==3 && estadodeljuego=="end")
{
  console.log("findeljuego")
  vida1.visible = false
  vida2.visible = false
  vida3.visible = false
}


function creaciondecuerdas()
{
  //rope = new Rope(8,{x:40,y:30});
  //rope2 = new Rope(7,{x:370,y:40});
  //rope3 = new Rope(4,{x:400,y:225});
  rope.show();
  rope2.show();
  rope3.show(); 
  console.log("estamos en la creacion de cuerda");
}

function creaciondefruta()
  {
  fruit = Bodies.circle(300,300,20);
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  console.log("estamos en la creacion de frutas");
}

function union()
{
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);
  console.log("estamos en la union");
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}



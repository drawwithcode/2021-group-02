let a = 0;
let cancellosx;
let cancellodx;
let fiore1;
let fiore2;
let fiore3;
let fiore4;

let info = ["TO OPEN", "TO BEGIN "];
let infocolor = ["SCROLL", "CLICK"];

let clicco;
// arbitraria, associata la tipo di fiore
let myFont;
let w; //interruttore wheel

function preload() {
  cancellosx = loadImage("assets/sx.png");
  cancellodx = loadImage("assets/dx.png");
  fontEditorial = loadFont("./assets/PPEditorialNew-UltralightItalic.otf");
  fontNeueThin = loadFont("assets/NeueHaasDisplayXThin.ttf");
  fiore1 = loadImage("./assets/fiore1.png");
  fiore2 = loadImage("./assets/fiore2.png");
  fiore3 = loadImage("./assets/fiore3.png");
  fiore4 = loadImage("./assets/fiore4.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  rectMode(CENTER);

  background(220);
  w = false;
}
function draw() {
  background("black");
  primo = 0;
  let b = -a;

  push();
  textFont(fontNeueThin);
  textAlign(LEFT);
  noStroke();
  textSize(23);

  if (w === false) {
    fill("#BE80FF");
    text(info[0], -773, -460);
    fill("white");
    text(infocolor[0], -860, -460);
  } else {
    background("black");
    fill("#BE80FF");
    text(info[1], -795, -460);
    fill("white");
    text(infocolor[1], -860, -460);
  }

  pop();

  stroke(255);

  fill("red");

  push();
  translate(-width / 2, 0, 50);
  rotateY(a);
  noStroke();
  texture(cancellosx);
  rect(width / 4, 0, width / 2, height);
  pop();

  push();
  translate(width / 2, 0, 50);
  rotateY(b);
  noStroke();
  texture(cancellodx);
  rect(-width / 4, 0, width / 2, height);
  stroke("white");
  pop();

  push();

  let sposta = -1200;
  let angolo = map(a, 0, 300, 0, 1000);
  sposta = sposta + angolo;
  console.log(sposta);
  translate(0, 0, sposta);
  let alpha = 100;
  textColor = color(100, 50, 100);
  textColor.setAlpha(alpha);
  fill("white");
  textAlign(CENTER);
  image(fiore3, -500, -300, 75, 482);

  textSize(700);
  textFont(fontEditorial);

  text("Arcàdia", 0, 180);
  image(fiore1, 480, -65, 127.5, 252);
  image(fiore2, -800, 62, 222, 122);
  image(fiore4, 900, -200, 200, 200);
  pop();
}

function mouseWheel(event) {
  w = true;

  /* textFont(fontEditorial);
  textSize(100);
  fill("red");
  text("ciaooooo", windowWidth / 2, windowHeight / 2); */
  if (a < 130 && event.delta > 0) {
    console.log(event);

    //move the square according to the vertical scroll amount
    a += event.delta / 20;
  }
}

function mouseClicked() {
  window.open("home.html", "_self");
}

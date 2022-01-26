let primo;

function preload() {
  fontNeueThin = loadFont("assets/NeueHaasDisplayXThin.ttf");
  fontEditorial = loadFont("assets/PPEditorialNew-UltralightItalic.otf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");
}

function draw() {
  textFont(fontEditorial);
  textAlign(RIGHT);
  textSize(25);
  fill("white");
  text("Arcàdia", width - 40, 55);
}

function mouseClicked() {
  window.open("nero4.html", "_self");
  if (
    mouseX < windowWidth - 40 &&
    mouseX > windowWidth - 130 &&
    mouseY > 20 &&
    mouseY < 55
  ) {
    window.open("home.html", "_self");
  }
}

function keyPressed() {
  if (key == "s") {
    window.open("nero4.html", "_self"); //cambia nome pag dove inizia il fiore
  }
}

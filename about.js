let primo;
let fontEditorial;

function preload() {
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
  if (
    mouseX < windowWidth - 40 &&
    mouseX > windowWidth - 130 &&
    mouseY > 20 &&
    mouseY < 55
  ) {
    window.open("home.html", "_self");
  }
}

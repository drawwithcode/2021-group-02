//DEF

//***RICONOSCIMENTO NOME
let result;

let xx;

//VARIABILI ONDINA
let angles = [];
let angleV = [];
let r = 4;

//***VARIABILI CAPTURE VOICE
//*****variabili suono
let voice_ins;
let recording_ins;
//*****fine variabile suono

//*****variabili immagini insetti
let farfallaImg; //insetto
let farfallaImg1;
let farfallaImg2;
//let farfallaImg3;
let brucoImg;
let brucoImg1;
let brucoImg2;
//let brucoImg3;
let coccinellaImg;
let coccinellaImg1;
let coccinellaImg2;
//let coccinellaImg3;

//array insetti
let arrayFarfalle;
let arrayCoccinelle;
let arrayBruchi;

let randomFarfalla;
let randomBruchi;
let randomCoccinelle;
//***** fine variabili immagini insetti

//bottone manda dati a pagina iniziale
let start;
let send;

//distanza random per posizionare i fiori nell'archivio
let distanza;

//***** variabili utili per insetti
let z;
let qualColInsetto;

let ceunbruco;
let ceunafarfalla;
let ceunacoccinella;
//***** fine variabili utili per insetti
//*** FINE VARIABILI CAPTURE VOICE

//*** VARIABILI VOICE DETECTION
let primo;
let secondo;
let testo = ["Who is your message for?", "Think about"];
let info = ["HOLD      TO RECORD", "HOLD      TO LEAVE YOUR MESSAGE"];
let infocolor = ["    R", "    L"];
let voice;
let recording;
let fontNeueThin;
let fontEditorial;
//*** FINE VARIABILI VOICE DETECTION

//***VARIABILI VOLUME
let v; //volume raw prima della media
let mic;
let Array_v = []; //array dei v raccolti
let volume; //media dei v
//***FINE VARIABILI VOLUME

//***VARIABILI FREQUENZA
let fft;
let a;
let f_i;
let ArrayF_i = [];
//frequenza è il valore che mi determina n_petali
let frequenza;
//***FINE VARIABILI FREQUENZA

//***VARIABILI GAMBO
let zz; //INTERRUTTORE GAMBO
//cambia l'ampiezza della curva (più il n° è basso, più la curva è larga)
let strum;
//cambia il n° di curvature (frequenza della curva), quanto è fitta
let n;
//tempo
let t;
//contatore per il random
let index;

let whereleave1;
let whereleave2;
let whereleave3;
let w_leave = 50;
let h_leave = 20;
let index_f1;
let index_f2;
let index_f3;
let j;
let k1;
let k2;
let l1;
let l2;

let arrayVerdi = ["green", "#026836"]; //!!!!
let verde;

let altezzaGambo; //distanza dall'alto alla fine del gambo. Più è alto più il gambo è basso
//***FINE VARIABILI GAMBO

//***VARIABILI FIORI
let XFIORE; //XFIORE e YFIORE traslano il fiore sopra il gambo (sono le coordinate finali)
let YFIORE;

let arrayPetali1 = ["#DFE658", "#FFFFFF", "#BE80FF"];
let arrayPetali2 = ["#FFFFFF", "#FF00F8", "#F10E08"];
let arrayPetali3 = ["#BE80FF", "#DFE658", "#FFFFFF"];
let arrayPetali4 = ["#F10E08", "#FFFFFF", "#FF00F8"];
let arrayPetali5 = ["#FF00F8", "#BE80FF", "#DFE658"];
let qualePetali = [
  arrayPetali1,
  arrayPetali2,
  arrayPetali3,
  arrayPetali4,
  arrayPetali5,
];
let colorePetali;

let durata; //lunghezza messaggio

let qualeFiore; //determina stile fiore
//***FINE VARIABILI FIORI

function preload() {
  farfallaImg = loadImage("./assets/Farfalla1.png");
  farfallaImg1 = loadImage("./assets/Farfalla2.png");
  farfallaImg2 = loadImage("./assets/Farfalla3.png");
  farfallaImg3 = loadImage("./assets/Farfalla4.png");
  brucoImg = loadImage("./assets/Bruco1.png");
  brucoImg1 = loadImage("./assets/Bruco2.png");
  brucoImg2 = loadImage("./assets/Bruco3.png");
  brucoImg3 = loadImage("./assets/Bruco4.png");
  coccinellaImg = loadImage("./assets/Coccinella1.png");
  coccinellaImg1 = loadImage("./assets/Coccinella2.png");
  coccinellaImg2 = loadImage("./assets/Coccinella3.png");
  coccinellaImg3 = loadImage("./assets/Coccinella4.png");

  fontNeueThin = loadFont("assets/NeueHaasDisplayXThin.ttf");
  fontEditorial = loadFont("assets/PPEditorialNew-UltralightItalic.otf");
  fontNeueLight = loadFont("assets/NeueHaasDisplayThin.ttf");
}

function setup() {
  primo = 0; //varibile testi
  secondo = 0;
  createCanvas(windowWidth, windowHeight);
  background(0);
  distanza = int(random(100, 140));

  //INSERIMENTO ONDINA FEEDBACK
  let total = floor(width / (r * 2));
  for (let i = 0; i < total + 1; i++) {
    angles[i] = map(i, 0, total, 0, 2 * TWO_PI);
    // angleV[i] = 0.01 + i / 100;
  }

  arrayFarfalle = [farfallaImg, farfallaImg1, farfallaImg2, farfallaImg3];
  arrayCoccinelle = [
    coccinellaImg,
    coccinellaImg1,
    coccinellaImg2,
    coccinellaImg3,
  ];
  arrayBruchi = [brucoImg, brucoImg1, brucoImg2, brucoImg3];

  //***REGISTRAZIONE NOME
  voice = new p5.Speech(); //ascolta con R
  recording = new p5.SpeechRec(); //riconosce con R
  //***FINE REGISTRAZIONE NOME

  //*** INSETTI
  //ascolta con s
  voice_ins = new p5.Speech(); //ascolta
  recording_ins = new p5.SpeechRec(); //riconsoce
  recording_ins.continuous = true; // do continuous recognition
  recording_ins.interimResults = true; // allow partial recognition (faster, less acc

  //variabili utili capture voice
  qualColInsetto = int(random(0, 4));
  z = false;
  ceunbruco = false;
  ceunafarfalla = false;
  ceunacoccinella = false;

  //*** FINE INSETTI

  //variabili utili lunghezza messaggio (interruttore)
  durata = 0;
  zz = false;

  //***AUDIO DEL FIORE
  mic = new p5.AudioIn(); //rileva audio
  fft = new p5.FFT(); //rileva "frequenza"
  durata = 0;
  zz = false;
  //***FINE AUDIO DEL FIORE

  //***VARIBILI GAMBO
  let index = random(0, 1);
  verde = random(arrayVerdi); //!!!!
  //console.log(verde);
  //console.log("first index is " + index);
  //fette
  j1 = int(random(2, 8));
  //quante fette
  j2 = int(random(1, j1));
  //fette
  k1 = int(random(2, 8));
  //quante fette
  k2 = int(random(1, k1));
  //fette
  l1 = int(random(2, 8));
  //quante fette
  l2 = int(random(1, l1));
  /* console.log(
    "i parametri posizione foglie random sono " + j1,
    j2,
    k1,
    k2,
    l1,
    l2
  ); */

  //cambia i valori tra cui varia random per cambiare il comportamento della curva
  if (index >= 0.3) {
    strum = random(10, 20);
    n = random(1, 4);
  }
  //così è dritto
  else {
    strum = 1;
    n = 0;
  }
  //console.log("index is " + index + " strum is " + strum + " and n is " + n);
  //***FINE VARIBILI GAMBO

  //***VARIBILI FIORE
  XFIORE = width / 2;
  YFIORE = height / 2;
  qualeFiore = int(random(1, 7));
  //console.log(qualeFiore);

  colorePetali = qualePetali[int(random(0, 5))];
  //console.log("colorePetali" + colorePetali);
  //***FINE VARIBILI FIORE
  //bottone manda i dati raccolti al firebase per poter ricreare i fiori
}

function draw() {
  //***HEADER
  push();
  textFont(fontEditorial);
  textAlign(RIGHT);
  textSize(25);
  noStroke();
  fill("white");
  text("Arcàdia", width - 40, 55);
  pop();

  push();
  noStroke();
  fill(0);
  rect(0, 0, 500, 100);

  textFont(fontNeueLight);
  textAlign(LEFT);
  noStroke();

  textSize(23);
  fill("#BE80FF");
  text(info[primo], 50, 60);
  fill("white");
  text(infocolor[primo], 99, 60);
  pop();
  //***FINE HEADER

  //***TESTO PER CHI è IL MESS
  textFont(fontNeueThin);
  textAlign(LEFT);
  noStroke();
  textSize(80);
  textLeading(56);
  fill("white");
  text(testo[secondo], 90, height / 2 - 30);

  if (keyIsDown(76)) {
    durata++;
    ondina();
    //console.log (durata + "durata");

    //*** blocco volume
    const micLevel = mic.getLevel();
    v = micLevel;
    //aggiunge tutti i volumi rilevati ad un array
    append(Array_v, v);
    //console.log(Array_v);
    //calcola la media
    volume = eval(Array_v.join("+")) / Array_v.length;
    // console.log("volume is " + volume);
    //console.log("miclevel " + micLevel);
    //console.log("KEY IS DOWN");
    //*** fine blocco volume

    //*** blocco frequenza
    let spectrum = fft.analyze();
    //console.log("spectrum is" + spectrum);

    //P4 è il più Profonfo
    let P4 = fft.getEnergy(1, 50);
    let P3 = fft.getEnergy(51, 150);
    let P2 = fft.getEnergy(151, 200);
    let P1 = fft.getEnergy(201, 250);
    let A1 = fft.getEnergy(251, 300);
    let A2 = fft.getEnergy(301, 400);
    let A3 = fft.getEnergy(401, 1000);
    let A4 = fft.getEnergy(1001, 1500);
    //A4 è il più Acuto

    //a suono più acuto corrsponde posizione "prima" , quindi f_1 è un numero tanto più alto quanto più è prodonda la voce
    volumesArray = [A4, A3, A2, A1, P1, P2, P3, P4];
    //console.log("volumesArray is " + volumesArray);

    //mi da la POSIZIONE nell'array del valore massimo dell'array (quindi numero da 0 a 7)
    f_i = volumesArray.indexOf(Math.max(...volumesArray));

    append(ArrayF_i, f_i);
    //console.log("ArrayF_i is " + ArrayF_i);
    // console.log("f_i is " + f_i);

    //calcola la media deo valori contenuti dentro l'array
    frequenza = int(eval(ArrayF_i.join("+")) / ArrayF_i.length);
    //console.log("frequenza" + frequenza);
    //***fine blocco frequenza
    xx = 100;
    if (allFlower) {
      for (key in allFlower) {
        const fiori = allFlower[key];
        xx = fiori._xx + distanza;
      }
    }

    console.log(xx);

    if (zz === true) {
      if (qualeFiore == 1) {
        fiore1();
      } else if (qualeFiore == 2) {
        fiore2();
      } else if (qualeFiore == 3) {
        fiore3();
      } else if (qualeFiore == 4) {
        fiore4();
      } else if (qualeFiore == 5) {
        fiore5();
      } else if (qualeFiore == 6) {
        fiore6();
      }
    }
  } else {
    mic.stop();
    //console.log("ok c'è");
  }

  //*** INIZIO BLOCCO INSETTI
  if (z === true) {
    showResult_ins();
    //console.log("sono dentro z===true");
  }

  push();
  translate((width * 3) / 4, 0);

  if (ceunbruco === true) {
    randomBruchi = arrayBruchi[qualColInsetto];
    image(
      randomBruchi,
      0 - j1 * 10,
      height - randomBruchi.height / 4,
      randomBruchi.width / 4,
      randomBruchi.height / 4
    );
  }

  if (ceunacoccinella === true) {
    randomCoccinelle = arrayCoccinelle[qualColInsetto];
    image(
      randomCoccinelle,
      0, //coccinella è sul gambo
      j1 * 125,
      randomCoccinelle.width / 5,
      randomCoccinelle.height / 5
    );
  }

  if (ceunafarfalla === true) {
    randomFarfalla = arrayFarfalle[qualColInsetto];
    console.log("FRAFALLA");
    image(
      randomFarfalla,
      l1 * 10,
      100 + l1 * 100,
      randomFarfalla.width / 6,
      randomFarfalla.height / 6
    );
  }

  pop();
  //*** FINE BLOCCO INSETTI
}

//ONDINA PROVA FEEDBACK--------------------------------------------------------------------
function ondina() {
  push();
  //translate(300, 200);
  fill(0);
  rect(0, 0, 500, 100);
  noFill();

  stroke("#BE80FF");
  beginShape();
  for (let i = 0; i < angles.length; i++) {
    let y = map(sin(angles[i]), -1, 1, 45, 60);
    strokeWeight(2);
    let x = map(i, 0, angles.length, 90, 300);
    // line(x, 0, x, y);
    //circle(x, y, r * 2);
    vertex(x, y);
    angles[i] += 0.03;
    // angles[i] += angleV[i];
  }
  endShape();
  pop();
}
//fine ondina feedback----------------------------------------------------

function mouseClicked() {
  // PER TORNARE ALLA HOME
  if (
    mouseX < displayWidth - 40 &&
    mouseX > displayWidth - 130 &&
    mouseY > 20 &&
    mouseY < 55
  ) {
    window.open("home.html", "_self");
  }
}

function keyPressed() {
  if (keyCode === 82) {
    // QUANDO PREMI R PER REGISTRARE NOME
    //testo centrale secondo
    recording.onResult = showResult;
    recording.start();
    background("black");
    primo++;

    // info secondo
    textFont(fontNeueThin);
    textAlign(LEFT);
    noStroke();
    textSize(23);
    textLeading(56);
    fill("#BE80FF");
    text(info[primo], 50, 60);
  }
  if (keyCode === 76) {
    //QUANDO PREMI S ESISTE IL FIORE
    zz = true; //interruttore
    userStartAudio();
    mic.start();
    fft.setInput(mic);

    recording_ins.start(); //!
    recording_ins.onResult = makeTrue; //!
  }
}

function keyReleased() {
  if (keyCode === 82) {
    background("black");
    secondo++;
    console.log("Key is released");
    push();
    textFont(fontEditorial);
    textAlign(LEFT);
    textSize(80);
    noStroke();
    fill("#BE80FF");
    text(result, 90, 590);
    pop();

    start = createButton("Plant it");

    start.mouseClicked(mandaDati);
  }
}

function makeTrue() {
  //funzione che serve per insetti
  z = true;
}

//FUNZIONE FUNZIONE CAPTURE VOICE (MOSTRA INSETTI)
function showResult_ins() {
  //background(0);
  let result_ins = recording_ins.resultString;
  console.log(result_ins); //TESTI COMMENTATI MA UTILI PER VERIFICA

  // push();
  //translate(width / 2, 0);

  if (result_ins.includes("love")) {
    //COCCINELLE

    ceunacoccinella = true;
    /*  randomCoccinelle = arrayCoccinelle[qualColInsetto];
    image(
      randomCoccinelle,
      0, //coccinella è sul gambo
      600,
      randomCoccinelle.width / 2,
      randomCoccinelle.height / 2
    ); */
  }
  if (result_ins.includes("sorry")) {
    //BRUCHI!
    ceunbruco = true;
  }
  /*   randomBruchi = arrayBruchi[qualColInsetto];
    image(
      randomBruchi,
      -75, //problema bruco volante
      800,
      randomBruchi.width / 4,
      randomBruchi.height / 4
    ); */

  if (result_ins.includes("Arcadia")) {
    //FARFALLE
    ceunafarfalla = true;
    /* randomFarfalla = arrayFarfalle[qualColInsetto];
    console.log(result);
    image(
      randomFarfalla,
      75,
      400,
      randomFarfalla.width / 6,
      randomFarfalla.height / 6
    ); */
  }
}

// FINE FUNZIONE CAPTURE VOICE (MOSTRA INSETTI)

function showResult() {
  //TRASCRIZIONE DEL NOME
  push();
  result = recording.resultString;
  textFont(fontEditorial);
  textAlign(LEFT);
  textSize(80);
  noStroke();
  fill("#BE80FF");
  text(result, 90, 550);
  console.log("show result r è" + result);
  pop();
}

function gambo(altezzaGambo) {
  //soluzione punk temporanea
  push();
  noStroke();
  fill("black");
  rect(width / 2, 0, width / 2 - 150, height);
  pop();

  //background(0);
  strokeWeight(8);
  stroke(verde);
  push();
  translate((width * 3) / 4, 0);
  noFill();

  //ora ho deciso che 200 è la massima altezza del gambo
  //t è lo spazio tra top della oagina e top del gambo
  if (t <= altezzaGambo) {
    t = altezzaGambo;
  } else {
    //ora t dipende da frame count: poi sarà lunghezza del messaggio (che è comuqnue FrameCount)
    t = height - durata;
  }

  index_f1 = (j2 * (height - t)) / j1;
  index_f2 = (k2 * (height - t)) / k1;
  index_f3 = (l2 * (height - t)) / l1;

  beginShape();
  //cima
  //Ho sostituito alla coordinata x quanto "stabilito" dentro al ciclo for, considerando per y il valore minimo (+ in alto nella canva)cioè t
  // vertex(map(sin(n * (t * 0.01)), -1, 1, -strum, strum), t);

  //onda (tutti gli altri punti): descrivo la curva
  for (var y = t; y < height; y++) {
    var angle = n * (y * 0.01);
    // map x between 0 and width to 0 and Two Pi
    var x = map(sin(angle), -1, 1, -strum, strum);
    vertex(x, y);
  }
  //fondo
  //Ho sostituito alla coordinata x quanto "stabilito" dentro al ciclo for, considerando per y valore massimo cioè height
  //vertex(map(sin(n * (height * 0.01)), -1, 1, -strum, strum), height);
  endShape();

  //foglie
  //whereleave è uno degli angoli calcolati nel ciclo for
  fill(verde);
  //a y sostituisco height - 10 che combacia con il corner dell'ellisse
  push();
  translate(map(sin(whereleave1), -1, 1, -strum, strum), height - index_f1),
    (whereleave1 = n * ((height - index_f1) * 0.01));
  ellipse(0 + w_leave / 2, 0, w_leave, h_leave);
  pop();

  push();
  translate(map(sin(whereleave2), -1, 1, -strum, strum), height - index_f2),
    (whereleave2 = n * ((height - index_f2) * 0.01));
  ellipse(0 - w_leave / 2, 0, w_leave, h_leave);
  pop();

  push();
  translate(map(sin(whereleave3), -1, 1, -strum, strum), height - index_f3),
    (whereleave3 = n * ((height - index_f3) * 0.01));
  ellipse(0 + w_leave / 2, 0, w_leave, h_leave);
  pop();
  pop();

  // //traslo l'oggetto mettendo come valori le coordinate che voglio siano il centro dell'ellisse
  // translate(map(sin(whereleave), -1, 1, -strum, strum), height - 30);
  // rotate(PI / 6);
  // //coordinate del centro dell'ellisse sono 0,0 del nuovo sistema (traslato=)
}

function fiore1(nPetali, wPetali) {
  push();
  gambo(400);
  translate(
    map(sin(n * (t * 0.01)), -1, 1, -strum, strum) + (width * 3) / 4,
    t
  );

  nPetali = int(map(frequenza, 0, 8, 2, 12));
  wPetali = int(map(volume, 0, 1, 40, 60));
  // console.log("nPetali" + nPetali);

  let radius = (wPetali * 4) / 3;
  let hPetali = 1.5 * wPetali;
  let wCorolla = 2 * wPetali;
  let hCorolla = 2 * hPetali;
  let stems = radius;

  //fiore ellissi
  noStroke();

  //base
  fill(verde);
  for (let i = 0; i < nPetali - 1; i++) {
    ellipse(0, 1.5 * radius, wCorolla, hCorolla);
    rotate((2 * PI) / (nPetali - 1));
  }

  //corolla esterna
  fill(colorePetali[0]);
  for (let i = 0; i < nPetali; i++) {
    rotate((2 * PI) / nPetali);
    ellipse(0, radius, wCorolla, hCorolla);
  }

  //corolla interna
  fill(colorePetali[1]);
  for (let i = 0; i < nPetali; i++) {
    rotate((2 * PI) / nPetali);
    ellipse(0, radius, wPetali, hPetali);
  }

  //pistilli
  push();
  rectMode(CENTER);
  fill(colorePetali[2]);
  for (let i = 0; i < nPetali; i++) {
    rotate((2 * PI) / nPetali);
    ellipse(0, stems, 10, 10);
    rect(0, radius / 2, 2, stems);
  }
  pop();
  pop();
}

function fiore2() {
  push();
  gambo(400);
  translate(
    map(sin(n * (t * 0.01)), -1, 1, -strum, strum) + (width * 3) / 4,
    t
  );

  nPetali = int(map(frequenza, 0, 8, 1, 8));
  wPetali = int(map(volume, 0.0, 1, 70, 150));
  // console.log("nPetali" + nPetali);

  push();
  //facciamo il fiore
  //tuorlo
  noStroke();
  fill(colorePetali[2]);
  ellipseMode(CENTER);
  arc(
    0, //width / 2,
    -wPetali / 2 - (nPetali - 1) * (wPetali / 2), //dist_gambo_top - (nPetali - 1) * (wPetali / 2),
    wPetali / 3,
    wPetali / 3,
    PI,
    0,
    CHORD
  );

  //petali
  /*in base al n° max di petali che concordiamo, dobbiamo decidere i parametri entro cui variano dist_gambo_top, diametro_fiore */
  for (let i = 0; i < nPetali; i++) {
    fill(colorePetali[0]);
    noStroke();
    //ellipseMode(CENTER);
    arc(
      0, //width / 2,
      -wPetali / 2 - i * (wPetali / 2), //dist_gambo_top - i * (diametro_fiore / 2),
      wPetali,
      wPetali,
      0,
      PI,
      CHORD
    );
  }
  pop();
  pop();
}

function fiore3() {
  push();
  gambo(450);

  translate(
    map(sin(n * (t * 0.01)), -1, 1, -strum, strum) + (width * 3) / 4,
    t
  );

  nPetali = int(map(frequenza, 0, 8, 3, 10));
  wPetali = int(map(volume, 0.0, 1, 35, 70));

  scale(wPetali / 10);

  //PETALI
  push();
  rectMode(CENTER);
  noStroke();
  for (let i = 0; i < nPetali; i++) {
    rotate(PI / nPetali);
    fill(colorePetali[0]);
    noStroke();
    //primi due parametri in base a fine del gambo
    rect(0, 0, 5, 50);
  }
  pop();

  //TUORLO
  for (let i = 3 * nPetali; i > 0; i = i - 7) {
    ellipseMode(CENTER);
    stroke(colorePetali[1]);
    strokeWeight(1);
    fill(colorePetali[2]);
    //primi due parametri vanno in base a fine del gambo
    ellipse(0, 0, i);
  }
  pop();
}

function fiore4() {
  push();
  gambo(350);
  translate(
    map(sin(n * (t * 0.01)), -1, 1, -strum, strum) + (width * 3) / 4,
    t
  );

  nPetali = int(map(frequenza / 5, 0, 8, 2, 25));
  wPetali = int(map(volume, 0, 1, 3, 7));

  //PETALO SEMPRE CENTRALE (fisso)
  push();
  scale(wPetali / 10);
  push();
  for (let i = 0; i < nPetali; i++) {
    noStroke();
    fill(colorePetali[0]);
    //primi 2 parametri dei triangoli vanno in base a fine gambo
    triangle(0, 0, -30, -300, 30, -300);
    fill(colorePetali[1]);
    triangle(0, 0, -25, -250, 25, -250);
  }
  pop();

  //PETALI RUOTATI A DX
  push();
  for (let i = 0; i < nPetali; i++) {
    noStroke();
    fill(colorePetali[0]);
    rotate(-PI / 11); //VALORI DA 11 A 15 mantengono petali in campo alto e dx
    //primi 2 parametri dei triangoli vanno in base a fine gambo
    triangle(0, 0, -30, -300, 30, -300);
    fill(colorePetali[1]);
    triangle(0, 0, -25, -250, 25, -250);
  }
  pop();

  //PETALI RUOTATI A SX
  push();
  for (let i = 0; i < nPetali; i++) {
    noStroke();
    fill(colorePetali[0]);
    rotate(PI / 11); //VALORI DA 11 A 15 mantengono petali in campo alto e sx
    //primi 2 parametri dei triangoli vanno in base a fine gambo
    triangle(0, 0, -30, -300, 30, -300);
    fill(colorePetali[1]);
    triangle(0, 0, -25, -250, 25, -250);
  }
  pop();

  //centro pallozzo-semicerchio
  fill(colorePetali[2]);
  noStroke();
  //primi due parametri di arc in base a fine gambo
  arc(0, 0, wPetali * 50, wPetali * 50, PI, 0, CHORD);
  pop();
  pop();
}

function fiore5() {
  push();
  gambo(400);
  translate(
    map(sin(n * (t * 0.01)), -1, 1, -strum, strum) + (width * 3) / 4,
    t
  );

  let larghezza_ellisse;
  nPetali = int(map(frequenza, 0, 8, 3, 6));
  wPetali = int(map(volume, 0, 1, 3, 10));

  scale(wPetali / 3); //variabile frquenza o volume */

  //PETALO SEMPRE CENTRALE (fisso)
  push();
  translate(0, -45);
  for (let i = 0; i < nPetali / 5; i++) {
    stroke(verde);
    strokeWeight(3);
    line(0, 0, 0, -wPetali * 10);
    stroke(colorePetali[1]);
    fill(colorePetali[1]);
    ellipse(0, -wPetali * 10, 10, 10);
  }
  pop();

  //PETALI RUOTATI A DX
  push();
  translate(0, -45);
  for (let i = 0; i < nPetali / 3; i++) {
    stroke(verde);
    strokeWeight(3);
    fill(colorePetali[0]);
    rotate(-PI / 5);
    line(0, 0, 0, -wPetali * 10);
    stroke(colorePetali[1]);
    fill(colorePetali[1]);
    ellipse(0, -wPetali * 10, 10, 10);
  }
  pop();

  //PETALI RUOTATI A SX
  push();
  translate(0, -45);
  for (let i = 0; i < nPetali / 3; i++) {
    stroke(verde);
    strokeWeight(3);
    fill(colorePetali[0]);
    rotate(PI / 5);
    line(0, 0, 0, -wPetali * 10);
    stroke(colorePetali[1]);
    fill(colorePetali[1]);
    ellipse(0, -wPetali * 10, 10, 10);
  }
  pop();

  //petaloni
  if (wPetali == 3) {
    larghezza_ellisse = 50;
  } else if (wPetali == 4) {
    larghezza_ellisse = 40;
  } else if (wPetali == 5) {
    larghezza_ellisse = 30;
  } else if (wPetali == 6) {
    larghezza_ellisse = 24;
  } else if (wPetali == 7) {
    larghezza_ellisse = 20;
  } else if (wPetali == 8) {
    larghezza_ellisse = 20;
  }

  //colore fondo
  fill(colorePetali[0]);
  strokeWeight(3);
  stroke(colorePetali[2]);
  ellipse(0, 0, larghezza_ellisse * wPetali, 90);

  //petali
  /*in base al n° max di petali che concordiamo, dobbiamo decidere i parametri entro cui variano dist_gambo_top, diametro_fiore */
  for (let i = 0; i < wPetali; i++) {
    noFill();
    ellipseMode(CENTER);
    ellipse(0, 0, larghezza_ellisse * i, 90);
  }
  pop();
}

function fiore6() {
  push();
  gambo(450);
  translate(
    map(sin(n * (t * 0.01)), -1, 1, -strum, strum) + (width * 3) / 4,
    t
  );

  nPetali = int(map(frequenza / 5, 0, 8, 1, 15));
  wPetali = int(map(volume, 0.0, 1, 10, 25));

  //PETALO SEMPRE CENTRALE (fisso)
  push();
  scale(wPetali / 100);

  push();
  for (let i = 0; i < nPetali; i++) {
    noStroke();
    fill(colorePetali[0]);
    ellipse(0, -wPetali * 40, wPetali * 30, 60 * wPetali);
    fill(colorePetali[1]);
    ellipse(0, -wPetali * 20, wPetali * 30, 40 * wPetali);
  }
  pop();

  //PETALI RUOTATI A DX
  push();
  for (let i = 0; i < nPetali; i++) {
    noStroke();
    fill(colorePetali[0]);
    rotate(-PI / 5);
    ellipse(0, -wPetali * 40, wPetali * 30, 60 * wPetali);
    fill(colorePetali[1]);
    ellipse(0, -wPetali * 20, wPetali * 30, 40 * wPetali);
  }
  pop();

  //PETALI RUOTATI A SX
  push();
  for (let i = 0; i < nPetali; i++) {
    noStroke();
    fill(colorePetali[0]);
    rotate(PI / 5);
    ellipse(0, -wPetali * 40, wPetali * 30, 60 * wPetali);
    fill(colorePetali[1]);
    ellipse(0, -wPetali * 20, wPetali * 30, 40 * wPetali);
  }
  pop();

  //centro pallozzo-semicerchio
  fill(colorePetali[2]);
  noStroke();
  ellipse(0, 0, wPetali * 30, wPetali * 30);

  pop();
  pop();
}

function mandaDati() {
  const props = {
    _n: n,
    _t: t,
    _strum: strum,
    _frequenza: frequenza,
    _volume: volume,
    _verde: verde,
    _index_f1: index_f1,
    _index_f2: index_f2,
    _index_f3: index_f3,
    _w_leave: w_leave,
    _h_leave: h_leave,
    _qualeFiore: qualeFiore,
    _whereleave1: whereleave1,
    _whereleave2: whereleave2,
    _whereleave3: whereleave3,
    _j1: j1,
    _j2: j2,
    _k1: k1,
    _k2: k2,
    _l1: l1,
    _l2: l2,
    _colorePetali: colorePetali,
    _distanza: distanza,
    _ceunbruco: ceunbruco,
    _ceunacoccinella: ceunacoccinella,
    _ceunafarfalla: ceunafarfalla,
    _qualColInsetto: qualColInsetto,
    _xx: xx,
    _nome: result,
  };
  addFlower(props);
  window.open("home.html", "_self");
}

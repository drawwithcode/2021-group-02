//def24gen 12:23
let position = 50;

let nomeFiore;
let posizioneFiore;

let set;
let distanza;
let arretra;

let arrayFarfalle;
let arrayCoccinelle;
let arrayBruchi;

let giorno;
let pome;
let notte;
let song;
let x = 0;
let h;
let n;
let m; //interruttore musica
let mousebasic;
let mousetitolo;
let txt =
  "Arcàdia~LEAVE YOUR MESSAGE~Arcàdia~LEAVE YOUR MESSAGE~Arcàdia~LEAVE YOUR MESSAGE~Arcàdia~LEAVE YOUR MESSAGE~";
let inc = 0;
let fft;
let spectrum;
let w = 20;
var volhistory = [];

let grassy;

let coloreTesto;

function preload() {
  song = loadSound("./assets/sound1.mp3");
  giorno = loadImage("./assets/giorno.png");
  pome = loadImage("./assets/pome.png");
  notte = loadImage("./assets/notte.png");
  mousebasic = loadImage("./assets/farfaperta.png");
  mousetitolo = loadImage("./assets/farfchiusa.png");

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

  fontNeueThin = loadFont("./assets/NeueHaasDisplayXThin.ttf");
  fontEditorial = loadFont("./assets/PPEditorialNew-UltralightItalic.otf");
}
function setup() {
  createCanvas(4000, windowHeight); // scroll orizzontale lungo 4000, come anche l'immagine
  console.log(height);
  grass = new yard();

  arrayFarfalle = [farfallaImg, farfallaImg1, farfallaImg2, farfallaImg3];
  arrayCoccinelle = [
    coccinellaImg,
    coccinellaImg1,
    coccinellaImg2,
    coccinellaImg3,
  ];
  arrayBruchi = [brucoImg, brucoImg1, brucoImg2, brucoImg3];

  noCursor();
  fft = new p5.FFT(0.9, 64);
  m = false;
  console.log("HO REFRESHATO");
  /* if (mouseX > n) {
    if (song.isPlaying() == false) {
      song.play();
    }
  } else {
    song.stop();
  } */
}

function draw() {
  //cursore
  n = 0;
  if (mouseY > 40 && mouseY < 150) {
    cursor("assets/farfaperta.png");
  } else {
    cursor("assets/farfchiusa.png");
  }

  //musica sottofondo

  if (mouseX > n && m === false) {
    if (song.isPlaying() == false) {
      song.play();
      m = true;
      console.log("muovo il mouse così parta la canzone la prima volta");
    }
  }

  //cambio giorno pome notte
  h = hour();
  if (h > 8 && h < 17) {
    image(giorno, 0, 0);
    coloreTesto = "black";
  } else if (h >= 17 && h < 20) {
    image(pome, 0, 0);
    coloreTesto = "black";
  } else if (h >= 20 && h <= 24) {
    image(notte, 0, 0);
    coloreTesto = "white";
  } else if (h >= 0 && h < 8) {
    image(notte, 0, 0);
    coloreTesto = "white";
  }

  // barrette suono
  spectrum = fft.analyze(16);
  for (var i = 0; i < spectrum.length / 7; i += 2) {
    var amp = spectrum[i];
    var y = map(amp, 0, 256, w, 0);

    stroke(coloreTesto);
    rect(90 + i * 3, y + 10, 1, w - y);
  }

  grass.update();

  //about

  push();
  noStroke();
  textFont(fontEditorial);
  textAlign(LEFT);
  textSize(25);
  fill(coloreTesto);
  text("About", 20, 30);
  //rect(90, 30, 30, -25);
  pop();

  //titolo che scorre

  textSize(150);
  fill(coloreTesto);
  textFont(fontNeueThin);
  text(txt, -inc, 160);
  if (inc < 2098) {
    inc += 1;
  } else {
    inc = 0;
  }

  push();

  if (allFlower) {
    for (key in allFlower) {
      const data = allFlower[key];
      distanza = data._distanza;
      set = 100 + distanza;
      let randomFarfalla;
      let randomBruchi;
      let randomCoccinelle;

      // console.log(allFlower[key].nome);
      translate(distanza, 0);
      console.log(distanza);

      //-------INIZIO GAMBO--------

      strokeWeight(8);
      stroke(data._verde); //!!!!!

      push();
      noFill();
      translate(0, 0);
      //ora ho deciso che 200 è la massima altezza del gambo
      //t è lo spazio tra top della oagina e top del gambo
      let index_f1 = (data._j2 * (height - data._t)) / data._j1;
      let index_f2 = (data._k2 * (height - data._t)) / data._k1;
      let index_f3 = (data._l2 * (height - data._t)) / data._l1;

      beginShape();
      //cima
      //Ho sostituito alla coordinata x quanto "stabilito" dentro al ciclo for, considerando per y il valore minimo (+ in alto nella canva)cioè t
      // vertex(map(sin(n * (t * 0.01)), -1, 1, -strum, strum), t);

      //onda (tutti gli altri punti): descrivo la curva
      for (var y = data._t; y < height; y++) {
        var angle = data._n * (y * 0.01);
        // map x between 0 and width to 0 and Two Pi
        var x = map(sin(angle), -1, 1, -data._strum, data._strum);
        vertex(x, y);
      }
      //fondo
      //Ho sostituito alla coordinata x quanto "stabilito" dentro al ciclo for, considerando per y valore massimo cioè height
      //vertex(map(sin(n * (height * 0.01)), -1, 1, -strum, strum), height);

      endShape();

      //foglie
      //whereleave è uno degli angoli calcolati nel ciclo for
      fill(data._verde); //!!!!
      //a y sostituisco height - 10 che combacia con il corner dell'ellisse
      push();
      translate(
        map(sin(data._whereleave1), -1, 1, -data._strum, data._strum),
        height - index_f1
      ),
        (data._whereleave1 = data._n * ((height - index_f1) * 0.01));
      ellipse(0 + data._w_leave / 2, 0, data._w_leave, data._h_leave);
      pop();

      push();
      translate(
        map(sin(data._whereleave2), -1, 1, -data._strum, data._strum),
        height - index_f2
      ),
        (data._whereleave2 = data._n * ((height - index_f2) * 0.01));
      ellipse(0 - data._w_leave / 2, 0, data._w_leave, data._h_leave);
      pop();

      push();
      translate(
        map(sin(data._whereleave3), -1, 1, -data._strum, data._strum),
        height - index_f3
      ),
        (data._whereleave3 = data._n * ((height - index_f3) * 0.01));
      ellipse(0 + data._w_leave / 2, 0, data._w_leave, data._h_leave);
      pop();

      pop();

      //----------FIORE 1----------
      if (data._qualeFiore == 1) {
        push();
        translate(
          map(
            sin(data._n * (data._t * 0.01)),
            -1,
            1,
            -data._strum,
            data._strum
          ) + 0,
          data._t
        );

        let nPetali = int(map(data._frequenza, 0, 8, 2, 12));
        let wPetali = int(map(data._volume, 0, 1, 40, 60));
        let radius = (wPetali * 4) / 3;
        let hPetali = 1.5 * wPetali;
        let wCorolla = 2 * wPetali;
        let hCorolla = 2 * hPetali;
        let stems = radius;

        //fiore ellissi
        noStroke();

        //base
        fill(data._verde); //!!!!
        for (let i = 0; i < nPetali - 1; i++) {
          ellipse(0, 1.5 * radius, wCorolla, hCorolla);
          rotate((2 * PI) / (nPetali - 1));
        }

        //corolla esterna
        fill(data._colorePetali[0]);
        for (let i = 0; i < nPetali; i++) {
          rotate((2 * PI) / nPetali);
          ellipse(0, radius, wCorolla, hCorolla);
        }

        //corolla interna
        fill(data._colorePetali[1]);
        for (let i = 0; i < nPetali; i++) {
          rotate((2 * PI) / nPetali);
          ellipse(0, radius, wPetali, hPetali);
        }

        //pistilli
        push();
        rectMode(CENTER);
        fill(data._colorePetali[2]);
        for (let i = 0; i < nPetali; i++) {
          rotate((2 * PI) / nPetali);
          ellipse(0, stems, 10, 10);
          rect(0, radius / 2, 2, stems);
        }
        pop();
        /*
        push();
        noStroke();
        textAlign(CENTER);
        textSize(30);
        text(data._nome, -nome.length / 2, data._t);
        pop();*/
        pop();
        //------FIORE 2--------
      } else if (data._qualeFiore == 2) {
        push();
        translate(
          map(
            sin(data._n * (data._t * 0.01)),
            -1,
            1,
            -data._strum,
            data._strum
          ) + 0,
          data._t
        );

        let nPetali = int(map(data._frequenza, 0, 8, 1, 8));
        let wPetali = int(map(data._volume, 0.0, 1, 70, 150));
        //console.log("nPetali" + nPetali);

        push();
        //facciamo il fiore
        //tuorlo
        noStroke();
        fill(data._colorePetali[2]);
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
          fill(data._colorePetali[0]);
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

        //--------FIORE 3--------------
      } else if (data._qualeFiore == 3) {
        push();
        translate(
          map(
            sin(data._n * (data._t * 0.01)),
            -1,
            1,
            -data._strum,
            data._strum
          ) + 0,
          data._t
        );

        let nPetali = int(map(data._frequenza, 0, 8, 3, 10));
        let wPetali = int(map(data._volume, 0.0, 1, 35, 70));

        scale(wPetali / 10);

        push();
        rectMode(CENTER);
        noStroke();
        //PETALI
        for (let i = 0; i < nPetali; i++) {
          rotate(PI / nPetali);
          fill(data._colorePetali[0]);
          noStroke();
          //primi due parametri in base a fine del gambo
          rect(0, 0, 5, 50);
        }
        pop();
        //TUORLO

        for (let i = 3 * nPetali; i > 0; i = i - 7) {
          ellipseMode(CENTER);
          stroke(data._colorePetali[1]);
          strokeWeight(1);
          fill(data._colorePetali[2]);
          //primi due parametri vanno in base a fine del gambo
          ellipse(0, 0, i);
        }

        pop();

        //----------FIORE 4---------
      } else if (data._qualeFiore == 4) {
        push();
        translate(
          map(
            sin(data._n * (data._t * 0.01)),
            -1,
            1,
            -data._strum,
            data._strum
          ) + 0,
          data._t
        );

        let nPetali = int(map(data._frequenza / 5, 0, 8, 2, 25));
        let wPetali = int(map(data._volume, 0, 1, 3, 7));

        //PETALO SEMPRE CENTRALE (fisso)
        push();
        scale(wPetali / 10);

        push();
        for (let i = 0; i < nPetali; i++) {
          noStroke();
          fill(data._colorePetali[0]);
          //primi 2 parametri dei triangoli vanno in base a fine gambo
          triangle(0, 0, -30, -300, 30, -300);
          fill(data._colorePetali[1]);
          triangle(0, 0, -25, -250, 25, -250);
        }
        pop();

        //PETALI RUOTATI A DX
        push();
        for (let i = 0; i < nPetali; i++) {
          noStroke();
          fill(data._colorePetali[0]);
          rotate(-PI / 11); //VALORI DA 11 A 15 mantengono petali in campo alto e dx
          //primi 2 parametri dei triangoli vanno in base a fine gambo
          triangle(0, 0, -30, -300, 30, -300);
          fill(data._colorePetali[1]);
          triangle(0, 0, -25, -250, 25, -250);
        }
        pop();

        //PETALI RUOTATI A SX
        push();
        for (let i = 0; i < nPetali; i++) {
          noStroke();
          fill(data._colorePetali[0]);
          rotate(PI / 11); //VALORI DA 11 A 15 mantengono petali in campo alto e sx
          //primi 2 parametri dei triangoli vanno in base a fine gambo
          triangle(0, 0, -30, -300, 30, -300);
          fill(data._colorePetali[1]);
          triangle(0, 0, -25, -250, 25, -250);
        }
        pop();

        //centro pallozzo-semicerchio
        fill(data._colorePetali[2]);
        noStroke();
        //primi due parametri di arc in base a fine gambo
        arc(0, 0, wPetali * 50, wPetali * 50, PI, 0, CHORD);
        pop();

        pop();

        //-----------FIORE 5----------
      } else if (data._qualeFiore == 5) {
        push();
        translate(
          map(
            sin(data._n * (data._t * 0.01)),
            -1,
            1,
            -data._strum,
            data._strum
          ) + 0,
          data._t
        );

        let larghezza_ellisse;
        let nPetali = int(map(data._frequenza, 0, 8, 3, 6));
        let wPetali = int(map(data._volume, 0, 1, 3, 10));

        scale(wPetali / 3); //variabile frquenza o volume */

        //PETALO SEMPRE CENTRALE (fisso)
        push();
        translate(0, -45);
        for (let i = 0; i < nPetali / 5; i++) {
          stroke(data._verde);
          strokeWeight(3);
          line(0, 0, 0, -wPetali * 10);
          stroke(data._colorePetali[1]);
          fill(data._colorePetali[1]);
          ellipse(0, -wPetali * 10, 10, 10);
        }
        pop();

        //PETALI RUOTATI A DX
        push();
        translate(0, -45);
        for (let i = 0; i < nPetali / 3; i++) {
          stroke(data._verde);
          strokeWeight(3);
          fill(data._colorePetali[0]);
          rotate(-PI / 5);
          line(0, 0, 0, -wPetali * 10);
          stroke(data._colorePetali[1]);
          fill(data._colorePetali[1]);
          ellipse(0, -wPetali * 10, 10, 10);
        }
        pop();

        push();
        translate(0, -45);
        for (let i = 0; i < nPetali / 3; i++) {
          stroke(data._verde);
          strokeWeight(3);
          fill(data._colorePetali[0]);
          rotate(PI / 5);
          line(0, 0, 0, -wPetali * 10);
          stroke(data._colorePetali[1]);
          fill(data._colorePetali[1]);
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
        //console.log(wPetali);

        //colore fondo
        fill(data._colorePetali[0]);
        strokeWeight(3);
        stroke(data._colorePetali[2]);
        ellipse(0, 0, larghezza_ellisse * wPetali, 90);

        //petali
        /*in base al n° max di petali che concordiamo, dobbiamo decidere i parametri entro cui variano dist_gambo_top, diametro_fiore */
        for (let i = 0; i < wPetali; i++) {
          noFill();
          ellipseMode(CENTER);
          ellipse(0, 0, larghezza_ellisse * i, 90);
        }

        pop();

        //---------------FIORE 6--------------
      } else if (data._qualeFiore == 6) {
        push();
        translate(
          map(
            sin(data._n * (data._t * 0.01)),
            -1,
            1,
            -data._strum,
            data._strum
          ) + 0,
          data._t
        );
        let nPetali = int(map(data._frequenza / 5, 0, 8, 1, 15));
        let wPetali = int(map(data._volume, 0.0, 1, 10, 25));

        //PETALO SEMPRE CENTRALE (fisso)
        push();
        scale(wPetali / 100);

        push();
        for (let i = 0; i < nPetali; i++) {
          noStroke();
          fill(data._colorePetali[0]);
          //primi 2 parametri dei triangoli vanno in base a fine gambo
          ellipse(0, -wPetali * 40, wPetali * 30, 60 * wPetali);
          fill(data._colorePetali[1]);
          ellipse(0, -wPetali * 20, wPetali * 30, 40 * wPetali);
        }
        pop();

        //PETALI RUOTATI A DX
        push();
        for (let i = 0; i < nPetali; i++) {
          noStroke();
          fill(data._colorePetali[0]);
          rotate(-PI / 5); //VALORI DA 11 A 15 mantengono petali in campo alto e dx
          //primi 2 parametri dei triangoli vanno in base a fine gambo
          ellipse(0, -wPetali * 40, wPetali * 30, 60 * wPetali);
          fill(data._colorePetali[1]);
          ellipse(0, -wPetali * 20, wPetali * 30, 40 * wPetali);
        }
        pop();

        //PETALI RUOTATI A SX
        push();
        for (let i = 0; i < nPetali; i++) {
          noStroke();
          fill(data._colorePetali[0]);
          rotate(PI / 5);
          ellipse(0, -wPetali * 40, wPetali * 30, 60 * wPetali);
          fill(data._colorePetali[1]);
          ellipse(0, -wPetali * 20, wPetali * 30, 40 * wPetali);
        }
        pop();

        //centro pallozzo-semicerchio
        fill(data._colorePetali[2]);
        noStroke();
        //primi due parametri di arc in base a fine gambo
        ellipse(0, 0, wPetali * 30, wPetali * 30);

        pop();
        pop();
      }

      // fill(data.r, data.g, data.b);
      //ellipse(data.x, data.y, data.c);
      //*** INIZIO BLOCCO INSETTI

      push();
      if (data._ceunbruco === true) {
        randomBruchi = arrayBruchi[data._qualColInsetto];
        image(
          randomBruchi,
          0 - data._j1 * 10,
          height - randomBruchi.height / 4,
          randomBruchi.width / 4,
          randomBruchi.height / 4
        );
      }

      if (data._ceunacoccinella === true) {
        randomCoccinelle = arrayCoccinelle[data._qualColInsetto];
        image(
          randomCoccinelle,
          0, //coccinella è sul gambo
          data._j1 * 125,
          randomCoccinelle.width / 5,
          randomCoccinelle.height / 5
        );
      }

      if (data._ceunafarfalla === true) {
        randomFarfalla = arrayFarfalle[data._qualColInsetto];
        image(
          randomFarfalla,
          data._l1 * 10,
          100 + data._l1 * 100,
          randomFarfalla.width / 6,
          randomFarfalla.height / 6
        );
      }

      pop();
      //*** FINE BLOCCO INSETTI
    }
  }
  pop();
  push();
  noStroke();
  fill(coloreTesto);
  textAlign(CENTER);
  textSize(30);
  textFont(fontEditorial);
  text(nomeFiore, posizioneFiore, 200);
  pop();
}

function mouseClicked() {
  if (mouseY > 40 && mouseY < 150) {
    window.open("nero1.html", "_self"); //titolo che inizia creazione fiore
  }
  if (mouseX > 20 && mouseX < 60 && mouseY > 5 && mouseY < 30) {
    window.open("about.html", "_self");
  } // tasto about

  //tasto musica
  if (mouseX > 80 && mouseX < 120 && mouseY > 5 && mouseY < 30) {
    if (song.isPlaying() == false) {
      song.play();
      console.log("FACCIO RIPARTIRE LA CANZONE CON UN CLICK");
    } else {
      console.log("SPENGO LA CANZONE CON UN CLICK");
      song.stop();
    }
  }
}

function mouseMoved() {
  if (!allFlower) return;
  const flowersKeys = Object.keys(allFlower);
  const positions = [];
  for (key in allFlower) {
    const flower = allFlower[key];
    positions.push(flower._xx);
  }
  const distances = positions.map(function (position) {
    const distance = abs(position - mouseX);
    return distance;
  });
  //const fiorellino = allFlower[key];
  const minDistance = min(distances);
  const index = distances.indexOf(minDistance);
  const selectedKey = flowersKeys[index];
  const selectedFlower = allFlower[selectedKey];
  console.log(selectedFlower._nome);
  nomeFiore = selectedFlower._nome;
  posizioneFiore = selectedFlower._xx;
}

//erbetta
//https://www.youtube.com/watch?v=FH59hqrvWxU

function yard() {
  this.grass = [];
  this.roff = [];
  this.rwave = [];
  this.size = [];
  this.seg = [];
  this.index = 0;
  this.population = 400; //densità erbetta

  for (let x = 0; x < width; x += width / this.population) {
    this.index += 1;
    this.grass.push(x);
    this.roff.push(this.index * 0.065 + 0.015);
    this.rwave.push(0);
    this.size.push(random(35, 15)); //altezza erbetta
    this.seg.push(0.85);
  }

  this.update = function () {
    for (let i = 0; i < this.index; i++) {
      let len = this.size[i];
      push();
      translate(this.grass[i], height); //posizion
      this.blade(len, i);

      pop();
    }
  };

  this.blade = function (len, ind) {
    if (ind / 2 === int(ind / 2)) {
      this.roff[ind] += 0.0025;

      stroke("#00C714");

      rot = map(
        noise(this.roff[ind]),
        0,
        1,
        -QUARTER_PI * 0.75,
        QUARTER_PI * 0.75
      );
    }
    if (ind / 2 != int(ind / 2)) {
      this.roff[ind] += 0.0025;

      stroke("green");
      rot = map(
        -sin(this.roff[ind]),
        -1,
        1,
        -QUARTER_PI * 0.25,
        QUARTER_PI * 0.25
      );
    }

    strokeWeight(5); //spessore fili

    rotate(rot);
    line(0, 0, 0, -len);
    translate(0, -len);

    if (len > 20) {
      this.blade(len * this.seg[ind], ind);
    }
  };
}

console.log("firebase setup is loaded");

let allFlower; // contiene tutti i messaggi
let addFlower; //aggiunge message al database

async function firebaseSetup() {
  // load firebase modules using import("url")
  const fb_app_url = "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
  const fb_database_url =
    "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

  //load libraries
  //importo delle funzioni che voglio utilizzare
  const { initializeApp } = await import(fb_app_url);
  const { getDatabase, ref, push, set, onValue } = await import(
    fb_database_url
  );

  const firebaseConfig = {
    apiKey: "AIzaSyBokXEyrnGrtKU6EtyFIdknCdghA-P3TDk",
    authDomain: "ardcadia-garden-2022.firebaseapp.com",
    projectId: "ardcadia-garden-2022",
    storageBucket: "ardcadia-garden-2022.appspot.com",
    messagingSenderId: "984796107602",
    appId: "1:984796107602:web:63b8bbc2262cfd361be08b",
    databaseURL:
      "https://ardcadia-garden-2022-default-rtdb.europe-west1.firebasedatabase.app/",
  };

  const app = initializeApp(firebaseConfig);
  const myDatabase = getDatabase(app);
  //il database si aggiorna automaticamente ogni volta che riapro il sito.
  //posso creare la struttura sia dal database stesso che dal codice
  //posso creare delle strutture di cartelle dentro ad altre
  const flowerRef = ref(myDatabase, "messages/flower");
  console.log(flowerRef);

  //funtion to retrive the greetings: funzione che guarda i dati e nota se vien aggiunto qualcosa
  onValue(flowerRef, function (snapshot) {
    //snapshot: dato contenuto dentro i greetings
    //the data is retrive with snapshot.val()
    allFlower = snapshot.val();
    console.log(allFlower);
  });
  //per aggiungere un oggetto creo una funzione che ha una proprietà
  //creo una nuova ref dentro la funzione  = push (vecchia proprietà)
  //proprietà è un oggetto
  //{text: 'text of the message'
  //x: 'x position'
  //y: 'y position'

  addFlower = function (properties) {
    //creo reference
    //push, metto la proprietà nel punto dove decido io del database
    const newflowerRef = push(flowerRef);
    //aggiungo dati al database
    // creo una proprietà (newgreetingsRef, con all'interno dei dati)
    set(newflowerRef, properties);
    //mydatabase: creo database
    //greetingRef: navigo le cartelle (metto i messaggi nella cartella messages e nella subcartella greetings)
    //con la fuzione dico: ogni volta che voglio aggiungere un greeting scelgo la cartella con push
    //push è per creare la posizione dell'oggetto che creerò
  };
}

firebaseSetup();

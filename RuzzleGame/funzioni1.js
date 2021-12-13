let clientID = null;
let letters = [];
let contTim = 0;
let ws = new WebSocket("ws://localhost:3002"); //impostare ogni volta indirizzo ip dispostivo server => 172.22.194.128
let nomeUtente = null;
let contatorePunti = 0;
let Vocali = "AEIOU";
let Consonanti = "BCDFGHJKLMNPQRSTVWXYZ";
var Parola = "";
let c;
var VettParole = [];
var Verifica = 0;
var Regola1 = [1, 3, 1];
var Regola2 = [3, 1];
var Regola3 = [1];
var Regola4 = [1, 2, 1, 1];
var Regola1R = [-1, -3, -1];
var Regola2R = [-3, -1];
var Regola3R = [-1];
var Regola4R = [-1, -2, -1, -1];
var DaBloccare = [];
var Indice = 0;
var Punteggio = 0;
var ParolaCorretta = "";
ws.onmessage = (message) => {
  const response = JSON.parse(message.data);
  if (response.method === "connect") {
    clientID = response.clientID;
    console.log("CLIENT ID: " + clientID + "CONNECTED");
  }
  if (response.method === "go") {
    if (contTim == 2) {
      document.getElementById("geniou").style.visibility = "hidden";
    }
    letters = response.letters;
    //start della partita
    console.log("Partita iniziata!");
    VettParole = [];
    if (contTim <= 1) {
      document.getElementById("outConsole").innerHTML =
        "<div class='containerOutput'>PARTITA INIZIATA!</div>";
      RandomLettere();
      document.getElementById("gamer").style.visibility = "visible";
      contTim++;
    }
  }
  if (response.method === "mancano15") {
    //mancano 15 secondi alla fine della partita
    document.getElementById("outConsole").innerHTML =
      "<div class='containerOutput'>Mancano 15 secondi</div>";
  }
  if (response.method === "finePartitaClient") {
    //la partita è finita
    console.log("FINE PARTITA!");
    document.getElementById("outConsole").innerHTML =
      "<div class='containerOutput'>PARTITA FINITA!</div>";
    document.getElementById("gamer").style.visibility = "hidden";
    for (let i = 1; i <= 16; i++) {
      let SPAN = "Sp" + i;
      document.getElementById(SPAN).style.visibility = "hidden";
    }
  }
  if (response.method === "resetPuntiRound2") {
    contatorePunti = 0;
  }
};

function accedi() {
  nomeUtente = document.getElementById("nomeUtente").value;
  const payLoad = {
    method: "accept",
    type: "client",
    clientID: clientID,
    nome: nomeUtente,
  };
  ws.send(JSON.stringify(payLoad));
  console.log("Accesso eseguito");
  document.getElementById("gamer").style.visibility = "visible";
  document.getElementById("accedi").style.visibility = "hidden";
}

function incrementaPunti(punti, parola) {
  contatorePunti = contatorePunti + punti;
  const payLoad = {
    method: "incPunti",
    clientID: clientID,
    punto: contatorePunti,
    nome: nomeUtente,
    parola: parola,
  };
  ws.send(JSON.stringify(payLoad));
}
function RandomLettere() {
  document.getElementById("P1").innerHTML = letters[0];
  document.getElementById("P2").innerHTML = letters[1];
  document.getElementById("P3").innerHTML = letters[2];
  document.getElementById("P4").innerHTML = letters[3];
  document.getElementById("P5").innerHTML = letters[4];
  document.getElementById("P6").innerHTML = letters[5];
  document.getElementById("P7").innerHTML = letters[6];
  document.getElementById("P8").innerHTML = letters[7];
  document.getElementById("P9").innerHTML = letters[8];
  document.getElementById("P10").innerHTML = letters[9];
  document.getElementById("P11").innerHTML = letters[10];
  document.getElementById("P12").innerHTML = letters[11];
  document.getElementById("P13").innerHTML = letters[12];
  document.getElementById("P14").innerHTML = letters[13];
  document.getElementById("P15").innerHTML = letters[14];
  document.getElementById("P16").innerHTML = letters[15];
  EnableAll();
  for (let i = 1; i <= 16; i++) {
    let SPAN = "Sp" + i;
    document.getElementById(SPAN).style.visibility = "visible";
  }
  for (let i = 1; i <= 16; i++) {
    if (
      document.getElementById("P" + i).textContent == "A" ||
      document.getElementById("P" + i).textContent == "E" ||
      document.getElementById("P" + i).textContent == "I" ||
      document.getElementById("P" + i).textContent == "O" ||
      document.getElementById("P" + i).textContent == "U"
    ) {
      document.getElementById("Sp" + i).innerHTML = "1";
    } else if (
      document.getElementById("P" + i).textContent == "W" ||
      document.getElementById("P" + i).textContent == "Y" ||
      document.getElementById("P" + i).textContent == "Q" ||
      document.getElementById("P" + i).textContent == "H" ||
      document.getElementById("P" + i).textContent == "J" ||
      document.getElementById("P" + i).textContent == "K" ||
      document.getElementById("P" + i).textContent == "Z" ||
      document.getElementById("P" + i).textContent == "X"
    ) {
      document.getElementById("Sp" + i).innerHTML = "3";
    } else {
      document.getElementById("Sp" + i).innerHTML = "2";
    }
  }
}
function EnableAll() {
  for (let i = 1; i <= 16; i++) {
    let BTN = "btn" + i;
    document.getElementById(BTN).disabled = false;
  }
}
function DisableAll() {
  for (let i = 1; i <= 16; i++) {
    let BTN = "btn" + i;
    document.getElementById(BTN).disabled = true;
  }
}

function Evidenzia(id) {
  if (id == "btn1" || id == "btn5" || id == "btn9") {
    let CodiceBtn = id.replace("btn", "");
    let CodiceBtnCopia = id.replace("btn", "");
    DisableAll();
    for (let i = 0; i < Regola1.length; i++) {
      let BTN = "btn" + (Number(CodiceBtn) + Number(Regola1[i]));
      CodiceBtn = Number(CodiceBtn) + Number(Regola1[i]);
      document.getElementById(BTN).disabled = false;
    }
    if (id == "btn5" || id == "btn9") {
      for (let i = 0; i < Regola2R.length; i++) {
        let BTN = "btn" + (Number(CodiceBtnCopia) + Number(Regola2R[i]));
        CodiceBtnCopia = Number(CodiceBtnCopia) + Number(Regola2R[i]);
        document.getElementById(BTN).disabled = false;
      }
    }
  } else if (id == "btn4" || id == "btn8" || id == "btn12") {
    let CodiceBtn = id.replace("btn", "");
    let CodiceBtnCopia = id.replace("btn", "");
    DisableAll();
    for (let i = 0; i < Regola2.length; i++) {
      let BTN = "btn" + (Number(CodiceBtn) + Number(Regola2[i]));
      CodiceBtn = Number(CodiceBtn) + Number(Regola2[i]);
      document.getElementById(BTN).disabled = false;
    }
    if (id == "btn4") {
      for (let i = 0; i < Regola3R.length; i++) {
        let BTN = "btn" + (Number(CodiceBtnCopia) + Number(Regola3R[i]));
        CodiceBtnCopia = Number(CodiceBtnCopia) + Number(Regola3R[i]);
        document.getElementById(BTN).disabled = false;
      }
    } else {
      for (let i = 0; i < Regola1R.length; i++) {
        let BTN = "btn" + (Number(CodiceBtnCopia) + Number(Regola1R[i]));
        CodiceBtnCopia = Number(CodiceBtnCopia) + Number(Regola1R[i]);
        document.getElementById(BTN).disabled = false;
      }
    }
  } else if (id == "btn13" || id == "btn14" || id == "btn15") {
    let CodiceBtn = id.replace("btn", "");
    let CodiceCopia = id.replace("btn", "");
    DisableAll();
    for (let i = 0; i < Regola3.length; i++) {
      let BTN = "btn" + (Number(CodiceBtn) + Number(Regola3[i]));
      CodiceBtn = Number(CodiceBtn) + Number(Regola3[i]);
      document.getElementById(BTN).disabled = false;
    }
    if (id == "btn13") {
      for (let i = 0; i < Regola2R.length; i++) {
        let BTN = "btn" + (Number(CodiceCopia) + Number(Regola2R[i]));
        CodiceCopia = Number(CodiceCopia) + Number(Regola2R[i]);
        document.getElementById(BTN).disabled = false;
      }
    } else {
      for (let i = 0; i < Regola4R.length; i++) {
        let BTN = "btn" + (Number(CodiceCopia) + Number(Regola4R[i]));
        CodiceCopia = Number(CodiceCopia) + Number(Regola4R[i]);
        document.getElementById(BTN).disabled = false;
      }
    }
  } else if (
    id == "btn6" ||
    id == "btn7" ||
    id == "btn10" ||
    id == "btn11" ||
    id == "btn2" ||
    id == "btn3"
  ) {
    let CodiceBtn = id.replace("btn", "");
    let CodiceBtnCopia = id.replace("btn", "");
    DisableAll();
    for (let i = 0; i < Regola4.length; i++) {
      let BTN = "btn" + (Number(CodiceBtnCopia) + Number(Regola4[i]));
      CodiceBtnCopia = Number(CodiceBtnCopia) + Number(Regola4[i]);
      document.getElementById(BTN).disabled = false;
    }
    if (id == "btn2" || id == "btn3") {
      for (let i = 0; i < Regola3R.length; i++) {
        let BTN = "btn" + (Number(CodiceBtn) + Number(Regola3R[i]));
        CodiceBtn = Number(CodiceBtn) + Number(Regola3R[i]);
        document.getElementById(BTN).disabled = false;
      }
    } else {
      for (let i = 0; i < Regola4R.length; i++) {
        let BTN = "btn" + (Number(CodiceBtn) + Number(Regola4R[i]));
        CodiceBtn = Number(CodiceBtn) + Number(Regola4R[i]);
        document.getElementById(BTN).disabled = false;
      }
    }
  } else if (id == "btn16") {
    let CodiceBtn = id.replace("btn", "");
    DisableAll();
    for (let i = 0; i < Regola1R.length; i++) {
      let BTN = "btn" + (Number(CodiceBtn) + Number(Regola1R[i]));
      CodiceBtn = Number(CodiceBtn) + Number(Regola1R[i]);
      document.getElementById(BTN).disabled = false;
    }
  }
  document.getElementById(id).style.background = "#FF9900";
  let c = document.getElementById(id).textContent;
  Parola += c;
  DaBloccare[Indice] = id;
  Indice++;
  for (let i = 0; i < DaBloccare.length; i++) {
    document.getElementById(DaBloccare[i]).disabled = true;
  }
  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      DoppioClick();
      Indice = 0;
    }
  };
}
function NotEvidenzia() {
  for (let i = 1; i <= 16; i++) {
    var btn = "btn" + i.toString();
    document.getElementById(btn).style.background = "#FFFFFF";
  }
  EnableAll();
}
function DoppioClick() {
  DaBloccare = [];
  NotEvidenzia();
  let trovato = 0;
  let Lung = Parola.length;
  for (let i = 0; i <= Lung; i += 2) {
    ParolaCorretta += Parola.charAt(i);
  }
  if (ParolaCorretta.length > 1) {
    for (let i = 0; i < VettParole.length; i++) {
      if (ParolaCorretta == VettParole[i]) {
        alert("La parola selezionata è già stata inserita");
        trovato = 1;
      }
    }
    if (trovato == 0) {
      for (let i = -1; i <= Lung; i += 2) {
        Punteggio += Number(Parola.charAt(i));
      }

      incrementaPunti(Punteggio, ParolaCorretta);

      VettParole[VettParole.length] = ParolaCorretta;
    }
  }
  Parola = "";
  ParolaCorretta = "";
  Punteggio = 0;
}

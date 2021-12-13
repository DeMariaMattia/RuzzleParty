const http = require("http");
const app = require("express")();
const consoleServer = require("express")();
const webSocketServer = require("websocket").server;
const httpServerConsole = http.createServer();
const httpServer = http.createServer();
const express = require("express");
let dataFile = [];
const fs = require("fs");

fs.readFile("./letters.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  dataFile = data.split("\n");
});

const clients = [];
const contatore = 0;

consoleServer.get("/", (req, res) =>
  res.sendFile(__dirname + "/indexServer.html")
);
consoleServer.listen(3000, () => console.log("server 3000   localhost:3000  "));

app.get("/", (req, res) => res.sendFile(__dirname + "/Grafica1.html"));
app.use("/StileGrafica1.css", express.static(__dirname + "/StileGrafica1.css"));
app.use("/funzioni1.js", express.static(__dirname + "/funzioni1.js"));

app.listen(3001, () => console.log("client 3001"));

httpServer.listen(3002, () => console.log("listening.. on 3002 (socket)"));

const wsServer = new webSocketServer({
  httpServer: httpServer,
});

wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);

  connection.on("message", (message) => {
    const result = JSON.parse(message.utf8Data);

    if (result.method === "accept") {
      if (result.type === "server") {
        //salvare la connessione nell'array
        const saveClient = {
          connection: connection,
          type: "server",
          clientID: result.clientID,
        };
        //controllo se è già presente un server se c'è già lo elimina per tenerne solo uno nell'array
        for (let i = 0; i < clients.length; i++) {
          if (clients[i].type === "server") {
            const eliminato = clients.splice(i, 1);
          }
        }
        clients.push(saveClient);
      } else if (result.type === "client") {
        const saveClient = {
          connection: connection,
          type: "client",
          clientID: result.clientID,
          nomeUtente: result.nome,
          contatore: contatore,
        };
        console.log("client: " + clientID);
        clients.push(saveClient);
        //invia al server il nome dell'utente che ha fatto l'accesso
        const nometmp = result.nome;
        for (let i = 0; i < clients.length; i++) {
          if (clients[i].type === "server") {
            const payLoad = {
              method: "addUtente",
              nomeUtente: nometmp,
            };
            clients[i].connection.send(JSON.stringify(payLoad));
          }
        }

        //scrittura su console di tutti i clients connessi
        console.log("Clients connessi: ");
        for (let i = 0; i < clients.length; i++) {
          if (clients[i].type === "server") {
            console.log("[SERVER] " + clients[i].clientID);
          }
          if (clients[i].type === "client") {
            console.log("[CLIENT] " + clients[i].clientID);
          }
        }
      }
    }
    if (result.method === "go") {
      //creazione di 16 lettere casuali
      var total = [];
      var consArray = [
        "B",
        "C",
        "D",
        "F",
        "G",
        "H",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "V",
        "Z",
      ];
      var vocArray = ["A", "E", "I", "O", "U"];

      let cont = 0;
      while (cont < 8) {
        let random = Math.floor(Math.random() * consArray.length);
        total.push(consArray[random]);
        random = Math.floor(Math.random() * vocArray.length);
        total.push(vocArray[random]);
        cont++;
      }
      //manda il pacchetto go solo hai clients connessi
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].type === "client") {
          const payLoad = {
            method: "go",
            letters: total,
          };
          clients[i].connection.send(JSON.stringify(payLoad));
        }
      }
    }
    if (result.method === "incPunti") {
      if (checkParola(result.parola)) {
        //inserisce in base a chi gli manda l'id i punti della partita

        for (let i = 0; i < clients.length; i++) {
          if (result.clientID === clients[i].clientID) {
            clients[i].contatore = result.punto;
            const payLoad = {
              method: "incPuntiA",
              nome: result.nome,
              punto: clients[i].contatore,
            };
            for (let i = 0; i < clients.length; i++) {
              if (clients[i].type === "server") {
                clients[i].connection.send(JSON.stringify(payLoad));
              }
            }
          }
        }
      }
    }
    if (result.method === "mancano15Client") {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].type === "client") {
          const payLoad = {
            method: "mancano15",
          };
          clients[i].connection.send(JSON.stringify(payLoad));
        }
      }
    }
    if (result.method === "finePartita") {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].type === "client") {
          const payLoad = {
            method: "finePartitaClient",
          };
          clients[i].connection.send(JSON.stringify(payLoad));
        }
      }
    }
    if (result.method === "resetPuntiRound") {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].type === "client") {
          clients[i].contatore = 0;
        }
      }
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].type === "client") {
          const payLoad = {
            method: "resetPuntiRound2",
          };
          clients[i].connection.send(JSON.stringify(payLoad));
        }
      }
    }
  });

  //generare il client ID
  const clientID = guid();
  const payLoad = {
    method: "connect",
    clientID: clientID,
  };
  connection.send(JSON.stringify(payLoad));
  //clients[0].connection.send
});

//generazione di id univoco
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

const guid = () =>
  (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();

const checkParola = (e) => {
  for (let i = 0; i < dataFile.length; i++) {
    if (dataFile[i] == e.toLowerCase()) {
      return true;
    }
  }
  return false;
};

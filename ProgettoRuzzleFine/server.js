const http = require("http");
const app = require("express")();
const consoleServer = require("express")();
const webSocketServer = require("websocket").server;
const httpServerConsole = http.createServer();
const httpServer = http.createServer();


const clients = [];

consoleServer.get("/", (req, res) => res.sendFile(__dirname + "/indexServer.html"));
consoleServer.listen(3000, () => console.log("Apertura console server 3000"));

app.get("/", (req, res) => res.sendFile(__dirname + "/indexClient.html"));
app.listen(3001, () => console.log("listening client... on 3001"));
httpServer.listen(3002, () => console.log("listening.. on 3002 (socket client)"));


const wsServer = new webSocketServer({
    "httpServer": httpServer
});

wsServer.on("request", request => {
    const connection = request.accept(null, request.origin);


    connection.on("message", message => {
        const result = JSON.parse(message.utf8Data);

        if (result.method === "accept") {
            if (result.type === "server") {
                //salvare la connessione nell'array
                const saveClient = {
                    "connection": connection,
                    "type": "server",
                    "clientID": clientID
                }
                //controllo se è già presente un server se c'è già lo elimina per tenerne solo uno nell'array
                for (let i = 0; i < clients.length; i++) {
                    if (clients[i].type === "server") {
                        const eliminato = clients.splice(i, 1);
                    }
                }
                clients.push(saveClient);
            } else if (result.type === "client") {
                const saveClient = {
                    "connection": connection,
                    "type": "client",
                    "clientID": clientID
                }
                console.log("client: " + clientID);
                clients.push(saveClient);
            }
        }
        if (result.method === "go") {

            for (let i = 0; i < clients.length; i++) {
                if (clients[i].type === "client") {
                    const payLoad = {
                        "method": "go"
                    }
                    clients[i].connection.send(JSON.stringify(payLoad));
                }

            }

        }


    });


    //generare il client ID
    const clientID = guid();


    const payLoad = {
        "method": "connect",
        "clientID": clientID
    }
    connection.send(JSON.stringify(payLoad));
    //clients[0].connection.send
});

//generazione di id univoco
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
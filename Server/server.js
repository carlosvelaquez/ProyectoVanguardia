const port = 6969;
const WebSocket = require("ws");

const BlockchainManager = require("./BlockchainManager.js");

const bc = new BlockchainManager();

const wss = new WebSocket.Server({ port });

let nodeCount = 2;
let voteCount = 0;

let t = {};

wss.on("connection", (ws) => {
  ws.on("message", (m) => {
    const parsed = JSON.parse(m);
    const { type, idClient } = parsed;

    switch (type) {
      case "transaction": {
        t = parsed;
        bc.getPublicKey(idClient);

        console.log("Sending transaction for vote", parsed);

        wss.clients.forEach((c) => {
          c.send(JSON.stringify(parsed));
        });

        break;
      }

      case "vote": {
        console.log("Received vote", parsed);
        if (parsed.vote === 1) {
          voteCount += 1;
        }

        if (voteCount >= nodeCount) {
          bc.appendTransaction(t);
          voteCount = 0;
        }
        break;
      }

      default: {
        console.log("Received message with invalid type", parsed);
        break;
      }
    }
  });
});

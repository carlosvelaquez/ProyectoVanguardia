const WebSocket = require("ws");

const endpoint = "localhost";
const port = 6969;

const ws = new WebSocket(`ws://${endpoint}:${port}`);

const dummyVote = {
  type: "vote",
  transId: "transuid",
  vote: 1,
};

ws.on("open", function open() {
  console.log("Connection Established");

  ws.on("message", (m) => {
    console.log("Verifying transaction", JSON.parse(m));
    const parsed = JSON.parse(m);

    //Lógica de aceptación va acá

    console.log("Transaction approved, voting...");
    ws.send(JSON.stringify(dummyVote));
    console.log("Vote sent.");
  });
});

// SERVER recieves
/*
{
    type: "transaction",
    transaction: {
        type: (( 1 = create, 2 = delete, 3 = transfer )),
        prodId: string,
        hashFirm: string
    }
    publicKey: string,
    idClient: string,
    transId: string,
}
*/

// SERVER returns
/*
{
    transId: string,
    hash: string,
}
*/

// NODO recieves when voting
/*
{
    transaction: {
        type: (( 1 = create, 2 = delete, 3 = transfer )),
        prodId: string,
        hash: firm,
    }
    publicKey: string,
    idClient: string,
    hash: string,
    transId: string,
}
*/

// NODO returns when voting
/* 
{
    type: "vote",
    transId: string,
    hash: string, 
    vote: (( 1 = yes, 0 = no ))
}
*/

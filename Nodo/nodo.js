const WebSocket = require("ws");
const crypto = require("crypto");

const endpoint = "localhost";
const port = 6969;

const ws = new WebSocket(`ws://${endpoint}:${port}`);

ws.on("open", function open() {
  console.log("Connection Established");

  ws.send();

  ws.on("message", (m) => {
    console.log(m.toString());
    const parsed = JSON.parse(m);
    const { transaction, publicKey, signature, hash, transId } = parsed;
    const stringTrans = JSON.stringify(transaction);

    // Crypto objects
    const verify = crypto.createVerify("SHA256");
    const hash = crypto.createHash("sha256");

    // Verify signature
    verify.write(stringTrans);
    verify.end();
    const validFirm = verify.verify(publicKey, signature, "hex");

    // Verify hash
    hash.update(stringTrans);
    const localHash = hash.digest("hex");
    const validHash = localHash === hash;

    const response = {
      transId: transId,
      hash: hash,
      vote: validFirm && validHash ? 1 : 0,
    };

    ws.send(response);
  });
});

// SERVER recieves
/*
{
    type: "transaction",
    transaction: {
        type: (( 1 = create, 2 = delete, 3 = transfer )),
        prodId: string,
    }
    hashFirm: string
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
    },
    publicKey: string,
    idClient: string,
    signature: string,
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

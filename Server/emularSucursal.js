const WebSocket = require("ws");

const endpoint = "localhost";
const port = 6969;

const ws = new WebSocket(`ws://${endpoint}:${port}`);

const dummyTransaction = {
  type: "transaction",
  transaction: {
    type: 1,
    prodId: "1231241223",
  },
  idClient: "uid",
  signature: "sig",
  transId: "transuid",
};

ws.on("open", function open() {
  console.log("Sucursal conectada");

  ws.on("message", (m) => {
    console.log(m.toString());
  });

  const sendData = (data) => {
    ws.send(data);
  };

  sendData(JSON.stringify(dummyTransaction));

  ws.close();
});

/*
{
    transaction: {
        type: (( 1 = create, 2 = delete, 3 = transfer )),
        prodId: string,
    }
    publicKey: string,
    idClient: string,
    hash: string,
    transId: string,
}
*/

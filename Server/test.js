const BlockchainManager = require("./BlockchainManager.js");

const m = new BlockchainManager();
const dummyTransaction = {
  type: 1,
  quantity: 69,
  prodId: "1231241223",
};

m.appendTransaction(dummyTransaction);
m.appendTransaction(dummyTransaction);

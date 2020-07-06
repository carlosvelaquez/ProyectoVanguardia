const crypto = require("crypto");

class BlockchainManager {
  constructor() {
    this.blocks = [];
    this.currentBlock = [];
    this.attachedNodes = {};

    console.log("Manager mounted.");
  }

  appendTransaction(transaction) {
    const transactionCount = this.currentBlock.length;

    if (transactionCount > 0) {
      const { hash } = this.currentBlock[transactionCount - 1];

      transaction.lastHash = hash;
      transaction.hash = this.hashTransaction(transaction);
      console.log("Appending transaction", transaction);

      this.currentBlock.push(transaction);
    } else {
      transaction.hash = this.hashTransaction(transaction);
      console.log("Appending first transaction", transaction);

      this.currentBlock.push(transaction);
    }
  }

  hashTransaction(transaction) {
    return crypto
      .createHash("sha1")
      .update(JSON.stringify(transaction))
      .digest("hex");
  }

  attachNode(id, publicKey) {
    this.attachedNodes[id] = publicKey;
  }

  getPublicKey(id) {
    return this.attachedNodes[id];
  }
}

module.exports = BlockchainManager;

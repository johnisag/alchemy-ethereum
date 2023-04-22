const Block = require("./Block");

class Blockchain {
  constructor() {
    this.chain = [new Block()];
  }

  addBlock(block) {
    block.previousHash =
      this.chain.length > 0
        ? this.chain[this.chain.length - 1].toHash()
        : block.toHash();
    this.chain.push(block);
  }

  isValid() {
    if (this.chain.length < 1) {
      return true;
    }

    for (
      let inverted_index = this.chain.length - 1;
      inverted_index >= 1;
      inverted_index--
    ) {
      if (
        this.chain[inverted_index].previousHash.toString() !=
        this.chain[inverted_index - 1].toHash().toString()
      ) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;

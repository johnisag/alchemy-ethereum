class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    // const concat = (a, b) => `Hash(${a} + ${b})`;
    this.concat = concat;
  }
  getRoot() {
    if (this.leaves.length < 1) {
      return null;
    } else if (this.leaves.length === 1) {
      return this.leaves[0];
    }

    let leaves_clone = this.leaves.map((l) => l);
    let next_layer = [];

    while (leaves_clone.length >= 1) {
      if (leaves_clone.length === 1 && next_layer.length === 0) {
        next_layer.push(leaves_clone[0]);
        console.log("before break");
        break;
      } else if (leaves_clone.length === 1) {
        next_layer.push(leaves_clone[0]);
        leaves_clone = next_layer.map((nl) => nl);
        next_layer = [];
        continue;
      } else if (leaves_clone.length === 0) {
        leaves_clone = next_layer.map((nl) => nl);
        next_layer = [];
        continue;
      }

      next_layer.push(this.concat(leaves_clone[0], leaves_clone[1]));

      // remove first 2 elements
      leaves_clone.shift();
      leaves_clone.shift();
    }

    console.log(next_layer);
    return next_layer.length === 1
      ? next_layer[0]
      : this.concat(next_layer[0], next_layer[1]);
  }

  getProof(index) {
    proof = [];
  }
}

module.exports = MerkleTree;

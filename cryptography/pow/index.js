const SHA256 = require("crypto-js/sha256");
const TARGET_DIFFICULTY =
  BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
  // TODO: add transaction to mempool
  mempool.push(transaction);
}

function mine() {
  // hash lambda
  let get_hash = (block) => SHA256(JSON.stringify(block));

  var previous_height =
    blocks.length > 0 ? blocks[blocks.length - 1].id + 1 : 0;
  var new_block = {
    id: previous_height,
  };

  // get transactions from mem pool and add to block
  var block_transactions = [];
  for (let index = 0; index < MAX_TRANSACTIONS; index++) {
    if (mempool.length == 0) {
      break;
    }
    block_transactions.push(mempool.pop());
  }
  new_block.transactions = block_transactions;

  // add initial nonce (0)
  new_block.nonce = 0;

  // increase nonce and calculate hash till we reach difficulty
  while (BigInt(`0x${get_hash(new_block)}`) > TARGET_DIFFICULTY) {
    new_block.nonce += 1;
  }

  new_block.hash = get_hash(new_block);

  blocks.push(new_block);
}

module.exports = {
  TARGET_DIFFICULTY,
  MAX_TRANSACTIONS,
  addTransaction,
  mine,
  blocks,
  mempool,
};

const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ["red", "green", "blue", "yellow", "pink", "orange"];

// given a hash, return the color that created the hash
function findColor(hash) {
  var hash_table = {};

  COLORS.forEach((item, index) => {
    hash_table[sha256(utf8ToBytes(item))] = item;
  });

  return hash_table[hash];
}

module.exports = findColor;

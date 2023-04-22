const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
  var first = publicKey.slice(0, 1);
  var rest = publicKey.slice(1);
  var rest_hash = keccak256(rest);
  var address = rest_hash.slice(-20);
  return address;
}

module.exports = getAddress;

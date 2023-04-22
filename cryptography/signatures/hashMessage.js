const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
  var msg_bytes = utf8ToBytes(message);
  var msg_hash = keccak256(msg_bytes);

  return msg_hash;
}

module.exports = hashMessage;

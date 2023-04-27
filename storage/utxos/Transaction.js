class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.inputUTXOs = inputUTXOs;
    this.outputUTXOs = outputUTXOs;
  }
  execute() {
    // ensure not double spent
    this.inputUTXOs.forEach((utxo) => {
      if (utxo.spent) {
        throw new Error("UTXO already spent!");
      }
    });

    // ensure enough input for output
    let total_input = 0;
    this.inputUTXOs.forEach((utxo) => {
      total_input += utxo.amount;
    });

    let total_output = 0;
    this.outputUTXOs.forEach((utxo) => {
      total_output += utxo.amount;
    });

    if (total_input < total_output) {
      throw new Error("not enough input for output!");
    }

    // mark inputs as spent
    this.inputUTXOs.forEach((utxo) => {
      utxo.spent = true;
    });

    // store rtnasaction fee
    this.fee = total_input - total_output;
  }
}

module.exports = Transaction;

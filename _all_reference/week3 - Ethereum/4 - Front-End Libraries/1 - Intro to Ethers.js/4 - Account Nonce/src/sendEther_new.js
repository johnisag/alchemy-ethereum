const { Wallet, utils, providers } = require('ethers');
const { ganacheProvider, PRIVATE_KEY } = require('./config');

// TODO: replace undefined with a new web3 provider
const provider = new providers.Web3Provider(ganacheProvider);

// add the provider to our wallet as the second parameter
const wallet = new Wallet(PRIVATE_KEY, provider);

async function sendEther({ value, to }) {
    tx = {
        to: to,
        value: value
    }

    return wallet.sendTransaction(tx);
}

module.exports = sendEther;
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import {ethers} from 'ethers';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState();
  const [selectedBlockNumber, setSelectBlockNumber] = useState();
  const [selectedBlockTransactions, setBlockTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState();



  async function getselectedBlockNumber() {
    let blockNum = await alchemy.core.getBlockNumber();
    //setLastestBlockNumber(blockNum);
    setSelectBlockNumber(blockNum);

    let blocks = []

    console.log("============LOOP STARTED============");
    for(let block_num = blockNum; block_num > blockNum -5; block_num--){
      blocks.push(block_num);
    }
    console.log(blocks);
    console.log("============LOOP ENDED============");

    setLatestBlocks(blocks);
  }

  // run once in startup
  // get latest blocks and set selected block num as latest block to state
  useEffect(() => {

    getselectedBlockNumber();
  }, []);

  // load block transactions on selected block number change
  useEffect(() => {
    async function setTransactions() {
      try {
        const { transactions } = await alchemy.core.getBlockWithTransactions(selectedBlockNumber)
      
        setBlockTransactions(transactions);
      } catch (error) {
        setBlockTransactions([]);
      }
    }

    setTransactions();
  },[selectedBlockNumber]);

  // load block data on selected block number change
  useEffect(() => {
    async function getSelectedBlockData() {
      setSelectedBlock(await alchemy.core.getBlock(selectedBlockNumber));      
    }
    
    //console.log(selectedBlockNumber);
    getSelectedBlockData();
    //console.log(selectedBlock);


  },[selectedBlockNumber]);

  const trancateString = (data, stopIndex) => {
    try {
      return `${data.substring(0, stopIndex)}...`
    } catch (error) {
      return ''
    }
  }

  const getFee = (gasLimit, gasPrice, numDigits) => {
    const gasFee = gasLimit * gasPrice

    if(gasFee.toString() === "NaN") return "0";
    
    return parseFloat(ethers.formatEther(gasFee.toString())).toFixed(numDigits)
  }

  // on click setting selected blockNum
  const handleSelectBlock = (blockNum) => {
    setSelectBlockNumber(blockNum);
  }

  // Handle Select Transaction Event
  const handleSelectBlockTransaction = (hash) => {
    const transactions = [...selectedBlockTransactions];
    const trxIndex = transactions.findIndex(tx => tx.hash === hash)
    if(trxIndex >= 0){
      setSelectedTransaction(transactions[trxIndex]);
    } else{
      setSelectedTransaction();
    }
  }


  // handle button event to get the latest blocks
  // and refres latest block details and transactions
  const handleGetLatestBlocks = () => {
    // get latest blocks and set latest block num to state
    getselectedBlockNumber();
  }

  const LatestBlocks = () => {
    if (latestBlocks){
      return (
        <>
<         div style={{
                display:"flex", 
                justifyContent:"center", 
                marginTop: 20, 
                fontSize: 20,
              }}>
            <button onClick={handleGetLatestBlocks}>Get Latest Blocks</button>
          </div>
          <div style={{
                display:"flex", 
                justifyContent:"center", 
                marginTop: 20, 
                fontSize: 20,
              }}>
              <b>Latests Blocks</b>
          </div>
          <div style={{
            display:"flex", 
            justifyContent:"center", 
            marginTop: 10, 
            marginBottom: 10, 
            fontSize: 12, 
            overflow: "auto",
            cursor: "pointer"
          }}>
            <table id='block_transactions'>
              <thead>
                <tr>
                  <th>Block Number</th>
                </tr>
              </thead>
              <tbody>
                {latestBlocks.map(bl_num => {
                  return (
                    <tr key={bl_num} onClick={() => handleSelectBlock(bl_num)}>
                      <td>{bl_num}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      );
    }else{
      return ""
    }
  }

  const Block = () => {
    if (selectedBlock) {
      return (
        <>
          <div style={{
              display:"flex", 
              justifyContent:"center", 
              marginTop: 20, 
              fontSize: 20,
            }}>
            <b>Block Details</b>
          </div>
          <div style={{
            display:"flex", 
            justifyContent:"center", 
            marginTop: 10, 
            marginBottom: 10, 
            fontSize: 12, 
            overflow: "auto",
            cursor: "pointer"
          }}>
            <table id='block_transactions'>
              <thead>
                <tr>
                  <th>Height</th>
                  <th>Timestamp</th>
                  <th>Miner</th>
                  <th>Transactions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedBlock.number}</td>
                  <td>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(selectedBlock.timestamp)}</td>
                  <td>{selectedBlock.miner}</td>
                  <td>{selectedBlock.transactions.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      );
    } else{
      return ""
    }

  }

  const Transactions = () => {
    if (selectedBlock) {
      return (
        <>
  
          <div style={{
                display:"flex", 
                justifyContent:"center", 
                marginTop: 20, 
                fontSize: 20,
              }}>
              <b>Block Transactions</b>
          </div>
  
          <div style={{
            display:"flex", 
            justifyContent:"center", 
            marginTop: 10, 
            marginBottom: 10, 
            fontSize: 12, 
            overflow: "auto",
            cursor: "pointer"
          }}>
            <table id='block_transactions'>
              <thead>
                <tr>
                  <th>Transaction Hash</th>
                  <th>Block</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Confirmations</th>
                  <th>Value</th>
                  <th>Transaction Fee</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {selectedBlockTransactions.slice(0,10).map(transaction => {
                  return (
                    <tr key={transaction.hash} onClick={() => handleSelectBlockTransaction(transaction.hash)}>
                      <td >{transaction.hash}</td>
                      <td>{transaction.blockNumber}</td>
                      <td>{transaction.from}</td>
                      <td>{transaction.to}</td>
                      <td>{transaction.confirmations}</td>
                      <td>{parseFloat(ethers.formatEther(transaction.value.toString())).toFixed(8)}</td>
                      <td>{getFee(transaction.gasLimit, transaction.gasPrice, 5)}</td>
                      <td>{trancateString(transaction.data,8)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      );
    } else{
      return ""
    }
  }

  const TransactionDetails = () => {
    if (selectedTransaction) {
      return (
        <>  
          <div style={{
                display:"flex", 
                justifyContent:"center", 
                marginTop: 20, 
                fontSize: 20,
              }}>
              <b>Transaction Details</b>
          </div>
          <div style={{
            display:"flex", 
            justifyContent:"center", 
            marginTop: 10, 
            marginBottom: 10, 
            fontSize: 12, 
            overflow: "auto",
            cursor: "pointer"
          }}>
            <table id='block_transactions'>
              <thead>
                <tr>
                  <th>Property Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Block</td>
                  <td>{selectedTransaction.blockNumber}</td>
                </tr>
                <tr>
                  <td>Hash</td>
                  <td>{selectedTransaction.hash}</td>
                </tr>
                <tr>
                  <td>From</td>
                  <td>{selectedTransaction.from}</td>
                </tr>
                <tr>
                  <td>To</td>
                  <td>{selectedTransaction.to}</td>
                </tr>
                <tr>
                  <td>Value</td>
                  <td>{parseFloat(parseFloat(ethers.formatEther(selectedTransaction.value.toString())).toFixed(8))}</td>
                </tr>
                <tr>
                  <td>Confirmations</td>
                  <td>{selectedTransaction.confirmations}</td>
                </tr>
                <tr>
                  <td>Fee </td>
                  <td>{getFee(selectedTransaction.gasLimit, selectedTransaction.gasPrice, 5)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      );
    } else{
      return ""
    }
  }

  return (
    <>
      <LatestBlocks/>
      <Block />
      <Transactions/>
      <TransactionDetails/>
    </>
  );
}

export default App;

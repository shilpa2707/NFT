require('dotenv').config();
const API_URL = process.env.DEV_API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Sprecher.sol/Sprecher.json");
const contractAddress = "0x31741ad0eD3c5Aef92Eb9031754D733af962c418";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`signedTx: ${JSON.stringify(signedTx)}`);
  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmQkXKgHnzqcB3PVtzPgU51VQ1nbQiL4iW5NXL6ZgoGny4"
)
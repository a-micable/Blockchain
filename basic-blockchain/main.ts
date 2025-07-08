import { addBlock, getBlockchain } from './blockchain';
import { initWallet } from './wallet';
import './server'; // Start the server

const main = () => {
    console.log("Initializing blockchain...");

    // Create the genesis block
    addBlock("Genesis Block");

    // Add subsequent blocks
    addBlock("First block after Genesis");
    addBlock("Second block after Genesis");

    // Print the blockchain
    console.log(JSON.stringify(getBlockchain(), null, 2));
};

main();

import express from 'express';
import { initWallet, createTransaction, getBalance } from './wallet';
import { getBlockchain } from './blockchain';

const app = express();
app.use(express.json());

initWallet(); // Initialize wallet

app.post('/createTransaction', (req, res) => {
    const { receiverAddress, amount } = req.body;
    const unspentTxOuts = []; // Fetch unspent outputs from the blockchain
    const transaction = createTransaction(receiverAddress, amount, unspentTxOuts);
    res.json(transaction);
});

app.get('/balance/:address', (req, res) => {
    const address = req.params.address;
    const unspentTxOuts = []; // Fetch unspent outputs from the blockchain
    const balance = getBalance(address, unspentTxOuts);
    res.json({ balance });
});

app.get('/blockchain', (req, res) => {
    res.json(getBlockchain());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

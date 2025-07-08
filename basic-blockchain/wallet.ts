import { TxOut, Transaction } from './transaction';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { EC } from 'elliptic';
import * as crypto from 'crypto';

const ec = new EC('secp256k1');
const privateKeyLocation = './wallet/private_key.txt'; // Location to store private key

export const generatePrivateKey = (): string => {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
};

export const initWallet = () => {
    if (existsSync(privateKeyLocation)) {
        return;
    }
    const newPrivateKey = generatePrivateKey();
    writeFileSync(privateKeyLocation, newPrivateKey);
    console.log('New wallet with private key created');
};

export const getPrivateKey = (): string => {
    if (!existsSync(privateKeyLocation)) {
        throw new Error('Wallet does not exist');
    }
    return readFileSync(privateKeyLocation, 'utf8');
};

export const createTransaction = (receiverAddress: string, amount: number, unspentTxOuts: any[]) => {
    const privateKey = getPrivateKey();
    const txIns: any[] = []; // Add inputs logic here
    const txOuts: TxOut[] = [new TxOut(receiverAddress, amount)];

    const transaction = new Transaction(txIns, txOuts);
    return transaction; // Sign and return the transaction
};

export const getBalance = (address: string, unspentTxOuts: any[]): number => {
    return unspentTxOuts
        .filter((uTxO: any) => uTxO.address === address)
        .reduce((acc: number, uTxO: any) => acc + uTxO.amount, 0);
};

import * as crypto from 'crypto';

export const calculateHash = (index: number, previousHash: string, timestamp: number, data: string, difficulty: number, nonce: number): string => {
    return crypto.createHash('sha256').update(index + previousHash + timestamp + data + difficulty + nonce).digest('hex');
};

export const hexToBinary = (hex: string): string => {
    return parseInt(hex, 16).toString(2).padStart(256, '0'); // Convert hex to binary
};


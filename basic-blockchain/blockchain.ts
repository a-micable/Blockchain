import { Block, findBlock } from './block';
import { Transaction } from './transaction';

const BLOCK_GENERATION_INTERVAL: number = 10; // seconds
const DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10; // blocks

let blockchain: Block[] = [];

export const addBlock = (data: string): Block => {
    const previousBlock: Block = blockchain[blockchain.length - 1];
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getCurrentTimestamp();
    const difficulty: number = getDifficulty(blockchain);

    const newBlock: Block = findBlock(newIndex, previousBlock.hash, newTimestamp, data, difficulty);
    blockchain.push(newBlock);
    return newBlock;
};

const getCurrentTimestamp = (): number => {
    return Math.floor(new Date().getTime() / 1000);
};

const getDifficulty = (aBlockchain: Block[]): number => {
    const latestBlock: Block = aBlockchain[aBlockchain.length - 1];
    if (latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
        return getAdjustedDifficulty(latestBlock, aBlockchain);
    } else {
        return latestBlock.difficulty;
    }
};

const getAdjustedDifficulty = (latestBlock: Block, aBlockchain: Block[]): number => {
    const prevAdjustmentBlock: Block = aBlockchain[aBlockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
    const timeExpected: number = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
    const timeTaken: number = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
    if (timeTaken < timeExpected / 2) {
        return prevAdjustmentBlock.difficulty + 1;
    } else if (timeTaken > timeExpected * 2) {
        return prevAdjustmentBlock.difficulty - 1;
    } else {
        return prevAdjustmentBlock.difficulty;
    }
};

export const getBlockchain = (): Block[] => blockchain;

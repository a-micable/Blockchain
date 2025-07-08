export class TxOut {
    public address: string;
    public amount: number;

    constructor(address: string, amount: number) {
        this.address = address;
        this.amount = amount;
    }
}

export class TxIn {
    public txOutId: string;
    public txOutIndex: number;
    public signature: string;

    constructor(txOutId: string, txOutIndex: number, signature: string) {
        this.txOutId = txOutId;
        this.txOutIndex = txOutIndex;
        this.signature = signature;
    }
}

export class Transaction {
    public txIns: TxIn[];
    public txOuts: TxOut[];

    constructor(txIns: TxIn[], txOuts: TxOut[]) {
        this.txIns = txIns;
        this.txOuts = txOuts;
    }
}

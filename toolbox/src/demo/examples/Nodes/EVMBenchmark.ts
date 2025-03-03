import { Chain, createPublicClient, webSocket, HDAccount, createWalletClient, WalletClient, WatchBlocksReturnType, PublicClient, parseEther } from 'viem'
import { HDKey, hdKeyToAccount } from 'viem/accounts'


const getAccount = (index: number): HDAccount => {
    const hdKey = HDKey.fromMasterSeed(new Uint8Array(Array(32).fill(0)))
    const account = hdKeyToAccount(hdKey, { accountIndex: index + 1 })
    return account
}

type blockInfoPayload = {
    includedInBlock: number;
    errors: number;
    concurrency: number;
    lastError: Error | null;
}

async function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Failed to execute function after retries');
}

export class EVMBenchmark {
    private callback: (blockInfo: blockInfoPayload) => void = () => { };
    private accounts: HDAccount[] = [];
    private client!: WalletClient;
    private unsubscribe: WatchBlocksReturnType | null = null;
    private blockWatcher!: BlockWatcher;
    private started: boolean = true;
    private maxConcurrency: number = 100;
    private activeTransactionsNumber: number = 0;
    private errorCounter: number = 0;
    public lastError: Error | null = null;
    private txErrors: number = 0;
    private publicClient!: PublicClient;
    private insufficientBalance: boolean = false;


    static rootAccount: HDAccount = getAccount(0);
    static getRootAddress(): string {
        return this.rootAccount.address;
    }

    private activeAccountsCount: number = 0;

    async initialize(callback: (blockInfo: blockInfoPayload) => void, httpEndpoint: string, wsEndpoint: string, accountsCount: number = 1000) {
        this.accounts = Array.from({ length: accountsCount }, (_, index) => getAccount(index + 1));
        this.callback = callback;

        const chain = await getChain(httpEndpoint, wsEndpoint);

        this.publicClient = createPublicClient({ chain, transport: webSocket() });

        // Check root account balance
        const balance = await this.publicClient.getBalance({ address: EVMBenchmark.rootAccount.address });

        if (balance < parseEther('100000')) {
            this.insufficientBalance = true;
            this.lastError = new Error(`Root account balance too low. Please transfer at least 100,000 ETH to ${EVMBenchmark.rootAccount.address}`);
            this.callback({
                includedInBlock: 0,
                concurrency: 0,
                errors: 0,
                lastError: this.lastError,
            });
            return;
        }

        this.blockWatcher = new BlockWatcher(this.publicClient, ({ includedInBlock }) => {
            this.callback({
                includedInBlock,
                concurrency: this.activeTransactionsNumber,
                errors: this.txErrors,
                lastError: this.lastError,
            });
            this.txErrors = 0;
            this.lastError = null;
        });

        this.client = createWalletClient({ chain, transport: webSocket() })

        for (const account of this.accounts) {
            await retry(() => this.initializeAccount(account));
            this.activeAccountsCount++;
            console.log(`Active accounts count: ${this.activeAccountsCount}`);
        }
    }


    private async initializeAccount(account: HDAccount) {
        const minBalance = parseEther('1');

        const currentBalance = await this.publicClient.getBalance({ address: account.address });

        if (currentBalance < minBalance) {
            // Wait until we're below concurrency limit
            while (this.activeTransactionsNumber >= this.maxConcurrency && this.started) {
                await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 100)));
            }

            if (!this.started) return;

            // Send initial transaction
            const txHash = await this.client.sendTransaction({
                chain: this.client.chain,
                account: EVMBenchmark.rootAccount,
                to: account.address,
                value: parseEther('1')
            });

            await this.blockWatcher.awaitTx(txHash, 10 * 1000);
        }

        // Start the transaction loop for this account
        this.startAccountTxLoop(account);
    }

    private async startAccountTxLoop(account: HDAccount) {
        // Use setTimeout to prevent blocking the event loop
        setTimeout(async () => {
            while (this.started) {
                // Wait until we're below concurrency limit
                while (this.activeTransactionsNumber >= this.maxConcurrency && this.started) {
                    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 3 * 1000)));
                }

                if (!this.started) break;

                try {
                    this.activeTransactionsNumber++;

                    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 3 * 1000)));


                    // await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 10 * this.activeAccountsCount)));


                    const txHash = await this.client.sendTransaction({
                        chain: this.client.chain,
                        account: account,
                        to: this.accounts[1].address,
                        value: BigInt(Math.floor(Math.random() * 100000000))
                    });

                    await this.blockWatcher.awaitTx(txHash, 10 * 1000);

                } catch (e) {
                    this.errorCounter++;
                    this.lastError = e instanceof Error ? e : new Error(String(e));
                } finally {
                    this.activeTransactionsNumber--;
                }

                // Small delay between transactions from the same account
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }, 0);
    }

    public destroy() {
        this.started = false;
        this.blockWatcher.destroy();
    }

    public hasInsufficientBalance(): boolean {
        return this.insufficientBalance;
    }

    public async setMaxConcurrency(concurrency: number) {
        this.maxConcurrency = concurrency;
    }

    public async stop() {
        this.started = false;
        this.unsubscribe?.();
        this.unsubscribe = null;
    }
}

class BlockWatcher {
    private unsubscribe: WatchBlocksReturnType | undefined = undefined;
    private error: Error | undefined = undefined;
    private awaitedTransactions: Map<string, {
        resolve: (blockNumber: number) => void;
        reject: (error: Error) => void;
        timer: NodeJS.Timeout;
    }> = new Map();

    constructor(publicClient: PublicClient, callback: (blockInfo: { includedInBlock: number }) => void) {
        this.unsubscribe = publicClient.watchBlocks({
            emitMissed: true,
            emitOnBegin: true,
            onBlock: (block) => {
                // Check if any awaited transactions are in this block
                for (const txHash of block.transactions) {
                    const txData = this.awaitedTransactions.get(txHash);
                    if (txData) {
                        // Clear the timeout and resolve the promise
                        clearTimeout(txData.timer);
                        txData.resolve(Number(block.number));
                        this.awaitedTransactions.delete(txHash);
                    }
                }

                callback({
                    includedInBlock: Number(block.transactions.length),
                });
            },
            onError: (error) => {
                this.error = error;

                // Reject all pending transactions
                for (const [, txData] of this.awaitedTransactions) {
                    clearTimeout(txData.timer);
                    txData.reject(error);
                }
                this.awaitedTransactions.clear();

                this.unsubscribe?.();
                this.unsubscribe = undefined;
            }
        });
    }

    public async awaitTx(txHash: string, timeout: number = 10000): Promise<number> {
        return new Promise((resolve, reject) => {
            // Set up a timeout to reject the promise if the transaction isn't included in a block
            const timer = setTimeout(() => {
                this.awaitedTransactions.delete(txHash);
                reject(new Error(`Transaction ${txHash} timed out after ${timeout}ms`));
            }, timeout);

            // Store the transaction to be resolved when it appears in a block
            this.awaitedTransactions.set(txHash, { resolve, reject, timer });
        });
    }

    public destroy() {
        this.unsubscribe?.();
        this.unsubscribe = undefined;
    }
}



export async function getChain(rpcUrl: string, wsUrl: string): Promise<Chain> {
    // Fetch chain ID
    const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_chainId',
            params: [],
            id: 1
        })
    })

    const responseText = await response.text()
    let chainID: number

    try {
        const data = JSON.parse(responseText)
        chainID = parseInt(data.result)
    } catch (e) {
        console.log(`Response text: ${responseText}`)
        console.error(`Error fetching chain ID: ${e}`)
        throw new Error('Failed to fetch chain ID')
    }

    // Return chain configuration
    return {
        id: chainID,
        name: 'Custom Chain',
        nativeCurrency: {
            decimals: 18,
            name: 'Native Token',
            symbol: 'TEST'
        },
        rpcUrls: {
            default: { webSocket: [wsUrl], http: [rpcUrl] }
        }
    }
}

import { PublicClient, WatchBlocksReturnType } from "viem";

export class BlockWatcher {
    private unsubscribe: WatchBlocksReturnType | undefined = undefined;
    private awaitedTransactions: Map<string, {
        resolve: (blockNumber: number) => void;
        reject: (error: Error) => void;
        timer: NodeJS.Timeout;
    }> = new Map();

    constructor(publicClient: PublicClient, callback: (blockInfo: { includedInBlock: number, gasUsed: bigint, gasLimit: bigint, blockTimestamp: number }) => void) {
        this.unsubscribe = publicClient.watchBlocks({
            emitMissed: true,
            emitOnBegin: false,
            includeTransactions: false,
            onBlock: (block) => {
                console.log(`Block received: ${block.number}`, block);
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
                    gasUsed: block.gasUsed,
                    gasLimit: block.gasLimit,
                    blockTimestamp: Number(block.timestamp),
                });
            },
            onError: (error) => {
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

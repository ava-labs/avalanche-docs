export class Scheduler {
    private tps: number = 10;
    private concurrency: number = 10000;
    private activeTransactions: number = 0;
    // Time period in milliseconds
    private readonly PERIOD_MS: number = 200;

    public setTps(tps: number) {
        this.tps = tps;
    }

    public setConcurrency(concurrency: number) {
        this.concurrency = concurrency;
    }

    public getActiveTransactions(): number {
        return this.activeTransactions;
    }

    // Track time in periods instead of seconds
    private currentPeriod: number = Math.floor(Date.now() / this.PERIOD_MS);
    private transactionsThisPeriod: number = 0;

    public async schedule<T>(fn: () => Promise<T>): Promise<T> {
        try {
            // Wait until both concurrency and TPS limits allow
            while (!this.isConcurrencyAllowed() || !this.isTpsAllowed()) {
                await new Promise(resolve => setTimeout(resolve, 1));
            }

            // Update counters
            this.transactionsThisPeriod++;
            this.activeTransactions++;

            return await fn();
        } finally {
            this.activeTransactions--;
        }
    }

    private isTpsAllowed(): boolean {
        // Check if we've entered a new time period
        const now = Date.now();
        const period = Math.floor(now / this.PERIOD_MS);

        if (period !== this.currentPeriod) {
            this.currentPeriod = period;
            this.transactionsThisPeriod = 0;
        }

        // Calculate transactions per period based on TPS
        const tpsPerPeriod = this.tps / (1000 / this.PERIOD_MS);
        return this.transactionsThisPeriod < tpsPerPeriod;
    }

    private isConcurrencyAllowed(): boolean {
        return this.activeTransactions < this.concurrency;
    }
}

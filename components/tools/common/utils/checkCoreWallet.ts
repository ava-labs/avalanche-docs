export async function checkCoreWallet(): Promise<boolean> {
    try {
        if (!window.avalanche) {
            throw new Error("Core wallet is not installed.");
        }

        await window.avalanche.request({
            "method": "avalanche_getAccountPubKey",
            "params": []
        });

        return true;
    } catch (error) {
        console.error("Core wallet check failed:", error);
        throw error;
    }
}

declare global {
    interface Window {
        avalanche?: {
            request: (params: {
                method: string;
                params: any[];
            }) => Promise<any>;
        };
    }
}

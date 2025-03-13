async function checkCoreWallet(): Promise<boolean> {
    try {
        if (!window.avalanche) {
            throw new Error("Core wallet is not installed.");
        }
        return true;
    } catch (error) {
        console.error("Core wallet check failed:", error);
        throw error;
    }
}

export { checkCoreWallet }


// Returns the P-Chain address of the active account ex: 'P-fuji1...' or 'P-avax1...'
const fetchPChainAddressForActiveAccount = async (retryCount = 3): Promise<string> => {
    try {
        if (!window.avalanche) throw new Error('Core wallet not found');

        try {
            const response = await window.avalanche.request<{ addressPVM: string }[]>({
                method: 'avalanche_getAccounts',
                params: []
            });
            const activeAccountIndex = response.findIndex((account: any) => account.active === true);
            const pChainAddress = response[activeAccountIndex].addressPVM;
            return pChainAddress as string;
        } catch (error: any) {
            // Check if this is a pending request error
            if (error.message && error.message.includes('already pending') && retryCount > 0) {
                console.log(`Request already pending, retrying in 2 seconds... (${retryCount} attempts left)`);
                // Wait 2 seconds and retry with one less retry count
                await new Promise(resolve => setTimeout(resolve, 2000));
                return fetchPChainAddressForActiveAccount(retryCount - 1);
            }
            throw error;
        }
    } catch (error) {
        console.error('Error fetching avalanche accounts, is Core wallet installed?:', error);
        throw error;
    }
};

export { fetchPChainAddressForActiveAccount }

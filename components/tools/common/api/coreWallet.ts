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
const fetchPChainAddressForActiveAccount = async () => {
    try {
      const response = await window.avalanche.request({
        method: 'avalanche_getAccounts',
        params: []
      });
      const activeAccountIndex = response.findIndex((account: any) => account.active === true);
      const pChainAddress = response[activeAccountIndex].addressPVM;
      return pChainAddress;
    
    } catch (error) {
      console.error('Error fetching avalanche accounts, is Core wallet installed?:', error);
    }
  };

export { fetchPChainAddressForActiveAccount }
// Same service as managed testnet nodes — see its constants.ts.
export let MANAGED_TESTNET_RELAYERS_SERVICE_URL =
  process.env.MANAGED_NODES_OVERRIDE || 'https://managed-nodes.avax.network';

if (MANAGED_TESTNET_RELAYERS_SERVICE_URL.endsWith('/')) {
  MANAGED_TESTNET_RELAYERS_SERVICE_URL = MANAGED_TESTNET_RELAYERS_SERVICE_URL.slice(0, -1);
}

export const RelayerServiceURLs = {
  list: (password: string) => 
    `${MANAGED_TESTNET_RELAYERS_SERVICE_URL}/node_admin/relayers?password=${password}`,
  create: (password: string) => 
    `${MANAGED_TESTNET_RELAYERS_SERVICE_URL}/node_admin/relayers?password=${password}`,
  delete: (relayerId: string, password: string) => 
    `${MANAGED_TESTNET_RELAYERS_SERVICE_URL}/node_admin/relayers/${relayerId}?password=${password}`,
  restart: (relayerId: string, password: string) => 
    `${MANAGED_TESTNET_RELAYERS_SERVICE_URL}/node_admin/relayers/${relayerId}/restart?password=${password}`,
};

export const RELAYER_TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days


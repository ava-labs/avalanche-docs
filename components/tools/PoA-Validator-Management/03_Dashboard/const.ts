import { pvm } from '@avalabs/avalanchejs'

const platformEndpoint = "https://api.avax-test.network";
const pvmApi = new pvm.PVMApi(platformEndpoint);
const pChainChainID = '11111111111111111111111111111111LpoYY'

export { platformEndpoint, pvmApi, pChainChainID }
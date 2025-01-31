import { pvm, utils, Context } from '@avalabs/avalanchejs'

const platformEndpoint = "https://api.avax-test.network";
const pvmApi = new pvm.PVMApi(platformEndpoint);

export { platformEndpoint, pvmApi }
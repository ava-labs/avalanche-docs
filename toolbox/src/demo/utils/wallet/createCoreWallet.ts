import { createWalletClient, custom, rpcSchema } from 'viem'
import { addChain, CoreWalletAddChainParameters } from './overrides/addChain'
import { sendTransaction } from './overrides/sendTransaction'
import { CoreWalletRpcSchema } from './rpcSchema'
import { isTestnet } from './methods/isTestnet'
import { getPChainAddress } from './methods/getPChainAddress'
import { createSubnet, CreateSubnetParams } from './methods/createSubnet'
import { createChain, CreateChainParams } from './methods/createChain'
import { convertToL1, ConvertToL1Params } from './methods/convertToL1'

export function createCoreWalletClient(account?: `0x${string}`) {
    return createWalletClient({
        transport: custom(window.avalanche!),
        account: account,
        rpcSchema: rpcSchema<CoreWalletRpcSchema>(),
    }).extend((client) => ({
        addChain: (args: CoreWalletAddChainParameters) => addChain(client, args),
        sendTransaction: (args) => sendTransaction(client, args),
        isTestnet: () => isTestnet(client),
        getPChainAddress: () => getPChainAddress(client),
        createSubnet: (args: CreateSubnetParams) => createSubnet(client, args),
        createChain: (args: CreateChainParams) => createChain(client, args),
        convertToL1: (args: ConvertToL1Params) => convertToL1(client, args),
    }))
}

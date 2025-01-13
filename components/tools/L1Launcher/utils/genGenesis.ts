import { parseEther } from 'viem'
import { AllowlistPrecompileConfig } from '../../common/allowlist-precompile-configurator/types';
import { addressEntryArrayToAddressArray } from '../../common/utils';

type GenerateGenesisArgs = {
    evmChainId: number;
    initialBalances?: Record<string, string>; // address to amount in decimal format (e.g. "10.000")
    txAllowlistConfig: AllowlistPrecompileConfig,
    contractDeployerAllowlistConfig: AllowlistPrecompileConfig,
    nativeMinterAllowlistConfig: AllowlistPrecompileConfig
}

function generateAllowListConfig(config: AllowlistPrecompileConfig) {
    return {
        "blockTimestamp": 0,
        ...(config.addresses.Admin.length > 0 && {
            "adminAddresses": addressEntryArrayToAddressArray(config.addresses.Admin),
        }),
        ...(config.addresses.Manager.length > 0 && {
            "managerAddresses": addressEntryArrayToAddressArray(config.addresses.Manager),
        }),
        ...(config.addresses.Enabled.length > 0 && {
            "enabledAddresses": addressEntryArrayToAddressArray(config.addresses.Enabled),
        }),
    };
}

export function generateGenesis({ evmChainId, initialBalances = {}, txAllowlistConfig, contractDeployerAllowlistConfig, nativeMinterAllowlistConfig }: GenerateGenesisArgs) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Convert balances to wei
    const allocations: Record<string, { balance: string }> = {};
    Object.entries(initialBalances).forEach(([address, amount]) => {
        allocations[address.toLowerCase().replace('0x', '')] = {
            balance: "0x" + parseEther(amount).toString(16)
        };
    });

    return {
        "airdropAmount": null,
        "airdropHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "alloc": {
            ...allocations,
        },
        "baseFeePerGas": null,
        "blobGasUsed": null,
        "coinbase": "0x0000000000000000000000000000000000000000",
        "config": {
            "berlinBlock": 0,
            "byzantiumBlock": 0,
            "chainId": evmChainId,
            "constantinopleBlock": 0,
            "eip150Block": 0,
            "eip155Block": 0,
            "eip158Block": 0,
            "feeConfig": {
                "baseFeeChangeDenominator": 36,
                "blockGasCostStep": 200000,
                "gasLimit": 12000000,
                "maxBlockGasCost": 1000000,
                "minBaseFee": 25000000000,
                "minBlockGasCost": 0,
                "targetBlockRate": 2,
                "targetGas": 60000000
            },
            "homesteadBlock": 0,
            "istanbulBlock": 0,
            "londonBlock": 0,
            "muirGlacierBlock": 0,
            "petersburgBlock": 0,
            "warpConfig": {
                "blockTimestamp": currentTimestamp,
                "quorumNumerator": 67,
                "requirePrimaryNetworkSigners": true
            },
            ...(txAllowlistConfig.activated && {
                "txAllowListConfig": generateAllowListConfig(txAllowlistConfig),
            }),
            ...(contractDeployerAllowlistConfig.activated && {
                "contractDeployerAllowListConfig": generateAllowListConfig(contractDeployerAllowlistConfig),
            }),
            ...(nativeMinterAllowlistConfig.activated && {
                "nativeMinterConfig": generateAllowListConfig(nativeMinterAllowlistConfig),
            })
        },
        "difficulty": "0x0",
        "excessBlobGas": null,
        "extraData": "0x",
        "gasLimit": "0xb71b00",
        "gasUsed": "0x0",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0",
        "number": "0x0",
        "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "timestamp": `0x${currentTimestamp.toString(16)}`
    }
}

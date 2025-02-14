import { useState } from 'react';
import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { createWalletClient, custom, createPublicClient, hexToBytes } from 'viem';
import { packWarpIntoAccessList } from './packWarp';
import ValidatorManagerABI from "../../../../contracts/icm-contracts/compiled/ValidatorManager.json";
import { Button, Input, InputArray } from "../../ui";
import { Success } from "../../ui/Success";
import { utils } from '@avalabs/avalanchejs';

const cb58ToHex = (cb58: string) => utils.bufferToHex(utils.base58check.decode(cb58));

export default function InitValidatorSet() {
    const { showBoundary } = useErrorBoundary();
    const {
        subnetID,
        setSubnetID,
        chainID,
        setChainID,
        walletChainId,
        nodePopJsons,
        setNodePopJsons,
        L1ConversionSignature,
        setL1ConversionSignature,
        proxyAddress,
        setProxyAddress
    } = useExampleStore();

    const [isInitializing, setIsInitializing] = useState(false);
    const [txHash, setTxHash] = useState<string | null>(null);

    const onInitialize = async () => {
        if (!window.avalanche) {
            showBoundary(new Error('MetaMask (Avalanche wallet) is not installed'));
            return;
        }

        setIsInitializing(true);
        try {
            // Prepare transaction arguments
            const txArgs = [{
                subnetID: cb58ToHex(subnetID),
                validatorManagerBlockchainID: cb58ToHex(chainID),
                validatorManagerAddress: proxyAddress as `0x${string}`,
                initialValidators: nodePopJsons
                    .map(json => {
                        const node = JSON.parse(json).result;
                        return {
                            nodeID: cb58ToHex(node.nodeID.split('-')[1]),
                            blsPublicKey: node.nodePOP.publicKey,
                            weight: 100
                        };
                    })
            }, 0];

            // Convert signature to bytes and pack into access list
            const signatureBytes = hexToBytes(L1ConversionSignature as `0x${string}`);
            const accessList = packWarpIntoAccessList(signatureBytes);

            // Setup wallet client
            const walletClient = createWalletClient({
                transport: custom(window.avalanche)
            });
            const [address] = await walletClient.requestAddresses();

            // Send transaction
            const hash = await walletClient.writeContract({
                address: proxyAddress as `0x${string}`,
                abi: ValidatorManagerABI.abi,
                functionName: 'initializeValidatorSet',
                args: txArgs,
                accessList,
                account: address,
                chain: {
                    id: walletChainId,
                    name: "My L1",
                    rpcUrls: {
                        default: { http: [] },
                    },
                    nativeCurrency: {
                        name: "COIN",
                        symbol: "COIN",
                        decimals: 18,
                    },
                },
            });

            // Wait for transaction confirmation
            const publicClient = createPublicClient({
                transport: custom(window.avalanche)
            });
            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            if (receipt.status === 'success') {
                setTxHash(hash);
            } else {
                throw new Error('Transaction failed');
            }

        } catch (error) {
            showBoundary(error);
        } finally {
            setIsInitializing(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Initialize Validator Set</h2>

            <div className="space-y-4">
                <Input
                    label="Chain ID"
                    value={chainID}
                    onChange={setChainID}
                    placeholder="Enter chain ID (CB58 format)"
                />
                <Input
                    label="Subnet ID"
                    value={subnetID}
                    onChange={setSubnetID}
                    placeholder="Enter subnet ID (CB58 format)"
                />

                <Input
                    label="Proxy Address"
                    value={proxyAddress}
                    onChange={setProxyAddress}
                    placeholder="0x..."
                />

                <InputArray
                    label="Info.getNodeID responses of the initial validators"
                    values={nodePopJsons}
                    onChange={setNodePopJsons}
                    type="textarea"
                    placeholder={'{"result":{"nodeID":"NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg","nodePOP":{"publicKey":"0x...","proofOfPossession":"0x..."}}}'}
                    rows={4}
                />
                <div className="text-sm text-gray-500">
                    Type in terminal: <span className="font-mono block">{`curl -X POST --data '{"jsonrpc":"2.0","id":1,"method":"info.getNodeID"}' -H "content-type:application/json;" 127.0.0.1:9650/ext/info`}</span>
                </div>

                <Input
                    label="L1 Conversion Signature"
                    value={L1ConversionSignature}
                    onChange={setL1ConversionSignature}
                    placeholder="Enter L1 conversion signature (hex)"
                    type="textarea"
                    rows={5}
                />
            </div>

            {txHash && (
                <Success
                    label="Transaction Successful"
                    value={txHash}
                />
            )}

            <Button
                type="primary"
                onClick={onInitialize}
                loading={isInitializing}
                disabled={!L1ConversionSignature || isInitializing || !proxyAddress || !chainID}
            >
                Initialize Validator Set
            </Button>
        </div>
    );
}

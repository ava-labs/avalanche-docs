import { useState } from 'react';
import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { createPublicClient, hexToBytes, createWalletClient, custom } from 'viem';
import { cb58ToHex } from './cb58';
import { packWarpIntoAccessList } from './packWarp';
import ValidatorManagerABI from "../../../../contracts/icm-contracts/compiled/ValidatorManager.json";
import { Button, Input } from "../../ui";
import { Success } from "../../ui/Success";

export default function InitValidatorSet() {
    const { showBoundary } = useErrorBoundary();
    const {
        subnetID,
        walletChainId,
        validatorManagerAddress,
        setValidatorManagerAddress,
        nodePopJsons,
        L1ConversionSignature
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

            const txArgs = [{
                subnetID: cb58ToHex(subnetID),
                validatorManagerBlockchainID: cb58ToHex(subnetID),
                validatorManagerAddress,
                initialValidators: nodePopJsons
                    .slice(0, nodePopJsons.length) // this may be wrong, didn't check how nodePopJsons is generated
                    .map(json => {
                        const node = JSON.parse(json).result;
                        return {
                            nodeID: cb58ToHex(node.nodeID.split('-')[1]),
                            blsPublicKey: node.nodePOP.publicKey,
                            weight: 100
                        };
                    })
            }, 0];
            const signatureBytes = hexToBytes(L1ConversionSignature as `0x${string}`);
            const accessList = packWarpIntoAccessList(signatureBytes);
            console.log(txArgs);
            console.log(accessList);


            const walletClient = createWalletClient({
                transport: custom(window.avalanche)
            });
            const [address] = await walletClient.requestAddresses();
            console.log(address);
            const hash = await walletClient.writeContract({
                address: validatorManagerAddress as `0x${string}`,
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

            <div className="flex gap-4">
                <div className="flex-1">
                    <Input
                        label="Validator Manager Address"
                        value={validatorManagerAddress}
                        onChange={setValidatorManagerAddress}
                        placeholder="Enter validator manager address"
                    />
                </div>
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
                disabled={!L1ConversionSignature || isInitializing || !validatorManagerAddress}
            >
                Initialize Validator Set
            </Button>
        </div>
    );
};

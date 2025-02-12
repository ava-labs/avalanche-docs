import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import { Button, Input } from "../../ui";
import { Success } from "../../ui/Success";
import { createWalletClient, custom, createPublicClient } from 'viem';
import ValidatorManagerABI from "../../../../contracts/icm-contracts/compiled/ValidatorManager.json";

export const Initialize = () => {
    const { showBoundary } = useErrorBoundary();
    const { subnetID, walletChainId, validatorManagerAddress, setValidatorManagerAddress } = useExampleStore();
    const [isChecking, setIsChecking] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [isInitialized, setIsInitialized] = useState<boolean | null>(null);
    const [initEvent, setInitEvent] = useState<any>(null);
    const [churnPeriodSeconds, setChurnPeriodSeconds] = useState("0");
    const [maximumChurnPercentage, setMaximumChurnPercentage] = useState("20");

    useEffect(() => {
        if (validatorManagerAddress) {
            checkIfInitialized();
        }
    }, []);

    async function checkIfInitialized() {
        if (!validatorManagerAddress || !window.avalanche) return;

        setIsChecking(true);
        try {
            const publicClient = createPublicClient({
                transport: custom(window.avalanche)
            });

            const initializedEvent = ValidatorManagerABI.abi.find(
                item => item.type === 'event' && item.name === 'Initialized'
            );

            if (!initializedEvent) {
                throw new Error('Initialized event not found in ABI');
            }

            const logs = await publicClient.getLogs({
                address: validatorManagerAddress as `0x${string}`,
                event: initializedEvent as any,
                fromBlock: 0n,
                toBlock: 'latest'
            });

            console.log('Initialization logs:', logs);
            setIsInitialized(logs.length > 0);
            if (logs.length > 0) {
                setInitEvent(logs[0]);
            }
        } catch (error) {
            console.error('Error checking initialization:', error);
            showBoundary(error);
        } finally {
            setIsChecking(false);
        }
    }

    async function handleInitialize() {
        if (!validatorManagerAddress || !window.avalanche) return;

        setIsInitializing(true);
        try {
            const walletClient = createWalletClient({
                transport: custom(window.avalanche)
            });

            const [address] = await walletClient.requestAddresses();

            const settings = {
                admin: address,
                subnetID: `0x${subnetID.padStart(64, '0')}` as `0x${string}`,
                churnPeriodSeconds: BigInt(churnPeriodSeconds),
                maximumChurnPercentage: Number(maximumChurnPercentage)
            };

            const hash = await walletClient.writeContract({
                address: validatorManagerAddress as `0x${string}`,
                abi: ValidatorManagerABI.abi,
                functionName: 'initialize',
                args: [settings],
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

            await publicClient.waitForTransactionReceipt({ hash });
            await checkIfInitialized();
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsInitializing(false);
        }
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Initialize Validator Manager</h2>
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            label="Validator Manager Address"
                            value={validatorManagerAddress}
                            onChange={setValidatorManagerAddress}
                            placeholder="Enter validator manager address"
                        />
                    </div>
                    <div className="pt-7">
                        <Button
                            type="secondary"
                            onClick={checkIfInitialized}
                            loading={isChecking}
                            disabled={!validatorManagerAddress}
                        >
                            Check Status
                        </Button>
                    </div>
                </div>

                {isInitialized === true && (
                    <Success
                        label="Already Initialized"
                        value={jsonStringifyWithBigint(initEvent)}
                    />
                )}

                {isInitialized === false && (
                    <div className="space-y-4">
                        <Input
                            label="Churn Period (seconds)"
                            type="number"
                            value={churnPeriodSeconds}
                            onChange={setChurnPeriodSeconds}
                            placeholder="Enter churn period in seconds"
                        />
                        <Input
                            label="Maximum Churn Percentage"
                            type="number"
                            value={maximumChurnPercentage}
                            onChange={setMaximumChurnPercentage}
                            placeholder="Enter maximum churn percentage"
                        />
                        <Button
                            type="primary"
                            onClick={handleInitialize}
                            loading={isInitializing}
                            disabled={isInitializing}
                        >
                            Initialize Contract
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

function jsonStringifyWithBigint(value: any) {
    return JSON.stringify(value, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
        , 2);
}

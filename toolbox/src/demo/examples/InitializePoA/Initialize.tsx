"use client";

import { useToolboxStore, useViemChainStore, useWalletStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import { Button, Input } from "../../ui";
import { Success } from "../../ui/Success";
import { createPublicClient, custom, AbiEvent } from 'viem';
import ValidatorManagerABI from "../../../../contracts/icm-contracts/compiled/ValidatorManager.json";
import { utils } from "@avalabs/avalanchejs";
import { RequireChainL1 } from "../../ui/RequireChain";

export default function Initialize() {
    const { showBoundary } = useErrorBoundary();
    const { subnetID, proxyAddress, setProxyAddress, setSubnetID } = useToolboxStore();
    const { walletEVMAddress, coreWalletClient } = useWalletStore();
    const [isChecking, setIsChecking] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [isInitialized, setIsInitialized] = useState<boolean | null>(null);
    const [initEvent, setInitEvent] = useState<unknown>(null);
    const [churnPeriodSeconds, setChurnPeriodSeconds] = useState("0");
    const [maximumChurnPercentage, setMaximumChurnPercentage] = useState("20");
    const [adminAddress, setAdminAddress] = useState("");
    const viemChain = useViemChainStore();

    useEffect(() => {
        if (walletEVMAddress && !adminAddress) {
            setAdminAddress(walletEVMAddress);
        }
    }, [walletEVMAddress, adminAddress]);

    let subnetIDHex = "";
    try {
        subnetIDHex = utils.bufferToHex(utils.base58check.decode(subnetID));
    } catch (error) {
        console.error('Error decoding subnetID:', error);
    }

    useEffect(() => {
        if (proxyAddress) {
            checkIfInitialized();
        }
    }, []);

    async function checkIfInitialized() {
        if (!proxyAddress || !window.avalanche) return;

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
                address: proxyAddress as `0x${string}`,
                event: initializedEvent as AbiEvent,
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
        if (!proxyAddress || !window.avalanche) return;

        setIsInitializing(true);
        try {
            const settings = {
                admin: adminAddress,
                subnetID: subnetIDHex,
                churnPeriodSeconds: BigInt(churnPeriodSeconds),
                maximumChurnPercentage: Number(maximumChurnPercentage)
            };


            const hash = await coreWalletClient.writeContract({
                address: proxyAddress as `0x${string}`,
                abi: ValidatorManagerABI.abi,
                functionName: 'initialize',
                args: [settings],
                chain: viemChain,
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
        <RequireChainL1>
            <div className="space-y-4">
                <h2 className="text-lg font-semibold ">Initialize Validator Manager</h2>
                <div className="space-y-4">
                    <Input
                        label="Proxy address"
                        value={proxyAddress}
                        onChange={setProxyAddress}
                        placeholder="Enter proxy address"
                        button={
                            <Button
                                type="secondary"
                                onClick={checkIfInitialized}
                                loading={isChecking}
                                disabled={!proxyAddress}
                                className="h-9 rounded-l-none"
                            >
                                Check Status
                            </Button>
                        }
                    />

                    <Input
                        label="Subnet ID"
                        value={subnetID}
                        onChange={setSubnetID}
                    />
                    <Input
                        label={`Subnet ID (Hex), ${utils.hexToBuffer(subnetIDHex).length} bytes`}
                        value={subnetIDHex}
                        disabled
                    />



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
                        <Input
                            label="Admin Address"
                            value={adminAddress}
                            onChange={setAdminAddress}
                            placeholder="Enter admin address"
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


                    {isInitialized === true && (
                        <Success
                            label="Already Initialized"
                            value={jsonStringifyWithBigint(initEvent)}
                        />
                    )}
                </div>
            </div>
        </RequireChainL1>
    );
};

function jsonStringifyWithBigint(value: unknown) {
    return JSON.stringify(value, (_, v) =>
        typeof v === 'bigint' ? v.toString() : v
        , 2);
}

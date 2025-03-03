import { Button, GithubEmbed, ConnectWallet } from "./ui";
import { ErrorBoundary } from "react-error-boundary";
import { CreateSubnet } from './examples/L1/CreateSubnet';
import { useExampleStore } from './utils/store';
import { CreateChain } from './examples/L1/CreateChain';
import { ConvertToL1 } from './examples/L1/ConvertToL1';
import { GetPChainAddress } from './examples/Wallet/GetPChainAddress';
import { CollectConversionSignatures } from './examples/L1/CollectConversionSignatures';
import { RefreshCw } from 'lucide-react';
import { DeployValidatorMessages } from './examples/ValidatorManager/DeployValidatorMessages';
import { SwitchChain } from "./examples/Wallet/SwitchChain";
import { DeployValidatorManager } from "./examples/ValidatorManager/DeployValidatorManager";
import InitValidatorSet from "./examples/InitializePoA/InitValidatorSet";
import { Initialize } from "./examples/InitializePoA/Initialize";
import { UpgradeProxy } from "./examples/ValidatorManager/UpgradeProxy";
import { ReadContract } from "./examples/ValidatorManager/ReadContract";
import { GenesisBuilder } from "./examples/L1/GenesisBuilder";
import { RPCMethodsCheck } from "./examples/Nodes/RPCMethodsCheck";
import { useState, useEffect, ReactElement } from "react";
import { AvalanchegoDocker } from "./examples/Nodes/AvalanchegoDocker";
import TeleporterMessenger from "./examples/ICM/TeleporterMessenger";
import RPCUrlForChain from "./examples/Nodes/RPCUrlForChain";
import CreateL1 from "./examples/Docs/CreateL1";
import TeleporterRegistry from "./examples/ICM/TeleporterRegistry";
type ComponentType = {
    id: string;
    label: string;
    component: () => ReactElement;
    fileNames: string[];
    skipWalletConnection?: boolean;
}

const componentGroups: Record<string, ComponentType[]> = {
    "Wallet": [
        {
            id: 'getPChainAddress',
            label: "Get P-chain Address",
            component: GetPChainAddress,
            fileNames: ["toolbox/src/demo/examples/Wallet/pChainAddrFromPubKey.ts", "toolbox/src/demo/examples/Wallet/GetPChainAddress.tsx"]
        },
        {
            id: 'switchChain',
            label: "Switch Chain",
            component: SwitchChain,
            fileNames: ["toolbox/src/demo/examples/Wallet/SwitchChain.tsx"]
        }
    ],
    'Create an L1': [
        {
            id: 'createSubnet',
            label: "Create Subnet",
            component: CreateSubnet,
            fileNames: ["toolbox/src/demo/examples/L1/CreateSubnet.tsx"]
        },
        {
            id: 'createChain',
            label: "Create Chain",
            component: CreateChain,
            fileNames: ["toolbox/src/demo/examples/L1/CreateChain.tsx"]
        },
        {
            id: 'convertToL1',
            label: "Convert to L1",
            component: ConvertToL1,
            fileNames: ["toolbox/src/demo/examples/L1/ConvertToL1.tsx"]
        },
        {
            id: 'collectConversionSignatures',
            label: "Collect conversion signatures",
            component: CollectConversionSignatures,
            fileNames: ["toolbox/src/demo/examples/L1/CollectConversionSignatures.tsx", "toolbox/src/demo/examples/L1/convertWarp.ts"]
        },
        {
            id: 'genesisBuilder',
            label: "Genesis Builder",
            component: GenesisBuilder,
            fileNames: ["toolbox/src/demo/examples/L1/GenesisBuilder.tsx"]
        }
    ],
    "Deploy ValidatorManager": [
        {
            id: "deployValidatorMessages",
            label: "Validator Messages Library",
            component: DeployValidatorMessages,
            fileNames: ["toolbox/src/demo/examples/ValidatorManager/DeployValidatorMessages.tsx"]
        },
        {
            id: "deployValidatorManager",
            label: "Deploy Validator Manager",
            component: DeployValidatorManager,
            fileNames: ["toolbox/src/demo/examples/ValidatorManager/DeployValidatorManager.tsx"]
        },
        {
            id: "readContract",
            label: "Read Contract",
            component: ReadContract,
            fileNames: ["toolbox/src/demo/examples/ValidatorManager/ReadContract.tsx"]
        },
        {
            id: "upgradeProxy",
            label: "Upgrade Proxy",
            component: UpgradeProxy,
            fileNames: ["toolbox/src/demo/examples/ValidatorManager/UpgradeProxy.tsx"]
        }
    ],
    "Initialize ValidatorManager": [
        {
            id: "initialize",
            label: "Initialize",
            component: Initialize,
            fileNames: ["toolbox/src/demo/examples/InitializePoA/Initialize.tsx"]
        },
        {
            id: "initValidatorSet",
            label: "Initialize Validator Set",
            component: InitValidatorSet,
            fileNames: ["toolbox/src/demo/examples/InitializePoA/InitValidatorSet.tsx"]
        }
    ],
    "Nodes": [
        {
            id: "rpcMethodsCheck",
            label: "RPC Methods Check",
            component: RPCMethodsCheck,
            fileNames: ["toolbox/src/demo/examples/Nodes/RPCMethodsCheck.tsx"],
            skipWalletConnection: true,
        },
        {
            id: "avalanchegoDocker",
            label: "Avalanchego in Docker",
            component: AvalanchegoDocker,
            fileNames: ["toolbox/src/demo/examples/Nodes/AvalanchegoDocker.tsx"],
            skipWalletConnection: true,
        },
        {
            id: "rpcUrlForChain",
            label: "RPC URL Builder",
            component: RPCUrlForChain,
            fileNames: ["toolbox/src/demo/examples/Nodes/RPCUrlForChain.tsx"],
            skipWalletConnection: true,
        }
    ],
    "ICM": [
        {
            id: "teleporterMessenger",
            label: "Teleporter Messenger",
            component: TeleporterMessenger,
            fileNames: ["toolbox/src/demo/examples/ICM/TeleporterMessenger.tsx"]
        },
        {
            id: "teleporterRegistry",
            label: "Teleporter Registry",
            component: TeleporterRegistry,
            fileNames: ["toolbox/src/demo/examples/ICM/TeleporterRegistry.tsx"]
        }
    ],
    "Docs": [
        {
            id: 'createL1Guide',
            label: "Create L1",
            component: CreateL1,
            fileNames: ["toolbox/src/demo/examples/Docs/CreateL1.tsx"],
            skipWalletConnection: true,
        }
    ],

};

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
    return (
        <div className="space-y-2">
            <div className="text-red-500 text-sm">
                {error.message}
            </div>
            {
                error.message.includes("The error is mostly returned when the client requests") && (
                    <div className="text-sm text-red-500">
                        ^ This usually indicates that the core wallet is not in testnet mode. Open settings &gt; Advanced &gt; Testnet mode.
                    </div>
                )
            }
            <Button onClick={resetErrorBoundary}>
                Try Again
            </Button>
        </div>
    );
};

export default function ToolboxApp() {
    const [, setIsWalletConnected] = useState(false);
    // Remove store-based selectedTool and use setSelectedTool
    // const { selectedTool, setSelectedTool } = useExampleStore();

    const defaultTool = Object.values(componentGroups).flat()[0].id;

    // Use state from URL hash. Default to "getPChainAddress" if hash is empty.
    const [selectedTool, setSelectedTool] = useState(
        window.location.hash ? window.location.hash.substring(1) : defaultTool
    );

    // Listen for URL hash changes (e.g. back/forward navigation)
    useEffect(() => {
        const handleHashChange = () => {
            setSelectedTool(window.location.hash ? window.location.hash.substring(1) : defaultTool);
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const handleComponentClick = (toolId: string) => {
        // Instead of updating the store, update the URL hash.
        window.location.hash = toolId;
        // Optionally update local state immediately (hashchange event will also trigger)
        setSelectedTool(toolId);
    };

    const renderSelectedComponent = () => {
        const allComponents = Object.values(componentGroups).flat();
        const comp = allComponents.find(c => c.id === selectedTool);
        if (!comp) {
            return <div>Component not found</div>;
        }
        return <>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                    window.location.reload();
                }}
            >
                <ConnectWallet onConnect={setIsWalletConnected} required={!comp.skipWalletConnection}>
                    <div className="space-y-4">
                        <comp.component />
                    </div>
                    <div className="overflow-x-hidden">
                        {comp.fileNames.map((fileName, index) => (
                            <GithubEmbed
                                key={index}
                                user="ava-labs"
                                repo="avalanche-docs"
                                branch="l1-toolbox" // TODO: set automatically or at least change to main
                                filePath={fileName}
                                maxHeight={600}
                            />
                        ))}
                    </div>
                </ConnectWallet>
            </ErrorBoundary>
        </>
    };

    return (
        <div className="container mx-auto flex flex-col md:flex-row">
            <div className="w-64 flex-shrink-0 p-6">
                <ul className="space-y-6">
                    {Object.entries(componentGroups).map(([groupName, components]) => (
                        <li key={groupName}>
                            <h3 className="text-sm font-semibold  uppercase tracking-wide mb-3">{groupName}</h3>
                            <ul className="space-y-1">
                                {components.map(({ id, label }) => (
                                    <li key={id}>
                                        <div
                                            onClick={() => handleComponentClick(id)}
                                            className={`cursor-pointer w-full text-left px-3 py-2 text-sm rounded-md transition-all ${selectedTool === id
                                                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium'
                                                : ' dark: hover:bg-gray-50 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            {label}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <div className="mt-6">
                    <Button
                        onClick={() => {
                            if (window.confirm("Are you sure you want to reset the state?")) {
                                useExampleStore.getState().reset();
                            }
                        }}
                        className="w-full"
                        type="secondary"
                        icon={<RefreshCw className="w-4 h-4 mr-2" />}
                    >
                        Reset State
                    </Button>
                </div>
            </div>
            <div className="flex-1 p-6 min-w-0">
                {renderSelectedComponent()}
            </div>
        </div>
    );
}


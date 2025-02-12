import { Button, GithubEmbed, ConnectWallet } from "./ui";
import { ErrorBoundary } from "react-error-boundary";
import { CreateSubnet } from './examples/L1/CreateSubnet';
import { useExampleStore } from './utils/store';
import { CreateChain } from './examples/L1/CreateChain';
import { ConvertToL1 } from './examples/L1/ConvertToL1';
import { GetPChainAddress } from './examples/Wallet/GetPChainAddress';
import { ConvertL1Signatures } from './examples/L1/ConvertL1Signatures';
import { RefreshCw } from 'lucide-react';
import { DeployValidatorMessages } from './examples/ValidatorManager/DeployValidatorMessages';
import { SwitchChain } from "./examples/Wallet/SwitchChain";
import { DeployValidatorManager } from "./examples/ValidatorManager/DeployValidatorManager";

const componentGroups = {
    "Wallet": [
        {
            id: 'getPChainAddress',
            label: "Get P-chain Address",
            component: GetPChainAddress,
            fileNames: ["src/demo/examples/Wallet/GetPChainAddress.tsx"]
        },
        {
            id: 'switchChain',
            label: "Switch Chain",
            component: SwitchChain,
            fileNames: ["src/demo/examples/Wallet/SwitchChain.tsx"]
        }
    ],
    'Create an L1': [
        {
            id: 'createSubnet',
            label: "Create Subnet",
            component: CreateSubnet,
            fileNames: ["src/demo/examples/L1/CreateSubnet.tsx"]
        },
        {
            id: 'createChain',
            label: "Create Chain",
            component: CreateChain,
            fileNames: ["src/demo/examples/L1/CreateChain.tsx"]
        },
        {
            id: 'convertToL1',
            label: "Convert to L1",
            component: ConvertToL1,
            fileNames: ["src/demo/examples/L1/ConvertToL1.tsx"]
        },
        {
            id: 'convertL1Signatures',
            label: "Convert L1 Signatures",
            component: ConvertL1Signatures,
            fileNames: ["src/demo/examples/L1/ConvertL1Signatures.tsx", "src/demo/examples/L1/convertWarp.ts"]
        }
    ],
    "Deploy ValidatorManager": [
        {
            id: "deployValidatorMessages",
            label: "Validator Messages Library",
            component: DeployValidatorMessages,
            fileNames: ["src/demo/examples/ValidatorManager/DeployValidatorMessages.tsx"]
        },
        {
            id: "deployValidatorManager",
            label: "Deploy Validator Manager",
            component: DeployValidatorManager,
            fileNames: ["src/demo/examples/ValidatorManager/DeployValidatorManager.tsx"]
        },
    ],
    "Deploy PoS": [

    ],
    "Top up a validator": [

    ],

};

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
    return (
        <div className="space-y-2">
            <div className="text-red-500 text-sm">
                {error.message}
            </div>
            <Button onClick={resetErrorBoundary}>
                Try Again
            </Button>
        </div>
    );
};

function App() {
    const { selectedTool, setSelectedTool } = useExampleStore();

    const handleComponentClick = (toolId: string) => {
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
                <ConnectWallet>
                    <div className="space-y-4">
                        <comp.component />
                    </div>
                    <div className="overflow-x-hidden">
                        {comp.fileNames.map((fileName, index) => (
                            <GithubEmbed
                                key={index}
                                user="containerman17"
                                repo="builders-hub-tools-temporary"
                                filePath={fileName}
                                lang="TS"
                                maxHeight={600}
                            />
                        ))}
                    </div>
                </ConnectWallet>
            </ErrorBoundary>
        </>
    };

    return (
        <div className="container mx-auto max-w-screen-2xl flex">
            <div className="w-64 flex-shrink-0 p-6">
                <ul className="space-y-6">
                    {Object.entries(componentGroups).map(([groupName, components]) => (
                        <li key={groupName}>
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">{groupName}</h3>
                            <ul className="space-y-1">
                                {components.map(({ id, label }) => (
                                    <li key={id}>
                                        <button
                                            onClick={() => handleComponentClick(id)}
                                            className={`cursor-pointer w-full text-left px-3 py-2 text-sm rounded-md transition-all ${selectedTool === id
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {label}
                                        </button>
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

export default App

import { useWizardStore, resetStore } from "../store";
import Welcome from "../Welcome";
import Genesis from "../Genesis";
import FundTempWallet from "../FundTempWallet";
import PrepareValidators from "../PrepareValidators";
import GenerateKeys from "../GenerateKeys";
import LaunchValidators from "../LaunchValidators";
import LaunchRpcNode from "../LaunchRpcNode";
import OpenRPCPort from "../OpenRPCPort";
import AddToWallet from "../AddToWallet";
import DeployContracts from "../DeployContracts/DeployContracts";
import CreateChain from "../CreateChain/CreateChain";
import InitializeValidatorManager from "../InitializeValidatorManager/InitializeValidatorManager";
import WhatsNext from "../WhatsNext";
import { BookOpen, RocketIcon, Terminal, Flag, Settings, Server } from 'lucide-react'


const groups = {
    "welcome": {
        title: "Welcome",
        icon: <BookOpen className="size-5" />
    },
    "prepare": {
        title: "Prepare",
        icon: <Settings className="size-5" />
    },
    "launch-l1": {
        title: "Launch your L1",
        icon: <Server className="size-5" />
    },
    "initialize": {
        title: "Initialize",
        icon: <Terminal className="size-5" />
    },
    "whats-next": {
        title: "What's next?",
        icon: <Flag className="size-5" />
    },
}

type StepType = {
    title: string;
    component: React.ReactNode;
    group: keyof typeof groups;
}

export const stepList: Record<string, StepType> = {
    "welcome": {
        title: "Welcome",
        component: <Welcome />,
        group: "welcome",
    },
    "genesis": {
        title: "Create genesis",
        component: <Genesis />,
        group: "prepare",
    },
    "prepare-validators": {
        title: "Prepare Validators",
        component: <PrepareValidators />,
        group: "prepare",
    },
    "generate-keys": {
        title: "Generate keys",
        component: <GenerateKeys />,
        group: "prepare",
    },
    "fund-temp-wallet": {
        title: "Fund temp wallet",
        component: <FundTempWallet />,
        group: "launch-l1",
    },
    "create-chain": {
        title: "Create chain",
        component: <CreateChain />,
        group: "launch-l1",
    },
    "launch-validators": {
        title: "Launch validators",
        component: <LaunchValidators />,
        group: "launch-l1",
    },
    "launch-rpc-node": {
        title: "Launch an RPC node",
        component: <LaunchRpcNode />,
        group: "launch-l1",
    },
    "open-rpc-port": {
        title: "Open RPC port",
        component: <OpenRPCPort />,
        group: "launch-l1",
    },
    "add-to-wallet": {
        title: "Add to wallet",
        component: <AddToWallet />,
        group: "initialize",
    },
    "deploy-contracts": {
        title: "Deploy contracts",
        component: <DeployContracts />,
        group: "initialize",
    },
    "initialize-validator-manager": {
        title: "Initialize validator manager",
        component: <InitializeValidatorManager />,
        group: "initialize",
    },
    "whats-next": {
        title: "What's next?",
        component: <WhatsNext />,
        group: "whats-next",
    }
}

const stepsGroupped = Object.entries(stepList).reduce<Record<keyof typeof groups, string[]>>((acc, [key, step]) => {
    acc[step.group] = [...(acc[step.group] || []), key];
    return acc;
}, {} as Record<keyof typeof groups, string[]>);


export default function Steps() {
    const { currentStep, maxAdvancedStep, advanceTo } = useWizardStore();

    return (
        <>
            <div className="relative text-gray-500 dark:text-gray-400">
                {/* Main vertical line that spans entire height */}
                <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-gray-200 dark:bg-gray-700" />

                {Object.entries(groups).map(([groupKey, group]) => {
                    return (
                        <div key={groupKey} className="">
                            {/* Group header */}
                            <div className="flex items-center mb-3 relative">
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full relative z-10 bg-gray-200 dark:bg-gray-800`}>
                                    <div className={'text-gray-600 dark:text-gray-300'}>
                                        {group.icon}
                                    </div>
                                </div>
                                <h2 className="font-medium text-xl text-gray-900 dark:text-gray-200 ml-3">{group.title}</h2>
                            </div>

                            {/* Steps in this group */}
                            <div className="ml-5 pl-4">
                                {stepsGroupped[groupKey as keyof typeof groups]?.map((stepKey) => {
                                    const step = stepList[stepKey];
                                    const isActive = stepKey === currentStep;
                                    const isPassed = Object.keys(stepList).indexOf(stepKey) <=
                                        Object.keys(stepList).indexOf(maxAdvancedStep) &&
                                        stepKey !== currentStep;
                                    const isClickable = Object.keys(stepList).indexOf(stepKey) <=
                                        Object.keys(stepList).indexOf(maxAdvancedStep);

                                    return (
                                        <div
                                            key={stepKey}
                                            className={`mb-4 relative ${isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
                                            onClick={() => isClickable && advanceTo(stepKey)}
                                        >
                                            <div className="absolute -left-[21px] top-[6px]">
                                                {isPassed ? (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 relative z-10" />
                                                ) : (
                                                    <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'ring-4 ring-blue-200 dark:ring-blue-900 bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'
                                                        } relative z-10`} />
                                                )}
                                            </div>
                                            <h3 className={`text-base leading-tight ${isActive ? 'text-black dark:text-white font-medium' : isPassed ? 'text-gray-900 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'
                                                }`}>
                                                {step.title}
                                            </h3>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Reset button */}
            <div className="mt-8 -ml-4 w-full">
                <button
                    onClick={() => resetStore()}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/50 rounded-lg hover:bg-red-100 dark:hover:bg-red-950 border border-red-100 dark:border-red-900/50"
                >
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Start Over
                </button>
            </div>
        </>
    );
}

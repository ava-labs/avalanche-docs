'use client'
import Welcome from "./Welcome";
import Genesis from "./Genesis";
import FundTempWallet from "./FundTempWallet";
import PrepareValidators from "./PrepareValidators";
import GenerateKeys from "./GenerateKeys";
import LaunchValidators from "./LaunchValidators";
import LaunchRpcNode from "./LaunchRpcNode";
import OpenRPCPort from "./OpenRPCPort";
import AddToWallet from "./AddToWallet";
import DeployContracts from "./DeployContracts/DeployContracts";
import CreateChain from "./CreateChain/CreateChain";
import Steps, { stepList } from "./ui/Steps";
import { useWizardStore } from "./store";
import InitializeValidatorManager from "./InitializeValidatorManager/InitializeValidatorManager";
import WhatsNext from "./WhatsNext";

const stepComponents: Record<keyof typeof stepList, React.ReactNode> = {
    'welcome': <Welcome />,
    'genesis': <Genesis />,
    'prepare-validators': <PrepareValidators />,
    'generate-keys': <GenerateKeys />,
    'fund-temp-wallet': <FundTempWallet />,
    'create-chain': <CreateChain />,
    "launch-validators": <LaunchValidators />,
    "launch-rpc-node": <LaunchRpcNode />,
    "open-rpc-port": <OpenRPCPort />,
    "add-to-wallet": <AddToWallet />,
    "deploy-contracts": <DeployContracts />,
    "initialize-validator-manager": <InitializeValidatorManager />,
    "whats-next": <WhatsNext />,
}


export default function L1Wizard() {
    const { currentStep } = useWizardStore()

    return (
        <>
            <div className="container mx-auto max-w-6xl p-8 ">
                <h1 className="md:text-3xl lg:text-5xl pb-5">L1 Launcher</h1>
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-80 mb-8">
                        <Steps />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="h-full">
                            {stepComponents[currentStep]}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}


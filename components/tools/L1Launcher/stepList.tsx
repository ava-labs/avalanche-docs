import { BookOpen, Terminal, Flag, Settings, Server } from 'lucide-react'
import Welcome from "./01_Welcome/Welcome";
import Genesis from "./02_Prepare/Genesis";
import Permissions from "./02_Prepare/Permissions";
import FundTempWallet from "./03_Launch/FundTempWallet";
import PrepareValidators from "./02_Prepare/PrepareValidators";
import GenerateKeys from "./02_Prepare/GenerateKeys";
import LaunchValidators from "./03_Launch/LaunchValidators";
import LaunchRpcNode from "./03_Launch/LaunchRpcNode";
import OpenRPCPort from "./03_Launch/OpenRPCPort";
import AddToWallet from "./AddToWallet";
import DeployContracts from "./DeployContracts/DeployContracts";
import CreateChain from "./03_Launch/CreateChain"
import InitializeValidatorManager from "./InitializeValidatorManager/InitializeValidatorManager";
import WhatsNext from "./WhatsNext";

export const stepGroups = {
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

export type StepType = {
    title: string;
    component: React.ReactNode;
    group: keyof typeof stepGroups;
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
    "permissions": {
        title: "Permissions",
        component: <Permissions />,
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

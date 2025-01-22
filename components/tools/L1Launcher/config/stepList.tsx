import { BookOpen, Terminal, Flag, Settings, Server } from 'lucide-react'
import Welcome from "../01_Welcome/Welcome";
import ChainParameters from '../02_Configure/ChainParameters';
import Tokenomics from '../02_Configure/Tokenomics';
import Permissions from "../02_Configure/Permissions";
import Genesis from "../02_Configure/Genesis";

import PrepareValidators from "../03_Launch/PrepareValidators";
import GenerateKeys from "../03_Launch/GenerateKeys";
import FundTempWallet from "../03_Launch/FundTempWallet";
import CreateL1 from "../03_Launch/CreateL1"
import LaunchValidators from "../03_Launch/LaunchValidators";
import LaunchRpcNode from "../03_Launch/LaunchRpcNode";
import OpenRPCPort from "../03_Launch/OpenRPCPort";

import AddToWallet from "../04_Initialize/AddToWallet";
import DeployContracts from "../04_Initialize/DeployContracts/DeployContracts";
import InitializeValidatorManager from "../04_Initialize/InitializeValidatorManager/InitializeValidatorManager";

import WhatsNext from "../05_WhatsNext/WhatsNext";
import { StepGroupListType, StepListType } from '../../common/ui/types';

export const stepGroups : StepGroupListType = {
    "welcome": {
        title: "Welcome",
        icon: BookOpen
    },
    "configure": {
        title: "Configure",
        icon: Settings
    },
    "launch-l1": {
        title: "Launch your L1",
        icon: Server
    },
    "initialize": {
        title: "Initialize",
        icon: Terminal
    },
    "whats-next": {
        title: "What's next?",
        icon: Flag
    },
}

export const stepList: StepListType = {
    "welcome": {
        title: "Welcome",
        component: <Welcome />,
        group: "welcome",
    },
    "chain-parameters": {
        title: "Chain Parameters",
        component: <ChainParameters />,
        group: "configure",
    },
    "tokenomics": {
        title: "Tokenomics",
        component: <Tokenomics />,
        group: "configure",
    },
    "permissions": {
        title: "Permissions",
        component: <Permissions />,
        group: "configure",
    },
    "genesis": {
        title: "Create genesis",
        component: <Genesis />,
        group: "configure",
    },
    "prepare-validators": {
        title: "Prepare Validators",
        component: <PrepareValidators />,
        group: "launch-l1",
    },
    "generate-validator-keys": {
        title: "Generate keys",
        component: <GenerateKeys />,
        group: "launch-l1",
    },
    "fund-temp-wallet": {
        title: "Fund temp wallet",
        component: <FundTempWallet />,
        group: "launch-l1",
    },
    "create-chain": {
        title: "Create L1",
        component: <CreateL1 />,
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

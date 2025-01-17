import { BookOpen, Flag, Settings, Server } from 'lucide-react'
import Welcome from "./01_Welcome/Welcome";
import ChainParameters from './02_Configure/ChainParameters';
import LaunchValidators from "./03_Dashboard/ValidatorDashboard";
import AddToWallet from "./AddToWallet";
import WhatsNext from "./WhatsNext";

export const stepGroups = {
    "welcome": {
        title: "Welcome",
        icon: <BookOpen className="size-5" />
    },
    "configure": {
        title: "Configure",
        icon: <Settings className="size-5" />
    },
    "manage-l1": {
        title: "Manage Validators",
        icon: <Server className="size-5" />
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
    "chain-parameters": {
        title: "Load L1",
        component: <ChainParameters />,
        group: "configure",
    },
    "launch-validators": {
        title: "Validator Dashboard",
        component: <LaunchValidators />,
        group: "manage-l1",
    },
    "whats-next": {
        title: "What's next?",
        component: <WhatsNext />,
        group: "whats-next",
    }
}

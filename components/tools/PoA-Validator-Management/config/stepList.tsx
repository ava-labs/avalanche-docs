import { BookOpen, Flag, Settings, Server } from 'lucide-react'
import Welcome from "../01_Welcome/Welcome";
import ChainParameters from '../02_Configure/ChainParameters';
import LaunchValidators from "../03_Dashboard/ValidatorDashboard";
import WhatsNext from "../04_WhatsNext/WhatsNext";
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
    "manage-l1": {
        title: "Manage Validators",
        icon: Server
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

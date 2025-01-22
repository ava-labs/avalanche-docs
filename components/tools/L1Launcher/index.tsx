'use client'
import Steps from "@/components/tools/common/ui/Steps";
import { useL1LauncherWizardStore, resetL1ManagerWizardStore } from "./config/store";
import { stepList, stepGroups } from "./config/stepList";
import { StepListType } from "../common/ui/types";
import ToolHeader from "../common/ui/ToolHeader";


export default function L1Wizard() {
    const { currentStep, maxAdvancedStep, advanceTo,  } = useL1LauncherWizardStore()

    return (
        <>
            <div className="container mx-auto max-w-6xl p-8 ">
                <ToolHeader
                    title="L1 Launcher"
                    duration="30 min"
                    description="Launch your self-hosted Testnet or Mainnet L1 on your own infrastructure"
                />
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-80 mb-8">
                        <Steps stepGroups={stepGroups} stepList={stepList} currentStep={currentStep as keyof StepListType} maxAdvancedStep={maxAdvancedStep as keyof StepListType} advanceTo={advanceTo} onReset={resetL1ManagerWizardStore} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="h-full">
                            {stepList[currentStep]?.component}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}


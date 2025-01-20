'use client'
import Steps from "@/components/tools/common/ui/Steps";
import { useL1ManagerWizardStore, resetL1ManagerWizardStore } from "./config/store";
import { stepList, stepGroups } from "./config/stepList";

export default function L1Wizard() {
    const { currentStep, maxAdvancedStep, advanceTo } = useL1ManagerWizardStore()

    // Add error handling for invalid steps
    const CurrentStepComponent = stepList[currentStep]?.component || (
        <div className="p-4">
            <h2 className="text-xl text-red-500">Error: Invalid step</h2>
            <p>The requested step "{currentStep}" does not exist.</p>
        </div>
    );

    return (
        <>
            <div className="container mx-auto max-w-6xl p-8 ">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-80 mb-8">
                        <Steps currentStep={currentStep} maxAdvancedStep={maxAdvancedStep} advanceTo={advanceTo} stepList={stepList} stepGroups={stepGroups} onReset={resetL1ManagerWizardStore}/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="h-full">
                            {CurrentStepComponent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


'use client'
import Steps from "@/components/tools/common/ui/Steps";
import { useWizardStore, resetStore } from "./store";
import { stepList, stepGroups } from "./stepList";

export default function L1Wizard() {
    const { currentStep, maxAdvancedStep, advanceTo } = useWizardStore()

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
                        <Steps currentStep={currentStep} maxAdvancedStep={maxAdvancedStep} advanceTo={advanceTo} stepList={stepList} stepGroups={stepGroups} onReset={resetStore}/>
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


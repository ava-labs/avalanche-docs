'use client'
import Steps from "@/components/tools/common/ui/Steps";
import { useWizardStore, resetStore } from "./store";
import { stepList, stepGroups } from "./config/stepList";
import { StepListType } from "../common/ui/types";


export default function L1Wizard() {
    const { currentStep, maxAdvancedStep, advanceTo,  } = useWizardStore()

    return (
        <>
            <div className="container mx-auto max-w-6xl p-8 ">
                <h1 className="md:text-3xl lg:text-5xl pb-5">L1 Launcher</h1>
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-80 mb-8">
                        <Steps stepGroups={stepGroups} stepList={stepList} currentStep={currentStep as keyof StepListType} maxAdvancedStep={maxAdvancedStep as keyof StepListType} advanceTo={advanceTo} onReset={resetStore} />
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


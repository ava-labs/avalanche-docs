import { stepList } from "../stepList";
import { useWizardStore } from "../store";
import { Button } from "@/components/ui/button";

interface NextPrevProps {
    nextDisabled: boolean;
    currentStepName: keyof typeof stepList;
}

export default function NextPrev({ nextDisabled, currentStepName }: NextPrevProps) {
    const { advanceFrom } = useWizardStore();

    return (
        <div className="flex justify-between">
            <Button
                onClick={() => advanceFrom(currentStepName, 'down')}
                variant="secondary"
            >
                Back
            </Button>
            <Button
                onClick={() => advanceFrom(currentStepName, 'up')}
                disabled={nextDisabled}
                variant="default"
            >
                Continue
            </Button>
        </div>
    )
}

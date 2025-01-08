import { useWizardStore } from "../store";
import { stepList } from "./Steps";
interface NextPrevProps {
    nextDisabled: boolean;
    currentStepName: keyof typeof stepList;
}

export default function NextPrev({ nextDisabled, currentStepName }: NextPrevProps) {
    const { advanceFrom } = useWizardStore();

    return (
        <div className="flex justify-between">
            <button
                onClick={() => advanceFrom(currentStepName, 'down')}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
                Back
            </button>
            <button
                onClick={() => advanceFrom(currentStepName, 'up')}
                disabled={nextDisabled}
                className={`px-4 py-2 rounded-md ${nextDisabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
            >
                Continue
            </button>
        </div>
    )
}

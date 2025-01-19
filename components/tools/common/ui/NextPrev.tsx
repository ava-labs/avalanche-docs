import { Button } from "@/components/ui/button";

interface NextPrevProps {
    nextDisabled: boolean;
    onNext: () => void;
    onPrev: () => void;
}

export default function NextPrev({ nextDisabled, onNext, onPrev }: NextPrevProps) {

    return (
        <div className="flex justify-between">
            <Button
                onClick={onPrev}
                variant="secondary"
            >
                Back
            </Button>
            <Button
                onClick={onNext}
                disabled={nextDisabled}
                variant="default"
            >
                Continue
            </Button>
        </div>
    )
}

import NextPrev from "@/components/tools/common/ui/NextPrev";
import { useWizardStore } from "../store";

export default function Welcome() {
    const { goToNextStep, goToPreviousStep } = useWizardStore();

    return <>
        <h1 className="text-2xl font-medium mb-6">Welcome</h1>

        <p className="mb-4">
            The L1 Manager helps you manage your L1's validator set. You can add new validators, remove existing ones, and adjust their voting weights. This tool is designed for developers who need to maintain their Proof of Authority (PoA) validator set through a simple web interface.
        </p>

        <p className="mb-4">
            If you're looking for a full-service solution that includes hosting, monitoring and maintenance of the L1's validators for you and offers many additional features check out <a href="https://avacloud.io/" target="_blank" className="text-blue-500 hover:text-blue-700 underline">AvaCloud</a>. If you're looking to spin up short-lived test environments, check out the <a href="https://github.com/ava-labs/avalanche-starter-kit" target="_blank" className="text-blue-500 hover:text-blue-700 underline">Avalanche Starter Kit</a>.
        </p>

        <NextPrev nextDisabled={false} onNext={goToNextStep} onPrev={goToPreviousStep} />
    </>;
}

import NextPrev from "@/components/tools/common/ui/NextPrev";
import { useL1ManagerWizardStore } from "../config/store";

export default function Welcome() {
    const { goToNextStep, goToPreviousStep } = useL1ManagerWizardStore();

    return <>
        <h1 className="text-2xl font-medium mb-6">Welcome</h1>

        <p className="mb-4">
            The PoA Manager helps you manage your L1's validator set. You can add new validators, remove existing ones, and adjust their voting weights. This tool is designed for developers who need to maintain their Proof of Authority (PoA) validator set through a simple web interface.
        </p>

        <div className="p-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Prerequisites</h2>
            <p className="mb-2">
                Before using the L1 Manager, please ensure you have the <a 
                    href="https://core.app/" 
                    target="_blank" 
                    className="text-blue-500 hover:text-blue-700 underline"
                >Core wallet browser extension</a> installed. This extension is required for interacting with the P-Chain and managing validators.
            </p>
            <p className="mb-2">
                You'll also need to run a local signature aggregator service for managing validator signatures. This requirement will be replaced in a future update, but for now you can find setup instructions in the <a 
                    href="https://github.com/ava-labs/icm-services/blob/signature-aggregator/v0.2.0/signature-aggregator/README.md"
                    target="_blank"
                    className="text-blue-500 hover:text-blue-700 underline"
                >signature aggregator documentation</a>.
            </p>
        </div>

        <p className="mb-4">
            If you're looking for a full-service solution that includes hosting, monitoring and maintenance of the L1's validators for you and offers many additional features check out <a href="https://avacloud.io/" target="_blank" className="text-blue-500 hover:text-blue-700 underline">AvaCloud</a>. If you're looking to spin up short-lived test environments, check out the <a href="https://github.com/ava-labs/avalanche-starter-kit" target="_blank" className="text-blue-500 hover:text-blue-700 underline">Avalanche Starter Kit</a>.
        </p>

        <NextPrev nextDisabled={false} prevHidden={false} onNext={goToNextStep} onPrev={goToPreviousStep} />
    </>;
}

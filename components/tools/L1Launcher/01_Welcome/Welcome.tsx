import NextPrev from "../ui/NextPrev";

export default function Welcome() {
    return <>
        <h1 className="text-2xl font-medium mb-6">Welcome</h1>

        <p className="mb-4">
            This L1 Launcher will help you getting you're <span className="font-bold">self-hosted L1</span> set up. It is aimed for developers that want to launch and maintain the validators of their L1 by themselves on their own infrastructure or provider. This tool is free to use and completely open source.
        </p>

        <p className="mb-4">
            If you're looking for a full-service solution that includes hosting, monitoring, maintenance and support of the L1's validators for you and offers many additional features check out <a href="https://avacloud.io/" target="_blank" className="text-blue-500 hover:text-blue-700 underline">AvaCloud</a>. If you're looking to spin up short-lived test environments, check out the <a href="https://github.com/ava-labs/avalanche-starter-kit" target="_blank" className="text-blue-500 hover:text-blue-700 underline">Avalanche Starter Kit</a>.
        </p>

        <div className="mx-auto my-6">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-md shadow">
                
                <div className="ml-3">
                    <p className="text-sm font-medium text-blue-700">
                    Please note that this tool is in Beta and you may experience errors.
                    </p>
                </div>
            </div>
        </div>

        <NextPrev nextDisabled={false} currentStepName="welcome" />
    </>;
}

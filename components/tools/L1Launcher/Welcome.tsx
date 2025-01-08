import NextPrev from "./ui/NextPrev";

export default function Welcome() {
    return <>
        <h1 className="text-2xl font-medium mb-6">Welcome</h1>

        <p className="mb-4">
            This L1 Launcher will help you getting you're L1 set up. It is aimed for developers that want to launch and maintain the validators of their L1 by themselves on their own infrastructure or provider. This tool is free to use and completely open source.
        </p>

        <p className="mb-4">
            If you're looking for a full-service solution that includes hosting, monitoring and maintenance of the L1's validators for you and offers many additional features check out <a href="https://avacloud.io/" target="_blank" className="text-blue-500 hover:text-blue-700 underline">AvaCloud</a>. If you're looking to spin up short-lived test environments, check out the <a href="https://github.com/ava-labs/avalanche-starter-kit" target="_blank" className="text-blue-500 hover:text-blue-700 underline">Avalanche Starter Kit</a>.
        </p>

        <NextPrev nextDisabled={false} currentStepName="welcome" />
    </>;
}

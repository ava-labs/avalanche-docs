import { stepList } from '../stepList';
import { useWizardStore } from '../store';
import NextPrev from '../ui/NextPrev';
import Note from '../ui/Note';
import { useState } from 'react';
import Pre from '../ui/Pre';

const dockerInstallInstructions: Record<string, string> = {
    'Ubuntu/Debian': `sudo apt-get update && \\
    sudo apt-get install -y docker.io && \\
    sudo usermod -aG docker $USER && \\
    newgrp docker

# Test docker installation
docker run -it --rm hello-world
`,
    'Amazon Linux 2023+': `sudo yum update -y && \\
    sudo yum install -y docker && \\
    sudo service docker start && \\
    sudo usermod -a -G docker $USER && \\
    newgrp docker

# Test docker installation
docker run -it --rm hello-world
`,
    'Fedora': `sudo dnf update -y && \\
    sudo dnf -y install docker && \\
    sudo systemctl start docker && \\
    sudo usermod -a -G docker $USER && \\
    newgrp docker

# Test docker installation
docker run -it --rm hello-world
`,
}

export default function PrepareValidators() {
    const { nodesCount, setNodesCount, maxAdvancedStep } = useWizardStore();
    const [activeOs, setActiveOs] = useState(Object.keys(dockerInstallInstructions)[0]);

    // Check if user has advanced beyond this step
    const stepKeys = Object.keys(stepList) as (keyof typeof stepList)[];
    const isLocked = stepKeys.indexOf(maxAdvancedStep) > stepKeys.indexOf('configure-validators');

    const nodeConfigurations = {
        1: { colorClass: 'bg-red-100 text-red-800', badge: 'For development' },
        3: { colorClass: 'bg-green-100 text-green-800', badge: 'For testing' },
        5: { colorClass: 'bg-blue-100 text-blue-800', badge: 'For production' },
    };

    return <>
        <h1 className="text-2xl font-medium mb-6">
            Prepare your Validator Nodes
        </h1>

        <p className="mb-4">
            This step will guide you through preparing your validator nodes. for long-lived environment we recommend using a infrastructure provider such as AWS or Google Cloud. For short-lived environments you can use your local machine or any other machine you have access to.
        </p>


        <div className="mb-4">
            <strong>Requirements for validator nodes:</strong>
            <ul className="list-disc list-inside ml-4">
                <li>16GB RAM (you might try with 8GB)</li>
                <li>8 cores CPU (you might try 4 cores)</li>
                <li>
                    At least 100GB of any disk space (EBS or SSD), except for HDD
                </li>
                <li>
                    <strong>⚠️ Important:</strong> make sure port 9651 is open on your node!
                </li>
            </ul>
            If you are hosting the validators on AWS you can use t2.2xlarge EC2 instances.
        </div>

        <h3 className="mb-4 font-medium">Docker</h3>
        <p className="mb-4">
            We will retrieve the binary images of <a href='https://github.com/ava-labs/avalanchego' target='_blank'>AvalancheGo</a> from the Docker Hub. Make sure you have Docker installed on your system. To install Docker on an AWS machine, run the following commands:
        </p>



        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 ">
            <ul className="flex flex-wrap -mb-px">
                {Object.keys(dockerInstallInstructions).map((os) => (
                    <li key={os} className="me-2">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveOs(os);
                            }}
                            className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${activeOs === os
                                ? 'text-blue-600 border-blue-600'
                                : 'border-transparent'
                                }`}
                        >
                            {os}
                        </a>
                    </li>
                ))}
            </ul>
        </div>

        <Pre>
            {dockerInstallInstructions[activeOs]}
        </Pre>

        <p className="mb-4">
            If you do not want to use Docker, you can follow the instructions <a href="https://github.com/ava-labs/avalanchego?tab=readme-ov-file#installation" target="_blank">here</a>.
        </p>

        <h3 className="mb-4 font-medium text-gray-900 dark:text-gray-100">How many nodes do you want to run?</h3>
        <ul className="mb-4 items-center w-full text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg sm:flex">
            {Object.entries(nodeConfigurations).map(([count, config]) => {
                return (
                    <li key={count} className="w-full border-b border-gray-200 dark:border-gray-700 sm:border-b-0 sm:border-r last:border-r-0">
                        <div className="flex items-center ps-3">
                            <input
                                id={`nodes-${count}`}
                                type="radio"
                                checked={nodesCount === Number(count)}
                                onChange={() => setNodesCount(Number(count))}
                                name="nodes-count"
                                disabled={isLocked}
                                className={`w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-0 
                                    ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                            />
                            <label
                                htmlFor={`nodes-${count}`}
                                className={`w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-100 
                                    ${isLocked ? 'cursor-not-allowed' : ''}`}
                            >
                                {count} {count === '1' ? 'Node' : 'Nodes'}
                                {config.badge && (
                                    <span className={`ms-2 ${config.colorClass} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                                        {config.badge}
                                    </span>
                                )}
                            </label>
                        </div>
                    </li>
                );
            })}
        </ul>
        <Note>
            <p>
                You will need 1 AVAX per node to pay for the continuous validator fees for the first month. Additionally, 0.5 AVAX for transaction fees. Any leftover funds will be returned to you. The total would be {nodesCount * 1 + 0.5} AVAX.
            </p>
        </Note>

        <NextPrev nextDisabled={!nodesCount} currentStepName="configure-validators" />
    </>
}

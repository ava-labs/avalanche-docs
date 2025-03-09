import { useExampleStore } from "../../utils/store";
import { Input, Select } from "../../ui";
import { useState, useEffect } from "react";
import { networkIDs } from "@avalabs/avalanchejs";
import versions from "../../../versions.json";
import { CodeHighlighter } from "../../ui/CodeHighlighter";

const generateValidatorCommand = (index: number, subnet: string, networkID: number) => {
    // Calculate port numbers (each validator needs two consecutive ports)
    const httpPort = 9650 + ((index + 2) * 2);
    const stakingPort = 9651 + ((index + 2) * 2);

    const env: Record<string, string> = {
        AVAGO_PARTIAL_SYNC_PRIMARY_NETWORK: "true",
        AVAGO_PUBLIC_IP_RESOLUTION_SERVICE: "opendns",
        AVAGO_PLUGIN_DIR: "/avalanchego/build/plugins/",
        AVAGO_HTTP_HOST: "0.0.0.0",
        AVAGO_HTTP_PORT: httpPort.toString(),
        AVAGO_STAKING_PORT: stakingPort.toString(),
    };

    if (subnet) {
        env.AVAGO_TRACK_SUBNETS = subnet;
    }

    if (networkID === networkIDs.FujiID) {
        env.AVAGO_NETWORK_ID = "fuji";
    } else if (networkID === networkIDs.MainnetID) {
        // Delete or don't add - mainnet is default
    } else {
        throw new Error(`This tool only supports Fuji (${networkIDs.FujiID}) and Mainnet (${networkIDs.MainnetID}). Network ID ${networkID} is not supported.`);
    }

    const localFolder = `~/.avalanchego${index + 2}`;
    const containerName = `avago${index + 2}`;

    const chunks = [
        "docker run -it -d",
        `--name ${containerName}`,
        `-p 127.0.0.1:${httpPort}:${httpPort} -p ${stakingPort}:${stakingPort}`,
        `-v ${localFolder}:/root/.avalanchego`,
        ...Object.entries(env).map(([key, value]) => `-e ${key}=${value}`),
        `avaplatform/subnet-evm:${versions['avaplatform/subnet-evm']}`
    ];

    return chunks.map(chunk => `    ${chunk}`).join(" \\\n").trim();
}

const checkNodeCommand = (index: number, chainID: string) => {
    const port = 9650 + ((index + 2) * 2);

    return `curl -X POST --data '{ 
  "jsonrpc":"2.0", "method":"eth_chainId", "params":[], "id":1 
}' -H 'content-type:application/json;' \\
http://127.0.0.1:${port}/ext/bc/${chainID}/rpc`;
}

export default function ExtraLocalValidators() {
    const { subnetID, setSubnetID, networkID, setNetworkID, chainID, setChainID } = useExampleStore();
    const [extraValidatorCount, setExtraValidatorCount] = useState<number>(4);
    const [extraValidatorCommands, setExtraValidatorCommands] = useState<string[]>([]);

    // Generate commands when inputs change
    useEffect(() => {
        try {
            const commands = [];
            for (let i = 0; i < extraValidatorCount; i++) {
                commands.push(generateValidatorCommand(i, subnetID, networkID));
            }
            setExtraValidatorCommands(commands);
        } catch (error) {
            setExtraValidatorCommands([(error as Error).message]);
        }
    }, [subnetID, networkID, extraValidatorCount]);

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Extra Local Validators</h2>
            <div className="space-y-4">
                <div className="mb-4">
                    This will help you launch multiple local validators to run in parallel, each with unique ports and container names.
                </div>

                <Input
                    label="Number of Validators"
                    value={extraValidatorCount.toString()}
                    onChange={(value) => {
                        const count = parseInt(value);
                        if (!isNaN(count) && count >= 1) {
                            setExtraValidatorCount(count);
                        }
                    }}
                    placeholder="Enter number (minimum 1)"
                    type="number"
                    min={1}
                    max={10}
                />

                <Input
                    label="Subnet ID"
                    value={subnetID}
                    onChange={setSubnetID}
                    placeholder="Create a subnet to generate a subnet ID"
                />

                <Select
                    label="Select Network"
                    value={networkID}
                    onChange={(value) => setNetworkID(Number(value))}
                    options={[
                        { value: networkIDs.FujiID, label: "Fuji" },
                        { value: networkIDs.MainnetID, label: "Mainnet" },
                    ]}
                />

                <Input
                    label="Chain ID (for check commands)"
                    value={chainID}
                    onChange={setChainID}
                    placeholder="Enter Chain ID"
                />

                <div className="mt-4">
                    <h3 className="text-md font-medium mb-2">Validator Commands:</h3>
                    {extraValidatorCommands.map((command, index) => (
                        <div key={index} className="mb-6">
                            <h4 className="text-sm font-medium mb-1">Validator {index + 1}:</h4>
                            <CodeHighlighter
                                code={command}
                                lang="bash"
                            />
                        </div>
                    ))}
                </div>

                {chainID && (
                    <div className="mt-4">
                        <h3 className="text-md font-medium mb-2">Check Node Commands:</h3>
                        {Array.from({ length: extraValidatorCount }).map((_, index) => (
                            <div key={index} className="mb-4">
                                <h4 className="text-sm font-medium mb-1">Check Validator {index + 1}:</h4>
                                <CodeHighlighter
                                    code={checkNodeCommand(index, chainID)}
                                    lang="bash"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4">
                    <h3 className="text-md font-medium mb-2">Proofs of Possession:</h3>
                    {Array.from({ length: extraValidatorCount }).map((_, index) => (
                        <div key={index} className="mb-4">
                            <h4 className="text-sm font-medium mb-1">Check Validator {index + 1}:</h4>
                            <CodeHighlighter
                                code={`curl -X POST --data '{"jsonrpc":"2.0","id":1,"method":"info.getNodeID"}' -H "content-type:application/json;" 127.0.0.1:${9650 + ((index + 2) * 2)}/ext/info`}
                                lang="bash"
                            />
                        </div>
                    ))}
                </div>

                <div>
                    <div className="mt-4">
                        <h3 className="text-md font-medium mb-2">Stop and remove containers, while keeping data:</h3>
                        <CodeHighlighter
                            code={`docker rm -f ${Array.from({ length: extraValidatorCount }).map((_, index) => `avago${index + 2}`).join(" ")}`}
                            lang="bash"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

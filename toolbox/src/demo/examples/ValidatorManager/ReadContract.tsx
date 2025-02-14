import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { AbiEvent, createPublicClient, custom } from 'viem';
import { useEffect, useState } from "react";
import ValidatorManagerABI from "../../../../contracts/icm-contracts/compiled/ValidatorManager.json";
import { Button, Input } from "../../ui";

type ViewData = {
    [key: string]: any;
};

const serializeValue = (value: any): any => {
    if (typeof value === 'bigint') {
        return value.toString();
    }
    if (Array.isArray(value)) {
        return value.map(serializeValue);
    }
    if (typeof value === 'object' && value !== null) {
        return Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, serializeValue(v)])
        );
    }
    return value;
};

export const ReadContract = () => {
    const { showBoundary } = useErrorBoundary();
    const { validatorManagerAddress, setValidatorManagerAddress } = useExampleStore();
    const [viewData, setViewData] = useState<ViewData>({});
    const [isReading, setIsReading] = useState(false);
    const [eventLogs, setEventLogs] = useState<Record<string, any[]>>({});

    async function readContractData() {
        if (!validatorManagerAddress) {
            return;
        }
        setIsReading(true);
        setEventLogs({});

        if (!validatorManagerAddress || !window.avalanche) return;

        try {
            const publicClient = createPublicClient({
                transport: custom(window.avalanche)
            });

            // Read all view functions
            const viewFunctions = ValidatorManagerABI.abi.filter(
                (item: any) => item.type === "function" &&
                    (item.stateMutability === "view" || item.stateMutability === "pure")
            );

            const data: ViewData = {};

            for (const func of viewFunctions) {
                if (!func.name) continue;
                if (func.inputs.length > 0) continue;

                try {
                    const result = await publicClient.readContract({
                        address: validatorManagerAddress as `0x${string}`,
                        abi: [func],
                        functionName: func.name,
                    });
                    data[func.name] = serializeValue(result);
                } catch (error) {
                    console.error(`Error reading ${func.name}:`, error);
                    data[func.name] = "Error reading value:\n" + (error as Error)?.message || "Unknown error";
                }
            }

            setViewData(data);

            // Get all events
            const events = ValidatorManagerABI.abi.filter(
                (item: any) => item.type === "event"
            );

            const logs: Record<string, any[]> = {};
            for (const event of events) {
                if (!event.name) continue;
                try {
                    const eventLogs = await publicClient.getLogs({
                        address: validatorManagerAddress as `0x${string}`,
                        event: event as AbiEvent,
                        fromBlock: 0n,
                        toBlock: 'latest'
                    });

                    logs[event.name] = eventLogs.map(log => serializeValue(log));
                } catch (error) {
                    console.error(`Error getting logs for ${event.name}:`, error);
                }
            }
            console.log('Event logs:', logs);
            setEventLogs(logs);

        } catch (error) {
            console.error('Main error:', error);
            showBoundary(error);
        } finally {
            setIsReading(false);
        }
    }

    useEffect(() => {
        readContractData();
    }, [validatorManagerAddress]);

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Read Validator Manager Contract</h2>
                <Input
                    label="Validator Manager Address"
                    value={validatorManagerAddress || ""}
                    placeholder="0x..."
                    onChange={(value) => setValidatorManagerAddress(value)}
                    button={
                        <Button
                            type="primary"
                            onClick={readContractData}
                            loading={isReading}
                            className="h-9 rounded-l-none"
                        >
                            Refresh
                        </Button>
                    }
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Function
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(viewData).map(([key, value]) => (
                            <tr key={key} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {key}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <pre className="whitespace-pre-wrap font-mono bg-gray-50 p-2 rounded">
                                        {typeof value === 'string'
                                            ? value
                                            : JSON.stringify(value, null, 2)}
                                    </pre>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {Object.keys(eventLogs).length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Events</h3>
                    <div className="space-y-4">
                        {Object.entries(eventLogs).map(([eventName, logs]) => (
                            <div key={eventName} className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">{eventName}</h4>
                                <pre className="text-sm text-gray-700 overflow-auto">
                                    {JSON.stringify(logs, null, 2)}
                                </pre>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

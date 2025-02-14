import { useEffect, useState } from "react";
import { useExampleStore } from "../../utils/store";
import { Button, Input } from "../../ui";
import { createPublicClient, http } from 'viem';
import { useErrorBoundary } from "react-error-boundary";
import { Success } from "../../ui/Success";

export default function RPCUrlForChain() {
    const { showBoundary } = useErrorBoundary();
    const { chainID, setChainID } = useExampleStore();
    const [domain, setDomain] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [validatedUrl, setValidatedUrl] = useState("");
    const [constructedUrl, setConstructedUrl] = useState("");
    useEffect(() => {
        if (!domain.startsWith("http://") && !domain.startsWith("https://")) {
            setConstructedUrl("");
        } else {
            setConstructedUrl(`${domain}/ext/bc/${chainID}/rpc`);
        }
    }, [domain, chainID]);


    async function checkRpcUrl() {
        if (!constructedUrl) return;

        setIsChecking(true);
        try {
            const publicClient = createPublicClient({
                transport: http(constructedUrl)
            });

            await publicClient.getChainId();
            setValidatedUrl(constructedUrl);
        } catch (error) {
            showBoundary(error);
            setValidatedUrl("");
        } finally {
            setIsChecking(false);
        }
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">RPC URL Builder</h2>
            <div className="space-y-4">
                <Input
                    label="Domain"
                    value={domain}
                    onChange={setDomain}
                    placeholder="https://node.mynet.com"
                    notes="Include protocol (e.g., https://)"
                />
                <Input
                    label="Chain ID"
                    value={chainID}
                    onChange={setChainID}
                />
                <Input
                    label="Constructed URL"
                    value={constructedUrl}
                    disabled={true}
                />
                <Button
                    type="primary"
                    onClick={checkRpcUrl}
                    loading={isChecking}
                    disabled={!constructedUrl}
                >
                    Test Connection
                </Button>
                {validatedUrl && (
                    <Success
                        label="Valid RPC URL"
                        value={validatedUrl}
                    />
                )}
            </div>
        </div>
    );
}

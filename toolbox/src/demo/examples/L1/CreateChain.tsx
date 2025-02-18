import { utils, Context } from "@avalabs/avalanchejs";
import { pvm } from "@avalabs/avalanchejs";
import { getRPCEndpoint } from "../../utils/rpcEndpoint";
import { initialState, useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { Button, Input } from "../../ui";
import { Success } from "../../ui/Success";
import PChainAddressRequired from "../../ui/PChainAddressRequired";

export const CreateChain = () => {
    const { showBoundary } = useErrorBoundary();
    const {
        networkID,
        pChainAddress,
        subnetID,
        chainName,
        vmId,
        setChainName,
        setVmId,
        chainID,
        setChainID,
        setSubnetID,
        walletEVMAddress,
        genesisData,
        setGenesisData
    } = useExampleStore(state => state);
    const [isCreating, setIsCreating] = useState(false);


    async function handleCreateChain() {
        setChainID("");
        setIsCreating(true);
        try {
            const pvmApi = new pvm.PVMApi(getRPCEndpoint(networkID));
            const feeState = await pvmApi.getFeeState();
            const context = await Context.getContextFromURI(getRPCEndpoint(networkID));

            const addressBytes = utils.bech32ToBytes(pChainAddress);

            const { utxos } = await pvmApi.getUTXOs({
                addresses: [pChainAddress]
            });

            const tx = pvm.e.newCreateChainTx({
                feeState,
                fromAddressesBytes: [addressBytes],
                utxos,
                chainName,
                subnetAuth: [0],
                subnetId: subnetID,
                vmId,
                fxIds: [],
                genesisData: JSON.parse(genesisData),
            }, context);

            const txID = await window.avalanche!.request({
                method: 'avalanche_sendTransaction',
                params: {
                    transactionHex: utils.bufferToHex(tx.toBytes()),
                    chainAlias: 'P',
                }
            }) as string;

            setChainID(txID);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsCreating(false);
        }
    }

    if (!pChainAddress) {
        return (
            <div className="space-y-4">
                <h2 className="text-lg font-semibold ">Create Chain</h2>
                <PChainAddressRequired />
            </div>
        );
    }

    if (!genesisData) {
        return (
            <div className="space-y-4">
                <h2 className="text-lg font-semibold ">Create Chain</h2>
                <div className="flex items-center bg-amber-50 border border-amber-300 rounded-md p-3 text-amber-800">
                    <span className="mr-2">⚠️</span>
                    Please generate genesis data first using
                    <a href="#genesisBuilder" className="text-amber-800 hover:text-amber-900 underline ml-1">
                        the Genesis Builder tool
                    </a>.
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold ">Create Chain</h2>
            <div className="space-y-4">
                <Input
                    label="Your P-Chain Address"
                    value={pChainAddress}
                    disabled={true}
                    type="text"
                />
                <Input
                    label="Chain Name"
                    value={chainName}
                    onChange={setChainName}
                    placeholder="Enter chain name"
                />
                <Input
                    label="Subnet ID"
                    value={subnetID}
                    type="text"
                    onChange={setSubnetID}
                    placeholder="Create a subnet to generate a subnet ID"
                />
                <Input
                    label="VM ID"
                    value={vmId}
                    onChange={setVmId}
                    placeholder="Enter VM ID"
                    notes={`Default is ${initialState.vmId}`}
                />
                <Input
                    label="Genesis Data (JSON)"
                    value={genesisData}
                    onChange={setGenesisData}
                    type="textarea"
                    placeholder="Enter genesis data in JSON format"
                    notes={`Auto-generated for address ${walletEVMAddress}`}
                />
                <Button
                    type="primary"
                    onClick={handleCreateChain}
                    loading={isCreating}
                >
                    Create Chain
                </Button>
            </div>
            <Success
                label="Chain ID"
                value={chainID}
            />
        </div>
    );
};

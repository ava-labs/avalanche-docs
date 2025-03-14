"use client";

import { DEFAULT_VM_ID, useToolboxStore, useWalletStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import { Button, Input } from "../../ui";
import { Success } from "../../ui/Success";
import { quickAndDirtyGenesisBuilder } from "./GenesisBuilder";

export default function CreateChain() {
    const { showBoundary } = useErrorBoundary();
    const {
        subnetID,
        evmChainName,
        vmId,
        setEvmChainName,
        setVmId,
        chainID,
        setChainID,
        setSubnetID,
        genesisData,
        setGenesisData,
        evmChainId,
        gasLimit,
        targetBlockRate,
    } = useToolboxStore(state => state);
    const [isCreating, setIsCreating] = useState(false);
    const { walletEVMAddress, coreWalletClient } = useWalletStore();

    useEffect(() => {
        if (!genesisData) {
            setGenesisData(quickAndDirtyGenesisBuilder(walletEVMAddress, evmChainId, gasLimit, targetBlockRate));
        }
    }, [walletEVMAddress, evmChainId, gasLimit, targetBlockRate]);

    function handleCreateChain() {
        setChainID("");
        setIsCreating(true);

        coreWalletClient!.createChain({
            chainName: evmChainName,
            subnetId: subnetID,
            vmId,
            fxIds: [],
            genesisData,
            subnetAuth: [0],
        }).then(txID => {
            setChainID(txID);
            setIsCreating(false);
        }).catch(showBoundary);
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold ">Create Chain</h2>
            <div className="space-y-4">
                <Input
                    label="Chain Name"
                    value={evmChainName}
                    onChange={setEvmChainName}
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
                    notes={`Default is ${DEFAULT_VM_ID}`}
                />
                <Input
                    label="Genesis Data (JSON)"
                    value={genesisData}
                    onChange={setGenesisData}
                    type="textarea"
                    placeholder="Enter genesis data in JSON format"
                    notes={`Auto-generated for address ${walletEVMAddress}`}
                    rows={20}
                />
                <div>
                    Open the <a href="#genesisBuilder" className="text-blue-500 hover:text-blue-600 underline" >Genesis Builder tool</a> to generate custom genesis data.
                </div>
                <Button
                    type="primary"
                    onClick={handleCreateChain}
                    loading={isCreating}
                    disabled={!subnetID || !vmId || !genesisData}
                >
                    Create Chain
                </Button>
            </div>
            <Success
                label="Chain ID"
                value={chainID}
            />
        </div >
    );
};

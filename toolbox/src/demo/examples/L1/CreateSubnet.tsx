"use client";

import { useExampleStore } from "../../utils/store";
import { Button, Input } from "../../ui";
import { useErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import { Success } from "../../ui/Success";


export default function CreateSubnet() {
  const { showBoundary } = useErrorBoundary();
  const { setSubnetID, subnetID, coreWalletClient, walletChainId } = useExampleStore(state => state);
  const [isCreating, setIsCreating] = useState(false);

  const [pChainAddress, setPChainAddress] = useState<string>("");
  useEffect(() => {
    coreWalletClient!.getPChainAddress().then(setPChainAddress).catch(showBoundary);
  }, [walletChainId]);

  async function handleCreateSubnet() {
    setSubnetID("");
    setIsCreating(true);
    try {
      const txID = await coreWalletClient!.createSubnet({
        subnetOwners: [pChainAddress]
      });

      setSubnetID(txID);
    } catch (error) {
      showBoundary(error);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold ">Create Subnet</h2>
      <div className="space-y-4">
        <Input
          label="Your P-Chain Address"
          value={pChainAddress ?? ""}
          disabled={true}
          type="text"
        />
        <Button
          onClick={handleCreateSubnet}
          loading={isCreating}
          disabled={!pChainAddress}
          type="primary"
        >
          Create Subnet
        </Button>
      </div>
      <Success
        label="Subnet ID"
        value={subnetID}
      />
    </div>
  );
};

import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Button, Input, Select } from "../../ui";
import { useExampleStore } from "../../utils/store";
import { Success } from "../../ui/Success";
import {
  utils,
  secp256k1,
  networkIDs,
} from "@avalabs/avalanchejs";
import { Buffer as BufferPolyfill } from "buffer";
import { SigningKey } from 'ethers';


function calculatePChainAddress(xpPublicKey: string, networkID: number) {
  if (!xpPublicKey.startsWith("0x")) {
    xpPublicKey = `0x${xpPublicKey}`;
  }
  const compressed = SigningKey.computePublicKey(xpPublicKey, true).slice(2);
  const pubComp = BufferPolyfill.from(compressed, "hex");
  const address = secp256k1.publicKeyBytesToAddress(pubComp);
  return utils.format("P", networkIDs.getHRP(networkID), address)
}

async function requestPublicKeys() {
  return await window.avalanche!.request<{ xp: string, evm: string }>({
    method: "avalanche_getAccountPubKey",
  });
}

export const GetPChainAddress = () => {
  const { showBoundary } = useErrorBoundary();
  const { xpPublicKey, evmPublicKey, networkID, setXpPublicKey, setEvmPublicKey, setNetworkID, setPChainAddress, pChainAddress } = useExampleStore();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPubKeys() {
    setIsLoading(true);
    try {
      const pubkeys = await requestPublicKeys();
      setXpPublicKey(pubkeys.xp);
      setEvmPublicKey(pubkeys.evm);
    } catch (error) {
      showBoundary(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!xpPublicKey) {
      setPChainAddress("");
      return;
    }

    setPChainAddress(calculatePChainAddress(xpPublicKey, networkID));
  }, [xpPublicKey, networkID]);

  return (
    <>
      <h2 className="text-lg font-semibold ">Get P-Chain Address</h2>
      {!xpPublicKey && !evmPublicKey && <div>
        <Button onClick={fetchPubKeys} type="primary" loading={isLoading}>
          Call avalanche_getAccountPubKey
        </Button>
      </div>}
      {(xpPublicKey || evmPublicKey) && <>
        <div className="space-y-2">
          <Input label="XP Public Key" value={xpPublicKey} disabled={true} />
          <Input label="EVM Public Key" value={evmPublicKey} disabled={true} />
        </div>
        <div>
          <Select
            label="Select Network"
            value={networkID}
            onChange={(value) => setNetworkID(Number(value))}
            options={[
              { value: networkIDs.FujiID, label: "Fuji" },
              { value: networkIDs.MainnetID, label: "Mainnet" },
            ]}
          />
        </div>
      </>}
      <Success
        label="P-Chain Address"
        value={pChainAddress}
      />
    </>
  );
};

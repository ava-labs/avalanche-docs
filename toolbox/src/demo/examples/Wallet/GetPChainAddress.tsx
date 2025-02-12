import {
  utils,
  secp256k1,
  networkIDs,
} from "@avalabs/avalanchejs";
import { Buffer as BufferPolyfill } from "buffer";
import { SigningKey } from 'ethers';
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Button, Input, Select } from "../../ui";
import { useExampleStore } from "../../utils/store";
import { Success } from "../../ui/Success";

export const GetPChainAddress = () => {
  const { showBoundary } = useErrorBoundary();
  const store = useExampleStore();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPubKeys() {
    setIsLoading(true);
    try {
      const pubkeys = await window.avalanche!.request({
        method: "avalanche_getAccountPubKey",
      }) as { xp: string, evm: string };
      store.setXpPublicKey(pubkeys.xp);
      store.setEvmPublicKey(pubkeys.evm);
    } catch (error) {
      showBoundary(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!store.xpPublicKey) {
      store.setPChainAddress("");
      return;
    }

    const compressed = SigningKey.computePublicKey(`0x${store.xpPublicKey}`, true).slice(2);
    const pubComp = BufferPolyfill.from(compressed, "hex");
    const address = secp256k1.publicKeyBytesToAddress(pubComp);
    store.setPChainAddress(utils.format("P", networkIDs.getHRP(store.networkID), address));
  }, [store.xpPublicKey, store.networkID]);

  return (
    <>
      <h2 className="text-lg font-semibold ">Get P-Chain Address</h2>
      {!store.xpPublicKey && !store.evmPublicKey && <div>
        <Button onClick={fetchPubKeys} type="primary" loading={isLoading}>
          Call avalanche_getAccountPubKey
        </Button>
      </div>}
      {(store.xpPublicKey || store.evmPublicKey) && <>
        <div className="space-y-2">
          <Input label="XP Public Key" value={store.xpPublicKey} disabled={true} />
          <Input label="EVM Public Key" value={store.evmPublicKey} disabled={true} />
        </div>
        <div>
          <Select
            label="Select Network"
            value={store.networkID}
            onChange={(value) => store.setNetworkID(Number(value))}
            options={[
              { value: networkIDs.FujiID, label: "Fuji" },
              { value: networkIDs.MainnetID, label: "Mainnet" },
            ]}
          />
        </div>
      </>}
      <Success
        label="P-Chain Address"
        value={store.pChainAddress}
      />
    </>
  );
};

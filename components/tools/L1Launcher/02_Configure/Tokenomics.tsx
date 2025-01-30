import { Input } from '@/components/ui/input';
import { useL1LauncherWizardStore } from '../config/store';
import NextPrev from "@/components/tools/common/ui/NextPrev";
import { Label } from '@radix-ui/react-label';
import TokenAllocationList from '../../common/token-allocation-list/token-allocation-list';
import AllowlistPrecompileConfigurator from '../../common/allowlist-precompile-configurator/allowlist-precompile-configurator';
import { useEffect } from 'react';
import { newPrivateKey } from '../../common/utils/wallet';
import { isValidAllowlistPrecompileConfig } from '../../common/utils/validation';

export default function Permissions() {
    const { tokenSymbol, setTokenSymbol, tokenAllocations, setTokenAllocations, nativeMinterAllowlistConfig, setNativeMinterAllowlistConfig, tempPrivateKeyHex, setTempPrivateKeyHex, goToNextStep, goToPreviousStep } = useL1LauncherWizardStore();

    // Initialize temporary private key if not exists
    useEffect(() => {
        if (!tempPrivateKeyHex) {
            setTempPrivateKeyHex(newPrivateKey());
        }
    }, [tempPrivateKeyHex, setTempPrivateKeyHex]);

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-2xl font-medium mb-4">Tokenomics</h1>
                <p>Configure the tokenomics of your L1. You can pick a token symbol and the initial allocation. Futhermore, you can configure if the native token used for transaction fees should be mintable. You can configure the staking token in the next step.</p>
            </div>

            <div>
                <Label>Token Symbol</Label>
                <Input type='text' value={tokenSymbol} onChange={(e) => setTokenSymbol(e.target.value)} />
                <p className="mt-2 text-sm text-gray-500">
                    The symbol (ticker) of your blockchain's native token (e.g., AAA, TEST). Do not use existing tickers like AVAX, ETH, etc.
                </p>
            </div>

            <div>
                <h3 className="mb-4 font-medium">Initial Token Allocation</h3>
                <p className="text-gray-600">Define which addresses should hold how many tokens at the start (genesis) of the blockchain. The <span className="italic">Initial Contract Deployer</span> address is required for deploying the validator manager contracts later.</p>
            </div>
            
            <TokenAllocationList
                allocations={tokenAllocations}
                onAllocationsChange={setTokenAllocations}
            />

             <AllowlistPrecompileConfigurator
                title="Native Minter Allowlist"
                description="This precompile restricts which addresses may mint new native Tokens on this blockchain."
                precompileAction="mint new native tokens"
                config={nativeMinterAllowlistConfig}
                onUpdateConfig={setNativeMinterAllowlistConfig}
                radioOptionFalseLabel="I want to have a fixed supply of tokens on my blockchain."
                radioOptionTrueLabel="I want to be able to mint additional tokens (recommended for production)."
            />

            <NextPrev nextDisabled={!tokenSymbol || tokenAllocations.length < 1 || !isValidAllowlistPrecompileConfig(nativeMinterAllowlistConfig)} onNext={goToNextStep} onPrev={goToPreviousStep} />
        </div>
    );
}

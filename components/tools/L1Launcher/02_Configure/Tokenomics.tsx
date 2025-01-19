import { Input } from '@/components/ui/input';
import { useWizardStore } from '../store';
import NextPrev from '../ui/NextPrev';
import { Label } from '@radix-ui/react-label';
import TokenAllocationList from '../../common/token-allocation-list/token-allocation-list';
import AllowlistPrecompileConfigurator from '../../common/allowlist-precompile-configurator/allowlist-precompile-configurator';
import { useEffect } from 'react';
import { newPrivateKey } from '../wallet';
import { isValidAllowlistPrecompileConfig } from '../../common/utils/validation';

export default function Permissions() {
    const { tokenSymbol, setTokenSymbol, tokenAllocations, setTokenAllocations, nativeMinterAllowlistConfig, setNativeMinterAllowlistConfig, tempPrivateKeyHex, setTempPrivateKeyHex } = useWizardStore();

    // Initialize temporary private key if not exists
    useEffect(() => {
        if (!tempPrivateKeyHex) {
            setTempPrivateKeyHex(newPrivateKey());
        }
    }, [tempPrivateKeyHex, setTempPrivateKeyHex]);

    return (
        <div className="space-y-12">
            <h1 className="text-2xl font-medium mb-6">Tokenomics</h1>
            <div>
                <Label>Token Symbol</Label>
                <Input type='text' value={tokenSymbol} onChange={(e) => setTokenSymbol(e.target.value)} />
                <p className="mt-2 text-sm text-gray-500">
                    The symbol (ticker) of your blockchain's native token (e.g., AAA, TEST). Do not use existing tickers like AVAX, ETH, etc.
                </p>
            </div>

            <div>
                <h3 className="mb-4 font-medium">Initial Token Allocation</h3>
                <p className="text-gray-600">Define which addresses should hold how many tokens at the start of the blockchain.</p>
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

            <NextPrev nextDisabled={!tokenSymbol || tokenAllocations.length < 2 || !isValidAllowlistPrecompileConfig(nativeMinterAllowlistConfig)} currentStepName="tokenomics" />
        </div>
    );
}
import { Input } from '@/components/ui/input';
import { useL1LauncherWizardStore } from '../config/store';
import NextPrev from "@/components/tools/common/ui/NextPrev";
import { Label } from '@radix-ui/react-label';
import TokenAllocationList from '../../common/token-allocation-list/token-allocation-list';
import AllowlistPrecompileConfigurator from '../../common/allowlist-precompile-configurator/allowlist-precompile-configurator';
import { useEffect } from 'react';
import { newPrivateKey } from '../../common/utils/wallet';
import { isValidAllowlistPrecompileConfig } from '../../common/utils/validation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Permissions() {
    const { tokenSymbol, setTokenSymbol, tokenAllocations, setTokenAllocations, nativeMinterAllowlistConfig, setNativeMinterAllowlistConfig, goToNextStep, goToPreviousStep } = useL1LauncherWizardStore();

    return (
        <div className="space-y-12">
            <div className='space-y-4'>
                <h1 className="text-2xl font-medium">Tokenomics</h1>
                <p>Tokenomics in Layer 1 blockchains on the Avalanche network are highly flexible, allowing developers to tailor economic models to their specific needs. Each L1 can define its own native token, specifying its initial allocation, distribution mechanism, and whether it should be mintable for ongoing issuance. This enables a wide range of economic designs, from fixed-supply tokens to inflationary models that support network sustainability.</p>
                <p>Alternatively, an L1 can choose to use an existing token, such as USDC or AVAX, for transaction fees. This flexibility allows builders to align economic incentives with their ecosystem goals, whether prioritizing stability, decentralization, or utility-driven adoption.</p>
            </div>

            <div className='space-y-4'>
                <h3 className="font-medium">Native Token</h3>
                <p className="text-gray-600">Choose what kind of token should be used as the native token of the L1 which is used to pay for transaction fees.</p>

                <RadioGroup
                    defaultValue={"own-token"}
                    onValueChange={() => { }}
                    className="space-y-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="own-token" id={`own-token`} />
                        <Label htmlFor={`validator-option-poa`}>It's own native token</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="c-chain-usdc" id={`c-chain-usdc`} disabled={true} />
                        <Label htmlFor={`validator-option-pos`}>USDC (Coming soon)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="c-chain-avax" id={`c-chain-avax`} disabled={true} />
                        <Label htmlFor={`validator-option-pos`}>AVAX (Coming soon)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="another-token" id={`another-token`} disabled={true} />
                        <Label htmlFor={`validator-option-pos`}>Another token (specify blockchain id and token address) (Coming soon)</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className='space-y-4'>
                <h3 className="font-medium">Token Symbol</h3>
                <p className="text-gray-600">The symbol (ticker) of your blockchain's native token (e.g., AAA, TEST). Do not use existing tickers like AVAX, ETH, etc.</p>
                <Input type='text' value={tokenSymbol} onChange={(e) => setTokenSymbol(e.target.value)} />
            </div>

            <div className='space-y-4'>
                <h3 className="font-medium">Initial Token Allocation</h3>
                <p className="text-gray-600">Define which addresses should hold how many tokens at the start (genesis) of the blockchain. The <span className="italic">Initial Contract Deployer</span> address is required for deploying the validator manager contracts later.</p>

                <TokenAllocationList
                    allocations={tokenAllocations}
                    onAllocationsChange={setTokenAllocations}
                />
            </div>

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

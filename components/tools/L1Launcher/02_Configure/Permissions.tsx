import { useWizardStore } from '../store';
import NextPrev from '../ui/NextPrev';
import AllowlistPrecompileConfigurator from '../../common/allowlist-precompile-configurator/allowlist-precompile-configurator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { isValidAllowlistPrecompileConfig } from '../../common/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { getWalletAddress } from '../wallet';
import { isAddress } from 'viem';

export default function Permissions() {
    const { poaOwnerAddress, setPoaOwnerAddress, txAllowlistConfig, setTxAllowlistConfig, contractDeployerAllowlistConfig, setContractDeployerAllowlistConfig } = useWizardStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleConnectWallet = async () => {
        setIsLoading(true);
        setError('');
        try {
            const walletAddress = await getWalletAddress();
            setPoaOwnerAddress(walletAddress);
        } catch (err: any) {
            setError(err.message || 'Failed to connect wallet');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12">
            <h1 className="text-2xl font-medium mb-6">Permissions</h1>

            <div>
                <div>
                    <h3 className="mb-4 font-medium">Validator Set</h3>
                    <p className="mb-4 text-gray-600">How should the validator set of this blockchain be determined? You can migrate from Proof-of-Authority to Proof-of-Stake at a later time.</p>
                </div>

                <RadioGroup
                    defaultValue={"fuji-testnet"}
                    onValueChange={() => { }}
                    className="space-y-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fuji-testnet" id={`validator-option-poa`} />
                        <Label htmlFor={`validator-option-poa`}>Proof-of-Authority: Only selected parties should validate this blockchain</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mainnet" id={`validator-option-pos`} disabled={true} />
                        <Label htmlFor={`validator-option-pos`}>Proof-of-Stake: Anyone holding the staking token (Coming soon)</Label>
                    </div>
                </RadioGroup>
            </div>

            <div>
                <Label>POA Owner Address</Label>
                <div className="flex gap-3 items-start">
                    <Input type='text' value={poaOwnerAddress} onChange={(e) => setPoaOwnerAddress(e.target.value)} />
                    {window.ethereum && <Button
                        onClick={handleConnectWallet}
                        variant="secondary"
                    >
                        {isLoading ? 'Loading...' : 'Fill from Wallet'}
                    </Button>}
                </div>
                {poaOwnerAddress && !isAddress(poaOwnerAddress, {strict: false}) && (
                    <p className="mt-2 text-sm text-red-500">
                        Please paste a valid Ethereum address in 0x format.
                    </p>
                )}
                {error && (
                    <p className="mt-2 text-sm text-red-500">
                        {error}
                    </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                    This address controls the validator set of the blockchain. It can transfer the ownership to another address at a later time.
                </p>
            </div>



            <AllowlistPrecompileConfigurator
                title="Transaction Allowlist"
                description="This precompile restricts which addresses may submit transactions on this blockchain."
                precompileAction="issue transactions"
                config={txAllowlistConfig}
                onUpdateConfig={setTxAllowlistConfig}
                radioOptionFalseLabel="I want anyone to be able to submit transactions on this blockchain."
                radioOptionTrueLabel="I want only approved addresses to be able to submit transactions on this blockchain."
            />

            <AllowlistPrecompileConfigurator
                title="Contract Deployer Allowlist"
                description="This precompile restricts which addresses may deploy smart contracts on this blockchain."
                precompileAction="issue transactions"
                config={contractDeployerAllowlistConfig}
                onUpdateConfig={setContractDeployerAllowlistConfig}
                radioOptionFalseLabel="I want anyone to be able to deploy contracts on this blockchain."
                radioOptionTrueLabel="I want only approved addresses to be able to deploy contracts on this blockchain."
            />

            <NextPrev nextDisabled={!isAddress(poaOwnerAddress, {strict: false}) || !isValidAllowlistPrecompileConfig(txAllowlistConfig) || !isValidAllowlistPrecompileConfig(contractDeployerAllowlistConfig)} currentStepName="permissions" />
        </div>
    );
}
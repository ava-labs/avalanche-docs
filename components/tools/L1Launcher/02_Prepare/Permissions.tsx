import { useWizardStore } from '../store';
import NextPrev from '../ui/NextPrev';
import { AllowlistPrecompileConfig } from '../../common/allowlist-precompile-configurator/types';
import AllowlistPrecompileConfigurator from '../../common/allowlist-precompile-configurator/allowlist-precompile-configurator';

export default function Permissions() {
    const { txAllowlistConfig, setTxAllowlistConfig, contractDeployerAllowlistConfig, setContractDeployerAllowlistConfig } = useWizardStore();

    return (
        <div className="space-y-12">
            <h1 className="text-2xl font-medium mb-6">Permissions</h1>

            <AllowlistPrecompileConfigurator
                title="Transaction Allowlist"
                description="This precompile restricts which addresses may submit transactions on this blockchain."
                precompileAction="issue transactions"
                config={txAllowlistConfig}
                onUpdateConfig={(newConfig: AllowlistPrecompileConfig) => setTxAllowlistConfig(newConfig)}
                radioOptionFalseLabel="I want anyone to be able to submit transactions on this blockchain."
                radioOptionTrueLabel="I want only approved addresses to be able to submit transactions on this blockchain."
            />

            <AllowlistPrecompileConfigurator
                title="Contract Deployer Allowlist"
                description="This precompile restricts which addresses may deploy smart contracts on this blockchain."
                precompileAction="issue transactions"
                config={contractDeployerAllowlistConfig}
                onUpdateConfig={(newConfig: AllowlistPrecompileConfig) => setContractDeployerAllowlistConfig(newConfig)}
                radioOptionFalseLabel="I want anyone to be able to deploy contracts on this blockchain."
                radioOptionTrueLabel="I want only approved addresses to be able to deploy contracts on this blockchain."
            />

            <NextPrev nextDisabled={false} currentStepName="permissions" />
        </div>
    );
}
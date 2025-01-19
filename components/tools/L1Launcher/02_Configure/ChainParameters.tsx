import { Label } from '@radix-ui/react-label';
import { useWizardStore } from '../store';
import NextPrev from '../ui/NextPrev';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { isValidL1Name } from '../../common/utils/validation';


export default function ChainParameters() {
    const { l1Name, setL1Name, evmChainId, setEvmChainId } = useWizardStore();

    return (
        <div className="space-y-12">
            <h1 className="text-2xl font-medium mb-6">Permissions</h1>

            <div>
                <Label>L1 Name</Label>
                <Input type='text' value={l1Name} onChange={(e) => setL1Name(e.target.value)} />
                {l1Name && !isValidL1Name(l1Name) && (
                    <p className="mt-2 text-sm text-red-500">
                        Only letters, numbers, and spaces are allowed.
                    </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                    Enter a name for your L1.
                </p>
            </div>

            <div>
                <Label>EVM Chain ID</Label>
                <Input type='number' value={evmChainId} onChange={(e) => setEvmChainId(e.target.valueAsNumber)} min={0} step={1} />
                <p className="mt-2 text-sm text-gray-500">
                    Unique identifier for your blockchain network. Check if it's unique <Link href={`https://chainlist.org/?search=${evmChainId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600">on chainlist.org</Link>.
                </p>
            </div>

            <div>

                <div>
                    <h3 className="mb-4 font-medium">Network</h3>
                    <p className="mb-4 text-gray-600">Do you want to deploy your L1 on testnet or mainnet?</p>
                </div>

                <RadioGroup
                    defaultValue={"fuji-testnet"}
                    onValueChange={() => { }}
                    className="space-y-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fuji-testnet" id={`network-option-fuji-testnet`} />
                        <Label htmlFor={`network-option-fuji-testnet`}>Fuji Testnet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mainnet" id={`network-option-mainnet`} disabled={true} />
                        <Label htmlFor={`network-option-true`}>Mainnet (coming soon)</Label>
                    </div>
                </RadioGroup>`
            </div>

            <NextPrev nextDisabled={!isValidL1Name(l1Name) || !evmChainId} currentStepName="chain-parameters" />
        </div>
    );
}
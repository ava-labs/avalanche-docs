import { getIntegrationPages } from '@/utils/integrations-loader';

import Link from 'next/link';
import { cn } from '@/utils/cn';
import { buttonVariants } from '@/components/ui/button';
import Integrations from '@/components/integrations';

export default function Page(): React.ReactElement {
    const list = [...getIntegrationPages()];
    return (
        <main className="py-12 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto w-full flex flex-col items-center lg:mx-0 gap-6">
                    <h1 className="text-center text-4xl font-semibold md:text-5xl">Find an Integration</h1>
                    <p className="h-fit text-center p-2 text-fd-muted-foreground md:max-w-[80%] md:text-xl">
                        Discover best-in-class integrations for your Avalanche L1 and learn how to use them.
                    </p>
                    <div className='inline-flex items-center gap-3'>
                        <Link className={cn(buttonVariants())} href={`#Featured`}>Discover Integrations</Link>
                        <Link className={cn(buttonVariants({ variant: 'outline' }))} href="https://github.com/ava-labs/avalanche-docs/blob/master/content/integrations" target='_blank'>Add your Integration</Link>
                    </div>
                </div>
                <Integrations list={JSON.parse(JSON.stringify(list))}></Integrations>
            </div>
        </main>
    );
}
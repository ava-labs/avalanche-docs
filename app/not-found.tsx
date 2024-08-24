import Link from 'next/link';
import { Layout } from 'fumadocs-ui/layout';
import { baseOptions } from '@/app/layout.config';

export default function HomePage(): React.ReactElement {
  return <Layout {...baseOptions}>
    <div>
        <main className="flex h-screen flex-col text-center mt-[180px]">
        <h1 className="mb-4 text-2xl font-bold">😢{' '}Page Not Found</h1>
        <p className="text-fd-muted-foreground">
            Please open an{' '}<Link href="/" className="text-fd-foreground font-semibold underline">issue on GitHub</Link>.<br/>
            Alternatively, open the{' '}
            <Link href="/" className="text-fd-foreground font-semibold underline">Homepage</Link>{' '}
            to find relevant docs.
        </p>
        <button className="mt-4 text-fd-foreground font-semibold underline"> or go back</button>
        </main>
    </div>
  </Layout>;
}
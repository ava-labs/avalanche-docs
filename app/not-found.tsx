import Link from 'next/link';
import { Layout } from 'fumadocs-ui/layout';
import { baseOptions } from '@/app/layout.config';

export default function HomePage(): React.ReactElement {
  return <Layout {...baseOptions}>(
    <>
        <main className="flex h-screen flex-col justify-center text-center">
        <h1 className="mb-4 text-2xl font-bold">😢{' '}Page Not Found</h1>
        <p className="text-fd-muted-foreground">
            Please open an{' '}<Link href="/" className="text-fd-foreground font-semibold underline">issue on GitHub</Link>.<br/>
            Alternatively, open the{' '}
            <Link href="/" className="text-fd-foreground font-semibold underline">Homepage</Link>{' '}
            to find relevant docs.
        </p>
        </main>
    </>
  );
  </Layout>;
}
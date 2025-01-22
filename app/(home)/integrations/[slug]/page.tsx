import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getIntegrationPage, getIntegrationPages } from '@/utils/content-loader/integrations-loader';
import { createMetadata } from '@/utils/metadata';
import { buttonVariants } from '@/components/ui/button';
import { ArrowUpRightIcon } from 'lucide-react';
import { Pill, Pills } from '@/components/ui/pills';
import defaultMdxComponents from 'fumadocs-ui/mdx';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
    const params = await props.params;
    const page = getIntegrationPage([params.slug]);
    if (!page) notFound();

    const { body: MDX } = await page.data.load();
    const path = `content/integrations/${page.file.path}`;

    return (
        <>
            <div
                className="container rounded-xl border mt-5 py-12 md:px-8"
                style={{
                    backgroundColor: 'black',
                    backgroundImage: [
                        'linear-gradient(140deg, #3752AC 0%, transparent 50%)',
                        'linear-gradient(to left top, #E84142 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 100%, #3752AC, #E84142 17%, transparent 20%)',
                    ].join(', '),
                    backgroundBlendMode: 'difference, difference, normal',
                }}
            >
                <div className="flex items-center">
                    <img
                        src={page.data.logo}
                        alt={page.data.title}
                        className="w-12 h-12 object-contain mr-4"
                    />
                    <h1 className="mb-2 text-3xl font-bold text-white">
                        {page.data.title}
                    </h1>
                </div>
                <p className="mb-4 text-white/80">{page.data.description}</p>
                <Link
                    href="/integrations"
                    className={buttonVariants({ size: 'sm', variant: 'secondary' })}
                >
                    Back
                </Link>
            </div>
            <article className="container grid grid-cols-1 px-0 py-8 lg:grid-cols-[2fr_1fr] lg:px-4">
                <div className="prose p-4">
                    <MDX components={defaultMdxComponents}/>
                </div>
                <div className="flex flex-col gap-4 border-l p-4 text-sm">
                    <div>
                        <p className="mb-1 text-sm text-muted-foreground">Developer:</p>
                        <p className="font-medium">{page.data.developer}</p>
                    </div>
                    <div>
                        <p className="mb-2 text-muted-foreground">Categories:</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                            <Pill item={{ text: page.data.category }} />
                        </div>
                    </div>
                    {
                        page.data.available && page.data.available.length > 0 && <div>
                            <p className="mb-2 text-muted-foreground">Available For:</p>
                            <div className="flex flex-wrap items-center gap-4 text-xs">
                                <Pills items={page.data.available.map((c: string) => { return { text: c } })} />
                            </div>
                        </div>
                    }
                    <div>
                        <p className="mb-1 text-muted-foreground">Website:</p>
                        <a href={page.data.website} target="_blank" rel="noreferrer noopener">
                            {page.data.website}
                        </a>
                    </div>
                    <div>
                        <p className="mb-1 text-muted-foreground">Documentation:</p>
                        <a href={page.data.documentation} target="_blank" rel="noreferrer noopener">
                            {page.data.documentation}
                        </a>
                    </div>

                    <a
                        href={`https://github.com/ava-labs/avalanche-academy/blob/dev/${path}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowUpRightIcon className="size-5" /> Edit on Github
                    </a>

                    {/* <Control url={page.url} /> */}
                </div>
            </article>
        </>
    );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const params = await props.params;
    const page = getIntegrationPage([params.slug]);
    if (!page) notFound();

    const description = page.data.description ?? 'Learn how to build on Avalanche blockchain with Academy';
    const imageParams = new URLSearchParams();
    imageParams.set('title', page.data.title);
    imageParams.set('description', description);

    const image = {
        alt: 'Banner',
        url: `/api/og/guides/${params.slug}?${imageParams.toString()}`,
        width: 1200,
        height: 630,
    };

    return createMetadata({
        title: page.data.title,
        description,
        openGraph: {
            url: `/docs/${page.slugs.join('/')}`,
            images: image,
        },
        twitter: {
            images: image,
        },
    });
}


export function generateStaticParams(): { slug: string }[] {
    return getIntegrationPages().map((page) => ({
        slug: page.slugs[0],
    }));
}
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { integrations } from '@/utils/source';
import { createMetadata } from '@/utils/metadata';
import { buttonVariants } from '@/components/ui/button';
import { ArrowUpRightIcon } from 'lucide-react';
// import { Control } from '@/app/(home)/blog/[slug]/page.client';

interface Param {
    slug: string;
}

export const dynamicParams = false;

export default function Page({
    params,
}: {
    params: Param;
}): React.ReactElement {
    const page = integrations.getPage([params.slug]);

    if (!page) notFound();

    const path = `content/integrations/${page.file.path}`;

    const categories = page.data.category ? page.data.category.split(',').map((category) => category.trim()) : [];

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
                    <page.data.exports.default />
                </div>
                <div className="flex flex-col gap-4 border-l p-4 text-sm">
                    <div>
                        <p className="mb-1 text-sm text-muted-foreground">Developer:</p>
                        <p className="font-medium">{page.data.developer}</p>
                    </div>
                    <div>
                        <p className="mb-2 text-muted-foreground">Category:</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                            {categories.map((category) => (
                                <div
                                    key={category}
                                    className="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-muted-foreground"
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    </div>
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

export function generateMetadata({ params }: { params: Param }): Metadata {
    const page = integrations.getPage([params.slug]);

    if (!page) notFound();

    const description =
        page.data.description ?? 'Learn how to build on Avalanche blockchain with Academy';

    const imageParams = new URLSearchParams();
    imageParams.set('title', page.data.title);
    imageParams.set('description', description);

    const image = {
        alt: 'Banner',
        url: `/api/og/guide/${params.slug[0]}?${imageParams.toString()}`,
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


export function generateStaticParams(): Param[] {
    return integrations.getPages().map<Param>((page) => ({
        slug: page.slugs[0],
    }));
}
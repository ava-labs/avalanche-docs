import Link from 'next/link';
import { integrations } from '@/utils/source';


export default function Page(): React.ReactElement {
    const integrationsList = [...integrations.getPages()]
    const groupedIntegrations: { [key: string]: any[] } = integrationsList.reduce((acc: { [key: string]: any[] }, integration) => {
        const categories = integration.data.category ? integration.data.category.split(',').map((category) => category.trim()) : [];
        categories.forEach((category) => {
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(integration);
        });
        return acc;
    }
    , {});

    return (
        <main className="py-12 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex">
                    <div className="w-1/4">
                        <div className="sticky top-0">
                            <ul className="space-y-2">
                                {/* Render the categories on sidelist */}
                                {Object.keys(groupedIntegrations)
                                    .sort()
                                    .map((category) => (
                                        <li key={category}>
                                            <a href={`#${category}`} className="text-lg font-bold">
                                                {category}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-3/4">
                        <div className="mx-auto w-full lg:mx-0">
                            <h2 className="text-center text-5xl font-bold tracking-tight sm:text-10xl">Find an Integration</h2>
                            <p className="m-12 text-center text-lg leading-8 text-muted-foreground">
                                Extend your application by integrating with the Avalanche ecosystem.
                            </p>
                        </div>

                        {/* Render the integrations for each category */}
                        {Object.entries(groupedIntegrations).sort().map(([category, integrations]) => (
                            <div key={category}>
                                <section id={category}>
                                    <h3 className="text-2xl font-bold mt-8">{category}</h3>
                                </section>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-full">
                                    {integrations.map((integration) => (
                                        <Link
                                            key={integration.url}
                                            href={integration.url}
                                            className="flex flex-col bg-card p-4 rounded-lg transition-shadow shadow hover:shadow-lg dark:bg-card-dark dark:border dark:border-slate-500 w-full w-auto h-auto"
                                        >
                                            <div className="flex items-center">
                                                <div className="w-16 h-16 mr-4 rounded-full overflow-hidden">
                                                    <img
                                                        src={integration.data.logo}
                                                        alt={integration.data.title}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl">{integration.data.title}</h3>
                                                    <p className="text-sm text-gray-500">{integration.data.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
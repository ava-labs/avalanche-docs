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
                <div className="mx-auto w-full flex flex-col items-center lg:mx-0">
                    <h1 className="mb-6 text-center text-4xl font-semibold md:text-5xl">Find an Integration</h1>
                    <p className="mb-6 h-fit text-center p-2 text-fd-muted-foreground md:max-w-[80%] md:text-xl">
                        Discover best-in-class intergrations for your Avalanche L1 and learn how to use them.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-12">
                    <div className="w-full mb-12 md:w-1/5">
                        <div className="sticky top-0 pt-20">
                            <div className="inline-flex items-center gap-2 rounded-full border bg-secondary/50 p-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground w-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search ms-1 size-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                                <input type="text" placeholder="Search" className="w-full bg-transparent focus:outline-none" />
                            </div>
                            <ul className="space-y-2">
                                {/* Render the categories on sidelist */}
                                {Object.keys(groupedIntegrations)
                                    .sort()
                                    .map((category) => (
                                        <li key={category}>
                                            <a href={`#${category}`} className="text-md">
                                                {category}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-4/5 pt-20">

                        {/* Render the integrations for each category */}
                        {Object.entries(groupedIntegrations).sort().map(([category, integrations]) => (
                            <div key={category} className="mb-12">
                                <section id={category}>
                                    <h2 className="text-2xl font-semibold mb-8">{category}</h2>
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
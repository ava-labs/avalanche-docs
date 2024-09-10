"use client"

import Link from 'next/link';
import { Pill, Pills } from '@/components/ui/pills';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Integrations({ list }: { list: any[] }) {

    const [integrations, setIntegrations] = useState<{ [category: string]: any[] }>({});
    const [chains, setChains] = useState<{ [chain: string]: boolean }>({ "All": true });

    const [categories, setCategories] = useState<string[]>([]);

    const build = (list: any[]): [
        { [category: string]: any[] },
        { [chain: string]: boolean },
        string[]
    ] => {
        // Group integrations by categories
        let _integrations: { [category: string]: any[] } = {};
        let _chains: { [chain: string]: boolean } = { "All": true };
        list.forEach((integration) => {
            const { title, category, available, featured } = integration.data;
            if (title === 'README') {
                return;
            }
            if (!_integrations[category]) {
                _integrations[category] = [];
            }
            if (featured === true) {
                if (!_integrations["Featured"]) {
                    _integrations["Featured"] = [];
                }
                _integrations["Featured"].push(integration);
            }
            _integrations[category].push(integration);
            // Add chains and set selected to false
            if (available !== undefined) {
                available.map((chain: any) => { _chains[chain] = false; });
            }
        });
        // sort categories
        let _categories = Object.keys(_integrations);
        _categories.sort((a, b) => {
            if (a === "Featured") {
                return -1;
            } else if (b === "Featured") {
                return 1;
            } else {
                return a.localeCompare(b);
            }
        });
        return [_integrations, _chains, _categories];
    }

    useEffect(() => {
        const [_integrations, _chains, _categories] = build(list);
        // set state variables
        setIntegrations(_integrations);
        setFilteredIntegrations(_integrations);
        setChains(_chains);
        setCategories(_categories);
    }, [list]);

    const [input, setInput] = useState("");
    const onInputChange = (e: any) => {
        setInput(e.target.value);
    }

    const onSelectionChanged = (item: string, value: boolean) => {
        let _chains = Object.assign({ ...chains });
        if (item === "All" && value === true) {
            Object.keys(_chains).map(c => _chains[c] = false);
            _chains["All"] = true;
        } else if (item === "All" && value === false) {
            return;
        } else if (value === false) {
            _chains[item] = false;
            let selected_chains = Object.keys(_chains).filter(c => c !== "All" && _chains[c] === true);
            if (selected_chains.length === 0) {
                _chains["All"] = true;
            }
        } else if (value === true) {
            _chains[item] = true;
            _chains["All"] = false;
        }
        setChains(_chains);
    }

    const [filteredIntegrations, setFilteredIntegrations] = useState<{ [category: string]: any[] }>({});
    const filter = () => {
        let search_fields = ["title", "description"]; // only string fields are searchable
        let filtered: any[] = list;
        // do chain filtering
        let selected_chains = Object.keys(chains).filter(c => c !== "All" && chains[c] === true);
        if (selected_chains.length > 0) {
            filtered = filtered.filter(integration => {
                let found = false;
                if (integration.data.available === undefined || integration.data.available.length === 0) {
                    return false;
                }
                integration.data.available.forEach((chain: string) => {
                    if (chains[chain] === true) {
                        found = true;
                        return;
                    }
                });
                return found;
            });
        };
        // do input filtering
        if (input !== "" && filtered.length > 0) {
            filtered = filtered.filter(integration => {
                let found = false;
                search_fields.forEach((field: string) => {
                    let value = integration.data[field];
                    if (value === undefined) {
                        return;
                    }
                    let includes = value.toLocaleLowerCase().includes(input.toLocaleLowerCase());
                    if (includes === true) {
                        found = true;
                        return;
                    }
                });
                return found;
            });
        }
        const [ _integrations ] = build(filtered);
        setFilteredIntegrations(_integrations);
    }

    useEffect(() => {
        filter();
    }, [input, chains]);

    return (
        <div>
            <div className='w-100 flex flex-col justify-center items-center'>
                <div className="my-6 inline-flex items-center gap-2 rounded-full border bg-secondary/50 p-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground w-1/2 mb-4">
                    <div className='ms-1 text-muted-foreground '>
                        <SearchIcon size={"16"} strokeWidth={2} />
                    </div>
                    <input type="text" placeholder="Search" className="w-full bg-transparent focus:outline-none" onChange={onInputChange} />
                </div>
                <Pills items={Object.keys(chains).map(c => { return { text: c, selected: chains[c] } })} selectable={true} onSelectionChanged={onSelectionChanged}></Pills>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-12">
                <div className="w-full mb-12 md:w-1/5">
                    <div className="sticky top-0 pt-20">
                        <ul className="space-y-2">
                            {/* Render the categories on sidelist */}
                            {categories.map((category) => (
                                <li key={category} className='w-full'>
                                    <a href={`#${category}`} className={`block w-full text-md leading-6 mb-4 rounded-md ring-1 ring-slate-900/10 dark:ring-slate-500 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700 flex items-center justify-between ${(filteredIntegrations[category] === undefined || filteredIntegrations[category].length === 0) ? 'cursor-not-allowed': 'cursor-pointer'}`}>
                                        <span>{category}</span>
                                        <div className='flex text-xs'>
                                            (
                                            <span>{filteredIntegrations[category]?.length || 0}/</span>
                                            <span>{integrations[category].length}</span>
                                            )
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full md:w-4/5">
                    {/* Render the integrations for each category */}
                    {categories.map(category => (
                        filteredIntegrations[category] && // check filtered integrations have the category
                        <div key={category}>
                            <section id={category}>
                                <h2 className="text-2xl mb-8 pt-20">{category}</h2>
                            </section>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-full">
                                {filteredIntegrations[category].map((integration) => (
                                    <Link
                                        key={integration.url}
                                        href={integration.url}
                                        className="flex flex-col bg-card p-4 rounded-lg transition-shadow shadow hover:shadow-lg dark:bg-card-dark dark:border dark:border-slate-500 dark:hover:bg-slate-700 w-auto h-auto gap-4"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 mr-2 rounded-full overflow-hidden">
                                                <img
                                                    src={integration.data.logo}
                                                    alt={integration.data.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-xl">{integration.data.title}</h3>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500 flex-grow">{integration.data.description}</p>

                                        {category !== "Featured" && integration.data.featured && <Pill item={{ text: "Featured" }} />}

                                        {category === "Featured" && integration.data.featured && <Pill item={{ text: integration.data.category }} />}

                                        {integration.data.available && integration.data.available.length > 0 && <div className="flex content-center">
                                            <p className="text-sm my-auto text-gray-500 mr-3">Available For: </p>
                                            <Pills items={integration.data.available.map((c: string) => { return { text: c } })} />
                                        </div>}

                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}
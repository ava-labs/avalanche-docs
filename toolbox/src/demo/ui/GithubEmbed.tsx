import { useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import { vs, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ExternalLink } from 'lucide-react';

// Register only TypeScript language for now
SyntaxHighlighter.registerLanguage('typescript', ts);

interface GithubEmbedProps {
    filePath: string;
    user: string;
    repo: string;
    branch?: string;
    lang?: "TS" | "JS";
    maxHeight?: number;
}

export function GithubEmbed({ filePath, user, repo, branch = "main", lang = "TS", maxHeight }: GithubEmbedProps) {
    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<string>('');

    const sourceURL = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${filePath}`;

    useEffect(() => {
        fetch(sourceURL)
            .then(response => response.text())
            .then(setCode)
            .catch(err => setError(err.message));
    }, [sourceURL]);

    if (lang !== "TS") {
        return <div className="text-red-500">
            {lang} is not supported yet
        </div>
    }

    if (error) {
        return <div className="text-red-500">Failed to load code: {error}</div>
    }

    if (!code) {
        return <div>Loading...</div>
    }

    return (
        <div className="my-4 border border-gray-200 dark:border-gray-700 rounded-md w-full overflow-hidden">
            <div style={{
                maxHeight: maxHeight ? `${maxHeight}px` : undefined,
                overflow: maxHeight ? 'auto' : undefined,
            }}>
                <SyntaxHighlighter
                    language="typescript"
                    style={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? vs2015 : vs}
                    showLineNumbers={true}
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        borderRadius: '0.5rem',
                        overflow: 'auto',
                        background: 'transparent',
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 rounded-b-md">
                <a
                    href={`https://github.com/${user}/${repo}/blob/${branch}/${filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1"
                >
                    {filePath} on {branch}
                    <ExternalLink size={12} />
                </a>
            </div>
        </div>
    );
}


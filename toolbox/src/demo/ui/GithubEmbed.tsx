import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { CodeHighlighter } from './CodeHighlighter';

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

    const footer = (
        <a
            href={`https://github.com/${user}/${repo}/blob/${branch}/${filePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1"
        >
            {filePath} on {branch}
            <ExternalLink size={12} />
        </a>
    );

    return (
        <CodeHighlighter
            code={code}
            language="typescript"
            maxHeight={maxHeight}
            footer={footer}
        />
    );
}


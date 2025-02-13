import { useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import { vs, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Register only TypeScript language for now
SyntaxHighlighter.registerLanguage('typescript', ts);

interface CodeHighlighterProps {
    code: string;
    language?: "typescript" | "javascript";
    maxHeight?: number;
    footer?: React.ReactNode;
}

export function CodeHighlighter({ code, language = "typescript", maxHeight, footer }: CodeHighlighterProps) {
    const [theme, setTheme] = useState(vs);

    const getTheme = () => {
        if (typeof document === 'undefined') return vs;
        if (document.documentElement.classList.contains('dark')) return vs2015;
        if (document.documentElement.classList.contains('light')) return vs;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? vs2015 : vs;
    };

    useEffect(() => {
        if (typeof document === 'undefined') return;

        // Set initial theme
        setTheme(getTheme());

        // Watch for class changes on html element
        const observer = new MutationObserver(() => {
            setTheme(getTheme());
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Watch for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleThemeChange = () => {
            setTheme(getTheme());
        };

        mediaQuery.addEventListener('change', handleThemeChange);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, []);

    return (
        <div className="my-4 border border-gray-200 dark:border-gray-700 rounded-md w-full overflow-hidden bg-white dark:bg-black">
            <div style={{
                maxHeight: maxHeight ? `${maxHeight}px` : undefined,
                overflow: maxHeight ? 'auto' : undefined,
            }}>
                <SyntaxHighlighter
                    language={language}
                    style={theme}
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
            {footer && (
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 rounded-b-md">
                    {footer}
                </div>
            )}
        </div>
    );
} 

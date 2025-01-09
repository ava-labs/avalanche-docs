import { ReactNode } from "react";

export default function Pre({ children }: { children: ReactNode }) {
    return (
        <pre className="overflow-x-auto bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-4 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 font-mono">
            {children}
        </pre>
    )
}

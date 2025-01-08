import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    isValid?: boolean;
}

export default function TextArea({ isValid = true, ...props }: TextAreaProps) {
    return (
        <textarea
            className={`w-full p-2 border rounded-md font-mono ${isValid
                ? 'bg-green-50 border-green-200 dark:border-green-600 text-green-900 dark:text-green-200'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100'
                }`}
            {...props}
        />
    );
}

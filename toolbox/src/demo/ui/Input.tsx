import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

type BaseProps = {
    label?: string;
    type?: 'textarea' | React.InputHTMLAttributes<HTMLInputElement>['type'];
    className?: string;
}

type InputElementProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
type TextAreaElementProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export type InputProps = BaseProps & (InputElementProps | TextAreaElementProps)

export function Input({
    className,
    type,
    label,
    ...props
}: InputProps) {
    const sharedClassNames = "flex w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"

    return (
        <div className="w-full">
            {label && (
                <label className="text-sm font-medium leading-none mb-2 block">
                    {label}
                </label>
            )}
            {type === 'textarea' ? (
                <textarea
                    className={twMerge(clsx(
                        sharedClassNames,
                        "min-h-[80px] resize-vertical",
                        className
                    ))}
                    {...props as TextAreaElementProps}
                />
            ) : (
                <input
                    type={type}
                    className={twMerge(clsx(
                        sharedClassNames,
                        "h-9 file:border-0 file:bg-transparent file:text-sm file:font-medium",
                        className
                    ))}
                    {...props as InputElementProps}
                />
            )}
        </div>
    )
}

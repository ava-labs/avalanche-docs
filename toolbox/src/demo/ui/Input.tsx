import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export type InputProps = {
    label?: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
    className?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    value?: string;
    placeholder?: string;
    error?: string | null;
    notes?: string | null;
    button?: React.ReactNode;
    step?: number;
}
export type TextareaProps = InputProps & {
    rows?: number;
    type?: 'textarea';
}


export function Input(props: InputProps | TextareaProps) {
    const { label, type, className, onChange, disabled, value, placeholder, error, notes, button, step } = props;

    React.useEffect(() => {
        if (step !== undefined && type !== 'number') {
            throw new Error('Step property can only be used with inputs of type "number"');
        }
    }, [step, type]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const sharedClassNames = clsx(
        "flex w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm",
        "transition-colors placeholder:text-muted-foreground focus-visible:outline-none",
        "focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        button && "rounded-r-none border-r-0"
    )

    return (
        <div className="w-full">
            {label && (
                <label className="text-sm font-medium leading-none mb-2 block">
                    {label}
                </label>
            )}
            <div className="flex">
                {type === 'textarea' ? (
                    <textarea
                        className={twMerge(clsx(
                            sharedClassNames,
                            "min-h-[80px] resize-vertical",
                            className
                        ))}
                        onChange={handleChange}
                        disabled={disabled}
                        value={value}
                        placeholder={placeholder}
                        rows={type === 'textarea' ? (props as TextareaProps).rows : undefined}
                    />
                ) : (
                    <input
                        type={type}
                        className={twMerge(clsx(
                            sharedClassNames,
                            "h-9 file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            className
                        ))}
                        onChange={handleChange}
                        disabled={disabled}
                        value={value}
                        placeholder={placeholder}
                        step={type === 'number' ? step : undefined}
                    />
                )}
                {button && (
                    <div className="flex-none">
                        {button}
                    </div>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
            {notes && (
                <p className=" text-xs mt-1">{notes}</p>
            )}
        </div>
    )
}

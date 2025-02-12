import { ChevronDown } from 'lucide-react';

interface SelectProps {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    options: { value: string | number; label: string }[];
    notesUnderInput?: string;
    disabled?: boolean;
}

export const Select = ({
    label,
    value,
    onChange,
    options,
    notesUnderInput,
    disabled,
}: SelectProps) => {
    const selectClasses =
        "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed";

    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className={`${selectClasses} appearance-none pr-10`}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
            {notesUnderInput && (
                <p className="mt-1.5 text-xs text-gray-500">{notesUnderInput}</p>
            )}
        </div>
    );
};

export const Input = ({
    label,
    value,
    onChange,
    placeholder,
    notesUnderInput,
    type = "text",
    rows,
    disabled,
}: {
    label: string,
    value: string,
    onChange?: (value: string) => void,
    placeholder?: string,
    notesUnderInput?: string,
    type?: string,
    rows?: number,
    disabled?: boolean,
}) => {
    const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed";

    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    rows={rows || 4}
                    disabled={disabled}
                    className={`${inputClasses} font-mono`}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${inputClasses} ${type === "text" ? "font-mono" : ""}`}
                />
            )}
            {notesUnderInput && (
                <p className="mt-1.5 text-xs text-gray-500">{notesUnderInput}</p>
            )}
        </div>
    );
};

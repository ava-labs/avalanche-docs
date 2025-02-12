import { Input } from "./Input";
import { Button } from "./Button";
import { X } from "lucide-react";

export const InputArray = ({
    label,
    values,
    onChange,
    placeholder,
    notesUnderInput,
    type = "text",
    rows,
    disabled,
}: {
    label: string,
    values: string[],
    onChange: (values: string[]) => void,
    placeholder?: string,
    notesUnderInput?: string,
    type?: string,
    rows?: number,
    disabled?: boolean,
}) => {
    const handleAdd = () => {
        onChange([...values, ""]);
    };

    const handleRemove = (index: number) => {
        onChange(values.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, value: string) => {
        const newValues = [...values];
        newValues[index] = value;
        onChange(newValues);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            {values.map((value, index) => (
                <div key={index} className="flex gap-2">
                    <div className="flex-grow relative">
                        <Input
                            label={`Entry ${index + 1}`}
                            value={value}
                            onChange={(newValue) => handleChange(index, newValue)}
                            placeholder={placeholder}
                            notesUnderInput={index === 0 ? notesUnderInput : undefined}
                            type={type}
                            rows={rows}
                            disabled={disabled}
                        />
                        <button
                            onClick={() => handleRemove(index)}
                            disabled={disabled}
                            className="absolute top-9 right-2 p-1 text-gray-400 hover:text-gray-600 disabled:text-gray-300"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            ))}
            {values.length === 0 && (
                <p className="text-sm text-gray-500 italic">No entries yet. Click "Add Entry" to begin.</p>
            )}
            <Button
                onClick={handleAdd}
                disabled={disabled}
                type="default"
                className="w-full mt-2"
            >
                Add Entry
            </Button>
        </div>
    );
};

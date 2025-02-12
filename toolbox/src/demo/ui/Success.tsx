import { Check } from "lucide-react";

interface SuccessProps {
    label: string;
    value: string;
}

export const Success = ({ label, value }: SuccessProps) => {
    if (!value) return null;

    return (
        <div className="p-4 bg-gray-100 rounded-lg space-y-2">
            <div className="flex items-center space-x-2">
                <p className="text-gray-700 font-semibold">{label}:</p>
                <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
                <p className="font-mono text-sm break-all">{value}</p>
            </div>
        </div>
    );
};

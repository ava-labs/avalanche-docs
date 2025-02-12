import { LoaderCircle } from 'lucide-react';

export const Button = ({
    children,
    onClick,
    disabled,
    className = '',
    type = 'default',
    icon,
    loading = false
}: {
    children: React.ReactNode,
    onClick?: () => void,
    disabled?: boolean,
    className?: string,
    type?: 'default' | 'primary' | 'secondary' | 'danger',
    icon?: React.ReactNode,
    loading?: boolean
}) => {
    const buttonStyles = {
        default: 'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 shadow-sm cursor-pointer   ',
        primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer',
        secondary: 'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 shadow-sm cursor-pointer',
        danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm cursor-pointer'
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`py-2 px-4 text-sm font-medium rounded-md transition-all flex items-center justify-center space-x-2 ${disabled || loading ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed' : buttonStyles[type]
                } ${className}`}
        >
            {icon}
            <span>{children}</span>
            {loading && (
                <LoaderCircle className="h-4 w-4 animate-spin" />
            )}
        </button>
    );
};

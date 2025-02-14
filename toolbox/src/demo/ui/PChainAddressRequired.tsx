export default function PChainAddressRequired() {
    return (
        <div className="flex items-center bg-amber-50 border border-amber-300 rounded-md p-3 text-amber-800">
            <span className="mr-2">⚠️</span>
            Please get your P-Chain address first using
            <a href="#getPChainAddress" className="text-amber-800 hover:text-amber-900 underline ml-1">
                the Get P-Chain Address tool
            </a>.
        </div>
    );
}

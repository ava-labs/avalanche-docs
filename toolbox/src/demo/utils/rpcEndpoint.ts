import { networkIDs } from "@avalabs/avalanchejs";
import { avalanche, avalancheFuji } from "viem/chains";

//TODO: probably we should get rid of this
export const getRPCEndpoint = (networkID: number) => {
    if (networkID === networkIDs.FujiID) {
        return avalancheFuji.rpcUrls.default.http[0].split("/").slice(0, 3).join("/");
    } else if (networkID === networkIDs.MainnetID) {
        return avalanche.rpcUrls.default.http[0].split("/").slice(0, 3).join("/");
    } else {
        throw new Error("Invalid network ID");
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const header_1 = require("./header");
/**
 * Creates a new block header object from Ethereum JSON RPC.
 *
 * @param blockParams - Ethereum JSON RPC of block (eth_getBlockByNumber)
 * @param chainOptions - An object describing the blockchain
 */
function blockHeaderFromRpc(blockParams, options) {
    const { parentHash, sha3Uncles, miner, stateRoot, transactionsRoot, receiptRoot, receiptsRoot, logsBloom, difficulty, number, gasLimit, gasUsed, timestamp, extraData, mixHash, nonce, } = blockParams;
    const blockHeader = header_1.BlockHeader.fromHeaderData({
        parentHash,
        uncleHash: sha3Uncles,
        coinbase: miner,
        stateRoot,
        transactionsTrie: transactionsRoot,
        receiptTrie: receiptRoot || receiptsRoot,
        bloom: logsBloom,
        difficulty,
        number,
        gasLimit,
        gasUsed,
        timestamp,
        extraData,
        mixHash,
        nonce,
    }, options);
    return blockHeader;
}
exports.default = blockHeaderFromRpc;
//# sourceMappingURL=header-from-rpc.js.map
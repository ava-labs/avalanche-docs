"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSstoreGasEIP2200 = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const exceptions_1 = require("../../exceptions");
const EIP2929_1 = require("./EIP2929");
const util_1 = require("./util");
/**
 * Adjusts gas usage and refunds of SStore ops per EIP-2200 (Istanbul)
 *
 * @param {RunState} runState
 * @param {any}      found
 * @param {Buffer}   value
 */
function updateSstoreGasEIP2200(runState, found, value, key) {
    const { original, current } = found;
    // Fail if not enough gas is left
    if (runState.eei.getGasLeft().lten(runState._common.param('gasPrices', 'sstoreSentryGasEIP2200'))) {
        util_1.trap(exceptions_1.ERROR.OUT_OF_GAS);
    }
    // Noop
    if (current.equals(value)) {
        const sstoreNoopCost = runState._common.param('gasPrices', 'sstoreNoopGasEIP2200');
        return runState.eei.useGas(new ethereumjs_util_1.BN(EIP2929_1.adjustSstoreGasEIP2929(runState, key, sstoreNoopCost, 'noop')));
    }
    if (original.equals(current)) {
        // Create slot
        if (original.length === 0) {
            return runState.eei.useGas(new ethereumjs_util_1.BN(runState._common.param('gasPrices', 'sstoreInitGasEIP2200')));
        }
        // Delete slot
        if (value.length === 0) {
            runState.eei.refundGas(new ethereumjs_util_1.BN(runState._common.param('gasPrices', 'sstoreClearRefundEIP2200')));
        }
        // Write existing slot
        return runState.eei.useGas(new ethereumjs_util_1.BN(runState._common.param('gasPrices', 'sstoreCleanGasEIP2200')));
    }
    if (original.length > 0) {
        if (current.length === 0) {
            // Recreate slot
            runState.eei.subRefund(new ethereumjs_util_1.BN(runState._common.param('gasPrices', 'sstoreClearRefundEIP2200')));
        }
        else if (value.length === 0) {
            // Delete slot
            runState.eei.refundGas(new ethereumjs_util_1.BN(runState._common.param('gasPrices', 'sstoreClearRefundEIP2200')));
        }
    }
    if (original.equals(value)) {
        if (original.length === 0) {
            // Reset to original non-existent slot
            const sstoreInitRefund = runState._common.param('gasPrices', 'sstoreInitRefundEIP2200');
            runState.eei.refundGas(new ethereumjs_util_1.BN(EIP2929_1.adjustSstoreGasEIP2929(runState, key, sstoreInitRefund, 'initRefund')));
        }
        else {
            // Reset to original existing slot
            const sstoreCleanRefund = runState._common.param('gasPrices', 'sstoreCleanRefundEIP2200');
            runState.eei.refundGas(new ethereumjs_util_1.BN(EIP2929_1.adjustSstoreGasEIP2929(runState, key, sstoreCleanRefund, 'cleanRefund')));
        }
    }
    // Dirty update
    return runState.eei.useGas(new ethereumjs_util_1.BN(runState._common.param('gasPrices', 'sstoreDirtyGasEIP2200')));
}
exports.updateSstoreGasEIP2200 = updateSstoreGasEIP2200;
//# sourceMappingURL=EIP2200.js.map
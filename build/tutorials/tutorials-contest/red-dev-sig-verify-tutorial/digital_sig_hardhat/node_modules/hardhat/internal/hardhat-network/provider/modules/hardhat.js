"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardhatModule = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const t = __importStar(require("io-ts"));
const base_types_1 = require("../../../core/jsonrpc/types/base-types");
const hardhat_network_1 = require("../../../core/jsonrpc/types/input/hardhat-network");
const solc_1 = require("../../../core/jsonrpc/types/input/solc");
const validation_1 = require("../../../core/jsonrpc/types/input/validation");
const errors_1 = require("../../../core/providers/errors");
// tslint:disable only-hardhat-error
class HardhatModule {
    constructor(_node, _resetCallback, _setLoggingEnabledCallback, _logger, _experimentalHardhatNetworkMessageTraceHooks = []) {
        this._node = _node;
        this._resetCallback = _resetCallback;
        this._setLoggingEnabledCallback = _setLoggingEnabledCallback;
        this._logger = _logger;
        this._experimentalHardhatNetworkMessageTraceHooks = _experimentalHardhatNetworkMessageTraceHooks;
    }
    async processRequest(method, params = []) {
        switch (method) {
            case "hardhat_getStackTraceFailuresCount":
                return this._getStackTraceFailuresCountAction(...this._getStackTraceFailuresCountParams(params));
            case "hardhat_addCompilationResult":
                return this._addCompilationResultAction(...this._addCompilationResultParams(params));
            case "hardhat_impersonateAccount":
                return this._impersonateAction(...this._impersonateParams(params));
            case "hardhat_intervalMine":
                return this._intervalMineAction(...this._intervalMineParams(params));
            case "hardhat_stopImpersonatingAccount":
                return this._stopImpersonatingAction(...this._stopImpersonatingParams(params));
            case "hardhat_reset":
                return this._resetAction(...this._resetParams(params));
            case "hardhat_setLoggingEnabled":
                return this._setLoggingEnabledAction(...this._setLoggingEnabledParams(params));
        }
        throw new errors_1.MethodNotFoundError(`Method ${method} not found`);
    }
    // hardhat_getStackTraceFailuresCount
    _getStackTraceFailuresCountParams(params) {
        return validation_1.validateParams(params);
    }
    async _getStackTraceFailuresCountAction() {
        return this._node.getStackTraceFailuresCount();
    }
    // hardhat_addCompilationResult
    _addCompilationResultParams(params) {
        return validation_1.validateParams(params, t.string, solc_1.rpcCompilerInput, solc_1.rpcCompilerOutput);
    }
    async _addCompilationResultAction(solcVersion, compilerInput, compilerOutput) {
        return this._node.addCompilationResult(solcVersion, compilerInput, compilerOutput);
    }
    // hardhat_impersonateAccount
    _impersonateParams(params) {
        return validation_1.validateParams(params, base_types_1.rpcAddress);
    }
    _impersonateAction(address) {
        return this._node.addImpersonatedAccount(address);
    }
    // hardhat_intervalMine
    _intervalMineParams(params) {
        return [];
    }
    async _intervalMineAction() {
        const result = await this._node.mineBlock();
        const blockNumber = result.block.header.number.toNumber();
        const isEmpty = result.block.transactions.length === 0;
        if (isEmpty) {
            this._logger.printMinedBlockNumber(blockNumber, isEmpty);
        }
        else {
            await this._logBlock(result);
            this._logger.printMinedBlockNumber(blockNumber, isEmpty);
            const printedSomething = this._logger.printLogs();
            if (printedSomething) {
                this._logger.printEmptyLine();
            }
        }
        return true;
    }
    // hardhat_stopImpersonatingAccount
    _stopImpersonatingParams(params) {
        return validation_1.validateParams(params, base_types_1.rpcAddress);
    }
    _stopImpersonatingAction(address) {
        return this._node.removeImpersonatedAccount(address);
    }
    // hardhat_reset
    _resetParams(params) {
        return validation_1.validateParams(params, hardhat_network_1.optionalRpcHardhatNetworkConfig);
    }
    async _resetAction(networkConfig) {
        await this._resetCallback(networkConfig === null || networkConfig === void 0 ? void 0 : networkConfig.forking);
        return true;
    }
    // hardhat_setLoggingEnabled
    _setLoggingEnabledParams(params) {
        return validation_1.validateParams(params, t.boolean);
    }
    async _setLoggingEnabledAction(loggingEnabled) {
        this._setLoggingEnabledCallback(loggingEnabled);
        return true;
    }
    async _logBlock(result) {
        const { block, traces } = result;
        const codes = [];
        for (const txTrace of traces) {
            const code = await this._node.getCodeFromTrace(txTrace.trace, new ethereumjs_util_1.BN(block.header.number));
            codes.push(code);
        }
        this._logger.logIntervalMinedBlock(result, codes);
        for (const txTrace of traces) {
            await this._runHardhatNetworkMessageTraceHooks(txTrace.trace, false);
        }
    }
    async _runHardhatNetworkMessageTraceHooks(trace, isCall) {
        if (trace === undefined) {
            return;
        }
        for (const hook of this._experimentalHardhatNetworkMessageTraceHooks) {
            await hook(trace, isCall);
        }
    }
}
exports.HardhatModule = HardhatModule;
//# sourceMappingURL=hardhat.js.map
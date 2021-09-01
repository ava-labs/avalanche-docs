/// <reference types="node" />
import { RunState } from './../interpreter';
/**
 * Adjusts gas usage and refunds of SStore ops per EIP-1283 (Constantinople)
 *
 * @param {RunState} runState
 * @param {any}      found
 * @param {Buffer}   value
 */
export declare function updateSstoreGasEIP1283(runState: RunState, found: any, value: Buffer): void;

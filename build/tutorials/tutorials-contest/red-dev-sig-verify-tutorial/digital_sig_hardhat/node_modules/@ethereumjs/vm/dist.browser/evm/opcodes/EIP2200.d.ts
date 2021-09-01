/// <reference types="node" />
import { RunState } from './../interpreter';
/**
 * Adjusts gas usage and refunds of SStore ops per EIP-2200 (Istanbul)
 *
 * @param {RunState} runState
 * @param {any}      found
 * @param {Buffer}   value
 */
export declare function updateSstoreGasEIP2200(runState: RunState, found: any, value: Buffer, key: Buffer): void;

/// <reference types="bn.js" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import { BN, BNLike } from 'ethereumjs-util';
import { Chain } from './types';
/**
 * Options for instantiating a [[Common]] instance.
 */
export interface CommonOpts {
    /**
     * Chain name ('mainnet') or id (1), either from a chain directly supported
     * or a custom chain passed in via `customChains`
     */
    chain: string | number | BN | object;
    /**
     * String identifier ('byzantium') for hardfork
     *
     * Default: `istanbul`
     */
    hardfork?: string;
    /**
     * Limit parameter returns to the given hardforks
     */
    supportedHardforks?: Array<string>;
    /**
     * Selected EIPs which can be activated, please use an array for instantiation
     * (e.g. `eips: [ 2537, ]`)
     *
     * Currently supported:
     *
     * - [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) - BLS12-381 precompiles
     */
    eips?: number[];
    /**
     * Initialize (in addition to the supported chains) with the selected
     * custom chains
     *
     * Usage (directly with the respective chain intialization via the `chain` option):
     *
     * ```javascript
     * import myCustomChain1 from '[PATH_TO_MY_CHAINS]/myCustomChain1.json'
     * const common = new Common({ chain: 'myCustomChain1', customChains: [ myCustomChain1 ]})
     * ```
     */
    customChains?: Chain[];
}
interface hardforkOptions {
    /** optional, only allow supported HFs (default: false) */
    onlySupported?: boolean;
    /** optional, only active HFs (default: false) */
    onlyActive?: boolean;
}
/**
 * Common class to access chain and hardfork parameters
 */
export default class Common extends EventEmitter {
    readonly DEFAULT_HARDFORK: string;
    private _chainParams;
    private _hardfork;
    private _supportedHardforks;
    private _eips;
    private _customChains;
    /**
     * Creates a Common object for a custom chain, based on a standard one. It uses all the [[Chain]]
     * params from [[baseChain]] except the ones overridden in [[customChainParams]].
     *
     * @param baseChain The name (`mainnet`) or id (`1`) of a standard chain used to base the custom
     * chain params on.
     * @param customChainParams The custom parameters of the chain.
     * @param hardfork String identifier ('byzantium') for hardfork (optional)
     * @param supportedHardforks Limit parameter returns to the given hardforks (optional)
     */
    static forCustomChain(baseChain: string | number, customChainParams: Partial<Chain>, hardfork?: string, supportedHardforks?: Array<string>): Common;
    private static _getChainParams;
    /**
     * @constructor
     */
    constructor(opts: CommonOpts);
    /**
     * Sets the chain
     * @param chain String ('mainnet') or Number (1) chain
     *     representation. Or, a Dictionary of chain parameters for a private network.
     * @returns The dictionary with parameters set as chain
     */
    setChain(chain: string | number | BN | object): any;
    /**
     * Sets the hardfork to get params for
     * @param hardfork String identifier (e.g. 'byzantium')
     */
    setHardfork(hardfork: string): void;
    /**
     * Returns the hardfork based on the block number provided
     * @param blockNumber
     * @returns The name of the HF
     */
    getHardforkByBlockNumber(blockNumber: BNLike): string;
    /**
     * Sets a new hardfork based on the block number provided
     * @param blockNumber
     * @returns The name of the HF set
     */
    setHardforkByBlockNumber(blockNumber: BNLike): string;
    /**
     * Internal helper function to choose between hardfork set and hardfork provided as param
     * @param hardfork Hardfork given to function as a parameter
     * @returns Hardfork chosen to be used
     */
    _chooseHardfork(hardfork?: string | null, onlySupported?: boolean): string;
    /**
     * Internal helper function, returns the params for the given hardfork for the chain set
     * @param hardfork Hardfork name
     * @returns Dictionary with hardfork params
     */
    _getHardfork(hardfork: string): any;
    /**
     * Internal helper function to check if a hardfork is set to be supported by the library
     * @param hardfork Hardfork name
     * @returns True if hardfork is supported
     */
    _isSupportedHardfork(hardfork: string | null): boolean;
    /**
     * Sets the active EIPs
     * @param eips
     */
    setEIPs(eips?: number[]): void;
    /**
     * Returns a parameter for the current chain setup
     *
     * If the parameter is present in an EIP, the EIP always takes precendence.
     * Otherwise the parameter if taken from the latest applied HF with
     * a change on the respective parameter.
     *
     * @param topic Parameter topic ('gasConfig', 'gasPrices', 'vm', 'pow')
     * @param name Parameter name (e.g. 'minGasLimit' for 'gasConfig' topic)
     * @returns The value requested or `null` if not found
     */
    param(topic: string, name: string): any;
    /**
     * Returns the parameter corresponding to a hardfork
     * @param topic Parameter topic ('gasConfig', 'gasPrices', 'vm', 'pow')
     * @param name Parameter name (e.g. 'minGasLimit' for 'gasConfig' topic)
     * @param hardfork Hardfork name
     * @returns The value requested or `null` if not found
     */
    paramByHardfork(topic: string, name: string, hardfork: string): any;
    /**
     * Returns a parameter corresponding to an EIP
     * @param topic Parameter topic ('gasConfig', 'gasPrices', 'vm', 'pow')
     * @param name Parameter name (e.g. 'minGasLimit' for 'gasConfig' topic)
     * @param eip Number of the EIP
     * @returns The value requested or `null` if not found
     */
    paramByEIP(topic: string, name: string, eip: number): any;
    /**
     * Returns a parameter for the hardfork active on block number
     * @param topic Parameter topic
     * @param name Parameter name
     * @param blockNumber Block number
     */
    paramByBlock(topic: string, name: string, blockNumber: BNLike): any;
    /**
     * Checks if an EIP is activated by either being included in the EIPs
     * manually passed in with the `eips` constructor option or in a
     * hardfork currently being active
     *
     * Note: this method only works for EIPs being supported
     * by the `eips` constructor option
     * @param eip
     */
    isActivatedEIP(eip: number): boolean;
    /**
     * Checks if set or provided hardfork is active on block number
     * @param hardfork Hardfork name or null (for HF set)
     * @param blockNumber
     * @param opts Hardfork options (onlyActive unused)
     * @returns True if HF is active on block number
     */
    hardforkIsActiveOnBlock(hardfork: string | null, blockNumber: BNLike, opts?: hardforkOptions): boolean;
    /**
     * Alias to hardforkIsActiveOnBlock when hardfork is set
     * @param blockNumber
     * @param opts Hardfork options (onlyActive unused)
     * @returns True if HF is active on block number
     */
    activeOnBlock(blockNumber: BNLike, opts?: hardforkOptions): boolean;
    /**
     * Sequence based check if given or set HF1 is greater than or equal HF2
     * @param hardfork1 Hardfork name or null (if set)
     * @param hardfork2 Hardfork name
     * @param opts Hardfork options
     * @returns True if HF1 gte HF2
     */
    hardforkGteHardfork(hardfork1: string | null, hardfork2: string, opts?: hardforkOptions): boolean;
    /**
     * Alias to hardforkGteHardfork when hardfork is set
     * @param hardfork Hardfork name
     * @param opts Hardfork options
     * @returns True if hardfork set is greater than hardfork provided
     */
    gteHardfork(hardfork: string, opts?: hardforkOptions): boolean;
    /**
     * Checks if given or set hardfork is active on the chain
     * @param hardfork Hardfork name, optional if HF set
     * @param opts Hardfork options (onlyActive unused)
     * @returns True if hardfork is active on the chain
     */
    hardforkIsActiveOnChain(hardfork?: string | null, opts?: hardforkOptions): boolean;
    /**
     * Returns the active hardfork switches for the current chain
     * @param blockNumber up to block if provided, otherwise for the whole chain
     * @param opts Hardfork options (onlyActive unused)
     * @return Array with hardfork arrays
     */
    activeHardforks(blockNumber?: BNLike | null, opts?: hardforkOptions): Array<any>;
    /**
     * Returns the latest active hardfork name for chain or block or throws if unavailable
     * @param blockNumber up to block if provided, otherwise for the whole chain
     * @param opts Hardfork options (onlyActive unused)
     * @return Hardfork name
     */
    activeHardfork(blockNumber?: BNLike | null, opts?: hardforkOptions): string;
    /**
     * Returns the hardfork change block for hardfork provided or set
     * @param hardfork Hardfork name, optional if HF set
     * @returns Block number
     * @deprecated Please use hardforkBlockBN() for large number support
     */
    hardforkBlock(hardfork?: string): number;
    /**
     * Returns the hardfork change block for hardfork provided or set
     * @param hardfork Hardfork name, optional if HF set
     * @returns Block number
     */
    hardforkBlockBN(hardfork?: string): BN;
    /**
     * True if block number provided is the hardfork (given or set) change block
     * @param blockNumber Number of the block to check
     * @param hardfork Hardfork name, optional if HF set
     * @returns True if blockNumber is HF block
     */
    isHardforkBlock(blockNumber: BNLike, hardfork?: string): boolean;
    /**
     * Returns the change block for the next hardfork after the hardfork provided or set
     * @param hardfork Hardfork name, optional if HF set
     * @returns Block number or null if not available
     * @deprecated Please use nextHardforkBlockBN() for large number support
     */
    nextHardforkBlock(hardfork?: string): number | null;
    /**
     * Returns the change block for the next hardfork after the hardfork provided or set
     * @param hardfork Hardfork name, optional if HF set
     * @returns Block number or null if not available
     */
    nextHardforkBlockBN(hardfork?: string): BN | null;
    /**
     * True if block number provided is the hardfork change block following the hardfork given or set
     * @param blockNumber Number of the block to check
     * @param hardfork Hardfork name, optional if HF set
     * @returns True if blockNumber is HF block
     */
    isNextHardforkBlock(blockNumber: BNLike, hardfork?: string): boolean;
    /**
     * Internal helper function to calculate a fork hash
     * @param hardfork Hardfork name
     * @returns Fork hash as hex string
     */
    _calcForkHash(hardfork: string): string;
    /**
     * Returns an eth/64 compliant fork hash (EIP-2124)
     * @param hardfork Hardfork name, optional if HF set
     */
    forkHash(hardfork?: string): any;
    /**
     *
     * @param forkHash Fork hash as a hex string
     * @returns Array with hardfork data (name, block, forkHash)
     */
    hardforkForForkHash(forkHash: string): any | null;
    /**
     * Returns the Genesis parameters of current chain
     * @returns Genesis dictionary
     */
    genesis(): any;
    /**
     * Returns the hardforks for current chain
     * @returns {Array} Array with arrays of hardforks
     */
    hardforks(): any;
    /**
     * Returns bootstrap nodes for the current chain
     * @returns {Dictionary} Dict with bootstrap nodes
     */
    bootstrapNodes(): any;
    /**
     * Returns DNS networks for the current chain
     * @returns {String[]} Array of DNS ENR urls
     */
    dnsNetworks(): any;
    /**
     * Returns the hardfork set
     * @returns Hardfork name
     */
    hardfork(): string;
    /**
     * Returns the Id of current chain
     * @returns chain Id
     * @deprecated Please use chainIdBN() for large number support
     */
    chainId(): number;
    /**
     * Returns the Id of current chain
     * @returns chain Id
     */
    chainIdBN(): BN;
    /**
     * Returns the name of current chain
     * @returns chain name (lower case)
     */
    chainName(): string;
    /**
     * Returns the Id of current network
     * @returns network Id
     * @deprecated Please use networkIdBN() for large number support
     */
    networkId(): number;
    /**
     * Returns the Id of current network
     * @returns network Id
     */
    networkIdBN(): BN;
    /**
     * Returns the active EIPs
     * @returns List of EIPs
     */
    eips(): number[];
    /**
     * Returns the consensus type of the network
     * Possible values: "pow"|"poa"
     */
    consensusType(): string;
    /**
     * Returns the concrete consensus implementation
     * algorithm or protocol for the network
     * e.g. "ethash" for "pow" consensus type or
     * "clique" for "poa" consensus type
     */
    consensusAlgorithm(): string;
    /**
     * Returns a dictionary with consensus configuration
     * parameters based on the consensus algorithm
     *
     * Expected returns (parameters must be present in
     * the respective chain json files):
     *
     * ethash: -
     * clique: period, epoch
     * aura: -
     */
    consensusConfig(): any;
    /**
     * Returns a deep copy of this common instance.
     */
    copy(): Common;
}
export {};

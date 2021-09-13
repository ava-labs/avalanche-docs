// This script will be used to do the cross-chain transfer of the owner wallet from C to P chain and stake them
// to the user-chosen node.

import * as fs from "fs"
import {Avalanche, BinTools, BN, Buffer} from "avalanche"
import Web3 from "web3"
import {Contract} from "web3-eth-contract"
import {AbiItem} from "web3-utils"
import {
    AVMAPI,
    KeyChain as AVMKeyChain,
    UnsignedTx as AVMUnsignedTx,
    UTXOSet as AVMUTXOSet,
    Tx as AVMTx
} from "avalanche/dist/apis/avm"
import {EVMAPI, KeyChain as EVMKeyChain, UnsignedTx as EVMUnsignedTx, Tx as EVMTx} from "avalanche/dist/apis/evm"
import {
    KeyChain as PlatformVMKeyChain,
    PlatformVMAPI,
    UTXOSet as PlatformVPUTXOSet,
    UnsignedTx as PlatformVMUnsignedTx,
    Tx as PlatformVMTx
} from "avalanche/dist/apis/platformvm"
import {SignedTransaction} from "web3-core"
import {TransactionConfig} from "web3-eth"

let xChain: AVMAPI, xKeyChain: AVMKeyChain, xChainAddress: string[], xChainFees: BN, xChainBlockchainID: string
let cChain: EVMAPI, cKeyChain: EVMKeyChain, cChainAddress: string[], cChainFees: BN, cChainBlockchainID: string, cAvaxAssetId: string
let pChain: PlatformVMAPI, pKeyChain: PlatformVMKeyChain, pChainAddress: string[], pChainFees: BN, pChainBlockchainID: string

let avalancheInstance: Avalanche

let contractAbi: AbiItem

let web3: any

const masterAddress: string = "0x7bD7A7D2Ba70db40740780828b236F9246BB7F78"
const contractAddress: string = "0x5bD27eF83d57915FC3eE7feB2FebEB9c69d52B04"
let privateKey: string

const TEN_POWER_EIGHTEEN: BN = new BN(new BN(10).pow(new BN(18)))
const TEN_POWER_NINE: BN = new BN(new BN(10).pow(new BN(9)))

type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void;
type PromiseReject = (error?: any) => void;

const waitForStaked = async (): Promise<any> => {
    const stakingContract: Contract = new web3.eth.Contract(contractAbi, contractAddress)
    const stakedEvent: any = stakingContract.events.Staked()
    await web3.eth.subscribe('logs', {
      address: stakedEvent.arguments[0].address,
      topics: stakedEvent.arguments[0].topics,
    }, async (error, logs) : Promise<any> => {
        if (!error) {
            const dataHex: string = logs.data.substring(2)
            const id: number = parseInt(dataHex.substring(0, 64), 16)
            const amountWithDecimals: BN = new BN("0x" + dataHex.substring(64))
            web3.eth.defaultAccount = masterAddress
            const data: string = stakingContract.methods.withdraw(id).encodeABI()
            const nonce: number = await web3.eth.getTransactionCount(masterAddress, "pending")
            const tx: TransactionConfig = {
              from: masterAddress,
              to: contractAddress,
              data: data,
              gasPrice: 225*10**9,
              gas: 2100000,
              nonce: nonce
            }
            const stx: SignedTransaction = await web3.eth.accounts.signTransaction(tx, privateKey)
            await web3.eth.sendSignedTransaction(stx.rawTransaction)
            await CtoP(id, amountWithDecimals)
        } else {
            throw error
        }
    })
}

const CtoP = async (id: number, amountWithDecimals: BN): Promise<any> => { //a C --> P cross-chain transfer doesn't exists, but C --> X, X --> P does.
    const amountWithoutDecimals: BN = amountWithDecimals.div(TEN_POWER_EIGHTEEN)
    let amountInNavax: BN = amountWithoutDecimals.mul(TEN_POWER_NINE)

    const cChainHexAddress: string = masterAddress
    
    const nonce: number = await web3.eth.getTransactionCount(cChainHexAddress, "pending")
    
    const unsignedCtoXTx: EVMUnsignedTx = await cChain.buildExportTx(
        amountInNavax,
        cAvaxAssetId,
        xChainBlockchainID,
        cChainHexAddress,
        cChainAddress[0],
        xChainAddress,
        nonce,
    )
    
    const signedCtoXTx: EVMTx = unsignedCtoXTx.sign(cKeyChain)
    
    const exportCtoXTxId: string = await cChain.issueTx(signedCtoXTx)
    
    amountInNavax = amountInNavax.sub(cChainFees)
    
    return new Promise((resolve: PromiseResolve<string>, reject: PromiseReject): void => {
        pollTransaction(waitForStatusC, exportCtoXTxId, resolve, reject)
    }).then(async (resolve: string): Promise<any> => {
        if (resolve === "Accepted") {
            const xUtxoset1: AVMUTXOSet = (await xChain.getUTXOs(
                xChainAddress,
                cChainBlockchainID,
            )).utxos

            const unsignedImportXTx: AVMUnsignedTx = await xChain.buildImportTx(
                xUtxoset1,
                xChainAddress,
                cChainBlockchainID,
                xChainAddress,
                xChainAddress,
            )

            const signedImportXTx: AVMTx = await unsignedImportXTx.sign(xKeyChain)

            const importXTxId: string = await xChain.issueTx(signedImportXTx)

            amountInNavax = amountInNavax.sub(xChainFees)

            // C --> X done, now let's start X --> P.

            const xUtxoset2: AVMUTXOSet = (await xChain.getUTXOs(
                xChainAddress
            )).utxos

            const unsignedXtoPTx: AVMUnsignedTx = await xChain.buildExportTx(
                xUtxoset2,
                amountInNavax,
                pChainBlockchainID,
                pChainAddress,
                xChainAddress,
            )

            const signedXtoPTx: AVMTx = unsignedXtoPTx.sign(xKeyChain)

            const exportXtoPTxId: string = await xChain.issueTx(signedXtoPTx)

            amountInNavax = amountInNavax.sub(xChainFees)

            return new Promise((resolve: PromiseResolve<string>, reject: PromiseReject): void => {
                pollTransaction(waitForStatusX, exportXtoPTxId, resolve, reject)
            }).then(async (resolve: string): Promise<any> => {
                if (resolve === "Accepted") { // ... And import the transaction on the P chain.
                    const pUtxoset: PlatformVPUTXOSet = (await pChain.getUTXOs(
                        pChainAddress,
                        pChainBlockchainID
                    )).utxos

                    const unsignedImportPTx: PlatformVMUnsignedTx = await pChain.buildImportTx(
                        pUtxoset,
                        pChainAddress,
                        xChainBlockchainID,
                        pChainAddress,
                        pChainAddress,
                    )

                    const signedImportPTx: PlatformVMTx = unsignedImportPTx.sign(pKeyChain)

                    const importPTxId: string = await pChain.issueTx(signedImportPTx)

                    amountInNavax = amountInNavax.sub(pChainFees)
                } else {
                    throw `Looks like the X --> P transaction with ${exportXtoPTxId} id has not been accepted!`
                }
            })
        } else {
            throw `Looks like the C --> X transaction with ${exportCtoXTxId} id has not been accepted!`
        }
    })
}

const binTools: BinTools = BinTools.getInstance()

const importKeys = async () => {
    const bufferedPrivateKey: Buffer = Buffer.from(privateKey, 'hex')
    const CB58Encoded: string = `PrivateKey-${binTools.cb58Encode(bufferedPrivateKey)}`
    xKeyChain.importKey(CB58Encoded)
    cKeyChain.importKey(bufferedPrivateKey)
    pKeyChain.importKey(CB58Encoded)

    xChainAddress = xKeyChain.getAddressStrings()
    cChainAddress = cKeyChain.getAddressStrings()
    pChainAddress = pKeyChain.getAddressStrings()

    await CtoP(1, new BN("1000000000"))
}

const waitForStatusX = async(transactionId: string): Promise<any> => {
    return await xChain.getTxStatus(transactionId)
}

const waitForStatusC = async(transactionId: string): Promise<any> => {
    return await cChain.getAtomicTxStatus(transactionId)
}

const pollTransaction = async(func: Function, transactionID: string, resolve: PromiseResolve<string>, reject: PromiseReject): Promise<any> => {
    const transactionStatus: string = await func(transactionID)
    if (transactionStatus === "Rejected") {
        reject(transactionStatus)
    }
    if (transactionStatus !== "Accepted") {
        setTimeout(pollTransaction, 100, func, transactionID, resolve, reject)
    } else {
        resolve(transactionStatus)
    }
}

const getInformation = async(): Promise<any> => {
    const ip: string = "localhost"
    const port: number = 9650
    const protocol: string = "http"
    const networkID: number = 5
    avalancheInstance = new Avalanche(ip, port, protocol, networkID)
    
    xChain = avalancheInstance.XChain()
    xKeyChain = xChain.keyChain()
    xChainBlockchainID = xChain.getBlockchainID()
    xChainFees = xChain.getDefaultTxFee()
    
    cChain = avalancheInstance.CChain()
    cKeyChain = cChain.keyChain()
    cChainBlockchainID = cChain.getBlockchainID()
    cChainFees = cChain.getDefaultTxFee()
    cAvaxAssetId = binTools.cb58Encode((await cChain.getAssetDescription("AVAX")).assetID)
    
    pChain = avalancheInstance.PChain()
    pKeyChain = pChain.keyChain()
    pChainBlockchainID = pChain.getBlockchainID()
    pChainFees = pChain.getDefaultTxFee()

    const web3Protocol: string = "ws"
    const web3Ip: string = "localhost"
    const web3Port: string = "9650"
    const web3Path: string = '/ext/bc/C/ws'

    web3 = new Web3(`${web3Protocol}://${web3Ip}:${web3Port}${web3Path}`)
    
    contractAbi = JSON.parse((await fs.readFileSync("./sAvaxABI.json")).toString())
    privateKey = (JSON.parse((await fs.readFileSync("./privateData.json")).toString())).privateKey
}

const setup = async(): Promise<any> => {
    await getInformation()
    await importKeys()
}

const main = async(): Promise<any> => {
    await setup()
    await waitForStaked()
}

main().catch((error) => {
    throw `An error occurred: ${error}`
})
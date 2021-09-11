// This script will be used to do the cross-chain transfer of the owner wallet from C to P chain and stake them
// to the user-chosen node.

import * as fs from "fs"
import { Avalanche, BinTools, BN, Buffer } from "avalanche"
import Web3 from "web3"
import { ethers } from "ethers"
import {AbiItem} from "web3-utils";

let xChain, xKeyChain, xChainAddress
let cChain, cKeyChain, cChainAddress
let pChain, pKeyChain, pChainAddress

let xChainBlockchainID, cChainBlockchainID, pChainBlockchainID

let web3

let contractAbi: AbiItem

let masterAddress: string = "0x7bD7A7D2Ba70db40740780828b236F9246BB7F78"
let privateKey: string

let utxoset

const TEN_POWER_EIGHTEEN = ethers.BigNumber.from(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(18)))
const TEN_POWER_NINE = ethers.BigNumber.from(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(9)))

const waitForStaked = async (): Promise<any> => {
    const stakingContract = new web3.eth.Contract(contractAbi, "0x5bD27eF83d57915FC3eE7feB2FebEB9c69d52B04")
    const stakedEvent = stakingContract.events.Staked()
    await web3.eth.subscribe('logs', {
        address: stakedEvent.arguments[0].address,
        topics: stakedEvent.arguments[0].topics,
    }, async (error, logs) : Promise<any> => {
        if (!error) {
            const dataHex = logs.data.substring(2)
            const id = parseInt(dataHex.substring(0, 64), 16)
            const amountWithDecimals = ethers.BigNumber.from("0x" + dataHex.substring(64))
            //Withdraw amount staked
            web3.eth.defaultAccount = masterAddress
            const data = stakingContract.methods.withdraw(id).encodeABI()
            const nonce = await web3.eth.getTransactionCount(masterAddress, "pending")
            const tx = {from:masterAddress, to:"0x5bD27eF83d57915FC3eE7feB2FebEB9c69d52B04", data:data, gasPrice:225*10**9, gas:2100000, nonce:nonce}
            const stx = await web3.eth.accounts.signTransaction(tx, privateKey)
            const htx = await web3.eth.sendSignedTransaction(stx.rawTransaction)
            await CtoP(id, amountWithDecimals)
        } else {
            throw error
        }
    })
}

const stakeToNode = async (nodeId): Promise<any> => {

}

const CtoP = async (id, amountWithDecimals): Promise<any> => { //a C --> P cross-chain transfer doesn't exists, but C --> X, X --> P does.

    const amountWithoutDecimals = amountWithDecimals.div(TEN_POWER_EIGHTEEN)
    let amountInNavax = amountWithoutDecimals.mul(TEN_POWER_NINE)
    
    xChainAddress = xKeyChain.getAddressStrings()
    cChainAddress = cKeyChain.getAddressStrings()
    pChainAddress = pKeyChain.getAddressStrings()
    
    let cChainHexAddress = "0x7bD7A7D2Ba70db40740780828b236F9246BB7F78"
    
    let nonce = await web3.eth.getTransactionCount(cChainHexAddress, "pending")
    
    let unsignedCtoXTx = await cChain.buildExportTx(
        amountInNavax,
        cAvaxAssetId,
        xChainBlockchainID,
        cChainHexAddress,
        cChainAddress[0],
        xChainAddress,
        nonce,
    )
    
    let signedCtoXTx = await unsignedCtoXTx.sign(cKeyChain)
    
    let ctoXTxId = await cChain.issueTx(signedCtoXTx)
    
    console.log(`C --> X export Tx id: ${ctoXTxId}`)
    
    let fee = cChain.getDefaultTxFee()
    
    amountInNavax = amountInNavax.sub(fee)
    
    return new Promise(function (resolve, reject) {
        pollTransaction(waitForStatusC, ctoXTxId, resolve, reject)
    }).then(async (resolve): Promise<any> => {
        if (resolve === "Accepted") {
            utxoset = (await xChain.getUTXOs(
                xChainAddress,
                cChainBlockchainID,
            )).utxos

            let unsignedImportXTx = await xChain.buildImportTx(
                utxoset,
                xChainAddress,
                cChainBlockchainID,
                xChainAddress,
                xChainAddress,
            )

            let signedImportXTx = await unsignedImportXTx.sign(xKeyChain)

            let importXTx = await xChain.issueTx(signedImportXTx)

            console.log(`C --> X import Tx id: ${importXTx}`)

            fee = xChain.getDefaultTxFee()

            amountInNavax = amountInNavax.sub(fee)

            // C --> X done, now let's start X --> P.

            utxoset = (await xChain.getUTXOs(
                xChainAddress,
                //xChainBlockchainID
            )).utxos

            let unsignedXtoPTx = await xChain.buildExportTx(
                utxoset,
                amountInNavax,
                pChainBlockchainID,
                pChainAddress,
                xChainAddress,
            )

            let signedXtoPTx = unsignedXtoPTx.sign(xKeyChain)

            let xtoPTxId = await xChain.issueTx(signedXtoPTx)

            console.log(`X --> P export Tx id: ${xtoPTxId}`)

            fee = xChain.getDefaultTxFee()

            amountInNavax = amountInNavax.sub(fee)

            return new Promise(function (resolve, reject) {
                pollTransaction(waitForStatusX, xtoPTxId, resolve, reject)
            }).then(async (resolve): Promise<any> => {
                if (resolve === "Accepted") { // ... And import the transaction on the P chain.
                    utxoset = (await pChain.getUTXOs(
                        pChainAddress,
                        pChainBlockchainID
                    )).utxos

                    let unsignedImportPTx = await pChain.buildImportTx(
                        utxoset,
                        pChainAddress,
                        xChainBlockchainID,
                        pChainAddress,
                        pChainAddress,
                    )

                    let signedImportPTx = unsignedImportPTx.sign(pKeyChain)

                    let importPTx = await pChain.issueTx(signedImportPTx)

                    console.log(`X --> P import Tx id: ${importPTx}`)

                    fee = pChain.getDefaultTxFee()

                    amountInNavax = amountInNavax.sub(fee)
                } else {
                    throw `Looks like the X --> P transaction with ${xtoPTxId} id has not been accepted!`
                }
            })
        } else {
            throw `Looks like the C --> X transaction with ${ctoXTxId} id has not been accepted!`
        }
    })
}

let binTools = BinTools.getInstance()

const importKeys = async () => {
    const bufferedPrivatekey = Buffer.from(privateKey, 'hex')
    const CB58Encoded = `PrivateKey-${binTools.cb58Encode(bufferedPrivatekey)}`
    xKeyChain.importKey(CB58Encoded)
    cKeyChain.importKey(bufferedPrivatekey)
    pKeyChain.importKey(CB58Encoded)
    
    cChainAddress = cKeyChain.getAddressStrings()
    pChainAddress = pKeyChain.getAddressStrings()
}

let transactionStatus

const waitForStatusX = async(transactionId): Promise<any> => {
    transactionStatus = await xChain.getTxStatus(transactionId)
    return transactionStatus
}

const waitForStatusC = async(transactionId): Promise<any> => {
    transactionStatus = await cChain.getAtomicTxStatus(transactionId)
    return transactionStatus
}

const pollTransaction = async(func, transactionID, resolve, reject): Promise<any> => {
    transactionStatus = await func(transactionID)
    if (transactionStatus === "Rejected") {
        reject(transactionStatus)
    }
    if (transactionStatus !== "Accepted") {
        setTimeout(pollTransaction, 100, func, transactionID, resolve, reject)
    } else {
        resolve(transactionStatus)
    }
}

let xAvaxAssetId, cAvaxAssetId

let avalancheInstance

const getInformations = async() => {
    const ip = "localhost"
    const port = 9650
    const protocol = "http"
    const networkID = 5
    avalancheInstance = new Avalanche(ip, port, protocol, networkID)
    
    xChain = avalancheInstance.XChain()
    xKeyChain = xChain.keyChain()
    xChainBlockchainID = xChain.getBlockchainID()
    
    cChain = avalancheInstance.CChain()
    cKeyChain = cChain.keyChain()
    cChainBlockchainID = cChain.getBlockchainID()
    
    pChain = avalancheInstance.PChain()
    pKeyChain = pChain.keyChain()
    pChainBlockchainID = pChain.getBlockchainID()
    
    xAvaxAssetId = binTools.cb58Encode((await xChain.getAssetDescription("AVAX")).assetID)
    cAvaxAssetId = binTools.cb58Encode((await cChain.getAssetDescription("AVAX")).assetID)
    
    const web3Protocol = "wss"
    const web3Path = '/ext/bc/C/ws'
    
    web3 = new Web3(`${web3Protocol}://api.avax-test.network${web3Path}`)
    
    contractAbi = JSON.parse((await fs.readFileSync("./sAvaxABI.json")).toString())

    privateKey = JSON.parse((await fs.readFileSync("./privateData.json")).toString())
}

const setup = async() => {
    await getInformations()
    await importKeys()
}

const main = async() => {
    console.log("Setup")
    await setup()
    console.log("Waiting for stakes")
    await waitForStaked()
}

main().catch((e) => {
  console.log("We got an error! " + e)
})
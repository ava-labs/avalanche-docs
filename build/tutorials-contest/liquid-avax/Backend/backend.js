// This script will be used to do the cross-chain transfer of the owner wallet from C to P chain and stake them
// to the user-chosen node.

import fs from "fs";
import {Avalanche, BinTools, BN} from "avalanche";
import Web3 from "web3";
import { Buffer } from "buffer";

let xChain, xKeyChain, xChainAddress;
let cChain, cKeyChain, cChainAddress;
let pChain, pKeyChain, pChainAddress;

let xChainBlockchainID, cChainBlockchainID, pChainBlockchainID;

let web3;

let contractAbi;

let masterAddress = "0x7bD7A7D2Ba70db40740780828b236F9246BB7F78";
let privateKey = JSON.parse(await fs.readFileSync("./data.json")).privateKey;

let currentTxId = [];

let utxoset;


async function waitForStaked() {
    let stakingContract = new web3.eth.Contract(contractAbi, "0x5bD27eF83d57915FC3eE7feB2FebEB9c69d52B04");
    let stakedEvent = stakingContract.events.Staked();
    await web3.eth.subscribe('logs', {
        address: stakedEvent.arguments[0].address,
        topics: stakedEvent.arguments[0].topics,
    }, async function (error, logs) {
        if (!error) {
            console.log("New stake")
            let dataHex = logs.data.substring(2);
            let id = parseInt(dataHex.substring(0, 64), 16);
            let amountWithDecimals = parseInt(dataHex.substring(64), 16);
            //Withdraw amount staked
            web3.eth.defaultAccount = masterAddress
            let data = await stakingContract.methods.withdraw(id).encodeABI();
            let nonce = await web3.eth.getTransactionCount(masterAddress, "pending");
            let tx = {from:masterAddress, to:"0x5bD27eF83d57915FC3eE7feB2FebEB9c69d52B04", data:data, gasPrice:225*10**9, gas:2100000, nonce:nonce}
            let stx = await web3.eth.accounts.signTransaction(tx, privateKey);
            let htx = await web3.eth.sendSignedTransaction(stx.rawTransaction);
            console.log(htx)
            await CtoP(id, amountWithDecimals);
        } else {
            console.log(error)
        }
    })
}

async function stakeToNode(nodeId) {
    
}

async function CtoP() { //a C --> P cross-chain transfer doesn't exists, but C --> X, X --> P does.
    
    // Includes the fees in the transferred AVAX
    
    xChainAddress = xKeyChain.getAddressStrings();
    cChainAddress = cKeyChain.getAddressStrings();
    pChainAddress = pKeyChain.getAddressStrings();
    
    let amount = new BN("1000000000"); //1 AVAX
    
    let cChainHexAddress = "0x7bD7A7D2Ba70db40740780828b236F9246BB7F78";
    
    let nonce = await web3.eth.getTransactionCount(cChainHexAddress, "pending");
    
    let unsignedCtoXTx = await cChain.buildExportTx(
        amount,
        cAvaxAssetId,
        xChainBlockchainID,
        cChainHexAddress,
        cChainAddress[0],
        xChainAddress,
        nonce,
    )
    
    let signedCtoXTx = await unsignedCtoXTx.sign(cKeyChain);
    
    let CtoXTxId = await cChain.issueTx(signedCtoXTx);
    
    console.log("CtoXTxId " + CtoXTxId);
    
    let fee = cChain.getDefaultTxFee();
    
    amount = amount.sub(fee);
    
    return new Promise(function (resolve, reject) {
        pollTransaction(waitForStatusC, CtoXTxId, resolve, reject);
    }).then(async (resolve, reject) => {
        if (resolve === "Accepted") {
            utxoset = (await xChain.getUTXOs(
                xChainAddress,
                cChainBlockchainID,
            )).utxos;
            
            let unsignedImportXTx = await xChain.buildImportTx(
                utxoset,
                xChainAddress,
                cChainBlockchainID,
                xChainAddress,
                xChainAddress,
            )
            
            let signedImportXTx = await unsignedImportXTx.sign(xKeyChain);
            
            let importXTx = await xChain.issueTx(signedImportXTx);
            
            console.log("importXTx " + importXTx);
            
            fee = xChain.getDefaultTxFee();
            
            amount = amount.sub(fee);
            
            // C --> X done, now let's start X --> P.
            
            utxoset = (await xChain.getUTXOs(
                xChainAddress,
                //xChainBlockchainID
            )).utxos;
            
            let unsignedXtoPTx = await xChain.buildExportTx(
                utxoset,
                amount,
                pChainBlockchainID,
                pChainAddress,
                xChainAddress,
            )
            
            let signedXtoPTx = unsignedXtoPTx.sign(xKeyChain);
            
            let XtoPTxId = await xChain.issueTx(signedXtoPTx);
            
            console.log("XtoPTxId " + XtoPTxId);
            
            fee = xChain.getDefaultTxFee();
            
            amount = amount.sub(fee);
            
            return new Promise(function (resolve, reject) {
                pollTransaction(waitForStatusX, XtoPTxId, resolve, reject);
            }).then(async (resolve, reject) => {
                if (resolve === "Accepted") { // ... And import the transaction on the P chain.
                    utxoset = (await pChain.getUTXOs(
                        pChainAddress,
                        pChainBlockchainID
                    )).utxos;
                    
                    let unsignedImportPTx = await pChain.buildImportTx(
                        utxoset,
                        pChainAddress,
                        xChainBlockchainID,
                        pChainAddress,
                        pChainAddress,
                    )
                    
                    let signedImportPTx = unsignedImportPTx.sign(pKeyChain);
                    
                    let importPTx = await pChain.issueTx(signedImportPTx);
                    
                    console.log("importPTx " + importPTx);
                    
                    fee = pChain.getDefaultTxFee();
            
                    amount = amount.sub(fee);
                } else {
                    // Error
                }
            })
        } else {
            // Throw an error
        }
    })
}

let binTools = BinTools.getInstance();

async function importKeys() {
    let buffer = Buffer.from(privateKey, 'hex')
    let CB58Encoded = `PrivateKey-${binTools.cb58Encode(buffer)}`
    xKeyChain.importKey(CB58Encoded);
    cKeyChain.importKey(buffer);
    pKeyChain.importKey(CB58Encoded);
}

let transactionStatus;

async function waitForStatusX(transactionId) {
    transactionStatus = await xChain.getTxStatus(transactionId);
    return transactionStatus;
}

async function waitForStatusP(transactionId) { //Either X or P chain.
    transactionStatus = (await pChain.getTxStatus(transactionId)).status;
    return transactionStatus;
}

async function waitForStatusC(transactionId) {
    transactionStatus = await cChain.getAtomicTxStatus(transactionId);
    return transactionStatus;
}

async function pollTransaction(func, transactionID, resolve, reject) {
    transactionStatus = await func(transactionID);
    if (transactionStatus === "Rejected") {
        reject(transactionStatus);
    }
    if (transactionStatus !== "Accepted") {
        setTimeout(pollTransaction, 100, func, transactionID, resolve, reject);
    } else {
        resolve(transactionStatus);
    }
}

let xAvaxAssetId, cAvaxAssetId;

let avalancheInstance;

async function getInformations() {
    const ip = "localhost";
    const port = 9650;
    const protocol = "http";
    const networkID = 5;
    avalancheInstance = new Avalanche(ip, port, protocol, networkID);
    
    const path = '/ext/bc/C/rpc';
    
    xChain = avalancheInstance.XChain();
    xKeyChain = xChain.keyChain();
    xChainBlockchainID = xChain.getBlockchainID();
    
    cChain = avalancheInstance.CChain();
    cKeyChain = cChain.keyChain();
    cChainBlockchainID = cChain.getBlockchainID();
    cChainAddress = cKeyChain.getAddressStrings();
    
    pChain = avalancheInstance.PChain();
    pKeyChain = pChain.keyChain();
    pChainBlockchainID = pChain.getBlockchainID();
    pChainAddress = pKeyChain.getAddressStrings();
    
    xAvaxAssetId = binTools.cb58Encode((await xChain.getAssetDescription("AVAX")).assetID);
    cAvaxAssetId = binTools.cb58Encode((await cChain.getAssetDescription("AVAX")).assetID);
    
    const web3Protocol = "wss";
    const web3Path = '/ext/bc/C/ws';
    
    //web3 = new Web3(`${web3Protocol}://${ip}:${port}${web3Path}`);
    web3 = new Web3("wss://api.avax-test.network/ext/bc/C/ws");
    
    contractAbi = JSON.parse(await fs.readFileSync("./sAvaxABI.json"))
}

async function setup() {
    await getInformations();
    await importKeys();
}

async function main() {
    console.log("Setup")
    await setup();
    console.log("Waiting for stakes")
    await waitForStaked();
}

main().catch((e) => {
  console.log("We got an error! " + e);
})

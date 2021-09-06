// This script will be used to do the cross-chain transfer of the owner wallet from C to P chain and stake them
// to the user-chosen node.

import fs from "fs";
import avalanche from "avalanche";
import Web3 from "web3";
import {Buffer} from "buffer";

let ip, protocol, port, networkID, avalancheInstance;

let xChain, xKeyChain, xChainAddress;
let cChain, cKeyChain, cChainAddress;
let pChain, pKeyChain, pChainAddress;

let xChainBlockchainID, cChainBlockchainID, pChainBlockchainID;

let web3;

let utxoset;

async function CtoP() { //a C --> P cross-chain transfer doesn't exists, but C --> X, X --> P does.
    
    // Includes the fees in the transferred AVAX
    
    xChainAddress = xKeyChain.getAddressStrings();
    cChainAddress = cKeyChain.getAddressStrings();
    pChainAddress = pKeyChain.getAddressStrings();
    
    let amount = new avalanche.BN("1000000000"); //1 AVAX
    
    let cChainHexAddress = "0xa81eb27374740aec026ebe760f97477dbfed616f";
    
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

let binTools = avalanche.BinTools.getInstance();

async function importKeys() {
    const pKeyHex = JSON.parse(await fs.readFileSync("./data.json")).privateKey;
    let buffer = Buffer.from(pKeyHex, 'hex')
    let CB58Encoded = `PrivateKey-${binTools.cb58Encode(buffer)}`
    xKeyChain.importKey(CB58Encoded);
    cKeyChain.importKey(buffer);
    pKeyChain.importKey(CB58Encoded);
}

let transactionStatus;

async function waitForStatusX(transactionId) {
    transactionStatus = await xChain.getTxStatus(transactionId);
    //console.log(transactionStatus);
    return transactionStatus;
}

async function waitForStatusP(transactionId) { //Either X or P chain.
    transactionStatus = (await pChain.getTxStatus(transactionId)).status;
    //console.log(transactionStatus);
    return transactionStatus;
}

async function waitForStatusC(transactionId) {
    transactionStatus = await cChain.getAtomicTxStatus(transactionId);
    return transactionStatus;
}

async function pollTransaction(func, transactionID, resolve, reject) {
    transactionStatus = await func(transactionID);
    //console.log(transactionStatus);
    if (transactionStatus === "Rejected") {
        reject(transactionStatus);
    }
    if (transactionStatus !== "Accepted") {
        setTimeout(pollTransaction, 100, func, transactionID, resolve, reject);
    } else {
        resolve(transactionStatus);
    }
}

let xAvaxAssetId, cAvaxAssetId, pAvaxAssetId;
async function getInformations() {
    ip = "localhost";
    port = 9650;
    protocol = "http";
    networkID = 5;
    avalancheInstance = new avalanche.Avalanche(ip, port, protocol, networkID);
    
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
    //pAvaxAssetId = binTools.cb58Encode((await pChain.getAssetDescription("AVAX")).assetID);
    
    web3 = new Web3(`${protocol}://${ip}:${port}${path}`);
}

async function setup() {
    await getInformations();
    await importKeys();
}

async function start() {
    await setup();
    await CtoP();
}

start();
// This script will be used to do the cross-chain transfer of the owner wallet from C to P chain and stake them
// to the user-chosen node.

import fs from "fs";
import Avalanche, { BinTools, BN, Buffer } from "avalanche";
import Web3 from "web3";
import {
    SECPTransferInput,
    SECPTransferOutput,
    TransferableInput,
    TransferableOutput,
    UnsignedTx
} from "avalanche/dist/apis/avm/index.js";
import { NodeIDStringToBuffer, UnixNow } from "avalanche/dist/utils/index.js";
import { AddDelegatorTx, ParseableOutput, SECPOwnerOutput } from "avalanche/dist/apis/platformvm/index.js";

let xChain, xKeyChain, xChainAddress;
let cChain, cKeyChain, cChainAddress;
let pChain, pKeyChain, pChainAddress;

let xChainBlockchainID, cChainBlockchainID, pChainBlockchainID;

let web3;

let contractAbi;

const FOURTHEEN_DAYS = 60*60*24*14;
const FULL_YEAR = 60*60*24*365;

async function waitForStaked() {
    let stakingContract = new web3.eth.Contract(contractAbi, "0x5bD27eF83d57915FC3eE7feB2FebEB9c69d52B04");
    let stakedEvent = stakingContract.events.Staked();
    await web3.eth.subscribe('logs', {
        address: stakedEvent.arguments[0].address,
        topics: stakedEvent.arguments[0].topics,
    }, async function (error, logs) {
        if (!error) {
            let sender = "0x" + logs.topics[1].substring(26);
            let txHash = logs.transactionHash;
            let dataHex = logs.data.substring(2);
            let stakeId = parseInt(dataHex.substring(0, 64), 16);
            let amountWithDecimals = parseInt(dataHex.substring(64, 128), 16);
            let endingTimestamp = parseInt(dataHex.substring(128), 16);
            //await CtoP(amountWithDecimals, stakeId, endingTimestamp, sender, txHash);
        } else {
            console.log(error)
        }
    })
}

async function stakeToNode(stakeAmount, stakeId, locktime, sender, txHash) {
    let nodeId = "NodeID-LPLhV54tkseYMQ4Ap9oUCoE2KAEPmyNUK";
    
    let memo;
    if (stakeId && sender) {
        memo = Buffer.from(
            `Liquid-avax-ID${stakeId}-FROM${sender}-TXHASH${txHash}`
        )
    } else {
        memo = Buffer.from(
            `Liquid-avax-ID${undefined}` // We hopefully don't want that
        )
    }
    
    const getBalanceResponse = await pChain.getBalance(pChainAddress[0])
    const unlocked = new BN(getBalanceResponse.unlocked)
    const secpTransferOutput = new SECPTransferOutput(
        unlocked.sub(pFees).sub(stakeAmount.minValidatorStake),
        pChainAddress,
        locktime
    )
    const outputs = [];
    const transferableOutput = new TransferableOutput(
        pAvaxAssetId,
        secpTransferOutput
    )
    outputs.push(transferableOutput)
    
    const stakeOuts = []
    
    const stakeSECPTransferOutput = new SECPTransferOutput(
    stakeAmount.minValidatorStake,
    pChainAddress,
    locktime
  )
  const stakeTransferableOutput = new TransferableOutput(
    pAvaxAssetId,
    stakeSECPTransferOutput
  )
  stakeOuts.push(stakeTransferableOutput)
    
    const rewardOutputOwners = new SECPOwnerOutput(
        pChainAddress,
        locktime
    )
    const rewardOwners = new ParseableOutput(rewardOutputOwners)
    
    const platformVMUTXOResponse = await pChain.getUTXOs(pChainAddress)
    const utxoSet = platformVMUTXOResponse.utxos
    const utxos = utxoSet.getAllUTXOs()
    
    const inputs = [];
    utxos.forEach((utxo) => {
        const output = utxo.getOutput()
        if (output.getOutputID() === 7) { // Equal 7, why ???
            const amountOutput = utxo.getOutput()
            const amt = amountOutput.getAmount().clone()
            const txid = utxo.getTxID()
            const outputidx = utxo.getOutputIdx()
            
            const secpTransferInput = new SECPTransferInput(amt)
            secpTransferInput.addSignatureIdx(0, pChainAddress[0])
            
            const input = new TransferableInput(
                txid,
                outputidx,
                pAvaxAssetId,
                secpTransferInput
            )
            inputs.push(input)
        }
    })
    
    const startTime = UnixNow()
    const endTime = startTime.add(new BN(endingTimestamp))
    
    const addDelegatorTx = new AddDelegatorTx(
        pChainBlockchainID,
        binTools.cb58Decode(pChainBlockchainID),
        outputs,
        inputs,
        memo,
        NodeIDStringToBuffer(nodeId),
        startTime,
        endTime,
        stakeAmount.minDelegatorStake,
        stakeOuts,
        rewardOwners
    )
    
    const unsignedTx = new UnsignedTx(addDelegatorTx)
    const tx = unsignedTx.sign(pKeychain)
    const txid = await pchain.issueTx(tx)
    console.log(`Success! TXID: ${txid}`)
}

async function CtoP(amountWithDecimals, stakeId, endingTimestamp, sender, txHash) { //a C --> P cross-chain transfer doesn't exists, but C --> X, X --> P does.
    // On the C-Chain, the ERC-20 token WAVAX has 18 decimals. We need to convert it to 9 decimals, for AVAX.
    let amountInAvax = amountWithDecimals / 10 ** 18;
    let amountInNAvax = String(amountInAvax * 10 ** 9);
    
    let utxoset;
    
    xChainAddress = xKeyChain.getAddressStrings();
    cChainAddress = cKeyChain.getAddressStrings();
    pChainAddress = pKeyChain.getAddressStrings();
    
    let amount = new BN(amountInNAvax); //1 AVAX
    
    let cChainHexAddress = "";
    
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
    
    amount = amount.sub(cFees);
    
    return new Promise(function (resolve, reject) {
        pollTransaction(waitForStatusC, CtoXTxId, resolve, reject);
    }).then(async (resolve) => {
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
            
            amount = amount.sub(xFees);
            
            // C --> X done, now let's start X --> P.
            
            utxoset = (await xChain.getUTXOs(
                xChainAddress
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
            
            amount = amount.sub(xFees);
            
            return new Promise(function (resolve, reject) {
                pollTransaction(waitForStatusX, XtoPTxId, resolve, reject);
            }).then(async (resolve) => {
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
                    
                    amount = amount.sub(pFees);
                    
                    let locktime = endingTimestamp - UnixNow()
                    
                    if (locktime < FOURTHEEN_DAYS) {
                        locktime = FOURTHEEN_DAYS
                    } else if (locktime > FULL_YEAR) {
                        locktime = FULL_YEAR
                    }
                    
                    await stakeToNode(amount, stakeId, locktime, sender, txHash);
                } else {
                    console.log("An error happened for a transaction with ID: " + XtoPTxId)
                }
            })
        } else {
            console.log("An error happened for a transaction with ID: " + CtoXTxId)
        }
    })
}

let binTools = BinTools.getInstance();

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
    return transactionStatus;
}

async function waitForStatusP(transactionId) {
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

let xAvaxAssetId, cAvaxAssetId, pAvaxAssetId;
let xFees, cFees, pFees;

let avalancheInstance;

async function getInformations() {
    const ip = "localhost";
    const port = 9650;
    const protocol = "http";
    const networkID = 5;
    const web3Protocol = "wss";
    const web3Path = '/ext/bc/C/ws';
    
    avalancheInstance = new Avalanche(ip, port, protocol, networkID);
    web3 = new Web3(`${web3Protocol}://${ip}:${port}${web3Path}`);
    
    xChain = avalancheInstance.XChain();
    xKeyChain = xChain.keyChain();
    xChainBlockchainID = xChain.getBlockchainID();
    xFees = xChain.getDefaultTxFee();
    
    cChain = avalancheInstance.CChain();
    cKeyChain = cChain.keyChain();
    cChainBlockchainID = cChain.getBlockchainID();
    cChainAddress = cKeyChain.getAddressStrings();
    cFees = xChain.getDefaultTxFee();
    
    pChain = avalancheInstance.PChain();
    pKeyChain = pChain.keyChain();
    pChainBlockchainID = pChain.getBlockchainID();
    pChainAddress = pKeyChain.getAddressStrings();
    pFees = xChain.getDefaultTxFee();
    
    xAvaxAssetId = binTools.cb58Encode((await xChain.getAssetDescription("AVAX")).assetID);
    cAvaxAssetId = binTools.cb58Encode((await cChain.getAssetDescription("AVAX")).assetID);
    pAvaxAssetId = binTools.cb58Encode((await pChain.getAssetDescription("AVAX")).assetID);
    
    contractAbi = JSON.parse(await fs.readFileSync("./abi.json"))
}

async function setup() {
    await getInformations();
    await importKeys();
}

async function main() {
    //await setup();
    web3 = new Web3(`wss://api.avax-test.network/ext/bc/C/ws`)
    contractAbi = JSON.parse(await fs.readFileSync("./abi.json"))
    await waitForStaked();
}

main().catch((e) => {
  console.log("We got an error! " + e);
})
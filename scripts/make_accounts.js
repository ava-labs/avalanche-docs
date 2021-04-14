const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545/ext/bc/C/rpc');
const w3 = new Web3(provider);
const avalanche = require("avalanche");

let maxAccounts = 1;
let pk = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN";
let ava = new avalanche.Avalanche('127.0.0.1', 9545, 'http', 12345);
let xchain = ava.XChain();
let cchain = ava.CChain();
let xKeychain = xchain.keyChain();
let cKeychain = cchain.keyChain();
xKeychain.importKey(pk);
cKeychain.importKey(pk);
let xAddresses = xchain.keyChain().getAddresses();
let cAddresses = cchain.keyChain().getAddresses();
let xAddressStrings = xchain.keyChain().getAddressStrings();
let cAddressStrings = cchain.keyChain().getAddressStrings();
let bintools = avalanche.BinTools.getInstance();

let cChainBlockchainID = cchain.getBlockchainID();
const ONEAVAX = new avalanche.BN(1000000000);
let amount = ONEAVAX.mul(new avalanche.BN(100000)); //seed all wallets with 100k avax
let locktime = new avalanche.BN(0);
let threshold = 1;

let assetID = "2hrWPkPoNJRgtx24jimCfgiyzAf5DpG2hEBUpVfW8tT76RsRHh";
let memo = bintools.stringToBuffer("AVM utility method buildExportTx to export ANT to the C-Chain from the X-Chain");

let cChainBlockchainIdStr = cchain.getBlockchainID();
let cChainBlockchainIdBuf = bintools.cb58Decode(cChainBlockchainIdStr);
let xChainBlockchainIdStr = xchain.getBlockchainID();
let xChainBlockchainIdBuf = bintools.cb58Decode(xChainBlockchainIdStr);

async function exportTxXtoC() {
    var timestamp = Date.now() / 1000 | 0;
    let asOf = new avalanche.BN(timestamp);
    let avaxAssetID = await xchain.getAVAXAssetID();
    let avmUTXOResponse = await xchain.getUTXOs(xAddressStrings);
    let utxoSet = avmUTXOResponse.utxos;
    let unsignedTx = await xchain.buildExportTx(utxoSet, amount, cChainBlockchainID, cAddressStrings, xAddressStrings, xAddressStrings, memo, asOf, locktime, threshold, bintools.cb58Encode(avaxAssetID));
    let otx = unsignedTx.sign(xKeychain);
    let xtx_id = await xchain.issueTx(otx);
}

async function importTxXtoC(evmAddr) {
    let u = await cchain.getUTXOs(cAddressStrings[0], "X");
    let intxoSet = u.utxos;
    let intxo = intxoSet.getAllUTXOs();
    let importedIns = [];
    let evmOutputs = [];

    cHexAddress = evmAddr;
    intxo.forEach((utxo) => { assetID = utxo.getAssetID(); txid = utxo.getTxID(); outputidx = utxo.getOutputIdx(); output = utxo.getOutput(); amt = output.getAmount().clone(); input = new avalanche.evm.SECPTransferInput(amt); input.addSignatureIdx(0, cAddresses[0]); xferin = new avalanche.evm.TransferableInput(txid, outputidx, assetID, input); importedIns.push(xferin); evmOutput = new avalanche.evm.EVMOutput(cHexAddress, amt, assetID); evmOutputs.push(evmOutput);});

    let importTx = new avalanche.evm.ImportTx(12345, cChainBlockchainIdBuf, xChainBlockchainIdBuf, importedIns, evmOutputs);
    let unsignedImportTx = new avalanche.evm.UnsignedTx(importTx);
    let intx = unsignedImportTx.sign(cKeychain);
    try {
        let ctx_id = await cchain.issueTx(intx);
    } catch (e) {
        console.log('Error occurred', e);
    }
}


async function seedTestAccounts(evmAddr) {
    //let xBalance = await xchain.getBalance(xAddressStrings[0], bintools.cb58Encode(avaxAssetID));
    // EXPORT TX FROM X-CHAIN INTO C-CHAIN
    await exportTxXtoC()

    // sleep
    await new Promise(r => setTimeout(r, 1000));
    // IMPORT TX INTO C-CHAIN FROM X-CHAIN
    await importTxXtoC(evmAddr);
}

module.exports = async (callback) => {
    // create test accounts
    console.log('create test accounts');
    for (var i=0; i<maxAccounts;i++) { await w3.eth.personal.newAccount('');}
    var accounts = await w3.eth.personal.getAccounts();
    console.log(accounts);

    // create unlock accounts
    console.log('unlock test accounts');
    for (var i=0; i<accounts.length;i++) {await w3.eth.personal.unlockAccount(accounts[i], '',9099999999);}

    // seed accounts with avax from x-chain to c-chain
    console.log('seed accounts with avax from x-chain to c-chain');
    for (var i=0; i<accounts.length;i++) {await seedTestAccounts(accounts[i]);}

    await new Promise(r => setTimeout(r, 5000));

    // check balance of accounts
    console.log('check balance of accounts');
    for (var i=0; i<accounts.length;i++) {console.log(await w3.eth.getBalance(accounts[i]));}
}
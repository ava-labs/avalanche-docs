# Deploy a Gnosis Safe on Your Subnet EVM

## Introduction
This article shows how to deploy and interact with a [Gnosis Safe](https://gnosis-safe.io/) programmatically on any [Subnet EVM](README.md).

If you are looking for more information regarding the Gnosis Safe protocol, please check out [these developer docs](https://docs.gnosis-safe.io/).

## Prerequisites
This tutorial assumes that:

- [A Subnet and EVM blockchain](./create-a-fuji-subnet.md) has been created.
- Your Node is currently validating your target Subnet.
- Your wallet has a balance of the Subnet Native Token(Specified under _alloc_ in your [Genesis File](./customize-a-subnet.md#genesis)).

## Fuji Workflow


### Deploy the Safe Contracts

Set up the repository by running thew following Commands:

```zsh
git https://github.com/safe-global/safe-contracts.git
cd safe-contracts
```

Next, change `.env.example` to `.env` and set the `MNEMONIC` value to your wallet's _seed phrase_ or _private key_.

```env
MNEMONIC=<"YOUR-SEED-PHRASE-HERE">
```

Next, add your Subnet Network parameters to [`hardhat.congfig.ts`](https://github.com/safe-global/safe-contracts/blob/main/hardhat.config.ts):

```ts
    subnet: {
      url: <"YOUR-SUBNET-RPC-HERE">,
      chainId: <"YOUR-SUBNET-CHAIN-ID-HERE">,
      gasPrice: "auto",
      accounts: { mnemonic: MNEMONIC },
    },
```


Finally, deploy the contracts by running:

```zsh
yarn hardhat --network subnet deploy
```

This will deploy the contracts to your Subnet EVM!

```zsh
Nothing to compile
deploying "SimulateTxAccessor" (tx: 0xb2104e7067e35e1d2176ee53f6030bbcef4a12051505daca603d097d87ebd3e2)...: deployed at 0x52C84043CD9c865236f11d9Fc9F56aa003c1f922 with 237301 gas
deploying "GnosisSafeProxyFactory" (tx: 0x8faec24dda341141e02d1b898ceefe445b2893b3f600f1f79a5e04e3a91396cd)...: deployed at 0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25 with 865918 gas
deploying "DefaultCallbackHandler" (tx: 0xa1a48e8869c71cb10e9ca5f2ce20420c44ce09dc32aa13efbd2ebc3796bcf145)...: deployed at 0x5aa01B3b5877255cE50cc55e8986a7a5fe29C70e with 541390 gas
deploying "CompatibilityFallbackHandler" (tx: 0x05d1f9ef7cafd2dbc5d4b9621d15e15f2416e6917371355718e6194d6e39871a)...: deployed at 0x5DB9A7629912EBF95876228C24A848de0bfB43A9 with 1235752 gas
deploying "CreateCall" (tx: 0xbb40c1594dc5cdb1a37b8890e2a0e610c0339af157d094d008e8eebcf3eb3275)...: deployed at 0x4Ac1d98D9cEF99EC6546dEd4Bd550b0b287aaD6D with 294075 gas
deploying "MultiSend" (tx: 0x075067ca5e4755c31e8dbe5e16cd597f86fb141f45de254d39b050568ef2a3a6)...: deployed at 0xA4cD3b0Eb6E5Ab5d8CE4065BcCD70040ADAB1F00 with 189518 gas
deploying "MultiSendCallOnly" (tx: 0xa237e18fb2561c2081341f3621ff559063bd07c6b9f77aefdaf103f976751353)...: deployed at 0xa4DfF80B4a1D748BF28BC4A271eD834689Ea3407 with 141745 gas
deploying "SignMessageLib" (tx: 0x1cc1322268015fee470529682dbc9bfc8aa068554df841de824524cdfb8bc2e8)...: deployed at 0xe336d36FacA76840407e6836d26119E1EcE0A2b4 with 261758 gas
deploying "GnosisSafeL2" (tx: 0x341ec664d3a5c2c98f1c3f5862651ba82e0c2d12875d69ad3bdf8d1d5e3e074b)...: deployed at 0x95CA0a568236fC7413Cd2b794A7da24422c2BBb6 with 5268965 gas
deploying "GnosisSafe" (tx: 0x10dcf8c5f53ae698c77d7f60d6756b4b24f2f8224e14e21658c421e158a84cd4)...: deployed at 0x789a5FDac2b37FCD290fb2924382297A6AE65860 with 5086960 gas
✨  Done in 26.90s.
```
_Note: Record your GnosisSafeL2 and GnosisSafeProxyFactory addresses to complete this tutorial_

The deployment of the contracts is using a [proxy factory](https://github.com/safe-global/safe-contracts/blob/v1.3.0/contracts/proxies/GnosisSafeProxyFactory.sol), therefore the address is depending on the bytecode. If the address is the same then the deployment bytecode of the contract is also the same (assuming that the target chain follows the EVM specifications set in the Ethereum Yellowpaper).


## Interacting With The Safe
The [safe-deployments](https://github.com/safe-global/safe-deployments) repository contains the ABI files for the different versions of the Safe that can be used with all common Ethereum tools to interact with the Safe.

The important part is how to create the signature to confirm a transaction. More information on this can be found in the [Safe docs](https://docs.gnosis-safe.io/contracts/signatures).

To make this easier the Safe team provides multiple CLIs ([safe-cli](https://github.com/5afe/safe-cli#safe-cli) and [safe-tasks](https://github.com/5afe/safe-tasks#gnosis-safe-tasks)) and an the [safe-core-sdk](https://github.com/safe-global/safe-core-sdk/tree/main/packages/safe-core-sdk#safe-core-sdk).

### Using Safe Tasks

Lets take a look on how to create a Safe and propose transactions on a Subnet using Safe Tasks.

First, clone and navigate to the [safe-tasks repository](https://github.com/5afe/safe-tasks) by running the following command:

```zsh
git clone https://github.com/5afe/safe-tasks.git
cd safe-tasks
```

As previously described, change `.env.example` to `.env` and set the `MNEMONIC` value to your wallet's _seed phrase_ or _private key_.

Next, add your Subnet Network parameters to [`hardhat.congfig.ts`](https://github.com/5afe/safe-tasks/blob/master/hardhat.config.ts):

```ts
    subnet: {
      url: <"YOUR-SUBNET-RPC-HERE">,
      chainId: <"YOUR-SUBNET-CHAIN-ID-HERE">,
      gasPrice: "auto",
      accounts: { mnemonic: MNEMONIC },
    },
```

### Create a Safe
Now lets create a Safe using the previously deployed `GnosisSafeL2` and `GnosisSafeProxyFactory` addresses:

```zsh
yarn safe create --network subnet --singleton 0x95CA0a568236fC7413Cd2b794A7da24422c2BBb6 --factory 0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25
```

output:
```zsh
$ hardhat create --network subnet --singleton 0x95CA0a568236fC7413Cd2b794A7da24422c2BBb6 --factory 0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25
Deploy Safe to 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
Singleton: 0x95CA0a568236fC7413Cd2b794A7da24422c2BBb6
Setup data: 0xb63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc0000000000000000000000000000000000000000000000000000000000000000
Nonce: 1658256419254
To (factory): 0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25
Data: 0x1688f0b900000000000000000000000095ca0a568236fc7413cd2b794a7da24422c2bbb600000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000018217c8e9b60000000000000000000000000000000000000000000000000000000000000164b63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

Lets inspect our Safe details by running the following:

```zsh
yarn safe info 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 --network subnet
```

Output:
```zsh
Checking Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
Singleton: 0x95CA0a568236fC7413Cd2b794A7da24422c2BBb6
Version: 1.3.0
Owners: 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Threshold: 1
Nonce: 0
Fallback Handler: 0x0000000000000000000000000000000000000000
Modules: 
```

The output above illustrates a few things:
- `Singleton -` This is the contract that holds the logic for our safe to interact with. In this case, the Smart Contract we are using is [`GnosisSafeL2.sol`](https://github.com/safe-global/safe-contracts/blob/main/contracts/GnosisSafeL2.sol), A multisignature wallet with support for confirmations using signed messages based on [ERC191](https://eips.ethereum.org/EIPS/eip-191).
-  `Owners -` The addresses that are allowed to sign and submit proposals. These can be can either be EOAs or other smart contract accounts.
- `Threshold -` The amount of signatures required to submit a proposal

### Add an Owner
To add an owner we must first generate the data required to submit a proposal.

Navigate to the [add_owner.json](https://github.com/5afe/safe-tasks/blob/master/examples/add_owner.json) file in the examples directory and an address that you control to `params`.

```json
[
    {
        "to": "0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114",
        "value": "0",
        "method": "addOwnerWithThreshold(address,uint256)",
        "params": [
            "0x82DdaF3f1fcd3c18F5664cD7fb12bD8C38D5d4ba",
            "2"
        ],
        "operation": 0
    }
]
```
Next, run the following command to obtain the encoded data we need to complete the txn:
```zsh
yarn safe propose-multi 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 examples/add_owner.json --export addOwner.json
```
This will create a new file in the examples directory, `addOwner.json` 

```json
{
  "version": "1.0",
  "chainId": "99999",
  "createdAt": 1658276969641,
  "meta": {
    "name": "Custom Transactions"
  },
  "transactions": [
    {
      "to": "0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114",
      "value": "0",
      "data": "0x0d582f1300000000000000000000000082ddaf3f1fcd3c18f5664cd7fb12bd8c38d5d4ba0000000000000000000000000000000000000000000000000000000000000002",
      "operation": 0
    }
  ]
}
```

Notice the `data` value has the parameter encoded as a single hexadecimal string.
- `addOwnerWithThreshold` has the function signature `0d582f13`
- `address` is appears in the data as `82ddaf3f1fcd3c18f5664cd7fb12bd8c38d5d4ba`
- `threshold` appears at the end of the data as `2`

Now we can the `data` value as an argument for our proposal:
```zsh
yarn safe propose 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 --data 0x0d582f1300000000000000000000000082ddaf3f1fcd3c18f5664cd7fb12bd8c38d5d4ba0000000000000000000000000000000000000000000000000000000000000002 --to 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
```

Output:
```zsh
Running on subnet
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
Safe transaction hash: 0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc
```

Next, we will sign and submit our Proposal's tx hash, `0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc`, with a few short commands.

**Sign:**

```zsh
yarn safe sign-proposal 0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc
```

Output:
```zsh
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Signature: 0x094e84aab062cb03f9abca3b80fb9931934c83920024fb8fa83b7b8d1a2aab305ab1f4d54e3a59ad7633f3f36d5db9b9976db268e05e0559c1c017fd3836540020
```

**Submit:**
```zsh
yarn safe submit-proposal 0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc
```

Output:
```zsh
Running on subnet
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Ethereum transaction hash: 0x99b35740246b91e5137f0128427e220ec7772aab17b20b6b9d4bcc7e0c73685f
```

Now lets check the owners of our safe by using the `info` task:



```zsh
yarn safe submit-proposal 0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc
```

Output:
```zsh
Checking Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
Singleton: 0x95CA0a568236fC7413Cd2b794A7da24422c2BBb6
Version: 1.3.0
Owners: 0x82DdaF3f1fcd3c18F5664cD7fb12bD8C38D5d4ba,0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Threshold: 2
Nonce: 1
Fallback Handler: 0x0000000000000000000000000000000000000000
Modules: 
```

As we can see,`Owners` now includes a new address and `threshold`, the amount of signatures needed to execute a transaction, has increased to 2.
## Local Workflow

### Start the Local Network

Follow [Create a Local Test Network](../quickstart/create-a-local-test-network.md#avalanche-network-runner) to start a 5-node local network. Make sure that you get one of the port number by following [this](../quickstart/create-a-local-test-network.md#retrieve-all-nodes). In this tutorial, we will assume one of the ports is 13076.

### Locate the Hardhat Network Configuration and Make Necessary Changes

Most of the code are already set to run it on a local network. Do check the following values in `hardhat.config.ts` to make sure they are correct.

```js
    subnet: {
      url: `http://127.0.0.1:13076/ext/bc/2iu7cwjqicwzytFRRgfyCzaFQtJw53C7WSoDEU7KWRo8mhVFRj/rpc`,
      chainId: 99999,
      gasPrice: "auto",
      accounts: [
        "56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
      ],
    },
```

Then run the deployment and interaction methods follow the exercise in this tutorial. 

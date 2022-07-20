# Deploy a Gnosis Safe on Your Subnet EVM

## Introduction
This article shows how to deploy and interact with a [Gnosis Safe](https://gnosis-safe.io/) programmatically on any [Subnet EVM](README.md).

If you are looking for more information regarding the Gnosis Safe protocol, please check out [these developer docs](https://docs.gnosis-safe.io/).

## Prerequisites
This tutorial assumes that:

- [A Subnet and EVM blockchain](./create-a-fuji-subnet.md) has been created.
- Your Node is currently validating your target Subnet.
- Your wallet has a balance of the Subnet Native Token(Specified under _alloc_ in your [Genesis File](./customize-a-subnet.md#genesis)).

## Custom Network Workflow



### Setup
Set up the repository by running thew following Commands:

```zsh
git https://github.com/safe-global/safe-contracts.git
cd safe-contracts
```

Next, change `.env.example` to `.env`, set the variable,`PK` to your wallet's _private key_. Here, we can also add our node's RPC endpoint as our `NODE_URL`. 

Example
```env
PK="56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"
PK2=""
INFURA_KEY=""
# Used for custom network
NODE_URL="http://127.0.0.1:49435/ext/bc/2Ek1MWR7jiEJr3o9tuJAH79JkuERzKqQDcR2s6R2e5Dyz54Wit/rpc"
NETWORK="subnet"
```


Next, add your Subnet Network parameters to [`hardhat.config.ts`](https://github.com/safe-global/safe-contracts/blob/main/hardhat.config.ts):

```ts
networks: {
  subnet: {
    url: NODE_URL,
    chainId: 99999,
    gasPrice: "auto",
    accounts: [`${PK}`, ],
  }
}
```

### Deploy the Safe Contracts

Finally, deploy the contracts by running:

```zsh
yarn hardhat --network subnet deploy
```

This will deploy the contracts to your Subnet EVM!

```zsh
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

To make this easier the Safe team provides multiple CLIs ([safe-cli](https://github.com/5afe/safe-cli#safe-cli) and [safe-tasks](https://github.com/5afe/safe-tasks#gnosis-safe-tasks)) and the [safe-core-sdk](https://github.com/safe-global/safe-core-sdk/tree/main/packages/safe-core-sdk#safe-core-sdk).

### Using Safe Tasks

Lets take a look on how to create a Safe and propose transactions on a Subnet using Safe Tasks.

First, clone and navigate to the [safe-tasks repository](https://github.com/5afe/safe-tasks) by running the following command:

```zsh
git clone https://github.com/5afe/safe-tasks.git
cd safe-tasks
```

Implement the environment and network setup [above](#setup) to prepare the Safe-Tasks project.
### Create a Safe
Now lets create a Safe using the previously deployed `GnosisSafeL2` and `GnosisSafeProxyFactory` addresses:

```zsh
yarn safe create --network subnet --singleton 0x95CA0a568236fC7413Cd2b794A7da24422c2BBb6 --factory 0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25
```

Output:
```zsh
$ hardhat create --network subnet --singleton 0x95CA0a568236fC7413Cd2b794A7da24422c2BBb6 --factory 0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25
Deploy Safe to 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
Singleton: 0x95CA0a568236fC7413Cd2b794A7da24422c2BBb6
Setup data: 0xb63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc0000000000000000000000000000000000000000000000000000000000000000
Nonce: 1658256419254
To (factory): 0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25
Data: 0x1688f0b900000000000000000000000095ca0a568236fc7413cd2b794a7da24422c2bbb600000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000018217c8e9b60000000000000000000000000000000000000000000000000000000000000164b63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```


Notice the line, "_Deploy Safe to 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114_", informs us that our safe contract lives at the address `0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114`. We will utilize this address throughout the rest of the tutorial.

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
- `Singleton` - This is the contract that holds the logic for our safe to interact with. In this case, the Smart Contract we are using is [`GnosisSafeL2.sol`](https://github.com/safe-global/safe-contracts/blob/main/contracts/GnosisSafeL2.sol), A multisignature wallet with support for confirmations using signed messages based on [ERC191](https://eips.ethereum.org/EIPS/eip-191).
-  `Owners` - The addresses that are allowed to sign and submit proposals. These can be can either be EOAs or other smart contract accounts.
- `Threshold` - The amount of signatures required to submit a proposal.

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
Next, we will call the `propose-multi` task to create a transaction based on the sample tx input json that adds an owner to the safe.

```zsh
yarn safe propose-multi 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 examples/add_owner.json --export example/addOwner.json
```
This will create a new file, `addOwner.json`, in the examples directory.

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

Notice the `data` value has the parameters encoded as a single hexadecimal string.
- `addOwnerWithThreshold` has the function signature `0d582f13`
- `address` appears in the data as `82ddaf3f1fcd3c18f5664cd7fb12bd8c38d5d4ba`
- `threshold` appears at the end of the data as `2`

Now we can use the `--data` flag and pass in the `data` above as an argument for our proposal.
```zsh
yarn safe propose 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 --data 0x0d582f1300000000000000000000000082ddaf3f1fcd3c18f5664cd7fb12bd8c38d5d4ba0000000000000000000000000000000000000000000000000000000000000002 --to 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
```

Output:
```zsh
Running on subnet
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
Safe transaction hash: 0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc
```

As you can see, making a proposal generates a `Safe transaction hash` which we will use to complete this tutorial.

Next, we will sign and submit our Proposal's tx hash, `0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc`, with the tasks, `sign-proposal` and `submit-proposal`.

#### Sign

```zsh
yarn safe sign-proposal 0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc
```

Output:
```zsh
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Signature: 0x094e84aab062cb03f9abca3b80fb9931934c83920024fb8fa83b7b8d1a2aab305ab1f4d54e3a59ad7633f3f36d5db9b9976db268e05e0559c1c017fd3836540020
```

#### Submit
```zsh
yarn safe submit-proposal 0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc
```

Output:
```zsh
Running on subnet
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Ethereum transaction hash: 0x99b35740246b91e5137f0128427e220ec7772aab17b20b6b9d4bcc7e0c73685f
```

Now that we've successfully submitted a proposal, lets check the owners of our safe by using the `info` task:

```zsh
yarn safe info 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
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

It is worth noting that you can also check the owners of the safe by using [Hardhat with your Custom EVM](https://docs.avax.network/dapps/smart-contracts/using-hardhat-with-the-avalanche-c-chain#interact-with-smart-contract).

As we can see,`Owners` now includes a new address and `threshold`, the amount of signatures needed to execute a transaction, has increased to 2.

### Send Native Currency from your Safe
Lets apply the very same steps above to a workflow where we send the Native Currency of your Subnet to an EOA.
This part of the tutorial requires that your Safe holds at least 1000 Native Tokens. You can send assets to your Safe the same way you would send Avax using [Metamask](https://metamask.zendesk.com/hc/en-us/articles/360015488931-How-to-send-tokens-from-your-MetaMask-wallet). To add your subnet to MetaMask, [please read this excerpt](http://localhost:3000/subnets/create-a-fuji-subnet#connect-with-metamask).


Just as before, we will sign and submit the transaction hash. This example uses two signers due to an increased `threshold` from our previous Safe tx.

To include our second signer, we will have to import another _private key_ into the project by adding it to `.env` and `hardhat.config.ts` 

Example `.env`:

```js
PK="56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"
PK2="cd30aef1af167238c627593537e162ecf5aad1d4ab4ea98ed2f96ad4e47006dc"
INFURA_KEY=""
# Used for custom network
NODE_URL="http://127.0.0.1:49435/ext/bc/2Ek1MWR7jiEJr3o9tuJAH79JkuERzKqQDcR2s6R2e5Dyz54Wit/rpc"
NETWORK="subnet"
```

Example `hardhat.config.ts`

```ts
// Load environment variables.
dotenv.config();
const {
  NETWORK,
  NODE_URL,
  INFURA_KEY,
  MNEMONIC,
  PK,
  PK2,
  SOLIDITY_VERSION,
  SOLIDITY_SETTINGS,
} = process.env;

...
networks: {
  subnet: {
        url: NODE_URL,
        chainId: 99999,
        gasPrice: "auto",
        accounts: [`${PK}`, `${PK2}` ],
      },
    },
```

In this example, we're sending 1000 _LEVM_ from our Safe to the address `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`.

Let's ensure that our Safe has enough funds by using a simple curl request.

```zsh
curl -X POST localhost:49435/ext/bc/2Ek1MWR7jiEJr3o9tuJAH79JkuERzKqQDcR2s6R2e5Dyz54Wit/rpc -H "Content-Type: application/json" --data '
{
  "jsonrpc": "2.0",
  "method": "eth_getBalance",
  "params": ["0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114", "latest"],
  "id": 1
}
'
```

Output:
```zsh
{"jsonrpc":"2.0","id":1,"result":"0x3e8"}
```

Now that we've verified that our Safe has enough Native Tokens(1000), lets create a proposal to send some to an EOA.

```zsh
yarn safe propose 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 --value 1000 --to 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
```
Notice that we've added the `value` flag and passed in our target amount. We've also changed our `to` flag to be our our target address. You can find the other flags and parameters for this task [here](https://github.com/5afe/safe-tasks/blob/52067e3ac5b8a1db3a4ab54fec0ee628c0bd4f3a/src/execution/proposing.ts).

Output:
```zsh
Running on subnet
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
Safe transaction hash: 0x5134dc35909ff592c55a64c1a5947dd4844b1bca2a45df68ed9c3019133bf44d
```

#### Sign with Two Owners

```zsh
yarn safe sign-proposal 0x5134dc35909ff592c55a64c1a5947dd4844b1bca2a45df68ed9c3019133bf44d
```

Output:
```zsh
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Signature: 0x636ba2a89023b1e81032a43dd1172743f7916e31647eb87ec95c541c091ebf1873605d39d8039431a7dceeeab691e48b96b50f93e91acde5e67295e9f051e7031f
```

By default, Hardhat uses _account 0_ to sign transactions. Since we've imported another private key and added it to our _accounts_ parameter in `hardhat.config.ts` we can now specify which account we want to sign with by adding the flag `--signer` to our `sign-proposal` task 

```zsh
yarn safe sign-proposal 0x5134dc35909ff592c55a64c1a5947dd4844b1bca2a45df68ed9c3019133bf44d --signer 1
```

Output:
```zsh
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x82DdaF3f1fcd3c18F5664cD7fb12bD8C38D5d4ba
Signature: 0x11d7e983417280bdf1c55da51359eb06262f0feadad1c6ebdf497a6e6db92c5e506536c1c2b6bd3ef726d163c710d5adcbe787a2440be5ad79cac52e950407b21f
```

#### Submit

```zsh
yarn safe submit-proposal 0x5134dc35909ff592c55a64c1a5947dd4844b1bca2a45df68ed9c3019133bf44d
```

Output:
```zsh
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Ethereum transaction hash: 0x074d823b8d111af9e87d0e4374e3a5382a4de9952df4f49db5ee4b52f945760b
```

Now lets check the balances of the Safe and EOA addresses using curl.

**Safe balance(0)**

```zsh
sh-3.2$ curl -X POST localhost:49435/ext/bc/2Ek1MWR7jiEJr3o9tuJAH79JkuERzKqQDcR2s6R2e5Dyz54Wit/rpc -H "Content-Type: application/json" --data '
{
  "jsonrpc": "2.0",
  "method": "eth_getBalance",
  "params": ["0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114", "latest"],
  "id": 1
}
```
Output:
```zsh
{"jsonrpc":"2.0","id":1,"result":"0x0"}
```

**EOA Balance(99,9999.63)**

```zsh
curl -X POST localhost:49435/ext/bc/2Ek1MWR7jiEJr3o9tuJAH79JkuERzKqQDcR2s6R2e5Dyz54Wit/rpc -H "Content-Type: application/json" --data '
{
  "jsonrpc": "2.0",
  "method": "eth_getBalance",
  "params": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC", "latest"],
  "id": 1
}
'
```
Output
```zsh
{"jsonrpc":"2.0","id":1,"result":"0xd3c216ac85648b2da900"}
```

And there you have it! We've transferred 1000 _LEVM_ from our Safe to address `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`.

### Calling other Functions
As long as you have the ABI for a contract, you can apply the workflow outlined above to call other functions.

For instance, if we wanted to approve a spend, we would create a transaction json file with the necessary data such as the example below.

[`tx_input.sample.json:`](https://github.com/5afe/safe-tasks/blob/master/tx_input.sample.json)

```json
[
    {
        "to": "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        "value": "0.1",
        "operation": 0
    },
    {
        "to": "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        "value": "0",
        "method": "approve(address,uint256)",
        "params": [
            "0xd0Dab4E640D95E9E8A47545598c33e31bDb53C7c",
            "1000000000000"
        ],
        "operation": 0
    }
]
```

Then we would use the same tasks from before:
- `yarn safe propose-multi <SAFE-ADDRESS> <TX-FILE> --export <TX-DATA-FILE-NAME>` to generate the txn data
- `yarn safe propose <SAFE-ADDRESS> --data <TX-DATA> --to <TARGET-ADDRESS>`
- `yarn safe sign <SAFE-TX-HASH>`
- `yarn submit <SAFE-TX-HASH>`
## Local Workflow

### Start the Local Network

Follow [Create a Local Test Network](../quickstart/create-a-local-test-network.md#avalanche-network-runner) to start a 5-node local network. Make sure that you get one of the port numbers by following [this](../quickstart/create-a-local-test-network.md#retrieve-all-nodes). In this tutorial, we will assume one of the ports is 49435.

### Locate the Hardhat Network Configuration and Make Necessary Changes

Most of the code is already set to follow this tutorial on a local network. Do check the following values in `hardhat.config.ts` to make sure they are correct.

```js
    subnet: {
      url: `http://127.0.0.1:49435/ext/bc/2Ek1MWR7jiEJr3o9tuJAH79JkuERzKqQDcR2s6R2e5Dyz54Wit/rpc`,
      chainId: 99999,
      gasPrice: "auto",
      accounts: [
        "56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
      ],
    },
```

Then run the deployment and interaction methods follow the exercises in this tutorial. 

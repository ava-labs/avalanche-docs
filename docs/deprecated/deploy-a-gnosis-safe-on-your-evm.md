# Deploy a Gnosis Safe on Your Subnet-EVM

:::warning
This document has been deprecated and may contain incorrect/obsolete information.
:::

## Introduction

This article shows how to deploy and interact with a [Gnosis Safe](https://gnosis-safe.io/)
programmatically on any [Subnet-EVM](/learn/avalanche/subnets-overview.md).

If you are looking for more information regarding the Gnosis Safe protocol, please check out [these
developer docs](https://docs.gnosis-safe.io/).

## Prerequisites

This tutorial assumes that:

- A Subnet and EVM blockchain has been created. Avalanche tools allow users to do this on
  [Mainnet](/build/subnet/deploy/mainnet-subnet.md), [Fuji](/build/subnet/deploy/fuji-testnet-subnet.md)
  or a [Local network](/build/subnet/deploy/local-subnet.md).
- Your node is currently validating your target Subnet.
- Your wallet has a balance of the Subnet native token (specified under _alloc_ in your [Genesis File](/build/subnet/upgrade/customize-a-subnet.md#genesis)).

The entirety of this tutorial will require you to work with 3 projects (4 if running locally)

- [gnosis-Subnet](https://github.com/ava-labs/gnosis-subnet)
- [safe-tasks](https://github.com/5afe/safe-tasks.git)
- [avalanche-smart-contract-quickstart](https://github.com/ava-labs/avalanche-smart-contract-quickstart)
- [avalanche-network-runner](/tooling/network-runner.md) (Local Workflow)

## Custom Network Workflow

### Setup Network

In order for the `gnosis-safe` repo to successfully deploy these contracts, ensure that you have `jq`
and `yarn` installed.

On Ubuntu, run `sudo apt install jq`, `sudo apt install yarn`.
On Linux, run `brew install jq`, `brew install yarn`.

Next, clone the library. Change `.env.example` to `.env` and set the variable,`MNEMONIC` to the seed
phrase of the wallet you intend to deploy the contracts with. Set `ADDRESS` to the public key of the
same wallet. Finally, set `NODE_URL` to the URL of your Subnet's RPC.

:::note

This address you choose must be funded as the transactions will include a gas fee.

:::

Example:

```env
export MNEMONIC="foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar"
export ADDRESS="0xA028036b2aaAED2487654B2B042C2AA9FA5Ef6b8"
export NODE_URL="https://api.avax-test.network/ext/bc/C/rpc"
```

### Deploy the Safe Contracts

After setting up the `.env` file and installing `jq`, simply run `./deploy.sh`.

<!-- markdownlint-disable MD013 -->

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

Not all contracts will deploy, but that is expected behavior. If you see this output, everything worked as expected:

```zsh
Verification status for CompatibilityFallbackHandler: SUCCESS
Verification status for CreateCall: SUCCESS
Verification status for DefaultCallbackHandler: SUCCESS
Verification status for GnosisSafe: SUCCESS
Verification status for GnosisSafeL2: SUCCESS
Verification status for GnosisSafeProxyFactory: SUCCESS
Verification status for MultiSend: FAILURE
Verification status for MultiSendCallOnly: SUCCESS
Verification status for SignMessageLib: SUCCESS
Verification status for SimulateTxAccessor: FAILURE
```

Deployment information, including contract addresses can be found in `safe-contracts/deployments/custom`.

<!-- markdownlint-enable MD013 -->

:::note
Please record your GnosisSafeL2 and GnosisSafeProxyFactory to be able to create a
[Safe](https://github.com/5afe/safe-tasks#gnosis-safe-tasks) on your Subnet.
:::

The deployment of the contracts is using a [proxy
factory](https://github.com/safe-global/safe-contracts/blob/v1.3.0/contracts/proxies/GnosisSafeProxyFactory.sol),
therefore the address is depending on the bytecode. If the address is the same then the deployment
bytecode of the contract is also the same (assuming that the target chain follows the EVM
specifications set in the Ethereum Yellow Paper).

<!-- ## Interacting with the Safe

The [safe-deployments](https://github.com/safe-global/safe-deployments) repository contains the ABI
files for the different versions of the Safe that can be used with all common Ethereum tools to
interact with the Safe.

The important part is how to create the signature to confirm a transaction. More information on this
can be found in the [Safe docs](https://docs.gnosis-safe.io/contracts/signatures).

To make this easier the Safe team provides multiple CLIs
([safe-cli](https://github.com/5afe/safe-cli#safe-cli) and
[safe-tasks](https://github.com/5afe/safe-tasks#gnosis-safe-tasks)) and the
[safe-core-sdk](https://github.com/safe-global/safe-core-sdk/tree/main/packages/safe-core-sdk#safe-core-sdk).

### Using Safe Tasks

Let's take a look on how to create a Safe and propose transactions on a Subnet using Safe Tasks, a
Hardhat task collection for the Safe contracts.

First, in a new directory, clone and navigate to the [safe-tasks
repository](https://github.com/5afe/safe-tasks) by running the following command:

```zsh
git clone https://github.com/5afe/safe-tasks.git
cd safe-tasks
yarn
```

Implement the environment and network setup [above](#setup-network) to prepare the Safe-Tasks project.

### Create a Safe

Now let's create a Safe using the previously deployed `GnosisSafeL2` and `GnosisSafeProxyFactory` addresses:

```zsh
yarn safe create --network subnet --singleton "<YOUR-GnosisSafeL2-ADDRESS-HERE>" --factory "<YOUR-GnosisSafeProxyFactory-ADDRESS-HERE>"
```

Output:

```zsh
Deploy Safe to 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
Singleton: 0x95CA0a568236fC7413Cd2b794A7da24422c2BBb6
Setup data: 0xb63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc0000000000000000000000000000000000000000000000000000000000000000
Nonce: 1658256419254
To (factory): 0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25
Data: 0x1688f0b900000000000000000000000095ca0a568236fc7413cd2b794a7da24422c2bbb600000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000018217c8e9b60000000000000000000000000000000000000000000000000000000000000164b63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

Notice the line, "_Deploy Safe to 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114_", informs us that our
safe contract lives at the address `0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114`. For demonstration
purposes, we will utilize this address for this section of the article.

Let's inspect our Safe details by running the following:

```zsh
yarn safe info --network subnet 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
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

- `Singleton` - This is the contract that holds the logic for our Safe to interact with. In this
  case, the Smart Contract we are using is
  [`GnosisSafeL2.sol`](https://github.com/safe-global/safe-contracts/blob/main/contracts/GnosisSafeL2.sol),
  A multisignature wallet with support for confirmations using signed messages based on
  [ERC191](https://eips.ethereum.org/EIPS/eip-191).
- `Owners` - The addresses that are allowed to sign and submit proposals. These can be can either be
  EOAs or other smart contract accounts.
- `Threshold` - The amount of signatures required to submit a proposal.

### Add an Owner

To add an owner we must first generate the data required to submit a proposal.

Navigate to the
[add_owner.json](https://github.com/5afe/safe-tasks/blob/master/examples/add_owner.json) file in the
examples directory and an address that you control to `params`.

```json
[
  {
    "to": "0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114",
    "value": "0",
    "method": "addOwnerWithThreshold(address,uint256)",
    "params": ["0x82DdaF3f1fcd3c18F5664cD7fb12bD8C38D5d4ba", "2"],
    "operation": 0
  }
]
```

Next, we will call the `propose-multi` task to create a transaction based on the sample TX input
json that adds an owner to the Safe.

```zsh
yarn safe propose-multi --network subnet 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
examples/add_owner.json --export example/addOwner.json
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
yarn safe propose --network subnet 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 --to 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
--data 0x0d582f1300000000000000000000000082ddaf3f1fcd3c18f5664cd7fb12bd8c38d5d4ba0000000000000000000000000000000000000000000000000000000000000002
```


Output:

```zsh
Running on subnet
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
Safe transaction hash: 0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc
```

As you can see, creating a proposal generates a `Safe transaction hash` which we will use to
complete this tutorial.

Next, we will sign and submit our proposal's TX hash,
`0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc`, with the tasks,
`sign-proposal` and `submit-proposal`.

#### Sign Add Owner TX

```zsh
yarn safe sign-proposal 0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc
```

Output:

```zsh
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Signature: 0x094e84aab062cb03f9abca3b80fb9931934c83920024fb8fa83b7b8d1a2aab305ab1f4d54e3a59ad7633f3f36d5db9b9976db268e05e0559c1c017fd3836540020
```

#### Submit Add Owner TX

```zsh
yarn safe submit-proposal 0x2837eb329c41078c97e2450eabf0b73caae94d08db06a5d9fe2084d33ef3f4cc
```

Output:

```zsh
Running on subnet
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Ethereum transaction hash: 0x99b35740246b91e5137f0128427e220ec7772aab17b20b6b9d4bcc7e0c73685f
```

Now that we've successfully submitted a proposal, let's check the owners of our Safe by using the
`info` task:

```zsh
yarn safe info --network subnet 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
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

It is worth noting that you can also check the owners of the Safe by using [Hardhat with your Custom
EVM](https://docs.avax.network/dapps/smart-contracts/using-hardhat-with-the-avalanche-c-chain#interact-with-smart-contract).

As shown above, `Owners` now includes a new address and `threshold`, the amount of signatures needed
to execute a transaction, has increased to 2.

### Send Native Currency from Your Safe

Let's apply the very same steps above to a workflow where we send the Native Currency of your Subnet
to an EOA. This part of the tutorial requires that your Safe holds at least 1000 native tokens. You
can send assets to your Safe the same way you would send AVAX using
[MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015488931-How-to-send-tokens-from-your-MetaMask-wallet).
To add your Subnet to MetaMask, [please read this
excerpt](/subnets/create-a-fuji-subnet#connect-with-metamask).

Just as before, we will sign and submit the transaction hash. This example uses two signers due to
an increased `threshold` from our previous Safe transaction.

To include our second signer, we will have to import another _private key_ into the project by
adding it to `.env` and `hardhat.config.ts` in our `safe-tasks` project.

Example `.env`:

```js
PK="56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"
PK2="cd30aef1af167238c627593537e162ecf5aad1d4ab4ea98ed2f96ad4e47006dc"
INFURA_KEY=""
# Used for custom network
NODE_URL="http://127.0.0.1:49435/ext/bc/2Ek1MWR7jiEJr3o9tuJAH79JkuERzKqQDcR2s6R2e5Dyz54Wit/rpc"
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
        url: `${NODE_URL}`,
        chainId: 99999,
        gasPrice: "auto",
        accounts: [`${PK}`, `${PK2}` ],
      },
    },
```

In this example, we're sending 1000 _LEVM_ (which is the native token on the Subnet we are working
with) from our Safe to the address `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`.

Let's ensure that our Safe has enough funds by using a simple curl request.


```zsh
curl -X POST localhost:49435/ext/bc/2Ek1MWR7jiEJr3o9tuJAH79JkuERzKqQDcR2s6R2e5Dyz54Wit/rpc -H
"Content-Type: application/json" --data '
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

Now that we've verified that our Safe has enough native tokens(1000), let's create a proposal to
send some to an EOA.

```zsh
yarn safe propose  --network subnet 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 --value 1000 --to 0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559
```

Notice that we've added the `value` flag and passed in our target amount. We've also changed our
`to` flag to be our target address. You can find the other flags and parameters for this task
[here](https://github.com/5afe/safe-tasks/blob/52067e3ac5b8a1db3a4ab54fec0ee628c0bd4f3a/src/execution/proposing.ts).

Output:

```zsh
Running on subnet
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114
Safe transaction hash: 0x5134dc35909ff592c55a64c1a5947dd4844b1bca2a45df68ed9c3019133bf44d
```

#### Sign with Two Owners

Follow the same workflow from before to sign a proposal.

```zsh
yarn safe sign-proposal 0x5134dc35909ff592c55a64c1a5947dd4844b1bca2a45df68ed9c3019133bf44d
```

Output:

```zsh
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Signature: 0x636ba2a89023b1e81032a43dd1172743f7916e31647eb87ec95c541c091ebf1873605d39d8039431a7dceeeab691e48b96b50f93e91acde5e67295e9f051e7031f
```

By default, Hardhat uses _account 0_ to sign transactions. Since we've imported another private key
and added it to our _accounts_ parameter in `hardhat.config.ts` we can now specify which account we
want to sign with by adding the flag `--signer-index` to our `sign-proposal` task

```zsh
yarn safe sign-proposal 0x5134dc35909ff592c55a64c1a5947dd4844b1bca2a45df68ed9c3019133bf44d
--signer-index 1
```

Output:

```zsh
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x82DdaF3f1fcd3c18F5664cD7fb12bD8C38D5d4ba
Signature: 0x11d7e983417280bdf1c55da51359eb06262f0feadad1c6ebdf497a6e6db92c5e506536c1c2b6bd3ef726d163c710d5adcbe787a2440be5ad79cac52e950407b21f
```

#### Submit Send TX

Now that both owners have signed the proposal, the `threshold` requirement has been met and we can
now submit the proposal.

```zsh
yarn safe submit-proposal 0x5134dc35909ff592c55a64c1a5947dd4844b1bca2a45df68ed9c3019133bf44d
```

Output:

```zsh
Using Safe at 0x1DE5B48F80eC78Bf74644EFdCbB5750Cb7B25114 with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Ethereum transaction hash: 0x074d823b8d111af9e87d0e4374e3a5382a4de9952df4f49db5ee4b52f945760b
```

Now let's check the balances of the Safe and EOA addresses using curl.

##### Safe Balance(0)

```zsh
curl -X POST localhost:49435/ext/bc/2Ek1MWR7jiEJr3o9tuJAH79JkuERzKqQDcR2s6R2e5Dyz54Wit/rpc -H
"Content-Type: application/json" --data '
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

##### EOA Balance(1,000)

```zsh
curl -X POST "http://127.0.0.1:17773/ext/bc/8ttPWTKt2FEs256fJkV2Yj5nJS1JPSfhN2ghAr8aboZWF2gXF/rpc"
-H "Content-Type: application/json" --data '
{
  "jsonrpc": "2.0",
  "method": "eth_getBalance",
  "params": ["0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559", "latest"],
  "id": 1
}
```

Output

```zsh
{"jsonrpc":"2.0","id":1,"result":"0x3635c9adc5dea00000"}
```

:::tip

We can reformat `BigNumber` values to human readable values by using hardhat console.

Example:

```zsh
npx hardhat console --network subnet
ethers.utils.formatUnits(await ethers.BigNumber.from('0x3635c9adc5dea00000'))
```

Output

```zsh
'1000.0'
```

:::

And there you have it! We've transferred 1000 _LEVM_ from our Safe to address, `0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559`.

### Other Functions

As long as you have the ABI for a contract, you can apply the workflow outlined above to call other functions.

For instance, if we wanted to approve a spend, we would create a transaction json file with the
necessary data such as the example below.

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
    "params": ["0xd0Dab4E640D95E9E8A47545598c33e31bDb53C7c", "1000000000000"],
    "operation": 0
  }
]
```

Then we would use the same tasks from before:

#### 1. Generate the TX data with `yarn safe propose-multi`

```zsh
yarn safe propose-multi --network subnet <SAFE-ADDRESS> <TX-FILE> --export <TX-DATA-FILE-NAME>
```

#### 2. Create a proposal with `yarn safe propose`

```zsh
yarn safe propose --network subnet <SAFE-ADDRESS> --data <TX-DATA> --to <TARGET-ADDRESS>
```

#### 3. Sign the proposal with `yarn safe sign-proposal`

```zsh
yarn safe sign-proposal <SAFE-TX-HASH>
```

#### 4. Submit the proposal with `yarn safe submit-proposal`

```zsh
yarn submit <SAFE-TX-HASH>
```

## Managing a Proxy Using Gnosis Safe

:::caution

This part of the tutorial is better suited for advanced users as the operations from each project
work together asynchronously which may lead to errors if the user misses a step.

Please pay careful attention to which project and which step of the workflow you are in when
following this part of the tutorial.

:::

This part of the article aims to illustrate the use of a Multi-Signature Safe Protocol to manage an
[Upgradeable Proxy Smart Contract](https://docs.openzeppelin.com/contracts/4.x/api/proxy). For this
tutorial we will use a [Transparent Upgradeable
Proxy](https://blog.openzeppelin.com/the-transparent-proxy-pattern/). To learn more about proxy
upgrade patterns, please review the Open Zeppelin docs
[here](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies) and see the diagram below.

![Proxy](../../static/img/Proxy-IMG.png)

Some use cases may apply such as:

- `Upgrading a Vault` - Point the proxy implementation to a new treasury smart contract.
- `Upgrading a Registry` - Migrate a database of user addresses and privileges to a new smart
  contract. This may include owners, stakers, validators, token holders, whitelists.

### Setup Proxy

For this part of the tutorial, we will need to clone the [Avalanche Smart Contract Quickstart
repository](https://github.com/ava-labs/avalanche-smart-contract-quickstart/tree/proxy-contract-implementation)
and switch to the `proxy-contract-implementation` branch the by running the following Commands:

```zsh
git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart
cd avalanche-smart-contract-quickstart
git switch proxy-contract-implementation
yarn
```

Next, implement the environment and network setup [above](#setup-network) to prepare the Proxy Smart
Contract project.

### Deploy the Proxy

Let's deploy the proxy contracts by running the following command:

```zsh
npx hardhat run --network subnet scripts/deployStorage.ts
```

Output:

```zsh
Deploying Storage...
Storage deployed to: 0x5dda6Fa725248D95d2086F4fcEb6bA6bdfEbc45b
{ number: '42' }
```

This command actually executed 3 operations:

- Deployed a Proxy Admin contract and assigned the deployer's address as the owner
- Deployed the `Storage` contract and set the `number` to 42
- Deployed a Transparent upgradeable proxy and added the `Storage` contract's address as its `implementation`

Notice the line _Storage deployed to:_ in our deployment output includes the address `0x5dda6Fa725248D95d2086F4fcEb6bA6bdfEbc45b`

This is our proxy address which you can also find in `.openzeppelin`, a session file that includes
all of the project's proxy contract information.

Example:

```json
{
  "manifestVersion": "3.2",
  "admin": {
    "address": "0xd8215b138ef5eA0ecFc49fBaD1a30A18a109A06c",
    "txHash": "0xf0457a8ca950fe526cc9d60fb578761538d037ea2f939758c6810a3b1e6b95d4"
  },
  "proxies": [
    {
      "address": "0x5dda6Fa725248D95d2086F4fcEb6bA6bdfEbc45b",
      "txHash": "0x10480134bfe1709277e4e03aeed2825355c87f6a35633c6ed06a114fc9ce06a6",
      "kind": "transparent"
    }
  ],
  "impls": {
    "cba9f8cf52e3c449631a04ea218a6cedcaf7c366669cfc257c89a008266c768f": {
      "address": "0x42420054623f00CE5F04Ae4Fb8905f3Dd04DD27a",
      "txHash": "0x6494655b779015d7cac8f32b7fa1d6437616de71e71312cbf17cf9cc1054ea35",
      "layout": {
        "storage": [
          {
            "label": "number",
            "offset": 0,
            "slot": "0",
            "type": "t_uint256",
            "contract": "Storage",
            "src": "contracts/Storage.sol:7"
          }
        ],
        "types": {
          "t_uint256": {
            "label": "uint256",
            "numberOfBytes": "32"
          }
        }
      }
    }
  }
}
```

### Transfer the Proxy Admin Role to a Safe

Next, let's transfer proxy admin privileges to our Gnosis Safe by adding it's address to our
[`transferProxyOwnership.ts`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/proxy-contract-implementation/scripts/transferProxyOwnership.ts)
script.

```ts
// transferProxyOwnership.ts
const gnosisSafe = "<YOUR-SAFE-ADDRESS-HERE>"
```

Next run the script to execute the transfer.

```zsh
npx hardhat run --network subnet scripts/transferProxyOwnership.ts
```

Output:

```zsh
Transferring ownership of ProxyAdmin...
✔ 0x1189D8E94cAD398612cc4638f80B18d421e74a31 (transparent) proxy ownership transferred through admin proxy
Transferred ownership of ProxyAdmin to: 0xCA2922E98339C359D818b8f7ad3c897C0e18a7ff
```

Now that we have transferred ownership to our Gnosis Safe, we can upgrade the proxy implementation.

### Upgrade the Contract

#### Deploy a New Logic Contract

For this step we will deploy a new implementation for the proxy contract to interact with.

Run the following command to deploy
[`StorageV2`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/076f191ca74cd1d15304f7fb945aa53e860ab506/contracts/StorageV2.sol),
an upgraded version of our
[`Storage`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/076f191ca74cd1d15304f7fb945aa53e860ab506/contracts/Storage.sol)
contract:

```zsh
npx hardhat run --network subnet scripts/deployStorageV2.ts
```

Output:

```zsh
Deploying Storage2...
StorageV2 deployed to: 0x32CaF0D54B0578a96A1aDc7269F19e7398358174
```

`0x32CaF0D54B0578a96A1aDc7269F19e7398358174` will be our new `implementation` address, the logic
contract consumed by the proxy contract.

#### Use Hardhat to Interact with the Proxy

Now is a good time for us to use Hardhat to interact with the proxy to ensure that we are on the
right track.

First setup Hardhat console to run on your Subnet.

```zsh
npx hardhat console --network subnet
```

Then connect to the contracts with the following steps:

Connect hardhat to an instance of the `Storage` contract at the deployed address.

```zsh
> const storage = await ethers.getContractAt('Storage','<YOUR-PROXY-ADDRESS-HERE>')
```

You can reference your proxy address from the `Storage` contract deployment or `.openzeppelin`.

Retrieve the stored number set during deployment.

```zsh
>(await storage.retrieve()).toString()
'42'
```

#### Create the Upgrade TX

Next we will use the `propose-multi` task to create an upgrade TX.

Create a new file, `upgrade.json`, in the `examples` directory of your `safe-task` project.

```json
// examples/upgrade.json
[
  {
    "to": "<YOUR-PROXY-ADMIN-ADDRESS-HERE>",
    "value": "0",
    "method": "upgrade(address,address)",
    "params": [
      "<YOUR-PROXY-ADDRESS-HERE>",
      "<YOUR-IMPLEMENTATION-ADDRESS-HERE>"
    ],
    "operation": 0
  }
]
```

Ensure that the following parameters are set correctly:

- `to` - Should be set to the proxy admin address found in
  `avalanche-smart-contract-quickstart/.openzeppelin/"<YOUR-NETWORK-SESSION>".json`.
- `method` - Ensure that you have the function name and argument types correct.
- `params` - An `upgrade` call needs both a `proxy address` and `implementation address` to be
  passed in as arguments. In this case we, our implementation address will be our `StorageV2`
  contract address.

Next create the TX data by running the following command:

```zsh
yarn safe propose-multi "<YOUR-SAFE-ADDRESS>" examples/upgrade.json --export examples/upgradeData.json
```

Output:

```json
{
  "version": "1.0",
  "chainId": "99999",
  "createdAt": 1658795403593,
  "meta": {
    "name": "Custom Transactions"
  },
  "transactions": [
    {
      "to": "0xd8215b138ef5eA0ecFc49fBaD1a30A18a109A06c",
      "value": "0",
      "data": "0x99a88ec40000000000000000000000005dda6fa725248d95d2086f4fceb6ba6bdfebc45b00000000000000000000000032caf0d54b0578a96a1adc7269f19e7398358174",
      "operation": 0
    }
  ]
}
```

Notice that the `data` value consists of the calldata we will use to call the `upgrade` function.

#### Create the Proposal

```zsh
yarn safe propose --network subnet "<YOUR-SAFE-ADDRESS-HERE>" --to "<YOUR-PROXY-ADMIN-ADDRESS-HERE>"
--data "<YOUR-TX-DATA-HERE>"
```

```zsh
Running on subnet
Using Safe at 0xCA2922E98339C359D818b8f7ad3c897C0e18a7ff
Safe transaction hash: 0xd9a5d0e57eaa1763f36cb7208c227e9ee2d6ec03ae4a4947bb8a99a96eef6376
```

#### Sign Upgrade TX

```shell
yarn safe sign-proposal "<YOUR-SAFE-TX-HASH-HERE>"
```

Output:

```shell
Using Safe at 0xCA2922E98339C359D818b8f7ad3c897C0e18a7ff with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Signature: 0x702f6f29903e434ea5fee10a79541a463a2c18d730f32c0b61a1101960aa802d317974c0d3d6cbe2fff53a65b911906613aad8da23da2be74afaea688d1bd49220
```

#### Submit Upgrade TX

```shell
yarn safe submit-proposal "<YOUR-SAFE-TX-HASH-HERE>"
```

Output:

```zsh
Running on subnet
Using Safe at 0xCA2922E98339C359D818b8f7ad3c897C0e18a7ff with 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Ethereum transaction hash: 0x48f142e5174532c32b191cf3eee6a5d93320330b2c0e8dfff61d53c46064e3c4
```

Our transaction hash let's us know that the EVM has mined the transaction!

#### Use Hardhat to Interact With the Upgraded Proxy

Now we will use hardhat to ensure that our proxy was successfully upgraded.

First, navigate back to hardhat console in your `avalanche-smart-contract-quickstart-project` and
instantiate `StorageV2` at our proxy address.

```zsh
> const storageV2 = await ethers.getContractAt('StorageV2','YOUR-PROXY-ADDRESS-HERE')
```

Notice that we are now using `StorageV2` at our original proxy address. Since, we've upgraded our
implementation, our we can call the original address but interact with the new contract.

Let's check the stored value to ensure that we have retained the data from the previous implementation..

```zsh
> (await storageV2.retrieve()).toString()
'42'
```

Great! We've successfully retrieved the previously stored value from the contract!

Now let's call our upgraded contract's new function
[`increment`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/964129dfb7cb9271b396927e9ea8b009e321cda1/contracts/StorageV2.sol#L24-L27)
which adds 1 to the stored value:

```zsh
> await storageV2.increment()
{
  hash: '0x2ed9dff3f909a50f191d41ff59ab423907fbc23b4cf7b3721907d933a710b848',
  type: 0,
  accessList: null,
  blockHash: '0x70be069ddf5c353cef0f6e3047b20e9e8c52b837228c131d3e0ad8c84b4c39f4',
  blockNumber: 124,
  transactionIndex: 0,
  confirmations: 1,
  from: '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  gasPrice: BigNumber { _hex: '0x05d21dba00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8931', _isBigNumber: true },
  to: '0x5dda6Fa725248D95d2086F4fcEb6bA6bdfEbc45b',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 125,
  data: '0xd09de08a',
  r: '0xd5ee62766bf7f88946c0d565dbb90b80e2a93df42137b1c13ac44808f7727297',
  s: '0x4f46a263fdd6f5518ca2cfd43440ee14b5dfec2322e045a3eebdd1d51558c6db',
  v: 200034,
  creates: null,
  chainId: 99999,
  wait: [Function (anonymous)]
}
```

The transaction data shows us that the operation was successful!

Now, let's check the stored number.

```zsh
> (await storageV2.retrieve()).toString()
'43'
```

And there you have it.
We have successfully done the following:

- Deployed a [Transparent Upgradeable
  Proxy](https://blog.openzeppelin.com/the-transparent-proxy-pattern/).
- [Transferred proxy admin
  ownership](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-transferOwnership-address-)
  to a Gnosis Safe.
- [Upgraded our
  proxy](https://docs.openzeppelin.com/contracts/4.x/api/proxy#ProxyAdmin-upgrade-contract-TransparentUpgradeableProxy-address-)
  to a new implementation.

## Local Workflow

### Start the Local Network

Follow [Create a Local Test Network](/build/subnet/deploy/local-subnet.md) to start a local
Subnet-EVM. Make sure that you get one of the port numbers by following running the command:
[`avalanche network status`](/build/subnet/deploy/local-subnet.md#checking-network-status). In this
tutorial, we will assume one of the ports is 49435.

### Locate the Hardhat Network Configuration and Make Necessary Changes

Most of the code is already set to follow this tutorial on a local network. Do check the following
values in `hardhat.config.ts` to make sure they are correct.

```ts
networks: {
  subnet: {
    url: `http://127.0.0.1:49435/ext/bc/2Ek1MWR7jiEJr3o9tuJAH79JkuERzKqQDcR2s6R2e5Dyz54Wit/rpc`,
    chainId: 99999,
    gasPrice: "auto",
    accounts: [
      "56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
    ],
  },
}
```

Then run the deployment and interaction methods to follow the exercises in this tutorial. -->

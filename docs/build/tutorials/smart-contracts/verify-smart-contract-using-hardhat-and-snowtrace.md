# Verifying Smart Contracts Using Hardhat and Snowtrace

This tutorial assumes that the contract was deployed using Hardhat and that all Hardhat dependencies are properly installed.

After deploying a smart contract one can verify the smart contract on Snowtrace in three steps:

1. Flatten the Smart Contract 
2. Clean up the flattened contract
3. Verify using the Snowtrace GUI

## Flatten a Smart Contract using Hardhat

To flatten the contract run the command:
```npx hardhat flatten <path-to-contract> >> <flat-contract-name>.sol```

## Clean up the flattened Smart Contract

Some clean-up may be necessary to get the code to compile properly in the Snowtrace Contract Verifier

* Remove all but the top SPDX license. 

    * If the contract uses multiple SPDX licenses, use both licenses by adding AND:
    ```SPDX-License-Identifier: MIT AND BSD-3-Clause```

## Verify the Smart Contract using Snowtrace

1. Search for the contract in Snowtrace
2. Click on the contract tab
    1. If the contract is unverified you will see something similar to the image below
    ![snowtraceHH-1](/img/snowtraceHH-1.png)

    <br></br>

3. Click Verify and Publish
4. On the next screen in the dropdown menus select the following
    1. **Solidity (Single file)**
    2. **The compiler version you used to compile the deployed contract**
    3. The open-source license type (select none if applicable)
    ![snowtraceHH-2](/img/snowtraceHH-2.png) 

    <br></br>
    
5. Copy and paste the code from the flattened contract into the appropriate box
6. **If optimization was used when compiling the contract, make sure to select “Yes” in the dropdown menu labeled “Optimization”**
    1. If optimization was used, expand the bottom box labeled “Misc Settings” and input the number of runs
    ![snowtraceHH-3](/img/snowtraceHH-3.png)
    
    <br></br>
     
7. Select Verify and Publish
    1. If successful, all Contracts with the same bytecode will be verified
    2. If unsuccessful, read the error messages provided and make the appropriate changes
        1. Ensure to check that the compiler version and optimizer runs are the same as when you compiled the contract prior to deployment

## Verifying with Hardhat-Verify

This part of the tutorial assumes that the contract was deployed using Hardhat and that all Hardhat dependencies are properly installed to include ```'@nomiclabs/hardhat-etherscan'```.

You will need to create a ```.env.json``` with your *Wallet Seed Phrase* and *Snowtrace API key*

You will need to obtain an *API key* [here](https://snowtrace.io/myapikey)

Example ```.env.json```:

```json
{
  "MNEMONIC": "your-wallet-seed-phrase",
  "APIKEY": "your-snowtrace-api-key"
}
```
<br></br>

Below is a sample ```hardhat.config.ts``` used for deployment and verification (See LN 45: ```etherscan```)
```typescript
import { task } from 'hardhat/config'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { BigNumber } from 'ethers'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-gas-reporter'
import '@nomiclabs/hardhat-etherscan'
import { MNEMONIC, APIKEY } from './.env.json'

// When using the hardhat network, you may choose to fork Fuji or Avalanche Mainnet
// This will allow you to debug contracts using the hardhat network while keeping the current network state
// To enable forking, turn one of these booleans on, and then run your tasks/scripts using ``--network hardhat``
// For more information go to the hardhat guide
// https://hardhat.org/hardhat-network/
// https://hardhat.org/guides/mainnet-forking.html
const FORK_FUJI = false
const FORK_MAINNET = false
const forkingData = FORK_FUJI
  ? {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
    }
  : FORK_MAINNET
  ? {
      url: 'https://api.avax.network/ext/bc/C/rpc',
    }
  : undefined

task('accounts', 'Prints the list of accounts', async (args, hre): Promise<void> => {
  const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
  accounts.forEach((account: SignerWithAddress): void => {
    console.log(account.address)
  })
})

task('balances', 'Prints the list of AVAX account balances', async (args, hre): Promise<void> => {
  const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
  for (const account of accounts) {
    const balance: BigNumber = await hre.ethers.provider.getBalance(account.address)
    console.log(`${account.address} has balance ${balance.toString()}`)
  }
})
export default {
  etherscan: {
    // Your API key for Snowtrace
    // Obtain one at https://snowtrace.io/
    apiKey: APIKEY,
  },

  solidity: {
    compilers: [
      {
        version: '0.8.0',
      },
      {
        version: '0.8.10',
      },
    ],
  },
  networks: {
    hardhat: {
      gasPrice: 225000000000,
      chainId: 43114, //Only specify a chainId if we are not forking
      // forking: {
      //   url: 'https://api.avax.network/ext/bc/C/rpc',
      // },
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: { mnemonic: MNEMONIC },
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: { mnemonic: MNEMONIC },
    },
  },
}
```
<br></br>

Once the contract is deployed, verify with hardhat verify by running the following:

```zsh
npx hardhat verify <contract address> <arguments> --network <network>
```
<br></br>

Example:

```zsh
npx hardhat verify 0x3972c87769886C4f1Ff3a8b52bc57738E82192D5 MockNFT Mock ipfs://QmQ2RFEmZaMds8bRjZCTJxo4DusvcBdLTS6XuDbhp5BZjY 100 --network fuji
```
<br></br>

You can also verify contracts programmatically via script


Example: 

```typescript
import console from 'console'
const hre = require('hardhat')

// Define the NFT
const name = 'MockNFT'
const symbol = 'Mock'
const _metadataUri = 'ipfs://QmQ2RFEmZaMds8bRjZCTJxo4DusvcBdLTS6XuDbhp5BZjY'
const _maxTokens = '100'

async function main() {
  await hre.run('verify:verify', {
    address: '0x3972c87769886C4f1Ff3a8b52bc57738E82192D5',
    constructorArguments: [
      name,
      symbol,
      _metadataUri,
      _maxTokens
    ],
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```
<br></br>

First create your script, then execute it via hardhat by running the following:
 
```zsh
npx hardhat run scripts/<scriptname.ts> --network <network>
```
<br></br>

Example:

```zsh
npx hardhat run scripts/5-verifyNFT.ts --network fuji
```
<br></br>

Verifying via terminal will not allow you to pass an array as an argument, however, you can do this when verifying via script by including the array in your *Constructor Arguments*

Example: (see LN13 ```_custodians```, LN 30 ```_custodians```)

```typescript
import console from 'console'
const hre = require('hardhat')

// Define the NFT
const name = 'MockNFT'
const symbol = 'Mock'
const _metadataUri =
  'ipfs://QmQn2jepp3jZ3tVxoCisMMF8kSi8c5uPKYxd71xGWG38hV/Example'
const _royaltyRecipient = '0xcd3b766ccdd6ae721141f452c550ca635964ce71'
const _royaltyValue = '50000000000000000'
const _custodians = [
  '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199',
  '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  '0xdd2fd4581271e230360230f9337d5c0430bf44c0',
]
const _saleLength = '172800'
const _claimAddress = '0xcd3b766ccdd6ae721141f452c550ca635964ce71'

async function main() {
  await hre.run('verify:verify', {
    address: '0x08bf160B8e56899723f2E6F9780535241F145470',
    constructorArguments: [
      name,
      symbol,
      _metadataUri,
      _royaltyRecipient,
      _royaltyValue,
      _custodians,
      _saleLength,
      _claimAddress
    ],
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```
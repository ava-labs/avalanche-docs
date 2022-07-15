# How to use a ERC-20 C-chain token as the gas fee token

## Introduction

Purpose of this tutorial is to use a ERC-20 C-chain token as the gas fee token on a subnet by deploying a bridge. We will not be using any bridge provider, instead we will be implementing our own bridge, to truly understand how bridges work and how to modify them to our needs. Bridge we will be implementing is a [trusted](#trusted-and-trustless-bridges) bridge and it uses [lock-mint](#lock-mint-and-burn-release-mechanisms) mechanism to transfer assets from C-chain to subnet and [burn-release](#lock-mint-and-burn-release-mechanisms) mechanism from subnet to C-chain.

DISCLAIMER: The bridge implementation in this tutorial is a proof of concept and is not production ready.

## Prerequisites

- Basic knowledge of [Precompiles](https://docs.avax.network/subnets/customize-a-subnet#precompiles).
- We will be using [NativeMinter](https://docs.avax.network/subnets/customize-a-subnet#minting-native-coins) precompile on our subnet. Familiarity with precompiles and knowledge of NativeMinter precompile will be assumed.
- Having an up and running subnet which uses NativeMinter precompile.
- In this tutorial we will be using a local subnet. Refer to [this](https://docs.avax.network/subnets/create-a-local-subnet), to deploy your local subnet.
- Basic knowledge of [Hardhat](https://hardhat.org/).
- We will be writing our code in a Hardhat development environment. We will write custom scripts to automate our job and add those scripts as tasks to hardhat.
- General knowledge of [Ethers js](https://docs.ethers.io/v5/).
- We will be interacting with both the Avalanche Fuji chain and our subnet using ethers js. We will be initializing providers, signers, contracts and interacting with contracts using ethers js.
- Basic knowledge of [Solidity](https://docs.soliditylang.org/en/v0.8.7/).
- We will be writing our own Bridge and Token contracts using Solidity.

## General Concepts

Before writing any code, we should understand how bridges work and what type of bridges exist to better understand what we are actually doing. Reading ethereum's official documentation about [bridges](https://ethereum.org/en/bridges/) is highly recommended.

### High level overview of our bridge design

- For our bridge, the source chain represents C-chain and destination chain represents Subnet.
- A ERC-20 token on the source chain and a native gas token on our destination chain that is mintable, using NativeMinter precompile.
- Bridge contracts on both chains with custom behaviors for ERC-20 and NativeMinter precompile.
- An off-chain relayer which is an application that listens to events on both chains. On these events, it sends transactions to other chain's bridge contract. For more detail refer to [Relayer](#relayer) part.

### Trusted and Trustless Bridges

In short, bridges allow cross-chain transfers and there are 2 main types of bridges; Trusted and Trustless. Trusted bridges depend on an entity and have trust assumptions. Trustless bridges do not require trust assumptions to external entities but only to blockchain itself. To get more detail refer to ethereum's official documentation about [bridges](https://ethereum.org/en/bridges/).

### Lock-Mint and Burn-Release Mechanisms

Reason we have chosen these mechanisms is because our ERC-20 token might not be mintable and we are sure that our subnet's gas token is mintable.

#### How Lock-Mint works:

- User deposits tokens to the bridge contract, effectively locking it.
- Relayer detects the transfer event and sends a transaction to the bridge contract that is on the other chain.
- Bridge contract on the other chain mints the token and sends it to the given address.

We are using the Lock-Mint mechanism when we bridge our token from C-chain to Subnet.

#### How Burn-Release works:

- User deposits tokens to the bridge contract, and the bridge contract sends them to the 0 address, effectively burning it.
- Relayer detects the transfer event and sends a transaction to the bridge contract that is on the other chain.
- Bridge contract on the other chain sends the token to the given address, effectively releasing it.

We are using the Burn-Release mechanism when we bridge our token from Subnet to C-chain.

### Building Blocks of our Bridge

#### Relayer

Relayer is an off-chain application that listens for events on both chains. Upon events it sends transactions to other chain's bridge contracts. It has the private key of the bridge contracts' admin account allowing it to mint or release tokens.

#### Contracts

We will have bridge contracts on both chains. Users will send transactions to these contracts when they want to burn or lock their token on the respective chain. When a burn or lock happens these contracts emit an event for the relayer to observe. When the relayer observes the event on one chain, it will call bridge contract on the other chain with either mint or release function.

## Requirements

- [NodeJS](https://nodejs.org/en/) must be installed.
- [npm](https://www.npmjs.com/) must be installed.
- [Hardhat](https://www.npmjs.com/) must be installed.

## Getting Started

## Initialize the Project

Let's start by initializing our workspace with [Hardhat](https://hardhat.org/).

To initialize project, run:

```bash
npx hardhat init
```

Select `Create a basic sample project` and walk through creating the project.

## Create Contracts

Delete `Greeter.sol` file

To use openzeppelin contracts in our contracts, run:

```bash
npm i @openzeppelin/contracts
```

Make sure to update your solidity compiler version inside `hardhat.config.js` to 0.8.7. It is by default set to 0.8.4 and our contracts are written for 0.8.7 and above.

### Create Token Contracts

Create a `Token` folder inside `contracts` folder

#### Avax Token

Create `AvaxToken.sol` file inside `Token` folder

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// A standard ERC20 token with maxSupply of 1 million
contract AvaxToken is ERC20 {
   uint public MAX_SUPPLY = 1000000 ether;

   // maxSupply is sent to the creator of the token
   constructor(string memory name, string memory symbol) ERC20(name, symbol) {
       _mint(msg.sender, MAX_SUPPLY);
   }
}
```

#### Native Minter Interface

Create `INativeMinter.sol` file inside `Token` folder

```solidity
// (c) 2022-2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface NativeMinterInterface {
   // Set [addr] to have the admin role over the minter list
   function setAdmin(address addr) external;

   // Set [addr] to be enabled on the minter list
   function setEnabled(address addr) external;

   // Set [addr] to have no role over the minter list
   function setNone(address addr) external;

   // Read the status of [addr]
   function readAllowList(address addr) external view returns (uint256);

   // Mint [amount] number of native coins and send to [addr]
   function mintNativeCoin(address addr, uint256 amount) external;
}
```

### Create Bridge Contracts

Create a `Bridge` folder inside `contracts` folder

#### Avax Bridge

Create `AvaxBridge.sol` file inside `Bridge` folder

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AvaxBridge {
   address public admin;
   /* Increments with each `lock()` indicates the transferCount
    and prevents double counting of the event */
   uint public nonce;

   /* Contract that represents the ERC20 token  */
   IERC20 public avaxToken;

   /* Mapping to hold processed nonce values */
   mapping(uint => bool) public processedNonces;

   /* Allows us to indicate whether it is a `release()` or `lock()` when emitting an event */
   enum Step {
       Release,
       Lock
   }

   /* Event that is emitted with both `release()` and `lock()`
      Relayer listens to this event
   */
   event Transfer(
       address from,
       address to,
       uint amount,
       uint time,
       uint nonce,
       Step indexed step
   );

   /* Modifier to allow some functions to be only called by admin */
   modifier onlyAdmin() {
       require(msg.sender == admin, "only admin");
       _;
   }

   /* Constructor that sets admin as the sender and initializes the ERC20 token inside contract */
   constructor(address _token) {
       admin = msg.sender;
       avaxToken = IERC20(_token);
   }

   /* Function to allow setting new admin */
   function setAdmin(address newAdmin) external onlyAdmin {
       admin = newAdmin;
   }

   /* Function that is called by the relayer to release some tokens after it is burned on the subnet */
   function release(
       address to,
       uint amount,
       uint subnetNonce
   ) external onlyAdmin {
       require(
           processedNonces[subnetNonce] == false,
           "nonce already processed"
       );
       processedNonces[subnetNonce] = true;

       /* Bridge sends locked tokens to the `to` address therefore, releases the tokens */
       avaxToken.transfer(to, amount);

       emit Transfer(
           msg.sender,
           to,
           amount,
           block.timestamp,
           subnetNonce,
           Step.Release
       );
   }

   /* Function that is called by the user to lock their tokens.
      Relayer listens to this event and if the nonce is not processed,
      it will `mint()` of the SubnetBridge
    */
   function lock(address to, uint amount) external {
       /* Send ERC20 tokens from msg.send (user) to bridge to lock the tokens */
       /* Do not forget: sender should approve bridge address to do this */
       avaxToken.transferFrom(msg.sender, address(this), amount);

       /* Event that is emitted for relayer to process */
       emit Transfer(
           msg.sender,
           to,
           amount,
           block.timestamp,
           nonce,
           Step.Lock
       );
       /* Increment the nonce to prevent double counting */
       nonce++;
   }
}
```

#### Subnet Bridge

Create `SubnetBridge.sol` file inside `Bridge` folder

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../Token/INativeMinter.sol";

contract SubnetBridge {
   address public admin;
   /* Address to send tokens to burn them */
   address public burnAddress = address(0x0);
   /* Increments with each `lock()` indicates the transferCount
    and prevents double counting of the event */
   uint public nonce;

   /* Contract that represents NativeMinterInterface */
   NativeMinterInterface public nativeMinter =
       NativeMinterInterface(
           /* Native Minter contract is always at this address
           as explained at https://docs.avax.network/subnets/customize-a-subnet#minting-native-coins
           */
           address(0x0200000000000000000000000000000000000001)
       );

   /* Mapping to hold processed nonce values */
   mapping(uint => bool) public processedNonces;

   /* Allows us to indicate whether it is a `mint()` or `burn()` when emitting an event */
   enum Step {
       Mint,
       Burn
   }

   /* Event that is emitted with both `release()` and `lock()`
      Relayer listens to this event
   */
   event Transfer(
       address from,
       address to,
       uint amount,
       uint time,
       uint nonce,
       Step indexed step
   );

   /* Modifier to allow some functions to be only called by admin */
   modifier onlyAdmin() {
       require(msg.sender == admin, "only admin");
       _;
   }

   /* Constructor that sets admin as the sender */
   constructor() {
       admin = msg.sender;
   }

   /* Function to allow setting new admin */
   function setAdmin(address newAdmin) external onlyAdmin {
       admin = newAdmin;
   }

   /* Function that is called by the relayer to mint some tokens after it is locked on the avax */
   function mint(
       address to,
       uint amount,
       uint avaxNonce
   ) external onlyAdmin {
       require(
           processedNonces[avaxNonce] == false,
           "nonce already processed"
       );
       processedNonces[avaxNonce] = true;

       nativeMinter.mintNativeCoin(to, amount);
       emit Transfer(
           msg.sender,
           to,
           amount,
           block.timestamp,
           avaxNonce,
           Step.Mint
       );
   }

   /* Function that is called by the user to burn their tokens.
      Relayer listens to this event and if the nonce is not processed,
      it will call `release()` of the AvaxBridge
    */
   function burn(address to) external payable {
       require(msg.value > 0, "You have to burn more than 0 tokens");
       /* Send native token to 0x0 address, effectively burning native token */
       (bool sent, ) = payable(burnAddress).call{value: msg.value}("");
       require(sent, "Failed to send native token");

       /* Event that is emitted for relayer to process */
       emit Transfer(
           msg.sender,
           to,
           msg.value,
           block.timestamp,
           nonce,
           Step.Burn
       );

       /* Increment the nonce to prevent double counting */
       nonce++;
   }
}
```

### Compile Contracts

To make sure there are no problems with contracts, run:

```bash
npx hardhat compile
```

## Interact with Contracts

### Constants

First we will create a `constants` folder at the root of the project to store some general values.

Inside `constants` folder create; `chains.js` and `nativeMinterAddress.js`.

chains.js

```js
module.exports = {
   avax: {
       chainId: 43113,
       rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
   },
   subnet: {
       chainId: <your-subnet-chain-id>,
       rpcUrl:
           "<your-subnet-rpc-url>",
   },
};
```

nativeMinterAddress.js

```js
module.exports = {
	SUBNET_NATIVE_MINTER_ADDRESS: "0x0200000000000000000000000000000000000001",
};
```

### Variables

Secondly we will create a `variables` folder at the root of the project to store some updated values such as contract address.

Inside the `variables` folder create `contractAddresses.js` but do not put anything in it. This file will be auto generated whenever we deploy some contracts.

### Utils

Then we will create a `utils` folder at the root of the project to define some general use functions.

Inside `utils` folder create; `initProviders.js`, `initSigners.js` and `initContracts.js`

initProviders.js

```js
const { ethers } = require("ethers");
const chains = require("../constants/chains");

module.exports = () => {
	/* Create providers for both chains */
	const avaxProvider = new ethers.providers.JsonRpcProvider(chains.avax.rpcUrl);
	const subnetProvider = new ethers.providers.JsonRpcProvider(
		chains.subnet.rpcUrl
	);
	return { avax: avaxProvider, subnet: subnetProvider };
};
```

initSigner.js

```js
const { ethers } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (providers) => {
	/* Since we will have a bridge admin account to deploy and interact with bridges
   and a user account that is using the bridge.
   We have 2 different accounts to interact with bridges on 2 different chains
   Therefore, we have to create 4 wallet
   */
	const avaxBridgeAdmin = new ethers.Wallet(
		process.env.BRIDGE_ADMIN_PRIVATE_KEY,
		providers.avax
	);
	const avaxBridgeUser = new ethers.Wallet(
		process.env.BRIDGE_USER_PRIVATE_KEY,
		providers.avax
	);
	const subnetBridgeAdmin = new ethers.Wallet(
		process.env.BRIDGE_ADMIN_PRIVATE_KEY,
		providers.subnet
	);
	const subnetBridgeUser = new ethers.Wallet(
		process.env.BRIDGE_USER_PRIVATE_KEY,
		providers.subnet
	);
	return {
		avax: { bridgeAdmin: avaxBridgeAdmin, user: avaxBridgeUser },
		subnet: { bridgeAdmin: subnetBridgeAdmin, user: subnetBridgeUser },
	};
};
```

**ALERT**

> As you see, we have used `process.env.<..._PRIVATE_KEY>`. Reason behind that is we do not want to expose our private keys inside our code. To use this, first you have to run `npm i dotenv` to install the related package. At the root of the project create a file named `.env`. Afterwards put in the private keys of your accounts as follows,

```bash
BRIDGE_ADMIN_PRIVATE_KEY=<private-key-for-admin>
BRIDGE_USER_PRIVATE_KEY=<private-key-for-user>
```

- Make sure that both accounts are funded on both chains so that they can send transactions.
- Make sure that `.env` file is included in your `.gitignore` file so that you do not upload this file to git.

**ALERT**

initContracts.js

```js
const { ethers } = require("ethers");
/* Get ABIs of the contracts directly from the artifact folder created by hardhat after each compilation */
const SUBNET_BRIDGE_ABI =
	require("../artifacts/contracts/Bridge/SubnetBridge.sol/SubnetBridge").abi;
const AVAX_BRIDGE_ABI =
	require("../artifacts/contracts/Bridge/AvaxBridge.sol/AvaxBridge").abi;
/* Currently we did not deploy our contracts but when we deploy them we will store them in the following file */
const {
	AVAX_BRIDGE_ADDRESS,
	SUBNET_BRIDGE_ADDRESS,
} = require("../variables/contractAddresses");

module.exports = (signers) => {
	/* AvaxBridge contract with signer access of bridgeAdmin */
	const avaxBridgeAdmin = new ethers.Contract(
		AVAX_BRIDGE_ADDRESS,
		AVAX_BRIDGE_ABI,
		signers.avax.bridgeAdmin
	);
	/* SubnetBridge contract with signer access of bridgeAdmin */
	const subnetBridgeUser = new ethers.Contract(
		SUBNET_BRIDGE_ADDRESS,
		SUBNET_BRIDGE_ABI,
		signers.subnet.user
	);
	/* SubnetBridge contract with signer access of user */
	const subnetBridgeAdmin = new ethers.Contract(
		SUBNET_BRIDGE_ADDRESS,
		SUBNET_BRIDGE_ABI,
		signers.subnet.bridgeAdmin
	);
	/* AvaxBridge contract with signer access of user */
	const avaxBridgeUser = new ethers.Contract(
		AVAX_BRIDGE_ADDRESS,
		AVAX_BRIDGE_ABI,
		signers.avax.user
	);

	return {
		avax: { admin: avaxBridgeAdmin, user: avaxBridgeUser },
		subnet: { admin: subnetBridgeAdmin, user: subnetBridgeUser },
	};
};
```

### Scripts

We could directly create the off-chain relayer but it would be too hard to test it. Therefore, we are creating these helper scripts to quickly interact with contracts and test if relayer works as expected.

We are using [Hardhat Tasks](https://hardhat.org/guides/create-task) to run our scripts in this tutorial. We will be writing the script, updating the `hardhat.config.js` to add our new script as a hardhat task.

#### Deploy script

##### Write deploy script

Create `deploy.js` file inside `scripts` folder

deploy.js

```js
const fs = require("fs");
const { ethers } = require("ethers");
const dotenv = require("dotenv");

/* Get NativeMinter address from constants */
const {
	SUBNET_NATIVE_MINTER_ADDRESS,
} = require("../constants/nativeMinterAddress");

/* Get ABIs of the contracts directly from the artifact folder created by hardhat after each compilation */
/* Get bytecodes of the contracts directly from the artifact folder created by hardhat after each compilation */
const AVAX_TOKEN_BYTECODE =
	require("../artifacts/contracts/Token/AvaxToken.sol/AvaxToken").bytecode;
const AVAX_TOKEN_ABI =
	require("../artifacts/contracts/Token/AvaxToken.sol/AvaxToken").abi;
const AVAX_BRIDGE_BYTECODE =
	require("../artifacts/contracts/Bridge/AvaxBridge.sol/AvaxBridge").bytecode;
const AVAX_BRIDGE_ABI =
	require("../artifacts/contracts/Bridge/AvaxBridge.sol/AvaxBridge").abi;
const SUBNET_BRIDGE_BYTECODE =
	require("../artifacts/contracts/Bridge/SubnetBridge.sol/SubnetBridge").bytecode;
const SUBNET_BRIDGE_ABI =
	require("../artifacts/contracts/Bridge/SubnetBridge.sol/SubnetBridge").abi;
const SUBNET_NATIVE_MINTER_ABI =
	require("../artifacts/contracts/Token/INativeMinter.sol/NativeMinterInterface").abi;

/* Get needed util functions */
const initProviders = require("../utils/initProviders");
const initSigners = require("../utils/initSigners");
dotenv.config();

/* Deploy script that allow us to deploy:
           AvaxToken, AvaxBridge, SubnetBridge contract
And set SubnetBridge contract as a `Minter` for the NativeMinter precompile */
module.exports = deploy = async () => {
	const providers = initProviders();
	const signers = initSigners(providers);

	/* Deploy AvaxToken it gives the total supply of the token to the msg.sender
   (which is the user that will bridge in our case) */
	const AvaxTokenFactory = new ethers.ContractFactory(
		AVAX_TOKEN_ABI,
		AVAX_TOKEN_BYTECODE,
		signers.avax.user
	);
	const avaxToken = await AvaxTokenFactory.deploy("MyErc20", "MERC20");
	await avaxToken.deployTransaction.wait();
	console.log("avax token deployed to: ", avaxToken.address);

	/* Deploy AvaxBridge it makes msg.sender the admin of the bridge
   (which is the bridgeAdmin signer) */
	const AvaxBridgeFactory = new ethers.ContractFactory(
		AVAX_BRIDGE_ABI,
		AVAX_BRIDGE_BYTECODE,
		signers.avax.bridgeAdmin
	);
	const avaxBridge = await AvaxBridgeFactory.deploy(avaxToken.address);
	await avaxBridge.deployTransaction.wait();
	console.log("avax bridge deployed to: ", avaxBridge.address);

	/* Deploy SubnetBridge it makes msg.sender the admin of the bridge
   (which is the bridgeAdmin signer)*/
	const SubnetBridgeFactory = new ethers.ContractFactory(
		SUBNET_BRIDGE_ABI,
		SUBNET_BRIDGE_BYTECODE,
		signers.subnet.bridgeAdmin
	);
	const subnetBridge = await SubnetBridgeFactory.deploy();
	await subnetBridge.deployTransaction.wait();
	console.log("subnet bridge deployed to: ", subnetBridge.address);

	/* Give `Minter` role to SubnetBridge contract so that it can mint native token */
	const nativeMinter = new ethers.Contract(
		SUBNET_NATIVE_MINTER_ADDRESS,
		SUBNET_NATIVE_MINTER_ABI,
		signers.subnet.bridgeAdmin
	);
	const setNativeMinterTx = await nativeMinter.setEnabled(subnetBridge.address);
	await setNativeMinterTx.wait();
	console.log("allowed subnet bridge to mint native coins");

	/* Whenever we run this deploy script, deployed contract addresses will be changed.
   Rather than manually updating them we write the updated address to the `variables/contractAddress.js`
   Inside our code, whenever we try to access the address of a file we use this file as the source of truth.
   */
	fs.writeFileSync(
		"variables/contractAddresses.js",
		`module.exports = {
           AVAX_TOKEN_ADDRESS: "${avaxToken.address}",
           AVAX_BRIDGE_ADDRESS: "${avaxBridge.address}",
           SUBNET_BRIDGE_ADDRESS: "${subnetBridge.address}",
       }`
	);
	console.log(
		"updated contract addresses inside variables/contractAddresses.js"
	);
};
```

##### Update hardhat.config.js file

To add `deploy` script as a hardhat task add following code inside `hardhat.config.js`

```js
/* Import task from hardhat config */
const { task } = require("hardhat/config");
/* Import deploy function */
require("./scripts/deploy");
...
/* Crete deploy task */
task(
   "deploy",
   "Deploy bridges on both networks and deploy AvaxToken, also update the admins"
).setAction(async (taskArgs, hre) => {
   await deploy().catch((error) => {
       console.error(error);
       process.exitCode = 1;
   });
});
...
```

After adding the task and removing unnecessary parts, your `hardhat.config.js` should look similar to following:

```js
const { task } = require("hardhat/config");
require("@nomiclabs/hardhat-waffle");
require("./scripts/deploy");

task(
	"deploy",
	"Deploy bridges on both networks and deploy AvaxToken, also update the admins"
).setAction(async (taskArgs, hre) => {
	await deploy().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
});

module.exports = {
	solidity: "0.8.7",
};
```

##### Run deploy script

To run our deploy script, run:

```bash
npx hardhat deploy
```

After running the script you should see deployed contract addresses on the command line and updated `variables/contractAddresses.js` file.

#### Balance script

##### Write balance script

Create `balance.js` file inside `scripts` folder

balance.js

```js
const { ethers } = require("ethers");
const dotenv = require("dotenv");

const chains = require("../constants/chains");
/* Get contract addresses from the file we generated by running the deploy script */
const {
	AVAX_TOKEN_ADDRESS,
	AVAX_BRIDGE_ADDRESS,
} = require("../variables/contractAddresses");
/* Get ABIs of the contracts directly from the artifact folder created by hardhat after each compilation */
const AVAX_TOKEN_ABI =
	require("../artifacts/contracts/Token/AvaxToken.sol/AvaxToken").abi;
dotenv.config();

/* Balance script that allows us to check balances on both chains
  On Avax it prints out the ERC20 balance of the user and the bridge.
       (We are printing out the balance of the bridge because as users lock tokens bridge's balance of the ERC20 will increase)
    On Subnet it prints out the native token balance of the user
*/
module.exports = balance = async (from) => {
	let provider;
	let signer;
	let contract;
	/* This script takes command line argument to indicate which chain we are using */
	if (from === "avax") {
		/* Initialize; provider, signer and contract */
		provider = new ethers.providers.JsonRpcProvider(chains.avax.rpcUrl);
		signer = new ethers.Wallet(process.env.BRIDGE_USER_PRIVATE_KEY, provider);
		contract = new ethers.Contract(AVAX_TOKEN_ADDRESS, AVAX_TOKEN_ABI, signer);
		/* Get ERC20 balance of the user */
		const newUserBalance = await contract.balanceOf(signer.address);
		/* Get ERC20 balance of the bridge */
		const newBridgeBalance = await contract.balanceOf(AVAX_BRIDGE_ADDRESS);
		console.log(
			"MERC20 balance of the user: ",
			ethers.utils.formatEther(newUserBalance)
		);
		console.log(
			"MERC20 balance of the bridge: ",
			ethers.utils.formatEther(newBridgeBalance)
		);
	} else if (from === "subnet") {
		/* Initialize; provider, signer */
		provider = new ethers.providers.JsonRpcProvider(chains.subnet.rpcUrl);
		signer = new ethers.Wallet(process.env.BRIDGE_USER_PRIVATE_KEY, provider);
		/* Get native token balance of the user */
		const balance = await signer.getBalance();
		console.log(
			"Native token balance on Subnet: ",
			ethers.utils.formatEther(balance)
		);
	} else {
		return;
	}
};
```

##### Update hardhat.config.js file

To add `balance` script as a hardhat task add the following code inside `hardhat.config.js`

```js
/* Import task from hardhat config */
const { task } = require("hardhat/config");
...
/* Import balance function */
require("./scripts/balance");
...
/* Create balance task  */
task("balance", "Get token balance from a network")
   /* Add `from` parameter indication the used network which is either avax or subnet */
   .addParam("from", "Network to get balance from")
   .setAction(async (taskArgs, hre) => {
       await balance(taskArgs.from).catch((error) => {
           console.error(error);
           process.exitCode = 1;
       });
   });
...
```

##### Run balance script

To run our balance script, run:

```bash
npx hardhat balance --from avax
```

or

```bash
npx hardhat balance --from subnet
```

After running the script you should see balances printed out in the comman line. If you have used `--from subnet` you will only see the native token balance of the user. If you have used `--from avax` you will see the ERC20 balances of both user and the bridge contract.

Balance value seen on the subnet depends on how you have funded your address. But balance values on avax should look like the following:

```
MERC20 balance of the user:  1000000.0
MERC20 balance of the bridge:  0.0
```

#### BurnOrLock script

##### Write burnOrLock script

Create `burnOrLock.js` file inside `scripts` folder

burnOrLock.js

```js
const { ethers } = require("ethers");
const dotenv = require("dotenv");

const chains = require("../constants/chains");
/* Get contract addresses from the file we generated by running the deploy script */
const {
	AVAX_BRIDGE_ADDRESS,
	AVAX_TOKEN_ADDRESS,
	SUBNET_BRIDGE_ADDRESS,
} = require("../variables/contractAddresses");
/* Get ABIs of the contracts directly from the artifact folder created by hardhat after each compilation */
const SUBNET_BRIDGE_ABI =
	require("../artifacts/contracts/Bridge/SubnetBridge.sol/SubnetBridge").abi;
const AVAX_BRIDGE_ABI =
	require("../artifacts/contracts/Bridge/AvaxBridge.sol/AvaxBridge").abi;
const AVAX_TOKEN_ABI =
	require("../artifacts/contracts/Token/AvaxToken.sol/AvaxToken").abi;
dotenv.config();

/* BurnOrLock script that allows us to both burn and lock tokens
   On Avax it allows us to lock ERC20 tokens
   On Subnet it allows us to burn native tokens
*/
module.exports = burnOrLock = async (from, amount) => {
	let provider;
	let signer;
	let bridgeContract;
	/* This script takes command line argument to indicate which chain we are using */
	if (from === "avax") {
		/* Initialize; provider, signer and tokenContract */
		provider = new ethers.providers.JsonRpcProvider(chains.avax.rpcUrl);
		signer = new ethers.Wallet(process.env.BRIDGE_USER_PRIVATE_KEY, provider);
		const tokenContract = new ethers.Contract(
			AVAX_TOKEN_ADDRESS,
			AVAX_TOKEN_ABI,
			signer
		);

		/* Approve bridge to use the token of the sender before trying to lock tokens */
		const approveTx = await tokenContract.approve(
			AVAX_BRIDGE_ADDRESS,
			ethers.utils.parseEther(amount)
		);
		await approveTx.wait();

		/* Initialize bridgeContract  */
		bridgeContract = new ethers.Contract(
			AVAX_BRIDGE_ADDRESS,
			AVAX_BRIDGE_ABI,
			signer
		);

		/* User locks ERC20 tokens to the bridge */
		const lockTx = await bridgeContract.lock(
			signer.address,
			ethers.utils.parseEther(amount)
		);
		const minedTx = await lockTx.wait();

		console.log("Successfully locked amount on avax: ", amount);
		console.log("At block: ", minedTx.blockNumber);
		/* Get user's ERC20 balance after lock */
		const newUserBalance = await tokenContract.balanceOf(signer.address);
		/* Get bridge's ERC20 balance after lock */
		const newBridgeBalance = await tokenContract.balanceOf(AVAX_BRIDGE_ADDRESS);
		console.log(
			"Updated balance of user after burn: ",
			ethers.utils.formatEther(newUserBalance)
		);
		console.log(
			"Updated balance of bridge after burn: ",
			ethers.utils.formatEther(newBridgeBalance)
		);
	} else if (from === "subnet") {
		/* Initialize; provider, signer and tokenContract */
		provider = new ethers.providers.JsonRpcProvider(chains.subnet.rpcUrl);
		signer = new ethers.Wallet(process.env.BRIDGE_USER_PRIVATE_KEY, provider);
		bridgeContract = new ethers.Contract(
			SUBNET_BRIDGE_ADDRESS,
			SUBNET_BRIDGE_ABI,
			signer
		);
		/* User burns native tokens */
		const burnTx = await bridgeContract.burn(signer.address, {
			value: ethers.utils.parseEther(amount),
		});
		await burnTx.wait();
		console.log("Successfully burned amount on subnet: ", amount);

		/* Get user's native token balance after burn */
		const newUserBalance = await signer.getBalance();
		console.log(
			"Updated balance of user after burn: ",
			ethers.utils.formatEther(newUserBalance)
		);
	} else {
		return;
	}
};
```

##### Update hardhat.config.js file

To add `burnOrLock` script as a hardhat task add the following code inside `hardhat.config.js`

```js
/* Import task from hardhat config */
const { task } = require("hardhat/config");
...
/* Import burnOrLock function */
require("./scripts/burnOrLock");
...
/* Create burnOrRelease task  */
task("burnOrLock", "Burn or lock token from a network")
   /* Add `from` parameter indication the used network which is either avax or subnet */
   .addParam("from", "Network to burn or lock from")
   /* Add `amount` parameter indication the amount to burn or lock */
   .addParam("amount", "Amount to burn or lock in ethers")
   .setAction(async (taskArgs, hre) => {
       await burnOrLock(taskArgs.from, taskArgs.amount).catch((error) => {
           console.error(error);
           process.exitCode = 1;
       });
   });
...
```

##### Run burnOrRelease script

To run burnOrRelease script, run:

```bash
npx hardhat burnOrLock --from avax --amount <amount-of-token-to-burn-or-lock-in-ether>
```

or

```bash
npx hardhat burnOrLock --from subnet --amount <Example value: 4>
```

**ALERT**

> When you try to run the first script `... --from avax --amount 10` if the user has 10 ERC20 tokens it will work fine and you will see the updated balances as expected on avax network. User’s decremented by 10, bridge’s incremented by 10. But you would not see that the user's native token balance on the subnet is increased. Although there are bridge contracts, there is no relayer application to establish the communication in between them. Therefore, the user locked its tokens but its balance on the subnet did not change. It is the same for the second script where the user burns tokens on subnet but does not get any new tokens on avax c-chain. Be aware, if the user account does not have native token balance on the subnet, the second script would throw an error.

**ALERT**

## Create the Relayer Application

Create a `relayer.js` file at root folder of the project.

relayer.js

```js
const { ethers } = require("ethers");
const dotenv = require("dotenv");

/* Get needed util functions */
const initProviders = require("./utils/initProviders");
const initSigners = require("./utils/initSigners");
const initContracts = require("./utils/initContracts");

dotenv.config();

/* Relayer application
 
Could be run by
   `node ./relayer.js`,
   `node ./relayer.js <avaxBlockNumber>`,
   `node ./relayer.js <avaxBlockNumber> <subnetBlockNumber>`,
   `node ./relayer.js -1 <subnetBlockNumber>`
 
When run with `node ./relayer.js`:
   Relayer will subscribe to events from recent blocks on Avax and Subnet
   Therefore, it might not processes an event that is emitted 1000 blocks ago
   If you want to start the relayer and make a transaction, current way of running is what you are looking for
 
When run with `node ./relayer.js <avaxBlockNumber> <subnetBlockNumber>`
   Relayer will look for events on Avax and Subnet from the block number you provided
   and will iterate through the next 10 blocks for the event. Will processes observed event
   Therefore, if you have a burn or lock event emitted 1000 blocks ago, you can process it by giving the right blockNumber
   If you want to start the relayer to processes an old burn or lock event, current way of running is what you are looking for
 
When run with `node ./relayer.js -1 <subnetBlockNumber>` or `node ./relayer.js <avaxBlockNumber>`
   Relayer will look for events on either Avax or Subnet from the block number you provided
   and will iterate through the next 10 blocks for the event. Will processes observed event
   "-1" as block number means do not process any old blocks for that chain.
   Therefore, `node ./relayer.js -1 <subnetBlockNumber>` will only process events for the subnet.
   If you want to start the relayer to process an old burn or lock event just on one chain, current way of running is what you are looking for
*/
const main = async () => {
	/* If there is a need for sending transactions
       Add it to the txs array.
       Because of the `setInterval()` relayer will send transactions every 5 seconds if at least 1 transaction exists
       We wait 5 seconds in between transactions to make sure we do not replace our own transactions before they are mined.
   */
	let txs = [];

	/* Init providers, signer and bridgeContract */
	const providers = initProviders();
	const signers = initSigners(providers);
	const bridgeContracts = initContracts(signers);

	/* For Avax
       Relayer gets command line arguments
       If command line argument exists and it is not -1
       Then process next 10 blocks and process events from these block number
   */
	if (process.argv[2] && parseInt(process.argv[2]) !== -1) {
		const startBlock = parseInt(process.argv[2]);
		const recentBlock = await providers.avax.getBlockNumber();
		/* If startBlock + 10 exceeds the recent block it would throw an error.
           Since we would be trying to process blocks that are not there.
           Therefore, we set endBlock to the smaller one of two
       */
		const endBlock =
			startBlock + 10 >= recentBlock ? recentBlock : startBlock + 10;
		/* Reset blockNumber of the provider to process those blocks */
		providers.avax.resetEventsBlock(startBlock);
		/* Create new bridge contract instance because provider is changed */
		const localBridgeContracts = initContracts(signers);
		/* Filter events for "Transfer" event */
		const filter = localBridgeContracts.avax.admin.filters.Transfer();
		/* Query contract for old events in between startBlock and endBlock with given filter */
		let oldAvaxEvents = await localBridgeContracts.avax.admin.queryFilter(
			filter,
			startBlock,
			endBlock
		);
		/* Format oldEvents as if they are transactions */
		oldAvaxEvents = oldAvaxEvents.map((event) => ({
			chain: "subnet",
			to: event.args.to,
			amount: event.args.amount,
			nonce: event.args.nonce,
		}));

		/* Since we are looking for old events
           They might have been already processed
           Therefore, check if corresponding nonce is already processed or not
           If not, add it to the txs array
       */
		await Promise.all(
			oldAvaxEvents.map(async (event) => {
				const { to, amount, nonce } = event;
				console.log("OLD: Lock happened on avax");
				console.log(
					`OLD: Transfer: to: ${to},  amount: ${ethers.utils.formatEther(
						amount
					)}, nonce: ${nonce}`
				);
				/* Check if nonce is processed or not */
				const isProcessed =
					await localBridgeContracts.subnet.admin.processedNonces(nonce);
				if (!isProcessed) {
					/* If not processed add tx to txs array */
					console.log("OLD: is not processed, will mint on subnet\n");
					txs.push(event);
				} else {
					console.log("OLD: is already processed\n");
				}
			})
		);
	}

	// Pretty familiar as above, provider is changed
	/* For Subnet
       Relayer gets command line arguments
       If command line argument exists and it is not -1
       Then process next 10 blocks and process events from these block number
   */
	if (process.argv[3] && parseInt(process.argv[3]) !== -1) {
		const startBlock = parseInt(process.argv[3]);
		const recentBlock = await providers.subnet.getBlockNumber();
		/* If startBlock + 10 exceeds the recent block it would throw an error.
           Since we would be trying to process blocks that are not there.
           Therefore, we set endBlock to the smaller one of two
       */
		const endBlock =
			startBlock + 10 >= recentBlock ? recentBlock : startBlock + 10;
		/* Reset blockNumber of the provider to process those blocks */
		providers.subnet.resetEventsBlock(startBlock);
		/* Create new bridge contract instance because provider is changed */
		const localBridgeContracts = initContracts(signers);
		/* Filter events for "Transfer" event */
		const filter = localBridgeContracts.subnet.admin.filters.Transfer();
		/* Query contract for old events in between startBlock and endBlock with given filter */
		let oldSubnetEvents = await localBridgeContracts.subnet.admin.queryFilter(
			filter,
			startBlock,
			endBlock
		);
		/* Format oldEvents as if they are transactions */
		oldSubnetEvents = oldSubnetEvents.map((event) => ({
			chain: "avax",
			to: event.args.to,
			amount: event.args.amount,
			nonce: event.args.nonce,
		}));

		/* Since we are looking for old events
           They might have been already processed
           Therefore, check if corresponding nonce is already processed or not
           If not, add it to the txs array
       */
		await Promise.all(
			oldSubnetEvents.map(async (event) => {
				const { to, amount, nonce } = event;
				console.log("OLD: Burned happened on subnet");
				console.log(
					`OLD: Transfer: to: ${to},  amount: ${ethers.utils.formatEther(
						amount
					)}, nonce: ${nonce}`
				);
				/* Check if nonce is processed or not */
				const isProcessed =
					await localBridgeContracts.subnet.admin.processedNonces(nonce);
				if (!isProcessed) {
					/* If not processed add tx to txs array */
					console.log("OLD: is not processed, will release on subnet\n");
					txs.push(event);
				} else {
					console.log("OLD: is already processed\n");
				}
			})
		);
	}

	/* With above 2 functions we have processed old blocks */
	console.log("\n\nOld events processed");

	/* Now we subscribe to bridgeContract events on both chains
       Which allows us to run a function whenever a new event is observed
   */

	/* Subscribe to bridge events on avax */
	bridgeContracts.avax.admin.on(
		/* Subscribe to "Transfer" event */
		"Transfer",
		async (from, to, amount, date, nonce, step) => {
			/*
               step 0 means it is a release event
               step 1 means it is a lock event
 
               We only care for lock events as relayer. On lock events we will mint on subnet
               We have added the release event for frontend applications.
           */
			if (step === 1) {
				console.log("Lock happened on avax");
				console.log(
					`Transfer: from: ${from}, to: ${to}, amount: ${ethers.utils.formatEther(
						amount
					)}, date: ${date}, nonce: ${nonce}, step: ${step}`
				);
				/* Check if nonce is processed or not */
				const isProcessed = await bridgeContracts.subnet.admin.processedNonces(
					nonce
				);
				if (!isProcessed) {
					/* If not processed add tx to txs array */
					console.log("is not processed, will mint on subnet\n");
					txs.push({ chain: "subnet", to, amount, nonce });
				} else {
					console.log("is already processed\n");
				}
			}
		}
	);

	/* Subscribe to bridge events on subnet */
	bridgeContracts.subnet.admin.on(
		/* Subscribe to "Transfer" event */
		"Transfer",
		async (from, to, amount, date, nonce, step) => {
			/*
               step 0 means it is a mint event
               step 1 means it is a burn event
 
               We only care for burn events as relayer. On burn events we will release on subnet
               We have added the mint event for frontend applications.
           */
			if (step === 1) {
				console.log("Burn happened on subnet");
				console.log(
					`Transfer: from: ${from}, to: ${to}, amount: ${ethers.utils.formatEther(
						amount
					)}, date: ${date}, nonce: ${nonce}, step: ${step}`
				);
				/* Check if nonce is processed or not */
				const isProcessed = await bridgeContracts.avax.admin.processedNonces(
					nonce
				);
				if (!isProcessed) {
					/* If not processed add tx to txs array */
					console.log("is not processed, will release on avax\n");
					txs.push({ chain: "avax", to, amount, nonce });
				} else {
					console.log("is already processed\n");
				}
			}
		}
	);
	console.log("Started listening for new events\n\n");

	/* This function gets to run each 5 seconds and it sends `mint` or `release` transactions to the bridge contract
       We wait 5 seconds in between transactions to make sure we do not replace our own transactions before they are mined.
   */
	setInterval(async () => {
		/* If there is not transactions to send do nothing */
		if (txs.length > 0) {
			/* If provided blockNumbers for avax or subnet are close to current blocks of the chains
            Then a transaction might get added to the txs array twice. Once processing old blocks (but pretty recent) and once subscribed to new events.
            */
			txs = txs.filter(
				(value, index, self) =>
					index ===
					self.findIndex(
						(t) => t.place === value.place && t.name === value.name
					)
			);
			console.log("txs: ", txs);
			let tx;
			/* Remove the first element from the array and destructure it */
			const { chain, to, amount, nonce } = txs.shift();
			/* Check which chain the transaction will be sent to  */
			if (chain === "avax") {
				/* Call `release()` on avax */
				tx = await bridgeContracts[chain].admin.release(to, amount, nonce);
			} else if (chain === "subnet") {
				/* Call `mint()` on subnet */
				tx = await bridgeContracts[chain].admin.mint(to, amount, nonce);
			} else return;
			await tx.wait();
			console.log("transaction processed, token minted or released");
		}
	}, 5000);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
```

### Running the Relayer

As you can also see from the comments of the relayer file. There are different ways to start the relayer application

- Different ways of running

- ```bash
  node ./relayer.js
  ```

  - When run with `node ./relayer.js`:
    Relayer will subscribe to events from recent blocks on Avax and Subnet
    Therefore, it might not processes an event that is emitted 1000 blocks ago
    If you want to start the relayer and make a transaction, current way of running is what you are looking for

- ```bash
  node ./relayer.js <avaxBlockNumber> <subnetBlockNumber>
  ```

  - When run with `node ./relayer.js <avaxBlockNumber> <subnetBlockNumber>`
    Relayer will look for events on Avax and Subnet from the block number you provided
    and will iterate through the next 10 blocks for the event. Will processes observed event
    Therefore, if you have a burn or lock event emitted 1000 blocks ago, you can process it by giving the right blockNumber
    If you want to start the relayer to processes an old burn or lock event, current way of running is what you are looking for

- ```bash
  node ./relayer.js <avaxBlockNumber>
  ```

- ```bash
  node ./relayer.js -1 <subnetBlockNumber>
  ```

  - When run with `node ./relayer.js <avaxBlockNumber>` or `node ./relayer.js -1 <subnetBlockNumber>`
    Relayer will look for events on either Avax or Subnet from the block number you provided
    and will iterate through the next 10 blocks for the event. Will processes observed event
    "-1" as block number means do not process any old blocks for that chain.
    Therefore, `node ./relayer.js -1 <subnetBlockNumber>` will only process events for the subnet.
    If you want to start the relayer to process an old burn or lock event just on one chain, current way of running is what you are looking for

### Testing the relayer

#### Test relayer

In this video on the left terminal I am using our custom scripts to interact with chains and on the right terminal I am using our relay to create the cross chain communication.

https://user-images.githubusercontent.com/65618011/177062973-b6561d79-79df-47af-ae3e-5368ab38e1c0.mov

##### What happens on the video?

- Check balances on both chains
- Start the relayer
- An already processed event appears on the console of the relayer therefore it does not get processed
- Check the balances to make sure already processed event is not processed
- Lock 20 ERC20s token from avax and see the updated balances of user and the bridge on avax
- Relayer observes the transaction and sends a transaction to mint native tokens on subnet
- Check the balances on both subnet and avax. As expected our subnet native token balance increases by 20
- Burn 5 native tokens from subnet and see the updated balance of the user
- Relayer observers the transaction and sends a transaction to release ERC20 tokens on avax
- Check balance on both subnet and avax. As expected our ERC20 balance increases by 5 and bridge's decreases by 5

#### Test relayer for old events

https://user-images.githubusercontent.com/65618011/177063396-d5f42da1-8224-42bd-bff7-0086e963fcb9.mov

##### What happens on the video?

- Start by a lock transaction from avax with amount 40. As stated in the video this transaction was sent when the relayer was not working. Therefore, it is not processed and it will not be processed when we start the relayer with `node relayer.js` because there has been many blocks after it
- Check balances on both chains
- Start the relayer with `node relayer.js` to show that the event is not getting processed. Printed events are events that happened on the subnet. Since there is no blocks building on my local subnet other than my own, my old burns are considered old and therefore shown
- Start the relayer with `node relayer.js <blockNumber>` to show that event will be processed and will be printed as "OLD: "
- Check balances on both chains to confirm that old lock event on avax has been processed by relayer and tokens have been minted on avax

### Troubleshoot Common Issues

Things to check out;

- Error while compiling contracts
  - You have updated the compiler version to 0.8.7 from harhat.config.js.
  - You have run `npm i @openzeppelin/contracts`.
- Error while running scripts
  - Both accounts on both chains have some native token so that they can send transactions.
  - Folder structures and file names are as suggested. In our scripts we access the contract abis and bytecodes directly from the files that are created by hardhat. Those files are created according to your file structure and if you changed the structure, imports might fail.
  - You have your private keys inside the .env file and you have downloaded dotenv package by running `npm i dotenv`.
  - Your subnet has NativeMinter precompile with bridgeAdmin account as the admin.
  - You have created a contractAddresses.js file inside the variables folder. If you did not create this file, deploy.js would fail.

## Conclusion

Congratulations! You have created a bridge between avax C-chain and your subnet to use an ERC-20 token as a gas token.

Things achieved:

- Understood general design of bridges.
- Implemented bridge contracts.
- Used NativeMinter precompile.
- Created a relayer application to communicate with both chains.
- Tested relayer to make sure communication between chains are established.
- Used ERC-20 token as the gas token on the subnet.

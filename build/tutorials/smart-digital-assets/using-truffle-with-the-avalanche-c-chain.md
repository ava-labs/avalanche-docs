# Using Truffle with the Avalanche C-Chain

## Introduction

[Truffle Suite](https://www.trufflesuite.com) is a toolkit for launching Dapps on the EVM. With Truffle you can write and compile smart contracts, build artifacts, run migrations and interact with your deployed contracts. This tutorial illustrates how Truffle can be used with Avalanche's C-Chain.

## Requirements

* [Avash](https://github.com/ava-labs/avash) is Avalanche's local development network. It's similar to Truffle's [Ganache](https://www.trufflesuite.com/ganache).
* [NodeJS](https://nodejs.org/en) v8.9.4 or later.
* Truffle: `npm install -g truffle`

## Start up a local Avalanche network

```zsh
cd /path/to/avash
# start avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

## Create truffle directory and install dependencies

```zsh
cd /path/to/directory
mkdir truffle
cd truffle
npm install web3 -s
truffle init
```

## Update truffle-config.js

Add the following to your `truffle-config.js` file.

```js
const Web3 = require('web3');
module.exports = {
  networks: {
   development: {
     provider: function() {
      return new Web3.providers.HttpProvider("http://localhost:9650/ext/bc/C/rpc")
     },
     network_id: "*",
     gas: 3000000,
     gasPrice: 470000000000
   },
   test: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*"
   }
  }
};
```

## Create and unlock an account on the C-Chain

```js
const Web3 = require('web3');
const web3 = new Web3("http://localhost:9650/ext/bc/C/rpc");

const main = async () => {
  let account = await web3.eth.personal.newAccount();
  console.log(account)
  let unlock = await web3.eth.personal.unlockAccount(account)
  console.log(unlock)
}
  
main()
```

Now run the script via `node`

```zsh
node web3.js
0x111Ccab68e655b035Ca6050712bFbd10311EF5Cc
true
```

## Create Keystore User

```zsh
curl --location --request POST 'http://localhost:9650/ext/keystore' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.createUser",
    "params" :{
        "username": "username",
        "password": "strongPassword"
    }
}'
```

## Import PrivateKey to X-Chain

```zsh
curl --location --request POST 'http://localhost:9650/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importKey",
    "params" :{
        "username": "username",
        "password": "strongPassword",
        "privateKey":"PrivateKey-"
    }
}'
```

## Import PrivateKey to C-Chain

```zsh
curl --location --request POST 'http://localhost:9650/ext/bc/C/avax' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "avax.importKey",
    "params": {
        "username":"username",
        "password":"strongPassword",
        "privateKey":"PrivateKey-"
    },
    "jsonrpc": "2.0",
    "id": 1
}'
```

## Export AVAX from the X-Chain to the C-Chain

```zsh
curl --location --request POST 'http://localhost:9650/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportAVAX",
    "params" :{
        "from": ["X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"],
        "to":"C-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u",
        "amount": 10000000000,
        "destinationChain": "C",
        "changeAddr": "X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u",
        "username":"username",
        "password":"stringPassword"
    }
}'
```

## Import AVAX to the C-Chain to the X-Chain

Put in the address from running `node web3.js`

```zsh
curl --location --request POST 'http://localhost:9650/ext/bc/C/avax' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "avax.importAVAX",
    "params": {
        "username":"username",
        "password":"strongPassword",
        "sourceChain": "X",
        "to":"0x111Ccab68e655b035Ca6050712bFbd10311EF5Cc"
    },
    "jsonrpc": "2.0",
    "id": 1
}'
```

## Compile Contracts with Truffle

```zsh
truffle compile
```

## Run Migrations

```zsh
truffle migrate --network development
```
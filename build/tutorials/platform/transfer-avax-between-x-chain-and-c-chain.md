# Transfer AVAX Between X-Chain and C-Chain

## Introduction

AVAX tokens exist on the X-Chain, where they can be traded, on the P-Chain, where they can be provided as a stake when validating the Primary Network, and on the C-Chain, where they can be used in smart contracts or to pay for gas. In this tutorial, we’ll send AVAX tokens between the X-Chain and C-Chain.

## Requirements

You've completed [Getting Started](../../getting-started.md) and are familiar with the [Avalanche's architecture](../../../learn/platform-overview/).

In order to send AVAX, you need to have some AVAX! You can get real AVAX by exchanging them on exchanges. You can get test net AVAX from the [AVAX Test Faucet](https://faucet.avax-test.network), which is a free and easy way to get to play around with the technology.

## Transferring AVAX using the web wallet

The easiest way to transfer AVAX between chains is to use [the Avalanche Wallet](https://wallet.avax.network/) which is a non-custodial and secure way to access and move AVAX.

The Avalanche Wallet source code can be found [here](https://github.com/ava-labs/avalanche-wallet).

### Step 1 - Open the Avalanche Wallet

![Image for post](../../../.gitbook/assets/wallet-x2p-01-login.png)

Select **Access Wallet** to enter, or **Mainnet** if you wish to switch to test or local network.

### Step 2 - Login to your wallet

You can access your wallet using the private key, mnemonic key phrase, keystore file or Ledger Nano S.

![Image for post](../../../.gitbook/assets/wallet-x2p-02-access.png)

After a successful login you will see your balance, assets portfolio and various other information.

### Step 3 - Go to **Earn** tab

![Image for post](../../../.gitbook/assets/wallet-x2p-03-earn.png)

Functionality for transferring tokens between chains is on the "Earn" tab.

### Step 4 - Cross chain transfer

On the **Earn** tab are various operations for becoming a validator, delegating your tokens and other related functions.

![Image for post](../../../.gitbook/assets/wallet-x2p-04-xctransfer.png)

Select Cross Chain Transfer.

### Step 5 - Enter amount To transfer

You will be presented with your X and P balances, and an input field for entering the amount to transfer from source to destination chain.

![Image for post](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

Enter the amount you wish to transfer from X to P chain.

### Step 6 - Confirm the transaction

![Image for post](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

Press Confirm, and then Transfer to initiate the transfer:

![Image for post](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

### Step 7 - Transfer

Cross chain transfer is a two step process: export from X, import to P. Wallet will carry out both transactions, and show you the progress while doing it.

![Image for post](../../../.gitbook/assets/wallet-x2p-08-done.png)

And that's it, you've transferred AVAX from X to P Chain! Now you can use them to validate or delegate on the Avalanche network.

### Transfer from P-Chain to X-chain

To return the AVAX back to X chain, you need to do the transfer in the opposite direction.

![Image for post](../../../.gitbook/assets/wallet-x2p-09-p-x-swap.png)

Swap source and destination chain, by pressing the highlighted icon. The rest of the process is the same, just repeat Steps 5 to 7.

## Transferring AVAX programmatically

If you're building applications on the Avalanche network, you might want to do the transfer programmatically, as a step in some bigger functionality. You can do that by calling the appropriate APIs on AvalancheGo node or an API server. The rest of the tutorial assumes you have access to AvalancheGo node or an API server, some tokens on the X chain, and user credentials [created](../../avalanchego-apis/keystore-api.md#keystorecreateuser) and stored in the node's keystore.

As you may have noticed while transferring AVAX using the Avalanche Wallet, cross chain transfer is a two transaction operation:
* export from X chain
* import to C chain

But, before we can do the transfer, we need to set up the address on the C-Chain, along with the controlling key.

### Set up address and key on C-Chain

The X-Chain uses [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) addresses and the C-Chain uses hex Ethereum Virtual Machine \(EVM\) addresses. There is no way to convert the address from one format to the other since they are both derived from a private key using a one-way cryptographic function.

In order to get around this, you can export a private key from the X-Chain and then import it to the C-Chain. This way, you can use the X-Chain address and change the X- prefix to a C- prefix in order to get the correct Bech32 address to use for the C-Chain.

First, export a private key from the X-Chain:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "address": "X-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Response:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

Now, import the same private key to the C-Chain:

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avax.importKey", 
    "params" :{ 
        "username" :"myUsername",   
        "password":"myPassword",    
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"    
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

The response contains a hex-encoded EVM address:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

Now we have everything we need to transfer the tokens.

### Transfer from X-Chain to C-Chain

Use the address corresponding to the private key you exported and switch to using the C- prefix in the [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax) call:

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avm.exportAVAX", 
    "params" :{ 
        "to":"C-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e",   
        "destinationChain": "C",    
        "amount": 5000000,  
        "username":"myUsername",    
        "password":"myPassword" 
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Since your keystore user owns the corresponding private key on the C-Chain, you can now import the AVAX to the address of your choice. It’s not necessary to import it to the same address that it was exported to, so can import it directly to an address that you own in MetaMask or another third-party service.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,    
    "method" :"avax.importAVAX",    
    "params" :{ 
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",  
        "sourceChain":"X",  
        "username":"myUsername",    
        "password":"myPassword" 
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

where `to` is a hex-encoded EVM address of your choice.

The response looks like this:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": { 
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3" 
    },  
    "id": 1 
}
```

Note: there is no transaction fee for import transactions to the C Chain.

Once your AVAX has been transferred to the C-Chain, you can immediately begin running smart contracts.

{% page-ref page="../smart-digital-assets/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## Transfer from C-Chain to X-Chain

Now, you can move AVAX back from the C-Chain to the X-Chain. First we need to export:

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avax.exportAVAX",
    "params" :{ 
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",   
        "amount": 5000000,  
        "username":"myUsername",    
        "password":"myPassword" 
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

where `to` is the bech32 encoded address of an X-Chain address you hold. Make sure that the amount you export exceeds the transaction fee because both the export and import transactions will charge a transaction fee.

The response should look like this:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": { 
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"    
    },  
    "id": 1 
}
```

Lastly, we can finish up by importing AVAX from the C-Chain to the X-Chain, call [`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax).

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method": "avm.importAVAX", 
    "params": { 
        "username":"myUsername",    
        "password":"myPassword",    
        "sourceChain": "C", 
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"    
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

where `to` is the bech32 encoded address the X-Chain address which you sent the funds to in the previous step.

The response should look like this:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": { 
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"    
    },  
    "id": 1 
}
```

## Wrapping Up

That’s it! Now, you can swap AVAX back and forth between the X-Chain and P-Chain. In the future, Avalanche will support more generalized atomic swaps between chains.


# Add Avalanche to MetaMask Programmatically

Adding new networks to Metamask is not a trivial task for people that are not technically savvy, and it can be error prone. To help easier onboarding of users to your application it is useful to simplify that process as much as possible. This tutorial will show how to build a simple button in your front-end application that will automate the process of adding the Avalanche network to MetaMask.

## EIP-3035 & MetaMask

[EIP-3035](https://eips.ethereum.org/EIPS/eip-3085) is an [Ethereum Improvement Proposal](https://eips.ethereum.org/) that defines an RPC method for adding Ethereum-compatible chains to wallet applications.

Since March 2021 Metamask has implemented that EIP as part of their Metamask [Custom Networks API](https://consensys.net/blog/metamask/connect-users-to-layer-2-networks-with-the-metamask-custom-networks-api/).

Let's see how it works.

## Data structures

To add the Avalanche network to Metamask, we need to prepare the data structures that will be contain all the necessary data.

Main network data:

```javascript
export const AVALANCHE_MAINNET_PARAMS = {
    chainId: '0xA86A',
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io/']
}
```

Test network data:

```javascript
export const AVALANCHE_TESTNET_PARAMS = {
    chainId: '0xA869',
    chainName: 'Avalanche Testnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/']
}
```

## Adding the network

To add the network to MetaMask, we need to call the `wallet_addEthereumChain` method, exposed by the web3 provider.

```javascript
  function addAvalancheNetwork() {
    injected.getProvider().then(provider => {
      provider
        .request({
          method: 'wallet_addEthereumChain',
          params: [AVALANCHE_MAINNET_PARAMS]
        })
        .catch((error: any) => {
          console.log(error)
        })
    })
  }
```

Where `injected` is initialized as a `web3-react/injected-connector` used to interface with MetaMask APIs. Usage for other popular web frameworks is similar. Replace `AVALANCHE_MAINNET_PARAMS` with `AVALANCHE_TESTNET_PARAMS` if you want to add the test network.

Typical usage pattern would be to expose a button calling that method if you get `Wrong Network` or `Error connecting` errors when attempting to establish a connection to MetaMask.

## User experience

When users first come to your dapp's website they need to approve connection to MetaMask. After they do that, if you don't detect successful web3 network connection, you can present them with a dialog asking them to confirm switch to a new network:

![wrong network](/img/add-avalanche-to-metamask-01-wrong-network.png)

If they press the button, they are shown a dialog from MetaMask asking for approval to add the new network:

![add a network](/img/add-avalanche-to-metamask-02-add-network.png)

If they approve, your app will be connected to the Avalanche network. Very easy, no need for any data entry, no chance of wrong data entry. And that's it, users are ready to interacy with your dapp!

## Conclusion

Dapps users are often not very technically sophisticated and onboarding them needs to be as seamless and easy as possible. Manually adding a new network to MetaMask is a hurdle than a certain percentage of your potential users will not be able to clear. Removing that requirement is a simple step that will enhance their experience and enable more users to get to actually use your dapp.

If you have any questions, problems, or ideas on how to improve, or simply want to join our developer community, you can contact us on our [Discord](https://chat.avalabs.org/) server.


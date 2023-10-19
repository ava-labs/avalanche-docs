---
tags: [Tooling, AvalancheJS]
description: AvalancheJS is a JavaScript Library for interfacing with the Avalanche platform. It is built using TypeScript and intended to support both browser and Node.js. The AvalancheJS library allows one to issue commands to the Avalanche node APIs.
pagination_label: Manual Creation of Public-Private Key Pairs using AvalancheJS
sidebar_label: Generate Key Pair
sidebar_position: 0
---
# Manual Creation of Public-Private Key Pairs using AvalancheJS

## Generate a Mnemonic

To begin, we'll create a mnemonic phrase with
[AvalancheJS](/tooling/avalanchejs-overview.md). Mnemonics enable us to encode
strong security into a human-readable phrase. AvalancheJS supports 10 languages
including English, Japanese, Spanish, Italian, French, Korean, Czech,
Portuguese, Chinese Simplified and Chinese Traditional.

First, generate a 24 word english
[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)-compliant
mnemonic via AvalancheJS.

```typescript
import { Mnemonic } from "avalanche"
const mnemonic: Mnemonic = Mnemonic.getInstance()
const strength: number = 256
const wordlist = mnemonic.getWordlists("english") as string[]
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist)
console.log(m)
// "chimney asset heavy ecology accuse window gold weekend annual oil emerge alley retreat rabbit seed advance define off amused board quick wealth peasant disorder"
```

## Derive Addresses

After generating a mnemonic we can use AvalancheJS to derive
[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)-compliant
hierarchical deterministic (HD) Keypairs.

```typescript
import HDNode from "avalanche/dist/utils/hdnode"
import { Avalanche, Mnemonic, Buffer } from "avalanche"
import { EVMAPI, KeyChain } from "avalanche/dist/apis/evm"
import { ethers } from "ethers"

const ip: string = "api.avax-test.network"
const port: number = 443
const protocol: string = "https"
const networkID: number = 5
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const cchain: EVMAPI = avalanche.CChain()

const mnemonic: Mnemonic = Mnemonic.getInstance()
const m: string =
  "chimney asset heavy ecology accuse window gold weekend annual oil emerge alley retreat rabbit seed advance define off amused board quick wealth peasant disorder"
const seed: Buffer = mnemonic.mnemonicToSeedSync(m)
const hdnode: HDNode = new HDNode(seed)

const keyChain: KeyChain = cchain.newKeyChain()

const cAddresses: string[] = []

for (let i: number = 0; i <= 2; i++) {
  const child: HDNode = hdnode.derive(`m/44'/60'/0'/0/${i}`)
  keyChain.importKey(child.privateKey)
  const cchainAddress = ethers.utils.computeAddress(child.privateKey)
  cAddresses.push(cchainAddress)
}
console.log(cAddresses)
// [
//   '0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559',
//   '0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C',
//   '0xa14dFb7d8593c44a47A07298eCEA774557036ff3'
// ]
```

## Generate Private Keys from a Mnemonic

As long as you have the mnemonic phrase, you can re-generate your private keys
and the addresses they control.

For example, if you want to generate the private keys for the first 3 address in the C Chain keychain:

- [0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559](https://testnet.snowtrace.io/address/0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559)
- [0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C](https://testnet.snowtrace.io/address/0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C)
- [0xa14dFb7d8593c44a47A07298eCEA774557036ff3](https://testnet.snowtrace.io/address/0xa14dFb7d8593c44a47A07298eCEA774557036ff3)

you might update the example script above to the following:

```typescript
const cAddresses: string[] = []
const privateKeys: string[] = []
for (let i: number = 0; i <= 2; i++) {
  // Deriving the _i_th external BIP44 C-Chain address
  const child: HDNode = hdnode.derive(`m/44'/60'/0'/0/${i}`)
  keyChain.importKey(child.privateKey)
  // Converting the BIP44 addresses to hexadecimal addresses
  const cchainAddress = ethers.utils.computeAddress(child.privateKey)
  privateKeys.push(child.privateKey.toString("hex"))
  cAddresses.push(cchainAddress)
}
console.log({ cAddresses, privateKeys })
// {
//   cAddresses: [
//     '0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559',
//     '0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C',
//     '0xa14dFb7d8593c44a47A07298eCEA774557036ff3'
//   ],
//   privateKeys: [
//     'cd30aef1af167238c627593537e162ecf5aad1d4ab4ea98ed2f96ad4e47006dc',
//     'b85479b26bc8fbada4737e90ab2133204f2fa2a9ea33c1e0de4452cbf8fa3be4',
//     'c72e18ea0f9aa5457396e3bf810e9de8df0177c8e4e5bf83a85f871512d645a9'
//   ]
// }
```

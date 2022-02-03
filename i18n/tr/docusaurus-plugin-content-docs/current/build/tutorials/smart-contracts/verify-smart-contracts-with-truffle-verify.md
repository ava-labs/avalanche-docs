# Truffle Verify ile Akıllı Sözleşmelerin Doğrulanması

_Bu eğitim makalesinde Truffle [hızlı başlangıç dokümanlarından](https://www.trufflesuite.com/docs/truffle/quickstart) ögeler yer alır_

_[Truffle verify dokümanlarından](https://www.npmjs.com/package/truffle-plugin-verify) esinlenilmiştir_


## Bir proje yaratın

Truffle'ı yüklediğinizden emin olun:
```
npm install -g truffle
```

Truffle projeniz için yeni bir dizin oluşturun:

```zsh
mkdir MetaCoin
cd MetaCoin
```

MetaCoin kutusunu indirin \("kutuyu açın"\):
```zsh
truffle unbox metacoin
```


Bu işlem tamamlandığında, artık aşağıdaki ögeleri içeren bir proje yapınız olacaktır:

* ``contracts/``: Solidity sözleşmeleri dizini
* ``migrations/``: Script edilebilir deployment dosyaları dizini
* ``test/``: Uygulamanızı ve sözleşmelerinizi test etmek için test dosyaları dizini
* ``truffle.js``: Truffle yapılandırma dosyası

## Derleme
Akıllı sözleşmemizi compile önce, ortamımızı kurmamız gerekir



Aşağıdaki komutları çalıştırın:

```zsh
npm init -y
```


```zsh
yarn add @truffle/hdwallet-provider yarn add -D truffle-plugin-verify
```



Projenizin kök dizininde bir ``.env.json`` dosyası oluşturun:

```json
{
  "mnemonic": "your-wallet-seed-phrase",
  "snowtraceApiKey": "your-snowtrace-api-key"
}
```
_Snowtrace API anahtarınızı [buradan](https://snowtrace.io/myapikey) alın_


``truffle-config.js`` dosyanızı uygun ayarlara yapılandırın:


```js
/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require("@truffle/hdwallet-provider");

//
const { snowtraceApiKey, mnemonic } = require("./.env.json");

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

   plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    snowtrace: snowtraceApiKey
  },
  networks: {

    fuji: {
        provider: () => new HDWalletProvider(mnemonic, `https://api.avax-test.network/ext/bc/C/rpc`),
        network_id: 1,
        timeoutBlocks: 200,
        confirmations: 5
    }
  }
};
```
_Ağ, mainnet deployment'ı için yapılandırılabilir \(bkz. Alternatifler\)_


Aşağıdaki komutu çalıştırın:

```zsh
truffle compile
```


Bu işlem tamamlandığında, ``./build/contracts`` klasörünüz aşağıdaki ögeleri içermelidir:


* ``ConvertLib.json``
* ``MetaCoin.json``
* ``Migrations.json``


## Taşıyın

Aşağıdaki komutu çalıştırın:
```zsh
npx truffle migrate --network fuji
```


Terminalinizde txn etkinliğini görmeniz gerekir ![truffle-verify-txn1](/img/truffle-verify-txn1.png)

![truffle-verify-txn2](/img/truffle-verify-txn2.png)

![truffle-verify-txn3](/img/truffle-verify-txn3.png)


## Truffle verify

Truffle verify, kullanıcıların CLI'den sözleşmeleri doğrulamasına olanak verir

### Fuji Testnet
Fuji Testnet Tarayıcı'ya [burada](https://testnet.snowtrace.io/) bir göz atın ve [buradan](https://github.com/rkalis/truffle-plugin-verify) Truffle verify hakkında daha fazla bilgi edinin

Sorun yaşarsanız, [Discord](https://chat.avalabs.org) üzerinden bizimle iletişime geçin


1. Aşağıdaki komutu çalıştırın:
```zsh
npx truffle run verify ConvertLib MetaCoin --network fuji
```


2. CLI'den gelecek doğrulama mesajını bekleyin ![truffle-verify-message1](/img/truffle-verify-message1.png)



3. Doğrulanan sözleşmeyi görüntüleyin ![truffle-verify-view-contract](/img/truffle-verify-view-contract.png)


### Mainnet

``truffle-config.js`` dosyanızı uygun ayarlara yapılandırın:

```js
module.exports = {
...
   plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    snowtrace: snowtraceApiKey
  },
  networks: {

    mainnet: {
        provider: () => new HDWalletProvider(mnemonic, `https://api.avax.network/ext/bc/C/rpc`),
        network_id: 1,
        timeoutBlocks: 200,
        confirmations: 5
    }
  }
};
```
Aşağıdaki komutları çalıştırın:
```zsh
truffle migrate --network mainnet
```


```zsh
truffle verify CovertLib MetaCoin --network mainnet
```


Okuduğunuz için teşekkür ederiz 🔺

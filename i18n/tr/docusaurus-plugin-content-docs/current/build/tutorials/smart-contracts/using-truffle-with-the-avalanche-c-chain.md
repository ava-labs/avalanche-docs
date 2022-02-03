# Avalanche C-Chain ile Truffle Kullanma

## Giriş

[Truffle Suite](https://www.trufflesuite.com), EVM'de merkeziyetsiz uygulamalar başlatmak için kullanılan bir araç araç setidir. Truffle ile akıllı sözleşmeler yazabilir ve derleyebilir, yapıtlar oluşturabilir, geçişleri yürütebilir ve dağıtılmış sözleşmeler ile etkileşimde bulunabilirsiniz. Bu öğreticide Truffle'ın bir EVM örneği olan Avalanche C-Chain ile nasıl kullanılabileceği açıklanmaktadır.

## Gereklilikler

[Bir Avalanche Düğümü Çalıştırma](../nodes-and-staking/run-avalanche-node.md) eğitimini tamamlamış ve [Avalanche mimarisini](../../../learn/platform-overview/README.md) öğrenmiş olmanız gerekir. Ayrıca [X-Chain ve C-Chain Arasında AVAX Transfer Etme](../platform/transfer-avax-between-x-chain-and-c-chain.md) öğreticisi aracılığıyla C-Chain adresinize fon aktarmak üzere zincirler arası bir takas işlemi gerçekleştirmiş olmanız gerekir.

## Bağımlılıklar

* [Avash](https://github.com/ava-labs/avash), bir yerel Avalanche ağını çalıştırmaya yarayan bir araçtır. Truffle'daki [Ganache](https://www.trufflesuite.com/ganache) aracına aracına benzer.
* [NodeJS](https://nodejs.org/en) v8.9.4 veya üzeri.
* Truffle, `npm install -g truffle`ile yükleyebilirsiniz

## Yerel Avalanche ağı başlatma

[Avash](https://github.com/ava-labs/avash), kullanıma hazır 15 kadar AvalancheGo düğümüyle özel test ağı dağıtımları çalıştırmanıza olanak tanır. Avash, lua betikleri aracılığıyla normal görevlerin otomasyonunu destekler. Bu, çok çeşitli yapılandırmalar için hızlı test yapılmasına olanak sağlar. Avash'ı ilk kez kullanırken [yüklemeniz ve oluşturmanız gerekir](https://github.com/ava-labs/avash#quick-setup).

Yerel bir beş düğümlü Avalanche ağı başlatın:

```text
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

Makinenizde beş düğümlü bir Avalanche ağı çalışıyor. Avash'tan çıkmak istediğinizde, `exit`komutunu çalıştırın ancak bunu şimdi yapmayın ve bu terminal sekmesini kapatmayın.

## Truffle dizini oluşturma ve bağımlılıkları yükleme

Bir `truffle`dizini oluşturabilmemiz ve bazı diğer bağımlılıkları yükleyebilmemiz için yeni bir terminal sekmesi açın.

İlk olarak `truffle`çalışma dizininizi oluşturmayı planladığınız dizine gidin:

```text
cd /path/to/directory
```

`truffle` adlı yeni bir dizin oluşturun ve bu dizine girin:

```text
mkdir truffle; cd truffle
```

EVM ile konuşmamızı sağlayan bir kitaplık olan [web3](https://web3js.readthedocs.io) hizmetini yüklemek için `npm`komutunu kullanın:

```text
npm install web3 -s
```

Web3 hizmetini bir HTTP Sağlayıcı ayarlamak için kullanırız ve web3 bu sayede EVM ile konuşabilir. Son olarak bir boilerplace \(başlangıç\) Truffle projesi oluşturun:

```text
truffle init
```

Avash'taki geliştirme \(yerel\) ağı bazı statik adreslere önceden fon sağlar. Önceden fon sağlanan bu adreslerden hesaplarımız olarak yararlanmak için [@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider) seçeneğini kullanırız.

```text
npm install @truffle/hdwallet-provider
```

## Truffle-config.js dosyasını güncelleme

`truffle init` komutu çalıştırdığınızda oluşturulan dosyalardan biri de `truffle-config.js`dosyasıdır. Aşağıdaki öğeyi `truffle-config.js`dosyasına ekleyin.

```javascript
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const protocol = "http";
const ip = "localhost";
const port = 9650;
const provider = new Web3.providers.HttpProvider(
  `${protocol}://${ip}:${port}/ext/bc/C/rpc`
);

const privateKeys = [
  "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
  "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07",
  "0x15614556be13730e9e8d6eacc1603143e7b96987429df8726384c2ec4502ef6e",
  "0x31b571bf6894a248831ff937bb49f7754509fe93bbd2517c9c73c4144c0e97dc",
  "0x6934bef917e01692b789da754a0eae31a8536eb465e7bff752ea291dad88c675",
  "0xe700bdbdbc279b808b1ec45f8c2370e4616d3a02c336e68d85d4668e08f53cff",
  "0xbbc2865b76ba28016bc2255c7504d000e046ae01934b04c694592a6276988630",
  "0xcdbfd34f687ced8c6968854f8a99ae47712c4f4183b78dcc4a903d1bfe8cbf60",
  "0x86f78c5416151fe3546dece84fda4b4b1e36089f2dbc48496faf3a950f16157c",
  "0x750839e9dbbd2a0910efe40f50b2f3b2f2f59f5580bb4b83bd8c1201cf9a010a",
];

module.exports = {
  networks: {
    development: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: privateKeys,
          providerOrUrl: provider,
        });
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 225000000000,
    },
  },
};
```

API çağrılarını farklı bir AvalancheGo düğümüne yönlendirmek istiyorsanız  `protocol`, `ip`ve `port`değerlerini değiştirebileceğinizi unutmayın. Ayrıca `gasPrice`ve `gas`parametrelerini uygun Avalanche C-Chain değerlerine ayarladığımızı unutmayın.

## Storage.sol ekleme

`contracts` dizinine `Storage.sol`adlı yeni bir dosya ekleyin ve aşağıdaki kod blokunu ekleyin:

```text
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

`Storage`, `store`işlevi aracılığıyla blok zincirine bir sayı yazmamıza ve ardından `retrieve`işlevi aracılığıyla sayıyı blok zincirinden tekrar okumamıza olanak tanıyan bir Solidity akıllı sözleşmesidir.

## Yeni geçiş ekleme

`migrations` dizininde `2_deploy_contracts.js`adıyla yeni bir dosya oluşturun ve aşağıdaki kod blokunu ekleyin. Bu kod `Storage`akıllı sözleşmesinin blok zincirine dağıtımını gerçekleştirir.

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Truffle ile Sözleşme Derleme

`truffle compile` komutunu çalıştırmak için `Storage.sol`dosyasında istediğiniz zaman değişiklik yapabilirsiniz.

```text
truffle compile
```

Şunu görmeniz gerekir:

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## C-Chain'deki Hesaplar

C-Chain'e akıllı sözleşmeler dağıtırken, Truffle, C-Chain istemciniz tarafından geçişler sırasında `from`adresi olarak sağlanan ilk kullanılabilir hesabı varsayılan olarak ayarlar. Bazı önceden tanımlanmış özel anahtarları hesaplarımız olarak `truffle-config.json`dosyasına ekledik. İlk ve varsayılan hesapta önceden sağlanmış bir miktar AVAX fonu bulunmalıdır.

### Truffle Hesapları

İçe aktarılan hesapları Truffle konsolu aracılığıyla görüntüleyebilirsiniz.

Truffle konsolunu açmak için:

```bash
$ truffle console --network development
```

Not: `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"` mesajını görüyorsanız, ağ bootstrap yapana ve kullanıma hazır hale gelen kadar beklemeniz gerekir. Bu işlemin uzun sürmemesi gerekir.

Truffle konsolunda:

```bash
truffle(development)> accounts
[
  '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  '0x9632a79656af553F58738B0FB750320158495942',
  '0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430',
  '0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4',
  '0x0B891dB1901D4875056896f28B6665083935C7A8',
  '0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2',
  '0x78A23300E04FB5d5D2820E23cc679738982e1fd5',
  '0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293',
  '0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB',
  '0x0Fa8EA536Be85F32724D57A37758761B86416123'
]
```

Şunu kullanarak bakiyeleri görebilirsiniz:

```bash
truffle(development)> await web3.eth.getBalance(accounts[0])
'50000000000000000000000000'

truffle(development)> await web3.eth.getBalance(accounts[1])
'0'
```

`accounts[0]` \(varsayılan hesap\) bir miktar bakiye içerdiği halde `accounts[1]`hesabında bakiye yoktur.

### Betik oluşturarak hesaba fon sağlama

`accounts` listesine fon sağlayan kullanışlı bir betik mevcuttur. Betiği [burada](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js) bulabilirsiniz. Betiği bu komutu kullanarak da indirebilirsiniz:

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js;
```

Betiği şunu kullanarak çalıştırabilirsiniz:

```text
truffle exec fund-cchain-addresses.js --network development
```

Betik yukarıdaki `accounts` listesinde yer alan her bir hesaba 1000 AVAX fon sağlar. Betiği başarıyla çalıştırdıktan sonra şunu kullanarak bakiyeleri kontrol edebilirsiniz:

```bash
truffle(development)> await web3.eth.getBalance(accounts[0]);
'50000001000000000000000000'
truffle(development)> await web3.eth.getBalance(accounts[1]);
'1000000000000000000'
```

### Hesabınıza fon sağlama

Hesaplara kendi başınıza fon sağlamak istiyorsanız [X-Chain ve C-Chain Arasında AVAX Transfer Etme](../platform/transfer-avax-between-x-chain-and-c-chain.md) öğreticisindeki adımları takip edin. Sözleşme dağıtımlarının maliyetini karşılamak için hesaba en az `135422040`nAVAX göndermeniz gerekir.

### Kişisel API'ler

Kişisel API'ler düğüm hesapları ile etkileşimde bulunur. `web3`hizmetinde bu API'yi kullanan bazı işlevler vardır, ör: `web3.eth.personal.newAccount`,`web3.eth.personal.unlockAccount`vb... Ancak bu API varsayılan olarak devre dışıdır. Bu API `C-chain`/`Coreth` yapılandırmaları ile etkinleştirilebilir. Avash şu anda bu API'nin etkinleştirilmesini desteklemiyor. Dolayısıyla bu özellikleri kullanmak istiyorsanız, kendi ağınızı `personal-api-enabled`aracılığıyla manuel olarak çalıştırmanız gerekir. [Yerel Test Ağı Oluşturma/Manuel Olarak](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network#manually) ve [C-Chain Yapılandırmaları](https://docs.avax.network/build/references/command-line-interface#c-chain-configs) öğreticilerine bakın.

## Geçişleri Yürütme

Artık geçişleri yürütmek ve `Storage`sözleşmesini dağıtmak için her şey hazır:

```text
truffle(development)> migrate --network development
```

Şunu görmeniz gerekir:

```text
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Migrations dry-run (simulation)
===============================
> Network name:    'development-fork'
> Network id:      1
> Block gas limit: 99804786 (0x5f2e672)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > block number:        4
   > block timestamp:     1607734632
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.91683679
   > gas used:            176943 (0x2b32f)
   > gas price:           225 gwei
   > value sent:          0 ETH
   > total cost:          0.08316321 ETH

   -------------------------------------
   > Total cost:          0.08316321 ETH

2_deploy_contracts.js
=====================

   Deploying 'Storage'
   -------------------
   > block number:        6
   > block timestamp:     1607734633
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.8587791
   > gas used:            96189 (0x177bd)
   > gas price:           225 gwei
   > value sent:          0 ETH
   > total cost:          0.04520883 ETH

   -------------------------------------
   > Total cost:          0.04520883 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.13542204 ETH
```

C-Chain'de bir hesap oluşturmadıysanız şu hatayı görürsünüz:

```text
Error: Expected parameter 'from' not passed to function.
```

Hesaba fon sağlamadıysanız şu hatayı görürsünüz:

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```

## Sözleşmeniz ile etkileşimde bulunma

Artık `Storage`sözleşmesi dağıtıldı. Şimdi blok zincirine bir sayı yazalım ve ardından bu sayıyı tekrar okuyalım. Truffle konsolunu yeniden açın:

Dağıtılan `Storage`sözleşmesinin bir örneğini alın:

```javascript
truffle(development)> let instance = await Storage.deployed()
```

Bu şu sonucu döndürür:

```text
undefined
```

### Blok zincirine sayı yazma

Şimdi `Storage`sözleşmesinin bir örneğinde sahipsiniz, `store`yöntemini çağırın ve blok zincirine yazmak üzere bir sayı geçirin.

```javascript
truffle(development)> instance.store(1234)
```

Şuna benzer bir şey görmeniz gerekir:

```javascript
{
  tx: '0x10afbc5e0b9fa0c1ef1d9ec3cdd673e7947bd8760b22b8cdfe08f27f3a93ef1e',
  receipt: {
    blockHash: '0x8bacbce7c9d835db524bb856288e3a73a6afbe49ab34abd8cd8826db0240eb21',
    blockNumber: 9,
    contractAddress: null,
    cumulativeGasUsed: 26458,
    from: '0x34cb796d4d6a3e7f41c4465c65b9056fe2d3b8fd',
    gasUsed: 26458,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    to: '0x0d507b0467baef742f9cc0e671eddbdf6df41d33',
    transactionHash: '0x10afbc5e0b9fa0c1ef1d9ec3cdd673e7947bd8760b22b8cdfe08f27f3a93ef1e',
    transactionIndex: 0,
    rawLogs: []
  },
  logs: []
}
```

### Blok zincirinden sayı okuma

Blok zincirindeki sayıyı okumak için `Storage`sözleşmesi örneğinin `retrieve`yöntemini çağırın.

```javascript
truffle(development)> let i = await instance.retrieve()
```

Bu şu sonucu döndürmelidir:

```javascript
undefined
```

`retrieve` çağrısının sonucu şudur: `BN` \(büyük sayı\). Değeri görmek için `.toNumber` yöntemini çağırın:

```javascript
truffle(development)> i.toNumber()
```

Kaydettiğiniz numarayı görmeniz gerekir.

```javascript
1234
```

## Özet

Artık yerel bir Avalanche ağı başlatmak, bir Truffle projesi oluşturmak ve Solidity sözleşmeleri oluşturmak, derlemek, dağıtmak ve bunlarla etkileşimde bulunmak için gerekli araçlara sahipsiniz.


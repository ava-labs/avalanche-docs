# Avalanche C-Chain ile Truffle kullanıyor

## Tanıştırma

[Truffle Suite](https://www.trufflesuite.com), on ademi merkeziyetli uygulamaları \(dapps\) başlatmak için bir araç setidir. Truffle ile akıllı sözleşmeler yazabilir ve derleyebilir, objeler inşa edebilir, göçleri yönetebilir ve konuşlandırılmış sözleşmelerle etkileşime girebilirsiniz. Bu özel ders Truffle Avalanche's Avalanche's ile nasıl kullanılabileceğini göstermektedir.

## Gereklilik

[Bir Avalanche](../nodes-and-staking/run-avalanche-node.md) an tamamladınız. [Avalanche's mimarisini](../../../learn/platform-overview/) biliyorsunuz. Ayrıca [X-Chain ve](../platform/transfer-avax-between-x-chain-and-c-chain.md) C-Chain özel ders ile C-Chain adresine para toplamak için transfer AVAX aracılığıyla zincir zinciri takası yaptın.

## Bağımlılıklar

* [Avash](https://github.com/ava-labs/avash), yerel bir Avalanche ağı çalıştırmak için bir araçtır. Truffle's [Truffle's](https://www.trufflesuite.com/ganache) benziyor.
* [NodeJS](https://nodejs.org/en) v8.9.4 veya sonra.
* - Mantar takabilirsiniz`npm install -g truffle`

## Yerel Avalanche ağı başlat

[Avash](https://github.com/ava-labs/avash) özel test ağı deployments 15 AvalancheGo düğümünü kutudan dışarı çıkararak çevirmenize izin veriyor. Avash düzenli görevlerin otomatik olarak lua betikleri aracılığıyla destekler. Bu da çeşitli yapıtlara karşı hızlı testler sağlar. Avash kullandığın ilk sefer [kurup inşa](https://github.com/ava-labs/avash#quick-setup) etmen gerekecek.

Yerel beş düğüm Avalanche ağı başlat:

```text
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

Beş node Avalanche ağı senin makinende çalışıyor. to çıkmak istediğinde kaç, ama şimdi bunu `exit`yapma, ve bu terminal hesabını kapatma.

## Yer mantarı dizini oluştur ve bağımlılıkları yükle

Yeni bir terminal sekmesi açın ki bir `truffle`dizin oluşturup bazı bağımlılıklar kurabilelim.

İlk olarak, `truffle`çalışma dizini oluşturmak niyetindeki dizine yönlendir:

```text
cd /path/to/directory
```

Yeni bir dizin oluştur ve `truffle`gir:

```text
mkdir truffle; cd truffle
```

to konuşabileceğimiz bir kütüphane olan [web3](https://web3js.readthedocs.io) yüklemek `npm`için kullanın:

```text
npm install web3 -s
```

HTTP Sağlayıcısını kurmak için web3 kullanacağız. Bu da web3 böyle konuşacak. Son olarak, kazan yermantarı projesi oluştur:

```text
truffle init
```

in geliştirme \(yerel yerel\) ağı oluşturulduğunda bazı statik adresleri kaynak önlemektedir. Bu önden fonlanmış adresleri hesaplarımız olarak kullanmak için [@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider) sağlayıcıyı kullanacağız.

```text
npm install @truffle/hdwallet-provider
```

## truffle-config.js güncelle

Kaçarken yaratılan dosyalardan biri de `truffle init`var.`truffle-config.js` Aşağıdakileri `truffle-config.js`ekleyin.

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

`protocol``port`Not: Değiştirebileceğinizi `ip`ve API çağrılarını farklı bir AvalancheGo düğümüne yönlendirmek istiyorsanız unutmayın. `gasPrice``gas`Ayrıca Avalanche C-Chain. için uygun değerleri belirlediğimizi de not edin.

## Depolama Ekle. sol

`contracts`Dizinde yeni bir dosya ekle `Storage.sol`ve şu kodu ekle:

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

`Storage`Bu sağlam bir sözleşmedir ve bu da blok zincirine bir `store`fonksiyon aracılığıyla bir sayı yazmamızı ve blok zincirinden bir fonksiyon aracılığıyla tekrar okunmasını `retrieve`sağlar.

## Yeni göçü ekle

Adlı `migrations`dizinde yeni bir dosya oluştur `2_deploy_contracts.js`ve şu kodu ekle. Bu da `Storage`akıllı sözleşmeyi blok zincirine yerleştiriyor.

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Trakya ile Birlikte Derle Anlaşmalar

`Storage.sol`Ne zaman değişiklik yaparsan koşman gerek.`truffle compile`

```text
truffle compile
```

Görmelisin:

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## C-chain hesapları

to akıllı sözleşmeler yerleştirildiğinde, trüf trüf işlemler sırasında kullanılan `from`adres olarak C-Chain istemciniz tarafından sağlanan ilk uygun hesaba varsayılır. Hesaplarımıza önceden tanımlanmış özel anahtarlar `truffle-config.json`ekledik. İlk ve öntanımlı hesap önceden finanse edilmiş AVAX olmalı.

### Aktarma Hesapları

Aktarılmış hesapları mantarla görebilirsiniz.

Mantarlı konsolu açmak için:
```bash
$ truffle console --network development
```

`Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`Not: Eğer görürseniz, ağ kayışlı ve kullanmaya hazır olana kadar beklemeniz gerekir. Çok uzun sürmemeli.

İçerideki mantarlar konsolu:
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

Dengeleri şu şekilde görebilirsiniz:
```bash
truffle(development)> await web3.eth.getBalance(accounts[0])
'50000000000000000000000000'

truffle(development)> await web3.eth.getBalance(accounts[1])
'0'
```
Dikkat edin, `accounts[0]`\(varsayılan hesap\) denge `accounts[1]`bulunamasa da bir denge vardır.



### Yazılım hesabı fonunu
`accounts`Listeye kaynak sağlayan uygun bir senaryo var. [Burada](https://github.com/ava-labs/avalanche-docs/blob/master/scripts/fund-cchain-addresses.js) bulabilirsin. Bu komutu kullanarak da indirebilirsiniz:

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js;
```

Senaryoyu şöyle yazabilirsiniz:

```text
truffle exec fund-cchain-addresses.js --network development
```

Senaryo `accounts`yukarıdaki her hesaba 1000 AVAX fonunu sunacak. Betiği başarılı bir şekilde çalıştırdıktan sonra dengeleri kontrol edebilirsiniz.
```bash
truffle(development)> await web3.eth.getBalance(accounts[0]);
'50000001000000000000000000'
truffle(development)> await web3.eth.getBalance(accounts[1]);
'1000000000000000000'
```

### Hesabınızı finanse edin.

Kendi hesaplarınızı finanse etmek istiyorsanız [X-Chain ve C-Chain Ders Sınıfı Arasındaki Transfer](../platform/transfer-avax-between-x-chain-and-c-chain.md) in adımları takip edin. Kontrat deployments. maliyetini karşılamak için en azından `135422040`nAVAX hesaba göndermeniz gerek.

### Kişisel APIs

Kişisel API'ler node’s hesaplarıyla etkileşime girer. Bazı fonksiyonları `web3`kullanır, örneğin `web3.eth.personal.newAccount``web3.eth.personal.unlockAccount`vb... Ancak bu API öntanımlı olarak devre dışı bırakıldı. `C-chain`/ configs ile `Coreth`etkinleştirilebilir. Avash şu anda bu API'yi etkinleştirmeyi desteklemiyor. Bu özellikleri kullanmak istiyorsanız kendi ağınızı elle çalıştırmanız `personal-api-enabled`gerekir. Yerel [Test Ağı/Manuel](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network#manually) ve [C-Chain Configs](https://docs.avax.network/build/references/command-line-interface#c-chain-configs) Oluştur.


## Göçmenleri Çalıştır

Şimdi her şey göçleri yönetecek ve sözleşmeyi `Storage`yayınlayacak:

```text
truffle(development)> migrate --network development
```

Görmelisin:

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

Eğer on hesap you bu hatayı göreceksin:

```text
Error: Expected parameter 'from' not passed to function.
```

Eğer hesabı finanse etmediysen, bu hatayı göreceksin:

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```


## your etkileşim kuruyorum.

Şimdi `Storage`sözleşme imzalandı. Zincirin numarasını yazıp sonra tekrar okuyalım. Yer mantarı konsolunu tekrar aç:

Görevli sözleşmenin bir örneğini `Storage`alın:

```javascript
truffle(development)> let instance = await Storage.deployed()
```

Bu geri dönüş:

```text
undefined
```

### Blok zincirine bir sayı yazılıyor

`Storage`Kontratın bir örneğini aldığınıza göre `store`yöntemini arayıp blok zincirine yazacak bir sayı ver.

```javascript
truffle(development)> instance.store(1234)
```

Şöyle bir şey görmelisin:

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

### from bir sayı okunuyor.

Buket zincirindeki numarayı okumak için `Storage`sözleşmenin `retrieve`yöntemini ara.

```javascript
truffle(development)> let i = await instance.retrieve()
```

Bu geri dönmeli.

```javascript
undefined
```

Bu aramanın sonucu `BN`\(büyük sayı\) `retrieve`olur. Değeri görmek için `.toNumber`yöntemini ara:

```javascript
truffle(development)> i.toNumber()
```

Sakladığın numarayı görmelisin.

```javascript
1234
```

## Özetle

Şimdi yerel bir Avalanche ağı başlatmak için gereken araçlara sahipsiniz, bir mantarlı projesi yaratmak, derlemek, dağıtım ve Solidity sözleşmeleriyle etkileşim kurmak için de ihtiyacınız var.


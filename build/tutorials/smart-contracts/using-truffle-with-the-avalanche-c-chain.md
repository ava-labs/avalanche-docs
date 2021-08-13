# Avalanche C-Chain ile Truffle kullanıyor

## Tanıştırma

[Truffle Suite](https://www.trufflesuite.com), on ademi merkeziyetli uygulamaları \(dapps\) başlatmak için bir araç setidir. Truffle ile akıllı sözleşmeler yazabilir ve derleyebilir, objeler inşa edebilir, göçleri yönetebilir ve konuşlandırılmış sözleşmelerle etkileşime girebilirsiniz. Bu özel ders Truffle Avalanche's Avalanche's ile nasıl kullanılabileceğini göstermektedir.

## Gereklilik

[Bir Avalanche](../nodes-and-staking/run-avalanche-node.md) an tamamladınız. [Avalanche's mimarisini](../../../learn/platform-overview/) biliyorsunuz. Ayrıca [X-Chain ve](../platform/transfer-avax-between-x-chain-and-c-chain.md) C-Chain özel ders ile C-Chain adresine para toplamak için transfer AVAX aracılığıyla zincir zinciri takası yaptın.

## Bağımlılıklar

* [Avash](https://github.com/ava-labs/avash), yerel bir Avalanche ağı çalıştırmak için bir araçtır. Truffle's [Truffle's](https://www.trufflesuite.com/ganache) benziyor.
* [NodeJS](https://nodejs.org/en) v8.9.4 veya sonra.
* `Npm yükleme -g` mantarı ile kurabileceğiniz mantar.

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

Beş node Avalanche ağı senin makinende çalışıyor. to çıkmak istediğinizde `çıkın` ama şimdi bunu yapma ve bu terminal hesabını kapatmayın.

## Yer mantarı dizini oluştur ve bağımlılıkları yükle

Yeni bir terminal sekmesi açın ki `bir mantar` dizini oluşturup bazı bağımlılıklar kurabilelim.

Önce `mantarı` çalışma dizini oluşturmak niyetindeki dizine yönlendir:

```text
cd /path/to/directory
```

`Trüf` adı verilen yeni bir dizin oluşturup gir:

```text
mkdir truffle; cd truffle
```

to konuşabileceğimiz bir kütüphane olan [web3](https://web3js.readthedocs.io) kurmak için `npm` kullanın:

```text
npm install web3 -s
```

HTTP Sağlayıcısını kurmak için web3 kullanacağız. Bu da web3 böyle konuşacak. Son olarak, kazan yermantarı projesi oluştur:

```text
truffle init
```

## truffle-config.js güncelle

`Trüf içimi` çalıştırdığında oluşturulan dosyalardan biri `Truffle-config.js`. Aşağıdaki `to` ekleyin.

```javascript
const Web3 = require('web3');
const protocol = "http";
const ip = "localhost";
const port = 9650;
module.exports = {
  networks: {
   development: {
     provider: function() {
      return new Web3.providers.HttpProvider(`${protocol}://${ip}:${port}/ext/bc/C/rpc`)
     },
     network_id: "*",
     gas: 3000000,
     gasPrice: 225000000000
   }
  }
};
```

API çağrılarını farklı `bir``` AvalancheGo düğümüne yönlendirmek istiyorsanız `protokolü` değiştirebileceğinizi unutmayın. Ayrıca `benzini` ve `benzini` Avalanche C-Chain. için uygun değerlere ayarladığımızı da not edin.

## Depolama Ekle. sol

`Kontrat` dizininde `Depolama` adı verilen yeni bir dosya ekle ve şu kodu ekle:

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

`Depolama` bir `mağaza` fonksiyonu aracılığıyla blok zincirine bir sayı yazmamızı ve sonra blok zincirinden `geri alma` fonksiyonu ile tekrar okumamızı sağlayan sağlam bir akıllı sözleşmedir.

## Yeni göçü ekle

`Göçmenler` dizininde `2_deploy_kontrs.js` adında yeni bir dosya oluştur ve şu kodu ekle. Bu da `Depo` akıllı sözleşmesini blok zincirine yerleştiriyor.

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Trakya ile Birlikte Derle Anlaşmalar

`Depolama` değişikliği yaptığınızda `mantarlı derleme` yapmalısınız.

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

## on bir hesap oluştur, fon ve aç.

to akıllı sözleşmeler yerleştirildiğinde, trüf trüf önerilen C-Chain istemciniz tarafından göç sırasında kullanılan `adrese` göre sunulan ilk uygun hesaba varsayılır.

### Bir hesap oluştur

Truffle çok yararlı [bir](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#console) konsolu var. Blok zinciri ve our etkileşime girebiliriz. Konsolu aç:

```text
truffle console --network development
```

Sonra konsolda hesabı oluştur:

```text
truffle(development)> let account = await web3.eth.personal.newAccount()
```

Bu geri dönüş:

```text
undefined
```

Hesabı yazdır:

```text
truffle(development)> account
```

Bu hesap şöyle basar:

```text
'0x090172CD36e9f4906Af17B2C36D662E69f162282'
```

### Hesabınızı açın:

```text
truffle(development)> await web3.eth.personal.unlockAccount(account)
```

Bu geri dönüş:

```text
true
```

### Hesabınızı finanse edin.

[X-Chain ve C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) arasındaki Transfer in yeni oluşturulan hesabı finanse etmek için yapılan adımları takip edin. Kontrat deployments. maliyetini karşılamak için en az `13542040` nAVAX hesaba göndermeniz gerekiyor.

### Yazılı hesap oluşturulması ve finansman

Toplum üyesi [Cinque McFarlane-Blake](https://github.com/cinquemb) bu süreci otomatik olarak geliştirecek uygun bir senaryo hazırladı. [Burada](https://github.com/ava-labs/avalanche-docs/tree/1b06df86bb23632b5fa7bf5bd5b10e8378061929/scripts/make_accounts.js) bulabilirsin. Bu komutu kullanarak indir:

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/make_accounts.js;
```

**Not**: `Eğer bu` ders alanının başında adımları takip ediyorsanız, 9545 yerine port 9650 yerine limanı kullanmak için `make_accounts.js` betiğini değiştirmeniz gerekir.

Senaryoyu şöyle yazabilirsiniz:

```text
truffle exec make_accounts.js --network development
```

Senaryo bir hesap oluşturacak ve C-Chain adresini finanse edecek. Yazılımdaki `maksimum hesaplar` ve `miktarı` düzenleyerek hesapların sayısını ve of yatırdığı miktarını özelleştirebilirsiniz.

## Göçmenleri Çalıştır

Şimdi her şey göçleri yönetecek ve `Depo` sözleşmesini yayınlayacak:

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

Eğer hesabı açmadıysan, bu hatayı göreceksin:

```text
Error:  *** Deployment Failed ***

"Migrations" -- Returned error: authentication needed: password or unlock.
```

## your etkileşim kuruyorum.

`Depo` sözleşmesi şimdi de dağıtıldı. Zincirin numarasını yazıp sonra tekrar okuyalım. Yer mantarı konsolunu tekrar aç:

`Depo` sözleşmesinin bir örneğini alın:

```javascript
truffle(development)> let instance = await Storage.deployed()
```

Bu geri dönüş:

```text
undefined
```

### Blok zincirine bir sayı yazılıyor

`Artık Depo` sözleşmesi örneğini aldığınıza göre `mağaza` yöntemini arayın ve blok zincirine yazmak için bir sayı verin.

```javascript
truffle(development)> instance.store(1234)
```

Eğer bu hatayı görürseniz:

```text
Error: Returned error: authentication needed: password or unlock
```

O zaman tekrar çalıştır.

```text
truffle(development)> await web3.eth.personal.unlockAccount(account[0])
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

Blok zincirindeki numarayı okumak için `Depo` sözleşmesinin `geri alma` yöntemini ara.

```javascript
truffle(development)> let i = await instance.retrieve()
```

Bu geri dönmeli.

```javascript
undefined
```

`Bu` çağrının sonucu bir `BN` \(büyük sayı). Değerini görmek için `.toNumber` metodunu çağır:

```javascript
truffle(development)> i.toNumber()
```

Sakladığın numarayı görmelisin.

```javascript
1234
```

## Özetle

Şimdi yerel bir Avalanche ağı başlatmak için gereken araçlara sahipsiniz, bir mantarlı projesi yaratmak, derlemek, dağıtım ve Solidity sözleşmeleriyle etkileşim kurmak için de ihtiyacınız var.


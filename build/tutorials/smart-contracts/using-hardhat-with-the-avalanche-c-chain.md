# Çığ with Hardhat kullanıyor

## Tanıştırma

Avalanche, merkeziyetli uygulamalar ve entelektüel blok zinciri launching başlatmak için açık kaynak bir platformdur. Avalanche size hem ağ hem de uygulama katmanları & on tam kontrolünü verir; hayal edebileceğiniz her şeyi yapmanıza yardımcı olur.

Avalanche Ağı birçok blok zincirinden oluşur. Bu blockchains biri Ethereum Sanal Makinesi örneği, C-Chain \(Sözleşme Zinciri\). C-Chain's API'si Ethereum düğümünün API'si ile neredeyse aynıdır. Avalanche Ethereum ile aynı arayüzü sunar ancak daha yüksek hız, daha yüksek geçim, düşük ücret ve daha düşük işlem doğrulama saatleri ile. Bu özellikler DApps performansını ve akıllı sözleşmelerin kullanıcı deneyimini önemli ölçüde artırır.

Bu rehber goal to akıllı sözleşmelerin yazma, test ve dağıtılması konusunda en iyi uygulamaları sunmaktır. Geliştirme ortamı [with](https://hardhat.org) akıllı sözleşmeler yapacağız.

## Ön şartlar

### NodeJS ve Yars

İlk olarak, [nodejs](https://nodejs.org/en). LTS \(uzun vadeli destek\) sürümünü yükleyin. `14.17.0`Bu yazma zamanıdır. NodeJS `npm`yığınları.

Sırada, [diziyi](https://yarnpkg.com) kur:

```zsh
npm install -g yarn
```

### AvalancheGo ve Avash

[Avalanchego,](https://github.com/ava-labs/avalanchego) Go'da yazılmış bir Avalanche düğümü. [Avash](https://docs.avax.network/build/tools/avash) yerel test ağlarını hızlı bir şekilde yerleştirmek için bir araçtır. Birlikte yerel test ağlarını yerleştirip test edebilirsiniz.

### Dayanıklılık ve Çığ

Ayrıca [Avalanche](https://docs.avax.network) ve [Solidity](https://docs.soliditylang.org) ile ilgili temel anlayışlara sahip olmak da yararlı olur.

## Bağımlılıklar

[Hızlı bir başlangıç](https://github.com/ava-labs/avalanche-smart-contract-quickstart) deposunu klonla ve gerekli paketleri `yarn`yerleştir.

```zsh
$ git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
$ cd avalanche-smart-contract-quickstart
$ yarn
```

## Sözleşmeleri Yazın

`Coin.sol`Sözleşmeyi düzenleyin. [Açık Zeppelin ERC20](https://openzeppelin.com)[](https://eips.ethereum.org/EIPS/eip-20) `contracts/``Coin.sol`sözleşmesidir. ERC20 popüler bir kontrat arayüzü. Ayrıca kendi sözleşmelerini de ekleyebilirsin.

## Hardhat Yapılandırma

Hardhat yapılandırma dosyası `hardhat.config.js`olarak kullanır. Görevleri, ağları, derleyicileri ve daha fazlasını o dosyada tanımlayabilirsiniz. Daha fazla bilgi için [burada](https://hardhat.org/config/) görün.

Depomuzda önceden yapılandırılmış bir dosya [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts) kullanırız. Bu dosya Avalanche ile düzgün bir etkileşim sağlamak için gerekli ağ bilgilerini oluşturuyor. Ayrıca yerel test ağında test için önceden tanımlanmış özel anahtarlar da vardır.

## Hardhat Görevleri

[Özel](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts) hardhat görevlerini in tanımlayabilirsiniz. Örnek olarak iki görev vardır: `accounts`ve`balances` İkisinde [de](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) paket var. Json.

```json
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts`Hesapların listesini basar. AVAX hesap dengeleri listesini `yarn balances`basar. Diğer `yarn`senaryolarda olduğu gibi `--network`bayrak içinde hardhat görevlerine geçebilirsiniz.

### Hesaplar

Avash şebekesinde hesapların bir listesini yazdırır.

```zsh
$ yarn accounts --network local
yarn run v1.22.4
npx hardhat accounts --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
0x9632a79656af553F58738B0FB750320158495942
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4
0x0B891dB1901D4875056896f28B6665083935C7A8
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2
0x78A23300E04FB5d5D2820E23cc679738982e1fd5
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB
0x0Fa8EA536Be85F32724D57A37758761B86416123
```

### Dengelem

Avash ağı üzerinde hesapların bir listesini ve onların AVAX dengeleri yazmaktadır.

```zsh
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000000000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 0
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 0
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 0
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 0
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 0
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 0
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 0
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 0
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 0
```

İlk hesap zaten finanse edildi. Bu adres yerel ağ genez dosyasında önceden finanse edildiği için yapılıyor.


## Hardhat

Hardhat's sürümü, kullanım talimatları, küresel seçenekler ve mevcut görevleri listelemek `yarn hardhat`için çalış.

## Tipik Avash Typical

### Avash Koş

İlk önce AvalancheGo son inşa edildiğini doğrulayın.

```zsh
$ cd /path/to/avalanchego
$ git fetch -p
$ git checkout master
$ ./scripts/build.sh
```

\(Kaynak inşa etmek yerine [önceden derlenmiş AvalancheGo ikili](https://github.com/ava-labs/avalanchego/releases) yazabilirsiniz.\)

Avash başlatın ve yeni bir yerel ağ başlatmak için bir senaryoyu çalıştırın.

```zsh
$ cd /path/to/avash
$ git fetch -p
$ git checkout master
$ go build
$ ./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
$ avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua
```

Şimdi 5 düğümlü bir Avalanche ağı işletiyorsun.

### Fon Hesapları

from 1000 AVAX senaryo `hardhat.config.ts`ile birlikte 10 hesaptan her birine aktar.[`fund-cchain-addresses`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/scripts/fund-cchain-addresses.js) Bu hesapları finanse etmek akıllı sözleşmelerle konuşlandırmak ve etkileşim kurmak için bir ön şarttır.

Not: Eğer `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`görürseniz, ağ kayışlı ve kullanmaya hazır olana kadar beklemeniz gerekir. Çok uzun sürmemeli.


```zsh
$ cd /path/to/avalanche-smart-contract-quickstart
$ yarn fund-cchain-addresses
yarn run v1.22.4
npx hardhat run scripts/fund-cchain-addresses.js --network local
Exporting 1000 AVAX to each address on the C-Chain...
2b75ae74ScLkWe5GVFTYJoP2EniMywkcZySQUoFGN2EJLiPDgp
Importing AVAX to the C-Chain...
2dyXcQGiCk1ckCX4Fs8nLgL8GJgsM72f9Ga13rX5v9TAguVJYM
✨  Done in 5.03s.
```

Her the 1000 AVAX ile finanse edildiğini doğrulayın.

```zsh
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000001000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000000000000000000
✨  Done in 0.72s.
```

İlk hesaptan her bir AVAX gönder.

```zsh
$ yarn send-avax-wallet-signer --network local
yarn run v1.22.4
npx hardhat run scripts/sendAvaWalletSigner.ts --network local
Seeding addresses with AVAX
✨  Done in 1.33s.
```

balances güncellendiğini doğrula.

```zsh
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 49999999995275000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000010000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000010000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000010000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000010000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000010000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000010000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000010000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000010000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000010000000000000000
```

### Bileşik Akıllı Sözleşmeler

İçinde bir senaryo [`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json)`compile`var.

```json
"compile": "npx hardhat compile",
```

Projenin to emin olmak `yarn compile`için koş.

Akıllı sözleşmeyi düzelt.

```zsh
$ yarn compile
yarn run v1.22.4
rimraf ./build/
npx hardhat compile
Compiling 1 file with 0.6.4
Compilation finished successfully
✨  Done in 2.13s.
```

## Akıllı Sözleşmeleri Gönder

Hardhat birçok ortama deploying sağlar. [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) konuşlandırma için bir senaryo var.

Konuşlandırma betiğini düzenle`scripts/deploy.ts`

```json
"deploy": "npx hardhat run scripts/deploy.ts",
```

`local`Bayrak ile \(örneğin Avaş ile oluşturulan yerel bir ağ\) `fuji`veya her bir çevre `mainnet`için `--network`hangi ortamı kullanmak istediğinizi seçebilirsiniz. `--network`Eğer içeri girmezsen, bu iş hardhat ağına bağlı olacak. Örneğin, eğer ana ağa taşınmak istiyorsanız:

```zsh
yarn deploy --network mainnet
```

Sözleşmeyi yerel ağınıza gönderin

```zsh
$ yarn deploy --network local
yarn run v1.22.4
npx hardhat run scripts/deploy.ts --network local
Coin deployed to: 0x17aB05351fC94a1a67Bf3f56DdbB941aE6
✨  Done in 1.28s.
```

Şimdi bir jeton `0x17aB05351fC94a1a67Bf3f56DdbB941aE6`yerleştirdik.

### Akıllı Sözleşmeyle etkileşim

Hardhat sözleşmeler ve ağ ile etkileşim kurmak için bir geliştirici konsolu vardır. Hardhat's konsolu hakkında daha fazla bilgi için [burada](https://hardhat.org/guides/hardhat-console.html) görün. Hardhat konsolu bir is ve içinde farklı araçlar kullanabilirsiniz. [Ethers](https://docs.ethers.io/v5/) ağımızla etkileşim kurmak için kullanacağımız kütüphane.

Konsolu şu şekilde açabilirsiniz:

```zsh
$ yarn console --network local
yarn run v1.22.11
npx hardhat console --network local
Welcome to Node.js v16.2.0.
Type ".help" for more information.
>
```

Kontrat örneğini fabrika ve kontrat adresiyle birlikte sözleşmemiz ile etkileşime gir.

```js
> const Coin = await ethers.getContractFactory('ExampleERC20');
undefined
> const coin = await Coin.attach('0x17aB05351fC94a1a67Bf3f56DdbB941aE6')
undefined
```

İlk satır ABI & bytecode ile sözleşme fabrikasını geri alır. İkinci satır sözleşmeli olarak sözleşmeli adresi olan bir fabrikanın örneğini alır. `0x17aB05351fC94a1a67Bf3f56DdbB941aE6`Sözleşmemizin önceki adımda çoktan konuşlandırıldığını hatırlayın.

Hesapları getir:

```js
> let accounts = await ethers.provider.listAccounts()
undefined
> accounts
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
Bu tam olarak aynı hesap `yarn accounts`listesi.

Şimdi sözleşmemizle etkileşime `ERC-20`geçebiliriz:

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456789'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'0'
```

`account[0]`Bir denge var, çünkü varsayılan hesap `account[0]`bu. Bu hesapla sözleşme imzalandı. [123456789 yılında ErC20.sol](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol)`TOTAL_SUPPLY` nane yapıcısı, sözleşmenin konuşlandırılmasına işaret etti.

`accounts[1]`Şu anda denge yok. `0x9632a79656af553F58738B0FB750320158495942`Birkaç hediye `accounts[1]`gönder.

```js
> let result = await coin.transfer(accounts[1], 100)
undefined
> result
{
  hash: '0x35eec91011f9089ba7689479617a90baaf8590395b5c80bb209fa7000e4848a5',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 3,
  data: '0xa9059cbb0000000000000000000000009632a79656af553f58738b0fb7503201584959420000000000000000000000000000000000000000000000000000000000000064',
  r: '0xc2b9680771c092a106eadb2887e5bff41fcda166c8e00f36ae79b196bbc53d36',
  s: '0x355138cb5e2b9f20c15626638750775cfc9423881db374d732a8549d05ebf601',
  v: 86260,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

Not: Bu yerel bir ağ olduğundan işlem kabul edilene kadar beklememize gerek yoktu. `fuji``mainnet`Ancak diğer ağlar için işlem kabul edilene kadar beklemeniz gerekir:`await result.wait()`

Şimdi jetonların transfer edilmesini sağlayabiliriz:

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456689'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'100'
```

"Gönderen" bilgisi olmadığını fark edebileceğiniz `await coin.transfer(accounts[1], 100)`gibi; bu ilk işaretleyiciyi öntanımlı belirleyici olarak `ethers`kullandığı içindir. Bizim durumumuzda bu `account[0]`olur. Başka bir hesap kullanmak istiyorsak önce onunla bağlantı kurmalıyız.

```js
> let signer1 = await ethers.provider.getSigner(1)
> let contractAsSigner1 = coin.connect(signer1)
```

Şimdi kontratı da `signer1`yapabiliriz, ki `account[1]`bu.

```js
> await contractAsSigner1.transfer(accounts[0], 5)
{
  hash: '0x807947f1c40bb723ac312739d238b62764ae3c3387c6cdbbb6534501577382dd',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x9632a79656af553F58738B0FB750320158495942',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 2,
  data: '0xa9059cbb0000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc0000000000000000000000000000000000000000000000000000000000000005',
  r: '0xcbf126dd0b109491d037c5f3af754ef2d0d7d06149082b13d0e27e502d3adc5b',
  s: '0x5978521804dd15674147cc6b532b8801c4d3a0e94f41f5d7ffaced14b9262504',
  v: 86259,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

Şimdi dengeleri kontrol edelim:

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456694'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'95'
```

`accounts[1]`5 jeton aktardık.`accounts[0]`

## Özetle

Şimdi yerel bir Avalanche ağı başlatmak için gereken araçlara sahipsiniz, Hardhat projesi oluşturmak ve Dayanıklılık sözleşmeleri ile etkileşim kurmak için de ihtiyacınız var.

[Daha](https://chat.avax.network) fazla bilgi almak için Discord Sunucumuza katılın ve soracağınız soruları sorun.
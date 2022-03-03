# Hardhat'i Avalanche C-Chain ile Kullanma

## Giriş

Avalanche, merkeziyetsiz uygulamaları ve kurumsal blok zincir deployment'larını karşılıklı işletilebilir, yüksek düzeyde ölçeklenebilir tek bir ekosistemde kullanıma sunmak için tasarlanmış açık kaynaklı bir platformdur. Avalanche hem ağ hem de uygulama katmanlarında size tam kontrol vererek hayal edebileceğiniz her şeyi oluşturabilmenizi sağlar.

Avalanche Ağı birçok blok zincirden oluşur. Bu blok zincirlerden biri, Ethereum Sanal Makine instance'ı olan C-Chain'dir \(Kontrat Zinciri\). C-Chain'in API'si, bir Ethereum düğümünün API'si ile neredeyse aynıdır. Avalanche, Ethereum ile aynı arayüzü daha yüksek hız, daha yüksek hacim, daha düşük işlem ücretleri ve daha düşük işlem onaylama süreleri ile sunar. Bu özellikler DApp'lerin performansını ve akıllı sözleşmelerin kullanıcı deneyimini önemli ölçüde iyileştirir.

Bu rehberin amacı, Avalanche'ın C-Chain'inde akıllı sözleşmelerin yazılması, test edilmesi ve deploy edilmesindeki \(kullanıma sunma\) en iyi uygulamaları açıklamaktır. [Hardhat](https://hardhat.org) geliştirme ortamıyla akıllı sözleşmeler oluşturacağız.

## Ön gereklilikler

### NodeJS ve Yarn

Öncelikle, [nodejs](https://nodejs.org/en)'nin LTS \(uzun vadeli destek\) sürümünü kurun. Bu rehberin yazıldığı tarih itibarıyla, bu `14.17.0`'dir. NodeJS paketleri`npm`.

Ardından, [yarn](https://yarnpkg.com)'ı kurun:

```text
npm install -g yarn
```

### AvalancheGo ve Avash

[AvalancheGo](https://github.com/ava-labs/avalanchego), Go ile yazılmış bir Avalanche düğümü implementasyonudur. [Avash](https://docs.avax.network/build/tools/avash), yerel test ağlarını hızla deploy etmeyi sağlayan bir araçtır. İkisini birlikte kullandığınızda, yerel test ağlarını deploy edebilir ve üzerlerinde testleri çalıştırabilirsiniz.

### Solidity ve Avalanche

[Solidity](https://docs.soliditylang.org) ve [Avalanche](https://docs.avax.network) hakkındaki temel bilgileri edinmek de faydalı olacaktır.

## Bağımlılıklar

[Hızlı başlangıç havuzunu](https://github.com/ava-labs/avalanche-smart-contract-quickstart) klonlayın ve `yarn` vasıtasıyla gerekli paketleri kurun.

```text
$ git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
$ cd avalanche-smart-contract-quickstart
$ yarn
```

## Sözleşmeler Yazın

`contracts/` içinde `Coin.sol` sözleşmesini düzenleyin. `Coin.sol`, bir [Open Zeppelin](https://openzeppelin.com) [ERC20](https://eips.ethereum.org/EIPS/eip-20) sözleşmesidir. ERC20, popüler bir akıllı sözleşme arayüzüdür. Ayrıca kendi sözleşmelerinizi de ekleyebilirsiniz.

## Hardhat Yapılandırması

Hardhat, yapılandırma dosyası olarak `hardhat.config.js` kullanır. Bu dosyada görevleri, ağları, derleyicileri ve çok daha fazlasını tanımlayabilirsiniz. Daha fazla bilgi için [buraya](https://hardhat.org/config/) bakın.

Havuzumuzda önceden yapılandırılmış bir [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts) dosyası kullanıyoruz. Bu dosya, Avalanche ile sorunsuz bir etkileşim sağlamak için gereken ağ bilgilerini yapılandırır. Ayrıca yerel bir test ağında test etmek için önceden tanımlanmış bazı özel anahtarlar da vardır.

## Hardhat Görevleri

Özel hardhat görevlerini [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts) dosyasında tanımlayabilirsiniz. Örnek olarak iki görev dâhil edilmiştir: `accounts` ve `balances`. Her ikisinin de [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) dosyasında script'leri vardır.

```javascript
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts`, hesap listesini print eder. `yarn balances` ise AVAX hesap bakiyeleri listesini print eder. Diğer  `yarn` script'lerinde olduğu gibi hardhat görevlerine bir  `--network` bayrağı iletebilirsiniz.

### Accounts \(hesaplar\)

Yerel Avash ağındaki hesapların listesini print eder.

```text
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

### Balances \(bakiyeler\)

Yerel Avash ağındaki hesapların ve bu hesapların AVAX bakiyelerinin listesini print eder.

```text
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

İlk hesabın daha önce fonlanmış olduğuna dikkat edin. Bunun nedeni, bu adresin yerel ağ genesis dosyasında önceden fonlanmış olmasıdır.

## Hardhat Yardım

Hardhat'in sürümü, kullanım talimatları, global seçenekleri ve mevcut görevlerini listelemek için `yarn hardhat` çalıştırın.

## Tipik Avash İş Akışı

### Avash'ı Çalıştırın

Öncelikle en son AvalancheGo built'una sahip olduğunuzdan emin olun.

```text
$ cd /path/to/avalanchego
$ git fetch -p
$ git checkout master
$ ./scripts/build.sh
```

\(Kaynaktan build etmek yerine [önceden derlenmiş AvalancheGo binary'lerini](https://github.com/ava-labs/avalanchego/releases) de indirebileceğinizi unutmayın.\)

Avash'ı başlatın ve yeni bir yerel ağ başlatmak için bir script çalıştırın.

```text
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

Şimdi 5 düğüme sahip bir yerel Avalanche ağı çalıştırıyorsunuz.

### Hesapları Fonlayın

[`fund-cchain-addresses`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/scripts/fund-cchain-addresses.js) script'i ile `hardhat.config.ts` içerisindeki 10 hesabın her birine X-Chain'den 1.000 AVAX transfer edin. Bu hesapların fonlanması, akıllı sözleşmeler deploy etmek ve akıllı sözleşmelerle etkileşime girmek için ön şarttır.

Not: `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`mesajını görüyorsanız, ağ bootstrap işlemi tamamlanana ve ağ kullanıma hazır hale gelen kadar beklemeniz gerekir. Bu işlemin uzun sürmemesi gerekir.

```text
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

Hesapların her birinin 1.000 AVAX ile fonlanmış olduğunu doğrulayın.

```text
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

Hesapların her birine, ilk hesaptan biraz AVAX gönderin.

```text
$ yarn send-avax-wallet-signer --network local
yarn run v1.22.4
npx hardhat run scripts/sendAvaWalletSigner.ts --network local
Seeding addresses with AVAX
✨  Done in 1.33s.
```

Bakiyelerin güncellendiğini doğrulayın

```text
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

### Akıllı Sözleşmeler Derleyin

[`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) içinde bir  `compile` script'i vardır.

```javascript
"compile": "npx hardhat compile",
```

Projenizin derlendiğinden emin olmak için `yarn compile` komutunu çalıştırın.

Akıllı sözleşmeyi derleyin.

```text
$ yarn compile
yarn run v1.22.4
rimraf ./build/
npx hardhat compile
Compiling 1 file with 0.6.4
Compilation finished successfully
✨  Done in 2.13s.
```

## Akıllı Sözleşmeleri Deploy Edin

Hardhat, birden fazla ortama deploy etmeye olanak verir. [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) dosyasının içinde deploy etmek için bir script vardır.

`scripts/deploy.ts` içinde deployment script'i edit edin

```javascript
"deploy": "npx hardhat run scripts/deploy.ts",
```

`local` ile `--network`bayrağını ileterek hangi ortama deploy etmek istediğinizi seçebilirsiniz \(örneğin Avash ile oluşturulmuş bir yerel ağ\), `fuji` veya her bir ortam için `mainnet`. Eğer `--network` iletmezseniz, varsayılan olarak hardhat ağı olacaktır. Örneğin, eğer mainnet'e deploy etmek istiyorsanız:

```text
yarn deploy --network mainnet
```

Sözleşmeyi yerel ağınıza deploy edin

```text
$ yarn deploy --network local
yarn run v1.22.4
npx hardhat run scripts/deploy.ts --network local
Coin deployed to: 0x17aB05351fC94a1a67Bf3f56DdbB941aE6
✨  Done in 1.28s.
```

Şimdi `0x17aB05351fC94a1a67Bf3f56DdbB941aE6` adresinde deploy edilmiş bir token'ımız var.

### Akıllı Sözleşme ile etkileşime girin

Hardhat, sözleşmeler ve ağ ile etkileşime girmek için bir geliştirici konsoluna sahiptir. Hardhat'in konsolu hakkında daha fazla bilgi için [buraya](https://hardhat.org/guides/hardhat-console.html) bakın. Hardhat konsolu bir NodeJS-REPL'dir ve içinde farklı araçlar kullanabilirsiniz. [ethers](https://docs.ethers.io/v5/), ağımız ile etkileşime girmek için kullanacağımız kitaplıktır.

Konsolu şununla açabilirsiniz:

```text
$ yarn console --network local
yarn run v1.22.11
npx hardhat console --network local
Welcome to Node.js v16.2.0.
Type ".help" for more information.
>
```

Sözleşmemizle etkileşime girmek için fabrika ve sözleşme adresiyle sözleşme örneğini alın:

```javascript
> const Coin = await ethers.getContractFactory('ExampleERC20');
undefined
> const coin = await Coin.attach('0x17aB05351fC94a1a67Bf3f56DdbB941aE6')
undefined
```

İlk satır, ABI ve bytecode ile sözleşme fabrikasını getirir. İkinci satır, belirtilen sözleşme adresi ile o sözleşme fabrikasının bir instance'ını getirir. Bir önceki adımda sözleşmemizin `0x17aB05351fC94a1a67Bf3f56DdbB941aE6` adresinde deploy edilmiş olduğunu hatırlayın.

Hesapları getirin:

```javascript
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

Bu,  `yarn accounts` içindeki hesap listesiyle tamamen aynıdır.

Şimdi `ERC-20` sözleşmemizle etkileşime girebiliriz:

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456789'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'0'
```

`account[0]` varsayılan hesap olduğu için `account[0]` bir bakiyeye sahiptir. Sözleşme bu hesap ile deploy edilir. [ERC20.sol](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol)'un oluşturucusu, 123456789 adet tokenın `TOTAL_SUPPLY`'ını, yani toplam arzını, sözleşmenin deploy edicisine mint eder.

`accounts[1]` şu anda hiçbir bakiyeye sahip değil. `accounts[1]` hesabına, yani `0x9632a79656af553F58738B0FB750320158495942` adresine biraz token gönderin.

```javascript
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

Not: Bu yerel bir ağ olduğu için, işlem kabul edilene kadar beklememiz gerekmedi. Ancak `fuji` veya `mainnet` gibi diğer ağlarda işlem şununla kabul edilene kadar beklemeniz gerekir: `await result.wait()`.

Şimdi token'ların transfer edildiğinden emin olabiliriz:

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456689'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'100'
```

Fark etmiş olabileceğiniz üzere `await coin.transfer(accounts[1], 100)` içinde hiçbir "gönderen" bilgisi yoktu; bunun nedeni de `ethers`'nin varsayılan imzalayan olarak ilk imzalayanı kullanıyor olmasıdır. Bizim durumumuzda bu `account[0]`'dir. Eğer başka bir hesap kullanmak istersek, önce o hesaba bağlanmamız gerekir.

```javascript
> let signer1 = await ethers.provider.getSigner(1)
> let contractAsSigner1 = coin.connect(signer1)
```

Şimdi `signer1` ile, ki `account[1]`'dir, sözleşmeyi çağırabiliriz.

```javascript
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

Şimdi bakiyeleri kontrol edelim:

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456694'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'95'
```

`accounts[1]` hesabından `accounts[0]` hesabına başarılı bir şekilde 5 token transfer ettik.

## Özet

Şimdi yerel bir Avalanche ağı başlatmak, bir Hardhat projesi yaratmak ve Solidity sözleşmeleri yaratmak, derlemek, deploy etmek ve bunlarla etkileşimde bulunmak için gerekli araçlara sahipsiniz.

Daha fazla bilgi almak ve sormak istediğiniz soruları sormak için [Discord Sunucumuza](https://chat.avax.network) katılın.


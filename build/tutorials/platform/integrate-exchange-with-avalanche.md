# Avalanche C-Chain ile bir Değişim Kur

## Gözden geçirme

Bu belgenin amacı EVM uyumlu Avalanche C-Chain ile nasıl entegre edileceği hakkında kısa bir genel bakış açısı sağlamaktır. ETH, destekleyen takımlar için C-Chain destekleyen takımlar için işlemler yapılırken Avalanche node \ ([go-ethereum](https://geth.ethereum.org/docs/rpc/server)\ ile [aynı API](https://eth.wiki/json-rpc/API) olan bir Avalanche node () çevirmek ve Avalanche ChainID \(4314\) nüfusa sahip olmak kadar düz bir şekilde hareket eder.

Ava Labs, [Avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta) adı verilen C-Chain için [Rosetta API](https://www.rosetta-api.org/)'nin uygulanmasını sürdürmektedir. Bu standart entegrasyon yolu hakkında daha fazla bilgi edinebilirsiniz. eklenen Rosetta API web sitesinden

## EVM Endpoint kullanılarak entegrasyon

### Bir Çığ düğümünü çalıştırıyor

Düğüm formunu oluşturmak istiyorsanız ya da bir docker resmine dahil etmek istiyorsanız [AvalancheGo GitHub](https://github.com/ava-labs/avalanchego) deposunu referans edin. Hızlı bir şekilde kalkmak ve çalıştırmak için, otomatik matların Linux'ta bir sistem servisi olarak takılan ve güncellemesi olan [düğüm kurulum](../nodes-and-staking/set-up-node-with-installer.md) metini, prebuilt edilmiş ikili kullanarak kullanabilirsiniz.

### Bir Çığ düğümünü yapılandırılıyor

Tüm yapılandırma seçenekleri ve varsayılan değerleri [burada](../../references/command-line-interface.md) tanımlanmıştır.

Komut satırında yapılandırma seçenekleri sağlayabilirsiniz, ya da birçok seçenek sağlarken daha kolay işleyebileceğiniz bir yapılandırma dosyası kullanabilirsiniz. `Config.json``,` anahtarları ve değerleri seçenek isimleri ve değerleri olan bir JSON dosyası olan with yapılandırma dosyası konumunu belirtebilirsiniz.

C-Chain de dahil olmak üzere bireysel zincirlerin node-level seçeneklerden ayrı olan kendi yapılandırma seçenekleri vardır. Bunlar bir yapılandırma dosyasında da belirtilebilir. Daha fazla detay için, [buraya](../../references/command-line-interface.md#chain-configs) bak.

C-Chain yapılandırma dosyası `at` olmalıdır. tell da C-Chain yapılandırma dosyasını başka bir yerde aramasını söyle. -zincir `--chain-config-dir`. C-Chain yapılandırma dosyası:

```javascript
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "net-api-enabled": true,
  "eth-api-enabled": true,
  "personal-api-enabled": false,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true,
  "local-txs-enabled": true
}
```

{% ipuçları style="warning" } Ethereum [Arşiv Düğümü](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) işlevselliğine ihtiyacınız varsa, AvalancheGo v1.4.10 yılından bu yana öntanımlı olarak etkin olan C-Chain disable devre dışı bırakmanız gerekir. Delik açmayı devre dışı bırakmak için, `"pruning-enabled":` içerir: C-Chain yapılandırma dosyasında yanlış var. {% endhint }

### with etkileşim

C-Chain ile etkileşim [go-ethereum](https://geth.ethereum.org/) ile etkileşim aynıdır. C-Chain API için referans materyalini [burada](../../avalanchego-apis/contract-chain-c-chain-api.md) bulabilirsiniz.

Lütfen `kişisel` isimlendirme alanının öntanımlı olarak kapatıldığını unutmayın. Açmak için uygun komut satırı düğmesini your geçmeniz gerekir. Yukarıdaki yapılandırma örneğindeki gibi.

## Rosetta kullanarak entegrasyon

[Rosetta](https://www.rosetta-api.org/), her ağ için aynı API'ler sunarak farklı blok zincir ağlarıyla entegre etmeyi kolaylaştıran bir açık kaynak ve araç setidir. Rosetta API, [Veri](https://www.rosetta-api.org/docs/data_api_introduction.html) API ve [İnşaat](https://www.rosetta-api.org/docs/construction_api_introduction.html) API'dan oluşmaktadır. Bu API'ler birlikte standart bir iletişim protokolü üzerine standart bir biçimde, herkesin blok zincirlerine okuma ve yazma imkânı sağlar. Bu for özellikleri, [Rosetta](https://github.com/coinbase/rosetta-specifications) spesifikasyonlarında bulunabilir.

Burada Avalanche C-Chain için Rosetta sunucu uygulamasını [bulabilirsiniz](https://github.com/ava-labs/avalanche-rosetta), tek yapmanız gereken kurarak sunucuları düzgün yapılandırma ile çalıştırmak. Sunucu ve Avalanche müşterisini paketleyen bir Dockerfile ile birlikte geliyor. Ayrıntılı talimatlar bağlantılı depoda bulunabilir.

## İşlemler Yapılandırıyor

Avalanche C-Chain işlemleri standart EVM işlemleriyle 2 istisna:

* Bu gruplar Avalanche’s ChainID \(4314\) ile anlaşmalıdır.
* Gaz fiyatı 225 Gwei ile sabitlendi.

Avalanche Ethereum için tüm popüler araçları destekler, böylece Ethereum ve Solidity ile aşina geliştiriciler evlerinde hissedebilirler. Birçok popüler gelişme ortamının özel dersleri ve deposu var:

* [MetaMask ve Remix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [- Trakya](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](https://github.com/ava-labs/avalanche-smart-contract-quickstart)

## Zincirleme Verilerini Ingesting

Ethereum ağı için kullandığınız zincirli verileri yalamak için standart bir yöntemi kullanabilirsiniz.

### Nihai Kararlaştırıcı

Avalanche uzlaşması 1-2 saniye ile hızlı ve geri dönüşü olmayan son sağlar. En güncel nihai bloğu sorgulamak için, herhangi bir değeri (yani blok, denge, durum, vb.) `en son` parametreyle sorgulamak için. Eğer son nihai bloğun üzerinde soru sorarsanız\ et\ n\ et\ blok numarası 10 değerini ve 11\ sorgu yaparsanız, sonuçsuz verilerin sorgulanamayacağını belirten bir hata atılacaktır \(as v1.3.2\)

### \(Optional\ \(Optional\) Golang SDK

Eğer from Golang kullanarak kendi sistemlerinize veri çıkarmayı planlıyorsanız özel [our](https://github.com/ava-labs/coreth/tree/master/ethclient) kullanmanızı öneriyoruz. Standart go-ethereum Ethereum istemcisi tıkanıklıkları doğru şekilde hesaplamaz\\ `(block.Hash()\)` çünkü eklenen `block.Hash()\) (https://github.com/ava-labs/coreth/blob/2c3cfac5f76ce5f32a2dc4441bb447373b43b4f8f8f1/çekirdek çekirdek çekirdek / tik/tik/tıka/tık.go#L98)` başlık alan field C-Chain Avalanche C-Chain blokları arasında yer alan blokları arasında yer alan AVAX (X-Chain ve P-Chain arasında hareket edilir ve P-Chain arasında hareket edilir. [Buradaki](../../../learn/platform-overview/) çoklu zincirli soyutlama hakkında daha fazla şey okuyabilirsiniz\ (normal bir C-Chain entegrasyonu için).

Eğer JSON yanıtlarını doğrudan okumayı planlıyorsanız veya web3.js (telden alınan özeti yeniden \(doesn't zincirleme işlem verileri/günlük/makbuzları çıkarmak için herhangi bir sorununuz olmamalı!

## Destek

Herhangi bir sorunuz ya da sorunuz varsa ya our ya da kamu [Discord](https://chat.avalabs.org/) sunucumuzla doğrudan iletişime geçin.


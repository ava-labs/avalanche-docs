# Bir Borsayı Avalanche C-Chain ile Entegre Edin

## Genel Bakış

Bu belgenin amacı, EVM Uyumlu Avalanche C-Chain'in nasıl entegre edileceğine ilişkin kısa bir genel bakış sunmaktır. Halihazırda ETH'yi destekleyen ekipler için, C-Chain'in desteklenmesi, \([go-ethereum](https://geth.ethereum.org/docs/rpc/server) ile [aynı API'ye](https://eth.wiki/json-rpc/API) sahip olan\) bir Avalanche düğümü programlamak ve işlemleri yapılandırırken Avalanche’ın Zincir Kimliğini \(43114\) doldurmak kadar basittir.

Ek olarak, Ava Labs, C-Chain için [avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta) adı verilen [Rosetta API](https://www.rosetta-api.org/)'nin implementasyonunu devam ettirir. Bu standartlaştırılmış entegrasyon yolu hakkında ekteki Rosetta API web sitesinden daha fazla bilgi edinebilirsiniz.

## EVM Son Noktalarını kullanarak entegrasyon

### Bir Avalanche düğümünü çalıştırma

Düğümünüzü kaynaktan kurmak ya da düğümünüzü bir docker image'a dahil etmek isterseniz, [AvalancheGo GitHub yazılım havuzuna](https://github.com/ava-labs/avalanchego) başvurun. Çabucak işe koyulup yol almak için, avalanchego düğümünün kurulumunu ve güncellenmesini önceden kurulmuş binary'leri kullanarak Linux'ta bir systemd servisi olarak otomatikleştiren [node installation script](../nodes-and-staking/set-up-node-with-installer.md)'i kullanabilirsiniz.

### Bir Avalanche düğümünü yapılandırma

Tüm yapılandırma seçenekleri ve bunların varsayılan değerleri [burada](../../references/command-line-interface.md) açıklanmaktadır.

Komut satırına yapılandırma seçenekleri girebilir, ya da çok sayıda seçenek giriyorsanız işinizi daha kolay hale getirebilecek bir config dosyası kullanabilirsiniz. Config dosyasının konumunu `—config-file=config.json` parametresi ile belirtebilirsiniz, burada `config.json` bir JSON dosyasıdır ve bu dosyanın anahtarları ve değerleri, seçenek adları ve değerleridir.

C-Chain de dahil olmak üzere, ferdi zincirler kendi yapılandırma seçeneklerine sahiptir; bu seçenekler, düğüm düzeyindeki seçeneklerden ayrıdır. Bu seçenekler bir config dosyasında da belirtilebilir. Daha fazla ayrıntı için [buraya](../../references/command-line-interface.md#chain-configs) bakın.

C-Chain config dosyası `$HOME/.avalanchego/configs/chains/C/config.json`\`da olsa gerektir. AvalancheGo'ya C-Chain config dosyasını başka bir yerde aramasını `--chain-config-dir` seçeneğiyle de söyleyebilirsiniz. Örnek bir C-Chain config dosyası:

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

:::dikkat


Ethereum [Archive Node](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) işlevine ihtiyacınız varsa, AvalancheGo v1.4.10 sürümünden itibaren varsayılan olarak etkinleştirilen C-Chain pruning \(budama\) işlevini devre dışı bırakmanız gerekir. Pruning işlevini devre dışı bırakmak için `"pruning-enabled": false` komutunu C-Chain config dosyasına dahil edin.


:::

### C-Chain ile etkileşimde bulunma

C-Chain ile etkileşimde bulunma, [go-ethereum](https://geth.ethereum.org/) ile etkileşimde bulunmayla aynıdır. C-Chain API ile ilgili kaynak materyali [burada](../../avalanchego-apis/contract-chain-c-chain-api.md) bulabilirsiniz.

`personal_` ad alanının varsayılan olarak kapalı olduğunu aklınızda bulundurun. Bu ad alanını açmak için, uygun komut satırı anahtarını yukarıdaki yapılandırma örneğindeki gibi düğümünüze aktarmanız gerekir.

## Rosetta'yı kullanarak entegrasyon

[Rosetta](https://www.rosetta-api.org/), her ağ için aynı API'ler setini sunarak farklı blok zincir ağlarıyla entegrasyonu kolaylaştıran açık kaynaklı bir spesifikasyon ve araç setidir. Rosetta API'si 2 temel bileşenden oluşur: [Veri API'si](https://www.rosetta-api.org/docs/data_api_introduction.html) ve [Oluşturma API'si](https://www.rosetta-api.org/docs/construction_api_introduction.html). Bu API'ler birlikte herkesin standart bir iletişim protokolü aracılığıyla blok zincirleri okumasına ve blok zincirlere yazmasına olanak sağlar. Bu API'lerin spesifikasyonlarını [rosetta-specifications](https://github.com/coinbase/rosetta-specifications) havuzunda bulabilirsiniz.

Avalanche C-Chain için Rosetta sunucu implementasyonunu [burada](https://github.com/ava-labs/avalanche-rosetta) bulabilirsiniz, tek yapmanız gereken, sunucuyu uygun yapılandırma ile yüklemek ve çalıştırmaktır. Bu implementasyon, hem sunucuyu hem de Avalanche istemcisini paket olarak sunan bir Dockerfile ile birlikte gelir. Ayrıntılı talimatları bağlantı verilen havuzda bulabilirsiniz.

## İşlemleri oluşturma

Avalanche C-Chain işlemleri, 2 istisna dışında, standart EVM işlemleriyle aynıdır:

* Bu işlemler Avalanche’ın ChainID'si \(zincir kimliği\) \(43114\) ile imzalanmalıdır.
* Ayrıntılı dinamik gaz ücretini [burada](../../../learn/platform-overview/transaction-fees.md#c-chain-fees) bulabilirsiniz.

Geliştirme amaçları için, Avalanche, Ethereum'un tüm popüler araçlarını destekler, dolayısıyla Ethereum ve Solidity bilgisi olan geliştiriciler hiç yabancılık çekmezler. Birkaç popüler geliştirme ortamına yönelik eğitim makalelerimiz ve yazılım havuzlarımız vardır:

* [MetaMask ve Remix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Truffle](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md)

## Zincirdeki Verilerin Sindirilmesi

Ethereum ağı için kullandığınız zincir verilerinin sindirimi için herhangi bir standart yöntemi kullanabilirsiniz.

### İşlem Kesinliğinin Belirlenmesi

Avalanche konsensüs protokolü 1-2 saniye içinde hızlı ve geri döndürülemez bir işlem kesinliği sağlar. En güncel kesinleştirilmiş bloku sorgulamak için `latest` parametresini kullanarak herhangi bir değeri \(yani blok, bakiye, durum vb.\) sorgulayın. Yukarıda son kesinleştirilmiş bloku sorgularsanız \(yani eth\_blockNumber 10 değerini döndürüyor ve siz 11 sorgusunu yürütüyorsanız\), kesinleştirilmemiş verilerin sorgulanamayacağını belirten bir hata alırsınız \(avalanchego@v1.3.2 sürümünden itibaren\).

### \(İsteğe Bağlı\) Özel Golang SDK'sı

Golang'ı kullanarak C-Chain'den kende sistemlerinize veriler özütlemeyi \(extract\) planlıyorsanız, özel [ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient)'ımızı kullanmanızı öneririz. Standart go-ethereum Ethereum istemcisi \(`block.Hash()` komutunu çağırdığınızda\) blok hash'lerini doğru şekilde hesaplamaz, çünkü Avalanche C-Chain bloklarında bulunan ve zincirler \(X-Chain ve P-Chain\) arasında AVAX aktarmak için kullanılan eklenmiş `[ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98)` header alanını dikkate almaz. Çoklu zincir soyutlama özelliğimiz hakkında [buradan](../../../learn/platform-overview/README.md) daha fazla bilgi edilebilirsiniz \(normal bir C-Chain entegrasyonu için kapsam dışıdır\).

JSON yanıtlarını doğrudan okumayı planlıyorsanız veya zincir içi işlem verilerini/günlüklerini/alındı bilgilerini özütlemek için web3.js \(kablo üzerinden alınan hash'i yeniden hesaplamaz\) kullanıyorsanız, herhangi bir sorun yaşamamanız beklenir!

## Destek

Herhangi bir sorun yaşarsanız veya soru sormak isterseniz, doğrudan geliştiricilerimizle veya genel [Discord](https://chat.avalabs.org/) sunucumuz üzerinden iletişim kurun.


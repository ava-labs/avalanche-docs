# Ethereum Your Fırlat

## Gözden geçirme

Bu belgenin amacı şu anki dapp uygulamanıza yardımcı olmak. Avalanche Platformunun temel temellerini elde etmenize, nasıl işlediğini, ağa nasıl bağlanacağını göstermek, Avalanche geliştirilmekte ve konuşlandırılmasında mevcut araçları ve ortamlarını nasıl kullanacağını ve ayrıca on dapp çalıştırırken düşünmeniz gereken bazı ortak pitfalls içerir.

## Platform Temel

Avalanche [bir ağ](../../../learn/platform-overview/) ağıdır. Bu tek bir zincir değil, tek bir blok türünü çalıştıran tek bir zincir değil. Her biri daha heterojen zincirlerden birini çalıştıran birden fazla alt ağ içerir. Ama düşük ücretli hızlı bir ağ üzerinde bir Ethereum dapp çalıştırmak için şu anda bu konuda endişelenmemize gerek yok. Eğer istersen yukarıdaki bağlantıyı kullanarak daha fazlasını öğrenebilirsin, ama şu anda bilmen gereken tek şey Avalanche Birincil Ağ üzerinde çalışan zincirlerden birinin C-Chain \(kontrat zinciri\) olduğu.

C-Chain ağları ve uzlaşma oranlarının yerine Avalanche eşdeğerleri ile değiştirilmiş [coreth](https://github.com/ava-labs/coreth) adlı bir [go-ethereum](https://geth.ethereum.org/docs/rpc/server) çatalı işletir. Geriye kalan Ethereum VM, VM, akıllı sözleşmelerini çalıştıran ve veri yapılarını ve zincirdeki blokları yöneten Ethereum VM. Sonuç olarak, from tüm Solidity akıllı sözleşmelerini yürütebilecek bir blok zinciri elde edersiniz, ama [Avalanche's devrimsel uzlaşmasını](../../../learn/platform-overview/avalanche-consensus.md) sağlayan daha büyük bir işlem bandgenişliği ve anında finalle birlikte.

[Coreth](https://github.com/ava-labs/avalancheg), into bir eklenti olarak yüklenir, Avalanche ağını çalıştırmak için kullanılan istemci düğümlü uygulaması.

Dapp konusunda ise, on gibi çalışacaktır. Sadece daha hızlı ve ucuz olacak. Nasıl olduğunu öğrenelim.

## Avalanche C-Chain Erişildi

C-Chain go-ethereum ile [aynı API](../../avalanchego-apis/contract-chain-c-chain-api.md) ortaya çıkarır, böylece platformla etkileşim için on bulunan tüm tanıdık API'leri kullanabilirsiniz.

with çalışmanın birçok yolu vardır.

### MetaMask

Özel bir ağ tanımlayarak C Zincirine through ulaşabilirsiniz. to git, giriş yap, ağ indirilmesini tıkla ve 'Özel RPC' seç. Avalanche için veriler aşağıdaki gibidir.

#### **Avalanche Mainnet Ayarları:**

* **Ağ **Adı: Avalanche Mainnet C-Chain
* **Yeni RPC **URL: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* ****ZincirI:`43114`
* ****Sembol:`AVAX`
* **Explorer: **[Explorer:](https://cchain.explorer.avax.network/)

#### **FUJI Testnet Ayarları:**

* **Ağ **Adı: Avalanche FUJI C-Chain
* **Yeni RPC **[URL:](https://api.avax-test.network/ext/bc/C/rpc)
* ****ZincirI:`43113`
* ****Sembol:`AVAX`
* **Explorer: **[Explorer:](https://cchain.explorer.avax-test.network/)

Uygulamanızın web arayüzünde, kullanıcıların ağ verilerini elle girmemek için [Avalanche programlamalı olarak](../smart-contracts/add-avalanche-to-metamask-programmatically.md) ekleyebilirsiniz. Eklenen özel ağ akışını görmek için [Pangolin DEX](https://app.pangolin.exchange/)'e bak.

### Kamu API Düğümlerini kullanıyor

through ağ işlemlerini başlatmak yerine, bir yük dengeleyicisinin arkasında birçok AvalancheGo düğümlerinden oluşan halka açık API'yi kullanabilirsiniz.

C-Chain API sonucu, [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)[](https://api.avax-test.network/ext/bc/C/rpc) mainnet ve https://api.avax.network/ext/bc/C/rpc https://api.avax.network/ext/bc/C/rpc testnet için https://api.avax.network/ext/bc/C/rpc için https.

Daha fazla bilgi için, belgeleme bak:

{% page-ref page="../../tools/public-api.md" %}

### Kendi Düğününü Yürütüyorsun

your kontrol edemediğiniz bir merkezileştirilmiş hizmete bağlı olmasını istemiyorsanız kendi your çalıştırıp ağa bu şekilde erişebilirsiniz. Kendi your çalıştırmak ayrıca halka açık API sıkışıklığı ve oran sınırlama ile potansiyel sorunlardan da kaçınır.

Geliştirme amaçları için [burada](../nodes-and-staking/run-avalanche-node.md) AvalancheGo. indirilmesi, inşa edilmesi ve kurulması için bir ders bulunmaktadır. Bir Linux makinesine üretim düğümünü çalıştıracaksanız, [bu](../nodes-and-staking/set-up-node-with-installer.md) bir ders için installer senaryosunu nasıl hızlı ve kolay bir şekilde bir hizmet olarak yükleyeceğini `systemd`gösterir. Senaryo da düğümleri değiştirmeyi de halleder. Bir konteynırda düğümlü bir düğüm çalıştırmak istiyorsanız, AvalancheGo the çeşitli Docker configs. için [betikler](https://github.com/ava-labs/avalanchego/tree/master/scripts) oluşturabilirsiniz.

### Yerel Test Ağı Çalıştırıyor

your test etmek için özel bir test ağına ihtiyacınız varsa, [Avash](https://github.com/ava-labs/avash), local Ganache gibi yerel Avalanche ağlarını başlatmak için kabuk müşterisidir.

Avash Lua'yı yerel ağları yönetme için bir scripting dili olarak kullanır.

Daha fazla bilgi için, belgeleme bak:

{% page-ref page="../../tools/avash.md" %}

## Geliştirme ve Gönderme Sözleşmeleri

Ethereum uyumlu blok zinciri olarak, her zamanki Ethereum geliştirici araçlar ve ortamlar Avalanche's C-Chain. için dapps geliştirmek ve dağıtmak için kullanılabilir.

### Remix

Remix'i on akıllı sözleşmeleri dağıtmak için kullanmanın bir öğretisi vardır. Bu durum MetaMask Avalanche ağına erişimine dayanmaktadır.

{% page-ref page="../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

### - Trakya

Ayrıca on akıllı sözleşmeleri test etmek ve dağıtmak için Truffle kullanabilirsiniz. Bu özel ders nasıl öğren:

{% page-ref page="../smart-contracts/using-truffle-with-the-avalanche-c-chain.md" %}

### Hardhat

Hardhat Dayanıklılık akıllı sözleşmeleri için en yeni geliştirme ve test ortamıdır. Ve our en çok kullandığı. Bu nedenle Avalanche için geliştirilme yöntemi önerilmiştir.

Daha fazla bilgi için,{% page-ref page="../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md" %}

## Avalanche Explorer

Akıllı kontrat geliştirme ortamının önemli bir parçası ise blok zincir verileri sunan ve hizmet veren kaşif kaşif [idi](https://cchain.explorer.avax-test.network/). Mainnet C-Chain kaşif [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/) ve testnet kaşif https://cchain.explorer.avax.network/ available Web arayüzünün yanı sıra standart [Ethereum JSON RPC API](https://eth.wiki/json-rpc/API) de ortaya çıkarmaktadır.

## Avalanche Faucet

Geliştirme amaçları için test işaretlerine ihtiyacınız olacak. Avalanche bir [Faucet](https://faucet.avax-test.network/) var. Test işaretlerini seçtiğiniz adrese damlatıyor. C-Chain adresini şuraya yapıştır.

Eğer ihtiyacınız varsa, yerel bir musluk da çalıştırabilirsiniz, ama [depodan](https://github.com/ava-labs/avalanche-faucet) inşa edebilirsiniz.

## Kontrat Contract

Akıllı sözleşme doğrulaması, kullanıcıların kaynak kodunu yayınlayarak akıllı sözleşmelerle etkileşime girmesine şeffaflık sağlar. [C-Chain kaşifini](https://cchain.explorer.avax.network/) kullanarak zekice anlaşmalarınızı doğrulayabilirsiniz. Prosedür basit:

* on yayınlanmış kontrat adresinize yönlendirin.
* `code`Sekme seçimi`verify & publish`
* Düzleştirilmiş kaynak kodunu kopyalayıp yapıştır ve tüm yapı parametrelerini tam olarak yayınlanmış kontrattaki gibi gir.
* Tıkla`verify & publish`

Eğer başarılı olursa, `code`sekme artık yeşil bir işarete sahip olacak ve kullanıcılarınız sözleşmenin içeriğini doğrulayabilecek. Bu kullanıcılarınızın your güvenebileceğinin güçlü bir olumlu sinyalidir. Ve tüm üretim sözleşmeleri için şiddetle tavsiye edilir.

## Güvenlik kontrolleri imzalayın.

Dağıtılmış uygulamaların doğası nedeniyle, uygulama konuşlandırıldığında böcekleri onarmak çok zordur. Bu yüzden, uygulamanın doğru ve güvenli bir şekilde çalışmasını sağlamak çok önemli. Kontrat güvenlik denetimleri uzmanlaşmış şirketler ve hizmetler tarafından yapılır. Çok pahalı olabilirler ki bu da bekar geliştiriciler ve başlangıç için ulaşılamayacak kadar uzak olabilir. Ayrıca kullanmakta özgür, otomatik hizmetler ve programlar da var.

En popüler olanları:

* [Slither](https://github.com/crytic/slither), işte bir [ders](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)
* [MythX](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

Profesyonel güvenlik denetimi mümkün olmadığı takdirde en azından birini kullanmayı öneriyoruz. [Burada](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md) güvenli geliştirme uygulamaları için daha kapsamlı bir bakış bulunabilir.

## Gotchas ve dikkat etmek için gereken şeyler var.

Avalanche Platform'un C-Chain EVM uyumlu ama aynı değildir. Farklılıklar var, aksi takdirde dapps davranışlarında ince böcekler veya tutarsızlıklar yaratabilirsiniz.

İşte bilmen gereken temel farklılıklar.

### Ölçme Zamanı

on blok yükseklik ilerlemesini zaman için bir vekil olarak kullanmak adettir. Bunu on yapmamalısın. on zincirler quiescent, yani herhangi bir aktivite yoksa hiçbir blok üretilmez. Bu da doğru bir şey olduğu için çok sayıda aktivite varsa bloklar çok hızlı üretilir. Bu yüzden de bu zaman geçişini üretilmiş blokların sayısına göre you Sonuçlar doğru olmayacaktır ve kontratın üçüncü şahıslar tarafından manipüle edilebilir.

Blok oranı yerine zamanının sadece üretilen blokların zaman damgasını okuyarak ölçmelisiniz. Zaman pullarının monotonik olarak artması ve gerçek zamanlı olarak 30 saniye içinde olması garantilidir.

### - Final

On blok zinciri yeniden düzenlenebilir ve bloklar can bu yüzden ipucundan birkaç blok ötede bir bloğun kabul edildiğine cannot 6 yerin derinliğinin güvenli olduğu varsayılır\). on durumu bu değil. Bloklar ya kabul edilir ya da iki saniye içinde reddedilir. Ve blok kabul edildikten sonra bu son olur, ve değiştirilmez, düşürülür veya değiştirilemez. Bu yüzden confirmations' "sayısı" konsepti kullanılmamıştır. Bir blok kabul edilir edilmez ve in bulunur bulunmaz son olur.

### Gaz Fiyatı.

on yakılan gaz. Doğrulayıcılar gazı kendileri için tutmazlar \(kazık için ödüllendirilir\), bu yüzden yüksek fiyatlı işlemlerin içerdiği 'gaz savaşlarının dinamikleri var değildir. Bu yüzden, işlemlerinize daha yüksek bir gaz fiyatı koymaya gerek yok. Sadece boş yere benzin yakacaksın.

### C-Chain Yapılandırması

C-Chain dahil bireysel zincirler, bir yapılandırma dosyasında verilebilecek kendi yapılandırma seçenekleri vardır. dapps. geliştirirken varsayılan olarak başka bir C-Chain yapılandırmasını kullanmak isteyebilirsiniz. Zincir incirleri hakkında daha fazla detay için, [buraya](../../references/command-line-interface.md#chain-configs) bakın.

C-Chain yapılandırma dosyası hazır `$HOME/.avalanchego/configs/chains/C/config.json`olmalı. tell C-Chain yapılandırma dosyası için başka bir yerde aramasını da `--chain-config-dir`söyleyebilirsin. C-Chain için tam yapılandırma seçeneklerini [araştırabilirsiniz](../../references/command-line-interface.md#coreth-config). C-Chain yapılandırma dosyası:

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

{% hint style="warning" %}Ethereum [Arşiv Düğümü](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) işlevselliğine ihtiyacınız varsa, AvalancheGo v1.4.10 yılından bu yana öntanımlı olarak etkin olan C-Chain disable devre dışı bırakmanız gerekir. `"pruning-enabled": false`Delik açmayı devre dışı bırakmak için, C-Chain yapılandırma dosyasına dahil edilsin.{% endhint %}

### Kamu API ile ilgili çağrıları kullanıp kullanıyor `eth_newFilter`ve ilgili çağrılar

API sunucusu üzerinde [`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter)API yöntemini kullanıyorsanız, umduğunuz gibi davranmayabilir çünkü kamu API aslında yük dengeleyicisinin arkasında birkaç düğüm. Eğer bir arama `eth_newFilter`yaparsanız, sonraki çağrılar ilk çağrıyla aynı düğümle [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges)may ve sonuçlanmamış sonuçlar elde edersiniz.

Günlük filtreleme işlevselliğine ihtiyacınız varsa, müşterinizin yük dengeleyicinin arkasında sürekli aynı düğümle konuştuğu garantileyen bir web soketi bağlantısı kullanmalısınız. Alternatif olarak, [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs)kullanabilirsiniz, ya da kendi your çalıştırabilir ve API çağrılarını yapabilirsiniz.

## Destek

Bu özel ders kullanarak, on you ve uygulamalarınızı test etmek için hızlıca hızlanabilirsiniz. Sorularınız varsa, sorunlarınız ya da sadece bizimle konuşmak istiyorsanız bize açık [açık kaynak](https://chat.avalabs.org/) sunucumuzla ulaşabilirsiniz. Sizden haber almak ve on ne inşa ettiğini öğrenmek isteriz!


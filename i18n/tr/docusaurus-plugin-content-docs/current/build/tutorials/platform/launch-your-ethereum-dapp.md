# Ethereum Dapp'inizi Kullanıma Sunma

## Genel Bakış

Bu dokümanın amacı, mevcut dapp'inizi Avalanche'ta başlatmanıza yardımcı olmaktır. Bu doküman Avalanche Platform'un temellerini ve nasıl çalıştığını öğrenmenize yardımcı olmak, ağa nasıl bağlanacağınızı göstermek, mevcut araçlarınızı ve ortamlarınızı Avalanche'da geliştirme ve kullanıma sunma \(deploy\) işlerinizde nasıl kullanacağınızı açıklamak, yanı sıra dapp'inizi Avalanche'da çalıştırırken göz önünde bulundurmanız gereken bazı sık rastlanan tuzakları açıklamak için tasarlanmış bir dizi kaynak içermektedir.

## Platformun Temelleri

Avalanche [ağlardan oluşan bir ağdır](../../../learn/platform-overview/README.md). Yani, Avalanche tek tip, homojen bloklar çalıştıran tekil bir zincir değildir. Avalanche çoklu subnet'ler içerir ve bu subnet'lerin her biri daha heterojen nitelikli zincirlerden birini çalıştırır. Ancak, bir Ethereum dapp'ini anında işlem kesinliği sağlayan, düşük ücretli, hızlı bir ağda çalıştırmak için şimdilik kendimizi bu konularla meşgul etmeyelim. İsterseniz yukarıdaki bağlantı yoluyla daha fazla bilgiye ulaşabilirsiniz; ancak şimdilik bilmeniz gereken tek şey, Avalanche Birincil Ağı'nda çalışan zincirlerden birinin C-Chain \(kontrat zinciri\) olduğudur.

C-Chain, networking ve konsensüs bölümleri Avalanche eşdeğerleriyle değiştirilmiş olan [coreth](https://github.com/ava-labs/coreth) adlı bir [go-ethereum](https://geth.ethereum.org/docs/rpc/server) çatalını çalıştırır. Geriye Ethereum Sanal Makinesi \(VM\) kalır, ki bu makine de zincirde Solidity akıllı sözleşmeleri çalıştırır ve veri yapılarını ve blokları yönetir. Sonuçta, Ethereum kaynaklı tüm Solidity akıllı sözleşmelerini çalıştırmakla kalmayıp, [Avalanche'ın devrim niteliğindeki konsensüs protokolünün](../../../learn/platform-overview/avalanche-consensus.md) mümkün kıldığı çok daha büyük bir işlem bant genişliğiyle ve anında işlem kesinleştirme özelliğiyle çalıştıran bir blok zincir elde edersiniz.

Coreth, Avalanche ağını çalıştırmak için kullanılan istemci düğüm aplikasyonu olan [AvalancheGo](https://github.com/ava-labs/avalanchego)'ya bir plugin olarak yüklenir.

Dapp'iniz söz konusu olduğunda, Coreth aynen Ethereum'da çalıştığı gibi çalışacaktır, tabii daha hızlı ve daha ucuz olması da cabası. Şimdi bunun nasıl olduğunu görelim.

## Avalanche C-Chain'e Erişim

C-Chain, go-ethereum'la [aynı API'yi](../../avalanchego-apis/contract-chain-c-chain-api.md) sunar, bu sayede platformla etkileşim için Ethereum'da mevcut tüm tanıdık API'leri kullanabilirsiniz.

C-Chain'le çalışmanın birden fazla yolu vardır.

### MetaMask Yoluyla

C-Chain'e MetaMask yoluyla kişiselleştirilmiş bir ağ tanımlayarak erişebilirsiniz. MetaMask'e gidin, oturum açın, network açılır menüsünü tıklayın ve 'Custom RPC'yi seçin. Avalanche verileri şunlardır:

#### **Avalanche Mainnet \(Ana Ağ\) Ayarları:**

* **Ağ Adı**: Avalanche Mainnet C-Chain
* **Yeni RPC URL'si**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **Zincir Kimliği**: `43114`
* **Sembol**: `AVAX`
* **Tarayıcı**: [https://snowtrace.io/](https://snowtrace.io/)

#### **FUJI Testnet Ayarları:**

* **Ağ Adı**: Avalanche FUJI C-Chain
* **Yeni RPC URL'si**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **Zincir Kimliği**: `43113`
* **Sembol**: `AVAX`
* **Tarayıcı**: [https://testnet.snowtrace.io/](https://testnet.snowtrace.io/)

Uygulamanızın web arayüzünde [Avalanche'ı programatik olarak ekleyebilirsiniz](../smart-contracts/add-avalanche-to-metamask-programmatically.md), böylece kullanıcılarınız ağ verilerine manuel olarak girmek zorunda kalmazlar. Kişiselleştirilmiş ağ ekleme akışını uygulamalı olarak görmek için [Pangolin DEX](https://app.pangolin.exchange/)'e bir göz atın.

### Genel API düğümlerini kullanma

Ağ operasyonlarını MetaMask yoluyla proxy'lemek yerine, bir yük dengeleyici arkasında birçok AvalancheGo düğümünden oluşan genel API'yi kullanabilirsiniz.

C-Chain API son noktası mainnet için [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) ve testnet için [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)'dir.

Daha fazla bilgi için [dokümantasyona](../../tools/public-api.md) bakın.

### Kendi Düğümünüzü Çalıştırmak

Dapp'nizin sizin kontrolünüzde olmayan merkezi bir servise bağımlı olmasını istemiyorsanız, kendi düğümünüzü çalıştırabilir ve ağa bu yolla erişebilirsiniz. Kendi düğümünüzü çalıştırmak ayrıca genel API'de tıkanıklık ve hız sınırlaması gibi potansiyel sorunlardan kaçınmanızı da sağlar.

Geliştirme yapmak için, AvalanchGo'nun indirilmesiyle, kurulmasıyla ve yüklenmesiyle ilgili bir eğitim makalesini [burada](../nodes-and-staking/run-avalanche-node.md) bulabilirsiniz. Bir Linux makinesinde bir üretim düğümü çalıştıracaksanız,
 düğümü bir `systemd` servisi olarak hızlıca ve kolayca kurmanızı sağlayacak installer script'i nasıl kullanacağınızı gösteren bir eğitim makalesini [burada](../nodes-and-staking/set-up-node-with-installer.md) bulabilirsiniz. Bu script'le ayrıca düğüm upgrade'lerini de yönetebilirsiniz. Bir düğümü bir docker konteynerinde çalıştırmak isterseniz, AvalancheGo yazılım havuzunda çeşitli Docker konfigürasyonları için [build scriptler](https://github.com/ava-labs/avalanchego/tree/master/scripts) bulunmaktadır.

### Yerel Bir Test Ağını Çalıştırmak

Özel bir test ağının dapp'inizi test etmesine ihtiyacınız varsa, [Avash](https://github.com/ava-labs/avash) yerel Avalanche ağlarının başlatılmasına yönelik bir kabuk \(shell\) istemcidir, Ethereum'daki Ganache'ye benzer.

Avash, yerel ağların orkestrasyonuna yönelik bir scripting dili olarak Lua'yı kullanır.

Daha fazla bilgi için [dokümantasyona](../../tools/avash.md) bakın.

## Kontratların Geliştirilmesi ve Kullanıma Sunulması \(deploy\)

Ethereum uyumlu bir blok zinciri olarak, tüm olağan Ethereum geliştirici araçları ve ortamları, Avalanche'ın C-Chain'i için dapp'ler geliştirmek ve kullanıma sunmak için kullanılabilir.

### Remix

Avalanche'ta akıllı sözleşmeler deploy etmek için Remix'in nasıl kullanılacağına dair bir [eğitim makalesi](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md) mevcuttur. Remix, Avalanche ağına erişim için MetaMask'tan destek alır.


### Truffle

Avalanche'ta akıllı sözleşmeler test etmek ve deploy etmek, yani kullanıma sunmak için Truffle'ı da kullanabilirsiniz. Bunu nasıl yapacağınızı bu [eğitim makalesinde](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md) bulabilirsiniz.

### Hardhat

Hardhat, Solidity akıllı sözleşmeleri için en yeni geliştirme ve test ortamıdır; geliştiricilerimiz en çok Hardhat'i kullanmaktadır. Üstün test desteği nedeniyle, Avalanche için geliştirme yapmanın önerilen yoludur.

Daha fazla bilgi için [bu dokümana](../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md) bakın.

## Avalanche Explorer

Akıllı sözleşme geliştirme ortamının asli bir unsuru tarayıcıdır \(explorer\), blok zincir verilerini indeksleyip sunar. Mainnet C-Chain tarayıcısı [https://snowtrace.io/](https://snowtrace.io/) adresinde ve testnet tarayıcısı [https://testnet.snowtrace.io/](https://testnet.snowtrace.io/) adresinde yer alır. Web arayüzünün yanı sıra, standart [Ethereum JSON RPC API](https://eth.wiki/json-rpc/API)'sini de kullanıma sunar.

## Avalanche Faucet

Geliştirme yapmak için test tokenlarına ihtiyacınız olacak. Avalanche'ta, test tokenlarını seçtiğiniz adrese damlatan bir [Faucet](https://faucet.avax-test.network/) \(musluk\) vardır. C-Chain adresinizi buraya yapıştırın.

Bir musluğu [yazılım havuzundan](https://github.com/ava-labs/avalanche-faucet) kurmak yerine gerekirse yerel olarak da çalıştırabilirsiniz.

## Sözleşme doğrulama

Akıllı sözleşme doğrulaması, akıllı sözleşmelerle etkileşimde bulunan kullanıcılara, kaynak kodunu yayınlayarak ve herkesin akıllı sözleşmenin iddia ettiği şeyi gerçekten yaptığını onaylamasına imkan vererek şeffaflık sağlar. [C-Chain tarayıcısını](https://snowtrace.io/) kullanarak akıllı sözleşmeleri doğrulayabilirsiniz. Prosedür basittir:

* tarayıcıda yayınlanan sözleşmenizin adresine gidin
* `code` sekmesinde `verify & publish` ögesini seçin
* şablon kaynak kodunu kopyalayıp yapıştırın ve tüm build parametrelerini aynen yayınlanan sözleşmede oldukları gibi girin
* `verify & publish` ögesini tıklayın

İşlem başarılıysa, `code` sekmesinde yeşil bir onay işareti belirir ve kullanıcılarınız sözleşmenizin içeriklerini doğrulayabilirler. Bu, kullanıcılarınızın sizin sözleşmelerinize güvendiklerinin güçlü bir işaretidir ve tüm üretim sözleşmeleri için hararetle tavsiye edilir.

Sourcify ve Truffle ile ilgili ayrıntılı bir öğretici için [buraya](../smart-contracts/verify-smart-contracts-with-truffle-verify.md) bakın.

## Kontrat güvenlik kontrolleri

Dağıtık uygulamaların doğası gereği, uygulama kullanıma sunulduktan \(deploy\) sonra hataları \(bug\) onarmak çok zordur. Bu nedenle, kullanıma sunmadan önce uygulamanızın doğru ve güvenli bir şekilde çalıştığından emin olmanız çok önemlidir. Kontrat güvenliği gözden geçirmeleri uzman şirketler ve servisler tarafından yapılır. Bu kuruluşların hizmetleri çok pahalı olabildiği için bireysel geliştiriciler ve startuplar bu hizmetlere erişemeyebilir. Ancak, ücretsiz kullanılabilen otomasyon servisler ve programlar da vardır.

En popüler olanları şunlardır:

* [Slither](https://github.com/crytic/slither), bir [eğitim dokümanı](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/) burada
* [MythX](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

Profesyonel kontrat güvenliği gözden geçirmesi mümkün değilse, bunlardan en az birini kullanmanızı hararetle tavsiye ederiz. Güvenli geliştirme uygulamaları hakkında daha geniş bilgileri [burada](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md) bulunabilir.

## Önemli ve dikkat edilecek noktalar

Avalanche Platform'un C-Chain'i EVM uyumludur, ancak EVM'nin aynısı değildir. Bilmeniz gereken bazı farklılıklar vardır, aksi takdirde dapp'lerinizin davranışında kolay kolay fark edilemeyen bug'lar veya tutarsızlıklar yaratabilirsiniz.

Bilmeniz gereken belli başlı farklar şunlar:

### Zamanın Ölçülmesi

Ethereum'da blok yüksekliği ilerlemesi zamanın bir proxy'si olarak kullanılır. Siz bunu Avalanche'ta yapmayın. Avalanche'da zincirler durgundur, yani herhangi bir aktivite yoksa üretilen blok da yoktur. Bunun tersi de geçerlidir, çok fazla aktivite varsa, bloklar da çok hızlı üretilir. Bu nedenle, zamanın ilerleyişini, üretilen blokların sayısıyla ölçmemeniz gerekir. Sonuçlar doğru olmayacaktır ve kontratınız üçüncü taraflarca manipüle edilebilir.

Zamanı blok hızı yerine, üretilen blokların zaman damgası özelliğini okuyarak ölçmeniz gerekir. Zaman damgalarının monotonik olarak artması ve gerçek zamanın 30 saniye dahilinde olması garanti edilir.

### İşlem Kesinliği

Ethereum'da blok zincir reorganize edilebilir ve bloklar yetim bırakılabilir, bu nedenle bir blok uç noktadan itibaren birkaç blok ileriye gidene kadar blokun kabul edilmiş olmasına güvenemezsiniz \(genelde 6 sıra derinliğindeki blokların güvenli olduğu varsayılır\). Avalanche'ta durum böyle değildir. Bloklar bir veya iki saniye içinde ya kabul edilir ya da reddedilir. Ve blok bir kez kabul edildikten sonra işlem kesindir ve geri alınamaz, düşürülemez veya değiştirilemez. Dolayısıyla, 'onayların sayısı' kavramı Avalanche'da kullanılmaz. Bir blok kabul edilip tarayıcıda görünür olur olmaz işlem kesindir.

### Gaz Fiyatı

Avalanche'da gaz yakılır. Doğrulayıcılar gazı kendilerine saklamazlar \(staking için ödül alırlar\), dolayısıyla daha yüksek fiyatlı işlemlere önceliğin verildiği 'gaz savaşları' dinamikleri burada işlemez. Bu nedenle, işlemlerinize daha yüksek bir gaz fiyatı koymanız asla gerekli değildir. Sadece boş yere gaz yakmış olursunuz.

### C-Chain Yapılandırması

C-Chain de dahil olmak üzere bireysel zincirler, bir config dosyasında verilebilecek kendi konfigürasyon seçeneklerine sahiptir. Dapp'leri geliştirirken varsayılandan farklı bir C-Chain konfigürasyonu kullanmak isteyebilirsiniz. Zincir konfigürasyonları hakkında daha fazla bilgi için [buraya](../../references/command-line-interface.md#chain-configs) bakın.

C-Chain config dosyası `$HOME/.avalanchego/configs/chains/C/config.json`\`da olsa gerektir. AvalancheGo'ya C-Chain config dosyasını başka bir yerde aramasını `--chain-config-dir` seçeneğiyle de söyleyebilirsiniz. C-Chain'in eksiksiz konfigürasyon seçeneklerini [burada](../../references/command-line-interface.md#c-chain-config) görebilirsiniz. Örnek bir C-Chain config dosyası:

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
Ethereum [Archive Node](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) işlevine ihtiyacınız varsa, AvalancheGo v1.4.10 sürümünden itibaren varsayılan olarak etkinleştirilen C-Chain pruning \(budama\) işlevini devre dışı bırakmanız gerekir. Pruning işlevini devre dışı bırakmak için `"pruning-enabled": false`komutunu C-Chain config dosyasına dahil edin.
 :::

### Genel API ile `eth_newFilter`'nin ve İlgili Çağrıların Kullanılması

Genel API sunucusunda [`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter) API metodunu kullanıyorsanız, bu metot beklediğiniz gibi davranmayabilir, çünkü genel API aslında bir yük dengeleyicinin arkasındaki birkaç düğümdür. Bir `eth_newFilter` çağrısı yaparsanız, [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges)'ye yapılan daha sonraki çağrılar ilk çağrıyla aynı düğüme gitmeyebilir ve belirsiz sonuçlar alırsınız.

Günlük filtreleme fonksiyonuna ihtiyacınız varsa, istemcinizin her zaman yük dengeleyicinin arkasındaki aynı düğümle konuşmasını sağlayan bir web soketi bağlantısı kullanmalısınız. Alternatif olarak, [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs) kullanabilir veya kendi düğümünüzü çalıştırabilir ve ona API çağrıları yapabilirsiniz.

## Destek

Bu eğitim sayesinde Avalanche'da kolayca hız kazanabilir, dapp'lerinizi deploy edebilir ve test edebilirsiniz. Sorularınız, sorunlarınız varsa veya sadece bizimle sohbet etmek isterseniz, bize herkese açık [Discord](https://chat.avalabs.org/) sunucumuzdan ulaşabilirsiniz. Sizden haber almayı ve Avalanche'ta neler inşa ettiğinizi öğrenmeyi çok isteriz!


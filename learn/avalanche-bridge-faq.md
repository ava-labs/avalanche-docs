# Avalanche Köprüsü \(AB\) FAQ

## Avalanche Köprüsü \(AB\) FAQ

Avalanche Köprüsü \(AB\), ERC20 Avalanche's to ve tam tersi olarak ERC20 jetonu aktarmak için kullanılabilir. Bu belge köprü ile ilgili ortak sorulara cevap veriyor. Eğer bu belge ve diğer belgeler sorunuza cevap vermezse, [Avalanche's destek sitesi](https://support.avax.network), [Discord](https://chat.avalabs.org) veya [Telegram'da](https://t.me/avalancheavax) bizimle iletişime geçebilirsiniz.

### Önemli Notlar

1. Metamask Mobil uygulamasında köprü işlemlerini **\(sadece mobile\) etkileyen bir hata **vardır. Bu çözülene kadar köprü transferi için Metamask mobil uygulamasını kullanma. Masaüstü uygulamasını kullanın ya da cep telefonuyla, Coinbase Cüzdan kullanın.
2. AVAX alışveriş ücretlerini ödemek için AVAX ihtiyacın var.** AVAX kullanıp AMM için daha fazla AVAX takas yapmak için kullanmalısınız. Böylece işlem ücretlerini ödeyebilirsiniz.** of bitmesi durumunda on işlem yapamayacaksınız.

### İşlemler

#### Eğer iş işten çıkarmam sıkışmış gibi görünürse ne yapabilirim?

Eğer to giden köprü üzerinden fonları aktaran Ethereum işlemleri tıkılı görünüyorsa ve herhangi bir doğrulama yapılmıyorsa, [burada](avalanche-bridge-faq.md#speed-up-transaction) tanımlandığı gibi işlemi hızlandırabilirsiniz. Ethereum işlemi 35 onay aldıysa ama Avalanche işlem zamanlayıcısı sıkışmış görünüyor, Metamask cüzdanı dengesini Avalanche ağındaki kontrol edin. Bu işlem zaten işleme tabi ama kullanıcı arayüzünde görünmeyebilir. İşinizi "hızlandırmak" seçtiyseniz bunun olabileceğini unutmayın.

Bu mümkün ama bu köprü tarafından verilen Ethereum işleminin Ethereum fon aktarıldığında 35 doğrulama almak uzun zaman almasıdır. Bu durum Ethereum gaz fiyatlarında ani bir artış meydana gelebilir. Ethereum üzerinde yayınlandıktan sonra 200 blok içinde yer almazsa, daha yüksek gaz fiyatıyla yeni bir işlem "çubuğu" transferi için verilebilir.

#### Köprü nakli ne kadar sürer?

Ethereum işlemleri 10 - 15 dakika sürer. Avalance işlemi birkaç saniye sürer.

#### Neden Avalanche işlemleri köprünün bu kadar uzun sürüyor?

Sadece birkaç saniye sürer. Köprü arayüzü daha uzun sürdüğünü gösterirse bu sadece arayüzle ilgili bir sorun olur. Varlığınız birkaç saniye sonra transfer edildi. Cüzdanını ve C-Chain kaşifini kontrol et.

#### Ya gaz fiyatı transfer ettiğim miktardan daha fazlaysa?

ERC20 to ERC20 varlığı taşınırken istediğiniz her türlü simge aktarabilirsiniz. Köprü işlemleri en aza indirecek şekilde tasarlandı. Ancak, işlem ücreti transfer ettiğiniz değerden daha yüksekse, Ethereum gaz fiyatı düşene kadar beklemek mantıklı olabilir.

from to geri taşınırken köprü [burada](avalanche-bridge-faq.md#fees) tarif edildiği gibi nüshası transfer ücreti ile karşılaşır. Kullanıcı arayüzü, artık aktarımlara ücret miktarından daha az izin verir. Eğer bir kullanıcı elle üretilir ve bu tür bir işlem yaparsa, köprü aktarımı geçersiz olarak işaretler ve işleme işlemez.

#### on üzerinde yaratılmış bir işaretleme gönderebilir miyim?

Henüz değil. AB şu anda sadece Ethereum üzerinde oluşturulan ERC20 jeton aktarımını destekliyor. Gelecekte bunu etkinleştirmek için planlar var.

#### Köprüden ETH veya BTC gönderebilir miyim?

AB şu anda yerli ETH veya BTC desteklemiyor. Bununla birlikte, bu varlıkların paketlenmiş sürümünü köprünün üzerinden geçirebilirsiniz.

#### Ya benim işlemim in görünmezse?

Köprü transferi ile ilgili işlemler Avalanche ve Ethereum ağları için explorers görülecek. Bu işlemlerin ortaya çıkması birkaç dakika sürebilir. in işlemlerinizi aramak için adresinizi kopyalayıp [Avalanche's C-Chain Explorer](https://cchain.explorer.avax.network/) veya [Avalanche's](https://etherscan.io/) yapıştırmak için. Köprünün kendisi tarafından gönderilen işlemleri görmek için Avalanche'i ve [Ethereum](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0) için [buraya](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) bakabilirsiniz. Eğer hala işlemlerini göremiyorsan, [Telegram](https://t.me/avalancheavax) veya [on](https://chat.avax.network/) ulaş.

#### Köprüyü nasıl kullanacağımıza dair ders verecek misin?

Evet, burada köprü işlevselliği için video dersleri [görebilirsiniz](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

#### on işlem ücretlerini nasıl ödeyeceğim?

On ticari ücretler in yerel varlık olarak ödenmektedir. Avalanche on işlemler göndermek için cüzdan yeterli AVAX kullanmanız gerekir. Avalanche üzerinde başlamanıza yardımcı olmak için, köprü size 75 dolardan fazla değerinde jeton taşıyabilirseniz küçük bir miktar AVAX will of dışında kalmaktan kaçınmak için öncelikle yeterli miktarda AVAX satın almayı öneriyoruz. [Pangolin](https://app.pangolin.exchange/) için de yapabilirsin.

#### Diğer kanaldan farklı bir adres gönderebilir miyim?

Köprü sadece diğer ağdaki aynı adrese aktarılmasına izin verir. Varlık diğer ağa aktarıldıktan sonra, herhangi bir adres veya sözleşmeye gönderilebilir.

#### İşlemi hızlandırabilir miyim?<a id="speed-up-transaction"></a>

Evet, on the düğmesine tıklayabilirsiniz. Metamask üzerinden yapılan bir işlem başlangıçta gönderilen işlemden daha yüksek bir gaz fiyatına sahip Ethereum üzerinde yeni bir işlem yayınlamıştır. Yeni işlemlerin daha yüksek bir gaz fiyatı olduğundan bu bir bloğa dahil olma olasılığı daha yüksektir. Bu işlemlerden sadece biri \(orijinal ve "hızlı"\) kabul edilecek. Köprüye fonları aktaran bir işlemden hızlanmak güvenli. Bununla birlikte, kullanıcı arayüzü, yeni işlemden haberdar olmayacaktır, yani kullanıcı arabirimindeki doğrulamaları göremeyebilirsiniz. Yeni işlem on 35 doğrulama elde ettiğinde paketlenmiş fonları görmek için on Metamask cüzdanını kontrol et.

#### on gösterilen jeton sayısı neden belirttiğim numarayla uyuşmuyor?

from to transfer edildiğinde, Metamask 0 jeton transfer edileceğini gösterir, gerçek jeton sayısını değil. This bilinen bir sorun.

#### Köprünün Ethereum ve Avalanche üzerindeki adresi nedir?

Köprü Adresleri:

* Ethereum:[`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Çığlık:[`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

**Bu adreslere doğrudan işaret should gerektiğini **unutmayın. Köprünün kullanıcı arayüzünü kullanmalısınız, ki bu da kötü biçimlendirilmiş işlemler için kontrol edilir.

### Ücret için

#### Avalanche Köprüsü'nde ücretler nasıl çalışıyor?

Köprü ücretleri Avalanche ve Ethereum ağlarındaki işlem ücretlerinin maliyetinin yanı sıra köprü altyapısının faaliyeti maliyetlerini karşılamak için transfer ücretleri aktarmaktadır. Bu ücretler ERC20 varlığının transfer edilmesiyle birlikte aynı şekilde yükleniyor. Yani bir işaret transfer ettiğinizde, dengenin bir kısmı AB tarafından ücret olarak alınır.

from to taşınırken, ücret ERC20 değerinde 3 dolar değerinde bir servet transfer edilir. to aktarılan transferler [burada](avalanche-bridge-faq.md#airdrop) tanımlandığı gibi AVAX hava indirimi için uygun olabilir.

from to taşınırken, ücret maksimum Ethereum işlem ücreti \(gaz limiti\) ve sabit bir dolar miktarı \(şu anda 5$\) değeridir. Maksimum Ethereum işlem ücretinin gaz sınırına dayandığını ve işlem tarafından kullanılan gaz miktarına dayanan gerçek işlem ücretinden daha yüksek olabileceğini unutmayın.

#### Neden bir kanaldan aldığım varlık diğerinden gönderdiğim miktarla uyuşmuyor?

Köprü ücreti öder. Yukarıya bak.

#### Gaz nasıl tahmin ediliyor? Köprü nasıl jeton fiyatları alıyor?

Köprü, Ethereum ağı için gaz fiyatları bilgi almak için Chainlink fiyatları beslemektedir. Kullanılan gaz fiyatı Chainlink FASTGAS değerinin ve Geth gaz fiyat yaklaşımının en yüksek olduğu tahmin edilmektedir. Gaz fiyatı, köprü tarafından gönderilen işlemlerin hızlı bir şekilde Ethereum bloğuna dahil edilmesini sağlamak için birkaç GWEI tarafından eklenmiştir.

Köprü ayrıca köprü ücreti ile eşdeğer olan bir token değerinin hesaplanması için kullanılan zincir link fiyatları da kullanır.

#### Hava indirme var mı?<a id="airdrop"></a>

Kullanıcılar 75 dolardan fazla \(değişime tabki\) from to nakledildiğinde 0.1 to çıkarılacaktır.

#### Ya hava indirimi almazsam?

Eğer hava damlanızı almadıysanız, lütfen transfer miktarının gerekli olan minimum miktarı yerine getirdiğini doğrulayın.

### Güvenlik

#### Avalanche Köprüsü güvenilmez mi?

Avalanche Köprüsü, hiçbir partinin teminat veya nane paketlenmiş varlık olarak tutulan fonların hiçbirine erişemeyeceği anlamında güvenilmez bir durumdur. Köprü boyunca tüm aktarımlar 4 bağımsız partinin \(gardiyan\) tarafından onaylanmalıdır. Bu açıdan köprü kullanmak paranızı aktarmak için herhangi bir partiye güvenmek zorunda değildir.

#### Nöbetçilerin rolü nedir?

Müdürlerin rolü dört katlıdır:

1. Gizli Paylaşımlar saklanıyor
2. Desteklenen Blok Zincirleri Indeksleniyor
3. İşlemli İşlemler İzleme
4. Kamu Bilgilerine Ev Sahipliği

Burada bir müdürün rolü ve sorumluluklarının tamamen çökmesi [mümkündür](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

#### Ava Laboratuvarları ve Wardens? arasındaki ilişki nedir?

Gardiyanlar Avalanche Vakfı'nın güvenilir ortaklarıdır. Teknik mükemmellik ve Avalanche ile birlikte çalışmalarına dair bir kayıt var.

#### Şifre denetlendi mi? Denetim raporları nerede?

Evet, köprü, müdür ve akıllı sözleşmeler için kodlar Halborn tarafından denetlendi. Denetim raporları [burada](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1) bulunabilir.

### - Tokens

#### to transfer olmam tamamdır ama Metamask Avalanche mallarımı göremiyorum. Ne oldu? Ne oldu?<a id="cant-see-funds"></a>

tell söyle, işaretleri arasın. [Avalanche Avalanche Köprüsü token listesinden](https://github.com/pangolindex/tokenlists/blob/main/ab.tokenlist.json) gelen işaretleri eklediğinden emin ol.

#### Köprüden ne tür bir jeton aktarılabilir?

Sadece desteklenen ERC20 jetonu köprü üzerinden aktarılabilir. On bu işaretler ".e" eklenmiş simge ile temsil edilir. Örneğin, köprü kurmuş DAI token DAI.E.

#### WETH.e on to nasıl açacağım?

- Hayır, yok. on ETH diye bir şey yoktur. WETH.e, paketlenmiş bir temsili on akıllı sözleşmeler ve in kullanabilirsiniz.

#### on wrap/unwrap nasıl açabilirim?

Metamask’s SWAP fonksiyonunu from to değişmek için kullanabilirsiniz. Alternatif olarak, Ethereum üzerinde [Uniswap](https://app.uniswap.org/#/) gibi bir AMM de kullanabilirsiniz.

#### Köprüye nasıl bir işaret eklerim?

[Şuraya](https://github.com/ava-labs/avalanche-bridge-resources#readme) bak.

#### Köprüde to nasıl bir işaret eklerim?

Bir ders için [burada](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) görün.

#### Neden aynı simge türleri var? Avalanche Köprüsü'nden hangisi olduğunu nasıl söyleyebilirim?

**Genel olarak, Pangolin gibi akıllı sözleşmeler ve contracts etkileşime girdiğinizde bu işareti, en sonunda .e ile kullanmak **istersiniz.

Bu belgenin AEB adı verilen bir köprü uygulaması ile önceki bir tarih ile ifade ettiği mevcut nesil Avalanche Köprüsü \(AB\) \(AB\) ile güncel nesil Avalanche Köprüsü. AEB köprüsü ve AB köprüsü her birinin kendine özgü bir token seti vardır. AEB jetonları AB jetonları lehine reddedildi. AB tokens bir havuzu `.e`var. Bir simgenin adı ve sembolü ikisini ayırt etmek için iyi referans olsa da, bir simgeyi doğrulamanın tek kesin yolu sözleşmeli adresdir. AB token sözleşmesi adresleri [burada](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json) bulunabilir.

#### Neden yeni köprü jeton cüzdanımda otomatik olarak görünmüyor?

Tetikler C-chain adresiniz değil de daha çok token's ile anlaşır. Adreslerinizin tuttuğu dengeleri kontrol etmek için akıllı anlaşmaların \(örneğin, Metamask\) cüzdanınıza \(örneğin\) olduğunu söylemeniz gerekiyor.

#### Avalanche Köprüsü NFTs? transfer etmeyi destekliyor mu?

Avalanche Köprüsü şu anda NFT aktarımlarını desteklemiyor.

### Desteklenen Zincirler

#### Avalanche Köprüsü tarafından hangi zincirler destekleniyor?

Avalanche Köprüsü şu anda sadece Ethereum ERC20'lerin Avalanche to nakledilmesini destekliyor ve tam tersi olarak. Avalanche on oluşturulan ERC20'lerin transfer transferini desteklemek için planlar vardır. Ayrıca Avalanche ve Ethereum dışında ağları desteklemek için planlar da vardır.

#### to \(ağ\) kadar varlıkları köprüden alabilir miyim?

Avalanche Köprüsü sadece Ethereum ve Avalanche arasındaki varlıkları aktarabilir. Başka bir kanaldan assets mal almak için şu şekilde bakabilirsiniz:
* Bu varlıkları to ve from to aktar.
* Ava Laboratuvarları tarafından oluşturulmamış / desteklenmeyen üçüncü parti köprüsünü kullan
* Merkezi bir takas için AVAX satın alıp AVAX to geri çek, sonra diğer varlıklarla takas etmek için AMM kullan.

### AEB \(Deprecated Bridge\)

Bu belgenin AEB adı verilen bir köprü uygulaması ile önceki bir tarih ile ifade ettiği mevcut nesil Avalanche Köprüsü \(AB\) \(AB\) ile güncel nesil Avalanche Köprüsü. Bu bölüm önceki köprü uygulaması \(AEB\) ile ilgili sorularla ilgilenir.

#### AEB ne zaman ameliyat etmeyi bırakıyor?

AEB devre dışı bırakıldı ve transferi artık mümkün değil. of Ethereum tarafında bulunan fonlar yeni Avalanche Köprüsü'ne \(AB\) nakledilmiştir. Token dönüştürmeleri, kullanıcıların Avalanche Köprüsü'ndeki eşdeğerleri için AEB işaretlerini 1-1 bazında dönüştürmelerine izin vermektedir. Bu dönüşüm [can](https://bridge.avax.network/convert) AEB token destek zamanlayıcıları bireysel DApp projelerine bırakılacaktır.

#### AEB my to transfer edebilir miyim?

AEB jetonlarınızı to taşımak için öncelikle yukarıdaki soruda tarif edildiği gibi AB işaretlerine dönüştürmelisiniz. Dönüşünce, AB işaretlerini to geri taşımak için yeni Avalanche Köprüsü'nü kullanabilirsiniz.

#### AEB \(bozulmuş köprü\) işaretlerimi Avalanche Köprüsü'ne nasıl dönüştürürüm?

AEB işaretlerini [AB kullanıcı arayüzü](http://bridge.avax.network/convert) kullanarak AB işaretlerine çevirebilirsiniz. Ayrıca, Pangolin gibi birçok ekosistem projesi kullanıcıların jetonlarını dönüştürüp yeni liquidity havuzlarına girmelerini kolaylaştırmaya çalışıyor.

### Tasarım/Teknik

#### Tek bir özel anahtar nane hediyesi alabilir mi?

SGX kodlama adresine tek bir parti giremez. Sadece the kendisi 4 gardiyanın 3'ü onayını alırken bu anahtarı kullanarak bir işlem oluşturabilir ve imzalayabilir. Bu açıdan buradaki enklava zincir zincirli akıllı bir sözleşme olarak çalışıyor.

#### Köprü neden akıllı bir sözleşmede para tutmuyor?

Akıllı bir sözleşme kullanmamak sondan uca transfer gereksinimlerini basitleştirir, daha düşük gaz ücretleri ve daha hızlı transferlere yol açar.

#### Köprü transferlerini kendi akıllı I entegre edebilir miyim?

Şu anda köprü sadece dış sahipli hesaplardan \(EOAS\) zincir aktarımlarını destekliyor. Bu köprünün her iki ağda da aynı adresi kullanması, köprü üzerinden taşınan fonların aynı cüzdanda tutulmasını sağlaması ve on bir adreste de aynı adreste de varlığından emin olmak için bir yol yoktur. Ethereum ağındaki akıllı sözleşmelerden köprü adresine gönderilen ERC20 jeton on sarılı jeton olarak minted edilmeyecek.

#### BridgeToken sözleşmelerinde tx.origin kullanımı güvenli mi?

Akıllı sözleşmeler içinde yetki kontrolü için tx.origin kullanılarak potansiyel güvenlik riskleri oluşturuyor, ama kullanım davamız yok. Köprü sözleşmelerinde, tx.origin sadece "açılma" fonksiyonunu doğrudan olarak çağırmaktan akıllı sözleşmelere izin vermek için kullanılır, çünkü köprü şu anda sadece dış sahil hesaplardan aktarmayı destekliyor. Tx.origin değerini msg.sender değeriyle karşılaştırarak bunu yapmak güvenlidir.

#### Tasarım hakkında daha fazla bilgiyi nerede bulabilirim?

[Avalanche Köprüsü: Intel SGX Kullanılarak Çapraz Zincir Varlığı Transferi Güvenli Olarak Geçer](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

### - Çok garip

#### Cüzdanımda my göremiyorum. Sonsuza dek kayıp mı oldular?

Hayır, muhtemelen kullanıcı arayüzü sorunu ve işaretler orada ama sadece işaretleri göremiyorsun. [Şuraya](avalanche-bridge-faq.md#cant-see-funds) bak.

#### Varlık Kanıtı sayfasında Ethereum ve Avalanche ile eşleşen bir varlık miktarı neden vermiyor?

Köprünün aşırı teminat olması mümkündür \(yani Ethereum üzerinde üç nedenden daha fazla ERC20 varlık vardır\). Bunların hepsi bekleniyordu.

1. from to yeni transferler var. Köprü sadece Ethereum işlemleri 35 onaylama alınca işlemleri işlemleri yapılır. Ondan önce, teminat dengesi paketlenmiş mal kaynağından daha fazlası olacak.
2. AEB teminatı yeni AB köprüsüne aktarıldı, ancak tüm AEB jetonları bridge, AB tokens dönüştürülmedi.
3. Köprü ücretleri Ethereum tarafında birikti. enclave köprüden elde edilen ücretleri hemen toplamaz. Bunun yerine köprü cüzdanındaki her varlığın toplanmış tüm ücretlerini birleştirir. Bu durumda ücretler ayrı bir cüzdana gönderilir.

#### buy nereden alabilirim?

Konumunuza göre merkezi bir takas için AVAX satın alabilirsiniz. Ayrıca [Pangolin](https://app.pangolin.exchange/) gibi ademi merkeziyetli alışverişlerden AVAX satın alabilirsiniz.

#### Destek için biriyle nasıl irtibata geçebilirim?

Destek, [support.avax.network](https://support.avax.network), veya [Discord](https://chat.avax.network/) sunucumuzda sohbet ile kullanılabilir.** Sormadan önce sorduğunuz sorunun cevabını bulmak için makul bir çaba gösterin!** Başka biri bunu sordu sayılır.

#### "E" harfinin işaretli adı ne anlama geliyor?

`.e`Bu durum asset köprünün diğer tarafına geçtiği anlamına gelmektedir.

#### Metamask on nasıl ayarlarım?

Metamask cüzdanını kurup Avalanche ağına bağlamak için [buraya](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche) bak.

#### ERC20'mi Avalanche Köprüsü'ne transfer ettim. Şimdi nerede değiştirebilirim?

[Pangolin](https://app.pangolin.exchange/) gibi Avalanche on birden fazla AMM ile köprü işaretleri takas edebilirsiniz.

## Ekosistem

### Projemi ekosistem dizine nasıl eklerim?

Projenizi ekosistem dizinine eklemek için lütfen e-posta `ecosystem@avalabs.org`gönderin. Lütfen şunlara da dahil:

* Proje adı
* Hizmetlerinizin kısa bir açıklaması.
* Projenizin logosunun 88. x 88w .svg versiyonu.

   Avalanche ekibinden biri projenin addition onaylamak için size geri dönecek.

#### Ekosistem sayfasında nasıl bir afiş alabilirim?

Projenizin Avalanche Ekosistem sayfasının tanıtım atlıkarınca listesine alınması için lütfen bir ricada `ecosystem@avalabs.org`bulunun. Lütfen projenizin kısa bir tarifini ve tanıtım detaylarını da ekle. Ava Labs destek ekibi üyesi 2 iş günü içinde size cevap verecek.

Bayrak için belirlenen özellikler şöyle:

* Masaüstü ve Peyzaj: 1155px \* 440px
* Portray ve Mobile: 720px \* 337px
* Pankartın ortasında tasarım yoksa kesilecek.
* BG olarak katı renk kullan veya #00'e \(düzenlendi\) giden gradyan

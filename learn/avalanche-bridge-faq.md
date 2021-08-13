# Avalanche Köprüsü \(AB\ FAQ

## Avalanche Köprüsü \(AB\ FAQ

Avalanche Köprüsü \ (AB\), ERC20 Avalanche's to ve tam tersi olarak ERC20 jetonu aktarmak için kullanılabilir. Bu belge köprü ile ilgili ortak sorulara cevap veriyor. Eğer bu belge ve diğer belgeler sorunuza cevap vermezse, [Avalanche's destek sitesi](https://support.avax.network), [Discord](https://chat.avalabs.org) veya [Telegram'da](https://t.me/avalancheavax) bizimle iletişime geçebilirsiniz.

### İşlemler

#### Eğer iş işten çıkarmam sıkışmış gibi görünürse ne yapabilirim?

Eğer to giden köprü üzerinden fonları aktaran Ethereum işlemleri tıkılı görünüyorsa ve herhangi bir doğrulama yapılmıyorsa, [burada](avalanche-bridge-faq.md#speed-up-transaction) tanımlandığı gibi işlemi hızlandırabilirsiniz. Ethereum işlemi 35 onay aldıysa ama Avalanche işlem zamanlayıcısı sıkışmış görünüyor, Metamask cüzdanı dengesini Avalanche ağındaki kontrol edin. Bu işlem zaten işleme tabi ama kullanıcı arayüzünde görünmeyebilir. İşinizi "hızlandırmak" seçtiyseniz bunun olabileceğini unutmayın.

Bu mümkün ama bu köprü tarafından verilen Ethereum işleminin Ethereum fon aktarıldığında 35 doğrulama almak uzun zaman almasıdır. Bu durum Ethereum gaz fiyatlarında ani bir artış meydana gelebilir. Ethereum üzerinde yayınlandıktan sonra 200 blok içinde yer almazsa, daha yüksek gaz fiyatıyla yeni bir işlem "çubuğu" transferi için verilebilir.

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

#### Diğer kanaldan farklı bir adres gönderebilir miyim?

Köprü sadece diğer ağdaki aynı adrese aktarılmasına izin verir. Varlık diğer ağa aktarıldıktan sonra, herhangi bir adres veya sözleşmeye gönderilebilir.

#### İşlemi hızlandırabilir miyim?<a id="speed-up-transaction"></a>

Evet, on the düğmesine tıklayabilirsiniz. Metamask üzerinden yapılan bir işlem başlangıçta gönderilen işlemden daha yüksek bir gaz fiyatına sahip Ethereum üzerinde yeni bir işlem yayınlamıştır. Yeni işlemlerin daha yüksek bir gaz fiyatı olduğundan bu bir bloğa dahil olma olasılığı daha yüksektir. (orijinal ve "hızlı"), sadece bir işlemden biri kabul edilecek. Köprüye fonları aktaran bir işlemden hızlanmak güvenli. Bununla birlikte, kullanıcı arayüzü, yeni işlemden haberdar olmayacaktır, yani kullanıcı arabirimindeki doğrulamaları göremeyebilirsiniz. Yeni işlem on 35 doğrulama elde ettiğinde paketlenmiş fonları görmek için on Metamask cüzdanını kontrol et.

#### on gösterilen jeton sayısı neden belirttiğim numarayla uyuşmuyor?

from to transfer edildiğinde, Metamask 0 jeton transfer edileceğini gösterir, gerçek jeton sayısını değil. This bilinen bir sorun.

#### Köprü sözleşmesi adresleri nedir?

Köprü Adresleri:
* Ethereum: [`0xe7838b4ce7908e89bf8a7f218ef6b9e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche: [`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

Bu **adreslere doğrudan işaret should gerektiğini** unutmayın. Köprünün kullanıcı arayüzünü kullanmalısınız, ki bu da kötü biçimlendirilmiş işlemler için kontrol edilir.

### Ücret için

#### Avalanche Köprüsü'nde ücretler nasıl çalışıyor?

Köprü ücretleri Avalanche ve Ethereum ağlarındaki işlem ücretlerini karşılamak için transfer ücretleri aktarır. Bu ücretler ERC20 varlığının transfer edilmesiyle birlikte aynı şekilde yükleniyor. Yani bir işaret transfer ettiğinizde, dengenin bir kısmı AB tarafından ücret olarak alınır.

Ücret tahmini Ethereum işlem ücretinin bir yüzdesidir ve ayrıca fiyat volatility. için sabit bir miktar (şu an 5\)

Bu yüzde, kullanıcıları varlık transferine teşvik etmek için sıfır olur. Ayrıca to aktarımlar [burada](avalanche-bridge-faq.md#airdrop) tanımlandığı gibi AVAX hava damlasına geçebilir.

#### Gaz nasıl tahmin ediliyor? Köprü nasıl jeton fiyatları alıyor?

Köprü, Ethereum ağı için gaz fiyatları bilgi almak için Chainlink fiyatları beslemektedir. Kullanılan gaz fiyatı Chainlink FASTGAS değerinin ve Geth gaz fiyat yaklaşımının en yüksek olduğu tahmin edilmektedir. Gaz fiyatı, köprü tarafından gönderilen işlemlerin hızlı bir şekilde Ethereum bloğuna dahil edilmesini sağlamak için birkaç GWEI tarafından eklenmiştir.

Köprü ayrıca köprü ücreti ile eşdeğer olan bir token değerinin hesaplanması için kullanılan zincir link fiyatları da kullanır.

#### Hava indirme var mı?<a id="airdrop"></a>

Kullanıcılar 75 dolardan fazla (değişime tabi \ ) bir token transfer to nakledildiğinde 0.1 AVAX hava indirilecektir.

#### Ya hava indirimi almazsam?

Eğer hava damlanızı almadıysanız, lütfen transfer miktarının gerekli olan minimum miktarı yerine getirdiğini doğrulayın.

### Güvenlik

#### Avalanche Köprüsü güvenilmez mi?

Avalanche Köprüsü, hiçbir partinin teminat veya nane paketlenmiş varlık olarak tutulan fonların hiçbirine erişemeyeceği anlamında güvenilmez bir durumdur. Köprü boyunca tüm aktarımlar 4 bağımsız partinin 3 üyesi tarafından onaylanmalıdır (Wardens\ denenen) Bu açıdan köprü kullanmak paranızı aktarmak için herhangi bir partiye güvenmek zorunda değildir.

#### Nöbetçilerin rolü nedir?

Müdürlerin rolü dört katlıdır:

1. Gizli Paylaşımlar saklanıyor
2. Desteklenen Blok Zincirleri Indeksleniyor
3. İşlemli İşlemler İzleme
4. Kamu Bilgilerine Ev Sahipliği

Bir müdürün rolü ve sorumluluklarının tam bir çöküşü yaklaşmakta olan Avalanche Köprüsü Tech Tasarım makalesinde sağlanacaktır.

#### Ava Laboratuvarları ve Wardens? arasındaki ilişki nedir?

Gardiyanlar Avalanche Vakfı'nın güvenilir ortaklarıdır. Teknik mükemmellik ve Avalanche ile birlikte çalışmalarına dair bir kayıt var.

#### Şifre denetlendi mi? Denetim raporları nerede?

Evet, köprü, müdür ve akıllı sözleşmeler için kodlar Halborn tarafından denetlendi. Denetim raporları [burada](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1) bulunabilir.

### - Tokens

#### Köprüden ne tür bir jeton aktarılabilir?

Sadece ERC20 jeton köprü üzerinden aktarılabilir.

#### Köprüye nasıl bir işaret eklerim?

[Şuraya](https://github.com/ava-labs/avalanche-bridge-resources#readme) bak.

#### Köprüde to nasıl bir işaret eklerim?

Bir ders için [burada](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) görün.

#### from nasıl faydalanabilirim?

Metamask’s SWAP fonksiyonunu from to değişmek için kullanabilirsiniz. Alternatif olarak, Ethereum üzerinde [Uniswap](https://app.uniswap.org/#/) gibi bir AMM de kullanabilirsiniz.

#### Neden aynı simge türleri var? Avalanche Köprüsü'nden hangisi olduğunu nasıl söyleyebilirim?

Bu belgenin AEB adı verilen bir önceki köprü uygulaması ile eski bir tarih olarak adlandırılan mevcut nesil Avalanche Köprüsü \(AB\). AEB köprüsü ve AB köprüsü her birinin kendine özgü bir token seti vardır. AEB jetonları AB jetonları lehine reddedildi. AB tokens `.e` a var. Bir simgenin adı ve sembolü ikisini ayırt etmek için iyi referans olsa da, bir simgeyi doğrulamanın tek kesin yolu sözleşmeli adresdir. AB token sözleşmesi adresleri [burada](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json) bulunabilir.

#### Neden yeni köprü jeton cüzdanımda otomatik olarak görünmüyor?

Tetikler C-chain adresiniz değil de daha çok token's ile anlaşır. Adreslerinizin tuttuğu dengeleri kontrol etmek için akıllı anlaşmaların (örneğin, Metamask) cüzdanınıza (örneğin) olduğunu söylemeniz gerekiyor.

### Desteklenen Zincirler

#### Avalanche Köprüsü tarafından hangi zincirler destekleniyor?

Avalanche Köprüsü şu anda sadece Ethereum ERC20'lerin Avalanche to nakledilmesini destekliyor ve tam tersi olarak. Avalanche on oluşturulan ERC20'lerin transfer transferini desteklemek için planlar vardır. Ayrıca Avalanche ve Ethereum dışında ağları desteklemek için planlar da vardır.

### AEB \(Deprecated Bridge\

Bu belgenin AEB adı verilen bir önceki köprü uygulaması ile eski bir tarih olarak adlandırılan mevcut nesil Avalanche Köprüsü \(AB\). Bu bölüm önceki köprü uygulaması \(AEB\) ile ilgili sorularla ilgilenir.

#### AEB ne zaman ameliyat etmeyi bırakıyor?

AEB devre dışı bırakıldı ve transferi artık mümkün değil. of Ethereum tarafında bulunan fonlar yeni Avalanche Köprüsü'ne (AB\) taşındı. Token dönüştürmeleri, kullanıcıların Avalanche Köprüsü'ndeki eşdeğerleri için AEB işaretlerini 1-1 bazında dönüştürmelerine izin vermektedir. Bu dönüşüm [can](https://bridge.avax.network/convert) AEB token destek zamanlayıcıları bireysel DApp projelerine bırakılacaktır.

#### AEB my to transfer edebilir miyim?

AEB jetonlarınızı to taşımak için öncelikle yukarıdaki soruda tarif edildiği gibi AB işaretlerine dönüştürmelisiniz. Dönüşünce, AB işaretlerini to geri taşımak için yeni Avalanche Köprüsü'nü kullanabilirsiniz.

#### AEB (kesilmiş köprü\) işaretlerimi Avalanche Köprüsü \(AB\) işaretlerine nasıl çevirebilirim?

AEB işaretlerini [AB kullanıcı arayüzü](http://bridge.avax.network/convert) kullanarak AB işaretlerine çevirebilirsiniz. Ayrıca, Pangolin gibi birçok ekosistem projesi kullanıcıların jetonlarını dönüştürüp yeni liquidity havuzlarına girmelerini kolaylaştırmaya çalışıyor.

### Tasarım/Teknik

#### BridgeToken sözleşmelerinde tx.origin kullanımı güvenli mi?

Akıllı sözleşmeler içinde yetki kontrolü için tx.origin kullanılarak potansiyel güvenlik riskleri oluşturuyor, ama kullanım davamız yok. Köprü sözleşmelerinde, tx.origin sadece "açılma" fonksiyonunu doğrudan olarak çağırmaktan akıllı sözleşmelere izin vermek için kullanılır, çünkü köprü şu anda sadece dış sahil hesaplardan aktarmayı destekliyor. Tx.origin değerini msg.sender değeriyle karşılaştırarak bunu yapmak güvenlidir.

#### Tek bir özel anahtar nane hediyesi alabilir mi?

SGX kodlama adresine tek bir parti giremez. Sadece the kendisi 4 gardiyanın 3'ü onayını alırken bu anahtarı kullanarak bir işlem oluşturabilir ve imzalayabilir. Bu açıdan buradaki enklava zincir zincirli akıllı bir sözleşme olarak çalışıyor.

#### Köprü neden akıllı bir sözleşmede para tutmuyor?

Akıllı bir sözleşme kullanmamak sondan uca transfer gereksinimlerini basitleştirir, daha düşük gaz ücretleri ve daha hızlı transferlere yol açar.

#### Tasarım hakkında daha fazla bilgiyi nerede bulabilirim?

[Avalanche Köprüsü: Intel SGX Kullanılarak Çapraz Zincir Varlığı Transferi Güvenli Olarak Geçer](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

### - Çok garip

#### Varlık Kanıtı sayfasında Ethereum ve Avalanche ile eşleşen bir varlık miktarı neden vermiyor?

Köprünün aşırı teminatlı olması mümkündür (yani Ethereum üzerinde üç nedenden fazla ERC20 varlık vardır). Bunların hepsi bekleniyordu.

1. from to yeni transferler var. Köprü sadece Ethereum işlemleri 35 onaylama alınca işlemleri işlemleri yapılır. Ondan önce, teminat dengesi paketlenmiş mal kaynağından daha fazlası olacak.
2. AEB teminatı yeni AB köprüsüne aktarıldı, ancak tüm AEB jetonları bridge, AB tokens dönüştürülmedi.
3. Köprü ücretleri Ethereum tarafında birikti. enclave köprüden elde edilen ücretleri hemen toplamaz. Bunun yerine köprü cüzdanındaki her varlığın toplanmış tüm ücretlerini birleştirir. Bu durumda ücretler ayrı bir cüzdana gönderilir.

#### buy nereden alabilirim?

Konumunuza göre merkezi bir takas için AVAX satın alabilirsiniz. Ayrıca [Pangolin](https://app.pangolin.exchange/) gibi ademi merkeziyetli alışverişlerden AVAX satın alabilirsiniz.

#### Destek için biriyle nasıl irtibata geçebilirim?

Destek, [support.avax.network](https://support.avax.network), veya [Discord](https://chat.avax.network/) sunucumuzda sohbet ile kullanılabilir.

#### "E" harfinin işaretli adı ne anlama geliyor?

`.e` suffix varlığın from köprü boyunca taşındığını gösteriyor.

#### Metamask on nasıl ayarlarım?

Metamask cüzdanını kurup Avalanche ağına bağlamak için [buraya](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche) bak.

## Ekosistem

### Projemi ekosistem dizine nasıl eklerim?

Projenizin ekosistem dizinine eklenmesi için lütfen `ecosystem@avalabs.org`. to e-posta gönderin. Lütfen şunlara da dahil:

* Proje adı
* Hizmetlerinizin kısa bir açıklaması.
* Projenizin logosunun 88. x 88w .svg versiyonu.

   Avalanche ekibinden biri projenin addition onaylamak için size geri dönecek.

#### Ekosistem sayfasında nasıl bir afiş alabilirim?

Projenizin Avalanche Ekosistem sayfasının promosyon atlıkarınca listelenmesi için `lütfen` to bir ricada bulunun. Lütfen projenizin kısa bir tarifini ve tanıtım detaylarını da ekle. Ava Labs destek ekibi üyesi 2 iş günü içinde size cevap verecek.

Bayrak için belirlenen özellikler şöyle:

* Masaüstü ve Peyzaj: 1155px \* 440px
* Portray ve Mobile: 720px \* 337px
* Pankartın ortasında tasarım yoksa kesilecek.
* BG olarak katı renk kullan veya \ #00\\(düzenlendi\ ) olarak that gradyan

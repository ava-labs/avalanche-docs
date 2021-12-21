# Avalanche Bridge (AB) SSS

## Avalanche Bridge (AB) SSS

[Avalanche Bridge (AB)](https://bridge.avax.network/) (Avalanche Köprü), Ethereum'dan Avalanche'ın C-Chain'ine ve tersi yönde ERC20 token'larını transfer etmekte kullanılabilir. Bu dokümanda köprü hakkında sıkça sorulan sorular yanıtlanmaktadır. Bu dokümanda ve diğer dokümanlarda sorularınız yanıtlamamışsa, bize [Avalanche'ın destek web sitesi](https://support.avax.network), [Discord](https://chat.avalabs.org) veya [Telegram](https://t.me/avalancheavax) üzerinden ulaşabilirsiniz.

### Önemli Notlar

1. Metamask Mobil uygulamasında köprü işlemlerini etkileyen bir hata (bug) bulunmaktadır (**sadece mobilde**). Bu hata çözülene kadar Metamask mobil uygulamasını köprü aktarmaları için kullanmayın. Masaüstü uygulamasını kullanın veya mobil kullanıcısıysanız Coinbase Wallet kullanın.
2. Avalanche'ta işlem ücretlerini ödemek için AVAX'a ihtiyacınız var. **İşlem ücretlerini ödeyebilmeniz için daha fazla AVAX için bir AMM'de swap yapmak için airdrop yoluyla aldığınız AVAX'ı kullanmanız gerekir.** AVAX'ınız biterse, Avalanche'ta işlem yapmanız mümkün olmayacaktır.

### İşlemler

#### İşlemim takılmış gibi görünüyorsa ne yapabilirim?

Köprüden Avalanche'a fon transfer eden Ethereum işlemi donmuş görünüyor ve herhangi bir konfirmasyon gelmiyorsa, işlemi [burada](avalanche-bridge-faq.md#speed-up-transaction) anlatıldığı şekilde hızlandırabilirsiniz. Ethereum işlemi halihazırda 35 konfirmasyon aldıysa ancak Avalanche işlem zamanlayıcısı donmuş görünüyorsa, Avalanche ağındaki Metamask cüzdan bakiyenizi kontrol edin. İşlem halihazırda işlenmiş ancak kullanıcı arayüzünde görüntülenmiyor olabilir. İşleminizi hızlandırmak için "speed up" seçeneğini seçtiyseniz bu durumun meydana gelebileceğini aklınızda bulundurun.

Ethereum'a fonlar transfer ederken köprü yoluyla yayımlanan Ethereum işleminin 35 onay alması uzun sürebilir ama uzun sürmesi yüksek bir olasılık değildir. Ethereum gaz fiyatlarında ani bir sıçrama olması halinde bu durum meydana gelebilir. Eğer işlem Ethereum'da yayınlandığında ilk 200 blok içinde yer almıyorsa, transferi "unstick" etmek (yapıştığı yerden çıkarmak) için daha yüksek gaz fiyatlı yeni bir işlem yayınlanabilir.

#### Bir köprü transferi ne kadar sürer?

Ethereum işlemi 10 - 15 dakika sürmelidir. Avalanche işlemi birkaç saniye sürer.

#### Köprünün Avalanche işlemi kısmı neden bu kadar uzun sürüyor?

İşlem sadece birkaç saniye sürer. Köprü arayüzü işlemin daha uzun sürdüğünü gösteriyorsa, bu sadece arayüzle ilgili bir sorundur. Varlıklarınız birkaç saniye sonra transfer edilmiştir. Cüzdanınızı ve C-Chain tarayıcıyı (explorer) kontrol edin.

#### Gaz fiyatı transfer ettiğim miktardan daha fazla ise ne olur?

ERC20 varlıklarını Ethereum'dan Avalanche'a taşırken, fonları transfer eden bir Ethereum işlemi göndermek için Metamask kullanırsınız. Bu işlemin ücreti, Ethereum ağındaki oldukça değişken olan cari gaz fiyatlarına göre değişir. Eğer gaz fiyatı işlem ücretinin transfer edilen tutarı aşmasına yol açacak kadar yüksekse, gaz fiyatı düşene kadar beklemek isteyebilirsiniz.

Varlıklar Avalanche'tan Ethereum'a geri taşınırken, köprü, [burada](avalanche-bridge-faq.md#fees) açıklandığı gibi, parasal olmayan bir ücret tahsil eder. Kullanıcı arayüzü, ücret tutarından daha düşük tutardaki transferlere izin vermez. Bir kullanıcı manuel olarak böyle bir işlem üretip gönderirse, köprü o transferi geçersiz olarak işaretler ve işleme koymaz.

#### Avalanche'ta yaratılmış tokenları Ethereum'a gönderebilir miyim?

Henüz değil. AB şu anda sadece Ethereum'da yaratılan ERC20 tokenların Avalanche'a ve Avalanche'tan Ethereum'a transferini desteklemektedir. Gelecekte bunu mümkün kılmak planlarımız arasında.

#### Köprü üzerinden ETH veya BTC gönderebilir miyim?

AB şu anda native ETH veya BTC'yi desteklemiyor. Ancak, bu varlıkların wrap edilmiş versiyonunu (WETH ve WBTC) köprü üzerinden transfer edebilirsiniz.

#### Ya işlemim tarayıcıda görünmüyorsa?

Köprü transferleriyle ilgili işlemler, Avalanche ve Ethereum ağlarının tarayıcılarında görünecektir. İşlemlerin görünmesi birkaç dakika alabilir. İşleminizi tarayıcıda aramak için, adresinizi kopyalayıp [Avalanche C-Chain Explorer](https://snowtrace.io/) veya [Etherscan](https://etherscan.io/) içine yapıştırın. Köprünün kendisi tarafından gönderilen işlemleri görmek için Avalanche için [buraya](https://snowtrace.io/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) ve Ethereum için [buraya](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0) bakabilirsiniz. İşleminizi hâlâ göremiyorsanız [Telegram](https://t.me/avalancheavax) veya [Discord](https://chat.avax.network/) üzerinden bize ulaşın.

#### Köprünün nasıl kullanılacağı hakkında eğitimler mevcut mu?

Evet, köprü işlevselliği ile ilgili video eğitimlerine [buradan](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP) erişebilirsiniz.

#### Avalanche üzerinde işlem ücretlerini nasıl öderim?

Avalanche üzerinde işlem ücretleri native varlık olan AVAX ile ödenir. Avalanche C-Chain'de işlemler göndermek için, işlemin gaz maliyetini karşılamak için cüzdanınızda yeterince AVAX'ınız olmalıdır. Köprü, Avalanche ile tanışmanızda yardımcı olması için Ethereum'dan 75$'lık (değişebilir) token taşıdığınızda size küçük miktarda bir AVAX airdrop (havadan gelen) gönderecektir. İşlem ücretlerinizi karşılayacak AVAX'ınızın tükenmesinin önüne geçmek için önce yeterli miktarda AVAX satın almanızı öneririz. Bunu [Pangolin](https://app.pangolin.exchange/) üzerinden yapabilirsiniz.

#### Diğer ağdaki farklı bir adrese gönderebilir miyim?

Köprü sadece sadece diğer ağdaki aynı adrese transferlere izin verir. Varlık diğer ağa transfer olduktan sonra herhangi bir adres veya sözleşmeye gönderilebilir.

#### İşlemimi hızlandırabilir miyim? <a id="speed-up-transaction"></a>

Evet, Metamask üzerindeki "Speed Up" düğmesini tıklayabilirsiniz. Bir işlem Metamask'da hızlandırıldığında, Ethereum'da gönderilen ilk işlemin gaz fiyatından daha yüksek fiyatlı bir işlem yayınlar. Yeni işlemin daha yüksek bir gaz fiyatı olacağı için, bu işlemin blokta yer verilme ihtimali daha yüksek olacaktır. İşlemlerden \(ilk işlem ve "hızlandırılmış" işlem\) sadece biri kabul edilecektir. Köprüye fon transfer eden bir işlemi hızlandırmak güvenlidir. Ne var ki, kullanıcı arayüzü yeni işlemden haberdar olmayacaktır, bu da kullanıcı arayüzünde konfirmasyonları göremeyebileceğiniz anlamına gelir. Yeni işlem Ethereum üzerinde 35 konfirmasyona ulaştığında, wrap edilmiş fonları görmek için Avalanche'taki Metamask cüzdanınızı kontrol edin.

#### Metamask üzerinde gösterilen token sayısı benim belirttiğim sayıyla neden eşit değil?

Metamask Avalanche'tan Ethereum'a transfer yaparken transfer edilen token sayısını gerçek sayı olarak değil, 0 olarak gösterir. Bu, Metamask ile ilgili bilinen bir sorundur.

#### Köprünün Ethereum ve Avalanche üzerindeki adresi nedir?

Köprü Adresleri:

* Ethereum:[`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche:[`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://snowtrace.io/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

**Bu adreslere doğrudan token transferi yapmamanız gerektiğini** aklınızda bulundurun. Köprünün kusurlu oluşturulmuş işlemleri kontrol eden kullanıcı arayüzünü kullanmalısınız.

### Ücretler

#### Avalanche Bridge üzerinde ücretlendirme nasıl?

Köprü Avalanche ve Ethereum ağları üzerindeki işlem ücretlerini ve köprü altyapısının faaliyet giderlerini karşılamak için transfer ücreti uygular. Bu ücretler transfer edilen ERC20 varlığıyla ayni olarak tahsil edilir. Yani, bir token transferi yaptığınızda bakiyenin bir kısmı ücreti karşılamaya harcanır.

Ethereum'dan Avalanche'a varlıklar taşırken, köprü ücreti 3$ değerinde transfer edilen erc20 varlığıdır. Avalanche'a transferler [burada](avalanche-bridge-faq.md#airdrop) anlatıldığı şekilde bir AVAX airdrop'u için uygun bulunabilir.

Avalanche'tan Ethereum'a varlık taşırken köprü ücretleri büyük ölçüde **beklenen** Ethereum işlem ücretine bağlıdır; bu da güncel varlık fiyatları, Ethereum gaz fiyatı ve Ethereum işleminde kullanılacak ortalama gaz miktarı ile hesaplanır. Bu haliyle, Ethereum işlem ücreti, dolayısıyla köprü ücreti de, oldukça değişken olabilir. Fiyat oynaklığından dolayı, sabit bir dolar tutarı \(şu anda 15$\) köprü ücretine eklenir. Köprü ücretinin, varlık fiyatlarındaki, Ethereum gaz fiyatındaki ve Ethereum işlemlerinde kullanılan gaz miktarındaki dalgalanma nedeniyle Etherscan gibi tarayıcılarda gösterilen Ethereum işlem ücretinden farklı olacağını aklınızda bulundurun. Bir transfer yaparken beklenen köprü ücreti köprü arayüzünde görüntülenir.

#### Bir ağda elime ulaşan varlık tutarı, diğer ağdan gönderdiğim tutarla neden aynı değil?

Köprü bir ücret tahsil eder. Yukarıya bakın.

#### Gaz nasıl tahmin edilir? Köprü, token fiyatlarını nasıl alır?

Köprü, Ethereum ağının gaz fiyatları bilgisini almak için Chainlink fiyat bültenlerini kullanır. Uygulanan gaz fiyatı, Chainlink FASTGAS değeri ile Geth gaz fiyatı kestirmesinden hangisi daha yüksekse, o değerdir. Gaz fiyatı, köprü tarafından gönderilen işlemlerin bir Ethereum blokuna hemen dahil edilmesini sağlamak için birkaç GWEI \(gigawei\) şişirilir.

Köprü, Chainlink fiyat bültenlerini bir tokenın köprü ücretine denk olan tutarını hesaplamak için kullanılan token fiyatlarını belirlemek için de kullanır.

#### Bir airdrop var mı? <a id="airdrop"></a>

Kullanıcılar Ethereum'dan Avalanche'a 75$'ı \(değişebilir\) aşan bir transfer yaptıklarında 0,1 AVAX'a kadar airdrop alacaklardır.

#### Airdrop'umu almadıysam ne yapmalıyım?

Airdrop'unuzu alamadıysanız, transfer tutarının gerekli minimum tutarı karşılayıp karşılamadığını kontrol edin.

### Güvenlik

#### Avalanche Bridge güvenli \(trustless\) bir köprü mü?

Avalanche Bridge, hiçbir tarafın teminat olarak tutulan fonlara erişememesi veya wrap edilmiş varlıklar mint edememesi bakımından güvenlidir. Köprü üzerinden yapılan tüm transferler 4 bağımsız tarafın \(bunlara "warden" denir\) 3'ü tarafından onaylanmalıdır. Bu bakımdan, köprünün kullanılması, fonlarınızın transferi için herhangi bir tarafa güvenmeyi gerektirmez.

#### Warden'ların rolü nedir?

Warden'ların dört rolü vardır:

1. Gizli Hisseleri Saklama
2. Desteklenen Blok Zincirleri İndeksleme
3. Tamamlanmış İşlemleri Takip Etme
4. Herkese Açık Bilgileri Barındırma

Bir warden'ın görev ve sorumluluklarının eksiksiz bir listesini [burada](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1) bulubilirsiniz.

#### Ava Labs ve Warden'lar arasındaki ilişki nedir?

Warden'lar Avalanche Foundation'ın güvenilir ortaklarıdır. Teknik mükemmellik ve Avalanche'la çalışma siciline sahiptirler.

#### Kod denetlendi mi? Denetim raporları nerede?

Evet; köprü, warden ve akıllı sözleşme kodları Halborn tarafından denetlenmiştir. Denetim raporları [burada](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1) bulunabilir.

### Token'lar

#### Avalanche'a transferim tamamlandı ama varlıklarımı Metamask Avalanche'da görmüyorum. Ne olmuş olabilir? <a id="cant-see-funds"></a>

Metamask'a token'ları aramasını söylemeniz gerekiyor. Token'ları [Avalanche Bridge token listesinden](https://github.com/pangolindex/tokenlists/blob/main/ab.tokenlist.json) Metamask'a eklediğinizden emin olun. Bunu yapmanın en kolay yolu, [Proof of Assets](https://bridge.avax.network/proof-of-assets) web sayfasına gidip ihtiyacınız olan wrap edilmiş tokenin yanındaki Metamask simgesine tıklamaktır \(wrap edilen WETH token'ının simgesi WETH.e'dir; USDT token'ı için USDT.e simgesini arayın\).

#### Köprü üzerinden ne tür token'lar transfer edilebilir?

Köprü üzerinden yalnızca desteklenen ERC20 token'ları transfer edilebilir. Avalanche'da bu token'lar sonuna ".e" eklenmiş token sembolüyle temsil edilir. Örneğin, köprüyle transfer edilmiş DAI token'ı DAI.e şeklindedir.

#### Köprü yoluyla ETH gönderdim ama bunu Avalanche'da göremiyorum!

Büyük olasılıkla göndermediniz. Avalanche Bridge yoluyla Avalanche'a ETH gönderimi iki işlemle yapılır. İlk işlem, ki tamamen Ethereum'da yapılır, ETH'yi WETH olarak wrap eder ve sonra bunu Ethereum cüzdanınıza yatırır. Bu iş tamamlandıktan sonra, ikinci bir işlem başlatarak WETH'i Avalanche'a göndermeniz gerekir; bu ikinci işlemde, işlem Ethereum'da 35 onay aldıktan sonra, cüzdanınıza WETH.e yatırılacaktır. Cüzdanınızda görebilmeniz için Metamask'a WETH.e eklemeniz gerekecektir.

#### WETH.e'yi ETH'ye Avalanche'da nasıl unwrap \(wrap'i kaldırma\) ederim?

Yapamazsınız. Avalanche'da ETH diye bir şey yoktur. ETH'nin wrap edilmiş bir temsili olan WETH.e'yi Avalanche'da akıllı sözleşmelerde ve dapp'lerde kullanabilirsiniz.

#### Ethereum'da nasıl ETH wrap/unwrap ederim?

Metamask'ın SWAP fonksiyonunu kullanarak ETH'den WETH'ye swap yapabilirsiniz. Alternatif olarak, Ethereum'daki [Uniswap](https://app.uniswap.org/#/) gibi bir AMM'yi de kullanabilirsiniz.

#### Köprüye nasıl bir token ekleyebilirim?

[Buraya](https://github.com/ava-labs/avalanche-bridge-resources#readme) göz atın.

#### Köprüde kullanılan bir token'ı Metamask'a nasıl ekleyebilirim?

Eğitim için [buraya](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) bakın.

#### Neden aynı token'ın iki tipi mevcut? Hangisinin Avalanche Bridge'den geldiğini nasıl anlayabilirim?

Genel olarak akıllı sözleşmeler ve Pangolin gibi dapp'ler ile etkileşim kurarken **sonunda .e olan token'ı kullanmak istersiniz.**

Bu dokümanda anılan şimdiki nesil Avalanche Bridge'in \(AB\) öncülü AEB adlı bir köprü implementasyonuydu. AEB ve AB köprülerinin kendine özgü token kümeleri vardır. AEB token'ları AB token'ları lehine kullanımdan kaldırılmıştır. AB token'larında bir `.e` son eki bulunur. Bir token'ın adı ve sembolü bu ikisini birbirinden ayırt etmeyi sağlayan iyi göstergeler olsalar da, bir token'ı doğrulamanın tek kesin yolu sözleşme adresidir. AB token sözleşme adresleri [burada](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json) bulunabilir.

#### Köprü üzerinden yeni transfer edilen token neden cüzdanımda otomatik olarak görünmüyor?

Token'lar C-chain adresinizde tutulmazlar, token'ın akıllı sözleşmesinde tutulurlar. Cüzdanınıza \(örn. Metamask\) adreslerinizde tutulan bakiyeleri kontrol etmek için hangi akıllı sözleşmeleri kullanacağını söylemeniz gerekir.

#### Avalanche Bridge NFT'lerin transferini destekliyor mu?

Avalanche Bridge şu anda NFT transferlerini desteklemiyor.

### Desteklenen Zincirler

#### Hangi zincirler Avalanche Bridge tarafından destekleniyor?

Avalanche Bridge şu anda sadece Ethereum ERC20'lerin Avalanche C-Chain'e transferini ve tersi transferini destekler. Avalanche C-Chain'de yaratılan ERC20'lerin transferini desteklemek planlarımız arasında. Avalanche ve Ethereum dışındaki ağların desteklenmesi de planlanıyor.

#### Köprü yoluyla \(ağdan\) Avalanche'a varlıklar transfer edebilir miyim?

Avalanche Bridge yalnızca Ethereum ve Avalanche arasında varlık transferleri yapabilir. Başka bir ağdan Avalanche'a varlıklar getirmek için aşağıdakilerden birini yapabilirsiniz:

* Bu varlıkları Ethereum'a ve sonra Ethereum'dan Avalanche'a transfer etmek
* Ava Labs tarafından yaratılmamış/sürdürülmeyen/desteklenmeyen bir üçüncü taraf köprü kullanmak
* Merkezi bir borsa platformundan AVAX satın alıp bunu Avalanche'a aktarmak, sonra diğer varlıklarla swap için bir AMM kullanmak.

### AEB \(Kullanımdan Kaldırılacağı İlan Edilen Köprü\)

Bu dokümanda anılan şimdiki nesil Avalanche Bridge'in \(AB\) öncülü AEB adlı bir köprü implementasyonuydu. Bu bölümde önceki köprü implementasyonu \(AEB\) hakkındaki sorular yanıtlanmaktadır.

#### AEB operasyonu ne zaman duruyor?

AEB devre dışı bırakılmıştır ve onun üzerinden transferler yapmak artık mümkün değildir. AEB'nin Ethereum tarafında tutulan fonlar yeni Avalanche Bridge'e \(AB\) taşınmıştır. Avalanche C-Chain'de, kullanıcıların AEB token'larını Avalanche Bridge'deki eşdeğerleriyle 1'e 1 esasıyla çevirmelerine imkan veren token çevrimleri etkin hale getirilmiştir. Bu çevirim [https://bridge.avax.network/convert](https://bridge.avax.network/convert) üzerinden yapılabilir. AEB token destek takvimleri münferit DApp projelerinin takdirine bırakılacaktır.

#### AEB token'larımı Ethereum'a transfer edebilir miyim?

AEB token'larınızı Ethereum'a transfer etmek için önce bunları yukarıda açıklandığı gibi AB token'larına çevirmeniz gerekir. Çevirdikten sonra yeni Avalanche Bridge'i kullanarak AB token'larını Ethereum'a geri taşıyabilirsiniz.

#### AEB \(kullanımdan kaldırılacağı ilan edilen köprü\) token'larımı Avalanche Bridge \(AB\) token'larına nasıl çeviririm?

AEB token'larınızı AB token'larına [AB kullanıcı arayüzünü](http://bridge.avax.network/convert) kullanarak çevirebilirsiniz. Dahası, Pangolin gibi birçok ekosistem projesi de kullanıcıların token'larını çevirmelerini ve yeni likidite havuzlarına girmelerini kolaylaştırmak için çalışıyor.

### Tasarım/Teknik

#### Tek bir özel anahtarla token mint edilebilir mi?

Hiçbir taraf tek başına SGX enclave adresine giremez. Yalnızca enclave'da 4 warden'dan 3'ünün onayı alındıktan sonra o anahtar kullanılarak bir işlem kurulabilir/imzalanabilir. Bu bakımdan, enclave burada bir çapraz zincir akıllı sözleşmesi olarak işlev görmektedir.

#### Köprü fonları neden bir akıllı sözleşmede tutmuyor?

Akıllı sözleşme kullanmamak uçtan uca transfer gereklerini basitleştirmekte, bunun sonucunda daha düşük gaz ücretleri ve daha hızlı transferler söz konusu olmaktadır.

#### Kendi akıllı sözleşmelerime köprü transferlerini entegre edebilir miyim?

Şu anda köprü yalnızca harici olarak sahip olunan hesaplardan \(EOA\) çapraz zincir transferlerini desteklemektedir. Bunun nedeni, köprünün iki ağda da aynı adresi kullanarak köprü yoluyla taşınan fonun aynı cüzdanda tutulmasını sağlaması ve Ethereum'da belli bir adreste bulunan bir akıllı sözleşmenin Avalanche'taki aynı adreste de mevcut olmasını sağlamanın bir yolunun olmamasıdır. Ethereum ağındaki akıllı sözleşmelerden köprü adresine gönderilen ERC20 token'ları, Avalanche'da wrap edilmiş token'lar olarak mint edilmeyecektir.

#### BridgeToken sözleşmelerinde tx.origin kullanımı güvenli mi?

Tx.origin'in yetki kontrolü için akıllı sözleşmeler içinde kullanılması potansiyel güvenlik riskleri taşısa da, bizim kullanım senaryomuzda bu risk yoktur. Köprü sözleşmelerinde, tx.origin yalnızca doğrudan "unwrap" fonksiyonunun çağrılmasından gelen akıllı sözleşmelere izin vermemek için kullanılır, çünkü köprü şu anda yalnızca harici olarak sahip olunan hesaplardan yapılan transferi destekler. Bunu tx.origin değerini msg.sender değeri ile karşılaştırarak yapmak güvenlidir.

#### Tasarım hakkında daha fazla bilgiyi nereden edinebilirim?

[Avalanche Bridge: Intel SGX Kullanarak Güvenli Çapraz Zincir Varlık Transferi](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1) makalesine göz atın.

### Diğer

#### Token'larımı cüzdanımda göremiyorum. Acaba geri döndürülemeyecek şekilde kayıp mı oldular?

Hayır. Çok büyük ihtimalle bu bir kullanıcı arayüzü sorunudur ve token'lar oradadır ama siz görmüyorsunuzdur. [Buraya](avalanche-bridge-faq.md#cant-see-funds) göz atın.

#### Varlıkların Kanıtı sayfasında bir varlığın tutarı neden Ethereum ve Avalanche'da eşleşmiyor?

Köprünün üç nedenle fazla teminata bağlanmış \(yani, Ethereum'da Avalanche'da mevcut olandan daha fazla bir ERC20 varlığı tutuluyor\) olması mümkündür. Bunların hepsi beklenen şeylerdir.

1. Ethereum'dan Avalanche'a yeni transferler vardır. Köprü, transferleri ancak Ethereum işlemi 35 konfirmasyon aldıktan sonra işler. Bundan önce, teminat bakiyesi wrap edilen varlık arzından daha fazla olacaktır.
2. AEB teminatı yeni AB köprüsüne aktarılmış ama tüm AEB tokenları henüz Avalanche'da AB tokenlarına çevrilmemiştir.
3. Köprü ücretleri Ethereum tarafında birikmiş olabilir. Enclave, köprüden üretilen ücretleri hemen tahsil etmez. Bunun yerine, her bir varlığın tüm tahsil edilen ücretlerini, önceden belirlenen bir eşiğe ulaşılana kadar köprü cüzdanında tutar. Bu eşiğe ulaşıldığında, ücretler ayrı bir cüzdana gönderilir.

#### Nereden AVAX satın alabilirim?

Bulunduğunuz yere bağlı olarak merkezi bir borsadan AVAX satın almanız mümkün olabilir. [Pangolin](https://app.pangolin.exchange/) gibi merkeziyetsiz borsalardan da AVAX satın alabilirsiniz.

#### Destek için birileriyle nasıl iletişim kurabilirim?

[support.avax.network](https://support.avax.network) üzerinden sohbet uygulamasını kullanarak veya [Discord](https://chat.avax.network/) sunucumuz üzerinden destek alabilirsiniz. **Lütfen bir soru sormadan önce cevabı aramak için makul çaba sarf edin!** Başka birinin o soruyu zaten sormuş olması kesin gibi bir şey.

#### Token adındaki .e son eki ne anlama gelir?

`.e` ön eki varlığın Ethereum'dan köprü yoluyla taşınmış olduğunu ifade eder.

#### Avalanche üzerinde Metamask'ı nasıl yapılandırabilirim?

Metamask cüzdanınızı kurmak ve Avalanche ağına bağlamak için [buraya](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche) göz atın.

#### ERC20'lerimi Avalanche Bridge üzerinden transfer ettim. Şimdi bunu nerede alıp satabilirim?

Köprü token'larını Avalanche C-Chain'de çalışan [Pangolin](https://app.pangolin.exchange/) gibi birçok farklı AMM'de alıp satabilirsiniz.

## Ekosistem

### Projemi ekosistem dizinine nasıl ekleyebilirim?

Projenizin ekosistem dizinine eklenmesi için lütfen `ecosystem@avalabs.org` adresine bir e-posta gönderin. Lütfen şunlara yer verin:

* projenizin adı
* hizmetlerinizin kısa bir açıklaması
* projenizin logosunun 88 en x 88 boy .svg versiyonu

   Avalanche ekibinin bir üyesi, projenizin dizine eklendiğini teyit etmek için size dönüş yapacaktır.

#### Ekosistem sayfasında bir reklam bandını nasıl yayınlatabilirim?

Projenizin Avalanche Ekosistem sayfasının reklam karuseli bölümünde listelenmesi için lütfen `ecosystem@avalabs.org` adresine bir talep gönderin. Lütfen projenizin kısa bir tarifine ve tanıtımsal detaylara yer verin. Ava Labs destek ekibinin bir üyesi size 2 iş günü içinde yanıt verecektir.

Reklam bandı şartnamesi aşağıdaki gibidir:

* Masaüstü ve Yatay: 1155px \* 440px
* Dikey ve Mobil: 720px \* 337px
* Tasarım ögeleri reklam bandının ortasında olmalı, aksi takdirde kırpılırlar.
* BG olarak düz bir renk veya #000000 \(düzenlenmiş\) seviyesine solan gradyan kullanın


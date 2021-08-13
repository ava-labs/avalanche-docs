---
description: Avalanche uzlaşma protokolüne derin bir dalış

---

# Avalanche Consensus

Bir grup bilgisayar ile bir karar üzerinde anlaşmaya varmak için uzlaşma görevidir. Bilgisayarlar, uzlaşma protokolü denilen bir dizi adımı takip ederek uzlaşmaya ulaşabilir. Avalanche scalable, sağlam ve ademi merkeziyetli yeni bir uzlaşma protokolüdür. Düşük gecikme ve yüksek geçim var. Enerji verimliliği, özel bilgisayar donanımı gerektirmez. Bu durum "%51" saldırısına dayanıklıdır. Bu belge Avalanche uzlaşma protokolünü açıklıyor. Beyaz aper [burada.](https://www.avalabs.org/whitepapers)

## Video

{% embed url="https://www.youtube.com/watch?v=ZUF9sIu-D\_k" başlık="% }

## Sezgiler

Önce protokolle ilgili önsezi geliştirelim. Bir oda dolusu insan bir de öğle yemeği için ne yiyeceğini kabul etmeye çalışıyor. Pizza ve barbekü arasında ikili bir seçim olduğunu varsayalım. Bazıları başlangıçta pizza tercih ederken, bazıları barbekü tercih eder. Sonuçta herkesin amacı **uzlaşma** sağlamaktır.

Herkes odadaki insanların rastgele bir alt kümesini soruyor. Öğle yemeği tercihinin ne olduğunu soruyor. Yarı pizza derse, insan "Tamam, görünüşe göre işler pizzaya doğru eğiliyor. Pizzayı tercih ederim." Yani çoğunluğun _tercihini_ kabul ediyorlar. Benzer şekilde, çoğunluk barbekü diyorsa kişi barbekü tercih olarak kabul eder.

Herkes bu süreci tekrarlıyor. Her raund daha fazla insan aynı tercihi yapıyor. Bu nedenle, seçeneği tercih eden kişi ne kadar çok kişi olursa o kadar büyük bir cevap alma olasılığı o kadar yüksek ve bu seçeneği tercih ettiği için kabul eder. Yeterince raunttan sonra uzlaşmaya varırlar ve herkesin tercih ettiği bir seçenek üzerinde karar verirler.

## Kartopu

Yukarıdaki sezgiler, Avalanche uzlaşmasının bir yapı taşı olan Snowball Algoritması ile sınırlandırılır. Kartopu algoritmasını gözden geçirelim.

### Parametreler

* _n_: Katılımcı sayısı
* _k_ \(örnek boyut\): 1 ve _n_ arasında
* α \(quorum boyut\), 1 ve _k_ arasında
* β \(karar eşiği\): > = 1

### Algoritma

```text
preference := pizza
consecutiveSuccesses := 0
while not decided:
  ask k random people their preference
  if >= α give the same response:
    preference := response with >= α
    if preference == old preference:
      consecutiveSuccesses++
    else:
      consecutiveSuccesses = 1
  else:
    consecutiveSuccesses = 0
  if consecutiveSuccesses > β:
    decide(preference)
```

### Algoritma Açıklandı

Herkesin pizza veya barbekü için ilk tercihi vardır. Biri _karar_ verene _kadar_ insanları sorgulayıp hangisini tercih ettiklerini sorarlar. Eğer α veya daha fazla kişi aynı cevabı verirse, bu yanıt yeni tercih olarak kabul edilir. α _quorum_ boyutu olarak adlandırılır. Eğer yeni tercihler eski tercihlerle aynıysa, `arka arkaya` başarılar sayacı artmıştır. Yeni tercih farklıysa, arka `arkaya bir kez daha başarılar` `1` ile karşılık verir. Eğer cevap verilmezse\ (aynı yanıtın α çoğunluğu), üst `üste` başarılar sayacı `0`'a ayarlanır.

Herkes aynı tepkiyi alana kadar bunu tekrarlar. Eğer bir kişi pizza karar verirse, protokolü takip eden diğer herkes sonunda pizza üzerinde karar verir.

Rastgele örnekleme sonucu rastgele değişimler, bir ağ tercihi için bir tercih yapar, bu seçimler için daha fazla ağ tercihi başlatır ve sonra düğümler karar verebilir.

{% ipuçları style="info" } Ava Laboratuvarı'nın kurucu Ted Yin'in [şu demoyu](https://tedyin.com/archive/snow-bft-demo/#/snow) bir kontrol edin. {% endhint }

Örnekte pizza veya barbekü arasında ikili bir seçim vardır, ancak Kartopu birçok olası seçenek ile ilgili kararlara uyum sağlamak için adapte edilebilir.

Yaşam ve güvenlik eşikleri parametreye edilebilir. Kor büyüklüğü (α) arttıkça, güvenlik eşiği artar ve yaşam eşiği azalır. Bu da ağ daha fazla byzantine (kasten yanlış, kötü niyetli) düğümlere katlanabilir ve güvende kalabilir, yani tüm düğümler sonunda bir şeyin kabul edilip kabul edilip edilmediğini kabul eder. Yaşam eşiği, protokolün ilerlemeyi başaramamasından önce hoşgörü gösterebilen kötü niyetli katılımcıların sayısıdır.

Bu değerler sabit olan Avalanche Ağı üzerinde oldukça küçüktür. Örnek boyutu _K_, `20` yani bir düğüm, bir grup düğümleri sorduğunda tüm ağın `dışında sadece 20` düğümle ilgili sorular soruyor. Korum boyutu α, `14`. Yani `14` veya daha fazla düğüm aynı cevabı verirse, bu yanıt sorgulayan düğümün tercihi olarak kabul edilir. Karar eşiği β, `20`. Bir düğüm, art arda `20` quorum \(α çoğunluk\) yanıt aldıktan sonra seçim kararı verir.

Kartopu ağdaki düğümlerin sayısı _n_, artarken çok ölçülebilir. Ağdaki katılımcılar sayısına bakılmaksızın gönderilen uzlaşma mesajlarının sayısı aynı kalıyor çünkü belirli bir sorguyla, bir düğüm, ağda binlerce düğüm olsa bile sadece `20` nod sorgulanır.

## DAGs **\ (Directed** **Acyclic** **Graphs\**

Şimdi DAG veya Directed Acyclic Grafik adlı veri yapısını tanıtalım. DAG kararların **kısmi bir emir** verir. Örneğin, şu diyagramdaki DAG örneğine bak:

![Temel DAG](../../.gitbook/assets/cons-01-Frame16.png)

**b.****** **b** **d**. **c** **e**. before önce önce önce bir geliş **diyebiliriz**. Ancak, **bu** kısmi bir emirdir: bazı elementler için, sipariş tanımlanmamıştır. Örneğin, **b** ve **c** **bir şeyin** peşindedir, ancak **b b b** 'nin **c** öncesi veya sonrası hakkında bir fikir yoktur.

İki farklı DAG konseptleri **ataları** ve **soyundan gelmişlerdir**. Atalar, in bir çizgi çizebileceğiniz herhangi bir düğümdür. Örneğin, **D** ataları **a****,** **b**, ve **c**. Ataların ataları **a,** **c**. Ataların zıttıdır. **A,** **b******, **c**, **d**, ve **e**. B soyundan **gelen d**.

Örneğin Bitcoin ve Ethereum, her bloğun bir ebeveyn ve bir çocuğu olduğu doğrusal zincire sahiptir. Avalanche lineer zincir yerine veri saklamak için bir DAG kullanır. of her bir elemanı birden fazla ebeveyn olabilir. in ebeveyn ilişkisi uygulama düzeyinde bağımlılık anlamına gelmez.

Bir uzlaşma protokolünde, oyunun adı protocol, **çelişen işlemlerin** karışmasını önlemektir. Çatışmalar uygulama tanımlıdır. Farklı uygulamalar, iki çatışma için ne anlama geldiği hakkında farklı fikirlere sahiptir. Örneğin, bir P2P ödeme sisteminde, aynı UTXO [\(Harcanmamış Transaction Output\)](https://en.wikipedia.org/wiki/Unspent_transaction_output) kullanan işlemler çatışmaya girer. In her işlem çelişkili işlemlerden oluşan **bir çatışma kümesine** aittir. Bir çatışma setinde sadece bir işlem in yer alabilir. Her düğüm, bir çatışma setinde bir işlem **tercih** eder.

## Çalışma Örnekleri

Diyelim ki şu parametrelerle çalışan bir Avalanche ağımız var. Örnek boyutu _k_, `4`. quorum boyutu α, `3`. art arda başarı sayısı β, `4`.

![Çalışma örneği](../../.gitbook/assets/cons-02-Consensus_Doc_txY.png)

Bir düğüm yeni bir işlem **Y** ile ilgili öğrenir ve ağ yukarıdaki parametrelere göre sorgular. _k_ \(`4`\) validators sorar ve "Bu işlemi tercih eder misiniz?" diye sorar. Bu cevap geri gelir: üçü **evet** der ve biri **hayır** der. Kor boyutu α, `3` yani evet tepkisinin α çoğunluğu (quorum\) vardır. Şimdi de düğüm, its güncelliyoruz.

![Çalışma örneği](../../.gitbook/assets/cons-03-Consensus_Doc_txY-6.png)

Eğer bir düğüm bir işlem için α çoğunluk tepkisi alırsa o zaman bu işlem için bir **şut** verirsiniz, bu işlem hakkında ağ hakkında soru sorduğumda α çoğunluğu tercih ettiklerini söyler. Örnek olarak, Y işlemleri bir çene kapar.

Ayrıca bir vertex's çenesinin toplamı ve torunlarının çenelerinin toplamı **olan bir güven** kavramı vardır. Örneğin, **V** işleminin bir parçası vardır. Aynı zamanda üç torunu vardır, bu yüzden kendine güvenini `3`'ten `4`'e artırır. Benzer `şekilde,``` **W** ve **X** işlemlerinin her ikisinin de bir torunu vardır ve her ikisinin de bir çenesi vardır.

**Artistik başarılar** in gibi aynı. Bu işlem veya bir alıcının soyundan gelen sayı, başarılı bir α çoğunluk sorgu yanıtını alan sayıdır. Daha önce V işlemleri art arda `3` başarı elde etti, kendisi ve iki çocuğu ve şimdi de X işlemleri için `4` tane art arda başarı elde etti.

![Çalışma 3](../../.gitbook/assets/cons-04-Consensus_Doc_txY-2.png)

Bu örnekte kabul eşiği olan β, `4`. İşlem V üst üste `4` başarı **elde** eder. Bu düğüm, diğer doğru düğümlerin sonunda bu işlemi kabul edeceğinden emin.

![Çalışma example](../../.gitbook/assets/cons-05-Consensus_Doc_txY-3.png)

Şimdi varsayalım, **"Y"** işlemiyle çelişen işlemleri öğrenir ve önceki gibi aynı adımları takip eder ve _k_ \(`4`\) validators örnek alır ve "Y" işlemini tercih edip etmediklerini sorar. Bu durumda iki kişi "Y" tercih ettiklerini söylerler ve ikisi de "Y" tercih etmezler. Bu sefer α çoğunluk cevabı yoktur ve DAG buna göre güncellenmiştir.

![Çalışma 5](../../.gitbook/assets/cons-06-Consensus_Doc_txY-4.png)

Y ve Y'nin Transactions bir çatışma in ve bunlardan sadece biri sonunda kabul edilebilir. "Y" işleminin bir parçası yok çünkü α çoğunluk tepkisi almadı. Kendine güven `0` var çünkü bir çenesi yok ve bir çenesi olan bir soyundan gelen yok. Bir önceki sorgu α çoğunluk tepkisi alamadığı için art arda `0` başarı elde etti. W'nin üst üste başarı sayısı `2```'den `0`'a kadar gidiyor.

Bir düğüm, verilen bir işlem tercih edip etmediği sorulduğunda, işlem işleminin ihtilaf setinde `herhangi` bir işlem için en yüksek güvene sahip olup olmadığı sorulduğunda, evet cevabını verir. Bu örnekte, Y özgüven `1` ve işlem Y'nin Y transaction Y 'yi tercih eder.

![Çalışma](../../.gitbook/assets/cons-07-Consensus_Doc_txY-1.png)

Şimdi düğüm, yeni bir işlem hakkında öğreniyor **Z**, ve eskisi gibi yapıyor. _k_ nodes, sorgular, α çoğunluk yanıtını geri alır ve the günceller.

![Çalışma 7](../../.gitbook/assets/cons-08-Consensus_Doc_txY-5.png)

Z transseksüel bir şey elde ediyor. Ayrıca `1` ve `1` ardışık bir başarı elde etmiştir. İşlemci ataları da güncellendi. Hiçbir işlem art arda `4` başarılı değildir, bu yüzden hiçbir ataya kabul edilmez.

## Dikenler

Bu noktada tartışılan her şey Avalanche [in](https://assets-global.website-files.com/5d80307810123f5ffbb34d6e/6009805681b416f34dcae012_Avalanche%20Consensus%20Whitepaper.pdf) nasıl is Avalanche consensus protokolünün Ava Labs (yani AvalancheGo\) tarafından uygulanması gecikme ve geçit için bazı optimizasyonlar vardır. En önemli optimizasyon **dikey** kullanmaktır. Omurgası lineer blok zincirindeki bir blok gibidir. Ailesinin eskileri içeriyor ve bir işlem listesi içeriyor. Dikenler işlemlerin tek tek tek yerine gruplar halinde toplanıp oylanmasına izin verir. DAG vertices, oluşuyor ve protokol yukarıda it's çok benziyor.

Eğer bir düğüm, bir vertex, oy alırsa, bir in tüm işlemler için bir oy sayılır ve oylar transitively olarak yukarı uygulanır. Bir vertex kabul edilir, tüm işlemler kabul edilir. Eğer bir vertex reddedilmiş bir işlem içeriyorsa reddedilir ve tüm soyları reddedilir. Eğer bir vertex reddedilirse, geçerli işlemler reddedilmiş bir vertex çocuğu olmayan yeni bir vertex içine yeniden verilebilir. Yeni dikenler tercih edilen vertices. eklenir.

## - Final

Avalanche uzlaşması olasılık olarak güvenli bir eşiğe kadar güvenlidir. Bu da doğru düğümün bir işlem kabul etmesi olasılığı başka bir doğru düğümün sistem parametrelerini ayarlayarak keyfi olarak düşük hale getirilebileceği bir işlemdir. Nakamoto consensus protokolünde, (örneğin Bitcoin ve In olduğu gibi), zincire bir blok dahil edilebilir ancak sonra kaldırılabilir ve kanonik zincirde sonlanmaz. Bu işlem anlaşmasını bir saat beklemek demek. In kabul edilme/reddedilme **son ve geri dönüşü olmayan bir** kaç saniye sürer.

## İyimserler

Düğümlerin sadece "Bu çeviriyi mi tercih edersin?" diye sorması etkili değil. validators. sorguladıklarında. Ava Labs'ın uygulamasında bir soru sorulduğunda "Bu vertex var olduğuna göre, hangi dikenleri tercih edersiniz?" diye sorulur. İkili bir evet / hayır yerine düğüm, diğer düğümün tercih edilen vertex setini alır.

Düğümler sadece yeni bir işlem duyunca sorgu yapmaz. Erdemli bir dikey işleme yapılana kadar sürekli sorguluyorlar. Erdemli bir verteks, çatışma has

Düğümlerin bir anketin _sonucunu_ kaydetmeden önce tüm sorulara cevap vermelerini beklemesine gerek yok. Eğer hiçbir işlem α çoğunluğu elde edemezse geri kalan yanıtları beklemeye gerek kalmaz.

## Validators

Avalanche ağındaki onaylayıcı olmak özgür olsaydı, bu sorun olurdu, çünkü kötü niyetli bir aktör bir çok şeye başlayabilir, bu çok sık sorguya çekilecek bir sürü düğüm. Kötü niyetli aktör düğümleri kötü davranır ve güvenlik veya yaşam arızasına neden olabilir. validators, fikir birliği içinde sorgulanan düğümler ağ üzerinde etkisi vardır. Bu tür oy doldurmayı önlemek için gerçek dünya değeriyle bu etkiyi ödemek zorundalar. Bu fikir ağ üzerindeki nüfuz satın almak için gerçek dünya değerini kullanma fikri "Kazığın Kanıtı" olarak adlandırılır.

Bir doğrulama makinesi olmak için düğüm, \(stake\) değerli bir şey (**AVAX**\) **bağlamalı** olmalıdır. Daha çok AVAX düğümlü bağlar ne kadar çok düğüm, düğümler tarafından sorgulanır. Bir düğüm örneği aldığında ağ rastgele değildir. Daha ziyade kazık miktarı ağırlıklı. Düğümler onaylayıcı olmaya teşvik edilir çünkü ödül alırlar, eğer onaylanırsa yeterince doğru ve tepki verirler.

Avalanche kesilmesi yok. Eğer bir düğüm doğru düzgün davranmazsa, yanlış cevaplar vermek veya belki de hiç tepki vermemek gibi hatalı bir düğüm hala tüm olarak geri dönüyor ama hiçbir ödül yok. Bağlı of yeterli bir kısmı doğru düğümlerle tutulduğu sürece ağ güvenli ve erdemli işlemler için canlı demektir.

## Büyük Fikirler

in iki büyük fikir **örnek ve** **transitive oylama** oluşturuyor. Alt örnekleme düşük mesaj yükleniyor. 20 doğrulayıcı veya 2 bin doğrulayıcı olup olmadığı önemli değil, bir sorgu sırasında gönderilen uzlaşma iletilerinin sayısı sürekli kalır.

![Çalışma 8](../../.gitbook/assets/cons-09-Consensus_Doc_txY-7.png)

Geçiş oylaması, bir for oylaması, atalarının her şeye oy vereceği geçiş yoluyla işlem yapılmasına yardımcı olur. Her oy aslında bir oyla bir oyla bir çok oy. Örneğin, yukarıdaki diyagramda, eğer bir düğüm vertex **D** için oy alırsa, bu da tüm ataları için bir oy anlamına gelir; **D** için D oylama **A**, **B** ve **C** için de bir oydur.

## Gevşek Bitiyor

İşlemler, [on](https://github.com/ava-labs/avalanchego) API olarak adlandırılan kullanıcılar tarafından yaratılır, [AvalancheJS](https://github.com/ava-labs/avalanchejs) gibi bir kütüphane kullanarak oluştururlar. Vertices düğümlerin içeri girişi bir araya getirmesiyle veya reddedilmiş bir from kabul edilen işlemleri yeniden basılıp to eklendiğinde oluşturulur. Bir vertex's ebeveynleri virtuous ucunda çatışma olmayan düğümler olan erdemli sınırdan seçilir. Erdemli köşelere inşa etmek önemlidir, çünkü erdemli olmayan köşelere inşa edersek düğümün reddedilmesi için daha yüksek bir şans olur ki bu da atalarının reddedilmesi ve daha az ilerleme kaydedebiliriz.

## Diğer Gözlemler

Çatışma işlemleri canlı olarak garanti edilmez. Bu gerçekten bir sorun değil, çünkü eğer işleminin canlı olmasını istiyorsan o zaman çelişkili bir işlem should

Avalanche da doğrusal zincirler için çalışıyor. Protokol büyük ölçüde yukarıdaki gibi ama her bir omurga sadece bir ebeveyni vardır. Bu da tam bir dikey sipariş verir. Bu, akıllı sözleşmeler gibi başka bir işlemden önce bir işlemden önce bir işlemden önce bir işlemin olup olmadığını bilmesi gereken bazı uygulamalar için yararlıdır. Snowman Ava Labs'ın Avalanche consensus protokolünün lineer zincirler için uygulanmasının adıdır.

Eğer kararsız işlemler yoksa, Avalanche uzlaşma protokolü _yordamları yapar_. Yapılacak bir iş yoksa hiçbir şey yapmaz. Avalanche düğümlerin sürekli çalışması gereken iş kanıtından daha sürdürülebilir bir şey.

Avalanche lideri yok. Herhangi bir düğüm bir işlem önerebilir ve AVAX tehlikeye atan her düğüm, ağı daha sağlam ve ademi merkeziyetli hale getiren her işlem üzerinde oy verebilir.

## Neden Umurumuzda Ki?

Avalanche genel bir uzlaşma motorudur. Üzerine ne tür bir uygulama koyulduğu önemli değil. Protokol, uygulama katmanının uzlaşma katmanından ayrışmasına izin verir. on bir Dapp inşa ediyorsanız o zaman sadece birkaç şeyi tanımlamanız gerekir. Çatışmaların nasıl tanımlandığı ve işlemde ne olduğu gibi. Düğümlerin anlaşmaya nasıl vardığı konusunda endişelenmene gerek yok. consensus protokolü içine bir şey koyan kara kutudur. Ve kabul edilir veya reddedilir.

Avalanche sadece P2P ödeme ağları için değil, her türlü uygulama için kullanılabilir. Avalanche's ana ağı, mevcut Ethereum Dapps ve dev araçlarıyla geriye doğru uyumlu Ethereum Sanal Makinesi'nin bir örneğine sahiptir. Ethereum consensus protokolü daha düşük blok gecikmesi ve daha yüksek geçim sağlamak için Avalanche consensus ile değiştirilmiştir.

Avalanche çok performanslı. Saniyede binlerce işlem bir ila iki saniye arasında kabul gecikmesi ile işleyebilir.

## Özetle

Avalanche uzlaşması, dağıtım sistemlerinde radikal bir atılımdır. Bu öncekiler gibi ileri bir sıçramayı temsil ediyor. Şimdi nasıl çalıştığına dair daha iyi bir anlayış gösterdiğinize göre on oyun değiştiren Dapps ve finansal araçlar inşa etmek için diğer [belgeleri](https://docs.avax.network) kontrol edin.


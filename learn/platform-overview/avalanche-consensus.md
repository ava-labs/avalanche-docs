---
description: Avalanche konsensüs protokolüne derinlemesine bir bakış
---

# Avalanche Konsensüs

Konsensüs, bir grup bilgisayarı bir karar üzerinde mutabakata vardırma işidir. Bilgisayarlar konsensüs protokolü olarak bilinen bir dizi adımı takip ederek konsensüse ulaşabilirler. Avalanche ölçeklenebilir, sağlam ve merkeziyetsiz yeni bir konsensüs protokolüdür. Avalanch'da gecikmesi süresi düşüktür, iş çıkarma yeteneği yüksektir. Enerjiyi verimli kullanır ve özel bilgisayar donanımı gerektirmez. Olumsuz koşullarda performansı iyidir ve "%51 saldırılarına" karşı esnektir. Bu dokümanda Avalanche konsensüs protokolü açıklanmaktadır. Teknik dokümanı [burada](https://www.avalabs.org/whitepapers) bulabilirsiniz.

## İçgörü

Önce protokol hakkında biraz içgörü geliştirelim. Bir oda dolusu insanın öğle yemeğinde ne yiyecekleri üzerinde anlaşmaya varmaya çalıştıklarını hayal edin. Diyelim ki pizza ve barbeküden oluşan iki seçenek arasında bir seçim yapmaya çalışıyorlar. Birileri ilk başta pizzayı tercih ederken, diğerleri ilk başta barbeküyü tercih edebilir. Ama herkesin hedefi en nihayetinde uzlaşmaya, yani **konsensüse** varmaktır.

Odada bulunan her bir kişi, diğer kişilere \(bunlara rastgele belirlenmiş alt grup diyelim\) öğle yemeği tercihinin ne olduğunu sorar. Yarıdan fazlası pizza derse, o kişi "Tamam, demek ki eğilim pizza yönünde. Benim tercihim de şimdi pizza olsun," diye düşünür. Yani herkes çoğunluğun _tercihini_ benimser. Aynı şekilde, çoğunluk barbeküyü tercih ederse, o kişi kendi tercihi olarak barbeküyü benimser.

Her bir kişi bu süreci tekrarlar. Her bir turda giderek daha fazla kişi aynı tercihi benimseyecektir. Çünkü bir seçeneği ne kadar çok insan tercih ederse, bir kişinin bir çoğunluk yanıtı alma ve o seçeneği kendi tercihi olarak benimseme olasılığı o kadar artar. Yeteri kadar turdan sonra konsensüse ulaşırlar ve herkesin tercih ettiği tek bir seçenek üzerinde karar verirler.

## Snowball \(Kartopu\)

Yukarıdaki içgörü, Avalanche konsensüs protokolünün yapı taşı olan Snowball Algoritmasını ana hatlarıyla açıklar. Şimdi Snowball algoritmasına bir göz atalım.

### Parametreler

* _n_: katılımcı sayısı
* _k_ \(örneklem büyüklüğü\): 1 ve _n_ arasında
* α \(yeterli çoğunluk büyüklüğü\): 1 ve _k_ arasında
* β \(karar eşiği\): >= 1

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

### Algoritma Açıklaması

Her bir kişinin ilk baştaki tercihi pizza veya barbeküdür. Bir kişi _karar verene_ kadar, her bir kişi k sayısı kadar _kişiyi_ \(örneklem büyüklüğü\) sorgular ve onlara neyi tercih ettiklerini sorar. Eğer α sayısı kadar veya daha fazla sayıda kişi aynı yanıtı verirse, bu yanıt yeni tercih olarak benimsenir. α sayısı, _yeterli çoğunluk büyüklüğü_ olarak adlandırılır. Eğer yeni tercih eski tercihle aynı ise, `consecutiveSuccesses` sayacı bir adım artar. Eğer yeni tercih eski tercihten farklıysa, `consecutiveSucccesses` sayacı `1` olur. Eğer hiçbir yanıt yeter çoğunluğu sağlayamazsa \(aynı yanıtın bir α çoğunluğu\), o durumda `consecutiveSuccesses` sayacı `0` olur.

Her bir kişi bu süreci aynı yanıt için yeterli çoğunluğa peş peşe β sayısı kere ulaşana kadar tekrarlar. Eğer bir kişi pizzaya karar verirse, o zaman diğer her kişi de protokole uygun olarak en nihayetinde pizzaya karar verecektir.

Tercihte rastgele örneklemenin tercihte sebep olduğu rastgele değişiklikler, bir seçenekten yana bir ağ tercihine sebep olur, bu da o seçenekten yana daha fazla ağ tercihini beraberinde getirir, ta ki bu tercih geri döndürülemez olana kadar ve o noktada düğümler kararlarını verebilirler.

{% hint style="info" %}
Bu konunun harika bir görselleştirmesi için, Ava Labs'ın Eş Kurucusu Ted Yin'in hazırladığı [bu demoya](https://tedyin.com/archive/snow-bft-demo/#/snow) bir göz atın.{% endhint %}


Örneğimizde pizza ve barbekü arasında ikili bir seçim söz konusu, ama Snowball birçok olası seçeneğin bulunduğu kararlarda konsensüse ulaşacak şekilde uyarlanabilir.

Canlılık ve güvenlilik eşikleri parametrelerle belirlenebilir. Yeterli çoğunluk büyüklüğü, yani α sayısı arttıkça, güvenlilik eşiği artar ve canlılık eşiği azalır. Bunun anlamı, ağ, daha fazla Bizans \(kasıtlı olarak hatalı, kötü niyetli\) düğümünü tolere edebilir ve güvenli kalabilir, yani tüm düğümler en sonunda bir şeyin kabul veya ret edilmesi üzerinde mutabakata varacaklardır, demektir. Canlılık eşiği, protokolün artık ilerleme kaydedemeyeceği bir noktaya kadar tolere edilebilen kötü niyetli katılımcıların sayısıdır.

Bu değerler, ki sabit değerlerdir, Avalanche Ağında oldukça küçüktür. Örneklem boyutu, _k_, `20`'dir. Dolayısıyla, bir düğüm başka bir düğüm grubuna fikirlerini sorduğunda, tüm ağda yalnızca `20` düğümü sorgular. Yeterli çoğunluk büyüklüğü, α, `14`'tür. Dolayısıyla, `14` veya daha fazla sayıda düğüm aynı yanıtı verirse, bu yanıt sorgulayan düğümün tercihi olarak benimsenir. Karar eşiği β, `20`'dir. Bir düğüm, peş peşe `20` yeterli çoğunluk \(α çoğunluğu\) yanıtı aldıktan sonra seçenek üzerinde karar verir.

Ağdaki düğüm sayısı olan _n_ arttıkça, Snowball çok rahat ölçeklenebilir. Ağdaki katılımcı sayısı ne olursa olsun, gönderilen konsensüs mesajlarının sayısı aynı kalır, çünkü belli bir sorgulamada, bir düğüm yalnızca `20` düğümü sorgular, ağda binlerce düğüm olsa bile.

## DAG'ler \(**D**irected **A**cyclic **G**raphs\)

Şimdi DAG veya Directed Acyclic Graph \(Yönlü Düz Ağaç\) adı verilen bir veri yapısını tanıyalım. DAG, kararların **kısmi bir sıralamasını** verir. Örnek olarak bu diyagramdaki DAG'a göz atın:

![Temel DAG](../../.gitbook/assets/cons-01-Frame16.png)

**a**, **b**'den önce gelir. **b**, **d**'den önce gelir. **c**, **e**'den önce gelir. Geçişlilik özelliğinden dolayı **a**, **e**'den önce gelir diyebiliriz. Ne var ki bu sadece kısmi bir sıralama olduğu için, bazı ögelerin sıralaması tanımlanmamıştır. Örneğin hem **b** hem **c** **a**'dan sonra gelir; ancak **b**'nin **c**'den önce veya sonra olduğuna dair bir bilgi yoktur.

DAG ile alakalı iki ek konsept, **atalar** ve **alt soylar**'dır. Atalar, DAG'da bir çizgiyi hangi düğümlere kadar götürebiliyorsanız, o düğümlerdir. Örneğin **d**'nin ataları **a**, **b** ve **c**'dir. **e**'nin ataları **a** ve **c**'dir. Alt soylar ataların tam tersidir. **a**'nın alt soyları **b**, **c**, **d** ve **e**'dir. **b**'nin alt soyu **d**'dir.

Örneğin hem Bitcoin hem de Ethereum, her blokun bir ebeveyne ve bir çocuğa sahip olduğu doğrusal bir zincire sahiptir. Avalanche, verileri depolamak için doğrusal bir zincir yerinde bir DAG kullanır. DAG'ın her bir elemanı birden fazla ebeveyne sahip olabilir. DAG'daki ebeveyn-çocuk ilişkisi uygulama düzeyinde bir bağımlı olma durumunu \(dependency\) ima etmez.

Konsensüs protokolünde, işin özü **çatışan işlemlerin** DAG'e dahil edilmelerini önlemektir. Çatışmalar uygulama bazlı tanımlanır. Farklı uygulamalar, iki işlemin çatışmasının ne anlama geldiğine dair farklı nosyonlara sahip olacaktır. Örneğin, bir P2P ödeme sisteminde, aynı UTXO'yu \([Unspent Transaction Output](https://en.wikipedia.org/wiki/Unspent_transaction_output) - Harcanmamış İşlem Çıktısı\) tüketen işlemler çatışacaktır. Avalanche'ta her işlem, çatışan işlemlerin toplandığı bir **çatışma kümesine** dahil olur. Bir çatışma kümesinde yalnızca bir işlem DAG'a dahil edilebilir. Her düğüm çatışma kümesindeki bir işlemi **tercih eder**.

## Çalışma Örneği

Diyelim ki aşağıdaki parametrelerle çalışan bir Avalanche ağımız var. Örneklem boyutu, _k_, `4`'dir. Yeterli çoğunluk büyüklüğü α, `3`'tür. Peş peşe başarı sayısı β, `4` olsun.

![Çalışma örneği 1](../../.gitbook/assets/cons-02-Consensus_Doc_txY.png)

Bir düğüm, yeni bir işlem olan **Y** işleminden haberdar olur. Yukarıdaki parametreler çerçevesinde ağı sorgular. _k_, \(`4`\) sayıda doğrulayıcıyı sorgular ve "Bu işlemi tercih ediyor musun?" diye sorar. Düğüme yanıtlar gelir — üçü **evet** ve biri **hayır** yanıtı vermiştir. Yeterli çoğunluk büyüklüğü α, `3` olduğu için, evet yanıtlarının bir α çoğunluğu \(yeterli çoğunluk\) mevcuttur. Şimdi düğüm DAG'ını günceller.

![Çalışma örneği 2](../../.gitbook/assets/cons-03-Consensus_Doc_txY-6.png)

Bir düğüm bir işlem için bir α çoğunluğu yanıtı alırsa, o zaman o işleme bir **chit** verirsiniz. Bu chit, "Bu işlem için ağı sorguladığımda, bir α çoğunluğu bu işlemi tercih ettiğini söyledi," diyen bir boole değeridir. Örneğimizde **Y** işlemi bir chit alır.

Bir de bir **güven** nosyonu vardır; bu güven, bir verteksin chit'i artı o verteksin alt soylarının chit'lerinin toplamının toplamıdır. Örneğin, **V** işlemi bir chit içerir. Bu işlemin ayrıca üç alt soyu vardır ve bu alt soyların her biri bir chit'e sahiptir, dolayısıyla bu işlemin güveni `3`'den `4`'ye yükselir. Aynı şekilde, **W** ve **X** işlemlerinin her ikisi de bir chit'e sahiptir ve her ikisi de bir alt soya ve bu alt soyların her biri bir chit'e sahiptir, dolayısıyla bu işlemlerin her birinin güveni `2`'dir. **Y** işleminin güveni `1`'dir.

**Peş peşe başarılar** Snowball'dakiyle aynıdır. Peş peşe başarılar, bir işlem veya o işlemin bir alt soyu başarılı olarak kaç kere α çoğunluk sorgu yanıtını aldıysa, o sayıdır. Daha önce, **V** işlemi, kendisi ve iki çocuğu olarak, `3`peş peşe başarıya sahipti ve şimdi **Y** işlemiyle birlikte `4` peş peşe başarıya sahiptir. **W** ve **X** işlemleri için de durum aynıdır.

![Çalışma örneği 3](../../.gitbook/assets/cons-04-Consensus_Doc_txY-2.png)

Bu örnekte kabul eşiği β, `4` olsun. **V** işlemi `4` peş peşe başarıya sahip, dolayısıyla **bu işlem kabul** edilir. Bu düğüm, diğer her dürüst düğümün bu işlemi en sonunda kabul edeceğinden emindir.

![Çalışma örneği 4](../../.gitbook/assets/cons-05-Consensus_Doc_txY-3.png)

Şimdi diyelim ki bu düğüm **Y** işlemi ile çatışan **Y'** işleminden haberdar oldu. Bu düğüm öncekiyle aynı adımları takip eder ve doğrulayıcılar arasından _k_ sayıda \(`4`\) alt örneklem oluşturarak bu doğrulayıcıların **Y'** işlemini tercih edip etmediklerini sorar. Bu durumda, bu doğrulayıcılardan ikisi **Y'** işlemini tercih ettiklerini ve ikisi **Y'** işlemini tercih etmediklerini söyler. Bu kez α çoğunluk yanıtı yoktur ve DAG buna göre güncellenir.

![Çalışma örneği 5](../../.gitbook/assets/cons-06-Consensus_Doc_txY-4.png)

**Y** ve **Y'** işlemleri bir çatışma kümesindedir; bunlardan yalnızca bir tanesi en sonunda kabul edilebilir. **Y'** işlemi bir chit almaz, çünkü bir α çoğunluk yanıtı almamıştır. Bu işlemin güveni `0`'dır, çünkü bir chit'e sahip değildir ve bir chit'e sahip alt soylara sahip değildir. Önceki sorgulama bir α çoğunluk yanıtı alamadığı için `0` ardışık başarısı vardır. **W** işleminin peş peşe başarı sayısı `2`'den `0`'e değişir. Güven düzeyi hala `2`'dir.

Bir düğüme belli bir işlemi tercih edip etmediği sorulduğunda, o işlem kendi çatışma kümesindeki herhangi bir işlemden daha yüksek bir güvene sahipse, o işlem için evet yanıtını verir. Bu örnekte **Y** işleminin  güveni `1` ve **Y'** işleminin güveni `0` olur, yani bu düğüm **Y** işlemini **Y'** işlemine tercih eder.

![Çalışma örneği 6 ](../../.gitbook/assets/cons-07-Consensus_Doc_txY-1.png)

Şimdi bu düğüm yeni bir işlem olan **Z** işleminden haberdar olur ve öncekiyle aynı şeyi yapar. _k_ sayıdaki düğümü sorgular, bir α çoğunluk yanıtı alır ve DAG'ı günceller.

![Çalışma örneği 7](../../.gitbook/assets/cons-08-Consensus_Doc_txY-5.png)

**Z** işlemi bir chit alır. Bu işlem ayrıca `1` güvenine ve `1` peş peşe başarıya sahiptir. İşleyen atalar da güncellenir. Hiçbir işlem `4` peş peşe başarıya sahip değildir, dolayısıyla hiçbir ata kabul edilmez.

## Verteksler

Buraya kadar açıklanan her şey, [Avalanche teknik dokümanında](https://assets-global.website-files.com/5d80307810123f5ffbb34d6e/6009805681b416f34dcae012_Avalanche%20Consensus%20Whitepaper.pdf) anlatıldığı gibidir. Avalanche konsensüs protokolünün Ava Labs tarafından implementasyonu \(yani AvalancheGo\), gecikme süresi ve iş çıkarma yeteneği bakımından bazı optimizasyonlar içermektedir. En önemli optimizasyon, **vertekslerin** kullanımıdır. Bir verteks, doğrusal bir blok zincirdeki bir blok gibidir. Bir verteks ebeveynlerinin hash'lerini içerir ve bir işlemler listesi taşır. Verteksler işlemlerin batch edilmelerine ve tek tek oylanmak yerine gruplar halinde oylanmalarına imkan verir. DAG, vertekslerden oluşur ve protokol yukarıda açıklanana çok benzer şekilde işler.

Bir düğüm bir verteks için bir oy alırsa, bu oylar bir verteksteki tüm işlemler için bir oy olarak sayılır ve oylar yukarı doğru geçişli olarak tatbik edilir. Bir verteks, içerdiği tüm işlemler kabul edildiğinde kabul edilir. Bir verteks reddedilen bir işlem içeriyorsa, bu durumda kendisi de tüm alt soyları da reddedilir. Bir verteks reddedilirse, varsa geçerli olan işlemler, reddedilmiş bir verteksin çocuğu olmayan yeni bir vertekse yeniden gönderilir. Yeni verteksler, tercih edilen vertekslere iliştirilir.

## İşlem Kesinliği \(Finality\)

Avalanche konsensüsü bir güvenlilik eşiğine kadar olasılıksal olarak güvenlidir. Yani, dürüst bir düğümün diğer bir dürüst düğümün reddettiği işlemi kabul etmesi olasılığı, sistem parametreleri ayarlanarak, gerçekleşmesi tesadüfe kalmış kadar düşük yapılabilir. Nakamoto konsensüs protokolünde \(örneğin Bitcoin ve Ethereum'da kullanılan protokol\), bir blok bir zincire dahil edilebilir ama sonra çıkarılabilir ve kanonik zincirde kendine yer bulamayabilir. Bunun anlamı, işlemin sonuçlandırılması için bir saat beklemek, demektir. Avalanche'ta kabul/ret **kesindir ve geri döndürülemez** ve birkaç saniyede gerçekleşir.

## Optimizasyonlar

Düğümlerin doğrulayıcıları sorgularken sadece "Bu verteksi tercih ediyor musun?" diye sormaları verimli bir uygulama değildir. Ava Labs'ın implementasyonunda, bir sorgulama sırasında bir düğüm, "Bu vertesin mevcut olduğu varsayılarak, hangi verteksleri tercih edersin?" diye sorar. Bu düğüm evet/hayır şeklinde iki seçenekli bir yanıt almak yerine, diğer düğümün tercih ettiği verteks kümesini alır.

Düğümler sadece yeni bir işlemden haberdar olduklarında sorgulama yapmazlar. İşlenmekte olan hiçbir erdemli verteks kalmayana kadar tekrar tekrar sorgulama yaparlar. Erdemli bir verteks, hiçbir çatışmalı işlem barındırmayan bir vertekstir.

Düğümlerin bir yoklamanın sonucunu kaydetmeden önce _k_ sayısı kadar sorgu yanıtı alana kadar beklemesi gerekmez. Bir işlem bir α çoğunluğu yanıtı alamazsa, bu durumda yanıtların geri kalanını beklemeye gerek yoktur.

## Doğrulayıcılar

Avalanche ağında doğrulayıcı olmak ücretsiz olsaydı, bu bir soruna yol açardı, çünkü kötü niyetli bir oyuncu çok sık sorgulanan sürüyle düğüm başlatabilirdi. Kötü niyetli oyuncu düğümün kötü davranmasını sağlayabilir ve bir güvenlilik veya canlılık arızasına sebep olabilirdi. Konsensüs kapsamında sorgulanan düğümler olan doğrulayıcılar ağ üzerinde nüfuz sahibidirler. Bu doğrulayıcılar, bu nüfuzun bir karşılığı olarak, bu türden bir sandık hilesinin önlenmesi adına, gerçek dünyada geçerli bir bedel ödemek zorundalar. Ağ üzerinde nüfuz satın almak için gerçek dünyada geçerli olan bir bedelin kullanılması fikrine Proof of Stake, yani Pay İspatı denir.

Bir düğüm bir doğrulayıcı olmak için değerli bir şeyi \(**AVAX**\) **teminat** \(stake\) olarak yatırmalıdır. Bir düğüm ne kadar çok AVAX'ı teminat olarak yatırırsa, o düğüm diğer düğümler tarafından o kadar çok sorgulanır. Bir düğüm ağda örnekleme yaptığında, bu örneklemeyi her zaman rastlantısal olarak yapmaz. Bu örnekleme stake tutarına göre ağırlıklandırılır. Düğümlerin doğrulayıcı olmaları teşvik edilir; çünkü doğrulama yaparlarken yeterince dürüst ve yanıt verebilir iseler bir ödül alırlar.

Avalanche'da kesinti cezası \(slashing\). Bir düğüm doğrulama yaparken düzgün davranmazsa, sözgelimi doğru olmayan yanıtlar verirse ya da hiç yanıt vermezse, stake'i kendisine tam olarak iade edilir ama ödül almaz. Teminat olarak yatırılan AVAX'ların yeterli bir kısmı dürüst düğümlerde tutulduğu sürece ağ güvenlidir ve erdemli işlemler için canlıdır.

## Büyük Fikirler

Avalanche'taki iki büyük fikir, alt örnekleme \(**subsampling**\) ve geçişli oylama \(**transitive voting**\) uygulamalarıdır. Alt örneklemenin düşük bir mesaj masrafı vardır. Yirmi doğrulayıcı veya iki bin doğrulayıcı olup olmamasının bir önemi yoktur; bir düğümün bir sorgulama sırasında gönderdiği konsensüs mesajlarının sayısı sabit kalır.

![Çalışma örneği 8](../../.gitbook/assets/cons-09-Consensus_Doc_txY-7.png)

Bir vertekse verilen bir oyun, o verteksin tüm atalarına verilmiş bir oy sayılması anlamına gelen geçişli oylama uygulaması, yüksek işlem üretkenliğine yardımcı olur. Her bir oy aslında birçok oyun bir arada verildiği bir oydur. Örneğin, yukarıdaki diyagramda, bir düğüm **D** verteksi için bir oy alırsa, bu oy, o verteksin tüm ataları için bir oy anlamına gelir; **D** için verilmiş bir o, **A** , **B** ve **C** için de verilmiş bir oydur.

## Henüz Çözüme Kavuşturulmamış Konular

İşlemler, [AvalancheGo](https://github.com/ava-labs/avalanchego)  tam düğümünde bir API çağıran kullanıcılar tarafından ya da [AvalancheJS](https://github.com/ava-labs/avalanchejs) gibi kitaplıklar kullanan kullanıcılar tarafından yaratılır. Verteksler, düğümler gelen işlemleri bir arada batch ettiklerinde ya da reddedilen bir verteksten gelen kabul edilmiş işlemler yeniden gönderilip DAG'a eklendiklerinde yaratılırlar. Bir verteksin ebeveynleri, DAG'ın ucundaki çatışmasız düğümler olan erdemli cepheden seçilir. Erdemli verteksler inşa etmek önemlidir, çünkü erdemli olmayan verteksler inşa edersek, düğümün reddedilme ihtimali artar, buna bağlı olarak o düğümün atalarının da reddedilmeleri ihtimali artar, dolayısıyla daha az ilerleme kaydetmiş oluruz.

## Diğer Gözlemler

Çatışan işlemlerin canlı olmaları garanti edilmez. Bu aslında bir sorun değildir çünkü işleminizin canlı olmasını istiyorsanız, çatışan bir işlem göndermemeniz gerekir.

Avalanche doğrusal zincirlerde de çalışır. Protokol büyük ölçüde yukarıdakiyle aynıdır ama her verteksin yalnızca bir ebeveyni vardır. Bu, vertekslerin total bir sıralamasını verir. Bu özellik, bir işlemin diğer bir işlemden önce gelip gelmediğini bilmemiz gereken bazı uygulamalarda -örneğin akıllı sözleşmeler- yararlıdır. Snowman, Avalance konsensüs protokolünün doğrusal zincirler için Ava Labs implementasyonunun adıdır.

Karar verilmemiş bir işlem yoksa, Avalanche konsensüs protokolü _sessiz duruma geçer_. Yani yapılacak iş yoksa, hiçbir şey yapmaz. Avalanche, düğümlerin sürekli çalışmak zorunda olduğu Proof-of-work, yani İş İspatı sisteminden daha sürdürülebilirdir.

Avalanche'ta lider yoktur. Herhangi bir düğüm bir işlem teklif edebilir ve AVAX stake'lemiş olan herhangi bir düğüm her işlemler için oy kullanabilir; bu da ağı daha sağlam ve merkeziyetsiz hale getirir.

## Neden Umursuyoruz?

Avalanche genel bir konsensüs motorudur. Üzerinde ne tür bir uygulama çalıştırıldığı önemli değildir. Protokol, uygulama katmanının konsensüs katmanından ayrılmasına imkan verir. Avalanche üzerinde bir Dapp oluşturuyorsanız, çatışmaların nasıl tanımlandığı ve bir işlemin içinde ne olduğu gibi birkaç hususu tanımlamanız gerekir. Düğümlerin mutabakata nasıl vardığı konusunda endişe etmenize gerek yoktur. Konsensüs protokolü, içine bir şey konan ve kabul veya ret edilmiş olarak geri gelen bir kara kutudur.

Avalanche sadece P2P ödeme ağları için değil, her türlü uygulama için de kullanılabilir. Avalanche'ın Birincil Ağı, mevcut Ethereum Dapp'ler ve geliştirici araçları ile geriye dönük uyumlu olan bir Ethereum Sanal Makine instance'ına \(sunucu veya oturum\) sahiptir. Ethereum konsensüs protokolü, daha düşük blok gecikme süresi ve daha yüksek iş çıkarma yeteneği sağlamak için Avalanche konsensüs protokolü ile değiştirilmiştir.

Avalanche çok yüksek performanslıdır. Saniyede binlerce işlemi bir veya iki saniyelik bir kabul gecikme süresiyle işleyebilir.

## Özet

Avalanche konsensüs protokolü dağıtık sistemlerde radikal bir devrimdir. Ondan önce gelen klasik ve Nakamoto konsensüs protokollerinden ileriye doğru büyük bir adımı temsil eder. Artık nasıl çalıştığına dair daha iyi bir fikriniz olduğuna göre, Avalanche üzerinde çığır açan Dapp'ler ve finansal enstrümanlar yaratmak için diğer [dokümanlara](https://docs.avax.network) göz atın.


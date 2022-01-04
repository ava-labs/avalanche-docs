---
description: Avalanche'ta doğrulama veya yetkilendirme yaparak stake etmeyi öğrenin
---

# Staking

Staking, bir ağı desteklemek için ödül karşılığında \(ödüller daha fazla ağ kullanımı, parasal karşılık, vb. olabilir\) token'ları kilitleme işlemidir. Staking kavramı ilk olarak Peercoin'den Sunny King ve Scott Nadal tarafından [resmi olarak ortaya atılmıştır](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf).

## Pay ispatı \(Proof-of-stake\) nasıl çalışır?

Merkeziyetsiz bir ağın, [sybil saldırılarına](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack) direnmek için ağ etkisinin kıt bir kaynaktan ödenmesini gerektirmesi gerekir. Bu, saldıran için ağ üzerinde güvenliği tehlikeye atacak kadar etki elde etmeyi imkansız ölçüde pahalı hale getirir. İş ispatı \(proof-of-work\) sistemlerinde kıt kaynak işletim gücüdür. Avalanche'ta kıt kaynak yerel token [AVAX](../../#avalanche-avax-token)'tır. Bir düğümün Avalance'ta bir blok zincir [doğrulaması](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) için AVAX stake etmesi gerekir.

## Avalanche'ta Staking Parametreleri

Bir doğrulayıcı [Birincil Ağ](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)'da doğrulamayı tamamladığında stake ettiği AVAX token'ları geri alır. Ağı güvenceye almaya yardımcı olduğu için bir ödül alabilir. Doğrulayıcı sadece doğrulama sırasında yeterince duyarlı ve doğru olması halinde [doğrulama ödülü](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) alır. AVAX ve staking teknik yönleri hakkında daha fazlasını öğrenmek için [Avalanche token teknik dokümanını](https://files.avalabs.org/papers/token.pdf) okuyun.

:::dikkat
Staking ödülleri, bu **parametrelerin hepsi karşılandığı sürece** staking döneminin sonunda cüzdan adresinize gönderilir.
 :::

* Bir doğrulayıcının stake etmesi gereken minimum tutar 2.000 AVAX'tır
* Bir yetkilendiricinin \(delegator\) yetki vermesi gereken minimum tutar 25 AVAX'tır
* Doğrulama için fon stake edilebilecek minimum süre 2 haftadır
* Doğrulama için fon stake edilebilecek maksimum süre 1 yıldır
* Yetkilendirme için fon stake edilebilecek minimum süre 2 haftadır
* Yetkilendirme için fon stake edilebilecek maksimum süre 1 yıldır
* Minimum yetkilendirme ücreti %2'dir
* Doğrulayıcının maksimum ağırlığı \(kendi stake miktarı \+ onlara yetkisi verilen stake miktarı\), 3e6 AVAX ve doğrulayıcının stake ettiği tutarın 5 katı arasından küçük olana eşittir. Örneğin, doğrulayıcı olmak için 2000 AVAX stake ettiyseniz toplam düğümünüze \(yetkilendiciri başına değil\) sadece 8000 AVAX yetkilendirilebilir

Bir doğrulayıcı, çevrimiçi olarak ve bir doğrulama döneminin% 80'inden fazlası için yanıt olarak işlem gören bir staking ödülü alır, bu da staking bedeli olarak ağırlıklandırılır. **Doğrulayıcınızın çevrimiçi ve zamanın %100'ünü duyarlı olmasını hedeflemelisiniz.**

`info.uptime`Düğümünüzde API metodu  olarak çağırabilirsiniz, böylece ağırlıklandırılmış çalışma süresini ve ağın şu anda düğümünüzün bir staking ödülü ortaya çıkacak kadar yüksek bir çalışma zamanı olduğunu düşündüğünü. [Buraya](../../build/avalanchego-apis/info-api.md#info-uptime) göz atın. Düğümünüzün çalışma süresi hakkında Avalanche'ın [staking gösterge panelinden](https://stats.avax.network/dashboard/staking/) başka bir görüş alabilirsiniz. Rapor ettiğiniz çalışma süreniz %100'e yakın değilse, bu da staking ödülünüzü tehlikeye atabilecek olan düğüm kurulumunuzda yanlış bir şey olabilir. Durum buysa, lütfen [buraya](#why-is-my-uptime-low) bakın veya [Discord](https://chat.avax.network) üzerinden bizimle iletişime geçin, böylece sorunu bulmanıza yardımcı olabiliriz. Sadece doğrulayıcınızın çalışma süresini staking dışı düğümlerle ölçtük, küçük non-staking doğrulayıcılar veya doğrulama döneminizin tam olarak çevrimiçi olmayan doğrulayıcılar olarak ölçülen çalışma süresini kontrol etmenin düğümünüzün gerçek çalışma süresinin hatalı bir görünümünü sağlayabileceğini aklınızda bulundurun.

## Doğrulayıcılar

**Doğrulayıcılar** Avalanche'ı güvenceye alır, yeni bloklar/verteksler \(kesişim noktaları veya düğümler\) oluşturur ve işlemleri gerçekleştirirler. Konsesüs sağlamak için doğrulayıcılar tekrar tekrar birbirini örnekler. Belirli bir doğrulayıcının örneklenme olasılığı stake ettiği tutarla orantılıdır.

Doğrulayıcı kümesine bir düğüm eklerseniz şunları belirtirsiniz:

* Düğümünüzün kimliği
* Doğrulamayı ne zaman başlatmak ve durdurmak istediğiniz
* Kaç AVAX stake ettiğiniz
* Ödüllerin gönderileceği adres
* Yetkilendirme ücreti oranınız \(aşağıya bakınız\)

:::bilgi Bir doğrulayıcının stake etmesi gereken minimum tutar 2.000 AVAX'tır. :::

:::tehlike Bir doğrulayıcı olarak bir düğüm eklemek için işlem yayınladığınızda, parametreleri değiştirmenin hiçbir yolunun olmadığını aklınızda bulundurun. **Stake'inizi erken kaldırmak veya stake miktarını, düğüm kimliğini veya ödül adresini değiştirmek mümkün olmayacaktır.** Aşağıdaki API çağrılarında doğru değerleri kullandığınızdan emin olun. Emin değilseniz [Discord](https://chat.avax.network) üzerinden yardım isteyin veya [Geliştirici SSS](http://support.avalabs.org/en/collections/2618154-developer-faq)'lerimizde gezinin. Kendi doğrulayıcınıza daha fazla token eklemek isterseniz token'ları bu düğüme yetkilendirebilirsiniz ancak taban doğrulama miktarını artıramazsınız \(dolayısıyla kendinize yetkilendirmek yetkilendirme sınırına karşı gelir\). :::

### Bir Doğrulayıcı Çalıştırma {#running-a-validator}

Bir doğrulayıcı çalıştırıyorsanız, ödül almanızı sağlamak için düğümünüzün iyi bağlı olması önemlidir. [Buraya](http://support.avalabs.org/en/articles/4594192-networking-setup) göz atın.

Bir doğrulayıcı eklemek için işlem çıkardığınızda, stake edilen token'lar ve işlem ücreti kontrol ettiğiniz adreslerden kesilir. Doğrulamayı bitirdiğiniz zaman, stake edilen fonlar geldikleri adrese geri dönerler. Ödül kazandıysanız, ödülünüz kendinizi doğrulayıcı olarak eklediğiniz zaman belirttiğiniz adrese gönderilir.

#### API çağrılarına izin verin {#allow-api-calls}

Uzak makinelerden düğümünüze API çağrıları yapmak için API portunda trafiğe izin verin \(varsayılan olarak\) `9650` ve düğümünüzü `--http-host=` argümanıyla çalıştırın

Kullanmayacağınız tüm API'leri komut satırı argümanlarıyla devre dışı bırakmalısınız. Ağınızı sadece güvenilir makinelerden \(ör. kişisel bilgisayarınız\) API portuna erişime izin verecek şekilde yapılandırmalısınız.

#### Çalışma zamanım neden düşük? {#why-is-my-uptime-low}

Avalanche'taki her doğrulayıcı diğer doğrulayıcıların çalışma zamanını takip eder. Her doğrulayıcının bir ağırlığı vardır \(yani. üzerinde stake edilen tutar\). Bir doğrulayıcının ne kadar ağırlığa sahip olursa, doğrulayıcılar düğümünüzün bir staking ödülü alıp almaması için oy kullandıklarında o kadar fazla etkiye sahip olurlar. `info.uptime`Düğümünüzde API metodu  olarak çağırabilirsiniz, böylece ağırlıklandırılmış çalışma süresini ve ağ stake'inizin şu anda düğümünüzün bir staking ödülü alacak kadar yüksek bir çalışma zamanı olduğunu düşündüğünü.

You can also see the connections a node has by calling `info.peers`, as well as the uptime of each connection. **Bu sadece bir düğümün bakış açısıdır**. Diğer düğümler sizin düğümünüzün çalışma zamanını farklı algılayabilir. Bir düğümün çalışma zamanınızı düşük algılaması staking ödülü almayacağınız anlamına gelmez.

`--public-ip=[NODE'S PUBLIC IP]`Düğümünüzün çalışma süresi düşükse, config seçeneği  ve düğümünüzün 9651 portunda gelen TCP trafiği alabildiğinden emin olun.

#### Sır Yönetimi {#secret-management}

Doğrulama düğümünüzde ihtiyacınız olan tek sır, düğümünüzün kimliğini belirleyen TLS anahtarı olan Staking Anahtarıdır. Bir düğüm başlattığınız ilk anda Staking Anahtarı oluşturulur ve `$HOME/.avalanchego/staking/staker.key` içine konur. Bu dosyayı \(ve\) `staker.crt` güvenli bir yere yedeklemeniz gerekir. Staking Anahtarınızı kaybetmeniz halinde düğümünüz yeni bir kimliğe sahip olacağı için doğrulama ödülünüz tehlikeye girebilir.

Doğrulama düğümünüzde AVAX fonları bulunması gerekmez. Aslında, düğümünüzde çok fazla fon bulunmaması en iyi **uygulamadır**. Fonlarınızın neredeyse tamamı, özel anahtarı herhangi bir bilgisayarda bulunmayan "soğuk" adreslerde olmalıdır.

#### İzleme {#monitoring}

Düğümünüzün uptime'ını \(faal olduğu süre\), genel sağlığını vb. nasıl takip edeceğinizi öğrenmek için bu [eğitim makalesini](../../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md) takip edin.

#### Fuji'de Doğrulama

Fuji'de doğrulama sadece `1 AVAX` gerektirir. Böylece doğrulama düğümünüzü kolayca kurabilir ve doğrulama hakkında daha fazlasını öğrenebilirsiniz.

## Yetkilendiriciler

Yetkilendirici, staking'e katılmak isteyen ancak var olan bir düğüme yetkilendirme \(delegation\) yoluyla güvenmeyi seçen bir token sahibidir.

Bir doğrulayıcıya stake delege ettiğinizde şunları belirtirsiniz:

* Yetki verdiğiniz düğümün kimliği
* Stake için yetki vermeyi başlatmak/durdurmak istediğiniz zaman \(doğrulayıcının doğrulama yaptığı dönem içinde olmalıdır\)
* Kaç AVAX stake ettiğiniz
* Ödüllerin gönderileceği adres

:::bilgi Bir yetkilendiricinin yetki vermesi gereken minimum tutar 25 AVAX'tır. :::

:::tehlike Stake ettiğiniz miktarınızı bir yetkilendiriciye eklemek için işlem çıkardığınızda parametreleri değiştirmenin hiçbir yolu olmadığını unutmayın. **Stake'inizi erken kaldırmak veya stake miktarını, düğüm kimliğini veya ödül adresini değiştirmek mümkün olmayacaktır.** Emin değilseniz [Discord](https://chat.avax.network) üzerinden yardım isteyin veya [Geliştirici SSS'lerimizde](http://support.avalabs.org/en/collections/2618154-developer-faq) gezinin. :::

### Yetkilendirici ödülleri {#delegator-rewards}

Token'ları yetkilendirdiğiniz doğrulayıcı yeterince doğru ve duyarlıysa, yetkilendirmeyi tamamladığınızda ödül alırsınız. Yetkilendiriciler, doğrulayıcılarla aynı işleve göre ödüllendirilir. Ancak, yetki verdiğiniz doğrulayıcı ödülünüzün bir kısmını tutar ve bu kısım doğrulayıcının belirttiği yetkilendirme ücreti oranına karşılık gelir.

Token yetkilendirmek için işlem çıkardığınızda, stake edilen token'lar ve işlem ücreti kontrol ettiğiniz adreslerden kesilir. Yetkilendirmeyi tamamladığınız zaman stake edilmiş token'lar adresinize geri döner. Ödül kazandıysanız, token'ları yetkilendirdiğiniz zaman belirttiğiniz adrese gönderilir.

## SSS

### Doğrulayıcının sağlığını kontrol etmeye yönelik araç var mıdır?

Evet, düğüm kimliğinizi [buraya](https://stats.avax.network/dashboard/validator-health-check) girin.

### Bir doğrulayıcının staking ödülü alıp almadığı nasıl belirlenir?

Bir düğüm doğrulayıcı kümesinden ayrıldığında, doğrulayıcılar ayrılan düğümün staking ödülü alıp almaması için oy verir. Bir doğrulayıcı, düğümün gerekenden \(şu anda %80\) uzun süre boyunca online ve duyarlı olduğunu düşünürse düğümün staking ödülü alması için oy verir. Aksi takdirde doğrulayıcı düğümün staking ödülü almaması için oy verir. Stake'e göre ağırlıklandırılan bu oylamanın sonucu düğümün ödül alıp almayacağını belirler.

Her doğrulayıcı sadece "evet" veya "hayır" oyu kullanır. Örneğin düğümün çalışma zamanına dair görüşlerini paylaşıp yanıtların ortalamasını almazlar.

Her doğrulama dönemi ayrı olarak dikkate alınır. Yani, bir düğümün doğrulayıcı kümesine katıldığını ve sonra da ayrıldığını düşünün. Sonra katılıyor ve yeniden ayrılıyor. Düğümün doğrulayıcı kümesindeki ilk dönemindeki çalışma zamanı, doğrulayıcı kümesindeki ikinci döneminde staking ödülü alıp almayacağını etkilemez.


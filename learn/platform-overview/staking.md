---
description: Geçerli ya da delege yaparak on kazık kazığı öğren.
---

# - Takılıyor

Bu nedenle bir ağ için bir ağ desteği için tokens kilitlemek için bir süreç \(karşılığında ödül olarak da artarak ağ yararı, para tazminatı vb.\) İlk [olarak](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) Sunny King ve Scott Nadal tarafından tanıtıldı.

### Kazık kanıtları nasıl çalışıyor?

[Sistem saldırılarına](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack) karşı koymak için, decentralized bir ağ nüfuzunun az kaynak ile ödenmesini gerektirir. Bu durum bir saldırganın ağ üzerinde güvenliğini tehlikeye atacak kadar nüfuz kazanması için inanılmaz derecede pahalı hale getiriyor. Çalışma sistemlerinde az kaynak hesaplama gücüdür. On nadir kaynaklar yerli işaret [is](../../#avalanche-avax-token) on bir blok zincirini [onaylamak](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) için on kazık kazık atması gerekir.

## on Saplanan Parametreler

Bir onaylayıcı [Primary Network](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)'ü onayladığında, AVAX işaretlerini geri alır. Ağı güvenceye almak için bir ödül alabilir. Bir doğrulayıcı sadece doğru ve doğru olan bir şekilde doğru olan [bir doğrulama ödülü](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) alır. AVAX ve gizlenme mekaniği hakkında daha fazla bilgi edinmek için [Avalanche token beyaz aper](https://files.avalabs.org/papers/token.pdf) oku.

{% hint style="warning" %}**Bu parametrelerin hepsi yerine getirildiği sürece bu sürenin sonunda cüzdan adresinize gönderilir.**{% endhint %}

* Bir a kazığı en az 2000 AVAX
* Delege göndermesi gereken en az miktar 25 AVAX
* Onaylama için en az zaman harcama miktarı 2 hafta
* Onaylama için para kazanacak en fazla zaman 1 yıl
* Delegasyon için en az zaman harcama miktarı 2 hafta
* Delegasyon için para kazanacak en fazla zaman 1 yıl
* Asgari heyet ücreti %2'dir.
* Bir validator maksimum ağırlığı, \(kendi kazık \+ kazığı delegeler\) en az 3e6 AVAX ve validator çarptığı miktarın 5 katıdır. Örneğin, onaylayıcı olmak için 2000 AVAX kazık attığınızda, sadece 8000 AVAX sizin your \(delege başına değil\) tayin edilebilir.
* Bir validator bir ödül almak için en az yüzde 60 doğru ve çevrimiçi olması gerekir.

## Validators

**Geçerli kişiler Avalanche, güvence altına **alır, yeni bloklar/köşeler oluşturur ve işlemleri işletir. consensus, elde etmek için, validators sürekli birbirlerinden örnek alırlar. Verilen bir validator sürgülü olma olasılığı kazığa orantılıdır.

Doğrulayıcı setine bir düğüm eklediğinizde belirtiniz:

* Düğününün kimliği
* Başlamak ve onaylamayı bıraktığınızda
* Kaç tane AVAX gözetliyorsun?
* Ödül göndermek için adres
* Delege ücreti oran \(aşağıya bakınız\)

{% hint style="info" %}Bir a kazığı en az 2000 AVAX olması gerekir.{% endhint %}

{% hint style="danger" %}Bir kere bir geçiş kartı eklemek için işlem yapınca parametreleri değiştirmenin yolu olmadığını unutmayın.** your erken kaldıramazsınız, ya da kazık miktarını, düğümünü veya ödül adresi değiştiremezsiniz.** Lütfen aşağıdaki API çağrılarında doğru değerleri kullandığınızdan emin olun. Emin değilseniz, [Discord](https://chat.avax.network) için yardım isteyin veya [Geliştirici FAQs](http://support.avalabs.org/en/collections/2618154-developer-faq). tarayın.{% endhint %}

### Geçerli Bir Geçerli Çalıştırıyor<a id="running-a-validator"></a>

Eğer bir onaylayıcı çalıştırıyorsanız, your iyi bir şekilde bir ödül almanızı sağlamak için bağlanması önemlidir. [Şuraya](http://support.avalabs.org/en/articles/4594192-networking-setup) bak.

Bir doğrulayıcı eklemek için işlem yaparken, kazık işaretleri ve işlem ücreti kontrol ettiğiniz adreslerden düşer. Doğrulamayı bitirdiğinizde, kazık fonlar geldiği adreslere geri verilecek. Ödül kazanmışsanız, kendinizi onaylayıcı olarak eklediğiniz adrese gönderilir.

#### API çağrılarına izin ver<a id="allow-api-calls"></a>

Uzak makinelerden gelen düğümlerinizi aramak için API bağlantı noktasında trafiğe izin verin \(varsayılan `9650`olarak\) ve your tartışarak çalıştırın.`--http-host=`

Komuta satırı argümanları aracılığıyla kullanmayacağınız tüm API'leri devre dışı bırakmalısınız. Ağınızı sadece güvenilir makinelerden API portuna erişebilmeniz için yapılandırmalısınız. \(örneğin, kişisel bilgisayarınız\)

#### Neden benim üstümde düşük bir şey var?<a id="why-is-my-uptime-low"></a>

on her onaylayıcı diğer of güncel bilgilerini takip ediyor. Bir düğümün arayarak sahip olduğu bağlantıları `info.peers`görebilirsiniz, aynı zamanda her bağlantının üst tarihini de görebilirsiniz.** Bu sadece bir düğümün bakış **açısıdır. Diğer düğümler of üst günlerini farklı algılayabilir. Bir düğüm, düşük olduğunu algılar diye bu ödül alamayacağın anlamına gelmez.

Düğününüzün başka bir düğümle bağlantılı olmamasının muhtemel nedeni NAT transversal başarısız olmuş ve düğümünü `--public-ip=[NODE'S PUBLIC IP]`did Gelecekte, düğümünün iyi bağlantılı olduğunu doğrulamak için daha iyi izleme ekleyeceğiz.

#### Gizli Yönetim:<a id="secret-management"></a>

Geçerli your ihtiyacınız olan tek sır düğümünün kimliğini belirleyen Stake Key'i TLS anahtarıdır. İlk düğmeye başladığında, Stake Anahtar yaratılır ve içine `$HOME/.avalanchego/staking/staker.key`koyar. `staker.crt`Bu dosyayı güvenli bir yerde desteklemelisiniz. Stake Anahtar kaybetmek, onaylama ödülünüzü tehlikeye atabilir. Çünkü düğümünüz yeni bir kimlik olacak.

Geçerli on AVAX fonu bulundurmanıza gerek yok. **Aslında, senin düğümünde çok fazla para **olmaması en iyi uygulamadır. Neredeyse tüm fonların "soğuk" adreslerinde olmalı. Özel anahtarı hiçbir bilgisayarda yok.

#### İzliyor<a id="monitoring"></a>

Bu öğretmeni takip et, your güncel durumunu nasıl izleyebileceğinizi öğrenin. Genel sağlığınızı, vb.

{% page-ref page="../../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

## Delegeler

Bir delege bir gösterge sahibidir, ama mevcut geçerli bir düğümle delege aracılığıyla güvenmeyi seçer.

Bir doğrulama doğrulama doğrulama için kazığı When belirtiniz:

* Verdiğin düğümün kimliği.
* Eğer başlatmak istiyorsanız \(doğrulama doğrulama doğrulama sürecini durdurun\)
* Kaç tane AVAX gözetliyorsun?
* Ödül göndermek için adres

{% hint style="info" %}Bir delege için en az 25 AVAX verilmesi gerekiyor.{% endhint %}

{% hint style="danger" %}Bir delege için hissesini eklediğiniz zaman parametreleri değiştirmenin hiçbir yolu olmadığını unutmayın.** your erken kaldıramazsınız, ya da kazık miktarını, düğümünü veya ödül adresi değiştiremezsiniz.** Emin değilseniz, [Discord](https://chat.avax.network) için yardım isteyin veya [Geliştirici FAQs](http://support.avalabs.org/en/collections/2618154-developer-faq). tarayın.{% endhint %}

### Delegator ödülleri<a id="delegator-rewards"></a>

Eğer delegate gönderdiğiniz onaylayıcı yeterince doğru ve tepki verirse, göreviniz bittiğinde bir ödül alacaksınız. Delegeler doğrulayıcılar ile aynı fonksiyona göre ödüllendirilir. Bununla birlikte, delegate heyet ücreti ücreti ile belirtilen ödülünüzün bir kısmını tutmak için görevlendirdiğiniz onaylayıcı onay.

İşaretleri delege etmek için işlem yaparken, kazık işaretleri ve işlem ücreti kontrol ettiğiniz adreslerden düşer. Görevlendirme işini bitirdiğinizde, kazık işaretleri adresinize geri verilecek. Ödül kazanmışsanız, işaretleri gönderdiğiniz adrese gönderilir.


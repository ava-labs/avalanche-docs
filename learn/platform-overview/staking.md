---
description: Avalanche üzerinde validasyon veya delegasyon ile nasıl stake edeceğinizi öğrenin
---

# Staking

Staking veya stake etme, bir network'e destek olmak amacıyla tokenları kilitleme ve bunun karşılığında bir ödül alma sürecidir.\(Örneğin bu ödül, parasal bir karşılık olabilir.\) Staking konseptini, [resmi olarak ilk kez] (https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) Peercoin’den Sunny King ve Scott Nadal sunmuştur.

### Proof-of-stake nasıl çalışır?

Merkezi olmayan bir ağın [Sybil ataklarına](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack) direnmesi için network etkisi karşılığında nadir bir kaynak ile ödeme yapılması gerekir. Bu, ağın güvenliğini tehlikeye atacak bir saldırının nüfuz kazanmasını mümkün olmayacak şekilde masraflı hale getirir. Bu nadir kaynak, proof-of-work sistemlerinde işlem gücüdür. Avalanche’da ise bu nadir kaynak [AVAX native tokenidir](../../#avalanche-avax-token). Bir node’un yani blokzincir düğümünün Avalanche üzerindeki bir blockzincir üzerinde [validasyon sağlaması](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) için AVAX stake etmesi gerekir.

## Avalanche'ın Stake Etme Parametreleri

Bir validatör, [ana network’ü](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network) valide etmeyi bitirdiğinde, stake ettiği AVAX tokenlarını geri alacaktır. \(Ayrıca, ağın güvenliğini sağlamaya yardımcı olduğu için bir ödül alabilir.\) Bir validatör, validasyon süreci boyunca sadece yeterli oranda yanıt verebildiği ve doğru olduğu takdirde bir [validasyon ödülü](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) alır. AVAX ve staking mekanikleri hakkında daha fazla bilgi için lütfen [Avalanche tokenın whitepaper'ını] okuyun.  
{% hint style="warning" %}
**Bu parametreler sağlandığı sürece** staking ödülleri, staking dönemi bittiğinde cüzdan adresinize yollanır.
{% endhint %}

* Bir validatörün stake etmesi gereken minimum miktar: 2,000 AVAX
* Bir delegatörün delege etmesi gereken minimum miktar: 25 AVAX
* Validasyon için minimum stake edilme süresi: 2 hafta
* Validasyon için maksimum stake edilme süresi: 1 yıl
* Delegasyon için minimum stake edilme süresi: 2 hafta
* Delegasyon için maksimum stake edilme süresi: 1 yıl
* Minimum delegasyon ücreti oranı: %2
* Bir validatörün maksimum yükü/ağırlığı\(kendi stake’leri+kendisine delege edilen stake’ler) en az 3e6 AVAX ve validatörün stake’lerinin 5 katıdır. Örneğin, eğer bir validatör olmak için 2,000 AVAX stake ettiyseniz node toplamınıza sadece 8000 AVAX delege edebilir.\(delegatör başına değil\)
* Bir validatörün ödül alması için doğru ve çevrimiçi olması gereken minimum süre %60'tır.

## Validatörler

**Validatörler** Avalanche’ın güvenliğini sağlar, yeni bloklar/verteksler oluşturur ve transferleri gerçekleştirir. Validatörler, konsensüse varmak için birbirlerinden tekrar tekrar örnek alırlar. Belirli bir validatörün örneklenme olasılığı, stake'i ile orantılıdır.

Validatör setine bir node eklediğinizde şunları belirtmiş olursunuz:

* Node'unuzun ID'si\(no'su\)
* Ne zaman delege etmeye başlamak ve delege etmeyi durdurmak istediğiniz
* Kaç adet AVAX stake ettiğiniz
* Ödüllerin gönderileceği adres
* Delegasyon ücreti oranınız\(aşağıya bakın\)

{% hint style="info" %}
Bir validatörün stake etmesi gereken en düşük miktar 2,000 AVAX'dır.
{% endhint %}

{% hint style="danger" %}
Not: Validatör olarak bir node eklemek için ilgili işlemi gerçekleştirdiğinizde, parametreleri değiştirmenin bir yolu olmadığını unutmayın. **Stake ettiğiniz AVAX’ı erken çekemezsiniz. Stake edilen miktarı, node’unuzun kimliğini ve ödül adresinizi değiştiremezsiniz.** Lütfen aşağıda belirtilen API çağrılarında doğru değerleri kullandığınızdan emin olun. Eğer emin değilseniz, [Discord](https://chat.avax.network) üzerinden yardım isteyebilir veya Sıkça Sorunlar Sorular kısmına[Developer FAQs](http://support.avalabs.org/en/collections/2618154-developer-faq) göz gezdirebilirsiniz.
{% endhint %}

### Validasyon ve Node Bağlantısı <a id="running-a-validator"></a>

Eğer validasyon yapıyorsanız, ödülü alacağınızdan emin olmak adına node'unuzun bağlantısının doğru yapılması önemlidir.
Detaylı bilgi için [tıklayın.](http://support.avalabs.org/en/articles/4594192-networking-setup).

Bir validatör eklemek için ilgili işlemi gerçekleştirdiğinizde stake ettiğiniz tokenlar ve işlem ücreti, kontrol ettiğiniz hesaplardan çekilir. Validasyon döneminiz bittiğinde stake edilen fonlar geldikleri adreslere geri döner. Eğer bir ödül kazandıysanız, ödülünüz kendinizi validatör olarak eklerken belirttiğiniz adrese yollanır.

#### API çağrılarına izin verin <a id="allow-api-calls"></a>

Uzaktan bağlantı sağlanılan makinalardan kendi node’unuza API çağrıları yapmak için API portunda\(Varsayılan değeri `9650`\) trafiğe izin verin ve node’unuzu şu argümanla çalıştırın: `--http-host=`

Komut satırı argümanları üzerinden kullanmayacağınız tüm API’leri etkisiz hale getirin. Network’ünüzü, API portlarına yalnızca güvenilir makinelerden erişime izin verecek şekilde yapılandırmalısınız. \(Örneğin kişisel bilgisayarınız\)

#### Çalışma süresi\(uptime\) neden düşük? <a id="why-is-my-uptime-low"></a>

Avalanche üzerindeki her validatör, diğer validatörlerin çalışma süresinin kaydını tutar. Bir node’un bağlantılarını ve her bağlantının çalışma süresini `info.peers`’ı çağırarak görebilirsiniz. **Bu sadece bir node’un bakış açısıdır**. Diğer node’lar sizin node’unuzun çalışma süresini farklı algılayabilir. Sadece bir node’un sizin çalışma sürenizi düşük algılaması staking ödülü kazanamayacağınız anlamına gelmez.

Node’unuzun başka bir node’a bağlı olmamasının olası nedeni, NAT geçişinin başarısız olması ve node’unuzun `--public-ip = [Node’un Public IP’si]` ile başlatmamış olmasıdır. Önümüzdeki zamanlarda node'unuzun doğru bir şekilde bağlandığının doğrulamasını kolaylaştırmak adına daha iyi bir gözlemleme özelliği ekleyeceğiz.

#### Gizlilik <a id="secret-management"></a>

Validasyon sağlayan node’unuzda gizli tutmanız gereken tek şey Staking Key’inizdir.\(Node’unuzun ID’sini belirleyen TLS anahtarı\). Bir node’u ilk kez çalıştırdığınızda Staking anahtarı oluşturulur ve `$HOME/.avalanchego/staking/staker.key` dosyasının içine kaydedilir. Bu dosyayı \(ve `staker.crt`\’ı) güvenli bir yere yedeklemelisiniz. Staking Key’inizi kaybetmeniz halinde node’unuzun yeni bir ID’si olacağından dolayı validasyon ödüllerinizi tehlikeye atabilirsiniz.

Validasyon yaptığınız node’da AVAX bulundurmanız gerekmemektedir. Aslında, node’unuzda çok fazla fon olmaması ve fonlarınızın neredeyse tümünün, private key’ini herhangi bir bilgisayara kaydetmediğiniz soğuk adreslerde saklanması daha doğru ve sağlıklıdır.

#### Gözlemleme <a id="monitoring"></a>

Node'unuzun çalışma süresini, genel sağlık durumu vb. şeyleri nasıl gözlemleyeceğinizi bu tutorial'ı takip ederek öğrenebilirsiniz.

{% page-ref page="../../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

## Delegatörler

Bir delegatör, staking'e katılmak isteyen ancak delegasyon yoluyla mevcut bir validasyon node'una güvenmeyi seçen bir token sahibidir.

Stake'lerinizi bir validatör üzerinden delege etmek istediğinizde, şunları belirtiyorsunuz:

* Delege ettiğiniz node'un ID'si\(no'su\)
* Ne zaman delege etmeye başlamak ve delege etmeyi durdumak istediğiniz \(Bu süreçte validatör hale valide ediyor olmalı\)
* Kaç adet AVAX stake ettiğiniz
* Ödüllerin gönderileceği adres

{% hint style="info" %}
Bir delegatörün stake etmesi gereken en düşük miktar 25 AVAX'dır.
{% endhint %}

{% hint style="danger" %}
Not: Stake’inizi bir delegatöre eklemek için işlemi gerçekleştirdiğinizde, parametreleri değiştirmenin bir yolu olmadığını unutmayın. **Stake ettiğiniz AVAX'ı erken çekemezsiniz. Stake edilen miktarı, node’unuzun kimliğini ve ödül adresinizi değiştiremezsiniz.** Eğer emin değilseniz [Discord](https://chat.avax.network) üzerinden yardım isteyebilir veya Sıkça Sorulan Sorular kısmına [Developer FAQs](http://support.avalabs.org/en/collections/2618154-developer-faq) göz gezdirebilirsiniz.
{% endhint %}

### Delegatör ödülleri <a id="delegator-rewards"></a>

Eğer tokenlarınızı delege eden validatör, yeterli oranda yanıt verebilir ve doğru olursa, delegasyon döneminiz bittiğinde ödül kazanmış olursunuz. Delegatörler ile validatörler aynı şekilde ödül kazanmaktadırlar. Fakat delege ettiğiniz validatör, ödülünüzden belirttiği delegasyon ücretine göre bir kesinti yapar ve bu kesinti kendisine ait olur.

Tokenlarınızı delege etmek için ilgili işlemi gerçekleştirdiğinizde stake ettiğiniz tokenlar ve işlem ücreti, kontrol ettiğiniz hesaplardan çekilir. Delegasyon döneminiz bittiğinde stake edilen fonlar geldikleri adreslere geri döner. Eğer bir ödül kazandıysanız, ödülünüz tokenlarınızı delege ederken belirttiğiniz adrese yollanır.
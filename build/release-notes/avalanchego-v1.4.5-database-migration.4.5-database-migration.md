# AvalancheGo v1.4.5: Veritabanı Göçmenliği

Bu makale, your AvalancheGo < v1.4.5 ile AvalancheGo >= v1.4.5 arasında değiştirirken uygulanabilir. Bu makale v1.4.5 için yazılmış olsa da aşağıdaki sürümle ilgili referanslar olsa da, AvalancheGo v1.4.4.4'ten AvalancheGo v1.6, v1.4.7, v1.7. vb.. Bu belgeyi okuduğunda, güncellediğiniz sürüm ile v1.4.5 yerine değiştirin \(veritabanı alt dizinine referans olarak verilmesi dışında, değişmeyecek\).

## Özetle

* [AvalancheGo v1.4.5](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) önemli veritabanı optimizasyonlarını getiriyor.
* Bu geçici olarak AvalancheGo, kullandığı disk uzayının miktarını iki katına çıkaracak ve hafıza ve CPU'nun kullanımı geçici olarak artacaktır.
* Lütfen bu belgeyi okuyun. Göç sırasında your başarılı bir şekilde göç ettiğinden ve sağlıklı kaldığından emin olun. Soruna cevap vermezse, [Discord](https://chat.avalabs.org/) servisimize git, işaretlenmiş mesajları okuyup sorunuzu arayın. Hala yardıma ihtiyacınız varsa, lütfen sorun çıkaran kanalda bulunun.

## Geçmiş

[AvalancheGo, V1.4.5 V1.5'lik](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) V1.4.5 release serbest bırakılmasını duyurmak için heyecanlıyız. Bu da AvalancheGo, önemli veritabanı optimizasyonları ve istikrar iyileştirmeleri getiriyor.

Testlerde, bir Mainnet validator, %90 oranında bir azalma gözlemledik. Aşağıdaki grafikte gösterdiği gibi:

![](../../.gitbook/assets/0%20%281%29%20%282%29%20%283%29.png)

Bu gelişmeler in devlet yönetiminin kapsamlı bir şekilde yeniden etkenine ve diğer veritabanı optimizasyonlarına bağlıdır.

>=v1.4.5 düğümlerinin daha az CPU tüketeceğini ve göç tamamlandıktan sonra daha az disk okumasını gerçekleştireceğini tahmin ediyoruz. Bu değişiklikler ayrıca P-Chain karar gecikmesini önemli ölçüde artıracaktır.

Bu yükseltme ayrıca kaydırma için gereken zaman miktarını önemli ölçüde kısaltıyor.

## Güncelleme Süreci

Bilgisayarınızda var olan bir veritabanı varsa AvalancheGo v1.4.5 çalıştırdığınızda aslında 2 düğümle başlar. Bir tanesi "eski" veritabanı sürümü \(v1.0.0\) kullanan v1.4.4 çalıştırılacak. Diğer araç ise "yeni" veritabanı biçimini kullanan v1.4.5 çalıştırıyor olacak \(v1.4.5 herhangi bir AvalancheGo <=1.4.5 için aynı kalacak\).

V1.4.4 düğüm, normal olarak çalışacak ve önceki günlüklerini göreceksiniz. Düğün, önceki düğümle aynı düğümle kimlik kullanarak ağa bağlanır ve eğer bir doğrulayıcı ise, önceki gibi uzlaşma içinde katılır. Kısacası, v1.4.4 çalıştırıldığında işler aynı görünmeli.

V1.4.5 düğüm, arka planda çalışır ve aynı bilgisayarda çalışan v1.4.4 düğümünden kayışlar yapacak. Bu daha hızlı ve daha az bant genişliği kullanır ve bu da veri gönderilmesi gereken normal çizme işleminden daha az kullanmaktadır. Bu işlem sırasında V1.4.5 düğüm, "yeni" veritabanını nüfusa sokacak.

V1.4.5 düğümü, bootstrapping yapıldığında v1.4.4 düğüm, duracak ve v1.4.5 düğümü yeniden başlayacak. V1.4.5 düğümü yeniden başlayınca, normal olarak çalışır ve "yeni" veritabanını kullanarak ve göçü tamamlar. Düğününüz önceki düğümle aynı kimliğe sahip olacak.

Bayrağı sen `--plugin-dir`vermemelisin. AvalancheGo, kurmak için kurucu betiği kullanmışsanız, bu bayrağı AvalancheGo servis dosyanızdan silmeniz gerekir. Şu [nota](avalanchego-v1.4.5-database-migration.md#note-for-the-nodes-installed-with-installer-script) bak.

## Kaynak Kullanımı

Göç sırasında, iki düğümler de çalıştığında AvalancheGo her zamankinden daha fazla sistem kaynaklarını tüketecek.

Göç işlemi tamamlandığında bilgisayarınızda iki tane baglı veri tabanı olacak. Bilgisayarınızdaki serbest disk boşluğunun tam bağlı bir veritabanının büyüklüğünün \(~38 GB\) olduğundan emin olun. Bilgisayarınızda en az 200 GB disk alanı to adamanızı öneriyoruz. AvalancheGo şu anda bu miktarın sadece bir kısmını kullanırken biz disk kullanımını öngörüyoruz, bir çözeltme uygulamadan önce önce disk kullanımını artıracağız.

Hafıza ve CPU kullanımı da aynı zamanda iki düğümler çalışırken, yükseltilecektir. AvalancheGo için mevcut CPU >= 2GHz ve >= 6 GB RAM'ın herhangi bir sorun olmayacağını tahmin ediyoruz. Bu da şöyle dedi: İlk birkaç gün boyunca your yakından izlemeniz gerekiyor.

Bilgisayarınızın yeterli disk alanı olup olmadığını kontrol etmek için [FAQ](https://app.gitbook.com/@avalanche/s/avalanche/build/release-notes/avalanchego-v1.4.5-database-migration#faq) ve eğer bilgisayarınızın önerilen özelliklerden daha düşük özelliklere sahipse ne yapılacağını kontrol edin.

## Adım Adım Yükseltme Talimatları

* **Bu talimatları uygulayarak düğümünüz zaman kaybetmeyecek.**
* **Veritabanı, artı anahtar veri ve validator's güncel zamanları, otomatik olarak göç edilir.**

### Gereklilikleri Doğrulayın.

Bilgisayarınızın şu şartları yerine getirdiğini doğrulayın:

* CPU > 2GHz
* RAM > 6 GB
* _`$HOME/.avalanchego/db/mainnet/v1.0.0`_Sabit disk: Şu anda 38GB civarında olan disk alanının en az 1,3 katı olmalı. Bu da yaklaşık 50 GB boş alana sahip olmanız gerektiği anlamına geliyor. Aksi takdirde, program veritabanını not Bilgisayarınızda en az 200 GB disk alanı to adamanızı öneriyoruz. Ne kadar boşluğunuz olduğunu kontrol etmek için şu [anda ne kadar disk alanı mevcut](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#how-much-disk-space-is-available-right-now) olduğunu görmek için.
* Tedavi için, takip edin
   * [Bilgisayarım yeterince disk alanı yoksa ne yapmalıyım?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-should-i-do-if-my-computer-doesnt-have-enough-disk-space)
   * [Ya bilgisayarım aynı anda iki düğümlü çalıştıramazsa?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-if-my-computer-cant-run-2-nodes-at-once)

### Yedek Veriler

[Bu](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) uygulamayı takip ederek your verilerini destekleyin.

**Gizli anahtar sertifikanız veritabanında yok, ve veritabanı göçünden **etkilenmemelidir. Öyle olsa bile, anahtar sertifikanızın [yedek bir desteğini almak](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) iyi bir uygulamadır.

### Yeni Sürümü İndir

**Yeni sürüm uygulamalarınıza bağlı olarak aşağıdaki yaklaşımlardan **biriyle indirilebilir:

* [Yazıtlarla](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#node-upgrade) Çalış_`./avalanchego-installer.sh`_
* İkili indirme ile, [buraya](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#binary) bak.
* Kaynak kodundan inşa [ile](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#source-code) buraya bak.

### Yeni Sürümü çalıştır

Yeni sürümü başlatmak için

* AvalancheGo bir hizmet olarak çalıştırırsanız, ki bu da bizim önerdiğimiz bir şey dosyada _`--plugin-dir`_bayrağın bulunmadığını _`avalanchego.service`_doğrulayın. Eğer mevcut değilse, aşağıdaki paragrafı atlayabilirsiniz. Eğer varsa, aşağıdaki talimatları uygulayın.

   Konsolda komutu girin:_`sudo nano /etc/systemd/system/avalanchego.service`_   _`ExecStart=`_Düzenlemede başlanan ve üzerinde şu kısmı silecek olan satırı belirleyin: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_sonra ctrl-x ve y'ye basarak değişiklikleri kaydet.

   Değişiklikleri uygulamak için, komutu çalıştır:  _`sudo systemctl daemon-reload`_   Sonunda düğümü şöyle yeniden başlat:  _`sudo systemctl restart avalanchego`_

* İkili indirme veya kaynak kodundan bina ile buraya [bakın](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#start-a-node-and-connect-to-avalanche).

### İlerleme İzle

İzle ve göçün başarılı bir şekilde tamamlandığından emin ol:

İlerlemeyi aşağıdaki şekilde kontrol edebilirsiniz:

* Komutu kullanarak disk uzay kullanımını kontrol et

   _`du -h $HOME/.avalanchego/db/mainnet`_

   Bu da sırasıyla V1.0.0 ve v1.4.5 altındaki iki veritabanının boyutunu gösteren sonuçlar doğuracaktır.

* Yeni veritabanının the için kütükler altında bulunabilir_`$HOME/.avalanchego/logs/fetch-only`_
* Bu mesajlar veritabanı göçünün tamamlandığını gösteriyor:
   * _`"starting latest node version in normal execution mode"`_**Yazıldığında, yeni **veritabanı yüklenmiş ve düğüm yeniden başladı.
   * _`"finished migrating keystore from database version v1.0.0 to v1.4.5"`_Yazıldığında, **anahtar **verileri göç etmeyi bitirir.
   * _`"finished migrating platform vm from database version v1.0.0 to v1.4.5"`_Yazıldığında onaylayıcı **zaman göçü **tamamlanır.

Bilgisayarınıza göre güncelleme işlemi önemli bir zaman alabilir. Bazı doğrulayıcılar daha az güçlü bilgisayarlarla 30 saat rapor ettiler. Bu temel olarak bilgisayardaki depolama türüne bağlıdır. Eğer depolama SSD tabanlı ise 12 saat içinde tamamlanmış olur. HDD tabanlı sistemlerde birkaç gün sürebilir \(göç neredeyse sadece rastgele okunur ve HDD'ler bu tip iş yüklerinde oldukça yavaş\). Ancak düğümünüz göçler sırasında boş zaman olmadan çalışmaya devam edecek.

Bu sürümün kısaltması için `info.getNodeVersion`API [\(Postman](https://docs.avax.network/build/tools/postman-avalanche-collection) üzerinde özel ders vererek\) yayınlayarak düğümünün sürümünü doğrulayabilir ve bu tepkiyi aşağıdaki şekilde alabilirsiniz, sürüm numarasının göçün tamamlanmasından sonra güncellenecek olan sürüm sayısı >=1.4.7 olarak alabilirsiniz.

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/1.4.7"
    },
    "id": 1
}
```

Bir düğümü güncellemeyle ilgili daha fazla bilgi [burada](https://docs.avax.network/build/tutorials/nodes-and-staking/upgrade-your-avalanchego-node) bulunabilir.

## FAQ

### Neden benim my hala v1.4.4 olduğunu söylüyor?

Göç sırasında bilgisayarınızda 4.4 düğüm, yukarıda açıklandığı gibi. Ağdaki diğer düğümler göçün tamamlanana kadar v1.4.4 çalıştırılacaktır.

### Veritabanı göçmenlik zorunluluğu mu?

- Evet, evet. AvalancheGo < v1.4.5 numaralı düğümler artık çalışmıyor.

### AvalancheGo 1.4.4 v1.4.4 dışında bir sürümden 1.4.5 ile yükseltebilir miyim?

Evet, herhangi bir versiyonu < 1.4.5 ile çalışmalı.

### Ya bilgisayarım aynı anda iki düğümlü çalıştıramazsa?

Bilgisayarınız \(bilgisayar 1\) 6 GB RAM'dan az bir RAM'a sahipse göçü çalıştıramaz çünkü aynı anda 2 düğümlü bir bellek çalıştırmak için yeterli belleği yoktur. Hatırlatmak için your en az 6 GB RAM'ı olduğunu öneriyoruz.

Göç işlemlerini you ve your çevrimdışı olduğu zamanı en aza indirmek istiyorsanız şu şekilde devam edebilirsiniz:

* Başka bir bilgisayarda \(bilgisayar 2\), AvalancheGo v1.4.5 çalıştır, until kadar bekle, sonra AvalancheGo durdur.
* Bilgisayarda 1, durdurun. _`$HOME/.avalanchego/db/`_Veri tabanı dizini \(daha yeni yüklenmiş veritabanı sürümü v1.4.5\) bilgisayardaki aynı konuma taşıyın. Sonra AvalancheGo v1.4.5 ile çalıştırın ve çalıştırın.

****Bunun tavsiye edilen yaklaşım olmadığını ve bunu sadece your 6 GB RAM veya yetersiz disk alanı varsa yapmalısınız. Tekrar söylüyorum, your en az 6 GB RAM ve en az 200 GB disk alanı olduğunu öneriyoruz. Bu yaklaşımın anahtar mağazası veya doğrulama zamanlaması verileri taşımadığına dikkat edin.

### Ne kadar disk alanına ihtiyacım var?

Bilgisayarınızda en az 200 GB disk alanı to adamanızı öneriyoruz. AvalancheGo şu anda bu miktarın sadece bir kısmını kullanırken \(~38 GB\) bir çözeltisi uygulamadan önce disk kullanımını artıracağını öngörüyoruz.

### Şu anda ne kadar disk alanı mevcut?

Mac OS veya Linux üzerindeki veritabanı dizininizdeki mevcut disk alanı miktarını görmek için, şöyle

_`df -h $HOME/.avalanchego/db`_

Örneğin, bu çıkıntı, 609 GB disk alanı mevcut olduğunu söylüyor:

_`Filesystem Size Used Avail Use% Mounted on`_

_`/dev/nvme0n1p2 916G 261G 609G 30% /`_

### Yeni veritabanının açılması ne kadar sürer?

Yaklaşık 30 saat sürebilir. Ancak, bilgisayarınıza bağlı olarak biraz daha fazla zaman alabilir.

### Veritabanı göçünün tamamlandığını nereden bileceğim?

_`"starting to run node in normal execution mode"`_Yazıldığında, yeni veritabanı yüklenmiş ve düğüm yeniden başladı.

_`"finished migrating keystore from database version v1.0.0 to v1.4.5"`_Yazıldığında, anahtar verileri göç etmeyi bitirir.

_`"finished migrating platformvm from database version v1.0.0 to v1.4.5"`_Yazıldığında onaylayıcı zaman göçü tamamlanır.

### Eski veritabanını silebilir miyim?

Yeni veritabanı sürümü bagaja bağlandıktan sonra, v1.4.5 nod yeniden başlatılır ve veritabanı göçünü tamamlar. Bu olduktan sonra, eski veritabanı dizini silebilirsiniz.

_`$HOME/.avalanchego/db/mainnet/v1.0.0`_

Eski veritabanını silmek için gerekli değildir. \(v1.0.0\).

### Bu göç eski veritabanında bir şey değiştirecek mi?

- Hayır, hayır. \*\* Eski veritabanı \(v1.0.0\) değişmeyecek.

**Ancak, düğüm çalışırken veritabanını asla değiştirmemelisiniz.**

Açık olmak gerekirse, yeni veritabanı çizme bootstraps: sonra eski veritabanını silmek istiyorsanız:

* V1.4.5 çalıştır Yeni veritabanı kayışları ve düğüm yeniden başlayana kadar.
* Düğümü durdur
* V1.0.0 veritabanının alt dizini silin \(ve sadece bu alt dizin\)
* Düğümü başlat

**Ayrıca anahtar verilerinizin eski veritabanını silmeden önce başarıyla göç edildiğini doğrulamanız gerekir.**

### Geçerli ve anahtar verileri taşınacak mı?

Evet, ama önlem olarak AvalancheGo v1.4.5 çalıştırmadan önce anahtar sertifikanızı ve anahtarlık verinizi [desteklemelisiniz.](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore)

### Arka plandaki v1.4.5 düğümünün kayıtlarını nasıl görebilirim?

Varsayılan olarak, bu kütükler _`$HOME/.avalanchego/logs/fetch-only`_var.

### Bilgisayarım yeterince disk alanı yoksa ne yapmalıyım?

Eğer düğümünüz bulutta çalışmıyorsa, [düğümünün verilerini geri](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) çekmelisiniz, daha fazla disk alanı olan bir makineye taşıyın ve o makineye AvalancheGo çalıştırın.

Eğer düğümünüz bulutta çalışırsa, bulut sağlayıcınızdan mevcut disk alanının miktarını artırmak için talimatlar alın. Belgelerine bak.

### Bir şeyler ters giderse önceki versiyonuna nasıl dönebilirim?

[Şuraya](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#using-a-previous-version) bak. Bu göç, mevcut veritabanındaki hiçbir veriyi değiştirmez. Yeni veritabanı onun yanında oluşturulur. Eğer AvalancheGo v1.4.5 ile v1.4.4 arasında bir sorun ile karşılaşırsanız mevcut veritabanı değişmediği için küçültme sorununuz olmamalı. \(Bu da mevcut veritabanını you varsayar.\)

### Güncelleme my zamanı azalacak mı?

Bu belgedeki talimatları takip ederseniz, hayır. Yeni veritabanı botu kayışları arka planda yürürken düğümünüz uzlaşma içinde kalmaya devam edecek. Eğer onayını boş bir veritabanından yeniden başlatırsanız, çizme kayışları sırasında çevrimdışı olarak işaretlenecektir, çünkü sorgulara tepki vermeyecek olur. Bu yüzden, eğer if boş bir veritabanından yeniden çizme yapamazsınız.

### Sıfırdan yeniden çizmeli miyim?

Muhtemelen hayır. Eğer düğümünüz bir If bu durum daha fazla düşmesine neden olur. \(Yukarıdaki cevaplara bakınız\). Eğer düğümünüz bir doğrulayıcı değilse ama zaten yüklenmiş durumda, veritabanınızı boş bir veritabanından yeniden çizme kayışından geçirmekten daha hızlı olacaktır. Her iki durumda da, mevcut V1.0.0 veritabanını silmektense yukarıda açıklandığı gibi göçü yürütmekten daha iyi olur.

### **Göç ve bot kayışları sırasında düğümüm kapandı. Ne yapacağım?**

Düğümünü yeniden başlat. Göç kaldığı yerden devam edecek. AvalancheGo bir hizmet olarak çalıştırmanızı şiddetle tavsiye ediyoruz. Böylece kapatıldıktan sonra otomatik olarak yeniden başlatacak.

### Sanırım bir sorun var. Ne yapacağım?

İlk olarak, bu belgeyi iyice okuduğunuzdan emin ****olun. Sorunu bir yerde cevaplayabilir. Cevabı göremiyorsanız, [Discord](https://chat.avalabs.org/) sunucumuza gidin ve sorunuzu arayın. Eğer sorulmadıysa, #sorun çıkaran kanalına yazın.

### Ortelius, kullanırım, nasıl geliştirebilirim?

Ortelius, kullanıyorsanız, bunu güncellemek için bu adımları takip edin:

* Eski Ortelius örneğini çalışır tut.
* Yeni bir Ortelius örneğini başka bir bilgisayarda son sürümü çalıştıran bir dosya kur.
* Yeni Ortelius örneğinin bot kayışını bitirdikten sonra yeni örneğe geç.
* Eski Ortelius olayını kapat.

Ortelius konuşlandırılması için talimatlar [https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md](https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md)

Ortelius sürümündeki bir değişiklik ise Ortelius düğümlü indeksini kullanacağıdır. Bu durum istikrarını artırır ve yeniden başlatılsa bile Ortelius eksik işlemleri olmadığını garanti eder.

### Yüklenmiş düğümler için nota

Eğer düğümünüz [installer betiği](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer) ile kurulduysa, 1.4.5'e yükselttikten sonra servis tanımlama dosyasını onarmanız gerekir. Konsolda komutu girin:_`sudo nano /etc/systemd/system/avalanchego.service`_   _`ExecStart=`_Düzenlemede başlanan ve üzerinde şu kısmı silecek olan satırı belirleyin: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_sonra ctrl-x ve y'ye basarak değişiklikleri kaydet.

Değişiklikleri uygulamak için komutu çalıştır:  _`sudo systemctl daemon-reload`_   Sonunda düğümü şöyle yeniden başlat:  _`sudo systemctl restart avalanchego`_


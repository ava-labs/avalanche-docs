# AvalancheGo Notları Yayınlar

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md"

## v1.4.12 [\(GitHub\ Görünümü)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12)

Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş.

**X-Chain**

* `"json"` biçimi argümanı API metodu `to` eklendi ki bu da sorulan işlemin JSON temsilini gönderir.
* Arayüz tipi eklendi

**Bilgi API**

* Bilgi API istemcisine `GetNodeVersion` Ekle

**Prometheus Metrik**

* Sıkıştırma nedeniyle gönderilmemiş baytlar için düzeltilmiş ve yeniden adlandırılmış metrik
* Sıkıştırma nedeniyle alınmamış baytlar için metrik eklendi
* `metrics` paketine yardım yapısı `yapısı` ilave

**Veritaban**

* Güncelle/ eklenen kriterler

**Paylaşılan Hafıza@ info: whatsthis**

* Gelecekteki atom işlem `optimizasyonuna` izin vermek için `Uygulama ile Yeniden` Koy ve `Kaldır.`

## v1.4.11 [\(GitHub\ Görünümünde Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11)

**C-Chain**

Bu sürüm öntanımlı olarak fotoğraf çekimlerini sağlar.

**Yapılandırma Bayrakları**

_- Çıkarıldı_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_Eklendi_

* `network-compression-enabled etkinleştirilmiş`

**Prometheus Metrik**

Birçok Prometheus metriği yeniden adlandırıldı ve birçok histogram 2 ölçü ile değiştirildi. Güncellenmiş Grafana Dashboard için [buraya](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards) bak.

Bu sürüm `ayrıca` kullanıcı/metrik paketlere yardımcı yöntemler ekler.

**RocksDB**

RocksDB artık inşa senaryosunu çalıştırırken varsayılan olarak inşa edilmemektedir ve halka açık şekilde serbest bırakılan ikili içeriğe dahil edilmemiştir. RocksDB ile AvalancheGo inşa etmek için, `roCKSDBALLOWED=1 ihracat` ve sonra `scripts/build.sh`. Bunu kullanmadan önce `yapmalısın. -db-type=rocksdb`

RocksDB veritabanı şimdi bir alt dizin `kayalıklarında` dosyalarını arıyor. Eğer with daha önce görüşürseniz mevcut dosyaları taşımak zorunda kalacaksınız.

**İleti Sıkıştırma**

Düğümler şimdi P2P mesajlarını sıkıştır. Eğer bir peer >= v1.4.11, Put, Push Query, Peer Listesi ve Multiput mesajları ağ üzerinden gönderilmeden önce gzip kullanarak sıkıştırılır. Bu durum AvalancheGo's bant genişliği kullanımını azaltmaktadır.

**Bağlantı Gazı** İçten Bağlantı Yazı Bağlantı Bağlantı Oranı Sınırlandırma ve varsayılan olarak etkinleştirildi.

**Genel Gelişmeler**

* GRPC tarafından bir eklentiye sunulan bir veritabanı üzerinde tekrarlama ve geliştirilmiş performans.
* Linux'ta, AvalancheGo zarafetsiz ölürse C-Chain temizleyin.
* P2P mesaj tanımlarını aktardı ve `ağ` paketinden kaldırın.
* HTTP API sunucusuna VM takma isimlerini ekle
* `1024` `ünitelerle değiştirildi. KiB`, vb.
* İlgili sorguların oluşturulması için çeneleri işleme yoluyla bölünme toleransı geliştirildi.

**Fuji IPleri**

Fuji for çizme iplerini güncellendi.

## v1.4.10 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10)

**Kayısı 2. Aşama 10**

{% ipuçları style="warning" } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. {% endhint }

Yama performans, gazı ve VM iyileştirmeleri içerir:

* Desteklenen mimarilerde `LevelDB` yerine `RocksDB` kullanımına destek eklendi.
* Yeniden yapılandırılmış inbound ağ gazı düğümlü düğümlerin bant genişliği kullanımını kısıtlamak için düğümlü bir temele dayanıyor.
* Yeniden yapılandırılmış dış şebeke gazı ağırlığa kazıkla ayrılmış bytes doğru gidiyor.
* `Sızma etkinleştirilmiş` bayrağın öntanımlı değerini C-chain için `doğru` güncellendi.
* RPC üzerinden özel VM'ler kayıt edilebildi.
* Geçerlilik durumunu bildirmek için güncellenen blok zinciri durumu.
* Beklenen VM yaratılış yoluyla eşleşmek için `TimestampVM` kendi deposuna taşıdı.
* `Grpc` dosyalarını doğru yere yerleştirmek için protobuf kod gen betiği ayarlandı.
* Blok bytes `rpcchainvm#Block.Verify` ile geçerek potansiyel önbellek tahliye doğrulama hatalarını önlemek için doğruladı.

## v1.4.9 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9)

**Kayısı 2. Aşama 9.**

{% ipuçları style="warning" } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. {% endhint }

Yama performans iyileştirmeleri ve izleme iyileştirmeleri içerir:

* C-chain çalıştırmak için destek eklendi. Pruning şu anda öntanımlı olarak devre dışı bırakıldı.
* Yükleme dengesi arkasında bağlantıları kesmek için C-chain web sitesi ping aralığı azaltıldı.
* Kardan Adam Blok arabirimi için zaman damgası eklendi.
* C-chain API max uygulama uygulamasında ayarlanmış hata, web kovanları aracılığıyla yapılan aramalar için ayarlanmış hata.
* http uç noktası için eklenmiş gzip başlık desteği eklendi.
* `info.getNodeVersion` uç noktasına ek sürüm tanımlamaları eklendi.
* Düğüm sürümlerine bağlanma >= 1.4.5.
* Birincil kayıt dizininin altına Daemon kayıtlarını taşıdı.
* Belirleyici örnekleme için destek eklendi.
* Yeni etiketler için GitHub yerleştirme işlemi eklendi.
* Düğümlerin programlama programında daha iyi desteklemek için yapılandırılmış yapılandırma yönetimi ayarlandı.

## v1.4.8 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8)

**Kayısı 2. Aşama 8.**

{% ipuçları style="warning" } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. {% endhint }

Yama performans iyileştirmeleri, izleme iyileştirmeleri ve alt ağ düzeltmeleri içerir:

* AVM'nin ücret tanımını zincirin ana varlığına ödenmesi için uygulamak için değiştirdi. Bu X-Chain's davranışlarını değiştirmez ama diğer AVM'leri kullanabilir kılıyor.
* İncirleri belirli zincirlere ekleme yeteneği eklendi. Bu `CLI` parametresini bozuyor.
* Yeni çıkış bağlantılarının sayısına sınırlandırılmış oran eklendi.
* Bir zincire şeffaf metrik ekleyen bir VM paketi sundu.
* Sürekli düğüm profilleme yapabilme yeteneğini eklendi.
* Ağ katmanında byte tahsis edildi.
* Dedikodu parametrelerini ayarlamak için çeşitli CLI parametreleri eklendi.
* Diskten okunan bir anahtar çifti yerine ephemeral anahtar çifti kullanabilmek için düğümler etkinleştirildi.
* Yanlış bir uyarı.
* Travis'te koşmaktansa Github Eylemlerinde C.'yi test etmek için hareket etti.
* VM arayüzünden özel vakalar kaldırıldı.

**Komut Satırı Argümanları Eklendi:**

* `Profil.`
* `Profile sürekli etkinleştiriliyor`
* `Profile sürekli freq`
* `Profile sürekli maksimum dosyalar`
* `chain-config-dir`
* `bootstrap-multiput-max-containers-received alındı`
* `bootstrap-multiput-max-containers-sent gönderilmiş`
* `boostrap-max-time-get-ancestors ataları`
* `Kabul edilen dedikodu boyutu`
* `Kabul edilen consensus-accepted-frontier-gossip-size boyutu`
* `Metre vms- etkinleştirilmiş`
* `Sızlanarak staking-ephemeral-cert-enabled etkinleştiriliyor`
* `Bağlantı süresi`
* `outbound-connection-throttling-rps`

## v1.4.7 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7)

**Kayısı 2. Aşama 7**

{% ipuçları style="warning" } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. Bu yama performans iyileştirmeleri ve hata düzeltmeleri içerir. {% endhint }

Eğer önceden yüklenmiş düğüm sürümü <= v1.4.4 ise bu düğüm, blokları işlemeyi durdurmuş olabilir. Bu güncelleme düğümleri onaracak ve bir veritabanı göçü gerçekleştirecek. Veritabanı göçü hakkında detaylar için lütfen [V1.4.5 veritabanı göç](avalanchego-v1.4.5-database-migration.md) notlarına bakın. Eğer önceden yüklenmiş düğüm sürümü >=v1.4.5 ise bu düğüm, mevcut veritabanı kullanır ve bir veritabanı göçü gerçekleştirmek zorunda kalmaz.

* Göçmen öncesi `düğümü,` SHraz7TTQ5DX1rREhNZ1bi7PpPP7xoJAwrWNQrLhQcD'yi doğru doğrulamak için ayarlandı.
* `Platformvm.GetBlockchains` içinde düzeltilmiş bir geri dönüş, ana alt ağ blok zincirlerini doğru şekilde geri getirmek.
* Grpc sürümünü v1.37 olarak güncellendi.
* Optimize bir peerlist örnekleme.
* Veritabanı krizleri eklendi.
* Çeşitli tekrarlanan hafıza tahsis edilmesini azalttı.

## v1.4.6 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6)

**Kayısı 2. Aşama 6.**

{% ipuçları style="warning" } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. Bu yama performans iyileştirmeleri ve hata düzeltmeleri içerir. {% endhint }

**Eğer önceden yüklenmiş düğüm sürümü &lt;= v1.4.4 ise bu düğüm, bir veritabanı göçünü gerçekleştirecektir. Veritabanı göçü hakkında detaylar için lütfen v1.4.5 sürümleri notlarını görün.** Eğer önceden yüklenmiş düğüm sürümü v1.4.5 ise bu düğüm, mevcut veritabanı kullanır ve bir veritabanı göçü gerçekleştirmek zorunda değildir.

Şu yamağa:

* Yüksek sürdürülebilir DB yazılarına yol açan P-chain mempool için geçersiz işlem çıkarımı kaldırır.
* Veritabanı dizinindeki veritabanı olmayan dosyaları ve dizinleri görmezden geliniyor. Bu özellikle macOS ile ilgili rapor edilen hataları düzeltmelidir. DS\_Store dosyaları.
* CLI üzerinden belirlenen yapı dir bayrağını ayarladı, preupgrade düğümünün hataya sebep olmadan belirlendi.
* Artık node-manager the desteklenmeyen eklenti dir bayrağı kaldırıldı. Genellikle bayrağı belirtmek doğru davranışa yol açar. Ancak kompleks tesisler için build-dir bayrağı gerekebilir.
* Sadece akraba el sıkışmasını bitiren bağlantılara mesaj gönderme zorunluluğu uygulandı.
* Uzlaşım ve kayma sırasında hafıza tahsilatlarını azalttı.

## v1.4.5 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)

**Kayısı 2. Aşama - Patama 5 - DB Upgrade**

**Bu güncelleme tipik sürüm güncellemesinden daha çok içeriklidir. Daha detaylı talimatlar ve bir FAQ** [**burada**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration) bulunabilir**.**

{% ipuçları style="warning" } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. Bu yama önemli performans iyileştirmeleri ve birçok güncelleme içerir. {% endhint }

**VM Geliştirmeleri:**

* `platformvm`'s devlet yönetimini tamamen yeniden tasarladı.
   * Sürüm `versiondb`s kullanımını kaldırıp değiştirilebilen ve yeniden ayrıştırılmadan okunabilen durum referanslarını geçerek bloklardan geçerek kaldırıldı.
   * Temel bir devlet yöneticisi uyguladı ve bellek yöneticisi alttaki veritabanına yazılar yazıyordu.
   * Uygulanmış CoW doğrulayıcısı bellekte birden fazla doğrulama ayarlarını etkinleştirmek için ayarlar.
   * Kullanılmamış devlet nesnelerine dokunmamak için alt ağ tarafından zincirlenmiş zincirler.
   * Gereksiz iterations karşı geçerli olan `onaylayıcıları` eklenti `addDelegator` ve `Eklenti Validator` işlemlerini kabul ederken kabul eder.
   * Disk ve doğrulayıcı ayarları yönetmeye adanmış anahtar değerli çiftlerin sayısını yükseltti.
* Ödüllerin indekslenmesini desteklemek için `platformvm's` platformvm's eklenen stokla ödül görüntüleri eklendi.
* Testi basitleştirmek için doğrulama ayarlama ayarlandı.
* `Platformuma` blok ve işlem tipi metrikleri eklendi.
* API arama metrikleri `avma` ve `platformvm`. eklendi.
* `avm`'s devlet yönetimi ön `prefixdb`s, kullanmak için güncellendi ve önleme metrikleri kaydetmek ve `platformvm` ile ek kodu paylaşmak için.
* `UTXO` yönetimi ve `avm` ve `platformvm` içinde indekslenmek.
* Yeniden yapılandırılmış adres ayrıştırma ve yönetim uyumlu VM örnekleri arasında tamamen paylaşılmalıdır.
* Ana subnet yeniden yapılandırılmış paylaşılmış anısı VM örnekleri arasında tam olarak paylaşılacaktır.
* Mevcut VM uygulamaları üzerinde dikişsiz önbelleğini desteklemek ve yeni of uygulanmasını kolaylaştırmak için zincir devlet uygulaması eklendi.
* Yeni zincir devlet yöneticisini `into` entegre etti ve bu da çeşitli metrikler de ekliyor.
* Gelecekteki ağ güncellemelerini daha iyi desteklemek için standart VM arayüzüne `yükseltilmiş Byt` ve `configBytes` eklendi.
* `getAtomicTx` ve `getAtomicTxStatus` `evm` API'ye son bulur.
* `Evm` blok üretiminin aynı zamanda konsensus motoruyla gerçekleştirilmesini kolaylaştırır.
* orphaned atomik işlemleri yeniden tanıtmak için bir atom işlem mempool eklendi.
* `Kaynak Zinciri` `getAtomicUTXOs`. ayarlaması için `evm` istemcisinde ayarlanmış hata.
* Yeni zincir devlet yöneticisini blok yönetimini daha iyi optimize etmek için `evre` içine birleştirdi.

**Çizme Kayışı Geliştirmeleri:**

* Kayıplar sırasında geri dönüşler kaldırıldı. Bu durum kayma sürecinin yeniden başlaması sırasında düğümün performansını önemli ölçüde artırır.
* Düğümlerden çıkmaya çalışırken zarif bir düğüm, kapalı kapılar çalıştırmaya çalışırken kapatıldı.
* Çizme sırasında kopyalamış IPC konteyner yayınları ayarlanmış.
* Çizme kayışları sıralamasında özel önyargı uygulamak yerine `prefixdb`s kullanarak eyalete yazmak için sıraya dizildi.
* Eklenen ek kayma önleme ve önbellek metrikleri eklendi.

**Veritabanı Göçmenliği Ek Olarak:**

* Güncellenmiş veritabanı formatına bir daemon işlem yöneticisi eklendi.
* Veritabanı semantik sürümleri takip etmek için değiştirilmiş sürüm işleme.
* Farklı veritabanı sürümleri üzerinde takip etmek ve çalıştırmak için bir veritabanı yöneticisi uyguladı.
* Kullanıcıları `v1.0.0` veritabanından `v1.4.5` veritabanına otomatik olarak kopyalayan `bir anahtar` göçü uyguladı.
* `V1.0.0` veritabanından `v1.4.5` veritabanına doğru bir doğrulayıcı üst zamanlı göçü uyguladı.

**Düğüm Geliştirmeleri:**

* Çevre değişkenlerini her zaman genişletmek için yapılandırma güncelleniyor.
* Düğüm yapılandırmasını diske dokunmadan hafızada TLS sertifikalarını belirtmek için ayarladı.
* Anlamlı çıkış kodları için daha iyi destek eklendi.
* `http` ve sunucuların belirli olmayan porta haritalarını desteklemek için görüntülenen dinleme adresi ve `staking` sunucuları.
* Bir veri tabanı ile `sürüm edilmiş` veritabanı arasında geçiş yapabilmek için `sürüm edilebilir` bir veritabanı uygulandı.
* Optimize edilmiş kimlik `ayarları` önceden ayarlandı ve `yapıların` hafıza kullanımını azalttı.
* Zorla sıkı bağlama kuralları.

**Değiştirilmiş komut satırı argümanları:**

Bu nedenle `"öntanımlı"` bir anahtar sözcüğü olarak değerlendirildi. Şimdi, `"varsayılan olarak"` bayrağın niyeti olarak değerlendirilecek. Öntanımlı davranışları korumak için, bayrak belirtilmemeli.

* `Yapılandırma dosyası`
* `coreth-config`
* `Eklenti`
* `& tls- staking-tls-key-file dosyası`
* `& staking- staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

"Aşağıdaki `tartışmalar"` daha önce anahtar sözcüğü olarak değerlendirildi. Şimdi, `""` bayrağın niyeti olarak muamele görecek. Öntanımlı davranışları korumak için, bayrak belirtilmemeli.

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level seviyesi`

`Artık çizme ipleri` ve `botlar` eşleştirilmek zorunda değildir. Bu da `demektir` ki, çizme kayışlarından farklı sayıda `çizme ipleri` belirtmek artık geçerli değildir. `Çizme` ipleri başlangıçta ağa bağlanmak için kullanılır ve `çizme` kayışları çizme the işaretler olarak kullanılır.

**Komut satırı argümanları eklendi:**

* `Sadece getir.`
* `build-dir`

**Alınan komut satırı argümanları:**

* `xput-server-port portu`
* `xput-server-enabled sunucu etkinleştirilebilir`

## v1.4.4 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4)

**Kayısı 2. Aşama 4.**

{% ipuçları style="warning" } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. {% endhint }

Yama yaklaşmakta `olan db` yükseltme sürümünü optimize etmek amacıyla hata düzeltmeleri ve performans iyileştirmeleri içerir.

* Çizme kayışında takip gecikmesi atlayıp tüm zincirler son zincir bir alt ağda baglanır işaretlenmez bitsin diye bitsin.
* Diğer zincirlerin senkronize olmasını beklerken mesaj kayışında iletileri kaldırma işlemi geliştirildi.
* Mevcut sürücüleri tekrar kullanılarak örnek tahsilatlarını azalttı.
* Güncelleştirilmiş dokter betikleri sadece `ana` daldan görüntüleri itmek için.
* Sabit kütük biçimlendirme.
* Geliştirilmiş hata mesajları.

## v1.4.3 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3)

**Kayısı 2. Aşama - Patika 3**

{% ipuçları style="warning" } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. {% endhint }

Bu yama hata düzeltmeleri, güncellenmiş güncellenmiş zamanlama izleme ve performans iyileştirmeleri içerir.

* Düzeltilmiş yedek mesaj işlemesi bot kayışında ilerleme kaydedemeyecek bir düğümün oluşmasına neden olabilir. Bu durum genellikle düğüm, bot kayışlarını bitirirken normal infaz edilemeyince deneyimliydi.
* C-Chain kod tabanında belirleyici olmayan bir hata ayarladı. Bu sayede başka bir düğümle üretilen bloklar üreten bir blok işlemeden önce geçici olarak kesilecek birçok işlem yayın isteğini alabilecek bir dizi işlem isteğini elde edebilir.
* Bir akraba gönderilmesi için sürüm mesajlarının sayısını kısıtladı.
* Kayısı 2'de çekilmiş olan el sıkışma mesajları.
* Üst hesaplamalar için çevrimdışı olarak çizilmiş işaretlenmiş düğümler.
* Doğrulama ayarlama ayarları sırasında daha fazla performans olacak şekilde ayarlanan doğrulayıcı güncellendi.
* Ağı sadece bir akranla bağlantıyı koparma girişimi için güncelledim eğer şu anda doğrulayıcı olurlarsa.

## v1.4.2 [\(GitHub\ Görünümünde Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2)

**Kayısı 2. Aşama 2 - Patika 2**

{% ipuçları style="warning" } Bu güncelleme v1.4.0 ve v1.4.1 ile geriye uyumludur. Güncellenen değişiklikler, 10 Mayıs 2021 tarihinde saat 10.00 EDT, Fuji testnet ve 7 EDT ile 10 Mayıs 2021 tarihinde anakaraya doğru yürürlüğe girmiştir. {% endhint }

Yama daha fazla dedikodu listesindeki mesajların boyutunu azaltıyor ve birkaç yeni bayrak sunuyor:

* `network-peer-list-size` her `peerlist` mesajında dedikodu yapan akranların sayısını ayarlamasına izin verir.
* `network-peer-list-gossip-size` boyutu dedikodu `listesi` mesajlarına akraba sayısını ayarlamasına izin verir.
* `network-peer-list-gossip-frequency` `frekansı, akranların` ne kadar sık dedikodu yapıldığına dikkat eder.

## v1.4.1 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1)

**Kayısı 2. Aşama 1**

{% ipuçları style="warning" } Bu güncelleme v1.4.0 ile ters uyumludur. Lütfen v1.4.0 sürümündeki beklenen güncelleme saatlerini görün. {% endhint }

Yama dedikodu listesindeki mesajların boyutunu azaltır ve yeni bir bayrak --bootstrap-beacon-connection-timeout zaman aşımı başlatmada ayarlanmasına izin veren yeni bir bayrak `-- - - bot --bootstrap-beacon-connection-timeout zaman` aşımı sunar.

## v1.4.0 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0)

**Kayısı 2. Aşama**

{% ipuçları style="danger" % } **Lütfen bu değişikliğin önceki sürümlerle ters uyumlu olmadığını unutmayın.**

**Bu yazının** [**yazısı burada**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf) bulunabilir**.** {% endhint }

{% ipuçları style="warning" } Bu yükseltme Ethereum Berlin'in to yükseltmesini uyguluyor, yeni bir AVM uç noktası ekliyor ve çeşitli istikrar geliştirmeleri içerir. Toplumdaki herkesi düğümlerinin sağlıklı kalmasını sağlamak için en kısa sürede güncellemeye çağırıyoruz.

Güncellenen değişiklikler, 10 Mayıs 2021 tarihinde saat 10.00 EDT, Fuji testnet ve 7 EDT ile 10 Mayıs 2021 tarihinde anakaraya doğru yürürlüğe girmiştir. {% endhint }

**Bu yükseltmenin ana bileşenleri şunlardır:**

* Güncellenmiş Coreth v1.10.2 of bağlı olarak
* Ethereum Berlin güncellemesini uyguladı. Özellikle [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565), [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) ve [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930).
* to etrafındaki to ve ARC-20 paketleyicilerini desteklemek için to yeni statik önceden derlenmiş akıllı sözleşmeler eklendi.
* Bir adres filtresi ile uyumlu kabul edilen işlemlerin web soketi bildirimini destekleyen bir AVM `/ etkinlik` sonucu, eklendi.
* Doğrulayıcı -> IP haritalarını geliştirmek için iki yeni ağ iletisi tipi `SignedVersion` ve `SignedPeerlist` eklendi.
* Zincir bağlıyken düğümü kapatan uzun bir hatayı tamir ettim. Zincirin zarif bir şekilde kapatılmasına neden olabilir.
* Eklenti gRPC paketlerini istikrarı artırmak için büyük istekleri to için güncellendi.
* avalanchego's ana ikili çalışmasını bir eklenti olarak eklendi.
* Yozlaşma korumasında potansiyel bir ırk durumunu düzelttim.
* Çoklu mimariyi daha iyi desteklemek için otomatik inşa metinleri güncellendi.

**Komut satırı argümanları eklendi:**

* `Eklenti` kipi etkinleştirilmesi, eklenti kipinde çalıştırmak için ikili arayı belirler.

**Alınan komut satırı argümanları:**

* `p2p- tls- etkinleştiriliyor`
* `Bağlantı kesik kontrol frekansı`
* `Bağlantı kesik yeniden başlatma zamanı`
* `Bağlantı kesilmiş yeniden başlatılıyor`

## v1.3.2 [\(GitHub\ Görünümünde Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2)

**Kayısı 1 - Patika 2**

{% ipuçları style="danger" % } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. Yama güvenlik iyileştirmeleri, hata düzeltmeleri ve izleme iyileştirmeleri içerir. {% endhint }

**Güvenlik Geliştirmeleri**

* `Kayısı 1 aşama` öncesi C-chain blokları için katı bir kanonik biçimi uygulamaya zorlandı. Bu `durum ekstra veri` blok alanındaki değişikliklerin to zincir durumuna göre değişimlere neden olamayacağını sağlar.
* `Anahtar` Mağazası'nı sadece şifrelenmiş değerlerin avalanchego ve eklenti işlemleri arasında IPC üzerinden gönderilmesini sağlamak için değiştirdiler.

**Böcek Düzeltmeleri:**

* Delege kapağı hesaplamaları, bir delege kaldırmadan önce mevcut delege maksimum güncellemesini içerecek şekilde ayarlanmış bir hesaplama. Bu da heyet başlığının her zaman uygulanmasını sağlar.
* `AVM`'nin statik API'sini başlangıçta doğru Fixed
* Ağ güncellemelerini hesaba `katmak` için güncellenmiş düğüm hesaplamaları.

**Geliştirmeleri İzleniyor**

* Bir zincir üzerinde kabul edilen işlemlerin yerel olarak tutarlı bir düzenleme sağlayabilecek bir opsiyonel düğüm indeksi eklendi.
* Güncellenen ansible envanter, çok sayıda iyileştirme içeren (@moreati\  sayesinde büyük bir teşekkür)

## v1.3.1 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1)

**Kayısı 1 - Patika 1**

{% ipuçları style="danger" % } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. Yama istikrarı ve izleme iyileştirmeleri ve küçük hata düzeltmeleri içerir. {% endhint }

**Bu yükseltmenin ana bileşenleri şunlardır:**

* C-chain segfault arm64 CPU'da sıkıştırma yaparken ayarlandı.
* Kompleks düğüm izleme etkinleştirmek için yerel dosyalara grup izinleri eklendi.
* Yazar şifrelerinden alınan beyaz boşluk api-- - şifreli dosya bayrağından geçti.
* En uzun süre istek edildiğinden beri geri kalan süreyi kaldırdılar.
* Ağ gazı içinde ek metrik eklendi.
* Çeşitli kod temizlik.

**Komut satırı argümanları eklendi:**

* `network-health-max-outstanding-request-duration istek süresi`

**Alınan komut satırı argümanları:**

* `network-health-max-time-since-no-requests fazla zamanlama istenmeyen`

## v1.3.0 [\(GitHub\ Görünümünde Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0)

**Kayısı 1 Aşama**

{% ipuçları style="danger" % } Lütfen bu değişikliğin önceki sürümlerle ters uyumlu olmadığını unutmayın.

Bu yükseltme C-chain gaz ücretlerini azaltıyor, C-chain gazı geri ödeme yapılıyor ve çeşitli güvenlik iyileştirmeleri de içeriyor. Toplumdaki herkesi düğümlerinin sağlıklı kalmasını sağlamak için en kısa sürede güncellemeye çağırıyoruz. {% endhint }

Güncellenen değişiklikler, 25 Mart 2021 tarihinde saat 10'da Fuji testnet ve 10 Mart 2021 tarihinde anakaraya doğru yürürlüğe girdi.

**Bu yükseltmenin ana bileşenleri şunlardır:**

* C-chain gazı 470 from 225 to düşürülmüş.
* C-chain gazı geri alınıyor. Bu değişim, [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298) kabul edilir.
* Ağ güncellemesi yaparken C-chain doğrulama daha temiz hale getirilmiştir.
* Geçersiz işaretleri doğru şekilde uygulamak için Auth API'yi ayarladım.
* Beklenen imza biçiminin kullanılmasını sağlamak için Auth API'yi güçlendirdi.
* Auth API'nin şifresini CLI argümanlarından kaldırdım.
* Daha katı dosya izinleri kontrolleri eklendi.
* Bazı küçük hatalar da ekledim.
* Sanitized kütük diskte yazılmadan önce yazılır.
* HTTP uç noktasına yapılandırılabilir kökenler eklendi.
* HTTP'ye kaldırılma girişimi başlangıçta başarısız oldu. HTTP'nin sonunun upgrading yükseltilmesi başarısız olursa düğüm, başlangıç noktasını kapatacaktır.

**Komut satırı argümanları eklendi:**

* `api-auth-password-file` dosyası Auth API'nin şifresini okumak için dosyayı belirler.

**Alınan komut satırı argümanları:**

* `api-- - - Parola`

## **v1.2.4 \(**[**GitHub\ Görünüm**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)****

**Kayısı 0. Aşama 1 - Düzen 4**

{% ipuçları style="danger" % } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. Yama istikrar ve izleme iyileştirmeleri içerir. {% endhint }

* Depo gereksinimlerini düzeltmeye ayarlayın.
* Avalanche Tx doğrulama sırasında ek hata işleme eklendi.
* Sayısız metrik, node sağlık ve veritabanı kullanımına ilişkin sayısız yeni metrik eklemek ve kullanılmayan ve geçersiz metriklerin kaldırılması ve bazı metrik isimlerin düzeltilmesi dahil olmak üzere güncellenmiştir.
* to ek kütük eklendi.
* Kritik zincirler listesine C zinciri eklendi.

## **v1.2.3 \(**[**GitHub\ Görünüm**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)****

**Kayısı 0. Aşama 1 - Düzen 3**

{% ipuçları style="danger" % } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. Yama istikrar ve izleme iyileştirmeleri içerir. {% endhint }

* Sağlıktaki sağlık kontrollerini kaldırmak için `[ağ, yönlendirici, uzlaşma]` sağlık kontrol parametrelerini ayarlandı.
* Basitleştirilmiş C-chain blok işlemi.

## **v1.2.2 \(**[**GitHub\ Görünümünde Görünüm**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)****

**Kayısı 0. Aşama 1 - Düzen 2**

{% ipuçları style="danger" % } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. Yama istikrarı ve izleme iyileştirmeleri içerir. {% endhint }

* Web kütüphanesine tekrarlanan `SYN` çağrılarını önlemek için IP isimlerini eklendi.
* Kendinden kaydırma yaparken ayarlanmış çizme mesajı.
* Basitleştirilmiş `AdvanceTimeTx` yayını.
* Yeni uzlaşma sağlığı kontrolleri eklendi.
* Sağlık kayıtları ekleniyor.
* Sağlık `hizmetleri` için sağlık çağrıları da eklendi.
* Gelen mesaj günlüklerini birleştirin.
* `LevelDB` paketine kaydedilen hata eklendi.
* Sicim ayrıştırmasını önlemek için `to` hata kodları eklendi.
* reorgs. sayısını azaltmak için kanonik zincir geliştirilmiş C-chain işleme işlemi.
* `Bekleyen` blokta yapılan sahte çağrıların geliştirilmiş C-chain işleme işlemi.

## **v1. 2.1** [**\(GitHub\ Görünüm**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)****

**Kayısı 0. Aşama 1 - Düzen 1**

{% ipuçları style="danger" % } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama cesaretlendirilmiş. Yama istikrarı ve izleme iyileştirmeleri içerir.

Lütfen bu güncellemenin komut satırı argümanları olarak 'ağ zamanlaması \`network-timeout-increase\` artışı\ ve ‘ağ zamanlaması indirgeme\ kaldırdığını unutmayın. {% endhint }

Özeti Değiştir

* \`UTXO\`s 's 'platformvm.getStake\' yanıtına eklendi.
* "\'info.peers\ yanıtına eklenen yedek liste eklendi."
* Ağ katmanına ek sağlık kontrolleri eklendi.
* Kazığın %'ı rapor edilen bir metrik olarak bağlandı.
* Düğünün yüksek geçit zamanında bile geçerli ipuçlarına yetişmesini sağlamak için yeniden bağlama mantığı eklendi.
* Başka bir zincir kayması yüzünden zincirin gerisinde kalmamasını sağlamak için altağ çapındaki çizme kayması eklendi.
* Gereksiz hesaplamadan kaçınmak için reddedilmiş blokların doğrulanmasını önlemiş.
* Ağa istenmeyen blokların dedikodularını kaldırdım.
* Gözlenen ağ gecikmesinin bir EWMA kullanması için ağ zaman hesaplayıcısını değiştirdi.
* Ağ gecikme hesaplamalarından istenen istekler kaldırıldı.
* Yedek algoritmasını temizledim.
* Gönderilen mesajların kaldırılmasıyla ilgili temizlik yapıldı.
* Olağanüstü bir istek ve zaman kaçışı mantığı temizledi.
* Profilin isimlerinin prefixing izin vermek için genelleştirilmiş performans takip edilmesi.
* Avalanche kayma alanına ek önleme eklendi.
* Tamir edilmiş ansible mertebe.
* Eklenen komut satırı argümanları çoğunlukla sağlık kontrollerinin yapılandırmalarından oluşur. Ayrıca, değiştirilmiş ağ gecikme hesaplamaları bazı komut satırı args. adını değiştirdi.

Komut satırı argümanları eklendi:

* \`network-timeout-halflife\` aşımı yarı- yaşamın
* \ 'ağ zaman aşımı katsayısı'
* \ 'ağ \`network-health-min-conn-peers\` arkadaşları'
* \ \`network-health-max-time-since-msg-received\` fazla \`network-health-max-time-since-msg-received\` beri--
* \ \`network-health-max-time-since-msg-sent\` fazla \`network-health-max-time-since-msg-sent\` zamandan beri
* \ 'ağ - \`network-health-max-portion-send-queue-full\` \`network-health-max-portion-send-queue-full\`
* \ 'ağ - \`network-health-max-send-fail-rate\` \`network-health-max-send-fail-rate\`
* \`network-health-max-time-since-no-requests\` fazla talep \`network-health-max-time-since-no-requests\` "...
* \`router-health-max-drop-rate\` yüksek düşüş oranı".
* \`router-health-max-outstanding-requests\` istekler
* \`health-check-frequency\` frekansı".
* "Sağlık \`health-check-averager-halflife\` yarı ömrü".
* \ \`bootstrap-retry-enabled\` girme etkinleştirildi'
* \ \`bootstrap-retry-max-attempts\` deneme--'

Alınan komut satırı argümanları:

* \ 'ağ zaman aşımı'
* \ 'ağ zaman aşımı indirgeme'

## v1. 2. 0 [\(GitHub\ Görünümünde Görünüm](https://github.com/ava-labs/avalanchego/tree/v1.2.0)

**Kayısı 0. Aşama 1 Yükseltilmesi**

{% ipuçları style="danger" % } **Lütfen bu yamanın önceki sürümlerle ters uyumlu olmadığını unutmayın. Bu yükseltme, X, C ve P zinciri arasındaki transferi ile ilgili performans sorunlarını düzeltir. Toplumdaki herkesi düğümlerinin etkilenmemesini sağlamak için en kısa sürede yükseltmeye çağırıyoruz. Ayrıca, düğümlerin yükseltilmeden sonra bağlanması birkaç dakika sürebilir ve sürecin kesintisiz olarak tamamlanması gerekir.** {% endhint }

Bu yükseltmenin ana bileşenleri şunlardır:

* C-Chain üzerinde ayarlanmış atomik ithalat Fixed
* Atom bonusu bloklarına izin vermek için kural istisnası mantığı eklendi
* Kopyalanmış deletes verilirse Paylaşılan Hafızaya hatalı hızlı mantık eklendi
* Kararlı bir konu var ki anketlerin kardan adam gibi durabilmesi istenmeyen bir şey
* Bilinmeyen atalar yüzünden in kötü BLOK sorununu düzeltti.
* Coreth onarım zincirinde bir yarış şartı ayarladım.
* Kardan Adam'da işlem blokları sayısı ve in txs işleme
* Güncellenmiş ağ zaman aşımı öntanımlı değerleri ve yedek liste ayarları
* İlk ağ istikrarsızlığından sonra güvenlik ihlali olmadığını doğruladı.

## v1.1.5 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/tree/v1.1.5)

**Kayısı 0. Aşama 5**

{% ipuçları style="danger" % } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama teşvik edilmişti. Yama istikrar iyileştirmeleri içerir. {% endhint }

* P-chain ve http\(s\) sonlanmasına yol açabilecek yeni zincirler kaydedilirken potansiyel bir çıkmazı ayarladı.
* in TxID -> Blok Yüksekliği indekslenmesini tamir eder.
* in debug\_traceTransaction API'da boş kontrat deployments zarif bir şekilde işletir.
* in geliştirilmiş hata oluştu.

## v1.1.4 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/tree/v1.1.4)

**Kayısı 0. Aşama 4**

{% ipuçları style="danger" % } Bu güncelleme geriye doğru uyumlu. İsteğe bağlı ama teşvik edilmişti. Yama CLI güncellemeleri, API hata düzeltmeleri, istikrar iyileştirmeleri ve performans iyileştirmeleri içerir. {% endhint }

* C-chain blok indekslerinin belirli bir yükseklikte kabul edilmemiş blokları harita edebileceği bir sorunu ayarladım.
* RPCChainVM yüksek API yükleri ile ayarlanmış VM kazası.
* Oyları işleme dikenleriyle doğru geçmek için Avalanche Motoru'nda köpüklü iyimser oylama düzenlendi.
* Eklenen alan AVM'nin GetBalance ve GetAllBalances API yöntemlerine Ayrı Bölümü Içeriyor. Bu durum sadece harcanabilir ve eşsiz mal varlıklarının dengesini geri vermek için varsayılan davranışları değiştirir.
* Özel ağ kimlikleri için özel gen incirlerini belirleme becerisini eklendi.
* IPC API işlevselliği eklendi.
* to ek önbellek eklendi.
* İkili sürümler için geliştirilmiş eklenti dizini her zaman işe yarar.

## v1.1.3 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/tree/v1.1.3)

**Kayısı 0. Aşama 3**

{% ipuçları style="danger" % } Bu güncelleme isteğe bağlı ama teşvik edildi. Yama API'lerle ilgili küçük hata düzeltmeleri içerir. {% endhint }

* C-chain kayıtlarını filtrelemeye çalışırken ayarlanmış asılma çağrısı.
* C-chain istemcisi uygun çoklu madeni API'yi aramak için ayarlandı.
* `getAtomicUTXOs` `avm` ve `API` istemcilerine eklendi.

## v1.1.2 [\(GitHub\ Görünümünde Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)

**Kayısı 0. Aşama 2**

{% ipuçları style="danger" % } Bu güncelleme isteğe bağlı ama teşvik edildi. Bu yama hata düzeltmeleri ve performans iyileştirmeleri içerir. {% endhint }

* Avalanche kayışında kopyalanmış traversals azaltmak için ayarlanmış bootstrapping işleme önbelleği.
* Çizme sırasında en iyi P zinciri doğrulaması.
* Uygun giriş değerlerini kullanmak için maksimum bankta hesap ayarlandı.
* from fazladan keten çıkarılmış.
* `Kardan` Adam'a `Yükseklik` Ekle. Blok arayüzü.

## v1.1. 1 [\(GitHub\ Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)

**Kayısı 0. Aşama 1**

{% ipuçları style="danger" % } Bu güncelleme isteğe bağlı ama teşvik edildi. Bu yama hata düzeltmeleri ve performans iyileştirmeleri içerir. {% endhint }

* Kullanıcılar `Sağlık` API'yi devre dışı bıraktığında bir düğüm çarpma hatasını düzeltti.
* Bir düğümün uzun zaman önce olduğunu bildirecek bir cihazı ayarladım.
* Bir `Codec` kullanmak için vertex ayrıştırılması.
* Ayrı ayrı, statüsüz ve vertex yönetimi.
* to tarla aralığı uzunluğu eklendi.
* `TypeID`s birleştiren yeni bir codec tipi tanıttı.
* Sunulan mesaj bayrakları to sunuldu.
* Gelecekteki bir veritabanı göçü sırasında kullanılacak bir semanticdb paketi sundu.
* Epoch takip eklendi, zincir bağlamına eklendi.
* İşlem doğrulaması sırasında geri dönen bazı hata mesajları geliştirildi.
* DB sürümünde GC basıncı azaldı.

## v1.1. 0 [\(GitHub\ Görünümünde Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)

**Kayısı Aşaması 0.**

{% ipuçları style="danger" % } **Lütfen bu yükseltmenin önceki sürümlerle ters uyumlu olmadığını unutmayın. Güncelleme 7 Aralık Pazartesi günü saat 11:00 gibi gerçekleştirilmelidir. Başlangıçta Aralık ayı ortalarında planlanan güncelleme, şimdi önemli bir işaretli kilitleme hatasını düzeltmek için hızlandırılıyor. Toplumdaki herkesi düğümlerinin etkilenmemesini sağlamak için en kısa sürede yükseltmeye çağırıyoruz.** {% endhint }

Bu güncellemenin iki ana bileşeni vardır:

* Önümüzde olan Apricot ağı güncellemesi için genel hazırlıklar Apricot Sıfır Yükseltilmesi adı verilen
* stake-able outputs kilitlenmesini engelleyen bir sorunu düzeltmek... ... kilitlendikten sonra kilitlenmesini engelliyor... \ \   zaman geçtikten sonra...

## v1.0.6 [\(GitHub\ Görünümünde Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)

{% ipuçları style="danger" % } Bu salınımın [burada](https://docs.avax.network/build/apis/deprecated-api-calls) tanımlanan değişiklikleri içeren bir not edin. Platform.getTxStatus ve of öntanımlı tepki biçimini değiştirir. Güncelleme isteğe bağlı ama teşvik edildi. Bu yama performans iyileştirmeleri ve yaşam kalitesi açısından bazı iyileştirmeler içerir. {% endhint }

* Platform.getTxStatus ve platform.getCurrentValidators. kaldırılmış biçimleri.
* İçeriye aktarılmış ve ihraç edilen kullanıcıların büyü kodları için destek eklendi.
* Golang standart in bulunan DoS savunmasızlığından kaçınmak için v1.15.5 v'ye golang gereksinimini ayarlayın.
* Bağlı yazılımla etkileşim içinde yardımcı olarak hareket etmek için API istemcileri eklendi.
* Eğer bir düğüm ağın geri kalanından koparsa kayma işlemi etkinleştirilir.
* UTXOs birden fazla adres referans edince GetUTXOs API'leri ayarlandı.
* RPC seçeneklerini daha iyi genelleştirmek için ikili kodlama yazılmış.
* Pencere uzunluğunu doğru ayarlamak için IP bloğu filtreleniyor.
* Farklı sürümlerle birden fazla kodlayıcıyı yönetebilmek için codec paketini genelleştirdi.
* Gelecekte bir serbest bırakma hazırlığı için Epoch Vertex arayüzüne eklendi.
* Hızlı kontroller geçmiş CPU/Hafıza kullanımını azaltmak için engelli işlem hashing
* [those](https://explorerapi.avax-dev.network/) için URL gelecekteki bir sürüm içinde kapatılacak. Lütfen [to](https://explorerapi.avax.network/) / adresine geçiniz.

Bu güncellemede yardım için, [Geliştirici](https://support.avalabs.org/en/collections/2618154-developer-faq) our takip edin, eğer hala sorunlarla uğraşıyorsanız [Discord](https://chat.avax.network/) ile yardım için bize katılabilirsiniz.

## v1.0.5 [\(GitHub\ Görünümünde Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5)

{% ipuçları style="danger" % } Lütfen bu seferki v1.0.6 sürümünün [burada](https://docs.avax.network/build/apis/deprecated-api-calls) tanımlanan kırılma değişiklikleri içereceğini unutmayın. Bu nedenle `platform.getTxStatus``` ve of tepki biçimi değişecek. {% endhint }

Bu sürümdeki değişiklikler, v1.0.5 önceki sürümlerle ters uyumludur. Güncelleme isteğe bağlı ama teşvik edildi. Bu yama performans iyileştirmeleri ve yaşam kalitesi açısından bazı iyileştirmeler içerir.

* `Özel` anahtarları bir düğüme açıklamadan atom değişimi yapabilmek için IssueTx API'ye IssueTx ve `GetUTXOs` eklendi.
* Kardan adam talep yöneticisinde bellek sızıntısı ve kahin blok işleme işleme ile birlikte.
* UTXO pagination bug cihazını ayarla ve rapor edilmemiş fonları ayarla.
* İnsan okunabilir zincir kütüklerinde yaşamak için taşınmış http günlükleri.
* Kimliklerin yığınları ayırmaktan kaçınma yöntemini yeniden yapılandır.
* `Birden` fazla harita yaratmamak için the en iyi şekilde değerlendirdi.
* `Kimlik` `usage` lehine ayarlanarak sürekli hafızayı daha iyi kullanmak için
* `in` `[]byte` yeniden kullanılıyor.
* Sıklıkla arayüz dönüştürme tahsilatlarından kaçınmak için uygulanan type-specific fonksiyonları
* Diskten gereksiz bilgileri okumamak için en iyi AVM yükleme kullanıcısı.
* Mesajın tam uzunluğunu gönderen soket içinde bir bellek tahsis + kopyası kaldırıldı.

Bu güncellemede yardım için, [Geliştirici](https://support.avalabs.org/en/collections/2618154-developer-faq) our takip edin, eğer hala sorunlarla uğraşıyorsanız [Discord](https://chat.avax.network) ile yardım için bize katılabilirsiniz.

## v1.0.4 [\(GitHub\ Görünümünde Görünüm](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)

![AvalancheGo notları v1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% ipuçları style="danger" % } Bu güncelleme isteğe bağlı ama teşvik edildi. Bu yamada yaşam iyileştirmeleri ve çeşitli performans iyileştirmeleri yer alıyor. Bu güncellemenin CLI parametrelerinin belirtilmesi gerektiğini not edin, ya da --- Örneğin, `-public-ip=127.0.0.1` artık izin verilmiyor ve `--public-ip=127.0.0.1` olarak belirtilmesi gerekiyor. Aksi takdirde, bu güncelleme ters uyumludur. {% endhint }

```text
• Added subnet whitelisting to allow a node owner to choose which subnets to validate.
```

```text
• Added config file parsing for node settings.
• Added more options for specifying a node's IP address and added getNodeIP to the info *endpoint.
• Added a TxID to the result of get.Validators in the platformvm.
• Updated Coreth version.
• Cleaned up the snowball trie implementation and added additional tests to align with mutation tests.
• Implemented and optimized continuous time averages for tracking CPU and network latency.
• Significantly optimized memory allocations in various locations.
• Increased the signature verification cache size.
• Reduced DB reads during vertex management.
```

```text
• Added an optional argument includeReason to platform.getTxStatus.
If not provided, or if false, the output from getTxStatus is the same as before.

For example:
{
    "jsonrpc": "2.0",
    "result": "Dropped",
    "id": 1
}

If includeReason is true, the output from getTxStatus has a new format. It's an object that looks like this:

{
    "jsonrpc": "2.0",
    "result": {
        "status":"[Status]",
        "reason":"[Reason tx was dropped, if applicable]"
    },
    "id": 1
}

In this new format, reason will not be present unless the status is Dropped.
Anything that depends on platform.getTxStatus should switch to using the includeReason argument and use the new response format. After a few releases, we'll only support the new response format.
```

Bu güncellemede yardım için, [Geliştirici](https://support.avalabs.org/en/collections/2618154-developer-faq) our takip edin, eğer hala sorunlarla uğraşıyorsanız [Discord](https://chat.avax.network) ile yardım için bize katılabilirsiniz.


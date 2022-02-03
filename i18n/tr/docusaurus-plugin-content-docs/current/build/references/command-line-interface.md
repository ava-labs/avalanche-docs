---
sidebar\_position: 3
---

# Komut Satırı Arayüzü

Bir düğümün konfigürasyonunu aşağıdaki argümanlarla belirleyebilirsiniz.

## Config Dosyası

`--config-file` \(string\):

Bu düğümün konfigürasyonunu belirleyen bir JSON dosyasının yolu. Komut satırı argümanları, yapılandırma dosyasında belirlenen argümanları geçersiz kılar. `--config-file-content` belirtilirse bu bayrak göz ardı edilir.

Örnek JSON config dosyası:

```javascript
{
    "log-level": "debug"
}
```

`--config-file-content` \(string\):

`--config-file`'ye alternatif olarak, base64 ile kodlanmış yapılandırma içeriğinin belirlenmesine izin verir. `--config-file-content-type` ile birlikte kullanılmalıdır.

`--config-file-content-type` \(string\):

Base64 ile kodlanmış yapılandırma içeriğinin formatını belirtir. Şu anda desteklenen dosya formatları arasında JSON, TOML, YAML de bulunmaktadır \(tam liste için [buraya](https://github.com/spf13/viper#reading-config-files) bakın\). `--config-file-content` ayarlanırsa gereklidir.

## API'ler

`--api-admin-enabled` \(boolean\):

`false` olarak ayarlandıysa, bu düğüm Admin API'sini kullanıma sunmayacaktır. Varsayılan `false` olarak ayarlıdır. Daha fazla bilgi için [buraya](../avalanchego-apis/admin-api.md) bakın.

`--api-auth-required` \(boolean\):

`true` olarak ayarlanırsa, API çağrıları bir yetkilendirme token'ı \(authorization token\) talep eder. Varsayılan `false` olarak ayarlıdır. Daha fazla bilgi için [buraya](../avalanchego-apis/auth-api.md) bakın.

`--api-auth-password` \(string\):

Yetkilendirme token'ları yaratmak/iptal etmek için gereken şifredir. `--api-auth-required=true` ise, belirtilmesi zorunludur; aksi takdirde yok sayılır. Daha fazla bilgi için [buraya](../avalanchego-apis/auth-api.md) bakın.

`--api-health-enabled` \(boolean\):

`true` olarak ayarlanırsa, bu düğüm Health API'sini kullanıma sunacaktır. Varsayılan `true` olarak ayarlıdır. Daha fazla bilgi için [buraya](../avalanchego-apis/health-api.md) bakın.

`--index-enabled`\(boolean\): {#index-enabled}

`false` ise, bu düğüm indeksleyiciyi etkinleştirmeyecek ve Index API kullanılabilir olmayacaktır. Varsayılan `false` olarak ayarlıdır. Daha fazla bilgi için [buraya](../avalanchego-apis/index-api.md) bakın.

`--api-info-enabled` \(boolean\):

`true` olarak ayarlanırsa, bu düğüm Info API'yi kullanıma sunacaktır. Varsayılan `true` olarak ayarlıdır. Daha fazla bilgi için [buraya](../avalanchego-apis/info-api.md) bakın.

`--api-ipcs-enabled` \(boolean\):

`true` olarak ayarlanırsa, bu düğüm IPC'ler API'sini kullanıma sunacaktır. Varsayılan `false` olarak ayarlıdır. Daha fazla bilgi için [buraya](../avalanchego-apis/ipc-api.md) bakın.

`--api-keystore-enabled` \(boolean\):

`false` olarak ayarlanırsa, bu düğüm Keystore API'yi kullanıma sunmayacaktır. Varsayılan `true` olarak ayarlıdır. Daha fazla bilgi için [buraya](../avalanchego-apis/keystore-api.md) bakın.

`--api-metrics-enabled` \(boolean\):

`false` olarak ayarlanırsa, bu düğüm Metrics API'yi kullanıma sunmayacaktır. Varsayılan `true` olarak ayarlıdır. Daha fazla bilgi için [buraya](../avalanchego-apis/metrics-api.md) bakın.

`--http-shutdown-wait` \(süre\):

SIGTERM veya SIGINT alındıktan sonra kapatmayı başlatmadan önce beklenecek süre. `/health` son noktası, bu süre boyunca unhealthy \(sağlıksız\) durum döndürecektir \(Health API etkinse.\) Varsayılan olarak 0'a ayarlıdır.

`--http-shutdown-timeout` \(süre\):

Düğümün kapanması sırasında mevcut bağlantıların tamamlanması için beklenecek azami süre. Varsayılan olarak 10 saniyeye ayarlıdır.

## Assertion'lar

`--assertions-enabled` \(boolean\):

`true` olarak ayarlandığında, assertion'lar codebase boyunca runtime'da yürütülecektir. Bunun hata ayıklamada kullanılması amaçlanmaktadır, çünkü daha spesifik bir hata mesajı alabiliriz. `true` varsayılandır.

## Bootstrapping

`--bootstrap-beacon-connection-timeout` \(süre\):

Bootstrapping beacon'larına bağlanmaya çalışırken işleyecek zaman aşımı süresidir. `1m` varsayılandır.

`--bootstrap-ids` \(string\):

Bootstrap kimlikleri, doğrulayıcı kimliklerinin bir dizilimidir. Bu kimlikler, bootstrap yapan eşlerin kimliklerini doğrulamak için kullanılacaktır. Bu alan için örnek bir ayar `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"` olabilir. Varsayılan değer ağ kimliğine bağlıdır.

`--bootstrap-ips` \(string\):

Bootstrap IP'leri, IPv4:port çiftlerinin bir dizilimidir. Bu IP Adresleri güncel Avalanche durumunu bootstrap etmek için kullanılacaktır. Bu alan için örnek bir ayar `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"` olabilir. Varsayılan değer ağ kimliğine bağlıdır.

`--bootstrap-retry-enabled` \(boolean\):

True ise, bootstrap başarısız olursa tekrar deneyecektir.

`--bootstrap-retry-max-attempts` \(uint\):

Bootstrap başarısız olduktan sonra kaç kere tekrar deneneceğinin maksimum sayısıdır.

## Veri Tabanı

`--db-dir` \(string, dosya yolu\):

Veri tabanının kalıcı olarak yönlendirildiği dizini belirtir. `"$HOME/.avalanchego/db"` varsayılandır.

`--db-type` \(string\):

Kullanılacak veri tabanı tipini belirtir. `leveldb`, `rocksdb` veya `memdb` ögelerinden biri olmalıdır. `memdb`, bir bellek içi \(in-memory\), kalıcı kılınmayan \(non-persisted\) bir veri tabanıdır.

Düğümün `leveldb` veri tabanı ile çalıştırılırken, `rocksdb` veri tabanı ile çalıştırıldığı sırada kalıcı olması amaçlanan verileri \(persistent data\) okuyamayacağını \(ve bunun tersi durumun geçerli olacağını\) aklınızda bulundurun.

**RocksDB veri tabanı ile ilgili iki önemli not**: Birincisi, RocksDB veri tabanı her bilgisayarda çalışmaz. İkincisi, RocksDB veri tabanı varsayılan olarak kurulmaz ve herkese açık olarak yayınlanan binary'lere dahil edilmez. AvalancheGo'yu RocksDB veri tabanı ile kurmak için terminalinizde `export ROCKSDBALLOWED=1` komutunu çalıştırın, ardından `scripts/build.sh` komutunu çalıştırın. `--db-type=rocksdb` ögesini kullanabilmek için önce bunu yapmanız gerekir.

## Genesis

`--genesis` \(string\):

Kullanılacak genesis verilerini içeren bir JSON dosyasının yoludur. Standart ağları çalıştırırken \(Mainnet, Fuji Testnet\) veya `--genesis-content`belirtildiğinde yok sayılır. Genesis veriler girilmezse, varsayılan genesis veriler kullanılır. Genesis verilerinin bir JSON temsilinin örneği için [buraya](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16) bakın.

`--genesis-content` \(string\):

`--genesis`'e alternatif olarak base64 ile kodlanmış genesis verilerinin kullanılmasına izin verir.

## HTTP Sunucusu

`--http-host` \(string\):

HTTP API'lerinin dinlediği adrestir. Varsayılan `127.0.0.1` olarak ayarlıdır. Bunun anlamı şudur: düğümünüz varsayılan olarak yalnızca aynı makineden yapılan API çağrılarını işleyebilir. Diğer makinelerden API çağrıları yapılmasına izin vermek için şunu kullanın: `--http-host=`
 Parametre olarak alan adlarını da girebilirsiniz.

`--http-port` \(int\):

Her düğüm, o düğümle ve Avalanche ağıyla etkileşimde bulunmak için gerekli API'leri sağlayan bir HTTP sunucusu çalıştırır. Bu argüman, HTTP sunucusunun dinleyeceği port'u belirler. Varsayılan değer `9650` olarak belirlenmiştir.

`--http-tls-cert-file` \(string, dosya yolu\):

Bu argüman, düğümün HTTPS sunucusu için kullandığı TLS sertifikasının konumunu belirler. Bu, `--http-tls-enabled=true` olduğu durumda belirtilmelidir. Varsayılan bir değer yoktur. `--http-tls-cert-file-content` belirtilirse bu bayrak göz ardı edilir.

`--http-tls-cert-file-content` \(string\):

`--http-tls-cert-file`'ye alternatif olarak, HTTPS sunucusu için düğüm tarafından kullanılan TLS sertifikasının base64 kodlu içeriğinin belirtilmesine izin verir. Baştaki ve sondaki başlıkla birlikte sertifika içeriğinin tamamının base64 olarak kodlanması gerektiğini unutmayın. Bu, `--http-tls-enabled=true`olduğu durumda belirtilmelidir.

`--http-tls-enabled` \(boolean\):

`true` olarak ayarlanırsa, bu bayrak sunucuyu HTTPS kullanacak şekilde upgrade etmeye çalışacaktır. `false` varsayılandır.

`--http-tls-key-file` \(string, dosya yolu\):

Bu argüman, HTTPS sunucusu için düğüm tarafından kullanılan özel TLS anahtarının konumunu belirler. Bu, `--http-tls-enabled=true` olduğu durumda belirtilmelidir. Varsayılan bir değer yoktur. `--http-tls-key-file-content` belirtilirse bu bayrak göz ardı edilir.

`--http-tls-key-file-content` \(string\):

`--http-tls-key-file`'ye alternatif olarak, HTTPS sunucusu için düğüm tarafından kullanılan TLS özel anahtarının base64 ile kodlanmış içeriğinin belirtilmesine izin verir. Baştaki ve sondaki başlıkla birlikte özel anahtar içeriğinin tamamının base64 ile kodlanması gerektiğini unutmayın. Bu, `--http-tls-enabled=true`olduğu durumda belirtilmelidir.

## IPCS

`--ipcs-chain-ids` \(string\)

Bağlanılacak zincir kimliklerinin virgülle ayrılmış listesi \(örn. `11111111111111111111111111111111LpoYY,4R5p2RXDGLqaifZE4hHWH9owe34pfoBULn1DrQTWivjg8o4aH`\). Varsayılan bir değer yoktur.

`--ipcs-path` \(string\)

IPC soketleri için dizin \(Unix\) veya adlandırılmış kanal öneki \(named pipe prefix\) \(Windows\). Varsayılan olarak /tmp'dir.

## Dosya Betimleyici \(File Descriptor\) Limiti

`--fd-limit` \(int\)

Süreç dosyası betimleyicisi limitini en azından bu değere yükseltmeye çalışır. Varsayılan olarak `32768` değerine ayarlıdır

## Günlüğe kaydetme

`--log-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

Günlük düzeyi, hangi olayların günlüğe kaydedileceğini belirler. En yüksek öncelikten en düşüğe doğru sıralanan 7 farklı düzey vardır.

* `Off`: Hiçbir günlükte bu kaydetme düzeyi yoktur.
* `Fatal`: Kurtarılamayan onulmaz hatalar \(fatal error\).
* `Error`: Düğümün karşılaştığı hatalar; bu hatalar kurtarılabildi.
* `Warn`: Bir parazit bizans düğümünün ya da gelecekteki potansiyel bir hatanın göstergesi olabilecek bir Uyarı.
* `Info`: Düğüm durumu güncellemelerinin kullanışlı açıklamaları.
* `Debug`: Hata ayıklama günlüğü, koddaki olası hataları anlamaya çalışırken işe yarar. Normal kullanımda tipik olarak istenecek bilgilerden daha fazla bilgi gösterilecektir.
* `Verbo`: Düğümün işlediği büyük miktarlardaki bilgileri takip eder. Bu, son derece düşük seviyeli protokol analizi için kullanılan mesaj içeriklerini ve binary veri dump'larını içerir.

Bir günlük düzeyi belirlerken, belirlenen önceliğe veya daha yükseğine ayarlanan tüm günlüklerin takip edileceğini aklınızda bulundurun. `Info` varsayılandır.

`--log-display-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

Günlük düzeyi, ekrana hangi olayların gösterileceğini belirler. Boş bırakılırsa, varsayılan olarak `--log-level` parametresine girilen değere ayarlanır.

`--log-display-highlight` \(string, `{auto, plain, colors}`\):

Gösterilen günlük kayıtlarının renkli/vurgulanmış yapılıp yapılmayacağı. Çıktı bir terminal olduğunda günlük kaydı varsayılan olarak vurgulu yapılır . Aksi takdirde `{auto, plain, colors}` seçeneklerinden biri olmalıdır

`--log-dir` \(string, dosya yolu\):

Sistem günlüklerinin tutulduğu dizini belirler. `"$HOME/.avalanchego/logs"` varsayılandır.

## Ağ Kimliği

`--network-id` \(string\):

Düğümün bağlanması öngörülen ağın kimliği. Şunlardan biri olabilir:

* `--network-id=mainnet` -> Mainnet'e bağlan \(varsayılan\).
* `--network-id=fuji` -> Fuji test ağına bağlan.
* `--network-id=testnet` -> Şu anda geçerli test ağına bağlan. \(Şu anda geçerli test ağı Fuji'dir.\)
* `--network-id=local` -> Yerel bir test ağına bağlan.
* `--network-id=network-{id}` -> Ağa verilen kimlikle bağlan. `id`, `[0, 2^32)` aralığında olmalıdır.

## Genel IP

`--public-ip` \(string\):

Doğrulayıcılar herkese açık IP adreslerini bilmelidirler, böylece diğer düğümlerin bu adreslere nasıl bağlanacaklarını bilmelerine imkan verirler. Bu argüman verilmezse, düğüm, düğümün genel IP'sini almak için NAT traversal yapmaya çalışacaktır. Yerel bir ağ yaratmak için `127.0.0.1` olarak ayarlanmalıdır. Ayarlanmazsa, NAT traversal'i kullanarak IP'yi öğrenmeye çalışır.

`--dynamic-public-ip` \(string\):

Parametre mevcutsa geçerli değerler şunlardır: `opendns`, `ifconfigco` veya `ifconfigme`. Bu durumda `--public-ip` override edilir. Ayarlanırsa, uzak servisi `--dynamic-update-duration` parametresinde belirtilen aralıklarda yoklar ve düğümün genel IP adresini günceller.

`--dynamic-update-duration` \(süre\):

`--dynamic-public-ip` veya NAT traversal için yoklama olayları arasındaki süre. Önerilen en az süre 1 dakikadır. `5m` varsayılandır.

## İmza Doğrulaması

`--signature-verification-enabled` \(boolean\):

İmza doğrulamayı etkinleştirir. `false` olarak ayarlandığında, imzaların devre dışı bırakılmasına izin veren VM'lerde imzalar kontrol edilmez. `true` varsayılandır.

## Staking

`--staking-port` \(int\):

Staking sunucusunun Avalanche ağına harici olarak bağlanacağı porttur. `9651` varsayılandır.

`--staking-enabled` \(boolean\):

Avalanche, ağa saldırmayı caydırıcı kılacak kadar pahalı hale getirmek için Sybil direnci olarak Pay İspatı \(PoS\) kullanır. False olarak ayarlanırsa sybil direnci devre dışı bırakılır ve tüm eşler konsensüs sırasında örneklenir. `true` varsayılandır.

Bu bayrağın `false` olarak ayarlanması "bu düğüm bir doğrulayıcı değildir" **anlamına gelmez.** Bu düğümün sadece doğrulayıcıları değil, tüm düğümleri örnekleyeceği anlamına gelir. **Ne yaptığınızı bilmediğiniz sürece bu bayrağı false olarak ayarlamamalısınız.**

`--staking-tls-cert-file` \(string, dosya yolu\):

Avalanche, düğümleri güvenli bir şekilde bağlamak için iki yönlü kimlik doğrulaması yapılmış TLS bağlantıları kullanır. Bu argüman düğümün kullandığı TLS sertifikasının konumunu belirler. Düğüm varsayılan olarak TLS sertifikasının `$HOME/.avalanchego/staking/staker.crt` konumunda olmasını bekler. `--staking-tls-cert-file-content` belirtilirse bu bayrak göz ardı edilir.

`--staking-tls-cert-file-content` \(string\):

`--staking-tls-cert-file`'ye alternatif olarak, düğüm tarafından kullanılan TLS sertifikasının base64 ile kodlanmış içeriğinin belirtilmesine izin verir. Baştaki ve sondaki başlıkla birlikte sertifika içeriğinin tamamının base64 ile kodlanması gerektiğini unutmayın.

`--staking-tls-key-file` \(string, dosya yolu\):

Avalanche, düğümleri güvenli bir şekilde bağlamak için iki yönlü kimlik doğrulaması yapılmış TLS bağlantıları kullanır. Bu argüman düğümün kullandığı TLS özel anahtarının konumunu belirler. Düğüm varsayılan olarak TLS özel anahtarının `$HOME/.avalanchego/staking/staker.key` konumunda olmasını bekler. `--staking-tls-key-file-content` belirtilirse bu bayrak göz ardı edilir.

`--staking-tls-key-file-content` \(string\):

`--staking-tls-key-file`'ye alternatif olarak, düğüm tarafından kullanılan TLS özel anahtarının base64 ile kodlanmış içeriğinin belirtilmesine izin verir. Baştaki ve sondaki başlıkla birlikte özel anahtar içeriğinin tamamının base64 ile kodlanması gerektiğini unutmayın.

`--staking-disabled-weight` \(int\):

Staking devre dışı bırakıldığında her bir eşe verilecek ağırlık. `1` varsayılandır.

## Sürüm

`--version` \(boolean\)

Bu `true` ise, sürümü yazdırıp çıkın. `false` varsayılandır.

## Gelişmiş Seçenekler

Aşağıdaki seçenekler bir düğümün doğruluğunu etkileyebilir. Bunları yalnızca uzman kullanıcılar değiştirmelidir.

### App Gossiping

`--consensus-app-gossip-non-validator-size` \(uint\):

Bir AppGossip mesajının gossip edileceği eşlerin \(doğrulayıcı olabilirler veya olmayabilirler\) sayısı. `0` varsayılandır.

`--consensus-app-gossip-validator-size` \(uint\):

Bir AppGossip mesajının gossip edileceği doğrulayıcıların sayısı. `6` varsayılandır.

### Benchlist

`--benchlist-duration` \(süre\):

Bir eşin `--benchlist-fail-threshold` eşiğini aştıktan sonra benchlist'e alındığı süre. `15m` varsayılandır.

`--benchlist-fail-threshold` \(int\):

Bir düğümü bench etmeden \(saha kenarına alma\) önce o düğüme yapılan ardışık başarısız sorguların sayısıdır \(tüm sorguların başarısız olacağı varsayılarak\). `10` varsayılandır.

`--benchlist-peer-summary-enabled` \(boolean\):

Her eşe özgü sorgu gecikme süresi \(latency\) metriklerini etkinleştirir. `false` varsayılandır.

`--benchlist-min-failing-duration` \(süre\):

Bir eş bench edilmeden önce o eşe gönderilen sorguların başarısız olması gereken minimum süredir. `150s` varsayılandır.

### Kurulum Dizini

`--build-dir` \(string\):

AvalancheGo ve plugin binary'lerinin nerede bulunacağını belirler. Varsayılan olarak yürütülen AvalancheGo binary'sinin yoluna ayarlıdır. Bu dizinin yapısı aşağıdaki gibi olmalıdır:

```text
build-dir
|_avalanchego
    |_plugins
      |_evm
```

### Zincir Yapılandırmaları

Bazı zincirler düğüm işleticisinin özel bir yapılandırma sağlamasına izin verir. AvalancheGo dosyalardan zincir yapılandırma parametrelerini okuyabilir ve bunları başlatma \(initialization\) sırasında ilgili zincirlere aktarabilir.

AvalancheGo bu dosyaları `--chain-config-dir` parametresiyle belirlenen dizinde arar.
 Bu dizinde, adları zincir kimlikleri veya zincir alias'ları olan alt dizinler bulunabilir. Her alt dizin, dizin adında belirtilen zincirin yapılandırma parametrelerini içerir. Her alt dizinde, ilgili zincir başlatıldığında değeri aktarılan `config` adlı bir dosya bulunmalıdır. Örneğin, C-Chain'in config dosyası şurada olmalıdır: `[chain-config-dir-goes-here]/C/config.json`.

Bu dosyaların hangi uzantıya sahip olması gerektiği ve bu dosyaların içerikleri VM'ye bağlıdır. Örneğin, bazı zincirlerin `config.txt` uzantılı olmaları, diğerlerinin ise `config.json` uzantılı olmaları beklenebilir. Aynı adın verildiği ama uzantıları farklı olan \(örn. `config.json` ve `config.txt`\) birden fazla dosya varsa, AvalancheGo bir hata mesajı vererek o konumdan çıkacaktır.

AvalancheGo belli bir zincir için ilk olarak adı zincir kimliği olan bir yapılandırma alt dizini arayacaktır.
Alt dizini bulamazsa, adı zincirin birincil alias'ı olan bir yapılandırma alt dizini arar. Bu alt dizini bulamazsa, adı zincirin diğer bir alias'ı olan bir yapılandırma alt dizini arar. Tüm klasör ve dosya adları büyük/küçük harf duyarlıdır.

Bu kişiselleştirilmiş yapılandırma değerlerini girmek zorunlu değildir. Bu yapılandırma değerleri girilmezse, bir VM'nin varsayılan yapılandırması kullanılacaktır.

`--chain-config-dir` \(string\):

Yukarıda açıklandığı gibi, zincir yapılandırma parametrelerini içeren dizini belirler. Varsayılan `$HOME/.avalanchego/configs/chains` olarak ayarlıdır. Bu bayrak sağlanmazsa ve varsayılan dizin mevcut değilse, kişiselleştirilmiş yapılandırmalar isteğe bağlı olduğundan AvalancheGo o konumdan çıkmaz. Bununla beraber, bayrak ayarlanmışsa, belirtilen klasör bulunmalıdır, aksi takdirde AvalancheGo bir hata mesajı vererek o konumdan çıkacaktır. `--chain-config-content` belirtilirse bu bayrak göz ardı edilir.

`--chain-config-content` \(string\):

`--chain-config-dir`'e alternatif olarak, özel zincir konfigürasyonları `--chain-config-content` bayrağı aracılığıyla komut satırından tamamen yüklenebilir. İçerik base64 ile kodlanmış olmalıdır.

#### C-Chain Yapılandırması

C-Chain için bir yapılandırma belirlemek için, bir JSON config dosyası `{chain-config-dir}/C/config.json` konumuna \(veya yukarıda belirtildiği gibi başka bir geçerli konuma\) yerleştirilmelidir.

Örneğin, eğer `chain-config-dir` varsayılan değere sahipse, `config.json` de `$HOME/.avalanchego/configs/chains/C/config.json` konumuna yerleştirilebilir.

Aşağıda açıklanan C-Chain yapılandırma seçenekleri.

Varsayılan C-Chain yapılandırması şudur:

```json
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "coreth-admin-api-dir": "",
  "net-api-enabled": true,
  "continuous-profiler-dir": "",
  "continuous-profiler-frequency": 900000000000,
  "continuous-profiler-max-files": 5,
  "rpc-gas-cap": 50000000,
  "rpc-tx-fee-cap": 100,
  "eth-api-enabled": true,
  "personal-api-enabled": true,
  "tx-pool-api-enabled": false,
  "debug-api-enabled": false,
  "web3-api-enabled": true,
  "preimages-enabled": false,
  "pruning-enabled": true,
  "snapshot-async": true,
  "snapshot-verification-enabled": false,
  "metrics-enabled": false,
  "metrics-expensive-enabled": false,
  "local-txs-enabled": false,
  "api-max-duration": 0, // Default to no maximum
  "ws-cpu-refill-rate": 0,
  "ws-cpu-max-stored": 0,
  "api-max-blocks-per-request": 0, // Default to no maximum
  "allow-unfinalized-queries": false,
  "allow-unprotected-txs": false,
  "keystore-directory": "",
  "keystore-external-signer": "",
  "keystore-insecure-unlock-allowed": false,
  "remote-tx-gossip-only-enabled": false,
  "tx-regossip-frequency": 60000000000,
  "tx-regossip-max-size": 15,
  "log-level": "debug"
}
```

Varsayılan değerler sadece verilen yapılandırmada belirtildiği takdirde override edilir.

**Continuous Profiling \(Sürekli Profilleme\)**

`continuous-profiler-dir` \(string\):

Sürekli profillemeyi etkinleştirir \(belirtilen aralıkta bir CPU/Memory/Lock profili yakalar\). Varsayılan olarak "" ayarlıdır. Boş olmayan bir string sağlanırsa, sürekli profillemeyi etkinleştirir ve profillerin yerleştirileceği dizini belirtir.

`continuous-profiler-frequency` \(süre\):

Sürekli profillemeyi çalıştıracak frekansı belirtir. Varsayılan olarak 15 dakikaya ayarlıdır.

`continuous-profiler-max-files` \(int\):

En eskiyi kaldırmadan önce saklanacak azami profil sayısını belirtir.

**API'ler**

`snowman-api-enabled` \(boolean\):

Snowman API'sini etkinleştirir. Varsayılan olarak false'a ayarlıdır.

`coreth-admin-api-enabled` \(boolean\):

Admin API'yi etkinleştirir. Varsayılan olarak false'a ayarlıdır.

`coreth-admin-api-dir` \(string\):

Admin API'nin CPU/Mem/Lock Profillerini depolamak için kullanacağı dizini belirtir. Varsayılan olarak "" ayarlıdır.

`net-api-enabled` \(boolean\):

`net_*` API'sini etkinleştirir. Varsayılan olarak true'ya ayarlıdır.

`eth-api-enabled` \(boolean\):

`eth_*` API'sini etkinleştirir. Varsayılan olarak true'ya ayarlıdır.

`personal-api-enabled` \(boolean\):

`personal_*` API'sini etkinleştirir. Varsayılan olarak false'a ayarlıdır.

`tx-pool-api-enabled` \(boolean\):

`txpool_*` API'sini etkinleştirir. Varsayılan olarak false'a ayarlıdır.

`debug-api-enabled` \(boolean\):

`debug_*` API'sini etkinleştirir. Varsayılan olarak false'a ayarlıdır.

`web3-api-enabled` \(boolean\):

`web3_*` API'sini etkinleştirir. Varsayılan olarak true'ya ayarlıdır.

`allow-unfinalized-queries` \(boolean\):

Kesinleştirilmemiş \(henüz kabul edilmemiş\) bloklar/işlemler için sorgulara izin verir. Varsayılan olarak false'a ayarlıdır.

**API Hız Sınırlaması**

`rpc-gas-cap` \(int\):

Bir RPC Çağrısı tarafından tüketilecek maksimum gazdır \(`eth_estimateGas` ve `eth_call` cinsinden kullanılır\). Varsayılan olarak 50.000.000'a ayarlıdır.

`rpc-tx-fee-cap` \(int\):

Çeşitli gönderme işlemlerinin global işlem ücretinin \(fiyat \* gaz limiti\) \(AVAX cinsinden hesaplanan\) üst limiti. Varsayılan olarak 100'e ayarlıdır.

`api-max-duration` \(süre\):

Maksimum API çağrısı süresi. API çağrıları bu süreyi aşarsa zaman aşımına uğrar. Varsayılan olarak 0'a ayarlıdır \(maksimum yoktur\).

`api-max-blocks-per-request` \(int\):

Her bir `getLogs` isteğine hizmet verecek maksimum blok sayısıdır. Varsayılan olarak 0'a ayarlıdır \(maksimum yoktur\).

`ws-cpu-refill-rate` \(süre\):

Refill \(yeniden doldurma\) hızı, saniyede tek bir bağlantı tahsis etmek için gerekli maksimum CPU süresini belirtir. Varsayılan olarak "no maximum \(0\)" \(maksimum yok\) değerine ayarlıdır.

`ws-cpu-max-stored` \(süre\):

Tek bir WS bağlantısı için depolanabilecek azami CPU süresini belirtir. Varsayılan olarak "no maximum \(0\)" \(maksimum yok\) değerine ayarlıdır.

**İşlem Havuzu**

`local-txs-enabled` \(boolean\):

Yerel işlem yönetimini etkinleştirir \(bu düğüm aracılığıyla gönderilen işlemlere öncelik verir\). Varsayılan olarak false'a ayarlıdır.

`allow-unprotected-txs` \(boolean\):

True ise, API'ler, tekrarlama saldırısına karşı korumalı \(EIP-155\) olmayan işlemlerin bu düğüm yoluyla yayınlanmasına izin verir. Varsayılan olarak false'a ayarlıdır.

`remote-tx-gossip-only-enabled` \(boolean\):

True ise, düğüm yalnızca bu düğüm yoluyla çıkarılan işlemlerin ağa yayınlanmasını önlemek için uzak işlemler gossip eder. Varsayılan olarak false'a ayarlıdır.

`tx-regossip-frequency` \(süre\):

Daha önce gossip yapılan bir işlemi yeniden gossip yapmaya çalışmamızdan önce geçmesi gereken süre. Varsayılan olarak 1 dakikaya ayarlıdır.

`tx-regossip-max-size` \(int\):

Aynı anda yeniden gossip edilecek işlem sayısı. Varsayılan olarak 15'e ayarlıdır.

**Metrikler**

`metrics-enabled` \(boolean\):

Metrikleri etkinleştirir. Varsayılan olarak false'a ayarlıdır.

`metrics-expensive-enabled` \(boolean\):

Pahalı metrikleri etkinleştirir. Varsayılan olarak false'a ayarlıdır.

**Veri Tabanı**

`pruning-enabled` \(boolean\):

True ise, miadını doldurmuş tarihsel verilerin veri tabanından budanması \(pruning\) fonksiyonu etkinleştirilir. Tarihsel köklerdeki tüm verilere erişmesi gereken düğümler için devre dışı bırakılmalıdır. Budama yalnızca yeni veriler için yapılır. Varsayılan olarak v1.4.9 sürümünde `false` olarak ve sonraki sürümlerde `true` olarak ayarlıdır.

`preimages-enabled` \(boolean\):

True ise, öngörüntüler \(preimages\) etkinleştirir. Varsayılan olarak false'a ayarlıdır.

**Snapshot'lar \(Anlık Durum Görüntüleri\)**

`snapshot-async` \(boolean\):

True ise, anlık görüntü oluşturmanın asenkron olarak yürütülmesine izin verir. Varsayılan olarak true'ya ayarlıdır.

`snapshot-verification-enabled` \(boolean\):

True ise, oluşturulduktan sonra komple snapshot'ı doğrular. Varsayılan olarak false'a ayarlıdır.

**Günlük Kayıt Düzeyi**

`log-level` \(string\):

Günlük düzeyini belirler. Bunlardan biri olmak zorundadır: `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"`, `"crit"`. `"debug"` varsayılandır.

**Keystore Ayarları**

`keystore-directory` \(string\):

Özel anahtarları içeren dizin. Bağıl bir yol olarak verilebilir. Boşsa, `coreth-keystore` ögesinde geçici bir dizin kullanır. Varsayılan olarak boş string'tir.

`keystore-external-signer` \(string\):

Bir clef tipi imzacı \(clef-type signer\) için harici bir URI belirler. Varsayılan olarak boş string'tir \(etkinleştirilmemiştir\).

`keystore-insecure-unlock-allowed` \(bool\):

True ise, kullanıcıların güvenli olmayan HTTP ortamında hesapların kilidini açmalarına imkan verir. Varsayılan olarak false'a ayarlıdır.

#### X-Chain Yapılandırmaları

X-Chain için bir yapılandırma belirlemek için, bir JSON config dosyası `{chain-config-dir}/X/config.json` konumuna \(veya yukarıda belirtildiği gibi başka bir geçerli konuma\) yerleştirilmelidir.

Örneğin, eğer `chain-config-dir` varsayılan değere sahipse, `config.json` de `$HOME/.avalanchego/configs/chains/X/config.json` konumuna yerleştirilebilir.

Bu, X-Chain'e aktarılacak bir yapılandırma belirlemenize imkan verir. Bu yapılandırma için varsayılan değerler şunlardır:

```javascript
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

Varsayılan değerler yalnızca config dosyasında açıkça belirtilmişse override edilir.

Parametreler aşağıdaki gibidir:

**İşlem İndeksleme**

`index-transactions` \(boolean\):

`true` olarak ayarlanırsa AVM işlem indekslemeyi etkinleştirir. Varsayılan değer `false` olarak ayarlıdır. `true` olarak ayarlandığında, AVM işlemleri ilgili `address` ve `assetID` ögelerine karşı indekslenir. Bu veri `avm.getAddressTxs` [API](../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-get-address-txs-api)'si yoluyla elde edilir.

`index-transactions` ögesi true olarak ayarlanırsa bu ögenin düğümün ömrü boyunca her zaman true olarak ayarlı olması gerektiğini lütfen aklınızda bulundurun. `true` olarak ayarlandıktan sonra `false` olarak ayarlanırsa, `index-allow-incomplete` ögesi de `true` olarak ayarlanmadıkça düğüm faaliyete başlamayı reddedecektir \(aşağıda bakınız\).

`index-allow-incomplete` \(boolean\):

Tamamlanmamış indekslere izin verir. Varsayılan değer `false` olarak ayarlıdır.

Veri tabanında X-Chain'e indekslenmiş veriler yoksa ve `index-transactions` ögesi `false` olarak ayarlanırsa bu yapılandırma değeri yok sayılır.

### Konsensüs Parametreleri

`--consensus-gossip-frequency` \(süre\):

Gossipleyen kabul edilmiş frontierler arasındaki süredir. `10s` varsayılandır.

`--consensus-shutdown-timeout` \(süre\):

Yanıt vermeyen bir zinciri öldürmeden önceki zaman aşımı süresidir. `5s` varsayılandır.

`--creation-tx-fee` \(int\):

Yeni durum yaratan işlemler için nAVAX cinsinden işlem ücreti. Varsayılan olarak işlem başına `1000000` nAVAX \(.001 AVAX\)'a ayarlıdır.

`--min-delegator-stake` \(int\):

Birincil Ağ'ın bir doğrulayıcısına delege edilebilecek nAVAX cinsinden minimum stake'dir.

Ana ağda varsayılan olarak `25000000000`\(25 AVAX\)'a ayarlıdır. Test Net'te varsayılan olarak `5000000` \(.005 AVAX\)'a ayarlıdır.

`--min-delegation-fee` \(int\):

Birincil Ağ'da yetkilendirme \(delegation\) için alınabilecek minimum yetkilendirme ücreti çarpı `10,000`'dır. `[0, 1000000]` aralığında olmalıdır. Mainnet'de varsayılan olarak `20000` \(%2\)'ye ayarlıdır.

`--min-stake-duration` \(süre\):

Minimum staking süresi. Mainnet'te Varsayılan olarak `336h` \(iki hafta\)'dır.

`--min-validator-stake` \(int\):

Birincil Ağ'ı doğrulamak için gerekli nAVAX cinsinden minimum stake'dir.

Ana ağda varsayılan olarak `2000000000000` \(2.000 AVAX\)'a ayarlıdır. Test Net'te varsayılan olarak `5000000` \(.005 AVAX\)'a ayarlıdır.

`--max-stake-duration` \(süre\):

Saat cinsinden maksimum staking süresi. Mainnet'te Varsayılan olarak `8760h` \(365 gün\)'e ayarlıdır.

`--max-validator-stake` \(int\):s

Birincil ağdaki bir doğrulayıcıya plase edilebilecek nAVAX cinsinden maksimum stake'dir. Mainnet'te varsayılan olarak `3000000000000000` \(3.000.000 AVAX\)'a ayarlıdır. Bu, hem doğrulayıcı tarafından sağlanan hem de yetkilendirenler tarafından doğrulayıcıya sağlanan stake'i kapsar.

`--stake-minting-period` \(süre\):

Staking fonksiyonunun saat cinsinden tüketim süresi. Mainnet'te Varsayılan olarak `8760h` \(365 gün\)'dür.

`--tx-fee` \(int\):

X-Chain'de bir işlemin geçerli olması ve P-Chain'deki içe aktarma/dışa aktarma işlemleri için yakılması gereken nAVAX miktarı. Bu parametrenin şu andaki yapısı ağ mutabakatı gerektirir. Bu değerin varsayılandan başka bir değere değiştirilmesi yalnızca özel ağlarda yapılmalıdır. Varsayılan olarak işlem başına `1,000,000` nAVAX'a ayarlıdır.

`--uptime-requirement` \(float\):

Bir doğrulayıcının ödüller almak için çevrimiçi olması gereken zaman kesri. `0.8` varsayılandır.

#### Snow Parametreleri

`--snow-avalanche-batch-size` \(int\):

Snow konsensüs protokolünün DAG implementasyonları, bir verteksin içermesi öngörülen işlemlerin sayısı olarak `b`'yi belirler. Artan `b` teorik olarak iş çıkarma yeteneğini \(throughput\) arttıracak, diğer yandan da gecikme süresini \(latency\) arttıracaktır. Düğüm bir batch'ı toplamak için en fazla 1 saniye bekleyecek ve ardından tüm batch'ı bir seferde gönderecektir. Bu değer en az `1` olmalıdır. `30` varsayılandır.

`--snow-avalanche-num-parents` \(int\):

Snow konsensüs protokolünün DAG implementasyonları, bir verteksin içermesi öngörülen ataların \(parent\) sayısı olarak `p`'yi belirler. Artan `p`, ağ sorgularının sönümlendirilmesini \(amortization\) iyileştirecektir. Bununla beraber, grafiğin bağlantılanabilirliği \(connectivity\) arttırılarak, grafik traversal'lerinin karmaşıklığı arttırılır. Bu değer en az `2` olmalıdır. `5` varsayılandır.

`--snow-concurrent-repolls` \(int\):

Snow konsensüs protokolü, ağ kullanımının düşük olduğu zamanlarda gönderilen işlemlerin yeniden yoklanmasını zorunlu kılar. Bu parametre, bu bekleyen işlemlerin kesinleştirilmesinde müşterinin ne kadar agresif olacağının belirlenmesine imkan verir. Bu değer yalnızca Snow konsensüs protokolünün ödünleşmeleri \(tradeoff\) dikkatli bir şekilde değerlendirildikten sonra değiştirilmelidir. Bu değer en az `1` ve en fazla `--snow-rogue-commit-threshold` olmalıdır. `4` varsayılandır.

`--snow-sample-size` \(int\):

Snow konsensüs protokolü, her bir ağ yoklaması sırasında örneklenen doğrulayıcıların sayısı olarak `k`'yı belirler. Bu parametre, konsensüs için kullanılan `k` değerini belirlemesine imkan verir. Bu değer yalnızca Snow konsensüs protokolünün ödünleşmeleri \(tradeoff\) dikkatli bir şekilde değerlendirildikten sonra değiştirilmelidir. Bu değer en az `1` olmalıdır. `20` varsayılandır.

`--snow-quorum-size` \(int\):

Snow konsensüs protokolü, her bir ağ yoklaması sırasında, bir işlemin güven düzeyinin yükseltilmesi amacıyla o işlemi tercih etmesi gereken doğrulayıcıların sayısı olarak `alpha`'yı belirler. Bu parametre, konsensüs için kullanılan `alpha` değerini belirlememize imkan verir. Bu değer yalnızca Snow konsensüs protokolünün ödünleşmeleri \(tradeoff\) dikkatli bir şekilde değerlendirildikten sonra değiştirilmelidir. Bu değer `k/2`'den büyük olmalıdır. `14` varsayılandır.

`--snow-virtuous-commit-threshold` \(int\):

Snow konsensüs protokolü, dürüst bir işlemin kabul edilmek için güven düzeyini yükseltmek zorunda olduğu art arda yoklamaların sayısı olarak `beta1`'i belirler. Bu parametre, konsensüs için kullanılan `beta1` değerini belirlememize imkan verir. Bu değer yalnızca Snow konsensüs protokolünün ödünleşmeleri \(tradeoff\) dikkatli bir şekilde değerlendirildikten sonra değiştirilmelidir. Bu değer en az `1` olmalıdır. `15` varsayılandır.

`--snow-rogue-commit-threshold` \(int\):

Snow konsensüs protokolü, dürüst olmayan bir işlemin kabul edilmek için güven düzeyini yükseltmek zorunda olduğu art arda yoklamaların sayısı olarak `beta2`'yi belirler. Bu parametre, konsensüs için kullanılan `beta2` değerini belirlememize imkan verir. Bu değer yalnızca Snow konsensüs protokolünün ödünleşmeleri \(tradeoff\) dikkatli bir şekilde değerlendirildikten sonra değiştirilmelidir. Bu değer en az `beta1` olmalıdır. `30` varsayılandır.

### Continuous Profiling \(Sürekli Profilleme\)

Düğümünüzü bellek/CPU profillerini sürekli çalıştıracak ve en yenilerini kaydedecek şekilde yapılandırabilirsiniz. `--profile-continuous-enabled` olarak ayarlanırsa, sürekli bellek/CPU profillemesi etkinleştirilir.

`--profile-continuous-enabled` \(boolean\):

Uygulamanın sürekli olarak performans profilleri üretip üretmeyeceğini belirler. Varsayılan olarak false'a ayarlıdır \(etkinleştirilmemiştir\).

`--profile-dir` \(string\):

Profilleme etkinleştirilirse, düğüm bellek/CPU profillerini sürekli çalıştırır ve bunları bu dizine koyar. Varsayılan `$HOME/.avalanchego/profiles/` olarak ayarlanmıştır.

`--profile-continuous-freq` \(süre\):

Yeni bir CPU/bellek profilinin ne sıklıkla oluşturulduğudur. `15m` varsayılandır.

`--profile-continuous-max-files` \(int\):

Saklanacak maksimum CPU/bellek profilleri dosyalarının sayısıdır. Varsayılan olarak 5'e ayarlanmıştır.

### Veri Tabanı Yapılandırması

`--db-config-file` \(string\):

Veri tabanı yapılandırma dosyasının yolu. `--config-file-content` belirtilirse yok sayılır.

`--db-config-file-content` \(string\):

`--db-config-file`'ye alternatif olarak, base64 ile kodlanmış veri tabanı yapılandırma içeriğinin belirlenmesine izin verir.

#### LevelDB Yapılandırması

Bir LevelDB yapılandırma dosyası JSON olmalıdır ve bu anahtarlara sahip olabilir. Verilmeyen tüm anahtarlar varsayılan değeri alır.

```
{
	// BlockSize is the minimum uncompressed size in bytes of each 'sorted
	// table' block.
	"blockCacheCapacity": int
	// BlockSize is the minimum uncompressed size in bytes of each 'sorted
	// table' block.
	"blockSize": int
	// CompactionExpandLimitFactor limits compaction size after expanded.  This
	// will be multiplied by table size limit at compaction target level.
	"compactionExpandLimitFactor": int
	// CompactionGPOverlapsFactor limits overlaps in grandparent (Level + 2)
	// that a single 'sorted table' generates.  This will be multiplied by
	// table size limit at grandparent level.
	"compactionGPOverlapsFactor": int
	// CompactionL0Trigger defines number of 'sorted table' at level-0 that will
	// trigger compaction.
	"compactionL0Trigger": int
	// CompactionSourceLimitFactor limits compaction source size. This doesn't
	// apply to level-0.  This will be multiplied by table size limit at
	// compaction target level.
	"compactionSourceLimitFactor": int
	// CompactionTableSize limits size of 'sorted table' that compaction
	// generates.  The limits for each level will be calculated as:
	//   CompactionTableSize * (CompactionTableSizeMultiplier ^ Level)
	// The multiplier for each level can also fine-tuned using
	// CompactionTableSizeMultiplierPerLevel.
	"compactionTableSize": int
	// CompactionTableSizeMultiplier defines multiplier for CompactionTableSize.
	"compactionTableSizeMultiplier": float
	"compactionTableSizeMultiplierPerLevel": []float
	// CompactionTotalSizeMultiplier defines multiplier for CompactionTotalSize.
	"compactionTotalSizeMultiplier": float64
	// OpenFilesCacheCapacity defines the capacity of the open files caching.
	"openFilesCacheCapacity": int
	// There are two buffers of size WriteBuffer used.
	"writeBuffer": int
	"filterBitsPerKey": int
}
```

#### RocksDB Yapılandırma Dosyası

Özel yapılandırma henüz RocksDB için desteklenmemektedir.

### Sağlık

`--health-check-frequency` \(süre\):

Sağlık kontrolü bu sıklıkla çalışır. `30s` varsayılandır.

`--health-check-averager-halflife` \(süre\):

Sağlık kontrollerinde \(örneğin başarısız mesajların oranının ölçülmesi\) kullanılan ortalama hesaplayıcıların \(averagers\) yarılanma ömrü. Daha büyük değer --> ortalamaların daha az oynak hesaplanması. `10s` varsayılandır.

### network

`--network-allow-private-ips` \(bool\):

Düğümün eşleri özel IP'lerle bağlamasına izin verir. `true` varsayılandır.

`--network-compression-enabled` \(bool\):

True ise, bant genişliği kullanımını azaltmak için eşlere gönderilen belirli mesajları sıkıştırın.

`--network-initial-timeout` \(süre\):

Uyarlanır zaman aşımı yöneticisinin nanosaniye cinsinden ilk zaman aşımı değeridir. `5s` varsayılandır.

`--network-initial-reconnect-delay` \(süre\):

Bir eşi yeniden bağlamaya çalışmadan önce ilk gecikme süresi beklenmelidir. `1s` varsayılandır.

`--network-max-reconnect-delay` \(süre\):

Bir eşi yeniden bağlamaya çalışmadan önce maksimum gecikme süresi beklenmelidir. `1h` varsayılandır.

`--network-minimum-timeout` \(süre\):

Uyarlanır zaman aşımı yöneticisinin nanosaniye cinsinden minimum zaman aşımı değeridir. `2s` varsayılandır.

`--network-maximum-timeout` \(süre\):

Uyarlanır zaman aşımı yöneticisinin nanosaniye cinsinden maksimum zaman aşımı değeridir. `10s` varsayılandır.

`--network-timeout-halflife` \(süre\):

Ortalama ağ gecikme süresi \(latency\) hesaplanırken kullanılan yarılanma ömrü. Daha büyük değer --> daha az oynak ağ gecikmesi hesaplaması. `5m` varsayılandır.

`--network-timeout-coefficient` \(süre\):

Eşlere gönderilen istekler [`network-timeout-coefficient`] \(ağ zaman aşımı katsayısı\) \* [ortalama istek gecikme süresi] kadar süre sonra zaman aşımına uğrar. `2` varsayılandır.

`--network-get-version-timeout` \(süre\):

Handshake'te eşlerden GetVersion yanıtlarını beklemede zaman aşımı. `10s` varsayılandır.

`--network-read-handshake-timeout` \(süre\):

Handshake mesajlarını okumak için zaman aşımı değeridir. `15s` varsayılandır.

`--network-ping-timeout` \(süre\):

Bir eşle Ping-Pong için zaman aşımı değeridir. `30s` varsayılandır.

`--network-ping-frequency` \(süre\):

Diğer eşlere ping atma sıklığı. `22.5s` varsayılandır.

`--network-health-min-conn-peers` \(uint\):

Düğüm, bu sayıdan daha az eşe bağlanırsa sağlıksızlık bildirir. `1` varsayılandır.

`--network-health-max-time-since-msg-received` \(süre\):

Düğüm, bu süre boyunca bir mesaj almadıysa sağlıksız durum bildirir. `1m` varsayılandır.

`--network-health-max-time-since-no-requests` \(süre\):

Düğüm, bu süre boyunca bir mesaj almadıysa sağlıksız durum bildirir. `1m` varsayılandır.

`--network-health-max-portion-send-queue-full` \(float\):

Düğüm, gönderim kuyruğu bundan daha fazla doluysa sağlıksızlık bildirir. [0,1] cinsinden olmalıdır. `0.9` varsayılandır.

`--network-health-max-send-fail-rate` \(float\):

Düğüm, mesaj gönderimlerinin bundan daha fazla kısmı başarısız olursa sağlıksızlık bildirir. [0,1] cinsinden olmalıdır. `0.25` varsayılandır.

`--network-max-clock-difference` \(süre\):

Bu düğüm ve eşler arasında izin verilen maksimum saat farkı değeri. `1m` varsayılandır.

`--network-require-validator-to-connect` \(bool\):

True ise, bu düğüm başka bir düğümle bağlantıyı yalnızca şu durumlarda sürdürür: bu düğüm bir doğrulayıcı ise, diğer düğüm bir doğrulayıcı ise ya da diğer düğüm bir beacon ise.

`--outbound-connection-timeout` \(süre\):

Bir eşi ararken zaman aşımı.

#### Mesaj Hızını Sınırlama

Bu bayraklar gelen ve giden mesajların hız sınırlamasını yönetir. Hız sınırlaması ve aşağıdaki bayraklar hakkında daha fazla bilgi için AvalancheGo'daki `throttling` paketine bakın.

`--throttler-inbound-bandwidth-refill-rate` \(uint\):

Saniyede bayt cinsinden, bir eşin maksimum ortalama gelen bant genişliği kullanımı. Arayüzü gör`throttling.BandwidthThrottler`. Varsayılan olarak `512`'e ayarlıdır.

`--throttler-inbound-bandwidth-max-burst-size` \(uint\):

Bir düğümün bir anda kullanabileceği maksimum gelen bant genişliği. Arayüzü gör`throttling.BandwidthThrottler`. Varsayılan olarak `2 MiB`'e ayarlıdır.

`--throttler-inbound-at-large-alloc-size` \(uint\):

Gelen mesaj kısma aracında \(throttler\) bir bütün olarak yapılan tahsisin bayt cinsinden boyutu. Varsayılan olarak `6291456` \(6 MiB\)'e ayarlıdır.

`--throttler-inbound-validator-alloc-size` \(uint\):

Gelen mesaj kısma aracındaki doğrulayıcı tahsisinin bayt cinsinden boyutu. Varsayılan olarak `33554432` \(32 MiB\)'e ayarlıdır.

`--throttler-inbound-node-max-at-large-bytes` \(uint\):

Bir düğümün gelen mesaj kısma aracında bir bütün olarak yapılan tahsisten alabileceği maksimum bayt sayısıdır. Varsayılan olarak `2097152` \(2 MiB\)'e ayarlıdır.

`--throttler-inbound-node-max-processing-msgs` \(uint\):

Düğüm, bir eşten gelen bu kadar mesajı işlerken o eşten gelen mesajları okumayı durduracaktır. Bundan daha az sayıda mesajı işlerken o eşten gelen mesajları okumaya devam edecektir. `1024` varsayılandır.

`--throttler-outbound-at-large-alloc-size` \(uint\):

Giden ileti kısıtlama aracında bir bütün olarak yapılan tahsisin bayt cinsinden boyutudur. Varsayılan olarak `6291456` \(6 MiB\)'e ayarlıdır.

`--throttler-outbound-validator-alloc-size` \(uint\):

Giden mesaj kısma aracındaki doğrulayıcı tahsisinin bayt cinsinden boyutu. Varsayılan olarak `33554432` \(32 MiB\)'e ayarlıdır.

`--throttler-outbound-node-max-at-large-bytes` \(uint\):

Bir düğümün giden mesaj kısma aracında bir bütün olarak yapılan tahsisten alabileceği maksimum bayt sayısıdır. Varsayılan olarak `2097152` \(2 MiB\)'e ayarlıdır.
#### Bağlantı Hızını Sınırlama

`--inbound-connection-throttling-cooldown` \(süre\):

Düğüm, belli bir IP'den çıkan bir gelen bağlantısını bu süre içinde en fazla bir kez upgrade edecektir. Varsayılan `10s` olarak ayarlıdır. 0 veya negatif ise, upgrade edip etmemeye karar verirken son upgrade'in zaman bakımından yakınlığını dikkate almayacaktır.

`--inbound-connection-throttling-max-conns-per-sec` \(uint\):

Düğüm, saniyede en fazla bu kadar gelen bağlantıyı kabul edecektir. `512` varsayılandır.

`--inbound-connection-throttling-max-recent` \(uint\):

Kullanımdan kaldırılacağı ilan edilmiştir. AvalancheGo v1.6.0 sürümü itibarıyla yok sayılmıştır.

`--outbound-connection-throttling-rps` \(uint\):

Düğüm, saniyede en fazla bu sayıda giden eşe bağlanma denemesi yapar. `50` varsayılandır.

#### Eş Listesi Gossiping'i

Düğümler eşleri birbirine gossip eder, böylece her düğüm güncel bir eş listesine sahip olur. Bir düğüm `--network-peer-list-size` eşlerini, o düğümün eşlerinin `--network-peer-list-gossip-size` ögesine `--network-peer-list-gossip-frequency` parametresinde belirtilen sıklıkta gossip eder.

`--network-peer-list-gossip-frequency` \(süre\):

`1m` varsayılandır.

`--network-peer-list-gossip-size` \(int\):

`50` varsayılandır.

`--network-peer-list-size` \(int\):

`20` varsayılandır.

`--network-peer-list-staker-gossip-fraction` \(uint\):

Gossip edilen her `network-peer-list-staker-gossip-fraction` eş listesi mesajından 1'i bir doğrulayıcıya gönderilecektir.

`2` varsayılandır.

### Plugin Modu

`--plugin-mode-enabled` \(bool\):

True ise, düğümü bir [plugin](https://github.com/hashicorp/go-plugin) olarak çalıştırır. `false` varsayılandır.

### Subnet'ler

#### Beyaz Liste

`--whitelisted-subnets` \(string\):

Eklenmesi halinde bu düğümün doğrulayacağı subnet'lerin virgülle ayrılmış listesidir. Varsayılan olarak boştur \(yalnızca Birincil Ağ'ı doğrulayacaktır\).

#### Subnet Yapılandırmaları

Subnet'ler için parametreler sağlamak mümkündür. Buradaki parametreler belirtilen subnet'lerdeki tüm zincirler için geçerlidir. Parametreler `--subnet-config-dir` altında bir `{subnetID}.json` yapılandırma dosyası ile belirtilmelidir. AvalancheGo, `--whitelisted-subnet` parametresinde belirtilen subnet'ler için yapılandırmaları yükler.

`--subnet-config-dir` \(string\):

Yukarıda açıklandığı gibi, subnet yapılandırma parametrelerini içeren dizini belirler. Varsayılan `$HOME/.avalanchego/configs/subnets` olarak ayarlıdır. Bayrak açıkça ayarlanmışsa, belirtilen klasör bulunmalıdır; aksi takdirde AvalancheGo bir hatayla karşılaşıp kapanacaktır. `--subnet-config-content` belirtilirse bu bayrak göz ardı edilir.

Örneğin: `p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6` kimliğine sahip bir subnet'imiz var diyelim. Varsayılan `subnet-config-dir` altında `$HOME/.avalanchego/configs/subnets/p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6.json` konumunda bir yapılandırma dosyası oluşturabiliriz. Örnek bir yapılandırma dosyası şöyledir:

```json
{
  "validatorOnly": false,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  }
}
```

`--subnet-config-content` \(string\):

`--subnet-config-dir`'e alternatif olarak, subnetler için base64 ile kodlanmış parametrelerin belirlenmesine izin verir.

**Yalnızca Doğrulayıcı**

`validatorOnly` \(bool\):

Eğer `true` ise, bu düğüm P2P mesajları yoluyla subnet blok zincir içeriklerini doğrulayıcı olmayanlara göstermez. Varsayılan `false` olarak ayarlıdır. Daha fazla bilgi için [buraya](../tutorials/platform/create-a-subnet.md#private-subnets) bakın.

**Konsensüs Parametreleri**

Subnet yapılandırmaları yeni konsensüs parametrelerinin yüklenmesini destekler. JSON anahtarları, kendileriyle eşleşen  `CLI` anahtarlarından farklıdır.

| CLI Anahtarı | JSON Anahtarı |
| :--- | :--- |
| --snow-sample-size | k |
| --snow-quorum-size  | alpha  |
| --snow-virtuous-commit-threshold | betaVirtuous |
| --snow-rogue-commit-threshold | betaRogue |
| --snow-concurrent-repolls | concurrentRepolls |
| --snow-optimal-processing | optimalProcessing |
| --snow-max-processing | maxOutstandingItems |
| ---snow-max-time-processing | maxItemProcessingTime |
| ---snow-avalanche-batch-size | batchSize |
| --snow-avalanche-num-parents | parentSize |

Bir subnet'in konsensüs parametreleri, varsayılan olarak Birincil Ağ için kullanılan değerleri alır; bu değerler [burada](command-line-interface.md#snow-parameters) verilmektedir.

### Sanal Makine \(VM\) Yapılandırmaları {#vm-configs}

`--vm-aliases-file` \(string\):

Sanal Makine kimliklerinin alias'larını belirleyen JSON dosyasının yoludur. Varsayılan `~/.avalanchego/configs/vms/aliases.json` olarak ayarlıdır. `--vm-aliases-file-content` belirtilirse bu bayrak göz ardı edilir. Örnek içerik:

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

Yukarıdaki örnekte, kimliği `"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"` olan VM'ye `"timestampvm"` ve `"timerpc"` alias'ları verilir.

`--vm-aliases-file-content` \(string\):

`--vm-aliases-file`'ye alternatif olarak, Sanal Makine Kimlikleri için base64 ile kodlanmış alias'ların belirlenmesine izin verir.

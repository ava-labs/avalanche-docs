# Komut Satırı Arayüzü

Aşağıdaki argümanlarla bir düğümün yapılandırmasını belirtebilirsiniz.

## Tartışmalar

### Dosya Yapılandırma

`--config-file`- Evet.

Bu düğümün yapılandırmasını belirleyen bir JSON dosyasına giden yol. Komut satırı argümanları yapılandırma dosyasında belirlenen argümanları geçersiz kılacaktır.

Örnek JSON yapılandırma dosyası:

```javascript
{
    "log-level": "debug"
}
```

### API'ler

`--api-admin-enabled`\(boolean\):

Eğer bu `false`düğüm, yönetici API'yi ortaya çıkarmaz. `false`Defaults Daha fazla bilgi için [buraya](../avalanchego-apis/admin-api.md) bak.

`--api-auth-required`\(boolean\):

Eğer `true`ayarlanırsa, API çağrıları izin işaretine ihtiyaç duyar. `false`Defaults Daha fazla bilgi için [buraya](../avalanchego-apis/auth-api.md) bak.

`--api-auth-password`- Evet.

Parola oluşturma/geri alma yetkisi işaretleri oluşturmak için gerekli Eğer belirtilmek `--api-auth-required=true`zorundaysa, aksi takdirde görmezden gelinir. Daha fazla bilgi için [buraya](../avalanchego-apis/auth-api.md) bak.

`--api-health-enabled`\(boolean\):

Eğer bu `true`düğüm, sağlık API'sini ortaya çıkaracak. `true`Defaults Daha fazla bilgi için [buraya](../avalanchego-apis/health-api.md) bak.

`--index-enabled`\(boolean\):

Eğer bu `false`düğüm, indexer not ve Endeks API mevcut olmayacak. `false`Defaults Daha fazla bilgi için [buraya](../avalanchego-apis/index-api.md) bak.

`--api-info-enabled`\(boolean\):

Eğer bu `true`düğüm, Bilgi API'yi ortaya çıkaracak. `true`Defaults Daha fazla bilgi için [buraya](../avalanchego-apis/info-api.md) bak.

`--api-ipcs-enabled`\(boolean\):

Eğer bu `true`düğüm, IPCs API'yi ortaya çıkaracak. `false`Defaults Daha fazla bilgi için [buraya](../avalanchego-apis/ipc-api.md) bak.

`--api-keystore-enabled`\(boolean\):

Eğer bu `false`düğüm, Keystore API'yi ortaya çıkarmaz. `true`Defaults Daha fazla bilgi için [buraya](../avalanchego-apis/keystore-api.md) bak.

`--api-metrics-enabled`\(boolean\):

Eğer bu `false`düğüm, metrik API'yi ortaya çıkarmaz. `true`Defaults Daha fazla bilgi için [buraya](../avalanchego-apis/metrics-api.md) bak.

### İddialar

`--assertions-enabled`\(boolean\):

Bu `true`işlemler yapıldığında kod tabanı boyunca çalışma zamanında uygulanacaktır. Bu hata hataları için kullanılmak üzere çünkü daha özel bir hata mesajı alabiliriz. `true`Defaults

### - Çizme takıntısı

`--bootstrap-beacon-connection-timeout`\(süre\):

Kayıplar işaretlerine bağlanmaya çalışırken zaman aşımı. `1m`Defaults

`--bootstrap-ids`- Evet.

Bootstrap kimlikleri bir doğrulayıcı kimlik dizisidir. Bu kimlikler kaydırma eylemlerini doğrulamak için kullanılacak. Bu alanın bir örneği `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`olabilir. Varsayılan değer ağ kimliğine bağlıdır.

`--bootstrap-ips`- Evet.

Bootstrap IPs, IPv4:port çiftlerinin bir dizisidir. Bu IP Adresleri mevcut Avalanche durumunu bağlamak için kullanılacaktır. Bu alanın bir örneği `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`olabilir. Varsayılan değer ağ kimliğine bağlıdır.

`--bootstrap-retry-enabled`\(boolean\):

Eğer doğruysa, başarısız olursa kayma işlemi tekrar deneyecektir.

`--bootstrap-retry-max-attempts`\(uint\):

Başarısızlıktan sonra kaymayı tekrar denemek için çok sayı.

### Veritaban

`--db-dir`\(ip, dosya yolu\):

Veritabanının devam ettiği dizini belirler. `"$HOME/.avalanchego/db"`Defaults

`--db-type`- Evet.

Kullanılacak veritabanı türünü belirler. `leveldb``rocksdb``memdb`Bir tanesi hafızası olmayan bir `memdb`veritabanıdır.

Dikkat edin ki, `leveldb`düğüm, koşarken devam eden verileri `rocksdb`okuyamaz, ve ters çevir.

**about ilgili iki önemli not: Birincisi, **RocksDB tüm bilgisayarlarda çalışmaz. İkincisi, RocksDB varsayılan olarak inşa edilmemiş ve halka açık şekilde serbest bırakılan ikili içeriğe dahil edilmemiştir. RocksDB ile AvalancheGo inşa etmek için `export ROCKSDBALLOWED=1`terminalinde koş ve sonra da`scripts/build.sh` Bunu kullanmadan önce `--db-type=rocksdb`yapmalısın.

### Genesis

`--genesis`- Evet.

Kullanılacak genez verilerini içeren bir JSON dosyasına giden yol. Standart ağları çalıştırırken \(Mainnet, Testnet\) görmezden gelindi. Verilmezse, varsayılan gen verileri kullanır. Genesis verisinin JSON temsili için bir örnek olarak [buraya](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16) bakınız.

### HTTP Sunucusu

`--http-host`- Evet.

HTTP APIs dinlediği adres. `127.0.0.1`Defaults Bu demek oluyor ki, düğümünüz sadece aynı makineden yapılan API çağrılarını halledebilir. Diğer makinelerden API çağrılarına izin vermek için, `--http-host=`kullanın.

`--http-port`\(int\):

Her düğüm, düğüm, ve Avalanche ağıyla etkileşim için API'leri sağlayan bir HTTP sunucusu çalıştırır. Bu argüman HTTP sunucusunun dinleyeceği portu belirler. Varsayılan `9650`değerdir.

`--http-tls-cert-file`\(ip, dosya yolu\):

Bu argüman HTTPS sunucusu için düğümle kullanılan TLS sertifikasının yerini belirler. Bu durum ne zaman `--http-tls-enabled=true`belirtilmeli. Varsayılan değeri yok.

`--http-tls-enabled`\(boolean\):

Eğer bu bayrak `true`ayarlanırsa, sunucuya to kullanmak için yükseltmeye çalışacak. `false`Defaults

`--http-tls-key-file`\(ip, dosya yolu\):

Bu argüman HTTPS sunucusu için düğümle kullanılan TLS özel anahtarının konumunu belirler. Bu durum ne zaman `--http-tls-enabled=true`belirtilmeli. Varsayılan değeri yok.

### IPCS

`--ipcs-chain-ids`\(ip\)

Bağlanacak zincir kimlikleri listesi ayrılmış. Varsayılan değeri yok.

`--ipcs-path`\(ip\)

Dizin \(Unix\) veya IPC sockets. için boru directory \(Windows\) olarak adlandırılır. to Defaults

### Dosya Descriptor Sınırı

`--fd-limit`\(int\)

Bu işlem dosyası tanımlayıcısı sınırını en azından bu değere yükseltme girişimi. Öntanımlı`32768`

### Kaydım

`--log-level`\(ip, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

Günlük seviyesi hangi olayların günlüğe gireceğini belirler. En yüksek öncelikten en düşük seviyeye kadar 7 farklı seviye vardır.

* `Off`- Hiç bir kütük bu seviyeye sahip değildir.
* `Fatal`- not ölümcül hatalar.
* `Error`Bu hatalar sayesinde bu hatalar ortaya çıkabildi.
* `Warn`- Bu uyarı, fevkalade bir byzantine düğümünün veya potansiyel bir gelecek hatasının göstergesi olabilir.
* `Info`: düğüm durumu güncellemelerinin yararlı tanımları.
* `Debug`Hata kaydı koddaki olası hataları anlamaya çalışırken kullanışlıdır. Normal kullanım için istenen daha fazla bilgi gösterilecektir.
* `Verbo`Bu düğümün işlediği çok sayıda bilgiyi takip eder. Bu durum son derece düşük seviye protokol analizi için veri içeriği ve ikili atımları içerir.

Bir kütük seviyesi notası belirtirken, belirtilen öncelikli veya daha yüksek olan tüm günlüklerin izleneceği belirtilir. `Info`Defaults

`--log-display-level`\(ip, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

Görünüm seviyesi ekranda hangi olayları göstereceğini belirler. Eğer boş kalırsa, sağlanan değer için varsayılan olarak `--log-level`varsayılır.

`--log-display-highlight`\(ip, `{auto, plain, colors}`\):

Renk/vurgulama görüntüleme günlüklerinin olup olmadığı Çıkış terminal olduğunda öntanımlı noktalar belirsiz. Aksi takdirde, bir tanesi olmalı.`{auto, plain, colors}`

`--log-dir`\(ip, dosya yolu\):

Sistem kayıtlarının tutulduğu dizini belirler. `"$HOME/.avalanchego/logs"`Defaults

### Ağ Kimliği

`--network-id`- Evet.

Düğünün bağlanması gereken ağın kimliği. Bunlardan biri olabilir:

* `--network-id=mainnet`-> Ana ağa Bağ \(öntanımlı\).
* `--network-id=fuji`-> Fuji test ağına bağlan.
* `--network-id=testnet`- > Şu anki test ağına bağlan. \(Şu anda Fuji'den bahsediyoruz.\)
* `--network-id=local`-> Yerel bir test ağına bağlan.
* `--network-id=network-{id}``id`- > Verilen Kimlik ile ağa bağlan. Menzil içinde olmalı.`[0, 2^32)`

### & IP

`--public-ip`- Evet.

Doğrulayıcılar halka açık IP adreslerini bilmeliler, böylece diğer düğümlerin onlarla nasıl bağlantı kuracaklarını bilmelerini sağlarlar. Eğer bu argüman sağlanmazsa, düğüm, düğümün halka açık IP'sini almak için NAT traversal gerçekleştirmeye çalışacak. Yerel bir ağ oluşturmak `127.0.0.1`için ayarlanmalı. Eğer kurulmadıysa, NAT traversal. kullanarak IP öğrenme çabaları vardır.

`--dynamic-public-ip`- Evet.

`opendns`Eğer param mevcut olduğu geçerli değerler: `ifconfigco`veya`ifconfigme` Bu çok `--public-ip`zor. Eğer kurulursa, uzaktan hizmet için her bir `--dynamic-update-duration`ankete ve düğümün halka açık IP adresini güncelleyecektir.

`--dynamic-update-duration`\(süre\):

Anketler arasında bir süre, ya `--dynamic-public-ip`da NAT travesti için. Önerilen minimum 1 dakika. `5m`Defaults

### İmza Onaylaması

`--signature-verification-enabled`\(boolean\):

İmza doğrulanmasını etkinleştirir. `false`İmzaların devre dışı bırakılmasına izin veren in imzalar kontrol edilmeyecektir. `true`Defaults

### - Takılıyor

`--staking-port`- Evet.

İzleme sunucusunun Avalanche ağına dış bağlantısını sağlayan port. `9651`Defaults

`--staking-enabled`\(boolean\):

Avalanche Sybil direnişi olarak Stake Kanıtı \(PoS\) kullanır ve ağa saldırmak için yasaklı bir şekilde pahalıya patlar. Eğer yanlış ise, sybil direniş engellenir ve tüm akrabalar uzlaşma sırasında ezilecektir. `true`Defaults

`--staking-tls-cert-file`\(ip, dosya yolu\):

Avalanche düğümleri güvenli bir şekilde bağlamak için iki yönlü doğrulanmış TLS bağlantılarını kullanır. Bu argüman düğümler tarafından kullanılan TLS sertifikasının yerini belirler. Öntanımlı olarak, düğüm, TLS sertifikasının hazır olmasını `$HOME/.avalanchego/staking/staker.crt`bekler.

`--staking-tls-key-file`\(ip, dosya yolu\):

Avalanche düğümleri güvenli bir şekilde bağlamak için iki yönlü doğrulanmış TLS bağlantılarını kullanır. Bu argüman düğüm, kullanılan TLS özel anahtarının yerini belirler. Öntanımlı olarak, düğüm, TLS özel anahtarının açık olmasını `$HOME/.avalanchego/staking/staker.key`bekler.

`--staking-disabled-weight`\(int\):

Her bir akraba engelli olduğunda sağlama için ağırlık. `1`Defaults

### Sürüm

`--version`\(boolean\)

Eğer bu `true`ise, sürümü basıp bırak. `false`Defaults

## Gelişmiş Seçenekler

Aşağıdaki seçenekler bir düğümün doğruluğunu etkileyebilir. Sadece güç kullanıcıları bunları değiştirebilir.

### Benchlist

`--benchlist-duration`\(süre\):

Bir akran daha sonra bir süre için yedek listeye `--benchlist-fail-threshold`alınır. `1h`Defaults

`--benchlist-fail-threshold`\(int\):

Bir düğmeye bağlamadan önce ardışık sayıda başarısız soru Number sorgu başarısız olacaksa\) `10`Defaults

`--benchlist-peer-summary-enabled`\(boolean\):

Sorgu gecikme metriklerini etkinleştirir. `false`Defaults

`--benchlist-min-failing-duration`\(süre\):

Bir akraba için en az zaman iletisi akranı kaldırılmadan önce bozulmalıdır. `5m`Defaults

### Dizin Yapılandır

`--build-dir`- Evet.

AvalancheGo alt ikili ve eklenti ikililerini nerede bulacağını belirler. İkili AvalancheGo ikili yolunun önünü açıyor. Bu dizinin yapısı şu şekilde olmalı:

```text
build-dir  
|_avalanchego-latest  
    |_avalanchego-process (the binary from compiling the app directory)  
    |_plugins  
      |_evm  
      |_other_plugin
|_avalanchego-preupgrade  
    |_avalanchego-process (the binary from compiling the app directory)  
    |_plugins  
      |_evm  
      |_other_plugin
```

### Zincir Yapılandırmaları

Bazı zincirler \(şu anda sadece C-Chain\) düğüm operatörünün özel bir yapılandırma sağlamasına izin verir. AvalancheGo dosyalardan zincir yapılandırmalarını okuyabilir ve başlatma üzerine ilgili zincirlere aktarabilir.

AvalancheGo belirtilen dizinde bu dosyaları `--chain-config-dir`arar. Bu dizin, isimleri zincir kimlikleri veya zincir takma isimleri olan alt dizinlere sahip olabilir. Her alt dizin, dizin adı içinde belirtilmiş zincir için yapılandırma içerir. Her alt `config`dizin, karşılık gelen zincir başlatıldığında değeri geçilen bir dosya içermelidir. `[chain-config-dir-goes-here]/C/config.json`Örneğin, C-Chain için yapılandırma şu olmalıdır:

Bu dosyaların sahip olması gereken uzantı, ve bu dosyaların içeriği VM-dependent. `config.txt`Örneğin, bazı zincirler bazılarının beklentilerini karşılayabilir.`config.json` `config.txt`Eğer birden fazla dosya aynı adı ama farklı uzantıları \(örn. `config.json`ve \) ile sağlanırsa, AvalancheGo bir hata ile çıkacaktır.

Verilen bir zincir için, AvalancheGo ilk olarak zincir kimliği olan bir yapılandırma alt dizini arayacaktır. Eğer bulunmazsa, zincir birincil takma adı olan bir yapılandırma alt dizini arıyor. Eğer bulunamadıysa, zincir için başka bir takma adı olan bir alt dizini arıyor. Tüm klasör ve dosya isimleri çok hassas.

Bu özel yapılandırmaları sağlamak için gerekli değildir. Eğer sağlanmazsa, VM özel varsayılan yapılandırma kullanılacaktır.

`--chain-config-dir`- Evet.

Yukarıda tarif edildiği gibi zincir incir içeren dizini belirler. `$HOME/.avalanchego/configs/chains`Defaults Eğer bu bayrak sağlanmazsa ve öntanımlı dizin mevcut değilse, AvalancheGo özel yapılandırmalar seçeneği olduğu için çıkmayacak. Ancak, bayrak ayarlanırsa, belirlenen dizin var olmalı yoksa AvalancheGo bir hata ile ayrılacaktır.

#### C-Chain Yapılandırması

C-Chain için bir yapılandırma belirtmek için, bir JSON yapılandırma dosyası `{chain-config-dir}/C/config.json`\(veya yukarıda belirtildiği gibi geçerli bir konumda yerleştirilmelidir\)

`config.json`Örneğin, eğer öntanımlı değerine `chain-config-dir`sahipse, o zaman bu `$HOME/.avalanchego/configs/chains/C/config.json`içeriklerle yerleştirilebilir:

```javascript
{
  "rpc-tx-fee-cap": 90,
  "eth-api-enabled": true,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true
}
```

C-Chain yapılandırmaları hakkında daha fazla bilgi için, [buraya](command-line-interface.md#coreth-config) bakın.

#### X-Chain Yapılandırması

X-Chain için bir yapılandırma belirtmek için, bir JSON yapılandırma dosyası `{chain-config-dir}/X/config.json`\(veya yukarıda belirtildiği gibi geçerli bir konumda yerleştirilmelidir\)

`config.json`Örneğin, eğer öntanımlı değerine `chain-config-dir`sahipse, o zaman bu `$HOME/.avalanchego/configs/chains/X/config.json`içeriklerle yerleştirilebilir:

```javascript
{
  "index-transactions": true,
  "index-allow-incomplete": false
}
```

X-Chain yapılandırmaları hakkında daha fazla bilgi için, [buraya](command-line-interface.md#avm-config) bakın.

### C-Chain / Coreth<a id="coreth-config"></a>

`--coreth-config`\(json\):

\(Bu argüman [Zincir Configs](command-line-interface.md#chain-configs) kullanım lehine reddedilmiştir.\)

Bu da into aktarılacak bir yapılandırma belirtmenizi sağlar. Bu yapılandırma için öntanımlı değerler:

```javascript
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "net-api-enabled": true,
  "rpc-gas-cap": 2500000000,
  "rpc-tx-fee-cap": 100,
  "eth-api-enabled": true,
  "personal-api-enabled": false,
  "tx-pool-api-enabled": false,
  "debug-api-enabled": false,
  "web3-api-enabled": true,
  "local-txs-enabled": false,
  "pruning-enabled": false,
  "api-max-duration": 0, // Default to no maximum
  "api-max-blocks-per-request": 0, // Default to no maximum
  "allow-unfinalized-queries": false
}
```

Öntanımlı değerler sadece in açıkça belirtildiği takdirde geçersiz sayılabilir.

parametreler şöyle:

#### Corce APIS

`snowman-api-enabled`\(boolean\):

Snowman API'yi etkinleştirir. Yanlış yere düşürülür.

`coreth-admin-api-enabled`\(boolean\):

Admin API'yi etkinleştirir. Yanlış yere düşürülür.

`net-api-enabled`\(boolean\):

API'yi `net_*`etkinleştirir. Doğru söylüyor.

#### Coreth API Gazı / Fiyat Kapakları

`rpc-gas-cap`\(int\):

`eth_estimateGas`NAVAX \(GWei\) ile ölçülen bir RPC Çağrısı tarafından tüketilecek maksimum gaz. 2,500,000,000 tahlil var.

`rpc-tx-fee-cap`\(int\):

Küresel işlem ücreti \(fiyat \* gazı sınırı\) cap \(measured ölçülen\) send-transction varyantları için 100'e çıkarılıyor.

#### Veritabanı Uygulaması

`pruning-enabled`\(bool\):

Eğer doğruysa, eski tarihi verilerin veritabanı açılması etkinleştirilecektir. Tarihsel köklerdeki tüm verilere erişimi olan düğümler için devre dışı bırakılmalıdır. Pruning sadece yeni veriler için yapılacaktır. V1.4.9 `false`ve sonraki `true`sürümlerde be

#### Eth API

`eth-api-enabled`\(boolean\):

API'yi `eth_*`etkinleştirir. Doğru söylüyor.

`personal-api-enabled`\(boolean\):

API'yi `personal_*`etkinleştirir. Yanlış yere düşürülür.

`tx-pool-api-enabled`\(boolean\):

API'yi `txpool_*`etkinleştirir. Yanlış yere düşürülür.

`debug-api-enabled`\(boolean\):

API'yi `debug_*`etkinleştirir. Yanlış yere düşürülür.

`web3-api-enabled`\(boolean\):

API'yi `web3_*`etkinleştirir. Doğru söylüyor.

#### Eth Ayarları

`local-txs-enabled`\(boolean\):

Yerel işlem işlemlerini etkinleştirir. Yanlış yere düşürülür.

`api-max-duration`\(süre\):

Maksimum API arama süresi süresi. API çağrıları bu süreyi aşarsa, zaman ayırırlar. 0 \(maksimum yok\).

`api-max-blocks-per-request`\(int\):

İstek başına hizmet edecek en fazla sayıda blok `getLogs`var. 0 ile \(maksimum yok\).

`allow-unfinalized-queries`\(boolean\):

Sonuçsuz sorulara izin verir \(henüz kabul edilmedi\) bloklar/işlemler için Yanlış yere düşürülür.

#### Devam Ettirici Profille

Düğününüzü hafıza/CPU profillerini sürekli çalıştırmak ve en son olanları kaydetmek için yapılandırabilirsiniz. Eğer `continuous-profiler-dir`ayarlanırsa sürekli bellek / CPU profilleme etkinleştirilir.

`continuous-profiler-dir`- Evet.

Eğer boş değilse, düğüm, hafıza/CPU profillerini sürekli çalıştırır ve bu dizine koyar. Boş sicime \(etkinleştirilmedi\) Defaults \(etkinleştirilmedi\).

`continuous-profiler-frequency`\(süre\):

Ne sıklıkla yeni bir CPU/memory profili oluşturulur. `15m`Defaults

`continuous-profiler-max-files`\(int\):

Kalacak en fazla sayıdaki CPU/memory profilleri Defaults 5'e kadar.

#### Keystore Ayarları

`keystore-directory`- Evet.

Özel anahtarları içeren dizin. Bu da göreceli bir yol olarak verilebilir. Boş ise, geçici bir dizin `coreth-keystore`kullanır. Boş iplere Defaults

`keystore-external-signer`- Evet.

Bir clef-type tipi belirleyici için harici bir URI belirler. Boş sicime \(etkinleştirilmedi\) Defaults \(etkinleştirilmedi\).

`keystore-insecure-unlock-allowed`\(bool\):

Eğer doğruysa, kullanıcıların güvenli olmayan HTTP ortamında hesapları açmalarına izin verin. Yanlış yere düşürülür.

### Konsensus Parametreleri

`--consensus-gossip-frequency`\(süre\):

Dedikodu kabul edilen sınırlar arasındaki zaman. `10s`Defaults

`--consensus-shutdown-timeout`\(süre\):

Tepkisiz bir zinciri öldürmeden önce zaman kaybı. `5s`Defaults

`--creation-tx-fee`\(int\):

Yeni bir eyalete yol açan işlemler için in işlem ücreti var. `1000000`NAVAX \(.001 AVAX\) işlemleri için Defaults

`--min-delegator-stake`\(int\):

in en düşük kazık, birincil Ağ'ın onaylayıcı bir vekiline devredilebilir.

Ana Ağ'da `25000000000`\(25 AVAX\) Defaults Test Net'te `5000000`\(.005 AVAX\) öntanımlı olarak kullanılır.

`--min-delegation-fee`\(int\):

Asgari heyet ücreti ile birincil ağdaki heyet için ödenebilir, `10,000`çarpılır. Menzilde `[0, 1000000]`olmalı. Ana Ağ'da \(%2\) öntanımlı olarak \(% `20000`2\)

`--min-stake-duration`\(süre\):

En az bekleme süresi. Ana Net üzerinde öntanımlı `336h`\(iki hafta\)

`--min-validator-stake`\(int\):

in en az kazık, birincil Ağ'ı onaylamak için gerekli olan asgari kazık.

Ana Ağ'da `2000000000000`\(2.000 AVAX\) öntanımlı olarak kullanılıyor. Test Net'te `5000000`\(.005 AVAX\) öntanımlı olarak kullanılır.

`--max-stake-duration`\(süre\):

En fazla bekleme süresi, saatlerce. Ana Ağ'da `8760h`\(365 gün\) Defaults

`--max-validator-stake`\(int\): s

in maksimum kazık, birincil ağdaki bir doğrulama a yerleştirilebilir. Ana Ağ'da `3000000000000000`\(3.000.000 AVAX\) öntanımlı olarak kullanılıyor. Bu durum hem onaylayıcı hem de delegeler tarafından onaylanan kazık içerir.

`--snow-avalanche-batch-size`\(int\):

Kardan uzlaşmasının DAG uygulamaları, bir vertex dahil edilecek işlem sayısı olarak `b`tanımlanır. `b`Artırma teorik olarak artma gecikme artarken vasıtasıyla artacaktır. Düğüm bir grup toplaması için 1 saniye bekleyecek ve tüm sürüyü bir seferde yayınlayacak. En azından değer `1`olmalı. `30`Defaults

`--snow-avalanche-num-parents`\(int\):

`p`Karın konsensus DAG uygulamaları, bir vertex dahil olmak üzere ebeveynlerin sayısını tanımlar. Artırma, ağ sorgularının the `p`iyileştirir. Ancak, grafiğin bağlantısını artırarak grafiğin çevreleyen karmaşıklığı artmıştır. En azından değer `2`olmalı. `5`Defaults

`--snow-concurrent-repolls`\(int\):

Kar uzlaşması ağ kullanım zamanlarında verilen yeniden anket işlemleri gerektirir. Bu parametre istemcinin bu işlemleri tamamlamada ne kadar agresif olacağını tanımlar. Bu durum sadece Kardan anlaşmasının özenle değerlendirilmesinden sonra değiştirilmelidir. `1`En azından değer olmalı.`--snow-rogue-commit-threshold` `4`Defaults

`--snow-sample-size`\(int\):

`k`Kar uzlaşması, her ağ anketinde sürülen onaylayıcı sayısının sayısını tanımlar. Bu parametre uzlaşma için kullanılan `k`değeri tanımlar. Bu durum sadece Kardan anlaşmasının özenle değerlendirilmesinden sonra değiştirilmelidir. En azından değer `1`olmalı. `20`Defaults

`--snow-quorum-size`\(int\):

Kar uzlaşması, her ağ anketinde bir işlem yapmayı tercih eden validators sayısı olarak `alpha`tanımlanır. Bu parametre uzlaşma için kullanılan `alpha`değeri tanımlamamıza izin verir. Bu durum sadece Kardan anlaşmasının özenle değerlendirilmesinden sonra değiştirilmelidir. Değer, daha büyük `k/2`olmalı. `14`Defaults

`--snow-virtuous-commit-threshold`\(int\):

`beta1`Kardan fikir birliği art arda yapılan anketlerin sayısını tanımlar, erdemli bir işlemin kabul edilebilmesi için güvenini artırması gerekir. Bu parametre uzlaşma için kullanılan `beta1`değeri tanımlamamıza izin verir. Bu durum sadece Kardan anlaşmasının özenle değerlendirilmesinden sonra değiştirilmelidir. En azından değer `1`olmalı. `15`Defaults

`--snow-rogue-commit-threshold`\(int\):

`beta2`Kardan fikir birliği art arda yapılan anketlerin sayısını tanımlar, dolandırıcı bir işlemin kabul edilebilmesi için güvenini artırması gerekir. Bu parametre uzlaşma için kullanılan `beta2`değeri tanımlamamıza izin verir. Bu durum sadece Kardan anlaşmasının özenle değerlendirilmesinden sonra değiştirilmelidir. En azından değer `beta1`olmalı. `30`Defaults

`--stake-minting-period`\(süre\):

Bekleme fonksiyonunun tüketim süresi, saatler içinde. Ana Net üzerinde öntanımlı `8760h`\(365 gün\).

`--tx-fee`\(int\):

Bir işlem için yakılması gereken nAVAX miktarı geçerli olacak. Bu parametre mevcut formunda ağ anlaşması gerektirir. Bu değerin öntanımlı olarak değiştirilmesi sadece özel ağlarda yapılmalıdır. İşlem başına `1000000`to Defaults

`--uptime-requirement`\(yüzer\):

Bir validator ödül almak için çevrimiçi olması gerekir. `0.6`Defaults

### Sağlık

`--health-check-frequency`\(süre\):

Sağlık kontrolü bu frekans ile çalışıyor. `30s`Defaults

`--health-check-averager-halflife`\(süre\):

Sağlık kontrollerinde kullanılan yarı ömürlü bilgisayar \(örneğin mesaj başarısızlıklarının oranını ölçmek için\) Daha büyük değer --> ortalama hesaplama daha az uçucu hesaplama. `10s`Defaults

### Mesaj Oranı Sınırlandırma \(Throttling\)

Bu bayraklar gelen ve dış iletilerin sınırlandırılmasına bağlıdır. Oranın sınırlandırılması ve aşağıdaki bayraklar hakkında daha fazla bilgi için `throttling`in pakete bakınız.

`--throttler-inbound-at-large-alloc-size`\(uint\):

İleti the büyük tahsis edilen iletinin boyutu. 32 to defaults to `33554432`\(32 mebibytes\).

`--throttler-inbound-validator-alloc-size`\(uint\):

İleti the doğrulama tahsis edilmesi, baytların boyutu. 32 to defaults to `33554432`\(32 mebibytes\).

`--throttler-inbound-node-max-at-large-bytes`\(uint\):

Bir düğümün en fazla sayısı, içe giden mesaj the büyük bir tahsis edilmesinden alınabilir. `2048`\(2 mebibytes\) için Defaults

`--throttler-outbound-at-large-alloc-size`\(uint\):

Boyut, baytlar, dış iletinin of büyük bir tahsis edilmesi. 32 to defaults to `33554432`\(32 mebibytes\).

`--throttler-outbound-validator-alloc-size`\(uint\):

İleti gazı iletinin doğrulama değerinin boyutu, baytlar. 32 to defaults to `33554432`\(32 mebibytes\).

`--throttler-outbound-node-max-at-large-bytes`\(uint\):

Bir düğümün en fazla sayısı, iletinin iletinin ileticisinin büyük bir tahsis edilmesinden alınabilir. `2048`\(2 mebibytes\) için Defaults

### Ağ Ağı

`--network-compression-enabled`\(bool\) \(v1.4.11\):

Eğer doğruysa, sürüm >= v1.4.11 üzerinden gönderilen belirli mesajları bant genişliği kullanımını azaltmak için sıkıştır.

`--network-initial-timeout`\(süre\):

adaptive adaptif zaman aşımı yöneticisinin ilk zaman aşımı değeri. `5s`Defaults

`--network-minimum-timeout`\(süre\):

adaptive adaptif zaman aşımı yöneticisinin en az zaman ölçümü değeri `2s`Defaults

`--network-maximum-timeout`\(süre\):

adaptive adaptif zaman aşımı yöneticisinin en fazla zaman ölçümü değeri `10s`Defaults

`--network-timeout-halflife`\(süre\):

Halflife ortalama ağ gecikmesi hesaplandığında kullanılır. Daha büyük değer --> daha az uçucu ağ gecikme hesaplaması. `5m`Defaults

`--network-timeout-coefficient`\(süre\):

[ortalama istek `network-timeout-coefficient`gecikmesi] sonrasında eyalete yönelik talepler mola verecek. `2`Defaults

`--network-health-min-conn-peers`\(uint\):

Bu kadar çok arkadaşa bağlı olursa düğüm, sağlıksız rapor edecektir. `1`Defaults

`--network-health-max-time-since-msg-received`\(süre\):

Bu kadar zaman içinde mesaj almadığı takdirde Node sağlıksız rapor edecektir. `1m`Defaults

`--network-health-max-time-since-no-requests`\(süre\):

Bu kadar zaman içinde mesaj almadığı takdirde Node sağlıksız rapor edecektir. `1m`Defaults

`--network-health-max-portion-send-queue-full`\(yüzer\):

Bu bölümden daha fazlası gönderilen kuyruklar ise düğüm, sağlıksız rapor edecektir. [0,1] içinde olmalı. `0.9`Defaults

`--network-health-max-send-fail-rate`\(yüzer\):

Bu mesajın bu kısmından daha fazla hata göndermesi durumunda düğüm, sağlıksız rapor edecektir. [0,1] içinde olmalı. `0.25`Defaults

`--inbound-connection-throtting-cooldown`\(süresi\)

`--inbound-connection-throttling-max-recent`\(uint\)

Node sadece son olarak yapılmadığı takdirde bir IP üzerinden bağlanan bir bağlantı kabul `inbound-connection-throtting-cooldown`eder. `inbound-connection-throttling-max-recent`Düğüm sadece her IPS üzerinden izin verir.`inbound-connection-throttling-max-recent`

### Göç Listesi Gossiping

Her düğüm, güncel bir akran listesi olabilsin diye birbirleriyle dedikodu yapar. `--network-peer-list-gossip-size`Bir düğüm `--network-peer-list-size`akranları her akrabalarına gossips`--network-peer-list-gossip-frequency`

`--network-peer-list-gossip-frequency`\(süre\):

`1m`Defaults

`--network-peer-list-gossip-size`\(int\):

`50`Defaults

`--network-peer-list-size`\(int\):

`20`Defaults

### Eklenti Kipi

`--plugin-mode-enabled`\(bool\):

Eğer doğruysa, düğümleri [bir](https://github.com/hashicorp/go-plugin) eklenti olarak çalıştırır. `false`Defaults

### Subnet Whitelist

`--whitelisted-subnets`- Evet.

Bu düğümün eklendiğinde geçerli olacağı alt ağların komma listesini ayırdı. Boş olarak Defaults \(sadece ana ağını onaylar\).

### Sanal Makine \(VM\) Yapılandırma<a id="vm-configs"></a>

`--vm-aliases-file`- Evet.

Sanal Makine kimlikleri tanımlayan JSON dosyasına giden yol. `~/.avalanchego/configs/vms/aliases.json`Defaults Örnek içeriği:

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

Bu örnek, kimliği `"timestampvm"`ve kimliğinin belli olduğu `"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"`VM'yi tanımlar.`"timerpc"`

### X-Chain / AVM<a id="avm-config"></a>

Bu da into aktarılacak bir yapılandırma belirtmenizi sağlar. Bu yapılandırma için öntanımlı değerler:

```javascript
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

Öntanımlı değerler sadece in açıkça belirtildiği takdirde geçersiz sayılabilir.

parametreler şöyle:

#### İşlem Endeksleniyor

`index-transactions`\(boolean\):

Eğer ayarlanırsa AVM işlem indeksini `true`etkinleştirir. Öntanımlı değer `false`değerdir. `address`Bu `true`işlemler için ayarlandığında AVM işlemleri etkinliğe karşı `assetID`indekslenir. Bu veri [API](https://github.com/ava-labs/avalanche-docs/tree/c747464781639d100a0a1183c037a972262fc893/build/references/exchange-chain-x-chain-api.md#avm-get-address-txs-api) aracılığıyla `avm.getAddressTxs`mevcuttur.

`index-transactions`Lütfen unutmayın, eğer doğru olursa düğümün hayatı için her zaman doğru olması gerekir. `index-allow-incomplete`Eğer ayarlandıktan `false`sonra düğüm, aynı zamanda belirlenmedikçe başlamayı reddedecektir `true``true`\(aşağıya\)

`index-allow-incomplete`\(boolean\):

Eksik yerlerden oluşur. Öntanımlı değer `false`değerdir.

`index-transactions`DB'de X-Chain indekslenmiş veri yoksa bu yapılandırma değeri göz ardı edilir.`false`


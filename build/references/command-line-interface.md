# Komut Satırı Arayüzü

Aşağıdaki argümanlarla bir düğümün yapılandırmasını belirtebilirsiniz.

## Tartışmalar

### Dosya Yapılandırma

-`--config-file` \(string\):

Bu düğümün yapılandırmasını belirleyen bir JSON dosyasına giden yol. Komut satırı argümanları yapılandırma dosyasında belirlenen argümanları geçersiz kılacaktır.

Örnek JSON yapılandırma dosyası:

```javascript
{
    "log-level": "debug"
}
```

### API'ler

`--api-admin-enabled` \(boolean)\

`Eğer yanlış` ayarlanırsa, bu düğüm, Admin API'yi ortaya çıkarmaz. Yanlış yere `düşürülür`. Daha fazla bilgi için [buraya](../avalanchego-apis/admin-api.md) bak.

`--api-auth-required` \(boolean\):

`Eğer doğru` olursa, API çağrıları izin işaretine ihtiyaç duyar. Yanlış yere `düşürülür`. Daha fazla bilgi için [buraya](../avalanchego-apis/auth-api.md) bak.

`--api-auth-password` \(string\)\

Parola oluşturma/geri alma yetkisi işaretleri oluşturmak için gerekli `Eğer` If belirtilmelidir; aksi takdirde görmezden gelinir. Daha fazla bilgi için [buraya](../avalanchego-apis/auth-api.md) bak.

`--api-health-enabled` etkinleştirilebilir \(boolean):

`Eğer doğru` olursa, bu düğüm sağlık API'sini ortaya çıkaracak. `Doğru` söylüyor. Daha fazla bilgi için [buraya](../avalanchego-apis/health-api.md) bak.

`--index-enabled` \(boolean\):

`Eğer yanlış` ise, bu düğüm, indexer ve Endeksler API mevcut olmayacaktır. Yanlış yere `düşürülür`. Daha fazla bilgi için [buraya](../avalanchego-apis/index-api.md) bak.

`--api-info-enabled` --api-info-enabled

`Eğer doğru` olursa, bu düğüm, Bilgi API'yi ortaya çıkaracak. `Doğru` söylüyor. Daha fazla bilgi için [buraya](../avalanchego-apis/info-api.md) bak.

`--api-ipcs-enabled`

`Eğer doğru` olursa, bu düğüm, IPCs API'yi ortaya çıkaracaktır. Yanlış yere `düşürülür`. Daha fazla bilgi için [buraya](../avalanchego-apis/ipc-api.md) bak.

`--api-keystore-enabled`

`Eğer yanlış` ayarlanırsa, bu düğüm, Keystore API'yi ortaya çıkarmaz. `Doğru` söylüyor. Daha fazla bilgi için [buraya](../avalanchego-apis/keystore-api.md) bak.

`--api-metrics-enabled` --api-metrics-enabled

`Eğer yanlış` ayarlanırsa, bu düğüm metrik API'yi ortaya çıkarmaz. `Doğru` söylüyor. Daha fazla bilgi için [buraya](../avalanchego-apis/metrics-api.md) bak.

### İddialar

`--assertions-enabled`

`Doğru` olduğunda varsayımlar kod tabanı boyunca çalışma zamanında uygulanacak. Bu hata hataları için kullanılmak üzere çünkü daha özel bir hata mesajı alabiliriz. `Doğru` söylüyor.

### - Çizme takıntısı

`--bootstrap-beacon-connection-timeout` timeout \(duration\)\

Kayıplar işaretlerine bağlanmaya çalışırken zaman aşımı. 1 `m'ye` çıkarılıyor.

-`--bootstrap-ids` \(string\):

Bootstrap kimlikleri bir doğrulayıcı kimlik dizisidir. Bu kimlikler kaydırma eylemlerini doğrulamak için kullanılacak. Bu alanın bir örnek `ayarı, -bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg, NodeID-MFrZFCCCVV5iCn6M9K6XduxG891xXXZ"` olacaktır. Varsayılan değer ağ kimliğine bağlıdır.

-`--bootstrap-ips` \(string\):

Bootstrap IPs, IPv4:port çiftlerinin bir dizisidir. Bu IP Adresleri mevcut Avalanche durumunu bağlamak için kullanılacaktır. Bu alanın bir örnek `ayarı, --bootstrap-ips="127.0.1:12345,1.2.3.4:5678"`. Varsayılan değer ağ kimliğine bağlıdır.

`--bootstrap-retry-enabled`

Eğer doğruysa, başarısız olursa kayma işlemi tekrar deneyecektir.

`--bootstrap-retry-max-attempts` --bootstrap-retry-max-attempts

Başarısızlıktan sonra kaymayı tekrar denemek için çok sayı.

### Veritaban

-`--db-dir` \(dizi, dosya yolu):

Veritabanının devam ettiği dizini belirler. `"$HOME/.avalanchego/db"`. için Defaults

`--db-type` \(string\):

Kullanılacak veritabanı türünü belirler. `DB`, `kayalıklardan` biri olmalı. `memdb``` hafızada kalıcı olmayan bir veritabanıdır.

`Bilgin olsun, bu` düğüm, `taşlarla` koşarken ve ters ters koşarken devam eden verileri okuyamaz.

**about ilgili iki önemli not**: Birincisi, RocksDB tüm bilgisayarlarda çalışmaz. İkincisi, RocksDB varsayılan olarak inşa edilmemiş ve halka açık şekilde serbest bırakılan ikili içeriğe dahil edilmemiştir. RocksDB ile AvalancheGo inşa etmek için, `roCKSDBALLOWED=1 ihracat` ve sonra `scripts/build.sh`. Bunu kullanmadan önce `yapmalısın. -db-type=rocksdb`

### Genesis

`--genesis` \(string\):

Kullanılacak genez verilerini içeren bir JSON dosyasına giden yol. Standart ağlar çalıştırılırken görmezden gelinir \(Mainnet, Testnet. \) Verilmezse, varsayılan gen verileri kullanır. Genesis verisinin JSON temsili için bir örnek olarak [buraya](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16) bakınız.

### HTTP Sunucusu

`--http-host` \(string\):

HTTP APIs dinlediği adres. `127.0.1'e` Defaults Bu demek oluyor ki, düğümünüz sadece aynı makineden yapılan API çağrılarını halledebilir. Diğer makinelerden API çağrılarına izin vermek için, `use`

`--http-port` \(int\):

Her düğüm, düğüm, ve Avalanche ağıyla etkileşim için API'leri sağlayan bir HTTP sunucusu çalıştırır. Bu argüman HTTP sunucusunun dinleyeceği portu belirler. Varsayılan değer `9650`.

-`--http-tls-cert-file` \(dizi, dosya pat\):

Bu argüman HTTPS sunucusu için düğümle kullanılan TLS sertifikasının yerini belirler. Bu `--http-tls-enabled=true`. etkinleştirildiğinde belirtilmelidir. Varsayılan değeri yok.

`--http-tls-enabled` \(boolean\)\

Eğer `doğru` olursa, bu bayrak sunucuya to kullanmak için yükseltmeye çalışacak. Yanlış yere `düşürülür`.

-`--http-tls-key-file` \(dizi, dosya pat\)\

Bu argüman HTTPS sunucusu için düğümle kullanılan TLS özel anahtarının konumunu belirler. Bu `--http-tls-enabled=true`. etkinleştirildiğinde belirtilmelidir. Varsayılan değeri yok.

### IPCS

`--ipcs-chain-ids` ids \(string\ )

Bağlanacak zincir kimlikleri listesi ayrılmış. Varsayılan değeri yok.

-`--ipcs-path` \(string\ )

IPC sockets. için dizin \(Unix\) veya pipe prefix \(Windows\) olarak adlandırılır. to Defaults

### Dosya Descriptor Sınırı

`--fd-limit` \(int\ )

Bu işlem dosyası tanımlayıcısı sınırını en azından bu değere yükseltme girişimi. `32768` için öntanımlı

### Kaydım

-`--log-level` `\(string, {Off, Ölümcül Hata, Uyarı, Bilgi, Debug, Verbo}\):`

Günlük seviyesi hangi olayların günlüğe gireceğini belirler. En yüksek öncelikten en düşük seviyeye kadar 7 farklı seviye vardır.

* Kayıtlarda bu kadar `kütük` yoktur.
* `Ölümcül` hatalar iyileşemeyecek ölümcül.
* `Hata`: düğümlerin karşılaştığı hatalar, bu hatalar geri alınabildi.
* `Uyarı`: Bu uyarı, fevkalade bir byzantine düğümü, ya da potansiyel bir gelecek hatasının göstergesi olabilir.
* `Bilgi`: düğüm durumu güncellemelerinin yararlı tanımları.
* `Debug`: Hata kaydı koddaki olası hataları anlamaya çalışırken kullanışlıdır. Normal kullanım için istenen daha fazla bilgi gösterilecektir.
* `Verbo`: düğümün işlediği geniş miktarda bilgiyi takip eder. Bu durum son derece düşük seviye protokol analizi için veri içeriği ve ikili atımları içerir.

Bir kütük seviyesi notası belirtirken, belirtilen öncelikli veya daha yüksek olan tüm günlüklerin izleneceği belirtilir. `Bilgi` için Defaults

`---Görüntülenme seviyesi` `\(string, {Off, Fatal, Hata, Uyarı, Bilgi, Debug, Verbo}\):`

Görünüm seviyesi ekranda hangi olayları göstereceğini belirler. Eğer boş kalırsa, `--log-level`. sağlanan değer varsayılır.

`--log-display-highlight` \(dizi, `{oto, ov, renkler)\):`

Renk/vurgulama görüntüleme günlüklerinin olup olmadığı Çıkış terminal olduğunda öntanımlı noktalar belirsiz. Aksi takdirde `bir {oto, ova,` renklerden biri olmalı.

-`--log-dir` \(dizi, dosya yolu):

Sistem kayıtlarının tutulduğu dizini belirler. `"$HOME/.avalanchego/logs"`. için Defaults

### Ağ Kimliği

`---ağ -id` \(string\):

Düğünün bağlanması gereken ağın kimliği. Bunlardan biri olabilir:

* `--network-id=mainnet` -> Ana ağa Bağ (varsayılan \).
* ---ağ `--network-id=fuji` -> Fuji test ağına bağlan.
* ---ağ - `--network-id=testnet` -> Şu anki test ağına bağlan. Şu anda Fuji'den bahsediyoruz. \)
* ---ağ `--network-id=local` -> yerel bir test ağına bağlan.
* --ağ - `--network-id=network-{id}` -> Verilen Kimlik ile ağa bağlan. `Kimlik` `(0, 2^32)`.

### & IP

-`--public-ip` \(string\):

Doğrulayıcılar halka açık IP adreslerini bilmeliler, böylece diğer düğümlerin onlarla nasıl bağlantı kuracaklarını bilmelerini sağlarlar. Eğer bu argüman sağlanmazsa, düğüm, düğümün halka açık IP'sini almak için NAT traversal gerçekleştirmeye çalışacak. Yerel bir ağ oluşturmak için `127.0.1'e` ayarlanmalıdır. Eğer kurulmadıysa, NAT traversal. kullanarak IP öğrenme çabaları vardır.

---dinamik kamuoyu `--dynamic-public-ip`

Eğer `param` `ifconfigco` veya `or` geçerli değerleri. Bu iş `kamuya açık` olur. Eğer kurulursa, uzaktan hizmet `--dinamik güncelleme süresince` anketler ve düğümün halka açık IP adresini güncelleyebilir.

---dinamik güncelleme `--dynamic-update-duration`

Anket olaylarının `dinamik kamuoyu ve` NAT arası bir süre. Önerilen minimum 1 dakika. Defaults `5` m'ye kadar.

### İmza Onaylaması

`---İmza onaylama-` etkinleştirilen\ (boolean)\

İmza doğrulanmasını etkinleştirir. `Yanlış` ayarlandığında, imzaların devre dışı bırakılmasına izin veren in imzalar kontrol edilmeyecektir. `Doğru` söylüyor.

### - Takılıyor

-`--staking-port` \(string\):

İzleme sunucusunun Avalanche ağına dış bağlantısını sağlayan port. `9651`'e erteleniyor.

`---aktive etkinleştirilebilir` \(boolean\)

Avalanche Sybil direnişi olarak Stake \(PoS\) Kanıtı kullanır ve ağa saldırmak için yasaklı bir şekilde pahalı hale getirir. Eğer yanlış ise, sybil direniş engellenir ve tüm akrabalar uzlaşma sırasında ezilecektir. `Doğru` söylüyor.

-`--staking-tls-cert-file` \(dizi, dosya yolu):

Avalanche düğümleri güvenli bir şekilde bağlamak için iki yönlü doğrulanmış TLS bağlantılarını kullanır. Bu argüman düğümler tarafından kullanılan TLS sertifikasının yerini belirler. Öntanımlı olarak, düğüm, TLS sertifikasının `at` olmasını bekler.

-`--staking-tls-key-file` \(dizi, dosya pat\)\

Avalanche düğümleri güvenli bir şekilde bağlamak için iki yönlü doğrulanmış TLS bağlantılarını kullanır. Bu argüman düğüm, kullanılan TLS özel anahtarının yerini belirler. Öntanımlı olarak, düğüm, TLS özel anahtarının `$HOME/.avalanchego/staking/staker.key`. olmasını bekler.

`---engelli ağırlık` \(int\):

Her bir akraba engelli olduğunda sağlama için ağırlık. Defaults `1`'e

### Sürüm

`---sürüm` \(boolean\

Eğer bu `doğruysa`, sürümü basıp bırak. Yanlış yere `düşürülür`.

## Gelişmiş Seçenekler

Aşağıdaki seçenekler bir düğümün doğruluğunu etkileyebilir. Sadece güç kullanıcıları bunları değiştirebilir.

### Benchlist

`---Benchlist-duration` \(süre)\

Bir akranın bankta geçmesi için zaman miktarı -- yedek `--benchlist-fail-threshold`. `1'e` erteleniyor.

`--benchlist-fail-threshold` eşik. \(int\):

Bir düğmeye bağlamadan önce ardışık sayıda başarısız soru sayısı\ (eğer tüm sorgu başarısız olacaksa). `10`'a çıkarılıyor.

`--benchlist-peer-summary-enabled` etkinleştirilen\

Sorgu gecikme metriklerini etkinleştirir. Yanlış yere `düşürülür`.

`--benchlist-min-failing-duration` \(süre)\

Bir akraba için en az zaman iletisi akranı kaldırılmadan önce bozulmalıdır. Defaults `5` m'ye kadar.

### Dizin Yapılandır

`--build-dir` \(string\):

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

Bazı zincirler \ (şu anda sadece C-Chain\) düğüm operatörünün özel bir yapılandırma sağlamasını sağlar. AvalancheGo dosyalardan zincir yapılandırmalarını okuyabilir ve başlatma üzerine ilgili zincirlere aktarabilir.

AvalancheGo `bu` dosyaları -zincir by belirttiği dizinde arar. Bu dizin, isimleri zincir kimlikleri veya zincir takma isimleri olan alt dizinlere sahip olabilir. Her alt dizin, dizin adı içinde belirtilmiş zincir için yapılandırma içerir. Her alt dizin, karşılık gelen zincir başlatıldığında değeri geçilen `Config` isimli bir dosya içermelidir. Örneğin, C-Chain için yapılandırma şu olmalıdır: `[chain-config-dir-goes-here]/C/config.json`.

Bu dosyaların sahip olması gereken uzantı, ve bu dosyaların içeriği VM-dependent. Örneğin, bazı zincirler `config.txt` beklerken diğerleri `config.txt` bekler. Eğer birden fazla dosya aynı isim ama farklı uzantıları olan \(örneğin `config.json` ve `config.txt`\) ile sağlanırsa, AvalancheGo bir hata ile çıkacaktır.

Verilen bir zincir için, AvalancheGo ilk olarak zincir kimliği olan bir yapılandırma alt dizini arayacaktır. Eğer bulunmazsa, zincir birincil takma adı olan bir yapılandırma alt dizini arıyor. Eğer bulunamadıysa, zincir için başka bir takma adı olan bir alt dizini arıyor. Tüm klasör ve dosya isimleri çok hassas.

Bu özel yapılandırmaları sağlamak için gerekli değildir. Eğer sağlanmazsa, VM özel varsayılan yapılandırma kullanılacaktır.

`--chain-config-dir` \(string\):

Yukarıda tarif edildiği gibi zincir incir içeren dizini belirler. `$HOME/.avalanchego/configs/chains`. Defaults Eğer bu bayrak sağlanmazsa ve öntanımlı dizin mevcut değilse, AvalancheGo özel yapılandırmalar seçeneği olduğu için çıkmayacak. Ancak, bayrak ayarlanırsa, belirlenen dizin var olmalı yoksa AvalancheGo bir hata ile ayrılacaktır.

#### C-Chain Yapılandırması

Şu anda C-Chain özel yapılandırmaları destekleyen tek zincirdir. C-Chain için bir yapılandırma belirtmek için, bir JSON yapılandırma dosyası yukarıda belirtildiği gibi {chain `{chain-config-dir}/C/config.json` \(veya başka geçerli bir konumda yerleştirilmelidir. \)

Örneğin, `zincir chain-config-dir` varsayılan değerine sahipse, `config.json```, chain-config-dir bu içeriklerle yerleştirilebilir:

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

### C-Chain / Coreth<a id="coreth-config"></a>

`--Coreth-config` \(json):

\ (Bu argüman [Zincir](command-line-interface.md#chain-configs) Yapılandırması lehine reddedilmiştir. \)

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

`Kardan adam api etkinleştiriliyor` \(boolean\):

Snowman API'yi etkinleştirir. Yanlış yere düşürülür.

`coreth-admin-api-enabled` etkinleştirilen\ (boolean\):

Admin API'yi etkinleştirir. Yanlış yere düşürülür.

`net-api-enabled` net-api-enabled

`Ağı` etkinleştirir. Doğru söylüyor.

#### Coreth API Gazı / Fiyat Kapakları

`rpc-gas-cap` \(int\):

NAVAX \(GWei\) ile ölçülen bir RPC Call (`eth_estimateGas`\) tarafından tüketilecek maksimum gaz. 2,500,000,000 tahlil var.

`rpc-tx-fee-cap` \(int\):

Küresel işlem ücreti \(price \* gaslimit\ ) cap \(AVAX\ içinde ölçülür) send-transction variants. için 100'e çıkarılıyor.

#### Veritabanı Uygulaması

`Girilebilir etkinlik\ (bool\):`

Eğer doğruysa, eski tarihi verilerin veritabanı açılması etkinleştirilecektir. Tarihsel köklerdeki tüm verilere erişimi olan düğümler için devre dışı bırakılmalıdır. Pruning sadece yeni veriler için yapılacaktır. V1.4.9 olarak `yanlış` ve sonraki sürümlerde `doğru` olarak tanımlanabilir.

#### Eth API

`eth-api-enabled` eth-api-enabled

`Etik` (API) etkinleştirir. Doğru söylüyor.

Kişisel api `personal-api-enabled`

`Kişisel` (API) etkinleştirir. Yanlış yere düşürülür.

`tx-pool-api-enabled` etkinleştirilen\ (boolean\):

`Txpool_*` API'yi etkinleştirir. Yanlış yere düşürülür.

`debug-api-enabled` etkinleştirilen\ (boolean\):

`the` etkinleştirir. Yanlış yere düşürülür.

`web3-api etkinleştirilebilir` \(boolean\):

`Web 3_*` API'yi etkinleştirir. Doğru söylüyor.

#### Eth Ayarları

Yerel `local-txs-enabled`

Yerel işlem işlemlerini etkinleştirir. Yanlış yere düşürülür.

`api-max-duration` \(duration\):

Maksimum API arama süresi süresi. API çağrıları bu süreyi aşarsa, zaman ayıracaklar. 0 \(maksimum yok).

`api-max-blocks-per-request` \(int\)\

`Geceki` talep için en fazla sayıda blok hizmet edecek. 0 (maksimum yok) için Defaults

`...`

(henüz kabul edilme) bloklar/işlemler için sorgulanmalarına izin verir. Yanlış yere düşürülür.

#### Devam Ettirici Profille

Düğününüzü hafıza/CPU profillerini sürekli çalıştırmak ve en son olanları kaydetmek için yapılandırabilirsiniz. Sürekli bellek / CPU profilleme etkinleştirilebilir eğer sürekli profilli profilli `continuous-profiler-dir` set)

`Sürekli profilli dir` \(string\):

Eğer boş değilse, düğüm, hafıza/CPU profillerini sürekli çalıştırır ve bu dizine koyar. Boş ipe defaults \ (etkinleştirilmedi).

`Sürekli profilli frekans` \(süre):

Ne sıklıkla yeni bir CPU/memory profili oluşturulur. `15` metreye çıkarılıyor.

`Sürekli profilli maksimum dosyalar` \(int\):

Kalacak en fazla sayıdaki CPU/memory profilleri Defaults 5'e kadar.

#### Keystore Ayarları

`Anahtar mağazası` dizini\ (string\):

Özel anahtarları içeren dizin. Bu da göreceli bir yol olarak verilebilir. Eğer boş ise, `at` geçici bir dizin kullanır. Boş iplere Defaults

`Anahtar mağazası dışa işaretleyici` \(string\):

Bir clef-type tipi belirleyici için harici bir URI belirler. Boş ipe defaults \ (etkinleştirilmedi).

`Anahtar mağazası güvensiz` kilitlenmez...

Eğer doğruysa, kullanıcıların güvenli olmayan HTTP ortamında hesapları açmalarına izin verin. Yanlış yere düşürülür.

### Konsensus Parametreleri

`--consensus-gossip-frequency` \(süre)\

Dedikodu kabul edilen sınırlar arasındaki zaman. `10'lara` kadar öntanımlı.

`--consensus-shutdown-timeout` --consensus-shutdown-timeout

Tepkisiz bir zinciri öldürmeden önce zaman kaybı. `5'lere` defans yapar.

`--creation-tx-fee` \(int\):

Yeni bir eyalete yol açan işlemler için in işlem ücreti var. `1000` nAVAX \(.001 AVAX\) için Defaults

`--Min-delegator-stake` \(int\):

in en düşük kazık, birincil Ağ'ın onaylayıcı bir vekiline devredilebilir.

Ana Ağ'da `2500\\(25` AVAX\) Defaults Test Net'te `5000` \(.005 AVAX\) Defaults

-`--min-delegation-fee` \(int\):

İlk Ağ'da heyet için verilen asgari heyet ücreti `10.000` ile çarptı. Menzilde `olmalı`. Ana Ağ'da `2000\` (%2)'ye Defaults

`--min-stake-duration` sürümü \(süre)\

En az bekleme süresi. Ana Net üzerinde öntanımlı `336h` (iki hafta) \)

`--min-validator-stake` kazık \(int\):

in en az kazık, birincil Ağ'ı onaylamak için gerekli olan asgari kazık.

Ana Ağ'da `200\\(2,000` AVAX\) Defaults Test Net'te `5000` \(.005 AVAX\) Defaults

`---maksimum kazık sürümü` \(süre)\

En fazla bekleme süresi, saatlerce. Ana Ağ'da `8760h` (365 to açıklamalar yapılır.

---max-doğrulanan kazık\ s. `s`

in maksimum kazık, birincil ağdaki bir doğrulama a yerleştirilebilir. Ana Ağ'da `300\\(3,000,000,000,AVAX\)` Defaults Bu durum hem onaylayıcı hem de delegeler tarafından onaylanan kazık içerir.

---kar `--snow-avalanche-batch-size` boyutu \(int\):

Kar konsensus DAG uygulamaları, `bir` vertex dahil edilecek işlem sayısı olarak b tanımlar. `b` artması, teorik olarak artması gecikme artarken vasıtasıyla artacaktır. Düğüm bir grup toplaması için 1 saniye bekleyecek ve tüm sürüyü bir seferde yayınlayacak. Değerin en az `1` olması gerekir. `30`'a çıkar.

`--snow-avalanche-num-parents`

Pamuk consensus DAG uygulamaları, `p`'yi bir vertex dahil edilmesi gereken ebeveyn sayısı olarak tanımlar. `P'nin` artması ağ sorgularının the iyileştirecektir. Ancak, grafiğin bağlantısını artırarak grafiğin çevreleyen karmaşıklığı artmıştır. Değer, en az `2` olmalı. `5` ile Defaults

`--snow-concurrent-repolls --snow-concurrent-repolls` \(int\):

Kar uzlaşması ağ kullanım zamanlarında verilen yeniden anket işlemleri gerektirir. Bu parametre istemcinin bu işlemleri tamamlamada ne kadar agresif olacağını tanımlar. Bu durum sadece Kardan anlaşmasının özenle değerlendirilmesinden sonra değiştirilmelidir. Değer en az `1` ve en çok kar ve `--snow-rogue-commit-threshold`. `4`'e Defaults

---kar `--snow-sample-size` \(int\):

Kar uzlaşması, `her` ağ anketinde kaydırılan onaylayıcı sayısının sayısını tanımlar. Bu parametre uzlaşma için kullanılan `k` değerini tanımlar. Bu durum sadece Kardan anlaşmasının özenle değerlendirilmesinden sonra değiştirilmelidir. Değerin en az `1` olması gerekir. `20` ile Defaults

`---kar boyutu` \(int\):

Kar uzlaşması, `alfa` sayısını her ağ anketinde bir işlem tercih eden onaylayıcı sayısı olarak tanımlar. Bu parametre uzlaşma için kullanılan `alfa` değerini tanımlamamıza izin verir. Bu durum sadece Kardan anlaşmasının özenle değerlendirilmesinden sonra değiştirilmelidir. Değer, `k/2`'den daha büyük olmalı. `14`'e çıkarıldı.

---kar `--snow-virtuous-commit-threshold` \(int\)\

Kar uzlaşması, `beta1`'i art arda bir sandık sayısı olarak tanımlar, erdemli bir işlemin kabul edilebilmesi için güvenini artırması gerekir. Bu parametre uzlaşma için kullanılan `beta1` değerini tanımlamamıza izin verir. Bu durum sadece Kardan anlaşmasının özenle değerlendirilmesinden sonra değiştirilmelidir. Değerin en az `1` olması gerekir. `15` ile Defaults

---kar `--snow-rogue-commit-threshold`

Kar uzlaşması, `beta2`'yi art arda anketlerin sayısı olarak tanımlar, hilekâr bir işlemin kabul edilebilmesi için güvenini artırması gerekir. Bu parametre uzlaşma için kullanılan `beta2` değerini tanımlamamıza izin verir. Bu durum sadece Kardan anlaşmasının özenle değerlendirilmesinden sonra değiştirilmelidir. En azından `beta1` değerinde olmalı. `30`'a çıkarılıyor.

---kazık `--stake-minting-period` \(duration\):

Bekleme fonksiyonunun tüketim süresi, saatler içinde. Ana ağ üzerinde öntanımlı `8760h` \(365 gün).

-`--tx-fee` \(int\):

Bir işlem için yakılması gereken nAVAX miktarı geçerli olacak. Bu parametre mevcut formunda ağ anlaşması gerektirir. Bu değerin öntanımlı olarak değiştirilmesi sadece özel ağlarda yapılmalıdır. Satış başına `1000` nAVAX Defaults

`--uptime-requirement`

Bir validator ödül almak için çevrimiçi olması gerekir. Defaults `0.6`'ya.

### Sağlık

`---sağlık kontrol frekansı` \(süre)\

Sağlık kontrolü bu frekans ile çalışıyor. `30'lara` kadar öntanımlı.

--sağlık `--health-check-averager-halflife` yarı ömrü \(süre)\

Sağlık kontrollerinde kullanılan yarı ömürlü araçlar (örneğin mesaj hatalarının oranını ölçmek için) \) Daha büyük değer --> ortalama hesaplama daha az uçucu hesaplama. `10'lara` kadar öntanımlı.

### Mesaj Oranı Rate-Limiting )

Bu bayraklar gelen ve dış iletilerin sınırlandırılmasına bağlıdır. Oranın sınırlandırılması ve aşağıdaki bayraklar hakkında daha fazla bilgi için in `throttling` çeken pakete bakınız.

`--throttler-inbound-at-large-alloc-size` --throttler-inbound-at-large-alloc-size \(uint\)\

İleti the büyük tahsis edilen iletinin boyutu. `33554432` (32 to Defaults

`--throttler-inbound-validator-alloc-size`

İleti the doğrulama tahsis edilmesi, baytların boyutu. `33554432` (32 to Defaults

`--throttler-inbound-node-max-at-large-bytes` bytes \(uint\)\

Bir düğümün en fazla sayısı, içe giden mesaj the büyük bir tahsis edilmesinden alınabilir. `2048` yılında yapılan açıklamalar (2 mebibytes).

`--throttler-outbound-at-large-alloc-size` --throttler-outbound-at-large-alloc-size

Boyut, baytlar, dış iletinin of büyük bir tahsis edilmesi. `33554432` (32 to Defaults

`--throttler-outbound-validator-alloc-size` \(uint\):

İleti gazı iletinin doğrulama değerinin boyutu, baytlar. `33554432` (32 to Defaults

`--throttler-outbound-node-max-at-large-bytes` büyük bytes \(uint\):

Bir düğümün en fazla sayısı, iletinin iletinin ileticisinin büyük bir tahsis edilmesinden alınabilir. `2048` yılında yapılan açıklamalar (2 mebibytes).

### Ağ Ağı

`---ağ sıkıştırma` etkinleştirilen\ (bool\) \(v1.4.11\)\

Eğer doğruysa, sürüm >= v1.4.11 üzerinden gönderilen belirli mesajları bant genişliği kullanımını azaltmak için sıkıştır.

`---ağ başlatma zamanı` \(süre):

adaptive adaptif zaman aşımı yöneticisinin ilk zaman aşımı değeri. `5'lere` defans yapar.

`--network-minimum-timeout` \(duration\):

adaptive adaptif zaman aşımı yöneticisinin en az zaman ölçümü değeri `2'lere` öntanımlı.

`--network-maximum-timeout` \(duration\)\

adaptive adaptif zaman aşımı yöneticisinin en fazla zaman ölçümü değeri `10'lara` kadar öntanımlı.

`--network-timeout-halflife` aşımı yarı ömrü \(süre)\

Halflife ortalama ağ gecikmesi hesaplandığında kullanılır. Daha büyük değer --> daha az uçucu ağ gecikme hesaplaması. Defaults `5` m'ye kadar.

---ağ zaman aşımı `--network-timeout-coefficient`

Eserlere yönelik `talepler, \[network-timeout-coefficient\] aşımı` \[network-timeout-coefficient\] istek latency\]] 'dan sonra zaman alacak. Defaults `2`'ye kadar.

`--network-health-min-conn-peers` \(uint\)\

Bu kadar çok arkadaşa bağlı olursa düğüm, sağlıksız rapor edecektir. Defaults `1`'e

`---ağ --network-health-max-time-since-msg-received fazla --network-health-max-time-since-msg-received zamandan beri alındı` \(duration\):

Bu kadar zaman içinde mesaj almadığı takdirde Node sağlıksız rapor edecektir. 1 `m'ye` çıkarılıyor.

`--network-health-max-time-since-no-requests fazla zaman istek` --network-health-max-time-since-no-requests

Bu kadar zaman içinde mesaj almadığı takdirde Node sağlıksız rapor edecektir. 1 `m'ye` çıkarılıyor.

`---ağ --network-health-max-portion-send-queue-full --network-health-max-portion-send-queue-full` \(float\)\

Bu bölümden daha fazlası gönderilen kuyruklar ise düğüm, sağlıksız rapor edecektir. - 10,1'de olmalı. Defaults `0.9`'a.

---ağ `--network-health-max-send-fail-rate` oranı \(float\):

Bu mesajın bu kısmından daha fazla hata göndermesi durumunda düğüm, sağlıksız rapor edecektir. - 10,1'de olmalı. Tahliye `0.25`'e çıkarıldı.

-`--inbound-connection-throtting-cooldown` \(duration\)

-`--inbound-connection-throttling-max-recent` \(uint\

Node sadece bir IP üzerinden bağlanan bir bağlantı kabul eder, eğer son `içe içe doğru bağlantı yakma` kodlamasında bunu yapmadığı takdirde (güncelleme girişimi\ ) Düğün, `sadece` `bağlanma iletimi için en üst düzey olan tüm from bağlanma iletimi inbound-connection-throttling-max-recent inbound-connection-throttling-max-recent tüm from gelen maksimum inbound-connection-throttling-max-recent inbound-connection-throttling-max-recent için` izin sağlar--

### Göç Listesi Gossiping

Her düğüm, güncel bir akran listesi olabilsin diye birbirleriyle dedikodu yapar. `Ağ` listesi büyüklüğündeki akraba kanal `ve` akran listesinin dedikodu boyutuna `kadar, ağ kanal dedikodu frekansı -ağ kanal ve akraba dedikodu` frekansı.

---ağ `--network-peer-list-gossip-frequency` frekansı \(süre):

1 `m'ye` çıkarılıyor.

`--network-peer-list-gossip-size` boyutu \(int\):

`50`'ye çıkarılıyor.

---ağ `--network-peer-list-size` \(int\):

`20`'ye çıkarılıyor.

### Eklenti Kipi

`---eklenti` etkinleştirilen\ (bool\)\

Eğer doğruysa, düğümleri [bir](https://github.com/hashicorp/go-plugin) eklenti olarak çalıştırır. Yanlış yere `düşürülür`.

### Subnet Whitelist

`--whitelisted-subnets`

Bu düğümün eklendiğinde geçerli olacağı alt ağların komma listesini ayırdı. Boş olarak Defaults (sadece Ana Ağ (% 1) onaylanacaktır.

### Sanal Makine \(VM\ ) Yapılandırma<a id="vm-configs"></a>

`--vm-aliases-file` \(string\):

Sanal Makine kimlikleri tanımlayan JSON dosyasına giden yol. `to` defaults Örnek içeriği:

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

Yukarıdaki örnek VM'yi `"tGas3T58KzdjLHDMNNH2TvrdhqTji5iZAMZ3RXs2NLpSnhh"``` olarak `adlandırır`.


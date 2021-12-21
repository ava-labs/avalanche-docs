# AvalancheGo Sürüm Notları

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md" %}

##
v1.6.5 ([Github'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.5))

Bu sürüm geriye doğru [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0) ile uyumludur. İsteğe bağlıdır ama teşvik edilir.

**Bootstrapping**

- Bir zincire gelen mesajlar, o zincir bootstrap işlemini yürütme evresindeyse düşürülür.
- Beacon düğüm kimlikleri (nodeID'ler), o düğümlere bağlanılamaması üzerine yazdırılır.

**Metrikler**

- `avalanche_{ChainID}_bootstrap_finished` ögesi eklendi; zincir bootstrapping işlemini bitirdiyse 1 değerini alır, aksi durumda 0 değerini alır.

**API'ler**

- Ağın yerel düğüm hakkındaki görüşünü rapor edecek API çağrısı `info.uptime` eklendi.
- `info.peers` ögesinde yer alan her bir eşin sonuç bilgilerine `observedUptime` bilgisi eklendi.

**Ağ**

- Bir yerel düğümün ağ tarafından gözlenen uptime'ını daha iyi takip edebilmek için pong mesajlarına rapor edilen uptime eklendi.
- Olası bir yarış durumunun önüne geçmek için istek zaman aşımı kaydı yeniden faktörlendi.


## v1.6.4 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.4))

Bu sürüm geriye doğru [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0) ile uyumludur. İsteğe bağlıdır ama teşvik edilir.

**Yapılandırma**

- Bir eşin maksimum ortalama gelen bant genişliği kullanımını belirten `throttler-inbound-bandwidth-refill-rate` bayrağı eklendi.
- Bir eşin maksimum gelen bant genişliği kullanımını belirten `throttler-inbound-bandwidth-max-burst-size`
   bayrağı eklendi.

**Networking**

- Eş listesi gossiping'i, diğer gossip çağrılarıyla aynı mekanizmayı kullanacak şekilde güncellendi.
- Son bant genişliği kullanımına dayalı olarak gelen mesaj kısıtlaması eklendi.

**Metrikler**

- `avalanche_{ChainID}_handler_gossip_{count,sum}` ögesi `avalanche_{ChainID}_handler_gossip_request_{count,sum}` ögesi şeklinde güncellendi.
- `avalanche_{ChainID}_lat_get_accepted_{count,sum}` ögesi `avalanche_{ChainID}_lat_accepted_{count,sum}` ögesi şeklinde güncellendi.
- `avalanche_{ChainID}_lat_get_accepted_frontier_{count,sum}` ögesi `avalanche_{ChainID}_lat_accepted_frontier_{count,sum}` ögesi şeklinde güncellendi.
- `avalanche_{ChainID}_lat_get_ancestors_{count,sum}` ögesi `avalanche_{ChainID}_lat_multi_put_{count,sum}` ögesi şeklinde güncellendi.
- `avalanche_{ChainID}_lat_pull_query_{count,sum}` ve `avalanche_{ChainID}_lat_push_query_{count,sum}` ögeleri `avalanche_{ChainID}_lat_chits_{count,sum}` ögesi ile birleştirildi.
-  `avalanche_{ChainID}_app_response_{count,sum}`eklendi.
- `avalanche_network_bandwidth_throttler_inbound_acquire_latency_{count,sum}` eklendi.
- `avalanche_network_bandwidth_throttler_inbound_awaiting_acquire` eklendi.
- `avalanche_P_vm_votes_won` eklendi.
- `avalanche_P_vm_votes_lost` eklendi.

**İndeksleyici**

- İstemci implementasyonuna `GetContainerByID` metodu eklendi.
- İstemci metotları şimdi bir konteynerin `string` temsilleri yerine `[]byte` döndürüyor.

**C-Chain**

- Geth bağımlılığı 1.10.11'e güncellendi.
- Günlük kaydı düzeyini ve ölçüm performansını güncellemek için yeni bir admin API eklendi.
- İşlemlerin EIP-155 tekrarlama saldırısı koruması olmadan yayınlanmasına imkan vermek için yeni bir `--allow-unprotected-txs` bayrağı eklendi.

**Subnet ve Kişiselleştirilmiş VM'ler**

- Olası tüm zincirlerin `--staking-enabled=false` ağlarında çalıştırılması sağlandı.


## v1.6.3 ([GitHub'da Görüntüleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.3))

Bu sürüm geriye doğru [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0) ile uyumludur. İsteğe bağlıdır ama teşvik edilir.

**Yapılandırma Seçenekleri**

- Varsayılan `--inbound-connection-throttling-max-conns-per-sec` değeri `256` olarak güncellendi.
- Varsayılan `--meter-vms-enabled` değeri `true` olarak güncellendi.
- Varsayılan `--staking-disabled-weight` değeri `100` olarak güncellendi.

**Metrikler**

- Mesaj engelleme yapıyorsa, `avalanche_network_buffer_throttler_inbound_awaiting_acquire` davranışı yalnızca artışa değiştirildi.
- Mesaj engelleme yapıyorsa, `avalanche_network_byte_throttler_inbound_awaiting_acquire` davranışı yalnızca artışa değiştirildi.
-  `meterVM`'lere `Block/Tx` metrikleri eklendi.
   -  `avalanche_{ChainID}_vm_metervm_build_block_err_{count,sum}`eklendi.
   -  `avalanche_{ChainID}_vm_metervm_parse_block_err_{count,sum}`eklendi.
   -  `avalanche_{ChainID}_vm_metervm_get_block_err_{count,sum}`eklendi.
   -  `avalanche_{ChainID}_vm_metervm_verify_{count,sum}`eklendi.
   -  `avalanche_{ChainID}_vm_metervm_verify_err_{count,sum}`eklendi.
   -  `avalanche_{ChainID}_vm_metervm_accept_{count,sum}`eklendi.
   -  `avalanche_{ChainID}_vm_metervm_reject_{count,sum}`eklendi.
   -  `avalanche_{DAGID}_vm_metervm_parse_tx_err_{count,sum}`eklendi.
   -  `avalanche_{DAGID}_vm_metervm_get_tx_err_{count,sum}`eklendi.
   -  `avalanche_{DAGID}_vm_metervm_verify_tx_{count,sum}`eklendi.
   -  `avalanche_{DAGID}_vm_metervm_verify_tx_err_{count,sum}`eklendi.
   -  `avalanche_{DAGID}_vm_metervm_accept_{count,sum}`eklendi.
   -  `avalanche_{DAGID}_vm_metervm_reject_{count,sum}`eklendi.

**Coreth**

- callTracer arıza giderme çözümü uygulandı.
- Runtime ortamında çoklu coin işlevleri başlatıldı.

**ProposerVM**

-  `--staking-enabled=false` olan ağlarda blok gecikmesi `Delay`, `0` olacak şekilde güncellendi.


## v1.6.2 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.2))

Bu sürüm geriye doğru [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0) ile uyumludur. İsteğe bağlıdır ama teşvik edilir.

**Yapılandırma Seçenekleri**
* `--coreth-config`kaldırıldı. [Buraya](../references/command-line-interface.md#c-chain-config) göz atın.
* `--throttler-inbound-node-max-processing-msgs` eklendi. [Buraya](../references/command-line-interface.md#message-rate-limiting-throttling) göz atın.
* `--db-config-file` eklendi. [Buraya](../references/command-line-interface.md#database-config) göz atın.

**API**
* API metodu `avm.exportAVAX` kaldırıldı. Bunun yerine `avm.export` kullanın.
* API metodu `avm.importAVAX` kaldırıldı. Bunun yerine `avm.import` kullanın.
* API metodu `info.peers` şimdi `PublicIP` alanını isteğe bağlı olarak sunuyor ve bu alanı yalnızca geçerli bir IP verildiğinde dolduruyor.
* API istemcisi `platform.getValidatorsAt` eklendi.
* API istemcisi `admin.lockProfile`, `lockProfile` ögesini doğru biçimde çağıracak şekilde düzeltildi.
* API istemcisi `health.health`, sağlıksız bir sunucudan gelen yanıtları gereği gibi ele alacak şekilde düzeltildi.
* Sağlık Kontrolü API'sinden alınan yanıtlar daha açıklayıcı olacak şekilde geliştirildi.

**Benchlist**
* Bir doğrulayıcının yanıtsız olması gereken minimum süre ve bir doğrulayıcının bench edileceği maksimum süre değiştirildi. Bunlar daha önce sırasıyla 5 dakika ve 30 dakika idi, şimdi 2,5 dakika ve 15 dakika oldu.

**Veri Tabanı**
* Kullanıcıların veri tabanı yapılandırmasını `--db-config-file` bayrağıyla belirlemelerine imkan verildi.

**Subnet'ler**
* Bir müşterinin bir subnet'i üyeliği yalnızca onaylı doğrulayıcılarla sınırlamak için private olarak yapılandırması olanağı eklendi.

**Networking**
* Gelen toplam mesaj tahsisinin varsayılan boyutu 32 MiB'den 6 MiB'ye değiştirildi.
* Giden toplam mesaj tahsisinin varsayılan boyutu 32 MiB'den 6 MiB'ye değiştirildi.
* Bir düğümün gelen toplam mesaj tahsisinden alabileceği maksimum bayt sayısı varsayılanı 4 MiB'den 2 MiB'ye değiştirildi.
* Bir düğümün giden mesaj tahsisinden alabileceği maksimum bayt sayısı varsayılanı 4 MiB'den 2 MiB'ye değiştirildi.
* Ayrıca gelen mesaj hızı sınırlaması eklendi. Bir düğüm bir eşten gelen mesajların `--throttler-inbound-node-max-processing-msgs`'den daha azını işleyene kadar o eşten gelen mesajların daha fazlasını okumayacaktır.
* Bir AppGossip mesajının gossip edildiği doğrulayıcı olmayanların varsayılan sayısı 2'den 0'a değiştirildi.
* Bir AppGossip mesajının gossip edildiği doğrulayıcıların varsayılan sayısı 4'den 6'ya değiştirildi.
* Bir VM için, yeknesak olarak rastgele gossip etmek yerine belirli doğrulayıcılara gossip etme olanağı getirildi.
* Bazı düğümlerin daha önce bağlantının kesildiği bir düğüme tekrar bağlanmaya asla teşebbüs etmemesine sebep olan bir sorun giderildi.

**ProposerVM**
* P-Chain'de yüksek miktarda blok yayını sırasında stabiliteyi iyileştirmek için P-Chain'e kötümser bir yükseklik ötelemesi eklendi.
* İstenen blok gecikmesi doğru bir şekilde uygulandı.

**Metrikler**
* API'den histogram metrikleri talebi X-chain ve P-chain'den kaldırıldı.
* P-chain mempool metrikleri eklendi.
* Platformvm'ye `validator_sets` metrikleri eklendi.

**Diğer**
* Düğümün başlatılması ve ardından aniden durdurulması durumunda yakışıksız shutdown'ları önlemek için düğüm startup ve shutdown süreçleri yeniden faktörlendi.
* Tahsis edilen baytların sayısını doğru takip etmek için P-chain mempool onarıldı.
* C-chain, geth 1.10.9'u çalıştırmak için upgrade edildi.
* C-chain için abigen desteklendi.
* C-chain'e pre-image (önceki görüntü) desteği eklendi.
* C-chain'de ücret geçmişi son noktası için destek eklendi.
* GRPC testlerini daha iyi desteklemek için kimlik alias'laması yeniden faktörlendi.
* Uçtan uca test dalı eşleştirme mantığı kaldırıldı.
* Veri tabanı taşıma süreç yöneticisinin kullanımdan kaldırılacağı ilan edilen ana giriş noktası kullanımdan kaldırıldı.

## v1.6.1 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.1))

Bu sürüm geriye doğru [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0) ile uyumludur. İsteğe bağlıdır ama teşvik edilir.

**Upgrade'ler**

* Subnet yapılandırmalarını belirleme imkânı eklendi
* Çeşitli yeni ağ yapılandırma değerleri eklendi
* Ağ kitaplığından eski mesajlar kaldırıldı
* Yerel ağlarda AddValidator işlemlerini etkileyen P-chain mempool hatası giderildi
* İşlem gossip kuralları, eşlerin yanı sıra sabit bir sayıda doğrulayıcıya da gossip etmek üzere değiştirildi
* Health API'den kullanımdan kaldırılacağı ilan edilmiş olan `getLiveness` kullanımdan kaldırıldı
* Doğrulayıcı olmayanlar arasındaki bağlantılara izin vermemek için yapılandırma seçeneği eklendi

**Not**

Aşağıdakilerin kullanımdan kaldırılacağı ilan edilmiştir ve artık kullanılmamalıdır. Bunlar gelecekteki herhangi bir sürümde kaldırılabilir:

* API metodu `avm.exportAVAX`, `avm.export` lehine kaldırılmalıdır.
* API metodu `avm.importAVAX`, `avm.import` lehine kaldırılmalıdır.
* Yapılandırma seçeneği `coreth-config`, bir [zincir yapılandırma](../references/command-line-interface.md#c-chain-config) dosyası lehine kaldırılmalıdır.

## v1.6.0 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0))

**Bu değişiklik geriye doğru önceki sürümlerle uyumlu değildir.**

Bu upgrade C-chain ve P-chain'e bir çekişme sınırlayıcı (contention limiter) ekler, C-chain'e blok temelli bir ücret getirir ve C-chain'de bazı dinamik ücret parametrelerini ayarlar.

Bu upgrade'deki değişiklikler **Mainnet'te 22 Eylül 2021 tarihinde saat 17:00'de (EDT saatiyle) veya 21:00'de (UTC saatiyle)** yürürlüğe girer. Değişiklikler yürürlüğe girmeden önce düğümünüzü upgrade etmeniz gerekir. Aksi takdirde düğümünüzde uptime kaybı yaşayabilirsiniz.

Daha fazla bilgi [burada](https://medium.com/avalancheavax/apricot-phase-four-snowman-and-reduced-c-chain-transaction-fees-1e1f67b42ecf) bulunabilir.

**Go**

AvalancheGo kurmak için gereken minimum Go versiyonu şimdi Go 1.16.8'dir

**Hata (Bug) Düzeltmeleri**

Timeout yöneticisinin başlatılması sırasında yarış durumu (race condition) onarıldı.

**Upgrade'ler**

* P-chain'de ve C-chain'de [Snowman++](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/proposervm/README.md) kullanıma sunuldu.
* VM<->VM iletişim katmanı kullanılarak P-Chain ve C-chain'e [mempool gossiping](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/platformvm/README.md) eklendi.
* C-chain bloklarına blok temelli bir ücret eklendi.
* C-chain dinamik ücret mekanizmasında minimum gaz fiyatı 25 nAVAX'a ve maksimum gaz fiyatı 1000 nAVAX'a ayarlandı.
* Gelen bağlantılar hız sınırı

**Yeni Metrikler**

* `avalanche_C_blks_built` / `avalanche_P_blks_built`: Sırasıyla C-Chain'de ve P-Chain'de yerel olarak kurulmuş olan blokların sayısı.
* `avalanche_C_blks_builds_failed` / `avalanche_P_blks_builds_failed`: Sırasıyla C-Chain'de ve P-Chain'de BuildBlock'a yapılmış başarısız çağrıların sayısı.

**Yapılandırma Seçenekleri**

* `inbound-connection-throttling-max-conns-per-sec` bayrağı eklendi. ( Bkz. [yapılandırma dokümanı.](../references/command-line-interface.md))
* Kullanımdan kaldırılacağı ilan edilen `inbound-connection-throttling-max-recent` bayrağı. Bu bayrak şimdi yok sayılır.

## PRE_RELEASE v1.6.0-fuji ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0-fuji))

**Bu sürümün mainnet'i çalıştıramadığını - ve bir mainnet konfigürasyonu ile çalıştırılması denendiğinde "mainnet is not supported" (mainnet desteklenmiyor) mesajı görüntüleneceğini lütfen aklınızda bulundurun.**

Bu upgrade C-chain ve P-chain'e bir çekişme sınırlayıcı (contention limiter) ekler, C-chain'e blok temelli bir ücret getirir ve C-chain'de bazı dinamik ücret parametrelerini ayarlar.

Bu upgrade'deki değişiklikler Fuji testnet'te 16 Eylül 2021 tarihinde saat 5 PM (EDT) itibarıyla yürürlüğe girer. Fuji güncellenip doğrulandıktan sonra Mainnet uyumlu bir sürüm yayımlanacaktır.

**Tüm Fuji düğümleri 16 Eylül 2021 tarihinde saat 17:00 (EDT saatiyle) öncesinde upgrade edilmelidir.**

**Upgrade'ler**

* P-chain'de ve C-chain'de [Snowman++](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/proposervm/README.md) kullanıma sunuldu.
* VM<->VM iletişim katmanı kullanılarak P-Chain ve C-chain'e [mempool gossiping](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/platformvm/README.md) eklendi.
* C-chain bloklarına blok temelli bir ücret eklendi.
* C-chain dinamik ücret mekanizmasında minimum gaz fiyatı 25 nAVAX'a ve maksimum gaz fiyatı 1000 nAVAX'a ayarlandı.
* Kurulan blokların sayısı ve başarısız blok kurma girişimlerinin sayısı metrikleri eklendi.

## v1.5.3 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.3))

Bu versiyon geriye doğru [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0) versiyonu ile uyumludur.

**Uptime**

* Staking ödülü almak için gereken minimum uptime %60'dan %80'e değiştirildi.

**Networking**

* 3 yeni ağ mesajı eklendi: `AppRequest`, `AppResponse` ve `AppGossip`. Bu mesajlar, bir blok zincirin instance'larının, kullandıkları VM'ler tarafından belirlenen şekilde, birbirlerine gelişigüzel veriler göndermelerine imkan verir. Daha önce, bir blok zincirin instance'ları birbirleriyle sadece konsensüs mesajları (`Put`, `PushQuery` vb.) göndererek iletişimde bulunabiliyorlardı. Bkz. `snow/engine/common/engine.go`.
* Bir `Pong` mesajının alınması üzerine, versiyonu uyumlu olmayan göndericiyle bağlantıyı kes.
* `common.Sender`'de adı geçen metodun baş tarafına `Send` eklendi; bunun amacı netlik sağlamaktı (ör. `Put` --> `SendPut`).

**P-Chain**

* Bloka göre doğrulayıcı ağırlığındaki değişiklikleri izleme fonksiyonu eklendi.
* Bir subnet'in (veya Birincil Ağ'ın) belli bir P-Chain yüksekliğindeki doğrulayıcı kümesinin getirilmesine imkan veren API metodu `GetValidatorsAt` eklendi.

**C-Chain**

* Geth v1.10.8'deki değişiklikleri aktarır
* Eskilere referansları kaldırır

**Konsensüs**

* `snowman.Block` arayüzüne `Timestamp()` metodu eklendi.

**Yerel Ağlar**

* Yerel genesis'te doğrulayıcıların başlangıç zamanı güncellendi. v1.5.3 öncesi versiyonlarda yerel yapılandırmada belirlenen doğrulayıcılar için son tarih 10 Eylül 2021 00:00:00 UTC'dir. **Bu nedenle, bu tarihten sonra yerel bir ağ çalıştırmak için AvalancheGo v1.5.3'e upgrade yapmanız gerekir.**

**Yapılandırma Seçenekleri**

* Bir `AppGossip` mesajının gossip yaptığı eşlerin sayısını belirleyen AvalancheGo yapılandırma seçeneği `consensus-app-gossip-size` eklendi.
* C-Chain yapılandırma seçeneği `log-level` eklendi. Seçenekler şunlardır: `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"`, `"crit"`. Varsayılan olarak (önceki gibi) `"debug"`'a ayarlıdır.

## v1.5.2 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.2))

Bu güncelleme geriye doğru [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0) ile uyumludur. Lütfen v1.5.0 sürümünde beklenen güncelleme tarihlerine bakın.

**Coreth**

* Bir [Geth güvenlik açığı](https://twitter.com/go_ethereum/status/1430067637996990464) yaması eklendi
* Api backend'ine bir panik yaması eklendi.

**AVM**

* Daha iyi tooling için durumsuz codec üretimi sunuldu.

**Konsensüs**

* Balon oylara (bubbling votes) dair ek günlük kaydı eklendi.

## v1.5.1-eth_call ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1-eth_call))

Bu güncelleme geriye doğru [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0) ile uyumludur. Lütfen v1.5.0 sürümünde beklenen ağ upgrade tarihlerine bakın.

Bu güncelleme, v1.5.1 için harici olarak sahip olunan hesap kontrolü olmadan eth_call kullanılmasına imkan veren bir canlı düzeltmedir (hotfix).

## v1.5.1 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1))

Bu güncelleme geriye doğru [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0) ile uyumludur. Lütfen v1.5.0 sürümünde beklenen ağ upgrade tarihlerine bakın.

**Yapılandırma**

* `bootstrap-retry-max-attempts` seçeneği kaldırıldı ve `bootstrap-retry-warn-frequency` seçeneği eklendi

**Subnet'ler**

* Handshake mesajına `subnetID`'ler eklendi. Bu mesaj, bir düğümün hangi subnetler ile senkronize olmayla ilgilendiğini eşlere bildirir.
* Subnet konteyner gossiping'i optimize edildi.

**AVM**

* `avm.GetTx`'ların JSON son noktası, UTXO'lardaki `amount`'ların gereği gibi bildirilmesi onarıldı.

**Bootstrapping**

* Bir düğümün internetinin bootstrapping sırasında koparak düğümün bir onulmaz hata bildirmesine sebep olması halinde meydana gelebilecek busy loop (meşgul döngü) onarıldı.

**RPCChainVM**

* Doğrulanmamış blokların ön belleğe alması iyileştirildi.

**Coreth**

* Geth v1.10.7'ye güncellendi.

## v1.5.0 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0))

**Bu değişiklik geriye doğru önceki sürümlerle uyumlu değildir.**

Bu upgrade C-chain'e diğer çeşitli iyileştirmelerle birlikte dinamik ücretler ekler.

Bu upgrade'deki değişiklikler Mainnet'te 24 Ağustos 2021 tarihinde saat 10 AM EDT itibarıyla yürürlüğe girer. Değişiklikler yürürlüğe girmeden önce düğümünüzü upgrade etmeniz gerekir. Aksi takdirde düğümünüzde uptime kaybı yaşayabilirsiniz.

Daha fazla bilgi [burada](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60) bulunabilir.

**Ağ Upgrade'leri**

* C-chain'e dinamik ücret hesaplamaları eklendi.
* `CreateSubnetTx` ve `CreateChainTx` ücretleri arttırıldı.
* Yetkilendirici doğrulamasında yığın bozulması (heap corruption) hatası onarıldı.
* Yetkilendirme işlemleri için `MaxStakeWeight` yürürlüğe girdi.

**İstemci Upgrade'leri**

* X-chain'e tarihsel işlem aramalarının adrese ve varlığa göre yapılmasına imkan vermek için işlem indeksleme yetenekleri eklendi.
* Docker image'a varsayılan komut olarak `./avalanchego` eklendi.
* Docker image'da statik dependency versiyonları kullanıldı.
* Veri tabanı taşıma desteği ve deamon runner kaldırıldı.
* Düğüm config parsing'i yeniden faktörlendi.
* Konteyner gossiping örneklemesi optimize edildi.
* AvalancheGo ve EVM binary'lerini statik olarak kurma yeteneği eklendi.
* `Block` arayüzünü, tüm ana bloku getirmek yerine sadece ana blok ID'sini ortaya çıkaracak şekilde sadeleştirmiştir.
* Konsensüs motorlarında bekleyen işler için ek metrikler eklendi.
* Blok zincir doğrulama durumlarını işlem onaylama durumlarından ayrı olarak yönetmek için P-chain durumları yeniden faktörlendi.

**Güncellenen API'ler**

* `avm` API'sine `GetAddressTxs` eklendi.
* Günlük düzeylerinde düğüm hâlâ çalışıyorken ince ayar yapılmasına imkan vermek için `Admin`'ye `SetLoggerLevel` ve `GetLoggerLevel` eklendi.
* Düğümün şu anda kullanmakta olduğu düğüm yapılandırmasının getirilmesine imkan vermek için `Admin` API'ye `GetConfig` eklendi.
* `GetCurrentValidators` ve `GetPendingValidators` komutlarında `nodeID` (düğüm kimlikleri) belirtilmesine imkan vermek için `platformvm.Client` ögesi güncellendi ve `GetStake`'e verilen yanıt genelleştirildi.

**Güncellenen CLI Argümanları**

* `fetch-only` kaldırıldı.
* `avm` VM'ye JSON konfigürasyonunu parse etme işlevi eklendi.
   * `indexTransactions` eklendi.
   * `indexAllowIncomplete` eklendi.

## PRE_RELEASE v1.5.0-fuji ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0-fuji))

**Bu sürümün mainnet'i çalıştıramadığını ve bir mainnet yapılandırmasıyla çalıştırılması denendiğinde "this node version doesn't support mainnet" (bu düğüm versiyonu mainnet'i desteklemiyor) mesajının gösterileceğini lütfen aklınızda bulundurun. Bir mainnet düğümü çalıştırırsanız, resmi sürüm gelecek hafta yayımlanana kadar herhangi bir işlem yapılması gerekli değildir.**

**Bu değişiklik geriye doğru önceki sürümlerle uyumlu değildir.**

Bu upgrade C-chain'e diğer çeşitli iyileştirmelerle birlikte dinamik ücretler ekler.

Upgrade'deki değişiklikler Fuji testnet'te 16 Eylül 2021 tarihinde saat 3 PM EDT itibarıyla yürürlüğe girer. Fuji güncellenip doğrulandıktan sonra mainnet uyumlu bir sürüm yayımlanacaktır.

**Ağ Upgrade'leri**

* C-chain'e dinamik ücret hesaplamaları eklendi.
* `CreateSubnetTx` ve `CreateChainTx` ücretleri arttırıldı.
* Yetkilendirici doğrulamasında yığın bozulması (heap corruption) hatası onarıldı.
* Yetkilendirme işlemleri için `MaxStakeWeight` yürürlüğe girdi.

**İstemci Upgrade'leri**

* X-chain'e tarihsel işlem aramalarının adrese ve varlığa göre yapılmasına imkan vermek için işlem indeksleme yetenekleri eklendi.
* Docker image'a varsayılan komut olarak `./avalanchego` eklendi.
* Docker image'da statik dependency versiyonları kullanıldı.
* Veri tabanı taşıma desteği ve deamon runner kaldırıldı.
* Düğüm config parsing'i yeniden faktörlendi.
* Konteyner gossiping örneklemesi optimize edildi.
* AvalancheGo ve EVM binary'lerini statik olarak kurma yeteneği eklendi.
* `Block` arayüzünü, tüm ana bloku getirmek yerine sadece ana blok ID'sini ortaya çıkaracak şekilde sadeleştirmiştir.
* Konsensüs motorlarında bekleyen işler için ek metrikler eklendi.
* Blok zincir doğrulama durumlarını işlem onaylama durumlarından ayrı olarak yönetmek için P-chain durumları yeniden faktörlendi.

**Güncellenen API'ler**

* `avm` API'sine `GetAddressTxs` eklendi.
* Günlük düzeylerinde düğüm hâlâ çalışıyorken ince ayar yapılmasına imkan vermek için `Admin`'ye `SetLoggerLevel` ve `GetLoggerLevel` eklendi.
* Düğümün şu anda kullanmakta olduğu düğüm yapılandırmasının getirilmesine imkan vermek için `Admin` API'ye `GetConfig` eklendi.
* `GetCurrentValidators` ve `GetPendingValidators` komutlarında `nodeID` (düğüm kimlikleri) belirtilmesine imkan vermek için `platformvm.Client` ögesi güncellendi ve `GetStake`'e verilen yanıt genelleştirildi.

**Güncellenen CLI Argümanları**

* `fetch-only` kaldırıldı.
* `avm` VM'ye JSON konfigürasyonunu parse etme işlevi eklendi.
   * `indexTransactions` eklendi.
   * `indexAllowIncomplete` eklendi.

## v1.4.12 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12))

Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ama teşvik edilir.

**X-Chain**

* API metodu `GetTx`'e `"json"` formatlama argümanı eklendi; bu argüman sorgulanan işlemin JSON temsilini döndürür
* Arayüz tip assertion'ları eklendi

**Info API**

* Info API'ye `GetNodeVersion` metodu eklendi

**Prometheus Metrikleri**

* Sıkışma nedeniyle gönderilmeyen baytlara ilişkin metrikler onarıldı ve yeniden adlandırıldı
* Sıkışma nedeniyle alınmayan baytlara ilişkin metrikler eklendi
* `metrics` paketine `noAverager` yardımcı yapısı eklendi

**Veri Tabanı**

* Benchmark'lar güncellendi/eklendi

**Paylaşılan Bellek**

* Gelecekte atomik işlem optimizasyonuna imkan vermek için `Put` ve `Remove` yerine `Apply` getirildi

## v1.4.11 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11))

**C-Chain**

Bu sürüm varsayılan olarak anlık görüntülere imkan verir.

**Config Bayrakları**

_Kaldırıldı_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_Eklendi_

* `network-compression-enabled`

**Prometheus Metrikleri**

Birçok Prometheus metriği yeniden adlandırıldı ve birçok histogram 2 ölçü ile değiştirildi. Güncellenen Grafana Gösterge Panelleri için [buraya](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards) bakın.

Bu sürüm `utils/metric` paketine yardımcı yöntemler de ekler.

**RocksDB**

RocksDB bundan böyle build script çalıştırılırken varsayılan olarak kurulmuyor ve herkese sunulan binary'lerde yer almıyor. AvalancheGo'yu RocksDB ile kurmak için terminalinizde önce `export ROCKSDBALLOWED=1` ve ardından `scripts/build.sh` komutunu çalıştırın. `--db-type=rocksdb` ögesini kullanabilmeniz için önce bu işlemi yapmanız gerekir.

RocksDB veri tabanı şimdi dosyalarını `rocksdb` alt dizinine yerleştirir ve orada arar. Daha önce RocksDB ile çalıştırdıysanız mevcut dosyaları taşımanız gerekeceğini aklınızda bulundurun.

**Mesaj Sıkıştırma**

Düğümler şimdi bazı P2P mesajlarını sıkıştırıyor. Bir eş (peer) v1.4.11 ve üstü versiyon ise, o eşe gönderilen Put, Push, Query, Peer List ve Multiput mesajları ağ üzerinden gönderilmeden önce gzip kullanılarak sıkıştırılır. Bu, AvalancheGo'nun bant genişliği kullanımını azaltır.

**Gelen Bağlantıyı Kısma** (Inbound Connection Throttling) Gelen bağlantı hız sınırlaması yeniden faktörlendi ve varsayılan olarak etkinleştirildi.

**Genel İyileştirmeler**

* gRPC'nin bir plugin'e sunduğu bir veri tabanı üzerindeki iterasyon performansı yeniden faktörlendi ve iyileştirildi.
* Linux'ta, AvalancheGo yakışıksız bir şekilde ölürse C-Chain'i temizleyin
* P2P (eşten eşe) mesaj tanımları yeniden faktörlendi ve `network` paketinden taşındı.
* HTTP API sunucusuna VM alias'ları eklendi
* `1024` yerine `units.KiB` vb. getirildi
* Bölüntü (partition) toleransı, karşılık gelen sorguların yaratılması maksadıyla chit'ler işlenmesi suretiyle iyileştirildi.

**Fuji IP'leri**

Fuji Testnet'in bootstrap IP'leri güncellendi.

## v1.4.10 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10))

**Apricot Faz 2 - Yama 10**

{% hint style="warning" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir.{% endhint %}

Bu yama performans, kısma (throttling) ve VM iyileştirmeleri içerir:

* Desteklenen mimarilerde `LevelDB` yerine `RocksDB` kullanılması için destek eklendi.
* Gelen ağı kısma (throttling) işlevi, eş düğümlerin bant genişliği kullanımını sınırlandırmak için, her bir düğüm bazında olacak şekilde yeniden yapılandırıldı.
* Giden ağı kısma (throttling) işlevi, tahsis edilen baytları stake'e göre ağırlıklandırmak için yeniden yapılandırıldı.
* C-chain'de `pruning-enabled` bayrağının varsayılan değeri `true` olarak güncellendi.
* Kişiselleştirilmiş VM'lerin RPC üzerinden kaydedilmesi imkanı getirildi.
* Blok zincir durumu, doğrulama durumunu rapor edecek şekilde güncellendi.
* `TimestampVM`, beklenen VM yaratma yoluyla eşleşmesi için kendi repository'sine taşındı.
* Protobuf code-gen script'i `grpc` dosyalarının doğru konuma yerleştirilmeleri için onarıldı.
* Blok baytları, potansiyel bir önbellek tahliye (cache eviction) doğrulama arızalarından kaçınmak için `rpcchainvm#Block.Verify`'den geçirildi.

## v1.4.9 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9))

**Apricot Faz 2 - Yama 9**

{% hint style="warning" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir.{% endhint %}

Bu yamada performans iyileştirmeleri ve izleme iyileştirmeleri yer alır:

* C-chain'i budama işlevi etkinleştirilmiş olarak çalıştırmak için destek eklendi. Budama işlevi şu anda varsayılan olarak devre dışıdır.
* C-chain Websocket ping aralığı, yük dengeleyicinin gerisinde kaldığında bağlantı kopmalarını azaltmak için düşürüldü.
* Snowman Blok arayüzüne zaman damgası eklendi.
* C-chain API'de websoketler üzerinden yapılan aramalarda maksimum süre kuralı (max duration enforcement) hatası onarıldı.
* Http son noktası için gzip başlık desteği eklendi.
* `info.getNodeVersion` son noktasına ilave versiyon açıklamaları eklendi.
* 1.4.5 ve altı düğüm versiyonlarına bağlanma kısıtlandı.
* Daemon günlükleri birincil günlük klasörüne taşındı.
* Deterministik örnekleme için destek eklendi.
* Yeni etiketler için otomatik dağıtımlı GitHub eylemi eklemiştir.
* Config yönetimi, düğümlerin programatik olarak başlatılmasını daha iyi desteklemek için yeniden faktörlendi.

## v1.4.8 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8))

**Apricot Faz 2 - Yama 8**

{% hint style="warning" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir.{% endhint %}

Bu yama performans iyileştirmeleri, izleme iyileştirmeleri ve subnet onarımları içerir:

* AVM'nin ücret tanımlaması, ücretlerin zincirin yerel varlığıyla ödenmesini zorunlu kılmak için değiştirildi. Bu değişiklik X-Chain'in davranışını değiştirmez ama diğer AVM instance'larını kullanılabilir kılar.
* Config'lerin spesifik zincirlere dahil edilmesi yeteneği eklendi. Bu, `coreth-config` CLI parametresinin kullanımdan kaldırılacağını ilan eder.
* Yeni giden bağlantılar sayısına hız sınırlaması eklendi.
* Bir zincire şeffaf metrikler ekleyen bir VM wrapper kullanıma sunuldu.
* Sürekli düğüm profilleme yapmaya imkan veren yetenek eklendi.
* Ağ katmanındaki bayt tahsisleri azaltıldı.
* Gossip parametrelerinin ayarlamasına yönelik çeşitli CLI parametreleri eklendi.
* Düğümlerin diskten okunan bir anahtar çifti yerine kısa ömürlü (ephemeral) anahtar çifti kullanılarak çalıştırılması imkanı getirildi.
* Hatalı sahte uyarı kaldırıldı.
* CI testleri Travis'te çalışmak yerine Github Eylemlerinde çalışacak şekilde taşındı.
* Özel durumlar (special cases) VM arayüzünden kaldırıldı.

**Komut Satırı Argümanları Eklendi:**

* `profile-dir`
* `profile-continuous-enabled`
* `profile-continuous-freq`
* `profile-continuous-max-files`
* `chain-config-dir`
* `bootstrap-multiput-max-containers-received`
* `bootstrap-multiput-max-containers-sent`
* `boostrap-max-time-get-ancestors`
* `consensus-on-accept-gossip-size`
* `consensus-accepted-frontier-gossip-size`
* `meter-vms-enabled`
* `staking-ephemeral-cert-enabled`
* `outbound-connection-timeout`
* `outbound-connection-throttling-rps`

## v1.4.7 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7))

**Apricot Faz 2 - Yama 7**

{% hint style="warning" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama performans iyileştirmeleri ve hata onarımları içerir.
{% endhint %}

Daha önce kurulan düğüm versiyonu v1.4.4 ve altı ise, bu düğüm blokları işlemeyi durdurmuş olabilir. Bu güncelleme düğümü onaracak ve bir veri tabanı taşıması gerçekleştirecektir. Veri tabanı taşıması hakkında ayrıntılar için lütfen [v1.4.5 veri tabanı taşıması notları](avalanchego-v1.4.5-database-migration.md) bölümüne bakın. Daha önce kurulan düğüm versiyonu v1.4.5 ve üstü ise, bu düğüm mevcut veri tabanını kullanacak ve veri tabanı taşıması yapması gerekmeyecektir.

* Taşıma öncesindeki düğüm, P-chain bloku `SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`'yi doğru bir şekilde doğrulaması için onarıldı.
* `platformvm.GetBlockchains`'deki regresyon, birincil subnet blok zincirlerinin doğru bir şekilde döndürülmesi için onarıldı.
* grpc versiyonu v1.37'ye güncellendi.
* Peerlist örneklemesi optimize edildi.
* Veri tabanı benchmark'ları eklendi.
* Çeşitli tekrarlayan bellek tahsisleri azaltıldı.

## v1.4.6 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6))

**Apricot Faz 2 - Yama 6**

{% hint style="warning" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama performans iyileştirmeleri ve hata onarımları içerir.{% endhint %}

**Daha önce yüklenen düğüm versiyonu &lt;= v1.4.4 ise, bu düğüm bir veri tabanı taşıması yapacaktır. Veri tabanı taşıması hakkındaki detaylar için lütfen v1.4.5 sürüm notlarına bakın.** Daha önce kurulan düğüm versiyonu v1.4.5 ise, bu düğüm mevcut veri tabanını kullanır ve veri tabanı taşıması yapması gerekmez.

Bu yamayla:

* P-chain membool'a yüksek sürekliliği olan DB yazımlarına sebep olan geçersiz işlem gönderimini kaldırıldı.
* Veri tabanı dizinindeki veri tabanı dışı dosyalar ve klasörler yok sayıldı. Bunun spesifik olarak macOS'ta DS_Store dosyalarıyla ilgili olarak bildirilen hataları onarması beklenmektedir.
* Build-dir bayrağı upgrade öncesindeki düğümün hata vermesine sebep olmaksızın CLI yoluyla belirtilebilmesi için onarıldı.
* Artık düğüm yöneticisi daemon'ı ile desteklenmeyen plugin-dir bayrağı kaldırıldı. Bayrağın belirtilmemesi tipik olarak doğru davranışı sağlamaktadır. Bununla beraber, karmaşık kurulumlar için build-dir bayrağı gerekli olabilir.
* Gossip mesajlarının sadece peer handshake'ini bitirmiş olan bağlantılara gitmesi kuralı getirildi.
* Konsensüs traversal'leri ve bootstrapping sırasında bellek tahsisleri azaltıldı.

## v1.4.5 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5))

**Apricot Faz 2 - Yama 5 - Veri Tabanı Upgrade'i**

**Bu upgrade, tipik bir versiyon güncellemesinden daha karmaşıktır. Daha ayrıntılı talimatlar ve SSS** [**burada**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)bulunabilir**.**

{% hint style="warning" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama önemli performans iyileştirmeleri ve çok sayıda diğer güncellemeler içerir.{% endhint %}

**VM İyileştirmeleri:**

* `platformvm`'nin durum yönetimi bütünüyle yeniden tasarlandı.
   * Bloklar yoluyla aktarılan `versiondb`'lerin, nesneler yeniden parse edilmeksizin değiştirilip okunabilen durum referanslarını aktarmak için kullanımı kaldırıldı.
   * Yazmaların düzgün bir şekilde önbelleğe alınarak altta yatan veri tabanına kaydedilmesi için bir temel durum yöneticisi implemente edildi.
   * Çoklu doğrulayıcı kümelerinin belleğe cache edilmesine imkan vermek için CoW doğrulayıcı kümeleri implemente edildi.
   * Kullanılmamış durum nesnelerine dokunmaktan kaçınmak için zincirler subnet'e göre indekslendi.
   * `addDelegator` ve `addSubnetValidator` işlemlerini kabul ederken gereksiz iterasyonlardan kaçınmak için doğrulayıcılar `nodeID`'ye göre indekslendi.
   * Diskteki doğrulayıcı kümelerini ve doğrulayıcı uptime'larını yönetmeye tahsis edilen anahtar-değer çiftlerinin sayısı azaltıldı.
* Ödüllerin indekslenmesini desteklemek için `platformvm`'nin API'sine staking ödülü aramaları eklendi.
* Testi basitleştirmek için doğrulayıcı uptime sayacı yeniden faktörlendi.
* `platformvm`'ye blok ve işlem tipi metrikleri eklendi.
* `avm`'ye ve `platformvm`'ye API çağrı metrikleri eklendi.
* `avm`'nin durum yönetimi, `prefixdb`'leri kullanacak, cache etme metriklerini kaydedecek ve `platformvm` ile ilave kod paylaşacak şekilde güncellendi.
* `UTXO` yönetimi ve `avm`'de ve `platformvm`'de indeksleme basitleştirildi.
* Adres parse etme işlevi ve yönetimi, uyumlu VM instance'larında tam olarak paylaşılacak şekilde yeniden yapılandırıldı.
* Birincil subnet'in paylaşılan belleği, VM instance'larında tam olarak paylaşılacak şekilde yeniden yapılandırıldı.
* Mevcut VM implementasyonlarında tutarlı cache'lemeyi desteklemek ve yeni VM'lerin implementasyonunu basitleştirmek için bir zincir durumu implementasyonu eklendi.
* Yeni zincir durumu yöneticisi `rpcchainvm`'ye -ki bu da çeşitli metrikler eklemektedir- entegre edildi.
* Gelecekteki ağ upgrade'lerini daha iyi desteklemek için standart VM arayüzüne `upgradeBytes` ve `configBytes` eklendi.
* `evm` API'ye `getAtomicTx` ve `getAtomicTxStatus` son noktaları eklendi.
* `evm`blok üretimi, konsensüs motoruyla senkronize olarak yapılacak şekilde basitleştirildi.
* Yetim olmuş atomik işlemleri yeniden kullanıma sunmak için bir atomik işlem mempool'u eklendi.
* `evm` istemcisindeki hata, `getAtomicUTXOs`'deki `sourceChain`'in düzgün bir şekilde ayarlanması için onarıldı.
* Blok yönetimini daha iyi optimize etmek için `evm`'ye yeni zincir durumu yöneticisi entegre edildi.

**Bootstrap İyileştirmeleri:**

* Bootstrap sırasında yeniden traversal'ler kaldırıldı. Bu, düğümün bootstrap sürecinin yeniden başlaması sırasında performansını arttırmaktadır.
* Bootstrap yapmış konteynerlerin yürütülmesi sırasında düğümden çıkma girişiminde bulunulduğunda yakışıksız düğüm kapanması onarıldı.
* Bootstrap sırasında mükerrer IPC konteyner yayınları onarıldı.
* Bootstrap işleri kuyruğu, kişiselleştirilmiş önek (prefix) implemente etmek yerine `prefixdb`'leri kullanarak duruma yazacak şekilde standartlaştırıldı.
* İlave bootstrap cache etme işlevi ve cache metrikleri eklendi.

**Veri Tabanı Taşıma Eklemeleri:**

* Güncellenen veri tabanı formatına sorunsuz taşıma için bir daemon süreç yöneticisi eklendi.
* Versiyon yönetimi, veri tabanı semantik versiyonlarını takip etmek için yeniden faktörlendi.
* Farklı veri tabanı versiyonlarında takip etmek ve işletmek için bir veri tabanı yöneticisi implemente edildi.
* Kullanıcıları `v1.0.0` veri tabanından `v1.4.5` veri tabanına otomatik olarak kopyalayan bir `keystore` taşıması implemente edildi.
* `v1.0.0` veri tabanından `v1.4.5` veri tabanına bir doğrulayıcı uptime'ı taşıması implemente edildi.

**Düğüm İyileştirmeleri:**

* Ortam değişkenlerini her zaman genişletmek için config parse etme işlevi güncellendi.
* TLS sertifikalarının diske dokunmadan bellekte belirtilmesine imkan vermek için düğüm yapılandırmasını yeniden faktörlendi.
* Anlamlı çıkış kodları için daha iyi destek eklendi.
* `http` ve `staking` sunucularını dinleme adresi, spesifik olmayan port eşlemelerini (mapping) desteklemeye yardımcı olmak için görüntülendi.
* Bir veri tabanı yoluyla aktarma ile bir `versioned` veri tabanı arasında geçiş yapabilmek için bir `versionable` veri tabanı implemente edildi.
* ID `Set` ön tahsisleri optimize edildi ve `struct`'ların bellek kullanımını azaltıldı.
* Daha katı linting kuralları getirildi.

**Komut satırı argümanları değiştirildi:**

Aşağıdaki argümanlar için `"default"` daha önce anahtar kelime olarak kullanılıyordu. Şimdi ise `"default"`, bayrağın öngörülen değeri olarak kullanılmaya çalışacak. Default davranışını muhafaza etmek için, bayrağın belirtilmemesi gerekir.

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

Aşağıdaki argümanlar için `""` daha önce anahtar kelime olarak kullanılıyordu. Şimdi ise `""`, bayrağın öngörülen değeri olarak kullanılmaya çalışacak. Default davranışını muhafaza etmek için, bayrağın belirtilmemesi gerekir.

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level`

`bootstrap-ips` ve `bootstrap-ids` ögelerinin eşleşmeleri bundan böyle zorunlu değildir. Yani, `bootstrap-ids`'den farklı bir `bootstrap-ips` sayısı belirtilmesi şimdi geçerlidir. `bootstrap-ips`'ler başlangıçta ağa bağlanmak için kullanılır ve `bootstrap-ids`'ler bootstrap işleminde beaconlar olarak kullanılır.

**Aşağıdaki komut satırı argümanları eklendi:**

* `fetch-only`
* `build-dir`

**Aşağıdaki komut satırı argümanları kaldırıldı:**

* `xput-server-port`
* `xput-server-enabled`

## v1.4.4 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4))

**Apricot Faz 2 - Yama 4**

{% hint style="warning" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir.{% endhint %}

Bu yama hata onarımları ve yakında gelecek `db-upgrade` sürümünü optimize etmeyi amaçlayan performans iyileştirmeleri içermektedir.

* En son zincir bir subnet'te bootstrap yaptı olarak işaretlenir işaretlenmez tüm zincirlerin işlemi bitirmesi için bootstrap işleminde kuyruk gecikmesi (tailing delay) atlandı.
* Diğer zincirlerin senkronize olmasını beklerken mesajları yönetmek için bootstrap sırasında mesaj yönetimi iyileştirildi.
* Mevcut örnekleyici (sampler) tahsisleri, mevcut örnekleyiciler yeniden kullanılmak suretiyle azaltıldı.
* Docker scriptleri yalnızca `master` branch'tan gelen görüntüleri push edecek şekilde güncellendi.
* Günlük formatlaması onarıldı.
* Hata mesajlarını iyileştirildi.

## v1.4.3 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3))

**Apricot Faz 2 - Yama 3**

{% hint style="warning" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir.{% endhint %}

Bu yama hata düzeltmeleri, güncellenmiş uptime izlemesi ve performans iyileştirmeleri içerir.

* Bir düğümün bootstrap sırasında ilerleyememesine sebep olabilecek bench edilmiş mesaj yönetimi onarıldı. Bu durum tipik olarak düğümün bootstrap'i bitirirken normal yürütmeye geçemediğinde yaşanıyordu.
* C-Chain codebase'de birçok işlem yayını isteği alan düğümlerin, başka bir düğüm tarafından üretilmiş bir bloku işleyene kadar geçici olarak blok üretmeyi durdurmasına sebep olabilen deterministik olmayan bir hata onarıldı.
* Bir eşe gönderilecek versiyon mesajlarının sayısı birle sınırlandırıldı.
* Apricot Faz 2'de kullanımdan kaldırılacağı ilan edilmiş olan miras handshake mesajları kaldırıldı.
* Uptime hesaplamaları için çevrimdışı olarak bench edilmiş olan düğümler işaretlendi.
* Doğrulayıcı kümesi, doğrulayıcı kümesi değişiklikleri sırasında daha performanslı olacak şekilde güncellendi.
* Ağ bağlantısı, bir eşe bağlantının kopması üzerine o eşe yeniden bağlanmaya yalnızca o eşin şu anda bir doğrulayıcı olması halinde teşebbüs edecek şekilde güncellendi.

## v1.4.2 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2))

**Apricot Faz 2 - Yama 2**

{% hint style="warning" %}
Bu güncelleme geriye doğru v1.4.0 ve v1.4.1 ile uyumludur. Upgrade'deki değişiklikler Fuji testnet'te 5 Mayıs 2021 tarihinde saat 10 AM EDT ve mainnet'te 10 Mayıs 2021 tarihinde saat 7 AM EDT itibarıyla yürürlüğe girer.{% endhint %}

Bu yama ayrıca gossip edilen peerlist mesajlarının boyutunu küçültür ve birkaç yeni bayrağı kullanıma sunar:

* `network-peer-list-size`, her bir `peerlist` mesajında gossip edilen eşlerin sayısını ayarlamaya imkan verir.
* `network-peer-list-gossip-size`, `peerlist` mesajları gossip edilecek eşlerin sayısının ayarlamaya imkan verir.
* `network-peer-list-gossip-frequency`, `peerlist`'lerin ne sıklıkta gossip protokolüyle yayılacağının ayarlanmasına izin verir.

## v1.4.1 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1))

**Apricot Faz 2 - Yama 1**

{% hint style="warning" %}Bu güncelleme geriye doğru v1.4.0 ile uyumludur. Lütfen v1.4.0 sürümünde beklenen güncelleme tarihlerine bakın.{% endhint %}

Bu yama, gossip edilen peerlist mesajlarının boyutunu azaltır ve beacon bağlantısı timeout süresinin startup'ta yapılandırılmasına imkan veren yeni bir `--bootstrap-beacon-connection-timeout` bayrağını kullanıma sunar.

## v1.4.0 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0))

**Apricot Faz 2**

{% hint style="danger" %}Lütfen bu değişikliğin geriye doğru önceki sürümlerle uyumlu olmadığını aklınızda bulundurun**.**

**İlgili blog yayınını** [**burada**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf) bulabilirsiniz**.**
{% endhint %}

{% hint style="warning" %}Bu upgrade, Ethereum Berlin upgrade'ini C-chain'e uygular, yeni bir AVM son noktası ekler ve çeşitli stabilite iyileştirmeleri içerir. Topluluktaki herkesin, düğümlerinin sağlıklı kalmasını sağlamak için mümkün olan en kısa zamanda güncelleme yapmasını öneririz.

Upgrade'deki değişiklikler Fuji testnet'te 5 Mayıs 2021 tarihinde saat 10 AM EDT ve mainnet'te 10 Mayıs 2021 tarihinde saat 7 AM EDT itibarıyla yürürlüğe girer.{% endhint %}

**Bu upgrade'in birincil bileşenleri şunları içerir:**

* Coreth, go-ethereum'un v1.10.2 versiyonuna bağımlı olacak şekilde güncellendi.
* Ethereum Berlin upgrade'i uygulandı. Spesifik olarak [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565), [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) ve [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930).
* ANT transferlerini ve ANT'lara ARC-20 wrapper'larını desteklemek için C-chain'e önceden derlenmiş yeni aktif akıllı sözleşmeler eklendi.
* Bir adresler filtresiyle eşleşen kabul edilmiş işlemlerin websocket bildirimini destekleyen bir AVM `/events` son noktası eklendi.
* Doğrulayıcı -> IP eşleşmelerini (mapping) iyileştirmek için iki yeni ağ bağlantısı (networking) mesaj tipi `SignedVersion` ve `SignedPeerlist` eklendi.
* Düğümün bir zincir bootstrap yaparken kapatılmasının zincirin yakışıksız bir şekilde kapanmasına sebep olan uzun zamandır var olan bir hata onarıldı.
* Plugin gRPC paketleri stabiliteyi iyileştirmek için büyük talepleri sayfalara ayıracak şekilde güncellendi.
* Avalanchego'nun ana binary'sini bir plugin olarak çalıştırma yeteneği eklendi.
* Leveldb bozulma korumasındaki potansiyel yarış durumu onarıldı.
* Otomatikleştirilmiş build script'ler çoklu mimarileri daha iyi desteklemek için güncellendi.

**Aşağıdaki komut satırı argümanları eklendi:**

* `plugin-mode-enabled`, plugin modunda çalışacak binary'yi belirler.

**Aşağıdaki komut satırı argümanları kaldırıldı:**

* `p2p-tls-enabled`
* `disconnected-check-frequency`
* `disconnected-restart-timeout`
* `restart-on-disconnected`

## v1.3.2 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2))

**Apricot Faz 1 - Yama 2**

{% hint style="danger" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama güvenlik iyileştirmeleri, hata onarımları ve izleme iyileştirmeleri içerir.{% endhint %}

**Güvenlik İyileştirmeleri**

* `Apricot Phase 1` öncesinde oluşturulan C-chain blokları için katı bir doğal (canonical) format yürürlüğe kondu. Bu format, `extra-data` blok alanında yapılan değişikliklerin, bootstrap sırasında zincirin durumunda değişiklikler meydana gelmemesini sağlar.
* Yalnızca şifrelenmiş değerlerin IPC üzerinden Avalanchego ve plugin süreçleri arasında gönderilmesini sağlamak için `Keystore` değiştirildi.

**Hata (Bug) Düzeltmeleri:**

* Yetkilendirme (delegation) üst limit hesaplamaları, bir yetkilendiriciyi çıkarmadan önce güncel yetkilendirme maksimumunun güncellemesini içerecek şekilde onarıldı. Bu onarım, yetkilendirme üst limitinin her zaman uygulanmasını sağlar.
* `AVM`'nin statik API'si, startup'ta doğru bir şekilde kaydedilecek kaydedilecek şekilde onarıldı.
* Düğüm `uptime` hesaplamaları, ağ upgrade'lerini dikkate alınacak şekilde güncellendi.

**İzleme İyileştirmeleri**

* Bir zincirde kabul edilen işlemlerin yerelde tutarlı bir sıralamasını sağlayabilen isteğe bağlı bir düğüm indeksleyici eklendi.
* Ansible envanteri sayısız iyileştirmeleri içerecek şekilde güncellendi (@moreati'ye sonsuz teşekkürler).

## v1.3.1 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1))

**Apricot Faz 1 - Yama 1**

{% hint style="danger" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama stabilite, izleme iyileştirmeleri ve küçük hata onarımları içerir.{% endhint %}

**Bu upgrade'in birincil bileşenleri şunları içerir:**

* Arm64 CPU'larda sıkıştırma yaparken C-chain segfault onarıldı.
* Kompleks düğüm izlemesine imkan vermek için yerel dosyalara grup izinleri eklendi.
* Api-auth-password-file bayrağından geçen Auth şifrelerinden beyaz boşluk kaldırıldı.
* longestRunningRequest ile değiştirildiği için timeSinceNoOutstandingRequests kaldırıldı.
* Ağ kısma işlevine ilave metrikler eklendi.
* Çeşitli kod temizlikleri.

**Aşağıdaki komut satırı argümanları eklendi:**

* `network-health-max-outstanding-request-duration`

**Aşağıdaki komut satırı argümanları kaldırıldı:**

* `network-health-max-time-since-no-requests`

## v1.3.0 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0))

**Apricot Faz 1**

{% hint style="danger" %}Lütfen bu değişikliğin geriye doğru önceki sürümlerle uyumlu olmadığını aklınızda bulundurun.

Bu upgrade C-chain gaz ücretlerini düşürür, C-chain gaz iadelerini kaldırır ve çeşitli güvenlik iyileştirmeleri içerir. Topluluktaki herkesin, düğümlerinin sağlıklı kalmasını sağlamak için mümkün olan en kısa sürede güncelleme yapmasını önemle rica ederiz.
{% endhint %}

Upgrade'daki değişiklikler Fuji testnet'te 25 Mart 2021 tarihinde saat 10 AM EST ve mainnet'te 31 Mart 2021 tarihinde saat 10 AM EST itibarıyla yürürlüğe girer.

**Bu upgrade'in birincil bileşenleri şunları içerir:**

* C-chain gaz bedeli 470 nAVAX'tan 225 nAVAX'a düşürüldü.
* C-chain gaz iadeleri kaldırıldı. Bu değişiklikte [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298) benimsenmiştir.
* C-chain doğrulaması, ağ upgrade'leri yaparken daha temiz olacak şekilde yeniden faktörlendi.
* Auth API, iptal edilen token'ları düzgün bir şekilde uygulamak üzere onarıldı.
* Beklenen imza formatının kullanılmasını sağlamak için Auth API güçlendirildi.
* Auth API'nin şifresi CLI argümanlarından kaldırıldı.
* Daha katı dosya izni kontrolleri eklendi.
* Küçük ölçekli bir ilave hata (error) yönetimi eklendi.
* Günlük yazıları diske yazılmadan önce temizlendi.
* HTTP son noktasına yapılandırılabilir kökenler (origin) eklendi.
* Startup'ta HTTP denemelerinin HTTP failover aktarımı kaldırıldı. Şimdi HTTP son noktasının HTTP'lere upgrade edilmesi başarısız olursa düğüm startup'ta kapanacak.

**Aşağıdaki komut satırı argümanları eklendi:**

* `api-auth-password-file`, Auth API'nin şifresi hangi dosyadan okunacaksa o dosyayı belirler.

**Aşağıdaki komut satırı argümanları kaldırıldı:**

* `api-auth-password`

## **v1.2.4 (**[**GitHub'da İzleyin**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)**)**

**Apricot Faz 0 - Upgrade 1 - Yama 4**

{% hint style="danger" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama stabilite ve izleme iyileştirmeleri içerir.
{% endhint %}

* Readme, depolama gereklerini düzeltmek için güncellendi.
* Bootstrap sırasında Avalanche İşlem (Tx) doğrulamasına ilave hata (error) yönetimi eklendi.
* Sayısız metrik güncellendi; bunlar arasında düğüm sağlığı ve veri tabanı kullanımı ile ilgili sayısız yeni metrikler eklenmesi, kullanılmayan ve geçersiz metriklerin kaldırılması ve bazı metrik adlarının değiştirilmesi yer alıyor.
* CI'ya ilave günlük kaydı eklendi.
* C-chain kritik zincirler listesine eklendi.

## **v1.2.3 (**[**GitHub'da İzleyin**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)**)**

**Apricot Faz 0 - Upgrade 1 - Yama 3**

{% hint style="danger" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama stabilite ve izleme iyileştirmeleri içerir.
{% endhint %}

* Güvenilmez sağlık kontrollerini kaldırmak için `[network, router, consensus]` sağlık kontrolü parametreleri ayarlandı.
* C-chain blok yönetimi basitleştirildi.

## **v1.2.2 (**[**GitHub'da İzleyin**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)**)**

**Apricot Faz 0 - Upgrade 1 - Yama 2**

{% hint style="danger" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama stabilite, performans ve izleme iyileştirmeleri içerir.{% endhint %}

* Tekrarlayan `SYN` çağrılarından kaçınmak için ağ kitaplığına IP alias'ları eklendi.
* Sizden bootstrap yapılırken bootstrap mesaj yönetimi onarıldı.
* `AdvanceTimeTx` gönderimi basitleştirildi.
* Yeni konsensüs sağlık kontrolleri eklendi.
* Düğüm sağlık günlük kaydı eklendi.
* Sağlık `GET` taleplerine sağlık yanıtları eklendi.
* Gelen mesaj günlükleri birleştirildi.
* `LevelDB` wrapper'a hata günlüğü kaydı eklendi.
* String parsing'inden kaçınmak için `rpcdb`'ye hata kodları eklendi.
* Reorganizasyon sayısını azaltmak için doğal (canonical) zincirin C-chain yönetimi iyileştirildi.
* `pending` blokunda yapılan mock çağrıların C-chain yönetimi iyileştirildi.

## **v1.2.1 (**[**GitHub'da İzleyin**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)**)**

**Apricot Faz 0 - Upgrade 1 - Yama 1**

{% hint style="danger" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama stabilite, performans ve izleme iyileştirmeleri içerir.

Bu güncellemede komut satırı argümanları olarak `network-timeout-increase` ve ‘network-timeout-reduction` argümanlarının kaldırıldığını lütfen aklınızda bulundurun.
{% endhint %}

Değişiklik Özeti:

* `platformvm.getStake` yanıtına `UTXO`lar eklendi.
* `info.peers` yanıtına benchlist raporlaması eklendi.
* Ağ bağlantısı (networking) katmanına ilave sağlık kontrolleri eklemiştir.
* Raporlanan bir metrik olarak `bağlanılan stake yüzdesi` (percent of stake connected) eklendi.
* Düğümün güncel uç noktaya yüksek iş çıkarma yeteneği dönemlerinde bile yetişmesini sağlamak için bootstrap yeniden başlatma mantığı eklendi.
* Bir zincirin başka bir zincirin bootstrap yapması nedeniyle geride kalmamasını sağlamak için subnet çapında bootstrap yapma eklendi.
* Gereksiz hesaplamadan kaçınmak için reddedilen blokların doğrulanması engellendi.
* Tercih edilmeyen blokların ağa gossip edilmesi kaldırıldı.
* Gözlenen ağ gecikme süresinin bir EWMA şemasının kullanılması için network timeout hesaplayıcısı değiştirildi.
* Ağ gecikme süresi hesaplamalarından `Get` talepleri kaldırıldı.
* Benchlisting algoritması temizlendi.
* Gönderimde düşen mesajların yönetimi temizlendi.
* Henüz yerine getirilmemiş (outstanding) talep ve timeout mantığı temizlendi.
* Profil adlarına ön ek getirilmesine imkan vermek için performans takibi genelleştirildi.
* Avalanche bootstrapping traversal'e ek cacheleme eklendi.
* Ansible lint'leme onarıldı.
* Eklenen komut satırı argümanları başlıca sağlık kontrolleri yapılandırmalarından oluşmaktadır. Ek olarak, değiştirilen ağ gecikme süresi hesaplamaları, bazı komut satırı argümanlarının adını değiştirmiştir.

Aşağıdaki komut satırı argümanları eklendi:

* `network-timeout-halflife`
* `network-timeout-coefficient`
* `network-health-min-conn-peers`
* `network-health-max-time-since-msg-received`
* `network-health-max-time-since-msg-sent`
* `network-health-max-portion-send-queue-full`
* `network-health-max-send-fail-rate`
* `network-health-max-time-since-no-requests`
* `router-health-max-drop-rate`
* `router-health-max-outstanding-requests`
* `health-check-frequency`
* `health-check-averager-halflife`
* `bootstrap-retry-enabled`
* `bootstrap-retry-max-attempts`

Aşağıdaki komut satırı argümanları kaldırıldı:

* `network-timeout-increase`
* `network-timeout-reduction`

## v1.2.0 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/tree/v1.2.0))

**Apricot Faz 0 - Upgrade 1**

{% hint style="danger" %}**Not: Bu yama geriye doğru önceki sürümlerle uyumlu değildir. Bu upgrade, X, C ve P zincirleri arasındaki karşılıklı transferlerle ilgili performans sorunlarını giderir. Topluluktaki herkesin, düğümlerinin etkilenmemesini sağlamak için mümkün olan en kısa zamanda upgrade yapmasını önemle rica ederiz.
 Ayrıca, upgrade'den sonra düğümlerin bağlanmasının fazladan birkaç dakika daha uzun sürebileceğini ve sürecin kesintiye uğramadan tamamlanmasına izin vermek gerektiğini aklınızda bulundurun.**
{% endhint %}

Bu upgrade'in birincil bileşenleri şunları içerir:

* C-Chain'de atomik içe aktarım doğrulaması onarıldı
* Atomik bonus bloklara izin vermek için kural istisnası mantığı eklendi
* Mükerrer delete'ler gönderilmesi halinde Paylaşılan Belleğe fail-fast (hızlı arıza bildirimi) mantığı eklendi
* Bir talepleri temizleme arızası nedeniyle snowman'de yoklamaların durabilmesi sorunu onarıldı
* Coreth'de bilinmeyen atalardan kaynaklanan BAD BLOCK (kötü blok) sorunu onarıldı
* Coreth'te doğal zinciri onar (repair canonical chain) script'indeki yarış durumu onarıldı
* Snowman'da işlenen blokların ve Avalanche'ta işlenen işlemlerin sayısı sınırlandırıldı
* Networking timeout varsayılan değerleri ve benchlist ayarları güncellendi
* İlk ağ istikrarsızlığından sonra hiçbir güvenlik ihlali olmadığı doğrulandı

## v1.1.5 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/tree/v1.1.5))

**Apricot Faz 0 - Yama 5**

{% hint style="danger" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama stabilite iyileştirmeleri içerir.
{% endhint %}

* Yeni zincirler kaydedilirken meydana gelebilecek ve P-chain'in ve http(s) son noktasının bloke olmasına sebep olabilecek potansiyel bir kilitlenme onarıldı.
* C-chain'de İşlem Kimliği -> Blok Yüksekliği indekslemesi onarıldı.
* C-chain'de debug_traceTransaction API'sinde boş sözleşmelerin kullanılma sunulmasının (deployment) zarif yönetimi eklendi.
* C-chain'de hata (error) yönetimi iyileştirildi.

## v1.1.4 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/tree/v1.1.4))

**Apricot Faz 0 - Yama 4**

{% hint style="danger" %}Bu güncelleme geriye doğru uyumludur. İsteğe bağlıdır ancak teşvik edilir. Bu yama CLI upgrade'leri, API hata onarımları, stabilite iyileştirmeleri ve performans iyileştirmeleri içerir.
{% endhint %}

* C-chain blok indekslerinin kabul edilmeyen bloklara belli bir yükseklikte eşlemlenebilme (map) sorunu giderildi.
* RPCChainVM'de yüksek API yükleri oluştuğunda meydana gelen VM çökmesi onarıldı.
* Avalanche Motorunda iyimser oy balonlaşması (bubbling), oyların işleme vertekslerinden doğru bir şekilde geçirilmesi için onarıldı.
* AVM'nin GetBalance ve GetAllBalances API metotlarına IncludePartial alanı eklendi. Bu yama, varsayılan davranışı, yalnızca harcanabilir bakiyeleri ve benzersiz olarak sahip olunan varlıkları döndürecek şekilde değiştirir.
* Kişiselleştirilmiş ağ kimlikleri için kişiselleştirilmiş genesis konfigürasyonları belirleme yeteneği eklendi.
* İlave IPC API işlevi eklendi.
* RPCChainVM'ye ilave cacheleme eklendi.
* Plugin dizin başvurusu (lookup) her zaman binary sürümleriyle çalışacak şekilde iyileştirildi.

## v1.1.3 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/tree/v1.1.3))

**Apricot Faz 0 - Yama 3**

{% hint style="danger" %}
Bu güncelleme isteğe bağlıdır ancak teşvik edilir. Bu yama API'lerle ilgili küçük hata onarımları içerir.
{% endhint %}

* C-chain günlüklerini filtrelemeye teşebbüs edildiğinde çağrının durması onarıldı.
* C-chain istemcisinin doğru multi-coin API'sini araması onarıldı.
* `avm` ve `platformvm` API istemcilerine `getAtomicUTXOs` eklendi.

## v1.1.2 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2))

**Apricot Faz 0 - Yama 2**

{% hint style="danger" %}
Bu güncelleme isteğe bağlıdır ancak teşvik edilir. Bu yama hata onarımları ve performans iyileştirmeleri içerir.
{% endhint %}

* Avalanche bootstrapping yaparken mükerrer traversal'lerin azaltılması için bootstrap'ı işleyen cache onarıldı.
* Bootstrap sırasında P-chain doğrulaması optimize edildi.
* Doğru girdi değerlerinin kullanılması için maksimum bench listesi hesaplaması onarıldı.
* CI'dan ekstra linter çalıştırmaları kaldırıldı.
* `snowman.Block` arayüzüne `Height` eklendi.

## v1.1.1 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1))

**Apricot Faz 0 - Yama 1**

{% hint style="danger" %}
Bu güncelleme isteğe bağlıdır ancak teşvik edilir. Bu yama hata onarımları ve performans iyileştirmeleri içerir.
{% endhint %}

* Kullanıcılar `Health` API'yi devre dışı bıraktığında düğüm çökmesi hatası onarıldı.
* Uptime takibinde bir düğümün uptime'ını fazla rapor edebilecek bir hata onarıldı.
* Verteks parsing'i bir `Codec` kullanacak şekilde yeniden faktörlendi.
* Durumlu ve durumsuz verteks yönetimini ayrıştırıldı.
* Codec'e alan başına düşen kesit uzunluğu (slice length) kontrolü eklendi.
* `TypeID`'leri bir arada gruplayan yeni bir codec tipi kullanıma sunuldu.
* CLI'ya mesaj limiti bayrakları eklendi.
* Gelecekteki bir veri tabanı taşıması sırasında kullanılmak üzere bir semanticdb eklendi.
* Zincir bağlamına Epoch takibi eklendi.
* İşlem doğrulaması sırasında döndürülen hata mesajlarından bazıları iyileştirildi.
* DB versiyonundaki GC baskısı azaltıldı.

## v1.1.0 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0))

**Apricot Faz 0**

{% hint style="danger" %}**Not: Bu upgrade geriye doğru önceki sürümlerle uyumlu değildir. Upgrade'ler en geç 7 Aralık Pazartesi günü saat 23:00'e (UTC saatiyle) veya 18:00'e (EST saatiyle) kadar yapılmalıdır. Daha önce aralık ayı ortalarında yapılması planlanan upgrade, şimdi önemli bir token kilidini açma hatasını (bug) onarmak için hızlandırılıyor. Topluluktaki herkesin, düğümlerinin etkilenmemesini sağlamak için mümkün olan en kısa zamanda upgrade'i yapmasını önemle rica ederiz.**{% endhint %}

Bu upgrade'de başlıca iki bileşen vardır:

* Yakın gelecek için planlanan ve Apricot Faz Sıfır Upgrade'i olarak adlandırdığımız Apricot ağ upgrade'imiz için genel hazırlıklar
* Stake edilebilir kilitli çıktıların kilit _**_time süresi geçtikten sonra kilidinin açılmasını önleyen bir sorunun giderilmesi

## v1.0.6 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6))

{% hint style="danger" %}
Bu sürümün [burada](https://docs.avax.network/build/apis/deprecated-api-calls) açıklanan breaking değişiklikler içerdiğini aklınızda bulundurun. platform.getTxStatus ve platform.getCurrentValidators ögelerinin varsayılan yanıt formatını değiştirir.
Bu güncelleme isteğe bağlıdır ancak teşvik edilir. Bu yama performans iyileştirmeleri ve bazı yaşam kalitesi iyileştirmeleri içerir.{% endhint %}

* platform.getTxStatus ve platform.getCurrentValidators ögelerinin kullanımdan kaldırılacağı ilan edilen formatları kaldırıldı.
* Keystore API'den içe aktarılan ve dışa aktarılan kullanıcıların hex kodlamaları için destek eklendi.
* Golang standart kitaplığında bulunan bir DoS güvenlik açığından kaçınmak için golang gerekliliği v1.15.5'e ayarlandı.
* Düğüm yazılımı ile etkileşimde bulunan yardımcılar olarak hareket edecek API istemcileri eklendi.
* Bir düğümün ağın geri kalanıyla bağlantısının kopması halinde bootstrapping'e geri dönme imkanı getirildi.
* UTXO'lar çoklu adreslere referans yaptıklarında GetUTXOs API'leri onarıdı.
* Binary kodlama, RPC seçeneklerini daha iyi genelleştirmek için yeniden faktörlendi.
* Pencere uzunluğunu doğru ayarlamak için IP blok filtrelemesi onarıldı.
* Codec paketi, farklı versiyonlara sahip çoklu codec'leri yönetebilecek şekilde genelleştirildi.
* Gelecekteki bir sürüme hazırlık olarak Vertex arayüzüne Epoch eklendi.
* CPU/Bellek kullanımında hızlı geçiş kontrollerini azaltmak için işlem hashing'i ertelendi.
* [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/) kullananlar için, URL gelecekteki bir sürümde kapatılacaktır. Lütfen [https://explorerapi.avax.network/](https://explorerapi.avax.network/)'e geçin.

Bu güncellemeyle ilgili yardım için [Geliştirici SSS](https://support.avalabs.org/en/collections/2618154-developer-faq) bölümünü takip edin, gene de sorunlarla karşılaşırsanız yardım için [Discord](https://chat.avax.network/) kanalımıza katılabilirsiniz.

## v1.0.5 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5))

{% hint style="danger" %}
Bundan sonraki sürüm olan v1.0.6'un [burada](https://docs.avax.network/build/apis/deprecated-api-calls) açıklanan breaking değişiklikler içereceğini aklınızda bulundurun. Yani, `platform.getTxStatus` ve `platform.getCurrentValidators` komutlarının yanıt formatı değişecektir.
{% endhint %}

Bu sürüm v1.0.5'teki değişiklikler geriye doğru önceki sürümlerle uyumludur.
Bu güncelleme isteğe bağlıdır ancak teşvik edilir. Bu yama performans iyileştirmeleri ve bazı yaşam kalitesi iyileştirmeleri içerir.

* C-chain API'sine, özel anahtarlar bir düğüme açık edilmeksizin atomik swap'lar gönderilmesine imkan veren `IssueTx` ve `GetUTXOs` komutları eklendi.
* Snowman istek yöneticisindeki bellek kaçağı oracle blok işlemesi ile düzeltildi.
* Mevcut fonları olduğundan az bildiren UTXO sayfalandırma hatası onarıldı.
* Zincir http günlükleri, insan tarafından okunabilir zincir günlükleri klasöründe canlıya taşındı.
* Yığınsal tahsislerden kaçınmak için kimliklerin yönetilme biçimi yeniden yapılandırıldı.
* Çoklu haritalar yaratılmasından kaçınmak için `UniformSampler`'lar optimize edildi.
* Sürekli belleği daha iyi kullandırmak için `ids.Set` kullanımı `[]ids.ID` lehine azaltıldı.
* `PrefixDB`'de `[]byte`'nin yeniden kullanımı eklendi.
* Sık arayüz çevrim tahsislerinden kaçınmak için tipe özgü sıralama fonksiyonları implemente edildi.
* Diskten gereksiz bilgi okumalarından kaçınmak için AVM yük kullanıcısı optimize edildi.
* Mesajın tam uzunluğu için soket gönderiminde bir bellek tahsisi + kopya kaldırıldı.

Bu güncellemeyle ilgili yardım için [Geliştirici SSS](https://support.avalabs.org/en/collections/2618154-developer-faq) bölümünü takip edin, gene de sorunlarla karşılaşırsanız yardım için [Discord](https://chat.avax.network) kanalımıza katılabilirsiniz.

## v1.0.4 ([GitHub'da İzleyin](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4))

![AvalancheGo sürüm notları v1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% hint style="danger" %}
Bu güncelleme isteğe bağlıdır ancak teşvik edilir. Bu yama yaşam kalitesi iyileştirmeleri ve çeşitli performans iyileştirmeleri içerir. Bu güncellemenin CLI parametrelerinin ya - ya da -- şeklinde ifadeye izin vermek yerine -- ile belirtilmesini gerektirdiğini aklınızda bulundurun. Örneğin, `-public-ip=127.0.0.1`'ye artık izin verilmez ve `--public-ip=127.0.0.1` olarak belirtilmelidir. Diğer durumlarda bu güncelleme geriye doğru uyumludur.
{% endhint %}

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

Bu güncellemeyle ilgili yardım için [Geliştirici SSS](https://support.avalabs.org/en/collections/2618154-developer-faq) bölümünü takip edin, gene de sorunlarla karşılaşırsanız yardım için [Discord](https://chat.avax.network) kanalımıza katılabilirsiniz.


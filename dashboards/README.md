# Grafana çizelgeleri.

Bunlar önceden yapılandırılmış Grafana [çizelgeleri, düğümleri izleme](../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md) ayarında gösterilen ayarla çalışmaktadır.

Önceden yapılandırılmış çizelge aktarmak için:

* Grafana’s web arayüzünü aç
* Sol araç çubuğuna `+` tıkla
* `JSON Aktar` ve sonra JSON dosyasını yükle ya da içeriği `panel json bölgesi üzerinden içeriye` aktarma içine yapıştır.
* `Prometheus`'u Veri Kaynağı olarak Seç

| Link | Tarif edilmesi |
| :--- | :--- |
| [Ağ Ağı](network.json) | Ağ bilgisi ile bir işaret panosu |
| [Veritaban](database.json) | Veritabanı işlemleri hakkında derinlik bilgisini içeren bir pano |
| [Makine](machine.json) | Bilgisayar düğümüyle ilgili bilgi devam ediyor. |
| [X-Chain](x_chain.json) | X-Chain operasyonu hakkında derinlik bilgileri gösteriyor |
| [P-Chain](p_chain.json) | P-Chain operasyonu hakkında derinlik bilgileri gösteriyor |
| [C-Chain](c_chain.json) | C-Chain operasyonu hakkında derinlik bilgileri gösteriyor |
| [Ana Dashboard](main.json) | Ana gösterge panosu, en önemli bilgileri gösteren, diğer çizelgelerle bağlantıları ile başlangıç noktası olarak kullanışlı. |


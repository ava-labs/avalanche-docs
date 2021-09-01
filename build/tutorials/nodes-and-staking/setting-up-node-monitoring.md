# Bir Çığ Düğününü İzle

_Bu dersi yazan toplum üyesi Jovica to teşekkür ederim. _Gerekirse ona bizim _[_Discord_](https://chat.avax.network) ile ulaşabilirsiniz._

## Tanıştırma

Bu ders notu 18.04 Ubuntu 18.04 veya 20.04 olduğunu varsayar \(bu ders vermenin Mac OS X versiyonu daha sonra gelir\).

Bu özel ders [AvalancheGo](https://github.com/ava-labs/avalanchego). bir örneğini izlemek için altyapı kurulmasını gösterecek. Kullanacağız:

* [Prometheus](https://prometheus.io/) veri toplayıp depolanıyor
* Makineyle ilgili bilgi almak için [node\_exporter](https://github.com/prometheus/node_exporter)
* AvalancheGo’s düğümle ilgili bilgi almak için [metrik API](https://docs.avax.network/build/avalanchego-apis/metrics-api)
* [Grafana](https://grafana.com/) bir gösterge panosundaki verileri görselleştirmek için.

Öncelikler:

* Çalışan AvalancheGo düğümü:
* Düğümü çalıştıran makineye erişim Shell
* Makine üzerindeki yönetici ayrıcalıkları.

### **Mağara: Güvenlik**

{% hint style="danger" %}**Burada tanımlanan sistem halka açık internet **açılmamalıdır. Burada gösterilen Prometheus ve Grafana izinsiz erişime karşı sertleşmiş değildir. Her ikisine de güvenli bir vekil, yerel ağ veya VPN üzerinden erişilebildiğinden emin olun. Bunu ayarlamak bu özel ders için çok önemli ama dikkatli olun. Kötü güvenlik uygulamaları saldırganlara senin düğümünü kontrol ettirebilir! Uygun güvenlik uygulamalarını takip etmek senin sorumluluğun.{% endhint %}

### Katkılar

Grafana gösterge panosu için temel [at](https://blog.colmenalabs.org/index.html) iyi adamlardan alındı ki artık mevcut değil. Eğer bu dersi nasıl geliştireceğinize dair fikirleriniz ve önerileriniz varsa lütfen söyleyin, bir sorun yayınlayın ya da [Github](https://github.com/ava-labs)'a bir çekiş talebi yapın.

## Prometheus'u kur.

Öncelikle bir sistem kullanıcı hesabı ekleyip dizinleri oluşturmamız gerekir \(süper kullanıcı kimliklerine ihtiyacınız olacak\):

```cpp
sudo useradd -M -r -s /bin/false prometheus
```

```cpp
sudo mkdir /etc/prometheus /var/lib/prometheus
```

Gerekli hizmetleri alın, eğer zaten kurulu değillerse:

```cpp
sudo apt-get install -y apt-transport-https
```

```cpp
sudo apt-get install -y software-properties-common wget
```

Sonraki [olarak, indirme](https://prometheus.io/download/) sayfasından Prometheus'un en son sürümüne bağlantı kur \(uygun işlemci mimarisini seçtiğinizden emin olun\). ve arşivi açmak için wget ve katran kullanın:

```cpp
mkdir -p /tmp/prometheus && cd /tmp/prometheus
```

```cpp
wget https://github.com/prometheus/prometheus/releases/download/v2.25.0/prometheus-2.25.0.linux-amd64.tar.gz
```

```cpp
tar xvf prometheus-2.25.0.linux-amd64.tar.gz
```

```cpp
cd prometheus-2.25.0.linux-amd64
```

Sonra ikili işlemleri ayarlayıp mülkiyeti belirlememiz ve yapılandırma dosyalarını uygun yerlere taşımamız gerekiyor:

```cpp
sudo cp {prometheus,promtool} /usr/local/bin/
```

```cpp
sudo chown prometheus:prometheus /usr/local/bin/{prometheus,promtool}
```

```cpp
sudo chown -R prometheus:prometheus /etc/prometheus
```

```cpp
sudo chown prometheus:prometheus /var/lib/prometheus
```

```cpp
sudo cp -r {consoles,console_libraries} /etc/prometheus/
```

```cpp
sudo cp prometheus.yml /etc/prometheus/
```

`/etc/prometheus`Yapılandırma ve veri `/var/lib/prometheus`için kullanılır.

Prometheus'u sistem hizmeti olarak çalıştıralım. - Bu kadar yeter.

```cpp
sudo nano /etc/systemd/system/prometheus.service
```

\(veya seçtiğiniz metin düzenleyicisinde bu dosyayı açınız\) ve aşağıdaki yapılandırmayı girin:

```cpp
[Unit]
Description=Prometheus
Documentation=https://prometheus.io/docs/introduction/overview/
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=prometheus
Group=prometheus
ExecReload=/bin/kill -HUP $MAINPID
ExecStart=/usr/local/bin/prometheus   --config.file=/etc/prometheus/prometheus.yml   --storage.tsdb.path=/var/lib/prometheus   --web.console.templates=/etc/prometheus/consoles   --web.console.libraries=/etc/prometheus/console_libraries   --web.listen-address=0.0.0.0:9090   --web.external-url=

SyslogIdentifier=prometheus
Restart=always

[Install]
WantedBy=multi-user.target
```

Dosyayı kaydet. Prometheus'u sistem hizmeti olarak çalıştırabiliriz:

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start prometheus
```

```cpp
sudo systemctl enable prometheus
```

Prometheus şimdi koşuyor olmalı. Emin olmak için şöyle bir kontrol edebiliriz:

```cpp
sudo systemctl status prometheus
```

Bu da şöyle bir şey üretmeli:

```cpp
● prometheus.service - Prometheus
     Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2020-04-01 19:23:53 CEST; 5 months 12 days ago
       Docs: https://prometheus.io/docs/introduction/overview/
   Main PID: 1767 (prometheus)
      Tasks: 12 (limit: 9255)
     CGroup: /system.slice/prometheus.service
             └─1767 /usr/local/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/var/lib/prometheus --web.console.templa>

Sep 13 13:00:04 ubuntu prometheus[1767]: level=info ts=2020-09-13T11:00:04.744Z caller=head.go:792 component=tsdb msg="Head GC completed" duration=13.6>
Sep 13 13:00:05 ubuntu prometheus[1767]: level=info ts=2020-09-13T11:00:05.263Z caller=head.go:869 component=tsdb msg="WAL checkpoint complete" first=9>
Sep 13 15:00:04 ubuntu prometheus[1767]: level=info ts=2020-09-13T13:00:04.776Z caller=compact.go:495 component=tsdb msg="write block" mint=15999912000>
...
```

Prometheus web arayüzünü de kontrol edebilirsiniz.`http://your-node-host-ip:9090/`

{% hint style="warning" %}`sudo ufw allow 9090/tcp`Güvenlik duvarı açık ise bunu yapman gerekebilir. \*\*{% endhint %}

## Grafana Yükle

Grafana projesi depolarını with kurmak için:

```cpp
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

```cpp
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

Grafana: yüklemek için:

```cpp
sudo apt-get update
```

```cpp
sudo apt-get install grafana
```

Bir hizmet olarak yapılandırılsın:

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start grafana-server
```

```cpp
sudo systemctl enable grafana-server.service
```

Doğru düzgün çalıştığından emin olmak için:

```text
sudo systemctl status grafana-server
```

Bu da grafana olarak `active`göstermeli. Grafana şu anda müsait olmalı.`http://your-node-host-ip:3000/`

{% hint style="warning" %}`sudo ufw allow 3000/tcp`Güvenlik duvarı açık ise bunu yapman gerekebilir. \*\*{% endhint %}

Kullanıcı adını/parola admin/yöneticiyle girin ve yeni ve güvenli bir şifre kurun. Grafana veri kaynağımız Prometheus'la bağlamamız gerekiyor.

Grafana’s web arayüzünde:

* Sol taraftaki yapılandırma işlemine git ve Veri Kaynaklarını seç.
* Veri Kaynağını Ekle.
* Prometheus'u Seçin.
* Formu içinde \(Prometheus yapacak\) ve URL `http://localhost:9090`olarak gir.
* Tıkla`Save & Test`
* "Veri kaynağı çalışıyor" yeşil mesajını kontrol edin.

## node\_exporter ayarla

from gelen metriklere ek olarak, makinenin kendisini izlemesini ayarlayalım, böylece CPU, bellek, ağ ve disk kullanımını kontrol edebiliriz, herhangi bir anomalinin farkında olabiliriz. Bunun için node\_exporter kullanacağız, bir Prometheus eklentisi.

Son versiyonu şu şekilde alın:

```text
curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep browser_download_url | grep linux-amd64 |  cut -d '"' -f 4 | wget -qi -
```

`linux-arm64`Farklı bir mimariye `linux-amd64`sahipseniz değişiklik \(örneğin RaspberryPi gibi\). Katran ve çalıştırılabilir şekilde hareket ettir:

```cpp
tar xvf node_exporter-1.1.2.linux-amd64.tar.gz
```

```cpp
sudo mv node_exporter-1.1.2.linux-amd64/node_exporter /usr/local/bin
```

Doğru şekilde yüklendiğini kontrol edin:

```cpp
node_exporter --version
```

O zaman bir servis olarak node\_exporter ekleriz. Do:

```cpp
sudo nano /etc/systemd/system/node_exporter.service
```

\(ya da seçtiğiniz metin düzenleyicisinde dosyayı açın ve onu nüfusa kavuşturun:

```cpp
[Unit]
Description=Prometheus Node Exporter
Documentation=https://github.com/prometheus/node_exporter
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=prometheus
Group=prometheus
ExecReload=/bin/kill -HUP $MAINPID
ExecStart=/usr/local/bin/node_exporter \
    --collector.cpu \
    --collector.diskstats \
    --collector.filesystem \
    --collector.loadavg \
    --collector.meminfo \
    --collector.filefd \
    --collector.netdev \
    --collector.stat \
    --collector.netstat \
    --collector.systemd \
    --collector.uname \
    --collector.vmstat \
    --collector.time \
    --collector.mdadm \
    --collector.zfs \
    --collector.tcpstat \
    --collector.bonding \
    --collector.hwmon \
    --collector.arp \
    --web.listen-address=:9100 \
    --web.telemetry-path="/metrics"

[Install]
WantedBy=multi-user.target
```

Bu durum node\_exporter ilginç bulabileceğimiz çeşitli verileri toplamaya ayarlar. Hizmeti başlatın ve çizme olarak etkinleştirin:

```cpp
sudo systemctl start node_exporter
```

```cpp
sudo systemctl enable node_exporter
```

Tekrar kontrol ediyoruz, servis doğru çalışıyor:

```cpp
sudo systemctl status node_exporter
```

Eğer bu gibi mesajları `Ignoring unknown escape sequences`görürseniz, servis dosyasının içeriğinin doğru şekilde kopyalandığını ve ekstra ek ek ek çizgiler veya yeni çizgiler olmadığını iki kez kontrol edin. Gerekirse düzeltir ve hizmete tekrar başlar.

Şimdi her şeyi birbirine bağlamaya hazırız.

## AvalancheGo ve node\_exporter Prometheus işlerini Yapılandır

AvalancheGo your uygun [komut satırı](../../references/command-line-interface.md) argümanlarıyla çalıştığından emin olun. Bu metrik API etkinleştirilmeli \(varsayılan olarak, o\). `--http-host`Eğer makine dışından API argümanını kullanarak API aramanızı kullanırsanız, of dinlediği adresi not alın.

Şimdi uygun bir Prometheus işini tanımlamamız gerekiyor. Prometheus yapılandırmasını düzenleyelim:

Yap :

```cpp
sudo nano /etc/prometheus/prometheus.yml
```

\(veya seçtiğiniz metin düzenleyicisinde dosyayı açın\) ve sonuna kadar ekleyin:

```cpp
  - job_name: 'avalanchego'
    metrics_path: '/ext/metrics'
    static_configs:
      - targets: ['<your-host-ip>:9650']

  - job_name: 'avalanchego-machine'
    static_configs:
      - targets: ['<your-host-ip>:9100']
        labels:
          alias: 'machine'
```

**Kimlik saptama **önemlidir. Varolan girişte dikey olarak `-job_name`hizalandığından emin `-job_name`olun, diğer hatlar da doğru şekilde girilmektedir. `localhost`Doğru IP kullandığından emin olun, ya da your nasıl yapılandırıldığına bağlı olarak.

Config dosyasını kaydet ve Prometheus'u yeniden başlat:

```cpp
sudo systemctl restart prometheus
```

Prometheus web arayüzünü kontrol `http://your-node-host-ip:9090/targets`et. Üç hedef etkinleştirilmiş görmelisiniz:

* Prometheus
* Çığlık
* Çığ makinesiName

Hepsinin de `State`öyle olduğundan emin ol.`UP`

Grafana; aç; şimdi bu kaynaklardan herhangi birini kullanarak bir işaret panosu oluşturabilirsiniz. [Ayrıca önceden yapılandırılmış çizelgeleri](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards) kullanabilirsiniz.

Önceden yapılandırılmış gösterge panosunu içeriye aktarmak için:

* Grafana’s web arayüzünü aç
* `+`Sol araç çubuğuna tıkla
* JSON dosyasını seçin `Import JSON`ve yükleyin ya da içeriği `Import via panel json`bölgeye yapıştırın
* Veri Kaynağı `Prometheus`olarak Seç

İşte böyle! Düğününün yaptığı her şeye hayret edebilirsin. Woohoo!


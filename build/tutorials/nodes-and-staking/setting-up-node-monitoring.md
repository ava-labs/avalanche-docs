# Bir Avalanche Düğümünü İzleme

## Giriş

Bu eğitim makalesinde bir [AvalancheGo](https://github.com/ava-labs/avalanchego) instance'nın (örnek) izlenmesine yönelik altyapının nasıl kurulacağı gösterilecektir. Şunları kullanacağız:

* Verileri toplamak ve depolamak için [Prometheus](https://prometheus.io/)
* Makine hakkında bilgi almak için [node_exporter](https://github.com/prometheus/node_exporter),
* Düğüm hakkında bilgi almak için AvalancheGo'nun [metrikler API](https://docs.avax.network/build/avalanchego-apis/metrics-api)'si
* Verileri bir gösterge panelinde görüntülemek için [Grafana](https://grafana.com/).
* Önceden hazırlanmış bir [Avalanche gösterge panelleri](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards) kümesi

Ön koşullar:

* Çalışan bir AvalancheGo düğümü
* Düğümü çalıştıran makineye shell (güvenli kabuk) erişimi
* Makine üzerinde yönetici ayrıcalıkları

Bu eğitim makalesinde düğümünüzde Ubuntu 18.04 veya 20.04 çalıştırdığınız varsayılır. Servisleri çalıştırmak için `systemd` ve paket yönetimi için `apt-get` kullanan diğer Linux flavor'ları işe yarayabilir, ancak bunlar test edilmemiştir. Bir topluluk üyemiz bunun Debian 10'da çalıştığını ve diğer Debian sürümlerinde de çalışabileceğini bildirdi.

### Uyarı: Güvenlik

{% hint style="danger" %}Burada açıklanan sistem herkese açık internete **açılmamalıdır**. Burada görüntülenen ne Prometheus ne de Grafana izinsiz erişime karşı güçlendirilmiş değildir. Her ikisinin de sadece güvenli bir proxy, yerel ağ veya VPN üzerinden erişilebilir olduğundan emin olun. Bu kurulumu yapmak bu eğitim makalesinin kapsamının dışındadır ama dikkatli olmanızı öneririz. Kötü güvenlik uygulamaları saldırganların düğümünüzün kontrolünü ele geçirmelerine yol açabilir! Uygun güvenlik uygulamalarını takip etmek sizin sorumluluğunuzdadır.{% endhint %}

## İzleme aracını yüklemek için installer script

Düğüm izleme aracının yüklenmesini kolaylaştırmak için, işlemin çoğunu sizin yerinize yapan bir script hazırladık. Script'i indirip çalıştırmak için, düğümün çalıştığı makinede yönetici ayrıcalıklarına sahip bir kullanıcı olarak oturum açın ve aşağıdaki komutu girin:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/monitoring-installer.sh;\
chmod 755 monitoring-installer.sh;
```
Bu işlem script'i indirip yürütmeye hazır hale getirecektir.

Bu script, her biri farklı bir araç veya ortam parçası yükleyen farklı argümanlarla birden fazla kez çalıştırılır. Script'in indirilip doğru kurulduğundan emin olmak için aşağıdakini çalıştırarak başlayın:

```bash
./monitoring-installer.sh --help
```
Şunu göstermelidir:

```text
Usage: ./monitoring-installer.sh [--1|--2|--3|--4|--help]

Options:
--help   Shows this message
--1      Step 1: Installs Prometheus
--2      Step 2: Installs Grafana
--3      Step 3: Installs node_exporter
--4      Step 4: Installs AvalancheGo Grafana dashboards

Run without any options, script will download and install latest version of AvalancheGo dashboards.
```

Şimdi başlayalım.

## 1. Adım: Prometheus'u kurun <a id="prometheus"></a>

İlk adımı yürütmek için script'i çalıştırın:

```bash
./monitoring-installer.sh --1
```

Şunun gibi bir çıktı üretmelidir:

```text
AvalancheGo monitoring installer
--------------------------------
STEP 1: Installing Prometheus

Checking environment...
Found arm64 architecture...
Prometheus install archive found:
https://github.com/prometheus/prometheus/releases/download/v2.31.0/prometheus-2.31.0.linux-arm64.tar.gz
Attempting to download:
https://github.com/prometheus/prometheus/releases/download/v2.31.0/prometheus-2.31.0.linux-arm64.tar.gz
prometheus.tar.gz                           100%[=========================================================================================>]  65.11M   123MB/s    in 0.5s
2021-11-05 14:16:11 URL:https://github-releases.githubusercontent.com/6838921/a215b0e7-df1f-402b-9541-a3ec9d431f76?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20211105%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211105T141610Z&X-Amz-Expires=300&X-Amz-Signature=72a8ae4c6b5cea962bb9cad242cb4478082594b484d6a519de58b8241b319d94&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=6838921&response-content-disposition=attachment%3B%20filename%3Dprometheus-2.31.0.linux-arm64.tar.gz&response-content-type=application%2Foctet-stream [68274531/68274531] -> "prometheus.tar.gz" [1]
...
```
Sizden ek paket yüklemelerini onaylamanız istenebilir, istenirse bunu yapın. Script'in çalıştırılması sona erdiğinde, Prometheus'un doğru şekilde yüklendiğini nasıl kontrol edeceğinize ilişkin talimatlar gelir. Şimdi şunu çalıştıralım:
```bash
sudo systemctl status prometheus
```

Şunun gibi bir çıktısı olmalıdır:

```text
● prometheus.service - Prometheus
Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
Active: active (running) since Fri 2021-11-12 11:38:32 UTC; 17min ago
Docs: https://prometheus.io/docs/introduction/overview/
Main PID: 548 (prometheus)
Tasks: 10 (limit: 9300)
Memory: 95.6M
CGroup: /system.slice/prometheus.service
└─548 /usr/local/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/var/lib/prometheus --web.console.templates=/etc/prometheus/con>

Nov 12 11:38:33 ip-172-31-36-200 prometheus[548]: ts=2021-11-12T11:38:33.644Z caller=head.go:590 level=info component=tsdb msg="WAL segment loaded" segment=81 maxSegment=84
Nov 12 11:38:33 ip-172-31-36-200 prometheus[548]: ts=2021-11-12T11:38:33.773Z caller=head.go:590 level=info component=tsdb msg="WAL segment loaded" segment=82 maxSegment=84
```

`active (running)` durumunu not edin \(çıkmak için `q` tuşuna basın\). Ayrıca `http://your-node-host-ip:9090/` adresinde bulunan Prometheus web arayüzüne de göz atabilirsiniz

{% hint style="warning" %}Güvenlik duvarı açıksa `sudo ufw allow 9090/tcp` yapmanız ve/veya düğüm bir bulut sunucusunda çalışıyorsa, bağlantıların 9090 portuna gitmesine izin vermek için güvenlik ayarlarını yapılandırmanız gerekebilir. AWS için [buraya](setting-up-an-avalanche-node-with-amazon-web-services-aws.md#f8df) bakabilirsiniz. Herkese açık internette yalnızca sizin IP'nizin bağlanmasına izin verdiğinizden emin olun!{% endhint %}

Her şey yolundaysa, devam edelim.

## 2. Adım: Grafana'yı Yükleyin <a id="grafana"></a>

İkinci adımı yürütmek için script'i çalıştırın:

```bash
./monitoring-installer.sh --2
```

Şunun gibi bir çıktı üretmelidir:

```text
AvalancheGo monitoring installer
--------------------------------
STEP 2: Installing Grafana

OK
deb https://packages.grafana.com/oss/deb stable main
Hit:1 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal InRelease
Get:2 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal-updates InRelease [114 kB]
Get:3 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal-backports InRelease [101 kB]
Hit:4 http://ppa.launchpad.net/longsleep/golang-backports/ubuntu focal InRelease
Get:5 http://ports.ubuntu.com/ubuntu-ports focal-security InRelease [114 kB]
Get:6 https://packages.grafana.com/oss/deb stable InRelease [12.1 kB]
...
```
Doğru çalıştığından emin olmak için:

```text
sudo systemctl status grafana-server
```

grafana'yı tekrar `active` olarak göstermelidir. Grafana şimdi internet tarayıcınız yoluyla girdiğiniz `http://your-node-host-ip:3000/` adresinde kullanıma hazır olmalıdır. Kullanıcı adı: admin, şifre: admin ile oturum açın, sonrasında yeni, güvenli bir şifre oluşturmanız istenecektir. Bunu yapın.

{% hint style="warning" %}Güvenlik duvarı açıksa `sudo ufw allow 3000/tcp` yapmanız ve/veya bağlantıların 3000 portuna gitmesine izin vermek için bulut sunucusu ayarlarını yapılandırmanız gerekebilir. Herkese açık internette yalnızca sizin IP'nizin bağlanmasına izin verdiğinizden emin olun!{% endhint %}

Prometheus ve Grafana şimdi yüklendi, bir sonraki adıma hazırız.

## 3. Adım: Node\_exporter'ı kurun <a id="exporter"></a>

AvalancheGo'daki metriklere ek olarak, CPU, bellek, ağ ve disk kullanımı ögelerini kontrol edebilmek ve herhangi bir anormallikten haberdar olabilmek için makinenin kendisini izleme aracını da kuralım. Bunun için bir Prometheus eklentisi olan node\_exporter kullanacağız.

Üçüncü adımı yürütmek için script'i çalıştırın:

```bash
./monitoring-installer.sh --3
```
Çıktı şunun gibi görünmeli:
```text
AvalancheGo monitoring installer
--------------------------------
STEP 3: Installing node_exporter

Checking environment...
Found arm64 architecture...
Dowloading archive...
https://github.com/prometheus/node_exporter/releases/download/v1.2.2/node_exporter-1.2.2.linux-arm64.tar.gz
node_exporter.tar.gz                        100%[=========================================================================================>]   7.91M  --.-KB/s    in 0.1s
2021-11-05 14:57:25 URL:https://github-releases.githubusercontent.com/9524057/6dc22304-a1f5-419b-b296-906f6dd168dc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20211105%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211105T145725Z&X-Amz-Expires=300&X-Amz-Signature=3890e09e58ea9d4180684d9286c9e791b96b0c411d8f8a494f77e99f260bdcbb&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=9524057&response-content-disposition=attachment%3B%20filename%3Dnode_exporter-1.2.2.linux-arm64.tar.gz&response-content-type=application%2Foctet-stream [8296266/8296266] -> "node_exporter.tar.gz" [1]
node_exporter-1.2.2.linux-arm64/LICENSE
```
Yine servisin doğru çalıştığını kontrol ediyoruz:
```cpp
sudo systemctl status node_exporter
```
Servis çalışıyorsa, Prometheus, Grafana ve node\_exporter artık birlikte çalışabilmelidir. Kontrol etmek için internet tarayıcınızda `http://your-node-host-ip:9090/targets` adresindeki Prometheus web arayüzünü ziyaret edin. Üç hedefin etkinleştirildiğini görmeniz gerekir:

* Prometheus
* avalanchego
* avalanchego-machine

Hepsinin `State`'inin, yani durumunun `UP` \(çalışıyor\) olduğundan emin olun.

{% hint style="info" %}AvalancheGo düğümünüzü API bağlantı noktanızda TLS etkinken çalıştırırsanız, `/etc/prometheus/prometheus.yml` dosyasını manuel olarak düzenlemeniz ve `avalanchego` işini şöyle görünecek şekilde değiştirmeniz gerekir:
```cpp
  - job_name: 'avalanchego'
    metrics_path: '/ext/metrics'
    scheme: 'https'
    tls_config:
    insecure_skip_verify: true
    static_configs:
      - targets: ['localhost:9650']
```
Aralığa dikkat edin \(öndeki aralıklara da\)! Bunu yapmak için yönetici ayrıcalıklarına ihtiyacınız olacaktır \(`sudo` kullanın\). Ardından `sudo systemctl restart prometheus` komutuyla prometheus servisini yeniden başlatın.{% endhint %}

Şimdi yapılması gereken tek şey, veri kaynağını sağlamak ve bize verileri gösterecek olan asıl gösterge panellerini kurmaktır.

## 4. Adım: Gösterge panelleri <a id="dashboards"></a>

Gösterge panellerini yüklemek için script'i çalıştırın:

```bash
./monitoring-installer.sh --4
```
Şunun gibi bir çıktı üretecektir:
```text
AvalancheGo monitoring installer
--------------------------------

Downloading...
Last-modified header missing -- time-stamps turned off.
2021-11-05 14:57:47 URL:https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/c_chain.json [50282/50282] -> "c_chain.json" [1]
FINISHED --2021-11-05 14:57:47--
Total wall clock time: 0.2s
Downloaded: 1 files, 49K in 0s (132 MB/s)
Last-modified header missing -- time-stamps turned off.
...
```
Bu, GitHub'dan gösterge panellerinin en son sürümlerini indirecek ve Prometheus'u bir veri kaynağı olarak tanımlamanın yanı sıra, bunları yüklemek için Grafana'yı sağlayacaktır. Gösterge panellerinin görünmesi 30 saniye alabilir. İnternet tarayıcınızda `http://your-node-host-ip:3000/dashboards` adresine gidin. 7 adet Avalanche gösterge paneli görmeniz gerekir:

![İçe aktarılan gösterge panelleri](monitoring-01-dashboards.png)

Başlığını tıklayarak 'Avalanche Main Dashboard'u seçin. Yüklenmeli ve şuna benzer görünmelidir:

![Ana Gösterge Paneli](monitoring-02-main-dashboard.png)

Bazı grafiklerin tamamen doldurulması biraz zaman alabilir, çünkü doğru şekilde oluşturulmaları için bir dizi veri noktasına ihtiyaç duyarlar.

Düğümle ilgili en önemli bilgileri bir bakışta gösterdiği için ana gösterge paneline yer işareti koyabilirsiniz. Her gösterge panelinin ilk satır olarak diğer tüm gösterge panellerine bir bağlantısı vardır, bu sayede gösterge panelleri arasında kolayca geçiş yapabilirsiniz.

## Güncelleniyor

Sunulan düğüm metrikleri sürekli güncellenir, yenileri eklenir ve miadını dolduranlar kaldırılır, dolayısıyla gösterge panellerini zaman zaman güncellemek, özellikle de panellerde eksik veriler olduğunu fark ettiğinizde güncellemek iyi bir uygulamadır. Gösterge panellerini güncellemek kolaydır, sadece script'i argümansız olarak çalıştırın; gösterge panelleri mevcut en son versiyonlarıyla yenilenecektir. Grafana'da gösterge panellerinin güncellenmesi 30 saniye kadar sürebilir.

## Özet

Script'i kullanarak düğüm izleme aracını yüklemek kolaydır ve bu araç düğümünüzün nasıl davrandığı ve çıplak gözle görünmeyenler hakkında size bir fikir verir. Ayrıca, grafikler de güzeldir!

Bu eğitim hakkında görüş bildirmek isterseniz veya script'le veya adımları takip etmekle ilgili sorunlar varsa, bize [Discord](https://chat.avalabs.org)'dan bir mesaj gönderin.

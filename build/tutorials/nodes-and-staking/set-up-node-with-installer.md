# Install Script'i kullanarak bir Avalanche Düğümünü çalıştırma

AvalancheGo'yu bilgisayarınıza kuran bir shell (bash) script'imiz vardır. Bu script en az miktarda kullanıcı girdisiyle dakikalar için tam ve çalışır düğümü kurar.

## Başlamadan önce

Avalanche inanılmaz derecede hafif bir protokoldür, dolayısıyla düğümler sıradan bir donanımda çalışabilir. Ağ kullanımı arttıkça donanım gereksinimlerinin değişebileceğini aklınızda bulundurun.

* CPU: 8 AWS vCPU eşdeğeri
* RAM: 16 GB
* Depolama alanı: 200 GB
* İşletim Sistemi: Ubuntu 18.04/20.04 veya MacOS >= Catalina

Bu install script'i şunları varsayar:

* AvalancheGo çalışmıyor ve henüz bir servis olarak kurulu değil
* Script'i çalıştıran kullanıcı süper kullanıcı ayrıcalıklarına sahip (`sudo` komutunu çalıştırabilir)

### Ortamla ilgili hususlar

Farklı bir Linux dağıtımı çalıştırıyorsanız, script öngörülen şekilde çalışmayabilir. Bu, sistem servislerini çalıştırmak için `systemd` kullanıldığını varsayar. Diğer Linux dağıtımları başka bir şey kullanıyor olabilir veya stript'in varsaydığından farklı yerlerde dosyaları olabilir.

Bilgisayarda halihazırda çalışmakta olan bir düğümünüz varsa, script'i çalıştırmadan önce düğümü durdurun.

#### Terminalden çalışan düğüm

Düğümünüz bir terminalde çalışıyorsa `ctrl+C` tuşlarına basarak düğümü durdurun.

#### Bir servis olarak çalışan düğüm

Düğümünüz halihazırda bir servis olarak çalışıyorsa, muhtemelen bu script'e ihtiyacınız yoktur. Başlamaya hazırsınız.

#### Arka planda çalışan düğüm

Düğümünüz arka planda çalışıyorsa (örneğin `nohup` ile çalışarak), `ps aux | grep avalanche` komutunu çalıştırarak düğümü çalıştıran süreci bulun. Bu şöyle bir çıktı üretecek:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

İçinde `grep` olmayan satırı arayın. Bu satır bu örnekte ikinci satırdır. Bu satır düğümünüze dair bilgiyi gösterir. Süreç kimliğini not edin; süreç kimliği bu örnekte `2630`'dir. `kill -2 2630` komutunu çalıştırarak düğümü durdurun.

#### Düğümün çalışma dosyaları

Daha önce bu bilgisayarda bir AvalancheGo düğümü çalıştırdıysanız, `$HOME/.avalanchego` dizinine kaydedilmiş yerel düğüm dosyalarınız olacak. Bu dosyalar değiştirilmeyecek ve script'le kurulan düğüm, önceki kimliği ve durumu ile çalışmaya devam edecektir. Bunu dedikten sonra, düğümünüzün güvenliği için `$HOME/.avalanchego/staking` içinde bulunan `staker.crt` ve `staker.key` dosyalarını yedekleyin ve güvenli bir yerde saklayın. İleride gerekli olması halinde düğümünüzü farklı bir bilgisayarda yeniden yaratmak için bu dosyaları kullanabilirsiniz. Yedekleme ve geri yükleme işlemi için bu [eğitim makalesine](node-backup-and-restore.md) göz atın.

### Ağ konuları

AvalancheGo'nun başarılı bir şekilde çalışması için internetten ağ portu `9651` üzerinden bağlantılar kabul etmesi gerekir. Kuruluma geçmeden önce, düğümünüzün içinde çalışacağı ağ ortamını belirlemeniz gerekir.

#### Bulut sağlayıcıda çalıştırma

Düğümünüz bir bulut sağlayıcının bilgisayar sunucusunda çalışıyorsa, düğümünüzün bir statik IP'si olacaktır. Bu statik IP'nin ne olduğunu öğrenin, ya da statik IP'niz yoksa şimdi kurun. İnstall script IP adresini kendisi bulmaya çalışacaktır ama bu her ortamda mümkün olmayabilir, bu yüzden IP'yi sizin kontrol etmeniz ya da girmeniz gerekebilir.

#### Bir ev bağlantısı üzerinde çalıştırma

Düğümü bir ev internetine bağlı bir bilgisayarda çalıştırıyorsanız, dinamik bir IP'niz vardır, yani IP'niz periyodik olarak değişecektir. İnstall script düğümü bu duruma uygun bir şekilde yapılandıracaktır. Fakat bir ev bağlantısı için, `9651` portunu internetten düğümün kurulduğu bilgisayara iletecek gelen portu kurmanız gerekecek.

Piyasada çok fazla model ve yönlendirici yapılandırması olduğu için tam olarak ne yapılması gerektiği hakkında talimatlar veremiyoruz, ama bununla ilgili bazı çevrimiçi kılavuzlar (mesela [bu kılavuz](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/) gibi ya da [bu kılavuz](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) gibi) ve hizmet sağlayıcınız da bu konuda yardımcı olabilir.

## Script'i çalıştırma

Şimdi sisteminizi hazırladığınıza ve bilgileri hazır ettiğinize göre, başlayalım.

Script'i indirip çalıştırmak için terminale aşağıdakileri girin:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

Ve başladık! Çıktı şunun gibi görünmeli:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found arm64 architecture...
Looking for the latest arm64 build...
Will attempt to download:
 https://github.com/ava-labs/avalanchego/releases/download/v1.1.1/avalanchego-linux-arm64-v1.1.1.tar.gz
avalanchego-linux-arm64-v1.1.1.tar.gz 100%[=========================================================================>]  29.83M  75.8MB/s    in 0.4s
2020-12-28 14:57:47 URL:https://github-production-release-asset-2e65be.s3.amazonaws.com/246387644/f4d27b00-4161-11eb-8fb2-156a992fd2c8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20201228%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201228T145747Z&X-Amz-Expires=300&X-Amz-Signature=ea838877f39ae940a37a076137c4c2689494c7e683cb95a5a4714c062e6ba018&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=246387644&response-content-disposition=attachment%3B%20filename%3Davalanchego-linux-arm64-v1.1.1.tar.gz&response-content-type=application%2Foctet-stream [31283052/31283052] -> "avalanchego-linux-arm64-v1.1.1.tar.gz" [1]
Unpacking node files...
avalanchego-v1.1.1/plugins/
avalanchego-v1.1.1/plugins/evm
avalanchego-v1.1.1/avalanchego
Node files unpacked into /home/ubuntu/avalanche-node
```

Sonra script bir istem mesajı göndererek sizden ağ ortamıyla ilgili bilgiler isteyecektir:

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

Dinamik IP'niz varsa, `1`, statik IP'niz varsa `2` girin. Statik IP kullanıyorsanız, script IP'nizi otomatik olarak tespit etmeye çalışacak ve onay isteyecektir.

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

`y` ile onaylayın, ya da tespit edilen IP yanlışsa (veya boşsa) `n` yazın, ardından bir sonraki istem mesajında doğru IP'yi girin.

Bunun üzerine script sistem servisini yaratmaya devam edecek ve servisi başlatarak sona erecektir.

```text
Installing service with public IP: 3.15.152.14
Created symlink /etc/systemd/system/multi-user.target.wants/avalanchego.service → /etc/systemd/system/avalanchego.service.

Done!

Your node should now be bootstrapping on the main net.
Node configuration file is /home/ubuntu/.avalanchego/configs/node.json
To check that the service is running use the following command (q to exit):
sudo systemctl status avalanchego
To follow the log use (ctrl+C to stop):
sudo journalctl -u avalanchego -f

Reach us over on https://chat.avax.network if you're having problems.
```

Script sona erdi; sistem mesajını tekrar görmeniz gerekir.

## Kurulum sonrası

AvalancheGo arka planda bir servis olarak çalışmalıdır. Çalışıp çalışmadığını şununla kontrol edebilirsiniz:

```bash
sudo systemctl status avalanchego
```

Bu, düğümün en son günlüklerini basacaktır, ki şunun gibi görünmelidir:

```text
● avalanchego.service - AvalancheGo systemd service
Loaded: loaded (/etc/systemd/system/avalanchego.service; enabled; vendor preset: enabled)
Active: active (running) since Tue 2021-01-05 10:38:21 UTC; 51s ago
Main PID: 2142 (avalanchego)
Tasks: 8 (limit: 4495)
Memory: 223.0M
CGroup: /system.slice/avalanchego.service
└─2142 /home/ubuntu/avalanche-node/avalanchego --dynamic-public-ip=opendns --http-host=

Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/vms/platformvm/vm.go#322: initializing last accepted block as 2FUFPVPxbTpKNn39moGSzsmGroYES4NZRdw3mJgNvMkMiMHJ9e
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/snow/engine/snowman/transitive.go#58: initializing consensus engine
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#143: adding route /ext/bc/11111111111111111111111111111111LpoYY
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#88: HTTP API server listening on ":9650"
Jan 05 10:38:58 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:58] <P Chain> avalanchego/snow/engine/common/bootstrapper.go#185: Bootstrapping started syncing with 1 vertices in the accepted frontier
Jan 05 10:39:02 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:02] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 2500 blocks
Jan 05 10:39:04 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:04] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 5000 blocks
Jan 05 10:39:06 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:06] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 7500 blocks
Jan 05 10:39:09 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:09] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 10000 blocks
Jan 05 10:39:11 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:11] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 12500 blocks
```

Servisin düzgün çalıştığını gösteren `active (running)`ibaresini göreceksiniz. Komut satırına dönmek için `q` tuşuna basmanız gerekebilir.

Düğümünüzü ağa tanıtmak için kullanılan düğüm kimliğinizi (NodeID) bulmak için aşağıdaki komutu çalıştırın:

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

Şöyle bir çıktı üretecektir:

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

`NodeID-`'yi alınacak değerin başına iliştirin, örneğin `NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY` gibi. Bunu saklayın; staking için ya da düğümünüzü ararken ihtiyacınız olacaktır.

Düğümünüz şimdi önyükleme yapıyor olmalıdır. Önyüklemenin ilerleyişini aşağıdaki komutu göndererek izleyebilirsiniz:

```bash
sudo journalctl -u avalanchego -f
```

Düğüm çıktısını okumayı durdurmak istediğinizde `ctrl+C` tuşlarına basın.

## Düğümü durdurma

AvalancheGo'yu durdurmak için şunu çalıştırın:

```bash
sudo systemctl stop avalanchego
```

Tekrar başlatmak şunu çalıştırın:

```bash
sudo systemctl start avalanchego
```

## Düğüm yükseltme

AvalancheGo devam eden bir proje ve düzenli olarak sürüm yükseltmeleri yapılıyor. Çoğu yükseltmeler tavsiye edilir ancak zorunlu değildir. Geriye doğru uyumlu olmayan yükseltmeler için önceden bildirim yapılacaktır. Düğümün yeni bir sürümü çıkarıldığında, şunun gibi günlük satırları göreceksiniz:

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

Her zaman en son sürümüne yükseltmeniz önerilir, çünkü yeni sürümler hata düzeltmeleri, yeni özellikler ve yükseltmeler getirir.

Düğümünüzü yükseltmek için installer script'i tekrar çalıştırmanız yeterli:

```bash
./avalanchego-installer.sh
```

Script, AvalancheGo'nun halihazırda kurulu olduğunu tespit edecektir:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

Sonra düğümünüzü en son sürüme yükseltecek ve bu işlem bittiğinde düğümü tekrar başlatıp en son sürümle ilgili bilgileri ekrana getirecektir:

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## Düğüm yapılandırması

Düğümün işleyişini yapılandıran dosya `~/.avalanchego/configs/node.json`'dur. Bu dosyada düzenleme yapabilir, yapılandırma seçenekleri ekleyebilir veya yapılandırma seçeneklerini değiştirebilirsiniz. Yapılandırma seçenekleri dokümanını [burada](../../references/command-line-interface.md) bulabilirsiniz. Varsayılan yapılandırma şöyle görünebilir:

```javascript
{
  "dynamic-public-ip": "opendns",
  "http-host": ""
}
```

Aklınızda bulunsun, yapılandırma dosyası düzgün bir şekilde formatlanmış bir `JSON` dosyası olmalıdır, dolayısıyla anahtarlar komut satırından farklı bir şekilde formatlanmıştır, bu yüzden, yukarıdaki örnek haricinde, `--dynamic-public-ip=opendns` gibi seçenekler girmeyin.

## Eski bir sürümü kullanma

Installer script, AvalancheGo'nun en son sürümü dışındaki bir sürümü de kurmak için kullanılabilir.

Kuruluma uygun sürümlerin bir listesini görmek için şunu çalıştırın:

```bash
./avalanchego-installer.sh --list
```

Şunun gibi bir liste çıkaracaktır:

```text
AvalancheGo installer
---------------------
Available versions:
v1.3.2
v1.3.1
v1.3.0
v1.2.4-arm-fix
v1.2.4
v1.2.3-signed
v1.2.3
v1.2.2
v1.2.1
v1.2.0
```

Belli bir sürümü kurmak için, script'i `--version` ve devamında sürüm etiketi ile çalıştırın. Örnek olarak:

```bash
./avalanchego-installer.sh --version v1.3.1
```

{% hint style="danger" %}Tüm AvalancheGo sürümlerinin uyumlu olmadığını unutmayın. Genel olarak en son sürümü çalıştırmanız gerekir. En son sürüm dışındaki bir sürümü çalıştırmak düğümünüzün doğru çalışmamasına ve doğrulayıcıların staking ödülü almamalarına sebep olabilir.{% endhint %}

En son olmayan düğüm sürümlerinin kurulumuna yönelik desteğin sağlanması için verdiği ilham ve yardım için topluluk üyesi [Jean Zundel](https://github.com/jzu)'e teşekkür ederiz.

## Yeniden kurulum ve script güncellemesi

İnstaller script zaman zaman yeni özellikler ve yetenekler eklenerek güncellenmektedir. Yeni özelliklerden yararlanmak veya düğümün çalışmamasına neden olan modifikasyonları kaldırmak için düğümü yeniden kurmak isteyebilirsiniz. Bunu yapmak için, script'in en son sürümünü web'den şununla getirin:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

Script güncellendikten sonra script'i `--reinstall` komut satırı argümanıyla tekrar çalıştırın:

```bash
./avalanchego-installer.sh --reinstall
```

Bu, mevcut servis dosyasını silecek ve installer'ı ilk kez başlatılıyormuş gibi sıfırdan çalıştıracaktır. Aklınızda bulunsun, veri tabanı ve NodeID değişmeden kalacaktır.

## Sırada ne var?

Hepsi bu kadar, şimdi bir AvalancheGo düğümü çalıştırıyorsunuz! Tebrikler! Bu işi başardığınızı [Twitter](https://twitter.com/avalancheavax), [Telegram](https://t.me/avalancheavax) veya [Reddit](https://t.me/avalancheavax) üzerinden bize bildirin!

Bir ev ağı (dinamik IP) ile bağlanıyorsanız, port yönlendirmesini ayarlamayı unutmayın. Bir bulut hizmet sağlayıcısı kullanıyorsanız, başlamaya hazırsınız.

Şimdi [düğümünüzle etkileşimde bulunabilir,](../../avalanchego-apis/issuing-api-calls.md) [token'larınızı stake edebilir](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md), ya da düğümünüzün ne yaptığına dair daha iyi bir fikir edinmek için [düğüm izleme](setting-up-node-monitoring.md) aracını kurarak düğüm kurulumunuzu bir üst seviyeye yükseltebilirsiniz. Ayrıca, düğümünüze daha kolay bir şekilde komutlar göndermek için [Postman koleksiyonumuzu](../../tools/postman-avalanche-collection.md) kullanmak isteyebilirsiniz.

Son olarak, henüz yapmadıysanız, düğümünüzü farklı bir makinede geri yüklemeniz gerekirse diye önemli dosyaları [yedeklemek](node-backup-and-restore.md) iyi bir fikirdir.

Sorularınız veya yardım ihtiyacınız olursa [Discord](https://chat.avalabs.org/) sunucumuz üzerinden bizimle iletişime geçmekten çekinmeyin.


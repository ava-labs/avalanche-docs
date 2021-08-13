# Bir Çığ Düğümü Kurul Senaryosunu kullanarak çalıştır

AvalancheGo bilgisayarınıza yükleyen bir kabuk \(bash\) betiği var. Bu betik tam olarak ayarlanır, birkaç dakika içinde çalıştırılan düğüm, minimum kullanıcı girdisi gereklidir.

## Başlamadan önce

Bu senaryo varsayım:

* OS: Ubuntu 18.04 veya 20.04 \(üzgünüm, MacOS ve Windows henüz desteklenmedi\
* AvalancheGo çalışmıyor ve zaten bir hizmet olarak kurulmuyor.
* Betiği çalıştıran kullanıcı süper kullanıcı ayrıcalıkları vardır \(`sudo`\ çalıştırabilirsiniz)

### Çevre değerlendirmeleri

Linux'un farklı bir çeşidi işletirseniz, senaryo istenilen şekilde çalışmayabilir. `Sistem` sistemlerinin sistem hizmetlerini çalıştırmak için kullanıldığını varsayar. Diğer Linux aromaları başka bir şey kullanabilir veya senaryo tarafından varsayıldığından farklı yerlerde dosyalara sahip olabilir.

Bilgisayarda zaten çalışan bir düğümünüz varsa senaryoyu çalıştırmadan önce durdurun.

#### Terminalden akan düğüm

Eğer düğümünüz terminal içinde çalışıyorsa `ctrl+C` tuşuna basarak durdurun.

#### Bir servis olarak çalıştırılan düğüm

Eğer düğümünüz zaten hizmet olarak çalışıyorsa muhtemelen bu senaryoya ihtiyacınız yoktur. Gitmeye hazırsın.

#### Arka planda çalıştırılan düğüm

Eğer düğümünüz arka planda çalışıyorsa\ (örneğin, `with` çalışırken) o zaman `düğümü çalıştırarak çöz by   grep avalanche`. çalıştırarak çalıştıran süreci bulun. Bu da çıktıları şöyle üretir:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Üzerinde `hiç yücelik` olmayan bir çizgi arayın. Düğününüz hakkında bilgi veriyor. Bu durumda `2630` sayılı işlem kimliğine dikkat edin. `- 2630` öldürerek düğmeyi durdurun.

#### & Çalışma dosyaları@ info: whatsthis

Bu bilgisayarda daha önce bir AvalancheGo düğümünü çalıştırdıysanız, `$HOME/.avalanchego` dizininde yerel düğümler dosyalarına sahip olacaksınız. Bu dosyalar rahatsız edilmeyecek ve betik tarafından ayarlanan düğüm, önceki kimlik ve durumu ile çalışmaya devam edecek. Bu da düğünün güvenliği için, arka `staker.crt``` ve staker.crt dosyaları, `$HOME/.avalanchego/staking` içinde bulunur ve güvenli bir yerde depolayabilirsiniz. Eğer ihtiyacın olursa düğümünü farklı bir bilgisayarda yeniden oluşturmak için o dosyaları kullanabilirsin. Yedek dersi kontrol [et](node-backup-and-restore.md) ve prosedürü geri getir.

### Ağ değerlendirmeleri

Başarılı bir şekilde çalıştırmak için AvalancheGo `9651` ağ limanındaki internet bağlantılarını kabul etmek zorundadır. Kuruluma başlamadan önce your gireceği ağ ortamını belirlemeniz gerekiyor.

#### Bulut sağlayıcısının üzerinde koşuyor.

Eğer düğümünüz bulut sağlayıcı bilgisayarında çalışıyorsa, statik bir IP vardır. Statik IP ne olduğunu öğren, ya da henüz yapmadıysan ayarla. Betik IP yi kendi kendine bulmaya çalışacaktır, ama bu tüm ortamlarda işe yaramayabilir, bu yüzden IP IP yi kontrol etmeniz ya da kendiniz girmeniz gerek.

#### Ev bağlantısı üzerinde koşuyor.

Eğer bir bilgisayarda bir düğüm çalıştırıyorsanız, dinamik bir connection, var; yani IP periyodik olarak değişecektir. Bu durum için uygun şekilde kodlanacaktır. Ama ev bağlantısı için düğümün kurulduğu bilgisayara `9651`'in limana doğru bağlantı noktası kurmanız gerekiyor.

Çok fazla model ve yönlendirici yapılandırması olduğu için, tam olarak ne yapılacağı konusunda talimatlar veremeyiz ancak çevrimiçi rehberler bulunur [(bu](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/) şekilde, ya da [bu](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) \), ve hizmet sağlayıcı desteğiniz de yardımcı olabilir.

## Betiği çalıştırıyorum.

Şimdi sisteminizi hazırlayıp bilgileri hazırladığınıza göre, hadi başlayalım.

Betiği indirmek ve çalıştırmak için, terminaldeki aşağıdaki girin:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

Ve gidiyoruz! Çıkış şöyle bir şeye benzeyecek:

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

Ve sonra senaryo sizi ağ çevreyle ilgili bilgi için harekete geçirecek:

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

Dinamik you varsa `1` girin. Ve statik IP, varsa `2` de var. Eğer statik bir you IP IP 'yi otomatik olarak tespit edip doğrulama isteyecektir.

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

`Eğer` tespit edilmiş IP yanlış ise y ile `veya n` doğrula, ve sonraki anda doğru IP gir.

Senaryo sistem servis oluşturulması ile devam edecek ve hizmetin başlamasıyla bitirecek.

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

Senaryo bitti ve sistemin tekrar çalıştığını görmelisin.

## Posta kurulumu

AvalancheGo arka planda hizmet olarak çalışmalı. Bununla birlikte çalıştığına bakabilirsin:

```bash
sudo systemctl status avalanchego
```

Bu düğümün son günlüklerini basacak. Bu da şöyle görünmeli:

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

Hizmet iyi olduğunu gösteren `aktif` (çalışır ak) işaretleyin. Komuta hızına dönmek için `q` tuşuna basmanız gerekebilir.

Ağa your belirlemek için kullanılan NodeID dosyalarınızı bulmak için aşağıdaki komutu çalıştır:

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

Çıkış şöyle olacak:

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

`NodeID-6seStrauyCV7NEVRbfaT9B6EnXEzfY'nin``` değeri için NodeID-6seStrauyCV7NEVwRbb-6XEzfY'ye hazırlanın. Bunu saklayın; your gözetlemek veya bakmak için gerekecektir.

Düğününüz şu anda kayma sürecinde olmalı. Aşağıdaki komutu vererek ilerlemeyi izleyebilirsiniz:

```bash
sudo journalctl -u avalanchego -f
```

düğümlü çıkışı okumayı bırakmak istediğinizde `ctrl+C` tuşuna basın.

## Düğümü durduruyorum.

AvalancheGo, durdurmak için, koş:

```bash
sudo systemctl stop avalanchego
```

Tekrar başlatmak için, koş:

```bash
sudo systemctl start avalanchego
```

## Düğüm yükseltmesi

AvalancheGo devam eden bir proje ve düzenli sürüm güncellemeleri var. Çoğu güncelleme tavsiye edilir ama gerekli değildir. Geri uyumlu olmayan güncelleme için öncü bildiri verilecek. Düğünün yeni bir versiyonu piyasaya sürüldüğünde, kayıt çizgilerini şöyle göreceksiniz:

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

Yeni sürümler hata düzeltmeleri, yeni özellikler ve güncellemeler getirdiği için her zaman en son sürümüne yükseltilmesi önerilir.

Düğününüzü yükseltmek için, sadece kurum senaryosunu tekrar çalıştır:

```bash
./avalanchego-installer.sh
```

AvalancheGo çoktan kurduğunuzu anlayacaktır:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

Daha sonra your son sürümüne yükseltecek ve bittikten sonra düğümleri tekrar açacak ve son sürümle ilgili bilgileri yazdıracak:

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## Node yapılandırması

Düğüm işlemini yapılandıran dosya `~/.avalanchego/configs/node.json`. Yapılandırma seçeneklerini eklemek veya değiştirebilirsiniz. Yapılandırma seçeneklerinin belgelendirilmesi [burada](../../references/command-line-interface.md) bulunabilir. Öntanımlı yapılandırma şöyle görünebilir:

```javascript
{
  "dynamic-public-ip": "opendns",
  "http-host": ""
}
```

Yapılandırma dosyası düzgün biçimlendirilmiş bir `JSON` dosyası olması gerektiğini, bu yüzden düğmeler komut satırından farklı biçimlendirilir, bu yüzden -dinamik `--dynamic-public-ip=opendns` gibi seçeneklere girme, ama yukarıdaki örneklerdeki gibi.

## Önceki sürüm kullanılıyor

Bu tablo ayrıca AvalancheGo sürümünün son sürümünden başka bir sürümünü yüklemek için de kullanılabilir.

Kurulum için mevcut sürümlerin listesini görmek için, çalıştır:

```bash
./avalanchego-installer.sh --list
```

Bir liste çıkaracak. Şöyle bir şey:

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

Belirli bir sürümü yüklemek için, senaryoyu `--sürüm` sürümü ile çalıştırın. Örneğin:

```bash
./avalanchego-installer.sh --version v1.3.1
```

{% ipuçları style="danger" % } Tüm Avalanchego sürümlerinin uyumlu olmadığını not edin. En son versiyonunu sen yapmalısın. Son sürümden başka bir sürüm çalıştırmak your düzgün çalışmayıp, validators, için de mükemmel bir ödül almamanıza yol açabilir. {% endhint }

İlham kaynağı ve son olmayan nod sürümlerinin kurulmasına destek sağladığı için toplum üyesi [Jean Zundel](https://github.com/jzu) sayesinde.

## & & & Betik güncellemesi yeniden yükle

Yazıcı betiği zaman zaman güncellenir, yeni özellikler ve yetenekler eklenir. Yeni özelliklerden faydalanmak veya düğümleri başarısız yapan değişikliklerden kurtulmak için, düğümleri yeniden yüklemek isteyebilirsiniz. Bunu yapmak için, senaryonun son sürümünü internetten getir:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

Betik güncellendikten sonra, yeniden başlat `-` komut satırı argümanı ile tekrar çalıştır:

```bash
./avalanchego-installer.sh --reinstall
```

Bu mevcut servis dosyasını silecek ve ilk kez başlatılmış gibi yükleyiciyi sıfırdan çalıştıracak. Veri tabanı ve NodeID sağlam bırakılacak.

## Şimdi ne olacak?

İşte böyle, AvalancheGo düğümünü çalıştırıyorsun! Tebrikler! Tebrikler! [Twitter](https://twitter.com/avalancheavax), [Telegram](https://t.me/avalancheavax) veya [Reddit](https://t.me/avalancheavax)'te yaptığını bize bildir!

Eğer konut you're (dinamik IP\) bağlantı kurmayı unutmayın. Bulut servisi you're gidebilirsiniz.

Şimdi [with](../../avalanchego-apis/issuing-api-calls.md) etkileşime girebilirsiniz, [işaretlerinizi kazık ya](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md) da your daha iyi bir şekilde [algılayarak](setting-up-node-monitoring.md) installation yerleştirerek kurulumunuzu düzeye getirebilirsiniz. Ayrıca [Postacı](../../tools/postman-avalanche-collection.md) koleksiyonumuzu kullanarak your daha kolay saymak isteyebilirsiniz.

Son olarak, eğer henüz yapmadıysanız, düğümünü başka bir makineye geri vermek için önemli dosyaları [desteklemeniz](node-backup-and-restore.md) iyi bir fikir.

Herhangi bir sorunuz olursa ya da yardıma ihtiyacınız olursa, [Discord](https://chat.avalabs.org/) sunucumuzla irtibata geçebilirsiniz.


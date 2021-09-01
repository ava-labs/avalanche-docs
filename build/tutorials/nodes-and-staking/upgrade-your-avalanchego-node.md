# Çığ Düğümünü Yükselt

{% embed url="https://youtu.be/o4Fww-sHoaQ" caption="" %}

## **Düğününü geri ver**

Düğününüzü güncellemeden önce, ağ üzerindeki your tanımlamak için kullanılan yedek dosyalarınızı yedeklemenizi tavsiye eder. Öntanımlı kurulumda onları komutları uygulayarak kopyalayabilirsiniz:

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

Sonra dosyaları `staker.crt`ve `staker.key`dosyaları indirip güvenli ve özel bir yerde tut. Düğününüze ya da makine düğümüne bir şey olursa bu dosyalar node tamamen yeniden oluşturmak için kullanılabilir.

Eğer gelişim amaçları için your kullanırsanız ve keystore anahtar kullanıcıları varsa, bunları da desteklemelisiniz.

## Düğüm yüklenmiş installer betiğini kullanarak

Düğününüzü [node](set-up-node-with-installer.md) installer yükseltmek için yükleyin, your yeniden çalıştırın.

```text
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

Ve işte bu kadar, düğümünüz son versiyonuna yükseltildi.

Eğer your elle yerleştirdiyseniz, diğer derslere devam edin.

## **Eski düğümlü sürümünü durdur**

Yedek güvenliğe alındıktan sonra your değiştirmeye başlayabilirsiniz. Şu anda çalıştırılan sürümünü durdurarak başlayın.

### Terminalden akan düğüm

Eğer düğümünüz terminalde çalışıyorsa basarak `ctrl+c`durdurun.

### Bir servis olarak çalıştırılan düğüm

Eğer düğümünüz bir hizmet olarak çalışıyorsa girerek durdurun:

`sudo systemctl stop avalanchego.service`

`avalanche.service`\(Hizmetinize farklı veya benzer isimler verilebilir\)

### Arka planda çalıştırılan düğüm

Eğer düğümünüz arka planda çalışıyorsa `nohup`\(örneğin, koşarak çalıştırarak\) düğümü çalıştırarak işleten süreci `ps aux | grep avalanche`bulun. Bu da çıktıları şöyle üretir:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Bu örnekte, ikinci satır düğümünüz hakkında bilgi verir. `2630`Bu durumda sürecin kimliğine dikkat edin. Koşarak düğmeyi `kill -2 2630`durdur.

Şimdi düğümün yeni versiyonunu indirmeye hazırız. Kaynak kodunu indirip ikili programı kurabilirsiniz, ya da önceden yapılmış ikili aryayı indirebilirsiniz. İkisini de yapmana gerek yok.

Önceden yapılmış ikili yazıları indirmek daha kolay ve kendi düğümünü çalıştırmak ve kazığı kazığa kazık atmak istiyorsan önerilir.

[Kaynağından](upgrade-your-avalanchego-node.md#build-from-source) düğümü inşa etmek tavsiye edilir, eğer Avalanche'i deneye ve geliştirmek isteyen bir geliştirici iseniz.

## **Öncesi İkili İndir**

Eğer kendi binası yerine önceden inşa edilmiş bir ikili indirmek istiyorsanız [bizim sürümler](https://github.com/ava-labs/avalanchego/releases) sayfamıza gidin ve istediğiniz salıverilmeyi seçin. \(muhtemelen en sonuncusu\)

`Assets`Altında, uygun dosyayı seçin.

MacOS için:   İndirme:`avalanchego-macos-<VERSION>.zip`   - Boşalt.`unzip avalanchego-macos-<VERSION>.zip`   `avalanchego-<VERSION>`Ortaya çıkan klasör, ikili dosyaları içeriyor.

PC'ler veya bulut sağlayıcıları için Linux için:   İndirme:`avalanchego-linux-amd64-<VERSION>.tar.gz`   - Boşalt.`tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`   `avalanchego-<VERSION>-linux`Ortaya çıkan klasör, ikili dosyaları içeriyor.

RaspberryPi4 veya benzer Arm64 tabanlı bilgisayarlar için Linux için:   İndirme:`avalanchego-linux-arm64-<VERSION>.tar.gz`   - Boşalt.`tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`   `avalanchego-<VERSION>-linux`Ortaya çıkan klasör, ikili dosyaları içeriyor.

Şimdi düğümün yeni versiyonunu çalıştırmaya hazırsın.

### Terminalden düğümleri çalıştırıyor

Eğer on önceden inşa edilmiş ikili harfleri kullanıyorsanız:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Linux'ta önceden inşa edilmiş ikili kullanacaksanız:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

`nohup`Eğer arka plandaki düğümü çalıştırmak istiyorsanız komutun başlangıcına ekleyin.

### Düğümü bir servis olarak çalıştırıyorum.

Eğer düğümü bir hizmet olarak çalıştırıyorsan, eski ikili harfleri yenileriyle değiştirmelisin.

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORY_WITH_OLD_BINARIES>`

Sonra da hizmete yeniden `sudo systemctl start avalanchego.service`başlayın.

## **Kaynaktan yapılıyor**

İlk klonumuz Github our \(bunu daha önce yaptıysanız bu adımı atabilirsiniz\):

```text
git clone https://github.com/ava-labs/avalanchego.git
```

Sonra da avalanchego dizine geç:

```text
cd avalanchego
```

Son kodu çıkar:

```text
git pull
```

`git fetch --all --tags``<tag>`Not: Ana şubesi en son etiketi ile güncellenmediyse, ilk çalıştırma yoluyla doğrudan ulaşabilirsiniz, ve sonra `git checkout --force tags/<tag>`\(en son sürüm etiketi; örneğin\) `v1.3.2`yerine ona ulaşabilirsiniz.`git pull` Yerel kopyanızın "kopyalanmış başlık" durumunda olacağına, bu bir sorun değil, eğer kaynak için geri itmek istediğiniz bir kaynak yapmazsanız bu sorun değildir. \(bu durumda bir dal ve sıradan birleşmelere bakmalısınız\). Ayrıca `--force`bayrağın sahip olabileceğiniz herhangi bir yerel değişikliği göz ardı edeceğine dikkat edin.

Yerel kodunuzun güncel olup olmadığını kontrol edin. Do:

```text
git rev-parse HEAD
```

Ve ilk 7 karakterin [our](https://github.com/ava-labs/avalanchego) en son çalışma alanıyla eşleştiğini kontrol et.

`git checkout tags/<tag>`Eğer ilk 7 karakterin bu etiketin özeti ile eşleşmesi gerekir.

Şimdi ikili yap:

```text
./scripts/build.sh
```

Bu basılmalı:

```text
Build Successful
```

Hangi versiyonunu kullandığınıza bakabilirsiniz:

```text
./build/avalanchego --version
```

Düğününü şöyle çalıştırabilirsin:

```text
./build/avalanchego
```


# Çığ Düğümünü Yükselt

{% embed url="https:/youtu.be/o4Fw-sHoaQ" başlık="% }

## **Düğününü geri ver**

Düğününüzü güncellemeden önce, ağ üzerindeki your tanımlamak için kullanılan yedek dosyalarınızı yedeklemenizi tavsiye eder. Öntanımlı kurulumda onları komutları uygulayarak kopyalayabilirsiniz:

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

Sonra `staker.crt` ve `staker.key` dosyalarını indirip güvenli ve özel bir yerde tut. Düğününüze ya da makine düğümüne bir şey olursa bu dosyalar node tamamen yeniden oluşturmak için kullanılabilir.

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

Eğer düğümünüz terminal içinde çalışıyorsa `ctrl+c` tuşuyla durdurun.

### Bir servis olarak çalıştırılan düğüm

Eğer düğümünüz bir hizmet olarak çalışıyorsa girerek durdurun:

`Sudo systemctl durdur stop`

\ (Hizmetinize farklı olarak adlandırılabilir, `avalanche.service`,

### Arka planda çalıştırılan düğüm

Eğer düğümünüz arka planda çalışıyorsa\ (örneğin, `with` çalışırken) o zaman `düğümü çalıştırarak çöz by   grep avalanche`. çalıştırarak çalıştıran süreci bulun. Bu da çıktıları şöyle üretir:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Bu örnekte, ikinci satır düğümünüz hakkında bilgi verir. Bu durumda `2630` sayılı işlem kimliğine dikkat edin. `- 2630` öldürerek düğmeyi durdurun.

Şimdi düğümün yeni versiyonunu indirmeye hazırız. Kaynak kodunu indirip ikili programı kurabilirsiniz, ya da önceden yapılmış ikili aryayı indirebilirsiniz. İkisini de yapmana gerek yok.

Önceden yapılmış ikili yazıları indirmek daha kolay ve kendi düğümünü çalıştırmak ve kazığı kazığa kazık atmak istiyorsan önerilir.

[Kaynağından](upgrade-your-avalanchego-node.md#build-from-source) düğümü inşa etmek tavsiye edilir, eğer Avalanche'i deneye ve geliştirmek isteyen bir geliştirici iseniz.

## **Öncesi İkili İndir**

Eğer kendi binası yerine önceden inşa edilmiş bir ikili indirmek istiyorsanız [bizim sürümler](https://github.com/ava-labs/avalanchego/releases) sayfamıza gidin ve istediğiniz salıverilmeyi seçin. \)

`Varlıklar` altında, uygun dosyayı seçin.

MacOS için:   İndirme: `avalanchego-macos-<VERSION>.zip`   Unzip: `unzip avalanchego-macos-<VERSION>.zip`   Ortaya çıkan klasör olan `avalanchego-<VERSION>`, ikili içerir.

PC'ler veya bulut sağlayıcıları için Linux için:   İndirme: avalanchego-linux-amd64, `avalanchego-linux-amd64-<VERSION>.tar.gz`   Unzip: `tar - xvf avalanchego-linux-amd64<VERSION>.tar.gz`   Ortaya çıkan klasör `avalanchego-<VERSION>-linux`, ikili içerir.

RaspberryPi4 veya benzer Arm64 tabanlı bilgisayarlar için Linux için:   İndirme: `avalanchego-linux-arm64<VERSION>.tar.gz`   Unzip: `tar - xvf avalanchego-linux-arm64<VERSION>.tar.gz`   Ortaya çıkan klasör `avalanchego-<VERSION>-linux`, ikili içerir.

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

Eğer arka plandaki düğmeyi çalıştırmak istiyorsanız komutun başlangıcına `nohup` ekle.

### Düğümü bir servis olarak çalıştırıyorum.

Eğer düğümü bir hizmet olarak çalıştırıyorsan, eski ikili harfleri yenileriyle değiştirmelisin.

`cp - r avalanchego-<VERSION>-linux/* <DIRECTORY_with_OLD_BINARIES>`

Sonra da servisi `sudo sistemiyle` yeniden başlat.

## **Kaynaktan yapılıyor**

İlk klonumuz Github repo-- (eğer bunu daha önce yaptıysanız bu adımı atabilirsiniz):

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

Not: Ana şubesi son etiketi ile güncellenmediyse, doğrudan çalıştırılan `git git git getir, tüm etiketler` ve sonra `git` --\ \(<tag> burada `<tag>` en son etiket; <tagdır ; `örneğin v1,3.2\) ile git` etiket, maket çekme yerine `v1.)` ile doğrudan ulaşabilirsiniz. Yerel kopyanızın "kopyalanmış başlık" durumunda olacağınıza dikkat edin, bu bir sorun değil, eğer kaynak için değişiklik yapmazsanız bu sorun değil.\ (bu durumda bir dal ve sıradan merges\ 'a başvurmanız gerekir). Ayrıca `bu` bayrağın yerel değişiklikleri göz ardı edeceğine dikkat edin.

Yerel kodunuzun güncel olup olmadığını kontrol edin. Do:

```text
git rev-parse HEAD
```

Ve ilk 7 karakterin [our](https://github.com/ava-labs/avalanchego) en son çalışma alanıyla eşleştiğini kontrol et.

Not: `Eğer git kontrol tags/<tag>` kullanırsanız bu ilk 7 karakterler bu etiketin özetini kullanacaktır.

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


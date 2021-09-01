---
description: 'Toplumun üyesi: Murat Çeliktepe'
---

# Bir ERC-20 Token Oluştur

ERC-20 jetonları, in en temel ve temel kavramdır. Avalanche topluluğu ve ekosistem büyüdükçe, Ethereum veya farklı zincirlerde çalışan yeni kullanım vakaları ve projeler Avalanche uygulanacak. Projeler için kullanılacak olan işaretli standart belirli değildir ve herkes kendi standartlarını yaratabilir.

Bu yüzden kendi maden makineli ERC-20 işaretimizi oluşturacağız ve istediğimiz adreslere nane yapacağız. Bu işaret, Avalanche on üretilecek ve bu zincire ulaşılabilecek.

Aslında düşünmemiz gereken şey Solidity ile to yazılmış akıllı bir sözleşme yayınlayacağımız. Bu Avalanche bize sunduğu özelliktir - herhangi bir akıllı sözleşmeyi zincire yükleyebilmemiz ve yeni bir dil belirli kontrat konseptinin etkileşime girmesi gereksinimi yok. Bir ERC-20 sözleşmesi nasıl yapılacağına bakalım. Ve to yayalım.

## Metamask ayarla

İlk yapmamız gereken şey metamask cüzdanı.

![Posta için resim](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

Tarayıcıda metamask simgesine tıklayın ve ağ indirme menüsünü seçin. Burada to bağlanmalıyız. "Özel to tıklayın.

![Posta için resim](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

Şimdi, bu kutuları doğru değerlerle ayarlamalıyız.

* **Ağ **Adı: Avalanche C-Chain
* **Yeni RPC **URL:
   * ****[Mainnet:](https://api.avax.network/ext/bc/C/rpc)
   * **Fuji **[Testnet:](https://api.avax-test.network/ext/bc/C/rpc)
   * **Yerel Testnet: **[http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* ****ZincirI:
   * **Mainnet:**`43114`
   * **Fuji Testnet:**`43113`
   * **Yerel Testnet:**`43112`
* ****Sembol: AVAX
* ****Kaşif:
   * **Mainnet:** [https://cchain.explorer.avax.network](https://cchain.explorer.avax.network/)
   * **Fuji Testnet:** [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)
   * ****Yerel ağ

![Posta için resim](../../../.gitbook/assets/erc20-metamask.png)

Tüm parametreleri doğru ayarladıktan sonra bu sayfayı görmeliyiz. Şimdilik 0 AVAX var.

## C-Chain adresinizi Fonla

Kullanılan ağa bağlı olarak, C-Chain adresinize kaynak sağlamak için üç yol var.

### **Çalınca Cüzdanı Kullanıyor**

Ana ağda, from C-Chain adresinize para aktarmak için [Avalanche Cüzdan](https://wallet.avax.network/) kullanabilirsiniz. Bu [özel ders](../platform/transfer-avax-between-x-chain-and-c-chain.md) için de açıklandığı gibi işlem basittir. Cüzdan test ve yerel ağlarda da kullanılabilir.

### **Test Ağı Faucet Kullanıyor**

Test ağındaki finansman için, Test Ağı on de kullanabilirsiniz. [https://faucet.avax-test.network/](https://faucet.avax-test.network/) / ve C-Chain adresinizi yapıştırın.

### Yerel testnet fonunu

Yerel bir ağda, kendi musluğunuzu yerleştirerek adreslerinizi kolayca finanse edebilirsiniz. [Özel bir öğretmen](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

[Avax musluğuna](https://faucet.avax-test.network/) gidip C-Chain adresinden örnek olarak "0xfe886bec537252040Dff36448C0F104Be635550" \(C-Chain adresinden yapıştıralım.

![Posta için resim](../../../.gitbook/assets/erc20-faucet.png)

Adresi kopyalayıp yapıştırdıktan sonra 20 AVAX talep et. Bu test musluk işaretinin bir değeri yok, sadece geliştirme amaçları için.

O zaman cüzdanını kontrol et ve in test işareti olmalı.

## Mintable simgesi oluştur

Şimdi, on mintable işaretimizi yapabiliriz. Remix Remix aç ya da [bu](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js) bağlantıya git.

![Posta için resim](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

Bu sayfayı izlemelisiniz. Bu sayfada, ilk olarak, "Featured from "SOLIDITY" tıklayın ve sonra "Yeni Dosya" düğmesine tıklayın. Yeni Dosya düğmesine tıkladığınızda, dosya adı gerektiren bir açılma göreceksiniz. Bir isim seçebilirsin ya da öntanımlı olanı bırakabilirsin.

[from](https://openzeppelin.com/contracts/) bir ERC-20 sözleşmesi kullanacağımız için bu hattı dosyanın üzerine yapıştırıp kurtarın.

```javascript
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
```

![Posta için resim](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

Dosyayı kaydettikten sonra remixe aktarılan bir sürü dosya göreceğiz. Bu remiks özelliği, bir GitHub kontrat deposunu aktarmamızı sağlayan bir remix özelliği. Sadece ithal bir ifade ile to remix yapar.

![Posta için resim](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

ERC20PresetMinterPauser.sol dosyası var. Bu dosya OpenZeppelin tarafından minter işlevselliği ile ERC20 standartlarına göre yazılmıştır. Bu dosyayı yayınladıktan sonra sözleşmenin sahibi olacağız. Böylece jetonları şekillendirme yetkisi ve yetkisine sahip olacağız.

![Posta için resim](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## Kontratı başlat

"SOLIDITY COMPILER" olan ikinci sekmeyi aç ve dosya'da "pragma dayanıklılık" olarak yazılmış dayanıklılık sürümü ile eşleşen doğruluk sürümü seç. Sürüm dosyanın sürümünden daha yüksek veya daha yüksek olmalıdır. Örneğin, dosyamda "pragma solidity ^0.6.0" yazılmıştır bu yüzden gerekli sürüm 0.6.0 veya daha yüksektir. Serginin içinde geçerli sürümü 0.6.6 olur. Katı sürümü kontrol ettikten sonra derleme düğmesine tıklayın. Eğer dosyada herhangi bir şeyi değiştirmediyseniz, ya da doğruluk sürümü yanlış değilse, sözleşme herhangi bir hata olmadan derlenmelidir.

![Posta için resim](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

O zaman DEPLOY & Run the üçüncü sekmeye geçelim. Kontratımızı başlatmadan önce çevreyi değiştirmeliyiz. Çevre için tıklayın ve "Enjekte Web3" seçin. Eğer bir patlama ortaya çıkıp hesabı bağlamanı isterse, bağlantı kurmak için tıklayın. Sonra hesap adresini "Hesap Kutusu" kutusundaki görmelisiniz.

Görevden önce son şey bir işaret olarak konuşlandırılacak sözleşmeyi ayarlamaktır. Kontrat Düğmesinin üzerinde bir anlaşma seçmek için bir indirme menüsü var. "ERC20PresetMinterPauser.sol" adlı sözleşmeyi seçin.

![Posta için resim](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

Şimdi, burada name adını ve sembolünü girin. Ona "test" adını vereceğim ve sembolün "tst" olacak. Düğmeyi aktarmak için bir tuşa basabilirsiniz.

![Posta için resim](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

Düğmeye tıkladıktan sonra bir patlama ortaya çıkacak ve onaylayacak.

![Posta için resim](https://miro.medium.com/max/353/1*yOOQYZvESjSKx2qec5pYgA.png)

Sonra bir başka meta doğrulama daha ortaya çıktı. Onaylayın.

Tüm bu patlamaları doğruladıktan sonra to işaret verdik. Böylece onunla etkileşime geçebiliriz.

## Token ile etkileşim

Çığ C-Chain üzerinde bu [c-chain kaşif](https://cchain.explorer.avax-test.network/) aracılığıyla konuşlandırılan işlemlerimizi görebiliyoruz.

Ama önce remiks konsolundan gelen işlem özetini görelim.

![Posta için resim](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

Kontratı yayınladıktan sonra remiks konsolunda bir kütük görmeliyiz. Oku ve genişletmek için tıkladığınızda işlem özeti ortaya çıkacak. Anlaşıldı.

![Posta için resim](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

Sadece paylaştığım [kaşifin](https://cchain.explorer.avax-test.network/) özetini yapıştırıp içeri bas.

![Posta için resim](https://miro.medium.com/max/1907/1*6GhQaa_UaDvtk3Kvimi3aA.png)

Burada işlem ve gösterge sözleşmesi hakkındaki tüm detayları görebiliyoruz.

![Posta için resim](https://miro.medium.com/max/764/1*tTFQUn3fStbv-TW9kExyUg.png)

İlki de benim cüzdanım ve ikinci adres ise "test" adında bir işaretli kontrat adresin. Şimdi kendi adresinize bir hediye verelim.

![Posta için resim](https://miro.medium.com/max/607/1*K9eBNTQFkvUYjjmvegDZtQ.png)

Remiks için geri dön ve after sonra "Deployed Contracts" bölümündeki sözleşmeyi görebilirsin.

Burada, bir sürü fonksiyonumuz var. İşlemlerimiz ile etkileşime geçebilir. OpenZeppelin belgelerinden onları kullanmayı öğrenmek için tüm bu yöntemleri kontrol edebilirsiniz. Ama sadece nane yöntemini kullanacağız.

Oku okumak için nane yönteminin yanında oka tıklayın.

![Posta için resim](https://miro.medium.com/max/577/1*GrxG6rsklrYN4xN1eF_ckw.png)

Adresinizi ve WEI'ye bir miktar girin. Örneğin, 1000 tst token ile ben de "100

![Posta için resim](https://miro.medium.com/max/354/1*FM-PMUY7au61ejHJzBIsfg.png)

## Token Token ekle

Şimdi sözleşmemize 1000 jeton kazandırdık ama metamask cüzdanındaki işaretleri görememen gerekiyor. Kendi işaretimizi görmek için bunu eklemeliyiz. On "Token" düğmesine tıklayın ve "Custom Token" sekmesini seçin.

Burada from görebileceğiniz işaretli adresine gir. Kopyala ve yapıştır. Sonra bir sonraki düğmeye tıklayın, metamask cüzdanınıza koyduğunuz 1000 jeton görmelisiniz. Ayrıca remiks ya da metamask yoluyla başka bir hesaba gönderebilirsiniz.


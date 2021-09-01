# Çığ Çığlıkları

AvalancheJS, [Avalanche](../../../#avalanche) platformu ile etkileşim kurmak için bir JavaScript Kütüphanesi. Tip Yazılım kullanarak inşa edilmiş ve hem tarayıcı hem de Node.js. desteklemek amacıyla tasarlanmıştır. AvalancheJS kütüphanesi Avalanche node to komutlar yayınlamasına izin verir.

Şu anda öntanımlı olarak desteklenen API'ler şunlardır:

* API yönetir
* API
* AVM API \(X-Chain\)
* EVM API \(C-Chain\)
* Sağlık API
* Bilgi API
* Keystore API
* Metrik API
* PlatformVM API

AvalancheJS tasarladık. Zihnimizde kullanım kolaylığı ile. Bu kütüphane, herhangi bir Javascript geliştiricisi geliştiricinin tüketimi için API uç noktalarını etkinleştiren Avalanche Platformunda bir düğüm ile etkileşime girebilir. Kütüphaneyi [Avalanche Platform](https://docs.avax.network) in son değişikliklerle güncel tutuyoruz.

AvalancheJS kullanarak, geliştiriciler yapabilir:

* Özel anahtarları yerel yönetir
* Adreslerdeki dengeleri geri getir
* Adresler için UTXOs al.
* İşlemleri yapın ve imzalayın
* Ana ağdaki X-Chain, P-Chain ve C-Chain ile işlemleri imzaladı
* Bir Alt Ağ Oluştur
* AVAX ve X-Chain, P-Chain ve C-Chain arasındaki varlıkları takas edin.
* Ana ağa bir Validator ekle
* Ana ağa bir Delegator ekle
* Yerel bir düğüm yap
* Avalanche ağı bilgilerini düğümden geri al

## Gereklilik

AvalancheJS Node.js sürümü 12.14.1 veya derlemek için daha yüksek gerektirir.

## Kurum

Avalanche şu şekilde yüklemek için `npm`kullanılabilir:

`npm install --save avalanche`

Ayrıca repoyu doğrudan aşağı çekebilir ve sıfırdan inşa edebilirsin:

`npm run build`

Bu da saf Javascript kütüphanesi oluşturacak ve proje köküne "web" adlı bir dizine koyacak. "Çığlık" dosyası daha sonra of saf bir javascript uygulaması olarak herhangi bir projeye atılır.

AvalancheJS kütüphanesi şu şekilde mevcut Node.js projenize aktarılabilir:

```text
const avalanche = require("avalanche");
```

Ya da senin TypeScript projen:

```text
import { Avalanche } from "avalanche"
```

## Temel bilgileri aktarılıyor.

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();
```

Yukarıdaki satırlar ders verileri için kullanılan kütüphaneleri ithal ediyor. Kütüphaneler şunlardır:

* Çığ : Bizim javascript modülümüz.
* Bn.js: AvalancheJS tarafından büyük sayılı modül kullanımı.
* Bir Buffer kütüphanesi.
* BinTools: İkili verilerle uğraşmak için kullanılan AvalancheJS içine inşa edilmiş bir singleton.


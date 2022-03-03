# C-Chain Tarayıcıda Akıllı Sözleşmeleri Doğrulama

C-Chain Tarayıcı kullanıcıların incelemesine imkan vererek akıllı sözleşme doğrulamayı destekler.

Mainnet C-Chain Tarayıcı [burada](https://snowtrace.io/) ve Fuji Testnet Tarayıcı [buradadır.](https://testnet.snowtrace.io/)

Sorununuz varsa bize [Discord](https://chat.avalabs.org) üzerinden ulaşın.

## Adımlar

Sözleşmenizin adresi için Tarayıcı \(Explorer\) sayfasında _Contract_ \(Sözleşme\) sekmesine gidin.

![contract\_tab](/img/verify-and-publish1.png)


Akıllı sözleşme doğrulama sayfasına girmek için _Verify & Publish_ \(Doğrula & Yayınla\) ögesini tıklayın.

![SRC](/img/verify-src.png)


[Kitaplıklar](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries) sağlanabilir. Sağlanabilirse deploy edilmeli, bağımsız olarak doğrulanmalı ve _Add Contract Libraries_ \(Kontrat Kütüphanesi Ekle\) kısmından eklenmelidir.

![Kitaplıklar](/img/verify-libraries.png)


C-Chain Tarayıcı basit akıllı sözleşmeler için otomatik olarak kurucu argümanları getirebilir. Daha karmaşık sözleşmeler, özel kurucu argümanlar getirilmesini gerektirebilir. Karmaşık kurucuları olan akıllı sözleşmelerde [doğrulama sorunları olabilir](verify-smart-contracts.md#caveats). Bu [online abi kodlayıcıyı](https://abi.hashex.org/) deneyebilirsiniz.

## Gereklilikler

* **ÖNEMLİ** Sorun olmadığından emin olmak için sözleşmelerin Mainnet'e deploy edilmeden önce Testnet'te doğrulanması gerekir.
* Sözleşmeler düzleştirilmelidir.
   * Eklemeler çalışmayacaktır.
* Sözleşmeler [Remix](https://remix.ethereum.org)'te derlenebilir olmalıdır.
   * `pragma experimental ABIEncoderV2` içeren bir düzleştirilmiş sözleşme \(örnek olarak\) olağandışı binary ve/veya kurucu blob'lar yaratabilir. Bu, doğrulama sorunlarına yol açabilir.
* C-Chain Tarayıcı \(Explorer\) **sadece** [solc javascript](https://github.com/ethereum/solc-bin) doğrulaması yapar ve sadece [Solidity](https://docs.soliditylang.org) sözleşmelerini destekler.

## Kitaplıklar

Harici kitaplıklar bulunması halinde compile bytecode tanımlanacaktır. Remix ile çıkarırsanız birden çok işlem yaratıldığını da göreceksiniz.

```javascript
{
  "linkReferences": {
    "contracts/Storage.sol": {
      "MathUtils": [
        {
          "length": 20,
          "start": 3203
        }
        ...
      ]
    }
  },
  "object": "....",
  ...
}
```

Bu, kodu doğrulamak için harici kitaplıklar eklemenizi gerektirir.

Bir kitaplığın bağımlı kitaplıkları olabilir. Bir kitaplığı doğrulamak için C-Chain Tarayıcıya bağımlılıklar hiyerarşisi sağlanması gerekecektir. Kitaplık artı herhangi bir bağımlılıktan fazlasını sağlarsanız doğrulama başarısız olabilir \(yani, gereken class'lar dışındaki her şeyi çıkarmak için Solidity kodunu kısaltmanız gerekebilir\).

Byte kodunda `__$75f20d36....$__` şeklinde referanslar da görebilirsiniz. Keccak256 hash, kitaplık adından üretilir.

Örnek [çevrimiçi dönüştürücü](https://emn178.github.io/online-tools/keccak_256.html): `contracts/Storage.sol:MathUtils`=>  `75f20d361629befd780a5bd3159f017ee0f8283bdb6da80805f83e829337fd12`

## Örnekler

* [SwapFlashLoan](https://testnet.snowtrace.io/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoan; swaputils ve mathutils kullanır:

* [SwapUtils](https://testnet.snowtrace.io/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtils, mathutils gerektirir:

* [MathUtils](https://testnet.snowtrace.io/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## Uyarılar

### SPDX Lisansı Gerekiyor

Bir SPDX sağlanmalıdır.

```javascript
// SPDX-License-Identifier: ...
```

### keccak256 String'leri İşleniyor

C-Chain Tarayıcı, yorumlardakiler dahil tüm keccak256\(...\) string'lerini yorumlar. Bu, kurucu argümanlar ile sorunlara yol açabilir.

```javascript
/// keccak256("1");
keccak256("2");
```

Bu, otomatik kurucu doğrulama hatalarına neden olabilir. Kurucu argümanlar ile ilgili hata alıyorsanız, bunlar sözleşme doğrulama sayfasında ABI hex formatıyla kodlanmış şekilde sağlanabilir.

### Solidity Kurucuları

Kurucular ve kalıt kurucular, kurucu argümanların doğrulanmasında sorunlara sebep olabilir.

örnek:

```javascript
abstract contract Parent {
  constructor () {
    address msgSender = ...;
    emit Something(address(0), msgSender);
  }
}
contract Main is Parent {
  constructor (
          string memory _name,
          address deposit,
          uint fee
  ) {
    ...
  }
}
```

Kurucu argümanlar ile ilgili hata alıyorsanız, bunlar sözleşme doğrulama sayfasında ABI hex formatıyla kodlanmış şekilde sağlanabilir.


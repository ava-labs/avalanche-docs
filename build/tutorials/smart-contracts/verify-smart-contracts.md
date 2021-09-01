# C-Chain Explorer üzerindeki Akıllı Sözleşmeleri Doğrulayın.

C-Chain Explorer akıllı sözleşmeleri doğrulamayı destekler, kullanıcıların bunu gözden geçirmesine izin verir.

Mainnet C-Chain Explorer [burada](https://cchain.explorer.avax.network/) ve Fuji Testnet Explorer [burada.](https://cchain.explorer.avax-test.network/)

Eğer bir sorununuz varsa, [Discord](https://chat.avalabs.org) ile irtibata geçin.

## Adımlar

Kontratın adresi için Explorer sayfasındaki _kod _sekmesine yönlendir.

![& ampı Doğrula; Yayın](../../../.gitbook/assets/smart-contract-verify-page.png)

_Akıllı kontrat doğrulama sayfasına girmek _için Tıklayın & Yayınlanın.

![Kontrat Girdi](../../../.gitbook/assets/smart-contract-input-page.png)

[Kütüphaneler](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries) de sağlanabilir. Eğer öyleyse, be bağımsız olarak onaylanmalı ve _Ekle Sözleşmeli Kütüphaneler _bölümünde.

![Kütüphaneler](../../../.gitbook/assets/smart-contract-library.png)

C-Chain Explorer basit akıllı sözleşmeler için otomatik olarak yapıcı argümanları getirebilir. Daha karmaşık sözleşmeler özel yapıcı argümanlarını geçmenizi gerektirebilir. Karmaşık yapıcılar ile yapılan akıllı anlaşmaların [doğrulama sorunları olabilir](verify-smart-contracts.md#caveats). [İnternette abi](https://abi.hashex.org/) kodlayıcısını deneyebilirsin.

## Gereklilik

* **Önemli sözleşmeler Testnet üzerinde doğrulanmalı, to gönderilmeden önce, sorun olmaması için gerekli olan **sözleşmeler.
* Sözleşmeler must
   * Bu da işe yaramayacak.
* [Contracts](https://remix.ethereum.org) sözleşmeler derlenebilir olmalıdır.
   * Düzleştirilmiş bir `pragma experimental ABIEncoderV2`sözleşme, alışılmadık ikili ve/veya yapıcı blobs. oluşturabilir. Bu durum doğrulama sorunlarına neden olabilir.
* **C-Chain Explorer [sadece çözücü javascript](https://github.com/ethereum/solc-bin) **onaylar ve sadece [Dayanıklılık](https://docs.soliditylang.org) sözleşmelerini destekler.

## Kütüphaneler

Disk kütüphaneleri varsa derleme bytecode tanımlanacaktır. with serbest bırakırsanız, birden fazla işlem oluşturulmuş olacaktır.

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

Bu durum kodu doğrulamak için harici kütüphaneler eklemenizi gerektiriyor.

Bir kütüphane bağımsız kütüphanelere sahip olabilir. Bir kütüphane doğrulamak için bağımlılıkların hiyerarşisinin C-Chain Explorer'a verilmesi gerek. Kütüphane'den daha fazla bağımlılık sağladığınızda doğrulama başarısız olabilir. \(yani gerekli sınıflar dışında herhangi bir şeyi dışlamak için Dayanıklılık kodunu to gerekebilir\).

Ayrıca formda byte kodundaki referansları da `__$75f20d36....$__`görebilirsiniz. Keccak256 özet kütüphane adı ile üretilmiştir.

Örnek [çevrimiçi dönüştürücü](https://emn178.github.io/online-tools/keccak_256.html): `contracts/Storage.sol:MathUtils`=>`75f20d361629befd780a5bd3159f017ee0f8283bdb6da80805f83e829337fd12`

## Örnekler

* [SwapFlashLoan](https://cchain.explorer.avax-test.network/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoan swaputils ve matematik kullanmaktadır:

* [Değiş tokuş yap](https://cchain.explorer.avax-test.network/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

Değişim cihazları matematik kullanımını gerektirir:

* [MathUtils](https://cchain.explorer.avax-test.network/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## Mağaralar

### SPDX Lisansı Gerekli

Bir SPDX sağlanmalı.

```javascript
// SPDX-License-Identifier: ...
```

### keccak256 Dizginin Işlemleri

C-Chain Explorer tüm keccak256\(..\) dizginleri yorumlar. Bu durum yapıcı args. ilgili sorunlara neden olabilir.

```javascript
/// keccak256("1");
keccak256("2");
```

Bu durum otomatik yapıcı doğrulama başarısızlıklarına neden olabilir. Yapıcı args ilgili hatalar alırsanız sözleşmeli doğrulama sayfasında ABI hex kodlanmış formda sağlanabilir.

### Dayanıklı Yapıcılar

İnşaatçılar ve miras kalan yapıcılar yapıcı argümanlarını doğrulayan sorunlara neden olabilir.

Örnek:

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

Yapıcı args ilgili hatalar alırsanız sözleşmeli doğrulama sayfasında ABI hex kodlanmış formda sağlanabilir.


---
description: of temel kavramlarını ve mimarisini öğren.
---

# Platform Gözlemesi

Avalanche 3 yerleşik blok zincirine sahiptir: [**Exchange Chain \(X-Chain\)**](./#exchange-chain-x-chain), [**Platform**](./#platform-chain-p-chain) Zinciri \(P-Chain\) ve [**Kontrat Zinciri **\(C-Chain\)](./#contract-chain-c-chain) Üç blok zincirinin hepsi de [**Primary Network**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network) tarafından [onaylanmış](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) ve güvence altına alınmıştır. Ana Ağ özel bir [alt ağdır](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet) ve tüm özel alt ağların üyeleri en az 2.000 AVAX gözetleyerek birincil Ağ'ın bir üyesi olmalıdır.

Burada [alt ağ oluşturma](../../build/tutorials/platform/create-a-subnet.md) ve bir alt ağa [doğrulayıcı ekleme](../../build/tutorials/nodes-and-staking/add-a-validator.md) konusunda özel bilgiler var.

![Ana ağ](../../.gitbook/assets/image%20%2821%29.png)

## Alt ağlar

Alt ****ağ veya alt ağ bir blok zincirinin durumu üzerinde uzlaşma sağlamak için birlikte çalışan bir doğrulayıcı kümesidir. Her blok zinciri tam olarak bir alt ağ tarafından geçerlidir. Bir alt ağ birçok blok zincirini doğrulayabilir. Bir düğüm birçok alt ağ üyesi olabilir.

Bir alt ağ kendi üyeliğini yönetir ve kurucu its belirli özelliklere sahip olması gerekebilir. Bu çok yararlı ve daha derinlerde onun etkilerini araştırıyoruz:

### Uygun

Avalanche’s alt ağ mimarisi düzenleyici uyum sağlayabilir. Yukarıda belirtildiği gibi, alt ağ bir dizi gereksinim setini yerine getirmek için onaylayıcı gerekebilir.

Bazı örnekler şunlardır:

* Verilen bir ülkede Validators bulunmalı
* Doğrulayıcılar KYC/AML checks geçmeli
* Validators belirli bir lisans sahibi olmalıdırlar

### Özel Blokçular için destek

Sadece belirli önceden tanımlanmış validators katılabileceği ve blok zincirlerinin içeriğinin sadece validators. için görünür olduğu özel bir alt ağ oluşturabilirsiniz. Bu bilgi bilgilerini gizli tutmak isteyen örgütler için ideal.

### Endişelerin Ayrılması

Heterojen blok zincirleri ağında, bazı doğrulayıcılar belirli blok zincirlerini onaylamak istemezler, çünkü bu blockchains. zincirlerle ilgilenmezler. Alt ağ modeli validators sadece değer verdikleri blok zincirleriyle ilgilenmelerini sağlar. Bu durum on yükünü azaltıyor.

### Uygulama Özel-Özel Gereklilikleri

Farklı blok zinciri tabanlı uygulamalar belirli özelliklere sahip olmak için geçerli olanlardır. Büyük miktarda RAM veya CPU gücü gerektiren bir uygulama olduğunu varsayalım. Bir Subnet, validators belirli [donanım gereksinimlerini](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche) yerine getirmesi için başvurunun düşük performanslı bir performans göstermemesi için gerekli olabilir.

## Sanal Makineler

Bir **Sanal Makine **\(VM\) bir blok zincirinin uygulama seviyesindeki mantığını tanımlar. Teknik terimlerde, blok zincirinin durumu, devlet geçiş fonksiyonları, işlemleri ve API kullanıcıların blok zinciriyle etkileşim sağlayabilecekleri API belirler. on her blok zinciri bir VM örneğidir.

Bir VM yazdığınızda, ağ, uzlaşma ve blok zincirinin yapısını gibi düşük seviyeli mantık ile ilgilenmenize gerek yok. Avalanche bunu sahnelerin arkasında yapıyor, böylece yapmak istediğin şeye odaklanabilesin.

Bir blok zinciri için bir VM'yi bir plan olarak düşün; aynı VM'yi birçok blok zinciri oluşturmak için kullanabilirsiniz, her biri aynı kural setini takip eder, ancak mantıksal olarak diğer blok zincirlerinden bağımsız olarak kullanabilirsiniz.

### Neden Sanal Makineler?

Başlangıçta, blok zinciri ağları önceden tanımlanmış ve statik işlevsellik kümesi olan bir Sanal Makine \(VM\) vardı. Bu katı monolitik tasarım bu tür ağlarda bir blok zincirli uygulamaların çalıştırılabileceği kadar kısıtlı.

Özel merkeziyetli uygulamaları isteyen insanlar kendi yeni blok zinciri ağı oluşturmak zorunda kaldılar. Bu yüzden çok fazla zaman ve çaba gerektirdi, sınırlı güvenlik önerdi ve genellikle yerden hiç inmeyen hassas bir blok zinciriyle sonuçlandı.

Ethereum bu sorunu akıllı sözleşmelerle çözme yolunda bir adım attı. Geliştiricilerin ağ ve uzlaşma konusunda endişelenmelerine gerek yoktu, ancak merkeziyetli uygulamalar yaratmak hala zordu. Ethereum VM, düşük performansı ve akıllı kontrat geliştiricilerine kısıtlamalar uyguluyor. Ethereum akıllı sözleşmeleri yazma konusunda doğruluk ve diğer birkaç dil, birçok programcıya aşina değildir.

Avalanche VM'leri \(AVM\) blok zinciri tabanlı ademi merkeziyetli bir uygulamayı tanımlamayı kolaylaştırır. Yeni ve sınırlı diller yerine geliştiriciler Go içinde VMs yazabilir \(gelecekte diğer diller desteklenecektir\).

### Blockchain ve Sanal Makineyi Oluştur

Avalanche yeni instances kurulmasını destekliyor.

{% page-ref page="../../build/tutorials/platform/create-avm-blockchain.md" %}

Avalanche ayrıca sanal makinelerle özel blok zincirleri oluşturmayı da destekler.

{% page-ref page="../../build/tutorials/platform/create-a-virtual-machine-vm.md" %}

{% page-ref page="../../build/tutorials/platform/create-custom-blockchain.md" %}

## Takas Zinciri \(X-Chain\)

**X-Chain dijital akıllı varlıkların oluşturulması ve ticareti için merkeziyetli bir platform olarak hareket eder, gerçek dünya kaynaklarının \(örneğin, eşitlik, bağlar\) davranışlarını yöneten bir dizi kuralla, "yarına kadar takas edilemez" veya "sadece ABD vatandaşlarına gönderilebilir." gibi bir dizi kuralla bir temsili olarak hareket **eder.

on takas edilen bir varlık is on bir blok zincirine işlem yaptığınızda, in belirlenen bir ücret ödersiniz.

X-Chain, Avalanche Sanal Makinesi'nin \(AVM\) bir örneğidir. [X-Chain API](../../build/avalanchego-apis/exchange-chain-x-chain-api.md), istemcilere X-Chain ve AVM'nin diğer örneklerinde varlık oluşturma ve ticaret imkanı sağlar.

{% page-ref page="../../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

## Platform Zinciri \(P-Chain\)

****P-Chain, Avalanche üzerindeki metadata blok zinciridir ve geçerli validators, koordinatlar, aktif subnets, takip eder ve yeni alt ağların oluşturulmasını sağlar. P-Chain [Snowman uzlaşma protokolünü](../../#snowman-consensus-protocol) uyguluyor.

[P-Chain API](../../build/avalanchego-apis/platform-chain-p-chain-api.md), istemcilere alt ağ oluşturma, alt ağlara doğrulayıcı eklemesine ve blok zincirleri oluşturmasına izin verir.

## Kontrat Zinciri \(C-Chain\)

**C-Chain, [C-Chain’s API](../../build/avalanchego-apis/contract-chain-c-chain-api.md)'sini kullanarak yaratılma akıllı sözleşmelerini **sağlar.

C-Chain, [Avalanche](../../) tarafından çalışan Ethereum Sanal Makinesi'nin bir örneğidir.


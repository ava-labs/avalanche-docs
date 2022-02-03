---
sidebar\_position: 1
---

# Genel Bakış

Avalanche'ta 3 yerleşik blok zincir bulunur: [**Exchange Zinciri \(X-Chain\)**](#exchange-chain-x-chain), [**Platform Zinciri \(P-Chain\)**](#platform-chain-p-chain) ve [**Kontrat Zinciri \(C-Chain**\)](#contract-chain-c-chain). Bu 3 blok zincirin hepsi Avalanche'ın [**Birincil Ağı**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network) tarafından [doğrulanır](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) ve güvenliği sağlanır. Birincil Ağ, özel bir [subnet'tir](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet) ve tüm özel kişiselleştirilmiş subnet'lerin en az 2.000 AVAX stake ederek Birincil Ağ'ın üyesi de olması gerekir.

Burada [subnet yaratılması](../../build/tutorials/platform/create-a-subnet.md) ve bir subnet'e [doğrulayıcılar eklenmesi](../../build/tutorials/nodes-and-staking/add-a-validator.md) konusunda eğitim makaleleri yer almaktadır.

![Birincil Ağ](/img/primary-network.png)

## Subnet'ler

Bir **subnet**, diğer adıyla subnetwork, bir blok zincirler kümesinin durumuna dair konsensüse varmak için birlikte çalışan dinamik bir doğrulayıcılar kümesidir. Her bir blok zincir tam olarak bir subnet tarafından doğrulanır. Bir subnet birçok blok zinciri doğrulayabilir. Bir düğüm, birçok subnet'in üyesi olabilir.

Bir subnet kendi üyeliğini yönetir ve kendisini oluşturan doğrulayıcıların belirli özelliklere sahip olmalarını zorunlu kılabilir. Bu çok yararlı özelliğin sonuçlarını aşağıda daha ayrıntılı olarak inceliyoruz:

### Uygunluk

Avalanche'ın subnet mimarisi yasalara uygunluğu yönetilebilir hale getirir. Yukarıda belirtildiği gibi, bir subnet, doğrulayıcılardan bir takım gereklilikleri karşılamalarını talep edebilir.

Bu gerekliliklere bazı örnekler şunlardır:

* Doğrulayıcılar belli bir ülkede bulunmalıdır
* Doğrulayıcılar KYC/AML kontrollerini geçmelidir
* Doğrulayıcılar belli bir lisansa sahip olmalıdır

\(Daha açık olmak gerekirse, yukarıdaki örnekler sadece örnektir. Bu gereklilikler Avalanche Birincil Ağı için geçerli değildir.\)

### Özel Blok Zincirler için destek

Sadece önceden tanımlanmış belirli doğrulayıcıların katılabileceği bir subnet ve blok zincirlerin içeriklerinin sadece o doğrulayıcılar tarafından görülebilir özel bir subnet yaratabilirsiniz. Bu sistem, bilgilerini gizli tutmak isteyen kuruluşlar için idealdir.

### İlgilerin Ayrılması

Heterojen bir blok zincirler ağında bazı doğrulayıcılar belli blok zincirleri doğrulamak istemeyeceklerdir, çünkü, basitçe söylersek, o blok zincirlerle ilgilenmemektedirler. Subnet modeli, doğrulayıcıların sadece önemsedikleri blok zincirler ile ilgilenmelerine imkan verir. Bu da doğrulayıcıların yükünü azaltır.

### Aplikasyona Özgü Gereklilikler

Farklı blok zincir tabanlı aplikasyonlar, doğrulayıcıların belli özelliklere sahip olmalarını zorunlu kılabilir. Diyelim ki büyük miktarlarda RAM veya CPU gücü gerektiren bir aplikasyon var. Bir subnet, aplikasyonun yavaş doğrulayıcılar yüzünden düşük performans sorunları yaşamaması için doğrulayıcıların belli [donanım gerekliliklerini](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche) karşılamalarını zorunlu kılabilir.

## Sanal Makineler

**Bir Sanal Makine** \(VM\), bir blok zincirin uygulama düzeyindeki mantığını tanımlar. Teknik terimlerle anlatmak gerekirse, VM, blok zincirin durumunu, durum geçiş işlevini, işlemleri ve kullanıcıların blok zincir ile etkileşime girmelerine aracılık eden API'yi belirler. Avalanche'taki her blok zincir bir VM'nin bir instance'ıdır \(örnek\).

Bir VM yazdığınızda, ağ kurma, konsensüs ve blok zincirin yapısı gibi alt düzeydeki mantık konularıyla ilgilenmeniz gerekmez. Avalanche bunu sahne arkasında yaparak sizin kurmak istediğiniz şeye odaklanmanıza imkan sağlar.

VM'yi bir blok zincirin detaylı planı olarak düşünün; aynı VM'yi her biri aynı kurallar dizisini izleyen ama mantıksal olarak diğer blok zincirlerden bağımsız olan birçok blok zincir oluşturmak için kullanabilirsiniz.

### Neden Sanal Makineler?

İlk olarak, blok zincir ağlarının önceden tanımlanmış, statik bir işlevsellikler kümesine sahip bir Sanal Makinesi \(VM\) bulunur. Bu katı, yekpare tasarım bu ağlarda hangi blokzincir tabanlı uygulamalarının çalıştırılabileceğini sınırlandırmıştır.

Kişiselleştirilmiş merkeziyetsiz aplikasyonlar isteyen kişiler bütünüyle yeni kendi blok zincir ağını sıfırdan oluşturmak zorundalardı. Bunu yapmak çok fazla zaman ve çaba gerektirmiş, sınırlı güvenlik sağlamış ve genellikle bir türlü başarıyla uygulanamamış olan ısmarlama, kırılgan blok zincirlere yol açmıştır.

Ethereum bu sorunu akıllı sözleşmelerle çözme yönünde bir adım atmıştır. Geliştiricilerin ağ kurma ve konsensüsle uğraşma ihtiyacını ortadan kaldırmıştır ancak merkeziyetsiz uygulama oluşturmak hâlâ güç bir olmaya devam etmiştir. Ethereum VM düşük bir performansa sahiptir ve akıllı sözleşme geliştiricilerine sınırlamalar uygulamaktadır. Çoğu programcı Solidity ve Ethereum akıllı sözleşme yazmaya yönelik başka birkaç dile aşina değildir.

Avalanche VM'ler \(AVM\), blok zincir tabanlı bir merkeziyetsiz uygulama tanımlamayı kolaylaştırır. Geliştiriciler Solidity gibi yeni, sınırlı diller yerine Go'da VM'ler yazabilir \(gelecekte diğer diller desteklenecektir\).

### Kendi Blok Zincirinizi ve Sanal Makinenizi Yaratma

Avalanche, yeni Avalanche VM instance'ları yaratılmasını destekler.
* [Blok Zincir Çalıştıran bir AVM Yaratın](../../build/tutorials/platform/create-avm-blockchain.md)

Avalanche, sanal makinelerle özel blok zincir yaratımını da destekler.
* [Bir Sanal Makine \(VM\) Yaratın](../../build/tutorials/platform/create-a-virtual-machine-vm.md)
* [Kişiselleştirilmiş bir Blok Zincir Yaratın](../../build/tutorials/platform/create-custom-blockchain.md)

## Exchange Zinciri \(X-Chain\)

**X-Chain**, dijital akıllı varlıklar oluşturmak ve alıp-satmak için merkeziyetsiz bir platform olarak hareket eder ve "yarına kadar işlem yapılamaz" veya "sadece ABD vatandaşlarına gönderilebilir" gibi davranışını düzenleyen bir dizi kuralla gerçek dünya kaynaklarının \(ör. hisse senedi, tahvil\) bir temsilidir.

AVAX, X-Chain'de alınıp satılan bir varlıktır. Avalanche'ta bir blok zincire bir işlem çıkardığınızda AVAX cinsinden ifade edilen bir ücret ödersiniz.

X-Chain, Avalanche Sanal Makinesi'nin \(AVM\) bir instance'ıdır. [X-Chain API](../../build/avalanchego-apis/exchange-chain-x-chain-api.mdx), istemcilerin X-Chain'de ve AVM'nin instance'larında varlık yaratmasına ve alım-satım yapmasına izin verir. Daha fazla bilgi için [buraya](../../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md) bakın.


## Platform Zinciri \(P-Chain\)

**P-Chain**, Avalanche'taki metaveri blok zinciridir ve doğrulayıcıları koordine eder, aktif subnet'leri takip eder ve yeni subnet'ler yaratılmasına imkan verir. P-Chain, [Snowman konsensüs protokolünü](../../#snowman-consensus-protocol) implemente eder.

[P-Chain API](../../build/avalanchego-apis/platform-chain-p-chain-api.md), istemcilerin subnet'ler yaratmalarına, subnetlere doğrulayıcılar eklemesine ve blok zincirler yaratmalarına imkan verir.

## Kontrat Zinciri \(C-Chain\)

**C-Chain**, [C-Chain API'sini](../../build/avalanchego-apis/contract-chain-c-chain-api.md) kullanarak akıllı sözleşme yaratılmasına imkan verir.

C-Chain, Ethereum Sanal Makinesi'nin [Avalanche](../../) tarafından desteklenen bir instance'ıdır.


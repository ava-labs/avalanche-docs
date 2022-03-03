---
sidebar\_position: 1
---

# Genel Bakış

Müşteriler düğümlere API çağrıları yaparak Avalanche ile etkileşimde bulunurlar. API çağrılarındaki sayısal parametreler string'ler olarak verilebilir \(ör. `"5"` sayısı da `5` sayısı da bir tamsayı argüman için uygundur\). Sayısal dönüş değerleri her zaman string'ler olarak verilir \(ör. `5` yerine `"5"`\). Örneklerde, API çağrıları `127.0.0.1:9650`'de HTTP trafiğini dinleyen bir düğüme yapılır.

| Başlık | Açıklama |
| :--- | :--- |
| [**API Çağrıları Yayımlama**](issuing-api-calls.md) | Bu kılavuzda Avalanche düğümlerinin sunduğu API'lere nasıl çağrı yapılacağı açıklanmaktadır. |
| [**Platform Zinciri \(P-Chain\) API'si**](platform-chain-p-chain-api.md) | Bu API müşterilerin Avalanche'ın doğrulayıcı kümesini idame ettiren ve blok zincir ve subnet yaratma işlerini yöneten P-Chain \(Platform Zinciri\) ile etkileşimde bulunmalarına imkan verir. |
| [**Kontrat Zinciri \(C-Chain\) API'si**](contract-chain-c-chain-api.md) | Bu API müşterilerin Avalanche'ın ana EVM instance'ı olan C-Chain'le ve diğer EVM instance'larıyla etkileşimde bulunmalarına imkan verir. |
| [**Exchange Zinciri \(X-Chain\) API'si**](exchange-chain-x-chain-api.mdx) | Bu API müşterilerin X-Chain'de ve AVM'nin diğer instance'larında varlıklar \(AVAX dahil\) yaratmalarına ve alıp satmalarına imkan verin. |
| [**Admin API**](admin-api.md) | Bu API müşterilerin bir düğümün iç durumunu, bağlantılar kümesini ve benzeri dahili protokol verilerini incelemelerine imkan verir. |
| [**Auth API**](auth-api.md) | Bu API müşterilerin yetkilendirme token'larının yaratılmasını ve iptal edilmesini yönetmelerine imkan verir. |
| [**Health API**](health-api.md) | Bu API müşterilerin bir düğümün sağlığını kontrol etmelerine imkan verir. |
| [**Index API**](index-api.md) | Bu API'yle işlemleri, verteksi veya bloku kimliğe göre getirin. |
| [**Info API**](info-api.md) | Bu API müşterilerin bir düğüm hakkındaki temel bilgileri incelemelerine imkan verir. |
| [**IPC API**](ipc-api.md) | Bu API kullanıcıların hangi blok zincirlere yayın yapılacaksa o blok zincirler için UNIX domain soketleri yaratmalarına imkan verir. |
| [**Keystore API**](keystore-api.md) | Bu API müşterilerin bir Avalanche düğümünün gömülü Keystore dosyasını kullanmalarına imkan verir. |
| [**Metrics API**](metrics-api.md) | Bu API müşterilerin bir düğümün sağlığı ve performansı hakkında istatistikler almalarına imkan verir. |




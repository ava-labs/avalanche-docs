# Avalanchego APIs

Müşteriler API'ler ile Avalanche ile etkileşime girerler. `5`API çağrılarında sayısal parametreler sicim olarak verilebilir \(örneğin `"5"`bir tam sayı argümanı için her ikisi de uygundur\). Sayısal dönüş değerleri her zaman sicim olarak verilir \(örn, `"5"`yerine `5`\). Örnekler API çağrıları, HTTP trafiğini dinleme düğümüne `127.0.0.1:9650`dönüştürülür.

| Başlık | Tarif edilmesi |
| :--- | :--- |
| [**API Çağrıları Veriyor**](issuing-api-calls.md) | Bu rehber Avalanche düğümleri tarafından açık to nasıl telefon açacağını açıklar. |
| [**Platform Zinciri \(P-Chain\) API**](platform-chain-p-chain-api.md) | clients doğrulama setini koruyan P-Chain \(Platform Zinciri\) ile etkileşime girmelerine izin verir ve blok zinciri ve alt net yaratılışı kontrol eder. |
| [**Kontrat Zinciri \(C-Chain\) API**](contract-chain-c-chain-api.md) | Müşterilerin C-Chain ile etkileşime girmelerine izin verir, Avalanche’s ana EVM örneği, diğer EVM örnekleri ile etkileşim sağlar. |
| [**Takas Zinciri \(X-Chain\) API**](exchange-chain-x-chain-api.md) | AVAX ve AVAX, ve AVM'nin diğer örnekleri de dahil olmak üzere müşterilerin oluşturma ve ticaret varlıklarını sağlar. |
| [**İdari API**](admin-api.md) | Müşterilerin, bir düğümün iç durumu, bağlantıların kümesi ve benzer iç protokol verilerini incelemesine izin verir. |
| [**Auth API**](auth-api.md) | Müşterilerin yetki işaretlerinin oluşturulmasını ve kaldırılmasını yönetmesine izin verir. |
| [**Sağlık API**](health-api.md) | Hastaların bir düğümün sağlığını kontrol etmesine izin verir. |
| [**Endeks API**](index-api.md) | İşlemleri getir, vertex, veya kimlik ile blok getir. |
| [**Bilgi API**](info-api.md) | Müşterilerin bir düğüm hakkında temel bilgileri incelemesine izin verir. |
| [**IPC API**](ipc-api.md) | Kullanıcıların blok zincirleri yayınlamak için UNIX alan yuvaları oluşturmasına izin verir. |
| [**Keystore API**](keystore-api.md) | Müşterilere bir Avalanche düğümünün gömülü Keystore dosyasını kullanmalarına izin verir. |
| [**Metrik API**](metrics-api.md) | Müşterilerin bir düğümün sağlık ve performansı hakkında istatistikleri almasına izin verir. |




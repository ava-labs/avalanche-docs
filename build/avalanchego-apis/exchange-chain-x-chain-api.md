---
description: X-Chain Avalanche Sanal Makinesi'nin (AVM) bir örneğidir.

---

# Zincir \(X-Chain\ API

Avalanche’s ana platformu olan [X-Chain](../../learn/platform-overview/#exchange-chain-x-chain), Avalanche Sanal Makine \ (AVM\) bir örnektir. Bu API, müşterilerin X-Chain ve AVM'nin diğer örnekleri üzerinde varlıklarını oluşturma ve ticaret yapmalarına izin verir.

{% embed url="https://www.youtube.com/watch?v=rD-IOd1nvFo="" %}

## Format

Bu API, `json 2.0` RPC formatını kullanır. JSON RPC arama yapmak için daha fazla bilgi için, [buraya](issuing-api-calls.md) bakın.

## Son nokta

`/ext/bc/X` X-Chain ile etkileşim kurmak.

`/ext/bc/blockchain ID` diğer AVM örnekleriyle etkileşime geçmek için `blok` zincirinin AVM çalıştıran bir blok zincirinin kimliği olduğu bir diğer AVM örnekleridir.

## Yöntemler

### Avm, İnşaat.

Bu sanal makine genez durumunun JSON temsili olarak bu devletin byte temsilini oluşturmaktadır.

#### **Sonucu noktası**

Bu arama AVM'nin statik API uç noktasına yapıldı:

`/ext/vm/avm`

Not: Adresler bir zincir önekleme içermemeli. (ie) X-\) statik API sonlarına çağrılarda, çünkü bu önekler belirli bir zincire işaret eder.

#### **İmzalanma**

```cpp
avm.buildGenesis({
    networkID: int,
    genesisData: JSON,
    encoding: string, //optional
}) -> {
    bytes: string,
    encoding: string,
}
```

Kodlama, keyfi bytes ie için kullanılacak kodlama biçimini belirler. Geri dönen genesis bytes "cb58" veya "hece" olabilir. "Cb58" için Defaults

`genesisData` bu formu var:

```cpp
{
"genesisData" :
    {
        "assetAlias1": {               // Each object defines an asset
            "name": "human readable name",
            "symbol":"AVAL",           // Symbol is between 0 and 4 characters
            "initialState": {
                "fixedCap" : [         // Choose the asset type.
                    {                  // Can be "fixedCap", "variableCap", "limitedTransfer", "nonFungible"
                        "amount":1000, // At genesis, address A has
                        "address":"A"  // 1000 units of asset
                    },
                    {
                        "amount":5000, // At genesis, address B has
                        "address":"B"  // 1000 units of asset
                    },
                    ...                // Can have many initial holders
                ]
            }
        },
        "assetAliasCanBeAnythingUnique": { // Asset alias can be used in place of assetID in calls
            "name": "human readable name", // names need not be unique
            "symbol": "AVAL",              // symbols need not be unique
            "initialState": {
                "variableCap" : [          // No units of the asset exist at genesis
                    {
                        "minters": [       // The signature of A or B can mint more of
                            "A",           // the asset.
                            "B"
                        ],
                        "threshold":1
                    },
                    {
                        "minters": [       // The signatures of 2 of A, B and C can mint
                            "A",           // more of the asset
                            "B",
                            "C"
                        ],
                        "threshold":2
                    },
                    ...                    // Can have many minter sets
                ]
            }
        },
        ...                                // Can list more assets
    }
}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "avm.buildGenesis",
    "params" : {
        "networkId": 16,
        "genesisData": {
            "asset1": {
                "name": "myFixedCapAsset",
                "symbol":"MFCA",
                "initialState": {
                    "fixedCap" : [
                        {
                            "amount":100000,
                            "address": "avax13ery2kvdrkd2nkquvs892gl8hg7mq4a6ufnrn6"
                        },
                        {
                            "amount":100000,
                            "address": "avax1rvks3vpe4cm9yc0rrk8d5855nd6yxxutfc2h2r"
                        },
                        {
                            "amount":50000,
                            "address": "avax1ntj922dj4crc4pre4e0xt3dyj0t5rsw9uw0tus"
                        },
                        {
                            "amount":50000,
                            "address": "avax1yk0xzmqyyaxn26sqceuky2tc2fh2q327vcwvda"
                        }
                    ]
                }
            },
            "asset2": {
                "name": "myVarCapAsset",
                "symbol":"MVCA",
                "initialState": {
                    "variableCap" : [
                        {
                            "minters": [
                                "avax1kcfg6avc94ct3qh2mtdg47thsk8nrflnrgwjqr",
                                "avax14e2s22wxvf3c7309txxpqs0qe9tjwwtk0dme8e"
                            ],
                            "threshold":1
                        },
                        {
                            "minters": [
                                "avax1y8pveyn82gjyqr7kqzp72pqym6xlch9gt5grck",
                                "avax1c5cmm0gem70rd8dcnpel63apzfnfxye9kd4wwe",
                                "avax12euam2lwtwa8apvfdl700ckhg86euag2hlhmyw"
                            ],
                            "threshold":2
                        }
                    ]
                }
            }
        },
        "encoding": "hex"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/avm
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "bytes": "0x0000000000010006617373657431000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f6d794669786564436170417373657400044d464341000000000100000000000000010000000700000000000186a10000000000000000000000010000000152b219bc1b9ab0a9f2e3f9216e4460bd5db8d153bfa57c3c",
        "encoding": "hex"
    },
    "id": 1
}
```

### avm. Yaradılış Adresi

Verilen kullanıcı tarafından kontrol edilen yeni bir adres oluştur.

#### **İmzalanma**

```cpp
avm.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.createAddress",
    "params": {
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "X-avax12c6n252g5v3w6a6v69f0mnnzwr77jxzr3q3u7d"
    },
    "id": 1
}
```

### avm, Yaratıldı

Yeni bir sabit kapak oluştur, mantarlı bir varlık oluştur. Bu sayının bir kısmı başlatılma ile oluşturulur ve daha sonra hiç yaratılmamıştır. Varlık `avm.send`.

{% page-ref page="../tutorials/smart-digital-assets/create-a-fix-cap-asset.md" dijital varlıklar / page="../tutorials/smart-digital-assets/create-a-fix-cap-asset.md"

#### **İmzalanma**

```cpp
avm.createFixedCapAsset({
    name: string,
    symbol: string,
    denomination: int, //optional
    initialHolders: []{
        address: string,
        amount: int
    },
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    assetID: string,
    changeAddr: string
}
```

* `İsim` insan tarafından okunabilir bir isimdir. Eşsiz olması gerekmez.
* `Sembol,` varlığın bir kısaltma sembolüdür. 0 ile 4 karakter arasında. Eşsiz olması gerekmez. Belki de atılmıştır.
* `Bu` değerin dengelerinin kullanıcı arayüzleri tarafından nasıl gösterildiğini belirler. `Eğer bu` varlığın paydası 0, 100 ünite olarak gösterilecek. Eğer payda 1 100 `birim` ise bu varlığın 10.0 olarak gösterilecek. `Eğer bu` varlığın paydası 2, 100 ünite 1.00 ve 0 olarak gösterilebilir.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` ve `parola` kullanıcının işlem ücretini ödemelerini belirtir.
* `Başlat` in her element `bu adrese` in varlığın `miktarı` olduğunu belirtir.
* `Varlık` yeni varlığın kimliği.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createFixedCapAsset",
    "params" :{
        "name": "myFixedCapAsset",
        "symbol":"MFCA",
        "initialHolders": [
            {
                "address": "X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp",
                "amount": 10000
            },
            {
                "address":"X-avax1y0h66sjk0rlnh9kppnfskwpw2tpcluzxh9png8",
                "amount":50000
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"ZiKfqRXCZgHLgZ4rxGU9Qbycdzuq5DRY4tdSNS9ku8kcNxNLD",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm. nane

[`avm.createVariableCapAsset. avm.createVariableCapAsset`](exchange-chain-x-chain-api.md#avm-createvariablecapasset). ile oluşturulan değişken kapsülü bir varlığın mint birimi.

#### **İmzalanma**

```cpp
avm.mint({
    amount: int,
    assetID: string,
    to: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* Adresle ilgili `olarak` sayısal `değerler` oluşturulacak ve kontrol `edilecek`.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` işlem ücretini ödeyen kullanıcıdır `kullanıcı adı` anahtarları tutmalı ve bu varlığın daha fazla nane şekline izin vermelidir. Yani en azından bir minter setinin _eşik_ anahtarını kontrol etmesi gerekir.
* `TxID` bu işlem kimliği.
* `Sonuç` olarak değişim, herhangi bir değişikliğin gönderildiği adres.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount":10000000,
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "to":"X-avax1ap39w4a7fk0au083rrmnhc2pqk20yjt6s3gzkx",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2oGdPdfw2qcNUHeqjw8sU2hPVrFyNUTgn6A8HenDra7oLCDtja",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm. Yaratılabilir Kaput

Yeni bir değişken kapak oluştur, mantarlı varlık oluştur. Varlığın başlatılmasında hiçbir birim yok. Minters bu varlığın `avm.mint`. kullanarak birimleri naneli olabilir.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-variable-cap-asset.md" dijital varlıklar / page="../tutorials/smart-digital-assets/creating-a-variable-cap-asset.md"

#### **İmzalanma**

```cpp
avm.createVariableCapAsset({
    name: string,
    symbol: string,
    denomination: int, //optional
    minterSets: []{
        minters: []string,
        threshold: int
    },
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    assetID: string,
    changeAddr: string,
}
```

* `İsim` insan tarafından okunabilir bir isimdir. Eşsiz olması gerekmez.
* `Sembol,` varlığın bir kısaltma sembolüdür. 0 ile 4 karakter arasında. Eşsiz olması gerekmez. Belki de atılmıştır.
* `Bu` değerin dengelerinin kullanıcı arayüzleri tarafından nasıl gösterildiğini belirler. Eğer bu varlığın paydası 0, 100 ünite olarak gösterilecek. Eğer payda 1 100 birim ise bu varlığın 10.0 olarak gösterilecek. Eğer bu varlığın paydası 2, 100 ünite .100 olarak görüntülenir.
* `MinterSets,` `her` elementin in adreslerin `eşiğinin` bir minting işlemini imzalayarak daha çok varlığı birleştirebileceği bir listedir.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` işlem ücretini öder.
* `Varlık` yeni varlığın kimliği.
* `Sonuç` olarak değişim, herhangi bir değişikliğin gönderildiği adres.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createVariableCapAsset",
    "params" :{
        "name":"myVariableCapAsset",
        "symbol":"MFCA",
        "minterSets":[
            {
                "minters":[
                    "X-avax14q0p6y4yzweuugz9p080kapajwvac3ur755n7d"
                ],
                "threshold": 1
            },
            {
                "minters": [
                    "X-avax1fzyldr3mwn6lj7y46edhua6vr5ayx0ruuhezpv",
                    "X-avax1x5mrgxj0emysnnzyszamqxhq95t2kwcp9n3fy3",
                    "X-avax13zmrjvj75h3578rn3sfth8p64t2ll4gm4tv2rp"
                ],
                "threshold": 2
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"2QbZFE7J4MAny9iXHUwq8Pz8SpFhWk3maCw4SkinVPv6wPmAbK",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm. avm.createNFTAsset

Mantıksız bir varlık oluştur. Varlığın başlatılmasında hiçbir birim yok. Minters bu varlığın `avm.mintNFT`. kullanarak birimleri naneli olabilir.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" dijital varlıklar / yaratılma-nft-part-1.md%}

#### **İmzalanma**

```cpp
avm.createNFTAsset({
    name: string,
    symbol: string,
    minterSets: []{
        minters: []string,
        threshold: int
    },
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
 {
    assetID: string,
    changeAddr: string,
}
```

* `İsim` insan tarafından okunabilir bir isimdir. Eşsiz olması gerekmez.
* `Sembol,` varlığın bir kısaltma sembolüdür. 0 ile 4 karakter arasında. Eşsiz olması gerekmez. Belki de atılmıştır.
* `MinterSets,` `her` elementin in adreslerin `eşiğinin` bir minting işlemini imzalayarak daha çok varlığı birleştirebileceği bir listedir.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` işlem ücretini öder.
* `Varlık` yeni varlığın kimliği.
* `Sonuç` olarak değişim, herhangi bir değişikliğin gönderildiği adres.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createNFTAsset",
    "params" :{
        "name":"Coincert",
        "symbol":"TIXX",
        "minterSets":[
            {
                "minters":[
                    "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
                ],
                "threshold": 1
            }
        ],
        "from": ["X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2KGdt2HpFKpTH5CtGZjYt5XPWs6Pv9DLoRBhiFfntbezdRvZWP",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### avm. avm.mintNFT

[`Avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset) ile yaratılan mantarsız olmayan işaretler.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" dijital varlıklar / yaratılma-nft-part-1.md%}

#### **İmzalanma**

```cpp
avm.mintNFT({
    assetID: string,
    payload: string,
    to: string,
    encoding: string, //optional
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `assetID` yeni yaratılan NFT varlığının bir numaralı kaynağı.
* `Yük,` 1024 baytlık bir keyfi yüküdür. Şifreleme biçimi `kodlama` argümanı ile belirtilir.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` işlem ücretini ödeyen kullanıcıdır `kullanıcı adı` anahtarları tutmalı ve bu varlığın daha fazla nane şekline izin vermelidir. Yani en azından bir minter setinin _eşik_ anahtarını kontrol etmesi gerekir.
* `TxID` bu işlem kimliği.
* `Sonuç` olarak değişim, herhangi bir değişikliğin gönderildiği adres.
* `Kodlama,` yükleme argümanı için kullanılacak kodlama biçimi. "cb58" veya "hece" olabilir. "Cb58" için Defaults

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mintNFT",
    "params" :{
        "assetID":"2KGdt2HpFKpTH5CtGZjYt5XPWs6Pv9DLoRBhiFfntbezdRvZWP",
        "payload":"2EWh72jYQvEJF9NLk",
        "to":"X-avax1ap39w4a7fk0au083rrmnhc2pqk20yjt6s3gzkx",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2oGdPdfw2qcNUHeqjw8sU2hPVrFyNUTgn6A8HenDra7oLCDtja",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm. Dışarıya aktarılıyor

from X-Chain veya X-Chain bir AVAX gönder. Bu yöntemi aradıktan sonra, C-Chain üzerinden aktarımı tamamlamak için [`avax.import`](contract-chain-c-chain-api.md#avax-import) aktarmayı çağırmalısınız.

#### **İmzalanma**

```cpp
avm.export({
    to: string,
    amount: int,
    assetID: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string,
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `...` P-Chain veya C-Chain adresi varlığın gönderdiği adres.
* `Gönderilecek` varlığın miktarı.
* `Varlık` kimlik, gönderilen varlığın kimliğidir.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* Varlık `kullanıcı adı` tarafından kontrol edilen adreslerden gönderiliyor
* `TxID` bu işlem kimliği.
* `Sonuç` olarak değişim, herhangi bir değişikliğin gönderildiği adres.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "to":"C-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "assetID": "2YmsQfMaCczE4mLG1DPYUnRURNGfhjj4qrqnLRR3LmZ3GxDWPt",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2Eu16yNaepP57XrrJgjKGpiEDandpiGWW8xbUm6wcTYny3fejj",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### avm. avm.exportAVAX

from başka bir zincire AVAX gönder. Bu yöntemi aradıktan sonra, aktarımı tamamlamak için diğer zincire `ithalat` çağrısı yapmanız gerekir.

#### **İmzalanma**

```cpp
avm.exportAVAX({
    to: string,
    amount: int,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string,
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `to` gönderdiği P-Chain adresidir.
* `NAVAX` miktarı gönderilir.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* AVAX `kullanıcı adı` tarafından kontrol edilen adreslerden gönderiliyor
* `TxID` bu işlem kimliği.
* `Sonuç` olarak değişim, herhangi bir değişikliğin gönderildiği adres.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"P-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "25VzbNzt3gi2vkE3Kr6H9KJeSR2tXkr8FsBCm3vARnB5foLVmx",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### avm. avm.exportKey

Verilen adresi kontrol eden özel anahtarı al.   Geri dönen özel anahtar [`with`](exchange-chain-x-chain-api.md#avm-importkey) eklenebilir.

#### **İmzalanma**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `Kullanıcı adı` `adresi` kontrol etmeli.
* `Özel` anahtar, `adresi` kontrol eden özel anahtarın sicim temsilidir.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportKey",
    "params" :{
        "username":"myUsername",
        "password":"myPassword",
        "address":"X-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

### avm. avm.getAllBalances dengeleri

Verilen bir adres tarafından tüm varlıkların dengesini kontrol altına alın.

#### **İmzalanma**

```cpp
avm.getAllBalances({address:string}) -> {
    balances: []{
        asset: string,
        balance: int
    }
}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getAllBalances",
    "params" :{
        "address":"X-avax1c79e0dd0susp7dc8udq34jgk2yvve7hapvdyht"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balances": [
            {
                "asset": "AVAX",
                "balance": "102"
            },
            {
                "asset": "2sdnziCz37Jov3QSNMXcFRGFJ1tgauaj6L7qfk7yUcRPfQMC79",
                "balance": "10000"
            }
        ]
    },
    "id": 1
}
```

### avm.getAssetDescription Varlık Tanımlaması

Bir varlık hakkında bilgi edin.

#### **İmzalanma**

```cpp
avm.getAssetDescription({assetID: string}) -> {
    assetId: string,
    name: string,
    symbol: string,
    denomination: int
}
```

* `Varlık` bilginin istendiği varlığın kimliği.
* `Ad,` eşsiz bir isim değil, insan okunabilir bir isimdir.
* `Sembol,` varlığın sembolüdür.
* `Bu` değerin dengelerinin kullanıcı arayüzleri tarafından nasıl gösterildiğini belirler. Eğer bu varlığın paydası 0, 100 ünite olarak gösterilecek. Eğer payda 1 100 birim ise bu varlığın 10.0 olarak gösterilecek. Eğer bu varlığın paydası 2, 100 ünite .100 olarak görüntülenir.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getAssetDescription",
    "params" :{
        "assetID" :"2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe",
        "name": "Avalanche",
        "symbol": "AVAX",
        "denomination": "9"
    },
    "id": 1
}`
```

### avm.getBalance in New York USA

Verilen bir adres tarafından kontrol edilen bir varlığın dengesini sağla.

#### **İmzalanma**

```cpp
avm.getBalance({
    address: string,
    assetID: string
}) -> {balance: int}
```

* `Varlığın` sahibi
* Dengenin istendiği varlığın `varlığının özet` kimliği

#### **Örnek Example**

```cpp
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getBalance",
  "params" :{
      "address":"X-avax1ns3jzhqyk7parg29qan56k0fcxwstc76cjqq2s",
      "assetID": "2pYGetDWyKdHxpFxh2LHeoLNCH6H5vxxCxHQtFnnFaYxLsqtHC"
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":"299999999999900",
        "utxoIDs":[
            {
                "txID":"WPQdyLNqHfiEKp4zcCpayRHYDVYuh1hqs9c1RqgZXS4VPgdvo",
                "outputIndex":1
            }
        ]
    }
}
```

### avm. avm.getTx

Belirtilmiş işlemleri geri verir. `Şifreleme` parametresi, geri dönüşü işleminin biçimini belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults

#### **İmzalanma**

```cpp
avm.getTx({
    txID: string,
    encoding: string, //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTx",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "tx":"1111111vQFqEEHkkAGwJnpdAJgga28zHk9pFARHp1VWe3QM5wC7ztGA5cZAPanFWXHkhbWEbFs9qsEpNZ7QHrzucUUZqLEPrAwJZLrZBik4dEhbsTCF3nS6s2fXVzc5ar2esLFD92WVMZmJNuTUQuKjVkjag2Gy3HHYSqm6bojrG62KrazywKPhrYx8QF9AqNfYYwD3XcSUV1g46r7sQ1WqzM8nyG4qL517JS1YVuTC3aWPeN5cxP6FdvbYexwHcgaBtiQsYbCEeZ9cuJqhE2Pxx8BJFpicLN8FBexb6fzQyBLiFR7yx6v6YBjq7dtu9MBczFdNCnDE4MsG2SyPZsdUv1XxQYVVwDqgqi8Zto5esJKph72YZbrXX3SHVSZBFZXkKbTzyEQFWHCF1jC",
        "encoding": "cb58"
    }
}
```

### avm.getTxStatus

Ağa gönderilen bir işlem durumunu bildir.

#### **İmzalanma**

```cpp
avm.getTxStatus({txID: string}) -> {status: string}
```

`Durum` şu:

* `Kabul edildi`: işlem her düğümle kabul edilir\ (veya olacak)
* `İşlem`: işlem bu düğümle oylanıyor
* `Reddedildi`: Bu işlem ağdaki herhangi bir düğümle kabul edilmeyecek
* `Bilinmiyor`: Bu düğümle işlem görülmedi.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

### avm.getUTXOs

Verilen adresi gönderen UTXOs ulaşıyor. Kaynak Zinciri belirtilmişse, o zaman X zincirine aktarılan atomik UTXOs geri alır.

#### **İmzalanma**

```cpp
avm.getUTXOs({
    addresses: []string,
    limit: int, //optional
    startIndex: { //optional
        address: string,
        utxo: string
    },
    sourceChain: string, //optional
    encoding: string //optional
}) -> {
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    },
    sourceChain: string, //optional
    encoding: string
}
```

* `UTXos,` UTXO referansları en az bir adres `olarak` adlandırılan UTXOs listesidir.
* En `çok sınırda` UTXOs geri döner. `Eğer sınır` 1024'ten daha büyük veya ihmal edilirse, 1024'e ayarlanır.
* Bu yöntem pagination. destekler. `endIndex` son UTXO geri döndüğü anlamına gelir. Bir sonraki UTXOs setini almak için, bir sonraki çağrıda `endIndex` olarak `endIndex` değerini kullanın.
* Eğer `startIndex` atılırsa, tüm UTXOs `sınıra` kadar getirecektir.
* pagination \ (`startIndex` verildiğinde), UTXOs birden fazla arama arasında eşsiz olması garantisi yoktur. Bu da ilk çağrının sonucu olarak UTXO görünebilir, sonra ikinci çağrıda da görünebilir.
* pagination, kullanırken tutarlılık birden fazla arama arasında garanti edilmez. Bu da UTXO adresleri aramalar arasında değişmiş olabilir.
* `Şifreleme` UTXOs. için biçimi belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults

#### **Örnek olarak**

Tüm UTXOs bu referans `X-avax1yzt57wd8me6xmy32lz8m5lg6yruy79m6whsf` ve `X-avax1x459sj0ssujguq723cljfty4jlae28evjt7xzz`.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf", "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5,
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Bu cevap verir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "5",
        "utxos": [
            "11PQ1sNw9tcXjVki7261souJnr1TPFrdVCu5JGZC7Shedq3a7xvnTXkBQ162qMYxoerMdwzCM2iM1wEQPwTxZbtkPASf2tWvddnsxPEYndVSxLv8PDFMwBGp6UoL35gd9MQW3UitpfmFsLnAUCSAZHWCgqft2iHKnKRQRz",
            "11RCDVNLzFT8KmriEJN7W1in6vB2cPteTZHnwaQF6kt8B2UANfUkcroi8b8ZSEXJE74LzX1mmBvtU34K6VZPNAVxzF6KfEA8RbYT7xhraioTsHqxVr2DJhZHpR3wGWdjUnRrqSSeeKGE76HTiQQ8WXoABesvs8GkhVpXMK",
            "11GxS4Kj2od4bocNWMQiQhcBEHsC3ZgBP6edTgYbGY7iiXgRVjPKQGkhX5zj4NC62ZdYR3sZAgp6nUc75RJKwcvBKm4MGjHvje7GvegYFCt4RmwRbFDDvbeMYusEnfVwvpYwQycXQdPFMe12z4SP4jXjnueernYbRtC4qL",
            "11S1AL9rxocRf2NVzQkZ6bfaWxgCYch7Bp2mgzBT6f5ru3XEMiVZM6F8DufeaVvJZnvnHWtZqocoSRZPHT5GM6qqCmdbXuuqb44oqdSMRvLphzhircmMnUbNz4TjBxcChtks3ZiVFhdkCb7kBNLbBEmtuHcDxM7MkgPjHw",
            "11Cn3i2T9SMArCmamYUBt5xhNEsrdRCYKQsANw3EqBkeThbQgAKxVJomfc2DE4ViYcPtz4tcEfja38nY7kQV7gGb3Fq5gxvbLdb4yZatwCZE7u4mrEXT3bNZy46ByU8A3JnT91uJmfrhHPV1M3NUHYbt6Q3mJ3bFM1KQjE"
        ],
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

`Uyuşmuş` `limitle` aynı olduğu için daha fazla UTXOs alınmadığını söyleyebiliriz. Bu sefer `başlangıç` endeksiyle yöntemi tekrar ararız:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :2,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5,
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Bu cevap verir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "4",
        "utxos": [
            "115ZLnNqzCsyugMY5kbLnsyP2y4se4GJBbKHjyQnbPfRBitqLaxMizsaXbDMU61fHV2MDd7fGsDnkMzsTewULi94mcjk1bfvP7aHYUG2i3XELpV9guqsCtv7m3m3Kg4Ya1m6tAWqT7PhvAaW4D3fk8W1KnXu5JTWvYBqD2",
            "11QASUuhw9M1r52maTFUZ4fnuQby9inX77VYxePQoNavEyCPuHN5cCWPQnwf8fMrydFXVMPAcS4UJAcLjSFskNEmtVPDMY4UyHwh2MChBju6Y7V8yYf3JBmYt767NPsdS3EqgufYJMowpud8fNyH1to4pAdd6A9CYbD8KG",
            "11MHPUWT8CsdrtMWstYpFR3kobsvRrLB4W8tP9kDjhjgLkCJf9aaJQM832oPcvKBsRhCCxfKdWr2UWPztRCU9HEv4qXVwRhg9fknAXzY3a9rXXPk9HmArxMHLzGzRECkXpXb2dAeqaCsZ637MPMrJeWiovgeAG8c5dAw2q",
            "11K9kKhFg75JJQUFJEGiTmbdFm7r1Uw5zsyDLDY1uVc8zo42WNbgcpscNQhyNqNPKrgtavqtRppQNXSEHnBQxEEh5KbAEcb8SxVZjSCqhNxME8UTrconBkTETSA23SjUSk8AkbTRrLz5BAqB6jo9195xNmM3WLWt7mLJ24"
        ],
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "21jG2RfqyHUUgkTLe2tUp6ETGLriSDTW3th8JXFbPRNiSZ11jK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

`Uyuşmuş` `bir` sınırdan az olduğundan UTXOs getirmeyi bitirdiğimizi ve bu yöntemi tekrar aramamıza gerek olmadığını biliyoruz.

Bir ImportTx yapmak için P Zincirinden X to aktarılan UTXOs almak istediğimizi varsayalım. O zaman kaynak Chain argümanıyla GetUTXOs aramalıyız. Atom GetUTXOs geri almak için:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf", "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5,
        "sourceChain": "P",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Bu cevap verir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "1",
        "utxos": [
            "115P1k9aSVFBfi9siZZz135jkrBCdEMZMbZ82JaLLuML37cgVMuxgu73ukQbPjXtDgyBCE1cgrJjqDPgboUswV5BGAYhnuxunkHS3xncB599V3mxyvWnwVwNPmq3mKQwF5EWhfTaXkhqE5VFr92yQBk9Nh5ekZBDSFGCSC"
        ],
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "2Sz2XwRYqUHwPeiKoRnZ6ht88YqzAF1SQjMYZQQaB5wBFkAqST"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### avm. İçeriye aktar.

of from C-Chain aktarılmasını tamamla. Bu yöntem çağrılmadan önce, P-Chain’s [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax) veya C-Chain’s [`avax.export`](contract-chain-c-chain-api.md#avax-export) metodunu çağırmalısınız.

#### **İmzalanma**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to` gönderdiği adres. Bu durum P-Chain’s `ihracatına````` karşılık gelen çağrıda veya C-Chain's ihracatında tartışmayla aynı olmalıdır.
* `Kaynak zinciri` of ithal edildiği zincirin kimliği, kimliktir. from fon aktarmak için `"C"` kullanın.
* `Kullanıcı adı` kontrol eden `kullanıcı`.
* `TxID` yeni yaratılmış atom işleminin kimliğidir.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.import",
    "params" :{
        "to":"X-avax1s7aygrkrtxflmrlyadlhqu70a6f4a4n8l2tru8",
        "sourceChain":"C",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2gXpf4jFoMAWQ3rxBfavgFfSdLkL2eFUYprKsUQuEdB5H6Jo1H"
    },
    "id": 1
}
```

### avm. avm.importAVAX

of from to transfer edilmesini tamamla. Bu yöntem çağrılmadan önce, P-Chain’s [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax) metodunu kullanmalısınız.

#### **İmzalanma**

```cpp
avm.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to` gönderdiği adres. Bu P-Chain’s `ihracatına` `karşılık` gelen çağrıda tartışmayla aynı olmalıdır.
* `Kaynak zinciri` of ithal edildiği zincirin kimliği, kimliktir. from fonları aktarmak için `"P"` kullanın.
* `Kullanıcı adı` kontrol eden `kullanıcı`.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importAVAX",
    "params" :{
        "to":"X-avax1s7aygrkrtxflmrlyadlhqu70a6f4a4n8l2tru8",
        "sourceChain":"P",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h"
    },
    "id": 1
}
```

### avm. avm.importKey

Adresi kontrol eden özel anahtarı sağlayarak bir kullanıcı adresi kontrol ettir.

#### **İmzalanma**

```cpp
avm.importKey({
    username: string,
    password: string,
    privateKey: string
}) -> {address: string}
```

* `Özel` `anahtarları kullanıcı adı` ile özel anahtar setine özel anahtarları ekleyin. `Adres` artık özel anahtar ile kontrol eden adres `kullanıcı` adıdır.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importKey",
    "params" :{
        "username":"myUsername",
        "password":"myPassword",
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "address":"X-avax1mwlnrzv0ezdycx4qhqj77j55cwgcvtf29zvmpy"
    }
}
```

### avm. avm.issueTx

İmzalı bir işlem gönderin. `Şifreleme` imzalanmış işlem biçimini belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults

#### **İmzalanma**

```cpp
avm.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.issueTx",
    "params" :{
        "tx":"6sTENqXfk3gahxkJbEPsmX9eJTEFZRSRw83cRJqoHWBiaeAhVbz9QV4i6SLd6Dek4eLsojeR8FbT3arFtsGz9ycpHFaWHLX69edJPEmj2tPApsEqsFd7wDVp7fFxkG6HmySR",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### avm.listAddresses Adresleri

Verilen kullanıcı tarafından kontrol edilen adresler listelenir.

#### **İmzalanma**

```cpp
avm.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.listAddresses",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": ["X-avax1rt4vac58crp0p59yf640c4gycm6creg2rt8hc6"]
    },
    "id": 1
}
```

### Avm. Gönder.

Bir adrese bir miktar varlık gönderin.

#### **İmzalanma**

```cpp
avm.send({
    amount: int,
    assetID: string,
    to: string,
    memo: string, //optional
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* Adres için kimlik `özetiyle` `birlikte bir miktar` varlık `gönderir`. `Miktar` varlığın en küçük artışında belirgindir. AVAX için bu 1 nAVAX (1 of milyarda biri. \)
* `...` X-Chain adresi varlığın gönderildiği adres.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* Uzunluğu 256 baytlık olan bir `not` ekleyebilirsiniz.
* Varlık kullanıcı `adı` tarafından kontrol edilen adreslerden gönderilir. \ (elbette, bu kullanıcının gönderilen varlığın dengesini en azından tutması gerekecek. \)

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "assetID"   : "AVAX",
        "amount"    : 10000,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "memo"      : "hi, mom!",
        "username"  : "userThatControlsAtLeast10000OfThisAsset",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.sendMultiple

Bir adres listesinden `belirlenmiş` bir adrese çoklu `miktarda varlık` aktarımı gönderir.

#### **İmzalanma**

```cpp
avm.sendMultiple({
    outputs: []{
      assetID: string,
      amount: int,
      to: string
    },
    from: []string, //optional
    changeAddr: string, //optional
    memo: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* `Çıkışlar` her biri bir `assetID`, `miktarı` ve `yönünü` içeren bir nesne literatürüdür.
* `Not,` 256 baytlık uzunluğu olan opsiyonel bir mesajdır.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* Varlık kullanıcı `adı` tarafından kontrol edilen adreslerden gönderilir. \ (elbette, bu kullanıcının gönderilen varlığın dengesini en azından tutması gerekecek. \)

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendMultiple",
    "params" :{
        "outputs": [
            {
                "assetID" : "AVAX",
                "to"      : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
                "amount"  : 1000000000
            },
            {
                "assetID" : "26aqSTpZuWDAVtRmo44fjCx4zW6PDEx3zy9Qtp2ts1MuMFn9FB",
                "to"      : "X-avax18knvhxx8uhc0mwlgrfyzjcm2wrd6e60w37xrjq",
                "amount"  : 10
            }
        ],
        "memo"      : "hi, mom!",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "username",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.

Mantıksız bir işaret gönder.

#### **İmzalanma**

```cpp
avm.sendNFT({
    assetID: string,
    groupID: number,
    to: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) -> {txID: string}
```

* `NFT` gönderilen varlıkların kimliği var.
* `Grup kimliği` NFT gönderme için NFT grubudur. NFT oluşturma her NFT ID altında birden fazla gruba izin verir. Her gruba birden fazla NFTs yayınlayabilirsiniz.
* `to` gönderdiği X-Chain adresidir.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, adreslerinizden herhangi birini ihtiyaç duyulduğu gibi kullanır. `Değişiklik Addr` herhangi bir değişiklik gönderilecek adresdir. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* Varlık kullanıcı `adı` tarafından kontrol edilen adreslerden gönderilir. \ (elbette, bu kullanıcının en azından NFT gönderilen dengesini tutması gerekecek. \)

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendNFT",
    "params" :{
        "assetID"   : "2KGdt2HpFKpTH5CtGZjYt5XPWs6Pv9DLoRBhiFfntbezdRvZWP",
        "groupID"   : 0,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "myUsername",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "DoR2UtG1Trd3Q8gWXVevNxD666Q3DPqSFmBSMPQ9dWTV8Qtuy",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### Cüzdan.

Ağa imzalı bir işlem gönder ve tx kabul edileceğini varsay. `Şifrelenmek,` imzalanmış işlem biçimini belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults

Bu arama API sonlarına yapılmış:

`/ext/bc/X/cüzdan`

#### İmzalanma

```cpp
wallet.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### Örnek çağrı

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"wallet.issueTx",
    "params" :{
        "tx":"6sTENqXfk3gahxkJbEPsmX9eJTEFZRSRw83cRJqoHWBiaeAhVbz9QV4i6SLd6Dek4eLsojeR8FbT3arFtsGz9ycpHFaWHLX69edJPEmj2tPApsEqsFd7wDVp7fFxkG6HmySR",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X/wallet
```

#### Örnek tepki

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### Cüzdan.

Bir adrese bir varlık gönderin ve tx kabul edileceğini varsayın, böylece gelecekteki aramalar değiştirilmiş UTXO setini kullanabilsin.

Bu arama API sonlarına yapılmış:

`/ext/bc/X/cüzdan`

#### **İmzalanma**

```cpp
wallet.send({
    amount: int,
    assetID: string,
    to: string,
    memo: string, //optional
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* Adres için kimlik `özetiyle` `birlikte bir miktar` varlık `gönderir`. `Miktar` varlığın en küçük artışında belirgindir. AVAX için bu 1 nAVAX (1 of milyarda biri. \)
* `...` X-Chain adresi varlığın gönderildiği adres.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* Uzunluğu 256 baytlık olan bir `not` ekleyebilirsiniz.
* Varlık kullanıcı `adı` tarafından kontrol edilen adreslerden gönderilir. \ (elbette, bu kullanıcının gönderilen varlığın dengesini en azından tutması gerekecek. \)

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"wallet.send",
    "params" :{
        "assetID"   : "AVAX",
        "amount"    : 10000,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "memo"      : "hi, mom!",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "userThatControlsAtLeast10000OfThisAsset",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X/wallet
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### Cüzdan. wallet.sendMultiple

Birden fazla `sayıda varlık` transferi gönder, ait adreslerin ait olduğu bir listeden belirlenmiş `bir` adrese gönderin ve gelecekteki aramalar değiştirilmiş UTXO setini kullanabilsin diye tx kabul edileceğini varsayın.

Bu arama API sonlarına yapılmış:

`/ext/bc/X/cüzdan`

#### **İmzalanma**

```cpp
wallet.sendMultiple({
    outputs: []{
      assetID: string,
      amount: int,
      to: string
    },
    from: []string, //optional
    changeAddr: string, //optional
    memo: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* `Çıkışlar` her biri bir `assetID`, `miktarı` ve `yönünü` içeren bir nesne literatürüdür.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* Uzunluğu 256 baytlık olan bir `not` ekleyebilirsiniz.
* Varlık kullanıcı `adı` tarafından kontrol edilen adreslerden gönderilir. \ (elbette, bu kullanıcının gönderilen varlığın dengesini en azından tutması gerekecek. \)

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"wallet.sendMultiple",
    "params" :{
        "outputs": [
            {
                "assetID" : "AVAX",
                "to"      : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
                "amount"  : 1000000000
            },
            {
                "assetID" : "26aqSTpZuWDAVtRmo44fjCx4zW6PDEx3zy9Qtp2ts1MuMFn9FB",
                "to"      : "X-avax18knvhxx8uhc0mwlgrfyzjcm2wrd6e60w37xrjq",
                "amount"  : 10
            }
        ],
        "memo"      : "hi, mom!",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "username",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X/wallet
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### Olaylar

Belirlenmiş bir adresteki işlemleri dinle.

Bu arama API sonlarına doğru yapılır:

`/// / X/etkinlikleri`

#### **Golang Örnek**

```go
package main

import (
    "encoding/json"
    "log"
    "net"
    "net/http"
    "sync"

    "github.com/ava-labs/avalanchego/api"
    "github.com/ava-labs/avalanchego/pubsub"
    "github.com/gorilla/websocket"
)

func main() {
    dialer := websocket.Dialer{
        NetDial: func(netw, addr string) (net.Conn, error) {
            return net.Dial(netw, addr)
        },
    }

    httpHeader := http.Header{}
    conn, _, err := dialer.Dial("ws://localhost:9650/ext/bc/X/events", httpHeader)
    if err != nil {
        panic(err)
    }

    waitGroup := &sync.WaitGroup{}
    waitGroup.Add(1)

    readMsg := func() {
        defer waitGroup.Done()

        for {
            mt, msg, err := conn.ReadMessage()
            if err != nil {
                log.Println(err)
                return
            }
            switch mt {
            case websocket.TextMessage:
                log.Println(string(msg))
            default:
                log.Println(mt, string(msg))
            }
        }
    }

    go readMsg()

    cmd := &pubsub.Command{NewSet: &pubsub.NewSet{}}
    cmdmsg, err := json.Marshal(cmd)
    if err != nil {
        panic(err)
    }
    err = conn.WriteMessage(websocket.TextMessage, cmdmsg)
    if err != nil {
        panic(err)
    }

    var addresses []string
    addresses = append(addresses, " X-fuji....")
    cmd = &pubsub.Command{AddAddresses: &pubsub.AddAddresses{JSONAddresses: api.JSONAddresses{Addresses: addresses}}}
    cmdmsg, err = json.Marshal(cmd)
    if err != nil {
        panic(err)
    }

    err = conn.WriteMessage(websocket.TextMessage, cmdmsg)
    if err != nil {
        panic(err)
    }

    waitGroup.Wait()
}
```

**Operasyonlar**

| Emredersiniz | Tarif edilmesi | Örnek olarak | Tartışmalar |
| :--- | :--- | :--- | :--- |
| **NewSet** | Yeni bir adres haritası oluştur | "newSet:{}} |  |
| **NewBloom** | Yeni bir çiçek seti oluştur. | "newBloom":{"maxElements":"1000", "CollisionProb":"0.0100"}} | Maksimum Elementler - filtredeki element sayısı >0 çarpışma Prob olmalıdır. - çarpışma olasılığı >0 ve <= 1 olmalıdır. |
| **Adresler** | Sete bir adres ekle | {"addAddresses":{"addresses":\["X-fuji..." \]}} | Adresler - eşleştirilecek adreslerin listesi |

**NewSet** veya **NewBloom** filtreyi yeniden arar ve **AddAddresses**. ile takip edilmelidir. **Adresler** birden fazla kez adlandırılabilir.

**Detayları ayarla**

* **NewSet** mutlak adres eşleşmelerini gerçekleştirir, eğer adres if işlem gönderilecektir.
* **NewBloom** [Bloom filtrelemesi](https://en.wikipedia.org/wiki/Bloom_filter) yanlış pozitifler üretebilir ancak daha fazla sayıda adresin filtrelenmesine izin verebilir. Eğer adresler filtrede ise, işlem gönderilecek.

#### **Örnek Tepki**

```cpp
2021/05/11 15:59:35 {"txID":"22HWKHrREyXyAiDnVmGp3TQQ79tHSSVxA9h26VfDEzoxvwveyk"}
```


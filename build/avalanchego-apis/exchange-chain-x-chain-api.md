---
description: X-Chain Avalanche Sanal Makinesi'nin \(AVM\) bir örneğidir.
---

# Zincir \(X-Chain\) API

Avalanche’s ana platformu olan [X-Chain](../../learn/platform-overview/#exchange-chain-x-chain), Avalanche Sanal Makinesi'nin \(AVM\) bir örneğidir. Bu API, müşterilerin X-Chain ve AVM'nin diğer örnekleri üzerinde varlıklarını oluşturma ve ticaret yapmalarına izin verir.

{% embed url="https://www.youtube.com/watch?v=rD-IOd1nvFo" caption="" %}

## Format

Bu API, `json 2.0`RPC formatını kullanır. JSON RPC arama yapmak için daha fazla bilgi için, [buraya](issuing-api-calls.md) bakın.

## Son nokta

`/ext/bc/X`with etkileşime girmek.

`/ext/bc/blockchainID``blockchainID`AVM'yi çalıştıran blok zincirinin kimliği nerede?

## Yöntemler

### Avm, İnşaat.

Bu sanal makine genez durumunun JSON temsili olarak bu devletin byte temsilini oluşturmaktadır.

#### **Sonucu noktası**

Bu arama AVM'nin statik API uç noktasına yapıldı:

`/ext/vm/avm`

Not: Adresler bir zincir önekleme içermemelidir \(ie\). X-\) statik API sonlarına çağrılarda, çünkü bu önekler belirli bir zincire işaret eder.

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

`genesisData`Şöyle bir formu var:

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

Yeni bir sabit kapak oluştur, mantarlı bir varlık oluştur. Bu sayının bir kısmı başlatılma ile oluşturulur ve daha sonra hiç yaratılmamıştır. Varlık ile `avm.send`gönderilebilir.

{% page-ref page="../tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

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

* `name`Bu bir insan ismi olarak okunabilir bir isimdir. Eşsiz olması gerekmez.
* `symbol`Bu bir eşya sembolü. 0 ile 4 karakter arasında. Eşsiz olması gerekmez. Belki de atılmıştır.
* `denomination`Bu varlığın dengelerinin kullanıcı arayüzleri tarafından nasıl gösterildiğini belirler. `denomination`Eğer 0 ise, 100 ünite 100 birim olarak görüntülenir. Eğer 1 `denomination`ise 100 birim bu varlığın 10.0 olarak görüntülenir. `denomination`Eğer bu varlığın 2 birimi ise 1.00 birim olarak görüntülenir.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `username`Ve kullanıcıya işlem ücretini ödenen bir şeyi ifade `password`et.
* `initialHolders`Her element, varlığın at `amount`birimleri `address`barındırır.
* `assetID`Yeni varlığın kimliği.

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

Değişken kapaklı bir varlığın mint birimleri ile [`avm.createVariableCapAsset`](exchange-chain-x-chain-api.md#avm-createvariablecapasset)oluşturuldu.

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

* `amount``assetID`Birimler adrese göre oluşturulup kontrol edilecek.`to`
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `username`Bu işlem ücretini ödeyen kullanıcı anahtarları `username`tutmalıdır. Bu varlığı daha fazla nane için izin verir. Yani en azından bir minter setinin _eşik _anahtarını kontrol etmesi gerekir.
* `txID`Bu işlem kimliği.
* `changeAddr`Sonuç olarak, herhangi bir değişikliğin gönderildiği adres.

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

Yeni bir değişken kapak oluştur, mantarlı varlık oluştur. Varlığın başlatılmasında hiçbir birim yok. Minters bu varlığın birimleri kullanılarak naneli `avm.mint`olabilir.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-variable-cap-asset.md" %}

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

* `name`Bu bir insan ismi olarak okunabilir bir isimdir. Eşsiz olması gerekmez.
* `symbol`Bu bir eşya sembolü. 0 ile 4 karakter arasında. Eşsiz olması gerekmez. Belki de atılmıştır.
* `denomination`Bu varlığın dengelerinin kullanıcı arayüzleri tarafından nasıl gösterildiğini belirler. Eğer bu varlığın paydası 0, 100 ünite olarak gösterilecek. Eğer payda 1 100 birim ise bu varlığın 10.0 olarak gösterilecek. Eğer bu varlığın paydası 2, 100 ünite .100 olarak görüntülenir.
* `minterSets`Bu liste her elementin bir nane `threshold`işlemini imzalayarak varlığın daha çok nane şekline sahip `minters`olabileceği belirtilir.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `username`Nakil ücretini ödüyor.
* `assetID`Yeni varlığın kimliği.
* `changeAddr`Sonuç olarak, herhangi bir değişikliğin gönderildiği adres.

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

Mantıksız bir varlık oluştur. Varlığın başlatılmasında hiçbir birim yok. Minters bu varlığın birimleri kullanılarak naneli `avm.mintNFT`olabilir.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

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

* `name`Bu bir insan ismi olarak okunabilir bir isimdir. Eşsiz olması gerekmez.
* `symbol`Bu bir eşya sembolü. 0 ile 4 karakter arasında. Eşsiz olması gerekmez. Belki de atılmıştır.
* `minterSets`Bu liste her elementin bir nane `threshold`işlemini imzalayarak varlığın daha çok nane şekline sahip `minters`olabileceği belirtilir.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `username`Nakil ücretini ödüyor.
* `assetID`Yeni varlığın kimliği.
* `changeAddr`Sonuç olarak, herhangi bir değişikliğin gönderildiği adres.

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

Bu tür göstergeler ile [`avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset)yaratılmıştır.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

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

* `assetID`Yeni yaratılmış NFT varlığının varlığı var.
* `payload`1024 baytlık bir keyfi yükü. Bu kodlama biçimi tartışmayla `encoding`belirtilir.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `username`Bu işlem ücretini ödeyen kullanıcı anahtarları `username`tutmalıdır. Bu varlığı daha fazla nane için izin verir. Yani en azından bir minter setinin _eşik _anahtarını kontrol etmesi gerekir.
* `txID`Bu işlem kimliği.
* `changeAddr`Sonuç olarak, herhangi bir değişikliğin gönderildiği adres.
* `encoding`Yükleme argümanı için kullanılacak kodlama biçimi. "cb58" veya "hece" olabilir. "Cb58" için Defaults

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

from X-Chain veya X-Chain bir AVAX gönder. [`avax.import`](contract-chain-c-chain-api.md#avax-import)Bu yöntemi aradıktan sonra C-Chain transfer için çağırmalısınız.

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

* `to`Bu P-Chain veya C-Chain adresi varlığın gönderdiği adres.
* `amount`Gönderilecek varlığın miktarı.
* `assetID`Gönderilen varlığın kimliği.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* Varlık kontrol edilen adreslerden gönderiliyor`username`
* `txID`Bu işlem kimliği.
* `changeAddr`Sonuç olarak, herhangi bir değişikliğin gönderildiği adres.

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

from başka bir zincire AVAX gönder. Bu `import`yöntemi aradıktan sonra transferi tamamlamak için diğer zinciri çağırmalısınız.

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

* `to`P-Chain gönderdiği P-Chain adresi.
* `amount`Gönderilecek nAVAX miktarı.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* AVAX kontrol edilen adreslerden gönderiliyor`username`
* `txID`Bu işlem kimliği.
* `changeAddr`Sonuç olarak, herhangi bir değişikliğin gönderildiği adres.

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

Verilen adresi kontrol eden özel anahtarı al.   Geri dönen özel anahtar bir kullanıcıya [`avm.importKey`](exchange-chain-x-chain-api.md#avm-importkey)eklenebilir.

#### **İmzalanma**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username`Kontrol etmek zorundadır.`address`
* `privateKey`Bu özel anahtarın sicim gösterimi.`address`

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

* `assetID`Bu bilgi için istenilen varlığın kimliği.
* `name`Bu nedenle bu ad, bir kişinin insan tarafından okunabilir bir isimdir.
* `symbol`Bu bir varlığın sembolüdür.
* `denomination`Bu varlığın dengelerinin kullanıcı arayüzleri tarafından nasıl gösterildiğini belirler. Eğer bu varlığın paydası 0, 100 ünite olarak gösterilecek. Eğer payda 1 100 birim ise bu varlığın 10.0 olarak gösterilecek. Eğer bu varlığın paydası 2, 100 ünite .100 olarak görüntülenir.

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

* `address`Varlığın sahibi.
* `assetID`Dengenin istendiği varlığın kimliği

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

### avm.getAddressTxs<a id="avm-get-address-txs-api"></a>

Verilen adresin dengesini değiştiren tüm işlemleri geri getirir. Bir işlem, bir adres dengesini değiştirmesi için söylenir:

* Bu işlemlerin tüketiminin kısmen adrese ait olduğu UTXO bir UTXO idi.
* Bu işlemlerin ürettiği UTXO en azından kısmen adrese aittir.

Not: İndeksleme `index-transactions`\(\) X-chain yapılandırmasında etkinleştirilmelidir.

#### **İmzalanma**

```cpp
avm.getAddressTxs({
    address: string,
    cursor: uint64,     // optional, leave empty to get the first page
    assetID: string,
    pageSize: uint64    // optional, defaults to 1024
}) -> {
    txIDs: []string,
    cursor: uint64,
}
```

**Parametreler talep et**

* `address`- İlgili işlemleri getirdiğimiz adres.
* `assetID`- Sadece bu varlığın dengesini değiştiren işlemler var. Bir varlık için kimlik ya da takma isim olmalı.
* `pageSize`: Sayfa başına dönecek öge sayısı. Seçenekli. 1024'e erteleniyor.

**Yanıt parametreleri**

* `txIDs`Bu adrese etki eden işlemlerin listesi.
* `cursor`- Sayfa numarası ya da offset. Sonraki sayfayı almak için bunu istek olarak kullan.

#### **Örnek Example**

```cpp
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getAddressTxs",
  "params" :{
      "address":"X-local1kpprmfpzzm5lxyene32f6lr7j0aj7gxsu6hp9y",
      "assetID":"AVAX",
      "pageSize":20
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txIDs": [
            "SsJF7KKwxiUJkczygwmgLqo3XVRotmpKP8rMp74cpLuNLfwf6"
        ],
        "cursor": "1"
    },
    "id": 1
}
```

### avm. avm.getTx

Belirtilmiş işlemleri geri verir. `encoding`Parametre geri dönüşü formatını belirler. `"cb58"`Olabilir, ya `"hex"`da olabilir.`"json"` "Cb58" için Defaults

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

`status`"...bir tanesi:

* `Accepted`: İşlem her düğümle kabul edilir.
* `Processing`- Bu düğümle işlem oylanıyor
* `Rejected`: Bu işlem ağdaki herhangi bir düğümle kabul edilmeyecek
* `Unknown`: Bu düğümle işlem görülmedi.

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

* `utxos`UTXOs listesi, UTXO referansları en az bir adres içeriyor.`addresses`
* Çoğu `limit`UTXOs geri döner. `limit`Eğer 1024 den fazla veya daha büyük ise 1024 yılına ayarlanmıştır.
* Bu yöntem pagination. destekler. Son the geri döndüğü anlamına `endIndex`gelir. `startIndex`Bir sonraki UTXOs, için bir sonraki çağrıda olduğu `endIndex`gibi değerini kullanın.
* Eğer `startIndex`reddedilirse, tüm UTXOs getirecektir.`limit`
* Pagan kullanılarak \(ne zaman `startIndex`sağlansa\) UTXOs birden fazla arama arasında eşsiz olmak garantisi yoktur. Bu da ilk çağrının sonucu olarak UTXO görünebilir, sonra ikinci çağrıda da görünebilir.
* pagination, kullanırken tutarlılık birden fazla arama arasında garanti edilmez. Bu da UTXO adresleri aramalar arasında değişmiş olabilir.
* `encoding`Geri dönen UTXOs. için biçimi belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults

#### **Örnek olarak**

Tüm UTXOs en azından bir tane `X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`ve bir referans olmasını istediğimizi varsayalım.`X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz`

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

`numFetched`Aynı olduğu için, daha fazla UTXOs alınmadığını `limit`söyleyebiliriz. Bu sefer yöntemi tekrar `startIndex`çağıracağız:

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

`numFetched``limit`Bu yüzden UTXOs getirmeyi bitirdiğimizi ve bu yöntemi tekrar aramamıza gerek olmadığını biliyoruz.

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

of from C-Chain aktarılmasını tamamla. Bu yöntem çağrılmadan önce, P-Chain’s [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax)veya P-Chain’s transferi başlatmak için [`avax.export`](contract-chain-c-chain-api.md#avax-export)yöntemini aramanız gerekir.

#### **İmzalanma**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to`AVAX gönderdiği adres. Bu durum P-Chain’s `exportAVAX`veya P-Chain’s karşılık gelen `to`argüman ile aynı olmalıdır.`export`
* `sourceChain`of ithal edildiği zincirin kimliği veya takma isimleri. from fonları aktarmak için, `"C"`kullanın.
* `username`Bu kullanıcı kontrol eder.`to`
* `txID`Yeni yaratılmış atom işleminin kimliği.

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

of from to transfer edilmesini tamamla. Bu yöntem çağrılmadan önce, P-Chain’s transferi başlatmak için [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax)yöntemini aramanız gerekir.

#### **İmzalanma**

```cpp
avm.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to`AVAX gönderdiği adres. `to`Bu durum P-Chain’s karşılık gelen çağrıda olduğu gibi olmalıdır.`exportAVAX`
* `sourceChain`of ithal edildiği zincirin kimliği veya takma isimleri. from fonları aktarmak için, `"P"`kullanın.
* `username`Bu kullanıcı kontrol eder.`to`

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

* `privateKey``address`‘Özel `username`anahtarlar kümesine ekleyin. Adres `username`artık özel anahtarla kontrol ediyor.

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

İmzalı bir işlem gönderin. İmzalı işlemlerin biçimini `encoding`belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults

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

* `assetID``to`Adres için kimlik ile bilgi `amount`birimleri gönderiyor. Varlığın en küçük artışında `amount`belirgindir. AVAX için bu 1 nAVAX \(1 of milyarda biri\)
* `to`Varlığın gönderdiği X-Chain adresi.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `memo`Uzunluğu 256 baytlık olan bir ekleyebilirsiniz.
* Varlık kullanıcı tarafından kontrol edilen adreslerden `username`gönderilir. \(Tabii ki, kullanıcının gönderilen varlığın dengesini en azından tutması gerekmektedir.\)

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

`amount``assetID`Bir adres listesinden belirli bir adrese birden fazla aktarım gönderir.

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

* `outputs`Her biri bir nesnenin edebiyatının bir dizisi, `assetID``amount`ve her biri bir içeriklidir.`to`
* `memo`Bu isteğe bağlı bir mesajdır. length 256 baytlık olabilir.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* Varlık kullanıcı tarafından kontrol edilen adreslerden `username`gönderilir. \(Tabii ki, kullanıcının gönderilen varlığın dengesini en azından tutması gerekmektedir.\)

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

* `assetID`NFT gönderilen değerli kimlik.
* `groupID`NFT grubu from gönderecek olan bir grup. NFT oluşturma her NFT ID altında birden fazla gruba izin verir. Her gruba birden fazla NFTs yayınlayabilirsiniz.
* `to`NFT gönderilen X-Chain adresi.
* `from`Bu operasyon için kullanmak istediğiniz adresler. `changeAddr`Eğer reddedilirse, gerekli olan adreslerinizi kullanır. Herhangi bir değişiklik gönderilecek adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* Varlık kullanıcı tarafından kontrol edilen adreslerden `username`gönderilir. \(Tabii ki, bu kullanıcının en azından NFT gönderilen dengesini tutması gerekmektedir.\)

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

Ağa imzalı bir işlem gönder ve tx kabul edileceğini varsay. İmzalı işlemin biçimini `encoding`belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults

Bu arama API sonlarına yapılmış:

`/ext/bc/X/wallet`

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

`/ext/bc/X/wallet`

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

* `assetID``to`Adres için kimlik ile bilgi `amount`birimleri gönderiyor. Varlığın en küçük artışında `amount`belirgindir. AVAX için bu 1 nAVAX \(1 of milyarda biri\)
* `to`Varlığın gönderdiği X-Chain adresi.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `memo`Uzunluğu 256 baytlık olan bir ekleyebilirsiniz.
* Varlık kullanıcı tarafından kontrol edilen adreslerden `username`gönderilir. \(Tabii ki, kullanıcının gönderilen varlığın dengesini en azından tutması gerekmektedir.\)

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

`amount``assetID`Bir adres listesinden belirli bir adrese çoklu aktarım gönderin ve tx kabul edileceğini varsayın, böylece gelecekteki aramalar değiştirilmiş UTXO setini kullanabilsin.

Bu arama API sonlarına yapılmış:

`/ext/bc/X/wallet`

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

* `outputs`Her biri bir nesnenin edebiyatının bir dizisi, `assetID``amount`ve her biri bir içeriklidir.`to`
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `memo`Uzunluğu 256 baytlık olan bir ekleyebilirsiniz.
* Varlık kullanıcı tarafından kontrol edilen adreslerden `username`gönderilir. \(Tabii ki, kullanıcının gönderilen varlığın dengesini en azından tutması gerekmektedir.\)

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

`/ext/bc/X/events`

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
| **Adresler** | Sete bir adres ekle | {"addAddresses":{"addresses":["X-fuji..."]}} | Adresler - eşleştirilecek adreslerin listesi |

**NewSet **veya NewBloom **filtreyi **yeniden arar ve AddAddresses. ile takip ****edilmelidir.** **Adresler birden fazla kez adlandırılabilir.

**Detayları ayarla**

* **NewSet mutlak adres eşleşmelerini **gerçekleştirir, eğer adres if işlem gönderilecektir.
* **NewBloom **[Bloom filtrelemesi](https://en.wikipedia.org/wiki/Bloom_filter) yanlış pozitifler üretebilir ancak daha fazla sayıda adresin filtrelenmesine izin verebilir. Eğer adresler filtrede ise, işlem gönderilecek.

#### **Örnek Tepki**

```cpp
2021/05/11 15:59:35 {"txID":"22HWKHrREyXyAiDnVmGp3TQQ79tHSSVxA9h26VfDEzoxvwveyk"}
```


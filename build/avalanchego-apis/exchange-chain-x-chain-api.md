---
description: X-Chain, Avalanche Sanal Makinesinin \(AVM\) bir instance'ıdır
---

# Exchange Zinciri \(X-Chain\) API'si

Avalanche'ın varlık yaratma ve alım satımı için yerel platformu olan [X-Chain](../../learn/platform-overview/#exchange-chain-x-chain), Avalanche Sanal Makinesi'nin \(AVM\) bir instance'ıdır. Bu API, müşterilerin X-Chain'de ve AVM'nin diğer instance'larında varlık yaratmasına ve alım-satım yapmasına olanak tanır.

{% embed url="https://www.youtube.com/watch?v=rD-IOd1nvFo" caption="" %}

## Format

Bu API `json 2.0` RPC formatını kullanır. JSON RPC çağrıları yapma hakkında daha fazla bilgi için [buraya](issuing-api-calls.md) bakın.

## Son Noktalar

X-Chain ile etkileşimde bulunmak için `/ext/bc/X`.

`/ext/bc/blockchainID``blockchainID`Diğer AVM instance'larıyla etkileşimde bulunmak için ; burada , AVM'yi çalıştıran bir blok zincirin kimliğidir.

## Metotlar

### avm.buildGenesis

Bu Sanal Makinenin genesis durumunun bir JSON temsili verildiğinde, bu durumun bayt temsilini yaratın.

#### **Son Nokta**

Bu çağrı AVM'nin statik API son noktasına yapılır:

`/ext/vm/avm`

Not: Adresler, statik API son noktasına yapılan çağrılarda bir zincir ön eki \(yani X-\) içermemelidir, çünkü bu ön ekler belirli bir zincire referans yapar.

#### **İmza**

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

Encoding, gelişigüzel baytlar, yani döndürülen genesis baytları için kullanılacak kodlama formatını belirtir. "cb58" veya "hex" formatı olabilir. Varsayılan olarak "cb58"dir.

`genesisData` şu forma sahiptir:

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

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.createAddress

Belli bir kullanıcı tarafından kontrol edilen yeni bir adres yaratın.

#### **İmza**

```cpp
avm.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "X-avax12c6n252g5v3w6a6v69f0mnnzwr77jxzr3q3u7d"
    },
    "id": 1
}
```

### avm.createFixedCapAsset

Yeni bir sabit arz limitli, değiştirilebilir varlık yaratın. Bu varlığın bir miktarı başlatma \(initialization\) sırasında yaratılır ve daha sonra daha fazlası yaratılmaz. Varlık `avm.send` komutuyla gönderilebilir.

{% page-ref page="../tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

#### **İmza**

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

* `name`, varlığın insan tarafından okunabilir adıdır. Benzersiz olması gerekmez.
* `symbol`, varlığın kısaltma sembolüdür. 0 ile 4 karakter arasındadır. Benzersiz olması gerekmez. Kullanılmayabilir.
* `denomination`, bu varlığa ait bakiyelerin kullanıcı arayüzlerinde nasıl görüntüleneceğini belirler. `denomination` 0 ise bu varlığın 100 birimi 100 olarak gösterilir. `denomination` 1 ise bu varlığın 100 birimi 10.0 olarak gösterilir. `denomination` 2 ise, bu varlığın 100 birimi 1.00 olarak gösterilir. Varsayılan olarak 0'a ayarlıdır.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username` ve `password`, işlem ücretini ödeyen kullanıcıyı ifade eder.
* `initialHolders` parametresindeki her bir eleman ilk çıkışta \(genesis\) `address`adresinde `amount` tutarında varlık bulunduğunu belirtir.
* `assetID`, yeni varlığın kimliğidir.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.mint

[`avm.createVariableCapAsset`](exchange-chain-x-chain-api.md#avm-createvariablecapasset) ile yaratılan değişken arz limitli bir varlığın adetlerini mint edin.

#### **İmza**

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

* `assetID` varlığının `amount` adedi `to` adresi tarafından yaratılacak ve kontrol edilecektir.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username`, işlem ücretini ödeyen kullanıcıdır. `username`, bu varlığın daha fazlasının mint edilmesine izin veren anahtarlara sahip olmalıdır. Yani, bu kullanıcı, minter \(mint eden\) kümelerinden biri için en azından _threshold_ sayıdaki anahtarı kontrol ediyor olmalıdır.
* `txID`, bu işlemin kimliğidir.
* Sonuç kısmındaki `changeAddr`, para üstünün gönderildiği adrestir.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.createVariableCapAsset

Yeni bir değişken arz limitli, değiştirilebilir varlık yaratın. Başlatma sırasında varlığın hiçbir adedi mevcut değildir. Minter'ler `avm.mint`'i kullanarak bu varlığın adetlerini mint edebilirler.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-variable-cap-asset.md" %}

#### **İmza**

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

* `name`, varlığın insan tarafından okunabilir adıdır. Benzersiz olması gerekmez.
* `symbol`, varlığın kısaltma sembolüdür. 0 ile 4 karakter arasındadır. Benzersiz olması gerekmez. Kullanılmayabilir.
* `denomination`, bu varlığın bakiyelerinin kullanıcı arayüzlerinde nasıl görüntüleneceğini belirler. Denomination 0 ise, bu varlığın 100 adedi 100 olarak gösterilir. Denomination 1 ise, bu varlığın 100 adedi 10.0 olarak gösterilir. Denomination 2 ise, bu varlığın 100 adedi .100 olarak gösterilir vb.
* `minterSets`, her bir elemanın `minters`'daki adreslerin bir minting işlemi imzalayarak varlığın daha fazla adedini birlikte mint edebilecekleri `threshold`'u belirlediği bir listedir.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username` işlem ücretini öder.
* `assetID`, yeni varlığın kimliğidir.
* Sonuç kısmındaki `changeAddr`, para üstünün gönderildiği adrestir.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.createNFTAsset

Yeni bir değiştirilemez varlık yaratın. Başlatma sırasında varlığın hiçbir adedi mevcut değildir. Minter'ler `avm.mintNFT`'i kullanarak bu varlığın adetlerini mint edebilirler.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **İmza**

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

* `name`, varlığın insan tarafından okunabilir adıdır. Benzersiz olması gerekmez.
* `symbol`, varlığın kısaltma sembolüdür. 0 ile 4 karakter arasındadır. Benzersiz olması gerekmez. Kullanılmayabilir.
* `minterSets`, her bir elemanın `minters`'daki adreslerin bir minting işlemi imzalayarak varlığın daha fazla adedini birlikte mint edebilecekleri `threshold`'u belirlediği bir listedir.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username` işlem ücretini öder.
* `assetID`, yeni varlığın kimliğidir.
* Sonuç kısmındaki `changeAddr`, para üstünün gönderildiği adrestir.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.mintNFT

[`avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset) ile yaratılmış değiştirilemez token'lar mint edin.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **İmza**

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

* `assetID`, yeni yaratılan NFT varlığın varlık kimliğidir.
* `payload`, 1024 bayta kadar olan gelişigüzel bir payload'dur. Bunun kodlama formatı `encoding` argümanı ile belirtilir.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username`, işlem ücretini ödeyen kullanıcıdır. `username`, bu varlığın daha fazlasının mint edilmesine izin veren anahtarlara sahip olmalıdır. Yani, bu kullanıcı, minter \(mint eden\) kümelerinden biri için en azından _threshold_ sayıdaki anahtarı kontrol ediyor olmalıdır.
* `txID`, bu işlemin kimliğidir.
* Sonuç kısmındaki `changeAddr`, para üstünün gönderildiği adrestir.
* `encoding`, payload argümanı için kullanılacak kodlama formatıdır. "cb58" veya "hex" formatı olabilir. Varsayılan olarak "cb58"dir.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.export

X-Chain'den P-Chain'e veya C-Chain'e bir varlık gönderin. Bu metodu çağırdıktan sonra, transferi tamamlamak için [C-Chain'in `avax.import`](contract-chain-c-chain-api.md#avax-import) veya [P-Chain'in `avax.importAVAX`](platform-chain-p-chain-api.md#avax-importAVAX) komutunu çağırmanız gerekir.

#### **İmza**

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

* `to`, varlığın gönderildiği P-Chain veya C-Chain adresidir.
* `amount`, gönderilecek varlığın tutarıdır.
* `assetID`, gönderilen varlığın kimliğidir. AVAX dışa aktarımları için `AVAX` kullanın.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* Varlık, `username` tarafından kontrol edilen adreslerden gönderilir
* `password`, `username`'in parolasıdır.

* `txID`, bu işlemin kimliğidir.
* Sonuç kısmındaki `changeAddr`, para üstünün gönderildiği adrestir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "to":"C-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 10,
        "assetID": "AVAX",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Yanıt**

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

### avm.exportKey

Belli bir adresi kontrol eden özel anahtarı getirin. Getirilen özel anahtar, [`avm.importKey`](exchange-chain-x-chain-api.md#avm-importkey) komutuyla bir kullanıcıya eklenebilir.

#### **İmza**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `address`, `username`tarafından kontrol edilmelidir.
* `privateKey`, `address`'i kontrol eden özel anahtarın dizgi \(string\) temsilidir.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

### avm.getAllBalances

Belli bir adres tarafından kontrol edilen varlıkların bakiyelerini alın.

#### **İmza**

```cpp
avm.getAllBalances({address:string}) -> {
    balances: []{
        asset: string,
        balance: int
    }
}
```

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.getAssetDescription

Bir varlık hakkındaki bilgileri alın.

#### **İmza**

```cpp
avm.getAssetDescription({assetID: string}) -> {
    assetId: string,
    name: string,
    symbol: string,
    denomination: int
}
```

* `assetID`, hakkında bilgi istenen varlığın kimliğidir.
* `name`, varlığın insan tarafından okunabilen adıdır, benzersiz bir ad olması gerekmez.
* `symbol`, varlığın sembolüdür.
* `denomination`, bu varlığa ait bakiyelerin kullanıcı arayüzlerinde nasıl görüntüleneceğini belirler. Denomination 0 ise, bu varlığın 100 adedi 100 olarak gösterilir. Denomination 1 ise, bu varlığın 100 adedi 10.0 olarak gösterilir. Denomination 2 ise, bu varlığın 100 adedi .100 olarak gösterilir vb.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.getBalance

Belli bir adres tarafından kontrol edilen bir varlığın bakiyesini getirin.

#### **İmza**

```cpp
avm.getBalance({
    address: string,
    assetID: string
}) -> {balance: int}
```

* `address`, varlığın sahibidir
* `assetID`, bakiyesi istenen varlığın kimliğidir

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.getAddressTxs <a id="avm-get-address-txs-api"></a>

Belli bir adresin bakiyesini değiştiren tüm işlemleri döndürür. Aşağıdakilerden biri true ise, bir işlemin bir adresin bakiyesini değiştireceği söylenir:

* İşlemin tükettiği bir UTXO, en azından kısmen bu adresin sahipliğindeydi.
* İşlemin ürettiği bir UTXO, en azından kısmen bu adresin sahipliğindedir.

Not: İndeksleme \(`index-transactions`\), X-chain yapılandırmasında etkinleştirilmelidir.

#### **İmza**

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

**İstek parametreleri**

* `address`: İlgili işlemleri getirdiğimiz adres
* `assetID`: Sadece bu varlığın bakiyesini değiştiren işlemleri döndürür. Bir varlığın kimliği veya alias'ı olmalıdır.
* `pageSize`: Her bir sayfa için döndürülecek ögelerin sayısı. İsteğe bağlı. Varsayılan olarak 1024'e ayarlıdır.

**Yanıt parametreleri**

* `txIDs`: Bu adresin bakiyesini etkileyen işlem kimliklerinin listesi.
* `cursor`: Sayfa numarası veya offset. Bir sonraki sayfayı getirmek için istekte bunu kullanın.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.getTx

Belirtilen işlemi döndürür. `encoding`parametresi, döndürülen işlemin formatını ayarlar. `"cb58"`, `"hex"`veya `"json"` olabilir. Varsayılan olarak "cb58"dir.

#### **İmza**

```cpp
avm.getTx({
    txID: string,
    encoding: string, //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTx",
    "params" :{
        "txID":"KMcVWV1dJAuWQXfrJgNFFr9uPHqXELQNZoFWoosYVqQV5qGj5",
        "encoding": "json"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Örnek Yanıt**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "tx": {
            "unsignedTx": {
                "networkID": 1,
                "blockchainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
                "outputs": [
                    {
                        "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
                        "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                        "output": {
                            "addresses": [
                                "X-avax126rd3w35xwkmj8670zvf7y5r8k36qa9z9803wm"
                            ],
                            "amount": 1530084210,
                            "locktime": 0,
                            "threshold": 1
                        }
                    }
                ],
                "inputs": [],
                "memo": "0x",
                "sourceChain": "11111111111111111111111111111111LpoYY",
                "importedInputs": [
                    {
                        "txID": "28jfD1CViCz7CKawJBzmHCQRWtk6xwzcBjCVErH6dBo11JLvmw",
                        "outputIndex": 0,
                        "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
                        "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                        "input": {
                            "amount": 1531084210,
                            "signatureIndices": [
                                0
                            ]
                        }
                    }
                ]
            },
            "credentials": [
                {
                    "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                    "credential": {
                        "signatures": [
                            "0x447ea3c6725add24e240b3179f9cc28ab5410c48f822d32d12459861ca816765297dbfe07e1957e3b470d39e6f56f10269dd7f8c4e108857db874b2c4ba1a22401"
                        ]
                    }
                }
            ]
        },
        "encoding": "json"
    },
    "id": 1
}
```

burada:

* `credentials`, bu işlemin kimlik bilgilerinin bir listesidir. Her kimlik bilgisi, bu işlemi oluşturan kişinin bu işlemin girdilerinden birini tüketmesine izin verildiğini kanıtlar. Her kimlik bilgisi, imzalardan oluşan bir listedir.
* `unsignedTx`, işlemin imzasız kısmıdır.
* `networkID`, bu işlemin gerçekleştiği ağın kimliğidir. \(Avalanche Mainnet'i `1`'dir.\)
* `blockchainID`, bu işlemin gerçekleştiği blok zincirin kimliğidir. \(Avalanche Mainnet X-Chain'i `2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM`'dir.\)
* Her `outputs` öğesi, bu işlemin başka bir zincire aktarılmayan bir çıktısıdır \(UTXO\).
* Her bir `inputs`ögesi, bu işlemin başka bir zincirden aktarılmamış bir girdisidir.
* İçe Aktarma İşlemlerinde, varlıkların içe aktarıldığı blok zincirin kimliğini ve içe aktarılan girdileri belirten ilave `sourceChain` ve `importedInputs` alanları vardır.
* Dışa Aktarma İşlemlerinde, varlıkların dışa aktarıldığı blok zincirin kimliğini ve dışa aktarılan UTXO'ları belirten ilave `destinationChain` ve `exportedOutputs` alanlarına vardır.

Bir çıktı şunları içerir:

* `assetID`: Transfer edilen varlığın kimliği. \(Mainnet Avax kimliği `FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z`'dir.\)
* `fxID`: Bu çıktının kullandığı FX'in kimliği.
* `output`: Bu çıktının FX'e özgü içeriği.

Çoğu çıktı secp256k1 FX'ini kullanır, şöyle görünür:

```json
{
    "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
    "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
    "output": {
        "addresses": [
            "X-avax126rd3w35xwkmj8670zvf7y5r8k36qa9z9803wm"
        ],
        "amount": 1530084210,
        "locktime": 0,
        "threshold": 1
    }
}
```

Yukarıdaki çıktı, `locktime` ögesinde Unix zamanı cinsinden belirtilen süreden sonra `addresses` ögesinde yer alan adreslerin `threshold` \(eşik\) ögesinde belirtilen sayıda imzaları olan bir işlemle tüketilebilir.

### avm.getTxStatus

Ağa gönderilen bir işlemin durumunu getirin.

### avm.getTxStatus

Ağa gönderilen bir işlemin durumunu getirin.

#### **İmza**

```cpp
avm.getTxStatus({txID: string}) -> {status: string}
```

`status`, şunlardan biridir:

* `Accepted`: İşlem her düğüm tarafından kabul edilir \(veya edilecektir\)
* `Processing`: İşlem bu düğümde oylanıyor
* `Rejected`: İşlem ağdaki herhangi bir düğüm tarafından asla kabul edilmeyecektir
* `Unknown`: İşlem bu düğüm tarafından görülmedi

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

Belli bir adrese referans yapan UTXO'ları getirir. Kaynak zincir \(sourceChain\) belirtilirse, o zincirden X Chain'e aktarılan atomik UTXO'ları getirecektir.

#### **İmza**

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

* `utxos`, her bir UTXO'nun `addresses`'deki en az bir adrese referans yaptığı UTXO'ların bir listesidir.
* En çok `limit` kadar sayıda UTXO döndürülür. Eğer `limit` kullanılmazsa veya 1024'ten büyükse, 1024'e ayarlanır.
* Bu metot sayfa düzenlemeyi \(pagination\) destekler. `endIndex`, en son döndürülen UTXO'yu ifade eder. Bir sonraki UTXO'lar kümesini getirmek için, bir sonraki çağrıda `endIndex` değerini `startIndex` olarak belirleyin.
* `startIndex` kullanılmazsa, `limit` sayısına kadar olan tüm UTXO'ları getirecektir.
* Sayfa düzeni kullanıldığında \(yani `startIndex` verildiğinde\), UTXO'ların çoklu çağrılarda benzersiz olması garanti değildir. Yani, bir UTXO birinci çağrının sonucunda görünebilir ve ardından ikinci çağrıda tekrar görünebilir.
* Sayfa düzeni kullanıldığında, çoklu çağrılarda tutarlılık garanti değildir. Yani, UTXO adresler kümesi çağrılar arasında değişmiş olabilir.
* `encoding`, döndürülen UTXO'lar için formatı ayarlar. "cb58" veya "hex" formatı olabilir. Varsayılan olarak "cb58"dir.

#### **Örnek**

Diyelim ki `X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf` ve `X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz`'dan en az birine referans yapan tüm UTXO'ları istiyoruz.

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

Bu şu yanıtı verir:

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

`numFetched` ve `limit` birbirinin aynı olduğu için, getirilmemiş daha fazla UTXO olabileceğini söyleyebiliriz. Metodu bu sefer `startIndex` ile tekrar çağırıyoruz:

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

Bu şu yanıtı verir:

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

`numFetched`, `limit`'ten daha az olduğu için UTXO'ları getirme işlemini bitirdiğimizi ve bu metodu tekrar çağırmamıza gerek olmadığını biliriz.

Diyelim ki bir ImportTx kurmak için P Chain'den X Chain'e aktarılmış UTXO'ları getirmek istiyoruz. Bu durumda atomik UTXO'ları getirmek için sourceChain argümanıyla GetUTXOs komutunu çağırmamız gerekir:

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

Bu şu yanıtı verir:

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

### avm.import

Bir varlığın P-Chain'den veya C-Chain'den X-Chain'e transferini kesinleştirir. Bu metodu çağırmadan önce, transferi başlatmak için P-Chain'in [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax) ya da C-Chain'in [`avax.export`](contract-chain-c-chain-api.md#avax-export) metodunu çağırmanız gerekir.

#### **İmza**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to`, AVAX'ın gönderildiği adrestir. Bu, karşılık gelen P-Chain'in `exportAVAX`ya da C-Chain'in `export` çağrısındaki `to` argümanıyla aynı olmalıdır.
* `sourceChain`, AVAX hangi zincirden içe aktarılıyorsa, o zincirin kimliği veya alias'ıdır. C-Chain'den içeri fon aktarmak için `"C"` kullanın.
* `username`, `to`'i kontrol eden kullanıcıdır.
* `txID`, yeni yaratılmış atomik işlemin kimliğidir.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2gXpf4jFoMAWQ3rxBfavgFfSdLkL2eFUYprKsUQuEdB5H6Jo1H"
    },
    "id": 1
}
```

### avm.importKey

Bir kullanıcıya bir adresi kontrol eden özel anahtarı vererek o kullanıcıya o adresin kontrolünü verin.

#### **İmza**

```cpp
avm.importKey({
    username: string,
    password: string,
    privateKey: string
}) -> {address: string}
```

* `username`'in özel anahtarlarına `privateKey` ekleyin. `address`, `username`'in şimdi özel anahtarla kontrol ettiği adrestir.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "address":"X-avax1mwlnrzv0ezdycx4qhqj77j55cwgcvtf29zvmpy"
    }
}
```

### avm.issueTx

Ağa imzalı bir işlem gönderin. `encoding` imzalı işlemin biçimini belirtir. "cb58" veya "hex" formatı olabilir. Varsayılan olarak "cb58"dir.

#### **İmza**

```cpp
avm.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### avm.listAddresses

Belli bir kullanıcı tarafından kontrol edilen adresleri listeleyin.

#### **İmza**

```cpp
avm.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": ["X-avax1rt4vac58crp0p59yf640c4gycm6creg2rt8hc6"]
    },
    "id": 1
}
```

### avm.send

Bir varlığın bir miktarını bir adrese gönderin.

#### **İmza**

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

* `assetID` kimliğine sahip varlığın `amount` adedini `to` adresine gönderir. `amount`. varlığın en küçük artış adımıyla \(increment\) ifade edilir. AVAX için en küçük artış adımı 1 nAVAX'tır \(1 AVAX'ın bir milyarda biri\).
* `to`, varlığın gönderildiği X-Chain adresidir.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* Uzunluğu 256 bayta kadar olabilen bir `memo` ekleyebilirsiniz.
* Varlık, kullanıcı `username` tarafından kontrol edilen adreslerden gönderilir. \(Elbette bu kullanıcının en azından gönderilen varlığın bakiyesine sahip olması gerekecektir.\)

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

Sahip olunan adresler listesinden belirtilen bir adrese çoklu aktarımla `amount` miktarda `assetID` gönderir.

#### **İmza**

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

* `outputs`, her biri bir `assetID`, `amount` ve `to` içeren bir object literal'ler dizilimidir.
* `memo`, uzunluğu 256 bayta kadar olabilen isteğe bağlı bir mesajdır.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* Varlık, kullanıcı `username` tarafından kontrol edilen adreslerden gönderilir. \(Elbette bu kullanıcının en azından gönderilen varlığın bakiyesine sahip olması gerekecektir.\)

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### avm.sendNFT

Bir değiştirilemez token gönderin.

#### **İmza**

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

* `assetID`, gönderilen NFT'nin varlık kimliğidir.
* `groupID`, NFT hangi NFT grubundan gönderiliyorsa, o NFT grubudur. NFT creation, her bir NFT Kimliği altında çoklu gruplara izin verir. Her bir gruba çoklu NFT'ler yayınlayabilirsiniz.
* `to`, NFT' hangi X-Chain adresine gönderiliyorsa, o X-Chain adresidir.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır. `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* Varlık, kullanıcı `username` tarafından kontrol edilen adreslerden gönderilir. \(Elbette bu kullanıcının en azından gönderilen NFT'nin bakiyesine sahip olması gerekir.\)

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### wallet.issueTx

Ağa imzalı bir işlem gönderin ve işlemin kabul edileceğini varsayın. `encoding`, imzalı işlemin formatını belirler. "cb58" veya "hex" formatı olabilir. Varsayılan olarak "cb58"dir.

Bu çağrı cüzdan API'sinin son noktasına yapılır:

`/ext/bc/X/wallet`

#### İmza

```cpp
wallet.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### Örnek Çağrı

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

#### Örnek Yanıt

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### wallet.send

Bir adrese bir miktar varlık gönderin ve gelecekteki çağrıların değiştirilmiş UTXO setini kullanabilmesi için işlemin kabul edileceğini varsayın.

Bu çağrı cüzdan API'sinin son noktasına yapılır:

`/ext/bc/X/wallet`

#### **İmza**

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

* `assetID` kimliğine sahip varlığın `amount` adedini `to` adresine gönderir. `amount`. varlığın en küçük artış adımıyla \(increment\) ifade edilir. AVAX için en küçük artış adımı 1 nAVAX'tır \(1 AVAX'ın bir milyarda biri\).
* `to`, varlığın gönderildiği X-Chain adresidir.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* Uzunluğu 256 bayta kadar olabilen bir `memo` ekleyebilirsiniz.
* Varlık, kullanıcı `username` tarafından kontrol edilen adreslerden gönderilir. \(Elbette bu kullanıcının en azından gönderilen varlığın bakiyesine sahip olması gerekecektir.\)

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### wallet.sendMultiple

Sahip olunan adresler listesinden belirli bir adrese `amount` miktarda çoklu `assetID` transferi yapın ve gelecekteki çağrıların değiştirilmiş UTXO setini kullanabilmesi için işlemin kabul edileceğini varsayın.

Bu çağrı cüzdan API'sinin son noktasına yapılır:

`/ext/bc/X/wallet`

#### **İmza**

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

* `outputs`, her biri bir `assetID`, `amount` ve `to` içeren bir object literal'ler dizilimidir.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* Uzunluğu 256 bayta kadar olabilen bir `memo` ekleyebilirsiniz.
* Varlık, kullanıcı `username` tarafından kontrol edilen adreslerden gönderilir. \(Elbette bu kullanıcının en azından gönderilen varlığın bakiyesine sahip olması gerekecektir.\)

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### olaylar

Belirtilen bir adresteki işlemleri listeler.

Bu çağrı, olaylar API'si son noktasına yapılır:

`/ext/bc/X/events`

#### **Golang Örneği**

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

| Komut | Açıklama | Örnek | Argümanlar |
| :--- | :--- | :--- | :--- |
| **NewSet** | yeni bir adres haritası seti yaratın | {"newSet":{}} |  |
| **NewBloom** | yeni bir new bloom seti yaratın. | {"newBloom":{"maxElements":"1000","collisionProb":"0.0100"}} | maxElements - filtredeki öge sayısı > 0 olmalıdır; collisionProb - izin verilen çatışma olasılığı > 0 ve <= 1 olmalıdır |
| **AddAddresses** | sete bir adres ekleyin | {"addAddresses":{"addresses":["X-fuji..."]}} | adresler - eşleşecek adresler listesi |

**NewSet** veya **NewBloom** ögelerinin çağrılması filtreleri reset eder; devamında **AddAddresses** gelmelidir. **AddAddresses** ögesi birden fazla kez çağrılabilir.

**Set detayları**

* **NewSet**, mutlak adres eşleşmeleri gerçekleştirir, eğer adres sette ise işlem size gönderilir.
* **NewBloom** [Bloom filtreleme](https://en.wikipedia.org/wiki/Bloom_filter), yalancı pozitifler üretebilir, ancak daha fazla sayıda adresin filtrelenmesine imkan verebilir.  Eğer adresler filtredeyse, işlem size gönderilecektir.

#### **Örnek Yanıt**

```cpp
2021/05/11 15:59:35 {"txID":"22HWKHrREyXyAiDnVmGp3TQQ79tHSSVxA9h26VfDEzoxvwveyk"}
```


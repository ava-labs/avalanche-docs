# Keystore API

Her düğümün bir tuş mağazası vardır. Müşteriler blok zincirleriyle etkileşim halinde kullanılmak üzere kimlikler olarak hareket eden anahtar mağazada kullanıcılar oluşturur. Bir anahtar mağazası düğümün seviyesinde vardır, yani bir kullanıcı oluşturursanız _sadece_ bu düğümde var. Bununla birlikte, kullanıcılar bu API kullanarak ithal edilebilir ve ihraç edilebilir.

_**Sadece düğüm operatörünün düz metin parolanıza erişimi olduğu için işlediğiniz bir düğümle bir anahtar kullanıcısı oluşturmalısınız.**_

Ana ağdaki onaylama ve heyet için [cüzdandan](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md) işlemler yayınlamalısınız. Böylece fonlarınızın kontrol anahtarları düğümlerde saklanmaz, bu da bir düğümle çalışan bir bilgisayar tehlikeye girerse risk önemli ölçüde düşürür.

## Format

Bu API, `json 2.0` API formatını kullanır. JSON RPC arama yapmak için daha fazla bilgi için, [buraya](issuing-api-calls.md) bakın.

## Sonucu noktası

```text
/ext/keystore
```

## Yöntemler

### keystore. keystore.createUser Kullanıcı

Belirtilmiş kullanıcı adı ve parola ile yeni bir kullanıcı oluştur.

#### **İmzalanma**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `Kullanıcı adı` ve `parola` en fazla 1024 karakterde olabilir.
* `Parola` çok zayıf ise talebiniz reddedilecek. `Parola` en az 8 karakter olmalı ve üst ve alt dosya harfleri ve rakamlar ve semboller içermelidir.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.createUser",
    "params" :{
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### keystore. Silin@ info: whatsthis

Kullanıcı sil.

#### **İmzalanma**

```cpp
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.deleteUser",
    "params" : {
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore. keystore.exportUser

Kullanıcı aktar. Kullanıcı başka bir [`düğüme`](keystore-api.md#keystore-importuser) aktarılabilir. Kullanıcının şifresi şifrelenir.

#### **İmzalanma**

```cpp
keystore.exportUser(
    {
        username:string,
        password:string,
        encoding:string //optional
    }
) -> {
    user:string,
    encoding:string
}
```

`Kodlama` sicim kodlayan kullanıcı verisinin biçimini belirtir. "cb58" veya "hek" olabilir. "Cb58" için Defaults

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.exportUser",
    "params" :{
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "user":"4CsUh5sfVwz2jNrJXBVpoPtDsb4tZksWykqmxC5CXoDEERyhoRryq62jYTETYh53y13v7NzeReisi",
        "encoding":"cb58"
    }
}
```

### keystore. keystore.importUser

Bir kullanıcı içeriye aktar. `Parola` kullanıcının parolasına uymalıdır. `Kullanıcı adı` `kullanıcıya` ait olan kullanıcı adı ile eşleşmek zorunda değildir.

#### **İmzalanma**

```cpp
keystore.importUser(
    {
        username:string,
        password:string,
        user:string,
        encoding:string //optional
    }
) -> {success:bool}
```

`Kodlama,` sicim kodlayan kullanıcı verisinin biçimini belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.importUser",
    "params" :{
        "username":"myUsername",
        "password":"myPassword",
        "user"    :"4CsUh5sfVwz2jNrJXBVpoPtDsb4tZksWykqmxC5CXoDEERyhoRryq62jYTETYh53y13v7NzeReisi"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### keystore. keystore.listUsers

Bu anahtar mağazasındaki kullanıcıları listele.

#### **İmzalanma**

```cpp
keystore.ListUsers() -> {users:[]string}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "users":[
            "myUsername"
        ]
    }
}
```


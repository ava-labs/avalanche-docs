# Sağlık API

Bu API düğümlü sağlık için kullanılabilir.

Düğümün sağlığını gösteren bir HTTP durum kodu yanıt almak için bir `GET`istek yap.`/ext/health` Eğer düğüm sağlıklı ise, `200`durum kodunu geri verecek. Eğer bir düğümün sağlığı hakkında daha derin bilgi istiyorsanız aşağıdaki yöntemleri kullanın.

## Format

Bu API, `json 2.0`RPC formatını kullanır. JSON RPC arama yapmak için daha fazla bilgi için, [buraya](issuing-api-calls.md) bakın.

## Sonucu noktası

```text
/ext/health
```

## Yöntemler

### Sağlık. Getir health.getLiveness in New York USA

Düğün, her bir zincir için sağlık kontrolü de dahil olmak üzere her 30 saniyede bir sağlık kontrolleri yapar. Bu yöntem sağlık kontrol sonuçlarının son kümesini gönderir.

#### **İmzalanma**

```cpp
health.getLiveness() -> {
    checks: []{
        checkName: {
            message: JSON,
            error: JSON,
            timestamp: string,
            duration: int,
            contiguousFailures: int,
            timeOfFirstFailure: int
        }
    },
    healthy: bool
}
```

`healthy`Eğer tüm sağlık kontrolleri geçerse bu doğru olur.

`checks`Sağlık kontrolleri listesi var.

* `message`Bir kontrol cevabı ek bağlamda içerebilir.
* Bir kontrol yanıtı, çekin neden başarısız olduğunu `error`açıklayabilir.
* `timestamp`Son sağlık kontrolünün zaman damgası.
* `duration`Son sağlık kontrolünün yürütme süresidir, nanosaniye.
* `contiguousFailures`Bu çek üst üste kaç kez başarısız oldu.
* `timeOfFirstFailure`Bu çekin ilk başarısız olduğu zaman.

Bu ölçümler hakkında daha fazla bilgi [go-sundheit](https://github.com/AppsFlyer/go-sundheit) kütüphanesi için belgelendirmede bulunabilir.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.getLiveness"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **Örnek Tepki**

Bu örnekte C-Chain’s sağlık kontrolü başarısız olur.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "checks": {
            "C": {
                "message": null,
                "error": {
                    "message": "example error message"
                },
                "timestamp": "2020-10-14T14:04:20.57759662Z",
                "duration": 465253,
                "contiguousFailures": 50,
                "timeOfFirstFailure": "2020-10-14T13:16:10.576435413Z"
            },
            "P": {
                "message": {
                    "percentConnected": 0.9967694992864075
                },
                "timestamp": "2020-10-14T14:04:08.668743851Z",
                "duration": 433363830,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            },
            "X": {
                "timestamp": "2020-10-14T14:04:20.3962705Z",
                "duration": 1853,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            },
            "chains.default.bootstrapped": {
                "timestamp": "2020-10-14T14:04:04.238623814Z",
                "duration": 8075,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            },
            "network.validators.heartbeat": {
                "message": {
                    "heartbeat": 1602684245
                },
                "timestamp": "2020-10-14T14:04:05.610007874Z",
                "duration": 6124,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            }
        },
        "healthy": false
    },
    "id": 1
}
```


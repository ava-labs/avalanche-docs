# Metrik API

API, hastaların bir düğümün sağlık ve performansı hakkında istatistikleri almalarına izin verir.

## Sonucu noktası

```text
/ext/metrics
```

## Kullanım için

Düğüm metriklerini almak için:

```cpp
curl -X POST 127.0.0.1:9650/ext/metrics
```

## Format

Bu API Prometheus uyumlu metrikler üretir. Prometheus'un biçimlendirme hakkında bilgi için [burada](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) bakın.

[Bu](../tutorials/nodes-and-staking/setting-up-node-monitoring.md) da Prometheus ve Grafana metrik API'sini kullanarak AvalancheGo düğümünü izlemesini sağlayacak bir ders sunuyor.


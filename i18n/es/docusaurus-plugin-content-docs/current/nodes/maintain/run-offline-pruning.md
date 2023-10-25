---
tags: [Nodos]
description: En este documento, aprende cómo ejecutar la poda sin conexión en tu nodo para reducir su uso de disco.
sidebar_label: Reducir el uso de disco
pagination_label: "Espacio en disco de un nodo: ejecutar poda sin conexión en C-Chain"
sidebar_position: 4
---

# Ejecutar Poda Sin Conexión en C-Chain

## Introducción

La poda sin conexión se ha portado de `go-ethereum` para reducir la cantidad de espacio en disco
ocupado por la TrieDB (almacenamiento para el Bosque de Merkle).

La poda sin conexión crea un filtro de Bloom y agrega todos los nodos trie en estado activo
al filtro de Bloom para marcar los datos como protegidos. Esto asegura que cualquier
parte del estado activo no se eliminará durante la poda sin conexión.

Después de generar el filtro de Bloom, la poda sin conexión itera sobre la base de datos
y busca nodos trie que sean seguros para ser eliminados del disco.

Un filtro de Bloom es una estructura de datos probabilística que informa si un elemento está
definitivamente no está en un conjunto o posiblemente en un conjunto. Por lo tanto, para cada clave que
iteramos, comprobamos si está en el filtro de Bloom. Si la clave definitivamente no está en
el filtro de Bloom, entonces no está en estado activo y podemos eliminarlo de manera segura.
Si la clave está posiblemente en el conjunto, entonces la omitimos para asegurarnos de no
eliminar ningún estado activo.

Durante la iteración, la base de datos subyacente (LevelDB) escribe marcadores de eliminación,
causando un aumento temporal en el uso del disco.

Después de iterar sobre la base de datos y eliminar cualquier nodo trie antiguo que pueda,
la poda sin conexión luego ejecuta una compactación para minimizar el tamaño de la DB después de la
potencialmente gran número de operaciones de eliminación.

## Encontrar el Archivo de Configuración de C-Chain

Para habilitar la poda sin conexión, debes actualizar el archivo de configuración de C-Chain
para incluir los parámetros `offline-pruning-enabled` y
`offline-pruning-data-directory`.

La ubicación predeterminada del archivo de configuración de C-Chain es
`~/.avalanchego/configs/chains/C/config.json`. **Ten en cuenta que, de forma predeterminada,
este archivo no existe. Deberías crearlo manualmente.** Puedes actualizar
el directorio para las configuraciones de las cadenas pasando el directorio de tu elección a través de
el argumento de línea de comandos: `chain-config-dir`. Consulta [esto](/nodes/configure/chain-config-flags.md) para más
información. Por ejemplo, si inicias tu nodo con:

```zsh
./build/avalanchego --chain-config-dir=/home/ubuntu/chain-configs
```

El directorio de configuración de la cadena se actualizará a `/home/ubuntu/chain-configs` y
el archivo de configuración de C-Chain correspondiente será:
`/home/ubuntu/chain-configs/C/config.json`.

## Ejecutar Poda Sin Conexión

Para habilitar la poda sin conexión, actualiza el archivo de configuración de C-Chain para incluir los siguientes parámetros:

```json
{
  "offline-pruning-enabled": true,
  "offline-pruning-data-directory": "/home/ubuntu/offline-pruning"
}
```

Esto establecerá `/home/ubuntu/offline-pruning` como el directorio que será utilizado por el
poda sin conexión. La poda sin conexión almacenará el filtro de Bloom en esta ubicación, así que
debes asegurarte de que la ruta exista.

Ahora que el archivo de configuración de C-Chain ha sido actualizado, puedes iniciar tu nodo con
el siguiente comando (no son necesarios argumentos de línea de comandos si usas el directorio de configuración de cadena predeterminado):

```zsh
./build/avalanchego
```

Una vez que AvalancheGo inicie la C-Chain, puedes esperar ver registros de actualización del podador sin conexión:

```zsh
INFO [02-09|00:20:15.625] Iterando instantánea de estado                 cuentas=297,231 slots=6,669,708 transcurrido=16.001s eta=1m29.03s
INFO [02-09|00:20:23.626] Iterando instantánea de estado                 cuentas=401,907 slots=10,698,094 transcurrido=24.001s eta=1m32.522s
INFO [02-09|00:20:31.626] Iterando instantánea de estado                 cuentas=606,544 slots=13,891,948 transcurrido=32.002s eta=1m10.927s
INFO [02-09|00:20:39.626] Iterando instantánea de estado                 cuentas=760,948 slots=18,025,523 transcurrido=40.002s eta=1m2.603s
INFO [02-09|00:20:47.626] Iterando instantánea de estado                 cuentas=886,583 slots=21,769,199 transcurrido=48.002s eta=1m8.834s
INFO [02-09|00:20:55.626] Iterando instantánea de estado                 cuentas=1,046,295 slots=26,120,100 transcurrido=56.002s eta=57.401s
INFO [02-09|00:21:03.626] Iterando instantánea de estado                 cuentas=1,229,257 slots=30,241,391 transcurrido=1m4.002s eta=47.674s
INFO [02-09|00:21:11.626] Iterando instantánea de estado                 cuentas=1,344,091 slots=34,128,835 transcurrido=1m12.002s eta=45.185s
INFO [02-09|00:21:19.626] Iterando instantánea de estado                 cuentas=1,538,009 slots=37,791,218 transcurrido=1m20.002s eta=34.59s
INFO [02-09|00:21:27.627] Iterando instantánea de estado                 cuentas=1,729,564 slots=41,694,303 transcurrido=1m28.002s eta=25.006s
INFO [02-09|00:21:35.627] Iterando instantánea de estado                 cuentas=1,847,617 slots=45,646,011 transcurrido=1m36.003s eta=20.052s
INFO [02-09|00:21:43.627] Iterando instantánea de estado                 cuentas=1,950,875 slots=48,832,722 transcurrido=1m44.003s eta=9.299s
INFO [02-09|00:21:47.342] Instantánea iterada                        cuentas=1,950,875 slots=49,667,870 transcurrido=1m47.718s
INFO [02-09|00:21:47.351] Escribiendo filtro de Bloom de estado en disco              nombre=/home/ubuntu/offline-pruning/statebloom.0xd6fca36db4b60b34330377040ef6566f6033ed8464731cbb06dc35c8401fa38e.bf.gz
INFO [02-09|00:23:04.421] Filtro de Bloom de estado comprometido             nombre=/home/ubuntu/offline-pruning/statebloom.0xd6fca36db4b60b34330377040ef6566f6033ed8464731cbb06dc35c8401fa38e.bf.gz
```

El filtro de Bloom debería estar poblado y comprometido en el disco después de unos 5
minutos. En este punto, si el nodo se apaga, reanudará la sesión de poda sin conexión cuando se reinicie (nota: esta operación no se puede cancelar).

Para asegurarse de que los usuarios no dejen accidentalmente la poda sin conexión habilitada
a largo plazo (lo que podría resultar en una hora de tiempo de inactividad en cada reinicio),
hemos agregado una protección manual que requiere que después de una sesión de poda sin conexión,
el nodo debe iniciarse con la poda sin conexión deshabilitada al menos una vez
antes de que se inicie con la poda sin conexión habilitada nuevamente. Por lo tanto, una vez que el
filtro de Bloom se haya comprometido en el disco, debes actualizar el archivo de configuración de C-Chain
para incluir los siguientes parámetros:

```zsh
INFO [02-09|00:35:11.040] Finished pruning state data             elapsed=12m6.619s
INFO [02-09|00:35:11.040] Bloom filters loaded                    elapsed=12m6.619s
INFO [02-09|00:35:11.040] Pruning state data completed            elapsed=12m6.619s
INFO [02-09|00:35:11.040] Starting P2P networking
```

Recuerda mantener el mismo directorio de datos en el archivo de configuración, para que el nodo sepa dónde buscar el filtro de bloom al reiniciar si la poda sin conexión no ha terminado.

Ahora, si tu nodo se reinicia, se marcará como que ha desactivado correctamente la poda sin conexión después de la ejecución y se le permitirá reanudar su operación normal una vez que la poda sin conexión haya terminado de ejecutarse.

Verás registros de progreso a lo largo de la ejecución de la poda sin conexión que indicarán el progreso de la sesión:

```zsh
INFO [02-09|00:31:51.920] Poda de datos de estado                 nodos=40,116,759 tamaño=10.08GiB  transcurrido=8m47.499s eta=12m50.961s
INFO [02-09|00:31:59.921] Poda de datos de estado                 nodos=41,659,059 tamaño=10.47GiB  transcurrido=8m55.499s eta=12m13.822s
INFO [02-09|00:32:07.921] Poda de datos de estado                 nodos=41,687,047 tamaño=10.48GiB  transcurrido=9m3.499s  eta=12m23.915s
INFO [02-09|00:32:15.921] Poda de datos de estado                 nodos=41,715,823 tamaño=10.48GiB  transcurrido=9m11.499s eta=12m33.965s
INFO [02-09|00:32:23.921] Poda de datos de estado                 nodos=41,744,167 tamaño=10.49GiB  transcurrido=9m19.500s eta=12m44.004s
INFO [02-09|00:32:31.921] Poda de datos de estado                 nodos=41,772,613 tamaño=10.50GiB  transcurrido=9m27.500s eta=12m54.01s
INFO [02-09|00:32:39.921] Poda de datos de estado                 nodos=41,801,267 tamaño=10.50GiB  transcurrido=9m35.500s eta=13m3.992s
INFO [02-09|00:32:47.922] Poda de datos de estado                 nodos=41,829,714 tamaño=10.51GiB  transcurrido=9m43.500s eta=13m13.951s
INFO [02-09|00:32:55.922] Poda de datos de estado                 nodos=41,858,400 tamaño=10.52GiB  transcurrido=9m51.501s eta=13m23.885s
INFO [02-09|00:33:03.923] Poda de datos de estado                 nodos=41,887,131 tamaño=10.53GiB  transcurrido=9m59.501s eta=13m33.79s
INFO [02-09|00:33:11.923] Poda de datos de estado                 nodos=41,915,583 tamaño=10.53GiB  transcurrido=10m7.502s eta=13m43.678s
INFO [02-09|00:33:19.924] Poda de datos de estado                 nodos=41,943,891 tamaño=10.54GiB  transcurrido=10m15.502s eta=13m53.551s
INFO [02-09|00:33:27.924] Poda de datos de estado                 nodos=41,972,281 tamaño=10.55GiB  transcurrido=10m23.502s eta=14m3.389s
INFO [02-09|00:33:35.924] Poda de datos de estado                 nodos=42,001,414 tamaño=10.55GiB  transcurrido=10m31.503s eta=14m13.192s
INFO [02-09|00:33:43.925] Poda de datos de estado                 nodos=42,029,987 tamaño=10.56GiB  transcurrido=10m39.504s eta=14m22.976s
INFO [02-09|00:33:51.925] Poda de datos de estado                 nodos=42,777,042 tamaño=10.75GiB  transcurrido=10m47.504s eta=14m7.245s
INFO [02-09|00:34:00.950] Poda de datos de estado                 nodos=42,865,413 tamaño=10.77GiB  transcurrido=10m56.529s eta=14m15.927s
INFO [02-09|00:34:08.956] Poda de datos de estado                 nodos=42,918,719 tamaño=10.79GiB  transcurrido=11m4.534s  eta=14m24.453s
INFO [02-09|00:34:22.816] Poda de datos de estado                 nodos=42,952,925 tamaño=10.79GiB  transcurrido=11m18.394s eta=14m41.243s
INFO [02-09|00:34:30.818] Poda de datos de estado                 nodos=42,998,715 tamaño=10.81GiB  transcurrido=11m26.397s eta=14m49.961s
INFO [02-09|00:34:38.828] Poda de datos de estado                 nodos=43,046,476 tamaño=10.82GiB  transcurrido=11m34.407s eta=14m58.572s
INFO [02-09|00:34:46.893] Poda de datos de estado                 nodos=43,107,656 tamaño=10.83GiB  transcurrido=11m42.472s eta=15m6.729s
INFO [02-09|00:34:55.038] Poda de datos de estado                 nodos=43,168,834 tamaño=10.85GiB  transcurrido=11m50.616s eta=15m14.934s
INFO [02-09|00:35:03.039] Poda de datos de estado                 nodos=43,446,900 tamaño=10.92GiB  transcurrido=11m58.618s eta=15m14.705s
```

Cuando el nodo haya completado, emitirá el siguiente registro y reanudará su operación normal:

```zsh
INFO [02-09|00:35:11.040] Finalizó la poda de datos de estado       transcurrido=12m6.619s
INFO [02-09|00:35:11.040] Filtros de bloom cargados               transcurrido=12m6.619s
INFO [02-09|00:35:11.040] Poda de datos de estado completada      transcurrido=12m6.619s
INFO [02-09|00:35:11.040] Iniciando la red P2P
```

```zsh
INFO [02-09|00:42:16.009] Podando datos de estado                   nodos=93,649,812 tamaño=23.53GiB  transcurrido=19m11.588s eta=1m2.658s
INFO [02-09|00:42:24.009] Podando datos de estado                   nodos=95,045,956 tamaño=23.89GiB  transcurrido=19m19.588s eta=45.149s
INFO [02-09|00:42:32.009] Podando datos de estado                   nodos=96,429,410 tamaño=24.23GiB  transcurrido=19m27.588s eta=28.041s
INFO [02-09|00:42:40.009] Podando datos de estado                   nodos=97,811,804 tamaño=24.58GiB  transcurrido=19m35.588s eta=11.204s
INFO [02-09|00:42:45.359] Datos de estado podados exitosamente      nodos=98,744,430 tamaño=24.82GiB  transcurrido=19m40.938s
INFO [02-09|00:42:45.360] Compactando base de datos                 rango=0x00-0x10 transcurrido="2.157µs"
INFO [02-09|00:43:12.311] Compactando base de datos                 rango=0x10-0x20 transcurrido=26.951s
INFO [02-09|00:43:38.763] Compactando base de datos                 rango=0x20-0x30 transcurrido=53.402s
INFO [02-09|00:44:04.847] Compactando base de datos                 rango=0x30-0x40 transcurrido=1m19.486s
INFO [02-09|00:44:31.194] Compactando base de datos                 rango=0x40-0x50 transcurrido=1m45.834s
INFO [02-09|00:45:31.580] Compactando base de datos                 rango=0x50-0x60 transcurrido=2m46.220s
INFO [02-09|00:45:58.465] Compactando base de datos                 rango=0x60-0x70 transcurrido=3m13.104s
INFO [02-09|00:51:17.593] Compactando base de datos                 rango=0x70-0x80 transcurrido=8m32.233s
INFO [02-09|00:56:19.679] Compactando base de datos                 rango=0x80-0x90 transcurrido=13m34.319s
INFO [02-09|00:56:46.011] Compactando base de datos                 rango=0x90-0xa0 transcurrido=14m0.651s
INFO [02-09|00:57:12.370] Compactando base de datos                 rango=0xa0-0xb0 transcurrido=14m27.010s
INFO [02-09|00:57:38.600] Compactando base de datos                 rango=0xb0-0xc0 transcurrido=14m53.239s
INFO [02-09|00:58:06.311] Compactando base de datos                 rango=0xc0-0xd0 transcurrido=15m20.951s
INFO [02-09|00:58:35.484] Compactando base de datos                 rango=0xd0-0xe0 transcurrido=15m50.123s
INFO [02-09|00:59:05.449] Compactando base de datos                 rango=0xe0-0xf0 transcurrido=16m20.089s
INFO [02-09|00:59:34.365] Compactando base de datos                 rango=0xf0-     transcurrido=16m49.005s
INFO [02-09|00:59:34.367] Compactación de base de datos finalizada  transcurrido=16m49.006s
INFO [02-09|00:59:34.367] Poda de estado exitosa                    podados=24.82GiB transcurrido=39m34.749s
INFO [02-09|00:59:34.367] Poda offline completada. Reinicializando blockchain.
INFO [02-09|00:59:34.387] Cargado el encabezado local más reciente   número=10,671,401 hash=b52d0a..7bd166 edad=40m29s
INFO [02-09|00:59:34.387] Cargado el bloque completo local más reciente número=10,671,401 hash=b52d0a..7bd166 edad=40m29s
INFO [02-09|00:59:34.387] Inicializando instantáneas                asíncrono=true
DEBUG[02-09|00:59:34.390] Reinyectando transacciones obsoletas       cantidad=0
INFO [02-09|00:59:34.395] Umbral de precio del pool de transacciones actualizado precio=470,000,000,000
INFO [02-09|00:59:34.396] Umbral de precio del pool de transacciones actualizado precio=225,000,000,000
INFO [02-09|00:59:34.396] Umbral de precio del pool de transacciones actualizado precio=0
INFO [02-09|00:59:34.396] lastAccepted = 0xb52d0a1302e4055b487c3a0243106b5e13a915c6e178da9f8491cebf017bd166
INFO [02-09|00:59:34] <C Chain> snow/engine/snowman/transitive.go#67: inicializando motor de consenso
INFO [02-09|00:59:34] <C Chain> snow/engine/snowman/bootstrap/bootstrapper.go#220: Iniciando bootstrap...
INFO [02-09|00:59:34] chains/manager.go#246: creando cadena:
    ID: 2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM
    VMID:jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq
INFO [02-09|00:59:34.425] APIs habilitadas: eth, eth-filter, net, web3, internal-eth, internal-blockchain, internal-transaction, avax
DEBUG[02-09|00:59:34.425] Origen(es) permitido(s) para la interfaz RPC de WS [*]
INFO [02-09|00:59:34] api/server/server.go#203: agregando ruta /ext/bc/2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5/avax
INFO [02-09|00:59:34] api/server/server.go#203: agregando ruta /ext/bc/2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5/rpc
INFO [02-09|00:59:34] api/server/server.go#203: agregando ruta /ext/bc/2q9e4r6Mu3U68

En este punto, el nodo entrará en un proceso de arranque y (una vez que el arranque se complete) reanudará el consenso y funcionará con normalidad.

## Consideraciones sobre el espacio en disco

Para asegurar que el nodo no entre en un estado inconsistente, el filtro de bloom utilizado para el recorte se persiste en el directorio de datos de recorte sin conexión (`offline-pruning-data-directory`) durante la duración de la operación. Este directorio debe tener espacio en disco disponible de tamaño `offline-pruning-bloom-filter-size` (por defecto, 512 MB).

La base de datos subyacente (LevelDB) utiliza marcadores de eliminación (tumbas) para identificar claves recién eliminadas. Estos marcadores se persisten temporalmente en disco hasta que se eliminan durante un proceso conocido como compactación. Esto llevará a un aumento en el uso del disco durante el recorte. Si su nodo se queda sin espacio en disco durante el recorte, puede reiniciar de forma segura la operación de recorte. Esto puede tener éxito ya que reiniciar el nodo desencadena la compactación.

Si reiniciar la operación de recorte no tiene éxito, se debe aprovisionar espacio en disco adicional.
```

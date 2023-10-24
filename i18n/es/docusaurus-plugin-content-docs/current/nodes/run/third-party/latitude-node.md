---
tags: [Nodos]
description: Instrucciones detalladas para ejecutar un nodo Avalanche con Latitude.sh
sidebar_label: Latitude
pagination_label: Ejecutar un nodo Avalanche con Latitude.sh
sidebar_position: 3
---

# Ejecutar un nodo Avalanche con Latitude.sh

## Introducción

Este tutorial te guiará a través de la configuración de un nodo Avalanche en [Latitude.sh](https://latitude.sh).
Latitude.sh proporciona servidores bare metal de alto rendimiento para asegurar que tu nodo sea altamente
seguro, disponible y accesible.

Para empezar, necesitarás:

- Una cuenta de Latitude.sh
- Una terminal desde la cual hacer SSH a tu máquina Latitude.sh

Para obtener instrucciones sobre cómo crear una cuenta y un servidor con Lattitude.sh, por favor consulta su
[tutorial en GitHub](https://github.com/NottherealIllest/Latitude.sh-post/blob/main/avalanhe/avax-copy.md)
, o visita [esta página](https://www.latitude.sh/dashboard/signup) para registrarte y crear tu primer proyecto.

Este tutorial asume que tu máquina local tiene una terminal de estilo Unix. Si estás en Windows, tendrás
que adaptar algunos de los comandos utilizados aquí.

## Configurando tu servidor

### Crear una cuenta de Latitude.sh

En este punto, tu cuenta ha sido verificada y has creado un nuevo proyecto y desplegado el
servidor de acuerdo a las instrucciones enlazadas arriba.

### Acceder a tu servidor y pasos adicionales

Todas tus credenciales de Lattitude.sh están disponibles haciendo clic en el `servidor` bajo tu proyecto, y pueden
ser utilizadas para acceder a tu máquina Latitude.sh desde tu máquina local utilizando una terminal.

:::note
Necesitarás instalar el `script de instalación del nodo avalanche` directamente en la terminal del servidor.
:::

Después de obtener acceso, necesitaremos configurar nuestro nodo Avalanche. Para hacer esto, sigue las instrucciones
aquí para instalar y ejecutar tu nodo [Configurar nodo Avalanche con instalador](/nodes/run/with-installer).

Tu nodo AvalancheGo debería estar ahora en funcionamiento y en proceso de bootstrap, lo cual puede llevar algunas
horas. Para comprobar si ha terminado, puedes emitir una llamada de API usando `curl`.
La solicitud es:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Una vez que el nodo haya terminado de bootstrapear, la respuesta será:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "isBootstrapped": true
  },
  "id": 1
}
```

Puedes continuar, incluso si AvalancheGo no ha terminado de bootstrapear.
Para hacer que tu nodo sea un validador, necesitarás su ID de nodo. Para obtenerlo, ejecuta:

```sh
curl -X POST --data '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La respuesta contiene el ID de nodo.

```json
{
  "jsonrpc": "2.0",
  "result": { "nodeID": "KhDnAoZDW8iRJ3F26iQgK5xXVFMPcaYeu" },
  "id": 1
}
```

En el ejemplo anterior, el ID de nodo es `NodeID-KhDnAoZDW8iRJ3F26iQgK5xXVFMPcaYeu`.

AvalancheGo tiene otras APIs, como la [API de Salud](https://docs.avax.network/apis/avalanchego/apis/health),
que se pueden utilizar para interactuar con el nodo. Algunas APIs están desactivadas por defecto. Para habilitar
estas APIs, modifica la sección ExecStart de `/etc/systemd/system/avalanchego.service` (creada durante el
proceso de instalación) para incluir banderas que habiliten estos endpoints. No habilites manualmente ninguna API
a menos que tengas una razón para hacerlo.

Sal del servidor SSH ejecutando:

```sh
exit
```

### Actualizando tu nodo

AvalancheGo es un proyecto en curso y hay actualizaciones regulares de versión. La mayoría de las actualizaciones son
recomendadas pero no requeridas. Se dará aviso previo para las actualizaciones que no sean compatibles con versiones
anteriores. Para actualizar tu nodo a la última versión, haz SSH a tu servidor utilizando una terminal y
ejecuta el script de instalación de nuevo.

```sh
./avalanchego-installer.sh
```

Tu máquina ahora está ejecutando la versión más reciente de AvalancheGo. Para ver el estado del servicio AvalancheGo,
ejecuta `sudo systemctl status avalanchego.`

## Conclusión

¡Eso es todo! Ahora tienes un nodo AvalancheGo ejecutándose en una máquina Latitude.sh. Recomendamos configurar
[monitoreo de nodo](https://docs.avax.network/nodes/maintain/setting-up-node-monitoring) para tu
nodo AvalancheGo.
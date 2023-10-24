---
tags: [Construir, Máquinas Virtuales]
description: Esta es una documentación de alto nivel, independiente del lenguaje, que explica los conceptos básicos de cómo empezar a implementar tu propia máquina virtual desde cero.
sidebar_label: VM Simple en Cualquier Lenguaje
pagination_label: Construir una VM Simple desde Cero
sidebar_position: 0
---

# Cómo Construir una VM Simple desde Cero

Esta es una documentación de alto nivel, independiente del lenguaje, que explica los conceptos básicos de cómo empezar
a implementar tu propia máquina virtual desde cero.

Las máquinas virtuales Avalanche son servidores grpc que implementan las interfaces Proto de Avalanche's
[Proto interfaces](https://buf.build/ava-labs/avalanche). Esto significa que se puede hacer en
[cualquier lenguaje que tenga una implementación grpc](https://grpc.io/docs/languages/).

## Implementación Mínima

Para empezar el proceso, como mínimo, tendrás que implementar las siguientes interfaces:

- [`vm.Runtime`](https://buf.build/ava-labs/avalanche/docs/main:vm.runtime) (Cliente)
- [`vm.VM`](https://buf.build/ava-labs/avalanche/docs/main:vm) (Servidor)

Para construir una blockchain aprovechando el consenso de AvalancheGo para construir bloques, necesitarás
implementar:

- [AppSender](https://buf.build/ava-labs/avalanche/docs/main:appsender) (Cliente)
- [Messenger](https://buf.build/ava-labs/avalanche/docs/main:messenger) (Cliente)

Para tener un punto final json-RPC, `/ext/bc/subnetId/rpc`, expuesto por AvalancheGo, necesitarás
implementar:

- [`Http`](https://buf.build/ava-labs/avalanche/docs/main:http) (Servidor)

Puedes y debes usar una herramienta como `buf` para generar el código (Cliente/Servidor) a partir de las interfaces
como se indica en la página del módulo [Avalanche](https://buf.build/ava-labs/avalanche).

:::note
Hay interfaces de _servidor_ y de _cliente_ que implementar.
AvalancheGo llama a las interfaces de _servidor_ expuestas por tu VM y tu VM llama a las interfaces de _cliente_ expuestas por AvalancheGo.
:::

## Proceso de Inicio

Tu VM se inicia cuando AvalancheGo lanza tu binario. Tu binario se inicia como un subproceso
de AvalancheGo. Al lanzar tu binario, AvalancheGo pasa una variable de entorno
`AVALANCHE_VM_RUNTIME_ENGINE_ADDR` que contiene una URL. Debemos usar esta URL para inicializar un
cliente `vm.Runtime`.

Tu VM, después de haber iniciado un servidor grpc que implementa la interfaz de la VM, debe llamar a
[`vm.Runtime.InitializeRequest`](https://buf.build/ava-labs/avalanche/docs/main:vm.runtime#vm.runtime.InitializeRequest)
con los siguientes parámetros.

- `protocolVersion`: Debe coincidir con la `versión del plugin soportada` de la
  [versión de AvalancheGo](https://github.com/ava-labs/AvalancheGo/releases) que estás usando.
  Siempre está en las notas de la versión.

- `addr`: Es la dirección de tu servidor grpc. Debe estar en el siguiente formato
  `host:puerto` (ejemplo `localhost:12345`)

## Inicialización de la VM

Los métodos de servicio se describen en el mismo orden en que se llaman.
Necesitarás implementar estos métodos en tu servidor.

### Secuencia de Pre-Inicialización

_AvalancheGo inicia/detiene tu proceso varias veces antes de lanzar la inicialización real_

- [VM.Version](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.Version)
  - Retorno: la versión de tu VM.
- [VM.CreateStaticHandler](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.CreateStaticHandlers)
  - Retorno: un arreglo vacío - (No absolutamente necesario).
- [VM.Shutdown](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.Shutdown)
  - Debes detener tu proceso de forma adecuada.
  - Retorno: Vacío

### Secuencia de Inicialización

- [VM.CreateStaticHandlers](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.CreateStaticHandlers)
  - Devuelve un arreglo vacío - (No es absolutamente necesario).
- [VM.Initialize](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.Initialize)
  - Parámetro: una [InitializeRequest](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.InitializeRequest).
  - Debes usar estos datos para inicializar tu VM.
  - Debes agregar el bloque génesis a tu blockchain y establecerlo como el último bloque aceptado.
  - Devolución: una [InitializeResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.InitializeResponse) que contiene datos sobre el génesis extraídos de los `genesis_bytes` que se enviaron en la solicitud.
- [VM.VerifyHeightIndex](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.VerifyHeightIndex)
  - Devolución: una [VerifyHeightIndexResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VerifyHeightIndexResponse) con el código `ERROR_UNSPECIFIED` para indicar que no ha ocurrido ningún error.
- [VM.CreateHandlers](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.CreateHandlers)
  - Para servir el punto final json-RPC, `/ext/bc/subnetId/rpc` expuesto por AvalancheGo.
  - Ver [json-RPC](#json-rpc) para más detalles.
  - Crea un servidor [`Http`](https://buf.build/ava-labs/avalanche/docs/main:http) y obtén su URL.
  - Devolución: una `CreateHandlersResponse` que contiene un solo elemento con la URL del servidor (o un arreglo vacío si no se implementa el punto final json-RPC).
- [VM.StateSyncEnabled](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.StateSyncEnabled)
  - Devolución: `true` si quieres habilitar StateSync, `false` en caso contrario.
- [VM.SetState](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetState)
  _Si habías especificado `true` en el resultado de `StateSyncEnabled`_
  - Parámetro: una [SetStateRequest](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateRequest) con el valor `StateSyncing`.
  - Establece el estado de tu blockchain a `StateSyncing`.
  - Devolución: una [SetStateResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateResponse) construida a partir del bloque génesis.
- [VM.GetOngoingSyncStateSummary](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.GetOngoingSyncStateSummary)
  _Si habías especificado `true` en el resultado de `StateSyncEnabled`_
  - Devolución: una [GetOngoingSyncStateSummaryResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.GetOngoingSyncStateSummaryResponse) construida a partir del bloque génesis.
- [VM.SetState](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetState)
  - Parámetro: una [SetStateRequest](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateRequest) con el valor `Bootstrapping`.
  - Establece el estado de tu blockchain a `Bootstrapping`.
  - Devolución: una [SetStateResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateResponse) construida a partir del bloque génesis.
- [VM.SetPreference](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetPreference)
  - Parámetro: `SetPreferenceRequest` que contiene el ID de bloque preferido.
  - Devolución: Vacío.
- [VM.SetState](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetState)
  - Parámetro: una [SetStateRequest](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateRequest) con el valor `NormalOp`.
  - Establece el estado de tu blockchain a `NormalOp`.
  - Devolución: una [SetStateResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateResponse) construida a partir del bloque génesis.
- [VM.Connected](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.Connected)
  (para cada otro nodo que valida esta Subnet en la red)
  - Parámetro: una [ConnectedRequest](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.ConnectedRequest) con el NodeID y la versión de AvalancheGo.
  - Devolución: Vacío.
- [VM.Health](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.Health)
  - Parámetro: Vacío.
  - Devolución: una [HealthResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.HealthResponse) con una propiedad `details` vacía.
- [VM.ParseBlock](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.ParseBlock)
  - Parámetro: Un arreglo de bytes que contiene un Bloque (el bloque génesis en este caso).
  - Devolución: una [ParseBlockResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.ParseBlockResponse) construida a partir del último bloque aceptado.

En este punto, tu VM está completamente iniciada e inicializada.

### Construyendo Bloques

#### Secuencia de Gossiping de Transacciones

Cuando tu VM recibe transacciones (por ejemplo, usando los puntos finales json-RPC), puede hacer gossip de ellas a los otros nodos usando el servicio [AppSender](https://buf.build/ava-labs/avalanche/docs/main:appsender).

Supongamos que tenemos una red de 3 nodos con nodeX, nodeY, nodeZ.

NodeX ha recibido una nueva transacción en su punto final json-RPC:
_en nodeX_

- [`AppSender.SendAppGossip`](https://buf.build/ava-labs/avalanche/docs/main:appsender#appsender.AppSender.SendAppGossip)
  (cliente)
  - Debes serializar los datos de tu transacción en un arreglo de bytes y llamar al método `SendAppGossip` para propagar la transacción.

AvalancheGo luego propaga esto a los otros nodos.

_en nodeY y nodeZ_

- [VM.AppGossip](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.AppGossip)
  - Parámetro: Un arreglo de bytes que contiene los datos de tu transacción y el NodeID del nodo que envió el mensaje de gossip.
  - Debes deserializar la transacción y almacenarla para el próximo bloque.
  - Devolución: Vacío

#### Secuencia de Construcción de Bloques

Cuando tu VM está lista para construir un nuevo bloque, iniciará el proceso de construcción de bloques usando el servicio [Messenger](https://buf.build/ava-labs/avalanche/docs/main:messenger).
Supongamos que nodeY quiere construir el bloque. _probablemente implementarás algún tipo de trabajador en segundo plano que verifica cada segundo si hay transacciones pendientes_:

_en nodeY_

- _cliente_
  [`Messenger.Notify`](https://buf.build/ava-labs/avalanche/docs/main:messenger#messenger.Messenger.Notify)
  - Debes enviar una solicitud de notificación a AvalancheGo llamando al método con el valor `MESSAGE_BUILD_BLOCK`.

_en nodeY_

- [VM.BuildBlock](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BuildBlock)
  - Parámetro: Vacío
  - Debes construir un bloque con tus transacciones pendientes. Sérialo a un arreglo de bytes.
  - Almacena este bloque en memoria como "bloques pendientes".
  - Retorno: una [BuildBlockResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.BuildBlockResponse) del bloque recién construido y sus datos asociados (`id`, `parent_id`, `height`, `timestamp`).
- [VM.BlockVerify](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockVerify)
  - Parámetro: El arreglo de bytes que contiene los datos del bloque
  - Retorno: la marca de tiempo del bloque
- [VM.SetPreference](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetPreference)
  - Parámetro: La ID del bloque
  - Debes marcar este bloque como el siguiente bloque preferido.
  - Retorno: Vacío

_en el nodoX y el nodoZ_

- [VM.ParseBlock](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.ParseBlock)
  - Parámetro: Un arreglo de bytes que contiene los datos del bloque recién construido
  - Almacena este bloque en memoria como "bloques pendientes".
  - Retorno: una [ParseBlockResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.ParseBlockResponse) construida a partir del último bloque aceptado.
- [VM.BlockVerify](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockVerify)
  - Parámetro: El arreglo de bytes que contiene los datos del bloque
  - Retorno: la marca de tiempo del bloque
- [VM.SetPreference](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetPreference)
  - Parámetro: La ID del bloque
  - Debes marcar este bloque como el siguiente bloque preferido.
  - Retorno: Vacío

_en todos los nodos_

- [VM.BlockAccept](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockAccept)
  - Parámetro: La ID del bloque
  - Debes aceptar este bloque como tu último bloque final.
  - Retorno: Vacío

#### Manejando Conflictos

Los conflictos ocurren cuando dos o más nodos proponen el siguiente bloque al mismo tiempo.
AvalancheGo se encarga de esto y decide qué bloque debe considerarse final, y qué bloques deben ser rechazados usando el consenso Snowman.
En el lado de la VM, todo lo que hay que hacer es implementar los métodos `VM.BlockAccept` y `VM.BlockReject`.

_el nodoX propone el bloque `0x123...`, el nodoY propone el bloque `0x321...` y el nodoZ propone el bloque `0x456`_

Hay tres bloques en conflicto (hashes diferentes), y si miramos los archivos de registro de nuestra VM, podemos ver que AvalancheGo usa Snowman para decidir qué bloque debe ser aceptado.

```log
...
... snowman/voter.go:58 filtrando resultados de la votación ...
... snowman/voter.go:65 finalizando votación ...
... snowman/voter.go:87 el motor Snowman no puede quedar en reposo
...
... snowman/voter.go:58 filtrando resultados de la votación ...
... snowman/voter.go:65 finalizando votación ...
... snowman/topological.go:600 aceptando bloque
...
```

Suponiendo que AvalancheGo acepta el bloque `0x123...`. Los siguientes métodos RPC se llaman en todos los nodos:

- [VM.BlockAccept](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockAccept)
  - Parámetro: La ID del bloque (`0x123...`)
  - Debes aceptar este bloque como tu último bloque final.
  - Retorno: Vacío
- [VM.BlockReject](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockReject)
  - Parámetro: La ID del bloque (`0x321...`)
  - Debes marcar este bloque como rechazado.
  - Retorno: Vacío
- [VM.BlockReject](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockReject)
  - Parámetro: La ID del bloque (`0x456...`)
  - Debes marcar este bloque como rechazado.
  - Retorno: Vacío

### json-RPC

Para habilitar tu punto de conexión json-RPC, debes implementar el método HandleSimple de la interfaz [`Http`](https://buf.build/ava-labs/avalanche/docs/main:http).

- [`Http.HandleSimple`](https://buf.build/ava-labs/avalanche/docs/main:http#http.HTTP.HandleSimple)

  - Parámetro: un [HandleSimpleHTTPRequest](https://buf.build/ava-labs/avalanche/docs/main:http#http.HandleSimpleHTTPRequest) que contiene el método, la URL, las cabeceras y el cuerpo de la solicitud original.
  - Analiza, deserializa y maneja la solicitud

    _por ejemplo, si la solicitud representa una transacción, debemos deserializarla, verificar la firma, almacenarla y difundirla a los otros nodos usando el cliente de mensajería (ver [secuencia de construcción de bloques](#secuencia-de-construcción-de-bloques))_

  - Retorna la respuesta [HandleSimpleHTTPResponse](https://buf.build/ava-labs/avalanche/docs/main:http#http.HandleSimpleHTTPResponse) que se enviará de vuelta al remitente original.

Este servidor se registra con AvalancheGo durante el proceso de inicialización cuando se llama al método `VM.CreateHandlers`.
Simplemente debes responder con la URL del servidor en el resultado `CreateHandlersResponse`.

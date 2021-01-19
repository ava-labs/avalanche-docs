# AvalancheJS

AvalancheJS es una biblioteca de JavaScript para interactuar con la plataforma [Avalanche](../../../#avalanche). Está construida usando TypeScript y está pensada para soportar tanto el navegador como Node.js. La biblioteca AvalancheJS permite emitir comandos a las API del nodo Avalanche.


Las APIs actualmente soportadas por defecto son:

* API de Administración
* API de la AVM \(X-Chain\)
* API de Salud
* API de Información 
* API del Keystore 
* API de Métricas
* API de PlatformVM

Construimos AvalancheJS pensando en la facilidad de uso. Con esta biblioteca, cualquier desarrollador de Javascript puede interactuar con un nodo de la plataforma de Avalanche que haya habilitado sus puntos finales de la API para el consumo del desarrollador. Mantenemos la biblioteca actualizada con los últimos cambios en la [Especificación de la Plataforma de Avalanche](https://docs.avax.network/).

Usando AvalancheJS, los desarrolladores pueden:

* Administrar localmente las private keys
* Recuperar los saldos de las direcciones
* Consigue UTXOs para las direcciones
* Construir y firmar transacciones
* Emitir transacciones firmadas a la X-Chain
* Crear una subnet
* Administrar un nodo local
* Recuperar la información de la red de Avalanche de un nodo

## Requisitos

AvalancheJS requiere Node.js LTS versión 12.14.1 o superior para compilar.

## Instalación

Avalanche está disponible para su instalación a través de `npm`:

`npm install --save avalanche`

You can also pull the repo down directly and build it from scratch:

`npm run build`

This will generate a pure Javascript library and place it in a folder named “web” in the project root. The “avalanchejs” file can then be dropped into any project as a pure javascript implementation of Avalanche.

The AvalancheJS library can be imported into your existing Node.js project as follows:

```text
const avalanche = require("avalanche");
```

Or into your TypeScript project like this:

```text
import { Avalanche } from "avalanche"
```

## Importing essentials

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();
```

The above lines import the libraries used in the tutorials. The libraries include:

* avalanche: Our javascript module.
* bn.js: A bignumber module use by AvalancheJS.
* buffer: A Buffer library.
* BinTools: A singleton built into AvalancheJS that is used for dealing with binary data.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk5MDc3NjUzMCwtODQ1MTQ1NDRdfQ==
-->
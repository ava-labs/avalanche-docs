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

También puedes extraerlo del repositorio directamente y construirlo desde cero:

`npm run build`


Esto generará una biblioteca de Javascript pura y la colocará en una carpeta llamada "web" en la raíz del proyecto. El archivo "avalanchejs" puede entonces ser soltado en cualquier proyecto como una implementación de Javascript pura de Avalanche.

La biblioteca AvalancheJS puede ser importada en su proyecto Node.js existente de la siguiente manera:

```text
const avalanche = require("avalanche");
```

O en tu proyecto de TypeScript como este:

```text
import { Avalanche } from "avalanche"
```

## Importando los esenciales

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();
```


Las líneas anteriores importan las bibliotecas utilizadas en los tutoriales. Las bibliotecas incluyen:

* avalanche: Nuestro módulo javascript.
* bn.js: Un módulo bignumber usado por AvalancheJS.
* buffer: Una biblioteca de Buffer.
* BinTools: Un módulo integrado en AvalancheJS que se usa para tratar datos binarios.

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTkzNjc3OTI4MCwtODQ1MTQ1NDRdfQ==
-->
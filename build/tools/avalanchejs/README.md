# AvalancheJS

[AvalanchejS](../../../#avalanche) es una Biblioteca JavaScript para el interconexión con la plataforma Avalanche. Se construye utilizando TypeScript y se pretende apoyar tanto el navegador como Node.js. La biblioteca AvalanchejS permite que uno emita comandos a las API de nodo Avalanche.

Las API actualmente compatibles con predeterminada son:

* API de administración
* API Auth
* API AVM \(X-Chain\)
* EVM API \(C-Chain\)
* API de salud
* Info API
* API de Keystore
* API de Metrics
* PlatformVM API

Construimos AvalanchejS con facilidad de uso en mente. Con esta biblioteca, cualquier desarrollador de Javascript puede interactuar con un nodo en la plataforma Avalanche que ha permitido sus puntos de acceso API para el consumo del desarrollador. Mantendremos la biblioteca al día con los últimos cambios en la [especificación de plataforma de Avalanche](https://docs.avax.network).

Utilizando AvalancheJS, los desarrolladores pueden:

* Administrar las teclas privadas localmente
* Recuperar los saldos en las direcciones
* Obtén UTXOS para direcciones
* Construir y firmar transacciones
* Emitir transacciones firmadas a la cadena X-Chain, P-Chain y C-Chain en la red primaria
* Crear una subred
* Intercambiar AVAX y activos entre la cadena X-Chain, la cadena P y la cadena C
* Añadir un Validador a la red primaria
* Añada un Delegado a la red primaria
* Administrar un nodo local
* Recuperar la información de la red Avalanche desde un nodo

## Requisitos para requisitos de seguridad

AvalanchejS requiere que Node.js versión 12.14.1 o superior se compile.

## Instalación de instalaciones

Avalanche está disponible para instalar a través de la `npm`:

`npm instale --save avalancha`

También puede tirar del repo directamente hacia abajo y construirlo desde cero:

`npm ejecutar construir`

Esto generará una biblioteca de Javascript pura y la colocará en una carpeta llamada "web" en la raíz del proyecto. El archivo "avalanchejs" puede entonces ser lanzado en cualquier proyecto como una implementación pura de javascript de Avalanche.

La biblioteca AvalanchejS puede importarse en su proyecto Node.js existente:

```text
const avalanche = require("avalanche");
```

O en su proyecto TypeScript así:

```text
import { Avalanche } from "avalanche"
```

## Importar elementos esenciales

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
* bn.js: Uso de módulo de gran número por AvalancheJS.
* Una biblioteca de buffer.
* BinTools: Un singleton incorporado en AvalanchejS que se utiliza para tratar con datos binarios.


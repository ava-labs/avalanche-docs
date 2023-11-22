---
tags: [Construir, Subnets]
description: Puedes personalizar las Subnets  basadas en Subnet-EVM después de su implementación habilitando y deshabilitando precompilaciones.
sidebar_label: Configuración de precompilación de Subnets
pagination_label: Actualiza la configuración de precompilación de tu Subnet-EVM
sidebar_position: 3
---

# Cómo actualizar la configuración de precompilación de tu Subnet-EVM

## Actualizando una Subnet

Puedes personalizar las Subnets basadas en Subnet-EVM después de su implementación habilitando y deshabilitando precompilaciones.
Para hacer esto, crea un archivo `upgrade.json` y colócalo en el directorio correspondiente.

Este documento describe cómo realizar dichas actualizaciones de red. Es específico para las actualizaciones de Subnet-EVM.

El documento [Actualizar una Subnet](/build/subnet/upgrade/considerations-subnet-upgrade.md)
describe toda la información de fondo requerida con respecto a las actualizaciones de Subnet.

:::warning

Es muy importante que hayas leído y comprendido el documento previamente enlazado.
No hacerlo puede potencialmente paralizar tu red.

:::

Este tutorial asume que ya has
[instalado](/tooling/cli-guides/install-avalanche-cli.md) Avalanche-CLI.
Asume que ya has creado e implementado una Subnet llamada `testSubnet`.

## Genera el archivo de actualización

La documentación de
[Precompilaciones](/build/subnet/upgrade/customize-a-subnet.md#network-upgrades-enabledisable-precompiles)
describe qué archivos requiere la actualización de red y dónde colocarlos.

Para generar un archivo `upgrade.json` válido, ejecuta:

```shell
avalanche subnet upgrade generate testSubnet
```

Si aún no has creado `testSubnet`, verás este resultado:

```shell
avalanche subnet upgrade generate testSubnet
El nombre de Subnet  proporcionado "testSubnet" no existe
```

Nuevamente, no tiene sentido intentar el comando de actualización si la Subnet no existe.
Si ese es el caso, por favor continúa y
[crea](/build/subnet/hello-subnet.md) la Subnet primero.

Si la definición de la Subnet existe, la herramienta inicia un asistente.
Puede parecer un poco redundante, pero primero ves algunas advertencias, para enfocar la atención en los peligros involucrados:

```shell
avalanche subnet upgrade generate testSubnet
Realizar una actualización de red requiere coordinar la actualización en toda la red.
Una actualización de red cambia el conjunto de reglas utilizado para procesar y verificar bloques, de modo que cualquier nodo que
se actualice incorrectamente o no se actualice a tiempo para que la actualización entre en efecto puede quedar
fuera de sincronía con el resto de la red.

Cualquier error en la configuración de las actualizaciones de red o en su coordinación en validadores puede hacer que la
red se detenga y la recuperación pueda ser difícil.
Por favor, consulta
https://docs.avax.network/subnets/customize-a-subnet#network-upgrades-enabledisable-precompiles
para obtener más información
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Presiona [Enter] para continuar, o aborta eligiendo 'no':
  ▸ Sí
    No
```

Continúa y selecciona `Sí` si entiendes todo y estás de acuerdo.

Ves una última nota, antes de que comience el asistente de configuración real:

```shell
Avalanchego y esta herramienta admiten configurar múltiples precompilaciones.
Sin embargo, sugerimos configurar solo una por actualización.

Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Selecciona la precompilación a configurar:
  ▸ Lista de permitidos de despliegue de contratos
    Configurar ajustes de tarifa
    Acuñación nativa
    Lista de permitidos de transacciones
```

Consulta [Precompilaciones](/build/subnet/upgrade/customize-a-subnet.md#precompiles)
para obtener una descripción de las precompilaciones disponibles y cómo configurarlas.

Asegúrate de entender completamente las precompilaciones y cómo configurarlas antes de
intentar continuar.

Para cada precompilación en la lista, el asistente te guía para proporcionar información correcta
mediante preguntas relevantes.
Para este tutorial, selecciona `Lista de permitidos de transacciones`.
El documento
[Restringir quién puede enviar transacciones](/build/subnet/upgrade/customize-a-subnet.md#restricting-who-can-submit-transactions)
describe de qué se trata esta precompilación.

```shell
✔ Lista de permitidos de transacciones
Establece parámetros para la precompilación "Configurar ajustes de tarifa"
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Cuándo se debe activar la precompilación?:
  ▸ En 5 minutos
    En 1 día
    En 1 semana
    En 2 semanas
    Personalizado
```

Esto es en realidad común a todas las precompilaciones: requieren una marca de tiempo de activación.
Si lo piensas, tiene sentido: quieres una activación sincronizada de tu precompilación.
Así que piensa por un momento en cuándo quieres establecer la marca de tiempo de activación.
Puedes seleccionar uno de los tiempos sugeridos en el futuro, o puedes elegir uno personalizado.
Después de seleccionar `Personalizado`, muestra el siguiente mensaje:

```shell
✔ Personalizado
✗ Ingresa la fecha y hora de activación del bloque en formato UTC 'YYYY-MM-DD HH:MM:SS':
```

El formato es `YYYY-MM-DD HH:MM:SS`, por lo tanto, `2023-03-31 14:00:00` sería una marca de tiempo válida.
Observa que la marca de tiempo está en UTC.
Asegúrate de haber convertido la hora de tu zona horaria a UTC.
También observa el `✗` al principio de la línea. La herramienta CLI realiza validación de entrada, por lo que si
proporcionas una marca de tiempo válida, la `x` desaparece:

```shell
✔ Ingresa la fecha y hora de activación del bloque en formato UTC 'YYYY-MM-DD HH:MM:SS': 2023-03-31 14:00:00
```

La marca de tiempo debe estar en el **futuro**, así que asegúrate de usar una marca de tiempo así
si estás realizando este tutorial después de `2023-03-31 14:00:00` ;-) .

Después de proporcionar la marca de tiempo válida, continúa con las configuraciones específicas de la precompilación:

```shell
La hora de activación del bloque elegida es 2023-03-31 14:00:00
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Agregar 'adminAddresses'?:
  ▸ Sí
    No
```

Esto permitirá que las direcciones agregadas en esta sección agreguen otros administradores y/o
agreguen direcciones habilitadas para emisión de transacciones.
Las direcciones proporcionadas en este tutorial son falsas.

:::caution

Sin embargo, asegúrate de que tú o alguien en quien confíes tenga control total sobre las direcciones.
De lo contrario, podrías detener tu Subnet.

:::

```shell
✔ Sí
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Proporciona 'adminAddresses':
  ▸ Agregar
    Eliminar
    Vista previa
    Más información
↓   Hecho
```

La solicitud se ejecuta con un patrón utilizado en toda la herramienta:

- Selecciona una operación:
  - `Agregar`: agrega una nueva dirección a la lista actual
  - `Eliminar`: elimina una dirección de la lista actual
  - `Vista previa`: imprime la lista actual
- `Más información` imprime información adicional para una mejor orientación, si está disponible
- Selecciona `Hecho` cuando hayas completado la lista

Continúa y agrega tu primera dirección:

```shell
✔ Agregar
✔ Agrega una dirección: 0xaaaabbbbccccddddeeeeffff1111222233334444
```

Agrega otra:

```shell
✔ Agregar
Agrega una dirección: 0xaaaabbbbccccddddeeeeffff1111222233334444
✔ Agregar
✔ Agrega una dirección: 0x1111222233334444aaaabbbbccccddddeeeeffff
```

Selecciona `Vista previa` esta vez para confirmar que la lista es correcta:

```shell
✔ Vista previa
0. 0xaaaAbbBBCccCDDddEeEEFFfF1111222233334444
1. 0x1111222233334444aAaAbbBBCCCCDdDDeEeEffff
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Proporciona 'adminAddresses':
  ▸ Agregar
    Eliminar
    Vista previa
    Más información
↓   Hecho
```

Si se ve bien, selecciona `Hecho` para continuar:

```shell
✔ Hecho
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Agregar 'enabledAddresses'?:
  ▸ Sí
    No
```

Agrega una de esas direcciones habilitadas, que son direcciones que pueden emitir transacciones:

```shell
✔ Agregar
✔ Agregar una dirección: 0x55554444333322221111eeeeaaaabbbbccccdddd█
```

Después de agregar esta dirección y seleccionar `Hecho`, la herramienta pregunta si quieres agregar otro precompilado:

```shell
✔ Hecho
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Deberíamos configurar otro precompilado?:
  ▸ No
    Sí
```

Si necesitaras agregar otro, seleccionarías `Sí` aquí. El asistente te guiaría a través de los otros precompilados disponibles, excluyendo los que ya están configurados.

Para evitar que este tutorial sea demasiado largo, se asume que has terminado aquí. Selecciona `No`, lo que finaliza el asistente.

Esto significa que has terminado con éxito la generación del archivo de actualización, a menudo llamado bytes de actualización. La herramienta los almacena internamente.

:::warning

No debes mover los archivos manualmente. Usa los comandos `export` e `import` para acceder a los archivos.

:::

Entonces, en este punto puedes hacer una de las siguientes cosas:

- Desplegar tus bytes de actualización localmente
- Exportar tus bytes de actualización a un archivo, para instalarlos en un validador que se ejecuta en otra máquina
- Importar un archivo en una máquina diferente que ejecuta Avalanche-CLI

## Cómo Actualizar una Red Local

El caso de uso normal para esta operación es que:

- Ya has creado una Subnet
- Ya has desplegado la Subnet localmente
- Ya has generado el archivo de actualización con el comando anterior o lo has importado a la herramienta
- Esta herramienta ya ha iniciado la red

Si no se cumplen los requisitos anteriores, el comando de actualización de red falla.

Por lo tanto, para aplicar tu configuración de actualización generada o importada:

```shell
avalanche subnet upgrade apply testSubnet
```

Se ejecutan una serie de comprobaciones. Por ejemplo, si creaste la Subnet pero no la desplegaste localmente:

```shell
avalanche subnet upgrade apply testSubnet
Error: no hay un objetivo de despliegue disponible
Uso:
  avalanche subnet upgrade apply [nombreSubnet] [flags]

Banderas:
      --avalanchego-chain-config-dir string   directorio del archivo de configuración de la cadena de avalanchego (por defecto "/home/fabio/.avalanchego/chains")
      --config                                crear configuración de actualización para despliegues futuros de la subnet (igual que generar)
      --fuji fuji                             aplicar actualización a un despliegue fuji existente (alias de `testnet`)
  -h, --help                                  ayuda para aplicar
      --local local                           aplicar actualización a un despliegue local existente
      --mainnet mainnet                       aplicar actualización a un despliegue mainnet existente
      --print                                 si es verdadero, imprime la configuración manual sin solicitarla (solo para redes públicas)
      --testnet testnet                       aplicar actualización a un despliegue testnet existente (alias de `fuji`)

Banderas globales:
      --log-level string   nivel de registro para la aplicación (por defecto "ERROR")
```

Adelante y [despliega](/build/subnet/deploy/local-subnet.md)
primero tu Subnet si ese es tu caso.

Si ya habías desplegado la Subnet en su lugar, verás algo como esto:

```shell
avalanche subnet upgrade apply testSubnet
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Qué despliegue quieres actualizar:
  ▸ Despliegue local existente
```

Selecciona `Despliegue local existente`. Esto instala el archivo de actualización en todos los nodos de tu red local que se ejecutan en segundo plano.

Et voilà. Este es el resultado que se muestra si todo salió bien:

```shell
✔ Despliegue local existente
.......
Red reiniciada y lista para usar. Los bytes de actualización se han aplicado a los nodos en ejecución en estos puntos finales.
La próxima actualización entrará en efecto el 2023-03-31 09:00:00
+-------+------------+-----------------------------------------------------------------------------------+
| NODO  |     VM     |                                        URL                                        |
+-------+------------+-----------------------------------------------------------------------------------+
| nodo1 | testSubnet | http://0.0.0.0:9650/ext/bc/2YTRV2roEhgvwJz7D7vr33hUZscpaZgcYgUTjeMK9KH99NFnsH/rpc |
+-------+------------+-----------------------------------------------------------------------------------+
| nodo2 | testSubnet | http://0.0.0.0:9652/ext/bc/2YTRV2roEhgvwJz7D7vr33hUZscpaZgcYgUTjeMK9KH99NFnsH/rpc |
+-------+------------+-----------------------------------------------------------------------------------+
| nodo3 | testSubnet | http://0.0.0.0:9654/ext/bc/2YTRV2roEhgvwJz7D7vr33hUZscpaZgcYgUTjeMK9KH99NFnsH/rpc |
+-------+------------+-----------------------------------------------------------------------------------+
| nodo4 | testSubnet | http://0.0.0.0:9656/ext/bc/2YTRV2roEhgvwJz7D7vr33hUZscpaZgcYgUTjeMK9KH99NFnsH/rpc |
+-------+------------+-----------------------------------------------------------------------------------+
| nodo5 | testSubnet | http://0.0.0.0:9658/ext/bc/2YTRV2roEhgvwJz7D7vr33hUZscpaZgcYgUTjeMK9KH99NFnsH/rpc |
+-------+------------+-----------------------------------------------------------------------------------+
```

Hay un límite de lo que la herramienta puede hacer aquí por ti.
Instaló los bytes de actualización _tal como están_ como los configuraste o proporcionaste a la herramienta.
Debes verificar por ti mismo que las actualizaciones se hayan instalado correctamente,
por ejemplo, emitiendo algunas transacciones - ¡ten en cuenta la marca de tiempo!.

## Aplicar la Actualización a un Nodo Público (Fuji o Mainnet)

Para que este escenario funcione, también debes haber desplegado la Subnet
en la red pública (Fuji o Mainnet) con esta herramienta.
De lo contrario, la herramienta no conocerá los detalles de la Subnet y no podrá guiarte.

Suponiendo que la Subnet ya ha sido desplegada en Fuji, al ejecutar el comando `apply`,
la herramienta detecta el despliegue:

```shell
avalanche subnet upgrade apply testSubnet
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Qué despliegue quieres actualizar:
    Despliegue local existente
  ▸ Fuji
```

Si no, no encontrarías la entrada `Fuji` aquí.

:::important

Este escenario asume que estás ejecutando el validador `fuji` en la misma máquina
que está ejecutando Avalanche-CLI.

:::

Si este es el caso, la herramienta intenta instalar el archivo de actualización en el destino esperado.
Si usas las rutas por defecto, intenta instalar en `$HOME/.avalanchego/chains/`, creando el directorio de la
identificación de la cadena,
para que el archivo finalmente termine en `$HOME/.avalanchego/chains/<id-de-cadena>/upgrade.json`.

Si _no_ estás utilizando rutas predeterminadas, puedes configurar la ruta proporcionando la bandera `--avalanchego-chain-config-dir` a la herramienta.
Por ejemplo:

```shell
avalanche subnet upgrade apply testSubnet --avalanchego-chain-config-dir /ruta/hacia/tus/cadenas
```

Asegúrate de identificar correctamente dónde se encuentra tu directorio de configuración de cadenas, o el nodo podría no encontrarlo.

Si todo es correcto, el archivo se instala:

```shell
avalanche subnet upgrade apply testSubnet
✔ Fuji
El directorio de configuración de cadenas que avalanchego utiliza está configurado en /home/fabio/.avalanchego/chains
Intentando instalar los archivos de actualización en la ruta proporcionada /home/fabio/.avalanchego/chains
Archivo de actualización instalado correctamente
```

Sin embargo, si el nodo _no_ se está ejecutando en la misma máquina donde estás ejecutando Avalanche-CLI, no tiene sentido ejecutar este comando para un nodo Fuji.
En este caso, es posible que prefieras exportar el archivo e instalarlo en la ubicación correcta.

Para ver las instrucciones sobre cómo hacer esto, agrega la bandera `--print`:

```shell
avalanche subnet upgrade apply testSubnet --print
✔ Fuji
Para instalar el archivo de actualización en tu validador:

1. Identifica dónde tiene configurado el directorio de configuración de cadenas el validador.
   El valor predeterminado es $HOME/.avalanchego/chains (/home/user/.avalanchego/chains en esta máquina).
   Si estás utilizando un directorio de configuración de cadenas diferente para tu nodo, utiliza ese.
2. Crea un directorio con el blockchainID en el directorio de configuración de cadenas configurado (por ejemplo, $HOME/.avalanchego/chains/ExDKhjXqiVg7s35p8YJ56CJpcw6nJgcGCCE7DbQ4oBknZ1qXi) si aún no existe.
3. Crea un archivo `upgrade.json` en el directorio del blockchain con el contenido de tu archivo de actualización.
   Este es el contenido de tu archivo de actualización como se configura en esta herramienta:
{
    "precompileUpgrades": [
        {
            "txAllowListConfig": {
                "adminAddresses": [
                    "0xb3d82b1367d362de99ab59a658165aff520cbd4d"
                ],
                "enabledAddresses": null,
                "blockTimestamp": 1677550447
            }
        }
    ]
}

   ******************************************************************************************************************
   * Las actualizaciones son complicadas. La corrección sintáctica del archivo de actualización es importante.       *
   * La secuencia de actualizaciones debe observarse estrictamente.                                                  *
   * Asegúrate de entender https://docs.avax.network/nodes/configure/chain-config-flags.md#subnet-chain-configs     *
   * antes de aplicar actualizaciones manualmente.                                                                   *
   ******************************************************************************************************************
```

Las instrucciones también muestran el contenido de tu archivo de actualización actual, por lo que puedes simplemente seleccionarlo si lo deseas.
O incluso exportar el archivo.

## Exportar el Archivo de Actualización

Si has generado el archivo de actualización, puedes exportarlo:

```shell
avalanche subnet upgrade export testSubnet
✔ Proporciona una ruta donde debemos exportar el archivo: /tmp/testSubnet-upgrade.json
```

Simplemente proporciona una ruta válida cuando se te solicite, y la herramienta exportará el archivo allí.

```shell
avalanche subnet upgrade export testSubnet
Proporciona una ruta donde debemos exportar el archivo: /tmp/testSubnet-upgrade.json
Escribiendo el archivo de bytes de actualización en "/tmp/testSubnet-upgrade.json"...
Archivo escrito exitosamente.
```

Ahora puedes tomar ese archivo y copiarlo a los nodos validadores, consulta las instrucciones anteriores.

## Importar el Archivo de Actualización

Tú o alguien más podría haber generado el archivo en otro lugar, o en otra máquina.
Y ahora quieres instalarlo en la máquina validadora, utilizando Avalanche-CLI.

Puedes importar el archivo:

```shell
avalanche subnet upgrade import testSubnet
Proporciona la ruta al archivo de actualización para importar: /tmp/testSubnet-upgrade.json
```

Un archivo existente con la misma ruta y nombre de archivo sería sobrescrito.

Después de haber importado el archivo, puedes `aplicarlo` ya sea a una red local o a un validador en ejecución local. Sigue las instrucciones para el caso de uso apropiado.

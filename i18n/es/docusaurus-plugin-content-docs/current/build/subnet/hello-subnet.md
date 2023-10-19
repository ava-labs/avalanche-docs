---
etiquetas: [Construir, Subredes]
descripción: Este tutorial te guía a través del proceso de usar Avalanche-CLI para crear una Subred, desplegarla en una red local y conectarte a ella con la billetera Core.
sidebar_label: Construye tu primera Subred
pagination_label: Construye tu primera Subred
---

# Construye tu primera Subred

Este tutorial te guía a través del proceso de usar Avalanche-CLI para crear una Subred,
desplegarla en una red local y conectarte a ella con la billetera Core.

El primer paso para aprender el desarrollo de Subredes es aprender a usar [Avalanche-CLI](https://github.com/ava-labs/avalanche-cli).

## Instalación

La forma más rápida de instalar el último binario de Avalanche-CLI es ejecutando el script de instalación:

```shell
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

El binario se instala dentro del directorio `~/bin`. Si el directorio no existe,
se creará.

Puedes ejecutar todos los comandos de este tutorial llamando a `~/bin/avalanche`.

También puedes agregar el comando a tu ruta del sistema ejecutando

```shell
export PATH=~/bin:$PATH
```

Si lo agregas a tu ruta, deberías poder llamar al programa en cualquier lugar con solo `avalanche`.
Para agregarlo permanentemente a tu ruta, agrega un comando de exportación a tu script de inicialización de la shell
(por ejemplo, .bashrc o .zshrc).

Para obtener instrucciones de instalación más detalladas, consulta [Instalación de Avalanche-CLI](/tooling/cli-guides/install-avalanche-cli.md)

## Crea la configuración de tu Subred

Este tutorial te enseña cómo crear una Subred basada en la Máquina Virtual Ethereum (EVM). Para hacerlo,
usas Subnet-EVM, la bifurcación de la EVM de Avalanche para Subredes. Soporta airdrops, tokens de tarifa personalizados,
parámetros de gas configurables y precompilaciones estatales múltiples. Para obtener más información, echa un vistazo a
[Subnet-EVM](https://github.com/ava-labs/subnet-evm). El objetivo de tu primer comando es crear
una configuración de Subred-EVM.

La suite de comandos de Subred proporciona una colección de herramientas para desarrollar y desplegar Subredes.

El Asistente de Creación de Subredes te guía a través del proceso de crear tu Subred. Para empezar,
elige un nombre para tu Subred. Este tutorial usa `miSubred`, pero siéntete libre de sustituirlo
por cualquier nombre que te guste. Una vez que hayas elegido tu nombre, ejecuta

`avalanche subnet create miSubred`

Las siguientes secciones explican cada pregunta en el asistente.

### Elige tu VM

Selecciona `SubnetEVM`.

### Ingresa el ChainID de tu Subred

Elige un entero positivo para tu ChainID de estilo EVM.

En entornos de producción, este ChainID necesita ser único y no compartido con ninguna otra cadena.
Puedes visitar [chainlist](https://chainlist.org/) para verificar que tu selección sea única.
Como esta es una Subred de desarrollo, siéntete libre de elegir cualquier número. Evita los
ChainIDs conocidos como 1 (Ethereum) o 43114 (Avalanche C-Chain) ya que pueden causar problemas con otras
herramientas.

### Símbolo del Token

Ingresa una cadena para nombrar el token nativo de tu Subred. El símbolo del token no necesariamente necesita ser único.
Ejemplos de símbolos de tokens son AVAX, JOE y BTC.

### Versión de Subnet-EVM

Selecciona `Usar la última versión`.

### Configuración de Tarifa de Gas

Esta pregunta determina cómo establecer las tarifas de gas en tu Subred.

Selecciona `Bajo uso de disco / Baja capacidad 1.5 mil gas/s (configuración de C-Chain)`.

### Airdrop

Selecciona `Airdrop de 1 millón de tokens a la dirección predeterminada (no lo uses en producción)`.

La clave privada de esta dirección es conocida, así que NO envíes fondos de producción a ella. Los atacantes
probablemente drenarían los fondos al instante.

Cuando estés listo para realizar pruebas más maduras, selecciona `Personaliza tu airdrop` para distribuir
fondos a direcciones adicionales.

### Precompilaciones

Las precompilaciones son la forma en que Avalanche personaliza el comportamiento de tu Subred. Son estrictamente una
característica avanzada, así que puedes seleccionar de forma segura `No` por ahora.

### Conclusión

Si todo funcionó correctamente, el comando imprime `Configuración de Subred creada exitosamente`.

Has creado exitosamente la configuración de tu primera Subred. Ahora es hora de desplegarla.

## Desplegando Subredes Localmente

Para desplegar tu Subred, ejecuta

`avalanche subnet deploy miSubred`

Asegúrate de sustituir el nombre de tu Subred si usaste uno diferente a `miSubred`.

A continuación, selecciona `Red Local`.

Este comando inicia una red Avalanche de cinco nodos en tu máquina. Necesita descargar las últimas
versiones de AvalancheGo y Subnet-EVM. El comando puede tardar unos minutos en ejecutarse.

Nota: Si ejecutas `bash` en tu shell y estás ejecutando Avalanche-CLI en ARM64 en Mac, 
necesitarás Rosetta 2 para poder desplegar Subredes localmente. Puedes descargar Rosetta 2 usando 
`softwareupdate --install-rosetta` .

Si todo funciona como se espera, la salida del comando debería verse algo así:

<!-- markdownlint-disable MD013 -->

```text
> avalanche subnet deploy miSubred
✔ Red Local
Desplegando [miSubred] en Red Local
Instalando subnet-evm-v0.4.3...
Instalación exitosa de subnet-evm-v0.4.3
Controlador de backend iniciado, pid: 93928, salida en: /Users/subnet-developer/.avalanche-cli/runs/server_20221122_173138/avalanche-cli-backend
Instalando avalanchego-v1.9.3...
Instalación exitosa de avalanchego-v1.9.3
VMs listas.
Iniciando red...
..................
La cadena de bloques ha sido desplegada. Espera hasta que la red lo reconozca...
......
Red lista para usar. Puntos finales de los nodos de la red local:
+-------+----------+------------------------------------------------------------------------------------+
| NODO  |    VM    |                                        URL                                         |
+-------+----------+------------------------------------------------------------------------------------+
| nodo2 | miSubred | http://127.0.0.1:9652/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo3 | miSubred | http://127.0.0.1:9654/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo4 | miSubred | http://127.0.0.1:9656/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo5 | miSubred | http://127.0.0.1:9658/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo1 | miSubred | http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+



Detalles de conexión de la extensión del navegador (cualquier URL de nodo de arriba funciona):
URL de RPC:          http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Dirección financiada:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC con 1000000 (10^18) - clave privada: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Nombre de red:     mySubnet
ID de cadena:         54325
Símbolo de moneda:  TUTORIAL

Puedes usar los detalles de conexión de la extensión del navegador para conectarte e interactuar con tu Subnet. Ahora es el momento de interactuar con ella.

## Interactuando con tu Subnet

Puedes usar el valor proporcionado por `Detalles de conexión de la extensión del navegador` para conectarte a tu Subnet con Core, MetaMask u cualquier otra billetera.

:::note

Para permitir llamadas de API desde otras máquinas, usa `--http-host=0.0.0.0` en la configuración.

:::

Esta tutorial utiliza Core.

### Importando la clave privada de prueba

:::warning
Esta dirección se deriva de una clave privada conocida. Cualquiera puede robar fondos enviados a esta dirección. Úsala solo en redes de desarrollo a las que solo tú tienes acceso. Si envías fondos de producción a esta dirección, los atacantes pueden robarlos al instante.
:::

Primero, necesitas importar tu clave privada de airdrop en Core.

En la pantalla de Cuentas, selecciona la pestaña `Imported`. Haz clic en `Importar clave privada`.

![Importar cuenta](/img/first-subnet/import1.png)

Aquí, ingresa la clave privada. Importa la clave privada conocida `0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`.

![Ingresar clave privada](/img/first-subnet/import2.png)

A continuación, cambia el nombre de la cuenta de Core para evitar confusiones. En la pestaña `Imported`, haz clic en el ícono de lápiz junto a tu cuenta. Cambia el nombre de la cuenta a `NO USAR -- Clave de prueba pública` para evitar confusiones con cualquier billetera personal.

![Renombrar cuenta](/img/first-subnet/import3.png)

![Renombrar cuenta](/img/first-subnet/import4.png)

### Conectarse a la Subnet

A continuación, necesitas agregar tu Subnet a las redes de Core.

En la Extensión de Core, haz clic en `Ver todas las redes` y luego selecciona el
icono ` + ` en la esquina superior derecha.

![Agregar red](/img/first-subnet/network1.png)

Ingresa los detalles de tu Subnet, que se encuentran en la salida de tu comando `avalanche subnet deploy`
[command](#deploying-subnets-locally), en el formulario y haz clic en `Guardar`.

![Agregar red 2](/img/first-subnet/network2.png)

Si todo funcionó como se esperaba, tu saldo debería mostrar 1 millón de tokens.
Tu Subnet está lista para la acción. Puedes intentar
[Desplegar un Contrato Inteligente en tu Subnet-EVM Usando Remix y Core](/build/subnet/utility/deploy-smart-contract-to-subnet.md).

![Subnet en Core](/img/first-subnet/subnet-in-core.png)

## Siguientes Pasos

¡Felicidades Subnetooooor, acabas de desplegar tu primera Subnet!

Después de sentirte cómodo con este flujo de despliegue, intenta desplegar contratos inteligentes en tu cadena
con [Remix](https://remix.ethereum.org/), [Hardhat](https://hardhat.org/) o
[Foundry](https://github.com/foundry-rs/foundry). También puedes experimentar con personalizar tu
Subnet agregando precompilaciones o ajustando el airdrop.

Una vez que hayas desarrollado una Subnet estable que te guste, consulta
[Crear una Subnet EVM en la Testnet Fuji](/build/subnet/deploy/fuji-testnet-subnet.md) para llevar tu
Subnet un paso más cerca de la producción.

¡Buena Subnetting!

## Preguntas Frecuentes

**¿Cómo se determina la ID de la Subnet al crearla?**

La ID de la Subnet es el hash de la transacción que creó la Subnet.
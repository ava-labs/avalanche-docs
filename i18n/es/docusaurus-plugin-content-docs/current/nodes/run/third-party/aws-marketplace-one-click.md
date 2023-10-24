---
tags: [Nodos]
description: Este tutorial te guiará a través de la puesta en marcha de un nodo Avalanche a través del nodo validador de un solo clic a través del AWS Marketplace. Esto incluye suscribirse al software, lanzarlo en EC2, conectarse al nodo a través de ssh, llamar a comandos curl, agregar el nodo como un validador en la red Fuji usando la billetera web Avalanche y confirmar que el nodo es un validador pendiente.
sidebar_label: AWS Marketplace
pagination_label: Ejecutar un nodo Avalanche con Amazon Web Services con un solo clic
sidebar_position: 1
---

# Lanza un validador Avalanche en AWS con un solo clic

## Cómo lanzar un validador Avalanche usando AWS

<iframe src="https://www.youtube.com/embed/4RPmgpbC_Cc"
        width="100%"
        height="480px"
        title="¿Cómo lanzar un validador Avalanche usando AWS?"
        className="video-container"
        display="initial"
        position="relative"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
</iframe>

Con la intención de permitir que los desarrolladores y emprendedores ingresen al ecosistema Avalanche con la menor fricción posible, Ava Labs lanzó recientemente una oferta para implementar un nodo validador Avalanche a través del AWS Marketplace. Este tutorial mostrará los principales pasos requeridos para poner en funcionamiento este nodo y validar en la testnet Avalanche Fuji.

## Descripción del producto

El nodo validador Avalanche está disponible a través del [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-nd6wgi2bhhslg). Allí encontrarás una descripción general del producto. Esto incluye una descripción del producto, información de precios, instrucciones de uso, información de soporte y reseñas de clientes. Después de revisar esta información, debes hacer clic en el botón "Continuar para suscribirse".

## Suscríbete a este software

Una vez en la página "Suscribirse a este software", verás un botón que te permite suscribirte a esta oferta del AWS Marketplace. Además, verás los términos de servicio, incluido el Acuerdo de licencia de usuario final del vendedor y el [Aviso de privacidad de AWS](https://aws.amazon.com/privacy/). Después de revisar esto, debes hacer clic en el botón "Continuar a la configuración".

## Configura este software

Esta página te permite elegir una opción de cumplimiento y una versión de software para lanzar este software. No se necesitan cambios, ya que la configuración predeterminada es suficiente. Deja la opción de "Cumplimiento" como "Imagen de máquina Amazon (AMI) de 64 bits (x86)". La versión de software es la última compilación de [el nodo completo AvalancheGo](https://github.com/ava-labs/avalanchego/releases), `v1.9.5 (22 de diciembre de 2022)`, también conocido como `Banff.5`. Esto siempre mostrará la última versión. Además, la región de implementación se puede dejar como "US East (N. Virginia)". A la derecha verás los precios del software e infraestructura. Por último, haz clic en el botón "Continuar para iniciar".

## Lanza este software

Aquí puedes revisar los detalles de la configuración de lanzamiento y seguir las instrucciones para lanzar el nodo validador Avalanche. Los cambios son muy pequeños. Deja la acción como "Lanzar desde el sitio web". El tipo de instancia EC2 debe seguir siendo `c5.2xlarge`. El cambio principal que deberás hacer es elegir un par de claves que te permitirá `ssh` en la instancia EC2 recién creada para ejecutar comandos `curl` en el nodo validador. Puedes buscar pares de claves existentes o crear un nuevo par de claves y descargarlo a tu máquina local. Si creas un nuevo par de claves, deberás mover el par de claves a la ubicación adecuada, cambiar los permisos y agregarlo al agente de autenticación OpenSSH. Por ejemplo, en MacOS se vería similar a lo siguiente:

```zsh
# En este ejemplo tenemos un par de claves llamado avalanche.pem que se descargó de AWS a ~/Downloads/avalanche.pem
# Confirma que el archivo existe con el siguiente comando
test -f ~/Downloads/avalanche.pem && echo "avalance.pem existe."

# Ejecutar el comando anterior mostrará lo siguiente:
# avalance.pem existe.

# Mueve el par de claves avalanche.pem del directorio ~/Downloads al directorio oculto ~/.ssh
mv ~/Downloads/avalanche.pem ~/.ssh

# A continuación, agrega la identidad de la clave privada al agente de autenticación OpenSSH
ssh-add ~/.ssh/avalanche.pem;

# Cambia los modos de archivo o las listas de control de acceso
sudo chmod 600 ~/.ssh/avalanche.pem
```

Una vez que se completen estos pasos, estás listo para lanzar el nodo validador en EC2. Para hacer que eso suceda, haz clic en el botón "Lanzar"

![lanzamiento exitoso](/img/one-click-validator-node/launch-successful.png)

¡Ahora tienes un nodo Avalanche implementado en una instancia AWS EC2! Copia el `ID de AMI` y haz clic en el enlace `Consola EC2` para el siguiente paso.

## Consola EC2

Ahora toma el `ID de AMI` del paso anterior e ingrésalo en la barra de búsqueda de la Consola EC2. Esto te llevará al panel donde puedes encontrar la dirección IP pública de las instancias EC2.

![instancia AMI](/img/one-click-validator-node/ami-instance.png)

Copia esa dirección IP pública y abre una terminal o un símbolo del sistema. Una vez que tengas la nueva terminal abierta, haz `ssh` a la instancia EC2 con el siguiente comando.

```zsh
ssh nombredeusuario@dirección.ip.de.la.instancia.ec2
```

## Configuración del nodo

### Cambiar a la Testnet Fuji

De forma predeterminada, el nodo Avalanche disponible a través del AWS Marketplace sincroniza la Mainnet. Si esto es lo que estás buscando, puedes saltarte este paso.

Para este tutorial, quieres sincronizar y validar la Testnet Fuji. Ahora que estás `ssh` en la instancia EC2, puedes hacer los cambios necesarios para sincronizar Fuji en lugar de Mainnet.

Primero, confirma que el nodo está sincronizando la Mainnet ejecutando el comando `info.getNetworkID`.

#### Solicitud `info.getNetworkID`

```zsh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkID",
    "params": {
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### Respuesta `info.getNetworkID`

El `networkID` devuelto será 1, que es el ID de red de Mainnet.

```zsh
{
  "jsonrpc": "2.0",
  "result": {
    "networkID": "1"
  },
  "id": 1
}
```

Ahora quieres editar `/etc/avalanchego/conf.json` y cambiar la propiedad `"network-id"` de `"mainnet"` a `"fuji"`. Para ver el contenido de `/etc/avalanchego/conf.json`, puedes usar el comando `cat` en el archivo.

```zsh
cat /etc/avalanchego/conf.json
{
  "api-keystore-enabled": false,
  "http-host": "0.0.0.0",
  "log-dir": "/var/log/avalanchego",
  "db-dir": "/data/avalanchego",
  "api-admin-enabled": false,
  "public-ip-resolution-service": "opendns",
  "network-id": "mainnet"
}
```

Edita ese `/etc/avalanchego/conf.json` con tu editor de texto favorito y cambia el valor de la propiedad `"network-id"` de `"mainnet"` a `"fuji"`. Una vez que eso esté completo, guarda el archivo y reinicia el nodo Avalanche a través de `sudo systemctl restart avalanchego`. Luego puedes llamar al endpoint `info.getNetworkID` para confirmar que el cambio fue exitoso.

#### Solicitud `info.getNetworkID`

```zsh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkID",
    "params": {
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### Respuesta de `info.getNetworkID`

El `networkID` devuelto será 5, que es el ID de red para Fuji.

```zsh
{
  "jsonrpc": "2.0",
  "result": {
    "networkID": "5"
  },
  "id": 1
}
```

A continuación, ejecutas el comando `info.isBoostrapped` para confirmar si el nodo validador de Avalanche ha terminado de arrancar.

### Solicitud de `info.isBootstrapped`

```zsh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"P"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Una vez que el nodo ha terminado de arrancar, la respuesta será:

### Respuesta de `info.isBootstrapped`

```zsh
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

**Nota** que inicialmente la respuesta es `false` porque la red todavía se está sincronizando.  
Cuando estés agregando tu nodo como validador en la Mainnet de Avalanche, querrás esperar a que esta respuesta
devuelva `true` para no sufrir ningún tiempo de inactividad mientras validas.
Para este tutorial, no vas a esperar a que termine de sincronizarse ya que no es
estrictamente necesario.

### Solicitud de `info.getNodeID`

A continuación, quieres obtener el ID del nodo que se utilizará para agregar el nodo como un
validador. Para obtener el ID del nodo, llamas al punto final jsonrpc `info.getNodeID`.

```zsh
curl --location --request POST 'http://127.0.0.1:9650/ext/info' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID",
    "params" :{
    }
}'
```

### Respuesta de `info.getNodeID`

Toma nota del valor `nodeID` que se devuelve, ya que necesitarás usarlo en
el siguiente paso cuando agregues un validador a través de la Avalanche Web Wallet. En este caso,
el `nodeID` es `NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5`

```zsh
{
  "jsonrpc": "2.0",
  "result": {
    "nodeID": "NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5",
    "nodePOP": {
      "publicKey": "0x85675db18b326a9585bfd43892b25b71bf01b18587dc5fac136dc5343a9e8892cd6c49b0615ce928d53ff5dc7fd8945d",
      "proofOfPossession": "0x98a56f092830161243c1f1a613ad68a7f1fb25d2462ecf85065f22eaebb4e93a60e9e29649a32252392365d8f628b2571174f520331ee0063a94473f8db6888fc3a722be330d5c51e67d0d1075549cb55376e1f21d1b48f859ef807b978f65d9"
    }
  },
  "id": 1
}
```

## Agregar el nodo como validador en Fuji a través de la Web Wallet

Para agregar el nuevo nodo como un validador en la red de pruebas Fuji, puedes
usar la [Avalanche Web Wallet](https://wallet.avax.network).

![Avalanche Web Wallet](/img/one-click-validator-node/web-wallet.png)

La Avalanche Web Wallet es una aplicación basada en web sin middleware ni ningún
tipo de comunicación con el servidor. Puede ser accedida
en línea o compilada y ejecutada localmente. La Avalanche Web Wallet es una joya multifacética
y ofrece validación/delegación, transferencias entre cadenas, estimación de recompensas,
gestión de activos/llaves, y más.

### Cambiar la Red Conectada

Verifica a qué red está conectada la billetera mirando en la parte superior derecha de
la pantalla. Por defecto, la Avalanche Web Wallet se conecta a Mainnet.

#### Conectado a Mainnet

<img src="/img/one-click-validator-node/network-mainnet.png" alt="Red -
Mainnet" width="60%" />

Para este demo, quieres conectar la billetera a la red de pruebas Fuji. En la parte superior derecha de la billetera, haz clic en "Mainnet" y desde el menú de navegación selecciona Fuji.

#### Seleccionando Fuji

<img src="/img/one-click-validator-node/network-selecting-fuji.png" alt="Red - Seleccionando Fuji" 
width="60%" />

La billetera mostrará "Conectando..." mientras cambia de Mainnet a Fuji.

#### Conectado a Fuji

Una vez que la billetera se haya conectado a Fuji, aparecerá una ventana emergente que dice "Conectado a Fuji".

<img src="/img/one-click-validator-node/connected-to-fuji.png" alt="Conectado a Fuji" 
width="80%" />

#### Conectado a Fuji

<img src="/img/one-click-validator-node/network-fuji.png" alt="Red - Fuji"
width="60%" />

Puedes seguir los mismos pasos para volver a conectar la billetera a Mainnet desde Fuji y para agregar redes personalizadas.

### La pestaña "Earn"

Para agregar un nodo como validador, primero selecciona la pestaña "Earn" en el menú de navegación izquierdo.
A continuación, haz clic en el botón "Add Validator".

![Avalanche Web Wallet](/img/one-click-validator-node/earn-tab.png)

### El formulario `Earn / Validate`

Veamos los valores de entrada para el formulario `Earn / Validate`.

- Node ID: Un ID único derivado del certificado de staker de cada nodo individual.
  Usa el `NodeID` que se devolvió en la respuesta de `info.getNodeID`. En este
  ejemplo es `NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5`
- Staking End Date: Tus tokens AVAX estarán bloqueados hasta esta fecha.
- Stake Amount: La cantidad de AVAX a bloquear para el staking. En Mainnet, la cantidad mínima requerida es de 2,000 AVAX. En Testnet, la cantidad mínima requerida es de 1 AVAX.
- Delegation Fee: Reclamarás este % de las recompensas de los delegadores en tu nodo.
- Reward Address: Una dirección de recompensa es la dirección de destino de las recompensas de staking acumuladas.

¡Completa los campos y confirma! ¡Verifica cuidadosamente los detalles y haz clic en "Submit"!

![Avalanche Web Wallet](/img/one-click-validator-node/validate-form.png)

### La transacción `AddValidatorTx`

Una vez que la transacción se emite con éxito a la Red Avalanche, la lista de
transacciones en la columna derecha se actualizará con la nueva `AddValidatorTx`
empujada hasta la parte superior de la lista. Haz clic en el icono de la lupa y se abrirá una nueva pestaña del navegador
con los detalles de la `AddValidatorTx`. Mostrará detalles
como el valor total de AVAX transferidos, cualquier AVAX que se hayan quemado, el
ID de blockchain, el ID de bloque, el NodeID del validador y el tiempo total que
ha transcurrido desde todo el período de validación.

![Transacción de validador](/img/one-click-validator-node/validation-tx.png)

## Confirma que el Nodo es un Validador Pendiente en Fuji

Como último paso, puedes llamar al endpoint `platform.getPendingValidators` para confirmar que el nodo Avalanche que fue creado recientemente en AWS está en la cola de validadores pendientes, donde permanecerá durante 5 minutos.

### Solicitud de `platform.getPendingValidators`

```zsh
curl --location --request POST 'https://api.avax-test.network/ext/bc/P' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {
        "subnetID": "11111111111111111111111111111111LpoYY",
        "nodeIDs": []
    },
    "id": 1
}'
```

### Respuesta de `platform.getPendingValidators`

```zsh
{
  "jsonrpc": "2.0",
  "result": {
    "validators": [
      {
        "txID": "4d7ZboCrND4FjnyNaF3qyosuGQsNeJ2R4KPJhHJ55VCU1Myjd",
        "startTime": "1673411918",
        "endTime": "1675313170",
        "stakeAmount": "1000000000",
        "nodeID": "NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5",
        "delegationFee": "2.0000",
        "connected": false,
        "delegators": null
      }
    ],
    "delegators": []
  },
  "id": 1
}
```

También puedes pasar el `NodeID` como una cadena al arreglo `nodeIDs` en el cuerpo de la solicitud.

```zsh
curl --location --request POST 'https://api.avax-test.network/ext/bc/P' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {
        "subnetID": "11111111111111111111111111111111LpoYY",
        "nodeIDs": ["NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5"]
    },
    "id": 1
}'
```

Esto filtrará la respuesta por el arreglo `nodeIDs`, lo que te ahorrará tiempo al no tener que buscar en todo el cuerpo de la respuesta los NodeIDs.

```zsh
{
  "jsonrpc": "2.0",
  "result": {
    "validators": [
      {
        "txID": "4d7ZboCrND4FjnyNaF3qyosuGQsNeJ2R4KPJhHJ55VCU1Myjd",
        "startTime": "1673411918",
        "endTime": "1675313170",
        "stakeAmount": "1000000000",
        "nodeID": "NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5",
        "delegationFee": "2.0000",
        "connected": false,
        "delegators": null
      }
    ],
    "delegators": []
  },
  "id": 1
}
```

Después de 5 minutos, el nodo comenzará oficialmente a validar la red de pruebas Avalanche Fuji y ya no lo verás en el cuerpo de respuesta del endpoint `platform.getPendingValidators`. Ahora podrás acceder a él a través del endpoint `platform.getCurrentValidators`.

### Solicitud de `platform.getCurrentValidators`

```zsh
curl --location --request POST 'https://api.avax-test.network/ext/bc/P' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {
        "subnetID": "11111111111111111111111111111111LpoYY",
        "nodeIDs": ["NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5"]
    },
    "id": 1
}'
```

### Respuesta de `platform.getCurrentValidators`

```zsh
{
  "jsonrpc": "2.0",
  "result": {
    "validators": [
      {
        "txID": "2hy57Z7KiZ8L3w2KonJJE1fs5j4JDzVHLjEALAHaXPr6VMeDhk",
        "startTime": "1673411918",
        "endTime": "1675313170",
        "stakeAmount": "1000000000",
        "nodeID": "NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5",
        "rewardOwner": {
          "locktime": "0",
          "threshold": "1",
          "addresses": [
            "P-fuji1tgj2c3k56enytw5d78rt0tsq3lzg8wnftffwk7"
          ]
        },
        "validationRewardOwner": {
          "locktime": "0",
          "threshold": "1",
          "addresses": [
            "P-fuji1tgj2c3k56enytw5d78rt0tsq3lzg8wnftffwk7"
          ]
        },
        "delegationRewardOwner": {
          "locktime": "0",
          "threshold": "1",
          "addresses": [
            "P-fuji1tgj2c3k56enytw5d78rt0tsq3lzg8wnftffwk7"
          ]
        },
        "potentialReward": "5400963",
        "delegationFee": "2.0000",
        "uptime": "0.0000",
        "connected": false,
        "delegators": null
      }
    ]
  },
  "id": 1
}
```

## Mainnet

Todos estos pasos se pueden aplicar a Mainnet. Sin embargo, la cantidad mínima requerida de tokens Avax para convertirse en un validador es de 2,000 en Mainnet. Para obtener más información, por favor lee [este documento](/nodes/validate/how-to-stake.md#validators).

## Mantenimiento

El clic de un solo botón de AWS está destinado a ser utilizado en entornos automatizados, no como una solución para el usuario final. Aún puedes gestionarlo manualmente, pero no es tan fácil como una instancia de Ubuntu o usar el script:

- El binario AvalancheGo está en `/usr/local/bin/avalanchego`
- La configuración del nodo principal está en `/etc/avalanchego/conf.json`
- El directorio de trabajo está en `/home/avalanche/.avalanchego/ (y pertenece al usuario avalanchego)`
- La base de datos está en `/data/avalanchego`
- Los registros están en `/var/log/avalanchego`

Para una actualización simple, necesitarías colocar el nuevo binario en `/usr/local/bin/`.
Si ejecutas una Subnet, también necesitarías colocar el binario de la VM en `/home/avalanche/.avalanchego/plugins`.

También puedes considerar usar [esta guía](https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-tutorial-update-ami.html),
pero eso no abordará la actualización de la Subnet, si tienes una.

## Resumen

Avalanche es la primera plataforma descentralizada de contratos inteligentes construida para la escala de las finanzas globales, con finalidad de transacción casi instantánea. Ahora, con un nodo validador de Avalanche disponible como instalación de un solo clic desde el AWS Marketplace, los desarrolladores y emprendedores pueden ingresar al ecosistema Avalanche en cuestión de minutos. Si tienes alguna pregunta o quieres hacer un seguimiento de alguna manera, únete a nuestro servidor de Discord en <https://chat.avax.network>. Para obtener más recursos para desarrolladores, por favor consulta nuestra [Documentación para Desarrolladores](https://docs.avax.network).

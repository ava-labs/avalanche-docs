---
tags: [Subnet]
description: Una Subnet es un conjunto dinámico de validadores que trabajan juntos para lograr consenso sobre el estado de un conjunto de redes blockchain.
keywords:
  [documentación, avalanche, subnets, blockchains soberanas, interoperabilidad]
sidebar_label: Subnets
---

# ¿Qué es una Subnet?

Una **Subnet** es una red soberana que define sus propias reglas con respecto a su membresía y
economía de tokens. Está compuesta por un subconjunto dinámico de validadores Avalanche que
trabajan juntos para lograr consenso sobre el estado de una o más blockchains. Cada blockchain
es validada por exactamente una Subnet, mientras que una Subnet puede validar muchas
blockchains.

La [Red Primaria](avalanche-platform.md) de Avalanche es una Subnet especial que ejecuta tres blockchains:

- La Cadena de Plataforma [(P-Chain)](/learn/avalanche/avalanche-platform#p-chain)
- La Cadena de Contratos [(C-Chain)](/learn/avalanche/avalanche-platform#c-chain)
- La Cadena de Intercambio [(X-Chain)](/learn/avalanche/avalanche-platform#x-chain)

![imagen](/img/subnet-validators.png)

(Imagen adoptada de [este artículo](https://www.coinbase.com/cloud/discover/dev-foundations/intro-to-avalanche-subnets))

:::info
Cada validador en una Subnet
**debe** validar también la Red Primaria.
:::

Los operadores de nodos que validan una Subnet con múltiples blockchains no necesitan ejecutar múltiples máquinas para validación. Por ejemplo, la Red Primaria es una Subnet con tres blockchains coexistentes, todas las cuales pueden ser validadas por un solo nodo o una sola máquina.

## Ventajas

### Redes Independientes

- Las Subnets utilizan máquinas virtuales para especificar su propia lógica de ejecución, determinar su régimen de tarifas, mantener su propio estado, facilitar su propia red y proporcionar su propia seguridad.
- El rendimiento de cada Subnet está aislado de otras Subnets en el ecosistema, por lo que un aumento en el uso en una Subnet no afectará a otra.
- Las Subnets pueden tener su propia economía de tokens con sus propios tokens nativos, mercados de tarifas e incentivos determinados por el desplegador de la Subnet.
- Una Subnet puede alojar múltiples blockchains con [máquinas virtuales](virtual-machines.md) personalizadas.

### Interoperabilidad Nativa

- Avalanche Warp Messaging permite la comunicación nativa entre Subnets y permite a los desarrolladores de Máquinas Virtuales (VM) implementar protocolos de comunicación arbitrarios entre cualquier par de Subnets.

### Acomodar Requisitos Específicos de Aplicación

_Las diferentes aplicaciones basadas en blockchain pueden requerir que los validadores tengan ciertas propiedades como grandes cantidades de RAM o poder de CPU._

- Una Subnet podría requerir que los validadores cumplan con ciertos [requisitos de hardware](/nodes/run/node-manually.md#hardware-and-os-requirements) para que la aplicación no sufra un rendimiento bajo debido a validadores lentos.

### Lanzar una Red Diseñada con Cumplimiento en Mente

_La arquitectura de Subnet de Avalanche hace que el cumplimiento regulatorio sea manejable. Como se mencionó anteriormente, una Subnet puede requerir que los validadores cumplan con un conjunto de requisitos._

Algunos ejemplos de requisitos que los creadores de una Subnet pueden elegir incluir son:

- Los validadores deben ubicarse en un país determinado.
- Los validadores deben pasar controles KYC/AML.
- Los validadores deben tener una licencia específica.

### Controlar la Privacidad de los Datos en la Cadena

_Las Subnets son ideales para organizaciones interesadas en mantener su información privada._

- Las instituciones conscientes de la privacidad de sus partes interesadas pueden crear una Subnet privada donde el contenido de las blockchains sea visible solo para un conjunto de validadores preaprobados. Esto se define en la creación con un [parámetro único](/nodes/configure/subnet-configs.md#private-subnet).

### Soberanía del Validador

_En una red heterogénea de blockchains, algunos validadores no querrán validar ciertas blockchains porque simplemente no tienen interés en esas blockchains._

- El modelo de Subnet permite a los validadores preocuparse solo por las redes blockchain en las que eligen participar. Esto reduce en gran medida la carga computacional en los validadores.

## Desarrolla tu propia Subnet

Las Subnets en Avalanche se despliegan por defecto con [Subnet-EVM](https://github.com/ava-labs/subnet-evm#subnet-evm), un fork de go-ethereum. Implementa la Máquina Virtual Ethereum y soporta contratos inteligentes en Solidity, así como la mayoría de las demás funcionalidades de los clientes Ethereum.

Para empezar, echa un vistazo a los tutoriales en nuestra sección de [Subnets](/build/subnet/hello-subnet.md).

---
tags: [Subred]
description: Una Subred es un conjunto dinámico de validadores que trabajan juntos para lograr consenso sobre el estado de un conjunto de redes blockchain.
keywords: [documentación, avalanche, subredes, blockchains soberanas, interoperabilidad]
sidebar_label: Subredes
---

# ¿Qué es una Subred?

Una **Subred** es una red soberana que define sus propias reglas con respecto a su membresía y economía de tokens. Está compuesta por un subconjunto dinámico de validadores de Avalanche que trabajan juntos para lograr consenso sobre el estado de una o más blockchains. Cada blockchain es validada por exactamente una Subred, mientras que una Subred puede validar muchas blockchains.

La [Red Primaria](avalanche-platform.md) de Avalanche es una Subred especial que ejecuta tres blockchains:

- La Cadena de Plataforma [(P-Chain)](/learn/avalanche/avalanche-platform#p-chain)
- La Cadena de Contratos [(C-Chain)](/learn/avalanche/avalanche-platform#c-chain)
- La Cadena de Intercambio [(X-Chain)](/learn/avalanche/avalanche-platform#x-chain)

![imagen](/img/subnet-validators.png)

(Imagen adoptada de [este artículo](https://www.coinbase.com/cloud/discover/dev-foundations/intro-to-avalanche-subnets))

:::info
Cada validador en una Subred
**debe** validar también la Red Primaria.
:::

Los operadores de nodos que validan una Subred con múltiples blockchains no necesitan ejecutar múltiples máquinas para la validación. Por ejemplo, la Red Primaria es una Subred con tres blockchains coexistentes, todos los cuales pueden ser validados por un solo nodo o una sola máquina.

## Ventajas

### Redes Independientes

- Las Subredes utilizan máquinas virtuales para especificar su propia lógica de ejecución, determinar su propio régimen de tarifas, mantener su propio estado, facilitar su propia interconexión y proporcionar su propia seguridad.
- El rendimiento de cada Subred está aislado de otras Subredes en el ecosistema, por lo que el aumento de uso en una Subred no afectará a otra.
- Las Subredes pueden tener su propia economía de tokens con sus propios tokens nativos, mercados de tarifas e incentivos determinados por el desplegador de la Subred.
- Una Subred puede alojar múltiples blockchains con [máquinas virtuales](virtual-machines.md) personalizadas.

### Interoperabilidad Nativa

- Avalanche Warp Messaging permite la comunicación nativa entre Subredes y permite a los desarrolladores de Máquinas Virtuales (VM) implementar protocolos de comunicación arbitrarios entre cualquier par de Subredes.

### Adaptarse a Requisitos Específicos de Aplicación

_Las diferentes aplicaciones basadas en blockchain pueden requerir que los validadores tengan ciertas propiedades, como grandes cantidades de RAM o potencia de CPU._

- Una Subred podría requerir que los validadores cumplan con ciertos [requisitos de hardware](/nodes/run/node-manually.md#requirements) para que la aplicación no sufra un bajo rendimiento debido a validadores lentos.

### Lanzar una Red Diseñada teniendo en cuenta la Cumplimiento Normativo

_La arquitectura de Subred de Avalanche facilita el cumplimiento normativo. Como se mencionó anteriormente, una Subred puede requerir que los validadores cumplan con un conjunto de requisitos._

Algunos ejemplos de requisitos que los creadores de una Subred pueden elegir incluyen:

- Los validadores deben estar ubicados en un país determinado.
- Los validadores deben pasar controles KYC/AML.
- Los validadores deben tener una licencia específica.

### Controlar la Privacidad de los Datos en la Cadena

_Las Subredes son ideales para organizaciones interesadas en mantener su información privada._

- Las instituciones conscientes de la privacidad de sus partes interesadas pueden crear una Subred privada donde el contenido de las blockchains solo sea visible para un conjunto de validadores preaprobados. Esto se define en la creación con un [parámetro único](/nodes/configure/subnet-configs.md#private-subnet).

### Soberanía del Validador

_En una red heterogénea de blockchains, algunos validadores no querrán validar ciertas blockchains porque simplemente no tienen interés en esas blockchains._

- El modelo de Subred permite a los validadores preocuparse solo por las redes blockchain en las que eligen participar. Esto reduce en gran medida la carga computacional de los validadores.

## Desarrolla tu propia Subred

Las Subredes en Avalanche se implementan por defecto con [Subnet-EVM](https://github.com/ava-labs/subnet-evm#subnet-evm), un fork de go-ethereum. Implementa la Máquina Virtual Ethereum y admite contratos inteligentes en Solidity, así como la mayoría de las demás funcionalidades de los clientes Ethereum.

Para comenzar, consulta los tutoriales en nuestra sección de [Subredes](/build/subnet/hello-subnet.md).
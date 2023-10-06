---
tags: [Máquinas Virtuales, Subnet-EVM]
description: Una Máquina Virtual es un entorno virtual dentro de las redes blockchain que ejecuta contratos inteligentes y transacciones de acuerdo a reglas y protocolos predefinidos.
keywords: [documentación, avalanche, máquinas virtuales, subredes, Subnet EVM]
sidebar_label: Máquinas Virtuales
---

# Máquinas Virtuales

En pocas palabras, una **Máquina Virtual** (VM, por sus siglas en inglés) es el diseño de una blockchain, lo que significa que define la lógica a nivel de aplicación de una blockchain. En términos técnicos, especifica el estado de la blockchain, la función de transición de estado, las transacciones y la API a través de la cual los usuarios pueden interactuar con la blockchain.

Puedes usar la misma VM para crear muchas blockchains, cada una de las cuales sigue el mismo conjunto de reglas pero es independiente de las demás.

## ¿Por qué ejecutar una VM en Avalanche?

_Los desarrolladores con casos de uso avanzados para utilizar la tecnología de contabilidad distribuida a menudo se ven obligados a construir su propia blockchain desde cero, volver a implementar abstracciones complejas como la red y el consenso, todo antes de poder comenzar a trabajar en su nueva aplicación._

**Con Avalanche,**

- Los desarrolladores pueden crear una VM que define cómo debe comportarse su blockchain y utilizar este diseño para coordinar a los validadores en la red para ejecutar la aplicación.

- Las VM pueden estar escritas en cualquier lenguaje y utilizar bibliotecas y pilas tecnológicas con las que su creador esté familiarizado. Los desarrolladores tienen un control preciso sobre el comportamiento de su blockchain y pueden redefinir las reglas de una blockchain para adaptarse a cualquier caso de uso que tengan.

- Los desarrolladores no necesitan preocuparse por la lógica de nivel inferior como la red, el consenso y la estructura de la blockchain; Avalanche se encarga de esto en segundo plano para que puedas centrarte en construir tu Dapp, tu ecosistema y tu comunidad.

## Cómo funcionan las VMs

Las VMs se comunican con Avalanche a través de un protocolo de solicitud-respuesta agnóstico del lenguaje conocido como [RPC](https://es.wikipedia.org/wiki/Llamada_a_procedimiento_remoto). Esto permite que el marco de trabajo de la VM abra un mundo de posibilidades infinitas, ya que los desarrolladores pueden implementar sus Dapps utilizando los lenguajes, marcos y bibliotecas de su elección. Para comenzar, crea una VM lista para usar con el [Subnet-EVM](/build/subnet/c-chain-vs-subnet.md) en Solidity, o diseña una VM personalizada con lenguajes como Golang, Rust y muchos más.

## Ejecución de una VM

Todos los validadores de Avalanche como miembros de la Red Primaria de Avalanche deben ejecutar tres VMs:

- Coreth: Define la Contract Chain (C-Chain); admite la funcionalidad de contratos inteligentes y es compatible con EVM.
- Platform VM: Define la Platform Chain (P-Chain); admite operaciones de participación y Subnets.
- Avalanche VM: Define la Exchange Chain (X-Chain); admite operaciones en Tokens Nativos de Avalanche.

Las tres se pueden ejecutar fácilmente en cualquier computadora con [AvalancheGo](/nodes).

Los validadores pueden instalar VMs adicionales en su nodo para validar Subnets adicionales en el ecosistema de Avalanche. A cambio, los validadores reciben recompensas de participación en forma de un token de recompensa determinado por los Subnets.

### Solidity

Avalanche admite nativamente la ejecución de contratos inteligentes de Ethereum escritos en Solidity. Los desarrolladores de Ethereum tienen la opción de implementar sus contratos inteligentes en la implementación de la C-Chain de la Ethereum Virtual Machine ([Coreth](https://github.com/ava-labs/coreth)), o en su propia Subnet utilizando el [Subnet-EVM](https://github.com/ava-labs/subnet-evm) para casos de uso avanzados que requieren más personalización.

Tanto la C-Chain como el Subnet-EVM son compatibles con herramientas de Ethereum como Remix, Core, MetaMask, Truffle y más.

Para obtener más información sobre el soporte de contratos inteligentes, haz clic [aquí](build/dapp/launch-dapp.md).

### Golang

- [Coreth](https://github.com/ava-labs/coreth)
  - Una implementación de la EVM que alimenta la Avalanche C-Chain y admite contratos inteligentes en Solidity.
- [Subnet-EVM](https://github.com/ava-labs/subnet-evm)
  - Una implementación de la EVM que se puede implementar en una Subnet personalizada para admitir contratos inteligentes en Solidity.
- [TimestampVM](https://github.com/ava-labs/timestampvm)
  - Un servidor de marca de tiempo descentralizado.
- [XSVM](https://github.com/ava-labs/xsvm)
  - Un ejemplo de Avalanche Warp Messaging que implementa transferencias de activos entre Subnets.

Consulta aquí un tutorial sobre [Cómo construir una VM simple en Golang](/build/vm/create/golang-vm-simple.md).

### Rust

Las siguientes VMs se construyeron utilizando Rust a través del [Avalanche Rust SDK](https://crates.io/crates/avalanche-types).

- [TimestampVM RS](https://github.com/ava-labs/timestampvm-rs)
  - Una implementación en Rust de TimestampVM.

Consulta aquí un tutorial sobre [Cómo construir una VM simple en Rust](/build/vm/create/rust-vm.md).
---
tags: [Máquinas Virtuales, Subnet-EVM]
description: Una Máquina Virtual es un entorno virtual dentro de las redes blockchain que ejecuta contratos inteligentes y transacciones de acuerdo con reglas y protocolos preestablecidos.
keywords: [documentación, avalanche, máquinas virtuales, subnets, Subnet EVM]
sidebar_label: Máquinas Virtuales
---

# Máquinas Virtuales

En resumen, una **Máquina Virtual** (VM) es el plano de una blockchain, lo que significa que define la lógica a nivel de aplicación de una blockchain. En términos técnicos, especifica el estado de la blockchain, la función de transición de estado, las transacciones y la API a través de la cual los usuarios pueden interactuar con la blockchain.

Puedes usar la misma VM para crear muchas blockchains, cada una de las cuales sigue el mismo conjunto de reglas pero es independiente de todas las demás.

## ¿Por qué ejecutar una VM en Avalanche?

_Los desarrolladores con casos de uso avanzados para utilizar la tecnología de ledger distribuido a menudo se ven obligados a construir su propia blockchain desde cero, re-implementando abstracciones complejas como la red y el consenso, todo antes de poder empezar a trabajar en su nueva aplicación._

**Con Avalanche,**

- Los desarrolladores pueden crear una VM que define cómo su blockchain debe comportarse y utilizar este plano para coordinar a los validadores en la red para ejecutar la aplicación.

- Las VM pueden estar escritas en cualquier lenguaje y utilizar bibliotecas y pilas tecnológicas con las que su creador esté familiarizado. Los desarrolladores tienen un control fino sobre el comportamiento de su blockchain y pueden redefinir las reglas de una blockchain para adaptarse a cualquier caso de uso que tengan.

- Los desarrolladores no necesitan preocuparse por la lógica de bajo nivel como la red, el consenso y la estructura de la blockchain; Avalanche hace todo esto entre bastidores para que puedas concentrarte en construir tu Dapp, tu ecosistema y tu comunidad.

## Cómo funcionan las VMs

Las VMs se comunican con Avalanche a través de un protocolo de solicitud-respuesta agnóstico al lenguaje conocido como [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call). Esto permite que el marco de la VM abra un mundo de posibilidades infinitas, ya que los desarrolladores pueden implementar sus Dapps utilizando los lenguajes, marcos y bibliotecas de su elección. Para empezar, crea una VM lista para usar con la [Subnet-EVM](/build/subnet/c-chain-vs-subnet.md) en Solidity, o diseña una VM personalizada con lenguajes como Golang, Rust y muchos más.

## Ejecutando una VM

Todos los validadores de Avalanche como miembros de la Red Primaria de Avalanche deben ejecutar tres VMs:

- Coreth: Define la Cadena de Contratos (C-Chain); soporta funcionalidad de contratos inteligentes y es compatible con EVM.
- VM de Plataforma: Define la Cadena de Plataforma (P-Chain); soporta operaciones sobre staking y Subnets.
- VM de Avalanche: Define la Cadena de Intercambio (X-Chain); soporta operaciones sobre Tokens Nativos de Avalanche.

Las tres se pueden ejecutar fácilmente en cualquier computadora con [AvalancheGo](/nodes).

Los validadores pueden instalar VMs adicionales en su nodo para validar Subnets adicionales en el ecosistema Avalanche. A cambio, los validadores reciben recompensas de staking en forma de un token de recompensa determinado por las Subnets.

### Solidity

Avalanche soporta nativamente la ejecución de contratos inteligentes de Ethereum escritos en solidity. Los desarrolladores de Ethereum tienen la opción de desplegar sus contratos inteligentes en la implementación de la EVM de la C-Chain ([Coreth](https://github.com/ava-labs/coreth)), o en su propia Subnet utilizando la [Subnet-EVM](https://github.com/ava-labs/subnet-evm) para casos de uso avanzados que requieren más personalización.

Tanto la C-Chain como la Subnet-EVM son compatibles con herramientas de Ethereum como Remix, Core, MetaMask, Truffle y más.

Para obtener más información sobre el soporte de contratos inteligentes, haz clic [aquí](build/dapp/launch-dapp.md).

### Golang

- [Coreth](https://github.com/ava-labs/coreth)
  - Una implementación de la EVM que alimenta la C-Chain de Avalanche y soporta contratos inteligentes en Solidity.
- [Subnet-EVM](https://github.com/ava-labs/subnet-evm)
  - Una implementación de la EVM que puede ser desplegada en una Subnet personalizada para soportar contratos inteligentes en Solidity.
- [TimestampVM](https://github.com/ava-labs/timestampvm)
  - Un servidor de tiempo descentralizado.
- [XSVM](https://github.com/ava-labs/xsvm)
  - Un ejemplo de Mensajería de Warp de Avalanche que implementa transferencias de activos entre Subnets.

Consulta aquí un tutorial sobre [Cómo construir una VM Golang simple](/build/vm/create/golang-vm-simple.md)

### Rust

Las siguientes VMs fueron construidas utilizando Rust a través del [Avalanche Rust SDK](https://crates.io/crates/avalanche-types)

- [TimestampVM RS](https://github.com/ava-labs/timestampvm-rs)
  - Una implementación en Rust de TimestampVM.

Consulta aquí un tutorial sobre [Cómo construir una VM Rust simple](/build/vm/create/rust-vm.md)

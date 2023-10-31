---
tags:
  [
    Red Primaria,
    Cadena P,
    Cadena X,
    Cadena C,
    Cadena de Plataforma,
    Cadena de Contratos,
  ]
description: Avalanche cuenta con 3 blockchains incorporadas que incluyen la Cadena de Intercambio (X-Chain), Cadena de Plataforma (P-Chain) y Cadena de Contratos (C-Chain). Más información aquí.
keywords:
  [
    documentación,
    avalanche,
    red primaria,
    c-chain,
    x-chain,
    p-chain,
    cadena de plataforma,
    cadena de contratos,
  ]
sidebar_label: La Red Primaria
---

# La Red Primaria

Avalanche es una red heterogénea de blockchains. A diferencia de las redes homogéneas, donde
todas las aplicaciones residen en la misma cadena, las redes heterogéneas permiten que se creen
cadenas separadas para diferentes aplicaciones.

La Red Primaria es una [Subnet](subnets-overview.md) especial que ejecuta tres blockchains:

- La Cadena de Contratos [(C-Chain)](avalanche-platform.md#c-chain)
- La Cadena de Plataforma [(P-Chain)](avalanche-platform.md#p-chain)
- La Cadena de Intercambio [(X-Chain)](avalanche-platform.md#x-chain)

:::note
La [Mainnet de Avalanche](/learn/avalanche/mainnet.md) está compuesta por la Red Primaria
y todas las Subnets desplegadas.
:::

Un nodo puede convertirse en un validador para la Red Primaria al hacer staking al menos **2,000 AVAX**.

![Red primaria](/img/primary-network.png)

## Las Cadenas

Todos los validadores de la Red Primaria están obligados a validar y asegurar lo siguiente:

### C-Chain

La **C-Chain** es una implementación de la Máquina Virtual Ethereum (EVM).
La [API de la C-Chain](/reference/avalanchego/c-chain/api.md) soporta la API de Geth y soporta la
implementación y ejecución de contratos inteligentes escritos en Solidity.

La C-Chain es una instancia de la
[Máquina Virtual Coreth](https://github.com/ava-labs/coreth).

### P-Chain

La **P-Chain** es responsable de todas las operaciones a nivel de validador y Subnet.
La [API de la P-Chain](/reference/avalanchego/p-chain/api.md) soporta la creación de nuevas
blockchains y Subnets, la adición de validadores a Subnets, operaciones de apuesta y otras
operaciones a nivel de plataforma.

La P-Chain es una instancia de la Máquina Virtual de Plataforma.

### X-Chain

La **X-Chain** es responsable de las operaciones sobre activos inteligentes digitales conocidos como **Tokens Nativos Avalanche**. Un activo inteligente es una representación de un recurso del mundo real (por ejemplo, una acción o un bono) con conjuntos de reglas que gobiernan su comportamiento, como "no se puede negociar hasta mañana".
La [API de la X-Chain](/reference/avalanchego/x-chain/api.md) soporta la creación y el comercio de
Tokens Nativos Avalanche.

Un activo negociado en la X-Chain es AVAX. Cuando emites una transacción a una blockchain en Avalanche, pagas una tarifa denominada en AVAX.

La X-Chain es una instancia de la Máquina Virtual Avalanche (AVM).

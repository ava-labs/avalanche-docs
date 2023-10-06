---
etiquetas: [Red Primaria, P-Chain, X-Chain, C-Chain, Cadena de Plataforma, Cadena de Contratos]
descripción: Avalanche cuenta con 3 blockchains integradas que incluyen la Exchange Chain (X-Chain), la Platform Chain (P-Chain) y la Contract Chain (C-Chain). Más información aquí.
palabras clave: [documentación, avalanche, red primaria, c-chain, x-chain, p-chain, cadena de plataforma, cadena de contratos]
sidebar_label: La Red Primaria
---

# La Red Primaria

Avalanche es una red heterogénea de blockchains. A diferencia de las redes homogéneas, donde todas las aplicaciones residen en la misma cadena, las redes heterogéneas permiten crear cadenas separadas para diferentes aplicaciones.

La Red Primaria es una [Subred](subnets-overview.md) especial que ejecuta tres blockchains:

- La Contract Chain [(C-Chain)](avalanche-platform.md#c-chain)
- La Platform Chain [(P-Chain)](avalanche-platform.md#p-chain)
- La Exchange Chain [(X-Chain)](avalanche-platform.md#x-chain)

:::note
El [Avalanche Mainnet](/learn/avalanche/mainnet.md) está compuesto por la Red Primaria y todas las Subredes desplegadas.
:::

Un nodo puede convertirse en validador de la Red Primaria al apostar al menos **2,000 AVAX**.

![Red primaria](/img/primary-network.png)

## Las Cadenas

Todos los validadores de la Red Primaria deben validar y asegurar lo siguiente:

### C-Chain

La **C-Chain** es una implementación de la Máquina Virtual Ethereum (EVM). La [API de la C-Chain](/reference/avalanchego/c-chain/api.md) admite la API de Geth y permite el despliegue y la ejecución de contratos inteligentes escritos en Solidity.

La C-Chain es una instancia de la Máquina Virtual Coreth.

### P-Chain

La **P-Chain** es responsable de todas las operaciones a nivel de validador y Subred. La [API de la P-Chain](/reference/avalanchego/p-chain/api.md) admite la creación de nuevas blockchains y Subredes, la adición de validadores a Subredes, operaciones de apuesta y otras operaciones a nivel de plataforma.

La P-Chain es una instancia de la Máquina Virtual de la Plataforma.

### X-Chain

La **X-Chain** es responsable de las operaciones en activos digitales inteligentes conocidos como **Tokens Nativos de Avalanche**. Un activo inteligente es una representación de un recurso del mundo real (por ejemplo, acciones o bonos) con conjuntos de reglas que rigen su comportamiento, como "no se puede negociar hasta mañana". La [API de la X-Chain](/reference/avalanchego/x-chain/api.md) admite la creación y el intercambio de Tokens Nativos de Avalanche.

Uno de los activos negociados en la X-Chain es AVAX. Cuando emites una transacción a una blockchain en Avalanche, pagas una tarifa denominada en AVAX.

La X-Chain es una instancia de la Máquina Virtual Avalanche (AVM).
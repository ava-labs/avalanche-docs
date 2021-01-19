---
descripción: Aprende los conceptos básicos y la arquitectura de Avalanche
---

# Resumen de la Plataforma

Avalanche cuenta con 3 blockchains incorporadas: [**Exchange Chain \(X-Chain\)**](./#exchange-chain-x-chain), [**Platform Chain \(P-Chain\)**](./#platform-chain-p-chain), y [**Contract Chain \(C-Chain**\)](./#contract-chain-c-chain). Las 3 blockchains están [validadas](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) y protegidas por la  [**Red Primaria**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). La Red Primaria es una [subnet](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet) especial, y todos los miembros de todas las subnets personalizadas deben ser también miembros de la Red Primaria haciendo stake de al menos 2 000 AVAX.

Aquí hay tutoriales de como [crear una subnet](../../build/tutorials/platform/create-a-subnet.md) y [agregar validadores](../../build/tutorials/nodes-and-staking/add-a-validator.md) a una subnet.

![Primary network](../../.gitbook/assets/primary-network.png)

## Subnets

Una **subnet**, o subred, es un conjunto dinámico de validadores que trabajan juntos para lograr un consenso sobre el estado de un conjunto de blockchains. Cada blockchain es validada por exactamente una subnet. Una subnet puede validar muchas blockchains. Un nodo puede ser miembro de muchas subnets.

Una subnet gestiona su propia pertenencia, y puede requerir que sus validadores constituyentes tengan ciertas propiedades. Esto es muy útil, y exploramos sus ramificaciones más a fondo a continuación:

### Cumplimiento


La arquitectura de subnet de Avalanche hace que el cumplimiento de la normativa sea manejable. Como se ha mencionado anteriormente, una subnet puede requerir que los validadores cumplan una serie de requisitos.

Algunos ejemplos son:

* Los validadores deben estar ubicados en un país determinado
* Los validadores deben pasar un control KYC/AML
* Los validadores deben tener una cierta licencia

### Soporte para Blockchains Privadas

Se puede crear una subnet en la que sólo pueden unirse ciertos validadores predefinidos y crear una subnet privada en la que el contenido de las blockchains sea visible sólo para esos validadores. Esto es ideal para las organizaciones interesadas en mantener su información privada.

### Separación de Inquietudes

En una red heterogénea de blockchains, algunos validadores no querrán validar ciertas blockchains porque simplemente no tienen interés en ellas. El modelo de subnet permite a los validadores sólo preocuparse de las blockchains que les interesan. Esto reduce la carga de los validadores.

### Requisitos Específicos de Aplicación

Diferentes aplicaciones basadas en blockchains pueden requerir que los validadores tengan ciertas propiedades. Supongamos que hay una aplicación que requiere grandes cantidades de RAM o potencia de CPU. Una subnet podría requerir que los validadores cumplan ciertos [requisitos de hardware](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche) para que la aplicación no sufra de bajo rendimiento debido a los validadores lentos.

## Virtual Machines

Una **Virtual Machine** \(o VM\) 
define la lógica a nivel de aplicación de una blockchain. En términos técnicos, especifica el estado de la blockchain, la función de transición de estado, las transacciones y la API a través de la cual los usuarios pueden interactuar con la blockchain. Cada blockchain de Avalanche es una instancia de una máquina virtual.

Cuando se escribe una VM, no es necesario preocuparse por la lógica de nivel inferior como la red, el consenso y la estructura de la blockchain. Avalanche hace esto tras bambalinas para que puedas concentrarte en lo que te gustaría construir.

Piense en una VM como un plano para una blockchain; puede usar la misma VM para crear muchas blockchains, cada una de las cuales sigue las mismas reglas pero es lógicamente independiente de otras blockchains.

### ¿Por qué Virtual Machines?

At first, blockchain networks had one Virtual Machine \(VM\) with a pre-defined, static set of functionality. This rigid, monolithic design limited what blockchain-based applications one could run on such networks.

People who wanted custom decentralized applications had to create their own, entirely new blockchain network from scratch. Doing so required a great deal of time and effort, offered limited security, and generally resulted in a bespoke, fragile blockchain that never got off the ground.

Ethereum made a step toward solving this problem with smart contracts. Developers didn’t need to worry about networking and consensus, but creating decentralized applications was still hard. The Ethereum VM has low performance and imposes restrictions on smart contract developers. Solidity and the other few languages for writing Ethereum smart contracts are unfamiliar to most programmers.

Avalanche VMs \(AVMs\) make it easy to define a blockchain-based decentralized application. Rather than new, limited languages like Solidity, developers can write VMs in Go \(other languages will be supported in the future\).

### Creating Your Blockchain and Virtual Machine

Avalanche does not yet support the creation of new Virtual Machines \(VMs\). Presently, Avalanche only supports the creation of new instances of the Avalanche VM.

{% page-ref page="../../build/tutorials/platform/create-a-new-blockchain.md" %}

In the future, Avalanche will allow you to define and launch custom blockchains, and we’ll release SDKs to help you do so.

{% page-ref page="../../build/tutorials/platform/create-a-virtual-machine-vm.md" %}

## Exchange Chain \(X-Chain\)

The **X-Chain** acts as a decentralized platform for creating and trading digital smart assets, a representation of a real-world resource \(e.g., equity, bonds\) with a set of rules that govern its behavior, like “can’t be traded until tomorrow” or “can only be sent to US citizens.”

One asset traded on the X-Chain is AVAX. When you issue a transaction to a blockchain on Avalanche, you pay a fee denominated in AVAX.

The X-Chain is an instance of the Avalanche Virtual Machine \(AVM\). The [X-Chain API](../../build/avalanchego-apis/exchange-chain-x-chain-api.md) allows clients to create and trade assets on the X-Chain and other instances of the AVM.

{% page-ref page="../../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

## Platform Chain \(P-Chain\)

The **P-Chain** is the metadata blockchain on Avalanche and coordinates validators, keeps track of active subnets, and enables the creation of new subnets. The P-Chain implements the [Snowman consensus protocol](../../#snowman-consensus-protocol).

The [P-Chain API](../../build/avalanchego-apis/platform-chain-p-chain-api.md) allows clients to create subnets, add validators to subnets, and create blockchains.

## Contract Chain \(C-Chain\)

The **C-Chain** allows for the creation smart contracts using the [C-Chain’s API](../../build/avalanchego-apis/contract-chain-c-chain-api.md).

The C-Chain is an instance of the Ethereum Virtual Machine powered by [Avalanche](../../).

<!--stackedit_data:
eyJoaXN0b3J5IjpbNjc5ODAxMDEzLDYzOTAyNTA3Nyw5MzAzMD
M1OTRdfQ==
-->
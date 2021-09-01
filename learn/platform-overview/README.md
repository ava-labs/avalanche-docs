---
description: Aprende los conceptos básicos y la arquitectura de Avalanche
---

# Resumen de la plataforma

Avalanche cuenta con 3 blockchains incorporadas: [**Exchange Chain \(X-Chain\)**](./#exchange-chain-x-chain), [**Plataforma Chain \(P-Chain\)**](./#platform-chain-p-chain) y [**Contract Chain \(C-Chain**\)](./#contract-chain-c-chain). Las 3 blockchains son [validadas](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) y garantizadas por la [**Red Primaria**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). La red primaria es una [subred](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet) especial, y todos los miembros de todas las subredes personalizadas deben ser también un miembro de la red primaria al consultar al menos 2000 AVAX.

Aquí hay tutoriales sobre [la creación](../../build/tutorials/platform/create-a-subnet.md) de una subred y [la adición](../../build/tutorials/nodes-and-staking/add-a-validator.md) de validadores a una subred.

![Red primaria](../../.gitbook/assets/image%20%2821%29.png)

## Subnet

Una subred o ****subred, es un conjunto dinámico de validadores que trabajan juntos para lograr el consenso sobre el estado de un conjunto de blockchains Cada blockchain es validada por exactamente una subnet. Una subnet puede validar muchas blockchains. Un nodo puede ser miembro de muchas subnets.

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

Diferentes aplicaciones basadas en blockchains pueden requerir que los validadores tengan ciertas propiedades. Supongamos que hay una aplicación que requiere grandes cantidades de RAM o potencia de CPU. Una subred podría requerir que los validadores cumplan ciertos [requisitos](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche) de hardware de modo que la aplicación no sufra de bajo rendimiento debido a los validadores lentos.

## Máquinas Virtuales

Una máquina **virtual **\(VM\) define la lógica de aplicación de una blockchain. En términos técnicos, especifica el estado de la blockchain, la función de transición de estado, las transacciones y la API a través de la cual los usuarios pueden interactuar con la blockchain. Cada blockchain de Avalanche es una instancia de una máquina virtual.

Cuando se escribe una VM, no es necesario preocuparse por la lógica de nivel inferior como la red, el consenso y la estructura de la blockchain. Avalanche hace esto tras bambalinas para que puedas concentrarte en lo que te gustaría construir.

Piense en una VM como un plano para una blockchain; puede usar la misma VM para crear muchas blockchains, cada una de las cuales sigue las mismas reglas pero es lógicamente independiente de otras blockchains.

### ¿Por qué Máquinas Virtuales?

Al principio, las redes blockchains tenían una Máquina Virtual \(VM\) con un conjunto predefinido y estático de funcionalidad. Este diseño rígido y monolítico limitaba las aplicaciones basadas en blockchains que se podían ejecutar en tales redes.

La gente que quería aplicaciones descentralizadas personalizadas tenía que crear su propia red de blockchains completamente nueva desde cero. Hacerlo requería una gran cantidad de tiempo y esfuerzo, ofrecía una seguridad limitada, y generalmente resultaba en una blockchain frágil a medida que nunca se ponía en marcha.

Ethereum dio un paso hacia la solución de este problema con los smart contracts. Los desarrolladores no necesitaban preocuparse por la red y el consenso, pero crear aplicaciones descentralizadas seguía siendo difícil. Las Ethereum VM tienen un bajo rendimiento e imponen restricciones a los desarrolladores de smart contracts. Solidity y los otros pocos lenguajes para escribir smart contracts de Ethereum son desconocidos para la mayoría de los programadores.

Las VMs de Avalanche \(AVMs\) hacen fácil definir una aplicación descentralizada basada en blockchains. En lugar de nuevos y limitados lenguajes como Solidity, los desarrolladores pueden escribir VMs en Go \(otros lenguajes serán soportados en el futuro\).

### Creando tu Blockchain y Virtual Machine

Avalanche admite la creación de nuevas instancias del VM de Avalanche.

{% page-ref page="../../build/tutorials/platform/create-avm-blockchain.md" %}

Avalanche también admite la creación de blockchains personalizadas con máquinas virtuales.

{% page-ref page="../../build/tutorials/platform/create-a-virtual-machine-vm.md" %}

{% page-ref page="../../build/tutorials/platform/create-custom-blockchain.md" %}

## Cadena de intercambios \(X-Chain\)

La **X-Chain **actúa como una plataforma descentralizada para crear y comerciar activos inteligentes digitales, una representación de un recurso en el mundo real \(por ejemplo, equidad, bonos\) con un conjunto de reglas que gobiernan su comportamiento, como "no se puede comerciar hasta mañana" o "solo puede ser enviado a los ciudadanos de EE.UU.".

Un activo comercializado en la X-Chain es AVAX. Cuando se emite una transacción a una blockchain en Avalanche, se paga una comisión denominada AVAX.

La X-Chain es una instancia de la Avalanche Virtual Machine \(AVM\). La [API](../../build/avalanchego-apis/exchange-chain-x-chain-api.md) de X-Chain permite a los clientes crear y comerciar activos en la X-Chain y otras instancias del AVM.

{% page-ref page="../../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

## Cadena de plataforma \(P-Chain\)

La P-Chain **es la blockchain de metadatos en Avalanche y **coordina validadores y mantiene un seguimiento de las subredes activas, y permite la creación de nuevas subredes. La P-Chain implementa el protocolo de [consenso Snowman](../../#snowman-consensus-protocol).

La [API de P-Chain](../../build/avalanchego-apis/platform-chain-p-chain-api.md) permite a los clientes crear subredes, agregar validadores a subredes y crear blockchains

## Cadena de contratos \(C-Chain\)

La **C-Chain **permite la creación de contratos inteligentes usando la [API de](../../build/avalanchego-apis/contract-chain-c-chain-api.md) la C-Chain.

La C-Chain es una instancia de la máquina virtual de Ethereum alimentada por [Avalanche](../../).


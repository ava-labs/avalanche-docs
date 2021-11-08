---
description: Conoce los conceptos principales y la arquitectura de Avalanche
---

# Resumen de la plataforma

Avalanche cuenta con tres blockchains integradas: [**Cadena de intercambios \(X-Chain\)**](./#exchange-chain-x-chain), [**Cadena de plataformas \(P-Chain\)**](./#platform-chain-p-chain) y [**Cadena de contratos \(C-Chain**\)](./#contract-chain-c-chain). Las tres blockchains están [validadas](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) y están protegidas por la [**Red primaria**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). La Red primaria es una [subred](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet) especial, y todos los miembros de todas las subredes personalizadas también deben ser miembros de la red primaria mediante la participación de al menos 2000 AVAX.

Aquí hay tutoriales acerca de [cómo crear](../../build/tutorials/platform/create-a-subnet.md) y [agregar validadores](../../build/tutorials/nodes-and-staking/add-a-validator.md) a una subred.

![Red primaria](../../.gitbook/assets/image%20%2821%29.png)

## Subredes

Una **subred** \(o subnet\) es un conjunto dinámico de validadores que trabajan juntos para lograr un consenso sobre el estado de un conjunto de blockchains. Cada blockchain es validada por exactamente una subnet. Una subnet puede validar muchas blockchains. Un nodo puede ser miembro de muchas subnets.

Una subnet gestiona su propia pertenencia, y puede requerir que sus validadores constituyentes tengan ciertas propiedades. Esto es muy útil, y exploramos sus ramificaciones más a fondo a continuación:

### Cumplimiento

La arquitectura de subnet de Avalanche hace que el cumplimiento de la normativa sea manejable. Como se ha mencionado anteriormente, una subnet puede requerir que los validadores cumplan una serie de requisitos.

Algunos ejemplos de requisitos incluyen:

* Los validadores deben estar ubicados en un país determinado
* Los validadores deben pasar un control KYC/AML
* Los validadores deben tener una cierta licencia

\(Para hablar con la máxima claridad, los ejemplos anteriores son solo eso: ejemplos. Estos requisitos no se aplican a la red primaria de Avalanche\).

### Soporte para Blockchains Privadas

Se puede crear una subnet en la que solo pueden unirse ciertos validadores predefinidos y crear una subnet privada en la que el contenido de las blockchains sea visible solo para esos validadores. Esto es ideal para las organizaciones interesadas en mantener su información privada.

### Separación de Inquietudes

En una red heterogénea de blockchains, algunos validadores no querrán validar ciertas blockchains porque simplemente no tienen interés en ellas. El modelo de subnet permite a los validadores solo preocuparse de las blockchains que les interesan. Esto reduce la carga de los validadores.

### Requisitos Específicos de Aplicación

Diferentes aplicaciones basadas en blockchains pueden requerir que los validadores tengan ciertas propiedades. Supongamos que hay una aplicación que requiere grandes cantidades de RAM o potencia de CPU. Una subred podría requerir que los validadores cumplan ciertos [requisitos de hardware](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche) para que la aplicación no sufra de bajo rendimiento debido a validadores lentos.

## Máquinas Virtuales

Una **máquina virtual **\(VM\) define la lógica de aplicación de una blockchain. En términos técnicos, especifica el estado de la blockchain, la función de transición de estado, las transacciones y la API a través de la cual los usuarios pueden interactuar con la blockchain. Cada blockchain de Avalanche es una instancia de una máquina virtual.

Cuando se escribe una VM, no es necesario preocuparse por la lógica de nivel inferior como la red, el consenso y la estructura de la blockchain. Avalanche hace esto tras bambalinas para que puedas concentrarte en lo que te gustaría construir.

Piense en una VM como un plano para una blockchain; puede usar la misma VM para crear muchas blockchains, cada una de las cuales sigue las mismas reglas pero es lógicamente independiente de otras blockchains.

### ¿Por qué Máquinas Virtuales?

Al principio, las redes blockchains tenían una Máquina Virtual \(VM\) con un conjunto predefinido y estático de funcionalidad. Este diseño rígido y monolítico limitaba las aplicaciones basadas en blockchains que se podían ejecutar en tales redes.

La gente que quería aplicaciones descentralizadas personalizadas tenía que crear su propia red de blockchains completamente nueva desde cero. Hacerlo requería una gran cantidad de tiempo y esfuerzo, ofrecía una seguridad limitada, y generalmente resultaba en una blockchain frágil a medida que nunca se ponía en marcha.

Ethereum dio un paso hacia la solución de este problema con los smart contracts. Los desarrolladores no necesitaban preocuparse por la red y el consenso, pero crear aplicaciones descentralizadas seguía siendo difícil. Las Ethereum VM tienen un bajo rendimiento e imponen restricciones a los desarrolladores de smart contracts. Solidity y los otros pocos lenguajes para escribir smart contracts de Ethereum son desconocidos para la mayoría de los programadores.

Las VM de Avalanche \(AVM\) hacen fácil definir una aplicación descentralizada basada en blockchains. En lugar de nuevos y limitados lenguajes como Solidity, los desarrolladores pueden escribir VM en Go \(otros lenguajes serán soportados en el futuro\).

### Creando tu Blockchain y Virtual Machine

Avalanche admite la creación de nuevas instancias de la VM de Avalanche.

{% page-ref page="../../build/tutorials/platform/create-avm-blockchain.md" %}

Avalanche también admite la creación de blockchains personalizadas con máquinas virtuales.

{% page-ref page="../../build/tutorials/platform/create-a-virtual-machine-vm.md" %}

{% page-ref page="../../build/tutorials/platform/create-custom-blockchain.md" %}

## Cadena de intercambios \(X-Chain\)

La **X-Chain** actúa como una plataforma descentralizada para la creación y el comercio de activos digitales inteligentes, una representación de un recurso del mundo real \(por ejemplo, acciones y bonos\) con un conjunto de reglas que rigen su comportamiento, como "no se puede comerciar hasta mañana" o "solo se puede enviar a los ciudadanos de EE. UU.".

Un activo comercializado en la X-Chain es AVAX. Cuando se emite una transacción a una blockchain en Avalanche, se paga una comisión denominada AVAX.

La X-Chain es una instancia de la Avalanche Virtual Machine \(AVM\). La [API de la X-Chain](../../build/avalanchego-apis/exchange-chain-x-chain-api.md) le permite a los clientes crear e intercambiar activos en la X-Chain y otras instancias de la AVM.

{% page-ref page="../../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

## Cadena de plataformas \(P-Chain\)

La **P-Chain **es la blockchain de metadatos en Avalanche, que coordina los validadores, mantiene el seguimiento de las subredes activas y permite la creación de nuevas subredes. La P-Chain implementa el [protocolo de consenso Snowball](../../#snowman-consensus-protocol).

La [API de la P-Chain](../../build/avalanchego-apis/platform-chain-p-chain-api.md) permite a los clientes crear subredes, añadir validadores a las subredes y crear blockchains.

## Cadena de contratos \(C-Chain\)

La **C-Chain **permite la creación de contratos inteligentes con la [API de la C-Chain](../../build/avalanchego-apis/contract-chain-c-chain-api.md).

La C-Chain es una instancia de la máquina virtual de Ethereum impulsada por [Avalanche](../../).


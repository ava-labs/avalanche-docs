---
description: Aprenda los conceptos básicos y la arquitectura de Avalanche

---

# Descripción de la plataforma

Avalanche cuenta con 3 cadenas de bloqueo incorporadas: Cadena [**de intercambio**](./#exchange-chain-x-chain) \(X-Chain\), Cadena [**de plataforma**](./#platform-chain-p-chain) \(P-Chain\) y [**Cadena de Contrato**](./#contract-chain-c-chain) \(C-Chain\). Los 3 blockchains son [validados](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) y garantizados por la [**Red Primaria**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). La Red Primaria es un [subred](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet) especial, y todos los miembros de todas las subredes personalizadas también deben ser miembro de la Red Primaria al sujetar al menos 2.000 AVAX.

Aquí hay tutoriales sobre [la creación de un subnet](../../build/tutorials/platform/create-a-subnet.md) y [la adición](../../build/tutorials/nodes-and-staking/add-a-validator.md) de validadores a un subnet.

![Red primaria](../../.gitbook/assets/image%20%2821%29.png)

## Subvenciones

Una **subred**, o subred, es un conjunto dinámico de validadores que trabajan juntos para lograr un consenso sobre el estado de un conjunto de cadenas de bloqueo. Cada blockchain es validado por exactamente un subnet. Un subnet puede validar muchas cadenas de bloqueo. Un nodo puede ser miembro de muchas subredes.

Un subnet gestiona su propia membresía, y puede requerir que sus validadores constitutivos tengan ciertas propiedades. Esto es muy útil, y exploramos sus ramificaciones en más profundidad a continuación:

### Cumplimiento de las normas

La arquitectura subnet de Avalanche hace que el cumplimiento reglamentario sea manejable. Como se ha mencionado anteriormente, un subred puede exigir a los validadores que cumplan un conjunto de requisitos.

Algunos ejemplos incluyen:

* Los validadores deben estar localizados en un país determinado
* Los validadores deben pasar los controles KYC/AML
* Los validadores deben tener una licencia determinada

### Soporte para Bloqueos Privados

Puede crear un subnet donde solo ciertos validadores predefinidos pueden unirse y crear un subred privado donde el contenido de las cadenas de bloques solo sería visible para esos validadores. Esto es ideal para organizaciones interesadas en mantener su información privada.

### Separación de las preocupaciones

En una red heterogénea de cadenas de bloqueo, algunos validadores no querrán validar ciertas cadenas de bloqueo porque simplemente no tienen interés en esas cadenas de bloqueo. El modelo de subnet permite a los validadores solo preocuparse por las cadenas de bloqueo que les interesan. Esto reduce la carga para los validadores.

### Requisitos específicos de aplicación

Diferentes aplicaciones basadas en blockchain pueden requerir que los validadores tengan ciertas propiedades. Supongamos que hay una aplicación que requiere grandes cantidades de energía RAM o CPU. Un Subred podría requerir que los validadores cumplan ciertos [requisitos](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche) de hardware para que la aplicación no sufra de bajo rendimiento debido a los validadores lentos.

## Máquinas virtuales

Una **máquina virtual** \(VM\) define la lógica de nivel de aplicación de una cadena de bloque. En términos técnicos, especifica el estado, la función de transición del blockchain, las transacciones y la API a través de la cual los usuarios pueden interactuar con el blockchain. Cada cadena de bloques en Avalanche es una instancia de un VM.

Cuando escribes un VM, no necesitas preocuparte por la lógica de menor nivel como el networking, el consenso y la estructura de la cadena de bloqueo. Avalanche hace esto detrás de las escenas para que pueda enfocarse en lo que le gustaría construir.

Piensa en un VM como un plan para un blockchain; puedes usar el mismo VM para crear muchas cadenas de bloqueo, cada uno de los cuales sigue el mismo blockchains, pero es lógicamente independiente de otras cadenas de bloque.

### ¿Por qué máquinas virtuales?

Al principio, las redes de blockchain tenían una máquina virtual \(VM\) con un conjunto de funcionalidades estáticas predefinidas. Este diseño monolítico rígido limitó las aplicaciones basadas en blockchain que se podría ejecutar en tales redes.

Las personas que querían aplicaciones descentralizadas personalizadas tenían que crear su propia red de blockchain completamente nueva desde cero. Para ello se requiere mucho tiempo y esfuerzo, se ofrece una seguridad limitada y, en general, se produjo una cadena de bloqueo a medida y frágil que nunca se bajó del suelo.

Ethereum dio un paso hacia la solución de este problema con contratos inteligentes. Los desarrolladores no tenían que preocuparse por la red y el consenso, pero la creación de aplicaciones descentralizadas seguía siendo difícil. El Ethereum VM tiene un bajo rendimiento e impone restricciones a los desarrolladores de contratos inteligentes. La solidez y los otros idiomas para escribir contratos inteligentes Ethereum no son familiares para la mayoría de los programadores.

Avalanche VMs \(AVMs\) facilita la definición de una aplicación descentralizada basada en blockchain. En lugar de nuevos idiomas limitados como Solidity, los desarrolladores pueden escribir VMs en Go \(otros idiomas serán compatibles en el futuro\).

### Crear su cadena de bloqueo y máquina virtual

Avalanche apoya la creación de nuevos ejemplos del VM Avalanche.

{% page-ref page=".. /../build/tutorials/platform/create-avm-blockchain.md" %}

Avalanche también admite crear blockchains personalizados con máquinas virtuales.

{% page-ref page=".. /../build/tutorials/platform/create-a-virtual-machine-vm.md" %}

{% page-ref page=".. /../build/tutorials/platform/create-custom-blockchain.md" %}

## Cadena de intercambio \(X-Chain\)

La **cadena X** actúa como una plataforma descentralizada para crear y comerciar activos inteligentes digitales, una representación de un recurso del mundo real \(por ejemplo, equidad, bonos\) con un conjunto de reglas que rigen su comportamiento, como "no se puede negociar hasta mañana" o "solo puede ser enviado a ciudadanos estadounidenses".

Un activo negociado en la cadena X es AVAX. Cuando emita una transacción a una cadena de bloques en Avalanche, pagas una tarifa denominada en AVAX.

La cadena X es una instancia de la máquina virtual de Avalanche \(AVM\). La [API de X-Chain](../../build/avalanchego-apis/exchange-chain-x-chain-api.md) permite a los clientes crear y comerciar activos en la cadena X y otras instancias del AVM.

{% page-ref page=".. /../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

## Cadena de plataforma \(P-Chain\)

La **cadena P** es la cadena de bloques de metadatos de Avalanche y coordina validadores, realiza un seguimiento de las subredes activas y permite la creación de nuevas subredes. La cadena P implementa el [protocolo de consenso de Snowman](../../#snowman-consensus-protocol).

La [API de cadena P](../../build/avalanchego-apis/platform-chain-p-chain-api.md) permite a los clientes crear subnets, agregar validadores a subnets y crear cadenas de bloqueo.

## Cadena de contrato \(C-Chain\)

La **cadena C** permite la creación de contratos inteligentes utilizando la [API de la](../../build/avalanchego-apis/contract-chain-c-chain-api.md) cadena C.

La cadena C es una instancia de la máquina virtual Ethereum alimentada por [Avalanche](../../).


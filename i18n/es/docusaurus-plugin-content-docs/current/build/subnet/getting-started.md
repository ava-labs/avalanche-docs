---
tags: [Construir, Subnets]
description: Planificar una implementación exitosa de Subnets comienza por determinar las necesidades de tu aplicación.
sidebar_label: Empezando
pagination_label: ¿Cuál es el ciclo de vida del desarrollo de Subnets?
---

# ¿Cuál es el ciclo de vida del desarrollo de Subnets?

Al comenzar tu viaje en Subnets, es útil ver el ciclo de vida de llevar una Subnet desde la idea a la producción.

## Descubre tus necesidades

El primer paso para planificar tu Subnet es determinar las necesidades de tu aplicación. ¿Qué características necesitas que la C-Chain Avalanche no proporciona? Tal vez quieres tu propio token de gas o sólo quieres permitir el acceso a clientes con KYC. [Cuándo construir en una Subnet vs. en la C-Chain](/build/subnet/c-chain-vs-subnet.md) puede ayudarte a tomar la decisión.

### Decide qué tipo de Subnet quieres

Una vez que has decidido usar una Subnet, necesitas decidir qué tipo de Subnet construir. Esto significa elegir una máquina virtual (VM) para crear tu Subnet. En términos generales, hay tres tipos de VM para elegir:

#### Subnets basadas en EVM

Las Subnets basadas en EVM son bifurcaciones de la C-Chain Avalanche. Soportan contratos inteligentes en Solidity y APIs estándar de Ethereum. [Subnet-EVM](https://github.com/ava-labs/subnet-evm) es la implementación de Ava Labs de una Subnet basada en EVM.

Subnet-EVM es, con mucho, la opción más segura y popular para construir tu Subnet. Tiene las herramientas de desarrollo más maduras y recibe actualizaciones regulares por parte del equipo de Ava Labs.

#### Subnets experimentales

Las Subnets experimentales son VMs de prueba de concepto desarrolladas por Ava Labs. Incluyen la VM Go de Timestamp, la VMRust de Timestamp y otras. Estas VMs son software de demostración y no están listas para entornos de producción. Aunque reciben actualizaciones periódicas, el equipo de Ava Labs no ha auditado su rendimiento y seguridad, interna o externamente. Sin embargo, estos proyectos de código abierto están destinados a inspirar a la comunidad y proporcionar capacidades novedosas no disponibles dentro de la EVM.

Si estás buscando empujar los límites de lo que es posible con las Subnets, este es un buen lugar para empezar.

#### Subnets personalizadas

Las Subnets personalizadas son una interfaz abierta que permite a los desarrolladores construir cualquier VM que puedan imaginar. Estas VMs pueden ser una bifurcación de una VM existente como Subnet-EVM, o incluso una VM no nativa de Avalanche como la máquina virtual de Solana. Alternativamente, puedes construir tu VM completamente desde cero utilizando casi cualquier lenguaje de programación. Consulta [Introducción a las VMs](/build/vm/intro.md) para obtener consejos sobre cómo empezar.

### Determina la tokenomía

Las Subnets son alimentadas por tokens de gas. Cuando construyes una Subnet, tienes la opción de decidir qué token usar y, opcionalmente, cómo distribuirlo. Puedes usar AVAX, un token existente de la C-Chain, o un token completamente nuevo. Tendrás que decidir cuánto de la oferta quieres usar para recompensar a los validadores, qué tipo de calendario de emisión quieres y cuánto airdrop hacer. Los bloques pueden quemar las tarifas de transacción o dárselas a los validadores como recompensa de bloque.

### Decide cómo personalizar tu Subnet

Después de seleccionar tu VM, es posible que quieras personalizarla. Esto puede significar hacer airdrop de tokens a tu equipo en la génesis, establecer tasas de tarifas de gas en tu red o cambiar el comportamiento de tu VM a través de precompilaciones. Estas personalizaciones son difíciles de hacer correctamente en papel y generalmente requieren un poco de prueba y error para determinarlas correctamente. Consulta [Personaliza tu Subnet alimentada por EVM](/build/subnet/upgrade/customize-a-subnet.md) para obtener instrucciones sobre cómo configurar Subnet-EVM.

## Aprende Avalanche-CLI

Ahora que has especificado los requisitos de tu Subnet, el siguiente paso es aprender Avalanche-CLI.

Avalanche-CLI es la mejor herramienta para prototipar rápidamente Subnets y desplegarlas en producción. Puedes usarla a lo largo de todo el ciclo de vida del desarrollo de la Subnet. Para empezar, echa un vistazo a [Construye tu primera Subnet](/build/subnet/hello-subnet.md).

### Despliega tu Subnet localmente

La primera etapa del desarrollo de la Subnet implica probar tu Subnet en tu máquina local o en un servidor de nube privado como Amazon EC2. El objetivo de esta fase es asegurar tus personalizaciones de Subnet y crear tu dapp de pila completa sin las restricciones de desplegar en una red pública.

El desarrollo es extremadamente rápido y las actualizaciones tardan segundos o minutos en aplicarse. En esta fase, debes restringir el acceso de la dapp a partes de confianza. Debido a que estás interactuando con una copia local de la red Avalanche, no puedes acceder al estado de producción u otras Subnets de producción.

### Despliega tu Subnet en Fuji

La segunda etapa del desarrollo de la Subnet implica desplegar tu Subnet y tu dapp en la Testnet Fuji. Esta fase prueba tu capacidad para ejecutar nodos validadores, coordinar a todas las partes involucradas en la Subnet y monitorear la salud de la red. También puedes practicar el uso de Ledgers para gestionar transacciones de la Subnet.

La Subnet es públicamente visible y es posible que quieras permitir que usuarios externos prueben tu dapp. El desarrollo en Fuji es significativamente más lento que con el desarrollo local. Las actualizaciones ahora pueden tardar horas o días en aplicarse. Es importante hacer tantas pruebas locales como sea posible antes de pasar a Fuji.

### Despliega tu Subnet en Mainnet

La etapa final del desarrollo de la Subnet es crear tu Subnet en Mainnet y desplegar tu dapp. Es hora de dejar entrar a tus usuarios reales.

Una vez que tu Subnet está en producción, tienes poca flexibilidad para cambiarla. Algunas alteraciones son posibles, pero requieren días o semanas para implementarse y desplegarse.

Tu enfoque debería cambiar a preservar la estabilidad de la red y actualizar tus nodos según sea necesario.

## Empieza a desarrollar VMs personalizadas

Si has dominado Subnet-EVM y estás buscando un desafío adicional, considera construir una VM personalizada. La red Avalanche soporta mucho más que sólo la EVM. Las VMs actuales sólo rascan la superficie de lo que es posible.

Algunas ideas:

- Porta un proyecto de blockchain existente a Avalanche. Por ejemplo: Usa la VM de Bitcoin o la VM de Solana.
- Crea una VM específica para una aplicación en lugar de una VM de propósito general. Por ejemplo, crea una VM de DEX o una VM de CLOB en lugar de algo como la EVM.
- Crea una implementación más eficiente de la EVM.

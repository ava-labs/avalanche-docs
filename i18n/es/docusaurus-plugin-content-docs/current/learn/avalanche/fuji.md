---
tags: [Fuji Testnet]
description: Fuji Testnet es la red de pruebas oficial para el ecosistema Avalanche.
palabras clave: [docs, fuji, testnet, construir en avalanche]
sidebar_label: Fuji Testnet
---

# Fuji Testnet

La Fuji Testnet sirve como la red de pruebas oficial para el ecosistema Avalanche.

La infraestructura de Fuji imita a la Mainnet de Avalanche. Está compuesta por una
[Red Primaria](/learn/avalanche/avalanche-platform.md) formada por instancias de X, P y C-Chain,
así como muchas Subnets de prueba.

## ¿Por qué usar Fuji en lugar de Mainnet?

Fuji proporciona a los usuarios una plataforma para simular las condiciones encontradas en el entorno Mainnet. 
Permite a los desarrolladores desplegar Smart Contracts de demostración, permitiéndoles probar y refinar sus aplicaciones
antes de desplegarlas en la [Red Primaria](/learn/avalanche/avalanche-platform.md).

Los usuarios interesados en experimentar con Avalanche pueden recibir AVAX de testnet gratuitos, lo que les permite
explorar la plataforma sin ningún riesgo. Estos tokens de testnet no tienen valor en el mundo real y son
solo para fines de experimentación dentro de la red de pruebas Fuji.

Para recibir tokens de testnet, los usuarios pueden solicitar fondos desde el
[Avalanche Faucet](/build/dapp/smart-contracts/get-funds-faucet.md).
Si ya hay un saldo de AVAX mayor que cero en Mainnet,
pegue la dirección de la C-Chain allí y solicite tokens de prueba. De lo contrario,
por favor solicite un cupón de faucet en
[Guild](https://guild.xyz/avalanche). Los administradores y moderadores en el [Discord](https://discord.com/invite/RwXY7P6)
oficial pueden proporcionar AVAX de testnet si los desarrolladores no pueden obtenerlo de las otras dos opciones.

## Consideraciones adicionales

- La Fuji Testnet tiene su propio [explorador de bloques](https://subnets-test.avax.network/).
- El punto final de la API pública para Fuji no es el mismo que para Mainnet. Más información está disponible en la
documentación del [Servidor de API Pública](/tooling/rpc-providers.md).
- Aunque la Red Fuji es un recurso valioso, los desarrolladores también tienen la opción de explorar
[Avalanche Network Runner](/tooling/network-runner.md)
como un medio alternativo para probar localmente sus proyectos, asegurando una evaluación completa y
ajuste fino antes de interactuar con la red más amplia.

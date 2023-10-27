---
tags: [Construir, Subnets]
description: Esta guía de cómo hacer se centra en tomar una Subnet con permisos ya creada y transformarla en una Subnet elástica (o sin permisos).
sidebar_label: Hacer Subnet sin Permisos
pagination_label: Transformar una Subnet con Permisos en una Subnet Elástica
sidebar_position: 0
---

# Cómo Transformar una Subnet con Permisos en una Subnet Elástica

Las Subnets Elásticas son Subnets sin permisos. Puedes encontrar más información [aquí](/build/subnet/elastic/elastic-parameters.md).

Esta guía de cómo hacer se centra en tomar una Subnet con permisos ya creada y transformarla en una
Subnet elástica (o sin permisos).

## Requisitos previos

- [Avalanche-CLI instalado](/tooling/cli-guides/install-avalanche-cli.md)
- Has desplegado una Subnet con permisos en [local](/build/subnet/deploy/local-subnet.md), en
  [Fuji](/build/subnet/deploy/fuji-testnet-subnet.md) o en [Mainnet](/build/subnet/deploy/mainnet-subnet.md)

## Empezando

En los siguientes comandos, asegúrate de sustituir el nombre de tu configuración de Subnet por
`<subnetName>`.

Para transformar tu Subnet con permisos en una Subnet Elástica (NOTA: esta acción es irreversible), ejecuta

`avalanche subnet elastic <subnetName>`

y selecciona la red en la que quieres transformar la Subnet. Alternativamente, puedes omitir esta
solicitud proporcionando la bandera `--local`, `--fuji` o `--mainnet`.

Proporciona el nombre y el símbolo del token nativo de la Subnet sin permisos. También puedes omitir
esta solicitud proporcionando las banderas `--tokenName` y `--tokenSymbol`.

A continuación, selecciona la configuración de la Subnet Elástica. Puedes elegir usar los valores predeterminados detallados
[aquí](/build/subnet/elastic/elastic-parameters.md#primary-network-parameters-on-mainnet)
o personalizar la configuración de la Subnet Elástica. Para omitir la solicitud, puedes usar la bandera `--default` para usar
la configuración predeterminada de la Subnet Elástica.

El comando puede tardar unos minutos en ejecutarse.

### Transformación de la Subnet Elástica en Fuji y Mainnet

La transformación de la Subnet Elástica en una red pública requiere que la clave privada esté cargada en la herramienta, o un
dispositivo ledger conectado.

Tanto el uso de claves almacenadas como el uso de ledger están habilitados en Fuji (más información sobre la creación de claves
[aquí](/build/subnet/deploy/fuji-testnet-subnet.md#private-key))
mientras que sólo el uso de ledger está habilitado en Mainnet (más información sobre la configuración de tu ledger
[aquí](/build/subnet/deploy/mainnet-subnet.md#setting-up-your-ledger)).

Para transformar una Subnet con permisos en una Subnet Elástica en redes públicas, los usuarios deben
proporcionar las claves que controlan la Subnet definida durante el proceso de despliegue de la Subnet (más información sobre las claves en Fuji se puede encontrar
[aquí](/build/subnet/deploy/fuji-testnet-subnet.md#deploy-the-subnet),
mientras que más información sobre la firma de ledger en Mainnet se puede encontrar
[aquí](/build/subnet/deploy/mainnet-subnet.md#deploy-the-subnet)).

### Resultados

Si todo funciona como se espera, entonces tienes la opción de transformar automáticamente todos los validadores con permisos existentes en validadores sin permisos.

También puedes omitir la transformación automática en este punto y elegir añadir manualmente validadores sin permisos más tarde.

Puedes usar los detalles de salida como el ID del activo y el ID de la Subnet Elástica para conectarte e interactuar con tu Subnet Elástica.

## Añadir Validadores sin Permisos a la Subnet Elástica

Si estás ejecutando este comando en una red local, primero tendrás que eliminar los validadores con permisos (ejecutando `avalanche subnet removeValidator <subnetName>`) para que puedas tener una lista de nodos locales para elegir a cuál añadir como validador sin permisos en la Subnet Elástica.

Para añadir validadores sin permisos a una Subnet Elástica, ejecuta

`avalanche subnet join <subnetName> --elastic`

Se te pedirá qué nodo te gustaría añadir como validador sin permisos. Puedes omitir esta solicitud usando la bandera `--nodeID`.

A continuación, se te pedirá la cantidad del token nativo de la Subnet que te gustaría apostar en el validador. Alternativamente, puedes omitir esta solicitud proporcionando la bandera `--stake-amount`. Ten en cuenta que elegir añadir la cantidad máxima de apuesta del validador (definida durante el paso de transformación de la Subnet Elástica arriba) significa que efectivamente deshabilitas la delegación en tu validador.

A continuación, selecciona cuándo el validador empezará a validar y cuánto tiempo estará validando. También puedes omitir estas solicitudes usando las banderas `--start-time` y `--staking-period`.

## Añadir Delegador sin Permisos a un Validador sin Permisos en la Subnet Elástica

Para añadir delegadores sin permisos, ejecuta

`avalanche subnet addPermissionlessDelegator <subnetName>`

Se te pedirá a qué validador de la Subnet te gustaría delegar. Puedes omitir esta solicitud usando la bandera `--nodeID`.

A continuación, se te pedirá la cantidad del token nativo de la Subnet que te gustaría apostar en el validador. Alternativamente, puedes omitir esta solicitud proporcionando la bandera `--stake-amount`. La cantidad que se puede delegar a un validador se detalla
[aquí](/build/subnet/elastic/elastic-parameters.md#delegators-weight-checks).

A continuación, selecciona cuándo quieres empezar a delegar y cuánto tiempo quieres delegar. También puedes omitir estas solicitudes usando las banderas `--start-time` y `--staking-period`.

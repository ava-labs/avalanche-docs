---
etiquetas: [Construir, Subredes]
descripción: Esta guía de cómo hacer se centra en tomar una Subred con permisos ya creada y transformarla en una Subred elástica (o sin permisos).
sidebar_label: Hacer Subred sin Permisos
pagination_label: Transformar una Subred con Permisos en una Subred Elástica
sidebar_position: 0
---

# Cómo Transformar una Subred con Permisos en una Subred Elástica

Las Subredes Elásticas son Subredes sin permisos. Puedes encontrar más información [aquí](/build/subnet/elastic/elastic-parameters.md).

Esta guía de cómo hacer se centra en tomar una Subred con permisos ya creada y transformarla en una
Subred elástica (o sin permisos).

## Requisitos previos

- [Avalanche-CLI instalado](/tooling/cli-guides/install-avalanche-cli.md)
- Has desplegado una Subred con permisos en [local](/build/subnet/deploy/local-subnet.md), en
[Fuji](/build/subnet/deploy/fuji-testnet-subnet.md) o en [Mainnet](/build/subnet/deploy/mainnet-subnet.md)

## Empezando

En los siguientes comandos, asegúrate de sustituir el nombre de tu configuración de Subred por
`<subnetName>`.

Para transformar tu Subred con permisos en una Subred Elástica (NOTA: esta acción es irreversible), ejecuta

`avalanche subnet elastic <subnetName>`

y selecciona la red en la que quieres transformar la Subred. Alternativamente, puedes omitir esta
solicitud proporcionando la bandera `--local`, `--fuji` o `--mainnet`.

Proporciona el nombre y el símbolo del token nativo de la Subred sin permisos. También puedes omitir
esta solicitud proporcionando las banderas `--tokenName` y `--tokenSymbol`.

A continuación, selecciona la configuración de la Subred Elástica. Puedes elegir usar los valores predeterminados detallados
[aquí](/build/subnet/elastic/elastic-parameters.md#primary-network-parameters-on-mainnet)
o personalizar la configuración de la Subred Elástica. Para omitir la solicitud, puedes usar la bandera `--default` para usar
la configuración predeterminada de la Subred Elástica.

El comando puede tardar unos minutos en ejecutarse.

### Transformación de la Subred Elástica en Fuji y Mainnet

La transformación de la Subred Elástica en una red pública requiere que la clave privada esté cargada en la herramienta, o un
dispositivo ledger conectado.

Tanto el uso de claves almacenadas como el uso de ledger están habilitados en Fuji (más información sobre la creación de claves
[aquí](/build/subnet/deploy/fuji-testnet-subnet.md#private-key))
mientras que sólo el uso de ledger está habilitado en Mainnet (más información sobre la configuración de tu ledger
[aquí](/build/subnet/deploy/mainnet-subnet.md#setting-up-your-ledger)).

Para transformar una Subred con permisos en una Subred Elástica en redes públicas, los usuarios deben
proporcionar las claves que controlan la Subred definida durante el proceso de despliegue de la Subred (más información sobre las claves en Fuji se puede encontrar
[aquí](/build/subnet/deploy/fuji-testnet-subnet.md#deploy-the-subnet),
mientras que más información sobre la firma de ledger en Mainnet se puede encontrar
[aquí](/build/subnet/deploy/mainnet-subnet.md#deploy-the-subnet)).

### Resultados

Si todo funciona como se espera, entonces tienes la opción de transformar automáticamente todos los validadores con permisos existentes en validadores sin permisos.

También puedes omitir la transformación automática en este punto y elegir añadir manualmente validadores sin permisos más tarde.

Puedes usar los detalles de salida como el ID del activo y el ID de la Subred Elástica para conectarte e interactuar con tu Subred Elástica.

## Añadir Validadores sin Permisos a la Subred Elástica

Si estás ejecutando este comando en una red local, primero tendrás que eliminar los validadores con permisos (ejecutando `avalanche subnet removeValidator <subnetName>`) para que puedas tener una lista de nodos locales para elegir a cuál añadir como validador sin permisos en la Subred Elástica.

Para añadir validadores sin permisos a una Subred Elástica, ejecuta

`avalanche subnet join <subnetName> --elastic`

Se te pedirá qué nodo te gustaría añadir como validador sin permisos. Puedes omitir esta solicitud usando la bandera `--nodeID`.

A continuación, se te pedirá la cantidad del token nativo de la Subred que te gustaría apostar en el validador. Alternativamente, puedes omitir esta solicitud proporcionando la bandera `--stake-amount`. Ten en cuenta que elegir añadir la cantidad máxima de apuesta del validador (definida durante el paso de transformación de la Subred Elástica arriba) significa que efectivamente deshabilitas la delegación en tu validador.

A continuación, selecciona cuándo el validador empezará a validar y cuánto tiempo estará validando. También puedes omitir estas solicitudes usando las banderas `--start-time` y `--staking-period`.

## Añadir Delegador sin Permisos a un Validador sin Permisos en la Subred Elástica

Para añadir delegadores sin permisos, ejecuta

`avalanche subnet addPermissionlessDelegator <subnetName>`

Se te pedirá a qué validador de la Subred te gustaría delegar. Puedes omitir esta solicitud usando la bandera `--nodeID`.

A continuación, se te pedirá la cantidad del token nativo de la Subred que te gustaría apostar en el validador. Alternativamente, puedes omitir esta solicitud proporcionando la bandera `--stake-amount`. La cantidad que se puede delegar a un validador se detalla
[aquí](/build/subnet/elastic/elastic-parameters.md#delegators-weight-checks).

A continuación, selecciona cuándo quieres empezar a delegar y cuánto tiempo quieres delegar. También puedes omitir estas solicitudes usando las banderas `--start-time` y `--staking-period`.
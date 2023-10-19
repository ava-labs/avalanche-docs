---
tags: [Construir, Subnets]
description: Para eliminar una configuración de Subnet creada, ejecuta `avalanche subnet delete <nombreSubnet>`.
sidebar_label: Eliminar una Subnet
pagination_label: Cómo Eliminar una Subnet
sidebar_position: 2
---

# Cómo Eliminar una Subnet

## Eliminando una Configuración de Subnet

Para eliminar una configuración de Subnet creada, ejecuta

`avalanche subnet delete <nombreSubnet>`

## Eliminando una Subnet Desplegada

No puedes eliminar Subnets desplegadas en Mainnet o en la Testnet Fuji.

Sin embargo, puedes eliminar Subnets desplegadas en una red local limpiando el estado de la red con

```shell
avalanche network clean
```

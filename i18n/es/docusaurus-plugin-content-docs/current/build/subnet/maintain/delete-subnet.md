---
etiquetas: [Construir, Subredes]
descripción: Para eliminar una configuración de Subred creada, ejecuta `avalanche subnet delete <nombreSubred>`.
sidebar_label: Eliminar una Subred
pagination_label: Cómo Eliminar una Subred
sidebar_position: 2
---

# Cómo Eliminar una Subred

## Eliminando una Configuración de Subred

Para eliminar una configuración de Subred creada, ejecuta

`avalanche subnet delete <nombreSubred>`

## Eliminando una Subred Desplegada

No puedes eliminar Subredes desplegadas en Mainnet o en la Testnet Fuji.

Sin embargo, puedes eliminar Subredes desplegadas en una red local limpiando el estado de la red con

```shell
avalanche network clean
```
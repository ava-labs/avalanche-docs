---
tags: [Construir, Subnets, Avalanche-CLI]
description: Si necesitas enviar fondos a tu clave de control de Subnet o necesitas mover fondos de un índice de dirección Ledger a otro, esta guía demostrará cómo habilitar transferencias directas entre direcciones de la cadena P utilizando el comando Avalanche-CLI `avalanche key transfer`.
sidebar_label: Transferir Fondos de la Cadena P
pagination_label: Cómo Usar Avalanche-CLI para Transferir Fondos de la Cadena P
sidebar_position: 3
---

# Cómo Usar Avalanche-CLI para Transferir Fondos de la Cadena P

Transferir fondos entre billeteras de la Cadena P se vuelve necesario en ciertas situaciones:

1. Los fondos necesitan ser enviados a la clave de control de la Subnet, que podría tener un saldo cero debido a pagos de tarifas. La clave de control de la Subnet requiere financiamiento para asegurar un soporte adecuado para las operaciones de la Subnet.
2. Los fondos necesitan ser movidos de un índice de dirección Ledger a otro. Un Ledger administra una secuencia infinita de direcciones, todas derivadas de una clave privada maestra y puede firmar por cualquiera de esas direcciones. Cada una se denomina por un índice, o la dirección asociada. Avalanche-CLI suele esperar usar el índice 0, pero a veces, los fondos están en un índice diferente. Ocasionalmente, una transferencia hecha a un ledger se puede hacer a una dirección diferente a la que usa por defecto la CLI.

Para habilitar transferencias directas entre direcciones de la Cadena P, usa el comando `avalanche key transfer` de Avalanche-CLI. Esta operación implica una serie de acciones de importación/exportación con la Cadena P y la Cadena X. La tarifa por esta operación es cuatro veces la tarifa típica de operación de importación, lo que equivale a 0.004 AVAX. Puedes encontrar más información sobre las tarifas [aquí](/reference/standards/guides/txn-fees).

:::nota

El comando `key transfer` también se puede aplicar a las claves almacenadas gestionadas por la CLI. Permite mover fondos de una clave almacenada a otra, y de un ledger a una clave almacenada o viceversa.

:::
Esta guía paso a paso se centra en transferir fondos entre cuentas ledger.

## Requisitos Previos

- [`Avalanche-CLI`](/tooling/cli-guides/install-avalanche-cli) instalado
- Múltiples dispositivos Ledger [configurados para Avalanche](/build/subnet/deploy/mainnet-subnet.md#setting-up-your-ledger)

## Ejemplo: Enviar Todos los Fondos de un Ledger a Otro

- Dirección de origen: ledger A, índice 2 (la billetera web muestra 4.5 AVAX para este ledger)
- Dirección de destino: ledger B, índice 0 (la billetera web muestra 0 AVAX para este ledger)

### Determinar el Índice de la Dirección del Remitente

Un ledger puede gestionar una cantidad infinita de direcciones derivadas de una clave privada principal. Debido a esto, muchas operaciones requieren que el usuario especifique un índice de dirección.

Después de confirmar con una billetera web que hay 4.5 AVAX disponibles en la dirección de la cadena p `P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0`, conecta el ledger A.

Con la aplicación Avalanche en ejecución, ejecuta:

```bash
avalanche key list --mainnet --ledger 0,1,2,3,4,5
```

Para ver las direcciones y saldos de la cadena p para los primeros 6 índices en las direcciones de propietario derivadas del ledger.

```text
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
|  TIPO  |  NOMBRE |          CADENA         |                    DIRECCIÓN                   | BALANCE | RED     |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
| ledger | índice 0 | P-Chain (formato Bech32) | P-avax1g8yucm7j0cnwwru4rp5lkzw6dpdxjmc2rfkqs9 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 1 |                         | P-avax1drppshkst2ccygyq37m2z9e3ex2jhkd2txcm5r |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 2 |                         | P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0 |     4.5 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 3 |                         | P-avax1yfpm7v5y5rej2nu7t2r0ffgrlpfq36je0rc5k6 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 4 |                         | P-avax17nqvwcqsa8ddgeww8gzmfe932pz2syaj2vyd89 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 5 |                         | P-avax1jzvnd05vsfksrtatm2e3rzu6eux9a287493yf8 |       0 | Mainnet |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
```

La dirección `P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0` tiene 4.5 AVAX y está asociada con el índice 2 del ledger A.

### Determinar el Índice de la Dirección del Receptor

En este caso, el usuario quiere usar el índice 0, el que la CLI espera contener fondos de forma predeterminada.

Para el comando de transferencia, también es necesario conocer la dirección de la cadena p de destino. Haz lo siguiente para obtenerla:

Con el ledger B conectado y la aplicación avalanche en ejecución, ejecuta:

```bash
avalanche key list --mainnet --ledger 0
```

```text
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
|  TIPO  |  NOMBRE |          CADENA         |                    DIRECCIÓN                   | BALANCE | RED     |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
| ledger | índice 0 | P-Chain (formato Bech32) | P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm |       0 | Mainnet |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
```

La dirección de destino a utilizar es `P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm`, que contiene 0 fondos.

### Enviar la Transferencia

Una transferencia de P-Chain a P-Chain es una operación de dos partes. No es necesario que las dos partes se ejecuten en la misma máquina, solo que tengan algunos parámetros en común. Para cada parte, el libro mayor apropiado (ya sea de origen o de destino) debe estar conectado a la máquina que lo ejecuta.

El primer paso mueve el dinero de la cuenta de origen a una cuenta de la X-Chain propiedad del receptor. Necesita ser firmado por el libro mayor de envío.

Ingrese la cantidad de AVAX a enviar al destinatario. Esta cantidad no incluye tarifas.

Tenga en cuenta que el libro mayor de envío paga todas las tarifas.

Luego, inicie el comando:

```bash
avalanche key transfer
```

El primer paso es especificar la red. `Mainnet` en este caso:

```text
Use las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Qué red usar?:
  ▸ Mainnet
    Fuji
    Red local
```

A continuación, se debe especificar el paso de la transferencia. Enviar en este caso:

```text
? ¿Paso de la transferencia?:
  ▸ Enviar
    Recibir
```

A continuación, se solicita la fuente de clave para la dirección del remitente. Es decir, la clave que va a firmar las transacciones de envío. Seleccione `Usar ledger`:

```text
? ¿Qué fuente de clave se debe usar para la dirección del remitente?:
    Usar clave almacenada
  ▸ Usar ledger
```

A continuación, se solicita el índice del ledger. Ingrese `2`:

```text
✗ Índice del ledger a usar: 2
```

A continuación, se solicita la cantidad a enviar:

```text
✗ Cantidad a enviar (unidades de AVAX): 4.496
```

Luego, se requiere la dirección de destino:

```text
✗ Dirección del receptor: P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm
```

Después de eso, se imprime un mensaje de confirmación. Lea cuidadosamente y elija `Sí`:

```text
esta operación va a:
- enviar 4.496000000 AVAX desde la dirección P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0 a la dirección de destino P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm
- tomar una tarifa de 0.004000000 AVAX de la dirección de origen P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0

Use las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Confirmar transferencia?:
    No
  ▸ Sí
```

Después de esto, se completa la primera parte:

```text
Emitiendo ExportTx P -> X
```

### Recibir la transferencia

En este paso, el Ledger B firma la transacción para recibir los fondos. Importa los fondos en la X-Chain
antes de exportarlos de vuelta a la dirección deseada en la P-Chain.

Conecte el ledger B y ejecute la aplicación avalanche.

Luego, inicie el comando:

```bash
avalanche key transfer
```

Especifique la red `Mainnet`:

```text
Use las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Qué red usar?:
  ▸ Mainnet
    Fuji
    Red local
```

A continuación, se debe especificar el paso de la transferencia. Recibir en este caso:

```text
? ¿Paso de la transferencia?:
    Enviar
  ▸ Recibir
```

Luego, seleccione Ledger como la fuente de clave que va a firmar las operaciones de recepción.

```text
? ¿Qué fuente de clave se debe usar para la dirección del receptor?:
    Usar clave almacenada
  ▸ Usar ledger
```

A continuación, se solicita el índice del ledger. Ingrese `0`:

```text
✗ Índice del ledger a usar: 0
```

A continuación, se solicita la cantidad a recibir:

```text
✗ Cantidad a enviar (unidades de AVAX): 4.496
```

Después de eso, se imprime un mensaje de confirmación. Seleccione `Sí`:

```text
esta operación va a:
- recibir 4.496000000 AVAX en la dirección de destino P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm:

Use las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Confirmar transferencia?:
    No
  ▸ Sí
```

Finalmente, se ejecuta la segunda parte de la operación y se completa la transferencia.

```text
Emitiendo ImportTx P -> X
Emitiendo ExportTx X -> P
Emitiendo ImportTx X -> P
```

### Verificar los resultados de la operación de transferencia usando `key list`

Primero verifique las cuentas del ledger A. Conecte el ledger A y abra la aplicación avalanche:

```bash
avalanche key list --mainnet --ledger 0,1,2,3,4,5
```

Con el resultado:

```text
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
|  TIPO  |  NOMBRE |          CADENA          |                    DIRECCIÓN                   | BALANCE | RED     |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
| ledger | índice 0 | P-Chain (formato Bech32) | P-avax1g8yucm7j0cnwwru4rp5lkzw6dpdxjmc2rfkqs9 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 1 |                         | P-avax1drppshkst2ccygyq37m2z9e3ex2jhkd2txcm5r |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 2 |                         | P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 3 |                         | P-avax1yfpm7v5y5rej2nu7t2r0ffgrlpfq36je0rc5k6 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 4 |                         | P-avax17nqvwcqsa8ddgeww8gzmfe932pz2syaj2vyd89 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 5 |                         | P-avax1jzvnd05vsfksrtatm2e3rzu6eux9a287493yf8 |       0 | Mainnet |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
```

A continuación, verifique las cuentas del ledger B. Conecte el ledger B y abra la aplicación avalanche:

```bash
avalanche key list --mainnet --ledger 0,1,2,3,4,5
```

Con resultado:

```text
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
|  TIPO  |  NOMBRE |          CADENA         |                   DIRECCIÓN                   | BALANCE | RED     |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
| ledger | índice 0 | P-Chain (formato Bech32) | P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm |   4.496 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 1 |                         | P-avax18e9qsm30du590lhkwydhmkfwhcc9999gvxcaez |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 2 |                         | P-avax1unkkjstggvdty5gtnfhc0mgnl7qxa52z2d4c9y |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 3 |                         | P-avax1ek7n0zky3py7prxcrgnmh44y3wm6lc7r7x5r8e |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 4 |                         | P-avax1rsz6nt6qht5ep37qjk7ht0u9h30mgfhehsmqea |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | índice 5 |                         | P-avax17u5wm4tfex7xr27xlwejm28pyk84tj0jzp42zz |       0 | Mainnet |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
```

### Pasos de Recuperación

Como una operación de varios pasos, la parte receptora de la transferencia puede tener errores intermedios, debido, por ejemplo,
a conexiones de red temporales en el lado del cliente.

La CLI va a capturar los errores y proporcionar al usuario un mensaje de recuperación del tipo:

```text
ERROR: reinicie desde este paso utilizando el mismo comando con argumentos adicionales: --receive-recovery-step 1
```

Si esto sucede, la operación receptora debe iniciarse de la misma manera, eligiendo las mismas opciones, pero
agregando el parámetro adicional sugerido:

```bash
avalanche key transfer --receive-recovery-step 1
```

Luego, la CLI va a continuar desde donde se quedó.

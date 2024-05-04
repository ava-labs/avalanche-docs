---
tags: [Construir, Máquinas Virtuales]
description: Ejecutando tus casos de prueba
sidebar_label: Ejecutando tus casos de prueba
pagination_label: Ejecutando tus casos de prueba
sidebar_position: 5
---

# Ejecutando tus casos de prueba

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

En esta sección, veremos cómo poder ejecutar los casos de prueba que escribiste en la sección anterior.

## Agregando el Archivo de Génesis de Prueba

Para ejecutar nuestras pruebas de contrato e2e, necesitaremos crear una Subnet que tenga el precompilado `Hello World` activado, por lo que copiaremos y pegaremos el siguiente archivo de génesis en: `/tests/precompile/genesis/hello_world.json`.

Nota: es importante que este archivo tenga el mismo nombre que el archivo de prueba HardHat que creamos anteriormente.

```json
{
  "config": {
    "chainId": 99999,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "feeConfig": {
      "gasLimit": 20000000,
      "minBaseFee": 1000000000,
      "targetGas": 100000000,
      "baseFeeChangeDenominator": 48,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 10000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 500000
    },
    "helloWorldConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    },
    "0x0Fa8EA536Be85F32724D57A37758761B86416123": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x66321C34",
  "extraData": "0x00",
  "gasLimit": "0x1312D00",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

Agregar esto a nuestra génesis habilita nuestra precompilación HelloWorld en el bloque génesis (bloque 0), con
`0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` como dirección de administrador.

```json
{
  "helloWorldConfig": {
    "blockTimestamp": 0,
    "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

## Declarando la Prueba E2E de HardHat

Ahora que hemos declarado la prueba de HardHat y el archivo `genesis.json` correspondiente, el último paso para ejecutar la prueba e2e es declarar la nueva prueba en `/tests/precompile/solidity/suites.go`.

Al final del archivo verás el siguiente código comentado:

```go
	// TODO: can we refactor this so that it automagically checks to ensure each hardhat test file matches the name of a hardhat genesis file
	// and then runs the hardhat tests for each one without forcing precompile developers to modify this file.
	// ADD YOUR PRECOMPILE HERE
	/*
		ginkgo.It("your precompile", ginkgo.Label("Precompile"), ginkgo.Label("YourPrecompile"), func() {
			ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
			defer cancel()
			// Specify the name shared by the genesis file in ./tests/precompile/genesis/{your_precompile}.json
			// and the test file in ./contracts/tests/{your_precompile}.ts
			// If you want to use a different test command and genesis path than the defaults, you can
			// use the utils.RunTestCMD. See utils.RunDefaultHardhatTests for an example.
			utils.RunDefaultHardhatTests(ctx, "your_precompile")
		})
	*/
```

`utils.RunDefaultHardhatTests` ejecutará el comando de prueba de HardHat por defecto y usará la ruta de génesis por defecto. Si quieres usar un comando de prueba y una ruta de génesis diferentes a los valores por defecto, puedes usar `utils.CreateSubnet` y `utils.RunTestCMD`. Mira cómo se usaron con parámetros por defecto [aquí](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/tests/utils/subnet.go#L113).

Debes copiar y pegar el nodo `It` de ginkgo y actualizar de `{your_precompile}` a `hello_world`. La cadena pasada a `utils.RunDefaultHardhatTests(ctx, "your_precompile")` se utilizará para encontrar tanto el archivo de prueba de HardHat a ejecutar como el archivo de génesis, por lo que necesitas usar el mismo nombre para ambos.

Después de modificar el nodo `It`, debería verse como sigue (puedes copiar y pegar esto directamente si prefieres):

```go
	ginkgo.It("hello world", ginkgo.Label("Precompile"), ginkgo.Label("HelloWorld"), func() {
		ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
		defer cancel()

		utils.RunDefaultHardhatTests(ctx, "hello_world")
	})
```

Ahora que hemos configurado la nueva prueba de ginkgo, podemos ejecutar la prueba de ginkgo que queremos usando el `GINKGO_LABEL_FILTER`. Esta variable de entorno se pasa como una bandera a Ginkgo en `./scripts/run_ginkgo.sh` y restringe qué pruebas se ejecutarán solo a las pruebas con una etiqueta coincidente.

## Ejecutando Pruebas E2E

Antes de comenzar las pruebas, necesitaremos construir el binario AvalancheGo y el binario personalizado de Subnet-EVM.

Precompile-EVM agrupa Subnet-EVM y lo ejecuta bajo el capó en el archivo [`plugins/main.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/plugin/main.go#L24). Esto significa que el binario Precompile-EVM funciona de la misma manera que el binario Subnet-EVM. El repositorio Precompile-EVM también tiene los mismos scripts y el mismo proceso de construcción que Subnet-EVM. Los siguientes pasos también se aplican a Precompile-EVM.

Deberías haber clonado [AvalancheGo](https://github.com/ava-labs/avalanchego) dentro de tu `$GOPATH` en la sección [Antecedentes y Requisitos](background-and-reqs.md), por lo que puedes construir AvalancheGo con el siguiente comando:

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
./scripts/build.sh
```

Una vez que hayas construido AvalancheGo, puedes confirmar que fue exitoso imprimiendo la versión:

```bash
./build/avalanchego --version
```

Esto debería imprimir algo como lo siguiente (si estás ejecutando AvalancheGo v1.9.7):

```bash
avalanche/1.9.7 [database=v1.4.5, rpcchainvm=22, commit=3e3e40f2f4658183d999807b724245023a13f5dc]
```

Esta ruta se utilizará más adelante como la variable de entorno `AVALANCHEGO_EXEC_PATH` en el ejecutor de la red.

Ten en cuenta que la versión RPCChainVM de AvalancheGo y Subnet-EVM deben coincidir.

Una vez que hemos construido AvalancheGo, podemos navegar de vuelta al repositorio y construir el binario:

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
./scripts/build.sh
```

Esto construirá el binario de Subnet-EVM y lo colocará en el directorio `build/plugins` de AvalancheGo de forma predeterminada
en la siguiente ruta de archivo:

`$GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy`

Para confirmar que el binario de Subnet-EVM es compatible con AvalancheGo, puedes ejecutar el mismo comando de versión
y confirmar que la versión de RPCChainVM coincide:

```bash
$GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy --version
```

Esto debería dar una salida similar:

```bash
Subnet-EVM/v0.5.2@9a1c5482c83c32b29630ff171cb20ccc889d760e [AvalancheGo=v1.10.2, rpcchainvm=26]
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
./scripts/build.sh
```

Esto construirá el binario de Precompile-EVM y lo colocará en el directorio `build/plugins` de AvalancheGo de forma predeterminada
en la siguiente ruta de archivo:

`$GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy`

Para confirmar que el binario de Precompile-EVM es compatible con AvalancheGo,
puedes ejecutar el mismo comando de versión
y confirmar que la versión de RPCChainVM coincide:

```bash
$GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy --version
```

Esto debería dar una salida similar:

```bash
Precompile-EVM/v0.0.0 Subnet-EVM/v0.5.2 [AvalancheGo=v1.10.2, rpcchainvm=26]
```

</TabItem>
</Tabs>

<!-- vale on -->

Si la versión del Protocolo RPCChainVM impresa no coincide con la utilizada en AvalancheGo, entonces Subnet-EVM
no podrá comunicarse con AvalancheGo y la blockchain no se iniciará.
Puedes encontrar la tabla de compatibilidad
para AvalancheGo y Subnet-EVM [aquí](https://github.com/ava-labs/subnet-evm#avalanchego-compatibility).

El directorio `build/plugins` se utilizará más adelante como `AVALANCHEGO_PLUGIN_PATH`.

### Ejecutando pruebas de Ginkgo

Para ejecutar SOLAMENTE la prueba de precompilación de HelloWorld, ejecuta el siguiente comando:

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM">

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
```

</TabItem>
</Tabs>

<!-- vale on -->

usa la variable de entorno `GINKGO_LABEL_FILTER` para filtrar la prueba:

```bash
GINKGO_LABEL_FILTER=HelloWorld ./scripts/run_ginkgo.sh
```

Primero verás que el nodo se inicia en la sección `BeforeSuite` de la prueba de precompilación:

```bash
$ GINKGO_LABEL_FILTER=HelloWorld ./scripts/run_ginkgo.sh
Using branch: hello-world-tutorial-walkthrough
building precompile.test
# github.com/ava-labs/subnet-evm/tests/precompile.test
ld: warning: could not create compact unwind for _blst_sha256_block_data_order: does not use RBP or RSP based frame

Compiled precompile.test
# github.com/ava-labs/subnet-evm/tests/load.test
ld: warning: could not create compact unwind for _blst_sha256_block_data_order: does not use RBP or RSP based frame

Compiled load.test
Running Suite: subnet-evm precompile ginkgo test suite - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm
===================================================================================================================
Random Seed: 1674833631

Will run 1 of 7 specs
------------------------------
[BeforeSuite]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/precompile_test.go:31
  > Enter [BeforeSuite] TOP-LEVEL - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/precompile_test.go:31 @ 01/27/23 10:33:51.001
INFO [01-27|10:33:51.002] Starting AvalancheGo node                wd=/Users/avalabs/go/src/github.com/ava-labs/subnet-evm
INFO [01-27|10:33:51.002] Executing                                cmd="./scripts/run.sh "
[streaming output] Using branch: hello-world-tutorial-walkthrough
...
[BeforeSuite] PASSED [15.002 seconds]
```

Después de que `BeforeSuite` se complete con éxito, omitirá todas las pruebas de precompilación etiquetadas
excepto la prueba de `HelloWorld`:

```bash
S [OMITIDO]
[Precompilados]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:26
  contrato minter nativo [Precompilado, ContratoMinterNativo]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:29
------------------------------
S [OMITIDO]
[Precompilados]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:26
  lista de transacciones permitidas [Precompilado, ListaDeTransaccionesPermitidas]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:36
------------------------------
...
Salida combinada:

Compilando 2 archivos con 0.8.0
Compilación finalizada con éxito


  PruebaEjemploHolaMundo
    ✓ debería obtener el saludo predeterminado (4057ms)
    ✓ no debería establecer el saludo antes de habilitado (4067ms)
    ✓ debería establecer y obtener el saludo con una cuenta habilitada (4074ms)



  3 pasando (33s)


  < Salida [It] hola mundo - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:64 @ 01/27/23 10:34:17.484 (11.48s)
• [11.480 segundos]
------------------------------
```

Finalmente, también verás que la prueba de carga se está omitiendo:

```bash
Ejecutando Suite: suite de pruebas de simulador de carga pequeña de subnet-evm - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm
======================================================================================================================
Semilla Aleatoria: 1674833658

Ejecutando 0 de 1 especificaciones
S [OMITIDO]
[Simulador de Carga]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/load/load_test.go:49
  prueba de carga básica de subnet [carga]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/load/load_test.go:50
------------------------------

Ejecutadas 0 de 1 Especificaciones en 0.000 segundos
¡ÉXITO! -- 0 Pasadas | 0 Fallidas | 0 Pendientes | 1 Omitidas
PASO
```

¡Parece que las pruebas están pasando!

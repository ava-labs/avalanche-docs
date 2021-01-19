---
descripción: Aprende como hacer stake en Avalanche validando o delegando
---

# Staking

El Staking es el proceso de bloquear tokens para apoyar una red mientras se recibe una recompensa a cambio \(Las recompensas pueden ser el aumento de la utilidad de la red, la compensación monetaria, etc.\). El concepto de staking fue [introducido formalmente por primera vez](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) Por Sunny King y Scott Nadal de Peercoin.

### ¿Cómo funciona el proof-of-stake?

Para resistir [ataques sybil](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack), una red descentralizada debe exigir que la influencia de la red se pague con un recurso escaso. Esto hace que sea inviable que un atacante obtenga suficiente influencia en la red para comprometer su seguridad. En los sistemas proof-of-work, el recurso escaso es la potencia de computación. En Avalanche, el recurso escaso es el token nativo, [AVAX](../../#avalanche-avax-token). Para que un nodo [valide](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) una blockchain en Avalanche, este debe hacer stake de AVAX.

## Parámetros de Staking en Avalanche

Cuando un validador termina de validar la [Red Primaria](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network), recibe de vuelta los tokens de AVAX que ha puesto en stake. Puede recibir una recompensa por ayudar a asegurar la red. Un validador sólo recibe una [recompensa de validación](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) si es suficientemente responsivo y correcto durante el tiempo que valida. Lea el [Whitepaper del Token de Avalanche](https://files.avalabs.org/papers/token.pdf) para aprender más sobre AVAX y las mecánicas del staking.

{% hint style="warning" %}
Las recompensas del staking se envían a la dirección de tu wallet al final del plazo de staking **siempre y cuando se cumplan todos estos parámetros**.
{% endhint %}

* La cantidad mínima que un validador debe poner en stake es de 2 000 AVAX
* La cantidad mínima que un delegado debe delegar es de 25 AVAX
* El mínimo tiempo que se puede hacer staking para la validación es de 2 semanas.
* La cantidad máxima de tiempo que uno puede hacer staking para la validación es de 1 año
* El mínimo tiempo que uno puede hacer staking para la delegación es de 2 semanas
* La cantidad máxima de tiempo que uno puede hacer staking para la delegación es de 1 año
* La tasa mínima de derechos de delegación es del 2%
* El peso máximo de un validador \(su propio stake + el stake delegado en ellos\) es el mínimo de 3e6 AVAX y 5 veces la cantidad que el validador puso en stake. Por ejemplo, si pusiste en stake 2 000 AVAX para ser un validador, sólo 8 000 AVAX pueden ser delegados al total de tu nodo \(no por delegador\).
* El porcentaje mínimo de tiempo que un validador debe estar correcto y en línea para recibir una recompensa es del 60%

## Validadores

**Los validadores** protegen Avalanche, 
crean nuevos bloques/vértices y procesan las transacciones. Para lograr el consenso, los validadores se muestrean repetidamente unos a otros. La probabilidad de que un validador dado sea muestreado es proporcional a su stake.

Cuando se añade un nodo al conjunto de validadores, se especifica:

* El ID de tu nodo
* Cuando quieres empezar y dejar de validar
* Cuántos AVAX pones en stake
* La dirección para enviar las recompensas
* Su tasa de comisión de delegación \(ver abajo\)

{% hint style="info" %}
La cantidad mínima que un validador debe poner en stake es de 2 000 AVAX
{% endhint %}

{% hint style="danger" %}
Tenga en cuenta que una vez que se emite la transacción para añadir un nodo como validador, no hay forma de cambiar los parámetros. **You can’t remove your stake early or change the stake amount, node ID, or reward address.** Please make sure you’re using the correct values in the API calls below. If you’re not sure, ask for help on [Discord](https://chat.avax.network) or browse our [Developer FAQs](http://support.avalabs.org/en/collections/2618154-developer-faq).
{% endhint %}

### Running a Validator <a id="running-a-validator"></a>

If you’re running a validator, it’s important that your node is well connected to ensure that you receive a reward. See [here](http://support.avalabs.org/en/articles/4594192-networking-setup).

When you issue the transaction to add a validator, the staked tokens and transaction fee are deducted from the addresses you control. When you are done validating, the staked funds are returned to the addresses they came from. If you earned a reward, it is sent to the address you specified when you added yourself as a validator.

#### Allow API calls <a id="allow-api-calls"></a>

To make API calls to your node from remote machines, allow traffic on the API port \(`9650` by default\), and run your node with argument `--http-host=`

You should disable all APIs you will not use via command-line arguments. You should configure your network to only allow access to the API port from trusted machines \(e.g., your personal computer.\)

#### Why is my uptime low? <a id="why-is-my-uptime-low"></a>

Every validator on Avalanche keeps track of the uptime of other validators. You can see the connections a node has by calling `info.peers`, as well as the uptime of each connection. **This is only one node’s point of view**. Other nodes may perceive the uptime of your node differently. Just because one node perceives your uptime as being low does not mean that you will not receive staking rewards.

The likely reason that your node is not connected to another node is that NAT traversal failed, and you did not start your node with `--public-ip=[NODE'S PUBLIC IP]`. In the future, we will add better monitoring to make it easier to verify that your node is well-connected.

#### Secret Management <a id="secret-management"></a>

The only secret that you need on your validating node is its Staking Key, the TLS key that determines your node’s ID. The first time you start a node, the Staking Key is created and put in `$HOME/.avalanchego/staking/staker.key`. You should back up this file \(and `staker.crt`\) somewhere secure. Losing your Staking Key could jeopardize your validation reward, as your node will have a new ID.

You do not need to have AVAX funds on your validating node. In fact, it's best practice to **not** have a lot of funds on your node. Almost all of your funds should be in “cold" addresses whose private key is not on any computer.

#### Monitoring <a id="monitoring"></a>

Follow this tutorial to learn how to monitor your node's uptime, general health, etc.

{% page-ref page="../../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

## Delegators

A delegator is a token holder, who wants to participate in staking, but chooses to trust an existing validating node through delegation.

When you delegate stake to a validator, you specify:

* The ID of the node you’re delegating to
* When you want to start/stop delegating stake \(must be while the validator is validating\)
* How many AVAX you are staking
* The address to send any rewards to

{% hint style="info" %}
The minimum amount that a delegator must delegate is 25 AVAX.
{% endhint %}

{% hint style="danger" %}
Note that once you issue the transaction to add your stake to a delegator, there is no way to change the parameters. **You can’t remove your stake early or change the stake amount, node ID, or reward address.** If you’re not sure, ask for help on [Discord](https://chat.avax.network) or browse our [Developer FAQs](http://support.avalabs.org/en/collections/2618154-developer-faq).
{% endhint %}

### Delegator rewards <a id="delegator-rewards"></a>

If the validator that you delegate tokens to is sufficiently correct and responsive, you will receive a reward when you are done delegating. Delegators are rewarded according to the same function as validators. However, the validator that you delegate to keeps a portion of your reward–specified by the validator’s delegation fee rate.

When you issue the transaction to delegate tokens, the staked tokens and transaction fee are deducted from the addresses you control. When you are done delegating, the staked tokens are returned to your address. If you earned a reward, it is sent to the address you specified when you delegated tokens.

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTg2NDE0MzgzMCw1NzY4MDU5OTEsLTcxNz
cxOTgxMV19
-->
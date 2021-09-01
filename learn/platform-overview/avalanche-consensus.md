---
description: Une plongée profonde dans le protocole de consensus d'Avalanche
---

# Consensus d'Avalanche

Le consensus est la tâche d'obtenir un groupe d'ordinateurs pour parvenir à un accord sur une décision. Les ordinateurs peuvent parvenir à un consensus en suivant un ensemble de mesures appelées un protocole de consensus. Avalanche est un nouveau protocole de consensus qui est évolutif, robuste et décentralisé. Il a une faible latence et un débit élevé. Il est efficace en énergie et ne nécessite pas de matériel informatique spécial. Il fonctionne bien dans des conditions contradictoires et est résilient aux « attaques de 51 % ». Ce document explique le protocole de consensus d'Avalanche. Le whitepaper est [ici.](https://www.avalabs.org/whitepapers)

## Vidéo

{% embed url="https://www.youtube.com/watch?v=ZUF9sIu-D_k" caption="" %}

## Intuition

Tout d'abord, développons une certaine intuition sur le protocole. Imaginez une chambre pleine de personnes qui tentent de s'entendre sur ce qu'il faut obtenir pour le déjeuner. Supposons que c'est un choix binaire entre la pizza et le barbecue. Certaines personnes pourraient initialement préférer la pizza tandis que d'autres préfèrent initialement le barbecue. En fin de compte, cependant, l'objectif de chacun est de parvenir à un ****consensus.

Tout le monde demande un sous-ensemble aléatoire des personnes de la chambre ce que leur préférence pour le déjeuner est Si plus de la moitié disent des pizzas, la personne pense, « Ok, ressemble à des choses se penchent sur la pizza. Je préfère la pizza maintenant. » C'est-à-dire qu'ils adoptent la _préférence _de la majorité. De même, si une majorité disent un barbecue, la personne adopte un barbecue comme leur préférence.

Tout le monde répète ce processus. Chaque rond, de plus en plus de personnes ont la même préférence. En effet, plus de personnes qui préfèrent une option, plus quelqu'un est susceptible de recevoir une réponse à la majorité et d'adopter cette option comme leur préférences. Après avoir suffisamment de tours, ils parviennent à un consensus et décident d'une seule option, que tout le monde préfère.

## Snowball

L'intuition ci-dessus décrit l'algorithme de snowball, qui est un bloc de base du consensus d'Avalanche. Examinons l'algorithme de Snowball.

### Paramètres

* __n: nombre de participants
* __k \(taille de _l'échantillon\)_
* α \(taille du quorum\): entre 1 et _k_
* β \(seuil de décision\): >= 1

### Algorithme

```text
preference := pizza
consecutiveSuccesses := 0
while not decided:
  ask k random people their preference
  if >= α give the same response:
    preference := response with >= α
    if preference == old preference:
      consecutiveSuccesses++
    else:
      consecutiveSuccesses = 1
  else:
    consecutiveSuccesses = 0
  if consecutiveSuccesses > β:
    decide(preference)
```

### Algorithme Expliqué

Tout le monde a une préférence initiale pour la pizza ou le barbecue. Jusqu'à ce que quelqu'un ait décidé, ils interrogent les _personnes _k \(la taille de l'échantillon\) et leur demandent ce __qu'ils préfèrent. Si α ou plus de personnes donnent la même réponse, cette réponse est adoptée comme la nouvelle préférences. α est appelée la taille du __quorum. Si la nouvelle préférence est la même que la vieille préférence, le `consecutiveSuccesses`compteur est incrémenté. Si la nouvelle préférence est différente, alors la vieille préférence, le `consecutiveSucccesses`compteur de .`1` Si aucune réponse n'obtient un quorum \(une majorité α de la même réponse\), le `consecutiveSuccesses`compteur est configuré sur .`0`

Tout le monde le répète jusqu'à ce qu'ils obtiennent un quorum pour la même réponse β fois de suite. Si une personne décide de la pizza, alors toute autre personne qui suit le protocole sera finalement également décider sur la pizza.

Les changements de préférence aléatoires causés par un échantillonnage aléatoire, provoquent une préférence de réseau pour un choix, qui engendre plus de préférence de réseau pour ce choix jusqu'à ce qu'il devienne irréversible et ensuite les nœuds peuvent décider.

{% hint style="info" %}Pour une grande visualisation, consultez [cette démo](https://tedyin.com/archive/snow-bft-demo/#/snow) de Ted Yin de Co-fondateur d'Ava Labs.{% endhint %}

Dans notre exemple, il y a un choix binaire entre la pizza ou le barbecue, mais Snowball peut être adapté pour parvenir à un consensus sur les décisions avec de nombreux choix possibles.

Les seuils de liveness et de sécurité sont paramétrables. À mesure que la taille du quorum, α, augmente, le seuil de sécurité augmente et le seuil de la vie diminue. Cela signifie que le réseau peut tolérer plus de nœuds byzantins \(délibérément incorrects, malveillants\) et rester sûr, ce qui signifie que tous les nœuds seront finalement d'accord sur la question de savoir si quelque chose est accepté ou rejeté. Le seuil de liveness est le nombre de participants malveillants qui peuvent être tolérés avant que le protocole ne soit incapable de progresser.

Ces valeurs, qui sont des constantes, sont assez petites sur le réseau d'Avalanche. La taille de l'échantillon, __k, est `20`. Donc, lorsqu'un nœud demande à un groupe de nœuds leur opinion, il ne demande que des `20`nœuds sur tout le réseau. La taille du quorum, α, est `14`. Donc, si `14`ou plusieurs nœuds donnent la même réponse, cette réponse est adoptée comme la préférence du nœud d'interrogation Le seuil de décision, β, est `20`. Un nœud décide sur le choix après avoir reçu des réponses `20`consécutives au quorum \(α majorité\).

Snowball est très évolutif car le nombre de nœuds sur le réseau, __n, augmente. Peu importe le nombre de participants au réseau, le nombre de messages de consensus envoyés reste le même parce que dans une requête donnée, un nœud de requête uniquement des `20`nœuds, même s'il y a des milliers de nœuds dans le réseau.

## DAG \(Graphiques ****acycliques ********directs\)

Maintenant, introduisons une structure de données appelée un graphique dAG ou un graphique Acyclique dirigé. Un DAG donne une commande **partielle **des décisions. Par exemple, consultez le DAG dans ce diagramme :

![DAG de base](../../.gitbook/assets/cons-01-Frame16.png)

****a is before ****b. b a **and ****d. **c is **before e. Transitive, nous pouvons dire **qu'a **vient avant ********e. Cependant, puisque c'est une commande partielle : pour certains éléments, la commande **n'est pas définie. **Par exemple, **b **et **c **sont à la fois après **un **mais il n'y a aucune notion de **b avant ou après ****c.

Deux autres concepts liés au DAG sont les **ancêtres **et les ****descendants. Les ancêtres sont n'importe quel nœud dans le DAG que vous pouvez dessiner une ligne. ******Par exemple, les ancêtres de **d **sont ****a, ****b et c. Les ancêtres **d'e **sont **a et ****c. Les Descendants sont l'opposé des ancêtres. Les descendants **d'un **sont b, ****c, ********d, et ****e. Le descendant de **b **est ****d.

Les Bitcoin et Ethereum ont par exemple une chaîne linéaire où chaque bloc a un parent et un enfant. Avalanche utilise un DAG pour stocker les données plutôt qu'une chaîne linéaire. Chaque élément du DAG peut avoir de multiples parents. La relation parents-enfant au sein du DAG n'implique pas une dépendance au niveau d'application.

Dans un protocole de consensus, le nom du jeu est d'empêcher l'inclusion d'opérations en **conflit **dans le DAG. Les conflits sont définis par une application. Différentes applications auront des notions différentes sur ce que cela signifie pour deux transactions en conflit. Par exemple, dans un système de paiement P2P, les transactions qui consomment le même UTXO \([sortie de transaction non dépensée](https://en.wikipedia.org/wiki/Unspent_transaction_output)\) se would En Avalanche, toute transaction appartient à un jeu de **conflit **qui consiste en des transactions en conflit. Une seule transaction dans un jeu de conflit peut être incluse dans le DAG. Chaque nœud **préfère **une transaction dans un jeu de conflit.

## Exemple de travail

Supposons que nous ayons un réseau Avalanche qui fonctionne avec les paramètres suivants. La taille de l'échantillon, __k, est `4`. La taille du quorum, α, est `3`. Le nombre de succès consécutif, β, est `4`.

![Exemple de travail 1](../../.gitbook/assets/cons-02-Consensus_Doc_txY.png)

Un nœud s'informe sur une nouvelle transaction ****Y. Il interroge le réseau sur la base des paramètres ci-dessus. __`4`Il interroge les validateurs k \(\) et demande : « Vous préférez cette transaction ? » Il récupère les réponses, trois d'entre eux disent **oui **et l'une d'elles dit ****non. La taille du quorum, α, est `3`donc il y a une majorité α \(quorum\) de réponses oui. Maintenant nous le nœud met à jour son DAG.

![Exemple de travail 2](../../.gitbook/assets/cons-03-Consensus_Doc_txY-6.png)

****Si un nœud obtient une réponse α majoritaire pour une transaction, alors vous donnez à cette transaction, qui est un booléen qui dit, « Lorsque j'ai interrogé le réseau sur cette transaction, une majorité α a dit qu'ils l'ont préféré ». Dans notre exemple, la transaction Y obtient un chiquet.

Il y a également une notion de ****confiance, qui est la somme du chic d'un vertex et la somme des chics de ses descendants. Par exemple, la transaction **V **a un chiquet. Il a également trois descendants qui ont un chic de sorte que sa confiance est augmentée de `3`à .`4` **De même, les transactions **W **et **X ont tous deux un chit et ils ont tous deux un descendant avec un chiquet, de sorte qu'ils ont chacun confiance `2`. Transaction Y a la confiance `1`.

**Les succès consécutifs **sont les mêmes que dans Snowball. C'est le nombre de fois qu'une transaction, ou un descendant de la transaction, a reçu une réponse à une requête α majoritaire. Auparavant, la transaction V avait eu des succès `3`consécutifs, elle-même et ses deux enfants, et maintenant elle a des succès `4`consécutifs avec la transaction Y. De même, pour les transactions W et X.

![Exemple de travail 3](../../.gitbook/assets/cons-04-Consensus_Doc_txY-2.png)

Dans cet exemple, nous le seuil d'acceptation, β est `4`. Transaction V a un succès `4`consécutif, donc il est **accepté.** Ce nœud est sûr que tous les autres nœuds corrects accepteront finalement cette transaction.

![Exemple de travail 4](../../.gitbook/assets/cons-05-Consensus_Doc_txY-3.png)

Supposons maintenant que le nœud apprend sur la transaction **Y' **qui est en conflit avec la transaction Y. Il suit les mêmes étapes que les validateurs et sous-échantillons _k _`4`\(\) et demande s'ils préfèrent la transaction Y'. Dans ce cas, deux d'entre eux disent qu'ils préfèrent Y' et deux d'entre eux disent qu'ils ne préfèrent pas Y'. Cette fois-ci, il n'y a pas de réponse α majoritaire, et le DAG est mis à jour en conséquence.

![Exemple de travail 5](../../.gitbook/assets/cons-06-Consensus_Doc_txY-4.png)

Les transactions Y et Y ' sont dans un jeu de conflit; seul l'un d'eux peut finalement être accepté. Transaction Y' n'a pas obtenu un chic parce qu'il n'a pas reçu de réponse α Il a la confiance `0`parce qu'il n'a pas de chich et qu'il n'a pas de descendants avec un chich. Il a des succès `0`consécutifs parce que la précédente requête n'a pas reçu de réponse à la majorité α Le compteur de succès de W est passé de `2`à .`0` Sa confiance est toujours `2`.

Lorsqu'un nœud est demandé si il préfère une transaction donnée, il répond oui si cette transaction a la plus grande confiance d'une transaction dans le jeu de conflit de la transaction. Dans cet exemple, la transaction Y a la confiance `1`et la transaction Y' a la plus grande confiance, de `0`sorte que le nœud préfère la transaction Y à la transaction Y'.

![Exemple de travail 6](../../.gitbook/assets/cons-07-Consensus_Doc_txY-1.png)

Maintenant le nœud apprend sur une nouvelle transaction, ****Z et il fait la même chose qu'auparavant. Il interroge __k, récupère une réponse de la majorité α et met à jour le DAG.

![Exemple de travail 7](../../.gitbook/assets/cons-08-Consensus_Doc_txY-5.png)

Transaction Z obtient un chiquet. Il a également une confiance `1`et un succès `1`consécutif. Les ancêtres de traitement sont également mis à jour. Aucune transaction n'a des succès `4`consécutifs, donc aucun ancêtre ne sont acceptés.

## Verses

Tout ce qui est discuté à ce sujet est la description d'Avalanche dans [le whitepaper. d'Avalanche](https://assets-global.website-files.com/5d80307810123f5ffbb34d6e/6009805681b416f34dcae012_Avalanche%20Consensus%20Whitepaper.pdf). La mise en œuvre du protocole de consensus d'Ava Labs \(à savoir à AvalancheGo\) a quelques optimisations pour la latence et le débit. L'optimisation la plus importante est l'utilisation des ****sommets. Un vertex est comme un bloc dans une blockchain linéaire. Il contient les cils de ses parents et contient une liste de transactions. Les sommets permettent de faire des transactions et de voter en groupes plutôt que d'un par un. Le DAG est composé de sommets, et le protocole fonctionne très similaire à la manière dont il est décrit ci-dessus.

Si un nœud reçoit un vote pour un vertex, il compte comme un vote pour toutes les transactions sur un vertex, et les votes sont appliqués de manière transitoire à la hausse. Un vertex est accepté lorsque toutes les transactions qui sont en elle sont acceptées. Si un vertex contient une transaction rejetée, elle est rejetée et tous ses descendants sont rejetés. Si un vertex est rejeté, toute transaction valide est ré-émise dans un nouveau vertex qui n'est pas l'enfant d'un vertex rejeté. De nouveaux sommets sont annexés aux sommets de choix.

## Finalité

Le consensus d'Avalanche est probabiliste jusqu'à un seuil de sécurité. C'est-à-dire la probabilité qu'un nœud correct accepte une transaction qu'un autre nœud correct rejette peut être rendu arbitrairement bas en ajustant les paramètres du système. Dans le protocole de consensus de Nakamoto \(comme utilisé dans Bitcoin et Ethereum, par exemple\), un bloc peut être inclus dans la chaîne, mais ensuite être supprimé et ne se termine pas dans la chaîne canonique. Cela signifie qu'il faut attendre une heure pour le règlement des transactions. En Avalanche, l'acceptation/rejet sont **définitifs et irréversibles **et prennent quelques secondes.

## Optimisation

Il n'est pas efficace pour les nœuds de demander simplement : "Do ce vertex ?" quand ils interrogent les validateurs. Dans la mise en œuvre d'Ava Labs, lors d'une requête un nœud demande, « Étant donné que ce vertex existe, quels sommets préférez-vous ? » Au lieu de revenir sur un oui /non binaire, le nœud reçoit le jeu de vertex préféré de l'autre nœud.

Les nœuds ne demandent pas seulement lors de l'audition d'une nouvelle transaction. Ils interrogent à plusieurs reprises jusqu'à ce qu'il n'y ait pas de traitement de sommets vertueux Un vertex vertueux est un vertex qui n'a pas de conflit.

Les nœuds n'ont pas besoin d'attendre qu'ils obtiennent toutes les réponses aux _requêtes _k avant d'enregistrer les résultats d'un sondage. Si aucune transaction ne peut obtenir une majorité α alors il n'y a pas besoin d'attendre le reste des réponses.

## Validateurs

Si il était libre de devenir un validateur sur le réseau d'Avalanche, ce serait problématique car un acteur malveillant pourrait démarrer de nombreux nœuds, beaucoup qui seraient interrogés très souvent. L'acteur malveillant pourrait faire fonctionner le nœud de manière mal et causer un échec en matière de sécurité ou de foies. Les validateurs, les nœuds interrogés dans le cadre du consensus, ont une influence sur le réseau. Ils doivent payer pour cette influence avec une valeur réelle afin d'empêcher ce type de farci de scrutin. Cette idée d'utiliser la valeur du monde réel pour acheter une influence sur le réseau est appelée Preuve de stage.

Pour devenir un validateur, un nœud doit **lier \(en **jeu\) quelque chose de précieux ****\(AVAX\). Plus un nœud AVAX, plus ce nœud est interrogé par d'autres nœuds. Lorsqu'un nœud prélève le réseau, il n'est pas uniformément aléatoire. Au contraire, elle est pondérée par le montant des pieux. Les nœuds sont incités à être des validateurs parce qu'ils obtiennent une récompense si, pendant qu'ils valident, ils sont suffisamment corrects et réactifs.

Avalanche n'a pas de slashing. Si un nœud ne se comporte pas bien en validant, comme donner des réponses incorrectes ou peut-être ne pas répondre du tout, son enjeu est toujours retourné en entier, mais sans récompense. Tant qu'une partie suffisante de of lié est tenue par des nœuds corrects, alors le réseau est sûr et est en direct pour les transactions vertueuses.

## Grandes idées

Deux grandes idées en Avalanche sont des **sous-échantillonnage et **un vote ****transitif. Le sous-échantillonnage a un faible coût des messages. Peu importe s'il y a vingt validateurs ou deux mille validateurs ; le nombre de messages de consensus envoyé par un nœud lors d'une requête reste constant.

![Exemple de travail 8](../../.gitbook/assets/cons-09-Consensus_Doc_txY-7.png)

Le vote transitif, où un vote pour un vertex est un vote pour tous ses ancêtres, aide à la transaction Chaque vote est en fait beaucoup de voix en un Par exemple, dans le diagramme ci-dessus, si un nœud obtient un vote pour le vertex ****D, qui implique un vote pour tous les ancêtres de ce dernier; un vote pour le **D **est également un vote pour ****A, ****B et ****C.

## Ends lâches

Les transactions sont créées par des utilisateurs qui appellent une API sur le nœud complet [an](https://github.com/ava-labs/avalanchego) ou qui les créent en utilisant une bibliothèque comme [AvalancheJS](https://github.com/ava-labs/avalanchejs). Des sommets sont créés lorsque des nœuds de transaction sont en commun ou lorsque des transactions acceptées provenant d'un vertex rejeté sont réémises et ajoutées au DAG. Les parents d'un vertex sont choisis parmi la frontière vertueuse, qui sont les nœuds à la pointe du DAG sans conflit. Il est important de s'appuyer sur des sommets vertueux parce que si nous avons construit sur des sommets non vertus, il y aurait une chance plus élevée que le nœud se serait rejeté, ce qui signifie qu'il y aurait une chance plus élevée que les ancêtres soient rejetés et que nous ferions moins de progrès.

## Autres observations

Les transactions en conflit ne sont pas garanties d'être en direct. Ce n'est pas vraiment un problème parce que si vous voulez que votre transaction soit en direct, vous ne devriez pas émettre une transaction en conflit.

Avalanche fonctionne également pour les chaînes linéaires. Le protocole est largement le même is mais chaque vertex n'a qu'un seul parent. Cela donne une commande totale de sommets. Ceci est utile pour certaines applications où l'on doit savoir si une transaction est venue avant une autre transaction, comme avec des contrats intelligents. Snowman est le nom de la mise en œuvre par Ava Labs, du protocole de consensus d'Ava Labs, pour les chaînes linéaires.

En l'absence de transactions non décisées, le protocole de consensus d'Avalanche s'appuie sur le protocole de __consensus. Autrement dit, il ne fait rien si aucun travail ne doit être fait. Avalanche est plus durable que le pronostic de travail, où les nœuds doivent faire constamment travail.

Avalanche n'a pas de leader. Tout nœud peut proposer une transaction et tout nœud qui a stagné AVAX peut voter sur toutes les transactions, ce qui rend le réseau plus robuste et décentralisé.

## Pourquoi nous en soucions-nous ?

Avalanche est un moteur de consensus général. Il n'a pas d'importance le type d'application mis en haut. Le protocole permet le découplage de la couche d'application de la couche de consensus. Si vous construisez une Dapp sur Avalanche, vous avez juste besoin de définir quelques choses, comme la définition des conflits et ce qui est dans une transaction. Vous n'avez pas besoin de vous inquiéter de la manière dont les nœuds arrivent à un accord. Le protocole de consensus est une boîte noire qui y met quelque chose et il revient comme accepté ou rejeté.

Avalanche peut être utilisé pour toutes sortes d'applications, et pas seulement les réseaux de paiement P2P. Le réseau primaire d'Avalanche a une instance de la machine virtuelle Ethereum, qui est en retard compatible avec les dapps Ethereum et l'outil de dev existant. Le protocole de consensus Ethereum a été remplacé par le consensus d'Avalanche pour permettre une latence inférieure aux blocs et un débit supérieur.

Avalanche est très performant. Il peut traiter des milliers de transactions par seconde avec une à deux seconde de latence d'acceptation.

## Résumé

Le consensus d'Avalanche est une avancée radicale dans les systèmes distribués. Il représente un saut en avant aussi grand que les protocoles de consensus classique et de consensus de Nakamoto qui l'ont présenté. Maintenant que vous avez une meilleure compréhension du fonctionnement de ce dernier, consultez d'autres [documents](https://docs.avax.network) pour construire des dapps et des instruments financiers en évolution de jeu sur Avalanche.


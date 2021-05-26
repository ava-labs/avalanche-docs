---
description: Une plongée approfondie dans le protocole de consensus Avalanche
---

# Avalanche Consensus

Le consensus est la tâche d'amener un groupe d'ordinateurs à s'entendre sur une décision. Les ordinateurs peuvent parvenir à un consensus en suivant un ensemble d'étapes appelées protocole de consensus. Avalanche est un nouveau protocole de consensus qui est évolutif, robuste et décentralisé. Il a une faible latence et un débit élevé. Il est économe en énergie et ne nécessite pas de matériel informatique spécial. Il fonctionne bien dans des conditions de contestations et résiste aux «attaques à 51%». Ce document explique le protocole de consensus Avalanche. Le livre blanc est [ici](https://www.avalabs.org/whitepapers).

## Vidéo

{% embed url="https://www.youtube.com/watch?v=ZUF9sIu-D\_k" %}

## Intuition

Tout d'abord, développons une certaine intuition sur le protocole. Imaginez une salle pleine de gens qui essaient de s'entendre sur ce qu'il faut acheter pour le déjeuner. Supposons que ce soit un choix binaire entre la pizza et le barbecue. Certaines personnes préfèrent au départ la pizza tandis que d'autres préfèrent d'abord le barbecue. En fin de compte, cependant, l'objectif de chacun est de parvenir à un **consensus**.

Tout le monde demande à un sous-ensemble aléatoire de personnes présentes dans la salle leur préférence pour le déjeuner. Si plus de la moitié disent pizza, la personne pense : "Ok, on dirait que les choses penchent vers la pizza. Je préfère la pizza maintenant." Autrement dit, ils adoptent la préférence de la majorité. De même, si une majorité dit barbecue, la personne adopte le barbecue comme préférence.

Tout le monde répète ce processus. À chaque tour, de plus en plus de personnes ont la même préférence. En effet, plus il y a de gens qui préfèrent une option, plus quelqu'un est susceptible de recevoir une réponse majoritaire et d'adopter cette option comme préférence. Après suffisamment de tours, ils parviennent à un consensus et décident d'une option, que tout le monde préfère.

## Snowball

L'intuition ci-dessus décrit l'algorithme Snowball, qui est un élément constitutif du consensus Avalanche. Passons en revue l'algorithme Snowball.

### Paramètres

* _n_: nombre de participants
* _k_ \(taille de l'échantillon\): entre 1 et _n_
* α \(taille du quorum\): entre 1 et _k_
* β \(seuil de décision\): &gt;= 1

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

### Algorithme expliqué

Tout le monde a une préférence initiale pour la pizza ou le barbecue. Jusqu'à ce que quelqu'un ait décidé, ils interrogent _k_ personnes \(la taille de l'échantillon\) et leur demandent ce qu'ils préfèrent. Si α ou plus de personnes donnent la même réponse, cette réponse est adoptée comme nouvelle préférence. α est appelé la _taille du quorum_. Si la nouvelle préférence est la même que l'ancienne, le`consecutiveSuccesses` compteur de succès consécutifs est incrémenté. Si la nouvelle préférence est différente, alors l'ancienne préférence, la valeur `consecutiveSucccesses` est égale à `1`. Si aucune réponse n'obtient un quorum \(une majorité α de la même réponse\), le compteur`consecutiveSuccesses` est mis à `0`

Tout le monde répète ceci jusqu'à ce qu'ils obtiennent un quorum pour la même réponse β fois de suite. Si une personne décide de la pizza, toutes les autres personnes qui suivent le protocole décideront également de la pizza.

Des changements aléatoires de préférence, causés par un échantillonnage aléatoire, provoquent une préférence de réseau pour un choix, ce qui engendre plus de préférence de réseau pour ce choix jusqu'à ce qu'il devienne irréversible et que les nœuds puissent ensuite décider.

{% hint style="info" %}
Pour une excellente visualisation, consultez [cette démo](https://tedyin.com/archive/snow-bft-demo/#/snow) du co-fondateur d'Ava Labs, Ted Yin.
{% endhint %}

Dans notre exemple, il existe un choix binaire entre pizza ou barbecue, mais Snowball peut être adapté pour parvenir à un consensus sur les décisions avec de nombreux choix possibles.

Les seuils de vitalité et de sûreté sont paramétrables. À mesure que la taille du quorum, α, augmente, le seuil de sûreté augmente et le seuil de vitalité diminue. Cela signifie que le réseau peut tolérer plus de nœuds byzantins \(délibérément incorrects, malveillants\) et rester en sécurité, ce qui signifie que tous les nœuds finiront par convenir si quelque chose est accepté ou rejeté. Le seuil de vitalité est le nombre de participants malveillants qui peuvent être tolérés avant que le protocole ne puisse plus progresser.

Ces valeurs, qui sont des constantes, sont assez petites sur le réseau Avalanche. La taille de l'échantillon, _k_, est de `20`. Ainsi, lorsqu'un nœud demande son avis à un groupe de nœuds, il interroge seulement `20` nœuds sur l'ensemble du réseau. La taille du quorum, α, est de `14`. Ainsi, si`14` nœuds ou plus donnent la même réponse, cette réponse est adoptée comme préférence du nœud interrogateur. Le seuil de décision, β, est de`20`. Un nœud décide de son choix après avoir reçu `20` réponses consécutives de quorum \(majorité α\).

Snowball est très évolutif à mesure que le nombre de nœuds sur le réseau, _n_, augmente. Quel que soit le nombre de participants au réseau, le nombre de messages de consensus envoyés reste le même car dans une requête donnée, un nœud interroge seulement `20`nœuds, même s'il y a des milliers de nœuds dans le réseau.

## DAG \(graphes acycliques dirigés\)

Maintenant, introduisons une structure de données appelée DAG ou Graphe orienté acyclique. Un DAG donne un ordre partiel des décisions. Par exemple, consultez le DAG dans ce diagramme :

![DAG basique](https://gblobscdn.gitbook.com/assets%2F-MKmFQYgp3Usx3i-VLJU%2Fsync%2F09e9a6c4a31506b4f6ff75ad6e8a124ae92c17c0.png?alt=media)

**a** est avant **b**. **b** est avant **d**. **d** est avant **e**. De manière transitoire, on peut dire que **a** précède **e**. Cependant, puisqu'il s'agit d'un ordre partiel : pour certains éléments, l'ordre n'est pas défini. Par exemple, **b** et **c** sont tous les deux après **a** mais il n'y a aucune notion de si **b** est avant ou après **c**.

Deux autres concepts liés au DAG sont les ancêtres et les descendants. Les ancêtres sont tous les nœuds du DAG auxquels vous pouvez tracer une ligne. Par exemple, les ancêtres de **d** sont **a**, **b** et **c**. Les ancêtres de **e** sont **a**, **b**, **c** et **d**. Les descendants sont le contraire des ancêtres. Les descendants de **a** sont **b**, **c**, **d** et **e**. Les descendants de **b** sont **d** et **e**.

Bitcoin et Ethereum, par exemple, ont une chaîne linéaire où chaque bloc a un parent et un enfant. Avalanche utilise un DAG pour stocker les données plutôt qu'une chaîne linéaire. Chaque élément du DAG peut avoir plusieurs parents. La relation parent-enfant dans le DAG n'implique pas une dépendance au niveau de l'application.

Dans un protocole de consensus, le but du jeu est d'empêcher l'inclusion de **transactions conflictuelles** dans le DAG. Les conflits sont définis par l'application. Différentes applications auront des notions différentes sur ce que signifie le conflit entre deux transactions. Par exemple, dans un système de paiement P2P, les transactions qui consomment le même UTXO \([Unspent Transaction Output](https://fr.wikipedia.org/wiki/Unspent_transaction_output)\) seraient en conflit. Dans Avalanche, chaque transaction appartient à un **ensemble de conflits** which consists of conflicting transactions. Only one transaction in a conflict set can be included in the DAG. Each node **prefers** one transaction in a conflict set.

## Exemple de travail

Supposons que nous ayons un réseau Avalanche fonctionnant avec les paramètres suivants. La taille de l'échantillon, _k_, est`4`. La taille du quorum, α, est de `3`. Le nombre de succès consécutifs, β, est de `4`.

![Exemple de travail 1](https://gblobscdn.gitbook.com/assets%2F-MKmFQYgp3Usx3i-VLJU%2Fsync%2F520c97112250ade9fe192ab571a531a33dbaf348.png?alt=media)

Un nœud découvre une nouvelle transaction **Y**. Il interroge le réseau sur la base des paramètres ci-dessus. Il interroge _k_ \(`4`\) validateurs et demande : "Préférez-vous cette transaction ?" Il obtient des réponses - trois d'entre eux disent **oui** et l'un d'eux dit **non**. La taille du quorum, α, est de `3` donc il y a une majorité α \(quorum\) de réponses oui. Maintenant, le nœud met à jour son DAG.

![Exemple de travail 2](https://gblobscdn.gitbook.com/assets%2F-MKmFQYgp3Usx3i-VLJU%2Fsync%2F60bf7012b1abf54828e329a7bc974d1c1c351247.png?alt=media)

Si un nœud obtient une réponse majoritaire α pour une transaction, alors vous donnez à cette transaction un chit, qui est un booléen qui dit ****: "Quand j'ai interrogé le réseau à propos de cette transaction, une majorité α a dit qu'elle la préférait." Dans notre exemple, la transaction Y obtient un chit.

Il y a aussi une notion de **confiance**, qui est la somme des pions d'un sommet plus la somme des pions de ses descendants. Par exemple, la transaction  **V** a un chit. Il a également trois descendants qui ont un jeton donc sa confiance est augmentée de `3` à `4`. De même, les transactions **W** et **X** ont toutes deux un jeton et ils ont tous deux un descendant avec un jeton, donc ils ont chacun confiance `2`. La transaction Y a confiance `1`.

**Les succès consécutifs** sont les mêmes que dans Snowball. C'est le nombre de fois qu'une transaction où un descendant de la transaction, a reçu une réponse à une requête majoritaire α réussie. Auparavant, la transaction V avait `3` succès consécutifs, elle-même et ses deux enfants, et maintenant elle a `4` succès consécutifs avec la transaction Y. De même pour les transactions W et X.

![Exemple de travail 3](https://gblobscdn.gitbook.com/assets%2F-MKmFQYgp3Usx3i-VLJU%2Fsync%2F92db418984cc621e1ab01686acf1e1318e43b3e3.png?alt=media)

Dans cet exemple, le seuil d'acceptation, β, est de `4`. La transaction V a `4` succès consécutifs, elle est donc **acceptée**. Ce nœud est sûr que tous les autres nœuds corrects finiront par accepter cette transaction.

![Exemple de travail 4](https://gblobscdn.gitbook.com/assets%2F-MKmFQYgp3Usx3i-VLJU%2Fsync%2F9d73fde418f0cd1f4656976e220341f65dd3be67.png?alt=media)

Supposons maintenant que le nœud apprenne la transaction **Y'** qui entre en conflit avec la transaction Y. Il suit les mêmes étapes que précédemment et sous-échantillons _k_ \(`4`\) validateurs et demande s'ils préfèrent la transaction Y'. Dans ce cas, deux d'entre eux disent qu'ils préfèrent Y 'et deux d'entre eux disent qu'ils ne préfèrent pas Y'. Cette fois, il n'y a pas de réponse majoritaire α et le DAG est mis à jour en conséquence.  


![Exemple de travail 5](https://gblobscdn.gitbook.com/assets%2F-MKmFQYgp3Usx3i-VLJU%2Fsync%2F47f47bd47739f0b051e9ae4397c3253e38025ce3.png?alt=media)

Les transactions Y et Y 'sont dans un ensemble conflictuel; un seul d'entre eux peut finalement être accepté. La transaction Y 'n'obtient pas de pion car elle n'a pas obtenu de réponse majoritaire α. Il a la confiance `0` car il n'a pas de chit et il n'a aucun descendant avec un pion. Elle a `0` succès consécutifs, car la requête précédente n'a pas obtenu de réponse majoritaire α. Le compteur de succès consécutifs de W passe de `2` à `0`. Sa confiance est toujours de `2`.

Lorsqu'on demande à un nœud s'il préfère une transaction donnée, il répond oui si cette transaction a la plus grande confiance de toute transaction dans l'ensemble de conflits de la transaction. Dans cet exemple, la transaction Y a la confiance `1` et la transaction Y 'a la confiance `0` , de sorte que le nœud préfère la transaction Y à la transaction Y'.

![Exemple de travail 6](https://gblobscdn.gitbook.com/assets%2F-MKmFQYgp3Usx3i-VLJU%2Fsync%2F9aae4fd4f2ac9c13db00f951387846ff1cf8d7e5.png?alt=media)

Maintenant, le nœud apprend une nouvelle transaction, **Z**, et il fait la même chose qu'avant. Il interroge _k_ nœuds, récupère une réponse majoritaire α et met à jour le DAG.

![Exemple de travail 7](https://gblobscdn.gitbook.com/assets%2F-MKmFQYgp3Usx3i-VLJU%2Fsync%2Fec77f11538dadbc53be9c05d8b6d1836b88454f9.png?alt=media)

La transaction Z obtient un chit. Il a également une confiance de`1` et `1` succès consécutifs. Les ancêtres de traitement sont également mis à jour. Aucune transaction n'a `4` succès consécutifs, donc aucun ancêtre n'est accepté.

## Sommets

Tout ce qui a été discuté jusqu'à présent est la façon dont Avalanche est décrite dans [le livre blanc d'Avalanche.](https://assets-global.website-files.com/5d80307810123f5ffbb34d6e/6009805681b416f34dcae012_Avalanche%20Consensus%20Whitepaper.pdf) L'implémentation du protocole de consensus Avalanche par Ava Labs \(notamment dans AvalancheGo\) a quelques optimisations pour la latence et le débit. L'optimisation la plus importante est l'utilisation de **sommets.** Un sommet est comme un bloc dans une blockchain linéaire. Il contient les hachages de ses parents et il contient une liste de transactions. Les sommets permettent de regrouper les transactions et de les voter en groupes plutôt qu'une par une. Le DAG est composé de sommets et le protocole fonctionne de manière très similaire à la façon dont il est décrit ci-dessus.

Si un nœud reçoit un vote pour un sommet, il compte comme un vote pour toutes les transactions dans un sommet, et les votes sont appliqués de manière transitoire vers le haut. Un sommet est accepté lorsque toutes les transactions qu'il contient sont acceptées. Si un sommet contient une transaction rejetée, elle est rejetée et tous ses descendants sont rejetés. Si un sommet est rejeté, toutes les transactions valides sont réémises dans un nouveau sommet qui n'est pas l'enfant d'un sommet rejeté. Les nouveaux sommets sont ajoutés aux sommets préférés.

## Finalité

Le consensus d'Avalanche est probabilistiquement sûr jusqu'à un seuil de sûreté. C'est-à-dire que la probabilité qu'un nœud correct accepte une transaction qu'un autre nœud correct rejette peut être rendue arbitrairement basse en ajustant les paramètres du système. Dans le protocole de consensus Nakamoto \(tel qu'utilisé dans Bitcoin et Ethereum, par exemple\), un bloc peut être inclus dans la chaîne mais ensuite être supprimé et ne pas finir dans la chaîne canonique. Cela signifie qu'il faut attendre une heure pour le règlement de la transaction. Dans Avalanche, l'acceptation / le rejet sont définitifs et irréversibles et prennent quelques secondes.

## Optimisations

Il n'est pas efficace pour les nœuds de simplement demander "Préférez-vous ce sommet?" quand ils interrogent les validateurs. Dans l'implémentation d'Ava Labs, lors d'une requête, un nœud demande: "Étant donné que ce sommet existe, quels sommets préférez-vous?" Au lieu de récupérer un oui / non binaire, le nœud reçoit l'ensemble de sommets préféré de l'autre nœud.

Les nœuds n'interrogent pas uniquement lorsqu'ils entendent une nouvelle transaction. Ils interrogent à plusieurs reprises jusqu'à ce qu'il n'y ait pas de traitement de vertices vertueux. Un sommet vertueux est celui qui n'a pas de conflits.

Les nœuds n'ont pas besoin d'attendre d'avoir toutes les _k_ réponses de requête avant d'enregistrer le résultat d'un sondage. Si aucune transaction ne peut obtenir une majorité α, il n'est pas nécessaire d'attendre le reste des réponses.

## Validateurs

S'il était libre de devenir un validateur sur le réseau Avalanche, ce serait problématique car un acteur malveillant pourrait démarrer de très nombreux nœuds qui seraient interrogés très fréquemment. L'acteur malveillant pourrait faire mal agir le nœud et provoquer un échec de sûreté et de vitalité. Les validateurs, les nœuds interrogés dans le cadre du consensus, ont une influence sur le réseau. Ils doivent payer cette influence avec une valeur réelle afin d'éviter ce genre de bourrage de bulletins de vote. Cette idée d'utiliser la valeur réelle pour acheter de l'influence sur le réseau s'appelle la preuve d'enjeu.

Pour devenir validateur, un nœud doit lier \(**mise en jeu**\) quelque chose de précieux \(**AVAX**\). Plus un nœud à d'AVAX, plus ce nœud est souvent interrogé par d'autres nœuds. Lorsqu'un nœud échantillonne le réseau, ce n'est pas uniformément aléatoire. Il est plutôt pondéré par le montant de la mise. Les nœuds sont incités à être des validateurs parce qu'ils obtiennent une récompense si, pendant qu'ils valident, ils sont suffisamment corrects et réactifs.

Avalanche n'a pas de slashing. Si un nœud ne se comporte pas bien lors de la validation, comme donner des réponses incorrectes ou peut-être ne pas répondre du tout, son enjeu est toujours retourné dans son intégralité, mais sans récompense. Tant qu'une partie suffisante de l'AVAX lié est détenue par des nœuds corrects, alors le réseau est sûr et est opérationnel pour des transactions vertueuses.

## Grandes idées

Deux grandes idées dans Avalanche sont le **sous-échantillonnage** et le **vote transitif**. Le sous-échantillonnage a une faible surcharge de message. Peu importe qu'il y ait vingt validateurs ou deux mille validateurs; le nombre de messages de consensus qu'un nœud envoie lors d'une requête reste constant.

![Exemple de travail 8](https://gblobscdn.gitbook.com/assets%2F-MKmFQYgp3Usx3i-VLJU%2Fsync%2F86d12c3dbb515ec0118cb808493b2abbd10a260f.png?alt=media)

Le vote transitif, où un vote pour un sommet est un vote pour tous ses ancêtres, contribue au débit des transactions. Chaque vote est en fait plusieurs votes en un. Par exemple, dans le diagramme ci-dessus, si un nœud obtient un vote pour le sommet **D**, cela implique un vote pour tous ses ancêtres; un vote pour **D** est aussi un vote pour **A**, **B** et **C**.

## Faux-fuyants

Les transactions sont créées par les utilisateurs qui appellent une API sur le nœud complet [AvalancheGo](https://github.com/ava-labs/avalanchego) ou les créent à l'aide d'une bibliothèque telle qu'[AvalancheJS](https://github.com/ava-labs/avalanchejs). Les sommets sont créés lorsque les nœuds regroupent les transactions entrantes ou lorsque les transactions acceptées d'un sommet rejeté sont réémises et ajoutées au DAG. Les parents d'un sommet sont choisis à partir de la frontière vertueuse, qui sont les nœuds à la pointe du DAG sans conflit. Il est important de construire sur des sommets vertueux car si nous construisions sur des sommets non vertueux, il y aurait plus de chances que le nœud soit rejeté, ce qui signifie qu'il y a plus de chances que ses ancêtres soient rejetés et que nous ferions moins de progrès.

## Autres observations

Les transactions conflictuelles ne sont pas de garanties de vitalité. Ce n'est pas vraiment un problème car si vous souhaitez que votre transaction soit en direct, vous ne devez pas émettre de transaction conflictuelle. 

Avalanche fonctionne également pour les chaînes linéaires. Le protocole est en grande partie le même que ci-dessus, mais chaque sommet n'a qu'un seul parent. Cela donne un ordre total des sommets. Ceci est utile pour certaines applications où l'on a besoin de savoir si une transaction est intervenue avant une autre transaction, comme avec les contrats intelligents. Snowman est le nom de l'implémentation par Ava Labs du protocole de consensus Avalanche pour les chaînes linéaires. 

S'il n'y a pas de transactions indécises, le protocole de consensus Avalanche est suspendu. Autrement dit, cela ne fait rien s'il n'y a pas de travail à faire. L'avalanche est plus durable que la preuve de travail où les nœuds doivent constamment travailler. 

Avalanche n'a pas de leader. Tout nœud peut proposer une transaction et tout nœud qui a mis en jeu de l'AVAX peut voter sur chaque transaction, ce qui rend le réseau plus robuste et décentralisé.

## Pourquoi nous en soucions-nous?

Avalanche est un moteur de consensus général. Le type d'application placé dessus n'a pas d'importance. Le protocole permet le découplage de la couche application de la couche consensus. Si vous créez une Dapp sur Avalanche, il vous suffit de définir quelques éléments, comme la manière dont les conflits sont définis et le contenu d'une transaction. Vous n'avez pas à vous soucier de la manière dont les nœuds parviennent à un accord. Le protocole de consensus est une boîte noire qui y met quelque chose et qui revient comme accepté ou rejeté.

Avalanche peut être utilisé pour toutes sortes d'applications, pas seulement pour les réseaux de paiement P2P. Le réseau principal d'Avalanche possède une instance de la machine virtuelle Ethereum, qui est rétrocompatible avec les outils de développement Ethereum Dapps existants. Le protocole de consensus Ethereum a été remplacé par le consensus Avalanche pour permettre une latence de bloc inférieure et un débit plus élevé.

Avalanche est très performant. Il peut traiter des milliers de transactions par seconde avec une à deux secondes de latence d'acceptation.

## Résumé

Le consensus d'Avalanche est une percée radicale dans les systèmes distribués. Il représente un bond en avant aussi important que les protocoles de consensus classique et Nakamoto qui l'ont précédé. Maintenant que vous avez une meilleure compréhension de son fonctionnement, consultez d'autres [documents](https://docs.avax.network/v/francais/) sur la création de Dapps et d'instruments financiers révolutionnaires sur Avalanche.


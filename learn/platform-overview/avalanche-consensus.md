---
description: Une plongée profonde dans le protocole de consensus avalanche

---

# Consensus d'avalanche

Le consensus est la tâche d'obtenir un groupe d'ordinateurs pour parvenir à un accord sur une décision. Les ordinateurs peuvent parvenir à un consensus en suivant un ensemble de mesures appelées un protocole de consensus. Avalanche est un nouveau protocole de consensus qui est évolutif, robuste et décentralisé. Il a une faible latence et un haut débit. Il est efficace en énergie et ne nécessite pas de matériel informatique spécial. Il fonctionne bien dans les conditions contradictoires et est résilient aux « attaques de 51% ». Ce document explique le protocole de consensus avalanche. Le blanc est [là.](https://www.avalabs.org/whitepapers)

## Vidéo

{% embase url="https://www.youtube.com/watch?v=ZUF9sIu-D\_k" caption="" %}

## Intuition

Premièrement, développons une certaine intuition sur le protocole. Imaginez une chambre pleine de personnes qui tentent de convenir de ce qu'il faut obtenir pour le déjeuner. Supposons que c'est un choix binaire entre la pizza et le barbecue. Certaines personnes pourraient initialement préférer la pizza tandis que d'autres préférer initialement le barbecue. En fin de compte, cependant, l'objectif de chacun est d'atteindre un **consensus**.

Chacun demande un sous-ensemble aléatoire des personnes dans la pièce quelle est leur préférence pour le déjeuner. Si plus de la moitié disent pizza, la personne pense, "Ok, ressemble aux choses se penchent vers la pizza. Je préfère la pizza maintenant." C'est-à-dire qu'ils adoptent la _préférence_ de la majorité. De même, si une majorité disent barbecue, la personne adopte barbecue comme leur préférence.

Tout le monde répète ce processus. Chaque tour, de plus en plus de personnes ont la même préférence. Ceci est parce que plus les personnes qui préfèrent une option, plus il est probable que quelqu'un soit de recevoir une réponse majoritaire et adopter cette option comme leur préférence. Après suffisamment de tournées, ils parviennent au consensus et décident d'une option, que tout le monde préfère.

## Snowball de neige

L'intuition ci-dessus décrit l'algorithme de boule de neige, qui est un bloc de base du consensus d'Avalanche. Examinons l'algorithme de Snowball.

### Paramètres

* _n_: nombre de participants
* _k_ \(taille de l'échantillon\): entre 1 et _n_
* α taille\): entre 1 et _k_
* β de décision\): >= 1

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

Chacun a une préférence initiale pour la pizza ou le barbecue. Jusqu'à ce que quelqu'un ait _décidé_, ils interrogent _k_ personnes \(la taille de l'échantillon\) et leur demander ce qu'ils préfèrent. Si α ou plus les personnes donnent la même réponse, cette réponse est adoptée comme la nouvelle préférence. α est appelée _la taille du quorum_. Si la nouvelle préférence est la même que l'ancienne préférence, le compteur `consecutiveSuccesses` est incrémenté. Si la nouvelle préférence est différente, alors l'ancienne préférence, le `consecutiveSucccesses` contre-`1`. Si `aucune` réponse n'obtient un quorum \(une majorité α de la même réponse\), le compteur consecutiveSucccesses est réglé à `0`.

Chacun le répète jusqu'à ce qu'ils obtiennent un quorum pour la même réponse β fois dans une rangée. Si une personne décide pizza, alors toute autre personne suivant le protocole sera éventuellement également décider sur la pizza.

Les changements aléatoires de la préférence, causés par l'échantillonnage aléatoire, provoquent une préférence réseau pour un choix, ce qui engendre plus de préférence réseau pour ce choix jusqu'à ce qu'il devienne irréversible puis les nœuds peuvent décider.

{% allusion style="info" %} Pour une grande visualisation, consultez [cette démo](https://tedyin.com/archive/snow-bft-demo/#/snow) de la Co-fondateur d'Ava Labs' Ted Yin. {% endhint %}

Dans notre exemple, il y a un choix binaire entre la pizza ou le barbecue, mais Snowball peut être adapté pour atteindre un consensus sur les décisions avec de nombreux choix possibles.

Les seuils de la liveness et de sécurité sont paramétrables. À mesure que la taille du quorum, α, augmente, le seuil de sécurité augmente, et le seuil de la liveness diminue. Cela signifie que le réseau peut tolérer plus byzantin \(délibérément incorrect, malveillants\) noeuds et rester sûr, ce qui signifie que tous les noeuds finiront par convenir que quelque chose est accepté ou rejeté. Le seuil de la liveness est le nombre de participants malveillants qui peuvent être tolérés avant que le protocole ne puisse progresser.

Ces valeurs, qui sont des constantes, sont assez petites sur le réseau Avalanche. Donc, lorsqu'un noeud demande à un groupe de noeuds leur avis, il demande _seulement_ `20``` noeuds hors du réseau. Donc, si `14``` nœuds ou plus donnent la même réponse, cette réponse est adoptée comme la préférence du nœud interrogé. Le seuil de décision, β, est `20`. Un noeud décide du choix après avoir reçu `20` réponses consécutives quorum \(α majorité\).

Snowball est très évolutif comme le nombre de nœuds sur le réseau, _n_, augmente. Indépendamment du nombre de participants au réseau, le nombre de messages de consensus envoyés reste le même parce que dans une requête donnée, un noeud ne demande que `20` noeuds, même s'il y a des milliers de noeuds dans le réseau.

## **D**AGs **\(Graphiques acycliques****** dirigés\)

Maintenant, introduisons une structure de données appelée un graphique DAG ou Acyclique dirigé. Un DAG donne une **commande partielle** des décisions. Par exemple, consultez le DAG dans ce diagramme:

![DAG de base](../../.gitbook/assets/cons-01-Frame16.png)

**a** est avant **b**. **b** est avant **d**. **c** est avant **e**. Transitively, nous pouvons dire **qu'a** vient avant **e**. Cependant, puisque c'est une commande partielle : pour certains éléments, la commande n'est pas définie. Par exemple, **b** et **c** sont après **un** mais il n'y a aucune **notion** de b avant ou après **c**.

Deux concepts supplémentaires liés au DAG sont **les ancêtres** et les **descendants**. Les ancêtres sont n'importe quel nœud dans le DAG que vous pouvez dessiner une ligne à. Par exemple, les ancêtres de **d** sont **a**, **b** et **c**. Les ancêtres **de** **e** sont **a** et c. Descendants sont l'opposé des ancêtres. Les descendants de **a** sont **b**, **c**, **d** et **e**. Le descendant de **b** est **d**.

Tant Bitcoin et Ethereum, par exemple, ont une chaîne linéaire où chaque bloc a un parent et un enfant. Avalanche utilise un DAG pour stocker les données plutôt qu'une chaîne linéaire. Chaque élément du DAG peut avoir plusieurs parents. La relation parents-enfants dans le DAG n'implique pas une dépendance au niveau de l'application.

Dans un protocole de consensus, le nom du jeu est d'empêcher l'inclusion de **transactions** conflictuelles dans le DAG. Les conflits sont définis par l'application. Différentes applications auront différentes notions sur ce que cela signifie pour deux transactions au conflit. Par exemple, dans un système de paiement P2P, les transactions qui consomment le même UTXO [\(Sortie de transaction non dépensée\)](https://en.wikipedia.org/wiki/Unspent_transaction_output) seraient en conflit. En Avalanche, chaque transaction appartient à un **ensemble de conflit** qui consiste en opérations conflictuelles. Une seule transaction dans un ensemble de conflit peut être incluse dans le DAG. Chaque noeud **préfère** une transaction dans un jeu de conflit.

## Exemple de travail

Supposons que nous ayons un réseau Avalanche fonctionnant avec les paramètres suivants. La taille de l'échantillon, _k_, est `4`. La taille du quorum, α, est `3`. Le nombre de succès consécutif, β, est `4`.

![Exemple de travail 1](../../.gitbook/assets/cons-02-Consensus_Doc_txY.png)

Un noeud découvre une nouvelle transaction **Y**. Il interroge le réseau en fonction des paramètres ci-dessus. Il interroge _k_ \(`4`\) validateurs et demande: "Vous préférez cette opération?" Il récupère les responses—three d'entre elles disent **oui** et l'une d'elles dit **non**. La taille du quorum, α, est `3` donc il ya une majorité α \(quorum\) des réponses oui. Maintenant, nous le noeud actualise son DAG.

![Exemple de travail 2](../../.gitbook/assets/cons-03-Consensus_Doc_txY-6.png)

Si un noeud obtient une réponse α majoritaire pour une opération, vous donnez à cette transaction une **chiit**, qui est un booléen qui dit: "Lorsque j'ai interrogé le réseau sur cette transaction, une majorité α dit qu'ils l'ont préférée." Dans notre exemple, la transaction Y obtient un lit.

Il y a aussi une notion de **confiance**, qui est la somme du chichet d'un vertex plus la somme des chits de ses descendants. Par exemple, la transaction **V** a un lit. Il a également trois descendants qui ont un poussin de sorte que sa confiance est augmentée de `3` à `4`. De même, les transactions **W** et **X** ont tous deux un poussin et ils ont tous deux une descendance avec un poussin, donc ils ont chacun confiance `2`. Transaction Y a confiance `1`.

**Les succès consécutifs** sont les mêmes que dans le ballon de neige. C'est le nombre de fois qu'une opération, ou un descendant de la transaction, a reçu une réponse de la requête α majoritaire réussie. Auparavant, la transaction V avait `trois` succès consécutifs, elle-même et ses deux enfants, et maintenant elle a `4` succès consécutifs avec la transaction Y. De la même manière pour les transactions W et X.

![Exemple de travail 3](../../.gitbook/assets/cons-04-Consensus_Doc_txY-2.png)

Dans cet exemple, nous le seuil d'acceptation, β, est `4`. Transaction V a `4` succès consécutifs, il est **accepté**. Ce noeud est sûr que tous les autres noeuds corrects finiront par accepter cette transaction.

![Exemple de travail 4](../../.gitbook/assets/cons-05-Consensus_Doc_txY-3.png)

Supposons maintenant que le noeud apprend la transaction **Y'** qui est en conflit avec la transaction Y. Il suit les mêmes étapes que avant et sous-échantillons _k_ \(`4`\) validateurs et demande s'ils préfèrent la transaction Y'. Dans ce cas, deux d'entre eux disent qu'ils préfèrent Y' et deux d'entre eux disent qu'ils ne préfèrent pas Y'. Cette fois-ci, il n'y a pas de réponse α majoritaire, et le DAG est mis à jour en conséquence.

![Exemple de travail 5](../../.gitbook/assets/cons-06-Consensus_Doc_txY-4.png)

Les transactions Y et Y sont dans un jeu de conflit; seule une d'entre elles peut finalement être acceptée. Transaction Y' n'a pas obtenu un chiot parce qu'il n'a pas obtenu une réponse α majoritaire. Il a confiance `0` parce qu'il n'a pas de chiot et il n'a pas de descendants avec un chit. Il a `0` succès consécutifs parce que la requête précédente n'a pas obtenu une réponse α majoritaire. Le compteur de succès consécutif de W va de `2` à `0`. Sa confiance est toujours `2`.

Lorsqu'un noeud est demandé s'il préfère une transaction donnée, il répond oui si cette transaction a la plus grande confiance de toute transaction dans le jeu de conflit de la transaction. Dans cet exemple, la transaction Y a la confiance `1` et la transaction Y' a la confiance `0` afin que le noeud préfère la transaction Y à la transaction Y'.

![Exemple de travail 6](../../.gitbook/assets/cons-07-Consensus_Doc_txY-1.png)

Maintenant, le noeud apprend sur une nouvelle transaction, **Z**, et il fait la même chose qu'avant. Il interroge les nœuds _k_, récupère une réponse α majoritaire, et met à jour le DAG.

![Exemple de travail 7](../../.gitbook/assets/cons-08-Consensus_Doc_txY-5.png)

Transaction Z obtient un lit. Il a également une confiance de `1` et `1` succès consécutif. Les ancêtres de la transformation sont mis à jour, aussi. Aucune transaction n'a `4` succès consécutifs, donc aucun ancêtre ne sont acceptés.

## Vertiges

Tout ce qui est discuté à ce point est la façon dont l'Avalanche est décrite dans [le whitepaper](https://assets-global.website-files.com/5d80307810123f5ffbb34d6e/6009805681b416f34dcae012_Avalanche%20Consensus%20Whitepaper.pdf). La mise en œuvre du protocole de consensus Avalanche par Ava Labs \(à savoir dans AvalancheGo\) a quelques optimisations pour la latence et le débit. L'optimisation la plus importante est l'utilisation des **sommets**. Un vertex est comme un bloc dans une blockchain linéaire. Il contient les cendres de ses parents, et il contient une liste de transactions. Les sommets permettent que les transactions soient groupées et votées en groupes plutôt qu'une par une. Le DAG est composé de sommets, et le protocole fonctionne très similaire à la façon dont il est décrit ci-dessus.

Si un noeud reçoit un vote pour un vertex, il compte comme un vote pour toutes les transactions dans un vertex, et les votes sont appliqués transitivement vers le haut. Un vertex est accepté lorsque toutes les transactions qui sont dans celui-ci sont acceptées. Si un vertex contient une transaction rejetée, elle est rejetée et tous ses descendants sont rejetés. Si un vertex est rejeté, toute transaction valide est re-issued dans un nouveau vertex qui n'est pas l'enfant d'un vertex rejeté. Les nouveaux sommets sont annexés aux sommets préférés.

## Finalité

Le consensus sur les avalanches est probabiliste jusqu'à un seuil de sécurité. C'est-à-dire la probabilité qu'un noeud correct accepte une transaction qu'un autre noeud correct rejette peut être rendu arbitrairement bas en ajustant les paramètres du système. Dans le protocole de consensus Nakamoto \(tel qu'utilisé dans Bitcoin et Ethereum, par exemple\), un bloc peut être inclus dans la chaîne, mais ensuite être supprimé et pas finir dans la chaîne canonique. Cela signifie attendre une heure pour le règlement des transactions. En Avalanche, l'acceptation/rejet sont **définitifs et irréversibles** et prennent quelques secondes.

## Optimisations

Il n'est pas efficace pour les nœuds de simplement demander: "Vous préférez ce vertex?" lorsqu'ils interrogent les validateurs. Dans la mise en œuvre d'Ava Labs, pendant une requête un noeud demande: «Étant donné que ce vertex existe, quels sommets préférez-vous ?» Au lieu de revenir un oui/non binaire, le noeud reçoit l'ensemble de vertex préféré de l'autre noeud.

Les nœuds ne demandent pas seulement lors de l'audition d'une nouvelle transaction. Ils demandent à plusieurs reprises jusqu'à ce qu'il n'y ait pas de traitement vertueux de sommets. Un vertex vertueux est celui qui n'a pas de conflits.

Les nœuds n'ont pas besoin d'attendre qu'ils obtiennent toutes les réponses _k_ requête avant d'enregistrer les résultats d'un sondage. Si aucune transaction ne peut obtenir une majorité α, il n'est pas nécessaire d'attendre le reste des réponses.

## Validators

S'il était libre de devenir un validateur sur le réseau Avalanche, ce serait problématique parce qu'un acteur malveillant pourrait commencer beaucoup, beaucoup de nœuds qui seraient interrogés très fréquemment. L'acteur malveillant pourrait faire le noeud agir mal et causer une défaillance de la sécurité ou de la liveness Les validateurs, les nœuds interrogés dans le cadre du consensus, ont une influence sur le réseau. Ils doivent payer cette influence avec la valeur réelle afin d'éviter ce genre de farce de scrutin. Cette idée d'utiliser la valeur réelle pour acheter l'influence sur le réseau est appelée Preuve de l'intérêt.

Pour devenir un validateur, un noeud doit **lier** \(jeu\) quelque chose de précieux \(**AVAX**\). Plus il est AVAX, plus il est possible que le noeud soit interrogé par d'autres noeuds. Lorsqu'un noeud prélève le réseau, il n'est pas uniformément aléatoire. Plutôt, il est pondéré par le montant de la participation. Les nœuds sont incités à être des validateurs parce qu'ils obtiennent une récompense si, pendant qu'ils sont valides, ils sont suffisamment corrects et réactifs.

Avalanche n'a pas de claquage. Si un noeud ne se comporte pas bien pendant la validation, comme donner des réponses incorrectes ou peut-être pas du tout, son jeu est toujours retourné dans son ensemble, mais sans récompense. Tant qu'une partie suffisante de of lié est tenue par des nœuds corrects, le réseau est sûr et est en direct pour les transactions vertueuses.

## Grandes idées

Deux grandes idées dans Avalanche sont **sous-échantillonnage** et **vote transitif**. Le sous-échantillonnage a un faible niveau de message supérieur. Peu importe s'il y a vingt validateurs ou deux mille validateurs; le nombre de messages de consensus qu'un noeud envoie pendant une requête demeure constant.

![Exemple de travail 8](../../.gitbook/assets/cons-09-Consensus_Doc_txY-7.png)

Le vote transitoire, où un vote pour un vertex est un vote pour tous ses ancêtres, aide avec le débit de transaction. Chaque vote est en fait beaucoup de votes en un. Par exemple, dans le diagramme ci-dessus, si un noeud obtient un vote pour le vertex **D**, qui implique un vote pour tous ses ancêtres; un vote pour **D** est également un vote pour **A**, **B** et **C**.

## Extrémités lâches

Les transactions sont créées par des utilisateurs qui appellent une API sur le nœud complet [AvalancheGo](https://github.com/ava-labs/avalanchego)[](https://github.com/ava-labs/avalanchejs) ou les créent à l'aide d'une bibliothèque telle call Les sommets sont créés lorsque les nœuds les transactions entrantes par lot ensemble ou lorsque les transactions acceptées à partir d'un vertex rejeté sont réémises et ajoutées au DAG. Les parents d'un vertex sont choisis parmi la frontière vertueuse, qui sont les nœuds à la pointe du DAG sans conflit. Il est important de construire sur les sommets vertueux parce que si nous nous appuyons sur des sommets non vertueux, il y aurait une chance plus élevée que le noeud serait rejeté ce qui signifie qu'il y a une chance plus élevée que ses ancêtres se seraient rejetés et nous ferons moins de progrès.

## Autres observations

Les transactions conflictuelles ne sont pas garanties d'être en direct. Ce n'est pas vraiment un problème parce que si vous voulez que votre transaction soit en direct, vous ne devriez pas émettre une transaction conflictuelle.

Avalanche fonctionne également pour les chaînes linéaires. Le protocole est largement le même as mais chaque vertex n'a qu'un parent. Cela donne une commande totale de sommets. Ceci est utile pour certaines applications où l'on doit savoir si une transaction est arrivée avant une autre opération, comme avec des contrats intelligents. Snowman est le nom de la mise en œuvre par Ava Labs' protocole de consensus Avalanche pour les chaînes linéaires.

S'il n'y a pas de transactions non décidées, le protocole de consensus avalanche _quiesces_. Autrement dit, il ne fait rien s'il n'y a pas de travail à faire. L'avalanche est plus durable que la démonstration de travail où les noeuds doivent faire constamment le travail.

Avalanche n'a aucun leader. N'importe quel noeud peut proposer une transaction et n'importe quel noeud qui a jalonné AVAX peut voter sur chaque opération, ce qui rend le réseau plus robuste et décentralisé.

## Pourquoi Nous Nous soucions-nous ?

Avalanche est un moteur de consensus général. Peu importe quel type d'application est mis en dessus. Le protocole permet le découplage de la couche d'application de la couche de consensus. Si vous construisez une Dapp sur Avalanche, vous avez juste besoin de définir quelques choses, comme la façon dont les conflits sont définis et ce qui est dans une transaction. Vous n'avez pas besoin de vous inquiéter de la façon dont les noeuds arrivent à un accord. Le protocole de consensus est une boîte noire qui y met quelque chose et il revient comme accepté ou rejeté.

Avalanche peut être utilisé pour toutes sortes d'applications, pas seulement les réseaux de paiement P2P. Le réseau primaire d'Avalanche a une instance de la machine virtuelle Ethereum qui est compatible avec les Dapps Ethereum existants et l'outillage dev. Le protocole de consensus Ethereum a été remplacé par le consensus Avalanche afin de permettre une latence inférieure des blocs et une plus grande portée.

Avalanche est très performant. Il peut traiter des milliers de transactions par seconde avec une à deux secondes latence d'acceptation.

## Résumé

Le consensus avalanche est une avancée radicale dans les systèmes distribués. Il représente une avancée aussi importante que les protocoles de consensus classique et Nakamoto qui s'y sont présentés. Maintenant que vous avez une meilleure compréhension de son fonctionnement, consultez d'autres [documents](https://docs.avax.network) pour la construction d'applications et d'instruments financiers changeants de jeu sur Avalanche.


# de dashboard Grafana

Ce sont des tableaux de bord de Grafana préconfigurés qui fonctionnent avec la configuration comme montré dans [la configuration](../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md) de la surveillance des nœuds.

Pour importer des tableaux de bord préconfigurés :

* Interface web d'Open Grafana
* Cliquez sur `+`la barre d'outils de gauche.
* Sélectionnez `Import JSON`et puis téléchargez le fichier JSON ou collez le contenu dans la `Import via panel json`zone
* Sélectionner `Prometheus`comme source de données

| Lien | Description |
| :--- | :--- |
| [Réseau](network.json) | Tableau de bord avec des informations de réseautage |
| [Base](database.json) | Tableau de bord avec des informations approfondies sur les opérations de la base de données |
| [Machine](machine.json) | Informations sur le nœud d'ordinateur est en cours d'exécution sur |
| [X-Chain](x_chain.json) | Tableau de bord montrant des informations approfondies sur l'opération de X-Chain |
| [P-Chain](p_chain.json) | Tableau de bord montrant des informations approfondies sur l'opération de P-Chain |
| [C-Chain](c_chain.json) | Tableau de bord montrant des informations approfondies sur l'exploitation de C-Chain |
| [Dashboard principal](main.json) | Tableau de bord principal, qui montre les informations les plus importantes, avec des liens vers d'autres tableaux de bord, utile comme point de départ |


# Cartes de bord Grafana

Ce sont des tableaux de bord de Grafana préconfigurés qui fonctionnent avec la configuration comme montré dans [Configuration de la surveillance des](../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md) nœuds.

Pour importer les tableaux de bord préconfigurés:

* Ouvrir l'interface web de Grafana
* Cliquez `+` sur la barre d'outils de gauche
* Sélectionnez `Importer JSON` puis télécharger le fichier JSON ou coller le contenu dans `Importer via la zone json du panneau`
* Sélectionnez `Prometheus` comme source de données

| Lien externe | Description |
| :--- | :--- |
| [Réseau](network.json) | Tableau de bord avec les informations de réseautage |
| [Base de données](database.json) | Tableau de bord avec des informations approfondies sur les opérations de la base de données |
| [Machine à fabriquer](machine.json) | Informations sur le noeud informatique est en cours d'exécution sur |
| [Chaîne X-X](x_chain.json) | Tableau de bord montrant les informations en profondeur sur l'opération X-Chain |
| [P-Chain](p_chain.json) | Tableau de bord montrant les informations en profondeur sur l'opération P-Chain |
| [Chaîne C](c_chain.json) | Tableau de bord montrant les informations approfondies sur l'opération C-Chain |
| [Tableau de bord principal](main.json) | Tableau de bord principal, montrant les informations les plus importantes, avec des liens vers d'autres tableaux de bord, utile comme point de départ |


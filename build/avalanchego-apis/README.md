# APIs AvalancheGo

Les clients interagissent avec Avalanche via les appels aux nœuds API. Les paramètres numériques des appels API peuvent être donnés comme les chaînes \(par exemple, `"5"` ou `5` sont tous les deux ok pour un argument entier\). Les valeurs de retour numériques sont toujours données comme chaînes \(p.ex., `"5"` plutôt que `5\).` Dans des exemples, les appels API sont effectués à un noeud écoutant le trafic HTTP sur `127.0.0.1:9650`.

| Titre | Description |
| :--- | :--- |
| [**Diffusion d'appels API**](issuing-api-calls.md) | Ce guide explique comment faire les appels aux API exposées par les nœuds avalanches. |
| [**L'API de la chaîne de la plate-forme \(P-Chain\)**](platform-chain-p-chain-api.md) | Permet aux clients d'interagir avec la chaîne P-Chain de la plateforme\), qui maintient l'ensemble de validation d'Avalanche et gère la création de blockchain et de sous-réseau. |
| [**L'API de la chaîne du contrat \(C-Chain\)**](contract-chain-c-chain-api.md) | Permet aux clients d'interagir avec l'instance principale EVM d'Avalanche, ainsi que d'autres instances EVM. |
| [**L'API de la chaîne d'échange \(X-Chain\)**](exchange-chain-x-chain-api.md) | Permet aux clients de créer et d'échanger des actifs, y compris AVAX, sur la chaîne X, ainsi que d'autres instances de l'AVM. |
| [**L'API Admin**](admin-api.md) | Permet aux clients d'examiner l'état interne d'un node’s l'ensemble de connexions et les données similaires de protocole interne. |
| [**L'API**](auth-api.md) Auth. | Permet aux clients de gérer la création et la révocation des jetons d'autorisation. |
| [**L'API santé**](health-api.md) | Permet aux clients de vérifier la santé d'un nœud. |
| [**L'API de**](index-api.md) l'index | Transactions, vertex ou bloc par ID. |
| [**L'API Info**](info-api.md) | Permet aux clients d'examiner les informations de base sur un nœud. |
| [**L'API IPC**](ipc-api.md) | Permet aux utilisateurs de créer des prises de domaine UNIX pour les blockchains à publier à. |
| [**L'API Keystore**](keystore-api.md) | Permet aux clients d'utiliser le fichier Keystore intégré d'un noeud Avalanche. |
| [**L'API Metrics**](metrics-api.md) | Permet aux clients d'obtenir des statistiques sur la santé et la performance d'un nœud. |




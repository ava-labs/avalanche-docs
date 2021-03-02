# APIs

Les clients interagissent avec Avalanche via des appels d'API aux nœuds. Les paramètres numériques dans les appels d'API peuvent être donnés sous forme de strings \(par exemple, `"5"` ou `5` sont tous les deux ok pour un argument entier\). Les valeurs de retour numériques sont toujours données sous forme de chaînes \(par exemple `"5"` au lieu de `5`\). Dans les exemples, les appels d'API sont effectués vers un nœud écoutant le trafic HTTP sur `127.0.0.1:9650`.

| Titre  | Description |
| :--- | :--- |
| \*\*\*\*[**Émettre des appels API**](emettre-des-appels-dapi.md)                                               **** | permet aux clients d'interagir avec la P-Chain \(Platform Chain\), qui gère l'ensemble de validateurs d'Avalanche et gère la création de blockchain et de sous-réseau. |
| \*\*\*\*[**Platform API \(P-Chain**\)](platform-api-p-chain.md) | permet aux clients d'interagir avec la P-Chain \(Platform Chain\), qui gère l'ensemble de validateurs d'Avalanche et gère la création de blockchain et de sous-réseau. |
| \*\*\*\*[**EVM API \(C-Chain\)**](evm-api-c-chain.md)\*\*\*\* | permet aux clients d'interagir avec la C-Chain, l'instance EVM principale d'Avalanche, ainsi qu'avec d'autres instances EVM. |
| \*\*\*\*[**AVM API \(X-Chain\)**](avm-api-x-chain.md)\*\*\*\* | permet aux clients de créer et d'échanger des actifs, y compris AVAX, sur la X-Chain ainsi que sur d'autres instances de l'AVM. |
| \*\*\*\*[**API Admin**](admin-api.md)\*\*\*\* | permet aux clients d'examiner l'état interne d'un nœud, l'ensemble de connexions et les données de protocole interne similaires. |
| \*\*\*\*[**API Auth**](auth-api.md)\*\*\*\* | permet aux clients de gérer la création et la révocation des jetons d'autorisation. |
| \*\*\*\*[**API Health**](health-api.md)\*\*\*\* | permet aux clients de vérifier l'état d'un nœud |
| \*\*\*\*[**API Info**](info-api.md)\*\*\*\* | permet aux clients d'examiner les informations de base sur un nœud. |
| \*\*\*\*[**API IPC**](ipc-api.md)\*\*\*\* | permet aux utilisateurs de créer des sockets de domaine UNIX sur lesquels les blockchains peuvent publier |
| \*\*\*\*[**API Keystore**](keystore-api.md)\*\*\*\* | permet aux clients d'utiliser le fichier Keystore intégré d'un nœud Avalanche. |
| [**API Metrics**](metrics-api.md)\*\*\*\* | permet aux clients de collecter les métriques de Prometheus sur un nœud. |


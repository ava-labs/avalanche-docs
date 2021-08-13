# Primitives Cryptographiques

[Avalanche](../../#avalanche) utilise une variété de primitifs cryptographiques pour ses différentes fonctions. Ce fichier résume le type et le type de cryptographie utilisé sur les couches réseau et blockchain.

## Cryptographie dans la couche réseau

Avalanche utilise la Sécurité des couches de transport, TLS, pour protéger les communications noeud à noeud des ondes. TLS combine la praticité de la cryptographie clé publique avec l'efficacité de la cryptographie clé symétrique. Cela a conduit à la création de TLS la norme de la communication Internet. Alors que la plupart des protocoles de consensus classiques utilisent la cryptographie clé publique pour prouver la réception de messages à des tiers, la nouvelle famille de consensus Snow\* n'exige pas de telles preuves. Cela permet à Avalanche d'utiliser les SDL pour authentifier les jalons et élimine la nécessité d'une cryptographie coûteuse clé publique pour la signature des messages réseau.

### Certificats TLS

Avalanche ne repose sur aucune tierce partie centralisée, et en particulier, elle n'utilise pas les certificats délivrés par des authentificateurs tiers. Tous les certificats utilisés dans la couche réseau pour identifier les paramètres sont autosignés, créant ainsi une couche d'identité autonome. Aucune tierce partie n'est impliquée.

### Adresses TLS

Afin d'éviter d'afficher le certificat TLS complet dans la chaîne de la Plateforme, le certificat est d'abord cassé. Pour la cohérence, Avalanche utilise le même mécanisme de hachage pour les certificats TLS qu'il est utilisé dans Bitcoin. À savoir, la représentation DER du certificat est hachée avec sha256, et le résultat est ensuite haché avec ripemd160 pour fournir un identifiant 20 octets pour les stakers.

Cet identifiant 20 octets est représenté par "NodeID-" suivi de la chaîne encodée [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) des données.

## Cryptographie dans la machine virtuelle Avalanche

La machine virtuelle Avalanche utilise la cryptographie de courbe elliptique, spécifiquement `secp256k1`, pour ses signatures sur la chaîne de bloc.

Cet identifiant 32 octets est représenté par "PrivateKey-" suivi de la chaîne encodée [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) des données.

### Adresses Secp256k1

Avalanche n'est pas prescriptive sur les systèmes d'adressage, en choisissant de laisser plutôt l'adresse jusqu'à chaque blockchain.

Le schéma d'adressage de la chaîne Xet de la chaîne X-Chain sur secp256k1. Avalanche suit une approche similaire que Bitcoin et hashs la clé publique ECDSA. La représentation compressée de la clé publique de 33 octets est écrasée avec sha256 **une fois**. Le résultat est ensuite haché avec ripemd160 pour donner une adresse 20-octets.

Avalanche utilise l'adresse `chainID-address` de convention pour spécifier quelle chaîne une adresse existe sur. `chainID` peut être remplacé par un alias de la chaîne. Lors de la transmission de l'information par des applications externes, la convention CB58 est requise.

### Bech32

Les adresses sur la chaîne Xet la chaîne P, utilisent la norme [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) décrite dans [BIP 0173](https://en.bitcoin.it/wiki/BIP_0173). Il y a quatre parties à un schéma d'adresses Bech32. Par ordre d'apparence:

* Une partie lisible par l'homme \(HRP\). Sur le réseau principal, voici `avax`.
* Le numéro `1`, qui sépare le HRP de l'adresse et du code de correction d'erreur.
* Une chaîne encodée base-32 représentant l'adresse 20 octets.
* Un code de correction d'erreur encodé base-32

En outre, une adresse Avalanche est préfixée avec les alias de la chaîne qu'elle existe, suivie d'un tirage. Par exemple, les adresses X-Chain sont préfixées avec `X-`.

L'expression régulière suivante correspond aux adresses sur la chaîne X, P-Chain et C-Chain pour le réseau, fuji et localnet. Notez que toutes les adresses Avalanches valides correspondent à cette expression régulière, mais certaines chaînes qui ne sont pas des adresses Avalanches valides peuvent correspondre à cette expression régulière.

```text
^([XPC]|[a-km-zA-HJ-NP-Z1-9]{36,72})-[a-zA-Z]{1,83}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$
```

Lire la suite de Avalanche système [d'adressage](https://support.avalabs.org/en/articles/4596397-what-is-an-address).

### Secp256k1 Signatures récupérables

Les signatures récupérables sont stockées sous le nom de 65-octet **`[R || S || V]`** où **`V`** est 0 ou 1 pour permettre la récupération rapide de la clé publique. **`S`** doit être dans la moitié inférieure de la plage possible pour empêcher la malleability. de la signature. Avant de signer un message, le message est haché en utilisant sha256.

### Secp256k1 Exemple

Supposons que Rick et Morty mettent en place un canal de communication sécurisé. Morty crée une nouvelle paire de clés public-privé.

Clé privée: `0x98cb077f972feb0481f1d894f272c6a1e3c15e272a1658ff71644f4655200070`

Clé publique \(33-bytes compressé\): `0x02b33c917f2f6103448d7feb42614037d05928433cb25e78f01a825aa829bb3c27`

En raison de la sagesse infinie de Rick, il ne se confie pas à la porte de la clé publique de Morty, il ne demande donc que l'adresse de Morty. Morty suit les instructions, SHA256 sa clé publique, puis ripemd160 qui donnent lieu à une adresse.

SHA256\(Clé publique\): `0x28d7670d71667e93ff586f664937f52828e6290068fa2a37782045bffa7b0d2f`

Adresse: `0xe8777f38c88ca153a6fdc25942176d2bf5491b89`

Morty est assez confus parce qu'une clé publique devrait être sécuritaire pour être la connaissance publique. Rick belches et explique que l'écrasement de la clé publique protège le propriétaire de la clé privée des éventuels défauts de sécurité futurs dans la cryptographie de courbe elliptique. Dans le cas où la cryptographie est cassée et qu'une clé privée peut être dérivée d'une clé publique, les utilisateurs peuvent transférer leurs fonds à une adresse qui n'a jamais signé une transaction avant, empêchant leurs fonds d'être compromis par un attaquant Cela permet aux propriétaires de pièces d'être protégés pendant que la cryptographie est améliorée sur les clients.

Plus tard, une fois Morty a appris plus sur l'histoire de Rick, Morty tente d'envoyer un message à Rick. Morty sait que Rick ne lira le message que s'il peut vérifier qu'il était de lui, il signe donc le message avec sa clé privée.

Message: `0x68656c702049276d207472617070656420696e206120636f6d7075746572`

Message hachage: `0x912800c29d554fb9cdce579c0abba991165bbc8bfec9622481d01e0b3e4b7da`

Signature du message: `0xb52aa0535c5c48268d843bd65395623d2462016325a86f09420c81f142578e121bd368b88ca6de4179a007e6abe0e8d0be1a6a4485def8f9e02957d3d72da01`

Morty n'a jamais été revue.

## Messages signés

Une norme pour les messages génériques signés interopérables basés sur le format Bitcoin Script et le format Ethereum .

```text
sign(sha256(length(prefix) + prefix + length(message) + message))
```

Le préfixe est simplement la chaîne `\x1AAvalanche Message Signed` où `0x1A` est la longueur du texte préfixe et la `length(message)` est un [entier](serialization-primitives.md#integer) de la taille du message.

### Spécifications préalables à l'image Gantt

```text
+---------------+-----------+------------------------------+
| prefix        : [26]byte  |                     26 bytes |
+---------------+-----------+------------------------------+
| messageLength : int       |                      4 bytes |
+---------------+-----------+------------------------------+
| message       : []byte    |          size(message) bytes |
+---------------+-----------+------------------------------+
                            |       26 + 4 + size(message) |
                            +------------------------------+
```

### Exemple

À titre d'exemple, nous signerons le message "Par consensus aux étoiles"

```text
// prefix size: 26 bytes
0x1a
// prefix: Avalanche Signed Message:\n
0x41 0x76 0x61 0x6c 0x61 0x6e 0x63 0x68 0x65 0x20 0x53 0x69 0x67 0x6e 0x65 0x64 0x20 0x4d 0x65 0x73 0x73 0x61 0x67 0x65 0x3a 0x0a
// msg size: 30 bytes
0x00 0x00 0x00 0x1e
// msg: Through consensus to the stars
54 68 72 6f 75 67 68 20 63 6f 6e 73 65 6e 73 75 73 20 74 6f 20 74 68 65 20 73 74 61 72 73
```

Après avoir haché avec `sha256` et signé la pré-image, nous retournons la valeur [cb58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) encodée: `4Eb2zAHF4JjZFJmp4usSokTGqq9mEGwVMY2WZCmu657SNFZhndsiS8TvL32n3bexd8emUwiXs8XqKjqzvoRFghnvSN`. Voici un exemple en utilisant le [Portefeuille Web Avalanche](https://wallet.avax.network/wallet/advanced).

![Message de signe](../../.gitbook/assets/sign-message.png)

## Cryptographie dans la machine virtuelle Ethereum

Les noeuds avalanche prennent en charge la machine virtuelle Ethereum complète \(EVM\) et dupliquent précisément toutes les constructions cryptographiques utilisées dans Ethereum. Cela inclut la fonction de hachage Keck, et les autres mécanismes utilisés pour la sécurité cryptographique dans l'EVM.

## Cryptographie dans d'autres machines virtuelles

Étant donné qu'Avalanche est une plate-forme extensible, nous nous attendons à ce que les gens ajoutent des primitifs cryptographiques supplémentaires au système au fil du temps.


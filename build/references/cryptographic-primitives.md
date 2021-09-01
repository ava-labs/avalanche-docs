# Primitifs cryptographiques

[Avalanche](../../#avalanche) utilise une variété de primitifs cryptographiques pour ses différentes fonctions. Ce fichier résume le type et le type de cryptographie utilisés sur les couches du réseau et blockchain.

## Cryptographie dans la couche de réseau

Avalanche utilise la sécurité des couches de transport, TLS, pour protéger les communications de nœuds vers nœuds contre les eavesdroppers. TLS combine la practicality de la cryptographie à clé publique avec l'efficacité de la cryptographie à clé symétrique. Cela a conduit à la création de TLS à devenir la norme pour la communication sur Internet. Alors que la plupart des protocoles de consensus classiques utilisent une cryptographie à clé publique pour prouver la réception de messages à des tiers, la nouvelle famille de consensus Snow\* ne nécessite pas de telles preuves. Cela permet à Avalanche d'utiliser les TLS pour authentifier les stakers et élimine le besoin d'une cryptographie coûteuse à clé publique pour signer des messages sur le réseau.

### Certificats TLS

Avalanche ne s'appuie sur aucune tierce partie centralisée, et en particulier, elle n'utilise pas de certificats délivrés par des authentificateurs tiers. Tous les certificats utilisés dans la couche réseau pour identifier les endpoints sont auto-signés, créant ainsi une couche d'identité self-sovereign Aucun tiers n'est en cause.

### Adresses TLS

Pour éviter d'afficher le certificat TLS complet sur la chaîne de la Plateforme, le certificat est d'abord haché. Pour la cohérence, Avalanche utilise le même mécanisme de hachage pour les certificats TLS que celui utilisé dans Bitcoin. À savoir la représentation DER du certificat, est cochée avec sha256, et le résultat est ensuite coché avec ripemd160 pour produire un identifiant de 20 octes pour les stakers.

Cet identifiant de 20 octes est représenté par "NodeID-" suivi de la chaîne codée [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) des données.

## Cryptographie dans la machine virtuelle d'Avalanche

La machine virtuelle Avalanche utilise la cryptographie de la courbe elliptique, en particulier `secp256k1`, pour ses signatures sur la blockchain.

Cet identifiant de 32 octes est représenté par "PrivateKey-" suivi de la chaîne codée [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) des données.

### Adresses Secp256k1

Avalanche n'est pas prescriptive sur les programmes, en choisissant de laisser plutôt l'adresse à chaque blockchain.

Le schéma d'adressage de la X-Chain et de la P-Chain repose sur secp256k1. Avalanche suit une approche similaire à Bitcoin et hasher la clé publique a La représentation comprimé de 33 octies de la clé publique est cochée avec sha256 une ****fois. Le résultat est ensuite haché avec ripemd160 pour donner une adresse de 20 octets.

Avalanche utilise la convention `chainID-address`pour spécifier la chaîne sur laquelle une adresse existe . `chainID`peut être remplacée par une alias de la chaîne. Lors de la transmission d'informations par l'intermédiaire d'applications externes, la convention CB58 est requise.

### Bech32

Les adresses sur la X-Chain et la P-Chain utilisent la norme [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) décrite dans [BIP 0173](https://en.bitcoin.it/wiki/BIP_0173). Il y a quatre parties à un schéma d'adresses Bech32. Par ordre d'apparence :

* Une partie lisible par l'homme \(HRP\). Sur mainnet ceci est `avax`.
* Le numéro `1`, qui sépare le HRP du code de correction d'adresse et d'erreur.
* Une chaîne encodée de base-32 représentant l'adresse des 20 octets.
* Un code de correction d'erreur de base de 6 caractères-32 encodé.

En outre, une adresse Avalanche est préfixée avec les alias de la chaîne sur laquelle elle existe et suivie d'un dash. Par exemple, les adresses X-Chain sont préfixées avec `X-`.

L'expression régulière suivante correspond aux adresses sur la X-Chain, la P-Chain et la C-Chain pour les réseaux de mainet, fuji et localnet. Notez que toutes les adresses Avalanche valides correspondent à cette expression régulière, mais certaines chaînes qui ne sont pas des adresses Avalanche valides peuvent correspondre à cette expression régulière.

```text
^([XPC]|[a-km-zA-HJ-NP-Z1-9]{36,72})-[a-zA-Z]{1,83}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$
```

En savoir plus sur le [schéma](https://support.avalabs.org/en/articles/4596397-what-is-an-address) d'adressage d'Avalanche.

### Secp256k1

Les signatures récupérables sont stockées comme le 65 octets **`[R || S || V]`**où **`V`**est 0 ou 1 pour permettre une récupération rapide des clés publiques. Il **`S`**doit être dans la moitié inférieure de la gamme possible pour empêcher la recoverability. des signes. Avant de signer un message, le message est en haché en utilisant sha256.

### Exemple

Supposons que Rick et Morty mettent en place un canal de communication sécurisé. Morty crée une nouvelle paire de clés public-privé.

Clé privée :`0x98cb077f972feb0481f1d894f272c6a1e3c15e272a1658ff716444f465200070`

Clé publique \(33 octies compressées\) :`0x02b33c917f2f6103448d7feb42614037d05928433cb25e78f01a825aa829bb3c27`

En raison de la sagesse infinie de Rick, il ne se confie pas à lui en portant la clé publique de Morty, il ne demande donc que l'adresse de Morty. Morty suit les instructions, sa clé publique de SHA256, et puis celle de ripemd160 qui donnent lieu à la production d'une adresse.

SHA256\(Clé publique\) :`0x28d7670d71667e93ff586f664937f52828e6290068fa2a37782045bffa7b0d2f`

Adresse`0xe8777f38c88ca153a6fdc25942176d2bf5491b89`

Morty est assez confus parce qu'une clé publique devrait être sûre pour être la connaissance publique. Rick belches et explique que hasher la clé publique protège le propriétaire de la clé privée des défauts de sécurité potentiels de futures défauts de sécurité dans la cryptographie des courbes elliptiques. Dans le cas où la cryptographie est brisée et qu'une clé privée peut être dérivée d'une clé publique, les utilisateurs peuvent transférer leurs fonds vers une adresse qui n'a jamais signé event auparavant, empêchant leurs fonds de ne pas être compromis par un attaquant Cela permet aux propriétaires de pièces d'être protégés tandis que la cryptographie est mise à jour sur l'ensemble des clients.

Plus tard, une fois que Morty en a appris plus sur la backstory de Rick, Morty tente d'envoyer un message à Rick. Morty sait que Rick ne lira le message que s'il peut vérifier qu'il a été de lui, de sorte qu'il signe le message avec sa clé privée.

Message:`0x68656c702049276d207472617070656420696e206120636f6d7075746572`

Message Hash:`0x912800c29d554fb9cdce579c0abba991165bbbc8bfec9622481d01e0b3e4b7da`

Signalisation du message :`0xb52aa0535c5c48268d843bd65395623d2462016325a86f09420c81f142578e121d11bd368b88ca6de4179a007e6abe0e8d0be1a6a4485def8f9e02957d3d72da01`

Morty n'a jamais été revu .

## Messages Signés

Une norme pour les messages génériques signés interopérables basés sur le format Script Bitcoin et le format Ethereum.

```text
sign(sha256(length(prefix) + prefix + length(message) + message))
```

Le préfixe est simplement la chaîne `\x1AAvalanche Signed Message:\n`, où `0x1A`est la longueur du texte du préfixe et `length(message)`est un [entier de](serialization-primitives.md#integer) la taille du message.

### Spécification préalable à l'image de Gantt

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

Par exemple, nous signerons le message "Par consensus aux étoiles"

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

Après avoir haché et signé `sha256`la pré-image, nous renvoyons la valeur c[b58 ](https://support.avalabs.org/en/articles/4587395-what-is-cb58)encodé : .`4Eb2zAHF4JjZFJmp4usSokTGqq9mEGwVMY2WZzzCmu657SNFZhndsiS8TvL32n3bexd8emUwiXs8XqKjhqzvoRFvghnvSN` Voici un exemple en utilisant le [portefeuille Web](https://wallet.avax.network/wallet/advanced) d'Avalanche.

![Signer le message](../../.gitbook/assets/sign-message.png)

## Cryptographie dans la machine virtuelle Ethereum

Les nœuds d'Avalanche prennent en charge la machine virtuelle Ethereum complète \(EVM\) et dupliquent précisément toutes les constructions cryptographiques utilisées dans Ethereum. Cela inclut la fonction de hachage Keccak et les autres mécanismes utilisés pour la sécurité cryptographique dans l'EVM.

## Cryptographie dans d'autres machines virtuelles

Comme Avalanche est une plateforme extensible, nous nous attendons à ce que les personnes ajoutent des primitifs cryptographiques supplémentaires au système au fil du temps.


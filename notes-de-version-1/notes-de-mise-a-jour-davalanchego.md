# Notes de mise à jour d'AvalancheGo

## Notes de mise à jour AvalancheGo v1.0.4 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)\)

![](../.gitbook/assets/image%20%2817%29.png)

Cette mise à jour est facultative mais encouragée. Le correctif comprend des améliorations de la qualité de vie et diverses améliorations des performances. Notez que cette mise à jour nécessite que les paramètres CLI soient spécifiés avec - plutôt que d'autoriser soit `-` soit `--`. Par exemple, `-public-ip=127.0.0.1` n'est plus autorisé et doit être spécifié comme `--public-ip=127.0.0.1`. Sinon, cette mise à jour est rétrocompatible.

```aspnet
• Ajout de la liste blanche de sous-réseau pour permettre au propriétaire d'un nœud de choisir les sous-réseaux à valider.
• Ajout de l'analyse du fichier de configuration pour les paramètres de nœud.
• Ajout de plus d'options pour spécifier l'adresse IP d'un nœud et ajout de getNodeIP à l'info *endpoint.
• Ajout d'un TxID au résultat de get.Validators dans platformvm.
• Version Coreth mise à jour.
• Nettoyage de l'implémentation du test snowball et ajout de tests supplémentaires pour s'aligner sur les tests de mutation.
• Implémentation et optimisation des moyennes de temps en continu pour le suivi de la latence du processeur et du réseau.
• Allocations de mémoire considérablement optimisées à divers endroits.
• Augmentation de la taille du cache de vérification de signature.
• Lectures de base de données réduites lors de la gestion des sommets.
```

```cpp
• Ajout d'un argument facultatif includeReason à platform.getTxStatus.
If not provided, or if false, the output from getTxStatus is the same as before.

For example:
{
    "jsonrpc": "2.0",
    "result": "Dropped",
    "id": 1
}

If includeReason is true, the output from getTxStatus has a new format. It's an object that looks like this:

{
    "jsonrpc": "2.0",
    "result": {
        "status":"[Status]",
        "reason":"[Reason tx was dropped, if applicable]"
    },
    "id": 1
}

In this new format, reason will not be present unless the status is Dropped.
Anything that depends on platform.getTxStatus should switch to using the includeReason argument and use the new response format. After a few releases, we'll only support the new response format.
```

Pour obtenir de l'aide avec cette mise à jour, suivez notre [FAQ pour les développeurs](https://support.avalabs.org/en/collections/2618154-developer-faq). Si vous rencontrez toujours des problèmes, vous pouvez rejoindre notre [Telegram](https://t.me/Avalanche_fr) pour obtenir de l'aide.


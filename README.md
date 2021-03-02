---
description: >-
**Avalancheでの構築に制限は存在しません。開発者は、強力かつ高い信頼性と安全性を持つアプリケーションを簡単に作成することができます。**
---


# [](https://github.com/ava-labs/avalanche-docs/blob/master/README.md#developer-documentation)開発者向けドキュメント

  

## [](https://github.com/ava-labs/avalanche-docs/blob/master/README.md#getting-started)入門


{% tabs %} {% tab title="Ethereumからの導入" %} {% page-ref page="build/tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

  

{% page-ref page="build/tutorials/smart-contracts/using-truffle-with-the-avalanche-c-chain.md" %} {% endtab %}

  

{% tab title="Avalancheウォレット" %} {% page-ref page="build/tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md" %}

  

{% page-ref page="build/tutorials/platform/transfer-avax-between-x-chain-and-p-chain.md" %}

  

{% page-ref page="build/tutorials/platform/transfer-avax-between-x-chain-and-c-chain.md" %} {% endtab %}

  

{% tab title="Staking" %} {% page-ref page="build/getting-started.md" %}

  

{% page-ref page="build/tutorials/nodes-and-staking/" %} {% endtab %}

  

{% tab title="Advanced" %} {% page-ref page="build/tutorials/platform/create-a-subnet.md" %}

  

{% page-ref page="build/tutorials/platform/create-a-new-blockchain.md" %}

  

{% page-ref page="build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

  

{% page-ref page="build/tutorials/smart-digital-assets/creating-a-variable-cap-asset.md" %}

  

{% page-ref page="build/tutorials/smart-digital-assets/creating-a-nft-part-1.md" %} {% endtab %} {% endtabs %}# Developer Documentation

  

Avalancheでは制限のない構築が可能です。Avalancheを使用することで開発者は、強力で信頼性が高く安全なアプリケーションを簡単に作成することができます。

  

# Avalanche

  

[Avalanche](https://avax.network/)は、相互運用可能で拡張性の高い単一のエコシステムで[分散型アプリケーション](https://support.avalabs.org/en/articles/4587146-what-is-a-decentralized-application-dapp)とエンタープライズ[ブロックチェーン](http://support.avalabs.org/en/articles/4064677-what-is-a-blockchain)デプロイメントを起動するためのオープンソースプラットフォームです。 Avalancheを使用することで、ネットワーク層とアプリケーション層の両方を制御することができ、あなたが想像できるあらゆるものを構築することが可能になります。

  

Avalancheと他の分散型ネットワークの主な相違点はコンセンサスプロトコルです。 一般的に、ブロックチェーンは時間の経過とともに低速になりかつスケーラブルではなくなるという誤った理解が広まっていました。 Avalancheプロトコルは、分散化を損なうことなく、強力な安全性の保証、迅速なファイナリティ、高スループットを実現するというコンセンサスへの新しいアプローチを採用しています。

  

# Avalanche (AVAX) トークン

  

Avalanche（AVAX）トークンは、Avalancheプラットフォームのネイティブトークンであり、ステークキングによるネットワークの安全性確保、ピアツーピア取引、料金の支払い、Avalancheプラットフォーム上に作成された複数のサブネットワーク間での基本的なアカウント単位として使用されます。1nAVAXは、0.00000000001AVAXに相当します。

  

# Avalanche コンセンサスプロトコル

  

![](https://lh4.googleusercontent.com/sPP4M2RkpY7_QAqT-XIXxIv18-_rbCP8WdfdvWHfGCZcdEsd3vCGd3i6rzRf1gWE2cI_h_OJsWMR7krXMI-58BYEVJ29M_IKS_T4Dc1Pgh8YHTwAk0s2fehphzjJEp2PQauoYhgq)

  

**コンセンサスの比較**

  

Avalancheファミリーのプロトコルは、サブサンプル投票を繰り返すことで動作します。[バリデーター](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator)が[トランザクション](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction)を受け入れるか拒否するかを決定するとき、バリデーターの中から少数のランダムなサブセットに、トランザクションを受け入れるべきか拒否すべきかを尋ねます。クエリされたバリデーターが、トランザクションが無効であると考える場合、既にそのトランザクションを拒否している場合、 矛盾するトランザクションが存在する場合には、そのトランザクションを拒否すべきであると回答され考えます。そうでない場合は、そのトランザクションは受け入れられるべきであると回答されます。

  

サンプリングされたバリデーターの大部分(αααα)がトランザクションを受け入れるべきだと回答する場合、バリデーターはそのトランザクションを受け入れます。同様に、バリデーターのうちの大部分がトランザクションを拒否すべきであると回答した場合、バリデーターはトランザクションを拒否します。

  

バリデーターはこのサンプリングプロセスを、問い合わせ先となったバリデーターのうち、αがβββのラウンドを連続して繰り返すことで同じように回答する(受け入れるか否か)まで繰り返します。

  

トランザクションに矛盾がない場合には、ファイナリティが迅速に行われます。矛盾が生じている場合には、誠実なバリデーターが当該トランザクションに対して、全てのバリデーターがそのトランザクションを合意するようになるまで正のフィードバックループに入ります。これにより矛盾しないトランザクションが受け入れられ、矛盾するトランザクションが拒否されます。

  

![](https://lh5.googleusercontent.com/-eteYpE8nH7a1qyTM71zTLUbKk9ckIGpPBqFKj2saLJcJfYf4akGaQhGaA_xB1DRUsWOwI4r8EHW-khjjU1kF9Vdy0DtVgaxnAHbiqSJNbG_WeMJZZa5i-dZ4eER7iqaz1nnecnP)

  

**Avalancheのコンセンサスの仕組み**

正当なバリデーターがトランザクションを承認または拒否する場合、全ての正当なバリデーターがそのトランザクションを承認または拒否することが（システムパラメーターに基づいて高確率で）保証されています。

  

Avalancheコンセンサスプロトコルの技術的な構成要素については[ホワイトペーパー](https://arxiv.org/pdf/1906.08936.pdf) を参照してください。

  

# Snowman コンセンサスプロトコル

  

Snowmanは、チェーンに最適化されたコンセンサスプロトコルであり、ハイスループット、完全な順序付けがなされており、スマートコントラクトに最適なものとなっています。Snowmanは、[Avalancheコンセンサスプロトコル](https://github.com/ava-labs/avalanche-docs/blob/master/#avalanche-consensus-protocol)を搭載しており、[P-Chain](https://github.com/ava-labs/avalanche-docs/blob/master/learn/platform-overview/#platform-chain-p-chain)と[C-Chain](https://github.com/ava-labs/avalanche-docs/blob/master/learn/platform-overview/#contract-chain-c-chain)の両方がSnowmanのコンセンサスプロトコルを実装しています。

  

# 主な特徴

  

## スピード

  

コーネル大学のコンピュータサイエンティストのチームにより開発された新しいコンセンサスプロトコルを使用することにより1 秒以内のトランザクション確認を恒久的に実行することができます。

  

## スケーラビリティ

  

既存ブロックチェーンより桁違いに優れた、1秒単位で4,500件のトランザクションが可能です。

  

## セキュリティ

  

他のネットワークの51%標準と比較し、より高いセキュリティを保証します。

  

## フレキシビリティ

  

任意のロジックを含むカスタムブロックチェーンや分散型アプリを簡単に作成できます。

  

## サステナビリティ

  

プルーフオブワークと比較して遥かにエネルギー効率の高いプルーフオブステークコンセンサスアルゴリズムを使用しています。

  

## スマートコントラクトサポート

  

Solidityでのスマートコントラクトの作成、Remix、Metamask、Truffleの利用などお馴染みのEthereumツールに対応しています。

  

## プライベート/パブリックブロックチェーン

  

独自のプライベートまたはパブリックブロックチェーンを作成することができます。

  

## 金融向けの設計

  

複雑なカスタムルールの条件設定が可能なデジタルスマートアセットの作成と取引プロセスの簡易化をネイティブサポートしています。
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk3MTY0ODExNiw4NTg1MzE3NzhdfQ==
-->
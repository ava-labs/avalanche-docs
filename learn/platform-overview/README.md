---
description: Avalancheのコアコンセプトとアーキテクチャを学ぶ
---

# プラットフォームの概要

Avalancheには、[**Exchange Chain \(X-Chain\)**](./#exchange-chain-x-chain)、[**Platform Chain \(P-Chain\)**](./#platform-chain-p-chain)、[**Contract Chain \(C-Chain\)**](./#contract-chain-c-chain)hain）の3つのブロックチェーンが組み込まれています。これら3つのブロックチェーンは、全て、Avalancheの[**Primary Network（一次ネットワーク）**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)により[検証](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator)され保護されています。一次ネットワークは、特別な[サブネット](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet)であり、全てのカスタムサブネットのメンバーは少なくとも2,000AVAXをステークして、一次ネットワークのメンバーになる必要があります。

ここでは、[サブネットの作成](../../build/tutorials/platform/create-a-subnet.md)と[バリデーターの追加](../../build/tutorials/nodes-and-staking/add-a-validator.md)についてのチュートリアルを紹介します。

![一次ネットワーク](../../.gitbook/assets/image%20%2821%29.png)

## サブネット

**サブネット**、すなわちサブネットワークとは、ブロックチェーンの状態に関するコンセンサスを得るためのバリデーターの動的セットです。各ブロックチェーンは1つのサブネットによって検証されます。サブネットは、多くのブロックチェーンを検証することができます。ノードは、多くのサブネットのメンバーになっている可能性があります。

サブネットは自身のメンバーシップを管理すると共に、構成するバリデーターに特定のプロパティの保持を要求することができます。これは非常に便利な機能であり、以下にその意味を詳しく説明します：

### コンプライアンス

Avalancheのサブネットアーキテクチャは、規制コンプライアンスを管理可能にします。前述のように、サブネットは一連の要件を満たすためにバリデーターを必要とする場合があります。

例として以下のようなものがあります：

* バリデーターは指定の国に設置されている必要があります
* バリデーターはKYC/AMLチェックに合格する必要があります
* バリデーターは一定のライセンスを持っている必要があります

### プライベートブロックチェーンのサポート

定義済の特定のバリデーターのみが参加できるサブネットを作成し、ブロックチェーンの内容がバリデーターのみに公開されるプライベートサブネットを作成することができます。これは、情報の非公開を考える組織に最適です。

### 関心項目の分離

ブロックチェーンの異なるネットワークにおいて、バリデーターの中には特定のブロックチェーンのバリデーションを望まない場合も想定できますあります。サブネットモデルを使用すると、バリデーターは、関心を持つブロックチェーンのみに関わることができます。このことは、バリデーターにかかる負担を軽減します。

### アプリケーション固有の要件

ブロックチェーンベースのアプリケーションでは、バリデーターに特定の特性を持たせる必要がある場合があります。大量のRAMやCPUのパワーを必要とするアプリケーションがあるとします。サブネットは、バリデーターが特定の[ハードウェア要件](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche)を満たすことを要求することがあります。そのため、アプリケーションは、バリデーターが遅いためにパフォーマンスが低くなるという問題を起こさずにすみます。

## 仮想マシン

**仮想マシン**\(VM\)は、ブロックチェーンのアプリケーションレベルのロジックを定義します。技術的な用語では、ブロックチェーンの状態、状態遷移機能、トランザクション、対話APIを指定します。Avalanche上の全てのブロックチェーンはVMのインスタンスです。

VMで記述する場合は、ネットワーキング、コンセンサス、ブロックチェーンの構造などの低レベルのロジックを気にする必要はありません。Avalancheはこれを裏で実行するため、構築に集中することができます。

同じVMを使用して複数のブロックチェーンを作成することができ、各ブロックチェーンは同じルールセットに従いますが、他のブロックチェーンからは論理的には独立するものとなります。

### なぜ仮想マシンなのか？

当初、ブロックチェーンネットワークには、あらかじめ定義された静的な機能セットを持つ1つの仮想マシン（VM）がありました。このモノリシックデザインは、ネットワーク上で実行できるブロックチェーンベースのアプリケーションを制限していました。

カスタム自律分散型アプリケーションを望む人々は、独自の全く新しいブロックチェーンネットワークを作成する必要がありました。そうするには、多くの時間と労力が必要で、安全性は限定され、一般的には、カスタムメードで、脆弱な、決して離陸できないブロックチェーンとなっていました。

Ethereumは、スマートコントラクトでこの問題を解決する一歩を踏み出しました。開発者は、ネットワークやコンセンサスについては心配しなくてよくなりましたが、それでも自律分散型アプリケーションの作成は困難でした。Ethereum VMはパフォーマンスが低く、スマートコントラクトの開発者に制限を課しています。Solidityや、Ethereumスマートコントラクトを書くためのその他の言語は、ほとんどのプログラマーには馴染みがありません。

Avalanche VM（AVM）は、ブロックチェーンベースの分散型アプリケーションを簡単に定義できるようにします。開発者はSolidityのような限定された言語ではなく、GoでVMを書くことができます（将来的には他の言語もサポート予定です）。

### ブロックチェーンと仮想マシンの作成

Avalancheは、Avalanche VMの新しいインスタンスの作成をサポートします。

{% page-ref page="../../build/tutorials/platform/create-avm-blockchain.md" %}

Avalancheは、仮想マシンでカスタムブロックチェーンの作成もサポートしています。

{% page-ref page="../../build/tutorials/platform/create-a-virtual-machine-vm.md" %}

{% page-ref page="../../build/tutorials/platform/create-custom-blockchain.md" %}

## Exchange Chain \(X-Chain\)

**X-Chain**は、デジタルスマート資産を作成し取引するための分散型プラットフォームとして機能します。これは実世界の資源（株式や債券など）の表現であり、例えば「明日まで取引できない」とか「米国市民にしか送れない」というように、その行動を支配する一連の規則が設定可能となっています。

X-Chainで取引される資産の一つがAVAXです。Avalanche上のブロックチェーンにトランザクションを発行した場合にAVAXによる手数料を支払います。

X-ChainはAvalanche Virtual Machine（AVM）のインスタンスです。[X-Chain API](../../build/avalanchego-apis/exchange-chain-x-chain-api.md)を使用することで、クライアントは、X-ChainやAVMの他のインスタンス上で資産を作成し、取引することができます。

{% page-ref page="../../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

## Platform Chain \(P-Chain\)

**P-Chain**は、Avalanche上のメタデータブロックチェーンであり、バリデーターを調整し、アクティブなサブネットを追跡し、新たなサブネットの作成を可能にします。P-Chainは、[Snowmanコンセンサスプロトコル](../../#snowman-consensus-protocol)を実装しています。

[P-Chain API](../../build/avalanchego-apis/platform-chain-p-chain-api.md)により、クライアントは、サブネットの作成、サブネットへのバリデーターの追加、ブロックチェーンの作成を行うことができます。

## Contract Chain \(C-Chain\)

** C-Chain**では、[C-Chain API](../../build/avalanchego-apis/contract-chain-c-chain-api.md)を使用してスマートコントラクトを作成することができます。

 C-Chainは、[Avalanche](../../)が提供するEthereum Virtual Machineのインスタンスです。


---
description: Avalancheのコアコンセプトとアーキテクチャを学ぶ

---

# プラットフォーム概要

Avalancheには3つのビルトインのブロックチェーンがあります: [**Exchange Chain \(X-Chain\)**](./#exchange-chain-x-chain)、[**Platform Chain \(P-Chain\)**](./#platform-chain-p-chain)、および[**Contract Chain \(C-Chain**\)](./#contract-chain-c-chain)。3つのブロックチェーンすべてが[**Primary Network**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)によって検証および保護[さ](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator)れています。Primary Networkは特別な[サブネット](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet)であり、すべてのカスタムサブネットのメンバーは、少なくとも2,000 AVAXを出力することにより、Primary Networkのメンバーである必要があります。

[サブネットの作成](../../build/tutorials/platform/create-a-subnet.md)と、サブネットに[バリデーターを追加](../../build/tutorials/nodes-and-staking/add-a-validator.md)するチュートリアルです。

![主要なネットワーク](../../.gitbook/assets/image%20%2821%29.png)

## サブネット

サブネット（**subnet**）またはサブネットワークは、一連のブロックチェーンの状態に関するコンセンサスを達成するために協力するバリデーターの動的セットです。各ブロックチェーンは、1つのサブネットで検証されます。サブネットは多くのブロックチェーンを検証できます。ノードは多くのサブネットのメンバーであるかもしれません。

サブネットは、独自のメンバーシップを管理し、その構成バリデータに特定のプロパティを持つことを要求するかもしれません。これは非常に便利です。そして、以下のより深い点でその影響を探ります。

### JP-JP-

Avalancheのサブネットアーキテクチャにより、規制コンプライアンスを管理しやすくなります。上記のように、サブネットは一連の要件を満たすためにバリデータが必要になるかもしれません。

いくつかの例は次のとおりです:

* バリデーターは、指定した国に存在する必要があります。
* Validators は KYC/AML チェックを渡す必要があります。
* バリデーターは特定のライセンスを保持する必要があります。

### Private Blockchainsのサポート

サブネットを作成すると、特定の事前定義済みバリデータだけが参加できるプライベートサブネットを作成できます。そこで、ブロックチェーンの内容がそれらのバリデータだけに表示されます。これは、彼らの情報を非公開にすることに興味のある組織に最適です。

### 懸念の分離

Blockchainsの異種ネットワークでは、一部のバリデータは、それらのブロックチェーンに興味がないため、特定のブロックチェーンを検証したくないでしょう。サブネットモデルは、バリデータが気にかけるブロックチェーンにのみ関心を示します。これにより、バリデーターの負担が軽減されます。

### アプリケーション固有の要件

異なるブロックチェーンベースのアプリケーションでは、特定のプロパティを持つバリデータが必要になる場合があります。RAMまたはCPUパワーを大量に必要とするアプリケーションがあるとします。Subnet では、バリデータが特定の[ハードウェア要件](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche)を満たすことを要求する可能性があります。

## Virtual Machines

**VM**\(VM\)は、ブロックチェーンのアプリケーションレベルのロジックを定義します。技術的には、ブロックチェーンの状態、ステートトランジション機能、トランザクション、およびユーザーがブロックチェーンと対話できるAPIを指定します。AvalancheのすべてのブロックチェーンはVMのインスタンスです。

VMを書くとき、ネットワークやコンセンサス、ブロックチェーンの構造など、低レベルのロジックに気を付ける必要はありません。Avalancheはこの舞台裏でこれをしますので、構築したいものに集中できます。

VMをブロックチェーンの青写真と考えてください。同じVMを使用して多くのブロックチェーンを作成できます。それぞれが同じルールセットに従いますが、他のブロックチェーンとは論理的に独立しています。

### なぜ仮想マシン？

最初は、ブロックチェーンネットワークには、1つの仮想マシン\(VM\)があり、静的機能が事前に定義されたセットでした。この堅牢なモノリシックなデザインでは、そのようなネットワーク上でどのようなブロックチェーンベースのアプリケーションが実行できるかが制限されています。

カスタム分散型アプリケーションを望んでいた人は、まったく新しいブロックチェーンネットワークをゼロから作成しなければなりませんでした。これには多くの時間と労力が必要でしたが、限られたセキュリティを提供し、一般的に、オーダーメイドで脆弱なブロックチェーンが生まれました。

Ethereumは、スマートコントラクトでこの問題を解決するための一歩を踏み出しました。開発者はネットワークやコンセンサスについて心配する必要はありませんでしたが、分散型アプリケーションを作成することはまだ難しいです。Ethereum VMはパフォーマンスが低く、スマートコントラクト開発者に制限を課しています。Solidityおよび他のいくつかの言語は、Ethereumのスマートコントラクトを書くほとんどのプログラマーにとって馴染みのないものです。

Avalanche VMs \(AVMs\)はブロックチェーンベースの分散型アプリケーションを簡単に定義できます。Solidityのような新しい限られた言語ではなく、VMをGo \(今後は他の言語がサポートされるようになります)に書くことができます。

### BlockchainとVirtual Machineの作成

Avalanche は、Avalanche VM の新しいインスタンスを作成することができます。

--/../build/tutorials/platform/create-avm-blockchain.md" %}

Avalancheはまた、仮想マシンでカスタムブロックチェーンを作成することもできます。

--/../build/tutorials/platform/create-a-virtual-machine-vm.md" %}

--/../build/tutorials/platform/create-custom-blockchain.md" %}

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

**X-Chain**は、デジタルスマートアセットを作成し、取引するための分散型プラットフォームとして機能し、実際のリソース（Excity、Bonds \）の表現であり、「明日まで取引することはできません」または「米国市民にのみ送信できます」などの行動を支配する一連のルールを持つ。

X-Chainで取引される1つの資産はAVAXです。Avalancheでブロックチェーンにトランザクションを発行する場合、AVAXで料金を支払います。

X-Chainは、Avalanche Virtual Machine \(AVM\)のインスタンスです。[X-Chain API](../../build/avalanchego-apis/exchange-chain-x-chain-api.md) を使用すると、クライアントは X-Chain および AVM の他のインスタンスでアセットを作成および取引できます。

--/../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

## PHP チェーン \(P-Chain\)

**P-Chain**はAvalanche上のメタデータブロックチェーンであり、バリデーターを調整し、アクティブなサブネットを追跡し、新しいサブネットの作成を可能にします。P-Chainは[Snowmanコンセンサスプロトコル](../../#snowman-consensus-protocol)を実装しています。

[P-Chain API](../../build/avalanchego-apis/platform-chain-p-chain-api.md) では、クライアントはサブネットを作成し、サブネットにバリデータを追加し、ブロックチェーンを作成することができます。

## Contract Chain\(C-Chain\)

**C-**Chainは[C-ChainのAPI](../../build/avalanchego-apis/contract-chain-c-chain-api.md)を使用してスマートコントラクトを作成できます。

C-Chainは、[Avalanche](../../)によって供給されたEthereum Virtual Machineのインスタンスです。


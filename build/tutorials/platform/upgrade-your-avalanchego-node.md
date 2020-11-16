# Upgrade Your AvalancheGo Node

The node is a binary program. You can either download the source code and then build the binary program, or you can download the pre-built binary. You can do either of the below. You don’t need to do both.

## **From source**

First clone our Github repo \(you can skip this step if you’ve done this before\):

```text
git clone https://github.com/ava-labs/avalanchego.git
```

Then move to the avalanchego directory:

```text
cd avalanchego
```

Pull the latest code:

```text
git pull
```

Check that your local code is up to date. Do:

```text
git rev-parse HEAD
```

and check that the first 7 characters printed match the Latest commit field on our [Github.](https://github.com/ava-labs/avalanchego)

Now build the binary:

```text
./scripts/build.sh
```

This should print:

```text
Build Successful
```

You can check what version you’re running by doing:

```text
./build/avalanchego --version
```

You can run your node with:

```text
./build/avalanchego
```

## **Download Binary**

Go to our [releases page](https://github.com/ava-labs/avalanchego/releases) and select the release you want \(probably the latest one.\) Under Assets, select the appropriate file.

**For MacOS:**  
Download the file named: avalanche-osx-&lt;VERSION&gt;.zip  
Unzip the file with: unzip avalanche-osx-&lt;VERSION&gt;.zip  
The resulting folder, avalanche-&lt;VERSION&gt;, contains the binaries.  
You can run the node with: ./avalanche-&lt;VERSION&gt;/avalanche

**For Linux x86:**  
Download the file named: avalanche-linux-&lt;VERSION&gt;.tar.gz  
Unzip the file with: tar -xvf avalanche-linux-&lt;VERSION&gt;.tar.gz  
The resulting folder, avalanche-&lt;VERSION&gt;, contains the binaries.  
You can run the node with: ./avalanche-&lt;VERSION&gt;/avalanche

{% hint style="warning" %}
The Linux binaries are compiled for AMD64 \(x86-64\) architectures. For ARM platforms, like the Raspberry Pi, please [build from source](https://avalanche.gitbook.io/avalanche/build/getting-started#start-a-node-and-connect-to-avalanche).
{% endhint %}


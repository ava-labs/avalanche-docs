# Cross-subnet Communication
Avalanche Warp Messaging (AWM) enables native cross-subnet communication for arbitrary message payloads. The communication consists of the following four steps:

![image showing four steps of cross-subnet communication: Signing, aggregation, Delivery and Verification](/img/cross-subnet-communication.png)

### 1.) Signing Messages on the Origin Subnet
AWM is a low-level messaging protocol. Any type of data can be encoded in an array of bytes and included in the message sent to another subnet. It is a general communication protocol on which solutions for bridging tokens and other use cases can be implemented.

AWM uses the [BLS signature scheme](https://crypto.stanford.edu/~dabo/pubs/papers/BLSmultisig.html), which allows message recipients to verify the authenticity of these messages. Therefore, every validator on the Avalanche network holds a BLS key pair, consisting of a private key for signing messages and a public key that others can use to verify the signature.

### 2.) Signature Aggregation on the Origin Subnet

If the validator set of a subnet is very large, this would result in many signatures. One of the powerful features of BLS is the ability to aggregate many signatures of different signers in a single multi-signature. Therefore, validators on one subnet can now individually sign a message to be sent to another subnet. These signatures of the message are then aggregated into a short multi-signature that can be quickly verified.

### 3.) Delivery of Messages to the Destination Subnet

Messages are delivered directly from the validators of one subnet to the validators of the other subnets. The messages do not pass through a central protocol or trusted entity, and there is no record of messages sent between subnets on the primary network. This avoids a bottleneck in subnet-to-subnet communication, and non-public subnets can communicate privately.

It is up to the subnets and their users to determine how they want to transport data from the validators of the origin subnet to the validators of the destination subnet and what guarantees they want to provide for the transport.

### 4.) Verification of Messages in the Destination Subnet
When a subnet wants to process another subnet's message, it will look up both BLS Public Keys and stake of the origin subnet. The authenticity of the message can be verified using these public keys and the signature. The weight that the BLS Multi-Signature must have to be considered valid can be set according to the individual requirements of each subnet-to-subnet communication. (i.e., Subnet A accepts messages from Subnet B that are signed by at least 70% of stake but messages from Subnet C are only accepted if they are signed by validators that account for 90% of the stake ).

Since all validators' public keys of the validators and their stake weights are recorded on the primary network's P-chain, they are readily accessible to any virtual machine run by the validators. Therefore, the subnets do not need to communicate with each other about changes in their respective sets of examiners, but can simply rely on the latest information on the P-Chain.


# Reference Implementation

We created a Proof-of-Concept VM he made called [XSVM](https://github.com/ava-labs/xsvm). This VM allows for simple AWM transfers between any two Subnets running it out-of-the-box.


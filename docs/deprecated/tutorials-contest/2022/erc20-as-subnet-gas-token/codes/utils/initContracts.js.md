# InitContracts.js

```javascript
const { ethers } = require("ethers");
/* Get ABIs of the contracts directly from the artifact folder created by hardhat after each compilation */
const SUBNET_BRIDGE_ABI =
	require("../artifacts/contracts/Bridge/SubnetBridge.sol/SubnetBridge").abi;
const AVAX_BRIDGE_ABI =
	require("../artifacts/contracts/Bridge/AvaxBridge.sol/AvaxBridge").abi;
/* Currently we did not deploy our contracts but when we deploy them we will store them in the following file */
const {
	AVAX_BRIDGE_ADDRESS,
	SUBNET_BRIDGE_ADDRESS,
} = require("../variables/contractAddresses");

module.exports = (signers) => {
	/* AvaxBridge contract with signer access of bridgeAdmin */
	const avaxBridgeAdmin = new ethers.Contract(
		AVAX_BRIDGE_ADDRESS,
		AVAX_BRIDGE_ABI,
		signers.avax.admin
	);
	/* AvaxBridge contract with signer access of user */
	const avaxBridgeUser = new ethers.Contract(
		AVAX_BRIDGE_ADDRESS,
		AVAX_BRIDGE_ABI,
		signers.avax.user
	);
	/* SubnetBridge contract with signer access of bridgeAdmin */
	const subnetBridgeAdmin = new ethers.Contract(
		SUBNET_BRIDGE_ADDRESS,
		SUBNET_BRIDGE_ABI,
		signers.subnet.admin
	);
	/* SubnetBridge contract with signer access of user */
	const subnetBridgeUser = new ethers.Contract(
		SUBNET_BRIDGE_ADDRESS,
		SUBNET_BRIDGE_ABI,
		signers.subnet.user
	);

	return {
		avax: { admin: avaxBridgeAdmin, user: avaxBridgeUser },
		subnet: { admin: subnetBridgeAdmin, user: subnetBridgeUser },
	};
};
```

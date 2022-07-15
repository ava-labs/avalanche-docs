const { ethers } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (providers) => {
	const avaxBridgeAdmin = new ethers.Wallet(
		process.env.BRIDGE_ADMIN_PRIVATE_KEY,
		providers.avax
	);
	const avaxBridgeUser = new ethers.Wallet(
		process.env.BRIDGE_USER_PRIVATE_KEY,
		providers.avax
	);
	const subnetBridgeAdmin = new ethers.Wallet(
		process.env.BRIDGE_ADMIN_PRIVATE_KEY,
		providers.subnet
	);
	const subnetBridgeUser = new ethers.Wallet(
		process.env.BRIDGE_USER_PRIVATE_KEY,
		providers.subnet
	);
	return {
		avax: { bridgeAdmin: avaxBridgeAdmin, user: avaxBridgeUser },
		subnet: { bridgeAdmin: subnetBridgeAdmin, user: subnetBridgeUser },
	};
};

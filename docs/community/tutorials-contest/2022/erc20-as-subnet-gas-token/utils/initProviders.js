const { ethers } = require("ethers");
const chains = require("../constants/chains");

module.exports = () => {
	const avaxProvider = new ethers.providers.JsonRpcProvider(chains.avax.rpcUrl);
	const subnetProvider = new ethers.providers.JsonRpcProvider(
		chains.subnet.rpcUrl
	);
	return { avax: avaxProvider, subnet: subnetProvider };
};

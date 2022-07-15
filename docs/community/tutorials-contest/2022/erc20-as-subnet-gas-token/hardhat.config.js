/* Import task from hardhat config */
const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");

/* Import burnOrLock function */
require("./scripts/burnOrLock");
/* Import balance function */
require("./scripts/balance");
/* Import deploy function */
require("./scripts/deploy");

/* Create burnOrRelease task  */
task("burnOrLock", "Burn or lock token from a network")
	/* Add `from` parameter indication the used network which is either avax or subnet */
	.addParam("from", "Network to burn or lock from")
	/* Add `amount` parameter indication the amount to burn or lock */
	.addParam("amount", "Amount to burn or lock")
	.setAction(async (taskArgs, hre) => {
		await burnOrLock(taskArgs.from, taskArgs.amount).catch((error) => {
			console.error(error);
			process.exitCode = 1;
		});
	});

/* Create balance task  */
task("balance", "Get token balance from a network")
	/* Add `from` parameter indication the used network which is either avax or subnet */
	.addParam("from", "Network to get balance from")
	.setAction(async (taskArgs, hre) => {
		await balance(taskArgs.from).catch((error) => {
			console.error(error);
			process.exitCode = 1;
		});
	});

/* Create deploy task */
task(
	"deploy",
	"Deploy bridges on both networks and deploy AvaxToken, also update the admins"
).setAction(async (taskArgs, hre) => {
	await deploy().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
});

module.exports = {
	solidity: "0.8.7",
	// networks: {
	// avax: {
	// 	url: "https://api.avax-test.network/ext/bc/C/rpc",
	// 	chainId: 43113,
	// 	accounts:
	// 		process.env.BRIDGE_ADMIN_PRIVATE_KEY !== undefined
	// 			? [process.env.BRIDGE_ADMIN_PRIVATE_KEY]
	// 			: [],
	// },
	// subnet: {
	// 	url: "http://127.0.0.1:31874/ext/bc/2qA55SY4gNTvmemg74YJQBUBae887m47mNkfMPAAoJnb26m97q/rpc",
	// 	chainId: 707070,
	// 	accounts:
	// 		process.env.BRIDGE_ADMIN_PRIVATE_KEY !== undefined
	// 			? [process.env.BRIDGE_ADMIN_PRIVATE_KEY]
	// 			: [],
	// },
	// },
};

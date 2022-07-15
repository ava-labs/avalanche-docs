const { ethers } = require("ethers");
const dotenv = require("dotenv");

/* Get needed util functions */
const initProviders = require("./utils/initProviders");
const initSigners = require("./utils/initSigners");
const initContracts = require("./utils/initContracts");

dotenv.config();

/* Relayer application

Could be run by 
	`node ./relayer.js`, 
	`node ./relayer.js <avaxBlockNumber>`, 
	`node ./relayer.js <avaxBlockNumber> <subnetBlockNumber>`,
	`node ./relayer.js -1 <subnetBlockNumber>`

When run with `node ./relayer.js`:
	Relayer will subscribe to events from recent blocks on Avax and Subnet
	Therefore, it might not processes an event that is emitted 1000 blocks ago
	If you want to start the relayer and make a transaction, current way of running is what you are looking for

When run with `node ./relayer.js <avaxBlockNumber> <subnetBlockNumber>`
	Relayer will look for events on Avax and Subnet from the block number you provided 
	and will iterate through the next 10 blocks for event. Will processes observed event
	Therefore, if you have a burn or lock event emitted 1000 blocks ago, you can process it by giving the right blockNumber
	If you want to start the relayer to processes an old burn or lock event, current way of running is what you are looking for

When run with `node ./relayer.js -1 <subnetBlockNumber>` or `node ./relayer.js <avaxBlockNumber>`
	Relayer will look for events on either Avax or Subnet from the block number you provided
	and will iterate through the next 10 blocks for event. Will processes observed event
	"-1" as block number means do not processes any old blocks for that chain.
	Therefore, `node ./relayer.js -1 <subnetBlockNumber>` will only process events for subnet.
	If tou want to start the relayer to process an old burn or lock event just on one chain, current way of running is what you are looking for
*/
const main = async () => {
	/* If there is a need for sending transactions
		Add it to the txs array.
		Because of the `setInterval()` relayer will send transactions every 5 seconds if at least 1 transaction exists
		We wait 5 seconds inbetween transactions to make sure we do not replace our own transactions before they are mined.
	*/
	let txs = [];

	/* Init providers, signer and bridgeContract */
	const providers = initProviders();
	const signers = initSigners(providers);
	const bridgeContracts = initContracts(signers);

	/* For Avax
		Relayer gets command line arguments
		If commandline argument exists and it is not -1 
		Then process next 10 blocks and process events from these block number
	*/
	if (process.argv[2] && parseInt(process.argv[2]) !== -1) {
		const startBlock = parseInt(process.argv[2]);
		const recentBlock = await providers.avax.getBlockNumber();
		/* If startBlock + 10 exceeds the recent block it would throw an error.
			Since we would be trying to process blocks that are not there.
		 	Therefore, we set endBlock to the smaller one of two
		*/
		const endBlock =
			startBlock + 10 >= recentBlock ? recentBlock : startBlock + 10;
		/* Reset blockNumber of the provider to process those blocks */
		providers.avax.resetEventsBlock(startBlock);
		/* Create new bridge contract instance because provider is changed */
		const localBridgeContracts = initContracts(signers);
		/* Filter events for "Transfer" event */
		const filter = localBridgeContracts.avax.admin.filters.Transfer();
		/* Query contract for old events in between startBlock and endBlock with given filter */
		let oldAvaxEvents = await localBridgeContracts.avax.admin.queryFilter(
			filter,
			startBlock,
			endBlock
		);
		/* Format oldEvents as if they are transactions */
		oldAvaxEvents = oldAvaxEvents.map((event) => ({
			chain: "subnet",
			to: event.args.to,
			amount: event.args.amount,
			nonce: event.args.nonce,
		}));

		/* Since we are looking for old events
			They might have been already processed 
			Therefore, check if corresponding nonce is already processed or not
			If not, add it to the txs array
		*/
		await Promise.all(
			oldAvaxEvents.map(async (event) => {
				const { to, amount, nonce } = event;
				console.log("OLD: Lock happened on avax");
				console.log(
					`OLD: Transfer: to: ${to},  amount: ${ethers.utils.formatEther(
						amount
					)}, nonce: ${nonce}`
				);
				/* Check if nonce is processed or not */
				const isProccessed =
					await localBridgeContracts.subnet.admin.processedNonces(nonce);
				if (!isProccessed) {
					/* If not processed add tx to txs array */
					console.log("OLD: is not processed, will mint on subnet\n");
					txs.push(event);
				} else {
					console.log("OLD: is already processed\n");
				}
			})
		);
	}

	// Pretty familiar as above, provider is changed
	/* For Subnet 
		Relayer gets command line arguments
		If commandline argument exists and it is not -1 
		Then process next 10 blocks and process events from these block number
	*/
	if (process.argv[3] && parseInt(process.argv[3]) !== -1) {
		const startBlock = parseInt(process.argv[3]);
		const recentBlock = await providers.subnet.getBlockNumber();
		/* If startBlock + 10 exceeds the recent block it would throw an error.
			Since we would be trying to process blocks that are not there.
		 	Therefore, we set endBlock to the smaller one of two
		*/
		const endBlock =
			startBlock + 10 >= recentBlock ? recentBlock : startBlock + 10;
		/* Reset blockNumber of the provider to process those blocks */
		providers.subnet.resetEventsBlock(startBlock);
		/* Create new bridge contract instance because provider is changed */
		const localBridgeContracts = initContracts(signers);
		/* Filter events for "Transfer" event */
		const filter = localBridgeContracts.subnet.admin.filters.Transfer();
		/* Query contract for old events in between startBlock and endBlock with given filter */
		let oldSubnetEvents = await localBridgeContracts.subnet.admin.queryFilter(
			filter,
			startBlock,
			endBlock
		);
		/* Format oldEvents as if they are transactions */
		oldSubnetEvents = oldSubnetEvents.map((event) => ({
			chain: "avax",
			to: event.args.to,
			amount: event.args.amount,
			nonce: event.args.nonce,
		}));

		/* Since we are looking for old events
			They might have been already processed 
			Therefore, check if corresponding nonce is already processed or not
			If not, add it to the txs array
		*/
		await Promise.all(
			oldSubnetEvents.map(async (event) => {
				const { to, amount, nonce } = event;
				console.log("OLD: Burned happened on subnet");
				console.log(
					`OLD: Transfer: to: ${to},  amount: ${ethers.utils.formatEther(
						amount
					)}, nonce: ${nonce}`
				);
				/* Check if nonce is processed or not */
				const isProccessed =
					await localBridgeContracts.subnet.admin.processedNonces(nonce);
				if (!isProccessed) {
					/* If not processed add tx to txs array */
					console.log("OLD: is not processed, will release on subnet\n");
					txs.push(event);
				} else {
					console.log("OLD: is already processed\n");
				}
			})
		);
	}

	/* With above 2 functions we have processed old blocks */
	console.log("\n\nOld events proccessed");

	/* Now we subscribe to bridgeContract events on both chains
		Which allows us to run a function whenever a new event is observed
	*/

	/* Subscribe to bridge events on avax */
	bridgeContracts.avax.admin.on(
		/* Subscribe to "Transfer" event */
		"Transfer",
		async (from, to, amount, date, nonce, step) => {
			/* 
				step 0 means it is a release event
				step 1 means it is a lock event

				We only care for lock events as relayer. On lock events we will mint on subnet
				We have added the release event for frontend applications.
			*/
			if (step === 1) {
				console.log("Lock happened on avax");
				console.log(
					`Transfer: from: ${from}, to: ${to}, amount: ${ethers.utils.formatEther(
						amount
					)}, date: ${date}, nonce: ${nonce}, step: ${step}`
				);
				/* Check if nonce is processed or not */
				const isProccessed = await bridgeContracts.subnet.admin.processedNonces(
					nonce
				);
				if (!isProccessed) {
					/* If not processed add tx to txs array */
					console.log("is not processed, will mint on subnet\n");
					txs.push({ chain: "subnet", to, amount, nonce });
				} else {
					console.log("is already processed\n");
				}
			}
		}
	);

	/* Subscribe to bridge events on subnet */
	bridgeContracts.subnet.admin.on(
		/* Subscribe to "Transfer" event */
		"Transfer",
		async (from, to, amount, date, nonce, step) => {
			/* 
				step 0 means it is a mint event
				step 1 means it is a burn event

				We only care for burn events as relayer. On burn events we will release on subnet
				We have added the mint event for frontend applications.
			*/
			if (step === 1) {
				console.log("Burn happened on subnet");
				console.log(
					`Transfer: from: ${from}, to: ${to}, amount: ${ethers.utils.formatEther(
						amount
					)}, date: ${date}, nonce: ${nonce}, step: ${step}`
				);
				/* Check if nonce is processed or not */
				const isProccessed = await bridgeContracts.avax.admin.processedNonces(
					nonce
				);
				if (!isProccessed) {
					/* If not processed add tx to txs array */
					console.log("is not processed, will release on avax\n");
					txs.push({ chain: "avax", to, amount, nonce });
				} else {
					console.log("is already processed\n");
				}
			}
		}
	);
	console.log("Started listening for new events\n\n");

	/* This function gets to run each 5 seconds and it sends `mint` or `release` transactions to the bridge contract
		We wait 5 seconds inbetween transactions to make sure we do not replace our own transactions before they are mined.
	*/
	setInterval(async () => {
		/* If there is not transactions to send do nothing */
		if (txs.length > 0) {
			/* If provided blockNumbers for avax or subnet are close to current blocks of the chains
			 Then a transaction might get added to the txs array twice. Once processesing old blocks (but pretty recent) and once subscribed to new events.
			 */
			txs = txs.filter(
				(value, index, self) =>
					index ===
					self.findIndex(
						(t) => t.place === value.place && t.name === value.name
					)
			);
			console.log("txs: ", txs);
			let tx;
			/* Remove the first element from the array and destructure it */
			const { chain, to, amount, nonce } = txs.shift();
			/* Check which chain the transaction will be sent to  */
			if (chain === "avax") {
				/* Call `release()` on avax */
				tx = await bridgeContracts[chain].admin.release(to, amount, nonce);
			} else if (chain === "subnet") {
				/* Call `mint()` on subnet */
				tx = await bridgeContracts[chain].admin.mint(to, amount, nonce);
			} else return;
			await tx.wait();
			console.log("transaction processed, token minted or released");
		}
	}, 5000);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

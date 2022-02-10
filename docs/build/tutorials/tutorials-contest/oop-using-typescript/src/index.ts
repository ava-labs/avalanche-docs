import { Blockchain } from "./Blockchain";

async function main() {
  // Step 1
  const firstInstance = new Blockchain(
    12345,
    "1234567890987654321234567890987654321234567898765432123456789098"
  );

  // Step 2
  const {
    data: { result },
  } = await firstInstance.fetch("post", "https://api.avax.network/ext/bc/X", {
    jsonrpc: "2.0",
    id: 1337,
    method: "avm.getAssetDescription",
    params: { assetID: "AVAX" },
  });

  console.log(
    `Details for the AVAX token. Name: ${result.name}. AssetID: ${result.assetID}. Symbol: ${result.symbol}. Denomination: ${result.denomination}`
  );

  // Step 3
  const firstInstanceBuffer: Buffer = firstInstance.toBuffer();
  console.log("Step - 3: ", firstInstanceBuffer);

  // Step 4
  const secondInstance = new Blockchain();
  console.log("Step - 4: ", secondInstance);

  // Step 5
  secondInstance.fromBuffer(firstInstanceBuffer, 0);
  console.log("Step - 5: ", secondInstance);
}

main();

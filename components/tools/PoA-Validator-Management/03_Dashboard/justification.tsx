// Using more generic types without specific library dependencies
import { Buffer } from 'buffer';
import { createPublicClient, http, parseAbiItem, Chain, Hex } from 'viem';
import { usePoAValidatorManagementWizardStore } from '../config/store';

// Assuming these types/interfaces exist or will be defined elsewhere
interface IDs {
  ID: string;
  Append(index: number): string;
}

// Constants equivalent to the Go code
const DefaultBootstrapValidatorsToSearch = 100; // Assuming this value
const BatchSize = 1000; // Assuming this value
const RateLimitDelay = 100; // Assuming this value in milliseconds

// Cache for registration messages
const registrationMessageCache: Record<string, Uint8Array> = {};

// Interfaces for the protobuf equivalents
interface L1ValidatorRegistrationJustification {
  preimage: {
    convertSubnetToL1TxData?: {
      subnetId: Uint8Array;
      index: number;
    };
    registerL1ValidatorMessage?: Uint8Array;
  };
}

/**
 * Gets the registration justification for a validator
 * @param rpcURL The RPC URL to connect to
 * @param validationID The validation ID
 * @param subnetID The subnet ID
 * @returns The marshalled justification
 */
export async function getRegistrationJustification(
  rpcURL: string,
  validationID: string,
  subnetID: string
): Promise<Uint8Array> {
  // Get the Viem L1 chain configuration from the store
  const { getViemL1Chain } = usePoAValidatorManagementWizardStore.getState();
  const chain = getViemL1Chain();

  // First try to find it in bootstrap validators with a reasonable limit
  for (let validationIndex = 0; validationIndex < DefaultBootstrapValidatorsToSearch; validationIndex++) {
    const bootstrapValidationID = appendToID(subnetID, validationIndex);
    if (bootstrapValidationID === validationID) {
      const justification: L1ValidatorRegistrationJustification = {
        preimage: {
          convertSubnetToL1TxData: {
            subnetId: stringToUint8Array(subnetID),
            index: validationIndex,
          },
        },
      };
      return marshalProto(justification);
    }
  }

  const logData = await getRegistrationMessage(rpcURL, validationID, chain);
  if (!logData) {
    throw new Error(`Failed to get registration message for validation ID ${validationID}`);
  }

  // Convert the hex data to Uint8Array
  const messageBytes = hexToUint8Array(logData);
  
  const justification: L1ValidatorRegistrationJustification = {
    preimage: {
      registerL1ValidatorMessage: messageBytes,
    },
  };
  
  return marshalProto(justification);
}

/**
 * Gets the registration message for a validator
 * @param rpcURL The RPC URL to connect to
 * @param validationID The validation ID
 * @param chain The Viem chain configuration
 * @returns The registration message
 */
export async function getRegistrationMessage(
  rpcURL: string,
  validationID: string,
  chain: Chain
): Promise<Hex | null> {
  // Check cache first
  if (registrationMessageCache[validationID]) {
    return `0x${Buffer.from(registrationMessageCache[validationID]).toString('hex')}` as Hex;
  }

  // Create a Viem public client with the provided chain configuration
  const client = createPublicClient({
    transport: http(rpcURL),
    chain: chain,
  });
  
  // Get current block height
  const height = await client.getBlockNumber();

  // Start from most recent blocks and work backwards all the way to block 0
  const endBlock = Number(height);
  const startBlock = 0;
  
  // SubnetEVM Warp contract address
  const subnetEvmWarpAddress = "0x0200000000000000000000000000000000000005"; // Replace with actual address

  console.log(`Looking for validationID in topics: ${validationID}`);

  // Search from most recent to oldest in batches
  for (let blockNumber = endBlock; blockNumber >= startBlock; blockNumber -= BatchSize) {
    // Calculate batch end and start
    const batchEnd = blockNumber;
    let batchStart = blockNumber - BatchSize + 1;
    if (batchStart < startBlock) {
      batchStart = startBlock;
    }

    console.log(`Searching blocks ${batchStart} to ${batchEnd} for validation ID ${validationID}`);

    try {
      // Query logs for all blocks in the batch using Viem
      const logs = await client.getLogs({
        address: subnetEvmWarpAddress,
        fromBlock: BigInt(batchStart),
        toBlock: BigInt(batchEnd),
      });

      console.log(`Found ${logs.length} logs in blocks ${batchStart} to ${batchEnd}`);
      
      // Process logs for this batch - simply check if topics[2] matches validationID
      for (const log of logs) {
        if (log.topics.length >= 3) {
          console.log(`Comparing log topic: ${log.topics[2]} with validationID: ${validationID}`);
          
          // Check if the third topic matches our validationID
          if (log.topics[2] === validationID) {
            console.log("Found matching log:", log);
            
            // Cache the result before returning
            registrationMessageCache[validationID] = hexToUint8Array(log.data);
            
            return log.data;
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching logs for blocks ${batchStart}-${batchEnd}:`, error);
    }

    // Rate limit delay between batches
    await new Promise(resolve => setTimeout(resolve, RateLimitDelay));
  }
  
  return null;
}

// Helper functions
function appendToID(id: string, index: number): string {
  // Implementation would depend on how IDs are structured
  return `${id}-${index}`;
}

function stringToUint8Array(str: string): Uint8Array {
  return Buffer.from(str, 'hex');
}

function hexToUint8Array(hex: Hex): Uint8Array {
  // Remove '0x' prefix if present
  const hexString = hex.startsWith('0x') ? hex.slice(2) : hex;
  return Buffer.from(hexString, 'hex');
}

async function marshalProto(obj: any): Promise<Uint8Array> {
  // This would use a protobuf library like protobufjs
  // For now, returning a placeholder
  return new Uint8Array([]);
}

// These functions are no longer needed with the simplified approach
// Keeping them as stubs in case they're referenced elsewhere
async function parseUnsignedMessage(data: Uint8Array): Promise<any> {
  return { payload: data };
}

async function parseAddressedCall(payload: Uint8Array): Promise<any> {
  return { payload };
}

async function unpackSendWarpEventDataToMessage(data: string): Promise<any> {
  return {
    payload: new Uint8Array([]),
    bytes: () => new Uint8Array([])
  };
}

async function parseRegisterL1Validator(payload: Uint8Array): Promise<any> {
  return {
    validationID: () => ""
  };
}

/**
 * TypeScript implementation of unpackRegisterL1ValidatorMessage
 */

// Constants from the Solidity contract
const CODEC_ID = 0;
const REGISTER_L1_VALIDATOR_MESSAGE_TYPE_ID = 1;

// Custom error classes to match Solidity reverts
class InvalidCodecIDError extends Error {
  constructor(codecID: number) {
    super(`Invalid codec ID: ${codecID}`);
    this.name = 'InvalidCodecIDError';
  }
}

class InvalidMessageTypeError extends Error {
  constructor() {
    super('Invalid message type');
    this.name = 'InvalidMessageTypeError';
  }
}

class InvalidMessageLengthError extends Error {
  constructor(actual: number, expected: number) {
    super(`Invalid message length: got ${actual}, expected ${expected}`);
    this.name = 'InvalidMessageLengthError';
  }
}

// Type definitions
interface PChainOwner {
  threshold: number;
  addresses: string[];
}

interface ValidationPeriod {
  subnetID: string;
  nodeID: Uint8Array;
  blsPublicKey: Uint8Array;
  registrationExpiry: bigint;
  remainingBalanceOwner: PChainOwner;
  disableOwner: PChainOwner;
  weight: bigint;
}

/**
 * @notice Unpacks a byte array as a RegisterL1ValidatorMessage message.
 * The message format specification is the same as the one used for packing.
 *
 * @param input The byte array to unpack.
 * @return The unpacked ValidationPeriod.
 */
export function unpackRegisterL1ValidatorMessage(input: Uint8Array): ValidationPeriod {
  let index = 0;
  const validation: ValidationPeriod = {
    subnetID: '',
    nodeID: new Uint8Array(),
    blsPublicKey: new Uint8Array(),
    registrationExpiry: 0n,
    remainingBalanceOwner: { threshold: 0, addresses: [] },
    disableOwner: { threshold: 0, addresses: [] },
    weight: 0n
  };

  // Unpack the codec ID
  {
    let codecID = 0;
    for (let i = 0; i < 2; ++i) {
      codecID |= input[i + index] << (8 * (1 - i));
    }
    if (codecID !== CODEC_ID) {
      throw new InvalidCodecIDError(codecID);
    }
    index += 2;
  }

  // Unpack the type ID
  {
    let typeID = 0;
    for (let i = 0; i < 4; ++i) {
      typeID |= input[i + index] << (8 * (3 - i));
    }
    if (typeID !== REGISTER_L1_VALIDATOR_MESSAGE_TYPE_ID) {
      throw new InvalidMessageTypeError();
    }
    index += 4;
  }

  // Unpack the subnetID
  {
    // In TypeScript, we'll represent the bytes32 as a hex string
    const subnetIDBytes = input.slice(index, index + 32);
    validation.subnetID = '0x' + Array.from(subnetIDBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    index += 32;
  }

  // Unpack the nodeID length and nodeID
  let nodeIDLength = 0;
  {
    for (let i = 0; i < 4; ++i) {
      nodeIDLength |= input[i + index] << (8 * (3 - i));
    }
    index += 4;

    // Unpack the nodeID
    validation.nodeID = input.slice(index, index + nodeIDLength);
    index += nodeIDLength;
  }

  // Unpack the blsPublicKey
  {
    validation.blsPublicKey = input.slice(index, index + 48);
    index += 48;
  }

  // Unpack the registration expiry
  {
    let expiry = 0n;
    for (let i = 0; i < 8; ++i) {
      expiry |= BigInt(input[i + index]) << BigInt(8 * (7 - i));
    }
    validation.registrationExpiry = expiry;
    index += 8;
  }

  // Unpack the remainingBalanceOwner threshold and addresses
  let remainingBalanceOwnerAddressesLength = 0;
  {
    let remainingBalanceOwnerThreshold = 0;
    for (let i = 0; i < 4; ++i) {
      remainingBalanceOwnerThreshold |= input[i + index] << (8 * (3 - i));
    }
    index += 4;

    // Unpack the remainingBalanceOwner addresses length
    for (let i = 0; i < 4; ++i) {
      remainingBalanceOwnerAddressesLength |= input[i + index] << (8 * (3 - i));
    }
    index += 4;

    // Unpack the remainingBalanceOwner addresses
    const remainingBalanceOwnerAddresses: string[] = [];
    for (let i = 0; i < remainingBalanceOwnerAddressesLength; ++i) {
      const addrBytes = input.slice(index, index + 20);
      const addr = '0x' + Array.from(addrBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      remainingBalanceOwnerAddresses.push(addr);
      index += 20;
    }
    validation.remainingBalanceOwner = {
      threshold: remainingBalanceOwnerThreshold,
      addresses: remainingBalanceOwnerAddresses
    };
  }

  // Unpack the disableOwner threshold and addresses
  let disableOwnerAddressesLength = 0;
  {
    let disableOwnerThreshold = 0;
    for (let i = 0; i < 4; ++i) {
      disableOwnerThreshold |= input[i + index] << (8 * (3 - i));
    }
    index += 4;

    // Unpack the disableOwner addresses length
    for (let i = 0; i < 4; ++i) {
      disableOwnerAddressesLength |= input[i + index] << (8 * (3 - i));
    }
    index += 4;

    // Unpack the disableOwner addresses
    const disableOwnerAddresses: string[] = [];
    for (let i = 0; i < disableOwnerAddressesLength; ++i) {
      const addrBytes = input.slice(index, index + 20);
      const addr = '0x' + Array.from(addrBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      disableOwnerAddresses.push(addr);
      index += 20;
    }
    validation.disableOwner = {
      threshold: disableOwnerThreshold,
      addresses: disableOwnerAddresses
    };
  }

  // Validate the input length
  const expectedLength = 122 + nodeIDLength + 
    (remainingBalanceOwnerAddressesLength + disableOwnerAddressesLength) * 20;
  if (input.length !== expectedLength) {
    throw new InvalidMessageLengthError(input.length, expectedLength);
  }

  // Unpack the weight
  {
    let weight = 0n;
    for (let i = 0; i < 8; ++i) {
      weight |= BigInt(input[i + index]) << BigInt(8 * (7 - i));
    }
    validation.weight = weight;
    // No need to update index as we're done
  }

  return validation;
}

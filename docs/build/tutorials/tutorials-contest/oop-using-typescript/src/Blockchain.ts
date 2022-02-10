import axios, { Method, AxiosResponse } from "axios";

const NETWORK_ID_LENGTH = 4;
const BLOCK_CHAIN_ID_LENGTH = 32;

/**
 * The Blockchain class has two private properties, networkID and blockchainID.
 * When instantiating the class it will convert the constructor properties to Buffers and store
 * them on the private properties networkID and blockchainID
 * @example
 * const someInstance = new Blockchain(
    12345,
    "1234567890987654321234567890987654321234567898765432123456789098"
  );
 */
export class Blockchain {
  private networkID: Buffer = Buffer.alloc(NETWORK_ID_LENGTH);

  private blockchainID: Buffer = Buffer.alloc(BLOCK_CHAIN_ID_LENGTH);

  /**
   * constructor takes two parameters @param networkID and @param blockchainID and then it converts it to buffer and stores it to the class private properteis
   * line 2
   * @param networkID networkId of type number
   * @param blockchainID blockchainID of type string
   */
  constructor(
    networkID: number = 1,
    blockchainID: string = "0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    this.networkID.write(networkID.toString(), "utf-8");
    this.blockchainID.write(blockchainID, "utf-8");
  }

  /**
   * fetch 
   * @param method axios method type. Eg: 'get', 'post'
   * @param url the url to be called
   * @param data params for the url
   */
  async fetch(
    method: Method = "post",
    url: string = "https://api.avax.network/",
    data: object = {}
  ): Promise<AxiosResponse> {
    return axios({ method, url, data });
  }

  /**
   * The toBuffer method joins the private properties and returns it.
   */
  toBuffer(): Buffer {
    return Buffer.concat([this.networkID, this.blockchainID]);
  }

  /**
   * The fromBuffer method reads from bytes at the offset and populates the instance of
   * Blockchain's respective networkID and blockchainID properties.
   * @param bytes bytes of type Buffer
   * @param offset offset of type number
   */
  fromBuffer(bytes: Buffer, offset: number = 0): number {
    let resultOffset = offset;
    bytes.copy(
      this.networkID,
      0,
      resultOffset,
      resultOffset + NETWORK_ID_LENGTH
    );
    resultOffset = resultOffset + NETWORK_ID_LENGTH;
    bytes.copy(
      this.blockchainID,
      0,
      resultOffset,
      resultOffset + BLOCK_CHAIN_ID_LENGTH
    );
    return resultOffset + BLOCK_CHAIN_ID_LENGTH;
  }
}

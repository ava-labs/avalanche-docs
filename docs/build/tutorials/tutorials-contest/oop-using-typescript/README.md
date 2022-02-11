## Introduction

In this tutorial we are going to be learning about Typescript and Object Oriented programming(OOP) coding patterns by creating a simple Blockchain class.  

The goal of this tutorial is to provide an example of how we can use Typescript to create a class and from that, create instances of that class. We will use our new skills to build a Blockchain class where we will copy the private property from one instance to another. 

## Typescript

Typescript is a programming language that is built on top of Javascript. It is a strongly typed superset of Javascript that compiles to plain Javascript.

Let us find how Typescript differs from JavaScript. In the code snippet below we can see that in the Javascript the type of the variable is not defined while in case of typescript we can see that the type is defined `name: string`.

```js
let name = "Chris";
```

```typescript
let name: string = "Chris";
```

> Typescript is strongly typed while Javascript is not.

<br>

## Object Oriented Programming

Object Oriented Programming is a pattern of programming that uses classes and objects as its core concept. It helps to structure a computer program into simple, reusable code.

To understand what OOP is, let's create a simple class and name it "Blockchain".

```typescript
class Blockchain {
  private networkID: Buffer = Buffer.alloc(4);

  private blockchainID: Buffer = Buffer.alloc(32);
  constructor() {}
}
```

We can see that we used the keyword `class` to let the compiler know that `Blockchain` is a class. The `Blockchain` class has two private properties, `networkID` and `BlockchainID`.



> Class - A class is a "blueprint" object, from which we can create instances.  Classes encapsulate data for the object.
<br>
<br>
> Private - The value is accessible from within the class only
<br>
<br>
> Constructor -  This is a special function of the class that is automatically invoked upon the creation an instance of the class.
<br>
<br>
> Buffer - Buffers are an array of allocated memory
<br>
<br>

Now let's change the constructor method to accept two parameters:

```typescript
class Blockchain {
  private networkID: Buffer = Buffer.alloc(4);

  private blockchainID: Buffer = Buffer.alloc(32);
  constructor(networkID: number, blockchainID: string) {}
}
```

The constructor method accepts two parameters, `networkId` of type number and `blockchainId` of type string. We can also assign default values to the input parameters.

```typescript
class Blockchain {
  private networkID: Buffer = Buffer.alloc(4);

  private blockchainID: Buffer = Buffer.alloc(32);
  constructor(
    networkID: number = 1,
    blockchainID: string = "0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    this.networkID.write(networkID.toString(), "utf-8");
    this.blockchainID.write(blockchainID, "utf-8");
  }
}
```

`thi.networkId.write(networkID.toString(), "utf-8")` will assign the input param `networkId` to the private property

Now is a good time to assign values to the private properties which we added in the class.

```typescript
class Blockchain {
  private networkID: Buffer = Buffer.alloc(4);

  private blockchainID: Buffer = Buffer.alloc(32);
  constructor(
    networkID: number = 1,
    blockchainID: string = "0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    this.networkID.write(networkID.toString(), "utf-8");
    this.blockchainID.write(blockchainID, "utf-8");
  }
}
```

Now let's create an instance of the Blockchain class. When instantiating the class it will convert the constructor properties to Buffers and store them on the private properties networkID and blockchainID

```typescript
const someInstance = new Blockchain(
  12345,
  "1234567890987654321234567890987654321234567898765432123456789098"
);
```

To create an instance we use the keyword `new`. `someInstance` is an instance/object of the `Blockchain` class.

### methods

Class methods are a way to interact with the object of the class. If we want to read or set values of the class properties it is done through class methods.

We will now create a method called `fetch` which will take three parameters: `method` of type method, `url` of type string and `data` of type object.

```typescript
class Blockchain {
  fetch(method: Method, url: string, data: object): {};
}
```

In the `fetch()` method we will make an API call to the `url` which we accept through the parameter. We will use axios to make the api call. Let's update the code so we can use axios and update the return type of the `fetch()` method. We'll also assign a default value to the input parameters.

```typescript
class Blockchain {
  fetch(
    method: Method = "post",
    url: string = "https://api.avax.network/",
    data: object = {}
  ): Promise<AxiosResponse> {
    return axios({ method, url, data });
  }
}
```

Untill now our class will look like:

```typescript
class Blockchain {
  private networkID: Buffer = Buffer.alloc(4);
  private blockchainID: Buffer = Buffer.alloc(32);

  constructor(
    networkID: number = 1,
    blockchainID: string = "0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    this.networkID.write(networkID.toString(), "utf-8");
    this.blockchainID.write(blockchainID, "utf-8");
  }

  fetch(
    method: Method = "post",
    url: string = "https://api.avax.network/",
    data: object = {}
  ): Promise<AxiosResponse> {
    return axios({ method, url, data });
  }
}
```

Let us create two more methods `toBuffer()` and `fromBuffer()`. The `toBuffer()` method will combine `networkId` and `blockchainId` and return the new combined buffer while the `fromBuffer` method will read the `networkId` and `blockchainId` from the input buffer and assign it the properties of the class.

The `toBuffer` will serialize the state of the Blockchain instance and return a Buffer, which will be a concatenation of the networkID and blockchainID properties.

```typescript
class Blockchain {
  toBuffer(): Buffer {
    return Buffer.concat([this.networkID, this.blockchainID]);
  }
}
```

The `fromBuffer`will read from bytes at the offset and populate the instance of
Blockchain's respective networkID and blockchainID properties. What we will do here is read the first four bytes and assign it to `networkId` and then increment the offset by the length of networkId and read the blockchainId.

```typescript
class Blockchain {
  fromBuffer(bytes: Buffer, offset: number = 0): number {
    let resultOffset = offset;
    bytes.copy(
      this.networkID,
      0,
      resultOffset,
      resultOffset + 4
    );
    resultOffset = resultOffset + 4;
    bytes.copy(
      this.blockchainID,
      0,
      resultOffset,
      resultOffset + 32
    );
    return resultOffset + 32;
  }
}
```

## Using the class

We will now make use of the newly created Blockchain class.

Instantiating the class:

```typescript
const firstInstance = new Blockchain(
  12345,
  "1234567890987654321234567890987654321234567898765432123456789098"
);
```

Let'ss call `fetch` method with a data object and then log the response in the console:

```typescript
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
```

Now we'll convert the `firstInstance` to buffer using the `toBuffer` method, let us store the output to a variable and also print to the console.

```typescript
const firstInstanceBuffer: Buffer = firstInstance.toBuffer();
console.log(StepfirstInstanceBuffer);
```

Let's create another instance of `Blockchain` and really leverage the power of OOP:

```typescript
const secondInstance = new Blockchain();
console.log(secondInstance);
```

We can create as many instances of the class `Blockchain` as we want. Each instance of `Blockchain` will have the properties and methods which we defined in the class. Now lets pass the buffer of `firstInstance` which we saved earlier to `fromBuffer` method of `secondInstance`.

```typescript
secondInstance.fromBuffer(firstInstanceBuffer, 0);
console.log(secondInstance);
```


This is how our Blockchain class looks like

```typescript
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
＀
```

### Conclusion

We have successfully demonstrated the power of Object Oriented Programming in Typescript by leveraging the ability to creates instances from a class.  We created a class named `Blockchain` that has 2 private properties, `networkID` and `blockchainID`.  Any instances we made of this class had a fetch method attached to them, which made a fetch request to a url by passing over the parameters. In this tutorial we also used oop to copy the `networkID` and `blockchainID` from `firstInstance` by converting the buffer(concatenation of networkID and blockchainID) to `secondInstance` by reading from the buffer.

I hope this tutorial helped highlight the versatility and flexibility of using OOP in TypeScript!

Happy Hacking!

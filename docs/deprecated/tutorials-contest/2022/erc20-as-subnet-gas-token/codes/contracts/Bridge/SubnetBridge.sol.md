# SubnetBridge.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../Token/INativeMinter.sol";

contract SubnetBridge {
    address public admin;
    /* Address to send tokens to burn them */
    address public burnAddress = address(0x0);
    /* Gets incremented with each `burn()`, indicates the transferCount
    and prevents double processing the event */
    uint public nonce;

    /* Represents NativeMinterInterface */
    NativeMinterInterface public nativeMinter =
        NativeMinterInterface(
            /*
                Native Minter contract is always at this address
                as explained at https://docs.avax.network/subnets/customize-a-subnet#minting-native-coins
             */
            address(0x0200000000000000000000000000000000000001)
        );

    /* Mapping to hold whether nonce is processed or not */
    mapping(uint => bool) public processedNonces;

    /* Allows us to indicate whether it is a `mint()` or `burn()` when emitting an event */
    enum Type {
        Mint,
        Burn
    }

    /*
        Event that is emitted with both `mint()` and `burn()`
        Relayer listens to events emitted by `burn()`
        Potential frontend application may want to listen to events emitted by `mint()`
    */
    event Transfer(
        address from,
        address to,
        uint amount,
        uint time,
        uint nonce,
        Type indexed transferType
    );

    /* Modifier to allow some functions to be only called by admin */
    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    /* Constructor that sets admin as the sender */
    constructor() {
        admin = msg.sender;
    }

    /* Function to allow setting new admin */
    function setAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }

    /* Function that is called by the relayer to mint some tokens after it is locked on the avax */
    function mint(
        address to,
        uint amount,
        uint avaxNonce
    ) external onlyAdmin {
        require(processedNonces[avaxNonce] == false, "nonce already processed");
        processedNonces[avaxNonce] = true;

        nativeMinter.mintNativeCoin(to, amount);
        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            avaxNonce,
            Type.Mint
        );
    }

    /*
        Function that is called by the user to burn their tokens.
        Relayer listens to this event and if the nonce is not processed,
        it will call `release()` of the AvaxBridge
    */
    function burn(address to) external payable {
        require(msg.value > 0, "You have to burn more than 0 tokens");
        /* Send native token to 0x0 address, effectively burning native token */
        (bool sent, ) = payable(burnAddress).call{value: msg.value}("");
        require(sent, "Failed to send native token");

        /* Event that is emitted for relayer to process */
        emit Transfer(
            msg.sender,
            to,
            msg.value,
            block.timestamp,
            nonce,
            Type.Burn
        );

        /* Increment the nonce to prevent double counting */
        nonce++;
    }
}
```

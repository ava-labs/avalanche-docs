# AvaxBridge.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AvaxBridge {
    address public admin;
    /* Gets incremented with each `lock()`, indicates the transferCount
    and prevents double processing the event */
    uint public nonce;

    /* Represents the ERC20 token */
    IERC20 public avaxToken;

    /* Mapping to hold whether nonce is processed or not */
    mapping(uint => bool) public processedNonces;

    /* Allows us to indicate whether it is a `release()` or `lock()` when emitting an event */
    enum Type {
        Release,
        Lock
    }

    /*
        Event that is emitted with both `release()` and `lock()`
        Relayer listens to events emitted by `lock()`
        Potential frontend application may want to listen to events emitted by `release()`
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

    /* Constructor that sets admin as the sender and initializes the ERC20 token inside contract */
    constructor(address _token) {
        admin = msg.sender;
        avaxToken = IERC20(_token);
    }

    /* Function to allow setting a new admin */
    function setAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }

    /* Function that is called by the relayer to release some tokens after it is burned on the subnet */
    function release(
        address to,
        uint amount,
        uint subnetNonce
    ) external onlyAdmin {
        require(
            processedNonces[subnetNonce] == false,
            "nonce already processed"
        );
        processedNonces[subnetNonce] = true;

        /* Bridge sends locked tokens to the `to` address therefore, releases the tokens */
        avaxToken.transfer(to, amount);

        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            subnetNonce,
            Type.Release
        );
    }

    /*
        Function that is called by the user to lock their tokens.
        Relayer listens to the event emitted by this function and if the nonce is not processed,
        it will call `mint()` of the SubnetBridge
    */
    function lock(address to, uint amount) external {
        /* Send ERC20 tokens from msg.send (user) to bridge to lock the tokens */
        /* Do not forget: sender should approve bridge address to do this */
        avaxToken.transferFrom(msg.sender, address(this), amount);

        /* Event that is emitted for relayer to process */
        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            nonce,
            Type.Lock
        );
        /* Increment the nonce to prevent double counting */
        nonce++;
    }
}
```

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AvaxBridge {
    address public admin;
    /* Increments with each `lock()` indicates the transferCount
     and prevents double counting of the event */
    uint public nonce;

    /* Contract that represents the ERC20 token  */
    IERC20 public avaxToken;

    /* Mapping to hold processed nonce values */
    mapping(uint => bool) public processedNonces;

    /* Allows us to indicate whether it is a `release()` or `lock()` when emitting an event */
    enum Step {
        Release,
        Lock
    }

    /* Event that is emitted with both `release()` and `lock()`
       Relayer listens to this event  
    */
    event Transfer(
        address from,
        address to,
        uint amount,
        uint time,
        uint nonce,
        Step indexed step
    );

    /* Modifier to allow some functions to be only called by admin */
    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    /* Contstructor that sets admin as the sender and initializes the ERC20 token inside contract */
    constructor(address _token) {
        admin = msg.sender;
        avaxToken = IERC20(_token);
    }

    /* Function to allow setting new admin */
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
            "nonce already proccessed"
        );
        processedNonces[subnetNonce] = true;

        /* Bridge sends locked tokens to the `to` address therefore, relases the tokens */
        avaxToken.transfer(to, amount);

        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            subnetNonce,
            Step.Release
        );
    }

    /* Function that is called by the user to lock their tokens.
       Relayer listens to this event and if the nonce is not processed, 
       it will `mint()` of the SubnetBridge
     */
    function lock(address to, uint amount) external {
        /* Send ERC20 tokens from msg.send (user) to bridge to lock the tokens */
        /* Do not forget: sender should approve bridge address to do this */
        avaxToken.transferFrom(msg.sender, address(this), amount);

        /* Event that is emmited for relayer to process */
        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            nonce,
            Step.Lock
        );
        /* Increment the nonce to prevent double counting */
        nonce++;
    }
}

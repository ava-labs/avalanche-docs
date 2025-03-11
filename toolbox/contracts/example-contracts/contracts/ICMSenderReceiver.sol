// (c) 2025, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

// SPDX-License-Identifier: Ecosystem
// This file demonstrates a minimal sender+receiver contract for Interchain Messaging (ICM).
// It includes over-simplified interfaces from the original ICM contracts to enable compilation without dependencies.

pragma solidity ^0.8.18;

//Original: https://github.com/ava-labs/icm-contracts/blob/8a8f78dcda0b0af60c6fb1762f7927351357d645/contracts/teleporter/ITeleporterReceiver.sol
interface ITeleporterReceiver {
    function receiveTeleporterMessage(
        bytes32 sourceBlockchainID,
        address originSenderAddress,
        bytes calldata message
    ) external;
}

//Original: https://github.com/ava-labs/icm-contracts/blob/8a8f78dcda0b0af60c6fb1762f7927351357d645/contracts/teleporter/ITeleporterMessenger.sol
struct TeleporterMessageInput {
    bytes32 destinationBlockchainID;
    address destinationAddress;
    TeleporterFeeInfo feeInfo;
    uint256 requiredGasLimit;
    address[] allowedRelayerAddresses;
    bytes message;
}

struct TeleporterFeeInfo {
    address feeTokenAddress;
    uint256 amount;
}

//Warning! This is not the full interface.
interface ITeleporterMessenger {
    function sendCrossChainMessage(
        TeleporterMessageInput calldata messageInput
    ) external returns (bytes32);
}

contract ICMSenderReceiver is ITeleporterReceiver {
    ITeleporterMessenger public immutable messenger =
        ITeleporterMessenger(0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf);

    //Read more: https://build.avax.network/academy/interchain-messaging/04-icm-basics/04-create-sender-contract
    function sendMessage(
        bytes32 destinationBlockchainID,
        address destinationAddress,
        string calldata message
    ) external {
        messenger.sendCrossChainMessage(
            TeleporterMessageInput({
                destinationBlockchainID: destinationBlockchainID,
                destinationAddress: destinationAddress,
                feeInfo: TeleporterFeeInfo({
                    feeTokenAddress: address(0),
                    amount: 0
                }),
                requiredGasLimit: 100000,
                allowedRelayerAddresses: new address[](0),
                message: abi.encode(message)
            })
        );
    }

    string public lastMessage;

    //Read more: https://build.avax.network/academy/interchain-messaging/04-icm-basics/06-create-receiver-contract
    function receiveTeleporterMessage(
        bytes32,
        address,
        bytes calldata message
    ) external {
        // Only the Interchain Messaging receiver can deliver a message.
        require(
            msg.sender == address(messenger),
            "SampleSenderReceiver: unauthorized TeleporterMessenger"
        );

        // Store the message.
        lastMessage = abi.decode(message, (string));
    }
}

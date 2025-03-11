//Original: https://github.com/ava-labs/avalanche-starter-kit/blob/21e0481966167736d616397ff09b52b0b2cc2398/contracts/interchain-messaging/send-roundtrip/senderOnCChain.sol
//(slight modifications)

// (c) 2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

// SPDX-License-Identifier: Ecosystem

pragma solidity ^0.8.18;

import "./ITeleporterMessenger.sol";
import "./ITeleporterReceiver.sol";

contract SenderOnCChain is ITeleporterReceiver {
    ITeleporterMessenger public immutable messenger =
        ITeleporterMessenger(0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf);

    string public roundtripMessage;

    /**
     * @dev Sends a message to another chain.
     */
    function sendMessage(
        address destinationAddress,
        bytes32 destinationBlockchainID,
        string memory message
    ) external {
        messenger.sendCrossChainMessage(
            TeleporterMessageInput({
                // Replace with blockchainID of your Subnet (see instructions in Readme)
                destinationBlockchainID: destinationBlockchainID,
                destinationAddress: destinationAddress,
                feeInfo: TeleporterFeeInfo({
                    feeTokenAddress: address(0),
                    amount: 0
                }),
                requiredGasLimit: 200000,
                allowedRelayerAddresses: new address[](0),
                message: abi.encode(message)
            })
        );
    }

    function receiveTeleporterMessage(
        bytes32,
        address,
        bytes calldata message
    ) external {
        // Only the Teleporter receiver can deliver a message.
        require(
            msg.sender == address(messenger),
            "SenderOnCChain: unauthorized TeleporterMessenger"
        );

        // Store the message.
        roundtripMessage = abi.decode(message, (string));
    }
}

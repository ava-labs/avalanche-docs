// (c) 2022-2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface XChainECRecover {

    function getXChainECRecover(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) external view returns (string memory);
}
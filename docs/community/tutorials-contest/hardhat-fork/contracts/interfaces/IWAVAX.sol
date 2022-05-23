// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface IWAVAX {
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function balanceOf(address owner) external view returns (uint);
    function withdraw(uint) external;
    function approve(address to, uint value) external returns (bool);
}
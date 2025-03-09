// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Benchmark {
    string public name = "Benchmark";
    string public symbol = "BENCH";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * (10 ** uint256(decimals));
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    uint256[] public bigArray;

    function benchmark_SSTORE(uint256 iterations) external {
        for (uint256 i = 0; i < iterations; i++) {
            bigArray.push(i);
        }
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IMintableBurnable } from "@layerzerolabs/oft-evm/contracts/interfaces/IMintableBurnable.sol";

contract ElevatedMinterBurner is IMintableBurnable, Ownable {
    IMintableBurnable public immutable token;
    mapping(address => bool) public operators;

    modifier onlyOperators() {
        require(operators[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    constructor(IMintableBurnable _token, address _owner) Ownable(_owner) {
        token = _token;
    }

    function setOperator(address _operator, bool _status) external onlyOwner {
        operators[_operator] = _status;
    }

    function burn(address _from, uint256 _amount) external override onlyOperators returns (bool) {
        return token.burn(_from, _amount);
    }

    function mint(address _to, uint256 _amount) external override onlyOperators returns (bool) {
        return token.mint(_to, _amount);
    }
}
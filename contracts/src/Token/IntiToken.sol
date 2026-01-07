// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IntiToken is ERC20 {
    constructor() ERC20("Inti", "INTI") {
        // When deploying, I send myself 1 million tokens
        // decimals() represents 18, so 10^18 (https://docs.openzeppelin.com/contracts/5.x/erc20)
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    //Public faucet, that anyone can request 1000 tokens.
    function faucet() external {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}

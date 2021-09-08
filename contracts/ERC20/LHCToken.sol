// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "../dependencies/ERC20.sol";
import "../dependencies/Initializable.sol";

contract LHCToken is ERC20, Initializable {
    function initialize(address _owner) public initializer {
        __ERC20_init("LH Token", "LHC");
        _mint(address(this), 1000); // Mint 1000 to this contract
        _mint(_owner, 10); // Mint 10 to owner
    }
}

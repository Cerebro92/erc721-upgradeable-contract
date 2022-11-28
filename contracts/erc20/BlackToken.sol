// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BlackToken is ERC20Upgradeable, OwnableUpgradeable {
    function initialize() public initializer {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        __ERC20_init("Black & White", "BNW");
        __Ownable_init();
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}

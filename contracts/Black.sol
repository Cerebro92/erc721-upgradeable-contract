// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BlackNFT is ERC721Upgradeable, OwnableUpgradeable {
    uint public totalSupply;

    function initialize() public initializer {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        __ERC721_init("Black & White", "BNW");
        __Ownable_init();
        totalSupply = 0;
    }

    function mint() external {
        totalSupply++;
        _mint(msg.sender, totalSupply);
    }
}

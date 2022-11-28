// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BlackNFTV1 is ERC721Upgradeable, OwnableUpgradeable {
    uint public totalSupply;

    function mint() external onlyOwner {
        totalSupply++;
        _mint(msg.sender, totalSupply);
    }
}

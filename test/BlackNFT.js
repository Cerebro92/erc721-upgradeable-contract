const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("BlackNFT", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const BlackNFT = await ethers.getContractFactory("BlackNFT");
    const blackNFT = await upgrades.deployProxy(BlackNFT);
    await blackNFT.deployed();
    return { blackNFT, owner, otherAccount };
  }

  describe("Deployment", async function () {
    it("Should set name and code", async function () {
      const { blackNFT } = await loadFixture(deployFixture);
      expect(await blackNFT.symbol()).to.equal("BNW");
      expect(await blackNFT.name()).to.equal("Black & White");
    });

    it("Should mint new tokens", async function () {
      const { blackNFT } = await loadFixture(deployFixture);
      await blackNFT.mint();
      expect(await blackNFT.totalSupply()).to.equal(1);
    });

    it("Should mint new token from any address", async function () {
      const { blackNFT, otherAccount } = await loadFixture(deployFixture);
      await blackNFT.connect(otherAccount).mint();
    });

    it("Only owner should be allowed to mint after upgrade", async function () {
      const { blackNFT, otherAccount } = await loadFixture(deployFixture);
      const BlackNFTV1 = await ethers.getContractFactory("BlackNFTV1");
      const upgradedBlackNFT = await upgrades.upgradeProxy(
        blackNFT.address,
        BlackNFTV1
      );
      await expect(
        upgradedBlackNFT.connect(otherAccount).mint()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});

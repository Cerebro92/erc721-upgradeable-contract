const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("BlackToken", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const BlackToken = await ethers.getContractFactory("BlackToken");
    const blackToken = await upgrades.deployProxy(BlackToken);
    await blackToken.deployed();
    return { blackToken, owner, otherAccount };
  }

  describe("Deployment", async function () {
    it("Should set name and code", async function () {
      const { blackToken } = await loadFixture(deployFixture);
      expect(await blackToken.symbol()).to.equal("BNW");
      expect(await blackToken.name()).to.equal("Black & White");
    });

    it("Should mint new tokens", async function () {
      const { blackToken } = await loadFixture(deployFixture);
      await blackToken.mint(10);
      expect(await blackToken.totalSupply()).to.equal(10);
    });

    it("Should mint new token from any address", async function () {
      const { blackToken, otherAccount } = await loadFixture(deployFixture);
      await blackToken.connect(otherAccount).mint(10);
    });

    it("Only owner should be allowed to mint after upgrade", async function () {
      const { blackToken, otherAccount } = await loadFixture(deployFixture);
      const blackTokenV1 = await ethers.getContractFactory("BlackTokenV1");
      const upgradedBlackToken = await upgrades.upgradeProxy(
        blackToken.address,
        blackTokenV1
      );
      await expect(
        upgradedBlackToken.connect(otherAccount).mint(10)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});

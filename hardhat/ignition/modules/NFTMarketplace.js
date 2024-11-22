const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NFTModule", (m) => {

  const nft = m.contract("NFTMarketplace");

  return { nft };
});

require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("hardhat/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: process.env.RPC_URL_KEY,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};

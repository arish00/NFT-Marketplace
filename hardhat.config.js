const fs = require('fs');
require('@nomiclabs/hardhat-waffle');
require("dotenv").config()

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: process.env.ENDPOINT_URL,
      accounts: [process.env.DEPLOYER_KEY],
    },
  },
  solidity: '0.8.4',
};


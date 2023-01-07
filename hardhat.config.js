const fs = require('fs');
require("dotenv").config();
require('@nomiclabs/hardhat-waffle');
module.exports = {
  solidity: '0.8.4',
  networks: {
    goerli: {
      url: process.env.ENDPOINT_URL,
      accounts: [process.env.DEPLOYER_KEY],

    },
    hardhat: {
      chainId: 1337,
    },
  },
};

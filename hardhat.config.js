const fs = require('fs');
require('@nomiclabs/hardhat-waffle');
require("dotenv").config();

const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      // chainId: 1337,
    },
    localhost: {
    url:"http://127.0.0.1:8545"
    },
    goerli: {
      url: process.env.ENDPOINT_URL,
      accounts: [process.env.DEPLOYER_KEY]
    }
  },
  solidity: '0.8.4',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  paths: {
    sources: "./contracts/"
  }
};
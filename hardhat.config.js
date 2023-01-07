const fs = require('fs');
require('@nomiclabs/hardhat-waffle');

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/nrwjWYK8BGomfvFAZ5DO_mTwwXQY8bQ_',
      accounts: ['42897f38222710b58d7f94aa21f836079e4cdec99aed0fc827df5211eda689a3'],
    },
  },
  solidity: '0.8.4',
};

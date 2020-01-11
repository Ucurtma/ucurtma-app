const { mnemonic, infuraKey, etherscanApiKey } = require('./.deployment.js');
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      gas: 6712388,
      // gasPrice: 2000000000, // 1 gwei
      network_id: '*',
    },
    test: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gasPrice: 0x01,
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01, // <-- Use this low gas price
    },
    rinkeby: {
      provider: (num_addresses = 1) =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraKey}`,
          0,
          num_addresses
        ),
      gasPrice: 50000000000, // 50 gwei,
      network_id: 4,
    },
    ropsten: {
      provider: (num_addresses = 1) =>
        new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/${infuraKey}`,
          0,
          num_addresses
        ),
      gasPrice: 50000000000, // 50 gwei,
      network_id: 3,
    },
    kovan: {
      provider: (num_addresses = 1) =>
        new HDWalletProvider(
          mnemonic,
          `https://kovan.infura.io/v3/${infuraKey}`,
          0,
          num_addresses
        ),
      gasPrice: 10000000000, // 10 gwei,
      network_id: 42,
    },
    mainnet: {
      // gas: 5000000,
      provider: (num_addresses = 1) =>
        new HDWalletProvider(
          mnemonic,
          `https://mainnet.infura.io/v3/${infuraKey}`,
          0,
          num_addresses
        ),
      gasPrice: 1000000000, // 1 gwei
      port: 8545,
      network_id: 1,
      confirmations: 20,
    },
  },

  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: etherscanApiKey,
  },

  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 1,
    },
    timeout: 300000,
  },

  compilers: {
    solc: {
      version: '0.5.11',
      settings: {
        optimizer: {
          enabled: true,
        },
        evmVersion: 'petersburg', // Important, see https://github.com/trufflesuite/truffle/issues/2416
      },
    },
  },
};

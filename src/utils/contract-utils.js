import DeploymentManagerABI from './abi/deploy-manager.abi.json';
import CampaignABI from './abi/campaign.abi.json';
import config from '../config';

const { web3 } = window;

export function getDeploymentManagerContract() {
  return web3.eth
    .contract(DeploymentManagerABI)
    .at(config.ethereum.deploymentManagerAddress);
}

export function getCampaignContract(address) {
  return web3.eth.contract(CampaignABI).at(address);
}

export function getEtherscanAddressFor({ type = 'tx', hash }) {
  switch (web3.currentProvider.networkVersion) {
    case '4':
      return `https://rinkeby.etherscan.io/${type}/${hash}`;
    default:
    case '1':
      return `https://etherscan.io/${type}/${hash}`;
  }
}

export function promisifyCall({ contract, method, params, mapper }) {
  return new Promise((resolve, reject) => {
    try {
      contract[method](...params, (error, result) => {
        if (error) {
          return reject(error);
        }
        if (mapper) {
          return resolve(mapper(result));
        } else {
          return resolve(result);
        }
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

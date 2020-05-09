import DeploymentManagerABI from './abi/deploy-manager.abi.json';
import config from '../config';

const { web3 } = window;

export function getDeploymentManagerContract() {
  return web3.eth
    .contract(DeploymentManagerABI)
    .at(config.ethereum.deploymentManagerAddress);
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

const Deployer = artifacts.require("./Deployer.sol");
const BiliraFundingContractDeployer = artifacts.require(
  "./BiliraFundingContractDeployer.sol"
);
const BiliraToken = artifacts.require("BiliraToken.sol");

const coolingPeriod = 1 * 60 * 60 * 24 * 7;
// this is already required by truffle;
const yargs = require("yargs");
const crypto = require("crypto");
const fs = require("fs");
const { sha3 } = require("web3-utils");

let config = {};
let token;
let name = ""; // empty name falls back to the contract default
let deposit = 0; // 0 falls back to the contract default
let tld = "eth";
let limitOfParticipants = 0; // 0 falls back to the contract default
const emptyAddress = "0x0000000000000000000000000000000000000000";
// eg: truffle migrate --config '{"name":"CodeUp No..", "limitOfParticipants":15}'
if (yargs.argv.config) {
  config = JSON.parse(yargs.argv.config);
}

module.exports = function(deployer) {
  if (deployer.network == "test" || deployer.network == "coverage")
    return "no need to deploy contract";
  if (config.name) {
    name = config.name;
  }

  if (config.limitOfParticipants) {
    limitOfParticipants = config.limitOfParticipants;
  }

  return deployer.then(async () => {
    if (deployer.network == "development") {
      await deployer.deploy(Token);
      token = await Token.deployed();
    }
    await deployer.deploy(EthDeployer);
    await deployer.deploy(ERC20Deployer);
    const ethDeployer = await EthDeployer.deployed();
    const erc20Deployer = await ERC20Deployer.deployed();
    await deployer.deploy(Deployer, ethDeployer.address, erc20Deployer.address);
    const mainDeployer = await Deployer.deployed();
    console.log([name, deposit, limitOfParticipants, coolingPeriod].join(","));
    // return deployer.deploy(Conference, name, deposit,limitOfParticipants, coolingPeriod, emptyAddress);
  });
};

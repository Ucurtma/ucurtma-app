const Token = require("./build/contracts/BiliraToken.json");
const ERC20FundingContract = require("./build/contracts/ERC20FundingContract.json");
const AbstractFundingContract = require("./build/contracts/AbstractFundingContract.json");
const FundingContract = require("./build/contracts/FundingContract.json");
const BiliraFundingContractDeployer = require('./build/contracts/BiliraFundingContractDeployer.json')
const Deployer = require('./build/contracts/Deployer.json')

module.exports = {
  Token,
  ERC20FundingContract,
  AbstractFundingContract,
  FundingContract,
  BiliraFundingContractDeployer,
  Deployer
};

pragma solidity ^0.5.11;

import './zeppelin/lifecycle/Destructible.sol';
import './FundingContract.sol';
import './Deployer.sol';

contract BaseDeployer is Destructible {
    struct DeployedContract {
        address deployer;
        address contractAddress;
    }

    Deployer erc20Deployer;

    DeployedContract[] deployedContracts;

    constructor(address _ethDeployer, address _erc20Deployer) public {
        erc20Deployer = Deployer(_erc20Deployer);
    }

    event NewFundingContract(
        address indexed deployedAddress,
        address indexed deployer
    );

    function deploy(
        uint256 _numberOfPlannedPayouts,
        uint256 _withdrawPeriod,
        uint256 _campaignEndTime,
        address payable __owner,
        address _tokenAddress
    ) external onlyOwner {
        if(_tokenAddress == address(0)){
          revert('Can only deploy ERC20 Funding Campaign Contract');
        }

        FundingContract c = erc20Deployer.deploy(
                _numberOfPlannedPayouts,
                _withdrawPeriod,
                _campaignEndTime,
                __owner,
                _tokenAddress,
                msg.sender
            );
        deployedContracts.push(DeployedContract(msg.sender,address(c)));
        emit NewFundingContract(address(c), msg.sender);
    }
}
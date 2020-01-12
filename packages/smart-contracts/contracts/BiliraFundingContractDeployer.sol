pragma solidity ^0.5.11;
import './ERC20FundingContract.sol';
import './FundingContract.sol';
import './Deployer.sol';

contract BiliraFundingContractDeployer is Deployer{
    function deploy(
        uint256 _numberOfPlannedPayouts,
        uint256 _withdrawPeriod,
        uint256 _campaignEndTime,
        address payable __owner,
        address _tokenAddress,
        address _adminAddress
    )external returns(FundingContract c){
        c = new ERC20FundingContract(
         _numberOfPlannedPayouts,
         _withdrawPeriod,
         _campaignEndTime,
         __owner,
         _tokenAddress
        );
    }
}
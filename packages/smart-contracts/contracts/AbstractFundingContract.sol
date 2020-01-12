pragma solidity ^0.5.11;

import './FundingContract.sol';
import './zeppelin/ownership/Ownable.sol';

contract AbstractFundingContract is FundingContract, Ownable {

  uint256 public numberOfPlannedPayouts;
  uint256 public withdrawPeriod;
  uint256 public lastWithdraw;
  bool public campaignEnded;
  uint256 public campaignEndedAt;
  bool public cancelled;
  uint256 public totalNumberOfPayoutsLeft;
  uint256 public withdrawLimit;

  modifier notCancelled {
    require(!cancelled, 'Campaign is cancelled');
    _;
  }

  modifier campaignFinished {
    require(campaignEnded, 'Campaign is still active.');
    _;
  }

  constructor(uint256 _numberOfPlannedPayouts,
    uint256 _withdrawPeriod,
    uint256 _campaignEndTime,
    address payable __owner) public {

    numberOfPlannedPayouts = _numberOfPlannedPayouts;
    withdrawPeriod = _withdrawPeriod;
    owner = __owner;
    totalNumberOfPayoutsLeft = numberOfPlannedPayouts;

    // consider the last withdraw date is the last day of campaign
    lastWithdraw = _campaignEndTime;
  }

  function canWithdraw() public view returns(bool) {
    // Check when was the last time the withdraw happened, and add withdraw period.
    require(now > lastWithdraw + withdrawPeriod, 'Should wait until the last payout day.');
    return true;
  }

  // Functions
  // AbstractFundingContract
  function withdraw() external notCancelled campaignFinished onlyOwner {
    require(canWithdraw(), 'Not allowed to withdraw');
    uint256 leftBalance = totalBalance(msg.sender);
    require(leftBalance > 0, 'Insufficient funds');
    uint256 payoutAmount = uint256(leftBalance) / totalNumberOfPayoutsLeft;
    // withdraw money and make the transfer to the owner.
    doWithdraw(msg.sender, payoutAmount);
    totalNumberOfPayoutsLeft--;
    lastWithdraw = now;
    emit PayoutWithdrawed(msg.sender, payoutAmount);
  }

  function deposit(address donator, uint256 amount) external notCancelled campaignFinished {
    doDeposit(donator, amount);
  }

  function totalBalance(address payable /* owner */) public returns (uint256) {
    revert('This must be implemented in the inheriting class');
  }

  function doWithdraw(address payable /* owner */, uint256 /* amount */) internal {
    revert('This must be implemented in the inheriting class');
  }

  function doDeposit(address /* donator */, uint256 /* amount */) internal { 
    revert('This must be implemented in the inheriting class');
  }
}
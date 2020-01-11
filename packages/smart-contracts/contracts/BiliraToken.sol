pragma solidity ^0.5.11;

import './zeppelin/token/ERC20/ERC20.sol';
import './zeppelin/token/ERC20/ERC20Detailed.sol';

contract AToken is ERC20, ERC20Detailed {
    string private _name = 'BiLira is a stablecoin backed 1:1 by the Turkish Lira.';
    string private _symbol = 'TRYb';
    uint8 private _decimals = 6;

    address account = msg.sender;
    uint value = 1000000 ether;

    constructor() ERC20Detailed( _name, _symbol, _decimals) public {
        _mint(account, value);
    }
}
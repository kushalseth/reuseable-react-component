pragma solidity ^0.4.24;

import './Ownable.sol';
import './SafeMath.sol';

contract CarToken is Ownable{

    using SafeMath for uint256;
    uint public totalTokens;
    mapping(address => uint) public balances;
    uint public etherBalance;
    uint PRICE = 1 * (1 ether);

    event SendTokens(address indexed sender, address indexed receiver, uint amount);

    constructor(uint _initialBalance) payable public {
        totalTokens = _initialBalance;
        owner = msg.sender;
        etherBalance = msg.value;
        balances[this] = _initialBalance;
        if(msg.value > 0) {
            uint initialtokenToTransfer = (1 / PRICE) * msg.value;
            balances[msg.sender].add(initialtokenToTransfer);
            balances[this].sub(initialtokenToTransfer);
        }
    }

    function addEthersToCar() payable onlyOwner  public  {
        uint tokenToTransfer = (1 / PRICE) * msg.value;
        balances[this].sub(tokenToTransfer);
        balances[msg.sender].add(tokenToTransfer);
        etherBalance.add(msg.value);
        emit SendTokens(msg.sender, this, msg.value);
    }

    function withdrawEthersFromCar(uint carTokens) payable onlyOwner public {
        uint transferAmount = PRICE * carTokens;
        require(etherBalance > transferAmount);
        msg.sender.transfer(transferAmount);
        etherBalance.sub(transferAmount);
        emit SendTokens(msg.sender, this, transferAmount);
    }

    function tokenBalance() onlyOwner public view returns(uint) {
        return balances[this];
    }
}

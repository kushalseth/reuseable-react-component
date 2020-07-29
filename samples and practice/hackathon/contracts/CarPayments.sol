pragma solidity ^0.4.24;

import './CarToken.sol';

contract CarPayments is CarToken {
    constructor(uint _initialBalance) CarToken(_initialBalance) payable public {

    }

    function ScanRFID() payable public returns(bool) {
        bool isValid;
        if(etherBalance > msg.value) {
            isValid = true;
        }
        return isValid;
    }

    //TODO: Need to check, if the requested amount is correct demand
    function MakePayment() payable public {
        require(etherBalance > msg.value);
        msg.sender.transfer(msg.value);
        etherBalance.sub(msg.value);
        emit SendTokens(msg.sender, this, msg.value);
    }
}

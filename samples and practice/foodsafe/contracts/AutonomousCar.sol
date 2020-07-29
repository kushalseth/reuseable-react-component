pragma solidity v0.4.23;

contract AutonomousCar 
{

    address public AutonomousCarAddress;
    mapping(address => uint) public carBalance;

    contructor AutonomousCar(uint initialBalance) 
    {
        carBalance[this.address] = initialBalance;
    }
}


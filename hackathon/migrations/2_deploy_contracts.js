// var CarPayments = artifacts.require("./CarPayments.sol");

// module.exports = function (deployer) {
//     // pass parameter 'initialSupply' = 1000 tokens initially.
//     // these will be assigned to account[0] by the contract constructor 
//     // once contract created and published
//     deployer.deploy(CarPayments, 1000);
// };


var SafeMath = artifacts.require("./SafeMath.sol");
var CarPayments =  artifacts.require("./CarPayments.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, CarPayments);
  deployer.deploy(CarPayments,
    "1090" // TODO : Update this value
    );
};


// ctrl + K + C\ ctrl + M + U
//var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var GBToken = artifacts.require("./GBToken.sol");

module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);
  deployer.deploy(GBToken, 375);
};

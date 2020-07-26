var GBToken = artifacts.require("./GBToken.sol");

module.exports = function (deployer) {
    deployer.deploy(GBToken, 1000);
};
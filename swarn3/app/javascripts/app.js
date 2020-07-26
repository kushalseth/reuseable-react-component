// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
const swarm = require("swarm-js").at("http://swarm-gateways.net");

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      self.refreshBalance();
    });
    document.getElementById("submit2").addEventListener("click", function(e) {
      const file = "test file"; // could also be an Uint8Array of binary data
      swarm.upload({e}).then(hash => {
        alert("Uploaded file. Address:", hash);
      })
    });
    

    document.getElementById("filetoUpload").addEventListener("change", function(e) {

      debugger;
      /*
      swarmPut('Hello World', 'application/text', function (err, ret) {
        debugger
        
        if (err) {
          console.log('Swarm put failed: ', err)
          return
        }
        console.log('Added to swarm: ', ret)
        
        swarmGet(ret, function (err, ret) {
          if (err) {
            console.log('Swarm get failed: ', err)
            return
          }
          console.log('Retrieved from swarm: ', ret)
        })
      })
      */
      /*
      swarm.upload({ pick: "file" }).then(hash => {
        alert("Uploaded file. Address:", hash);
      })
      */

      var fileTypes = ['doc', 'docx', 'pdf', 'odt', 'html', 'rtf', 'txt'];
      if (e.target.files && e.target.files[0]) {
        console.log(e);
          
          var extension = e.target.files[0].name.split('.').pop().toLowerCase();
          if (fileTypes.indexOf(extension) > -1) {
            console.log(e.target.files[0]);
            App.upload(e); 
          }
          else {
              alert("Format is not supported.");
          }
          
      }
    });

  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  refreshBalance: function() {
    var self = this;

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  sendCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: account});
    }).then(function() {
      self.setStatus("Transaction complete!");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  },

  upload: function(file) {
    debugger;

    const dir = {
      "/foo.txt": {type: "text/plain", data: "file 0"},
      "/bar.txt": {type: "text/plain", data: "file 1"}
    };

    web3.bzz.upload({
      path: "/app",      // path to data / file / directory
      kind: "directory",           // could also be "file" or "data"
      defaultFile: "/index.html"   // optional, and only for kind === "directory"
    }).then(hash => {
      alert("Uploaded file. Address:", hash);
    }).catch(console.log);


    //console.log(file); mozFullPath
    //swarm.upload({path: document.getElementById("filetoUpload").value, kind: "file"}).then(hash => {
    swarm.upload({ pick: "file" }).then(hash => {
      alert("Uploaded file. Address:", hash);
    })
  }

};

var swarmPut = function (buf, enc, cb) {
  debugger;
  web3.bzz.put(buf, enc, function (err, ret) {
    if (err) {
      return cb(err)
    }
    cb(null, ret)
  })
}

var swarmGet = function (key, cb) {
  web3.bzz.get('bzz://' + key, function (err, ret) {
    if (err) {
      return cb(err)
    }
    cb(null, ret.content)
  })
}

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});

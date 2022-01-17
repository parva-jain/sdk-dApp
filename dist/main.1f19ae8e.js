// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/pan-sdk/src/common/utils.js":[function(require,module,exports) {
const UTILS = {
  accounts: async (web3) => {
    return await web3.eth.getAccounts();
  },
  PNDC_instance: async (web3, abi) => {
    return new web3.eth.Contract(abi, UTILS.PNDC_ADDRESS());
  },
  TOKENFACTORY_instance: async (web3, abi) => {
    return new web3.eth.Contract(abi, UTILS.TOKENFACTORY_ADDRESS());
  },
  TOKENERC721_instance: async (web3, abi, collectionAddress) => {
    return new web3.eth.Contract(abi, collectionAddress);
  },
  PNDC_ADDRESS: () => {
    return "0xEC123143a48c2E002889661660855fD7724a1f42";
  },
  TOKENFACTORY_ADDRESS: () => {
    return "0x092bEe49A006D4Fb2bDd17903604978DF0660B89";
  }

};

module.exports = UTILS;

},{}],"node_modules/pan-sdk/abi/pndc.js":[function(require,module,exports) {
const PNDC_ABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "address payable",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint96",
              name: "value",
              type: "uint96",
            },
          ],
          indexed: false,
          internalType: "struct LibShare.Share[]",
          name: "royalties",
          type: "tuple[]",
        },
      ],
      name: "RoyaltiesSetForTokenId",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "royaltiesByTokenId",
      outputs: [
        {
          internalType: "address payable",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint96",
          name: "value",
          type: "uint96",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "string",
          name: "uri",
          type: "string",
        },
        {
          components: [
            {
              internalType: "address payable",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint96",
              name: "value",
              type: "uint96",
            },
          ],
          internalType: "struct LibShare.Share[]",
          name: "royalties",
          type: "tuple[]",
        },
      ],
      name: "safeMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_totalNft",
          type: "uint256",
        },
        {
          internalType: "string[]",
          name: "_uri",
          type: "string[]",
        },
        {
          components: [
            {
              internalType: "address payable",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint96",
              name: "value",
              type: "uint96",
            },
          ],
          internalType: "struct LibShare.Share[][]",
          name: "royaltiesSet",
          type: "tuple[][]",
        },
      ],
      name: "batchMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "getRoyalties",
      outputs: [
        {
          components: [
            {
              internalType: "address payable",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint96",
              name: "value",
              type: "uint96",
            },
          ],
          internalType: "struct LibShare.Share[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
  ];
module.exports = {PNDC_ABI};

},{}],"node_modules/pan-sdk/src/nft/mint.js":[function(require,module,exports) {
const UTILS = require("../common/utils");
const { PNDC_ABI } = require("../../abi/pndc");

const mint = async (web3, minterAddress, tokenURI, royalties) => {
  const PNDC_instance = await UTILS.PNDC_instance(web3, PNDC_ABI);

  let result = await PNDC_instance.methods
    .safeMint(minterAddress, tokenURI, royalties)
    .send({ from: minterAddress });

  console.log(result);
  return result;
};

module.exports = { mint };

},{"../common/utils":"node_modules/pan-sdk/src/common/utils.js","../../abi/pndc":"node_modules/pan-sdk/abi/pndc.js"}],"node_modules/pan-sdk/abi/tokenfactory.js":[function(require,module,exports) {
const TokenFactory_ABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "previousAdmin",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newAdmin",
          type: "address",
        },
      ],
      name: "AdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "time",
          type: "uint256",
        },
      ],
      name: "AuctionStarted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "beacon",
          type: "address",
        },
      ],
      name: "BeaconUpgraded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "BidExecuted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "saleId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "sellerAddress",
              type: "address",
            },
            {
              internalType: "address",
              name: "buyerAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "withdrawn",
              type: "bool",
            },
          ],
          indexed: false,
          internalType: "struct LibBid.BidOrder",
          name: "bid",
          type: "tuple",
        },
      ],
      name: "BidOrderReturn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_tokenAddress",
          type: "address",
        },
      ],
      name: "ERC721Deployed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "saleId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "collectionAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "directSale",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "bidSale",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "status",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "bidStartTime",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "bidEndTime",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "mintedBy",
              type: "address",
            },
            {
              internalType: "address",
              name: "currentOwner",
              type: "address",
            },
          ],
          indexed: false,
          internalType: "struct LibMeta.TokenMeta",
          name: "data",
          type: "tuple",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "TokenMetaReturn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "implementation",
          type: "address",
        },
      ],
      name: "Upgraded",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_saleId",
          type: "uint256",
        },
      ],
      name: "Bid",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "Bids",
      outputs: [
        {
          internalType: "uint256",
          name: "saleId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "sellerAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "buyerAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "withdrawn",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_saleId",
          type: "uint256",
        },
      ],
      name: "BuyNFT",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_collectionAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_bidTime",
          type: "uint256",
        },
      ],
      name: "SellNFT_byBid",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "_tokenIds",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "_tokenMeta",
      outputs: [
        {
          internalType: "uint256",
          name: "saleId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "collectionAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "directSale",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "bidSale",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "status",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "bidStartTime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "bidEndTime",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "mintedBy",
          type: "address",
        },
        {
          internalType: "address",
          name: "currentOwner",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_saleId",
          type: "uint256",
        },
      ],
      name: "cancelSale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "collectionIdTracker",
      outputs: [
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "collectionToOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "collections",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
        {
          internalType: "address",
          name: "contractAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_saleId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_bidOrderID",
          type: "uint256",
        },
      ],
      name: "executeBidOrder",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC721Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "ownerToCollections",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_collectionAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
      ],
      name: "sellNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address",
        },
      ],
      name: "upgradeTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "upgradeToAndCall",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_saleId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_bidId",
          type: "uint256",
        },
      ],
      name: "withdrawBidMoney",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_address",
          type: "address",
        },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          components: [
            {
              internalType: "address payable",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint96",
              name: "value",
              type: "uint96",
            },
          ],
          internalType: "struct LibShare.Share[]",
          name: "royalties",
          type: "tuple[]",
        },
      ],
      name: "deployERC721",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  module.exports = {TokenFactory_ABI};

},{}],"node_modules/pan-sdk/src/order/buy.js":[function(require,module,exports) {
const UTILS = require("../common/utils");
const { TokenFactory_ABI } = require("../../abi/tokenfactory");

const buyNFT = async (web3, tokenId, buyerAddress, amount) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );

  let result = await tokenFactoryInstance.methods
    .BuyNFT(tokenId)
    .send({ from: buyerAddress, value: amount });

  console.log(result);
};

module.exports = {
  buyNFT,
};

},{"../common/utils":"node_modules/pan-sdk/src/common/utils.js","../../abi/tokenfactory":"node_modules/pan-sdk/abi/tokenfactory.js"}],"node_modules/pan-sdk/src/order/sell.js":[function(require,module,exports) {
const UTILS = require("../common/utils");
const { PNDC_ABI } = require("../../abi/pndc");
const { TokenFactory_ABI } = require("../../abi/tokenfactory");

const sellNFT = async (web3, tokenId, price, sellerAddress) => {
  const PNDC_instance = await UTILS.PNDC_instance(web3, PNDC_ABI);

  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );

  await PNDC_instance.methods
    .approve(UTILS.TOKENFACTORY_ADDRESS(), tokenId)
    .send({ from: sellerAddress });
  console.log("approved");
  let result = await tokenFactoryInstance.methods
    .sellNFT(UTILS.PNDC_ADDRESS(), tokenId, price)
    .send({ from: sellerAddress });

  console.log(result);

  return result;
};

const sellNFTbyBid = async (web3, tokenId, price, ownerAddress, bidTime) => {
  const PNDC_instance = await UTILS.PNDC_instance(web3, PNDC_ABI);
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );

  await PNDC_instance.methods
    .approve(UTILS.TOKENFACTORY_ADDRESS(), tokenId)
    .send({ from: ownerAddress });
  let result = await tokenFactoryInstance.methods
    .SellNFT_byBid(UTILS.PNDC_ADDRESS(), tokenId, price, bidTime)
    .send({ from: ownerAddress });

  console.log(result);
  return result;
};

const cancelSale = async (web3, ownerAddress, saleId) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );

  let result = await tokenFactoryInstance.methods
    .cancelSale(saleId)
    .send({ from: ownerAddress });

  console.log(result);
  return result;
};

module.exports = { sellNFT, sellNFTbyBid, cancelSale };

},{"../common/utils":"node_modules/pan-sdk/src/common/utils.js","../../abi/pndc":"node_modules/pan-sdk/abi/pndc.js","../../abi/tokenfactory":"node_modules/pan-sdk/abi/tokenfactory.js"}],"node_modules/pan-sdk/src/order/Bid.js":[function(require,module,exports) {
const UTILS = require("../common/utils");
const { TokenFactory_ABI } = require("../../abi/tokenfactory");

const bid = async (web3, tokenId, bidderAddress, price) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );

  let result = await tokenFactoryInstance.methods
    .Bid(tokenId)
    .send({ from: bidderAddress, value: price });

  console.log(result);
  return result;
};

const acceptBid = async (web3, tokenId, bidId, ownerAddress) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI,
    UTILS.PNDC_ADDRESS()
  );
  let result = await tokenFactoryInstance.methods
    .executeBidOrder(tokenId, bidId)
    .send({ from: ownerAddress });

  console.log(result);
  return result;
};

const withdrawBid = async (web3, tokenId, bidId, bidderAddress) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI,
    UTILS.PNDC_ADDRESS()
  );

  let result = await tokenFactoryInstance.methods
    .withdrawBidMoney(tokenId, bidId)
    .send({ from: bidderAddress });

  console.log(result);
  return result;
};

module.exports = {
  bid,
  acceptBid,
  withdrawBid,
};

},{"../common/utils":"node_modules/pan-sdk/src/common/utils.js","../../abi/tokenfactory":"node_modules/pan-sdk/abi/tokenfactory.js"}],"node_modules/pan-sdk/abi/tokenerc721.js":[function(require,module,exports) {
const TokenERC721_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "value",
            type: "uint96",
          },
        ],
        indexed: false,
        internalType: "struct LibShare.Share[]",
        name: "royalties",
        type: "tuple[]",
      },
    ],
    name: "RoyaltiesSetForCollection",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "value",
            type: "uint96",
          },
        ],
        indexed: false,
        internalType: "struct LibShare.Share[]",
        name: "royalties",
        type: "tuple[]",
      },
    ],
    name: "RoyaltiesSetForTokenId",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "collectionRoyalties",
    outputs: [
      {
        internalType: "address payable",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "value",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "royaltiesByTokenId",
    outputs: [
      {
        internalType: "bool",
        name: "set",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "set",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "address payable",
                name: "account",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "value",
                type: "uint96",
              },
            ],
            internalType: "struct LibShare.Share[]",
            name: "royalties",
            type: "tuple[]",
          },
        ],
        internalType: "struct TokenERC721.RoyaltiesSet",
        name: "royaltiesSet",
        type: "tuple",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalNft",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "_uri",
        type: "string[]",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "set",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "address payable",
                name: "account",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "value",
                type: "uint96",
              },
            ],
            internalType: "struct LibShare.Share[]",
            name: "royalties",
            type: "tuple[]",
          },
        ],
        internalType: "struct TokenERC721.RoyaltiesSet",
        name: "royaltiesSet",
        type: "tuple",
      },
    ],
    name: "batchMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "set",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "address payable",
                name: "account",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "value",
                type: "uint96",
              },
            ],
            internalType: "struct LibShare.Share[]",
            name: "royalties",
            type: "tuple[]",
          },
        ],
        internalType: "struct TokenERC721.RoyaltiesSet",
        name: "royaltiesSet",
        type: "tuple",
      },
    ],
    name: "setRoyaltiesByTokenId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "value",
            type: "uint96",
          },
        ],
        internalType: "struct LibShare.Share[]",
        name: "royalties",
        type: "tuple[]",
      },
    ],
    name: "setRoyaltiesForCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getRoyalties",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "value",
            type: "uint96",
          },
        ],
        internalType: "struct LibShare.Share[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

module.exports = { TokenERC721_ABI };

},{}],"node_modules/pan-sdk/src/collection/collection.js":[function(require,module,exports) {
const UTILS = require("../common/utils");
const {PNDC_ABI} = require('../../abi/pndc');
const {TokenFactory_ABI} = require('../../abi/tokenfactory');
const {TokenERC721_ABI} = require("../../abi/tokenerc721");

const deployCollection = async (
  web3,
  deployerAddress,
  name,
  symbol,
  description,
  royalties
) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );

  let result = await tokenFactoryInstance.methods
    .deployERC721(name, symbol, description, [[deployerAddress, royalties]])
    .send({ from: deployerAddress });

  console.log(result);
  return result;
};

const createInstance = async (web3, collectionAddress) => {
  const tokenERC721Instance = await UTILS.TOKENERC721_instance(
    web3,
    TokenERC721_ABI,
    collectionAddress
  );

  console.log(tokenERC721Instance);
  return tokenERC721Instance;
};

const mint = async (
  web3,
  collectionAddress,
  tokenURI,
  minterAddress,
  royalties
) => {
  const tokenERC721Instance = await createInstance(web3, collectionAddress);

  const result = await tokenERC721Instance.methods
    .safeMint(minterAddress, tokenURI, [true,[[minterAddress,royalties]]])
    .send({ from: minterAddress });

  console.log(result);
};

const sellNFT = async (
  web3,
  collectionAddress,
  tokenId,
  price,
  sellerAddress
) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );
  const tokenERC721Instance = await createInstance(web3, collectionAddress);

  await tokenERC721Instance.methods
    .approve(UTILS.TOKENFACTORY_ADDRESS(), tokenId)
    .send({ from: sellerAddress });

  const result = await tokenFactoryInstance.methods
    .sellNFT(collectionAddress, tokenId, price)
    .send({ from: sellerAddress });

  console.log(result);
  return result;
};

const sellNFTbyBid = async (
  web3,
  collectionAddress,
  tokenId,
  price,
  ownerAddress,
  bidTime
) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );
  const tokenERC721Instance = await createInstance(web3, collectionAddress);

  await tokenERC721Instance.methods
    .approve(UTILS.TOKENFACTORY_ADDRESS(), tokenId)
    .send({ from: ownerAddress });
  const result = await tokenFactoryInstance.methods
    .SellNFT_byBid(collectionAddress, tokenId, price, bidTime)
    .send({ from: ownerAddress });

  console.log(result);
  return result;
};

const cancelSale = async (web3, ownerAddress, saleId) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );
  // const tokenERC721Instance = await createInstance(web3, collectionAddress);

  const result = await tokenFactoryInstance.methods
    .cancelSale(saleId)
    .send({ from: ownerAddress });

  console.log(result);
};

const buyNFT = async (web3, tokenId, buyerAddress, amount) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );
  // const tokenERC721Instance = await createInstance(web3, collectionAddress);

  const result = await tokenFactoryInstance.methods
    .BuyNFT(tokenId)
    .send({ from: buyerAddress, value: amount });

  console.log(result);
  return result;
};

const bid = async (web3, tokenId, bidderAddress, price) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );

  const result = await tokenFactoryInstance.methods
    .Bid(tokenId)
    .send({ from: bidderAddress, value: price });

  console.log(result);
  return result;
};

const acceptBid = async (web3, tokenId, bidId, ownerAddress) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );
  const result = await tokenFactoryInstance.methods
    .executeBidOrder(tokenId, bidId)
    .send({ from: ownerAddress });

  console.log(result);
};

const withdrawBid = async (web3, tokenId, bidId, bidderAddress) => {
  const tokenFactoryInstance = await UTILS.TOKENFACTORY_instance(
    web3,
    TokenFactory_ABI
  );

  const result = await tokenFactoryInstance.methods
    .withdrawBidMoney(tokenId, bidId)
    .send({ from: bidderAddress });

  console.log(result);
  return result;
};

module.exports = {
  deployCollection,
  createInstance,
  mint,
  sellNFT,
  sellNFTbyBid,
  cancelSale,
  buyNFT,
  bid,
  acceptBid,
  withdrawBid,
};

},{"../common/utils":"node_modules/pan-sdk/src/common/utils.js","../../abi/pndc":"node_modules/pan-sdk/abi/pndc.js","../../abi/tokenfactory":"node_modules/pan-sdk/abi/tokenfactory.js","../../abi/tokenerc721":"node_modules/pan-sdk/abi/tokenerc721.js"}],"node_modules/pan-sdk/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPandoraSDK = createPandoraSDK;

const {
  mint
} = require("./src/nft/mint");

const Buy = require("./src/order/buy");

const Sell = require("./src/order/sell");

const Bid = require("./src/order/Bid");

const Collection = require("./src/collection/collection");

function createPandoraSDK() {
  return {
    order: {
      sellNFT: Sell.sellNFT,
      sellNFTByBid: Sell.sellNFTbyBid,
      cancelSale: Sell.cancelSale,
      buyNFT: Buy.buyNFT,
      acceptBid: Bid.acceptBid,
      bid: Bid.bid,
      withdrawBid: Bid.withdrawBid
    },
    nft: {
      mint: mint
    },
    collection: {
      createCollection: Collection.deployCollection,
      createInstance: Collection.createInstance,
      mint: Collection.mint,
      sellNFT: Collection.sellNFT,
      sellNFTByBid: Collection.sellNFTbyBid,
      cancelSale: Collection.cancelSale,
      buyNFT: Collection.buyNFT,
      acceptBid: Collection.acceptBid,
      bid: Collection.bid,
      withdrawBid: Collection.withdrawBid
    }
  };
}

;
},{"./src/nft/mint":"node_modules/pan-sdk/src/nft/mint.js","./src/order/buy":"node_modules/pan-sdk/src/order/buy.js","./src/order/sell":"node_modules/pan-sdk/src/order/sell.js","./src/order/Bid":"node_modules/pan-sdk/src/order/Bid.js","./src/collection/collection":"node_modules/pan-sdk/src/collection/collection.js"}],"main.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SDK = require("pan-sdk");

var sdk = SDK.createPandoraSDK();

init = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!window.ethereum) {
              _context.next = 7;
              break;
            }

            window.web3 = new Web3(window.ethereum);
            _context.next = 4;
            return window.ethereum.enable();

          case 4:
            console.log("Connected");
            _context.next = 8;
            break;

          case 7:
            alert("Metamask not found");

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

mintNft = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context2.sent;
            _context2.next = 5;
            return sdk.nft.mint(web3, accounts[0], itemURI.value, [[accounts[0], 100]]);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function mintNft() {
    return _ref2.apply(this, arguments);
  };
}();

sellNft = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context3.sent;
            _context3.next = 5;
            return sdk.order.sellNFT(web3, sellItemTokenId.value, sellItemPrice.value, accounts[0]);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function sellNft() {
    return _ref3.apply(this, arguments);
  };
}();

auctionNft = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context4.sent;
            _context4.next = 5;
            return sdk.order.sellNFTByBid(web3, auctionItemTokenId.value, auctionItemPrice.value, accounts[0], auctionItemTime.value);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function auctionNft() {
    return _ref4.apply(this, arguments);
  };
}();

buyNft = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context5.sent;
            _context5.next = 5;
            return sdk.order.buyNFT(web3, buyItemSaleId.value, accounts[0], buyItemAmmount.value);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function buyNft() {
    return _ref5.apply(this, arguments);
  };
}();

bid = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context6.sent;
            _context6.next = 5;
            return sdk.order.bid(web3, BidItemSaleId.value, accounts[0], BidItemPrice.value);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function bid() {
    return _ref6.apply(this, arguments);
  };
}();

executeBid = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context7.sent;
            _context7.next = 5;
            return sdk.order.acceptBid(web3, ExecuteSaleId.value, ExecuteBidId.value, accounts[0]);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function executeBid() {
    return _ref7.apply(this, arguments);
  };
}();

withdrawBidMoney = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context8.sent;
            _context8.next = 5;
            return sdk.order.withdrawBid(web3, WithdrawSaleId.value, WithdrawBidId.value, accounts[0]);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function withdrawBidMoney() {
    return _ref8.apply(this, arguments);
  };
}();

cancelSale = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context9.sent;
            _context9.next = 5;
            return sdk.order.cancelSale(web3, accounts[0], CancelSaleId.value);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function cancelSale() {
    return _ref9.apply(this, arguments);
  };
}();

createCollection = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context10.sent;
            _context10.next = 5;
            return sdk.collection.createCollection(web3, accounts[0], collectionName.value, collectionSymbol.value, collectionDescription.value, collectionRoyalties.value);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function createCollection() {
    return _ref10.apply(this, arguments);
  };
}();

mintInCollection = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context11.sent;
            _context11.next = 5;
            return sdk.collection.mint(web3, collectionAddress.value, tokenURI.value, accounts[0], royalties.value);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function mintInCollection() {
    return _ref11.apply(this, arguments);
  };
}();

sellInCollection = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context12.sent;
            _context12.next = 5;
            return sdk.collection.sellNFT(web3, sellCollectionAddress.value, sellTokenId.value, sellPrice.value, accounts[0]);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function sellInCollection() {
    return _ref12.apply(this, arguments);
  };
}();

buyInCollection = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context13.sent;
            _context13.next = 5;
            return sdk.collection.buyNFT(web3, buyTokenId.value, accounts[0], buyPrice.value);

          case 5:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function buyInCollection() {
    return _ref13.apply(this, arguments);
  };
}();

sellNFTByBidInCollection = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context14.sent;
            _context14.next = 5;
            return sdk.collection.sellNFTByBid(web3, sellByBidCollectionAddress.value, sellByBidTokenId.value, sellByBidPrice.value, accounts[0], sellByBidBidTime.value);

          case 5:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function sellNFTByBidInCollection() {
    return _ref14.apply(this, arguments);
  };
}();

bidInCollection = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context15.sent;
            _context15.next = 5;
            return sdk.collection.bid(web3, bidCollectionSaleId.value, accounts[0], bidCollectionPrice.value);

          case 5:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function bidInCollection() {
    return _ref15.apply(this, arguments);
  };
}();

acceptBidInCollection = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context16.sent;
            _context16.next = 5;
            return sdk.collection.acceptBid(web3, acceptBidSaleId.value, acceptBidId.value, accounts[0]);

          case 5:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));

  return function acceptBidInCollection() {
    return _ref16.apply(this, arguments);
  };
}();

withdrawBidInCollection = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context17.sent;
            _context17.next = 5;
            return sdk.collection.withdrawBid(web3, withdrawBidSaleId.value, withdrawBidId.value, accounts[0]);

          case 5:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));

  return function withdrawBidInCollection() {
    return _ref17.apply(this, arguments);
  };
}();

cancelSaleInCollection = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context18.sent;
            _context18.next = 5;
            return sdk.collection.cancelSale(web3, accounts[0], cancelSaleId.value);

          case 5:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));

  return function cancelSaleInCollection() {
    return _ref18.apply(this, arguments);
  };
}();

var itemURI = document.getElementById("txtCreateItemURI");
var createItemButton = document.getElementById("btnCreateItem");
createItemButton.onclick = mintNft;
var sellItemTokenId = document.getElementById("numSellItemTokenId");
var sellItemPrice = document.getElementById("numSellItemPrice");
var sellItemButton = document.getElementById("btnSellItem");
sellItemButton.onclick = sellNft;
var auctionItemTokenId = document.getElementById("numAuctionItemTokenId");
var auctionItemPrice = document.getElementById("numAuctionItemPrice");
var auctionItemTime = document.getElementById("numAuctionItemTime");
var auctionItemButton = document.getElementById("btnAuctionItem");
auctionItemButton.onclick = auctionNft;
var buyItemSaleId = document.getElementById("numBuyItem");
var buyItemAmmount = document.getElementById("numBuyItemAmmount");
numBuyItemAmmount;
var buyItemButton = document.getElementById("btnBuyItem");
buyItemButton.onclick = buyNft;
var BidItemSaleId = document.getElementById("numBidItemSaleId");
var BidItemPrice = document.getElementById("numBidItemPrice");
var BidItemButton = document.getElementById("btnBidItem");
BidItemButton.onclick = bid;
var ExecuteSaleId = document.getElementById("numExecuteSaleId");
var ExecuteBidId = document.getElementById("numExecuteBidId");
var ExecuteBidItemButton = document.getElementById("btnExecuteBidItem");
ExecuteBidItemButton.onclick = executeBid;
var WithdrawSaleId = document.getElementById("numWithdrawSaleId");
var WithdrawBidId = document.getElementById("numWithdrawBidId");
var WithdrawBidItemButton = document.getElementById("btnWithdrawBidItem");
WithdrawBidItemButton.onclick = withdrawBidMoney;
var CancelSaleId = document.getElementById("numCancelSaleId");
var CancelItemSaleButton = document.getElementById("btnCancelItemSale");
CancelItemSaleButton.onclick = cancelSale;
var collectionName = document.getElementById("collectionName");
var collectionSymbol = document.getElementById("collectionSymbol");
var collectionDescription = document.getElementById("collectionDescription");
var collectionRoyalties = document.getElementById("collectionRoyalties");
var CollectionButton = document.getElementById("btnCreateCollection");
CollectionButton.onclick = createCollection;
var collectionAddress = document.getElementById("collectionAddress");
var tokenURI = document.getElementById("tokenURI");
var royalties = document.getElementById("royalties");
var btnMintInCollection = document.getElementById("btnMintInCollection");
btnMintInCollection.onclick = mintInCollection;
var sellCollectionAddress = document.getElementById("sellCollectionAddress");
var sellTokenId = document.getElementById("sellTokenId");
var sellPrice = document.getElementById("sellPrice");
var btnSellInCollection = document.getElementById("btnSellInCollection");
btnSellInCollection.onclick = sellInCollection;
var buyTokenId = document.getElementById("buyTokenId");
var buyPrice = document.getElementById("buyPrice");
var btnBuyInCollection = document.getElementById("btnBuyInCollection");
btnBuyInCollection.onclick = buyInCollection;
var sellByBidCollectionAddress = document.getElementById("sellByBidCollectionAddress");
var sellByBidTokenId = document.getElementById("sellByBidTokenId");
var sellByBidPrice = document.getElementById("sellByBidPrice");
var sellByBidBidTime = document.getElementById("sellByBidBidTime");
var btnSellByBidInCollection = document.getElementById("btnSellByBidinCollection");
btnSellByBidInCollection.onclick = sellNFTByBidInCollection;
var bidCollectionSaleId = document.getElementById("bidCollectionSaleId");
var bidCollectionPrice = document.getElementById("bidCollectionPrice");
var btnBidInCollection = document.getElementById("btnBidInCollection");
btnBidInCollection.onclick = bidInCollection;
var acceptBidSaleId = document.getElementById("acceptBidSaleId");
var acceptBidId = document.getElementById("acceptBidId");
var btnAcceptBidInCollection = document.getElementById("btnAcceptBidInCollection");
btnAcceptBidInCollection.onclick = acceptBidInCollection;
var withdrawBidSaleId = document.getElementById("withdrawBidSaleId");
var withdrawBidId = document.getElementById("withdrawBidId");
var btnWithdrawBidInCollection = document.getElementById("btnWithdrawBidInCollection");
btnWithdrawBidInCollection.onclick = withdrawBidInCollection;
var cancelSaleId = document.getElementById("cancelSaleId");
var btnCancelSaleInCollection = document.getElementById("btnCancelSaleInCollection");
btnCancelSaleInCollection.onclick = cancelSaleInCollection;
init();
},{"pan-sdk":"node_modules/pan-sdk/index.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56155" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map
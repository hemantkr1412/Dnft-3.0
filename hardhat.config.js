require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY_MUMBAI = process.env.PRIVATE_KEY_MUMBAI;
const PRIVATE_KEY_LOCALHOST = process.env.PRIVATE_KEY_LOCALHOST;
module.exports = {
  solidity: "0.8.17",
  networks:{
    mumbai:{
      url:RPC_URL,
      accounts:[PRIVATE_KEY_MUMBAI],
      chainId:80001,
    },
    localhost:{
      url:"HTTP://127.0.0.1:7545",
      chainId:1337,
      accounts:[PRIVATE_KEY_LOCALHOST],
      
      
    }
  }
};

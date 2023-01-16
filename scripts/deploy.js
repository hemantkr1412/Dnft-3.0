const {ethers} = require("hardhat");

async function main() {
  const contract = await ethers.getContractFactory("DNFT");
  console.log("Contract is deploying....");
  const contractDep = await contract.deploy();
  await contractDep.deployed();
  const contractAddress =  contractDep.address;
  console.log(`Contract address is: ${contractAddress}`);
  // console.log(`Txn Hash is ${contractDep.hash});
}

//contract address : 0x4eCB446FAee0120f5EF1DB3c9c7cD8B7E6A6a457...MUMBAI

main().then(process.exitCode = 0)
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

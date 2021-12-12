const { ethers } = require("hardhat");

async function main() {
    const Sprecher = await ethers.getContractFactory("Sprecher");
    const sprecher = await Sprecher.deploy();
  
    console.log("Sprecher deployed:", sprecher.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
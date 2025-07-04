// Simple deploy script for ElevatedMinterBurner.sol
// Usage: npx hardhat run scripts/deployElevated.js --network <network>

const hre = require('hardhat');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    const tokenAddress = '0xEe6449d61Fe456Bd279Bd0a3462Ce458457d126a';
    // Deploy ElevatedMinterBurner
    const ElevatedMinterBurner = await hre.ethers.getContractFactory('ElevatedMinterBurner');
    const elevated = await ElevatedMinterBurner.deploy(tokenAddress, deployer.address);
    await elevated.deployed();
    console.log('ElevatedMinterBurner deployed to:', elevated.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

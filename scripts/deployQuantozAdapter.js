// Simple deploy script for ElevatedMinterBurner.sol
// Usage: npx hardhat run scripts/deployElevated.js --network <network>

const hre = require('hardhat');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    // PDUMMY - ????
    const tokenAddress = '...';
    const dvnAddress = '...';
    
    // Deploy QuantozMintBurnOFTAdapter
    const QuantozOFTAdapter = await hre.ethers.getContractFactory('QuantozAdapter');
    const quantozOFTAdapter = await QuantozOFTAdapter.deploy(
        tokenAddress,
        dvnAddress,
        deployer.address // delegateAddress
    );
    await quantozOFTAdapter.deployed();
    console.log('QuantozOFTAdapter deployed to:', quantozOFTAdapter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

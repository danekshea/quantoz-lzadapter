// Simple deploy script for ElevatedMinterBurner.sol
// Usage: npx hardhat run scripts/deployElevated.js --network <network>

const hre = require('hardhat');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    // PDUMMY - 0x92d18ce12d418a2d0b6d61a60b0a71081febad60
    const tokenAddress = '0x92d18ce12d418a2d0b6d61a60b0a71081febad60';
    const elevatedAddress = '...';
    const dvnAddress = '...';
    // Deploy QuantozMintBurnOFTAdapter
    const QuantozMintBurnOFTAdapter = await hre.ethers.getContractFactory('QuantozMintBurnOFTAdapter');
    const quantozMintBurnOFTAdapter = await QuantozMintBurnOFTAdapter.deploy(
        tokenAddress,
        elevatedAddress,
        dvnAddress,
        deployer.address
    );
    await quantozMintBurnOFTAdapter.deployed();
    console.log('QuantozMintBurnOFTAdapter deployed to:', quantozMintBurnOFTAdapter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

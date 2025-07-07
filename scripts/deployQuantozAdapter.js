// Simple deploy script for ElevatedMinterBurner.sol
// Usage: npx hardhat run scripts/deployElevated.js --network <network>

const hre = require('hardhat');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    // QDUMMY - Ethereum mainnet
    const tokenAddress = '0x5f195d1b998D2964928C422F93130e762Cb1c666';
    const lzEndpointV2Address = '0x1a44076050125825900e736c501f859c50fE728c';
    
    // Deploy QuantozMintBurnOFTAdapter
    const QuantozOFTAdapter = await hre.ethers.getContractFactory('QuantozAdapter');
    const quantozOFTAdapter = await QuantozOFTAdapter.deploy(
        tokenAddress,
        lzEndpointV2Address,
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

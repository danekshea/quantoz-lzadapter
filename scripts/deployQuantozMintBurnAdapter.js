// Simple deploy script for ElevatedMinterBurner.sol
// Usage: npx hardhat run scripts/deployElevated.js --network <network>

const hre = require('hardhat');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    // PDUMMY - 0x92d18ce12d418a2d0b6d61a60b0a71081febad60 POLYGON
    const tokenAddress = '0x92d18ce12d418a2d0b6d61a60b0a71081febad60';
    const elevatedAddress = '0xB232818b57Cd3dA60615759994FEE362525C0Ab8';
    const lzEndpointV2Address = '0x1a44076050125825900e736c501f859c50fE728c';
    // Deploy QuantozMintBurnOFTAdapter
    const QuantozMintBurnOFTAdapter = await hre.ethers.getContractFactory('QuantozMintBurnOFTAdapter');
    const gasWithBuffer = ethers.BigNumber.from("400000");
    console.log("Gas with buffer:", gasWithBuffer.toString());
    const quantozMintBurnOFTAdapter = await QuantozMintBurnOFTAdapter.deploy(
        tokenAddress,
        elevatedAddress,
        lzEndpointV2Address,
        deployer.address,
        { gasLimit: gasWithBuffer }
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

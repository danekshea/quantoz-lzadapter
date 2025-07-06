// Script for operator to mint tokens using ElevatedMinterBurner
// Usage: npx hardhat run scripts/operatorMintElevated.js --network <network>

const hre = require('hardhat');

// Minimal ABI: IERC20 + role-related functions
const ABI = [
    // IERC20
    'function balanceOf(address) view returns (uint256)',
    // Roles
    'function MINTER_ROLE() view returns (bytes32)',
    'function BURNER_ROLE() view returns (bytes32)',
    'function hasRole(bytes32,address) view returns (bool)',
    // Optional: isBlocked
    'function isBlocked(address) view returns (bool)',
    'function mint(address,uint256) external',
];

async function main() {
    const [deployer, operator] = await hre.ethers.getSigners();
    console.log('Operator account:', operator.address);
    console.log('Recipient (deployer):', deployer.address);

    // ElevatedMinterBurner contract address - replace with your deployed address
    const elevatedAddress = '0x3E679023066b9F0687BCccE64324957e4017BCe2'; // Replace with your deployed address
    const tokenAddress = '0xDAe0076498CFA832c11ead54FA79E418403f9A75';

    const token = await hre.ethers.getContractAt(ABI, tokenAddress);
    const minterRole = await token.MINTER_ROLE();
    const burnerRole = await token.BURNER_ROLE();
    const isMinter = await token.hasRole(minterRole, elevatedAddress);
    const isBurner = await token.hasRole(burnerRole, elevatedAddress);
    console.log('Is minter:', isMinter);
    console.log('Is burner:', isBurner);
    // const mint = await token.mint(deployer.address, hre.ethers.utils.parseUnits('100', 6));
    // console.log('Minted:', mint);

    // Amount to mint (2 tokens, 6 decimals)
    const amount = hre.ethers.utils.parseUnits('3', 6);

    try {
        const ElevatedMinterBurner = await hre.ethers.getContractFactory('ElevatedMinterBurner');
        const elevated = ElevatedMinterBurner.connect(operator).attach(elevatedAddress);

        console.log('\n=== Minting Tokens ===');
        console.log('Minting', hre.ethers.utils.formatUnits(amount, 6), 'tokens to', deployer.address);

        const isOperator = await elevated.operators(operator.address);
        console.log('Is operator:', isOperator); // Should be true

        // await elevated.connect(operator).callStatic.mint(deployer.address, amount);
        const tx = await elevated.mint(deployer.address, amount);
        await tx.wait();
        console.log('Mint transaction hash:', tx.hash);
        console.log('Mint successful!');
    } catch (error) {
        console.error('Error minting tokens:', error.message);
        console.log('\nMake sure:');
        console.log('1. The operator is set and has permission to mint.');
        console.log('2. The contract address is correct.');
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 
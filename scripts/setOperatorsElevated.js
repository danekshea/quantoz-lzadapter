// Script to set operator for ElevatedMinterBurner
// Usage: npx hardhat run scripts/setOperatorsElevated.js --network <network>

const hre = require('hardhat');

async function main() {
    const [deployer, operator] = await hre.ethers.getSigners();
    console.log('Setting operator with deployer account:', deployer.address);
    console.log('Setting operator account:', operator.address);

    // ElevatedMinterBurner contract address - replace with your deployed address
    const elevatedAddress = '0xB232818b57Cd3dA60615759994FEE362525C0Ab8'; // Replace with your deployed address

    try {
        const ElevatedMinterBurner = await hre.ethers.getContractFactory('ElevatedMinterBurner');
        const elevated = ElevatedMinterBurner.attach(elevatedAddress);

        console.log('\n=== Setting Operator ===');
        console.log('Contract Address:', elevatedAddress);
        console.log('Operator Address:', operator.address);

        // Check current operator status
        const isCurrentlyOperator = await elevated.operators(operator.address);
        console.log('Current operator status:', isCurrentlyOperator);

        if (isCurrentlyOperator) {
            console.log('Operator is already set to true');
            return;
        }

        // Set operator to true
        console.log('Setting operator to true...');
        const tx = await elevated.setOperator(operator.address, true);
        await tx.wait();

        console.log('Transaction hash:', tx.hash);
        console.log('Operator set successfully!');

        // Verify the operator was set
        const isNowOperator = await elevated.operators(operator.address);
        console.log('New operator status:', isNowOperator);

        console.log('\n=== Operator Setup Complete ===');
        console.log('The operator can now mint and burn tokens through the ElevatedMinterBurner contract');

    } catch (error) {
        console.error('Error setting operator:', error.message);
        console.log('\nMake sure to:');
        console.log('1. Replace the elevatedAddress with your deployed contract address');
        console.log('2. Deploy the contract first using scripts/deployElevated.js');
        console.log('3. Ensure the deployer account is the owner of the contract');
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

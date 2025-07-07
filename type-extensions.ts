import 'hardhat/types/config'

interface OftAdapterConfig {
    tokenAddress: string
}

interface QuantozAdapterConfig {
    tokenAddress: string
}

interface QuantozMintBurnAdapterConfig {
    tokenAddress: string
    minterBurnerAddress: string
}

declare module 'hardhat/types/config' {
    interface HardhatNetworkUserConfig {
        oftAdapter?: never
        quantozAdapter?: never
        quantozMintBurnAdapter?: never
    }

    interface HardhatNetworkConfig {
        oftAdapter?: never
        quantozAdapter?: never
        quantozMintBurnAdapter?: never
    }

    interface HttpNetworkUserConfig {
        oftAdapter?: OftAdapterConfig
        quantozAdapter?: QuantozAdapterConfig
        quantozMintBurnAdapter?: QuantozMintBurnAdapterConfig
    }

    interface HttpNetworkConfig {
        oftAdapter?: OftAdapterConfig
        quantozAdapter?: QuantozAdapterConfig
        quantozMintBurnAdapter?: QuantozMintBurnAdapterConfig
    }
}

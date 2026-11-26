# Registry of Humanode's Hyperlane deployment

The chains and warp routes of Humanode's Hyperlane deployment, between Humanode and Base, on mainnet and testnet, and the `@humanode-hyperlane/registry` package that reads them. Our fork of Hyperlane's registry: its code and layout are upstream's, its content is ours alone.

## Contents

### Chains

One directory per chain under `chains/`, each with its `metadata.yaml`, its `addresses.yaml` (the core contracts we deployed there) and its `logo.svg`, with a `darkmode-logo.svg` where the logo needs one:

| Chain              | Network            | Chain and domain ID |
| ------------------ | ------------------ | ------------------- |
| `humanode`         | Humanode mainnet   | 5234                |
| `base`             | Base mainnet       | 8453                |
| `humanodetestnet5` | Humanode testnet 5 | 14853               |
| `basesepolia`      | Base Sepolia       | 84532               |

The addresses are those of our deployment, not Hyperlane's: on Base, for example, they are our Mailbox and our hooks.

### Warp routes

The HMND and USDC routes between Humanode and Base, under `deployments/warp_routes/` ([its README](deployments/warp_routes/README.md)).

## The package

`@humanode-hyperlane/registry` bundles this content and reads it, from the package or from this repository on GitHub, which is its default. Our CLI and SDK, `@humanode-hyperlane/cli` and `sdk`, use it.

#### Install `gitleaks`

The commit hooks check for secrets with `gitleaks`; install it from its [releases](https://github.com/gitleaks/gitleaks) or a package manager.

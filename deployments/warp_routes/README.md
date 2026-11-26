# Warp Routes

The warp routes between Humanode and Base, on mainnet and testnet, one directory per asset symbol:

| Route ID                            | Chains                           | Token                                                           |
| ----------------------------------- | -------------------------------- | --------------------------------------------------------------- |
| `HMND/base-humanode`                | Base, Humanode                   | HMND: native on Humanode, synthetic on Base                     |
| `USDC/base-humanode`                | Base, Humanode                   | USDC: collateral on Base (Circle's USDC), synthetic on Humanode |
| `HMND/basesepolia-humanodetestnet5` | Base Sepolia, Humanode testnet 5 | the same, on testnet                                            |
| `USDC/basesepolia-humanodetestnet5` | Base Sepolia, Humanode testnet 5 | the same, on testnet                                            |

A route's `-config.yaml` gives its token addresses, names and symbols, which tell these tokens from others of the same name; its `-deploy.yaml` gives the configuration it was deployed with. A route's ID is its symbol and its chains in alphabetical order. The configs follow the WarpCore schema of the SDK, `@humanode-hyperlane/sdk`.

`warpRouteAllowlist.yaml` is empty: it lists bridge-only routes for an external routing engine, which these routes do not use.

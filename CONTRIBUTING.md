# Contributing

This registry holds Humanode's deployment only: its chains and warp routes change when the deployment does, from the deployment repository's registry (`deployments/<env>/registry`). A change keeps the layout and the schemas of `chains/schema.json` and `deployments/warp_routes/schema.json`, and `pnpm run build` and `pnpm run test:unit` pass on it.

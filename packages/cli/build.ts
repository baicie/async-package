import { build } from 'tsup'

async function main() {
  await build({
    entry: ['./src/index.ts'],
    clean: true,
    format: ['esm'],
    skipNodeModulesBundle: true,
    target: 'es2020',
    bundle: true,
    // dts: true,
  })
}

main()

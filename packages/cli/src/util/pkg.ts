import fs from 'fs-extra'
import type { ProjectManifest } from '@pnpm/types'

export function getPackageManifest(
  pkgPath: string,
) {
  return JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf8' }) ?? '{}') as ProjectManifest
}

export async function getPackageDevpebdencies(
  pkgPath: string,
) {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, devDependencies = {} } = manifest

  return {
    dependencies,
    devDependencies,
  }
}

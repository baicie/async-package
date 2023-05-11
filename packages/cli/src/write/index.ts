import path from 'node:path'
import consola from 'consola'
import type { GlobalOptions } from '../type'
import { DEFAULT_CACHE_FILE_NAME, cacheRoot, targetPath } from '../util'
import { getPackageDevpebdencies } from '../util/pkg'

export async function write(conf: GlobalOptions) {
  // consola.success('write', conf)
  const cachePkg = path.join(cacheRoot, DEFAULT_CACHE_FILE_NAME)
  const targetPkg = targetPath('/play/package.json')
  consola.success('write', targetPkg)
  const { dependencies: cacheDep, devDependencies: cacheDevdep } = await getPackageDevpebdencies(cachePkg)
  const { dependencies, devDependencies } = await getPackageDevpebdencies(targetPkg)

  consola.success('write', cacheDep, cacheDevdep)
}

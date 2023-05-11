import path from 'node:path'
import fs from 'fs-extra'
import consola from 'consola'
import ora from 'ora'
import chalk from 'chalk'
import type { GlobalOptions } from '../type'
import {
  DEFAULT_CACHE_FILE_NAME,
  cacheRoot,
  getPackageDevpebdencies,
  getPackageManifest,
  targetPath,
} from '../util'
import { writeVersion } from './write'

export async function write(conf: GlobalOptions) {
  const cachePkg = path.join(cacheRoot, DEFAULT_CACHE_FILE_NAME)
  const targetPkg = targetPath(conf?.target ?? '')
  consola.info('targetPkg', targetPkg)
  const spinner = ora(`正在从 ${cachePkg} 向 ${targetPkg} 写入版本...`).start()

  try {
    const { dependencies: cacheDep, devDependencies: cacheDevdep } = await getPackageDevpebdencies(cachePkg)
    const { dependencies, devDependencies } = await getPackageDevpebdencies(targetPkg)

    // 同步版本
    const targetDep = writeVersion(cacheDep, dependencies)
    const targetDevdep = writeVersion(cacheDevdep, devDependencies)

    // 写入package.json
    const targetManifest = getPackageManifest(targetPkg)

    // 写入package.json
    targetManifest.dependencies = targetDep
    targetManifest.devDependencies = targetDevdep

    // 替换文件

    fs.writeFileSync(targetPkg, JSON.stringify(targetManifest), { encoding: 'utf8' })

    spinner.color = 'green'
    spinner.succeed(`${chalk.green('写入依赖成功！')}`)
  }
  catch (error) {
    consola.log(error)
    spinner.color = 'red'
    spinner.fail(chalk.red('写入依赖失败！'))
  }
}

import ora from 'ora'
import gitClone from 'git-clone'
import chalk from 'chalk'
import consola from 'consola'
import fs from 'fs-extra'
import type { GlobalOptions } from '../type'
import { cacheRoot } from '../util'

export async function download(conf: GlobalOptions) {
  if (fs.existsSync(cacheRoot))
    await fs.remove(cacheRoot)
  fs.mkdirSync(cacheRoot)

  return new Promise<void>((resolve) => {
    const spinner = ora(`正在从 ${conf.source} 拉取远程模板...`).start()

    if (!(conf.source && conf.target)) {
      spinner.color = 'red'
      spinner.fail(chalk.red(`${conf}不能为空！`))
      return
    }

    gitClone(conf.source, cacheRoot, { }, async (error: unknown) => {
      if (error) {
        consola.log(error)
        spinner.color = 'red'
        spinner.fail(chalk.red('拉取远程模板仓库失败！'))
        await fs.remove(cacheRoot)
        resolve()
      }

      spinner.color = 'green'
      spinner.succeed(`${chalk.green('拉取远程模板仓库成功！')}`)
      resolve()
    })
  })
}

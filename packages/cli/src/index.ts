import { cac } from 'cac'
import { consola } from 'consola'
import chalk from 'chalk'
import { version } from '../version'
import { DEFAULT_FILE_NAME, DEFAULT_SYNC_ADDRESS, projectRoot } from './util'
import type { GlobalOptions } from './type'
import { prompts } from './prompts'

const cli = cac('sync')

// sync
cli
  .command('[root]', 'sync package')
  .option('--source <source>', '[string] 源地址', { default: DEFAULT_SYNC_ADDRESS })
  .option('--target <target>', '[string] 同步路径', { default: DEFAULT_FILE_NAME })
  .action(async (root: string, options: GlobalOptions) => {
    try {
      consola.info('projectRoot', projectRoot)
      await prompts(options)
    }
    catch (error) {
      consola.error(chalk.red('启动失败：'), chalk.red(error))
    }
  })

cli.help()
cli.version(version)

cli.parse()

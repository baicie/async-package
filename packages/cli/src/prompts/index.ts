import { consola } from 'consola'
import type { GlobalOptions } from '../type'
import { validateGitUrl, validateTargetPath } from '../util'
import { download } from '../download'
import { askSource, askTarget } from './steps'

async function ask(conf: GlobalOptions) {
  const config = conf
  if (!config.source || validateGitUrl(config.source)) {
    // 没有源地址 或者不合法
    config.source = await askSource()
  }

  if (!config.target || !validateTargetPath(config.target))
  // 没有目标路径
    config.target = await askTarget()

  return config
}

async function write(conf: GlobalOptions) {
  consola.success('write', conf)
}

export async function prompts(conf: GlobalOptions) {
  // 询问配置 有默认就不管了 只有自己配置的时候没过校验会进入
  const answer = await ask(conf)
  // 下载目标
  await download(conf)
  // 同步写入
  await write(answer)
}

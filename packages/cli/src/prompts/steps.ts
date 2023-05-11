import { input } from '@inquirer/prompts'
import { validateGitUrl, validateTargetPath } from '../util'

export async function askSource() {
  return await input({
    message: '请输入拷贝地址',
    validate: value => validateGitUrl(value),
  })
}

export async function askTarget() {
  return await input({
    message: '请输入同步目标',
    validate: value => validateTargetPath(value),
  })
}

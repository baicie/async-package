import fs from 'fs-extra'
import { targetPath } from './path'

export function validateGitUrl(url: string): boolean {
  return /^(git|ssh|http(s)?)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(url)
}

export function validateTargetPath(tPath: string): boolean {
  // 工作路径 指定地址 package.json
  // const targetPath = path.join(process.cwd(), tPath, tPath.includes(DEFAULT_FILE_NAME) ? '' : DEFAULT_FILE_NAME)

  return fs.existsSync(targetPath(tPath))
}

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_FILE_NAME } from './contance'

// D:\project\synchronous\packages\cli\src
// D:\project\synchronous\packages\cli
export const projectRoot = path.resolve(fileURLToPath(import.meta.url), '..', '..')
export const pkgRoot = path.resolve(projectRoot, 'packages')
// 可能需要判断
export const cacheRoot = path.resolve(projectRoot, 'cache')
export const templateRoot = path.resolve(projectRoot, 'templates')

export const targetPath = (tPath: string) => path.join(process.cwd(), tPath, tPath.includes(DEFAULT_FILE_NAME) ? '' : DEFAULT_FILE_NAME)

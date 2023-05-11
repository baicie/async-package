import type { DepsType } from '../type'

export function writeVersion(sources: DepsType, targets: DepsType) {
  for (const [name, version] of Object.entries(sources)) {
    if (targets[name])
    // 如果目标有当前依赖
      targets[name] = version
  }
}

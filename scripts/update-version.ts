import path from 'node:path'
import { fileURLToPath } from 'node:url'
import consola from 'consola'
import chalk from 'chalk'
import { findWorkspacePackages } from '@pnpm/find-workspace-packages'
import type { Project } from '@pnpm/find-workspace-packages'
import { version } from '../packages/cli/version'

export const projectRoot = path.resolve(fileURLToPath(import.meta.url), '..', '..')
const getWorkspacePackages = () => findWorkspacePackages(projectRoot)

function errorAndExit(err: Error): never {
  consola.error(err)
  process.exit(1)
}

async function main() {
  if (!version) {
    errorAndExit(
      new Error('No version'),
    )
  }

  consola.log(chalk.cyan(`$new version: ${version}`))

  consola.debug(chalk.yellow('Updating package.json for pv-sync'))

  const pkgs = Object.fromEntries(
    (await getWorkspacePackages()).map(pkg => [pkg.manifest.name!, pkg]),
  )

  const PvSync = pkgs['pv-sync']

  const writeVersion = async (project: Project) => {
    await project.writeProjectManifest({
      ...project.manifest,
      version,
    })
  }

  try {
    await writeVersion(PvSync)
  }
  catch (error) {
    errorAndExit(error as Error)
  }

  consola.success(chalk.green(`package pv-sync updated successfully to version ${version}`))
}

main()

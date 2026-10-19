import { cpSync, mkdirSync, readdirSync, rmSync, symlinkSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const root = process.cwd()
const temp = path.join(root, `.pages-export-${process.pid}`)
const modules = process.env.PAGES_NODE_MODULES ?? path.join(root, 'node_modules')
const next = path.join(modules, 'next', 'dist', 'bin', 'next')
const skip = new Set(['.git', '.next', 'node_modules', 'out', '.claude'])

rmSync(temp, { recursive: true, force: true })
mkdirSync(temp, { recursive: true })
try {
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (skip.has(entry.name) || entry.name.startsWith('.pages-export-')) continue
    if (entry.name === 'proxy.ts') continue
    const source = path.join(root, entry.name)
    const destination = path.join(temp, entry.name)
    cpSync(source, destination, {
      recursive: true,
      filter(item) {
        const relative = path.relative(path.join(root, 'app'), item).replaceAll('\\', '/')
        if (entry.name === 'app' && (
          ['api', 'edit', 'stats'].some((name) => relative === name || relative.startsWith(`${name}/`)) ||
          relative === 'opengraph-image.tsx' || relative.endsWith('/opengraph-image.tsx')
        )) return false
        return true
      },
    })
  }
  if (path.resolve(modules) === path.join(root, 'node_modules')) {
    symlinkSync(modules, path.join(temp, 'node_modules'), 'junction')
  }
  const result = spawnSync(process.execPath, [next, 'build', '--webpack'], {
    cwd: temp,
    env: {
      ...process.env,
      ...(path.resolve(modules) === path.join(root, 'node_modules') ? {} : { NODE_PATH: modules }),
      GITHUB_PAGES: 'true',
    },
    stdio: 'inherit',
  })
  if (result.error) throw result.error
  if (result.status !== 0) process.exitCode = result.status ?? 1
  else cpSync(path.join(temp, 'out'), path.join(root, 'out'), { recursive: true, force: true })
} finally {
  rmSync(temp, { recursive: true, force: true })
}

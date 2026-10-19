/** Prefix a public asset URL when the site is hosted beneath a repository path. */
export function publicPath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
}

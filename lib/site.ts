/**
 * The canonical origin, in one place.
 *
 * The previous site drifted between `aahil-khan.xyz` and a `.tech` domain that never resolved,
 * and shipped 301s pointing at the dead one. One constant, imported everywhere.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

import type { Metadata } from 'next'

import { SiteMotion } from '@/components/site/motion'
import {
  About,
  Bar,
  Closer,
  Credentials,
  Experience,
  Foot,
  Hero,
  Skills,
  Work,
} from '@/components/site/sections'
import { Cursor } from '@/components/desktop/cursor'
import { VisitPing } from '@/components/desktop/visit-ping'
import { profile } from '@/content'
import { validateContent } from '@/content/validate'

import './site.css'

/*
 * The front page.
 *
 * The scrolling portfolio landing page.
 *
 * Content is checked at module scope, exactly as it was on the canvas page this replaced: this
 * runs while `next build` prerenders, so bad content fails the build instead of shipping a blank
 * section, and in dev it re-runs on every recompile.
 */
validateContent()

export const metadata: Metadata = {
  /*
   * The name alone. The role belongs in the OG card, where there is room for it; in a tab strip
   * it is truncated to noise long before the interesting half is reached.
   */
  title: profile.name,
  description: profile.intro,
  alternates: { canonical: '/' },
}

export default function Page() {
  return (
    /* id="top" is the mark's target in the bar; without it the anchor resolves to nothing */
    <main id="top">
      {/* counts the visit, on first input — it moved here with the landing page */}
      <VisitPing />
      {/*
       * Custom pointer used on the scrolling portfolio.
       */}
      <Cursor />

      <SiteMotion>
        <Bar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Credentials />
        <Closer />
        <Foot />
      </SiteMotion>
    </main>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CaseStudyDocument } from '@/components/site/case-study-document'
import { DocBar, DocFoot } from '@/components/site/doc'
import { caseStudies } from '@/content/case-studies'
import { profile, site } from '@/content'
import { SITE_URL } from '@/lib/site'

import '../../site.css'

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

const find = (slug: string) => caseStudies.find((study) => study.slug === slug)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = find(slug)
  if (!study) return {}

  return {
    title: `${study.shortTitle} — Case Study — ${profile.name}`,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: { type: 'article', title: study.title, description: study.summary, url: `${SITE_URL}/case-studies/${study.slug}` },
    twitter: { card: 'summary_large_image', title: study.title, description: study.summary },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = find(slug)
  if (!study) notFound()

  const url = `${SITE_URL}/case-studies/${study.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: study.title,
    description: study.summary,
    url,
    author: { '@type': 'Person', name: profile.name, url: SITE_URL },
    keywords: study.tools.join(', '),
    educationalLevel: 'Master’s coursework',
  }

  return (
    <main data-scroll-page className="site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DocBar back={{ href: '/#case-studies', label: site.nav.caseStudies }} />
      <div className="cs-page wrap">
        <CaseStudyDocument study={study} />
        <DocFoot back={{ href: '/#case-studies', label: site.nav.caseStudies }} />
      </div>
    </main>
  )
}

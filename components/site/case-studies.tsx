import Link from 'next/link'

import { caseStudies } from '@/content/case-studies'

export function CaseStudies() {
  return (
    <section className="study-index" id="case-studies">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow">Case Studies</p>
          <h2>Plan, build and evaluate practical projects</h2>
          <p>Review each project’s methods, evidence, results, costs and limitations.</p>
        </div>

        <div className="study-index__list">
          {caseStudies.map((study, index) => (
            <article className="study-index__card reveal" key={study.slug}>
              <p className="study-index__number">{String(index + 1).padStart(2, '0')} / {study.module}</p>
              <h3>{study.shortTitle}</h3>
              <p className="study-index__course">{study.course}</p>
              <p className="study-index__summary">{study.summary}</p>
              <Link className="case__go" href={`/case-studies/${study.slug}`}>
                Explore the full case study <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

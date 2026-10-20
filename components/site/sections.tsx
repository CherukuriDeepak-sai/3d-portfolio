import { Fragment } from 'react'
import Link from 'next/link'

import {
  awards,
  certifications,
  education,
  headlineStats,
  jobs,
  profile,
  site,
  toolGroups,
} from '@/content'
import { publicPath } from '@/lib/public-path'
import { JobCard } from '@/components/site/job-card'
import { NavDrawer } from '@/components/site/nav-drawer'
import { Portrait } from '@/components/site/portrait'
import { ThemeToggle } from '@/components/site/theme-toggle'

/*
 * The front page, as server components.
 *
 * Nothing here is a client component and nothing here holds a sentence — copy comes from
 * `content/site.ts`, facts come from the same content files the canvas reads, so the two
 * flavours cannot drift. All behaviour lives in `components/site/motion.tsx`, which finds these
 * elements by `data-` attribute; the class names are for styling only.
 *
 * Every element the motion layer animates on entry carries `.reveal`, which is visible by
 * default in CSS. A JS failure therefore leaves a complete, readable page rather than a blank
 * one — the same guarantee DIRECTION.md makes for the plain résumé.
 */

export function Bar() {
  return (
    <>
      <header className="bar" data-site-bar>
        <Link className="mark" href="#top" aria-label={site.nav.topLabel}>
          {profile.initials}
        </Link>
        <nav aria-label={site.nav.sectionsLabel}>
          <a href="#about">{site.nav.about}</a>
          <a href="#skills">{site.nav.skills}</a>
          <a href="#experience">{site.nav.experience}</a>
          <a href="#case-studies">{site.nav.caseStudies}</a>
          <a href="#contact">{site.nav.contact}</a>
        </nav>
        <ThemeToggle />
        {profile.resumePdf ? (
          <a className="bar__cta" href={publicPath(profile.resumePdf)} download>
            <span>{site.resume.short}</span>
            <span className="long">{site.resume.long}</span>
          </a>
        ) : null}
        {/* phone only — the inline nav can't fit beside the mark and the controls below 820px */}
        <NavDrawer />
      </header>

    </>
  )
}

export function Hero() {
  const { lead, emphasis, tail } = site.headline
  /* split here rather than in the client: the spans must exist in the server HTML, or the
     reveal would have nothing to animate until hydration and the line would jump */
  const words = (s: string) =>
    s.split(' ').map((w, i) => (
      /*
       * The trailing {' '} is load-bearing. Mapping to bare spans emits them with no text node
       * between, so the words render as "Full-stackengineerbuilding" — JSX does not preserve
       * whitespace across an array, and `.word` is inline-block so nothing collapses back in.
       * A real space keeps copy-paste and text selection correct too.
       */
      <Fragment key={`${w}-${i}`}>
        <span className="word">
          <span>{w}</span>
        </span>{' '}
      </Fragment>
    ))
  return (
    <section className="hero" data-hero>
      {/*
        Split into two layers so they can move independently: the lines drift, the glow breathes.
        The mask that fades the whole thing out lives on the parent, so neither child's motion
        drags the fade around with it.
      */}
      <div className="hero__grid" data-hero-grid aria-hidden>
        <div className="hero__lines" data-hero-lines />
        <div className="hero__glow" data-hero-glow />
      </div>
      <div className="hero__light" data-hero-light aria-hidden />

      <div className="wrap hero__inner" data-hero-inner>
        <p className="eyebrow hero__eyebrow" data-intro="eyebrow">
          {profile.location}
          {profile.availability || site.openTo ? ` · ${profile.availability || site.openTo}` : ''}
        </p>

        <h1 className="name">
          {profile.name.split(' ').map((line) => (
            <span className="name__line" key={line}>
              <span>
                {line}
                <span className="name__glitch name__glitch--a" aria-hidden="true">{line}</span>
                <span className="name__glitch name__glitch--b" aria-hidden="true">{line}</span>
              </span>
            </span>
          ))}
        </h1>

        <p className="headline">
          {words(lead)} <b>{words(emphasis)}</b> {words(tail)}
        </p>

        <div className="hero__actions" data-intro="actions">
          <a className="cta" href="#case-studies">
            <span className="cta__fill" aria-hidden />
            <span className="cta__text">{site.seeCaseStudies}</span>
            <span className="cta__icon" aria-hidden>
              <Arrow />
            </span>
          </a>
          <a className="ghost" href="#about">
            <span className="ghost__dot" aria-hidden />
            {site.toAbout}
            <span className="ghost__badge">{site.toAboutBadge}</span>
          </a>
        </div>

        {/* the numbers come from /edit; with none set, the strip and its rule go entirely */}
        {headlineStats.length > 0 && (
          <ul className="s-stats" data-intro="stats">
            {headlineStats.map((s) => (
              <li key={s.label}>
                {/* data-count drives the count-up; the literal is what renders without JS */}
                <b data-count={s.value} data-dec={s.value.includes('.') ? '2' : '0'}>
                  {s.value}
                </b>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow">{site.about.eyebrow}</p>
          <h2>{site.about.title}</h2>
        </div>

        <div className="about__grid">
{/* the photo, plus the egg behind it — see components/site/portrait.tsx */}
          <Portrait />

          <div>
            <p className="about__lede reveal">{profile.intro}</p>
            {profile.notes?.length ? (
              <div className="about__notes reveal">
                {profile.notes.map((n, i) => (
                  <p key={i}>{n}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="skills" id="skills" data-skills>
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow">{site.skills.eyebrow}</p>
          <h2>{site.skills.title}</h2>
        </div>

        <div className="skills__grid">
          {toolGroups.map((group) => (
            <div className="skillgroup" key={group.label}>
              <h3>{group.label}</h3>
              <div className="s-tools">
                {group.tools.map((tool) => (
                  <span className={`s-tool${tool.logo ? '' : ' s-tool--text'}`} key={tool.name}>
                    {/*
                      Logos sit on a light tile. Several marks here are near-black (Next.js,
                      Express, GitHub, the AWS wordmark) and would disappear straight onto the
                      --ink band. One rule beats a per-logo invert flag.
                      A tool with no logo gets its name alone — no stand-in.
                    */}
                    {/* eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size logo */}
                    {tool.logo ? <img src={publicPath(tool.logo)} alt="" width={30} height={30} /> : null}
                    {!tool.logo ? <ToolMark name={tool.name} group={group.label} /> : null}
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Small, consistent line marks for skills without a vendor logo. The text label stays visible. */
function ToolMark({ name, group }: { name: string; group: string }) {
  const label = name.toLowerCase()
  const path = label.includes('teamwork') || label.includes('customer') || label.includes('communication')
    ? <><circle cx="9" cy="8" r="3" /><circle cx="16" cy="9" r="2.5" /><path d="M3 19c.4-3.3 2.4-5 6-5s5.6 1.7 6 5M14 14c2.8-.1 4.5 1.5 5 4" /></>
    : label.includes('time')
      ? <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></>
      : label.includes('problem') || label.includes('algorithm')
        ? <><path d="M8 4h8l4 8-4 8H8l-4-8 4-8Z" /><path d="m9 12 2 2 4-4" /></>
        : label.includes('stock') || label.includes('merchandising')
          ? <><path d="M4 8h16v12H4zM3 8l2-4h14l2 4M9 12h6" /></>
          : label.includes('climate') || label.includes('adaptation')
            ? <><path d="M12 20v-8M12 15c-5 0-7-3-7-7 4 0 7 2 7 7ZM12 12c0-4 2-7 7-7 0 4-2 7-7 7Z" /></>
            : group.toLowerCase().includes('data')
              ? <><path d="M4 19V5M4 19h16M7 15l4-4 3 2 5-6" /><circle cx="19" cy="7" r="1" /></>
              : group.toLowerCase().includes('cloud')
                ? <><path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18Z" /><path d="m9 13 3-3 3 3" /></>
                : <><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 5l-4 14" /></>

  return (
    <svg className="s-tool__mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {path}
    </svg>
  )
}

export function Experience() {
  const ordered = [...jobs].sort((a, b) => b.year - a.year)

  return (
    <section id="experience">
      <div className="wrap xp__grid">
        <aside className="xp__index">
          <div className="section__head reveal" style={{ marginBottom: 0 }}>
            <p className="eyebrow">{site.experience.eyebrow}</p>
            <h2>{site.experience.title}</h2>
          </div>
          <ol className="xp__list" aria-label={site.experience.indexLabel}>
            {ordered.map((job, i) => (
              <li key={job.slug}>
                <a
                  className="xp__item"
                  href={`#job-${job.slug}`}
                  data-xp-item
                  data-on={i === 0 ? '1' : '0'}
                >
                  <span className="xp__bullet" aria-hidden />
                  <span>
                    <b>{job.company}</b>
                    <span>
                      {job.role} · {job.year}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="xp__detail">
          {ordered.map((job) => (
            <JobCard
              key={job.slug}
              slug={job.slug}
              period={job.period}
              /* `meta` is "Company · Place · Period"; only the middle part is wanted here */
              place={job.meta?.split(' · ')[1] ?? job.company}
              role={job.role}
              company={job.company}
              lede={job.lede}
              highlights={job.highlights}
              stack={job.stack}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Credentials() {
  const certificateImages: Record<string, string> = {
    'MATLAB Onramp': '/certificates/matlab-onramp.webp',
    'Deep Learning Onramp': '/certificates/deep-learning-onramp.webp',
    'Explore Convolutional Neural Networks': '/certificates/convolutional-neural-networks.webp',
    'Computer Vision Onramp': '/certificates/computer-vision-onramp.webp',
    'Object Detection with Deep Learning': '/certificates/object-detection-deep-learning.webp',
  }

  return (
    <section>
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow">{site.credentials.eyebrow}</p>
          <h2>{site.credentials.title}</h2>
        </div>
        <div className="creds">
          <div className="cred reveal">
            <h3>{site.credentials.education}</h3>
            <ul>
              {education.map((e) => (
                <li key={e.institution}>
                  <b>{e.degree}</b>
                  <span>{e.institution}</span>
                  {e.detail ? <span>{e.detail}</span> : null}
                </li>
              ))}
            </ul>
          </div>

          {certifications.length ? <div className="cred reveal">
            <h3>{site.credentials.certifications}</h3>
            <ul className="cert-badges" aria-label={site.credentials.certifications}>
              {certifications.map((item) => {
                const image = certificateImages[item]
                return (
                  <li className={`cert-badge${image ? ' cert-badge--has-image' : ''}`} key={item}>
                    {image ? (
                      <a href={publicPath(image)} target="_blank" rel="noopener noreferrer" aria-label={`${item} certificate image (opens in a new tab)`}>
                        {item}
                        <span className="cert-preview" aria-hidden="true">
                          {/* eslint-disable-next-line @next/next/no-img-element -- small optimized WebP certificate scan */}
                          <img src={publicPath(image)} alt="" loading="lazy" />
                        </span>
                      </a>
                    ) : item}
                  </li>
                )
              })}
            </ul>
          </div> : null}
          {awards.length ? <div className="cred reveal">
            <h3>{site.credentials.awards}</h3>
            <ul>{awards.map((a) => <li key={a.event}><b>{a.title}</b><span>{a.event}</span></li>)}</ul>
          </div> : null}
        </div>
      </div>
    </section>
  )
}

export function Closer() {
  return (
    <section className="closer" id="contact" data-closer>
      <div className="closer__field" data-closer-field aria-hidden />
      <div className="wrap closer__inner">
        <h2>
          {site.closer.title.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </h2>
        <p>{site.closer.body}</p>
        <a className="closer__mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        <div className="closer__links">
          {profile.links
            .filter((l) => l.href.startsWith('http'))
            .map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          {profile.resumePdf ? (
            <a href={publicPath(profile.resumePdf)} download>
              {site.resume.short} <span aria-hidden>↓</span>
            </a>
          ) : null}
        </div>

      </div>
    </section>
  )
}

export function Foot() {
  return (
    <>
      {/*
        A plain in-page anchor, and deliberately so: the motion layer already intercepts every
        `a[href^="#"]` inside its root and routes it through Lenis, so this needs no click
        handler of its own and still works — as a native jump — if that layer never loads.
        It lives here rather than in the bar because the bar has `backdrop-filter`, which would
        make it a containing block and trap this `position: fixed` element inside it.
      */}
      <a className="totop" href="#top" aria-label={site.nav.backToTop}>
        <span aria-hidden>↑</span>
      </a>

      <footer className="foot">
      <div className="wrap">
        <span>
          {profile.name} · {profile.location}
        </span>
        <span>{site.footer.note}</span>
      </div>
      </footer>
    </>
  )
}

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

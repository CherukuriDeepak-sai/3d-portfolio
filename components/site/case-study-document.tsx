import type { ReactNode } from 'react'

import type { CaseStudyFigure, CloudCaseStudy, VisionCaseStudy } from '@/content/case-studies'
import { publicPath } from '@/lib/public-path'

function FigureGrid({ figures }: { figures: readonly CaseStudyFigure[] }) {
  return (
    <div className="cs-figures">
      {figures.map((figure) => (
        <figure className="cs-figure" key={figure.src}>
          <a href={publicPath(figure.src)} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${figure.caption}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- report figures are static, optimized WebP assets */}
            <img
              src={publicPath(figure.src)}
              alt={figure.alt}
              width={figure.width}
              height={figure.height}
              loading="lazy"
              decoding="async"
            />
          </a>
          <figcaption>{figure.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function DataTable({
  caption,
  headers,
  rows,
}: {
  caption: string
  headers: string[]
  rows: ReactNode[][]
}) {
  return (
    <div className="cs-table-wrap" role="region" aria-label={caption} tabIndex={0}>
      <table className="cs-table">
        <caption>{caption}</caption>
        <thead>
          <tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FigureGroup({ title, figures }: { title: string; figures: readonly CaseStudyFigure[] }) {
  return (
    <section className="cs-subsection">
      <h3>{title}</h3>
      <FigureGrid figures={figures} />
    </section>
  )
}

function References({ items }: { items: readonly string[] }) {
  return (
    <details className="cs-references">
      <summary>References listed in the report ({items.length})</summary>
      <ol>{items.map((item) => <li key={item}>{item}</li>)}</ol>
    </details>
  )
}

function VisionDocument({ study }: { study: VisionCaseStudy }) {
  const figuresByGroup = (group: string) => study.figures.filter((figure) => figure.group === group)

  return (
    <>
      <section id="vision-overview" className="cs-section">
        <h2>Project overview</h2>
        <p>{study.context}</p>
        <p><strong>My role:</strong> {study.role}</p>
        <ul className="cs-chip-list" aria-label="Tools and methods">
          {study.tools.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
      </section>

      <section id="vision-data" className="cs-section">
        <h2>Dataset and preparation</h2>
        <p>The Natural Images dataset contains eight classes:</p>
        <ul className="cs-chip-list" aria-label="Image classes">
          {study.classes.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <ul className="cs-list">{study.datasetNotes.map((note) => <li key={note}>{note}</li>)}</ul>
        <DataTable
          caption="Dataset split used in the report"
          headers={['Subset', 'Share']}
          rows={study.split.map((part) => [part.label, part.value])}
        />
        <div className="cs-two-col">
          <div>
            <h3>Preprocessing</h3>
            <ul className="cs-list">{study.preprocessing.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Augmentation</h3>
            <ul className="cs-list">{study.augmentation.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
        <h3>Input pipeline</h3>
        <ul className="cs-list">{study.inputPipeline.map((item) => <li key={item}>{item}</li>)}</ul>
        <FigureGroup title="Dataset figures" figures={figuresByGroup('Dataset')} />
      </section>

      <section id="vision-models" className="cs-section">
        <h2>Model design</h2>
        <div className="cs-models">
          {study.models.map((model) => (
            <article className="cs-model" key={model.name}>
              <h3>{model.name}</h3>
              <p className="cs-model__size">{model.parameters} parameters</p>
              <p>{model.design}</p>
              <p><strong>Reported test accuracy:</strong> {model.accuracy}</p>
              {model.loss ? <p><strong>{model.loss}</strong></p> : null}
            </article>
          ))}
        </div>
        <FigureGroup title="Architecture diagrams" figures={figuresByGroup('Model architectures')} />
      </section>

      <section id="vision-training" className="cs-section">
        <h2>Training and evaluation</h2>
        <ul className="cs-list">{study.trainingNotes.map((item) => <li key={item}>{item}</li>)}</ul>
        <DataTable
          caption="Reported test-set model comparison"
          headers={['Model', 'Test accuracy', 'Additional result']}
          rows={study.models.map((model) => [model.name, model.accuracy, model.loss ?? 'No test-loss value stated in the report summary'])}
        />
        <h3>Confusion-matrix findings</h3>
        <ul className="cs-list">{study.matrixFindings.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>Classification metrics</h3>
        <ul className="cs-list">{study.classificationNotes.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>ROC analysis</h3>
        <ul className="cs-list">{study.rocNotes.map((item) => <li key={item}>{item}</li>)}</ul>
        <FigureGroup title="Training curves" figures={figuresByGroup('Training')} />
        <FigureGroup title="Test results, confusion matrices and evaluation plots" figures={figuresByGroup('Results and evaluation')} />
      </section>

      <section id="vision-reflection" className="cs-section">
        <h2>Critical analysis</h2>
        <div className="cs-two-col">
          <div>
            <h3>Strengths</h3>
            <ul className="cs-list">{study.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Limitations</h3>
            <ul className="cs-list">{study.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
        <h3>Future work</h3>
        <ul className="cs-list">{study.futureWork.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <References items={study.references} />
    </>
  )
}

function CloudDocument({ study }: { study: CloudCaseStudy }) {
  const planDays = study.projectPlan.reduce((total, item) => total + Number.parseInt(item.duration, 10), 0)

  return (
    <>
      <section id="cloud-overview" className="cs-section">
        <h2>Project overview</h2>
        <p>{study.summary}</p>
        <p><strong>My role:</strong> {study.role}</p>
        <ul className="cs-chip-list" aria-label="AWS services and tools">
          {study.tools.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
        <aside className="cs-note">
          <strong>Project status</strong>
          <p>{study.reportNotes[0]}</p>
        </aside>
      </section>

      <section id="cloud-plan" className="cs-section">
        <h2>Project plan</h2>
        <p>The written schedule allocates {planDays} planned working days across discovery, design, AWS setup, monitoring and estimation.</p>
        <DataTable
          caption="Planned phases and duration from the report text"
          headers={['Phase', 'Planned duration']}
          rows={study.projectPlan.map((item) => [item.phase, item.duration])}
        />
        <p className="cs-footnote">{study.reportNotes[2]}</p>
      </section>

      <section id="cloud-requirements" className="cs-section">
        <h2>Requirements</h2>
        <DataTable
          caption="Functional and non-functional requirements mapped to AWS"
          headers={['ID', 'Type', 'Requirement', 'AWS mapping']}
          rows={study.requirements.map((item) => [item.id, item.type, item.description, item.awsMapping])}
        />
      </section>

      <section id="cloud-design" className="cs-section">
        <h2>Region and system design</h2>
        <ul className="cs-list">{study.regionNotes.map((item) => <li key={item}>{item}</li>)}</ul>
        <DataTable
          caption="Layers in the proposed cloud architecture"
          headers={['Layer', 'Services', 'Responsibility']}
          rows={study.architectureLayers.map((item) => [item.layer, item.services, item.responsibility])}
        />
        <h3>Request and data flow</h3>
        <ol className="cs-steps">{study.architectureFlow.map((item) => <li key={item}>{item}</li>)}</ol>
        <FigureGrid figures={study.figures.filter((figure) => figure.group === 'Architecture')} />
        <p className="cs-footnote">{study.reportNotes[1]}</p>
      </section>

      <section id="cloud-implementation" className="cs-section">
        <h2>Service setup and implementation notes</h2>
        <DataTable
          caption="AWS services covered by the design and the evidence described in the report"
          headers={['Service', 'Purpose in the design', 'What the report records']}
          rows={study.services.map((item) => [item.name, item.purpose, item.projectEvidence])}
        />
      </section>

      <section id="cloud-costing" className="cs-section">
        <h2>Cost estimate</h2>
        <DataTable
          caption="Estimated AWS costs as shown in the coursework"
          headers={['Estimate period', 'Reported amount']}
          rows={study.costEstimate.map((item) => [item.label, item.amount])}
        />
        <ul className="cs-list">{study.costNotes.map((item) => <li key={item}>{item}</li>)}</ul>
        <FigureGrid figures={study.figures.filter((figure) => figure.group === 'Cost estimate')} />
      </section>

      <section id="cloud-reflection" className="cs-section">
        <h2>Analysis and reflection</h2>
        <ul className="cs-list">{study.reflection.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <References items={study.references} />
    </>
  )
}

export function CaseStudyDocument({ study }: { study: VisionCaseStudy | CloudCaseStudy }) {
  const toc = study.kind === 'vision'
    ? [
        ['vision-overview', 'Overview'], ['vision-data', 'Dataset and preparation'], ['vision-models', 'Model design'],
        ['vision-training', 'Training and evaluation'], ['vision-reflection', 'Critical analysis'],
      ]
    : [
        ['cloud-overview', 'Overview'], ['cloud-plan', 'Project plan'], ['cloud-requirements', 'Requirements'],
        ['cloud-design', 'Architecture'], ['cloud-implementation', 'AWS setup'], ['cloud-costing', 'Cost estimate'],
        ['cloud-reflection', 'Reflection'],
      ]

  return (
    <article className={`cs-document cs-document--${study.kind}`}>
      <header className="cs-document__head">
        <p className="cs-document__course">{study.course} · {study.module}</p>
        <h1>{study.title}</h1>
        <p className="cs-document__summary">{study.kind === 'vision' ? study.reportTitle : study.summary}</p>
      </header>
      <nav className="cs-toc" aria-label="Case study contents">
        <span>On this page</span>
        {toc.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
      </nav>
      {study.kind === 'vision' ? <VisionDocument study={study} /> : <CloudDocument study={study} />}
    </article>
  )
}

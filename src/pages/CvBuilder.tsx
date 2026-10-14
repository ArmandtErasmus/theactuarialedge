import { useEffect, useId, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUp, Download, FileText, Plus, TriangleAlert, Trash2 } from 'lucide-react'
import clsx from 'clsx'
import { Button, Container, Segmented } from '../components/ui'
import { CvPreview } from '../cv/CvPreview'
import {
  emptyEducation,
  emptyExperience,
  emptyProject,
  fileName,
  loadCv,
  saveCv,
  SECTION_TITLES,
  type CvData,
  type SectionId,
} from '../cv/model'
import { usePageTitle } from '../lib/usePageTitle'

// ---------- small form primitives ----------
function Field({ label, value, onChange, placeholder, hint, type = 'text', autoComplete }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string; type?: string; autoComplete?: string }) {
  const id = useId()
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gm-ink-soft">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="gm-field h-11 !py-0 text-sm"
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-gm-ink-dim">
          {hint}
        </p>
      )}
    </div>
  )
}

function Area({ label, value, onChange, placeholder, hint, minRows = 3 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string; minRows?: number }) {
  const id = useId()
  const rows = Math.max(minRows, value.split('\n').length + 1)
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gm-ink-soft">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        rows={rows}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="gm-field resize-y text-sm leading-relaxed"
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-gm-ink-dim">
          {hint}
        </p>
      )}
    </div>
  )
}

function MiniButton({ label, onClick, disabled, children, danger }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={clsx(
        'inline-flex size-8 items-center justify-center rounded-[0.6rem] border-2 border-transparent text-gm-ink-dim transition-colors disabled:opacity-30',
        danger ? 'hover:border-gm-coral-edge hover:bg-gm-coral/15 hover:text-gm-coral' : 'hover:border-gm-line hover:bg-gm-deep hover:text-gm-ink',
      )}
    >
      {children}
    </button>
  )
}

function Card({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="gm-panel gm-panel-lift">
      <div className="flex items-center gap-2 border-b-2 border-gm-line px-5 py-3">
        <span className="size-2.5 rounded-full bg-gm-lime" aria-hidden="true" />
        <h2 className="font-display text-sm uppercase">{title}</h2>
        <div className="ml-auto flex items-center">{actions}</div>
      </div>
      <div className="flex flex-col gap-4 p-5">{children}</div>
    </section>
  )
}

function Item({ label, index, count, onMove, onRemove, children }: { label: string; index: number; count: number; onMove: (d: -1 | 1) => void; onRemove: () => void; children: ReactNode }) {
  return (
    <div className="gm-inset p-4">
      <div className="mb-3 flex items-center">
        <span className="font-mono text-xs font-semibold text-gm-ink-soft">{label}</span>
        <div className="ml-auto flex">
          <MiniButton label={`Move ${label} up`} onClick={() => onMove(-1)} disabled={index === 0}>
            <ArrowUp className="size-4" />
          </MiniButton>
          <MiniButton label={`Move ${label} down`} onClick={() => onMove(1)} disabled={index === count - 1}>
            <ArrowDown className="size-4" />
          </MiniButton>
          <MiniButton label={`Remove ${label}`} onClick={onRemove} danger>
            <Trash2 className="size-4" />
          </MiniButton>
        </div>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

const AddButton = ({ onClick, children }: { onClick: () => void; children: ReactNode }) => (
  <button type="button" onClick={onClick} className="inline-flex h-10 items-center gap-1.5 self-start rounded-[0.85rem] border-2 border-dashed border-gm-grape-hi px-4 text-sm font-semibold text-gm-ink-soft transition-colors hover:border-gm-lime hover:text-gm-lime">
    <Plus className="size-4" aria-hidden="true" /> {children}
  </button>
)

const move = <T,>(list: T[], i: number, d: -1 | 1) => {
  const j = i + d
  if (j < 0 || j >= list.length) return list
  const next = [...list]
  ;[next[i], next[j]] = [next[j], next[i]]
  return next
}

const BULLET_HINT = 'One bullet per line. Start with an action verb and add a number where you can. Wrap words in **double asterisks** to make them bold.'

// ---------- page ----------
export default function CvBuilder() {
  usePageTitle('CV builder')
  // Paper size is no longer a choice, so older saves set to US Letter come back as A4.
  const [cv, setCv] = useState<CvData>(() => ({ ...loadCv(), paper: 'A4' }))
  const [pages, setPages] = useState(1)
  const [view, setView] = useState<'edit' | 'preview'>('edit')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  // Save on every change (a few KB), so nothing typed is lost if the tab closes.
  useEffect(() => {
    saveCv(cv)
  }, [cv])

  const set = <K extends keyof CvData>(key: K, value: CvData[K]) => setCv(c => ({ ...c, [key]: value }))
  const patch = <K extends 'education' | 'experience' | 'projects' | 'skills'>(key: K, i: number, value: Partial<CvData[K][number]>) =>
    setCv(c => ({ ...c, [key]: (c[key] as CvData[K][number][]).map((x, j) => (j === i ? { ...x, ...value } : x)) }))

  const download = async () => {
    setBusy(true)
    setError('')
    try {
      const { renderCvPdf } = await import('../cv/CvPdf')
      const blob = await renderCvPdf(cv)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName(cv)
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 10_000)
    } catch (e) {
      setError(`Couldn’t create the PDF: ${(e as Error).message}`)
    } finally {
      setBusy(false)
    }
  }

  const sectionActions = (id: SectionId) => {
    const i = cv.order.indexOf(id)
    return (
      <>
        <MiniButton label={`Move ${SECTION_TITLES[id]} section up`} onClick={() => set('order', move(cv.order, i, -1))} disabled={i === 0}>
          <ArrowUp className="size-4" />
        </MiniButton>
        <MiniButton label={`Move ${SECTION_TITLES[id]} section down`} onClick={() => set('order', move(cv.order, i, 1))} disabled={i === cv.order.length - 1}>
          <ArrowDown className="size-4" />
        </MiniButton>
      </>
    )
  }

  const sections: Record<SectionId, ReactNode> = {
    education: (
      <Card key="education" title="Education" actions={sectionActions('education')}>
        {cv.education.map((e, i) => (
          <Item
            key={i}
            label={`Education ${i + 1}`}
            index={i}
            count={cv.education.length}
            onMove={d => set('education', move(cv.education, i, d))}
            onRemove={() => set('education', cv.education.filter((_, j) => j !== i))}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Institution" value={e.institution} onChange={v => patch('education', i, { institution: v })} placeholder="University of Cape Town" />
              <Field label="Date" value={e.date} onChange={v => patch('education', i, { date: v })} placeholder="Graduation: December 2026" />
              <Field label="Qualification" value={e.qualification} onChange={v => patch('education', i, { qualification: v })} placeholder="BBusSc in Actuarial Science" />
              <Field label="Location" value={e.location} onChange={v => patch('education', i, { location: v })} placeholder="Cape Town, South Africa" />
            </div>
          </Item>
        ))}
        <AddButton onClick={() => set('education', [...cv.education, emptyEducation()])}>Add education</AddButton>
        <Area label="Relevant coursework (optional)" value={cv.coursework} onChange={v => set('coursework', v)} minRows={2} placeholder="Financial Mathematics, Life Contingencies, Statistical Modelling (R)" />
      </Card>
    ),
    experience: (
      <Card key="experience" title="Experience" actions={sectionActions('experience')}>
        {cv.experience.map((e, i) => (
          <Item
            key={i}
            label={`Role ${i + 1}`}
            index={i}
            count={cv.experience.length}
            onMove={d => set('experience', move(cv.experience, i, d))}
            onRemove={() => set('experience', cv.experience.filter((_, j) => j !== i))}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Organisation" value={e.organisation} onChange={v => patch('experience', i, { organisation: v })} placeholder="Discovery Health" />
              <Field label="Dates" value={e.date} onChange={v => patch('experience', i, { date: v })} placeholder="Jan 2025 – Present" />
              <Field label="Role" value={e.role} onChange={v => patch('experience', i, { role: v })} placeholder="Actuarial Analyst Intern" />
              <Field label="Location" value={e.location} onChange={v => patch('experience', i, { location: v })} placeholder="Johannesburg, South Africa" />
            </div>
            <Area label="What you did" value={e.bullets} onChange={v => patch('experience', i, { bullets: v })} hint={BULLET_HINT} placeholder={'Built an R model to project lapse rates, cutting review time by 30%.\nPresented experience analysis results to the pricing team.'} />
          </Item>
        ))}
        <AddButton onClick={() => set('experience', [...cv.experience, emptyExperience()])}>Add a role</AddButton>
      </Card>
    ),
    projects: (
      <Card key="projects" title="Projects" actions={sectionActions('projects')}>
        {cv.projects.map((p, i) => (
          <Item
            key={i}
            label={`Project ${i + 1}`}
            index={i}
            count={cv.projects.length}
            onMove={d => set('projects', move(cv.projects, i, d))}
            onRemove={() => set('projects', cv.projects.filter((_, j) => j !== i))}
          >
            <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
              <Field label="Project name" value={p.name} onChange={v => patch('projects', i, { name: v })} placeholder="Bornhuetter-Ferguson Reserving Engine" />
              <Field label="Technologies" value={p.tech} onChange={v => patch('projects', i, { tech: v })} placeholder="Python, Streamlit" />
            </div>
            <Field label="Date (optional)" value={p.date} onChange={v => patch('projects', i, { date: v })} placeholder="2025" />
            <Area label="What you built" value={p.bullets} onChange={v => patch('projects', i, { bullets: v })} hint={BULLET_HINT} />
          </Item>
        ))}
        <AddButton onClick={() => set('projects', [...cv.projects, emptyProject()])}>Add a project</AddButton>
        <p className="text-sm text-gm-ink-dim">
          Need a project? The{' '}
          <Link to="/projects" className="font-semibold text-gm-lime underline decoration-gm-lime-edge decoration-2 underline-offset-4 hover:decoration-gm-lime">
            portfolio projects
          </Link>{' '}
          each come with CV bullet points you can adapt.
        </p>
      </Card>
    ),
    skills: (
      <Card key="skills" title="Skills & Certifications" actions={sectionActions('skills')}>
        {cv.skills.map((r, i) => (
          <div key={i} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)_auto] items-end gap-2">
            <Field label="Label" value={r.label} onChange={v => patch('skills', i, { label: v })} placeholder="Technical" />
            <Field label="Details" value={r.value} onChange={v => patch('skills', i, { value: v })} placeholder="Python, R, SQL, Excel" />
            <MiniButton label={`Remove ${r.label || 'skill row'}`} onClick={() => set('skills', cv.skills.filter((_, j) => j !== i))} danger>
              <Trash2 className="size-4" />
            </MiniButton>
          </div>
        ))}
        <AddButton onClick={() => set('skills', [...cv.skills, { label: '', value: '' }])}>Add a row</AddButton>
      </Card>
    ),
  }

  const fits = pages <= 1
  return (
    <Container className="py-12">
      <div className="flex flex-col gap-5 border-b-2 border-gm-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.05] uppercase sm:text-5xl">CV builder</h1>
          <p className="mt-4 text-lg leading-relaxed text-gm-ink-soft">
            Fill in your details and the template completes itself. Download a clean, ATS-readable PDF when you’re done.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" onClick={download} loading={busy}>
            {!busy && <Download className="size-4" aria-hidden="true" />} Download PDF
          </Button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-[0.85rem] border-2 border-gm-coral-edge bg-gm-coral/15 px-4 py-2.5 text-sm font-semibold text-gm-coral">
          {error}
        </p>
      )}

      <div className="mt-4 lg:hidden">
        <Segmented
          label="Builder view"
          value={view}
          onChange={setView}
          options={[
            { value: 'edit', label: 'Edit' },
            { value: 'preview', label: 'Preview' },
          ]}
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className={clsx('flex min-w-0 flex-col gap-6', view === 'preview' && 'hidden lg:flex')}>
          <Card title="Your details">
            <Field label="Full name" value={cv.name} onChange={v => set('name', v)} placeholder="Thandi Mokoena" autoComplete="name" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Phone" type="tel" value={cv.phone} onChange={v => set('phone', v)} placeholder="(+27) 82 123 4567" autoComplete="tel" />
              <Field label="Email" type="email" value={cv.email} onChange={v => set('email', v)} placeholder="thandi@example.com" autoComplete="email" />
              <Field label="LinkedIn" value={cv.linkedin} onChange={v => set('linkedin', v)} placeholder="linkedin.com/in/thandi" />
              <Field label="Website or GitHub (optional)" value={cv.website} onChange={v => set('website', v)} placeholder="github.com/thandi" />
            </div>
          </Card>
          {cv.order.map(id => sections[id])}
        </div>

        <div className={clsx('min-w-0', view === 'edit' && 'hidden lg:block')}>
          <div className="gm-panel gm-panel-lift overflow-hidden lg:sticky lg:top-24">
            <div className="flex items-center gap-2 border-b-2 border-gm-line px-5 py-3 text-sm">
              <FileText className="size-4 text-gm-lime" aria-hidden="true" />
              <span className="font-display text-sm uppercase">Preview</span>
              <span className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-gm-gold" aria-live="polite">
                {!fits && (
                  <>
                    <TriangleAlert className="size-3.5" aria-hidden="true" /> Runs to {pages} pages. Most CVs should fit on one.
                  </>
                )}
              </span>
            </div>
            <div className="gm-scroll max-h-[calc(100dvh-12rem)] overflow-y-auto bg-gm-void p-4">
              <CvPreview cv={cv} onPages={setPages} />
            </div>
            <p className="border-t-2 border-gm-line px-5 py-3 text-sm text-gm-ink-dim">
              Tips:{' '}
              <Link to="/careers/cv-tips" className="font-semibold text-gm-lime underline decoration-gm-lime-edge decoration-2 underline-offset-4 hover:decoration-gm-lime">
                writing strong bullet points
              </Link>{' '}
              ·{' '}
              <Link to="/careers/ats-friendly-cv" className="font-semibold text-gm-lime underline decoration-gm-lime-edge decoration-2 underline-offset-4 hover:decoration-gm-lime">
                getting past ATS screening
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

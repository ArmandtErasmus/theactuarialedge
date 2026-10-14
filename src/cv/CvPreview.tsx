// Live HTML preview of the CV. Same structure and point sizes as CvPdf, so the preview
// matches the download; it also reports how many pages the CV runs to.
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { CV, PAPER, smallCaps } from './layout'
import { bulletLines, contactItems, richRuns, SECTION_TITLES, sectionHasContent, type CvData, type SectionId } from './model'

const PT = 4 / 3 // CSS px per point
const pt = (n: number) => `${n}pt`
const serif = "'Times New Roman', Times, 'Liberation Serif', Tinos, serif"

const Rich = ({ text }: { text: string }) => (
  <>
    {richRuns(text).map((r, i) => (r.bold ? <b key={i}>{r.text}</b> : <span key={i}>{r.text}</span>))}
  </>
)

function Title({ children }: { children: string }) {
  return (
    <div style={{ borderBottom: `${CV.rule}pt solid #000`, paddingBottom: pt(1), marginBottom: pt(3), lineHeight: 1.15 }}>
      {smallCaps(children).map((r, i) => (
        <span key={i} style={{ fontSize: pt(r.small ? CV.titleSmall : CV.titleBig) }}>
          {r.text}
        </span>
      ))}
    </div>
  )
}

function Row({ left, right, sub }: { left: ReactNode; right?: string; sub?: boolean }) {
  const base: CSSProperties = sub ? { fontSize: pt(CV.sub), fontStyle: 'italic' } : { fontSize: pt(CV.head) }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: pt(8) }}>
      <span style={{ ...base, fontWeight: sub ? 400 : 700, minWidth: 0 }}>{left}</span>
      {right ? <span style={{ ...base, textAlign: 'right', whiteSpace: 'nowrap' }}>{right}</span> : null}
    </div>
  )
}

function Bullets({ text }: { text: string }) {
  const lines = bulletLines(text)
  if (!lines.length) return null
  return (
    <ul style={{ margin: `${pt(1.5)} 0 0`, paddingLeft: pt(CV.bulletIndent), listStyle: 'none' }}>
      {lines.map((l, i) => (
        <li key={i} style={{ display: 'flex', marginTop: pt(1) }}>
          <span style={{ width: pt(9), flexShrink: 0 }}>•</span>
          <span>
            <Rich text={l} />
          </span>
        </li>
      ))}
    </ul>
  )
}

const entry: CSSProperties = { paddingLeft: pt(CV.entryIndent), marginTop: pt(CV.entryGap) }

function Section({ id, cv }: { id: SectionId; cv: CvData }) {
  if (!sectionHasContent[id](cv)) return null
  return (
    <section style={{ marginTop: pt(CV.sectionGap) }}>
      <Title>{SECTION_TITLES[id]}</Title>
      {id === 'education' && (
        <>
          {cv.education
            .filter(e => e.institution || e.qualification)
            .map((e, i) => (
              <div key={i} style={entry}>
                <Row left={e.institution} right={e.date} />
                {(e.qualification || e.location) && <Row sub left={e.qualification} right={e.location} />}
              </div>
            ))}
          {cv.coursework.trim() && (
            <p style={{ ...entry, margin: `${pt(CV.entryGap)} 0 0`, fontSize: pt(10.5) }}>
              <b>Coursework: </b>
              {cv.coursework.trim()}
            </p>
          )}
        </>
      )}
      {id === 'experience' &&
        cv.experience
          .filter(e => e.organisation || e.role || e.bullets.trim())
          .map((e, i) => (
            <div key={i} style={entry}>
              <Row left={e.organisation} right={e.date} />
              {(e.role || e.location) && <Row sub left={e.role} right={e.location} />}
              <Bullets text={e.bullets} />
            </div>
          ))}
      {id === 'projects' &&
        cv.projects
          .filter(p => p.name || p.bullets.trim())
          .map((p, i) => (
            <div key={i} style={entry}>
              <Row
                left={
                  <>
                    {p.name}
                    {p.tech.trim() && (
                      <span style={{ fontWeight: 400 }}>
                        {' | '}
                        <i>{p.tech.trim()}</i>
                      </span>
                    )}
                  </>
                }
                right={p.date}
              />
              <Bullets text={p.bullets} />
            </div>
          ))}
      {id === 'skills' && (
        <div style={{ ...entry, marginTop: pt(2) }}>
          {cv.skills
            .filter(r => r.value.trim())
            .map((r, i) => (
              <div key={i}>
                {r.label.trim() && <b>{r.label.trim()}: </b>}
                {r.value.trim()}
              </div>
            ))}
        </div>
      )}
    </section>
  )
}

/** Renders the CV on a scaled sheet of paper and reports its page count. */
export function CvPreview({ cv, onPages }: { cv: CvData; onPages?: (n: number) => void }) {
  const paper = PAPER[cv.paper]
  const pageW = paper.width * PT
  const pageH = paper.height * PT
  const frame = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.6)
  const [pages, setPages] = useState(1)

  useLayoutEffect(() => {
    const el = frame.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / pageW)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [pageW])

  useLayoutEffect(() => {
    const total = (content.current?.offsetHeight ?? 0) + (CV.margin.top + CV.margin.bottom) * PT
    const n = Math.max(1, Math.ceil(total / pageH - 0.002))
    setPages(n)
    onPages?.(n)
  })

  const contacts = contactItems(cv)
  return (
    <div ref={frame} className="w-full">
      <div style={{ height: pageH * pages * scale }} className="relative">
        <div
          aria-label="CV preview"
          style={{
            width: pageW,
            minHeight: pageH * pages,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            padding: `${pt(CV.margin.top)} ${pt(CV.margin.x)} ${pt(CV.margin.bottom)}`,
            fontFamily: serif,
            fontSize: pt(CV.body),
            lineHeight: CV.lineHeight,
            color: '#000',
            background: '#fff',
            overflowWrap: 'anywhere',
          }}
          className="absolute top-0 left-0 rounded-sm shadow-[0_1px_3px_rgb(0_0_0/0.3),0_12px_32px_rgb(0_0_0/0.25)]"
        >
          <div ref={content}>
          {cv.name.trim() && <div style={{ fontSize: pt(CV.name), fontWeight: 700, textAlign: 'center', lineHeight: 1.1 }}>{cv.name.trim()}</div>}
          {contacts.length > 0 && (
            <div style={{ fontSize: pt(CV.contact), textAlign: 'center', marginTop: pt(5) }}>
              {contacts.map((c, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ whiteSpace: 'pre' }}>{'  |  '}</span>}
                  {c.text}
                </span>
              ))}
            </div>
          )}
          {cv.order.map(id => (
            <Section key={id} id={id} cv={cv} />
          ))}
          </div>
          {/* page boundaries */}
          {Array.from({ length: pages - 1 }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{ position: 'absolute', left: 0, right: 0, top: pageH * (i + 1), borderTop: '2px dashed #ef4444' }}
            >
              <span style={{ position: 'absolute', right: 8, top: 4, font: '600 11px system-ui', color: '#ef4444' }}>Page {i + 2}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

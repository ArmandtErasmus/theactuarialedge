// The downloadable CV, rendered to a real text PDF in the browser (@react-pdf/renderer).
// Loaded on demand from the builder, so the library never ships with other pages.
import { Document, Font, Link, Page, StyleSheet, Text, View, pdf } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import { CV, smallCaps } from './layout'
import {
  bulletLines,
  contactItems,
  pdfSafe,
  richRuns,
  SECTION_TITLES,
  sectionHasContent,
  type CvData,
  type SectionId,
} from './model'

// Never hyphenate: split words read badly on a CV and can break ATS keyword matching.
Font.registerHyphenationCallback(word => [word])

const s = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: CV.body,
    lineHeight: CV.lineHeight,
    paddingHorizontal: CV.margin.x,
    paddingTop: CV.margin.top,
    paddingBottom: CV.margin.bottom,
    color: '#000',
  },
  name: { fontSize: CV.name, fontFamily: 'Times-Bold', textAlign: 'center', lineHeight: 1.1 },
  contact: { fontSize: CV.contact, textAlign: 'center', marginTop: 5 },
  link: { color: '#000', textDecoration: 'none' },
  section: { marginTop: CV.sectionGap },
  title: { borderBottomWidth: CV.rule, borderBottomColor: '#000', paddingBottom: 1, marginBottom: 3, lineHeight: 1.15 },
  entry: { paddingLeft: CV.entryIndent, marginTop: CV.entryGap },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  head: { fontSize: CV.head, fontFamily: 'Times-Bold' },
  headRight: { fontSize: CV.head, textAlign: 'right' },
  sub: { fontSize: CV.sub, fontFamily: 'Times-Italic' },
  subRight: { fontSize: CV.sub, fontFamily: 'Times-Italic', textAlign: 'right' },
  bullets: { marginTop: 1.5, paddingLeft: CV.bulletIndent },
  bullet: { flexDirection: 'row', marginTop: 1 },
  dot: { width: 9 },
  bulletText: { flex: 1 },
  bold: { fontFamily: 'Times-Bold' },
  italic: { fontFamily: 'Times-Italic' },
  line: { paddingLeft: CV.entryIndent, marginTop: CV.entryGap },
})

const Rich = ({ text }: { text: string }) => (
  <>
    {richRuns(pdfSafe(text)).map((r, i) => (
      <Text key={i} style={r.bold ? s.bold : undefined}>
        {r.text}
      </Text>
    ))}
  </>
)

function Title({ children }: { children: string }) {
  return (
    <View style={s.title} minPresenceAhead={40}>
      <Text style={{ lineHeight: 1.15 }}>
        {smallCaps(children).map((r, i) => (
          <Text key={i} style={{ fontSize: r.small ? CV.titleSmall : CV.titleBig, lineHeight: 1.15 }}>
            {r.text}
          </Text>
        ))}
      </Text>
    </View>
  )
}

function Row({ left, right, sub }: { left: ReactNode; right?: string; sub?: boolean }) {
  return (
    <View style={s.row}>
      <Text style={[sub ? s.sub : s.head, { flexShrink: 1, paddingRight: 8 }]}>{left}</Text>
      {right ? <Text style={sub ? s.subRight : s.headRight}>{pdfSafe(right)}</Text> : null}
    </View>
  )
}

function Bullets({ text }: { text: string }) {
  const lines = bulletLines(text)
  if (!lines.length) return null
  return (
    <View style={s.bullets}>
      {lines.map((l, i) => (
        <View key={i} style={s.bullet} wrap={false}>
          <Text style={s.dot}>•</Text>
          <Text style={s.bulletText}>
            <Rich text={l} />
          </Text>
        </View>
      ))}
    </View>
  )
}

function Section({ id, cv }: { id: SectionId; cv: CvData }) {
  if (!sectionHasContent[id](cv)) return null
  const title = <Title>{SECTION_TITLES[id]}</Title>
  if (id === 'education')
    return (
      <View style={s.section}>
        {title}
        {cv.education
          .filter(e => e.institution || e.qualification)
          .map((e, i) => (
            <View key={i} style={s.entry} wrap={false}>
              <Row left={pdfSafe(e.institution)} right={e.date} />
              {(e.qualification || e.location) && <Row sub left={pdfSafe(e.qualification)} right={e.location} />}
            </View>
          ))}
        {cv.coursework.trim() && (
          <Text style={[s.line, { fontSize: 10.5 }]}>
            <Text style={s.bold}>Coursework: </Text>
            {pdfSafe(cv.coursework.trim())}
          </Text>
        )}
      </View>
    )
  if (id === 'experience')
    return (
      <View style={s.section}>
        {title}
        {cv.experience
          .filter(e => e.organisation || e.role || e.bullets.trim())
          .map((e, i) => (
            <View key={i} style={s.entry}>
              <View wrap={false}>
                <Row left={pdfSafe(e.organisation)} right={e.date} />
                {(e.role || e.location) && <Row sub left={pdfSafe(e.role)} right={e.location} />}
              </View>
              <Bullets text={e.bullets} />
            </View>
          ))}
      </View>
    )
  if (id === 'projects')
    return (
      <View style={s.section}>
        {title}
        {cv.projects
          .filter(p => p.name || p.bullets.trim())
          .map((p, i) => (
            <View key={i} style={s.entry}>
              <Row
                left={
                  <>
                    <Text style={s.bold}>{pdfSafe(p.name)}</Text>
                    {p.tech.trim() ? (
                      <Text style={{ fontFamily: 'Times-Roman' }}>
                        {' | '}
                        <Text style={s.italic}>{pdfSafe(p.tech.trim())}</Text>
                      </Text>
                    ) : null}
                  </>
                }
                right={p.date}
              />
              <Bullets text={p.bullets} />
            </View>
          ))}
      </View>
    )
  return (
    <View style={s.section}>
      {title}
      <View style={[s.line, { marginTop: 2 }]}>
        {cv.skills
          .filter(r => r.value.trim())
          .map((r, i) => (
            <Text key={i}>
              {r.label.trim() && <Text style={s.bold}>{pdfSafe(r.label.trim())}: </Text>}
              {pdfSafe(r.value.trim())}
            </Text>
          ))}
      </View>
    </View>
  )
}

export function CvDocument({ cv }: { cv: CvData }) {
  const contacts = contactItems(cv)
  return (
    <Document title={`${cv.name || 'CV'}`} author={cv.name} creator="The Actuarial Edge CV builder" producer="The Actuarial Edge">
      <Page size={cv.paper} style={s.page}>
        {cv.name.trim() && <Text style={s.name}>{pdfSafe(cv.name.trim())}</Text>}
        {contacts.length > 0 && (
          <Text style={s.contact}>
            {contacts.map((c, i) => (
              <Text key={i}>
                {i > 0 ? '  |  ' : ''}
                {c.href ? (
                  <Link src={c.href} style={s.link}>
                    {pdfSafe(c.text)}
                  </Link>
                ) : (
                  pdfSafe(c.text)
                )}
              </Text>
            ))}
          </Text>
        )}
        {cv.order.map(id => (
          <Section key={id} id={id} cv={cv} />
        ))}
      </Page>
    </Document>
  )
}

export async function renderCvPdf(cv: CvData): Promise<Blob> {
  return pdf(<CvDocument cv={cv} />).toBlob()
}

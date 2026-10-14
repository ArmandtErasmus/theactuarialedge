// CV builder data model. Mirrors the site's LaTeX / Word CV template (one column:
// heading, education, experience, projects, skills). Saved only in this browser.
import { readStore, writeStore } from '../state/storage'

export interface EducationItem {
  institution: string
  date: string
  qualification: string
  location: string
}

export interface ExperienceItem {
  organisation: string
  date: string
  role: string
  location: string
  /** One bullet per line. **text** is bold. */
  bullets: string
}

export interface ProjectItem {
  name: string
  tech: string
  date: string
  bullets: string
}

export interface SkillRow {
  label: string
  value: string
}

export type SectionId = 'education' | 'experience' | 'projects' | 'skills'
export type PaperSize = 'A4' | 'LETTER'

export interface CvData {
  version: 1
  name: string
  phone: string
  email: string
  linkedin: string
  website: string
  education: EducationItem[]
  coursework: string
  experience: ExperienceItem[]
  projects: ProjectItem[]
  skills: SkillRow[]
  order: SectionId[]
  paper: PaperSize
}

export const SECTION_TITLES: Record<SectionId, string> = {
  education: 'Education',
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills & Certifications',
}

export const DEFAULT_ORDER: SectionId[] = ['education', 'experience', 'projects', 'skills']

export const emptyEducation = (): EducationItem => ({ institution: '', date: '', qualification: '', location: '' })
export const emptyExperience = (): ExperienceItem => ({ organisation: '', date: '', role: '', location: '', bullets: '' })
export const emptyProject = (): ProjectItem => ({ name: '', tech: '', date: '', bullets: '' })

export const blankCv = (): CvData => ({
  version: 1,
  name: '',
  phone: '',
  email: '',
  linkedin: '',
  website: '',
  education: [emptyEducation()],
  coursework: '',
  experience: [emptyExperience()],
  projects: [emptyProject()],
  skills: [
    { label: 'Technical', value: '' },
    { label: 'Actuarial Exams', value: '' },
    { label: 'Certifications', value: '' },
  ],
  order: [...DEFAULT_ORDER],
  paper: 'A4',
})

// ---------- examples (the content of the downloadable templates) ----------

export const experiencedExample = (): CvData => ({
  ...blankCv(),
  name: 'Name Surname',
  phone: '(+44) 7XXX XXXXXX',
  email: 'namesurname@gmail.com',
  linkedin: 'linkedin.com/in/namesurname',
  website: 'portfoliowebsite.com',
  education: [
    { institution: 'University of Oxford', date: 'Graduation: December 2024', qualification: 'Master of Science in Mathematical and Theoretical Physics', location: 'Oxford, United Kingdom' },
    { institution: 'Institute and Faculty of Actuaries', date: '', qualification: 'Fellow of the Institute and Faculty of Actuaries (FIA)', location: 'January 2024' },
  ],
  coursework: 'Financial Engineering, Mathematical Statistics (with computational applications in Python and R), Computational Physics (Python), Mathematical Modelling',
  experience: [
    {
      organisation: 'Swiss Re Life & Health',
      date: 'Oct 2025 – Present',
      role: 'Lead Valuation Actuary',
      location: 'London, United Kingdom',
      bullets: [
        'Directed valuation and financial reporting for a **£9.5bn** life insurance portfolio across Protection and Annuities, delivering IFRS 17 and Solvency II results with zero audit issues over 12 consecutive quarters.',
        'Engineered Python- and Prophet-based cashflow and assumption models for longevity, lapse and expense risk, **cutting valuation runtimes by 40%** and enabling real-time stress testing.',
      ].join('\n'),
    },
    {
      organisation: 'Citadel Global Equities',
      date: 'Jul 2023 – Sep 2025',
      role: 'Quantitative Analyst',
      location: 'New York, United States',
      bullets: [
        'Researched and deployed systematic equity long/short strategies across US and European markets, generating **4.1% annualised alpha** net of costs with a Sharpe ratio of 2.3.',
        'Built low-latency Python and C++ signal pipelines integrating alternative datasets, improving hit-rate on top-quartile trades by 19%.',
      ].join('\n'),
    },
  ],
  projects: [
    {
      name: 'Interest Rate Swap Pricing & Risk Engine',
      tech: 'C++, Quantitative Finance, Fixed Income',
      date: '',
      bullets: [
        'Built an interest rate swap pricing engine in C++ using OIS discounting and SONIA forward curve construction, bootstrapping zero curves from market instruments.',
        'Implemented present value and risk calculations for fixed-for-floating swaps, producing NPV, DV01 and key rate duration profiles.',
      ].join('\n'),
    },
  ],
  skills: [
    { label: 'Technical', value: 'Python, R, SQL (PostgreSQL, MySQL), C++, Microsoft Excel, VBA, MATLAB, SAS, Git' },
    { label: 'Machine Learning', value: 'Scikit-Learn, TensorFlow, PyTorch, NumPy, Pandas' },
    { label: 'Actuarial Exams', value: 'CS1, CS2, CM1, CM2, CB1, CB2, CB3, CP1, CP2, CP3, SP0, SP5, SP6, SA3' },
    { label: 'Certifications', value: 'Financial Risk Manager (FRM), Chartered Financial Analyst (CFA)' },
  ],
})

// ---------- helpers shared by the preview and the PDF ----------

export const bulletLines = (s: string) =>
  s
    .split('\n')
    .map(l => l.replace(/^\s*[-•*]\s+/, '').trim())
    .filter(Boolean)

/** Splits "**bold** text" into runs. */
export function richRuns(s: string): { text: string; bold: boolean }[] {
  return s
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map(part => (part.startsWith('**') && part.endsWith('**') ? { text: part.slice(2, -2), bold: true } : { text: part, bold: false }))
}

export const contactItems = (cv: CvData) =>
  [
    cv.phone && { text: cv.phone },
    cv.email && { text: cv.email, href: `mailto:${cv.email}` },
    cv.linkedin && { text: cv.linkedin, href: withProtocol(cv.linkedin) },
    cv.website && { text: cv.website, href: withProtocol(cv.website) },
  ].filter(Boolean) as { text: string; href?: string }[]

const withProtocol = (u: string) => (/^https?:\/\//i.test(u) ? u : `https://${u.replace(/^\/+/, '')}`)

export const hasEducation = (cv: CvData) => cv.education.some(e => e.institution || e.qualification) || !!cv.coursework.trim()
export const hasExperience = (cv: CvData) => cv.experience.some(e => e.organisation || e.role || e.bullets.trim())
export const hasProjects = (cv: CvData) => cv.projects.some(p => p.name || p.bullets.trim())
export const hasSkills = (cv: CvData) => cv.skills.some(s => s.value.trim())
export const sectionHasContent: Record<SectionId, (cv: CvData) => boolean> = {
  education: hasEducation,
  experience: hasExperience,
  projects: hasProjects,
  skills: hasSkills,
}

export function fileName(cv: CvData) {
  const base = cv.name.trim().replace(/[^\p{L}\p{N}]+/gu, '_').replace(/^_|_$/g, '')
  return `${base || 'My'}_CV.pdf`
}

/**
 * The PDF uses the standard Times fonts (Windows-1252 glyphs), which keeps the file small and
 * fully text-searchable for applicant tracking systems. Characters outside that set are
 * transliterated (ā -> a) rather than rendered as blanks.
 */
const WIN1252_EXTRA = '€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ'
export function pdfSafe(s: string): string {
  let out = ''
  for (const ch of s) {
    const c = ch.codePointAt(0)!
    if (c <= 0xff || WIN1252_EXTRA.includes(ch)) out += ch
    else if (ch === '≥') out += '>='
    else if (ch === '≤') out += '<='
    else if (ch === '−') out += '-'
    else out += ch.normalize('NFKD').replace(/[^\x00-\xff]/g, '')
  }
  return out
}

// ---------- persistence ----------
const KEY = 'ae:cv:v1'
export const loadCv = (): CvData => {
  const saved = readStore<Partial<CvData> | null>(KEY, null)
  return saved && saved.version === 1 ? { ...blankCv(), ...saved } : experiencedExample()
}
export const saveCv = (cv: CvData) => writeStore(KEY, cv)

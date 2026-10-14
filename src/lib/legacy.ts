// Maps URLs from the old static site (theactuarialedge.com/*.html) to their new homes,
// so existing links and search results keep working.

const EXACT: Record<string, string> = {
  'index.html': '/',
  'exams.html': '/exams',
  'exams/ifoa.html': '/exams',
  'exams/assa.html': '/exams?society=ASSA',
  'exams/probability.html': '/problems?subject=probability',
  'exams/statistics.html': '/problems?subject=statistics',
  'exams/finance.html': '/problems?subject=finance',
  'exams/brainteasers.html': '/problems?subject=brainteasers',
  'projects.html': '/projects',
  'projects/xvaengine.html': '/projects/xva',
  'cv.html': '/careers',
  'resources.html': '/careers',
  'resources/python.html': '/code',
  'resources/r.html': '/code?lang=r',
  'resources/sql.html': '/code?lang=sql',
  'resources/careers.html': '/careers/actuarial-careers',
  'resources/roadmap.html': '/careers/route-to-qualification',
  'resources/certifications.html': '/careers/certifications',
  'resumes/graduate.html': '/careers/graduate-cv',
  'resumes/experienced.html': '/careers/experienced-cv',
  'resumes/tips.html': '/careers/cv-tips',
  'resumes/ats.html': '/careers/ats-friendly-cv',
}

export function legacyRedirect(pathname: string): string | null {
  const p = pathname.replace(/^\/+/, '')
  if (!p.endsWith('.html')) return null
  if (EXACT[p]) return EXACT[p]
  const exam = /^exams\/(ifoa|assa)-([a-z]+\d+)\.html$/.exec(p)
  if (exam) return `/exams/${exam[1]}-${exam[2]}`
  const project = /^projects\/([a-z]+)\.html$/.exec(p)
  if (project) return `/projects/${project[1]}`
  return null
}

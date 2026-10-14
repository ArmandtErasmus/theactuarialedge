import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Layout } from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Problems = lazy(() => import('./pages/Problems'))
const Workspace = lazy(() => import('./pages/Workspace'))
const Exams = lazy(() => import('./pages/Exams'))
const ExamDetail = lazy(() => import('./pages/ExamDetail'))
const Session = lazy(() => import('./pages/Session'))
const Code = lazy(() => import('./pages/Code'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Careers = lazy(() => import('./pages/Careers'))
const CvBuilder = lazy(() => import('./pages/CvBuilder'))
const GuideDetail = lazy(() => import('./pages/GuideDetail'))
const PastPapers = lazy(() => import('./pages/PastPapers'))
const Progress = lazy(() => import('./pages/Progress'))
const Settings = lazy(() => import('./pages/Settings'))
const NotFound = lazy(() => import('./pages/NotFound'))
const SelfTest = import.meta.env.DEV ? lazy(() => import('./pages/SelfTest')) : () => null

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'problems', element: <Problems /> },
        { path: 'problems/:id', element: <Workspace /> },
        { path: 'session', element: <Session /> },
        { path: 'exams', element: <Exams /> },
        { path: 'exams/:examId', element: <ExamDetail /> },
        { path: 'code', element: <Code /> },
        { path: 'projects', element: <Projects /> },
        { path: 'projects/:slug', element: <ProjectDetail /> },
        { path: 'careers', element: <Careers /> },
        { path: 'careers/cv-builder', element: <CvBuilder /> },
        { path: 'careers/:slug', element: <GuideDetail /> },
        { path: 'past-papers', element: <PastPapers /> },
        { path: 'progress', element: <Progress /> },
        { path: 'settings', element: <Settings /> },
        ...(import.meta.env.DEV ? [{ path: 'dev/selftest', element: <SelfTest /> }] : []),
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

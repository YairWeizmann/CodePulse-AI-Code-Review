import { useEffect, useState } from 'react'
import { SiteHeader } from './components/SiteHeader'
import { DemoFooter } from './components/DemoFooter'
import { LoginPlaceholder } from './components/LoginPlaceholder'
import { EmptyState, LoadingState } from './components/EmptyState'
import { Workspace } from './pages/Workspace'
import { HomePage } from './pages/HomePage'
import type { DemoScenario } from './data/types'
import { useWorkspace } from './hooks/useWorkspace'

function App() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1))
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [repoFilter, setRepoFilter] = useState('all')
  const [scenario, setScenario] = useState<DemoScenario>('default')
  const [showLogin, setShowLogin] = useState(false)
  const workspace = useWorkspace(scenario)
  const isHome = ['', 'features', 'about', 'docs'].includes(route)

  // Hash links keep navigation and browser Back/Forward simple in this local app.
  useEffect(() => {
    function onHashChange() {
      const nextRoute = window.location.hash.slice(1)
      setRoute(nextRoute)
      setQuery('')
      setFilter('all')
      setRepoFilter('all')
      if (!['features', 'about', 'docs'].includes(nextRoute)) {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // React mounts after native fragment scrolling on a direct visit or refresh.
  useEffect(() => {
    if (isHome && route) {
      document.getElementById(route)?.scrollIntoView({ behavior: 'instant' })
    }
  }, [isHome, route])

  // Shared by every GitHub login button. Connect Spring Boot OAuth here later.
  function handleLogin() {
    window.location.assign('/oauth2/authorization/github')
  }

  function clearFilters() {
    setQuery('')
    setFilter('all')
    setRepoFilter('all')
  }
  function restoreDemo() {
    setScenario('default')
    window.location.hash = 'repositories'
    clearFilters()
  }

  return (
    <div className={isHome ? 'app-shell landing-page' : 'app-shell'}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
      >
        Skip to content
      </a>
      {isHome ? (
        <HomePage onLogin={handleLogin} />
      ) : (
        <>
          <SiteHeader route={route} onLogin={handleLogin} />
          <main id="main-content" tabIndex={-1}>
            {workspace.status === 'loading' ? (
              <LoadingState />
            ) : workspace.status === 'error' ? (
              <>
                <div className="page-heading">
                  <div>
                    <p className="eyebrow">YOUR WORKSPACE</p>
                    <h1>A small bump in the road.</h1>
                  </div>
                </div>
                <EmptyState
                  title="We couldn’t load your workspace"
                  description={workspace.message}
                  error
                  onReset={restoreDemo}
                />
              </>
            ) : (
              <Workspace
                data={workspace.data}
                route={route}
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
                repoFilter={repoFilter}
                setRepoFilter={setRepoFilter}
                clearFilters={clearFilters}
                restoreDemo={restoreDemo}
              />
            )}
          </main>
          <DemoFooter
            scenario={scenario}
            onScenarioChange={(value) => {
              setScenario(value)
              window.location.hash = 'repositories'
            }}
          />
        </>
      )}
      {showLogin && <LoginPlaceholder onClose={() => setShowLogin(false)} />}
    </div>
  )
}

export default App

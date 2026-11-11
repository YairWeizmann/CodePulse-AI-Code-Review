import { FolderGit2, Github, GitPullRequest, History } from 'lucide-react'
import { Brand } from './Brand'

type Page = 'repositories' | 'pull-requests' | 'history'

export function SiteHeader({
  route,
  onLogin,
}: {
  route: string
  onLogin: () => void
}) {
  const activePage: Page =
    route === 'history' || route.startsWith('review/')
      ? 'history'
      : route === 'pull-requests' || route.startsWith('pull-request/')
        ? 'pull-requests'
        : 'repositories'
  const pageLabels: Record<Page, string> = {
    repositories: 'Repositories',
    'pull-requests': 'Pull requests',
    history: 'Review history',
  }
  const navIcons = {
    repositories: FolderGit2,
    'pull-requests': GitPullRequest,
    history: History,
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav aria-label="Main navigation">
          {(Object.keys(pageLabels) as Page[]).map((page) => {
            const Icon = navIcons[page]
            return (
              <a
                key={page}
                href={`#${page}`}
                className={activePage === page ? 'active' : ''}
                aria-current={activePage === page ? 'page' : undefined}
              >
                <Icon size={16} />
                {pageLabels[page]}
              </a>
            )
          })}
        </nav>
        <div className="header-actions">
          <span className="demo-badge">
            <span />
            Local demo
          </span>
          <button
            className="github-button"
            aria-label="Log in with GitHub"
            onClick={onLogin}
          >
            <Github size={16} />
            <span>Log in with GitHub</span>
          </button>
        </div>
      </div>
    </header>
  )
}

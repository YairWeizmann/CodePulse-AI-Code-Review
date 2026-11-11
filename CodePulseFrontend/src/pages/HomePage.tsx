import { Brand } from '../components/Brand'
import { GitHubIcon } from '../components/GitHubIcon'
import './HomePage.css'

export function HomePage({ onLogin }: { onLogin: () => void }) {
  return (
    <>
      <header className="landing-header">
        <div className="landing-header-inner">
          <Brand href="/" />
          <nav aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#docs">Docs</a>
          </nav>
          <button className="landing-login" onClick={onLogin}>
            <GitHubIcon />
            Log in with GitHub
          </button>
        </div>
      </header>

      <main id="main-content" className="landing-main" tabIndex={-1}>
        <section className="landing-hero" aria-labelledby="hero-heading">
          <div className="landing-container hero-content">
            <p className="hero-eyebrow">AI-POWERED CODE REVIEW</p>
            <h1 id="hero-heading">
              Good code.
              <br />
              <span>Better together.</span>
            </h1>
            <p className="hero-description">
              Automatically review your GitHub pull requests,{' '}
              <br className="hero-description-break" />
              catch potential issues, and get actionable feedback.
            </p>
            <button className="landing-login hero-login" onClick={onLogin}>
              <GitHubIcon />
              Log in with GitHub
            </button>
          </div>
          <svg
            className="hero-waves"
            viewBox="0 0 1708 350"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 320C190 256 364 174 529 183C720 181 812 276 1040 258C1294 242 1462 103 1708 166V350H0Z"
              fill="#d8e8da"
              fillOpacity=".34"
            />
            <path
              d="M0 390C342 350 617 324 834 280C1044 238 1153 190 1324 105C1477 30 1585-9 1708 13V350H0Z"
              fill="#cce2d2"
              fillOpacity=".25"
            />
          </svg>
        </section>

        <div className="landing-container landing-details">
          <section id="features" aria-labelledby="features-heading">
            <p className="landing-section-label">FEATURES</p>
            <h2 id="features-heading">
              A fresh pair of eyes on every pull request.
            </h2>
            <p>
              Review GitHub pull requests, spot potential issues, and find
              actionable feedback alongside your code. Revisit earlier reviews
              to see how each revision moves your work forward.
            </p>
          </section>
          <section id="about" aria-labelledby="about-heading">
            <p className="landing-section-label">ABOUT</p>
            <h2 id="about-heading">Good code starts with a conversation.</h2>
            <p>
              CodePulse brings repositories, pull requests, and AI review
              history into one workspace, giving you the context to make your
              next change with confidence.
            </p>
          </section>
          <section id="docs" aria-labelledby="docs-heading">
            <p className="landing-section-label">DOCS</p>
            <h2 id="docs-heading">Take a look around.</h2>
            <p>
              Explore a repository, open a pull request, and read its latest
              review. Select an earlier revision to compare feedback. The demo
              uses mock data and needs no account.
            </p>
            <a className="landing-demo-link" href="#repositories">
              Explore the dashboard <span aria-hidden="true">→</span>
            </a>
          </section>
        </div>
      </main>
    </>
  )
}

import { ChevronDown } from 'lucide-react'
import type { DemoScenario } from '../data/types'

export function DemoFooter({
  scenario,
  onScenarioChange,
}: {
  scenario: DemoScenario
  onScenarioChange: (value: DemoScenario) => void
}) {
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-pulse">
          <svg viewBox="0 0 30 20" aria-hidden="true">
            <path d="M1 10h7l4-8 5 16 4-10 3 2h5" />
          </svg>
        </span>
        <span>A little context. Better code.</span>
      </div>
      <div className="demo-controls">
        <span className="mock-label">All data is mocked</span>
        <label htmlFor="demo-state">Demo state</label>
        <div className="select-wrap">
          <select
            id="demo-state"
            value={scenario}
            onChange={(event) => {
              onScenarioChange(event.target.value as DemoScenario)
            }}
          >
            <option value="default">Default</option>
            <option value="loading">Loading</option>
            <option value="empty">Empty</option>
            <option value="error">Error</option>
          </select>
          <ChevronDown size={13} />
        </div>
      </div>
    </footer>
  )
}

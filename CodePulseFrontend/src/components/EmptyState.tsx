import { FolderSearch, RotateCcw, SearchX, TriangleAlert } from 'lucide-react'

export function EmptyState({
  title,
  description,
  onReset,
  error = false,
  search = false,
}: {
  title: string
  description: string
  onReset?: () => void
  error?: boolean
  search?: boolean
}) {
  const Icon = error ? TriangleAlert : search ? SearchX : FolderSearch
  return (
    <div
      className={`empty-state ${error ? 'error-state' : ''}`}
      role={error ? 'alert' : 'status'}
    >
      <div className="empty-icon">
        <Icon size={26} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {onReset && (
        <button className="button secondary" onClick={onReset}>
          <RotateCcw size={15} />
          {error ? 'Try again' : search ? 'Clear filters' : 'Back to the demo'}
        </button>
      )}
    </div>
  )
}

export function LoadingState() {
  return (
    <div
      className="loading-state"
      role="status"
      aria-label="Loading demo workspace"
    >
      <p>
        <span className="loading-dot" />
        Gathering your workspace…
      </p>
      <div className="skeleton-hero skeleton" />
      <div className="skeleton-grid">
        {[1, 2, 3].map((id) => (
          <div className="skeleton-card skeleton" key={id} />
        ))}
      </div>
      <div className="skeleton-list skeleton" />
    </div>
  )
}

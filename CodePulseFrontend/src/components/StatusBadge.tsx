import { GitPullRequest, GitPullRequestClosed } from 'lucide-react'

export function StatusBadge({ state }: { state: string }) {
  const Icon = state === 'open' ? GitPullRequest : GitPullRequestClosed
  return (
    <span
      className={`status-badge ${state === 'open' ? 'is-open' : 'is-closed'}`}
    >
      <Icon size={12} />
      {state}
    </span>
  )
}

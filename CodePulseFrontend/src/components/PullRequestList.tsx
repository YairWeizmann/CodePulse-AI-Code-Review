import { ArrowUpRight, GitPullRequest, Sparkles } from 'lucide-react'
import type { AiReview, PullRequest } from '../data/types'
import { StatusBadge } from './StatusBadge'

export function PullRequestList({
  pullRequests,
  reviews,
  compact = false,
}: {
  pullRequests: PullRequest[]
  reviews: AiReview[]
  compact?: boolean
}) {
  return (
    <div className={`pr-list ${compact ? 'compact' : ''}`}>
      <div className="pr-table-heading">
        <span>Pull request</span>
        <span>State</span>
        <span>AI review</span>
        <span />
      </div>
      {pullRequests.map((pr) => {
        const count = reviews.filter(
          (review) => review.pullRequest.id === pr.id,
        ).length
        return (
          <a
            className="pr-row"
            href={`#pull-request/${pr.id}`}
            key={pr.id}
            aria-label={`Open PR #${pr.prNumber}: ${pr.prTitle}`}
          >
            <span className={`pr-icon ${pr.state === 'open' ? '' : 'closed'}`}>
              <GitPullRequest size={19} />
            </span>
            <span className="pr-info">
              <strong>{pr.prTitle}</strong>
              <small>
                {pr.repository.name}
                <span>·</span>#{pr.prNumber}
              </small>
            </span>
            <StatusBadge state={pr.state} />
            <span className={`review-count ${count ? '' : 'muted'}`}>
              <Sparkles size={14} />
              {count
                ? `${count} ${count === 1 ? 'review' : 'reviews'}`
                : 'Not reviewed'}
            </span>
            <ArrowUpRight className="row-arrow" size={17} />
          </a>
        )
      })}
    </div>
  )
}

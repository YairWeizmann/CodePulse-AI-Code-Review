import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  GitCommitHorizontal,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { formatDate } from '../utils/formatDate'
import Markdown from 'react-markdown'
import type { AiReview, PullRequest } from '../data/types'
import { StatusBadge } from './StatusBadge'
import { EmptyState } from './EmptyState'

export function ReviewDetail({
  pr,
  reviews,
  selectedReviewId,
}: {
  pr: PullRequest
  reviews: AiReview[]
  selectedReviewId?: number
}) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const review =
    reviews.find((item) => item.id === selectedReviewId) ?? reviews[0]
  const isLatest = review?.id === reviews[0]?.id
  async function copySha() {
    try {
      await navigator.clipboard.writeText(review.commitSha)
      setCopied(true)
      setCopyError(false)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyError(true)
    }
  }
  return (
    <>
      <a className="back-link" href={`#repository/${pr.repository.id}`}>
        <ArrowLeft size={15} />
        {pr.repository.name}
        <ChevronRight size={13} />
        Pull request #{pr.prNumber}
      </a>
      <div className="page-heading detail-heading">
        <div>
          <p className="eyebrow">A LITTLE CONTEXT GOES A LONG WAY</p>
          <h1>{pr.prTitle}</h1>
          <p className="pr-subtitle">
            <StatusBadge state={pr.state} />
            <span>#{pr.prNumber}</span>
            <span>
              in {pr.repository.owner} / {pr.repository.name}
            </span>
          </p>
        </div>
      </div>
      {!review ? (
        <EmptyState
          title="A fresh pair of eyes, coming soon"
          description="This pull request has no AI reviews in the mock data. Open “Add calculator division” to explore a complete review history."
        />
      ) : (
        <div className="review-layout">
          <article className="review-document panel">
            <div className="review-document-header">
              <div className="review-label">
                <span className="sparkle-box">
                  <Sparkles size={19} />
                </span>
                <div>
                  <strong>AI code review</strong>
                  <small>{formatDate(review.createdAt)}</small>
                </div>
              </div>
              <span className={`tag ${isLatest ? 'green' : 'amber'}`}>
                {isLatest ? 'Latest review' : 'Older review'}
              </span>
            </div>
            <div className="commit-bar">
              <GitCommitHorizontal size={17} />
              <span>Reviewed commit</span>
              <code>{review.commitSha.slice(0, 7)}</code>
              <button
                className="icon-button"
                onClick={copySha}
                aria-label="Copy reviewed commit SHA"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <span className="copy-feedback" role="status">
                {copied ? 'Copied!' : copyError ? 'Copy unavailable' : ''}
              </span>
            </div>
            {!isLatest && (
              <div className="older-notice">
                You’re reading an earlier revision.{' '}
                <a href={`#pull-request/${pr.id}`}>
                  Go to the latest review <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
            <div className="markdown">
              <Markdown>{review.feedBack}</Markdown>
            </div>
            <div className="review-disclaimer">
              <Sparkles size={14} />
              Example AI feedback · Local mock data · Always use your own
              judgment.
            </div>
          </article>
          <aside className="review-sidebar panel">
            <div className="section-heading">
              <h2>
                <Clock3 size={18} />
                Review history
              </h2>
              <span className="count-pill">{reviews.length}</span>
            </div>
            <p>Each commit tells a little more of the story.</p>
            <div className="review-timeline">
              {reviews.map((item, index) => (
                <a
                  key={item.id}
                  className={`timeline-item ${item.id === review.id ? 'selected' : ''}`}
                  href={
                    index === 0
                      ? `#pull-request/${pr.id}`
                      : `#review/${item.id}`
                  }
                  aria-current={item.id === review.id ? 'true' : undefined}
                >
                  <span className="timeline-dot" />
                  <span>
                    <strong>
                      {index === 0
                        ? 'Latest review'
                        : `Review ${reviews.length - index}`}
                    </strong>
                    <code>{item.commitSha.slice(0, 7)}</code>
                    <small>{formatDate(item.createdAt)}</small>
                  </span>
                  <ChevronRight size={15} />
                </a>
              ))}
            </div>
            <div className="sidebar-note">
              <Sparkles size={17} />
              <p>
                Better code is a conversation. Follow how the feedback changes
                with each revision.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

import { ArrowUpRight, BookOpen } from 'lucide-react'
import type { AiReview } from '../data/types'
import { formatDate } from '../utils/formatDate'

export function ReviewHistoryList({
  reviews,
  allReviews,
}: {
  reviews: AiReview[]
  allReviews: AiReview[]
}) {
  return (
    <div className="history-list panel">
      {reviews.map((review) => {
        const isLatest =
          allReviews.find(
            (item) => item.pullRequest.id === review.pullRequest.id,
          )?.id === review.id
        return (
          <a
            className="history-row"
            key={review.id}
            href={`#review/${review.id}`}
          >
            <span className="history-icon">
              <BookOpen size={19} />
            </span>
            <span className="history-info">
              <strong>{review.pullRequest.prTitle}</strong>
              <small>
                {review.pullRequest.repository.name} · #
                {review.pullRequest.prNumber} ·{' '}
                <code>{review.commitSha.slice(0, 7)}</code>
              </small>
            </span>
            <span className={`tag ${isLatest ? 'green' : ''}`}>
              {isLatest ? 'Latest' : 'Earlier revision'}
            </span>
            <time dateTime={review.createdAt}>
              {formatDate(review.createdAt)}
            </time>
            <ArrowUpRight size={17} />
          </a>
        )
      })}
    </div>
  )
}

import { ArrowRight, Sparkles } from 'lucide-react'
import type { WorkspaceData } from '../data/types'
import { PullRequestList } from './PullRequestList'

export function OverviewActivity({ data }: { data: WorkspaceData }) {
  const latestReview = data.reviews[0]
  return (
    <div className="overview-lower">
      <section className="recent-section" aria-labelledby="recent-heading">
        <div className="section-heading">
          <div className="section-title">
            <h2 id="recent-heading">Recent pull requests</h2>
            <span className="count-pill">{data.pullRequests.length}</span>
          </div>
          <a className="text-link" href="#pull-requests">
            View all <ArrowRight size={14} />
          </a>
        </div>
        <div className="panel">
          <PullRequestList
            pullRequests={[...data.pullRequests]
              .sort((a, b) =>
                (
                  data.reviews.find((r) => r.pullRequest.id === b.id)
                    ?.createdAt ?? ''
                ).localeCompare(
                  data.reviews.find((r) => r.pullRequest.id === a.id)
                    ?.createdAt ?? '',
                ),
              )
              .slice(0, 3)}
            reviews={data.reviews}
            compact
          />
        </div>
        <p className="section-footnote">
          <span className="small-dot" />A little feedback can make a big
          difference.
        </p>
      </section>
      {latestReview && (
        <aside className="continue-section" aria-labelledby="continue-heading">
          <div className="section-heading">
            <h2 id="continue-heading">Continue reviewing</h2>
            <span className="tag subtle">PICK UP WHERE YOU LEFT OFF</span>
          </div>
          <a
            className="continue-card"
            href={`#pull-request/${latestReview.pullRequest.id}`}
          >
            <div className="continue-top">
              <span className="sparkle-box">
                <Sparkles size={20} />
              </span>
              <span className="tag green">Ready for a fresh look</span>
            </div>
            <p>
              {latestReview.pullRequest.repository.name}{' '}
              <span>· #{latestReview.pullRequest.prNumber}</span>
            </p>
            <h3>{latestReview.pullRequest.prTitle}</h3>
            <div className="review-preview">
              “{latestReview.feedBack.split('\n')[0].replace(/^#+\s*/, '')}”
            </div>
            <div className="continue-bottom">
              <span>Let’s take a look together</span>
              <span className="round-arrow">
                <ArrowRight size={18} />
              </span>
            </div>
          </a>
        </aside>
      )}
    </div>
  )
}

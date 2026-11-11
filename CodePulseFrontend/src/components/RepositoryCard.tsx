import {
  ArrowUpRight,
  GitPullRequest,
  LockKeyhole,
  Sparkles,
} from 'lucide-react'
import { repositoryPresentation } from '../data/mockData'
import type { Repository, WorkspaceData } from '../data/types'

export function RepositoryCard({
  repository,
  data,
}: {
  repository: Repository
  data: WorkspaceData
}) {
  const presentation = repositoryPresentation[repository.id]
  const prs = data.pullRequests.filter(
    (pr) => pr.repository.id === repository.id,
  )
  const reviewCount = data.reviews.filter(
    (review) => review.pullRequest.repository.id === repository.id,
  ).length
  return (
    <a className="repository-card" href={`#repository/${repository.id}`}>
      <div className="repository-card-top">
        <span className={`repo-avatar ${presentation?.tone ?? 'sage'}`}>
          {presentation?.initials ?? repository.name.slice(0, 2)}
        </span>
        <span className="visibility">
          {presentation?.visibility === 'Private' && <LockKeyhole size={11} />}
          {presentation?.visibility ?? 'Repository'}
        </span>
        <ArrowUpRight className="card-arrow" size={19} />
      </div>
      <p className="repo-owner">{repository.owner}</p>
      <h3>{repository.name}</h3>
      <p className="repo-description">
        {presentation?.description ??
          'Explore pull requests and AI reviews for this repository.'}
      </p>
      <div className="repository-stats">
        <span>
          <GitPullRequest size={14} />
          {prs.filter((pr) => pr.state === 'open').length} open{' '}
          {prs.filter((pr) => pr.state === 'open').length === 1 ? 'PR' : 'PRs'}
        </span>
        <span>
          <Sparkles size={14} />
          {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
        </span>
      </div>
      <div className="repository-card-bottom">
        <span>
          <i style={{ background: presentation?.color ?? '#478466' }} />
          {presentation?.language ?? 'Code'}
        </span>
        <span className="repo-health">
          <span />
          {prs.length ? 'Ready to explore' : 'A fresh start'}
        </span>
      </div>
    </a>
  )
}

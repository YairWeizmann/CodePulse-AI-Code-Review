import { useState } from 'react'
import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react'
import { EmptyState } from '../components/EmptyState'
import { WelcomeBanner } from '../components/WelcomeBanner'
import { OverviewActivity } from '../components/OverviewActivity'
import { SearchToolbar } from '../components/SearchToolbar'
import { ReviewHistoryList } from '../components/ReviewHistoryList'
import { RepositoryCard } from '../components/RepositoryCard'
import { PullRequestList } from '../components/PullRequestList'
import { ReviewDetail } from '../components/ReviewDetail'
import { repositoryPresentation } from '../data/mockData'
import type { WorkspaceData } from '../data/types'

interface WorkspaceProps {
  data: WorkspaceData
  route: string
  query: string
  setQuery: (query: string) => void
  filter: string
  setFilter: (filter: string) => void
  repoFilter: string
  setRepoFilter: (filter: string) => void
  clearFilters: () => void
  restoreDemo: () => void
}

export function Workspace({
  data,
  route,
  query,
  setQuery,
  filter,
  setFilter,
  repoFilter,
  setRepoFilter,
  clearFilters,
  restoreDemo,
}: WorkspaceProps) {
  const [showAllRepositories, setShowAllRepositories] = useState(false)
  const [kind, rawId] = route.split('/')
  const id = Number(rawId)
  const selectedRepository =
    kind === 'repository'
      ? data.repositories.find((repo) => repo.id === id)
      : undefined
  const selectedReview =
    kind === 'review'
      ? data.reviews.find((review) => review.id === id)
      : undefined
  const selectedPr =
    kind === 'pull-request'
      ? data.pullRequests.find((pr) => pr.id === id)
      : selectedReview?.pullRequest
  const search = query.toLowerCase().trim()
  // Filter the loaded entities locally. Demo-only language labels stay separate.
  const filteredRepos = data.repositories.filter(
    (repo) =>
      `${repo.owner}/${repo.name}`.toLowerCase().includes(search) &&
      (filter === 'all' ||
        repositoryPresentation[repo.id]?.language === filter),
  )
  const filteredPrs = data.pullRequests.filter(
    (pr) =>
      (!selectedRepository || pr.repository.id === selectedRepository.id) &&
      (repoFilter === 'all' || pr.repository.id === Number(repoFilter)) &&
      (filter === 'all' || pr.state === filter) &&
      `${pr.prTitle} ${pr.prNumber} ${pr.repository.owner}/${pr.repository.name}`
        .toLowerCase()
        .includes(search),
  )
  const filteredReviews = data.reviews.filter(
    (review) =>
      `${review.pullRequest.prTitle} ${review.pullRequest.prNumber} ${review.pullRequest.repository.name} ${review.commitSha} ${review.feedBack}`
        .toLowerCase()
        .includes(search) &&
      (repoFilter === 'all' ||
        review.pullRequest.repository.id === Number(repoFilter)) &&
      (filter === 'all' ||
        (filter === 'latest'
          ? data.reviews.find((r) => r.pullRequest.id === review.pullRequest.id)
              ?.id === review.id
          : data.reviews.find((r) => r.pullRequest.id === review.pullRequest.id)
              ?.id !== review.id)),
  )

  if (selectedPr)
    return (
      <ReviewDetail
        key={selectedPr.id}
        pr={selectedPr}
        reviews={data.reviews.filter(
          (review) => review.pullRequest.id === selectedPr.id,
        )}
        selectedReviewId={selectedReview?.id}
      />
    )
  if (
    ['repository', 'pull-request', 'review'].includes(kind) &&
    !selectedRepository
  )
    return (
      <EmptyState
        title="That page isn’t in this workspace"
        description="This demo link doesn’t match an available repository, pull request, or review."
        onReset={restoreDemo}
      />
    )
  if (
    !['repositories', 'repository', 'pull-requests', 'history'].includes(kind)
  )
    return (
      <EmptyState
        title="Let’s get you back to your code"
        description="This page doesn’t exist in the local demo."
        onReset={restoreDemo}
      />
    )
  const isOverview = kind === 'repositories'
  const isHistory = kind === 'history'

  return (
    <>
      {selectedRepository && (
        <a className="back-link" href="#repositories">
          <ArrowLeft size={15} />
          All repositories
        </a>
      )}
      <div className="page-heading">
        <div>
          <p className="eyebrow">
            {isOverview
              ? 'A FRESH PERSPECTIVE ON YOUR CODE'
              : selectedRepository
                ? selectedRepository.owner
                : isHistory
                  ? 'EVERY REVISION, A LITTLE BETTER'
                  : 'GOOD CODE STARTS WITH A CONVERSATION'}
          </p>
          <h1>
            {selectedRepository
              ? selectedRepository.name
              : isOverview
                ? 'Good code. Better together.'
                : isHistory
                  ? 'A little history. A lot of progress.'
                  : 'Small changes. Meaningful progress.'}
          </h1>
          <p>
            {selectedRepository
              ? 'Your pull requests, with the context to move them forward.'
              : isOverview
                ? 'Your repositories, thoughtful reviews, and a little peace of mind.'
                : isHistory
                  ? 'Revisit the feedback. See how your code has grown.'
                  : 'A fresh pair of eyes on the work that matters.'}
          </p>
        </div>
        <div className="workspace-note">
          <span className="avatar-stack">
            <span>Y</span>
            <span>
              <Code2 size={15} />
            </span>
          </span>
          <span>
            Your personal
            <br />
            <strong>review workspace</strong>
          </span>
        </div>
      </div>
      {isOverview && <WelcomeBanner />}

      <section
        className="workspace-section"
        aria-labelledby="collection-heading"
      >
        <div className="section-heading collection-heading">
          <div className="section-title">
            <h2 id="collection-heading">
              {isOverview
                ? 'Your repositories'
                : isHistory
                  ? 'Review history'
                  : 'Pull requests'}
            </h2>
            <span className="count-pill">
              {isOverview
                ? data.repositories.length
                : isHistory
                  ? data.reviews.length
                  : data.pullRequests.filter(
                      (pr) =>
                        !selectedRepository ||
                        pr.repository.id === selectedRepository.id,
                    ).length}
            </span>
          </div>
          <span className="section-caption">
            {isOverview ? (
              <button
                className="text-link"
                onClick={() => setShowAllRepositories(!showAllRepositories)}
              >
                {showAllRepositories
                  ? 'Show fewer'
                  : `View all ${data.repositories.length}`}{' '}
                <ArrowRight size={13} />
              </button>
            ) : isHistory ? (
              'Feedback for every step forward.'
            ) : (
              'One thoughtful change at a time.'
            )}
          </span>
        </div>
        <SearchToolbar
          isOverview={isOverview}
          isHistory={isHistory}
          selectedRepository={selectedRepository}
          repositories={data.repositories}
          query={query}
          setQuery={setQuery}
          filter={filter}
          setFilter={setFilter}
          repoFilter={repoFilter}
          setRepoFilter={setRepoFilter}
        />
        {!data.repositories.length ? (
          <EmptyState
            title="Every great project starts somewhere"
            description="There are no repositories in this simulated empty workspace. Restore the demo to explore repositories, pull requests, and reviews."
            onReset={restoreDemo}
          />
        ) : isOverview ? (
          filteredRepos.length ? (
            <div className="repository-grid">
              {(showAllRepositories || search || filter !== 'all'
                ? filteredRepos
                : filteredRepos.slice(0, 3)
              ).map((repo) => (
                <RepositoryCard key={repo.id} repository={repo} data={data} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No repositories found"
              description="Try a different repository name, owner, or language."
              search
              onReset={clearFilters}
            />
          )
        ) : isHistory ? (
          filteredReviews.length ? (
            <ReviewHistoryList
              reviews={filteredReviews}
              allReviews={data.reviews}
            />
          ) : (
            <EmptyState
              title="No reviews found"
              description="Try a different search or select another repository or review version."
              search
              onReset={clearFilters}
            />
          )
        ) : filteredPrs.length ? (
          <div className="panel">
            <PullRequestList
              pullRequests={filteredPrs}
              reviews={data.reviews}
            />
          </div>
        ) : (
          <EmptyState
            title={
              selectedRepository &&
              !data.pullRequests.some(
                (pr) => pr.repository.id === selectedRepository.id,
              )
                ? 'A clean slate, full of possibilities'
                : 'No pull requests found'
            }
            description={
              selectedRepository &&
              !data.pullRequests.some(
                (pr) => pr.repository.id === selectedRepository.id,
              )
                ? 'This repository has no pull requests in the demo yet. Explore another repository to read some reviews.'
                : 'Try a different title, PR number, repository, or state.'
            }
            search
            onReset={clearFilters}
          />
        )}
      </section>

      {isOverview && data.pullRequests.length > 0 && (
        <OverviewActivity data={data} />
      )}
      {isOverview && (
        <div className="closing-note">
          <span>✧</span> Thoughtful reviews. Confident next steps.
        </div>
      )}
    </>
  )
}

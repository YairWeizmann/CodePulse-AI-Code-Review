import {
  ChevronDown,
  FolderGit2,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import type { Repository } from '../data/types'

interface SearchToolbarProps {
  isOverview: boolean
  isHistory: boolean
  selectedRepository?: Repository
  repositories: Repository[]
  query: string
  setQuery: (value: string) => void
  filter: string
  setFilter: (value: string) => void
  repoFilter: string
  setRepoFilter: (value: string) => void
}

export function SearchToolbar({
  isOverview,
  isHistory,
  selectedRepository,
  repositories,
  query,
  setQuery,
  filter,
  setFilter,
  repoFilter,
  setRepoFilter,
}: SearchToolbarProps) {
  return (
    <div className="collection-toolbar">
      <div className="search-field">
        <Search size={17} />
        <input
          aria-label={
            isOverview
              ? 'Search repositories'
              : isHistory
                ? 'Search review history'
                : 'Search pull requests'
          }
          placeholder={
            isOverview
              ? 'Find a repository…'
              : isHistory
                ? 'Search reviews, commits, or feedback…'
                : 'Search pull requests…'
          }
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button
            className="icon-button"
            aria-label="Clear search"
            onClick={() => setQuery('')}
          >
            <X size={14} />
          </button>
        )}
      </div>
      <div className="filters">
        {!isOverview && !selectedRepository && (
          <div className="select-wrap repository-filter">
            <FolderGit2 size={14} />
            <select
              aria-label="Filter by repository"
              value={repoFilter}
              onChange={(event) => setRepoFilter(event.target.value)}
            >
              <option value="all">All repositories</option>
              {repositories.map((repo) => (
                <option key={repo.id} value={repo.id}>
                  {repo.name}
                </option>
              ))}
            </select>
            <ChevronDown size={13} />
          </div>
        )}
        <div className="select-wrap">
          <SlidersHorizontal size={14} />
          <select
            aria-label={
              isOverview
                ? 'Filter by language'
                : isHistory
                  ? 'Filter review versions'
                  : 'Filter by state'
            }
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            {(isOverview
              ? [
                  ['all', 'All languages'],
                  ['Java', 'Java'],
                  ['TypeScript', 'TypeScript'],
                ]
              : isHistory
                ? [
                    ['all', 'All reviews'],
                    ['latest', 'Latest reviews'],
                    ['older', 'Older reviews'],
                  ]
                : [
                    ['all', 'All states'],
                    ['open', 'Open'],
                    ['closed', 'Closed'],
                  ]
            ).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown size={13} />
        </div>
      </div>
    </div>
  )
}

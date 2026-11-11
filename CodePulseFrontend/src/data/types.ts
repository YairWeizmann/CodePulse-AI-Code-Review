// These types mirror the backend entities. IDs are database IDs, not PR numbers.
export interface Repository {
  id: number
  githubId: number
  owner: string
  name: string
}

export interface PullRequest {
  id: number
  repository: Repository
  prNumber: number
  prTitle: string
  state: string
  latestCommitSha: string
}

export interface AiReview {
  id: number
  pullRequest: PullRequest
  commitSha: string
  feedBack: string
  createdAt: string
}

export interface WorkspaceData {
  repositories: Repository[]
  pullRequests: PullRequest[]
  reviews: AiReview[]
}

// Presentation metadata belongs to the demo, not the backend entities.
export interface RepositoryPresentation {
  description: string
  language: string
  color: string
  initials: string
  tone: string
  visibility: 'Public' | 'Private'
}
export type DemoScenario = 'default' | 'loading' | 'empty' | 'error'

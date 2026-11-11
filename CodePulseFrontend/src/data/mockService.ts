import { pullRequests, repositories, reviews } from './mockData'
import type { DemoScenario, WorkspaceData } from './types'

// Integration seam: later replace this function's body with your backend client.
// UI components consume the same nested entity shapes, without knowing their source.
export async function loadWorkspace(
  scenario: DemoScenario,
): Promise<WorkspaceData> {
  await new Promise<void>((resolve) => window.setTimeout(resolve, 450))
  if (scenario === 'error')
    throw new Error(
      'This is a simulated loading error. Your local demo data is safe.',
    )
  if (scenario === 'empty')
    return { repositories: [], pullRequests: [], reviews: [] }
  return {
    repositories,
    pullRequests,
    reviews: [...reviews].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    ),
  }
}

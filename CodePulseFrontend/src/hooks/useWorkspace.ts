import { useEffect, useState } from 'react'
import { loadWorkspace } from '../data/mockService'
import type { DemoScenario, WorkspaceData } from '../data/types'

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: WorkspaceData }

export function useWorkspace(scenario: DemoScenario) {
  const [result, setResult] = useState<{
    scenario: DemoScenario
    state: LoadState
  } | null>(null)
  useEffect(() => {
    // Ignore an outdated result if the demo state changes while loading.
    let active = true
    loadWorkspace(scenario).then(
      (data) => {
        if (active) setResult({ scenario, state: { status: 'ready', data } })
      },
      (error: Error) => {
        if (active)
          setResult({
            scenario,
            state: { status: 'error', message: error.message },
          })
      },
    )
    return () => {
      active = false
    }
  }, [scenario])
  if (scenario === 'loading' || result?.scenario !== scenario)
    return { status: 'loading' } as const
  return result.state
}

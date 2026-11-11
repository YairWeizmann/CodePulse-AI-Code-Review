# CodePulse frontend

A React + TypeScript + Vite frontend with a public homepage at `/` and a responsive dashboard at `/#repositories`. All dashboard data comes from local mocks. The Spring Boot backend is untouched.

## Run locally

Use Node.js 20.19+ or 22.12+ (Node 26 was used during development).

```sh
cd /Users/yair/IdeaProjects/CodePulseProject/CodePulseFrontend
npm ci --cache .npm-cache
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173). Dependencies are already installed in this working copy, so `npm run dev` is enough after changing directories.

```sh
npm run lint
npm run build
npm run preview
```

`build` runs TypeScript checks and creates `dist/`. `preview` serves the production build. `npm run format` formats the source with Prettier.

## Explore the demo

Open `/` for the public homepage. **Features**, **About**, and **Docs** link to the sections below the hero. **Explore the dashboard** opens the existing mock workspace at `/#repositories`. Existing links remain available: `/#repository/:id`, `/#pull-requests`, `/#pull-request/:id`, `/#history`, and `/#review/:id`.

- Select **CodePulseTest**, then **Add calculator division**, to read an AI review. Select **Review 2** or **Review 1** to read feedback for an older commit.
- Use **Repositories**, **Pull requests**, and **Review history** in the top navigation. Hash-based URLs support refresh, deep links, and browser Back/Forward without server route configuration.
- Search repositories by name or owner and filter by language. Search PRs by title, repository, or GitHub PR number, and filter by state or repository. Search review history by PR, commit, repository, or feedback, and filter by repository or revision.
- **View all 4** reveals another demo repository. **weekend-experiments** has no PRs; **Update README** has no reviews. Searching for an unmatched word demonstrates filtered empty states.
- **Continue reviewing** opens the most recently reviewed PR in the demo. This is a mock shortcut; it does not track a session or persist reading progress.
- The footer's **Demo state** selector shows Default, Loading, Empty, and Error examples. Loading remains visible until you choose another state. Empty and Error include recovery buttons.
- Both homepage **Log in with GitHub** buttons and the dashboard login button use the shared `handleLogin` function in `src/App.tsx`. They open the existing explanatory placeholder dialog.
- The commit copy button copies the reviewed commit SHA. All timestamps are explicitly displayed in UTC.

## Where to edit

| File                                                                               | Responsibility                                                                                                       |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `index.html`, `src/main.tsx`                                                       | HTML entry point and React startup.                                                                                  |
| `src/App.tsx`                                                                      | Application shell, hash navigation, search/filter state, demo scenario, and dialog visibility.                       |
| `src/pages/HomePage.tsx`, `src/pages/HomePage.css`                                 | Public header, hero, decorative waves, informational sections, and responsive homepage styles.                       |
| `src/pages/Workspace.tsx`                                                          | Chooses the repository, PR collection, history, or review page; applies local filters.                               |
| `src/components/SiteHeader.tsx`, `Brand.tsx`, `DemoFooter.tsx`                     | Horizontal navigation, pulse logo/wordmark, and mock-state controls.                                                 |
| `src/components/WelcomeBanner.tsx`, `RepositoryCard.tsx`, `OverviewActivity.tsx`   | Overview layout, repository cards, recent PRs, and Continue reviewing.                                               |
| `src/components/SearchToolbar.tsx`, `PullRequestList.tsx`, `ReviewHistoryList.tsx` | Search controls and collection rows.                                                                                 |
| `src/components/ReviewDetail.tsx`                                                  | Markdown feedback, reviewed commit, and per-PR review history.                                                       |
| `src/components/EmptyState.tsx`, `LoginPlaceholder.tsx`                            | Loading/empty/error examples and the GitHub placeholder.                                                             |
| `src/styles.css`                                                                   | Colors, typography, spacing, component styling, responsive breakpoints, and reduced-motion rules.                    |
| `src/data/mockData.ts`                                                             | All repository, PR, and review fixtures, plus separate demo presentation metadata.                                   |
| `src/data/types.ts`                                                                | Backend-aligned entity interfaces and separate demo-only types.                                                      |
| `src/data/mockService.ts`                                                          | The local asynchronous data source and future backend integration point.                                             |
| `src/hooks/useWorkspace.ts`                                                        | React loading/error/ready states and protection against outdated async results.                                      |
| `tests/homepage.spec.ts`                                                           | Homepage route, both login buttons, anchor navigation, dashboard access, desktop composition, and responsive checks. |
| `tests/demo.spec.ts`                                                               | Browser tests for desktop and mobile flows, viewport overflow, and external-request checks.                          |

## Connecting your backend later

For GitHub OAuth, start with **`handleLogin` in `src/App.tsx`**. Replace its placeholder behavior with the redirect to your Spring Boot OAuth entry point. The homepage header, hero, and dashboard all receive this same handler through `onLogin`; no backend URL is assumed.

Start with **`loadWorkspace` in `src/data/mockService.ts`**. Replace its local implementation with your own data client when you are ready, preserving its return shape:

```ts
{
  repositories: Repository[],
  pullRequests: PullRequest[],
  reviews: AiReview[]
}
```

Keep reviews sorted by `createdAt`, newest first; the UI uses that order to identify the latest review. `useWorkspace` calls this function and provides loading, error, and ready states to the UI. No network client or backend endpoint is implemented in this project.

The entities match the backend fields exactly:

- Repository: `id`, `githubId`, `owner`, `name`.
- Pull request: `id`, nested `repository`, `prNumber`, `prTitle`, `state`, `latestCommitSha`.
- AI review: `id`, nested `pullRequest`, `commitSha`, `feedBack`, `createdAt`.

Entity IDs are database IDs. `prNumber` is the GitHub PR number. `feedBack` stays a single text/Markdown string and is rendered with `react-markdown`, without enabling raw HTML. `createdAt` is an ISO timestamp.

Descriptions, language dots, initials, visibility labels, and card colors are optional demo presentation metadata in `repositoryPresentation`; they are not fields on the backend interfaces. Unknown repositories get neutral display fallbacks. Language filtering is a demo feature based on that metadata. It does not require backend schema changes.

There are no API calls, authentication/session handling, integrations, proxy configuration, CORS changes, secrets, or remote fonts/images. Dependencies are React, React DOM, Lucide icons, and a Markdown renderer; the other dependencies are development tools.

## Browser checks and previews

```sh
npm test
```

The Playwright config uses an existing Google Chrome installation (`channel: 'chrome'`). If Chrome is unavailable, install Chrome or change the config to use Playwright's Chromium and install it with `npx playwright install chromium`. Tests start a Vite server automatically if one is not already running on port 5173.

The suite covers the public homepage, both login buttons and focus restoration, homepage section links, dashboard access, responsive layout, and the repository → PR → review → older-review flow, browser Back and deep links, local search/filters, no-review and empty-repository examples, loading/empty/error recovery, the login placeholder, Continue reviewing, invalid links, console errors, page overflow, and external requests. Mobile tests emulate an iPhone viewport in Chromium; they are not physical-device or Safari tests.

Screenshots are generated under `test-results/` (ignored by Git). Open `homepage-desktop.png`, `homepage-mobile.png`, `overview-desktop.png`, `overview-mobile.png`, `review-desktop.png`, and `review-mobile.png` after a successful run.

The public homepage follows the supplied off-white and green reference, reusing the existing pulse logo and CodePulse wordmark. Homepage styles are scoped separately from the existing dashboard styles. Previews use automated Chrome with mobile emulation.

## Validation completed

- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript checks.
- `npm test`: all 20 desktop/mobile tests passed in Chrome, covering the public homepage and existing dashboard flows, plus additional 320px through 1440px homepage layout checks.
- Desktop/mobile homepage screenshots were visually checked against the reference; overview and review screenshots are also generated by the browser suite.
- Application code contains no network calls; the tested navigation made no external data requests and reported no browser console or page errors.
- Physical mobile devices and Safari/Firefox are not covered by this Chrome suite.

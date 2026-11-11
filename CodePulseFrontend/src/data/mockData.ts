import type {
  AiReview,
  PullRequest,
  Repository,
  RepositoryPresentation,
} from './types'

export const repositories: Repository[] = [
  { id: 1, githubId: 934810201, owner: 'YairWeizmann', name: 'CodePulseTest' },
  { id: 2, githubId: 934810202, owner: 'YairWeizmann', name: 'codepulse-api' },
  { id: 3, githubId: 934810203, owner: 'YairWeizmann', name: 'portfolio' },
  {
    id: 4,
    githubId: 934810204,
    owner: 'YairWeizmann',
    name: 'weekend-experiments',
  },
]

export const repositoryPresentation: Record<number, RepositoryPresentation> = {
  1: {
    description:
      'A little playground for better code. Test, learn, and build with confidence.',
    language: 'Java',
    color: '#b87b46',
    initials: 'CP',
    tone: 'sage',
    visibility: 'Public',
  },
  2: {
    description:
      'The engine behind thoughtful reviews. Built with Spring Boot and a little care.',
    language: 'Java',
    color: '#b87b46',
    initials: 'api',
    tone: 'peach',
    visibility: 'Private',
  },
  3: {
    description:
      'A corner of the internet for the things I make and the ideas I’m exploring.',
    language: 'TypeScript',
    color: '#5489b5',
    initials: '</>',
    tone: 'lavender',
    visibility: 'Public',
  },
  4: {
    description:
      'Small ideas, fresh starts. Your next experiment has a home here.',
    language: 'TypeScript',
    color: '#5489b5',
    initials: 'we',
    tone: 'sand',
    visibility: 'Public',
  },
}

export const pullRequests: PullRequest[] = [
  {
    id: 101,
    repository: repositories[0],
    prNumber: 1,
    prTitle: 'Add calculator division',
    state: 'open',
    latestCommitSha: 'a3f91c2d78f4b0e62e1786205e8327b647aef239',
  },
  {
    id: 102,
    repository: repositories[0],
    prNumber: 2,
    prTitle: 'Improve input validation',
    state: 'closed',
    latestCommitSha: 'b8d42e1c9b368812b6c922851e66cc3f23d241f0',
  },
  {
    id: 103,
    repository: repositories[0],
    prNumber: 3,
    prTitle: 'Update README',
    state: 'open',
    latestCommitSha: 'c9e15f498e95f0b74d7fcd07bafac28e9448dc81',
  },
  {
    id: 201,
    repository: repositories[1],
    prNumber: 12,
    prTitle: 'Add repository ownership checks',
    state: 'open',
    latestCommitSha: 'e2b7a410765e9af638fe7af008dd1bb952d9f47e',
  },
  {
    id: 202,
    repository: repositories[1],
    prNumber: 11,
    prTitle: 'Keep review timestamps in UTC',
    state: 'closed',
    latestCommitSha: 'f5c23b19ad6d7b34284561110db158d8e533c9f3',
  },
  {
    id: 301,
    repository: repositories[2],
    prNumber: 8,
    prTitle: 'Make project cards responsive',
    state: 'open',
    latestCommitSha: 'd4e86a203328604b29309476d776f4670287cba2',
  },
  {
    id: 302,
    repository: repositories[2],
    prNumber: 7,
    prTitle: 'Add accessible navigation labels',
    state: 'closed',
    latestCommitSha: '7a83cf1890ac2ed593c534a9cb566c5425e0b032',
  },
]

export const reviews: AiReview[] = [
  {
    id: 1003,
    pullRequest: pullRequests[0],
    commitSha: pullRequests[0].latestCommitSha,
    createdAt: '2026-11-04T10:20:00Z',
    feedBack: `## A good start. One edge case to handle.\n\nThe division method is small and easy to follow. Before this is ready, let’s make its behavior predictable when the divisor is zero.\n\n### Handle division by zero\n\n**Suggestion · Medium priority**\n\nIn \`src/main/java/Calculator.java\`, a zero divisor produces Infinity or NaN for floating-point arithmetic. If callers expect a finite result, add an explicit guard:\n\n\`\`\`java\nif (b == 0) {\n    throw new ArithmeticException("Division by zero");\n}\nreturn (float) a / b;\n\`\`\`\n\n### Give the edge cases a little coverage\n\n- Test a positive and a negative divisor.\n- Check that a zero divisor throws the expected exception.\n- Include a fractional result, such as \`5 / 2\`.\n\n> The happy path looks good. A small guard and a few focused tests will make this much more reliable.`,
  },
  {
    id: 1002,
    pullRequest: pullRequests[0],
    commitSha: '92dcf87e564ce8b3e9632d7cc0675e29044762f1',
    createdAt: '2026-11-03T15:45:00Z',
    feedBack: `## Watch out for integer division\n\nThe current implementation divides two integers before converting the result. That means \`5 / 2\` returns \`2.0\`, instead of \`2.5\`.\n\n### Convert before dividing\n\n\`\`\`java\nreturn (float) a / b;\n\`\`\`\n\nAlso consider how callers should handle a zero divisor. Add tests that capture the intended behavior.\n\n> This is an older review of commit 92dcf87. The latest review may contain different feedback.`,
  },
  {
    id: 1001,
    pullRequest: pullRequests[0],
    commitSha: '41af932e564ce8b3e9632d7cc0675e29044762f1',
    createdAt: '2026-11-02T09:30:00Z',
    feedBack: `## Let’s make the contract clear\n\nThe new division method needs an explicit return type and a short description of its behavior.\n\n- Return a floating-point value so fractional answers are preserved.\n- Document how division by zero is handled.\n- Keep the method name consistent with \`add\` and \`subtract\`.\n\nThis feedback belongs to the first revision of this pull request.`,
  },
  {
    id: 1010,
    pullRequest: pullRequests[1],
    commitSha: pullRequests[1].latestCommitSha,
    createdAt: '2026-11-03T11:00:00Z',
    feedBack: `## Clearer inputs, clearer behavior\n\nThe new validation makes the calculator easier to use. The early return for empty input is straightforward and the error messages are helpful.\n\n### Small suggestion\n\nTrim whitespace before checking for an empty value. A string containing only spaces should behave like an empty string.\n\n\`\`\`java\nif (input == null || input.isBlank()) {\n    throw new IllegalArgumentException("Enter a number");\n}\n\`\`\`\n\nThe rest looks ready to go.`,
  },
  {
    id: 2001,
    pullRequest: pullRequests[3],
    commitSha: pullRequests[3].latestCommitSha,
    createdAt: '2026-11-04T09:10:00Z',
    feedBack: `## Ownership checks are in the right place\n\nChecking the repository owner before returning pull requests keeps access consistent across the service.\n\n### Cover the missing repository case\n\nReturn a clear not-found result when the requested repository does not exist. Keep that behavior consistent with the other lookup methods.\n\n### Suggested coverage\n\n- A repository belonging to the current user.\n- A repository belonging to a different user.\n- A database ID that does not exist.\n\nThe separation between the controller and service is easy to follow.`,
  },
  {
    id: 2002,
    pullRequest: pullRequests[4],
    commitSha: pullRequests[4].latestCommitSha,
    createdAt: '2026-11-02T14:15:00Z',
    feedBack: `## A consistent timeline\n\nUsing \`Instant\` gives review timestamps a consistent meaning. Keeping timezone conversion in the presentation layer is a good choice.\n\nNo further changes suggested for this revision.`,
  },
  {
    id: 3001,
    pullRequest: pullRequests[5],
    commitSha: pullRequests[5].latestCommitSha,
    createdAt: '2026-11-03T13:30:00Z',
    feedBack: `## More room for every screen\n\nThe flexible card grid adapts well to narrower viewports.\n\n### Keep long titles contained\n\nAdd \`min-width: 0\` to grid children so long project titles can wrap without stretching the page.\n\n\`\`\`css\n.project-card {\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\`\`\`\n\nCheck the layout at 375px and with keyboard navigation before merging.`,
  },
]

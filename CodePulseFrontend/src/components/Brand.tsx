export function Brand({ href = '#repositories' }: { href?: string }) {
  return (
    <a className="brand" href={href} aria-label="CodePulse home">
      <svg viewBox="0 0 42 42" fill="none" aria-hidden="true">
        <path
          d="M2 23h10L18 5l7 32 6-21 4 7h5"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>CodePulse</span>
    </a>
  )
}

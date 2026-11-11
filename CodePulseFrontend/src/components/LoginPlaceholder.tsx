import { useEffect } from 'react'
import { ArrowRight, Check, Github, X } from 'lucide-react'

export function LoginPlaceholder({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const dialog = document.querySelector<HTMLDialogElement>('#login-dialog')!
    dialog.showModal()
    return () => {
      dialog.close()
      previousFocus?.focus()
    }
  }, [])
  return (
    <dialog
      id="login-dialog"
      className="login-dialog"
      aria-labelledby="login-heading"
      aria-describedby="login-description"
      onCancel={() => onClose()}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button
        className="icon-button modal-close"
        autoFocus
        aria-label="Close login information"
        onClick={() => onClose()}
      >
        <X size={20} />
      </button>
      <span className="dialog-icon">
        <Github size={29} />
      </span>
      <span className="tag green">VISUAL PLACEHOLDER</span>
      <h2 id="login-heading">A preview of what’s next.</h2>
      <p id="login-description">
        This button is a visual placeholder for GitHub login. The demo runs
        entirely on local mock data.
      </p>
      <div className="dialog-note">
        <Check size={17} />
        No account needed to explore.
      </div>
      <button className="button primary" onClick={() => onClose()}>
        Keep exploring <ArrowRight size={16} />
      </button>
    </dialog>
  )
}

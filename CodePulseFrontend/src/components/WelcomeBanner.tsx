import { ArrowRight, Check, Leaf, Sparkles } from 'lucide-react'

export function WelcomeBanner() {
  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <span className="banner-kicker">
          <span className="tiny-sparkle">✧</span> A LITTLE CLARITY GOES A LONG
          WAY
        </span>
        <h2>
          Big ideas deserve
          <br />a thoughtful second look.
        </h2>
        <p>
          Catch the small things. Understand the why.
          <br className="desktop-break" /> Keep building what’s next.
        </p>
        <a href="#pull-requests" className="button primary">
          Explore your pull requests <ArrowRight size={16} />
        </a>
      </div>
      <div className="banner-art" aria-hidden="true">
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <span className="art-star star-one">✧</span>
        <span className="art-star star-two">✦</span>
        <span className="art-dot dot-one" />
        <span className="art-dot dot-two" />
        <div className="art-code-card">
          <div className="art-window-dots">
            <i />
            <i />
            <i />
            <span> a little better.java</span>
          </div>
          <div className="art-code">
            <span className="line-number">01</span>
            <span>
              <b>if</b> (aLittleCare) {'{'}
            </span>
            <span className="line-number">02</span>
            <span className="indent">
              code.<em>getBetter</em>();
            </span>
            <span className="line-number">03</span>
            <span>{'}'}</span>
          </div>
          <div className="art-code-footer">
            <span />
            Made room for better code
          </div>
        </div>
        <div className="art-review-card">
          <span className="art-check">
            <Check size={18} />
          </span>
          <span>
            <strong>A fresh perspective.</strong>
            <small>You’ve got this from here.</small>
          </span>
          <Sparkles size={16} />
        </div>
        <span className="art-leaf">
          <Leaf size={32} strokeWidth={1.5} />
        </span>
      </div>
    </div>
  )
}

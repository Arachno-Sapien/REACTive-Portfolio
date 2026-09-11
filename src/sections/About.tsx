import { useState } from 'react'
import SplitText from '@/components/react-bits/SplitText/SplitText'
import TrueFocus from '@/components/react-bits/TrueFocus/TrueFocus'
import AnimatedContent from '@/components/react-bits/AnimatedContent/AnimatedContent'
import SpotlightCard from '@/components/react-bits/SpotlightCard/SpotlightCard'
import { identity } from '@/data/portfolio'

export function About() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(identity.email).catch(() => {})
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = identity.email
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        try {
          document.execCommand('copy')
        } catch {}
        document.body.removeChild(textarea)
      }
    } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="about" className="section-shell">
      <p className="section-kicker">About</p>
      <SplitText
        text="Building usable software, smart systems, and project-based solutions."
        tag="h2"
        className="font-display mb-8 max-w-3xl text-3xl font-semibold tracking-tight text-paper sm:text-4xl"
        delay={28}
        textAlign="left"
      />

      <div className="mb-10">
        <TrueFocus
          sentence="Software IoT Sustainability Critical-Thinking Logical-Reasoning"
          blurAmount={4}
          borderColor="#3dffa8"
          glowColor="rgba(61, 255, 168, 0.45)"
          animationDuration={0.45}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <AnimatedContent distance={40} duration={0.7}>
          <SpotlightCard
            className="surface h-full rounded-3xl p-6"
            spotlightColor="rgba(61, 255, 168, 0.18)"
          >
            <h3 className="mb-3 font-display text-xl font-semibold">Current Focus</h3>
            <p className="text-fog leading-relaxed">{identity.focus}</p>
          </SpotlightCard>
        </AnimatedContent>
        <AnimatedContent distance={40} duration={0.7} delay={0.08}>
          <SpotlightCard
            className="surface h-full rounded-3xl p-6"
            spotlightColor="rgba(126, 200, 255, 0.18)"
          >
            <h3 className="mb-3 font-display text-xl font-semibold">Interests</h3>
            <p className="text-fog leading-relaxed">{identity.interests}</p>
          </SpotlightCard>
        </AnimatedContent>
        <AnimatedContent distance={40} duration={0.7} delay={0.16}>
          <SpotlightCard
            className="surface flex h-full flex-col justify-between rounded-3xl p-6"
            spotlightColor="rgba(255, 107, 74, 0.16)"
          >
            <div>
              <h3 className="mb-3 font-display text-xl font-semibold">Get In Touch</h3>
              <div className="space-y-2 text-sm leading-relaxed text-fog">
                <p className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-mint" />
                  <span>{identity.location}</span>
                </p>
                <p>
                  <a
                    href={`mailto:${identity.email}`}
                    className="text-paper transition hover:text-mint"
                  >
                    {identity.email}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${identity.phone}`}
                    className="text-fog transition hover:text-mint"
                  >
                    {identity.phone}
                  </a>
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              type="button"
              className="mt-6 flex cursor-pointer items-center justify-between rounded-xl border border-line bg-panel-2/70 px-3.5 py-2 text-xs font-medium text-paper transition hover:border-mint/60 hover:bg-panel-2 focus-visible:outline-none"
              aria-label="Copy email address to clipboard"
            >
              <span className="truncate text-fog">{identity.email}</span>
              <span className={`ml-2 rounded-md px-2 py-0.5 text-[11px] font-semibold transition ${copied ? 'bg-mint text-ink' : 'bg-line/40 text-paper'}`}>
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </section>
  )
}

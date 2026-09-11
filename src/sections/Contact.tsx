import { useState } from 'react'
import Particles from '@/components/react-bits/Particles/Particles'
import Dock from '@/components/react-bits/Dock/Dock'
import Magnet from '@/components/react-bits/Magnet/Magnet'
import SplitText from '@/components/react-bits/SplitText/SplitText'
import { identity } from '@/data/portfolio'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
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
    setTimeout(() => setCopied(false), 2200)
  }

  const dockItems = [
    {
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.96 0-1.74.78-1.74 1.74s.78 1.74 1.74 1.74 1.74-.78 1.74-1.74-.78-1.74-1.74-1.74Z" />
        </svg>
      ),
      label: 'LinkedIn',
      onClick: () => window.open(identity.linkedin, '_blank', 'noreferrer'),
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
      label: 'GitHub',
      onClick: () => window.open(identity.github, '_blank', 'noreferrer'),
    },
    {
      icon: (
        <svg
          className="w-5 h-5 fill-none stroke-current stroke-2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
      label: 'Email',
      onClick: () => {
        window.location.href = `mailto:${identity.email}`
      },
    },
  ]

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Particles
          particleCount={85}
          particleColors={['#3dffa8', '#7ec8ff', '#e8eef2']}
          speed={0.08}
          particleBaseSize={72}
          alphaParticles
          cameraDistance={22}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

      <div className="section-shell relative">
        <p className="section-kicker">Contact</p>
        <SplitText
          text="Let's build the next experiment"
          tag="h2"
          className="font-display mb-6 max-w-3xl text-3xl font-semibold sm:text-5xl"
          textAlign="left"
          delay={28}
        />
        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-base text-fog">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            {identity.location}
          </span>
          <span className="text-line">/</span>
          <a
            href={`mailto:${identity.email}`}
            className="transition hover:text-mint"
          >
            {identity.email}
          </a>
          <span className="text-line">/</span>
          <a
            href={`tel:${identity.phone}`}
            className="transition hover:text-mint"
          >
            {identity.phone}
          </a>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          <Magnet padding={36} magnetStrength={2.5}>
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-mint px-5 py-3 font-semibold text-ink transition hover:shadow-lg hover:shadow-mint/20"
            >
              <span>Email me</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </Magnet>
          <Magnet padding={36} magnetStrength={2.5}>
            <button
              onClick={handleCopy}
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-line bg-panel-2 px-5 py-3 font-semibold text-paper transition hover:border-mint/60 hover:bg-panel focus-visible:outline-none"
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <svg className="h-4 w-4 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-mint font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 text-fog" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy email</span>
                </>
              )}
            </button>
          </Magnet>
          <Magnet padding={36} magnetStrength={2.5}>
            <a
              href={identity.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-line bg-panel px-5 py-3 font-semibold text-paper transition hover:border-line hover:text-mint"
            >
              <span>Download resume</span>
              <svg className="h-4 w-4 text-fog" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </Magnet>
        </div>

        <Dock items={dockItems} panelHeight={78} baseItemSize={52} magnification={72} />
      </div>
    </section>
  )
}

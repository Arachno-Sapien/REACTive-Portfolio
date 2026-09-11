import type { ReactNode } from 'react'
import SplitText from '@/components/react-bits/SplitText/SplitText'
import AnimatedContent from '@/components/react-bits/AnimatedContent/AnimatedContent'
import SpotlightCard from '@/components/react-bits/SpotlightCard/SpotlightCard'
import { leadership } from '@/data/portfolio'

export function Leadership() {
  const metaMap: Record<
    string,
    {
      role: string
      tags: string[]
      icon: ReactNode
      spotlightColor: `rgba(${number}, ${number}, ${number}, ${number})`
    }
  > = {
    'Vulcan Racing': {
      role: 'Head of Business Operations · Formula Bharat 2027',
      tags: ['Formula Student', 'Sponsorship', 'Club Website', 'Team Operations'],
      spotlightColor: 'rgba(255, 107, 74, 0.22)',
      icon: (
        <svg className="h-6 w-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    'Hackathon Collaboration': {
      role: 'Team Lead & Core Developer · AdaptiControl',
      tags: ['Computer Vision', 'Assistive AI', 'Rapid Prototyping', 'Teamwork'],
      spotlightColor: 'rgba(61, 255, 168, 0.22)',
      icon: (
        <svg className="h-6 w-6 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  }

  return (
    <section id="leadership" className="section-shell">
      <p className="section-kicker">Leadership</p>
      <SplitText
        text="Teams, tracks, and race weekends"
        tag="h2"
        className="font-display mb-8 text-3xl font-semibold sm:text-4xl text-paper"
        delay={28}
        textAlign="left"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {leadership.map((item, index) => {
          const meta = metaMap[item.title]
          return (
            <AnimatedContent key={item.title} distance={36} delay={index * 0.1}>
              <SpotlightCard
                className="surface relative h-full overflow-hidden rounded-3xl p-8 transition duration-300 hover:border-mint/40"
                spotlightColor={meta?.spotlightColor ?? 'rgba(255, 107, 74, 0.18)'}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {meta?.role && (
                      <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-mint/90">
                        {meta.role}
                      </p>
                    )}
                    <h3 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  {meta?.icon && (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-panel-2 transition-transform duration-300 group-hover:scale-105">
                      {meta.icon}
                    </div>
                  )}
                </div>

                <p className="mt-4 text-base leading-relaxed text-fog max-w-prose">{item.body}</p>

                {meta?.tags && (
                  <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-line/50">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line/80 bg-ink/40 px-3 py-1 text-xs text-fog transition-colors hover:border-mint/50 hover:text-paper"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </AnimatedContent>
          )
        })}
      </div>
    </section>
  )
}
